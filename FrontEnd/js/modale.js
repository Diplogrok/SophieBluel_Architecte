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
function getWork(work) {
  for (let i = 0; i < work.length; i++) {
    container.innerHTML += `
        <figure class ="modal-figure">
        <img id="${work[i].id} id"src="${work[i].imageUrl}" width="78px">
        <i id="${work[i].id} id" class="fa-solid fa-trash-can"></i>
        </figure>`;
  }
}
getWork(work);

const trash = document.querySelectorAll(".fa-trash-can");

for (let i = 0; i < trash.length; i++) {
  trash[i].addEventListener("click", function () {
    console.log("click");
    fetch(`http://localhost:5678/api/works/${work[i].id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    }).then((resp) => resp.json());
  });
}

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
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

const selectImage = document.querySelector(".img-selected");
const inputFile = document.querySelector("#file");
const imgArea = document.querySelector(".img-area");

selectImage.addEventListener("click", function () {
  inputFile.click();
});

inputFile.addEventListener("change", function () {
  const image = this.files[0];
  console.log(image);
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
