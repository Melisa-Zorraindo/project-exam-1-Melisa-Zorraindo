//select elements in the dom
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let track = document.querySelector(".track");
let carouselWidth = document.querySelector(".carousel-container").offsetWidth;

let index = 0;

//call api
const url =
  "https://fitfactory.melisazor.com/wordpress/wp-json/wp/v2/articles?per_page=12&acf_format=standard";

async function fetchPosts() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    createHTML(data);
  } catch (error) {
    console.log(error);
  }
}

fetchPosts();

function createHTML(data) {
  data.forEach((post) => {
    track.innerHTML += `
    <div class="card-container">
                <a class="card" href="#">
                  <div class="img"></div>
                  <div>
                    <span class="tags">#${post.acf.tag_1}</span>
                    <span class="tags">#${post.acf.tag_2}</span>
                  </div>
                  <h3 class="info">
                    ${post.title.rendered}
                  </h3>
                </a>
              </div>`;
  });
}

window.addEventListener("resize", () => {
  carouselWidth = document.querySelector(".carousel-container").offsetWidth;
});

next.addEventListener("click", () => {
  index++;
  prev.style.display = "block";
  track.style.transform = `translateX(-${index * carouselWidth}px)`;
  if (track.offsetWidth - index * carouselWidth < carouselWidth) {
    next.style.display = "none";
  }
});

prev.addEventListener("click", () => {
  index--;
  next.style.display = "block";
  track.style.transform = `translateX(-${index * carouselWidth}px)`;
  if (index === 0) {
    prev.style.display = "none";
  }
});
