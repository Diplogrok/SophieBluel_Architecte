// Fonction qui affiche un message d'erreur dans le formulaire
function errorMessage(message) {
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

const form = document.getElementById("form");

// Ajouter un écouteur d'événements pour le soumission du formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Créer un objet FormData à partir des données du formulaire
  const formData = new FormData(form);
  // Convertir l'objet FormData en un objet JavaScript avec Object.fromEntries
  const dataForm = Object.fromEntries(formData);
  // Effectuer une requête POST vers l'API pour la connexion de l'utilisateur
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      // Stocker le token dans sessionStorage
      sessionStorage.setItem("token", data.token);
      const token = data.token;
      // Rediriger vers "index.html" si le token est présent
      if (token) {
        window.location.href = "index.html";
      } else {
        throw new Error("Email et/ou mot de passe incorrect");
      }
      return;
    })
    .catch((error) => errorMessage(error.message));
});
