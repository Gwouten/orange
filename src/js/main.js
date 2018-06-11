("use strict");

//Debouncing variables
let timeout = false;
const delay = 250;

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
  const sliderContainer = document.querySelector(".carousel");

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
    Siema.prototype.createButtons = function() {
      const nextButton = document.createElement("button");
      nextButton.classList.add("btn", "btn--carousel", "carousel__next");
      sliderContainer.appendChild(nextButton);

      const prevButton = document.createElement("button");
      prevButton.classList.add("btn", "btn--carousel", "carousel__prev");
      sliderContainer.appendChild(prevButton);
    };

    // Make buttons work
    const carousel = document.querySelector(`.${element}`);

    Siema.prototype.bindButtons = function() {
      const carouselPrev = document.querySelector(".carousel__prev");
      const carouselNext = document.querySelector(".carousel__next");

      carouselPrev.addEventListener("click", () => slider.prev());
      carouselNext.addEventListener("click", () => slider.next());
    };

    slider.createButtons();
    slider.bindButtons();
    window.addEventListener("resize", () => {
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

      carousel.addEventListener("mouseenter", () => clearInterval(autoSlide));
      carousel.addEventListener(
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

// Youtube videos

// Working order: Load data from Youtube API => insert data in vidBoxTemplate => use template to render element on page

// Load data from Youtube
const yt_api_key = "AIzaSyAXUGrOIVhDVVhldzfuPfTha2TDdolKMQk";
const videos = document.querySelectorAll(".youtube");
const mainEl = document.querySelector("main");

videos.forEach(video => {
  // Request data from Youtube
  let id = video.dataset.href.split("=");
  id = id[id.length - 1];
  const yt_endpoint = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${yt_api_key}`;

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);

      // Make list of video thumbnails from Youtube
      video.style.background = `url(${
        res.items[0].snippet.thumbnails.standard !== undefined
          ? res.items[0].snippet.thumbnails.standard.url
          : res.items[0].snippet.thumbnails.high.url
      }) center center no-repeat`;
      video.style.backgroundSize = "cover";

      // Open popup with video on click
      video.addEventListener("click", e => {
        // If element exists, remove it
        const vidBox = document.querySelector(".video-box");
        if (vidBox !== null) {
          mainEl.removeChild(vidBox);
        }

        createVidBox(res, video.dataset.href);

        // Add close button functionality
        const closeTrigger = document.querySelector(".video-box");
        closeTrigger.addEventListener("click", function(e) {
          document
            .querySelector(".video-box")
            .classList.add("video-box--close");
          setTimeout(function() {
            mainEl.removeChild(document.querySelector(".video-box"));
          }, 1000);
        });
      });
    }
  };
  xhttp.open("GET", yt_endpoint, true);
  xhttp.send();
});

const createVidBox = (data, videoUrl) => {
  data = data.items[0];
  const date = new Date(data.snippet.publishedAt);
  const publicationDate =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  console.log(data);
  const vidBoxTemplate = `
  <!-- close button -->
  <button class="video-box__close">X</button>

  <!-- video -->
  <div class="video-box__video">
    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${
      data.id
    }" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>

  <!-- controls -->
  <div class="video-box__controls">

    <!-- header -->
    <div class="video-box__header">
      <h1 class="video-box__header__title">${data.snippet.title}</h1>
      <div class="video-box__header__stats">
        <h2 class="video-box__header__stats__views">
          <img src="assets/img/views.svg" alt="" class="video-box__header__stats__icon video-box__header__stats__icon--large"> ${
            data.statistics.viewCount
          }
        </h2>
        <h6 class="video-box__header__stats__likes ${
          data.statistics.likeCount == undefined ? "u-hidden" : ""
        }">
          <img src="assets/img/thumbs-up.svg" alt="" class="video-box__header__stats__icon"> ${
            data.statistics.likeCount
          }
        </h6>
        <h6 class="video-box__header__stats__dislikes ${
          data.statistics.likeCount == undefined ? "u-hidden" : ""
        }">
          <img src="assets/img/thumbs-down.svg" alt="" class="video-box__header__stats__icon"> ${
            data.statistics.dislikeCount
          }
        </h6>
      </div>
    </div>

    <!-- meta -->
    <div class="video-box__meta">
    <div class="video-box__meta__subscribe"></div>
      <div class="video-box__meta__share">
        <a href="http://www.facebook.com/sharer.php?u=${videoUrl}" class="video-box__meta__share__button video-box__meta__share__button--facebook">Share on Facebook</a>
        <a href="https://twitter.com/intent/tweet?text=${
          data.snippet.title
        }&url=${videoUrl}" class="video-box__meta__share__button video-box__meta__share__button--twitter">Share on Twitter</a>
      </div>
    </div>

    <!-- Description -->
    <div class="video-box__description">
      <p class="video-box__description__date">Ajoutée le ${publicationDate}
      </p>
      <p class="video-box__description__description">${
        data.snippet.description
      }</p>
    </div>
  </div>
  `;
  const filledOutTemplate = document.createElement("div");
  filledOutTemplate.classList.add("video-box");
  filledOutTemplate.innerHTML = vidBoxTemplate;
  mainEl.appendChild(filledOutTemplate);

  // Render Youtube subscribe button
  const ytSubscribeContainer = document.querySelector(
    ".video-box__meta__subscribe"
  );
  const ytSubscribeOptions = {
    channel: "ocentre",
    layout: "full"
  };
  gapi.ytsubscribe.render(ytSubscribeContainer, ytSubscribeOptions);
};
