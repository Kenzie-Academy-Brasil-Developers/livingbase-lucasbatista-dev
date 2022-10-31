const baseUrl = "https://m2-api-living.herokuapp.com/news";

export async function getNews() {
  try {
    const request = await fetch(
      "https://m2-api-living.herokuapp.com/news?page=0",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await request.json();

    localStorage.setItem("post", JSON.stringify(response));

    return response.news;
  } catch (err) {
    console.log(err);
  }
}

export async function getNewsId(idNew) {
  try {
    const request = await fetch(`${baseUrl}/${idNew}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getNewsperPage(page) {
  try {
    const request = await fetch(`${baseUrl}?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await request.json();

    localStorage.setItem("@allPosts", JSON.stringify(response));

    return response;
  } catch (err) {
    console.log(err);
  }
}
