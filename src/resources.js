import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
// renderer setup
export function rendererSetup() {
    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg") });
    
    if (isTouchDevice()) {
        if (window.orientation == 90 || window.orientation == -90) renderer.setSize(screen.height, screen.width); 
        else renderer.setSize(screen.width, screen.height); 
    } else renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer
}

export function sceneSetup(renderer, backgroundPath) {
    const scene = new THREE.Scene();
    const bgTexture = new THREE.TextureLoader().load(backgroundPath);
    scene.background = bgTexture;
    // renderer.setClearColor(0xffffff, 0) // makes the background match
    return scene;
}

export function addPlanet(texture, size, detail, normalMapTexture) {
    const geometry = new THREE.DodecahedronGeometry(size, detail, detail);
    const materialOptions = { map: texture };
    if (normalMapTexture) materialOptions.normalMap = normalMapTexture;
    const material = new THREE.MeshStandardMaterial(materialOptions);
    const planet = new THREE.Mesh(geometry, material);

    return planet;
}


const textureLoader = new THREE.TextureLoader();

async function loadPlanetTexturesAsync() {
    return await Promise.all([
        textureLoader.loadAsync('/minified/2k_sun-min.jpg'),
        textureLoader.loadAsync('/minified/2k_mercury-min.jpg'),
        textureLoader.loadAsync('/minified/2k_venus_atmosphere-min.jpg'),
        textureLoader.loadAsync('https://va3c.github.io/three.js/examples/textures/land_ocean_ice_cloud_2048.jpg'),
        textureLoader.loadAsync('/minified/2k_earth_normal-min.jpeg'),
        textureLoader.loadAsync('/minified/2k_moon-min.jpg'),
        textureLoader.loadAsync('/minified/2k_mars-min.jpg'),
        textureLoader.loadAsync('/minified/2k_jupiter-min.jpg'),
        textureLoader.loadAsync('/minified/2k_saturn-min.jpg'),
        textureLoader.loadAsync('/minified/2k_saturn_rings-min.png'),
        textureLoader.loadAsync('https://static.wikia.nocookie.net/planet-texture-maps/images/c/c2/Dh_uranus_texture.png'),
        textureLoader.loadAsync('/minified/uranus_ring_texture-min.jpeg'),
        textureLoader.loadAsync('/minified/2k_neptune-min.jpg'),
    ]);
}

function loadPlanetTextures() {
    return [
        textureLoader.load('/minified/2k_sun-min.jpg'),
        textureLoader.load('/minified/2k_mercury-min.jpg'),
        textureLoader.load('/minified/2k_venus_atmosphere-min.jpg'),
        textureLoader.load('https://va3c.github.io/three.js/examples/textures/land_ocean_ice_cloud_2048.jpg'),
        textureLoader.load('/minified/2k_earth_normal-min.jpeg'),
        textureLoader.load('/minified/2k_moon-min.jpg'),
        textureLoader.load('/minified/2k_mars-min.jpg'),
        textureLoader.load('/minified/2k_jupiter-min.jpg'),
        textureLoader.load('/minified/2k_saturn-min.jpg'),
        textureLoader.load('/minified/2k_saturn_rings-min.png'),
        textureLoader.load('https://static.wikia.nocookie.net/planet-texture-maps/images/c/c2/Dh_uranus_texture.png'),
        textureLoader.load('/minified/uranus_ring_texture-min.jpeg'),
        textureLoader.load('/minified/2k_neptune-min.jpg'),
    ]
}


