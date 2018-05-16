"use strict";

var _siema = require("siema");

var _siema2 = _interopRequireDefault(_siema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Rotate slogan
var phrases = ["des communes", "des provinces"];
var rwContainer = document.querySelector("#rw");
var numberPhrases = phrases.length - 1;
var cycles = 0;

var createCommunes = function createCommunes(array) {
  // Uncomment below line to set order of phrases random
  // const randomIndex = Math.floor(Math.random() * numberPhrases);
  var rwElement = document.createElement("span");

  rwElement.innerHTML = "" + phrases[cycles];
  rwElement.classList.add("slogan__header__word");

  rwContainer.appendChild(rwElement);

  if (cycles === numberPhrases) {
    cycles = 0;
  } else {
    cycles++;
  }
  setTimeout(function () {
    rwContainer.removeChild(rwElement);
  }, 3000);
};

createCommunes(phrases);
var rotateCommunes = setInterval(function () {
  createCommunes(phrases);
}, 2000);