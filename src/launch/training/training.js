  import '../../base.css'

import * as THREE from 'three';
import * as rsc from '../../resources';

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


let scene, camera, renderer, stars;
let uranus, uranusRing, uranusRingMaterial, uranusRings, uranusGroup, satelliteGroup;
function setup() {
  [scene, camera, renderer, stars] = rsc.heroSetup();
  uranus = addPlanet('https://static.wikia.nocookie.net/planet-texture-maps/images/c/c2/Dh_uranus_texture.png', 4, 32);
  uranusRing = new THREE.RingGeometry(4.65, 4.75);
  uranusRingMaterial = new THREE.MeshBasicMaterial({ color: 0xB2BEB5, side: THREE.DoubleSide })
  uranusRingMaterial.opacity = 0.5;
  uranusRings = new THREE.Mesh(uranusRing, uranusRingMaterial);
  uranusGroup = new THREE.Group();
  uranusGroup.add(uranus);
  uranusGroup.add(uranusRings);
  satelliteGroup = new THREE.Group();
  satelliteGroup.add(uranusGroup)
  satelliteGroup.add(uranus);
  satelliteGroup.add(uranusRings);
  for (let i = 0; i < 30; i++) {
    const height = Math.random() * 0.5 + 2.1;
    const start = Math.random() * 300;
    const length = Math.random() * 25;
    const uranusLine = rsc.createArcLine(height, '#' + Math.floor(Math.random() * 16777215).toString(16), start, start + length);
    satelliteGroup.add(uranusLine);
  }
  satelliteGroup.position.set(0, 0, -15);
  scene.add(satelliteGroup);
  
  
  uranusGroup.position.set(0, 0, -15);
  scene.add(uranusGroup);
}
setup()

function addPlanet(mapTexture, size, detail) {
  const texture = new THREE.TextureLoader().load(mapTexture);
  const geometry = new THREE.SphereGeometry(size, detail, detail);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const planet = new THREE.Mesh(geometry, material);
  return planet
}






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
    uranus.rotation.y += 0.007 * timeDelta;
    uranus.rotation.z += 0.0002 * timeDelta;
    uranusGroup.rotation.y += 0.0007 * timeDelta;
    uranusGroup.rotation.z += 0.0001 * timeDelta;
    stars.rotation.y += 0.0001 * timeDelta;
}

let prevScrollPos = window.scrollY || document.documentElement.scrollTop;

function handleScroll() {
  const currentScrollPos = window.scrollY || document.documentElement.scrollTop;
  const scrollDirection = currentScrollPos > prevScrollPos ? 'down' : 'up';
  const scrollDistance = Math.abs(currentScrollPos - prevScrollPos);

  const normalizedValue = scrollDistance / 1500;

  const inverter = scrollDirection === 'down' ? -1 : 1;
  
  stars.position.y += inverter * normalizedValue*50;
  stars.rotation.y += inverter * normalizedValue/10;
  satelliteGroup.position.y -= inverter * normalizedValue * 20;
  satelliteGroup.position.z += inverter * normalizedValue * 20;

  prevScrollPos = currentScrollPos;
}

document.addEventListener('scroll', handleScroll);

animate();


