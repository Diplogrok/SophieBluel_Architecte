import { updatePageContent } from "./scripts.js";

function displayErrorMessage(message) {
  let spanErrorMessage = document.getElementById("error");

  if (!spanErrorMessage) {
    // Si non, créer un nouvel élément "span" et lui attribuer l'ID "error"
    // Puis l'ajouter au formulaire avec la classe "popup"
    let form = document.querySelector(".popup");
    spanErrorMessage = document.createElement("span");
    spanErrorMessage.id = "error";

    form.append(spanErrorMessage);
  }
  spanErrorMessage.innerText = message;
}
let modal = null;

// Fonction pour ouvrir la fenêtre modale
const openModal = function (e) {
  // Vérifier si e et e.preventDefault sont définis
  if (e && e.preventDefault) {
    // Annuler l'événement par défaut si défini
    e.preventDefault();
  }

  modal = document.querySelector(e.target.getAttribute("href"));
  // Afficher la modal
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", true);
  // Ajouter des écouteurs d'événements pour fermer la modal
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};
const container = document.querySelector(".modal-gallery");

// Récupérer les œuvres depuis l'API
const answerW = await fetch("http://localhost:5678/api/works");
const work = await answerW.json();
// Fonction pour afficher les œuvres dans la galerie modale
function getWork() {
  for (let i = 0; i < work.length; i++) {
    container.innerHTML += `
        <figure class ="modal-figure">
        <img id="${work[i].id}"src="${work[i].imageUrl}" width="78px">
        <i id="${work[i].id}" class="fa-solid fa-trash-can"></i>
        </figure>`;
  }
}
getWork();

