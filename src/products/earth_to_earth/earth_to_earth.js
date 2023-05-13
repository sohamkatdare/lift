import '../../style.css';

import * as THREE from 'three';
import * as rsc from '../../resources';



let scene, camera, renderer, stars;
let earthGroup, earth, moon;
function setup() {
  [scene, camera, renderer, stars] = rsc.heroSetup();
  earth = addNormalPlanet('https://va3c.github.io/three.js/examples/textures/land_ocean_ice_cloud_2048.jpg', 5, 32, '/minified/2k_earth_normal-min.jpeg');
  moon = addPlanet('/minified/2k_moon-min.jpg', 1, 32); //THESE ARE SWITCHED SO THAT THE EARTH DOES NOT ROTATE THE MOON
  moon.position.set(6.5, 0, 0)
  
  earthGroup = new THREE.Group();
  earthGroup.add(moon)
  earthGroup.add(earth)
  addToScene(earthGroup, 0, 0, -17);
}
setup()


function addNormalPlanet(mapTexture, size, detail, normalMapTexture) {
  const texture = new THREE.TextureLoader().load(mapTexture)
  const normalTexture = new THREE.TextureLoader().load(normalMapTexture)
  const geometry = new THREE.SphereGeometry(size, detail, detail);
  const material = new THREE.MeshStandardMaterial({ map: texture, normalMap: normalTexture });
  const planet = new THREE.Mesh(geometry, material);
  return planet
}


function addPlanet(mapTexture, size, detail) {
  const texture = new THREE.TextureLoader().load(mapTexture);
  const geometry = new THREE.SphereGeometry(size, detail, detail);
  const materialOptions = { map: texture };
  const material = new THREE.MeshStandardMaterial(materialOptions);
  const planet = new THREE.Mesh(geometry, material);

  return planet;
}
function addToScene(planet, x, y, z) {
  planet.position.set(x, y, z);
  scene.add(planet)
}
;

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
  timeDelta = deltaTime() * 50;
  updatePlanets();
  renderer.render(scene, camera);
}

function updatePlanets() {
  earthGroup.rotation.x = 59.5;
  earthGroup.rotation.y += 0.005 * timeDelta;
  earthGroup.rotation.z = 59.5;
  moon.rotation.y += 0.01 * timeDelta
  earth.rotation.y += 0.01 * timeDelta
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
  earthGroup.position.y -= inverter * normalizedValue * 20;
  earthGroup.position.z += inverter * normalizedValue * 20;

  prevScrollPos = currentScrollPos;
}

document.addEventListener('scroll', handleScroll);





