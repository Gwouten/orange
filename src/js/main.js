"use strict";

import Siema from "siema";

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
