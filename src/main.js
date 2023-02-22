import './style.css'

import * as THREE from 'three';
import isTouchDevice from './util';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

// loader.load( 'black_hole.glb', function ( gltf ) {
//   scene.add(gltf.scene) 

// }, undefined, function ( error ) {

// 	console.error( error );

// } );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
if (isTouchDevice()) {
  if (window.orientation == 90 || window.orientation == -90) {
    renderer.setSize(screen.height, screen.width); // Includes space for the address bar and tabs.
  } else {
    renderer.setSize(screen.width, screen.height); // Includes space for the address bar and tabs.
  }
} else {
    renderer.setSize(window.innerWidth, window.innerHeight);
}


const scene = new THREE.Scene();

const spaceTexture = new THREE.TextureLoader().load('2k_stars_milky_way.jpg');
scene.background = spaceTexture;

function addPlanet(mapTexture, size, detail) {
  const texture = new THREE.TextureLoader().load(mapTexture);
  const geometry = new THREE.SphereGeometry(size, detail, detail);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const planet = new THREE.Mesh(geometry, material);
  return planet
}

function addNormalPlanet(mapTexture, size, detail, normalMapTexture) {
  const texture = new THREE.TextureLoader().load(mapTexture)
  const normalTexture = new THREE.TextureLoader().load(normalMapTexture)
  const geometry = new THREE.DodecahedronGeometry(size, detail, detail);
  const material = new THREE.MeshStandardMaterial({ map: texture, normalMap: normalTexture });
  const planet = new THREE.Mesh(geometry, material);
  return planet
}

renderer.setClearColor(0xffffff, 0) // makes the background match

const moon = addNormalPlanet('https://va3c.github.io/three.js/examples/textures/land_ocean_ice_cloud_2048.jpg', 3, 32, '2k_earth_normal.jpeg');
const earth = addPlanet('2k_moon.jpg', 0.5, 32); //THESE ARE SWITCHED SO THAT THE EARTH DOES NOT ROTATE THE MOON
earth.position.set(4.5, 0, 0)

const earthGroup = new THREE.Group();
earthGroup.add(earth)
earthGroup.add(moon)
earthGroup.position.set(3, 0.2, -10)

const mars = addPlanet('2k_mars.jpg', 2, 32);
const jupiter = addPlanet('2k_jupiter.jpg', 5, 32);

const saturn = addPlanet('2k_saturn.jpg', 4.5, 32);
const saturnRing = new THREE.RingGeometry(6, 11);
const saturnRingTexture = new THREE.TextureLoader().load('2k_saturn_rings.png');
const saturnRingMaterial = new THREE.MeshBasicMaterial({ map: saturnRingTexture, side: THREE.DoubleSide })
const saturnRings = new THREE.Mesh(saturnRing, saturnRingMaterial);
const saturnGroup = new THREE.Group();
saturnGroup.add(saturn);
saturnGroup.add(saturnRings);

const uranus = addPlanet('https://static.wikia.nocookie.net/planet-texture-maps/images/c/c2/Dh_uranus_texture.png', 4, 32);
const uranusRing = new THREE.RingGeometry(5, 6);
const uranusRingTexture = new THREE.TextureLoader().load('uranus_ring_texture.jpeg');
const uranusRingMaterial = new THREE.MeshBasicMaterial({ map: uranusRingTexture, side: THREE.DoubleSide })
uranusRingMaterial.opacity = 0.5;
const uranusRings = new THREE.Mesh(uranusRing, uranusRingMaterial);
const uranusGroup = new THREE.Group();
uranusGroup.add(uranus);
uranusGroup.add(uranusRings);
const neptune = addPlanet('2k_neptune.jpg', 4, 32);


mars.position.set(-3, 5, 5);
jupiter.position.set(-18, -2, 10);
saturnGroup.position.set(-35, 5, 20);
saturnRings.rotation.set(67.5, 0, 0);
uranusGroup.position.set(-30, -5, 70);
neptune.position.set(0, 0, 70);

scene.add(earthGroup);
scene.add(mars);
scene.add(jupiter);
scene.add(saturnGroup);
scene.add(uranusGroup);
scene.add(neptune);


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(0);
// const controls = new OrbitControls(camera, renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

function addStar(spread, starGeometry, starMaterial) {
  const star = new THREE.Mesh(starGeometry, starMaterial)
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(spread))
  star.position.set(x, y, z)
  scene.add(star)
}

const starGeometry = new THREE.DodecahedronGeometry(0.25, 32, 32)
const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })

Array(75).fill().forEach(() => addStar(100, starGeometry, starMaterial))
Array(100).fill().forEach(() => addStar(200, starGeometry, starMaterial))
Array(100).fill().forEach(() => addStar(1000, starGeometry, starMaterial))

function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  updatePlanets();
  renderer.render(scene, camera);
}

function updatePlanets() {
  earthGroup.rotation.x = 59.5;
  earthGroup.rotation.y += 0.005;
  earthGroup.rotation.z = 59.5;
  moon.rotation.y += 0.01
  earth.rotation.y += 0.01

  mars.rotation.y += 0.005;
  mars.rotation.z += 0.0004;

  jupiter.rotation.x += 0.0002;
  jupiter.rotation.y += 0.003;

  saturn.rotation.x += 0.00013;
  saturn.rotation.y += 0.008;
  saturnGroup.rotation.x += 0.0001;
  saturnGroup.rotation.y += 0.003;
  saturnRings.rotation.y += 0.00005;

  uranus.rotation.y += 0.007;
  uranus.rotation.z += 0.0002;
  uranusGroup.rotation.y += 0.0005;
  uranusGroup.rotation.z += 0.0001;
  uranusRings.rotation.y += 0.0003;

  neptune.rotation.x += 0.0002;
  neptune.rotation.y += 0.006;
}

function moveCamera() {
  const speedMultiplier = 1.8
  const t = document.body.getBoundingClientRect().top * speedMultiplier
  camera.rotation.y = t * -0.0002
  camera.position.z = t * -0.005
  earthGroup.position.y = t * -0.001
  mars.position.y = 2 + t * 0.0015
  jupiter.position.y = 7 + t * 0.002

  saturnGroup.position.x = -105 - t * 0.009
  saturnGroup.position.y = -4 - t * 0.001
  saturnGroup.position.z = -10 - t * 0.005

  uranusGroup.position.x = 25 + t * 0.006
  uranusGroup.position.y = -20 - t * 0.002
  uranusGroup.position.z = 25 - t * 0.004

  neptune.position.x = 65 + t * 0.008
  neptune.position.y = -30 - t * 0.0023
  neptune.position.z = 25 - t * 0.005

}
document.body.onscroll = moveCamera

animate();