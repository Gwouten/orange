"use strict";

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
// End rotate slogan

// Siema slider
var communesSlider = new Siema({
  perPage: 4,
  loop: true
});
var prev = document.querySelector(".carousel__prev");
var next = document.querySelector(".carousel__next");

prev.addEventListener("click", function () {
  return communesSlider.prev();
});
next.addEventListener("click", function () {
  return communesSlider.next();
});
// End siema slider