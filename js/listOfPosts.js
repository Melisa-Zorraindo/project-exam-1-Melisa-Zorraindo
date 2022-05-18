import { searchPosts } from "./functions/searchPosts.js";
import { filterByTag } from "./functions/filterByTag.js";
import { createListOfPosts } from "./functions/createListOfPosts.js";

//hide the button while the api is being called
const loadMoreBtn = document.querySelector(".cta");
loadMoreBtn.style.display = "none";

//call api
let url =
  "https://fitfactory.melisazor.com/wordpress/wp-json/wp/v2/articles?per_page=100&acf_format=standard";

async function fetchPosts() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    createListOfPosts(data);

    //filter posts by tag
    filterByTag(data);

    //search posts in search bar
    searchPosts(data);
  } catch (error) {
    console.log(error);
  }
}

//display more posts when button clicked
loadMoreBtn.addEventListener("click", () => {
  const moreArticles = document.querySelectorAll(".post-card");
  moreArticles.forEach((post) => {
    post.classList.remove("hidden");
  });
  loadMoreBtn.style.display = "none";
});

fetchPosts();
