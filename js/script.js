//select elements in the dom
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const track = document.querySelector(".track");
let carouselWidth = document.querySelector(".slider-box").offsetWidth;

//get browser size and set variables for different screen sizes
const browserSize = window.outerWidth;
//render number of cards according to screen size
let itemsPerPage;
if (browserSize <= 699) {
  itemsPerPage = 3;
} else if (browserSize >= 700 && browserSize <= 1311) {
  itemsPerPage = 6;
} else if (browserSize >= 1312 && browserSize <= 1359) {
  itemsPerPage = 8;
} else if (browserSize >= 1360) {
  itemsPerPage = 12;
  //make buttons available
  next.style.display = "block";
  prev.style.display = "block";
  prev.disabled = true;
}
let url = `https://fitfactory.melisazor.com/wordpress/wp-json/wp/v2/articles?per_page=${itemsPerPage}&acf_format=standard`;

//call api
async function fetchPosts() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    createHTML(data);
  } catch (error) {
    console.log(error);
  }
}

fetchPosts();

//render HTML
function createHTML(data) {
  data.forEach((post) => {
    track.innerHTML += `
    <div class="slider-card-box">
                <a class="slider-card" href="../pages/article.html?id=${post.id}">
                  <div class="slider-card-img" style="background-image:url('${post.acf.featured_img}')"></div>
                  <div>
                    <span class="tags">#${post.acf.tag_1}</span>
                    <span class="tags">#${post.acf.tag_2}</span>
                  </div>
                  <h3 class="slider-card-info">
                    ${post.title.rendered}
                  </h3>
                </a>
              </div>`;
  });
}

//functionality for next and previous buttons desktop
let index = 0;

next.addEventListener("click", () => {
  index++;
  prev.disabled = false;
  track.style.transform = `translateX(-${index * carouselWidth}px)`;
  if (track.offsetWidth - index * carouselWidth < carouselWidth) {
    next.disabled = true;
  }
});

prev.addEventListener("click", () => {
  index--;
  next.disabled = false;
  track.style.transform = `translateX(-${index * carouselWidth}px)`;
  if (index === 0) {
    prev.disabled = true;
  }
});
