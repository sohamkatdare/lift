import '../../style.css'

import * as THREE from 'three';
import isTouchDevice from '../../util';

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

function addToScene(planet, x, y, z) {
  planet.position.set(x, y, z);
  scene.add(planet)
  console.log("hello")
}

renderer.setClearColor(0xffffff, 0) // makes the background match

const neptune = addPlanet('/2k_neptune.jpg', 4, 32);
addToScene(neptune, 0, 0, -15);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(0);
// const controls = new OrbitControls(camera, renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

// Old Star Generation
  // function addStar(spread, starGeometry, starMaterial) {
  //   const star = new THREE.Mesh(starGeometry, starMaterial)
  //   const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(spread))
  //   star.position.set(x, y, z)
  //   scene.add(star)
  // }

  // const starGeometry = new THREE.DodecahedronGeometry(0.25, 32, 32)
  // const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })

  // Array(75).fill().forEach(() => addStar(100, starGeometry, starMaterial))
  // Array(100).fill().forEach(() => addStar(200, starGeometry, starMaterial))
  // Array(100).fill().forEach(() => addStar(1000, starGeometry, starMaterial))

// NEW Star Generation 
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
    neptune.rotation.y += 0.006;
}

animate();