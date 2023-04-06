import '../../style.css'

import * as THREE from 'three';
import * as rsc from '../../resources'

const renderer = rsc.rendererSetup();

const scene = rsc.sceneSetup(renderer, "/minified/2k_stars_milky_way-min.jpg");

rsc.addToScene(scene, rsc.earthGroup, 3, 0.2, -10);

const camera = rsc.createView(scene, 45, window.innerWidth / window.innerHeight, 0.1, 1000);

rsc.starForge(scene);

function animate() {
  requestAnimationFrame(animate);
  updatePlanets();
  renderer.render(scene, camera);
}

function updatePlanets() {
  rsc.earthGroup.rotation.x = 59.5;
  rsc.earthGroup.rotation.y += 0.005;
  rsc.earthGroup.rotation.z = 59.5;
  rsc.moon.rotation.y += 0.01
  rsc.earth.rotation.y += 0.01
}

animate();