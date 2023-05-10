import '../../style.css'

import * as THREE from 'three';
import * as rsc from '../../resources';



let [scene, camera, renderer, stars] = rsc.heroSetup();

function addPlanet(mapTexture, size, detail) {
  const texture = new THREE.TextureLoader().load(mapTexture);
  const geometry = new THREE.DodecahedronGeometry(size, detail, detail);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const planet = new THREE.Mesh(geometry, material);
  return planet
}


function addToScene(planet, x, y, z) {
  planet.position.set(x, y, z);
  scene.add(planet)
}

let orientation = window.orientation;
let resizeTimeout;

function resize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    if (!rsc.isTouchDevice()) {
      location.reload();
    } else {
      if (orientation !== window.orientation) {
        location.reload();
      }
      orientation = window.orientation;
    }
  }, 500); 
}
window.onresize = resize;


const neptune = addPlanet('/2k_neptune.jpg', 4, 32);
addToScene(neptune, 0, 0, -15);


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
  updatePlanets();
  renderer.render(scene, camera);
}

function updatePlanets() {
    neptune.rotation.y += 0.006 * timeDelta;
    stars.rotation.y += 0.0001 * timeDelta;
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
  
  stars.position.y += inverter * normalizedValue * 50;
  stars.rotation.y += inverter * normalizedValue / 10;
  neptune.position.y -= inverter * normalizedValue * 20;
  neptune.position.z += inverter * normalizedValue * 20;

  prevScrollPos = currentScrollPos;
}

document.addEventListener('scroll', handleScroll);



