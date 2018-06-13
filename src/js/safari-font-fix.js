document.addEventListener("DOMContentLoaded", function() {
  var is_chrome = navigator.userAgent.indexOf("Chrome") > -1;
  var is_explorer = navigator.userAgent.indexOf("MSIE") > -1;
  var is_firefox = navigator.userAgent.indexOf("Firefox") > -1;
  var is_safari = navigator.userAgent.indexOf("Safari") > -1;
  var is_opera = navigator.userAgent.indexOf("Presto") > -1;
  var is_mac = navigator.userAgent.indexOf("Mac OS") != -1;
  var is_windows = !is_mac;

  if (is_chrome && is_safari) {
    is_safari = false;
  }

  if (is_safari || is_windows) {
    document.querySelector("body").style.webkitTextStroke = "0.5px";
  }
});
