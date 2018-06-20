("use strict");

// Set current page indicator in navigation menu
setCurrentPageIndicator();

// Rotate slogan
const phrases = ["des communes", "des provinces"];
const headline = new RotateSlogan(phrases, "rw", 6000);

headline.rotatePhrases();
// End rotate slogan

// To top button
const toTopElement = document.querySelector(".to-top__link");
scrollToTop(toTopElement);

// Scroll to top animation
toTopElement.addEventListener("click", function(e) {
  e.preventDefault();
  scrollTo(0, 1000);
});

// Scroll to theme section
setThemeLinks();

// Awesomplete - for autocompleting form fields

const inputCandidates = document.querySelector(".input__text"); // form on index.html
if (inputCandidates !== null) {
  var inputCandidatesList = [
    {
      code: 1000,
      commune: "Bruxelles",
      candidats: ["Olivier", "Wouter"]
    },
    {
      code: 1050,
      commune: "Ixelles",
      candidats: ["Gilles", "Christophe"]
    },
    {
      code: 3000,
      commune: "Leuven",
      candidats: ["Etienne", "Sandro"]
    }
  ];

  const candidates = list => {
    new Awesomplete(inputCandidates, {
      list,
      minChars: 1,
      maxItems: 15
    });
  };

  const flattenArray = function(accumulator, currentValue) {
    return accumulator.concat(currentValue);
  };

  const fullList = inputCandidatesList
    .map(function(item) {
      return Object.keys(item)
        .map(e => item[e])
        .reduce(flattenArray, []);
    })
    .reduce(flattenArray);

  candidates(fullList);
}
// End awesomplete

// Set margin for u-wrapper--followed-by-quote
let windowWidth = window.innerWidth;

const getMargin = function(width) {
  return (width - 1000) / 2;
};

const setQuoteHeight = function(element, height) {
  element.parentNode.children[0].style.paddingTop = `${height}px`;
};

const setQuoteMargin = () => {
  const element = document.querySelector(".u-wrapper--followed-by-quote");
  if (element !== null) {
    if (windowWidth >= 1200) {
      element.style.marginLeft = `${getMargin(windowWidth)}px`;
    } else if (windowWidth < 975) {
      element.style.marginLeft = `auto`;
    } else {
      return;
    }
  }
};

// Setup textblock when preceded by quoteblock element
const setTextblockSize = function(element) {
  if (windowWidth >= 1200) {
    element.style.marginRight = `${getMargin(windowWidth)}px`;
  } else if (1200 > windowWidth && windowWidth >= 975) {
    const siblingWidth = document.querySelector(".candidate-body__textblock")
      .offsetWidth;
    element.style.width = `${siblingWidth}px`;
  }

  setQuoteHeight(element, element.offsetHeight);
};

const onLoad = function() {
  const textAfterQuote = document.querySelector(
    ".quoteblock + .candidate-body__textblock"
  );

  if (textAfterQuote !== null) {
    if (windowWidth >= 975) {
      setQuoteMargin();
      setTextblockSize(textAfterQuote);
    } else {
      textAfterQuote.style.cssText = "";
      setQuoteHeight(textAfterQuote, textAfterQuote.offsetHeight);
    }
  }
};
document.addEventListener("DOMContentLoaded", onLoad());
window.addEventListener("resize", function() {
  windowWidth = window.innerWidth;
  let timeout;
  const delay = 250;

  clearTimeout(timeout);
  timeout = setTimeout(onLoad(), delay);
});
