import { app } from "./firebase_init.js";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

function signup(firstName, lastName, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    user = userCredential.user;
    console.log("Signup successful");
    setDoc(doc(db, "users", email), {
      firstName: firstName,
      lastName: lastName,
      bookings: []
    });
    window.location.replace("/login/index.html");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}

function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // Add user to local storage
        localStorage.setItem('user', JSON.stringify(user));
        console.log("Login successful");
        return 'success', user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return 'failed', error;
    });
}

function logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('user');
}

export { signup, login, logout };