function login() {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: '{"email":"string", "password":"string"}',
  });
}
