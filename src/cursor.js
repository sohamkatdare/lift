import isTouchDevice from './util';

const customCursor = document.querySelector('#cursor');
const customPointers = document.querySelectorAll('.pointer');
let isLeft = false;
let isButtonHover = false;
let isInverted = false;

const animateCursor = function () {
    const standard = 'pointer absolute top-0 ml-[20px] text-slate-50/75 text-[7rem] transition-all duration-1000'
    const left = ' translate-y-[-3.75rem] -translate-x-[5.5rem] rotate-180'
    const right = ' translate-y-[-5.25rem]'
    const invisible = ' opacity-0'
    const bloom = ' blur-md'

    // const standardCursor = "absolute left-0 top-0 w-[30px] h-[30px] ml-[-15px] mt-[-15px] opacity-100 scale-[0.5]"
    // const circle = customCursor.children[0];
    // console.log(isInverted)
    // if(isInverted) {
    //     circle.classList.replace('bg-slate-50/75', 'bg-white')
    //     customCursor.classList.replace('scale-[0.5]', 'scale-[1]')
    // }
    if (isLeft) { // When the cursor is on the left half of the screen
        if (section == 5 || isButtonHover) { // When the cursor is on the last slide, so can only go right
            customPointers[0].className = standard + left + invisible
            customPointers[1].className = standard + left + invisible + bloom
        } else { // any time when there is another slide to go to
            customPointers[0].className = standard + left
            customPointers[1].className = standard + left + bloom
        }
    } else { // When the cursor is on the right half of the screen
        if (section == 0 || isButtonHover) {
            customPointers[0].className = standard + right + invisible
            customPointers[1].className = standard + right + invisible + bloom
        } else {
            customPointers[0].className = standard + right
            customPointers[1].className = standard + right + bloom
        }
    }
}

const moveCursor = (e) => {
    if (isTouchDevice()) {
        customCursor.style.display = "none";
        return
    }
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    customCursor.animate({
        transform: `translate3d(${mouseX}px, ${mouseY}px, 100px)`
    }, {
        duration: 1750,
        fill: 'forwards'
    })
    // customCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 100px)`;
    let width = window.innerWidth;
    isLeft = (mouseX <= width / 2);
    animateCursor();
}

document.addEventListener('mousemove', moveCursor)

let section = 0;

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
    if(document.body.animate) {
        pop(e)
    }
    if (t.tagName == 'BUTTON' || t.tagName == 'A') {
        t.click()
    } else {
        if(!isTouchDevice()) {
            if (infoShown){
                toastInfo.classList = 'hidden'
                infoShown = false
            }
            if (isLeft) {
                scrollNext();
            } else {
                scrollBefore();
            }
        }
    }
}
function pop(e) {
    for (let i = 0; i < 30; i++) {
        createParticle(e.clientX, e.clientY)
    }
}
function createParticle(x, y) {
    const particle = document.createElement('particle')
    document.body.appendChild(particle)

    particle.style.opacity = '0'
    const size = Math.floor(Math.random() * 20 + 5)
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.background = `hsl(${Math.random() + 90 + 180}, 70%, 60%)`

    const destinationX = x + (Math.random() - 0.5) * 2 * 75;
    const destinationY = y + (Math.random() - 0.5) * 2 * 75;
    
    const animation = particle.animate([
        {
            transform: `translate(${x - (size / 2)}px, ${y - (size / 2)}px)`,
            opacity: 1
        },
        {
            transform: `translate(${destinationX}px, ${destinationY}px)`,
            opacity: 0
        }
    ], {
        duration: 500 + Math.random() * 1000,
        easing: 'cubic-bezier(0, 0.9, 0.57, 1)',
        delay: Math.random() * 200
    })

    animation.onfinish = () => {
        particle.remove();
    }
}
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ.";

let interval = null;
document.querySelector(".hacker-text").onmouseover = event => {  
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return event.target.dataset.value[index];
          }
        
          return letters[Math.floor(Math.random() * 26)]
        })
        .join("");
      
      if(iteration >= event.target.dataset.value.length){ 
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
  }

function cursorHover(e) {
    const t = e.target;
    // if time, make inverting the arrow work
    // if(t.classList.contains('cursor-hover')) {
    //     t.classList.replace('text-white', 'text-black');
    //     isInverted = true;
    // } else {
    //     t.classList.replace('text-black', 'text-white');
    //     isInverted = false;
    // }
    if (t.tagName == 'BUTTON' || t.tagName == 'A' || t.tagName == "CODE" || t.tagName == "LI" || t.tagName == "P" || t.tagName == "H1" || t.tagName == "H2" || t.tagName == "UL" || t.tagName == "NAV" || t.tagName == "ASIDE" || t.tagName == "SVG" || t.tagName == "G" || t.tagName == "SPAN") {
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
    if (!infoShown && !isTouchDevice()) {
        toastInfo.classList = 'toast toast-top toast-end p-2'
        infoShown = true
    }
    document.getElementById('gstar1').style.display = "none"
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
    }
}

const onScrollBefore = document.body.onscroll;

const detectScrollChanges = function () {
    // onScrollBefore();
    for (let i = 0; i < 6; i++) {
        changeSection(i);
    }
    animateCursor();
};

document.body.onscroll = detectScrollChanges;

// Before Page Load
document.onreadystatechange = function (e) {
    detectScrollChanges();
    moveCursor(e);
};

// Listen for window.resize
var orientation = window.orientation;
function resize() {
    if(!isTouchDevice()) {  // if not touch device
        console.log("resizing")
        location.reload();
    } else {
        if (orientation !== window.orientation) {
            location.reload();
        }
        orientation = window.orientation;
    }
}
window.onresize = resize;

