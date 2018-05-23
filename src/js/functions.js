class RotateSlogan {
  constructor(phrases = [], container, timing) {
    (this.phrases = phrases),
      (this.container = document.querySelector(`#${container}`)),
      (this.timing = timing),
      (this.interval = timing / 3 * 2),
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
    } else {
      console.log("Error: no element with given id found on page.");
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
  const element = document.scrollingElement || document.documentElement,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date(),
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    easeInOutQuad = function(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
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
