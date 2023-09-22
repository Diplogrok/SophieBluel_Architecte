const url = "http://localhost:5678/api/works";
console.log(url);
const container = document.getElementById("gallery");
console.log(container);

const getArticles = () => {
  fetch(url)
    .then(function (resizeTo) {
      return resizeTo.json();
    })
    .then(function (data) {
      console.log(data);
    });
};

getArticles();
