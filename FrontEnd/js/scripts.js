const container = document.getElementById("gallery");
const filterButtons = document.getElementById("filter").children;
const url = "http://localhost:5678/api/works";

const getWorks = () => {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.table(data);

      for (work in data) {
        container.innerHTML += `
        <figure>
        <img src="${data[work].imageUrl}">
        <figcaption>${data[work].title}</figcaption>
        </figure>`;
      }

      filterButtons[0].addEventListener("click", function () {
        console.log("Tous");

        /*let All = fetch(url).categoryId.filter(function (value) {
          if ((value === 1, 2, 3)) {
            return true;
          }
        });*/
      });

      filterButtons[1].addEventListener("click", function () {
        console.log("Objets");

        let objects = url.filter((category) => category.categoryId === 1);
        objects.forEach((category) => console.log(category.title));
      });

      filterButtons[2].addEventListener("click", function () {
        console.log("Appartements");
      });

      filterButtons[3].addEventListener("click", function () {
        console.log("Hôtel & restaurants");
      });
    });
};

getWorks();
