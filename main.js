import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Typed from 'typed.js';

const planetTexture = new THREE.TextureLoader().load('const planet = 2k_mars.jpg');

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

renderer.setClearColor( 0xffffff, 0) // makes the background match
const geometry1 = new THREE.SphereGeometry(4, 32, 32);
const material1 = new THREE.MeshBasicMaterial({color: '#dca54c', wireframe: true,})
const geometry2 = new THREE.SphereGeometry(2, 32, 32);
const material2 = new THREE.MeshBasicMaterial({color: '#fff', wireframe: true,})
const planet1 = new THREE.Mesh(geometry1, material1)
const planet2 = new THREE.Mesh(geometry2, material2)

planet1.position.set(3, 0, -10);
planet2.position.set(0, 0, 15);

scene.add(planet1);
scene.add(planet2);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(0);

const ambientLight = new THREE.AmbientLight(0xffffff)

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

scene.add(ambientLight)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.3, 32, 32)
  const material = new THREE.MeshStandardMaterial( { color : 0xffffff} )
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z)
  scene.add(star)

}

Array(200).fill().forEach(addStar)

// const velocitys = Array(200).fill().forEach(() => new THREE.Vector3(Math.random(-0.1, 0.1), Math.random(-0.1, 0.1), Math.random(-0.1, 0.1)))
// function updateStars() {
//   if (stars.length == 200) {
//     for (let i = 0; i < stars.length; i++) {
//       const star = stars[i];
//       const velocity = velocitys[i]
//       star.x += velocity.x
//       star.y += velocity.y
//       star.z += velocity.z
//     }
//   }
  
// }


//  const starGeometry = new THREE.Geometry();
  // let star;
  // for (let i = 0; i < 6000; i++) {
  //   star = new THREE.Vector3(
  //     Math.random() * 600 - 300,
  //     Math.random() * 600 - 300,
  //     Math.random() * 600 - 300,
  //   );
  //   star.velocity = 0;
  //   star.acceleration = 0.02
  //   starGeometry.vertices.push(star)
  // }
  // let sprite = new THREE.TextureLoader().load('circle.png')
  // let starMaterial = new THREE.PointsMaterial({
  //   color: 0xaaaaaa,
  //   size: 0.7,
  //   map: sprite
  // })
  // let stars = new THREE.Points(starGeometry, starMaterial)
  // scene.add(stars)

function animate() {
  requestAnimationFrame(animate);
  
  updatePlanets();
  
  // updateStars();

  
  renderer.render(scene, camera);
}

function updatePlanets() {
  planet1.rotation.x += 0.0005;
  planet1.rotation.y += 0.005;
  planet1.rotation.z += 0.0005;

  planet2.rotation.x += 0.0005;
  planet2.rotation.y += 0.005;
  planet2.rotation.z += 0.0005;
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top
  camera.rotation.y = t * -0.0002
  camera.position.z = t * -0.005
  // camera.rotation.x -= t * 0.00002
  // camera.rotation.z -= t * 0.00002
}
document.body.onscroll = moveCamera
// function starMovement() {
//   starGeometry.vertices.forEach(p=> {
//     p.velocity += p.acceleration
//     p.y -= p.velocity
//     if(p.y < -200) {
//       p.y = 200
//       p.velocity = 0;
//     }
//   })
//   starGeometry.verticesNeedUpdate = true
//   stars.rotation.y += 0.002

// }



const spaceTexture = new THREE.TextureLoader().load('space_texture.jpg');
scene.background = spaceTexture;

animate()

document.querySelector("#gstar").addEventListener('click', (event) => {
  var point = new THREE.Vector3(0, 0, 15);
  var travelPoint = new THREE.Vector3(0, 0, 0)
  while(travelPoint.z < point.z) {
    travelPoint.z += 0.0001; 
    camera.lookAt(travelPoint);
  }
  
})

// .lerpVectors ( v1 : Vector3, v2 : Vector3, alpha : Float ) : this
// v1 - the starting Vector3.
// v2 - Vector3 to interpolate towards.
// alpha - interpolation factor, typically in the closed interval [0, 1].

// Sets this vector to be the vector linearly interpolated between v1 and v2 where alpha is the percent distance along the line connecting the two vectors - alpha = 0 will be v1, and alpha = 1 will be v2.
renderer.render(scene, camera);