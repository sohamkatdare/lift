// Add event listener for submit-btn.
document.getElementById("submit-btn").addEventListener("click", function() {
        console.log("submit-btn1 clicked");
        var date = document.getElementById("date").value;
        var type = document.getElementById("type").value;
        var tier = document.getElementById("tier").value;
        var numOfTravelers = document.getElementById("numOfTravelers").value;

        if(date == "" || type == "Choose trip" || tier == "Choose tier" || numOfTravelers == "") {
            return false;
        }

        localStorage.setItem("date", date);
        localStorage.setItem("type", type);
        localStorage.setItem("tier", tier);
        localStorage.setItem("numOfTravelers", numOfTravelers);

        window.location.replace("/booking/p_2/");
    }
);

document.getElementById("p1Form").addEventListener("submit", function(evt) {
    evt.preventDefault();
}, true);