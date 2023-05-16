import { reset } from "../../auth.js";

const resetForm = document.querySelector('#p1Form');
resetForm.addEventListener('submit', (e) => {
    console.log("Resetting password");
    e.preventDefault();

    // get user info
    const email = document.getElementById("floating_email").value;

    // login up the user
    reset(email)
    // window.location.replace("/login/");
});