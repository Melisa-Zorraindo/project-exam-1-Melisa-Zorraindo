//select elements in the dom
const slider = document.querySelector(".slider-cards-box");
const btnRight = document.querySelector(".right-arrow");
const btnLeft = document.querySelector(".left-arrow");

//call api
const url =
  "https://fitfactory.melisazor.com/wordpress/wp-json/wp/v2/articles?per_page=20&acf_format=standard";

async function fetchPosts() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    createHTML(data);

    btnRight.addEventListener("click", () => {
      slider.innerHTML = "";
      createHTML(data);
    });
  } catch (error) {
    console.log(error);
  }
}

fetchPosts();

// let postNumber = 0;

function createHTML(data) {
  for (let i = 0; i < data.length; i++) {
    // console.log(data[postNumber].id);
    slider.innerHTML += `
      <div class="slider-card">
        <div>
          <img class="slider-img" src="${data[i].acf.featured_img}" />
        </div>
        <span class="tags">#${data[i].acf.tag_1}</span>
        <span class="tags">#${data[i].acf.tag_2}</span>
        <h3>${data[i].title.rendered}</h3>
        <p class="slider-paragraph">
        ${data[i].acf.brief}
        </p>
      </div>
    `;

    // postNumber++;
    //get browser size and set variables for different screen sizes
    const browserSize = window.outerWidth;
    //render number of cards according to screen size

    if (browserSize <= 599 && i === 0) {
      break;
    } else if (browserSize > 599 && browserSize <= 999 && i === 1) {
      break;
    } else if (browserSize > 999 && browserSize <= 1199 && i === 2) {
      break;
    } else if (browserSize > 1200 && i === 3) {
      break;
    }
  }
}
