const loginForm = document.getElementById("login-form");
const usernamePrompt = document.getElementById("username-prompt");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting");

const USERNAME_KEY = "username";
const HIDDEN = "hidden";

function onLoginSubmit(event) {
    event.preventDefault();
    const username = (loginInput.value).toUpperCase();
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
    window.location.reload();

}

function paintGreetings(username) {
    greeting.innerText = `Hello, ${username}!`
    greeting.classList.remove(HIDDEN);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername == null) {
    loginForm.classList.remove(HIDDEN);
    usernamePrompt.classList.remove(HIDDEN);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings(savedUsername);

}