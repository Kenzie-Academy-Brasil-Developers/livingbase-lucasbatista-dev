import { observer } from "../../scripts.js/observerScroll.js";
import { getNews } from "../../scripts.js/requests.js";

async function filterPost(text) {
  let filtered = await getNews();

  const filteredPost = filtered.news.filter((post) => post.category === text);

  return filteredPost;
}
export const renderNews = async () => {
  const ulList = document.querySelector("#ulNews");
  ulList.innerHTML = "";

  const render = await getNews();

  render.news.forEach((element) => {
    createNew(element);
  });

  const section = document.querySelector("section");
  const divObserver = document.createElement("div");
  divObserver.classList.add("observer");
  section.append(divObserver);

  observer.observe(divObserver);
};
await filter();
renderNews();

export function createNew(post) {
  const ulList = document.querySelector("#ulNews");
  const tagLi = document.createElement("li");
  const divImg = document.createElement("div");

  const divContent = document.createElement("div");
  const title = document.createElement("h3");
  const description = document.createElement("p");
  const openContent = document.createElement("a");

  divImg.classList = "divImgMain";
  divContent.classList = "gap16 flex column mTop25";
  title.classList = "font3";
  description.classList = "font4Regular colorGrey200";
  openContent.classList = "font4 colorBrand100 pointer";

  divImg.style.backgroundImage = `url(${post.image})`;
  divImg.style.backgroundSize = "cover";
  title.innerText = post.title;
  description.innerText = post.description;
  openContent.id = post.id;
  openContent.innerText = "Acessar conteúdo";

  openContent.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.setItem("@newsId", JSON.stringify(`${event.target.id}`));
    window.location.replace("../../pages/post/index.html");
  });

  tagLi.append(divImg, divContent);

  divContent.append(title, description, openContent);

  ulList.append(tagLi);
}
async function filter() {
  const btnsFilter = document.querySelectorAll(".btnGrey");

  const tagUl = document.querySelector("#ulNews");

  btnsFilter.forEach((btn) => {
    btn.addEventListener("click", async () => {
      tagUl.innerHTML = "";

      const filter = btn.innerText;

      if (filter === "Todos") {
        await renderNews(getNews());
      }
      const filteredPost = await filterPost(filter);

      filteredPost.forEach((element) => {
        createNew(element);
      });
    });
  });
}
