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

// 2. This code loads the IFrame Player API code asynchronously.
const tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
const youtube = document.querySelectorAll(".youtube");
function onYouTubeIframeAPIReady() {
  youtube.forEach(video => {
    const id = video.dataset.id;
    const player = new YT.Player(video, {
      height: "450",
      width: "800",
      videoId: id,
      playerVars: {
        rel: 0
      },
      events: {
        onReady: cuePlayer
      }
    });
  });

  // player = new YT.Player(youtubeFrame, {
  //   height: "390",
  //   width: "640",
  //   videoId: "GTHxIVoaAeY",
  //   playerVars: {
  //     modestbranding: 1,
  //     fs: 0
  //   },
  //   events: {
  //     onReady: cuePlayer,
  //     onStateChange: onPlayerStateChange
  //   }
  // });
}

// 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//   event.target.playVideo();
// }

function cuePlayer(e) {
  const id = e.target.a.dataset.id;
  e.target.cueVideoById(id);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
let done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
