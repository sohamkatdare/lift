import * as THREE from 'three';
import isTouchDevice from './util';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
// renderer setup
export function rendererSetup() {
    // const renderer = new CSS2DRenderer({
    //   canvas: document.querySelector("#bg"),
    // });
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#bg"),
    });
    
    if (isTouchDevice()) {
        if (window.orientation == 90 || window.orientation == -90) {
            renderer.setSize(screen.height, screen.width); // Includes space for the address bar and tabs.
        } else {
            renderer.setSize(screen.width, screen.height); // Includes space for the address bar and tabs.
        }
    } else {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    return renderer
}

export function sceneSetup(renderer, backgroundPath) {
    const scene = new THREE.Scene();
    const bgTexture = new THREE.TextureLoader().load(backgroundPath);
    scene.background = bgTexture;
    // renderer.setClearColor(0xffffff, 0) // makes the background match
    return scene;
}

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


const mercuryDistanceFromSun = 15
const venusDistanceFromSun = 21
const earthDistanceFromSun = 29
const marsDistanceFromSun = 37
const jupiterDistanceFromSun = 48
const saturnDistanceFromSun = 66
const uranusDistanceFromSun = 82
const neptuneDistanceFromSun = 90


export const sun = addPlanet('/minified/2k_sun-min.jpg', 10, 32);
export let solarSystem = new THREE.Group();

export const mercury = addPlanet('/minified/2k_mercury-min.jpg', 1, 32);
export const mercuryOrbitRing = new THREE.RingGeometry(14.9, 15.1)
export const mercuryRotationGroup = new THREE.Group();
mercuryRotationGroup.add(mercury);
mercuryRotationGroup.add(mercuryOrbitRing);
mercury.position.set(0, 0, mercuryDistanceFromSun);
solarSystem.add(mercuryRotationGroup);
console.log(mercury.material)
export const venus = addPlanet('/minified/2k_venus_atmosphere-min.jpg', 3, 32);
export const venusRotationGroup = new THREE.Group();
venusRotationGroup.add(venus);
venus.position.set(0, 0, venusDistanceFromSun);
solarSystem.add(venusRotationGroup);

export const moon = addNormalPlanet('https://va3c.github.io/three.js/examples/textures/land_ocean_ice_cloud_2048.jpg', 3, 32, '/minified/2k_earth_normal-min.jpeg');
export const earth = addPlanet('/minified/2k_moon-min.jpg', 0.5, 32); //THESE ARE SWITCHED SO THAT THE EARTH DOES NOT ROTATE THE MOON
export let earthGroup = new THREE.Group();
earthGroup.add(earth);
earthGroup.add(moon);
earth.position.set(0, 0, 4);
export const earthRotationGroup = new THREE.Group();
earthRotationGroup.add(earthGroup);
earthGroup.position.set(0, 0, earthDistanceFromSun);
solarSystem.add(earthRotationGroup);

export const mars = addPlanet('/minified/2k_mars-min.jpg', 2, 32);
export const marsRotationGroup = new THREE.Group();
marsRotationGroup.add(mars);
mars.position.set(0, 0, marsDistanceFromSun);
solarSystem.add(marsRotationGroup);

export const jupiter = addPlanet('/minified/2k_jupiter-min.jpg', 5, 32);
export const jupiterRotationGroup = new THREE.Group();
jupiterRotationGroup.add(jupiter);
jupiter.position.set(0, 0, jupiterDistanceFromSun);
solarSystem.add(jupiterRotationGroup);

export const saturn = addPlanet('/minified/2k_saturn-min.jpg', 4.5, 32);
const saturnRing = new THREE.RingGeometry(6, 11);
const saturnRingTexture = new THREE.TextureLoader().load('/2k_saturn_rings.png');
const saturnRingMaterial = new THREE.MeshBasicMaterial({ map: saturnRingTexture, side: THREE.DoubleSide })
export const saturnRings = new THREE.Mesh(saturnRing, saturnRingMaterial);
saturnRings.rotation.set(67.5, 0, 0);

export let saturnGroup = new THREE.Group();
saturnGroup.add(saturn);
saturnGroup.add(saturnRings);
export const saturnRotationGroup = new THREE.Group();
saturnRotationGroup.add(saturnGroup);
    saturnGroup.position.set(0, 0, saturnDistanceFromSun);
solarSystem.add(saturnRotationGroup);

export const uranus = addPlanet('https://static.wikia.nocookie.net/planet-texture-maps/images/c/c2/Dh_uranus_texture.png', 4, 32);
const uranusRing = new THREE.RingGeometry(5, 6);
const uranusRingTexture = new THREE.TextureLoader().load('/uranus_ring_texture.jpeg');
const uranusRingMaterial = new THREE.MeshBasicMaterial({ map: uranusRingTexture, side: THREE.DoubleSide })
uranusRingMaterial.opacity = 0.5;
export const uranusRings = new THREE.Mesh(uranusRing, uranusRingMaterial);

export let uranusGroup = new THREE.Group();
uranusGroup.add(uranus);
uranusGroup.add(uranusRings);
export const uranusRotationGroup = new THREE.Group();
uranusGroup.position.set(0, 0, uranusDistanceFromSun);
mercuryRotationGroup.add(uranusGroup);
solarSystem.add(uranusRotationGroup);

export const neptune = addPlanet('/minified/2k_neptune-min.jpg', 4, 32);
export const neptuneRotationGroup = new THREE.Group();
neptuneRotationGroup.add(neptune);
neptune.position.set(0, 0, neptuneDistanceFromSun);
solarSystem.add(neptuneRotationGroup);

solarSystem.add(sun);

export function addToScene(scene, planet, x, y, z) {
    planet.position.set(x, y, z);
    scene.add(planet)
}
export function addSolarSystem() {
    solarSystem.position.set(0, 0, 0)
    scene.add(solarSystem)
}

export function createView(scene, fov, aspect, near, far ) {
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);  
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.setZ(0);
    return camera;
}

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
export function starForge(scene) {

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
const maxVelocity = 5; // Set a maximum velocity based on your requirements
const lerpCoefficient = 0.1; // Adjust this value to control the smoothness of camera movement

export function updateCameraPosition(camera, planet, offset, dampingFactor) {
    // Get the planet's position in world space
    const planetWorldPosition = new THREE.Vector3();
    planet.getWorldPosition(planetWorldPosition);

    const planetRadius = new THREE.Vector3();
    const sphere = new THREE.Sphere();
    const positions = planet.geometry.attributes.position.array;
    const vertices = [];

    for (let i = 0; i < positions.length; i += 3) {
        const vertex = new THREE.Vector3(positions[i], positions[i+1], positions[i+2]);
        vertices.push(vertex);
    }

    sphere.setFromPoints(vertices);
    sphere.radius *= planet.scale.x;
    planetRadius.set(sphere.radius, sphere.radius, sphere.radius);

    // Calculate the desired position of the camera relative to the planet
    const desiredPosition = new THREE.Vector3().copy(planetWorldPosition).add(offset).add(planetRadius);

    // Use lerp to gradually move the camera towards the desired position
    camera.position.lerp(desiredPosition, dampingFactor);

    // Make the camera look at the planet in world space
    camera.lookAt(planetWorldPosition);
}
