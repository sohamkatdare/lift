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
    isLeft = mouseX <= width / 2
    console.log(isLeft);
}

document.addEventListener('mousemove', moveCursor)

let section = 1;
function scrollSection() {
    document.getElementById('section' + String(section)).scrollIntoView()
}

function scrollBefore() {
    scrollSection();
    if (section > 0) {
        section--;
    }
}

function scrollNext() {
    scrollSection();
    if (section < 9) {
        section++;
    }
}

function cursorClick(e) {
    const t = e.target;
    console.log(t);
    if (t == document.getElementsByTagName('button')) {
        t.click()
    } else {
        const mouseX = e.clientX;
        console.log('Other');
        if (isLeft) {
            scrollNext();
        } else {
            scrollBefore();
        }
    }
}

document.onclick = cursorClick;

// Detect if section is seen manually.
function elementInViewport(element) {

    var bounding = document.getElementById(element).getBoundingClientRect();

    return bounding.top >= -myElementHeight && bounding.left >= -myElementWidth && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) + myElementWidth && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + myElementHeight;
}

function changeSection(num) {
    const id = 'section' + String(num);
    console.log(num);
    if (elementInViewport(id)) {
        section = num;
    }
}

// for (let i = 0; i < 10; i++) {
//     document.getElementById('section' + String(i)).addEventListener('mousemove', function () { changeSection(i); });
// }