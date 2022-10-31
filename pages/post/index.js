import { getLocalStorage } from "../../scripts.js/localStorage.js";
import { getNewsId } from "../../scripts.js/requests.js";

const renderNew = async () => {
  const idNew = getLocalStorage();

  const contentPost = await getNewsId(idNew);

  const tagMain = document.querySelector("main");
  const tagHeader = document.querySelector("header");

  const divHeader = document.createElement("div");
  const title = document.createElement("h1");
  const subTitle = document.createElement("p");

  title.innerText = contentPost.title;
  subTitle.innerText = contentPost.description;

  divHeader.append(title, subTitle);
  tagHeader.append(divHeader);

  const divImg = document.createElement("div");

  const divContent = document.createElement("div");
  const contentP = document.createElement("p");

  contentP.innerText = contentPost.content;

  divImg.style.backgroundImage = `url(${contentPost.image})`;
  divImg.style.backgroundSize = "cover";

  divContent.append(contentP);

  tagMain.append(divImg, divContent);
};

renderNew();
