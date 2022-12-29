import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Typed from 'typed.js';
import { ACESFilmicToneMapping, PerspectiveCamera } from 'three';


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

function addPlanet(mapTexture, size, detail) {
  const texture = new THREE.TextureLoader().load(mapTexture);
  const geometry = new THREE.DodecahedronGeometry(size, detail, detail);
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
const saturnRingTexture = new THREE.TextureLoader().load('https://tinyurl.com/saturn-rings');
const saturnRingMaterial = new THREE.MeshBasicMaterial({ map: saturnRingTexture, side: THREE.DoubleSide })
const saturnRings = new THREE.Mesh(saturnRing, saturnRingMaterial);
const saturnGroup = new THREE.Group();
saturnGroup.add(saturn);
saturnGroup.add(saturnRings);

const uranus = addPlanet('https://static.wikia.nocookie.net/planet-texture-maps/images/c/c2/Dh_uranus_texture.png', 4, 32);
const uranusRing = new THREE.RingGeometry(5, 6);
const uranusRingTexture = new THREE.TextureLoader().load('data:image/jpeg;base64,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');
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

const starTexture = new THREE.TextureLoader().load('2k_ceres_fictional.jpg')

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
  saturnGroup.rotation.y += 0.0008;
  saturnRings.rotation.y += 0.0003;

  uranus.rotation.y += 0.007;
  uranus.rotation.z += 0.0002;
  uranusGroup.rotation.y += 0.0007;
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

const spaceTexture = new THREE.TextureLoader().load('2k_stars_milky_way.jpg');
scene.background = spaceTexture;

animate()
