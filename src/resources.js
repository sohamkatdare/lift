import * as THREE from 'three';
import isTouchDevice from './util';

// renderer setup
export function rendererSetup() {
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
    renderer.setClearColor(0xffffff, 0) // makes the background match
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

export const moon = addNormalPlanet('https://va3c.github.io/three.js/examples/textures/land_ocean_ice_cloud_2048.jpg', 3, 32, '2k_earth_normal.jpeg');
export const earth = addPlanet('2k_moon.jpg', 0.5, 32); //THESE ARE SWITCHED SO THAT THE EARTH DOES NOT ROTATE THE MOON
export const earthGroup = new THREE.Group();
earthGroup.add(earth);
earthGroup.add(moon);
earth.position.set(0, 0, 4)
console.log(earth)

export const mars = addPlanet('2k_mars.jpg', 2, 32);

export const jupiter = addPlanet('2k_jupiter.jpg', 5, 32);

export const saturn = addPlanet('2k_saturn.jpg', 4.5, 32);
const saturnRing = new THREE.RingGeometry(6, 11);
const saturnRingTexture = new THREE.TextureLoader().load('2k_saturn_rings.png');
const saturnRingMaterial = new THREE.MeshBasicMaterial({ map: saturnRingTexture, side: THREE.DoubleSide })
export const saturnRings = new THREE.Mesh(saturnRing, saturnRingMaterial);
saturnRings.rotation.set(67.5, 0, 0);

export const saturnGroup = new THREE.Group();
saturnGroup.add(saturn);
saturnGroup.add(saturnRings);

export const uranus = addPlanet('https://static.wikia.nocookie.net/planet-texture-maps/images/c/c2/Dh_uranus_texture.png', 4, 32);
const uranusRing = new THREE.RingGeometry(5, 6);
const uranusRingTexture = new THREE.TextureLoader().load('uranus_ring_texture.jpeg');
const uranusRingMaterial = new THREE.MeshBasicMaterial({ map: uranusRingTexture, side: THREE.DoubleSide })
uranusRingMaterial.opacity = 0.5;
export const uranusRings = new THREE.Mesh(uranusRing, uranusRingMaterial);

export const uranusGroup = new THREE.Group();
uranusGroup.add(uranus);
uranusGroup.add(uranusRings);

export const neptune = addPlanet('2k_neptune.jpg', 4, 32);

export function addToScene(scene, planet, x, y, z) {
    planet.position.set(x, y, z);
    scene.add(planet)
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