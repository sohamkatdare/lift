import './style.css'
import * as rsc from './resources';
import * as THREE from 'three'
// import Stats from 'three/examples/jsm/libs/stats.module'
import { section, scrollBefore, scrollNext } from './cursor';
import Hammer from 'hammerjs';
import Stats from 'three/examples/jsm/libs/stats.module'
const stats = new Stats()
document.body.appendChild(stats.dom)
stats.dom.style.cssText = 'position: absolute; left: 0; bottom: 0; z-index: 10000; cursor: pointer; opacity: 0.9;';


const swipeCanvas = document.querySelector("body");
let hammer = new Hammer(swipeCanvas);

hammer.on('swipeup', () => {
  scrollNext();
});
hammer.on('swipedown', () => {
  scrollBefore();
});

function closeToast() {
  this.parentElement.parentElement.classList.add("hidden")
}

const scene = rsc.sceneSetup("/2k_stars_milky_way.jpg");


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
var timeDelta;
let smoothDeltaTime = 0;
const lerpFactor = 0.005;
let lastTime = performance.now();


function animate() {
  if (!isSwitchingPlanet) {
    requestAnimationFrame(animate);
    // controls.update();
    const currentTime = performance.now();
    const delta = (currentTime - lastTime) / 1000; // convert to seconds
    smoothDeltaTime = THREE.MathUtils.lerp(smoothDeltaTime, delta, lerpFactor);
    lastTime = currentTime;
    timeDelta = deltaTime() * 30;
    updatePlanets();
    const offset = planetsOffsets[section];
    rsc.updateCameraPosition(camera, selectedPlanet, new THREE.Vector3(offset[0], offset[1], offset[2]), 0.075 * timeDelta, planetFOVs[section])
    renderer.render(scene, camera);
    stats.update()
  }

}


function deltaTime() {
  return smoothDeltaTime;
}



let planets;
let planetsOffsets;
let planetFOVs;

async function init() {
  await rsc.addSolarSystem(scene);
  updatePlanetsAxialTilt();
  planets = [rsc.moon, rsc.mars, rsc.jupiter, rsc.saturn, rsc.uranus, rsc.neptune]
  planetsOffsets = [[3, 2, 3], [0, 0, 0], [3, 2, 3], [3, 2, 3], [0, 0, 0], [3, 2, 3]];
  planetFOVs = [20, 7, 20, 37, 17, 20];
  selectedPlanet = planets[section];
  animate()
}

function switchPlanet(sectionNumber) {
  document.querySelector("#close-toast").parentElement.parentElement.classList.add("hidden")
  selectedPlanet = planets[sectionNumber];

  const startPosition = camera.position.clone();
  const offset = planetsOffsets[section];
  const endPosition = selectedPlanet.position.clone().add(new THREE.Vector3(offset[0], offset[1], offset[2]));
  const startRotation = camera.quaternion.clone();
  const endRotation = new THREE.Quaternion().setFromUnitVectors(camera.up, selectedPlanet.position.clone().sub(camera.position).normalize());
  // const endRotation = camera.quaternion.clone();
  // camera.lookAt(startPosition);
  
  const duration = 1500; // milliseconds
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
    for(alpha = 0; alpha <= 1; alpha += 0.1) {
      camera.fov = lerp(camera.fov, planetFOVs[sectionNumber], alpha)
      camera.aspect = aspectRatio;
      camera.updateProjectionMatrix();
    }
    
    renderer.render(scene, camera);
    if (progress < 1) {
      requestAnimationFrame(updateCameraPosition);
      isSwitchingPlanet = true
      updatePlanets();
      // stats.update()
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
  if (!rsc.isTouchDevice()) {  // if not touch device
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
  rsc.sun.rotation.y += 0.001 * timeDelta;
  rsc.mercury.rotation.y += 0.01 * timeDelta;
  rsc.venus.rotation.y += 0.01 * timeDelta;

  rsc.earthGroup.rotation.x = 59.5;
  rsc.earthGroup.rotation.y += 0.005 * timeDelta;
  rsc.earthGroup.rotation.z = 59.5;
  rsc.moon.rotation.y += 0.01 * timeDelta
  rsc.earth.rotation.y += 0.01 * timeDelta

  rsc.mars.rotation.y += 0.005 * timeDelta;


  rsc.jupiter.rotation.y += 0.003 * timeDelta;

  rsc.saturn.rotation.y += 0.003 * timeDelta;
  rsc.saturnGroup.rotation.y += 0.002 * timeDelta;
  // rsc.saturnRings.rotation.y += 0.00005;

  rsc.uranus.rotation.y += 0.007 * timeDelta;
  rsc.uranusGroup.rotation.y += 0.0005 * timeDelta;
  rsc.uranusRings.rotation.y += 0.0003 * timeDelta;

  rsc.neptune.rotation.y += 0.006 * timeDelta;

  rsc.mercuryRotationGroup.rotation.y += 0.008 * timeDelta;
  rsc.mercuryRotationGroup.rotation.x = THREE.MathUtils.degToRad(4);

  rsc.venusRotationGroup.rotation.y += 0.001 * timeDelta;
  rsc.venusRotationGroup.rotation.x = THREE.MathUtils.degToRad(-2);

  rsc.earthRotationGroup.rotation.y += 0.0008 * timeDelta;

  rsc.marsRotationGroup.rotation.y += 0.0006 * timeDelta;
  rsc.marsRotationGroup.rotation.x = THREE.MathUtils.degToRad(1);

  rsc.jupiterRotationGroup.rotation.y += 0.0005 * timeDelta;
  rsc.jupiterRotationGroup.rotation.x = THREE.MathUtils.degToRad(2);

  rsc.saturnRotationGroup.rotation.y += 0.0003 * timeDelta;
  rsc.saturnRotationGroup.rotation.x = THREE.MathUtils.degToRad(-1);

  rsc.uranusRotationGroup.rotation.y += 0.0002 * timeDelta;
  rsc.uranusRotationGroup.rotation.x = THREE.MathUtils.degToRad(-1);

  rsc.neptuneRotationGroup.rotation.y += 0.0001 * timeDelta;
  rsc.neptuneRotationGroup.rotation.x = THREE.MathUtils.degToRad(3);


  stars.rotation.y -= 0.0002 * timeDelta;

  // rsc.mercuryOrbitLine.rotation.y -= 0.008;
  // rsc.venusOrbitLine.rotation.y -= 0.001;
  // rsc.earthOrbitLine.rotation.y -= 0.0008;
  // rsc.marsOrbitLine.rotation.y -= 0.0006;
  // rsc.jupiterOrbitLine.rotation.y -= 0.0005;
  // rsc.saturnOrbitLine.rotation.y -= 0.0003;
  // rsc.uranusOrbitLine.rotation.y -= 0.0002;
  // rsc.neptuneOrbitLine.rotation.y -= 0.0001;

}



init();

rsc.button.onclick = () => {
  rsc.toggle();
} 

export { switchPlanet };