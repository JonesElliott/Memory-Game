var express = require("express");
var router = express.Router();

var board = require("../models/board");

//shuffle function https://github.com/Daplie/knuth-shuffle
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Temp set up to code front end
router.get("/", function (request, response) {
  response.render("index");
});

router.get("/gameboard", function (request, response) {
  var images = [];
  board.all(function (data) {
    var hbsObject = {
      board: data,
    };
    console.log(hbsObject);

    response.render("gameboard");
  });
});

router.get("/gametest", function (request, response) {
  var images = [];
  board.all(function (data) {
    var hbsObject = {
      board: data,
    };
    console.log(hbsObject);

    var cardImages = [
      "https://www.flaticon.com/svg/static/icons/svg/2281/2281113.svg",
      "https://www.flaticon.com/svg/static/icons/svg/2281/2281113.svg",
      "https://www.flaticon.com/svg/static/icons/svg/2281/2281113.svg",
      "https://www.flaticon.com/svg/static/icons/svg/2281/2281113.svg",
      "https://www.flaticon.com/svg/static/icons/svg/2281/2281113.svg",
      "https://www.flaticon.com/svg/static/icons/svg/2281/2281113.svg",
      "https://www.flaticon.com/svg/static/icons/svg/2281/2281113.svg",
      "https://www.flaticon.com/svg/static/icons/svg/2281/2281113.svg",
      "https://www.flaticon.com/svg/static/icons/svg/2281/2281113.svg",
      "https://www.flaticon.com/svg/static/icons/svg/2281/2281113.svg",
      "https://www.flaticon.com/svg/static/icons/svg/2281/2281113.svg",
      "https://www.flaticon.com/svg/static/icons/svg/2281/2281113.svg",
      "https://www.flaticon.com/svg/static/icons/svg/2281/2281113.svg",
      "https://www.flaticon.com/svg/static/icons/svg/2281/2281113.svg",
      "https://www.flaticon.com/svg/static/icons/svg/2281/2281113.svg",
      "https://www.flaticon.com/svg/static/icons/svg/2281/2281113.svg",
    ];
    response.render("board", { cards: cardImages });
  });
});

module.exports = router;
