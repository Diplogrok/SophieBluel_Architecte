/*
(async () => {
  console.log(await fetch("http://localhost:5678/api/users/login"));
})();

/* const form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const login = new FormData(form);
  console.log([...login]);

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: login,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});


(async () => {
  function login() {
    const form = document.getElementById("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
  const log = {
    email: document.getElementById("email"),
    pass: document.getElementById("password"),
  };
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: "sophie.bluel@test.tld",
      pass: "S0phie",
    }),
    headers: { "Content-Type": "application/json" },
  })
    

  login();
})();

const form = document.getElementById("form");
//window.localStorage.setItem(`${}`,JSON.stringify())//

form.addEventListener("submit", function () {
  async () => {
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: "sophie.bluel@test.tld",
        pass: "S0phie",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          console.log("HTTP request successful");
        } else {
          console.log("HTTP request successful");
        }
        return resp;
      })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))();
  };
});

function errorMessage(message) {
  let spanErrorMessage = document.getElementById("error");

  if (!spanErrorMessage) {
    let popup = document.querySelector(".popup");
    spanErrorMessage = document.createElement("span");
    spanErrorMessage.id = "error";

    popup.append(spanErrorMessage);
  }
  spanErrorMessage.innerText = message;
}*/

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
        alert("email et/ou mot de pass incorrect");
      }
      return resp;
    })

    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});
