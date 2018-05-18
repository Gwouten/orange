"use strict";

// Basic useful values

// Rotate slogan

const phrases = ["des communes", "des provinces"];
const headline = new RotateSlogan(phrases, "rw", 6000);

headline.rotatePhrases();

// End rotate slogan

// Siema slider
const communesSlider = new Siema({
  duration: 1000,
  easing: "ease-in-out",
  perPage: 4,
  loop: true
});

const carousel = document.querySelector(".carousel");
const carouselPrev = document.querySelector(".carousel__prev");
const carouselNext = document.querySelector(".carousel__next");
let autoSlide = setInterval(function() {
  communesSlider.next();
}, 5000);

carousel.addEventListener("mouseenter", () => clearInterval(autoSlide));
carousel.addEventListener(
  "mouseleave",
  () =>
    (autoSlide = setInterval(function() {
      communesSlider.next();
    }, 5000))
);

carouselPrev.addEventListener("click", () => communesSlider.prev());
carouselNext.addEventListener("click", () => communesSlider.next());

carousel.addEventListener("click", e => {
  console.log(e.target);
});

// End siema slider
