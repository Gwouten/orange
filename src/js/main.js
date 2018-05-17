"use strict";

// Rotate slogan
const phrases = ["des communes", "des provinces"];
const rwContainer = document.querySelector("#rw");
const numberPhrases = phrases.length - 1;
let cycles = 0;

const createCommunes = function createCommunes(array) {
  // Uncomment below line to set order of phrases random
  // const randomIndex = Math.floor(Math.random() * numberPhrases);
  const rwElement = document.createElement("span");

  rwElement.innerHTML = "" + phrases[cycles];
  rwElement.classList.add("slogan__header__word");

  rwContainer.appendChild(rwElement);

  if (cycles === numberPhrases) {
    cycles = 0;
  } else {
    cycles++;
  }
  setTimeout(function() {
    rwContainer.removeChild(rwElement);
  }, 3000);
};

createCommunes(phrases);
const rotateCommunes = setInterval(function() {
  createCommunes(phrases);
}, 2000);
// End rotate slogan

// Siema slider
const communesSlider = new Siema({
  perPage: 4,
  loop: true
});
const prev = document.querySelector(".carousel__prev");
const next = document.querySelector(".carousel__next");

prev.addEventListener("click", () => communesSlider.prev());
next.addEventListener("click", () => communesSlider.next());
// End siema slider
