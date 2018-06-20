class RotateSlogan {
  constructor(phrases = [], container, timing) {
    (this.phrases = phrases),
      (this.container = document.querySelector(`#${container}`)),
      (this.timing = timing),
      (this.interval = (timing / 3) * 2),
      (this.cycles = 0),
      (this.numberPhrases = this.phrases.length - 1);
  }
  createPhrases() {
    if (this.container) {
      const phraseEl = document.createElement("span");

      phraseEl.style.animationDuration = `${this.timing}ms`;
      phraseEl.innerHTML = this.phrases[this.cycles];
      phraseEl.classList.add("slogan__header__word");
      this.container.appendChild(phraseEl);

      this.cycles === this.numberPhrases ? (this.cycles = 0) : this.cycles++;

      setTimeout(() => this.container.removeChild(phraseEl), this.timing);
    }
  }
  rotatePhrases() {
    this.createPhrases();
    setInterval(() => {
      this.createPhrases();
    }, this.interval);
  }
}

// Animated scrolling
const scrollTo = function(to, duration) {
  const element = document.scrollingElement /*|| document.documentElement*/,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date(),
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    easeInOutQuad = function(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    },
    animateScroll = function() {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(
        easeInOutQuad(currentTime, start, change, duration)
      );
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
  animateScroll();
};

// Scroll to theme section
const setThemeLinks = function() {
  const themesLinks = document.querySelectorAll(".carousel--themes a");
  if (themesLinks !== null) {
    themesLinks.forEach(link => {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        let headerHeight = -160;
        if (windowWidth < 975) {
          headerHeight = 100;
        }
        const id = e.target.href.split("#")[1];
        const target = document.querySelector(`#${id}`);
        const dist =
          target.offsetTop - target.scrollTop + target.clientTop - headerHeight;
        scrollTo(dist, 1000);
      });
    });
  }
};

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
      slider.createButtons();
      slider.bindButtons();
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

// Scroll to top animation
const scrollToTop = function(el) {
  window.addEventListener("scroll", () => {
    let timeout = false;
    const delay = 250;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const fromTop = window.scrollY;
      if (fromTop < 200) {
        el.classList.remove("to-top__link--visible");
      } else if (fromTop >= 200) {
        el.classList.add("to-top__link--visible");
      }
    }, delay);
  });
};

// Indicate current page in navigation
const setCurrentPageIndicator = function() {
  const navEl = document.querySelector(".header__interior-links ul");
  const currentPage = window.location.href.split("/");
  const l = currentPage.length - 1;
  const setActiveMenuItem = index => {
    navEl.children[index].children[0].classList.add("current");
  };

  switch (currentPage[l]) {
    case "":
      setActiveMenuItem(0);
      break;
    case "index.html":
      setActiveMenuItem(0);
      break;
    case "communales.html":
      setActiveMenuItem(1);
      break;
    case "provinces.html":
      setActiveMenuItem(2);
      break;
    case "candidats.html":
      setActiveMenuItem(3);
      break;
    case "le-cdh.html":
      setActiveMenuItem(4);
      break;
    case "videos.html":
      setActiveMenuItem(5);
      break;
    case "themes.html":
      setActiveMenuItem(6);
      break;
    default:
      break;
  }
};
