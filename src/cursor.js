import {isTouchDevice} from './resources';
import { switchPlanet } from './main';

const customCursor = document.querySelector('#cursor');
const customPointers = document.querySelectorAll('.pointer');
const hoverTags = new Set(['BUTTON', 'A', 'CODE', 'LI', 'P', 'H1', 'H2', 'UL', 'NAV', 'ASIDE', 'SVG', 'G', 'SPAN']);
let isLeft = false;
let isButtonHover = false;

const standard = 'pointer absolute top-0 ml-[20px] text-slate-50/75 text-[7rem] transition-all duration-1000'
const left = ' translate-y-[-3.75rem] -translate-x-[5.5rem] rotate-180'
const right = ' translate-y-[-5.25rem]'
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
        duration: 1000,
        fill: 'forwards'
    })
    // customCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 100px)`;
    isLeft = mouseX <= window.innerWidth / 2;
    animateCursor();
}

document.addEventListener('mousemove', moveCursor, { passive: true });

let section = 0;

function scrollSection() {
    const sectionString = `section${section}`;
    document.getElementById(sectionString).scrollIntoView();
}

function scrollBefore() {
    if (section > 0) {
        section--;
        switchPlanet(section);
    }
    scrollSection();
}

function scrollNext() {
    if (section < 5) {
        section++;
        switchPlanet(section);
    }
    scrollSection();
}

document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        target.click();
    } else {
        if(!isTouchDevice()) {
            if (isLeft) {
                scrollBefore();
            } else {
                scrollNext();
            }
        }
    }
});

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