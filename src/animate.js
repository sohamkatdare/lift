let lastScrollY = 0;
let isScrollingDown = true;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  isScrollingDown = currentScrollY > lastScrollY;
  lastScrollY = currentScrollY;
});

const alreadyAnimatedElements = new Set();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(alreadyAnimatedElements.has(entry.target)) return
    const scrollUpIntoView = entry.isIntersecting && !isScrollingDown;
    const scrollDownIntoView = entry.isIntersecting && isScrollingDown;
    const scrollUpOutOfView = !entry.isIntersecting && !isScrollingDown;
    const scrollDownOutOfView = !entry.isIntersecting && isScrollingDown;
    if (scrollUpIntoView || scrollUpOutOfView || scrollDownIntoView) {
      entry.target.classList.add('show')
      alreadyAnimatedElements.add(entry.target)
    } else if (scrollDownOutOfView)  {
      entry.target.classList.remove('show')
    }
  })
})

const hiddenElements = document.querySelectorAll('.animate-hidden-text, .animate-hidden, .animate-hidden-card')
hiddenElements.forEach((element) => {
  observer.observe(element)
})