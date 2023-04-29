import '../style.css'

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as rsc from '../resources';

let [scene, camera, renderer, stars] = rsc.heroSetup();

function addPlanet(mapTexture, size, detail) {
  const texture = new THREE.TextureLoader().load(mapTexture);
  const geometry = new THREE.SphereGeometry(size, detail, detail);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const planet = new THREE.Mesh(geometry, material);
  return planet
}

let orientation = window.orientation;
function resize() {
    if(!rsc.isTouchDevice()) {  // if not touch device
        location.reload();
    } else {
        if (orientation !== window.orientation) {
            location.reload();
        }
        orientation = window.orientation;
    }
}
window.onresize = resize;


function addToScene(planet, x, y, z) {
  planet.position.set(x, y, z);
  scene.add(planet)
}


let mars = addPlanet('/2k_mars.jpg', 2, 32);

addToScene(mars, 0, 0, -7)

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
  lastTime = currentTime;
  timeDelta = deltaTime() * 30;
  updatePlanets();
  renderer.render(scene, camera);
}

function updatePlanets() {
  console.log(timeDelta);
  mars.rotation.y += 0.005 * timeDelta;
  mars.rotation.z += 0.0004 * timeDelta;
  stars.rotation.y += 0.0001 * timeDelta;
}

let prevScrollPos = window.scrollY || document.documentElement.scrollTop;

function handleScroll() {
  const currentScrollPos = window.scrollY || document.documentElement.scrollTop;
  const scrollDirection = currentScrollPos > prevScrollPos ? 'down' : 'up';
  const scrollDistance = Math.abs(currentScrollPos - prevScrollPos);

  const normalizedValue = scrollDistance / 1500;

  const inverter = scrollDirection === 'down' ? -1 : 1;
  
  stars.position.y += inverter * normalizedValue * 50;
  stars.rotation.y += inverter * normalizedValue / 10;
  mars.position.y -= inverter * normalizedValue * 20;
  mars.position.z += inverter * normalizedValue * 20;

  prevScrollPos = currentScrollPos;
}

document.addEventListener('scroll', handleScroll);


rsc.button.onclick = () => {
  rsc.toggle();
} 

// setTimeout(rsc.toggle, 200);



animate();