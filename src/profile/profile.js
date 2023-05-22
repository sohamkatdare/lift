import { Trip } from "../trip.js";
import { getAllBookings } from "../booking-firebase.js";

async function getData(){
    const all_bookings = await getAllBookings();

    // Iterate through all bookings and create cards for each
    let cards = "";
    all_bookings.forEach((booking) => {
        cards += `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${booking.tripType} - ${booking.launchDate}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Tier: ${booking.tripTier}</h6>
                <p class="card-text">Number of Travelers: ${booking.numOfTravellers}</p>
            </div>
        </div>
        `;
    });

    document.getElementById("bookings").innerHTML = cards;
}

getData();
