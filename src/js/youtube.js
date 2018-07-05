// Youtube videos

// Working order: Load data from Youtube API => insert data in vidBoxTemplate => use template to render element on page

// Functions

// Fetch video info from Youtube
const getVideoInfo = (video, yt_endpoint) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      const data = res.items[0];
      const date = new Date(data.snippet.publishedAt);
      const publicationDate =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
      const classArray = [];
      video.classList.forEach(item => classArray.push(item));
      // Is the video the Hero video or not?
      if (classArray.includes("youtube-hero")) {
        document.querySelector(
          ".video-hero__video-container"
        ).innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${
          data.id
        }" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        document.querySelector(".video-hero__header").innerText =
          data.snippet.title;
        document.querySelector(
          ".video-hero__date"
        ).innerText = `Ajouté le ${publicationDate}`;
        document.querySelector(".video-hero__description").innerText =
          data.snippet.description;
      } else {
        // Make list of video thumbnails from Youtube
        video.style.background = `url(${
          data.snippet.thumbnails.standard !== undefined
            ? data.snippet.thumbnails.standard.url
            : data.snippet.thumbnails.high.url
        }) center center no-repeat`;
        video.style.backgroundSize = "cover";
        // Open popup with video on click
        video.addEventListener("click", e => {
          // If element exists, remove it
          const vidBox = document.querySelector(".video-box");
          if (vidBox !== null) {
            mainEl.removeChild(vidBox);
          }
          createVidBox(res, publicationDate, video.dataset.href);
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
    }
  };
  xhttp.open("GET", yt_endpoint, true);
  xhttp.send();
};

// Videobox template
const createVidBox = (data, publicationDate, videoUrl) => {
  data = data.items[0];
  const vidBoxTemplate = `
  <!-- close button -->
  <button class="video-box__close">X</button>

  <!-- video -->
  <div class="video-box__video">
    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${
      data.id
    }?autoplay=1&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
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
          data.statistics.dislikeCount == undefined ? "u-hidden" : ""
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

siema("video-list__list", false, false);
const yt_api_key = "AIzaSyAXUGrOIVhDVVhldzfuPfTha2TDdolKMQk";
const videos = Array.prototype.slice.call(
  document.querySelectorAll(".youtube")
);
const mainEl = document.querySelector(".yt-container");

videos.forEach(video => {
  // Request data from Youtube
  let id = video.dataset.href.split("=");
  id = id[id.length - 1];
  const yt_endpoint = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${yt_api_key}`;

  getVideoInfo(video, yt_endpoint);
});
