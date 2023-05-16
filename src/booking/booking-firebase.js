import {initializeApp} from 'firebase/app'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {getFirestore, collection, addDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBIMn4iunZcpmBy2xKGdgtzRYEa2bjlb9c",
    authDomain: "lift-8e0f9.firebaseapp.com",
    projectId: "lift-8e0f9",
    storageBucket: "lift-8e0f9.appspot.com",
    messagingSenderId: "56078114567",
    appId: "1:56078114567:web:8eda150b24c50254d42fa2",
    measurementId: "G-REZP1JBBQS"
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

let data = {
    date: "",
    type: "",
    tier: "",
    numOfTravelers: ""
}

document.querySelector("#submit-btn").addEventListener("click", ()=> {
    data.date = document.querySelector("#date").value;
    data.type = document.querySelector("#type").value;
    data.tier = document.querySelector("#tier").value;
    data.numOfTravelers = document.querySelector("#numOfTravelers").value;
})



async function addBooking (uid, data) {
    await addDoc(collection(db, "users", uid, "bookings"), data);
}

function encodeQuery(data){
    let query = data.url + "/"
    for (let d in data.params)
         query += encodeURIComponent(d) + '='
              + encodeURIComponent(data.params[d]) + '&';
    return query.slice(0, -1)
}

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if(user) {
        const uid = user.uid;
        addBooking(uid, data);
    } else {
        window.location.href = '../login/'
    }
})