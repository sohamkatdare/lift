let lastScrollY = 0;
let isScrollingDown = true;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  isScrollingDown = currentScrollY > lastScrollY;
  lastScrollY = currentScrollY;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && isScrollingDown) {
      entry.target.classList.add('show')
    } else {
      entry.target.classList.remove('show')
    }
  })
})

const hiddenElements = document.querySelectorAll('.animate-hidden-text, .animate-hidden, .animate-hidden-card')
hiddenElements.forEach((element) => {
  observer.observe(element)
})