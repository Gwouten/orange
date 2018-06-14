"use strict";function siema(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=document.querySelector("."+e);if(console.log(r.children.length),null!==r){var o=new Siema({selector:"."+e,duration:1e3,easing:"ease-in-out",perPage:{600:2,900:3,1200:4},loop:!0,draggable:n});if(Siema.prototype.createButtons=function(e){var t=document.createElement("button");t.classList.add("btn","btn--carousel","carousel__next",e+"__next"),r.appendChild(t);var n=document.createElement("button");n.classList.add("btn","btn--carousel","carousel__prev",e+"__prev"),r.appendChild(n)},Siema.prototype.bindButtons=function(e){var t=document.querySelector("."+e+"__prev"),n=document.querySelector("."+e+"__next");t.addEventListener("click",function(){return o.prev()}),n.addEventListener("click",function(){return o.next()})},o.createButtons(e),o.bindButtons(e),window.addEventListener("resize",function(){var e=!1;clearTimeout(e),e=setTimeout(function(){o.createButtons(),o.bindButtons()},250)}),t){var a=setInterval(function(){o.next()},5e3);r.addEventListener("mouseenter",function(){return clearInterval(a)}),r.addEventListener("mouseleave",function(){return a=setInterval(function(){o.next()},5e3)})}}}var header=new XMLHttpRequest;header.onreadystatechange=function(){4===this.readyState&&200===this.status&&(document.querySelector(".header").innerHTML=this.responseText)},header.open("GET","header.html",!0),header.send();var footer=new XMLHttpRequest;footer.onreadystatechange=function(){4===this.readyState&&200===this.status&&(document.querySelector(".footer").innerHTML=this.responseText)},footer.open("GET","footer.html",!0),footer.send();var phrases=["des communes","des provinces"],headline=new RotateSlogan(phrases,"rw",6e3);headline.rotatePhrases();var toTopElement=document.querySelector(".to-top__link");window.addEventListener("scroll",function(){var e=!1;clearTimeout(e),e=setTimeout(function(){var e=window.scrollY;e<200?toTopElement.classList.remove("to-top__link--visible"):e>=200&&toTopElement.classList.add("to-top__link--visible")},250)}),toTopElement.addEventListener("click",function(e){e.preventDefault(),scrollTo(0,1e3)});var inputCandidates=document.querySelector(".input__text");if(null!==inputCandidates){var inputCandidatesList=[{code:1e3,commune:"Bruxelles",candidats:["Olivier","Wouter"]},{code:1050,commune:"Ixelles",candidats:["Gilles","Christophe"]},{code:3e3,commune:"Leuven",candidats:["Etienne","Sandro"]}],candidates=function(e){new Awesomplete(inputCandidates,{list:e,minChars:1,maxItems:15})},flattenArray=function(e,t){return e.concat(t)},fullList=inputCandidatesList.map(function(e){return Object.keys(e).map(function(t){return e[t]}).reduce(flattenArray,[])}).reduce(flattenArray);candidates(fullList)}var setQuoteMargin=function(){var e=window.innerWidth,t=document.querySelector(".u-wrapper--followed-by-quote");if(null!==t)if(e>=1200)t.style.marginLeft=(e-1200)/2+100+"px";else{if(!(e<975))return;t.style.marginLeft="auto"}};setQuoteMargin(),window.addEventListener("resize",function(){var e=void 0;clearTimeout(e),e=setTimeout(setQuoteMargin(),250)});