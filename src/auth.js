import { app } from "./firebase_init.js";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

async function signup(firstName, lastName, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Signup successful");
    await setDoc(doc(db, "users", email), {
      firstName: firstName,
      lastName: lastName,
      bookings: []
    });
    return ['success', user];
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    return ['failed', error];
  }
}

async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return ['success', user];
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    return ['failed', error];
  }
}

async function logout() {
  // Remove user from local storage to log user out
  localStorage.removeItem('user');
}

async function reset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log(`Password reset email sent to ${email}`);
    return ['success'];
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    return ['failed', error];
  }
}


export { signup, login, logout, reset };