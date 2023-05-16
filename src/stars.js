import './style.css';

import * as THREE from 'three';
import * as rsc from './resources';



let scene, camera, renderer, stars;
function setup() {
  [scene, camera, renderer, stars] = rsc.heroSetup();
}
setup()
let orientation = window.orientation;
let resizeTimeout;

function resize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    if (!rsc.isTouchDevice()) {
      setup();
    } else {
      if (orientation !== window.orientation) {
        setup()
      }
      orientation = window.orientation;
    }
  }, 250); 
}
window.onresize = resize;

var timeDelta;
let smoothDeltaTime = 0;
const lerpFactor = 0.005;
let lastTime = performance.now();

function deltaTime() {
  return smoothDeltaTime;
}

function animate() {
  requestAnimationFrame(animate);
  const currentTime = performance.now();
  const delta = (currentTime - lastTime) / 1000; // convert to seconds
  smoothDeltaTime = THREE.MathUtils.lerp(smoothDeltaTime, delta, lerpFactor);
  smoothDeltaTime = Math.min(smoothDeltaTime, 0.033)
  lastTime = currentTime;
  timeDelta = deltaTime() * 50;
  updatePlanets();
  renderer.render(scene, camera);
}

function updatePlanets() {
  stars.rotation.y += 0.0005 * timeDelta;
}
animate();

// * THREEJS COMPLETE
let prevScrollPos = window.scrollY || document.documentElement.scrollTop;

function handleScroll() {
  const currentScrollPos = window.scrollY || document.documentElement.scrollTop;
  const scrollDirection = currentScrollPos > prevScrollPos ? 'down' : 'up';
  const scrollDistance = Math.abs(currentScrollPos - prevScrollPos);

  const normalizedValue = scrollDistance / 1500;

  const inverter = scrollDirection === 'down' ? -1 : 1;
  
  stars.position.y += inverter * normalizedValue * 50;
  stars.rotation.y += inverter * normalizedValue / 10;

  prevScrollPos = currentScrollPos;
}

document.addEventListener('scroll', handleScroll);





