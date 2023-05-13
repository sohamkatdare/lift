import '../../style.css'
import * as rsc from '../../resources';
import * as THREE from 'three';


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
let saturn, saturnRing, saturnRingTexture, saturnRingMaterial, saturnRings, saturnGroup;
function setup() {
  [scene, camera, renderer, stars] = rsc.heroSetup();
  saturn = addPlanet('/2k_saturn.jpg', 4.5, 32);
  saturnRing = new THREE.RingGeometry(6, 11);
  saturnRingTexture = new THREE.TextureLoader().load('/2k_saturn_rings.png');
  saturnRingMaterial = new THREE.MeshBasicMaterial({ map: saturnRingTexture, side: THREE.DoubleSide })
  saturnRings = new THREE.Mesh(saturnRing, saturnRingMaterial);
  saturnGroup = new THREE.Group();
  saturnGroup.add(saturn);
  saturnGroup.add(saturnRings);
  
  saturnRings.rotation.set(67.5, 0, 0);
  addToScene(saturnGroup, 0, 0, -20);
}
setup()



function addPlanet(mapTexture, size, detail) {
  const texture = new THREE.TextureLoader().load(mapTexture);
  const geometry = new THREE.SphereGeometry(size, detail, detail);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const planet = new THREE.Mesh(geometry, material);
  return planet
}



function addToScene(planet, x, y, z) {
  planet.position.set(x, y, z);
  scene.add(planet)
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
  saturn.rotation.x += 0.00013 * timeDelta;
  saturn.rotation.y += 0.008 * timeDelta;
  saturnGroup.rotation.x += 0.0001 * timeDelta;
  saturnGroup.rotation.y += 0.003 * timeDelta;
  saturnRings.rotation.y += 0.00005 * timeDelta;
  stars.rotation.y += 0.0001 * timeDelta;
}

animate();

