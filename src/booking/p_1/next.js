// Add event listener for submit-btn.
document.getElementById("submit-btn").addEventListener("click", function() {
        console.log("submit-btn clicked");
        var date = document.getElementById("date").value;
        var type = document.getElementById("type").value;
        var tier = document.getElementById("tier").value;
        var numOfTravelers = document.getElementById("numOfTravelers").value;

        localStorage.setItem("date", date);
        localStorage.setItem("type", type);
        localStorage.setItem("tier", tier);
        localStorage.setItem("numOfTravelers", numOfTravelers);

        window.location.replace("/booking/p_2/");
    }
);