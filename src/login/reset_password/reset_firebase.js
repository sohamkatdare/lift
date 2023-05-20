import { reset } from "../../auth.js";

const resetForm = document.querySelector('#p1Form');
resetForm.addEventListener('submit', async (e) => {
    console.log("Resetting password");
    e.preventDefault();

    // get user info
    const email = document.getElementById("floating_email").value;

    // login up the user
    const resp = await reset(email);

    if (resp[0] === 'success') {
        console.log("Reset successful");
        window.location.replace("/login/");
    } else {
        alert("Reset failed");
    }
});