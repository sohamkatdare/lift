import './style.css'
import * as rsc from './resources';
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'

const stats = new Stats()
document.body.appendChild(stats.dom)


const scene = rsc.sceneSetup("/2k_stars_milky_way.jpg");

//sadasdasd   

const camera = rsc.createView(scene, 45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = rsc.rendererSetup(scene, camera);
// const cameraRotationGroup = new THREE.Group();
// cameraRotationGroup.add(camera);

const cameraOriginalPosition = new THREE.Vector3(0, 20, 40)
camera.position.set(0, 200, 800);
camera.rotation.set(50, 0, 0);


let selectedPlanet;



rsc.starForge(scene)



function animate() {
  requestAnimationFrame(animate);

  // controls.update();
  updatePlanets();

  rsc.updateCameraPosition(camera, selectedPlanet, new THREE.Vector3(50, 10, 5), 0.005)
  renderer.render(scene, camera);
  stats.update()
}

async function init() {
  await rsc.addSolarSystem(scene);
  selectedPlanet = rsc.mars;
  animate()
}

function updatePlanets() {
  rsc.sun.rotation.y += 0.001;
  rsc.mercury.rotation.y += 0.01;
  rsc.mercury.rotation.x += 0.0002;
  rsc.venus.rotation.y += 0.01;

  rsc.earthGroup.rotation.x = 59.5;
  rsc.earthGroup.rotation.y += 0.005;
  rsc.earthGroup.rotation.z = 59.5;
  rsc.moon.rotation.y += 0.01
  rsc.earth.rotation.y += 0.01

  rsc.mars.rotation.y += 0.005;
  rsc.mars.rotation.z += 0.0004;

  rsc.jupiter.rotation.x += 0.0002;
  rsc.jupiter.rotation.y += 0.003;

  rsc.saturn.rotation.x += 0.00013;
  rsc.saturn.rotation.y += 0.008;
  rsc.saturn.rotation.x += 0.0001;
  rsc.saturnGroup.rotation.y += 0.003;
  rsc.saturnRings.rotation.x += 0.00005;

  rsc.uranus.rotation.y += 0.007;
  rsc.uranus.rotation.z += 0.0002;
  rsc.uranusGroup.rotation.y += 0.0005;
  rsc.uranusGroup.rotation.z += 0.0001;
  rsc.uranusRings.rotation.y += 0.0003;

  rsc.neptune.rotation.x += 0.0002;
  rsc.neptune.rotation.y += 0.006;

  rsc.mercuryRotationGroup.rotation.y += 0.008;
  rsc.venusRotationGroup.rotation.y += 0.001;
  rsc.earthRotationGroup.rotation.y += 0.0008;
  rsc.marsRotationGroup.rotation.y += 0.0006;
  rsc.jupiterRotationGroup.rotation.y += 0.0005;
  rsc.saturnRotationGroup.rotation.y += 0.0003;
  rsc.uranusRotationGroup.rotation.y += 0.0002;
  rsc.neptuneRotationGroup.rotation.y += 0.0001;
}



init();