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
  const data = Object.fromEntries(formData);
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => {
      if (resp.ok) {
        console.log("HTTP request successful");
        window.location.href = "index.html";
      } else {
        console.log("HTTP request unsuccessful");
        throw new Error("Email et/ou mot de passe incorrect");
      }
      return resp;
    })

    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => errorMessage(error.message));
});
