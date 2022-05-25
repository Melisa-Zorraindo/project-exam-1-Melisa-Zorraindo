const navMenuBtn = document.querySelector(".open-menu");
const closeMenuBtn = document.querySelector(".close-menu");
// const menuIcon = document.querySelector(".open-menu i");
const navBar = document.querySelector("nav");

navMenuBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);

/* function toggleNavMenu() {
  if (navBar.classList.contains("nav-mobile")) {
    navBar.classList.remove("nav-mobile");
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  } else {
    navBar.classList.add("nav-mobile");
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  }
} */

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
