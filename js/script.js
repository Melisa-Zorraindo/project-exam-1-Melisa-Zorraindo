//select elements in the dom
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const slider = document.querySelector(".slider");
const sliderNav = document.querySelector(".slider-nav");

//disable the prev button when page refresh
prevButton.disabled = true;

//next and prev buttons functionality
prevButton.addEventListener("click", () => {
  //enable next button
  nextButton.disabled = false;
  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );

  console.log(sliderIndex);
  if (sliderIndex === 1) {
    prevButton.disabled = true;
  }
  slider.style.setProperty("--slider-index", sliderIndex - 1);
});

//enable disable buttons when end of carousel
const browserSize = window.outerWidth;
nextButton.addEventListener("click", () => {
  //enable prev button
  prevButton.disabled = false;

  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );

  console.log(sliderIndex);
  if (browserSize <= 699 && sliderIndex === 10) {
    nextButton.disabled = true;
  } else if (browserSize > 699 && browserSize <= 999 && sliderIndex === 4) {
    nextButton.disabled = true;
  } else if (browserSize > 999 && browserSize <= 1199 && sliderIndex === 2) {
    nextButton.disabled = true;
  } else if (browserSize > 1199 && sliderIndex === 1) {
    nextButton.disabled = true;
  }
  slider.style.setProperty("--slider-index", sliderIndex + 1);
});

let url = `https://fitfactory.melisazor.com/wordpress/wp-json/wp/v2/articles?per_page=12&acf_format=standard`;

//call api
async function fetchPosts() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    createHTML(data);
    displayNav();
  } catch (error) {
    console.log(error);
  }
}

fetchPosts();

//render HTML
function createHTML(data) {
  slider.innerHTML = "";
  data.forEach((post) => {
    slider.innerHTML += `
              <a class="slider-card" href="../pages/article.html?id=${post.id}">
                <h3>${post.title.rendered}</h3>
                <img src="${post.acf.featured_img.url}" alt="${post.acf.featured_img.alt}" />
                <div>
                    <span class="tags">#${post.acf.tag_1}</span>
                    <span class="tags">#${post.acf.tag_2}</span>
                </div>
              </a>
            `;
  });
}

//loader
function simulateLayout() {
  slider.innerHTML = `<div class="layout-slider">
                        <div class="layout-slider-card">
                          <div class="layout-heading"></div>
                          <div class="layout-img"></div>
                          <div class="layout-tag-box">
                            <div class="layout-tags"></div>
                            <div class="layout-tags"></div>
                          </div>
                        </div>
                      </div>
                      <div class="layout-slider">
                        <div class="layout-slider-card">
                          <div class="layout-heading"></div>
                          <div class="layout-img"></div>
                          <div class="layout-tag-box">
                            <div class="layout-tags"></div>
                            <div class="layout-tags"></div>
                          </div>
                        </div>
                      </div>
                      <div class="layout-slider">
                        <div class="layout-slider-card">
                          <div class="layout-heading"></div>
                          <div class="layout-img"></div>
                          <div class="layout-tag-box">
                            <div class="layout-tags"></div>
                            <div class="layout-tags"></div>
                          </div>
                        </div>
                      </div>
                      <div class="layout-slider">
                        <div class="layout-slider-card">
                          <div class="layout-heading"></div>
                          <div class="layout-img"></div>
                          <div class="layout-tag-box">
                            <div class="layout-tags"></div>
                            <div class="layout-tags"></div>
                          </div>
                        </div>
                      </div>`;
}

simulateLayout();

//display navigation carousel when slider loaded
function displayNav() {
  sliderNav.style.display = "flex";
}
