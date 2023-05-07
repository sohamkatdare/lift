// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIMn4iunZcpmBy2xKGdgtzRYEa2bjlb9c",
  authDomain: "lift-8e0f9.firebaseapp.com",
  projectId: "lift-8e0f9",
  storageBucket: "lift-8e0f9.appspot.com",
  messagingSenderId: "56078114567",
  appId: "1:56078114567:web:8eda150b24c50254d42fa2",
  measurementId: "G-REZP1JBBQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { app };