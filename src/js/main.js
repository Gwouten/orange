("use strict");

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
if (document.querySelector(".projects") !== null) {
  const communesSlider = new Siema({
    duration: 1000,
    easing: "ease-in-out",
    perPage: {
      600: 2,
      900: 3,
      1200: 4
    },
    loop: true
  });

  const carousel = document.querySelector(".projects");
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
}
// End siema slider

// To top button
const toTopElement = document.querySelector(".to-top__link");
window.addEventListener("scroll", () => {
  const fromTop = window.scrollY;
  if (fromTop < 200) {
    toTopElement.classList.remove("to-top__link--visible");
  } else if (fromTop >= 200) {
    toTopElement.classList.add("to-top__link--visible");
  }
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

// Youtube videos

// Show/hide the popup
const closeButton = document.querySelector(".video-box__close");
closeButton.addEventListener("click", function(e) {
  e.target.parentNode.classList.remove("video-box--active");
});

const videos = document.querySelectorAll(".youtube");
const vidContainer = document.querySelector(".video-box");

videos.forEach(video => {
  // Get video thumbnail from Youtube
  const id = video.search.slice(3);

  const image = document.createElement("img");
  image.setAttribute("src", `https://i.ytimg.com/vi/${id}/hqdefault.jpg`);

  video.innerHTML = "";
  video.appendChild(image);

  // Open popup with video on click
  video.addEventListener("click", e => {
    e.preventDefault();
    console.log("clicked");

    // If element exists, remove it
    const vidBox = document.querySelector(".video-box__video");
    if (vidBox !== null) {
      vidContainer.removeChild(vidBox);
    }

    // Create new element
    const videoBox = document.createElement("div");
    const vidBoxTemplate = `
      
    `;
    videoBox.classList.add("video-box__video");
    videoBox.innerHTLM = vidBoxTemplate;

    vidContainer.appendChild(videoBox);
  });
});
