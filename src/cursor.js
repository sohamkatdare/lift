const customCursor = document.querySelector('#cursor');
const customPointer = document.querySelector('#pointer');
let isLeft = false;

function lerp(start, end, amount) {
    return (1 - amount) * start + amount * end
}

function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
}

{/* <div class="fixed top-0 left-0 block pointer-events-none">
    <!-- circle -->
    <div class="absolute left-0 top-0 w-[30px] h-[30px] ml-[-15px] mt-[-15px]" id="cursor">
      <div class="absolute left-0 top-0 w-full h-full box-border opacity-90 transition-opacity bg-gray-50 rounded-full scale-[0.08] bloom-cursor mt[-32px] ml-[28px]"  style="transform: translate3d(100px, 100px, 100px); contain: strict;">
        <span class="text-gray-50 text-4xl" style="padding-top:80%"> <!--  -->
          >
        </span>
      </div>
    </div>
    <!-- pointer so then ill delete this stuff?-->
    <div class="arrow-pointer-container absolute left-0 top-0 " style="contain: layout strict;" id="pointer">
        <div class="arrow-pointer-inner absolute left-0 top-0 transition-transform" >
            <div class="arrow-pointer-body absolute left-0 top-0 w-[80px]  opacity-90 ">
                <div class="js_img" data-img="1" data-append="1">
                    
                </div>
            </div>
        </div>
    </div>
  </div> */}

const moveCursor = (e) => {
    if(isTouchDevice()) {
        console.log("hidden")
        customCursor.style.display = "none";
        customPointer.style.display = "none";
        return
    }
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    customCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 100px)`;
    customPointer.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 100px)`;
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