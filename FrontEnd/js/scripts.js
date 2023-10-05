const apiWork = "http://localhost:5678/api/works";
const apiCategory = "http://localhost:5678/api/categories";
const container = document.getElementById("gallery");
let dataSaved = [];

const getWorks = async () => {
  await fetch(apiWork)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      dataSaved = data;

      for (work in data) {
        container.innerHTML += `
        <figure>
        <img src="${data[work].imageUrl}">
        <figcaption>${data[work].title}</figcaption>
        </figure>`;
      }
    });
};

getWorks();

let filterOne = "Tous";
let filterTwo = "Objets";
let filterThree = "Appartements";
let filterFour = "Hôtels & restaurants";

let filter = `
<button class="active">${filterOne}</button>
<button class="button">${filterTwo}</button>
<button class="button">${filterThree}</button>
<button class="button">${filterFour}</button>
`;

let allFilter = document.getElementById("filter");
allFilter.innerHTML = filter;

/*

filterButtons[0].addEventListener("click", function () {
  console.log("Tous");
});

filterButtons[1].addEventListener("click", function () {
  let objects = dataSaved.filter(
    (category) => category.category.name === "Objets"
  );
  objects.forEach((category) => console.log(category.title));
});

filterButtons[2].addEventListener("click", function () {
  console.log("Appartements");
});

filterButtons[3].addEventListener("click", function () {
  console.log("Hôtel & restaurants");
});*/
