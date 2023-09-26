const url = "http://localhost:5678/api/works";
console.log(url);
const container = document.getElementById("gallery");
console.log(container);

const getArticles = () => {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (work in data) {
        container.innerHTML += `
        <figure>
        <img src="${data[work].imageUrl} "${data[work].title}">
        <figcaption>${data[work].title}</figcaption>
    </figure>`;
      }
    });
};

getArticles();
