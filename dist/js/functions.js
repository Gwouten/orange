"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}(),RotateSlogan=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments[1],s=arguments[2];_classCallCheck(this,e),this.phrases=t,this.container=document.querySelector("#"+n),this.timing=s,this.interval=s/3*2,this.cycles=0,this.numberPhrases=this.phrases.length-1}return _createClass(e,[{key:"createPhrases",value:function(){var e=this;if(this.container){var t=document.createElement("span");t.style.animationDuration=this.timing+"ms",t.innerHTML=this.phrases[this.cycles],t.classList.add("slogan__header__word"),this.container.appendChild(t),this.cycles===this.numberPhrases?this.cycles=0:this.cycles++,setTimeout(function(){return e.container.removeChild(t)},this.timing)}}},{key:"rotatePhrases",value:function(){var e=this;this.createPhrases(),setInterval(function(){e.createPhrases()},this.interval)}}]),e}(),scrollTo=function(e,t){var n=document.scrollingElement||document.documentElement,s=n.scrollTop,r=e-s,a=+new Date,i=function(e,t,n,s){return(e/=s/2)<1?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)};!function c(){var o=+new Date-a;n.scrollTop=parseInt(i(o,s,r,t)),o<t?requestAnimationFrame(c):n.scrollTop=e}()};