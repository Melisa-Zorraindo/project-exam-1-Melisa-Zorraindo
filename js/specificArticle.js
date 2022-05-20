import { displayErrorMessage } from "./functions/errorMessage.js";
const articleContainer = document.querySelector(".main-content");
const newTitle = document.querySelector("title");
const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get("id");
const url = `https://fitfactory.melisazor.com/wordpress/wp-json/wp/v2/articles?include=${id}&acf_format=standard`;

//for the popup
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");

//for the scroll to top button
const scrollToTopBtn = document.querySelector(".to-top");

async function getArticle() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    renderHTML(data[0]);
  } catch (error) {
    displayErrorMessage(articleContainer);
    console.log(error);
  }
}

getArticle();

function renderHTML(data) {
  //update title
  newTitle.innerHTML = `FitFactory | ${data.title.rendered}`;

  //render HTML
  articleContainer.innerHTML = `<article>
                                    <h1>${data.acf.subtitle}</h1>
                                    <h2>${data.title.rendered}</h2>
                                    <img
                                        alt="${data.acf.featured_img.alt}"
                                        class="featured-img"
                                        src="${data.acf.featured_img.url}"
                                    />
                                    <div class="extra-info">
                                        <span class="tags">#${data.acf.tag_1}</span>
                                        <span class="tags">#${data.acf.tag_2}</span>
                                        <span class="tags reading-time"
                                        ><i class="fas fa-clock"></i> ${data.acf.reading_time}</span
                                        >
                                    </div>
                                    <p>
                                        ${data.content.rendered}
                                    </p>
                                </article>`;

  //open and close modal popup when img clicked
  const largerPic = document.querySelectorAll("figure img");
  largerPic.forEach((pic) => {
    pic.addEventListener("click", () => {
      enlargeImg(pic);
    });
    overlay.addEventListener("click", () => {
      removeOverlay(pic);
    });
  });

  function enlargeImg(picture) {
    picture.classList.add("modal-img");
    body.style.overflow = "hidden";
    overlay.classList.remove("hidden");
  }

  function removeOverlay(picture) {
    picture.classList.remove("modal-img");
    overlay.classList.add("hidden");
    body.style.overflow = "auto";
  }
}

//scroll to top button
function displayBtn() {
  if (scrollY >= 600) {
    scrollToTopBtn.style.display = "block";
  } else if (scrollY === 0) {
    scrollToTopBtn.style.display = "none";
  }
}

function scrollToTop() {
  const rootElement = document.documentElement;
  rootElement.scrollTo({
    top: 0,
    // behavior: "smooth",
  });
}

window.addEventListener("scroll", displayBtn);
scrollToTopBtn.addEventListener("click", scrollToTop);
