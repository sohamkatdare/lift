import { login } from "../auth.js";

const loginForm = document.querySelector('#p1Form');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // get user info
    const email = document.getElementById("floating_email").value;
    const password = document.getElementById("floating_password").value;

    // login up the user
    const resp = await login(email, password);

    if (resp[0] === 'success') {
        // Add user to local storage
        localStorage.setItem('user', JSON.stringify(resp[1]));
        window.location.replace("/booking/");
        console.log("Login successful");
        console.log(localStorage);
    } else {
        alert("Login failed");
    }
});