  import '../../style.css'

import * as THREE from 'three';
import isTouchDevice from '../../util';

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg-uranus"),
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

const spaceTexture = new THREE.TextureLoader().load('/2k_stars_milky_way.jpg');
scene.background = spaceTexture;

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

const uranus = addPlanet('https://static.wikia.nocookie.net/planet-texture-maps/images/c/c2/Dh_uranus_texture.png', 4, 32);
const uranusRing = new THREE.RingGeometry(5.25, 5.75);
const uranusRingTexture = new THREE.TextureLoader().load('/uranus_ring_texture.jpeg');
const uranusRingMaterial = new THREE.MeshBasicMaterial({ map: uranusRingTexture, side: THREE.DoubleSide })
uranusRingMaterial.opacity = 0.5;
const uranusRings = new THREE.Mesh(uranusRing, uranusRingMaterial);
const uranusGroup = new THREE.Group();
uranusGroup.add(uranus);
uranusGroup.add(uranusRings);


uranusGroup.position.set(0, 0, -20);
scene.add(uranusGroup);


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(0);

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

function starForge() {

  var starQty = 45000;
  var vertices = [];
  for (var i = 0; i < starQty; i++) {		

    const spread = i/2 + 500;
    const x = THREE.MathUtils.randFloatSpread( spread );
    const y = THREE.MathUtils.randFloatSpread( spread );
    const z = THREE.MathUtils.randFloatSpread( spread );


    vertices.push(x, y, z);

  }
  var starGeometry = new THREE.SphereGeometry(1000, 100, 50);
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  var starMaterial = new THREE.PointsMaterial({
    size: 1.0, 
    opacity: 0.7
  });

  var stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}
starForge();
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
}

animate();