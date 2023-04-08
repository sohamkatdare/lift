import '../style.css'

import * as THREE from 'three';
import isTouchDevice from '../util';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as rsc from '../resources';

const scene = rsc.sceneSetup("/2k_stars_milky_way.jpg");

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
const camera = rsc.createView(scene, 45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = rsc.rendererSetup(scene, camera)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);

scene.add(ambientLight);


let mars = addPlanet('/2k_mars.jpg', 2, 32);

addToScene(mars, 0, 0, -7)

let stars = rsc.starForge(scene);
scene.add(stars)
function animate() {
  requestAnimationFrame(animate);
  updatePlanets();
  renderer.render(scene, camera);
}

function updatePlanets() {
  mars.rotation.y += 0.005;
  mars.rotation.z += 0.0004;
}



animate();