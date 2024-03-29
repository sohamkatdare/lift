import {isTouchDevice} from './resources';
import { switchPlanet } from './main';


const customCursor = document.querySelector('#cursor');
const customPointers = document.querySelectorAll('.pointer');
const hoverTags = new Set(['BUTTON', 'A', 'CODE', 'LI', 'P', 'H1', 'H2', 'UL', 'NAV', 'ASIDE', 'SVG', 'G', 'SPAN']);
let isLeft = false;
let isButtonHover = false;

const standard = 'pointer absolute top-0 ml-[20px] text-slate-50/75 text-[7rem] transition-all duration-1000'
const left = ' translate-y-[-3.75rem] -translate-x-[4.5rem] rotate-180' // used to be 5.5 rem, but doesnt work on laptop
const right = ' translate-y-[-5.25rem] translate-x-[.5rem]'
const invisible = ' opacity-0'
const bloom = ' blur-md'

const animateCursor = function () {

    const sectionIsLast = section === 0 || isButtonHover;
    const sectionIsFirst = section === 5 || isButtonHover;

    if (isLeft) { // When the cursor is on the left half of the screen
        customPointers[0].classList = standard + left + (sectionIsLast ? invisible : '')
        customPointers[1].classList = standard + left + (sectionIsLast ? invisible + bloom : bloom)
    } else { // When the cursor is on the right half of the screen
        customPointers[0].classList = standard + right + (sectionIsFirst ? invisible : '')
        customPointers[1].classList = standard + right + (sectionIsFirst ? invisible + bloom : bloom)
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
        duration: 500,
        fill: 'forwards'
    })
    // customCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 100px)`;
    isLeft = mouseX <= window.innerWidth / 2;
    animateCursor();
}
if (isTouchDevice()) {
    customCursor.style.display = "none";   
} else {
    document.addEventListener('mousemove', moveCursor, { passive: true });
}

let section = 0;

let allowScrolling = false;

function handleEvents(e) {
    console.log("handleEvents")
  if (!allowScrolling) e.preventDefault();
}
window.addEventListener('wheel', handleEvents, { passive: false });
window.addEventListener('mousedown', handleEvents, { passive: false });
window.addEventListener('mouseup', handleEvents, { passive: false });

document.addEventListener('touchstart', handleTouchStart, { passive: false } );        
document.addEventListener('touchmove', handleTouchMove, { passive: false });

let xDown, yDown = null;                                                        
                                                  
function handleTouchStart(e) {
    const firstTouch = e.touches[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;   
};                                                
                                                                         
function handleTouchMove(e) {
    if (!xDown || !yDown) return;
    if (!allowScrolling) e.preventDefault();
    let [xUp, yUp] = [e.touches[0].clientX, e.touches[0].clientY];                                    
    let [xDiff, yDiff] = [xDown - xUp, yDown - yUp];  
    // console.log(Math.abs(yDiff)) 

    if (Math.abs(xDiff) < Math.abs(yDiff) && Math.abs(yDiff) > 5) {
        if (yDiff > 0) {
            scrollNext();
        } else { 
            scrollBefore();
        }                                                                 
    }
    /* reset values */
    xDown, yDown = null;                                        
};

window.addEventListener('load', () => {
    allowScrolling = false;
});
  
window.onload = function() {
    window.scrollTo(0, 0);
}

function scrollSection() {
    allowScrolling = true;
    const sectionString = `section${section}`;
    document.getElementById(sectionString).scrollIntoView();
    setTimeout(() => {
        allowScrolling = false;
    }, 500);
}

export function scrollBefore() {
    if (section > 0) {
        section--;
        switchPlanet(section);
    }
    scrollSection();
}

export function scrollNext() {
    if (section < 5) {
        section++;
        switchPlanet(section);
    }
    scrollSection();
}
// let heroText = document.querySelector('.animate-hidden-text');
document.addEventListener('click', clickHandler);

function clickHandler (event) {
    // heroText.style.transition = 'all 0.5s ease-in-out';
    
    const target = event.target;
    if (target.tagName === 'BUTTON' || target.tagName === 'A') target.click(); 
    else {
        if (isTouchDevice()) isLeft = event.clientX <= window.innerWidth / 2 ? true : false;
        if (isLeft) scrollBefore();
        else scrollNext();
    }
    
}

function cursorHover(e) {
    const t = e.target;
    if (hoverTags.has(t.tagName)) {
        isButtonHover = true;
    } else {
        isButtonHover = false;
    }
}


document.onmouseover = cursorHover;

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



const detectScrollChanges = function () {
    // onScrollBefore();
    for (let i = 0; i < 6; i++) {
        changeSection(i);
    }
    animateCursor();
};

document.body.onscroll = detectScrollChanges;

// document.onreadystatechange = function (e) {
//     detectScrollChanges();
//     moveCursor(e);
// };

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        e.preventDefault();
    }
    else if (e.keyCode == '40') {
        e.preventDefault();
    }
    else if (e.keyCode == '37') {
    //    scrollBefore();
        e.preventDefault();
    }
    else if (e.keyCode == '39') {
    //    scrollNext();
        e.preventDefault();
    }

}

export { section };



// const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ.";

// let interval = null;
// document.querySelector(".hacker-text").onmouseover = event => {  
//     let iteration = 0;
    
//     clearInterval(interval);
    
//     interval = setInterval(() => {
//       event.target.innerText = event.target.innerText
//         .split("")
//         .map((letter, index) => {
//           if(index < iteration) {
//             return event.target.dataset.value[index];
//           }
        
//           return letters[Math.floor(Math.random() * 26)]
//         })
//         .join("");
      
//       if(iteration >= event.target.dataset.value.length){ 
//         clearInterval(interval);
//       }
      
//       iteration += 1 / 3;
//     }, 30);
//   }