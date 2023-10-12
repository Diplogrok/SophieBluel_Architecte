const container = document.getElementById("gallery");
const buttonFilter = document.getElementById("filter");
const buttonFilterChildren = buttonFilter.children;
let all = `
<button class="active">Tous</button>
`;
buttonFilter.innerHTML = all;

(async () => {
  const answerW = await fetch("http://localhost:5678/api/works");
  const work = await answerW.json();
  function getWork(work) {
    for (let i = 0; i < work.length; i++) {
      container.innerHTML += `
        <figure>
        <img src="${work[i].imageUrl}">
        <figcaption>${work[i].title}</figcaption>
        </figure>`;
    }
  }
  const answerC = await fetch("http://localhost:5678/api/categories");
  const category = await answerC.json();
  for (let j = 0; j < category.length; j++) {
    buttonFilter.innerHTML += `
        <button>${category[j].name}</button>
        `;
  }
  getWork(work);
  buttonFilterChildren[0].addEventListener("click", function () {
    const allFiltered = work.filter(function (objects) {
      return objects.categoryId <= 3;
    });
    document.getElementById("gallery").innerHTML = "";
    getWork(allFiltered);
  });
  buttonFilterChildren[1].addEventListener("click", function () {
    const objectsFiltered = work.filter(function (objects) {
      return objects.categoryId === 1;
    });
    document.getElementById("gallery").innerHTML = "";
    getWork(objectsFiltered);
  });
  buttonFilterChildren[2].addEventListener("click", function () {
    const appartmentFiltered = work.filter(function (objects) {
      return objects.categoryId === 2;
    });
    document.getElementById("gallery").innerHTML = "";
    getWork(appartmentFiltered);
  });
  buttonFilterChildren[3].addEventListener("click", function () {
    const hotelFiltered = work.filter(function (objects) {
      return objects.categoryId === 3;
    });
    document.getElementById("gallery").innerHTML = "";
    getWork(hotelFiltered);
  });
})();
