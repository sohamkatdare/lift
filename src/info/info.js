import '../style.css'

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as rsc from '../resources';

let [scene, camera, renderer, stars] = rsc.heroSetup();

function addPlanet(mapTexture, size, detail) {
  const texture = new THREE.TextureLoader().load(mapTexture);
  const geometry = new THREE.DodecahedronGeometry(size, detail, detail);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const planet = new THREE.Mesh(geometry, material);
  return planet
}

let orientation = window.orientation;
function resize() {
    if(!isTouchDevice()) {  // if not touch device
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


function animate() {
  requestAnimationFrame(animate);
  updatePlanets();
  renderer.render(scene, camera);
}

function updatePlanets() {
  mars.rotation.y += 0.005;
  mars.rotation.z += 0.0004;
  stars.rotation.y += 0.0001;
}

let prevScrollPos = window.scrollY || document.documentElement.scrollTop;

function handleScroll() {
  const currentScrollPos = window.scrollY || document.documentElement.scrollTop;
  const scrollDirection = currentScrollPos > prevScrollPos ? 'down' : 'up';
  const scrollDistance = Math.abs(currentScrollPos - prevScrollPos);

  const normalizedValue = scrollDistance / 1500;
  
  if (scrollDirection === 'down') {
    stars.position.y -= normalizedValue*50;
    mars.position.y += normalizedValue * 20;
    mars.position.z -= normalizedValue * 20;
  } else {
    stars.position.y += normalizedValue*50;
    mars.position.y -= normalizedValue * 20;
    mars.position.z += normalizedValue * 20;
  }
  prevScrollPos = currentScrollPos;
}

document.addEventListener('scroll', handleScroll);




animate();