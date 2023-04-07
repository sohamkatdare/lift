const preloader = document.getElementById('preloader');

const fadeEffect = setInterval(() => {
    // if we don't set opacity 1 in CSS, then it will be equaled to "" -- that's why we check it, and if so, set opacity to 1
    if (!preloader.style.opacity) preloader.style.opacity = 1;
    if (preloader.style.opacity > 0) {
       preloader.style.opacity -= 0.1; 
    } else if(preloader.style.opacity <= 0 && !preloader.classList.contains("hidden")) {  
        preloader.classList += ' hidden'
    }
    else clearInterval(fadeEffect);
}, 100);

const oldLoadFunction = window.load;
const loadFunction = function(){
    fadeEffect();
    oldLoadFunction();
}
window.addEventListener("onload", loadFunction);