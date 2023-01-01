// const { info } = require("daisyui/src/colors");

const customCursor = document.querySelector('#cursor');
const customPointers = document.querySelectorAll('.pointer');
let isLeft = false;
let isButtonHover= false;

function lerp(start, end, amount) {
    return (1 - amount) * start + amount * end
}

function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
}

const animateCursor = function () {
    if (isLeft) {
        if (section == 5 || isButtonHover) {
            customPointers.forEach(function (customPointer) {
                customPointer.className = 'pointer absolute top-0 ml-[20px] text-gray-50 text-[7rem] translate-y-[-3.75rem] -translate-x-[5.5rem] rotate-180 opacity-0 transition-all duration-1000';
            });
        } else{
            customPointers.forEach(function (customPointer) {
                customPointer.className = 'pointer absolute top-0 ml-[20px] text-gray-50 text-[7rem] translate-y-[-3.75rem] -translate-x-[5.5rem] rotate-180 transition-all duration-1000';
            });
        }
    } else {
        if (section == 0 || isButtonHover){
            customPointers.forEach(function (customPointer) {
                customPointer.className = 'pointer absolute top-0 ml-[20px] text-gray-50 text-[7rem] translate-y-[-5.25rem] opacity-0 transition-all duration-1000';
            });
        } else{
            customPointers.forEach(function (customPointer) {
                customPointer.className = 'pointer absolute top-0 ml-[20px] text-gray-50 text-[7rem] translate-y-[-5.25rem] transition-all duration-1000';
            });
        }
    }
}

const moveCursor = (e) => {
    if(isTouchDevice()) {
        console.log("hidden")
        customCursor.style.display = "none";
        return
    }
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    customCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 100px)`;
    let width = window.innerWidth;
    isLeft = (mouseX <= width / 2);
    animateCursor();
}

document.addEventListener('mousemove', moveCursor)

let section = 0;
function updateSteps() {
    const steps = document.getElementById('steps');
    let i = 0;
    for (const step of steps.children) {
        if (i <= section) {
            step.className = 'transition-all step step-primary';
        } else {
            step.className = 'transition-all step';
        }
        i++;
    }
}

function scrollSection() {
    document.getElementById('section' + String(section)).scrollIntoView();
}

function scrollBefore() {
    if (section > 0) {
        section--;
    }
    scrollSection();
}

function scrollNext() {
    if (section < 5) {
        section++;
    }
    scrollSection();
}

function cursorClick(e) {
    const t = e.target;
    
    
    
    if (t.tagName == 'BUTTON' || t.tagName == 'A') {
        t.click()
    } else {
        if(infoShown) toastInfo.classList = 'hidden'
        if (isLeft) {
            scrollNext();
        } else {
            scrollBefore();
        }
    }
}

function cursorHover(e) {
    const t = e.target;
    if (t.tagName == 'BUTTON' || t.tagName == 'A' ||  t.tagName == "CODE" ||t.tagName == "LI" || t.tagName == "P" || t.tagName == "H1" || t.tagName == "H2" || t.tagName == "UL" ||  t.tagName == "NAV" || t.tagName == "ASIDE") {
        isButtonHover = true;
    } else {
        isButtonHover = false;
    }
}

document.onclick = cursorClick;
document.onmouseover = cursorHover;

var infoShown = false
const toastInfo = document.getElementById('scroll-info')

document.getElementById('gstar1').onclick = function () {
    section = 1;
    scrollSection();
    //if the button has not been clicked before
    if(!infoShown) {
        toastInfo.classList = 'toast toast-top toast-end p-2'
        infoShown = true
    }
};

document.getElementById('scroll-info-btn').onclick = function () {
    toastInfo.classList = "hidden"
};

// Detect if section is seen manually.
function elementInViewport(element) {
    var rect = element.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function changeSection(num) {
    const id = 'section' + String(num);
    if (elementInViewport(document.getElementById(id).firstElementChild)) {
        section = num;
        updateSteps();
    }
}

const onScrollBefore = document.body.onscroll;

const detectScrollChanges = function () {
    onScrollBefore();
    for (let i = 0; i < 6; i++) {
        changeSection(i);
    }
    animateCursor();
};

document.body.onscroll = detectScrollChanges;

// Before Page Load
document.onreadystatechange = function (e) {
    detectScrollChanges();
};