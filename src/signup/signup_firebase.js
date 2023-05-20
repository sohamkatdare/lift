import { signup } from "../auth.js";

const signupForm = document.querySelector('#p1Form');
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // get user info
    const firstName = document.getElementById("floating_first_name").value;
    const lastName = document.getElementById("floating_last_name").value;
    const email = document.getElementById("floating_email").value;
    const password_1 = document.getElementById("floating_password_1").value;
    const password_2 = document.getElementById("floating_password_2").value;

    // sign up the user
    if (password_1 !== password_2) {
        alert("Passwords do not match");
        return;
    }
    const resp = await signup(firstName, lastName, email, password_1);
    if (resp[0] === 'success') {
        window.location.replace("/login/index.html");
    }
});