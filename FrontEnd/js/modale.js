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
        <img id="${work[i].id}"src="${work[i].imageUrl}" width="78px">
        <i id="${work[i].id}" class="fa-solid fa-trash-can"></i>
        </figure>`;
  }
}
getWork(work);

const trash = document.querySelectorAll(".fa-trash-can");
console.log(trash);

for (let i = 0; i < trash.length; i++) {
  trash[i].addEventListener("click", function () {
    console.log("click");
    fetch("http://localhost:5678/api/works/${id}", {
      method: "DELETE",
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

export function enableEditMode() {
  const editMode = document.getElementById("js-modal");
  const logout = document.getElementById("login");
  const login = document.getElementById("logout");
  logout.classList.add("hidden");
  login.classList.remove("hidden");
  editMode.classList.remove("hidden");
}
enableEditMode();
