import '../../style.css';

import * as THREE from 'three';
import * as rsc from '../../resources';



let [scene, camera, renderer, stars] = rsc.heroSetup();


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
      location.reload();
    } else {
      if (orientation !== window.orientation) {
        location.reload();
      }
      orientation = window.orientation;
    }
  }, 500); 
}
window.onresize = resize;


const earth = addNormalPlanet('https://va3c.github.io/three.js/examples/textures/land_ocean_ice_cloud_2048.jpg', 5, 32, '/minified/2k_earth_normal-min.jpeg');
const moon = addPlanet('/minified/2k_moon-min.jpg', 1, 32); //THESE ARE SWITCHED SO THAT THE EARTH DOES NOT ROTATE THE MOON
moon.position.set(6.5, 0, 0)

const earthGroup = new THREE.Group();
earthGroup.add(moon)
earthGroup.add(earth)
addToScene(earthGroup, 0, 0, -17);

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

// * THREEJS COMPLETE
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll("#tabs .tab");
  const tabBodies = document.querySelectorAll(".tabbody");

  function setActiveTab(tab) {
    tabs.forEach((t) => {
      t.classList.remove("tab-active");
    });

    tab.classList.add("tab-active");
  }

  function showTabBody(index) {
    tabBodies.forEach((tb, i) => {
      tb.classList[i === index ? "add" : "remove"]("visible");
    });
  }

  // Set the first tab body as visible by default
  tabBodies[0].classList.add("visible");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      setActiveTab(tab);
      showTabBody(index);
    });
  });
});

const links = document.querySelectorAll('.carousel-link');
links.forEach(link => {
  link.addEventListener('click', event => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  });
});

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





