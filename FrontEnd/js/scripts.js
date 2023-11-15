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
         * Changement du backround-color au click
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

const editMode = document.getElementById("js-modal");
const login = document.getElementById("login");
const logout = document.getElementById("logout");
const editBand = document.getElementById("edit-band");
const portfolioTitle = document.getElementById("portfolio-title");

function enableEditMode() {
  login.classList.add("hidden");
  logout.classList.remove("hidden");
  editMode.classList.remove("hidden");
  editBand.classList.remove("hidden");
  buttonFilter.classList.remove("filter");
  buttonFilter.classList.add("hidden");
  portfolioTitle.classList.add("portfolio-title");
}
if (sessionStorage.getItem("token")) {
  enableEditMode();
}

logout.addEventListener("click", function () {
  sessionStorage.removeItem("token");
  window.location.href = "index.html";
  delete enableEditMode();
});

export async function updatePageContent() {
  const container = document.getElementById("gallery");
  // Réinitialise le contenu de la galerie
  container.innerHTML = "";

  // Récupère à nouveau les travaux depuis le backend
  const updatedAnswerW = await fetch("http://localhost:5678/api/works");
  const updatedWork = await updatedAnswerW.json();

  // Affiche les travaux mis à jour
  for (let i = 0; i < updatedWork.length; i++) {
    container.innerHTML += `
      <figure>
        <img src="${updatedWork[i].imageUrl}">
        <figcaption>${updatedWork[i].title}</figcaption>
      </figure>`;
  }
}
