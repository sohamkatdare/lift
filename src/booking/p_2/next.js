// Add event listener for submit-btn.
document.getElementById("submit-btn").addEventListener("click", function() {
    console.log("submit-btn clicked");
    var address = document.getElementById("floating_address").value;
    var zipcode = document.getElementById("floating_zipcode").value;
    var state = document.getElementById("floating_state").value;
    var cardNumber = document.getElementById("floating_card_number").value;
    var cardExpiry = document.getElementById("floating_card_expiry").value;
    var cardCVV = document.getElementById("floating_cvv").value;

    if(address == "" || zipcode == "" || state == "---" || cardNumber == "" || cardExpiry == "" || cardCVV == "") {
        alert("Fill out all fields.")
        return false;
    }

    localStorage.setItem("address", address);
    localStorage.setItem("zipcode", zipcode);
    localStorage.setItem("state", state);
    localStorage.setItem("cardNumber", cardNumber);
    localStorage.setItem("cardExpiry", cardExpiry);
    localStorage.setItem("cardCVV", cardCVV);

    window.location.replace("/booking/p_3/");
}
);

document.getElementById("p1Form").addEventListener("submit", function(evt) {
    evt.preventDefault();
}, true);