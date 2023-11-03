/*import { enableEditMode } from "./scripts";
enableEditMode();*/

function errorMessage(message) {
  let spanErrorMessage = document.getElementById("error");

  if (!spanErrorMessage) {
    let form = document.querySelector(".popup");
    spanErrorMessage = document.createElement("span");
    spanErrorMessage.id = "error";

    form.append(spanErrorMessage);
  }
  spanErrorMessage.innerText = message;
}

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const dataForm = Object.fromEntries(formData);
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
      sessionStorage.setItem("token", data.token);
      const token = data.token;
      if (token) {
        window.location.href = "index.html";
      } else {
        throw new Error("Email et/ou mot de passe incorrect");
      }
      return;
    })
    .catch((error) => errorMessage(error.message));
});
