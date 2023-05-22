// Add event listener for submit-btn.
document.getElementById("submit-btn").addEventListener("click", function () {
    window.location.replace("/booking/p_1/");
}
);

document.getElementById("p1Form").addEventListener("submit", function (evt) {
    evt.preventDefault();
}, true);