let sun, mercury, venus, earthGroup, earth, moon, mars, jupiter, saturn, saturnGroup, saturnRings, uranus, uranusGroup, uranusRings, neptune;
let solarSystem, mercuryRotationGroup, venusRotationGroup, earthRotationGroup, marsRotationGroup, jupiterRotationGroup, saturnRotationGroup, uranusRotationGroup, neptuneRotationGroup;
export async function setup() {
    const [
        sunTexture,
        mercuryTexture,
        venusTexture,
        earthTexture,
        earthNormalTexture,
        moonTexture,
        marsTexture,
        jupiterTexture,
        saturnTexture,
        saturnRingsTexture,
        uranusTexture,
        uranusRingsTexture,
        neptuneTexture
    ] = await loadPlanetTexturesAsync();
    const multiplier = 8;
    const mercuryDistanceFromSun = 3.5 * multiplier;
    const venusDistanceFromSun = 6.7 * multiplier;
    const earthDistanceFromSun = 9.3 * multiplier;
    const marsDistanceFromSun = 14.2 * multiplier;
    const jupiterDistanceFromSun = 48.4 * multiplier;
    const saturnDistanceFromSun = 88.9 * multiplier;
    const uranusDistanceFromSun = 179 * multiplier;
    const neptuneDistanceFromSun = 288 * multiplier;

    solarSystem = new THREE.Group();
    mercuryRotationGroup = new THREE.Group();
    venusRotationGroup = new THREE.Group();
    earthRotationGroup = new THREE.Group();
    marsRotationGroup = new THREE.Group();
    jupiterRotationGroup = new THREE.Group();
    saturnRotationGroup = new THREE.Group();
    uranusRotationGroup = new THREE.Group();
    neptuneRotationGroup = new THREE.Group();

    sun = addPlanet(sunTexture, 10, 32);

    mercury = addPlanet(mercuryTexture, 1, 32);
    // const mercuryOrbitRing = new THREE.RingGeometry(14.9, 15.1)
    mercuryRotationGroup.add(mercury);
    // mercuryRotationGroup.add(mercuryOrbitRing);
    mercury.position.set(0, 0, mercuryDistanceFromSun);
    solarSystem.add(mercuryRotationGroup);

    venus = addPlanet(venusTexture, 3, 32);
    venusRotationGroup.add(venus);
    venus.position.set(0, 0, venusDistanceFromSun);
    solarSystem.add(venusRotationGroup);

    moon = addPlanet(earthTexture, 3, 32, earthNormalTexture);
    earth = addPlanet(moonTexture, 0.5, 32); //THESE ARE SWITCHED SO THAT THE EARTH DOES NOT ROTATE THE MOON
    earthGroup = new THREE.Group();
    earthGroup.add(earth);
    earthGroup.add(moon);
    earth.position.set(0, 0, 4);
    earthRotationGroup.add(earthGroup);
    earthGroup.position.set(0, 0, earthDistanceFromSun);
    solarSystem.add(earthRotationGroup);

    mars = addPlanet(marsTexture, 2, 32);
    marsRotationGroup.add(mars);
    mars.position.set(0, 0, marsDistanceFromSun);
    solarSystem.add(marsRotationGroup);

    jupiter = addPlanet(jupiterTexture, 5, 32);
    jupiterRotationGroup.add(jupiter);
    jupiter.position.set(0, 0, jupiterDistanceFromSun);
    solarSystem.add(jupiterRotationGroup);

    saturn = addPlanet(saturnTexture, 4.5, 32);
    const saturnRing = new THREE.RingGeometry(6, 11);
    const saturnRingMaterial = new THREE.MeshBasicMaterial({ map: saturnRingsTexture, side: THREE.DoubleSide })
    saturnRings = new THREE.Mesh(saturnRing, saturnRingMaterial);
    saturnRings.rotation.set(67.5, 0, 0);

    saturnGroup = new THREE.Group();
    saturnGroup.add(saturn);
    saturnGroup.add(saturnRings);
    saturnRotationGroup.add(saturnGroup);
    saturnGroup.position.set(0, 0, saturnDistanceFromSun);
    solarSystem.add(saturnRotationGroup);

    uranus = addPlanet(uranusTexture, 4, 32);
    const uranusRing = new THREE.RingGeometry(5, 6);
    const uranusRingMaterial = new THREE.MeshBasicMaterial({ map: uranusRingsTexture, side: THREE.DoubleSide })
    uranusRingMaterial.opacity = 0.5;
    uranusRings = new THREE.Mesh(uranusRing, uranusRingMaterial);

    uranusGroup = new THREE.Group();
    uranusGroup.add(uranus);
    uranusGroup.add(uranusRings);
    uranusGroup.position.set(0, 0, uranusDistanceFromSun);
    uranusRotationGroup.add(uranusGroup);
    solarSystem.add(uranusRotationGroup);

    neptune = addPlanet(neptuneTexture, 4, 32);
    neptuneRotationGroup.add(neptune);
    neptune.position.set(0, 0, neptuneDistanceFromSun);
    solarSystem.add(neptuneRotationGroup);

    solarSystem.add(sun);
}

