import { login } from "../auth.js";

const loginForm = document.querySelector('#p1Form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = document.getElementById("floating_email").value;
    const password = document.getElementById("floating_password").value;

    // login up the user
    login(email, password)
    window.location.replace("/booking/index.html");
});