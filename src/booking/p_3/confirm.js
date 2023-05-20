import { Trip } from "../trip.js";
import { addBooking } from "../booking-firebase.js";

// Add event listener for confirm-btn.
document.getElementById("confirm-btn").addEventListener("click", async function() {
        console.log("Confirming booking...");
        
        // Get Booking details from localStorage.
        let date = localStorage.getItem("date");
        let type = localStorage.getItem("type");
        let tier = localStorage.getItem("tier");
        let numOfTravelers = localStorage.getItem("numOfTravelers");
        let address = localStorage.getItem("address");
        let zipcode = localStorage.getItem("zipcode");
        let state = localStorage.getItem("state");
        let cardNumber = localStorage.getItem("cardNumber");
        let cardExpiry = localStorage.getItem("cardExpiry");
        let cardCVV = localStorage.getItem("cardCVV");

        await addBooking(new Trip(date, type, tier, numOfTravelers, address, zipcode, state, cardNumber, cardExpiry, cardCVV));
        
        window.location.replace("/booking/");
    }
);