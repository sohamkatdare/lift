import '../style.css'
import * as rsc from '../resources';
import * as THREE from 'three';


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

let [scene, camera, renderer, stars] = rsc.heroSetup();



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


const saturn = addPlanet('/2k_saturn.jpg', 4.5, 32);
const saturnRing = new THREE.RingGeometry(6, 11);
const saturnRingTexture = new THREE.TextureLoader().load('/2k_saturn_rings.png');
const saturnRingMaterial = new THREE.MeshBasicMaterial({ map: saturnRingTexture, side: THREE.DoubleSide })
const saturnRings = new THREE.Mesh(saturnRing, saturnRingMaterial);
const saturnGroup = new THREE.Group();
saturnGroup.add(saturn);
saturnGroup.add(saturnRings);

saturnRings.rotation.set(67.5, 0, 0);
addToScene(saturnGroup, 0, 0, -20);

function animate() {
  requestAnimationFrame(animate);
  updatePlanets();
  renderer.render(scene, camera);
}

function updatePlanets() {
  saturn.rotation.x += 0.00013;
  saturn.rotation.y += 0.008;
  saturnGroup.rotation.x += 0.0001;
  saturnGroup.rotation.y += 0.003;
  saturnRings.rotation.y += 0.00005;
  stars.rotation.y += 0.0001;
}

animate();

rsc.button.onclick = () => {
  rsc.toggle();
} 