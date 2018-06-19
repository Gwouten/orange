("use strict");

//Debouncing variables

// Import header and footer into pages
// Header
const header = new XMLHttpRequest();
header.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    document.querySelector(".header").innerHTML = this.responseText;
  }
};
header.open("GET", "header.html", true);
header.send();

// Footer
const footer = new XMLHttpRequest();
footer.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    document.querySelector(".footer").innerHTML = this.responseText;
  }
};
footer.open("GET", "footer.html", true);
footer.send();

// End import header and footer

// Rotate slogan
const phrases = ["des communes", "des provinces"];
const headline = new RotateSlogan(phrases, "rw", 6000);

headline.rotatePhrases();
// End rotate slogan

// Siema slider
function siema(element, autoplay = true, draggable = true) {
  const sliderContainer = document.querySelector(`.${element}`);

  if (sliderContainer !== null) {
    const slider = new Siema({
      selector: `.${element}`,
      duration: 1000,
      easing: "ease-in-out",
      perPage: {
        600: 2,
        900: 3,
        1200: 4
      },
      loop: true,
      draggable
    });

    // Create next/prev buttons
    Siema.prototype.createButtons = function(element) {
      const nextButton = document.createElement("button");
      nextButton.classList.add(
        "btn",
        "btn--carousel",
        "carousel__next",
        `${element}__next`
      );
      sliderContainer.appendChild(nextButton);

      const prevButton = document.createElement("button");
      prevButton.classList.add(
        "btn",
        "btn--carousel",
        "carousel__prev",
        `${element}__prev`
      );
      sliderContainer.appendChild(prevButton);
    };

    // Make buttons work
    Siema.prototype.bindButtons = function(element) {
      const carouselPrev = document.querySelector(`.${element}__prev`);
      const carouselNext = document.querySelector(`.${element}__next`);

      carouselPrev.addEventListener("click", () => slider.prev());
      carouselNext.addEventListener("click", () => slider.next());
    };

    slider.createButtons(element);
    slider.bindButtons(element);
    window.addEventListener("resize", () => {
      let timeout = false;
      const delay = 250;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        slider.createButtons();
        slider.bindButtons();
      }, delay);
    });

    if (autoplay) {
      let autoSlide = setInterval(function() {
        slider.next();
      }, 5000);

      sliderContainer.addEventListener("mouseenter", () =>
        clearInterval(autoSlide)
      );
      sliderContainer.addEventListener(
        "mouseleave",
        () =>
          (autoSlide = setInterval(function() {
            slider.next();
          }, 5000))
      );
    }
  }
}
// End siema slider

// To top button
const toTopElement = document.querySelector(".to-top__link");
window.addEventListener("scroll", () => {
  let timeout = false;
  const delay = 250;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const fromTop = window.scrollY;
    if (fromTop < 200) {
      toTopElement.classList.remove("to-top__link--visible");
    } else if (fromTop >= 200) {
      toTopElement.classList.add("to-top__link--visible");
    }
  }, delay);
});

// Scroll to top animation
toTopElement.addEventListener("click", function(e) {
  e.preventDefault();
  scrollTo(0, 1000);
});

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
    console.log("found!");
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
      console.log("Loaded");
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
