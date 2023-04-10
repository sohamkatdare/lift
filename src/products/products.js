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



const jupiter = addPlanet('/2k_jupiter.jpg', 2, 32);
jupiter.position.set(0, 0, -7);
scene.add(jupiter);

function animate() {
  requestAnimationFrame(animate);
  updatePlanets();
  renderer.render(scene, camera);
}

function updatePlanets() {
  jupiter.rotation.y += 0.005;
  stars.rotation.y += 0.0001;
}
animate();


rsc.button.onclick = () => {
  rsc.toggle();
} 

