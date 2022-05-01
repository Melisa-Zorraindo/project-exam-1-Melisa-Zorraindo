const articleContainer = document.querySelector(".main-content");
const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get("id");
const url = `https://fitfactory.melisazor.com/wordpress/wp-json/wp/v2/articles?include=${id}&acf_format=standard/`;

console.log(url);

async function getArticle() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data[0]);
    renderHTML(data[0]);
  } catch (error) {
    console.log(error);
  }
}

getArticle();

function renderHTML(data) {
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
                                    <div class="comment-box">
                                        <span class="tags">comments</span>
                                        <textarea required></textarea>
                                        <button class="cta">submit</button>
                                    </div>
                                </article>`;
}
