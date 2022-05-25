const navMenuBtn = document.querySelector(".open-menu");
const closeMenuBtn = document.querySelector(".close-menu");
const navBar = document.querySelector("nav");

navMenuBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);

function openMenu() {
  navBar.style.transform = "translateY(0)";
  closeMenuBtn.style.display = "block";
  navMenuBtn.style.display = "none";
}

function closeMenu() {
  navBar.style.transform = "translateY(-200%)";
  navMenuBtn.style.display = "block";
  closeMenuBtn.style.display = "none";
}
