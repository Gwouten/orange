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
