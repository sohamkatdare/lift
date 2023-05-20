export class Trip {
    constructor (launchDate, tripType, tripTier, numOfTravellers, streetAddress, zipcode, city, state, cardNumber, cardExpiry, CVV) {
        this.launchDate = launchDate;
        this.tripType = tripType;
        this.tripTier = tripTier;
        this.numOfTravellers = numOfTravellers;
        this.streetAddress = streetAddress;
        this.zipcode = zipcode;
        this.city = city;
        this.state = state;
        this.cardNumber = cardNumber;
        this.cardExpiry = cardExpiry;
        this.CVV = CVV;
    }
    toString() {
        return this.launchDate + " " + this.tripType + " " + this.tripTier + " " + this.numOfTravellers + " " + this.streetAddress + " " + this.zipcode + " " + this.city + " " + this.state + " " + this.cardNumber + " " + this.cardExpiry + " " + this.CVV;
    }
}

// Firestore data converter
export const toFirestore = (trip) => {
    return JSON.stringify({
        "launchDate": trip.launchDate,
        "tripType": trip.tripType,
        "tripTier": trip.tripTier,
        "numOfTravellers": trip.numOfTravellers,
        "streetAddress": trip.streetAddress,
        "zipcode": trip.zipcode,
        "city": trip.city,
        "state": trip.state,
        "cardNumber": trip.cardNumber,
        "cardExpiry": trip.cardExpiry,
        "CVV": trip.CVV
    });
}


export const fromFirestore = (data) => {
    return new Trip(data.launchDate, data.tripType, data.tripTier, data.numOfTravellers, data.streetAddress, data.zipcode, data.city, data.state, data.cardNumber, data.cardExpiry, data.CVV);
};