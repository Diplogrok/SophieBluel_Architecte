const container = document.getElementById("gallery");
const buttonFilter = document.getElementById("filter");
const buttonFilterChildren = buttonFilter.children;
/**
 * Récupération des travaux du back-end
 */
(async () => {
  const answerW = await fetch("http://localhost:5678/api/works");
  const work = await answerW.json();
  /**
   * Intégration des données (data) "works"
   * @param {getWork} function Permet de faire apparaître dynamiquement les travaux du back-end
   */
  function getWork(work) {
    for (let i = 0; i < work.length; i++) {
      container.innerHTML += `
        <figure>
        <img src="${work[i].imageUrl}">
        <figcaption>${work[i].title}</figcaption>
        </figure>`;
    }
  }
  /**
   * création dynamique du button de filtrage "tous"
   */
  const all = `
<button class="active">Tous</button>
`;
  buttonFilter.innerHTML = all;
  /**
   * Récupération des données "categories" du back-end
   */
  const answerC = await fetch("http://localhost:5678/api/categories");
  const category = await answerC.json();
  for (let j = 0; j < category.length; j++) {
    buttonFilter.innerHTML += `
        <button id="btn${work.id}" >${category[j].name}</button>
        `;
  }
  getWork(work);

  /**
   * Réalisation du filtre des travaux par catégories
   */
  for (let k = 0; k < buttonFilterChildren.length; k++) {
    buttonFilterChildren[k].addEventListener("click", function () {
      for (let l = 0; l < buttonFilterChildren.length; l++) {
        /**
         * Changement de du backround-color au click
         */
        buttonFilterChildren[l].classList.remove("active");
      }
      this.classList.add("active");
      /**
       * Affichage des travaux filtrer par catégories au click
       */
      const catFiltered = work.filter(function (filter) {
        return filter.categoryId === k;
      });
      document.getElementById("gallery").innerHTML = "";
      getWork(catFiltered);
    });
  }
  /**
   * Affichage de tous les travaux aux click sur le button "tous"
   */
  buttonFilterChildren[0].addEventListener("click", function () {
    getWork(work);
  });
})();