const trash = document.querySelectorAll(".fa-trash-can");
// Ajouter des écouteurs d'événements pour la suppression d'une œuvre
for (let i = 0; i < trash.length; i++) {
  trash[i].addEventListener("click", function () {
    fetch(`http://localhost:5678/api/works/${work[i].id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          container.removeChild(trash[i].parentNode);
        } else {
          console.error("Erreur lors de la suppression de l'élément");
        }
      })
      .catch((error) => {
        const errorMessage = `Erreur : ${error.message}`;
        console.error(errorMessage);
        displayErrorMessage(errorMessage);
      });
  });
}

// Fonction pour fermer la modal
const closeModal = function (e) {
  e.preventDefault();
  if (modal === null) return;
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", true);
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
  updatePageContent(); // Mettre à jour le contenu de la page
};

// Fonction pour arrêter la propagation de l'événement
const stopPropagation = function (e) {
  e.stopPropagation();
};
// Ajouter des écouteurs d'événements pour ouvrir la modal au clic sur les boutons
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

// Ajouter un écouteur d'événements pour fermer la modal en appuyant sur la touche Escape
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

// Deuxième boite modal
let modalBis = null;

const openModalBis = function (e) {
  e.preventDefault();
  modalBis = document.querySelector(e.target.getAttribute("href"));
  modalBis.style.display = null;
  modalBis.removeAttribute("aria-hidden");
  modalBis.setAttribute("aria-modal", true);
  modalBis.addEventListener("click", closeModalBis);
  modalBis
    .querySelector(".js-modalBis-close")
    .addEventListener("click", closeModalBis);
  modalBis
    .querySelector(".js-modalBis-stop")
    .addEventListener("click", stopPropagation);

  // Ajoutez un nouvel événement pour le bouton de retour
  modalBis
    .querySelector(".js-modal-return")
    .addEventListener("click", closeModalBis);
};

const closeModalBis = function () {
  if (modalBis === null) return;
  modalBis.style.display = "none";
  modalBis.setAttribute("aria-hidden", true);
  modalBis.removeAttribute("aria-modal");
  modalBis.removeEventListener("click", closeModalBis);
  modalBis
    .querySelector(".js-modalBis-close")
    .removeEventListener("click", closeModalBis);
  modalBis
    .querySelector(".js-modalBis-stop")
    .removeEventListener("click", stopPropagation);
  modalBis
    .querySelector(".js-modal-return")
    .removeEventListener("click", closeModalBis);
  modalBis = null;
  updatePageContent();
};

document.querySelectorAll(".js-modalBis").forEach((a) => {
  a.addEventListener("click", openModalBis);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModalBis(e);
  }
});

document.querySelectorAll(".js-modal-return").forEach((returnButton) => {
  // Ajouter un écouteur d'événements pour le clic sur chaque bouton de retour
  returnButton.addEventListener("click", function (e) {
    e.preventDefault();
    closeModalBis();
    // Ouvrir la modal originale (modal) en utilisant la fonction openModal
    // avec l'attribut href équivalent à "#modal"
    openModal({ target: { getAttribute: () => "#modal" } });
  });
});

const selectImage = document.querySelector(".img-selected");
const inputFile = document.querySelector("#image");
const imgArea = document.querySelector(".img-area");
const selectCategory = document.getElementById("category");
const submitButton = document.getElementById("submitBtn");
// Ajouter un écouteur d'événements pour le clic sur "Ajouter photo"
selectImage.addEventListener("click", function (e) {
  e.preventDefault();
  inputFile.click(); // Clic sur le champ de fichier invisible
});

let image = null;
// Ajouter un écouteur d'événements pour le changement du fichier sélectionné
inputFile.addEventListener("change", function () {
  image = this.files[0]; // Récupérer le fichier image sélectionné
  updateSubmitButton();

  if (image) {
    const reader = new FileReader();
    // Fonction à exécuter lorsque le chargement de l'image est terminé
    reader.onload = () => {
      const imgUrl = reader.result;
      const img = document.createElement("img");
      img.src = imgUrl;
      imgArea.appendChild(img);
      selectImage.classList.add("background");
      selectImage.classList.remove("img-selected");
    };
    // Lire le contenu de l'image en tant que URL de données
    reader.readAsDataURL(image);
  }
});

function updateSubmitButton() {
  const title = document.getElementById("title").value;
  const category = selectCategory.value;

  // Vérification de l'image, du titre et de la catégorie
  const conditions =
    image && image.type.startsWith("image/") && title.length >= 5 && category;

  // Mettre à jour la classe du bouton en fonction des conditions
  if (conditions) {
    submitButton.classList.add("input-modal-enabled");
    submitButton.classList.remove("input-modal-disabled");
  } else {
    submitButton.classList.remove("input-modal-enabled");
    submitButton.classList.add("input-modal-disabled");
  }
}

// Ajouter des gestionnaires d'événements pour les changements dans le titre et la catégorie
document.getElementById("title").addEventListener("input", function () {
  updateSubmitButton();
});

selectCategory.addEventListener("change", function () {
  updateSubmitButton();
});

// Récupérer les catégories depuis l'API
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    // Ajouter les catégories à la liste déroulante
    for (let j = 0; j < categories.length; j++) {
      selectCategory.innerHTML += `
      <option value ="${categories[j].id} ">${categories[j].name}
      </option>`;
    }
  });

// Ajouter un écouteur d'événements pour le soumission du formulaire
submitButton.addEventListener("click", function () {
  const form = document.getElementById("modal-form");
  const formData = new FormData(form);
  const image = formData.get("image");
  const title = formData.get("title");
  const category = formData.get("category");

  // Vérification de l'image
  if (!image || !image.type.startsWith("image/")) {
    const errorMessage = "Erreur : Veuillez sélectionner une image valide.";
    displayErrorMessage(errorMessage);
    return;
  }

  // Vérification du titre
  if (title.length < 5) {
    const errorMessage =
      "Erreur : Le titre doit comporter au moins 5 caractères.";
    displayErrorMessage(errorMessage);
    return;
  }

  // Vérification de la catégorie
  if (!category) {
    const errorMessage = "Erreur : Veuillez sélectionner une catégorie.";
    displayErrorMessage(errorMessage);
    return;
  }

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: formData,
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`Erreur lors de la requête : ${resp.status}`);
      }
      return resp.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      const errorMessage = `Erreur : ${error.message}`;
      console.error(errorMessage);
      displayErrorMessage(errorMessage);
    });
});
