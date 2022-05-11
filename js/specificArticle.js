const articleContainer = document.querySelector(".main-content");
const newTitle = document.querySelector("title");
const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get("id");
const url = `https://fitfactory.melisazor.com/wordpress/wp-json/wp/v2/articles?include=${id}&acf_format=standard`;

//for the popup
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");

async function getArticle() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    renderHTML(data[0]);
  } catch (error) {
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
                                        alt=""
                                        class="featured-img"
                                        src="${data.acf.featured_img}"
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
  const img = document.querySelector(".featured-img");
  img.addEventListener("click", () => {
    img.classList.add("modal-img");
    body.style.overflow = "hidden";
    overlay.classList.remove("hidden");
  });

  overlay.addEventListener("click", () => {
    img.classList.remove("modal-img");
    overlay.classList.add("hidden");
    body.style.overflow = "auto";
  });
}
