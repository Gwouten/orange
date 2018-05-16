// Rotate slogan
const communes = [`au c&oelig;ur des communes`, `au c&oelig;ur des provinces`];
const rwContainer = document.querySelector("#rw");

const createCommunes = function(array) {
  let randomIndex = Math.floor(Math.random() * communes.length);
  const rwElement = document.createElement("span");

  rwElement.innerHTML = `${communes[randomIndex]}`;
  rwElement.classList.add("slogan__header__word");

  rwContainer.appendChild(rwElement);
  setTimeout(function() {
    rwContainer.removeChild(rwElement);
  }, 3000);
};

createCommunes(communes);
const rotateCommunes = setInterval(function() {
  createCommunes(communes);
}, 2000);
