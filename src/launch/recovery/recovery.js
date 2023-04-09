import '../../style.css';

import * as THREE from 'three';
import * as rsc from '../../resources';



let [scene, camera, renderer, stars] = rsc.heroSetup();


function addNormalPlanet(mapTexture, size, detail, normalMapTexture) {
  const texture = new THREE.TextureLoader().load(mapTexture)
  const normalTexture = new THREE.TextureLoader().load(normalMapTexture)
  const geometry = new THREE.DodecahedronGeometry(size, detail, detail);
  const material = new THREE.MeshStandardMaterial({ map: texture, normalMap: normalTexture });
  const planet = new THREE.Mesh(geometry, material);
  return planet
}


function addPlanet(mapTexture, size, detail) {
  const texture = new THREE.TextureLoader().load(mapTexture);
  const geometry = new THREE.DodecahedronGeometry(size, detail, detail);
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


const earth = addNormalPlanet('https://va3c.github.io/three.js/examples/textures/land_ocean_ice_cloud_2048.jpg', 5, 32, '/minified/2k_earth_normal-min.jpeg');
const moon = addPlanet('/minified/2k_moon-min.jpg', 1, 32); //THESE ARE SWITCHED SO THAT THE EARTH DOES NOT ROTATE THE MOON
moon.position.set(6.5, 0, 0)

const earthGroup = new THREE.Group();
earthGroup.add(moon)
earthGroup.add(earth)
addToScene(earthGroup, 4, 0, -15);

function animate() {
  requestAnimationFrame(animate);
  updatePlanets();
  renderer.render(scene, camera);
}

function updatePlanets() {
  earthGroup.rotation.x = 59.5;
  earthGroup.rotation.y += 0.005;
  earthGroup.rotation.z = 59.5;
  moon.rotation.y += 0.01
  earth.rotation.y += 0.01
  stars.rotation.y += 0.0001;
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



