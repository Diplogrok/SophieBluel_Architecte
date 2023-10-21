(async () => {
  console.log(fetch("http://localhost:5678/api/users/login"));
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



async () => {
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
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });

  login();
};*/
