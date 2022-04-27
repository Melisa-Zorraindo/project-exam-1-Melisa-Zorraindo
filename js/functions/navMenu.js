const navMenuBtn = document.querySelector(".nav-menu");
const menuIcon = document.querySelector(".nav-menu i");
const navBar = document.querySelector("nav");

navMenuBtn.addEventListener("click", toggleNavMenu);

function toggleNavMenu() {
  if (navBar.style.transform === "translateY(-200%)") {
    navBar.style.transform = "translateY(0)";
    menuIcon.classList.remove("fa-caret-down");
    menuIcon.classList.add("fa-caret-up");
  } else {
    navBar.style.transform = "translateY(-200%)";
    menuIcon.classList.remove("fa-caret-up");
    menuIcon.classList.add("fa-caret-down");
  }
}
