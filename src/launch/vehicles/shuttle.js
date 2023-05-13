import '../../style.css'

import * as THREE from 'three';
import * as rsc from '../../resources';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, stars, ambientLight;

function setup() {
  const loader = new GLTFLoader();
  
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#spaceship"), antialias: true });
  ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(scene);
  scene.add(camera);
  scene.add(renderer);
  scene.add(ambientLight);
  
  let orientation = window.orientation;
  let resizeTimeout;
  
  loader.load(
      '/assets/space_shuttle/scene.gltf',
      function (gltf) {
        let obj = gltf.scene;
        obj.position = (0, 0, 20);
        scene.add(obj);
        
        console.log("hello");
      },
      function (xhr) {
          console.log("loading")
      },
      function (error) {
          console.log("threw an error" + error)
      }
  )
}
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
  timeDelta = deltaTime() * 30;
  renderer.render(scene, camera);
}

animate();


// * THREEJS COMPLETE
// Get all accordion buttons
const accordionButtons = document.querySelectorAll("[id^='toggle']");

// Attach click event listeners to accordion buttons
accordionButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Get the accordion body associated with the clicked button
    const accordionBody = document.querySelector(`#${button.id.replace("toggle", "accordion")}`);
    
    // Toggle the visibility of the accordion body
    accordionBody.classList.toggle("active");
    
    // Toggle the "aria-expanded" attribute of the button
    button.setAttribute("aria-expanded", button.getAttribute("aria-expanded") === "true" ? "false" : "true");
  });
});

let prevScrollPos = window.scrollY || document.documentElement.scrollTop;

function handleScroll() {
  const currentScrollPos = window.scrollY || document.documentElement.scrollTop;
  const scrollDirection = currentScrollPos > prevScrollPos ? 'down' : 'up';
  const scrollDistance = Math.abs(currentScrollPos - prevScrollPos);

  const normalizedValue = scrollDistance / 1500;

  const inverter = scrollDirection === 'down' ? -1 : 1;

  prevScrollPos = currentScrollPos;
}

document.addEventListener('scroll', handleScroll);



