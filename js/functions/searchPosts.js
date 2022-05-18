import { createListOfPosts } from "./createListOfPosts.js";

export function searchPosts(posts) {
  const searchBar = document.querySelector("input[type='search']");

  searchBar.addEventListener("keyup", () => {
    const searchedValue = searchBar.value.trim().toLowerCase();

    const matchedPosts = posts.filter((post) => {
      if (post.title.rendered.toLowerCase().includes(searchedValue)) {
        return true;
      }
    });

    createListOfPosts(matchedPosts);
  });
}
