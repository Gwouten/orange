!(function(e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
      ? define("Siema", [], t)
      : "object" == typeof exports
        ? (exports.Siema = t())
        : (e.Siema = t());
})("undefined" != typeof self ? self : this, function() {
  return (function(e) {
    function t(r) {
      if (i[r]) return i[r].exports;
      var n = (i[r] = { i: r, l: !1, exports: {} });
      return e[r].call(n.exports, n, n.exports, t), (n.l = !0), n.exports;
    }
    var i = {};
    return (
      (t.m = e),
      (t.c = i),
      (t.d = function(e, i, r) {
        t.o(e, i) ||
          Object.defineProperty(e, i, {
            configurable: !1,
            enumerable: !0,
            get: r
          });
      }),
      (t.n = function(e) {
        var i =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return t.d(i, "a", i), i;
      }),
      (t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (t.p = ""),
      t((t.s = 0))
    );
  })([
    function(e, t, i) {
      "use strict";
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              },
        s = (function() {
          function e(e, t) {
            for (var i = 0; i < t.length; i++) {
              var r = t[i];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(t, i, r) {
            return i && e(t.prototype, i), r && e(t, r), t;
          };
        })(),
        l = (function() {
          function e(t) {
            var i = this;
            if (
              (r(this, e),
              (this.config = e.mergeSettings(t)),
              (this.selector =
                "string" == typeof this.config.selector
                  ? document.querySelector(this.config.selector)
                  : this.config.selector),
              null === this.selector)
            )
              throw new Error("Something wrong with your selector 😭");
            this.resolveSlidesNumber(),
              (this.selectorWidth = this.selector.offsetWidth),
              (this.innerElements = [].slice.call(this.selector.children)),
              (this.currentSlide = this.config.loop
                ? this.config.startIndex % this.innerElements.length
                : Math.max(
                    0,
                    Math.min(
                      this.config.startIndex,
                      this.innerElements.length - this.perPage
                    )
                  )),
              (this.transformProperty = e.webkitOrNot()),
              [
                "resizeHandler",
                "touchstartHandler",
                "touchendHandler",
                "touchmoveHandler",
                "mousedownHandler",
                "mouseupHandler",
                "mouseleaveHandler",
                "mousemoveHandler",
                "clickHandler"
              ].forEach(function(e) {
                i[e] = i[e].bind(i);
              }),
              this.init();
          }
          return (
            s(
              e,
              [
                {
                  key: "attachEvents",
                  value: function() {
                    window.addEventListener("resize", this.resizeHandler),
                      this.config.draggable &&
                        ((this.pointerDown = !1),
                        (this.drag = {
                          startX: 0,
                          endX: 0,
                          startY: 0,
                          letItGo: null,
                          preventClick: !1
                        }),
                        this.selector.addEventListener(
                          "touchstart",
                          this.touchstartHandler
                        ),
                        this.selector.addEventListener(
                          "touchend",
                          this.touchendHandler
                        ),
                        this.selector.addEventListener(
                          "touchmove",
                          this.touchmoveHandler
                        ),
                        this.selector.addEventListener(
                          "mousedown",
                          this.mousedownHandler
                        ),
                        this.selector.addEventListener(
                          "mouseup",
                          this.mouseupHandler
                        ),
                        this.selector.addEventListener(
                          "mouseleave",
                          this.mouseleaveHandler
                        ),
                        this.selector.addEventListener(
                          "mousemove",
                          this.mousemoveHandler
                        ),
                        this.selector.addEventListener(
                          "click",
                          this.clickHandler
                        ));
                  }
                },
                {
                  key: "detachEvents",
                  value: function() {
                    window.removeEventListener("resize", this.resizeHandler),
                      this.selector.removeEventListener(
                        "touchstart",
                        this.touchstartHandler
                      ),
                      this.selector.removeEventListener(
                        "touchend",
                        this.touchendHandler
                      ),
                      this.selector.removeEventListener(
                        "touchmove",
                        this.touchmoveHandler
                      ),
                      this.selector.removeEventListener(
                        "mousedown",
                        this.mousedownHandler
                      ),
                      this.selector.removeEventListener(
                        "mouseup",
                        this.mouseupHandler
                      ),
                      this.selector.removeEventListener(
                        "mouseleave",
                        this.mouseleaveHandler
                      ),
                      this.selector.removeEventListener(
                        "mousemove",
                        this.mousemoveHandler
                      ),
                      this.selector.removeEventListener(
                        "click",
                        this.clickHandler
                      );
                  }
                },
                {
                  key: "init",
                  value: function() {
                    this.attachEvents(),
                      (this.selector.style.overflow = "hidden"),
                      (this.selector.style.direction = this.config.rtl
                        ? "rtl"
                        : "ltr"),
                      this.buildSliderFrame(),
                      this.config.onInit.call(this);
                  }
                },
                {
                  key: "buildSliderFrame",
                  value: function() {
                    var e = this.selectorWidth / this.perPage,
                      t = this.config.loop
                        ? this.innerElements.length + 2 * this.perPage
                        : this.innerElements.length;
                    (this.sliderFrame = document.createElement("div")),
                      (this.sliderFrame.style.width = e * t + "px"),
                      this.enableTransition(),
                      this.config.draggable &&
                        (this.selector.style.cursor = "-webkit-grab");
                    var i = document.createDocumentFragment();
                    if (this.config.loop)
                      for (
                        var r = this.innerElements.length - this.perPage;
                        r < this.innerElements.length;
                        r++
                      ) {
                        var n = this.buildSliderFrameItem(
                          this.innerElements[r].cloneNode(!0)
                        );
                        i.appendChild(n);
                      }
                    for (var s = 0; s < this.innerElements.length; s++) {
                      var l = this.buildSliderFrameItem(this.innerElements[s]);
                      i.appendChild(l);
                    }
                    if (this.config.loop)
                      for (var o = 0; o < this.perPage; o++) {
                        var a = this.buildSliderFrameItem(
                          this.innerElements[o].cloneNode(!0)
                        );
                        i.appendChild(a);
                      }
                    this.sliderFrame.appendChild(i),
                      (this.selector.innerHTML = ""),
                      this.selector.appendChild(this.sliderFrame),
                      this.slideToCurrent();
                  }
                },
                {
                  key: "buildSliderFrameItem",
                  value: function(e) {
                    var t = document.createElement("div");
                    return (
                      (t.style.cssFloat = this.config.rtl ? "right" : "left"),
                      (t.style.float = this.config.rtl ? "right" : "left"),
                      (t.style.width =
                        (this.config.loop
                          ? 100 / (this.innerElements.length + 2 * this.perPage)
                          : 100 / this.innerElements.length) + "%"),
                      t.appendChild(e),
                      t
                    );
                  }
                },
                {
                  key: "resolveSlidesNumber",
                  value: function() {
                    if ("number" == typeof this.config.perPage)
                      this.perPage = this.config.perPage;
                    else if ("object" === n(this.config.perPage)) {
                      this.perPage = 1;
                      for (var e in this.config.perPage)
                        window.innerWidth >= e &&
                          (this.perPage = this.config.perPage[e]);
                    }
                  }
                },
                {
                  key: "prev",
                  value: function() {
                    var e =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : 1,
                      t = arguments[1];
                    if (!(this.innerElements.length <= this.perPage)) {
                      var i = this.currentSlide;
                      if (this.config.loop) {
                        if (this.currentSlide - e < 0) {
                          this.disableTransition();
                          var r = this.currentSlide + this.innerElements.length,
                            n = this.perPage,
                            s = r + n,
                            l =
                              (this.config.rtl ? 1 : -1) *
                              s *
                              (this.selectorWidth / this.perPage),
                            o = this.config.draggable
                              ? this.drag.endX - this.drag.startX
                              : 0;
                          (this.sliderFrame.style[this.transformProperty] =
                            "translate3d(" + (l + o) + "px, 0, 0)"),
                            (this.currentSlide = r - e);
                        } else this.currentSlide = this.currentSlide - e;
                      } else
                        this.currentSlide = Math.max(this.currentSlide - e, 0);
                      i !== this.currentSlide &&
                        (this.slideToCurrent(this.config.loop),
                        this.config.onChange.call(this),
                        t && t.call(this));
                    }
                  }
                },
                {
                  key: "next",
                  value: function() {
                    var e =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : 1,
                      t = arguments[1];
                    if (!(this.innerElements.length <= this.perPage)) {
                      var i = this.currentSlide;
                      if (this.config.loop) {
                        if (
                          this.currentSlide + e >
                          this.innerElements.length - this.perPage
                        ) {
                          this.disableTransition();
                          var r = this.currentSlide - this.innerElements.length,
                            n = this.perPage,
                            s = r + n,
                            l =
                              (this.config.rtl ? 1 : -1) *
                              s *
                              (this.selectorWidth / this.perPage),
                            o = this.config.draggable
                              ? this.drag.endX - this.drag.startX
                              : 0;
                          (this.sliderFrame.style[this.transformProperty] =
                            "translate3d(" + (l + o) + "px, 0, 0)"),
                            (this.currentSlide = r + e);
                        } else this.currentSlide = this.currentSlide + e;
                      } else
                        this.currentSlide = Math.min(
                          this.currentSlide + e,
                          this.innerElements.length - this.perPage
                        );
                      i !== this.currentSlide &&
                        (this.slideToCurrent(this.config.loop),
                        this.config.onChange.call(this),
                        t && t.call(this));
                    }
                  }
                },
                {
                  key: "disableTransition",
                  value: function() {
                    (this.sliderFrame.style.webkitTransition =
                      "all 0ms " + this.config.easing),
                      (this.sliderFrame.style.transition =
                        "all 0ms " + this.config.easing);
                  }
                },
                {
                  key: "enableTransition",
                  value: function() {
                    (this.sliderFrame.style.webkitTransition =
                      "all " +
                      this.config.duration +
                      "ms " +
                      this.config.easing),
                      (this.sliderFrame.style.transition =
                        "all " +
                        this.config.duration +
                        "ms " +
                        this.config.easing);
                  }
                },
                {
                  key: "goTo",
                  value: function(e, t) {
                    if (!(this.innerElements.length <= this.perPage)) {
                      var i = this.currentSlide;
                      (this.currentSlide = this.config.loop
                        ? e % this.innerElements.length
                        : Math.min(
                            Math.max(e, 0),
                            this.innerElements.length - this.perPage
                          )),
                        i !== this.currentSlide &&
                          (this.slideToCurrent(),
                          this.config.onChange.call(this),
                          t && t.call(this));
                    }
                  }
                },
                {
                  key: "slideToCurrent",
                  value: function(e) {
                    var t = this,
                      i = this.config.loop
                        ? this.currentSlide + this.perPage
                        : this.currentSlide,
                      r =
                        (this.config.rtl ? 1 : -1) *
                        i *
                        (this.selectorWidth / this.perPage);
                    e
                      ? requestAnimationFrame(function() {
                          requestAnimationFrame(function() {
                            t.enableTransition(),
                              (t.sliderFrame.style[t.transformProperty] =
                                "translate3d(" + r + "px, 0, 0)");
                          });
                        })
                      : (this.sliderFrame.style[this.transformProperty] =
                          "translate3d(" + r + "px, 0, 0)");
                  }
                },
                {
                  key: "updateAfterDrag",
                  value: function() {
                    var e =
                        (this.config.rtl ? -1 : 1) *
                        (this.drag.endX - this.drag.startX),
                      t = Math.abs(e),
                      i = this.config.multipleDrag
                        ? Math.ceil(t / (this.selectorWidth / this.perPage))
                        : 1,
                      r = e > 0 && this.currentSlide - i < 0,
                      n =
                        e < 0 &&
                        this.currentSlide + i >
                          this.innerElements.length - this.perPage;
                    e > 0 &&
                    t > this.config.threshold &&
                    this.innerElements.length > this.perPage
                      ? this.prev(i)
                      : e < 0 &&
                        t > this.config.threshold &&
                        this.innerElements.length > this.perPage &&
                        this.next(i),
                      this.slideToCurrent(r || n);
                  }
                },
                {
                  key: "resizeHandler",
                  value: function() {
                    this.resolveSlidesNumber(),
                      this.currentSlide + this.perPage >
                        this.innerElements.length &&
                        (this.currentSlide =
                          this.innerElements.length <= this.perPage
                            ? 0
                            : this.innerElements.length - this.perPage),
                      (this.selectorWidth = this.selector.offsetWidth),
                      this.buildSliderFrame();
                  }
                },
                {
                  key: "clearDrag",
                  value: function() {
                    this.drag = {
                      startX: 0,
                      endX: 0,
                      startY: 0,
                      letItGo: null,
                      preventClick: this.drag.preventClick
                    };
                  }
                },
                {
                  key: "touchstartHandler",
                  value: function(e) {
                    -1 !==
                      ["TEXTAREA", "OPTION", "INPUT", "SELECT"].indexOf(
                        e.target.nodeName
                      ) ||
                      (e.stopPropagation(),
                      (this.pointerDown = !0),
                      (this.drag.startX = e.touches[0].pageX),
                      (this.drag.startY = e.touches[0].pageY));
                  }
                },
                {
                  key: "touchendHandler",
                  value: function(e) {
                    e.stopPropagation(),
                      (this.pointerDown = !1),
                      this.enableTransition(),
                      this.drag.endX && this.updateAfterDrag(),
                      this.clearDrag();
                  }
                },
                {
                  key: "touchmoveHandler",
                  value: function(e) {
                    if (
                      (e.stopPropagation(),
                      null === this.drag.letItGo &&
                        (this.drag.letItGo =
                          Math.abs(this.drag.startY - e.touches[0].pageY) <
                          Math.abs(this.drag.startX - e.touches[0].pageX)),
                      this.pointerDown && this.drag.letItGo)
                    ) {
                      e.preventDefault(),
                        (this.drag.endX = e.touches[0].pageX),
                        (this.sliderFrame.style.webkitTransition =
                          "all 0ms " + this.config.easing),
                        (this.sliderFrame.style.transition =
                          "all 0ms " + this.config.easing);
                      var t = this.config.loop
                          ? this.currentSlide + this.perPage
                          : this.currentSlide,
                        i = t * (this.selectorWidth / this.perPage),
                        r = this.drag.endX - this.drag.startX,
                        n = this.config.rtl ? i + r : i - r;
                      this.sliderFrame.style[this.transformProperty] =
                        "translate3d(" +
                        (this.config.rtl ? 1 : -1) * n +
                        "px, 0, 0)";
                    }
                  }
                },
                {
                  key: "mousedownHandler",
                  value: function(e) {
                    -1 !==
                      ["TEXTAREA", "OPTION", "INPUT", "SELECT"].indexOf(
                        e.target.nodeName
                      ) ||
                      (e.preventDefault(),
                      e.stopPropagation(),
                      (this.pointerDown = !0),
                      (this.drag.startX = e.pageX));
                  }
                },
                {
                  key: "mouseupHandler",
                  value: function(e) {
                    e.stopPropagation(),
                      (this.pointerDown = !1),
                      (this.selector.style.cursor = "-webkit-grab"),
                      this.enableTransition(),
                      this.drag.endX && this.updateAfterDrag(),
                      this.clearDrag();
                  }
                },
                {
                  key: "mousemoveHandler",
                  value: function(e) {
                    if ((e.preventDefault(), this.pointerDown)) {
                      "A" === e.target.nodeName &&
                        (this.drag.preventClick = !0),
                        (this.drag.endX = e.pageX),
                        (this.selector.style.cursor = "-webkit-grabbing"),
                        (this.sliderFrame.style.webkitTransition =
                          "all 0ms " + this.config.easing),
                        (this.sliderFrame.style.transition =
                          "all 0ms " + this.config.easing);
                      var t = this.config.loop
                          ? this.currentSlide + this.perPage
                          : this.currentSlide,
                        i = t * (this.selectorWidth / this.perPage),
                        r = this.drag.endX - this.drag.startX,
                        n = this.config.rtl ? i + r : i - r;
                      this.sliderFrame.style[this.transformProperty] =
                        "translate3d(" +
                        (this.config.rtl ? 1 : -1) * n +
                        "px, 0, 0)";
                    }
                  }
                },
                {
                  key: "mouseleaveHandler",
                  value: function(e) {
                    this.pointerDown &&
                      ((this.pointerDown = !1),
                      (this.selector.style.cursor = "-webkit-grab"),
                      (this.drag.endX = e.pageX),
                      (this.drag.preventClick = !1),
                      this.enableTransition(),
                      this.updateAfterDrag(),
                      this.clearDrag());
                  }
                },
                {
                  key: "clickHandler",
                  value: function(e) {
                    this.drag.preventClick && e.preventDefault(),
                      (this.drag.preventClick = !1);
                  }
                },
                {
                  key: "remove",
                  value: function(e, t) {
                    if (e < 0 || e >= this.innerElements.length)
                      throw new Error("Item to remove doesn't exist 😭");
                    var i = e < this.currentSlide,
                      r = this.currentSlide + this.perPage - 1 === e;
                    (i || r) && this.currentSlide--,
                      this.innerElements.splice(e, 1),
                      this.buildSliderFrame(),
                      t && t.call(this);
                  }
                },
                {
                  key: "insert",
                  value: function(e, t, i) {
                    if (t < 0 || t > this.innerElements.length + 1)
                      throw new Error("Unable to inset it at this index 😭");
                    if (-1 !== this.innerElements.indexOf(e))
                      throw new Error(
                        "The same item in a carousel? Really? Nope 😭"
                      );
                    var r =
                      t <= this.currentSlide > 0 && this.innerElements.length;
                    (this.currentSlide = r
                      ? this.currentSlide + 1
                      : this.currentSlide),
                      this.innerElements.splice(t, 0, e),
                      this.buildSliderFrame(),
                      i && i.call(this);
                  }
                },
                {
                  key: "prepend",
                  value: function(e, t) {
                    this.insert(e, 0), t && t.call(this);
                  }
                },
                {
                  key: "append",
                  value: function(e, t) {
                    this.insert(e, this.innerElements.length + 1),
                      t && t.call(this);
                  }
                },
                {
                  key: "destroy",
                  value: function() {
                    var e =
                        arguments.length > 0 &&
                        void 0 !== arguments[0] &&
                        arguments[0],
                      t = arguments[1];
                    if (
                      (this.detachEvents(),
                      (this.selector.style.cursor = "auto"),
                      e)
                    ) {
                      for (
                        var i = document.createDocumentFragment(), r = 0;
                        r < this.innerElements.length;
                        r++
                      )
                        i.appendChild(this.innerElements[r]);
                      (this.selector.innerHTML = ""),
                        this.selector.appendChild(i),
                        this.selector.removeAttribute("style");
                    }
                    t && t.call(this);
                  }
                }
              ],
              [
                {
                  key: "mergeSettings",
                  value: function(e) {
                    var t = {
                        selector: ".siema",
                        duration: 200,
                        easing: "ease-out",
                        perPage: 1,
                        startIndex: 0,
                        draggable: !0,
                        multipleDrag: !0,
                        threshold: 20,
                        loop: !1,
                        rtl: !1,
                        onInit: function() {},
                        onChange: function() {}
                      },
                      i = e;
                    for (var r in i) t[r] = i[r];
                    return t;
                  }
                },
                {
                  key: "webkitOrNot",
                  value: function() {
                    return "string" ==
                      typeof document.documentElement.style.transform
                      ? "transform"
                      : "WebkitTransform";
                  }
                }
              ]
            ),
            e
          );
        })();
      (t.default = l), (e.exports = t.default);
    }
  ]);
});

/**
 * Simple, lightweight, usable local autocomplete library for modern browsers
 * Because there weren’t enough autocomplete scripts in the world? Because I’m completely insane and have NIH syndrome? Probably both. :P
 * @author Lea Verou http://leaverou.github.io/awesomplete
 * MIT license
 */

(function () {

var _ = function (input, o) {
	var me = this;
    
    // Keep track of number of instances for unique IDs
    Awesomplete.count = (Awesomplete.count || 0) + 1;
    this.count = Awesomplete.count;

	// Setup

	this.isOpened = false;

	this.input = $(input);
	this.input.setAttribute("autocomplete", "off");
	this.input.setAttribute("aria-owns", "awesomplete_list_" + this.count);
	this.input.setAttribute("role", "combobox");

	o = o || {};

	configure(this, {
		minChars: 2,
		maxItems: 10,
		autoFirst: false,
		data: _.DATA,
		filter: _.FILTER_CONTAINS,
		sort: o.sort === false ? false : _.SORT_BYLENGTH,
		item: _.ITEM,
		replace: _.REPLACE
	}, o);

	this.index = -1;

	// Create necessary elements

	this.container = $.create("div", {
		className: "awesomplete",
		around: input
	});

	this.ul = $.create("ul", {
		hidden: "hidden",
        role: "listbox",
        id: "awesomplete_list_" + this.count,
		inside: this.container
	});

	this.status = $.create("span", {
		className: "visually-hidden",
		role: "status",
		"aria-live": "assertive",
        "aria-atomic": true,
        inside: this.container,
        textContent: this.minChars != 0 ? ("Type " + this.minChars + " or more characters for results.") : "Begin typing for results."
	});

	// Bind events

	this._events = {
		input: {
			"input": this.evaluate.bind(this),
			"blur": this.close.bind(this, { reason: "blur" }),
			"keydown": function(evt) {
				var c = evt.keyCode;

				// If the dropdown `ul` is in view, then act on keydown for the following keys:
				// Enter / Esc / Up / Down
				if(me.opened) {
					if (c === 13 && me.selected) { // Enter
						evt.preventDefault();
						me.select();
					}
					else if (c === 27) { // Esc
						me.close({ reason: "esc" });
					}
					else if (c === 38 || c === 40) { // Down/Up arrow
						evt.preventDefault();
						me[c === 38? "previous" : "next"]();
					}
				}
			}
		},
		form: {
			"submit": this.close.bind(this, { reason: "submit" })
		},
		ul: {
			// Prevent the default mousedowm, which ensures the input is not blurred.
			// The actual selection will happen on click. This also ensures dragging the
			// cursor away from the list item will cancel the selection
			"mousedown": function(evt) {
				evt.preventDefault();
			},
			// The click event is fired even if the corresponding mousedown event has called preventDefault
			"click": function(evt) {
				var li = evt.target;

				if (li !== this) {

					while (li && !/li/i.test(li.nodeName)) {
						li = li.parentNode;
					}

					if (li && evt.button === 0) {  // Only select on left click
						evt.preventDefault();
						me.select(li, evt.target);
					}
				}
			}
		}
	};

	$.bind(this.input, this._events.input);
	$.bind(this.input.form, this._events.form);
	$.bind(this.ul, this._events.ul);

	if (this.input.hasAttribute("list")) {
		this.list = "#" + this.input.getAttribute("list");
		this.input.removeAttribute("list");
	}
	else {
		this.list = this.input.getAttribute("data-list") || o.list || [];
	}

	_.all.push(this);
};

_.prototype = {
	set list(list) {
		if (Array.isArray(list)) {
			this._list = list;
		}
		else if (typeof list === "string" && list.indexOf(",") > -1) {
				this._list = list.split(/\s*,\s*/);
		}
		else { // Element or CSS selector
			list = $(list);

			if (list && list.children) {
				var items = [];
				slice.apply(list.children).forEach(function (el) {
					if (!el.disabled) {
						var text = el.textContent.trim();
						var value = el.value || text;
						var label = el.label || text;
						if (value !== "") {
							items.push({ label: label, value: value });
						}
					}
				});
				this._list = items;
			}
		}

		if (document.activeElement === this.input) {
			this.evaluate();
		}
	},

	get selected() {
		return this.index > -1;
	},

	get opened() {
		return this.isOpened;
	},

	close: function (o) {
		if (!this.opened) {
			return;
		}

		this.ul.setAttribute("hidden", "");
		this.isOpened = false;
		this.index = -1;
    
		this.status.setAttribute("hidden", "");

		$.fire(this.input, "awesomplete-close", o || {});
	},

	open: function () {
		this.ul.removeAttribute("hidden");
		this.isOpened = true;
        
		this.status.removeAttribute("hidden");

		if (this.autoFirst && this.index === -1) {
			this.goto(0);
		}

		$.fire(this.input, "awesomplete-open");
	},

	destroy: function() {
		//remove events from the input and its form
		$.unbind(this.input, this._events.input);
		$.unbind(this.input.form, this._events.form);

		//move the input out of the awesomplete container and remove the container and its children
		var parentNode = this.container.parentNode;

		parentNode.insertBefore(this.input, this.container);
		parentNode.removeChild(this.container);

		//remove autocomplete and aria-autocomplete attributes
		this.input.removeAttribute("autocomplete");
		this.input.removeAttribute("aria-autocomplete");

		//remove this awesomeplete instance from the global array of instances
		var indexOfAwesomplete = _.all.indexOf(this);

		if (indexOfAwesomplete !== -1) {
			_.all.splice(indexOfAwesomplete, 1);
		}
	},

	next: function () {
		var count = this.ul.children.length;
		this.goto(this.index < count - 1 ? this.index + 1 : (count ? 0 : -1) );
	},

	previous: function () {
		var count = this.ul.children.length;
		var pos = this.index - 1;

		this.goto(this.selected && pos !== -1 ? pos : count - 1);
	},

	// Should not be used, highlights specific item without any checks!
	goto: function (i) {
		var lis = this.ul.children;

		if (this.selected) {
			lis[this.index].setAttribute("aria-selected", "false");
		}

		this.index = i;

		if (i > -1 && lis.length > 0) {
			lis[i].setAttribute("aria-selected", "true");
            
			this.status.textContent = lis[i].textContent + ", list item " + (i + 1) + " of " + lis.length;
            
            this.input.setAttribute("aria-activedescendant", this.ul.id + "_item_" + this.index);

			// scroll to highlighted element in case parent's height is fixed
			this.ul.scrollTop = lis[i].offsetTop - this.ul.clientHeight + lis[i].clientHeight;

			$.fire(this.input, "awesomplete-highlight", {
				text: this.suggestions[this.index]
			});
		}
	},

	select: function (selected, origin) {
		if (selected) {
			this.index = $.siblingIndex(selected);
		} else {
			selected = this.ul.children[this.index];
		}

		if (selected) {
			var suggestion = this.suggestions[this.index];

			var allowed = $.fire(this.input, "awesomplete-select", {
				text: suggestion,
				origin: origin || selected
			});

			if (allowed) {
				this.replace(suggestion);
				this.close({ reason: "select" });
				$.fire(this.input, "awesomplete-selectcomplete", {
					text: suggestion
				});
			}
		}
	},

	evaluate: function() {
		var me = this;
		var value = this.input.value;

		if (value.length >= this.minChars && this._list && this._list.length > 0) {
			this.index = -1;
			// Populate list with options that match
			this.ul.innerHTML = "";

			this.suggestions = this._list
				.map(function(item) {
					return new Suggestion(me.data(item, value));
				})
				.filter(function(item) {
					return me.filter(item, value);
				});

			if (this.sort !== false) {
				this.suggestions = this.suggestions.sort(this.sort);
			}

			this.suggestions = this.suggestions.slice(0, this.maxItems);

			this.suggestions.forEach(function(text, index) {
					me.ul.appendChild(me.item(text, value, index));
				});

			if (this.ul.children.length === 0) {
                
                this.status.textContent = "No results found";
                
				this.close({ reason: "nomatches" });
        
			} else {
				this.open();
        
                this.status.textContent = this.ul.children.length + " results found";
			}
		}
		else {
			this.close({ reason: "nomatches" });
            
                this.status.textContent = "No results found";
		}
	}
};

// Static methods/properties

_.all = [];

_.FILTER_CONTAINS = function (text, input) {
	return RegExp($.regExpEscape(input.trim()), "i").test(text);
};

_.FILTER_STARTSWITH = function (text, input) {
	return RegExp("^" + $.regExpEscape(input.trim()), "i").test(text);
};

_.SORT_BYLENGTH = function (a, b) {
	if (a.length !== b.length) {
		return a.length - b.length;
	}

	return a < b? -1 : 1;
};

_.ITEM = function (text, input, item_id) {
	var html = input.trim() === "" ? text : text.replace(RegExp($.regExpEscape(input.trim()), "gi"), "<mark>$&</mark>");
	return $.create("li", {
		innerHTML: html,
		"aria-selected": "false",
        "id": "awesomplete_list_" + this.count + "_item_" + item_id
	});
};

_.REPLACE = function (text) {
	this.input.value = text.value;
};

_.DATA = function (item/*, input*/) { return item; };

// Private functions

function Suggestion(data) {
	var o = Array.isArray(data)
	  ? { label: data[0], value: data[1] }
	  : typeof data === "object" && "label" in data && "value" in data ? data : { label: data, value: data };

	this.label = o.label || o.value;
	this.value = o.value;
}
Object.defineProperty(Suggestion.prototype = Object.create(String.prototype), "length", {
	get: function() { return this.label.length; }
});
Suggestion.prototype.toString = Suggestion.prototype.valueOf = function () {
	return "" + this.label;
};

function configure(instance, properties, o) {
	for (var i in properties) {
		var initial = properties[i],
		    attrValue = instance.input.getAttribute("data-" + i.toLowerCase());

		if (typeof initial === "number") {
			instance[i] = parseInt(attrValue);
		}
		else if (initial === false) { // Boolean options must be false by default anyway
			instance[i] = attrValue !== null;
		}
		else if (initial instanceof Function) {
			instance[i] = null;
		}
		else {
			instance[i] = attrValue;
		}

		if (!instance[i] && instance[i] !== 0) {
			instance[i] = (i in o)? o[i] : initial;
		}
	}
}

// Helpers

var slice = Array.prototype.slice;

function $(expr, con) {
	return typeof expr === "string"? (con || document).querySelector(expr) : expr || null;
}

function $$(expr, con) {
	return slice.call((con || document).querySelectorAll(expr));
}

$.create = function(tag, o) {
	var element = document.createElement(tag);

	for (var i in o) {
		var val = o[i];

		if (i === "inside") {
			$(val).appendChild(element);
		}
		else if (i === "around") {
			var ref = $(val);
			ref.parentNode.insertBefore(element, ref);
			element.appendChild(ref);
		}
		else if (i in element) {
			element[i] = val;
		}
		else {
			element.setAttribute(i, val);
		}
	}

	return element;
};

$.bind = function(element, o) {
	if (element) {
		for (var event in o) {
			var callback = o[event];

			event.split(/\s+/).forEach(function (event) {
				element.addEventListener(event, callback);
			});
		}
	}
};

$.unbind = function(element, o) {
	if (element) {
		for (var event in o) {
			var callback = o[event];

			event.split(/\s+/).forEach(function(event) {
				element.removeEventListener(event, callback);
			});
		}
	}
};

$.fire = function(target, type, properties) {
	var evt = document.createEvent("HTMLEvents");

	evt.initEvent(type, true, true );

	for (var j in properties) {
		evt[j] = properties[j];
	}

	return target.dispatchEvent(evt);
};

$.regExpEscape = function (s) {
	return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
};

$.siblingIndex = function (el) {
	/* eslint-disable no-cond-assign */
	for (var i = 0; el = el.previousElementSibling; i++);
	return i;
};

// Initialization

function init() {
	$$("input.awesomplete").forEach(function (input) {
		new _(input);
	});
}

// Make sure to export Awesomplete on self when in a browser
if (typeof self !== "undefined") {
	self.Awesomplete = _;
}

// Are we in a browser? Check for Document constructor
if (typeof Document !== "undefined") {
	// DOM already loaded?
	if (document.readyState !== "loading") {
		init();
	}
	else {
		// Wait for it
		document.addEventListener("DOMContentLoaded", init);
	}
}

_.$ = $;
_.$$ = $$;

// Expose Awesomplete as a CJS module
if (typeof module === "object" && module.exports) {
	module.exports = _;
}

return _;

}());

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
        console.log(windowWidth, headerHeight);
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

// Import header and footer into pages
const placeFixedElements = function() {
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
};

// Youtube videos

// Working order: Load data from Youtube API => insert data in vidBoxTemplate => use template to render element on page

// Load data from Youtube
const yt_api_key = "AIzaSyAXUGrOIVhDVVhldzfuPfTha2TDdolKMQk";
const videos = document.querySelectorAll(".youtube");
const mainEl = document.querySelector(".yt-container");

videos.forEach(video => {
  // Request data from Youtube
  let id = video.dataset.href.split("=");
  id = id[id.length - 1];
  const yt_endpoint = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${yt_api_key}`;

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log(this.readyState, this.status);
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.readyState, this.status);
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
  xhttp.open("GET", yt_endpoint, false);
  xhttp.send();
});

const createVidBox = (data, publicationDate, videoUrl) => {
  data = data.items[0];
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

("use strict");

// Import header and footer into pages
placeFixedElements();

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
