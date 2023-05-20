import { signup } from "../auth.js";

const password_1 = document.getElementById("floating_password_1");
const password_2 = document.getElementById("floating_password_2");
const error_message = document.getElementById("error");

const signupForm = document.querySelector('#p1Form');
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // get user info


    const firstName = document.getElementById("floating_first_name").value;
    const lastName = document.getElementById("floating_last_name").value;
    const email = document.getElementById("floating_email").value;
    const password_1_value = password_1.value;
    const password_2_value = password_1.value;

    // sign up the user
    if (password_1_value !== password_2_value) {
        alert("Passwords do not match");
        return;
    }
    const resp = await signup(firstName, lastName, email, password_1_value);
    console.log(resp);
    if (resp[0] === 'success') {
        window.location.replace("/login/");
    } else {
        alert("Sign up failed. Please try again or try logging in.");
    }
});

function displayPasswordError() {
  
    password_1.style.border = "2px solid #ff0000"; 
    password_2.style.border = "2px solid #ff0000";
    error_message.textContent = "These passwords do not match."; 
  
    error_message.style.color = "#ff0000"; 
    error_message.style.fontWeight = "bold"; 
  }
  