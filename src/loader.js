import anime from 'animejs/lib/anime.es';

const preloader = document.getElementById('preloader');

// Animation for drawing the stroke
let lineDrawing = anime({
  targets: '#preloaderPath',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: function(el, i) {
    return i * 250;
  },
});

const fadeEffect = () => {
  const interval = 10;
  let opacity = 1;

  const fadeOut = setInterval(() => {
    if (opacity > 0) {
      opacity -= interval / 1000;
      preloader.style.opacity = opacity;
    } else {
      clearInterval(fadeOut);
      preloader.classList.add('hidden');
    }
  }, interval);
};

// let bigger = anime({
//   targets: '#loaderLogo',
//   width: '100vh',
//   height: '100vh'
// });

const loadFunction = () => {
  setTimeout(() => {
    fadeEffect();
    // window.load(); // Assuming you have a function named "load" to be executed after the fade effect
  }, 1100); // Delay the loadFunction by 2200 milliseconds (2.2 seconds)
  // bigger.play()
};

window.addEventListener('DOMContentLoaded', () => {
  lineDrawing.play(); // Start the line drawing animation
  loadFunction();
});
