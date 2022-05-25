//select elements in the dom
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const slider = document.querySelector(".slider");

prevButton.addEventListener("click", () => {
  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );
  if (sliderIndex === 0) {
    prev.disabled = true;
  }
  slider.style.setProperty("--slider-index", sliderIndex - 1);
});

const browserSize = window.outerWidth;
nextButton.addEventListener("click", () => {
  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );
  if (browserSize <= 699 && sliderIndex === 11) {
    next.disabled = true;
  } else if (browserSize <= 999 && sliderIndex === 5) {
    next.disabled = true;
  } else if (browserSize <= 1199 && sliderIndex === 3) {
    next.disabled = true;
  } else if (browserSize > 1199 && sliderIndex === 2) {
    next.disabled = true;
  }
  slider.style.setProperty("--slider-index", sliderIndex + 1);
});

/* document.addEventListener("click", (e) => {
  let handle;
  if (e.target.matches(".handle")) {
    handle = e.target;
  } else {
    handle = e.target.closest(".handle");
  }

  if (handle != null) {
    onHandleClick(handle);
  }
}); */

/* function onHandleClick(handle) {
  const slider = handle.closest(".container").querySelector(".slider");
  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );
  if (handle.classList.contains("left-handle")) {
    slider.style.setProperty("--slider-index", sliderIndex - 1);
  } else if (handle.classList.contains("right-handle")) {
    slider.style.setProperty("--slider-index", sliderIndex + 1);
  }
} */

let url = `https://fitfactory.melisazor.com/wordpress/wp-json/wp/v2/articles?per_page=12&acf_format=standard`;

//call api
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
