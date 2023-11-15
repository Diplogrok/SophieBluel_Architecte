import { updatePageContent } from "./scripts.js";

let modal = null;

const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));

  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", true);
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};
const container = document.querySelector(".modal-gallery");
const answerW = await fetch("http://localhost:5678/api/works");
const work = await answerW.json();
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
        console.error("Erreur lors de la suppression de l'élément", error);
      });
  });
}

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
  updatePageContent();
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

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
};

const closeModalBis = function (e) {
  if (modalBis === null) return;
  e.preventDefault();
  modalBis.style.display = "none";
  modalBis.setAttribute("aria-hidden", true);
  modalBis.removeAttribute("aria-modal");
  modalBis.removeEventListener("click", closeModalBis);
  modalBis
    .querySelector(".js-modalBis-close")
    .removeEventListener("click", closeModalBis);
  modalBis
    .querySelector(".js-modalBis-stop")
    .addEventListener("click", stopPropagation);
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

const selectImage = document.querySelector(".img-selected");
const inputFile = document.querySelector("#file");
const imgArea = document.querySelector(".img-area");

selectImage.addEventListener("click", function () {
  inputFile.click();
});

inputFile.addEventListener("change", function () {
  const image = this.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const imgUrl = reader.result;
    const img = document.createElement("img");
    img.src = imgUrl;
    imgArea.appendChild(img);
    selectImage.classList.add("background");
    selectImage.classList.remove("img-selected");
  };
  reader.readAsDataURL(image);
});
