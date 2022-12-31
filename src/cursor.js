const customCursor = document.querySelector('#cursor');
let isLeft = false;

function lerp(start, end, amount) {
    return (1 - amount) * start + amount * end
}

const moveCursor = (e) => {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    customCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 100px)`;
    let width = window.innerWidth;
    isLeft = (mouseX <= width / 2);
}

document.addEventListener('mousemove', moveCursor)

let section = 0;
function updateSteps() {
    const steps = document.getElementById('steps');
    let i = 0;
    for (const step of steps.children) {
        console.log(step);
        if (i <= section) {
            console.log('Primary');
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
    if (t.tagName == 'BUTTON') {
        t.click()
    } else {
        if (isLeft) {
            scrollNext();
        } else {
            scrollBefore();
        }
    }
}

document.onclick = cursorClick;
document.getElementById('gstar1').onclick = function () {
    section = 1;
    scrollSection();
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
};

document.body.onscroll = detectScrollChanges;

// Before Page Load
document.onreadystatechange = function (e) {
    detectScrollChanges();
};