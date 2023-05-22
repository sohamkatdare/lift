import { app } from "./firebase_init.js";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInAnonymously } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

async function signup(firstName, lastName, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Signup successful");
    await setDoc(doc(db, "users", user.uid), {
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

async function continueAsGuest() {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    console.log("Signup successful");
    // If doc exists, do nothing. Else, create doc
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!(docSnap.exists())) {
      await setDoc(doc(db, "users", user.uid), {
        firstName: "Guest",
        lastName: "",
        bookings: []
      });
    }
    return ['success', user];
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    return ['failed', error];
  }
}

export { signup, login, reset, continueAsGuest };