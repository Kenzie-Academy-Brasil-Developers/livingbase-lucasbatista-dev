import { createNew } from "../pages/home/index.js";
import { getNewsperPage } from "./requests.js";

let page = 1;

const renderNewPosts = async () => {
  const dados = await getNewsperPage(page);

  if (page < 3) {
    dados.news.forEach((element) => {
      createNew(element);
    });
  }
  page++;
};

export const observer = new IntersectionObserver((entries) => {
  if (entries.some((entry) => entry.isIntersecting)) {
    renderNewPosts();
  }
});
