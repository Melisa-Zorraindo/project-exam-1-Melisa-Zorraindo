import { createListOfPosts } from "./createListOfPosts.js";

export function filterByTag(data) {
  const tagSelector = document.querySelector(".tag-selector");
  tagSelector.addEventListener("change", () => {
    if (tagSelector.value === "all-tags") {
      createListOfPosts(data);
    } else {
      const filteredPosts = data.filter((post) => {
        return (
          tagSelector.value === post.acf.tag_1 ||
          tagSelector.value === post.acf.tag_2
        );
      });

      createListOfPosts(filteredPosts);
    }
  });
}
