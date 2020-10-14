
$(function () {
  // Display account create modal on click
  $("#create-account-button").on("click", function (event) {
    event.preventDefault();
    $(".create-modal").css("display", "block");
    console.log("Modal Open");

    $(".cancel-button").on("click", function (event) {
      event.preventDefault();
      $(".create-modal").css("display", "none");
      $(".login-modal").css("display", "none");
      $('#new-account-form').each(function(){
        this.reset();
      });
      $('#login-form').each(function(){
        this.reset();
      });
      console.log("Modal closed");
    });
  });

  // New Account Creation
  $("#create-submit-button").click(function (event) {
    event.preventDefault();

    var email = $("#new-email").val();
    var username = $("#create-username").val();
    var password = $("#create-pwd").val();
    var confirmPassword = $("#confirm-pwd").val();

    if (email === "") {
      alert("Email cannot be blank.");
      return false;
    }

    if (username === "") {
      alert("Username cannot be blank.");
      return false;
    }

    if (password != confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }

    if (password === "") {
      alert("Password cannot be blank");
      return false;
    }

    var newUser = {
      email: email,
      username: username,
      password: password,
    };

    console.log(newUser);

    // Post Request to send new user data
    $.ajax("/api/user", {
      type: "POST",
      data: newUser,
    }).then(function (result) {
      console.log("New User Sent");
      $('#new-account-form').each(function(){
        this.reset();
      });
      $(".create-modal").css("display", "none");
      goToGame();
    });
  });

  // Log in button functionality
  $("#login-button").on("click", function () {
    $(".login-modal").css("display", "block");
    console.log("Modal Open");
  });


  // Existing user login
  $("#login-submit-button").click(function (event) {
    event.preventDefault();

    var username = $("#login-username").val();
    var password = $("#login-pwd").val();

    if (username === "") {
      alert("Username cannot be blank.");
      return false;
    }

    if (password === "") {
      alert("Passwords is blank.");
      return false;
    }

    var existingUser = {
      email: "",
      username: username,
      password: password,
    };

    console.log(existingUser);

    // Post Request to send new user data
    $.ajax("/api/user/login", {
      type: "POST",
      data: existingUser,
    }).then(function (result) {

      console.log("User Logged in as: \n" + JSON.stringify(result));
      $(".login-modal").css("display", "none");
      $('#login-form').each(function(){
        this.reset();
      });
      try {
        if (result[0].username === username && result[0].password === password) {
          goToGame();
        }
      } catch (error) {
        console.log(error);
        alert('No Account with given username and/or password');
      }

    });
  });

  function goToGame() {
    $.ajax("/gameboard", {
      type: "GET",
    }).then(function(results) {
      window.location.href = "/gameboard";
      return results;
    });
  }
  
  function goToLeaderboard() {
    $.ajax("/api/leaderboard", {
      type: "GET",
    }).then(function(results) {
      window.location.href = "/api/leaderboard";
      return results;
    });
  }
  
  // Play without account
  $("#play-button").click(function (event) {
    event.preventDefault();
    goToGame();
  });
  
  // Go to Leaderboard
  $("#leaderboard-button").click(function (event) {
    event.preventDefault();
    goToLeaderboard();
  });

});
