import { Trip } from "../../trip.js";
import { addBooking } from "../../booking-firebase.js";

// Populate the confirm page with the data from the previous pages.
document.getElementById("price").innerHTML = localStorage.getItem("type") === "Gas Giant Exploration" ? "$750k" : "$500k";
document.getElementById("tier").innerHTML = localStorage.getItem("tier");
document.getElementById("type").innerHTML = localStorage.getItem("type");
document.getElementById("date").innerHTML = localStorage.getItem("date");
document.getElementById("type").innerHTML = localStorage.getItem("type");
document.getElementById("num-of-travelers").innerHTML = localStorage.getItem("numOfTravelers");

document.getElementById("address").innerHTML = localStorage.getItem("address") + ",";
document.getElementById("zipcode").innerHTML = localStorage.getItem("zipcode") + ",";
document.getElementById("city").innerHTML = localStorage.getItem("city") + ",";
document.getElementById("state").innerHTML = localStorage.getItem("state") + ",";
document.getElementById("cardNumber").innerHTML = localStorage.getItem("cardNumber") + ",";
document.getElementById("cardExpiry").innerHTML = localStorage.getItem("cardExpiry") + ",";


// Add event listener for confirm-btn.
document.getElementById("confirm-btn").addEventListener("click", async function() {
        console.log("Confirming booking...");
        
        // Get Booking details from localStorage.
        let date = localStorage.getItem("date");
        let type = localStorage.getItem("type");
        let tier = localStorage.getItem("tier");
        let numOfTravelers = localStorage.getItem("numOfTravelers");
        let address = localStorage.getItem("address");
        let city = localStorage.getItem("city");
        let zipcode = localStorage.getItem("zipcode");
        let state = localStorage.getItem("state");
        let cardNumber = localStorage.getItem("cardNumber");
        let cardExpiry = localStorage.getItem("cardExpiry");
        let cardCVV = localStorage.getItem("cardCVV");

        await addBooking(new Trip(date, type, tier, numOfTravelers, address, zipcode, city, state, cardNumber, cardExpiry, cardCVV));

        window.location.replace("/profile/");
    }
);