const navMenuBtn = document.querySelector(".nav-menu");
const menuIcon = document.querySelector(".nav-menu i");
const navBar = document.querySelector("nav");

navMenuBtn.addEventListener("click", toggleNavMenu);

function toggleNavMenu() {
  if (navBar.style.transform === "translateY(-200%)") {
    console.log(navBar);
    navBar.style.transform = "translateY(0)";
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  } else {
    navBar.style.transform = "translateY(-200%)";
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  }
}
