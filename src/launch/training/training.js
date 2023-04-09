  import '../../style.css'

import * as THREE from 'three';
import * as rsc from '../../resources';

let orientation = window.orientation;
function resize() {
    if(!isTouchDevice()) {  // if not touch device
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



const uranus = addPlanet('https://static.wikia.nocookie.net/planet-texture-maps/images/c/c2/Dh_uranus_texture.png', 4, 32);
const uranusRing = new THREE.RingGeometry(5.25, 5.75);
const uranusRingTexture = new THREE.TextureLoader().load('/uranus_ring_texture.jpeg');
const uranusRingMaterial = new THREE.MeshBasicMaterial({ map: uranusRingTexture, side: THREE.DoubleSide })
uranusRingMaterial.opacity = 0.5;
const uranusRings = new THREE.Mesh(uranusRing, uranusRingMaterial);
const uranusGroup = new THREE.Group();
uranusGroup.add(uranus);
uranusGroup.add(uranusRings);


uranusGroup.position.set(0, 0, -15);
scene.add(uranusGroup);



function animate() {
  requestAnimationFrame(animate);
  updatePlanets();
  renderer.render(scene, camera);
}

function updatePlanets() {
    uranus.rotation.y += 0.007;
    uranus.rotation.z += 0.0002;
    uranusGroup.rotation.y += 0.0007;
    uranusGroup.rotation.z += 0.0001;
    stars.rotation.y += 0.0001;
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
  uranusGroup.position.y -= inverter * normalizedValue * 30;
  uranusGroup.position.z += inverter * normalizedValue * 20;

  prevScrollPos = currentScrollPos;
}

document.addEventListener('scroll', handleScroll);

animate();