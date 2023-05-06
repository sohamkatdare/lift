import '../style.css'
import * as rsc from '../resources';
import * as THREE from 'three';





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

let [scene, camera, renderer, stars] = rsc.heroSetup();

function addPlanet(mapTexture, size, detail) {
  const texture = new THREE.TextureLoader().load(mapTexture);
  const geometry = new THREE.DodecahedronGeometry(size, detail, detail);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const planet = new THREE.Mesh(geometry, material);
  return planet
}

const jupiter = addPlanet('/2k_jupiter.jpg', 2, 32);
const satelliteGroup = new THREE.Group();
satelliteGroup.add(jupiter);
for (let i = 0; i < 30; i++) {
  const height = Math.random() * 0.5 + 2.1;
  const start = Math.random() * 300;
  const length = Math.random() * 25;
  const jupiterLine = rsc.createArcLine(height, '#' + Math.floor(Math.random() * 16777215).toString(16), start, start + length);
  satelliteGroup.add(jupiterLine);
}
satelliteGroup.position.set(0, 0, -7);
scene.add(satelliteGroup);

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
  jupiter.rotation.y += 0.005 * timeDelta;
  for (let i = 0; i < satelliteGroup.children.length; i++) {
    const child = satelliteGroup.children[i];
    if (child.type != 'Line') continue;
    child.rotation.y += Math.random() * (0.02 - 0.01) + (0.01) * timeDelta;
  }
  stars.rotation.y += 0.0001 * timeDelta;
}
animate();

let prevScrollPos = window.scrollY || document.documentElement.scrollTop;

function handleScroll() {
  const currentScrollPos = window.scrollY || document.documentElement.scrollTop;
  const scrollDirection = currentScrollPos > prevScrollPos ? 'down' : 'up';
  const scrollDistance = Math.abs(currentScrollPos - prevScrollPos);

  const normalizedValue = scrollDistance / 1500;

  const inverter = scrollDirection === 'down' ? -1 : 1;

  stars.position.y += inverter * normalizedValue * 50;
  stars.rotation.y += inverter * normalizedValue / 10;
  satelliteGroup.position.y -= inverter * normalizedValue * 20;
  satelliteGroup.position.z += inverter * normalizedValue * 20;

  prevScrollPos = currentScrollPos;
}

document.addEventListener('scroll', handleScroll);


rsc.button.onclick = () => {
  rsc.toggle();
}

