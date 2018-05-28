"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RotateSlogan = function () {
  function RotateSlogan() {
    var phrases = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var container = arguments[1];
    var timing = arguments[2];

    _classCallCheck(this, RotateSlogan);

    this.phrases = phrases, this.container = document.querySelector("#" + container), this.timing = timing, this.interval = timing / 3 * 2, this.cycles = 0, this.numberPhrases = this.phrases.length - 1;
  }

  _createClass(RotateSlogan, [{
    key: "createPhrases",
    value: function createPhrases() {
      var _this = this;

      if (this.container) {
        var phraseEl = document.createElement("span");

        phraseEl.style.animationDuration = this.timing + "ms";
        phraseEl.innerHTML = this.phrases[this.cycles];
        phraseEl.classList.add("slogan__header__word");
        this.container.appendChild(phraseEl);

        this.cycles === this.numberPhrases ? this.cycles = 0 : this.cycles++;

        setTimeout(function () {
          return _this.container.removeChild(phraseEl);
        }, this.timing);
      }
    }
  }, {
    key: "rotatePhrases",
    value: function rotatePhrases() {
      var _this2 = this;

      this.createPhrases();
      setInterval(function () {
        _this2.createPhrases();
      }, this.interval);
    }
  }]);

  return RotateSlogan;
}();

// Animated scrolling


var scrollTo = function scrollTo(to, duration) {
  var element = document.scrollingElement || document.documentElement,
      start = element.scrollTop,
      change = to - start,
      startDate = +new Date(),

  // t = current time
  // b = start value
  // c = change in value
  // d = duration
  easeInOutQuad = function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  },
      animateScroll = function animateScroll() {
    var currentDate = +new Date();
    var currentTime = currentDate - startDate;
    element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      element.scrollTop = to;
    }
  };
  animateScroll();
};