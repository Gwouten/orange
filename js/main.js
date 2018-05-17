"use strict";

// Rotate slogan

var phrases = ["des communes", "des provinces"];
var headline = new RotateSlogan(phrases, "rw", 6000);

headline.rotatePhrases();

// End rotate slogan

// Siema slider
var communesSlider = new Siema({
  duration: 1000,
  easing: "ease-in-out",
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

var autoSlide = setInterval(function () {
  communesSlider.next();
}, 5000);
// End siema slider