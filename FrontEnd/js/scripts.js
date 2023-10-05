const apiWork = "http://localhost:5678/api/works";
const apiCategory = "http://localhost:5678/api/categories";
const container = document.getElementById("gallery");
let dataSaved = [];

const getWork = async () => {
  await fetch(apiWork)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      dataSaved = data;
      console.log(data);

      for (work in data) {
        container.innerHTML += `
        <figure>
        <img src="${data[work].imageUrl}">
        <figcaption>${data[work].title}</figcaption>
        </figure>`;
      }
    });
};

getWork();

let filterOne = "Tous";
let filter = `
<button class="active">${filterOne}</button>
`;
let allFilter = document.getElementById("filter");
allFilter.innerHTML = filter;

const getCategory = async () => {
  await fetch(apiCategory)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      dataSaved = data;
      console.log(data);

      for (category in data) {
        allFilter.innerHTML += `
        <button class="button">${data[category].name}</button>
        `;
      }
    });
};

getCategory();

/* filterButtons[1].addEventListener("click", function () {
  let objects = dataSaved.filter(
    (category) => category.category.name === "Objets"
  );
  objects.forEach((category) => console.log(category.title));
}); */
