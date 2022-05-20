const navMenuBtn = document.querySelector(".nav-menu");
const menuIcon = document.querySelector(".nav-menu i");
const navBar = document.querySelector("nav");

navMenuBtn.addEventListener("click", toggleNavMenu);

function toggleNavMenu() {
  if (navBar.classList.contains("nav-mobile")) {
    navBar.classList.remove("nav-mobile");
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  } else {
    navBar.classList.add("nav-mobile");
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  }
}
