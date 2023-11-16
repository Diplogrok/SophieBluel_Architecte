const container = document.getElementById("gallery");
const buttonFilter = document.getElementById("filter");
const buttonFilterChildren = buttonFilter.children;
// Requête pour récupérer les travaux depuis l'API
const answerW = await fetch("http://localhost:5678/api/works");
const work = await answerW.json();
// Fonction pour afficher les travaux dans le conteneur
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
// Requête pour récupérer les catégories depuis l'API
const answerC = await fetch("http://localhost:5678/api/categories");
const category = await answerC.json();
// Ajoute des boutons de filtre pour chaque catégorie
for (let j = 0; j < category.length; j++) {
  buttonFilter.innerHTML += `
        <button id="btn${work.id}" >${category[j].name}</button>
        `;
}
// Affiche tous les travaux au chargement de la page
getWork(work);

// Ajouter des écouteurs d'événements pour les filtres
for (let k = 0; k < buttonFilterChildren.length; k++) {
  buttonFilterChildren[k].addEventListener("click", function () {
    // Supprime la classe "active" de tous les boutons
    for (let l = 0; l < buttonFilterChildren.length; l++) {
      buttonFilterChildren[l].classList.remove("active");
    }
    // Ajoute la classe "active" au bouton cliqué
    this.classList.add("active");

    // Filtre les travaux en fonction de la catégorie sélectionnée
    const catFiltered = work.filter(function (filter) {
      return filter.categoryId === k;
    });
    // Vide le contenu du conteneur et afficher les travaux filtrées
    document.getElementById("gallery").innerHTML = "";
    getWork(catFiltered);
  });
}
// Ajoute un écouteur d'événement pour le bouton "Tous"
buttonFilterChildren[0].addEventListener("click", function () {
  getWork(work);
});

// Sélectionne les éléments liés au mode édition
const editMode = document.getElementById("js-modal");
const login = document.getElementById("login");
const logout = document.getElementById("logout");
const editBand = document.getElementById("edit-band");
const portfolioTitle = document.getElementById("portfolio-title");

// Fonction pour activer le mode édition
function enableEditMode() {
  login.classList.add("hidden");
  logout.classList.remove("hidden");
  editMode.classList.remove("hidden");
  editBand.classList.remove("hidden");
  buttonFilter.classList.remove("filter");
  buttonFilter.classList.add("hidden");
  portfolioTitle.classList.add("portfolio-title");
}
// Vérifie si un token est présent dans sessionStorage pour activer le mode édition
if (sessionStorage.getItem("token")) {
  enableEditMode();
}
// Ajoute un écouteur d'événement pour le bouton de déconnexion
logout.addEventListener("click", function () {
  sessionStorage.removeItem("token");
  window.location.href = "index.html";
  delete enableEditMode();
});

// Fonction pour mettre à jour le contenu de la page
export async function updatePageContent() {
  const container = document.getElementById("gallery");
  // Vide le contenu du conteneur
  container.innerHTML = "";
  // Requête pour récupérer les travaux mises à jour depuis l'API
  const updatedAnswerW = await fetch("http://localhost:5678/api/works");
  const updatedWork = await updatedAnswerW.json();
  // Affiche les travaux mises à jour dans le conteneur
  for (let i = 0; i < updatedWork.length; i++) {
    container.innerHTML += `
      <figure>
        <img src="${updatedWork[i].imageUrl}">
        <figcaption>${updatedWork[i].title}</figcaption>
      </figure>`;
  }
}
