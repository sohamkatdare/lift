import { app } from "./firebase_init.js";
import { getFirestore, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { Trip, toFirestore, fromFirestore } from "./trip.js";

const db = getFirestore(app);

const docRef = doc(db, "users", JSON.parse(localStorage.getItem("user"))['uid']);

export async function addBooking(trip) {
  await updateDoc(docRef, {
    bookings: arrayUnion(toFirestore(trip))
  });
}

export async function getAllBookings() {
  const docSnap = await getDoc(docRef);

  const bookingsList = [];
  if (docSnap.exists()) {
    const bookings = docSnap.data()['bookings'];
    for (let i = 0; i < bookings.length; i++) {
      bookingsList.push(fromFirestore(JSON.parse(bookings[i])));
    }
    return bookingsList;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
}