function setupNormal() {
    const [
        sunTexture,
        mercuryTexture,
        venusTexture,
        earthTexture,
        earthNormalTexture,
        moonTexture,
        marsTexture,
        jupiterTexture,
        saturnTexture,
        saturnRingsTexture,
        uranusTexture,
        uranusRingsTexture,
        neptuneTexture
    ] = loadPlanetTextures();
    sun = addPlanet(sunTexture, 10, 32);

    mercury = addPlanet(mercuryTexture, 1, 32);
    venus = addPlanet(venusTexture, 3, 32);

    moon = addPlanet(earthTexture, 3, 32, earthNormalTexture);
    earth = addPlanet(moonTexture, 0.5, 32); //THESE ARE SWITCHED SO THAT THE EARTH DOES NOT ROTATE THE MOON
    earthGroup = new THREE.Group();
    earthGroup.add(earth);
    earthGroup.add(moon);
    earth.position.set(0, 0, 4);


    mars = addPlanet(marsTexture, 2, 32);
    jupiter = addPlanet(jupiterTexture, 5, 32);


    saturn = addPlanet(saturnTexture, 4.5, 32);
    const saturnRing = new THREE.RingGeometry(6, 11);
    const saturnRingMaterial = new THREE.MeshBasicMaterial({ map: saturnRingsTexture, side: THREE.DoubleSide })
    saturnRings = new THREE.Mesh(saturnRing, saturnRingMaterial);
    saturnRings.rotation.set(67.5, 0, 0);
    saturnGroup = new THREE.Group();
    saturnGroup.add(saturn);
    saturnGroup.add(saturnRings);


    uranus = addPlanet(uranusTexture, 4, 32);
    const uranusRing = new THREE.RingGeometry(5, 6);
    const uranusRingMaterial = new THREE.MeshBasicMaterial({ map: uranusRingsTexture, side: THREE.DoubleSide })
    uranusRingMaterial.opacity = 0.5;
    uranusRings = new THREE.Mesh(uranusRing, uranusRingMaterial);
    uranusGroup = new THREE.Group();
    uranusGroup.add(uranus);
    uranusGroup.add(uranusRings);



    neptune = addPlanet(neptuneTexture, 4, 32);
}

setupNormal()
export {
    sun, 
    mercury, 
    venus, 
    earthGroup, 
    earth, 
    moon, 
    mars, 
    jupiter, 
    saturn, 
    saturnGroup, 
    uranus, 
    uranusGroup, 
    neptune,
    solarSystem,
    mercuryRotationGroup,
    venusRotationGroup,
    earthRotationGroup,
    marsRotationGroup,
    jupiterRotationGroup,
    saturnRotationGroup,
    uranusRotationGroup,
    neptuneRotationGroup,
    saturnRings, 
    uranusRings, 
}
export function addToScene(scene, planet, x, y, z) {
    setupNormal()
    planet.position.set(x, y, z);
    scene.add(planet)
}
export async function addSolarSystem(scene) {
    await setup();
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
        const spread = i/3 + 500;
        const x = THREE.MathUtils.randFloatSpread( spread );
        const y = THREE.MathUtils.randFloatSpread( spread );
        const z = THREE.MathUtils.randFloatSpread( spread );

        vertices.push(x, y, z);

    }
    var starGeometry = new THREE.SphereGeometry(200, 100, 50);
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    var starMaterial = new THREE.PointsMaterial({
        size: 1.0, 
        opacity: 0.7,
    });

    var stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}


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



export function isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
}

