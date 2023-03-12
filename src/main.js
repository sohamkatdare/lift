import './style.css'
import * as rsc from './resources';

const renderer = rsc.rendererSetup();

const scene = rsc.sceneSetup(renderer, "2k_stars_milky_way.jpg");

rsc.addToScene(scene, rsc.earthGroup, 3, 0.2, -10);
rsc.addToScene(scene, rsc.mars, -3, 5, 5);
rsc.addToScene(scene, rsc.jupiter, -18, -2, 10);
rsc.addToScene(scene, rsc.saturnGroup, -35, 5, 20);
rsc.addToScene(scene, rsc.uranusGroup, -30, -5, 70);
rsc.addToScene(scene, rsc.neptune, 0, 0, 70);


const camera = rsc.createView(scene, 45, window.innerWidth / window.innerHeight, 0.1, 1000);

rsc.starForge(scene);

function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  updatePlanets();
  renderer.render(scene, camera);
  moveCamera();
}

function updatePlanets() {
  rsc.earthGroup.rotation.x = 59.5;
  rsc.earthGroup.rotation.y += 0.005;
  rsc.earthGroup.rotation.z = 59.5;
  rsc.moon.rotation.y += 0.01
  rsc.earth.rotation.y += 0.01

  rsc.mars.rotation.y += 0.005;
  rsc.mars.rotation.z += 0.0004;

  rsc.jupiter.rotation.x += 0.0002;
  rsc.jupiter.rotation.y += 0.003;

  rsc.saturn.rotation.x += 0.00013;
  rsc.saturn.rotation.y += 0.008;
  rsc.saturnGroup.rotation.x += 0.0001;
  rsc.saturnGroup.rotation.y += 0.003;
  rsc.saturnRings.rotation.y += 0.00005;

  rsc.uranus.rotation.y += 0.007;
  rsc.uranus.rotation.z += 0.0002;
  rsc.uranusGroup.rotation.y += 0.0005;
  rsc.uranusGroup.rotation.z += 0.0001;
  rsc.uranusRings.rotation.y += 0.0003;

  rsc.neptune.rotation.x += 0.0002;
  rsc.neptune.rotation.y += 0.006;
}

function moveCamera() {
  const speedMultiplier = 1.8
  const scrollOffset = document.body.getBoundingClientRect().top * speedMultiplier

  camera.rotation.y = scrollOffset * -0.0002
  camera.position.z = scrollOffset * -0.005

  rsc.earthGroup.position.y = scrollOffset * -0.001
  rsc.mars.position.y = 2 + scrollOffset * 0.0015
  rsc.jupiter.position.y = 7 + scrollOffset * 0.002

  rsc.saturnGroup.position.x = -105 - scrollOffset * 0.009
  rsc.saturnGroup.position.y = -4 - scrollOffset * 0.001
  rsc.saturnGroup.position.z = -10 - scrollOffset * 0.005

  rsc.uranusGroup.position.x = 25 + scrollOffset * 0.006
  rsc.uranusGroup.position.y = -20 - scrollOffset * 0.002
  rsc.uranusGroup.position.z = 25 - scrollOffset * 0.004

  rsc.neptune.position.x = 65 + scrollOffset * 0.008
  rsc.neptune.position.y = -30 - scrollOffset * 0.0023
  rsc.neptune.position.z = 25 - scrollOffset * 0.005

}

animate();