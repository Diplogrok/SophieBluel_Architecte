const container = document.getElementById("gallery");
const buttonFilter = document.getElementById("filter");
const buttonFilterChildren = buttonFilter.children;

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
  const all = `
<button class="active">Tous</button>
`;
  buttonFilter.innerHTML = all;

  const answerC = await fetch("http://localhost:5678/api/categories");
  const category = await answerC.json();
  for (let j = 0; j < category.length; j++) {
    buttonFilter.innerHTML += `
        <button id="btn${work.id}" >${category[j].name}</button>
        `;
  }
  getWork(work);

  for (let k = 0; k < buttonFilterChildren.length; k++) {
    buttonFilterChildren[k].addEventListener("click", function () {
      for (let l = 0; l < buttonFilterChildren.length; l++) {
        buttonFilterChildren[l].classList.remove("active");
      }
      this.classList.add("active");
    });
    buttonFilterChildren[k].addEventListener("click", function () {
      const catFiltered = work.filter(function (filter) {
        return filter.categoryId === k;
      });
      document.getElementById("gallery").innerHTML = "";
      getWork(catFiltered);
    });
  }
  buttonFilterChildren[0].addEventListener("click", function () {
    getWork(work);
  });
})();
