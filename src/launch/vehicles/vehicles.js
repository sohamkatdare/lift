import '../../style.css'

import * as THREE from 'three';
import isTouchDevice from '../../util';
import * as rsc from '../../resources';



const scene = rsc.sceneSetup("/2k_stars_milky_way.jpg");

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
  console.log("hello")
}
const camera = rsc.createView(scene, 45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = rsc.rendererSetup(scene, camera)



const neptune = addPlanet('/2k_neptune.jpg', 4, 32);
addToScene(neptune, 0, 0, -15);

// const controls = new OrbitControls(camera, renderer.domElement)



rsc.starForge(scene);

function animate() {
  requestAnimationFrame(animate);
  updatePlanets();
  renderer.render(scene, camera);
}

function updatePlanets() {
    neptune.rotation.y += 0.006;
}

animate();


// * THREEJS COMPLETE
// Get all accordion buttons
const accordionButtons = document.querySelectorAll("[id^='toggle']");

// Attach click event listeners to accordion buttons
accordionButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Get the accordion body associated with the clicked button
    const accordionBody = document.querySelector(`#${button.id.replace("toggle", "accordion")}`);
    
    // Toggle the visibility of the accordion body
    accordionBody.classList.toggle("active");
    
    // Toggle the "aria-expanded" attribute of the button
    button.setAttribute("aria-expanded", button.getAttribute("aria-expanded") === "true" ? "false" : "true");
  });
});
