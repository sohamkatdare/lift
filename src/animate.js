let lastScrollY = 0;
let isScrollingDown = true;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  isScrollingDown = currentScrollY > lastScrollY;
  lastScrollY = currentScrollY;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const scrollUpIntoView = entry.isIntersecting && !isScrollingDown;
    const scrollDownIntoView = entry.isIntersecting && isScrollingDown;
    const scrollUpOutOfView = !entry.isIntersecting && !isScrollingDown;
    const scrollDownOutOfView = !entry.isIntersecting && isScrollingDown;
    if (scrollUpIntoView || scrollUpOutOfView || scrollDownIntoView) {
      entry.target.classList.add('show')
    } else if (scrollDownOutOfView) {
      entry.target.classList.remove('show')
    }
  })
})

const hiddenElements = document.querySelectorAll('.animate-hidden-text, .animate-hidden, .animate-hidden-card')
hiddenElements.forEach((element) => {
  observer.observe(element)
})