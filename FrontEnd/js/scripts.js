const apiWork = "http://localhost:5678/api/works";
const apiCategory = "http://localhost:5678/api/categories";
const container = document.getElementById("gallery");
const buttonFilter = document.getElementById("filter");
const buttonFilterChildren = buttonFilter.children;
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


/*
buttonFilterChildren.forEach((color) => {
  color.addEventListener("click", () => {
    color.classList.add("active");
  });
});
/*
function nextCat() {
          buttonFilterChildren[i].classList.remove("active");
          if (i < buttonFilterChildren.length - i) {
            i++;
          } else {
            i = 0;
          }
          buttonFilterChildren[i].classList.add("active");
        }
        buttonFilterChildren.item(i).addEventListener("click", nextCat);


/*for (let filter of buttonFilterChildren) {
        filter.addEventListener("click", function () {
          let tag = this.id.name;
          console.log(tag);
        });
      }*/

/* filterButtons[1].addEventListener("click", function () {
  let objects = dataSaved.filter(
    (category) => category.category.name === "Objets"
  );
  objects.forEach((category) => console.log(category.title));
}); */

getCategory();
