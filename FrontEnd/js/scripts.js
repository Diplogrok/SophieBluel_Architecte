const apiWork = "http://localhost:5678/api/works";
const apiCategory = "http://localhost:5678/api/categories";
const container = document.getElementById("gallery");
let dataSaved = [];
const buttonFilter = document.getElementById("filter");
const buttonFilterChildren = buttonFilter.children;
console.log(buttonFilterChildren);


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

let buttonOne = "Tous";
let all = `
<button class="active">${buttonOne}</button>
`;
buttonFilter.innerHTML = all;

const getCategory = async () => {
  await fetch(apiCategory)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      dataSaved = data;
      console.log(data);

      for (category in data) {
        buttonFilter.innerHTML += `
        <button>${data[category].name}</button>
        `;
      }

      for (let i = 0; i < buttonFilterChildren.length; i++) {
        console.log(buttonFilterChildren[i]);
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
