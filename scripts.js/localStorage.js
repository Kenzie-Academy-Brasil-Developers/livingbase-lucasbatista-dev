export function getLocalStorage() {
  const user = JSON.parse(localStorage.getItem("@newsId"));

  return user;
}
