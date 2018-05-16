"use strict";

// Rotate slogan
var communes = ["au c&oelig;ur des communes", "au c&oelig;ur des provinces"];
var rwContainer = document.querySelector("#rw");

var createCommunes = function createCommunes(array) {
  var randomIndex = Math.floor(Math.random() * communes.length);
  var rwElement = document.createElement("span");

  rwElement.innerHTML = "" + communes[randomIndex];
  rwElement.classList.add("slogan__header__word");

  rwContainer.appendChild(rwElement);
  setTimeout(function () {
    rwContainer.removeChild(rwElement);
  }, 3000);
};

createCommunes(communes);
var rotateCommunes = setInterval(function () {
  createCommunes(communes);
}, 2000);