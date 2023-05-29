import { Trip } from "../trip.js";
import { getAllBookings } from "../booking-firebase.js";

async function getData() {
    const [user, all_bookings] = await getAllBookings();

    document.getElementById("name").innerHTML = user;

    // Iterate through all bookings and create cards for each
    let cards = "";
    all_bookings.forEach((booking) => {
        cards += `
        <div class="card bg-base-300 py-0 my-6 backdrop-blur-sm">
            <div class="card-body">
                <h5 class="card-title text-3xl">${booking.tripType} - ${booking.launchDate}</h5>
                <h6 class="card-subtitle mb-2 text-slate-400">Tier: ${booking.tripTier}</h6>
                <p class="card-text">Number of Travelers: ${booking.numOfTravellers}</p>
            </div>
        </div>
        `;
    });

    document.getElementById("bookings").innerHTML = cards;
}

getData();
