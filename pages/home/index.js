import { observer } from "../../scripts.js/observerScroll.js";
import { getNews } from "../../scripts.js/requests.js";

export const renderNews = async () => {
  const ulList = document.querySelector("#ulNews");
  ulList.innerHTML = "";

  const render = await getNews();

  render.forEach((element) => {
    createNew(element);
  });

  // if (JSON.parse(localStorage.getItem("category"))) {
  //   const Buttons = document.querySelectorAll(".btnGrey");
  //   console.log(btnFilter);
  //   let arr = Array.from(Buttons);

  //   const btnFilter = arr.find(
  //     (botao) =>
  //       botao.innerText === JSON.parse(localStorage.getItem("category"))
  //   );

  // btnFilter.click();
  // }

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

  const tagUl = document.querySelectorAll(".ulNews");

  btnsFilter.forEach((btn) => {
    btn.addEventListener("click", async () => {
      tagUl.innerHTML = "";

      if (btn.innerText === "Todos") {
        await renderNews(getNews());
      }

      const filteredPost = await filterPost(btn.innerText);
      console.log(filteredPost);
      console.log(btn.innerText);

      filteredPost.forEach((element) => {
        renderNews(element);
      });
    });
  });
}

async function filterPost(text) {
  let postApi = await getNews();

  const filteredPost = postApi.filter((post) => post.category === text);

  return filteredPost;
}
