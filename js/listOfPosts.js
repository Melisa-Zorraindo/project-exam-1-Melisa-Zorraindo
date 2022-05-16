const content = document.querySelector(".article-box");
const loadMoreBtn = document.querySelector(".cta");

//hide the button while the api is being called
loadMoreBtn.style.display = "none";

//call api
let url =
  "https://fitfactory.melisazor.com/wordpress/wp-json/wp/v2/articles?acf_format=standard";

async function fetchPosts() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    createHTML(data);

    //filter posts by tag
    const tagSelector = document.querySelector(".tag-selector");
    tagSelector.addEventListener("change", () => {
      if (tagSelector.value === "all-tags") {
        createHTML(data);
      } else {
        const filteredPosts = data.filter((post) => {
          return (
            tagSelector.value === post.acf.tag_1 ||
            tagSelector.value === post.acf.tag_2
          );
        });

        createHTML(filteredPosts);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

//call api when load more btn clicked
loadMoreBtn.addEventListener("click", () => {
  url =
    "https://fitfactory.melisazor.com/wordpress/wp-json/wp/v2/articles?per_page=100&acf_format=standard";
  fetchPosts();
});

fetchPosts();

function createHTML(data) {
  content.innerHTML = "";

  //display button
  loadMoreBtn.style.display = "block";

  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      content.innerHTML = `<article class="ft-post-article">
                            <a class="ft-post-box" href="../pages/article.html?id=${data[0].id}">
                            <h3 class="card-heading">${data[0].title.rendered}</h3>
                                <div>
                                    <img
                                        class="ft-post-img"
                                        src="${data[0].acf.featured_img}"
                                    />
                                </div>
                                <div>
                                    <div>
                                        <span class="tags">#${data[0].acf.tag_1}</span>
                                        <span class="tags">#${data[0].acf.tag_2}</span>
                                    </div>
                                    <p>
                                        ${data[0].acf.brief}
                                    </p>
                                </div>
                                </a>
                             </article>`;
    } else if (i < data.length) {
      content.innerHTML += `<article class="post-card">
                              <a href="../pages/article.html?id=${data[i].id}">
                              <h3 class="card-heading">${data[i].title.rendered}</h3>
                                    <div>
                                        <img
                                        class="post-img"
                                        src="${data[i].acf.featured_img}"
                                        />
                                    </div>
                                    <div>
                                        <div>
                                          <span class="tags">#${data[i].acf.tag_1}</span>
                                          <span class="tags">#${data[i].acf.tag_2}</span>
                                        </div>
                                        <p>
                                        ${data[i].acf.brief}
                                        </p>
                                    </div>
                                    </a>
                               </article>
                               `;
    }

    //hide button when end of posts
    if (i === 13) {
      loadMoreBtn.style.display = "none";
    }
  }
}
