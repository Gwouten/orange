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
  perPage: {
    600: 2,
    900: 3,
    1200: 4
  },
  loop: true
});

var carousel = document.querySelector(".carousel");
var carouselPrev = document.querySelector(".carousel__prev");
var carouselNext = document.querySelector(".carousel__next");
var autoSlide = setInterval(function () {
  communesSlider.next();
}, 5000);

carousel.addEventListener("mouseenter", function () {
  return clearInterval(autoSlide);
});
carousel.addEventListener("mouseleave", function () {
  return autoSlide = setInterval(function () {
    communesSlider.next();
  }, 5000);
});

carouselPrev.addEventListener("click", function () {
  return communesSlider.prev();
});
carouselNext.addEventListener("click", function () {
  return communesSlider.next();
});
// End siema slider

// To top button
var toTopElement = document.querySelector(".to-top__link");
window.addEventListener("scroll", function () {
  var fromTop = window.scrollY;
  if (fromTop < 200) {
    toTopElement.classList.remove("to-top__link--visible");
  } else if (fromTop >= 200) {
    toTopElement.classList.add("to-top__link--visible");
  }
});

// Scroll to top animation
toTopElement.addEventListener("click", function (e) {
  e.preventDefault();
  scrollTo(0, 1000);
});

// Awesomplete - for autocompleting form fields
var inputCandidates = document.querySelector("#candidates-input");
var inputCandidatesList = [{
  code: 1000,
  commune: "Bruxelles",
  candidats: ["Olivier", "Wouter"]
}, {
  code: 1050,
  commune: "Ixelles",
  candidats: ["Gilles", "Christophe"]
}, {
  code: 3000,
  commune: "Leuven",
  candidats: ["Etienne", "Sandro"]
}];

var candidates = function candidates(list) {
  new Awesomplete(inputCandidates, {
    list: list,
    minChars: 1,
    maxItems: 15
  });
};

var flattenArray = function flattenArray(accumulator, currentValue) {
  return accumulator.concat(currentValue);
};

var fullList = inputCandidatesList.map(function (item) {
  return Object.values(item).reduce(flattenArray, []);
}).reduce(flattenArray);

candidates(fullList);
// End awesomplete