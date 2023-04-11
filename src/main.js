import './style.css'
import * as rsc from './resources';
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { section } from './cursor';

// const stats = new Stats()
// document.body.appendChild(stats.dom)


const scene = rsc.sceneSetup("/2k_stars_milky_way.jpg");

//sadasdasd   

const camera = rsc.cameraSetup(scene, 45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = rsc.rendererSetup(scene, camera);
// const cameraRotationGroup = new THREE.Group();
// cameraRotationGroup.add(camera);

const cameraOriginalPosition = new THREE.Vector3(0, 20, 40)
camera.position.set(0, 200, 800);
camera.rotation.set(5, 0, 0);


let selectedPlanet;



let stars = rsc.starForge(scene)
scene.add(stars)

let isSwitchingPlanet = false;

function animate() {
  if(!isSwitchingPlanet) {
    requestAnimationFrame(animate);
    // controls.update();
    updatePlanets();
    const offset = planetsOffsets[section];
    rsc.updateCameraPosition(camera, selectedPlanet, new THREE.Vector3(offset[0], offset[1], offset[2]), 0.008, planetFOVs[section])
    renderer.render(scene, camera);
    stats.update()
  }

}

let planets;
let planetsOffsets;
let planetFOVs;

async function init() {
  await rsc.addSolarSystem(scene);
  updatePlanetsAxialTilt();
  planets = [rsc.moon, rsc.mars, rsc.jupiter, rsc.saturn, rsc.uranus, rsc.neptune]
  planetsOffsets = [[3, 2, 3], [0, 0, 0], [3, 2, 3], [3, 2, 3], [0, 0, 0], [3, 2, 3]];
  planetFOVs = [20, 10, 20, 20, 17, 20];
  selectedPlanet = planets[section];
  animate()
}

function switchPlanet(sectionNumber) {
  console.log("switching planet");
  console.log(selectedPlanet);
  console.log(sectionNumber);
  const startPlanet = selectedPlanet;
  selectedPlanet = planets[sectionNumber];
  console.log(selectedPlanet);

  const startPosition = camera.position.clone();
  const offset = planetsOffsets[section];
  const endPosition = selectedPlanet.position.clone().add(new THREE.Vector3(offset[0], offset[1], offset[2]));
  const startRotation = camera.quaternion.clone();
  const endRotation = new THREE.Quaternion().setFromUnitVectors(camera.up, selectedPlanet.position.clone().sub(camera.position).normalize());
  camera.lookAt(endPosition);
  // const endRotation = camera.quaternion.clone();
  // camera.lookAt(startPosition);
  const duration = 3000; // milliseconds
  const startTime = performance.now();

  function updateCameraPosition() {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const newPosition = new THREE.Vector3().lerpVectors(startPosition, endPosition, progress);
    const newRotation = new THREE.Quaternion().slerpQuaternions(startRotation, endRotation, progress);
    camera.position.copy(newPosition);
    camera.quaternion.copy(newRotation);

    // Update camera FOV and aspect ratio to match viewport
    const aspectRatio = window.innerWidth / window.innerHeight;
    camera.fov = planetFOVs[sectionNumber];
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();


    renderer.render(scene, camera);
    if (progress < 1) {
      requestAnimationFrame(updateCameraPosition);
      isSwitchingPlanet = true
      updatePlanets();
      stats.update()
    } 
    else isSwitchingPlanet = false;
  }

  // updateCameraPosition();
}

function updatePlanetsAxialTilt() {
  rsc.mercury.rotation.z = THREE.MathUtils.degToRad(0.01);
  rsc.venus.rotation.z = THREE.MathUtils.degToRad(177.44);
  rsc.mars.rotation.z = THREE.MathUtils.degToRad(25.19);
  rsc.jupiter.rotation.z = THREE.MathUtils.degToRad(3.13);
  rsc.saturnGroup.rotation.z = THREE.MathUtils.degToRad(26.7);
  rsc.uranusGroup.rotation.z = THREE.MathUtils.degToRad(97.8);
  rsc.neptune.rotation.z = THREE.MathUtils.degToRad(28.3);
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
function updatePlanets() {
  rsc.sun.rotation.y += 0.001;
  rsc.mercury.rotation.y += 0.01;
  rsc.venus.rotation.y += 0.01;

  rsc.earthGroup.rotation.x = 59.5;
  rsc.earthGroup.rotation.y += 0.005;
  rsc.earthGroup.rotation.z = 59.5;
  rsc.moon.rotation.y += 0.01
  rsc.earth.rotation.y += 0.01

  rsc.mars.rotation.y += 0.005;


  rsc.jupiter.rotation.y += 0.003;

  // rsc.saturn.rotation.y += 0.003;
  rsc.saturnGroup.rotation.y += 0.008;
  // rsc.saturnRings.rotation.x += 0.00005;

  rsc.uranus.rotation.y += 0.007;
  rsc.uranusGroup.rotation.y += 0.0005;
  rsc.uranusRings.rotation.y += 0.0003;

  rsc.neptune.rotation.y += 0.006;

  rsc.mercuryRotationGroup.rotation.y += 0.008;
  rsc.mercuryRotationGroup.rotation.x += 0.0008 * 2;
  rsc.venusRotationGroup.rotation.y += 0.001;
  rsc.venusRotationGroup.rotation.x += 0.0001 * 2;
  rsc.earthRotationGroup.rotation.y += 0.0008;
  rsc.earthRotationGroup.rotation.x += 0.00008 * 2;
  rsc.marsRotationGroup.rotation.y += 0.0006;
  rsc.marsRotationGroup.rotation.x += 0.00006 * 2;
  rsc.jupiterRotationGroup.rotation.y += 0.0005;
  rsc.jupiterRotationGroup.rotation.x += 0.00005 * 2;
  rsc.saturnRotationGroup.rotation.y += 0.0003;
  rsc.saturnRotationGroup.rotation.x += 0.00003 * 2;
  rsc.uranusRotationGroup.rotation.y += 0.0002;
  rsc.uranusRotationGroup.rotation.x += 0.00002 * 2;
  rsc.neptuneRotationGroup.rotation.y += 0.0001;
  rsc.neptuneRotationGroup.rotation.x += 0.00001 * 2;

  stars.rotation.y -= 0.0002;
}



init();

export { switchPlanet };