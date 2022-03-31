const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting");

const USERNAME_KEY = "username";
const HIDDEN = "hidden";

function onLoginSubmit(event) {
    event.preventDefault();
    const username = (loginInput.value).toUpperCase();
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
}

function paintGreetings(username) {
    greeting.innerText = `Hello, ${username}!`
    greeting.classList.remove(HIDDEN);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername == null) {
    loginForm.classList.remove(HIDDEN);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings(savedUsername);
}