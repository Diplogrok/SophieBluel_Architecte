const container = document.getElementById("gallery");
const buttonFilter = document.getElementById("filter");
const buttonFilterChildren = buttonFilter.children;
// Effectuer une requête pour récupérer les œuvres depuis l'API
const answerW = await fetch("http://localhost:5678/api/works");
const work = await answerW.json();
// Fonction pour afficher les œuvres dans le conteneur
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
// Effectuer une requête pour récupérer les catégories depuis l'API
const answerC = await fetch("http://localhost:5678/api/categories");
const category = await answerC.json();
// Ajouter des boutons de filtre pour chaque catégorie
for (let j = 0; j < category.length; j++) {
  buttonFilter.innerHTML += `
        <button id="btn${work.id}" >${category[j].name}</button>
        `;
}
// Afficher toutes les œuvres au chargement de la page
getWork(work);

// Ajouter des écouteurs d'événements pour les boutons de filtre
for (let k = 0; k < buttonFilterChildren.length; k++) {
  buttonFilterChildren[k].addEventListener("click", function () {
    // Supprimer la classe "active" de tous les boutons
    for (let l = 0; l < buttonFilterChildren.length; l++) {
      buttonFilterChildren[l].classList.remove("active");
    }
    // Ajouter la classe "active" au bouton cliqué
    this.classList.add("active");

    // Filtrer les œuvres en fonction de la catégorie sélectionnée
    const catFiltered = work.filter(function (filter) {
      return filter.categoryId === k;
    });
    // Vider le contenu du conteneur et afficher les œuvres filtrées
    document.getElementById("gallery").innerHTML = "";
    getWork(catFiltered);
  });
}
// Ajouter un écouteur d'événement pour le bouton "Tous"
buttonFilterChildren[0].addEventListener("click", function () {
  getWork(work);
});

// Sélectionner les éléments liés au mode édition
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
// Vérifier si un token est présent dans sessionStorage pour activer le mode édition
if (sessionStorage.getItem("token")) {
  enableEditMode();
}
// Ajouter un écouteur d'événement pour le bouton de déconnexion
logout.addEventListener("click", function () {
  sessionStorage.removeItem("token");
  window.location.href = "index.html";
  delete enableEditMode();
});

// Fonction asynchrone pour mettre à jour le contenu de la page
export async function updatePageContent() {
  const container = document.getElementById("gallery");
  // Vider le contenu du conteneur
  container.innerHTML = "";
  // Effectuer une requête pour récupérer les œuvres mises à jour depuis l'API
  const updatedAnswerW = await fetch("http://localhost:5678/api/works");
  const updatedWork = await updatedAnswerW.json();
  // Afficher les œuvres mises à jour dans le conteneur
  for (let i = 0; i < updatedWork.length; i++) {
    container.innerHTML += `
      <figure>
        <img src="${updatedWork[i].imageUrl}">
        <figcaption>${updatedWork[i].title}</figcaption>
      </figure>`;
  }
}
