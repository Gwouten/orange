"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function siema(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=document.querySelector("."+e);if(null!==n){var s=new Siema({selector:"."+e,duration:1e3,easing:"ease-in-out",perPage:{600:2,900:3,1200:4},loop:!0,draggable:i});if(Siema.prototype.createButtons=function(e){var t=document.createElement("button");t.classList.add("btn","btn--carousel","carousel__next",e+"__next"),n.appendChild(t);var i=document.createElement("button");i.classList.add("btn","btn--carousel","carousel__prev",e+"__prev"),n.appendChild(i)},Siema.prototype.bindButtons=function(e){var t=document.querySelector("."+e+"__prev"),i=document.querySelector("."+e+"__next");t.addEventListener("click",function(){return s.prev()}),i.addEventListener("click",function(){return s.next()})},s.createButtons(e),s.bindButtons(e),window.addEventListener("resize",function(){s.createButtons(),s.bindButtons()}),t){var r=setInterval(function(){s.next()},5e3);n.addEventListener("mouseenter",function(){return clearInterval(r)}),n.addEventListener("mouseleave",function(){return r=setInterval(function(){s.next()},5e3)})}}}var _createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e,t){"object"==("undefined"==typeof exports?"undefined":_typeof(exports))&&"object"==("undefined"==typeof module?"undefined":_typeof(module))?module.exports=t():"function"==typeof define&&define.amd?define("Siema",[],t):"object"==("undefined"==typeof exports?"undefined":_typeof(exports))?exports.Siema=t():e.Siema=t()}("undefined"!=typeof self?self:void 0,function(){return function(e){function t(n){if(i[n])return i[n].exports;var s=i[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var i={};return t.m=e,t.c=i,t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,i){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(e){return void 0===e?"undefined":_typeof(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":void 0===e?"undefined":_typeof(e)},r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),o=function(){function e(t){var i=this;if(n(this,e),this.config=e.mergeSettings(t),this.selector="string"==typeof this.config.selector?document.querySelector(this.config.selector):this.config.selector,null===this.selector)throw new Error("Something wrong with your selector 😭");this.resolveSlidesNumber(),this.selectorWidth=this.selector.offsetWidth,this.innerElements=[].slice.call(this.selector.children),this.currentSlide=this.config.loop?this.config.startIndex%this.innerElements.length:Math.max(0,Math.min(this.config.startIndex,this.innerElements.length-this.perPage)),this.transformProperty=e.webkitOrNot(),["resizeHandler","touchstartHandler","touchendHandler","touchmoveHandler","mousedownHandler","mouseupHandler","mouseleaveHandler","mousemoveHandler","clickHandler"].forEach(function(e){i[e]=i[e].bind(i)}),this.init()}return r(e,[{key:"attachEvents",value:function(){window.addEventListener("resize",this.resizeHandler),this.config.draggable&&(this.pointerDown=!1,this.drag={startX:0,endX:0,startY:0,letItGo:null,preventClick:!1},this.selector.addEventListener("touchstart",this.touchstartHandler),this.selector.addEventListener("touchend",this.touchendHandler),this.selector.addEventListener("touchmove",this.touchmoveHandler),this.selector.addEventListener("mousedown",this.mousedownHandler),this.selector.addEventListener("mouseup",this.mouseupHandler),this.selector.addEventListener("mouseleave",this.mouseleaveHandler),this.selector.addEventListener("mousemove",this.mousemoveHandler),this.selector.addEventListener("click",this.clickHandler))}},{key:"detachEvents",value:function(){window.removeEventListener("resize",this.resizeHandler),this.selector.removeEventListener("touchstart",this.touchstartHandler),this.selector.removeEventListener("touchend",this.touchendHandler),this.selector.removeEventListener("touchmove",this.touchmoveHandler),this.selector.removeEventListener("mousedown",this.mousedownHandler),this.selector.removeEventListener("mouseup",this.mouseupHandler),this.selector.removeEventListener("mouseleave",this.mouseleaveHandler),this.selector.removeEventListener("mousemove",this.mousemoveHandler),this.selector.removeEventListener("click",this.clickHandler)}},{key:"init",value:function(){this.attachEvents(),this.selector.style.overflow="hidden",this.selector.style.direction=this.config.rtl?"rtl":"ltr",this.buildSliderFrame(),this.config.onInit.call(this)}},{key:"buildSliderFrame",value:function(){var e=this.selectorWidth/this.perPage,t=this.config.loop?this.innerElements.length+2*this.perPage:this.innerElements.length;this.sliderFrame=document.createElement("div"),this.sliderFrame.style.width=e*t+"px",this.enableTransition(),this.config.draggable&&(this.selector.style.cursor="-webkit-grab");var i=document.createDocumentFragment();if(this.config.loop)for(var n=this.innerElements.length-this.perPage;n<this.innerElements.length;n++){var s=this.buildSliderFrameItem(this.innerElements[n].cloneNode(!0));i.appendChild(s)}for(var r=0;r<this.innerElements.length;r++){var o=this.buildSliderFrameItem(this.innerElements[r]);i.appendChild(o)}if(this.config.loop)for(var a=0;a<this.perPage;a++){var l=this.buildSliderFrameItem(this.innerElements[a].cloneNode(!0));i.appendChild(l)}this.sliderFrame.appendChild(i),this.selector.innerHTML="",this.selector.appendChild(this.sliderFrame),this.slideToCurrent()}},{key:"buildSliderFrameItem",value:function(e){var t=document.createElement("div");return t.style.cssFloat=this.config.rtl?"right":"left",t.style.float=this.config.rtl?"right":"left",t.style.width=(this.config.loop?100/(this.innerElements.length+2*this.perPage):100/this.innerElements.length)+"%",t.appendChild(e),t}},{key:"resolveSlidesNumber",value:function(){if("number"==typeof this.config.perPage)this.perPage=this.config.perPage;else if("object"===s(this.config.perPage)){this.perPage=1;for(var e in this.config.perPage)window.innerWidth>=e&&(this.perPage=this.config.perPage[e])}}},{key:"prev",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments[1];if(!(this.innerElements.length<=this.perPage)){var i=this.currentSlide;if(this.config.loop)if(this.currentSlide-e<0){this.disableTransition();var n=this.currentSlide+this.innerElements.length,s=n+this.perPage,r=(this.config.rtl?1:-1)*s*(this.selectorWidth/this.perPage),o=this.config.draggable?this.drag.endX-this.drag.startX:0;this.sliderFrame.style[this.transformProperty]="translate3d("+(r+o)+"px, 0, 0)",this.currentSlide=n-e}else this.currentSlide=this.currentSlide-e;else this.currentSlide=Math.max(this.currentSlide-e,0);i!==this.currentSlide&&(this.slideToCurrent(this.config.loop),this.config.onChange.call(this),t&&t.call(this))}}},{key:"next",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments[1];if(!(this.innerElements.length<=this.perPage)){var i=this.currentSlide;if(this.config.loop)if(this.currentSlide+e>this.innerElements.length-this.perPage){this.disableTransition();var n=this.currentSlide-this.innerElements.length,s=n+this.perPage,r=(this.config.rtl?1:-1)*s*(this.selectorWidth/this.perPage),o=this.config.draggable?this.drag.endX-this.drag.startX:0;this.sliderFrame.style[this.transformProperty]="translate3d("+(r+o)+"px, 0, 0)",this.currentSlide=n+e}else this.currentSlide=this.currentSlide+e;else this.currentSlide=Math.min(this.currentSlide+e,this.innerElements.length-this.perPage);i!==this.currentSlide&&(this.slideToCurrent(this.config.loop),this.config.onChange.call(this),t&&t.call(this))}}},{key:"disableTransition",value:function(){this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing}},{key:"enableTransition",value:function(){this.sliderFrame.style.webkitTransition="all "+this.config.duration+"ms "+this.config.easing,this.sliderFrame.style.transition="all "+this.config.duration+"ms "+this.config.easing}},{key:"goTo",value:function(e,t){if(!(this.innerElements.length<=this.perPage)){var i=this.currentSlide;this.currentSlide=this.config.loop?e%this.innerElements.length:Math.min(Math.max(e,0),this.innerElements.length-this.perPage),i!==this.currentSlide&&(this.slideToCurrent(),this.config.onChange.call(this),t&&t.call(this))}}},{key:"slideToCurrent",value:function(e){var t=this,i=this.config.loop?this.currentSlide+this.perPage:this.currentSlide,n=(this.config.rtl?1:-1)*i*(this.selectorWidth/this.perPage);e?requestAnimationFrame(function(){requestAnimationFrame(function(){t.enableTransition(),t.sliderFrame.style[t.transformProperty]="translate3d("+n+"px, 0, 0)"})}):this.sliderFrame.style[this.transformProperty]="translate3d("+n+"px, 0, 0)"}},{key:"updateAfterDrag",value:function(){var e=(this.config.rtl?-1:1)*(this.drag.endX-this.drag.startX),t=Math.abs(e),i=this.config.multipleDrag?Math.ceil(t/(this.selectorWidth/this.perPage)):1,n=e>0&&this.currentSlide-i<0,s=e<0&&this.currentSlide+i>this.innerElements.length-this.perPage;e>0&&t>this.config.threshold&&this.innerElements.length>this.perPage?this.prev(i):e<0&&t>this.config.threshold&&this.innerElements.length>this.perPage&&this.next(i),this.slideToCurrent(n||s)}},{key:"resizeHandler",value:function(){this.resolveSlidesNumber(),this.currentSlide+this.perPage>this.innerElements.length&&(this.currentSlide=this.innerElements.length<=this.perPage?0:this.innerElements.length-this.perPage),this.selectorWidth=this.selector.offsetWidth,this.buildSliderFrame()}},{key:"clearDrag",value:function(){this.drag={startX:0,endX:0,startY:0,letItGo:null,preventClick:this.drag.preventClick}}},{key:"touchstartHandler",value:function(e){-1!==["TEXTAREA","OPTION","INPUT","SELECT"].indexOf(e.target.nodeName)||(e.stopPropagation(),this.pointerDown=!0,this.drag.startX=e.touches[0].pageX,this.drag.startY=e.touches[0].pageY)}},{key:"touchendHandler",value:function(e){e.stopPropagation(),this.pointerDown=!1,this.enableTransition(),this.drag.endX&&this.updateAfterDrag(),this.clearDrag()}},{key:"touchmoveHandler",value:function(e){if(e.stopPropagation(),null===this.drag.letItGo&&(this.drag.letItGo=Math.abs(this.drag.startY-e.touches[0].pageY)<Math.abs(this.drag.startX-e.touches[0].pageX)),this.pointerDown&&this.drag.letItGo){e.preventDefault(),this.drag.endX=e.touches[0].pageX,this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing;var t=(this.config.loop?this.currentSlide+this.perPage:this.currentSlide)*(this.selectorWidth/this.perPage),i=this.drag.endX-this.drag.startX,n=this.config.rtl?t+i:t-i;this.sliderFrame.style[this.transformProperty]="translate3d("+(this.config.rtl?1:-1)*n+"px, 0, 0)"}}},{key:"mousedownHandler",value:function(e){-1!==["TEXTAREA","OPTION","INPUT","SELECT"].indexOf(e.target.nodeName)||(e.preventDefault(),e.stopPropagation(),this.pointerDown=!0,this.drag.startX=e.pageX)}},{key:"mouseupHandler",value:function(e){e.stopPropagation(),this.pointerDown=!1,this.selector.style.cursor="-webkit-grab",this.enableTransition(),this.drag.endX&&this.updateAfterDrag(),this.clearDrag()}},{key:"mousemoveHandler",value:function(e){if(e.preventDefault(),this.pointerDown){"A"===e.target.nodeName&&(this.drag.preventClick=!0),this.drag.endX=e.pageX,this.selector.style.cursor="-webkit-grabbing",this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing;var t=(this.config.loop?this.currentSlide+this.perPage:this.currentSlide)*(this.selectorWidth/this.perPage),i=this.drag.endX-this.drag.startX,n=this.config.rtl?t+i:t-i;this.sliderFrame.style[this.transformProperty]="translate3d("+(this.config.rtl?1:-1)*n+"px, 0, 0)"}}},{key:"mouseleaveHandler",value:function(e){this.pointerDown&&(this.pointerDown=!1,this.selector.style.cursor="-webkit-grab",this.drag.endX=e.pageX,this.drag.preventClick=!1,this.enableTransition(),this.updateAfterDrag(),this.clearDrag())}},{key:"clickHandler",value:function(e){this.drag.preventClick&&e.preventDefault(),this.drag.preventClick=!1}},{key:"remove",value:function(e,t){if(e<0||e>=this.innerElements.length)throw new Error("Item to remove doesn't exist 😭");var i=e<this.currentSlide,n=this.currentSlide+this.perPage-1===e;(i||n)&&this.currentSlide--,this.innerElements.splice(e,1),this.buildSliderFrame(),t&&t.call(this)}},{key:"insert",value:function(e,t,i){if(t<0||t>this.innerElements.length+1)throw new Error("Unable to inset it at this index 😭");if(-1!==this.innerElements.indexOf(e))throw new Error("The same item in a carousel? Really? Nope 😭");var n=t<=this.currentSlide>0&&this.innerElements.length;this.currentSlide=n?this.currentSlide+1:this.currentSlide,this.innerElements.splice(t,0,e),this.buildSliderFrame(),i&&i.call(this)}},{key:"prepend",value:function(e,t){this.insert(e,0),t&&t.call(this)}},{key:"append",value:function(e,t){this.insert(e,this.innerElements.length+1),t&&t.call(this)}},{key:"destroy",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments[1];if(this.detachEvents(),this.selector.style.cursor="auto",e){for(var i=document.createDocumentFragment(),n=0;n<this.innerElements.length;n++)i.appendChild(this.innerElements[n]);this.selector.innerHTML="",this.selector.appendChild(i),this.selector.removeAttribute("style")}t&&t.call(this)}}],[{key:"mergeSettings",value:function(e){var t={selector:".siema",duration:200,easing:"ease-out",perPage:1,startIndex:0,draggable:!0,multipleDrag:!0,threshold:20,loop:!1,rtl:!1,onInit:function(){},onChange:function(){}},i=e;for(var n in i)t[n]=i[n];return t}},{key:"webkitOrNot",value:function(){return"string"==typeof document.documentElement.style.transform?"transform":"WebkitTransform"}}]),e}();t.default=o,e.exports=t.default}])}),function(){function e(e){var t=Array.isArray(e)?{label:e[0],value:e[1]}:"object"===(void 0===e?"undefined":_typeof(e))&&"label"in e&&"value"in e?e:{label:e,value:e};this.label=t.label||t.value,this.value=t.value}function t(e,t,i){for(var n in t){var s=t[n],r=e.input.getAttribute("data-"+n.toLowerCase());"number"==typeof s?e[n]=parseInt(r):!1===s?e[n]=null!==r:s instanceof Function?e[n]=null:e[n]=r,e[n]||0===e[n]||(e[n]=n in i?i[n]:s)}}function i(e,t){return"string"==typeof e?(t||document).querySelector(e):e||null}function n(e,t){return o.call((t||document).querySelectorAll(e))}function s(){n("input.awesomplete").forEach(function(e){new r(e)})}var r=function e(n,s){var r=this;Awesomplete.count=(Awesomplete.count||0)+1,this.count=Awesomplete.count,this.isOpened=!1,this.input=i(n),this.input.setAttribute("autocomplete","off"),this.input.setAttribute("aria-owns","awesomplete_list_"+this.count),this.input.setAttribute("role","combobox"),s=s||{},t(this,{minChars:2,maxItems:10,autoFirst:!1,data:e.DATA,filter:e.FILTER_CONTAINS,sort:!1!==s.sort&&e.SORT_BYLENGTH,item:e.ITEM,replace:e.REPLACE},s),this.index=-1,this.container=i.create("div",{className:"awesomplete",around:n}),this.ul=i.create("ul",{hidden:"hidden",role:"listbox",id:"awesomplete_list_"+this.count,inside:this.container}),this.status=i.create("span",{className:"visually-hidden",role:"status","aria-live":"assertive","aria-atomic":!0,inside:this.container,textContent:0!=this.minChars?"Type "+this.minChars+" or more characters for results.":"Begin typing for results."}),this._events={input:{input:this.evaluate.bind(this),blur:this.close.bind(this,{reason:"blur"}),keydown:function(e){var t=e.keyCode;r.opened&&(13===t&&r.selected?(e.preventDefault(),r.select()):27===t?r.close({reason:"esc"}):38!==t&&40!==t||(e.preventDefault(),r[38===t?"previous":"next"]()))}},form:{submit:this.close.bind(this,{reason:"submit"})},ul:{mousedown:function(e){e.preventDefault()},click:function(e){var t=e.target;if(t!==this){for(;t&&!/li/i.test(t.nodeName);)t=t.parentNode;t&&0===e.button&&(e.preventDefault(),r.select(t,e.target))}}}},i.bind(this.input,this._events.input),i.bind(this.input.form,this._events.form),i.bind(this.ul,this._events.ul),this.input.hasAttribute("list")?(this.list="#"+this.input.getAttribute("list"),this.input.removeAttribute("list")):this.list=this.input.getAttribute("data-list")||s.list||[],e.all.push(this)};r.prototype={set list(e){if(Array.isArray(e))this._list=e;else if("string"==typeof e&&e.indexOf(",")>-1)this._list=e.split(/\s*,\s*/);else if((e=i(e))&&e.children){var t=[];o.apply(e.children).forEach(function(e){if(!e.disabled){var i=e.textContent.trim(),n=e.value||i,s=e.label||i;""!==n&&t.push({label:s,value:n})}}),this._list=t}document.activeElement===this.input&&this.evaluate()},get selected(){return this.index>-1},get opened(){return this.isOpened},close:function(e){this.opened&&(this.ul.setAttribute("hidden",""),this.isOpened=!1,this.index=-1,this.status.setAttribute("hidden",""),i.fire(this.input,"awesomplete-close",e||{}))},open:function(){this.ul.removeAttribute("hidden"),this.isOpened=!0,this.status.removeAttribute("hidden"),this.autoFirst&&-1===this.index&&this.goto(0),i.fire(this.input,"awesomplete-open")},destroy:function(){i.unbind(this.input,this._events.input),i.unbind(this.input.form,this._events.form);var e=this.container.parentNode;e.insertBefore(this.input,this.container),e.removeChild(this.container),this.input.removeAttribute("autocomplete"),this.input.removeAttribute("aria-autocomplete");var t=r.all.indexOf(this);-1!==t&&r.all.splice(t,1)},next:function(){var e=this.ul.children.length;this.goto(this.index<e-1?this.index+1:e?0:-1)},previous:function(){var e=this.ul.children.length,t=this.index-1;this.goto(this.selected&&-1!==t?t:e-1)},goto:function(e){var t=this.ul.children;this.selected&&t[this.index].setAttribute("aria-selected","false"),this.index=e,e>-1&&t.length>0&&(t[e].setAttribute("aria-selected","true"),this.status.textContent=t[e].textContent+", list item "+(e+1)+" of "+t.length,this.input.setAttribute("aria-activedescendant",this.ul.id+"_item_"+this.index),this.ul.scrollTop=t[e].offsetTop-this.ul.clientHeight+t[e].clientHeight,i.fire(this.input,"awesomplete-highlight",{text:this.suggestions[this.index]}))},select:function(e,t){if(e?this.index=i.siblingIndex(e):e=this.ul.children[this.index],e){var n=this.suggestions[this.index];i.fire(this.input,"awesomplete-select",{text:n,origin:t||e})&&(this.replace(n),this.close({reason:"select"}),i.fire(this.input,"awesomplete-selectcomplete",{text:n}))}},evaluate:function(){var t=this,i=this.input.value;i.length>=this.minChars&&this._list&&this._list.length>0?(this.index=-1,this.ul.innerHTML="",this.suggestions=this._list.map(function(n){return new e(t.data(n,i))}).filter(function(e){return t.filter(e,i)}),!1!==this.sort&&(this.suggestions=this.suggestions.sort(this.sort)),this.suggestions=this.suggestions.slice(0,this.maxItems),this.suggestions.forEach(function(e,n){t.ul.appendChild(t.item(e,i,n))}),0===this.ul.children.length?(this.status.textContent="No results found",this.close({reason:"nomatches"})):(this.open(),this.status.textContent=this.ul.children.length+" results found")):(this.close({reason:"nomatches"}),this.status.textContent="No results found")}},r.all=[],r.FILTER_CONTAINS=function(e,t){return RegExp(i.regExpEscape(t.trim()),"i").test(e)},r.FILTER_STARTSWITH=function(e,t){return RegExp("^"+i.regExpEscape(t.trim()),"i").test(e)},r.SORT_BYLENGTH=function(e,t){return e.length!==t.length?e.length-t.length:e<t?-1:1},r.ITEM=function(e,t,n){var s=""===t.trim()?e:e.replace(RegExp(i.regExpEscape(t.trim()),"gi"),"<mark>$&</mark>");return i.create("li",{innerHTML:s,"aria-selected":"false",id:"awesomplete_list_"+this.count+"_item_"+n})},r.REPLACE=function(e){this.input.value=e.value},r.DATA=function(e){return e},Object.defineProperty(e.prototype=Object.create(String.prototype),"length",{get:function(){return this.label.length}}),e.prototype.toString=e.prototype.valueOf=function(){return""+this.label};var o=Array.prototype.slice;i.create=function(e,t){var n=document.createElement(e);for(var s in t){var r=t[s];if("inside"===s)i(r).appendChild(n);else if("around"===s){var o=i(r);o.parentNode.insertBefore(n,o),n.appendChild(o)}else s in n?n[s]=r:n.setAttribute(s,r)}return n},i.bind=function(e,t){if(e)for(var i in t){var n=t[i];i.split(/\s+/).forEach(function(t){e.addEventListener(t,n)})}},i.unbind=function(e,t){if(e)for(var i in t){var n=t[i];i.split(/\s+/).forEach(function(t){e.removeEventListener(t,n)})}},i.fire=function(e,t,i){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0);for(var s in i)n[s]=i[s];return e.dispatchEvent(n)},i.regExpEscape=function(e){return e.replace(/[-\\^$*+?.()|[\]{}]/g,"\\$&")},i.siblingIndex=function(e){for(var t=0;e=e.previousElementSibling;t++);return t},"undefined"!=typeof self&&(self.Awesomplete=r),"undefined"!=typeof Document&&("loading"!==document.readyState?s():document.addEventListener("DOMContentLoaded",s)),r.$=i,r.$$=n,"object"===("undefined"==typeof module?"undefined":_typeof(module))&&module.exports&&(module.exports=r)}();var RotateSlogan=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],i=arguments[1],n=arguments[2];_classCallCheck(this,e),this.phrases=t,this.container=document.querySelector("#"+i),this.timing=n,this.interval=n/3*2,this.cycles=0,this.numberPhrases=this.phrases.length-1}return _createClass(e,[{key:"createPhrases",value:function(){var e=this;if(this.container){var t=document.createElement("span");t.style.animationDuration=this.timing+"ms",t.innerHTML=this.phrases[this.cycles],t.classList.add("slogan__header__word"),this.container.appendChild(t),this.cycles===this.numberPhrases?this.cycles=0:this.cycles++,setTimeout(function(){return e.container.removeChild(t)},this.timing)}}},{key:"rotatePhrases",value:function(){var e=this;this.createPhrases(),setInterval(function(){e.createPhrases()},this.interval)}}]),e}(),scrollTo=function(e,t){var i=document.scrollingElement,n=i.scrollTop,s=e-n,r=+new Date,o=function(e,t,i,n){return(e/=n/2)<1?i/2*e*e+t:(e--,-i/2*(e*(e-2)-1)+t)};!function a(){var l=+new Date-r;i.scrollTop=parseInt(o(l,n,s,t)),l<t?requestAnimationFrame(a):i.scrollTop=e}()},setThemeLinks=function(){var e=document.querySelectorAll(".carousel--themes a");null!==e&&e.forEach(function(e){e.addEventListener("click",function(e){e.preventDefault();var t=-160;windowWidth<975&&(t=100);var i=e.target.href.split("#")[1],n=document.querySelector("#"+i),s=n.offsetTop-n.scrollTop+n.clientTop-t;scrollTo(s,1e3)})})},scrollToTop=function(e){window.addEventListener("scroll",function(){var t=!1;clearTimeout(t),t=setTimeout(function(){var t=window.scrollY;t<200?e.classList.remove("to-top__link--visible"):t>=200&&e.classList.add("to-top__link--visible")},250)})},setCurrentPageIndicator=function(){var e=document.querySelector(".header__interior-links ul"),t=window.location.href.split("/"),i=function(t){e.children[t].children[0].classList.add("current")};switch(t[t.length-1]){case"":case"index.html":i(0);break;case"communales.html":i(1);break;case"provinces.html":i(2);break;case"candidats.html":i(3);break;case"le-cdh.html":i(4);break;case"videos.html":i(5);break;case"themes.html":i(6)}},getVideoInfo=function(e,t){var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var t=JSON.parse(this.responseText),i=t.items[0],n=new Date(i.snippet.publishedAt),s=n.getDate()+"-"+(n.getMonth()+1)+"-"+n.getFullYear(),r=[];e.classList.forEach(function(e){return r.push(e)}),r.includes("youtube-hero")?(document.querySelector(".video-hero__video-container").innerHTML='<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+i.id+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',document.querySelector(".video-hero__header").innerText=i.snippet.title,document.querySelector(".video-hero__date").innerText="Ajouté le "+s,document.querySelector(".video-hero__description").innerText=i.snippet.description):(e.style.background="url("+(void 0!==i.snippet.thumbnails.standard?i.snippet.thumbnails.standard.url:i.snippet.thumbnails.high.url)+") center center no-repeat",e.style.backgroundSize="cover",e.addEventListener("click",function(i){var n=document.querySelector(".video-box");null!==n&&mainEl.removeChild(n),createVidBox(t,s,e.dataset.href),document.querySelector(".video-box").addEventListener("click",function(e){document.querySelector(".video-box").classList.add("video-box--close"),setTimeout(function(){mainEl.removeChild(document.querySelector(".video-box"))},1e3)})}))}},i.open("GET",t,!0),i.send()},createVidBox=function(e,t,i){var n='\n  \x3c!-- close button --\x3e\n  <button class="video-box__close">X</button>\n\n  \x3c!-- video --\x3e\n  <div class="video-box__video">\n    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+(e=e.items[0]).id+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>\n  </div>\n\n  \x3c!-- controls --\x3e\n  <div class="video-box__controls">\n\n    \x3c!-- header --\x3e\n    <div class="video-box__header">\n      <h1 class="video-box__header__title">'+e.snippet.title+'</h1>\n      <div class="video-box__header__stats">\n        <h2 class="video-box__header__stats__views">\n          <img src="assets/img/views.svg" alt="" class="video-box__header__stats__icon video-box__header__stats__icon--large"> '+e.statistics.viewCount+'\n        </h2>\n        <h6 class="video-box__header__stats__likes '+(void 0==e.statistics.likeCount?"u-hidden":"")+'">\n          <img src="assets/img/thumbs-up.svg" alt="" class="video-box__header__stats__icon"> '+e.statistics.likeCount+'\n        </h6>\n        <h6 class="video-box__header__stats__dislikes '+(void 0==e.statistics.likeCount?"u-hidden":"")+'">\n          <img src="assets/img/thumbs-down.svg" alt="" class="video-box__header__stats__icon"> '+e.statistics.dislikeCount+'\n        </h6>\n      </div>\n    </div>\n\n    \x3c!-- meta --\x3e\n    <div class="video-box__meta">\n    <div class="video-box__meta__subscribe"></div>\n      <div class="video-box__meta__share">\n        <a href="http://www.facebook.com/sharer.php?u='+i+'" class="video-box__meta__share__button video-box__meta__share__button--facebook">Share on Facebook</a>\n        <a href="https://twitter.com/intent/tweet?text='+e.snippet.title+"&url="+i+'" class="video-box__meta__share__button video-box__meta__share__button--twitter">Share on Twitter</a>\n      </div>\n    </div>\n\n    \x3c!-- Description --\x3e\n    <div class="video-box__description">\n      <p class="video-box__description__date">Ajoutée le '+t+'\n      </p>\n      <p class="video-box__description__description">'+e.snippet.description+"</p>\n    </div>\n  </div>\n  ",s=document.createElement("div");s.classList.add("video-box"),s.innerHTML=n,mainEl.appendChild(s);var r=document.querySelector(".video-box__meta__subscribe"),o={channel:"ocentre",layout:"full"};gapi.ytsubscribe.render(r,o)};siema("video-list__list",!1,!1);var yt_api_key="AIzaSyAXUGrOIVhDVVhldzfuPfTha2TDdolKMQk",videos=document.querySelectorAll(".youtube"),mainEl=document.querySelector(".yt-container");videos.forEach(function(e){var t=e.dataset.href.split("=");t=t[t.length-1],getVideoInfo(e,"https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id="+t+"&key="+yt_api_key)}),setCurrentPageIndicator();var phrases=["des communes","des provinces"],headline=new RotateSlogan(phrases,"rw",6e3);headline.rotatePhrases();var toTopElement=document.querySelector(".to-top__link");scrollToTop(toTopElement),toTopElement.addEventListener("click",function(e){e.preventDefault(),scrollTo(0,1e3)}),setThemeLinks();var inputCandidatesElement=document.querySelector(".input__text");if(null!==inputCandidatesElement){var inputCandidatesList=[],candidates=function(e){new Awesomplete(inputCandidatesElement,{list:e,minChars:2,maxItems:30})},request=new XMLHttpRequest;request.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=this.responseText.trim().slice(1,-2).trim().split(",").forEach(function(e){e=e.trim().slice(1,-1)});console.log(e),candidates(e)}},request.open("GET","http://dev2.lescommunales2018.be/generate.php",!0),request.send()}var windowWidth=window.innerWidth,getMargin=function(e){return(e-1e3)/2},setQuoteHeight=function(e,t){e.parentNode.children[0].style.paddingTop=t+"px"},setQuoteMargin=function(){var e=document.querySelector(".u-wrapper--followed-by-quote");if(null!==e)if(windowWidth>=1200)e.style.marginLeft=getMargin(windowWidth)+"px";else{if(!(windowWidth<975))return;e.style.marginLeft="auto"}},setTextblockSize=function(e){if(windowWidth>=1200)e.style.marginRight=getMargin(windowWidth)+"px";else if(1200>windowWidth&&windowWidth>=975){var t=document.querySelector(".candidate-body__textblock").offsetWidth;e.style.width=t+"px"}setQuoteHeight(e,e.offsetHeight)},onLoad=function(){var e=document.querySelector(".quoteblock + .candidate-body__textblock");null!==e&&(windowWidth>=975?(setQuoteMargin(),setTextblockSize(e)):(e.style.cssText="",setQuoteHeight(e,e.offsetHeight)))};document.addEventListener("DOMContentLoaded",onLoad()),window.addEventListener("resize",function(){windowWidth=window.innerWidth;var e=void 0;clearTimeout(e),e=setTimeout(onLoad(),250)});