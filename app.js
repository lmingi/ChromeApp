const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");

function onLoginSubmit() {
    console.log(loginInput.value);
}

loginForm.addEventListener("submit", onLoginSubmit);