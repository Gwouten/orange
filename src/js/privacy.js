// if not yet visited, add class 'slideInFromBottom'
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split("; ");
  if (!ca.includes("cdh-accepted=true")) {
    document.querySelector(".privacy").classList.add("slideInFromBottom");
  } else {
    return;
  }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

getCookie("cname");

// Set cookie
document.querySelector(".privacy__btn").addEventListener("click", function() {
  setCookie("cdh-accepted", true, 365);
  document.querySelector(".privacy").classList.remove("slideInFromBottom");
});
