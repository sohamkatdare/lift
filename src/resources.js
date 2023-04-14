import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";

export function sceneSetup(backgroundPath) {
    const scene = new THREE.Scene();
    const bgTexture = new THREE.TextureLoader().load(backgroundPath);
    scene.background = bgTexture;
    // renderer.setClearColor(0xffffff, 0) // makes the background match
    return scene;
}
export function cameraSetup(scene, fov, aspect, near, far) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.setZ(0);
    return camera;
}
export function isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
}
// renderer setup
export function rendererSetup(scene, camera) {
    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg"), antialias: true });

    if (isTouchDevice()) {
        if (window.orientation == 90 || window.orientation == -90) renderer.setSize(screen.height, screen.width);
        else renderer.setSize(screen.width, screen.height);
    } else renderer.setSize(window.innerWidth, window.innerHeight);

    // Add post-processing settings
    const composer = new EffectComposer(renderer);

    // Add render pass
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Add FXAA pass
    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.material.uniforms["resolution"].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    composer.addPass(fxaaPass);

    // Add bloom pass
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.1, 1, 1);
    composer.addPass(bloomPass);


    // Add less common effects
    // Example: Film pass
    // const filmPass = new FilmPass(0.8, 0.325, 256, false);
    // composer.addPass(filmPass);

    return composer;
}
// NEW Star Generation 
export function starForge() {

    var starQty = 45000;
    var vertices = [];
    for (var i = 0; i < starQty; i++) {
        const spread = i / 2 + 500;
        vertices.push(THREE.MathUtils.randFloatSpread(spread), THREE.MathUtils.randFloatSpread(spread), THREE.MathUtils.randFloatSpread(spread));
    }
    var starGeometry = new THREE.SphereGeometry(200, 100, 50);
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    var starMaterial = new THREE.PointsMaterial({
        size: 1.5,
        opacity: 0.7,
    });

    var stars = new THREE.Points(starGeometry, starMaterial);
    return stars
}

function createOrbitLine(distance, color=0xffffff80) {
    // Create the dashed orbit line
    var orbitPoints = [];
    for (var i = 0; i <= 360; i += 5) {
        var angle = i * Math.PI / 180;
        var x = distance * Math.cos(angle);
        var z = distance * Math.sin(angle);
        orbitPoints.push(new THREE.Vector3(x, 0, z));
    }
    var orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    var orbitMaterial = new THREE.LineDashedMaterial({ color: color, dashSize: 1, gapSize: 0.5 });
    var orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
    orbitLine.computeLineDistances();
    return orbitLine;
}

export function heroSetup() {
    const scene = sceneSetup('/2k_stars_milky_way.jpg');
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = rendererSetup(scene, camera);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const stars = starForge();
    scene.add(stars);
    return [scene, camera, renderer, stars];
}

function addPlanet(texture, size, detail, normalMapTexture) {
    const geometry = new THREE.SphereGeometry(size, detail, detail);
    const materialOptions = { map: texture };
    if (normalMapTexture) materialOptions.normalMap = normalMapTexture;
    const material = new THREE.MeshStandardMaterial(materialOptions);
    const planet = new THREE.Mesh(geometry, material);

    return planet;
}
function addUnlitPlanet(texture, size, detail, normalMapTexture) {
    const geometry = new THREE.SphereGeometry(size, detail, detail);
    const materialOptions = { map: texture };
    if (normalMapTexture) materialOptions.normalMap = normalMapTexture;
    const material = new THREE.MeshBasicMaterial(materialOptions);
    const planet = new THREE.Mesh(geometry, material);

    return planet;
}

async function loadPlanetTexturesAsync() {
    const urls = [
        '/minified/2k_sun-min.jpg',
        '/minified/2k_mercury-min.jpg',
        '/minified/2k_venus_atmosphere-min.jpg',
        'https://va3c.github.io/three.js/examples/textures/land_ocean_ice_cloud_2048.jpg',
        '/minified/2k_earth_normal-min.jpeg',
        '/minified/2k_moon-min.jpg',
        '/minified/2k_mars-min.jpg',
        '/minified/2k_jupiter-min.jpg',
        '/minified/2k_saturn-min.jpg',
        '/2k_saturn_rings.png',
        'https://static.wikia.nocookie.net/planet-texture-maps/images/c/c2/Dh_uranus_texture.png',
        '/uranus_ring_texture.jpg',
        '/minified/2k_neptune-min.jpg',
    ];

    const loadingManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadingManager);

    const texturePromises = urls.map(url => {
        return new Promise((resolve, reject) => {
            textureLoader.load(url, resolve, undefined, reject);
        });
    });
    return await Promise.all(texturePromises);
}

let sun, mercury, venus, earthGroup, earth, moon, mars, jupiter, saturn, saturnGroup, saturnRings, uranus, uranusGroup, uranusRings, neptune;
let solarSystem, mercuryRotationGroup, venusRotationGroup, earthRotationGroup, marsRotationGroup, jupiterRotationGroup, saturnRotationGroup, uranusRotationGroup, neptuneRotationGroup;
let mercuryOrbitLine, venusOrbitLine, earthOrbitLine, marsOrbitLine, jupiterOrbitLine, saturnOrbitLine, uranusOrbitLine, neptuneOrbitLine, moonOrbitLine;
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
    const multiplier = 16;
    const mercuryDistanceFromSun = 3.5 * multiplier;
    const venusDistanceFromSun = 6.7 * multiplier;
    const earthDistanceFromSun = 9.3 * multiplier;
    const marsDistanceFromSun = 14.2 * multiplier;
    const jupiterDistanceFromSun = 28.4 * multiplier;
    const saturnDistanceFromSun = 38.9 * multiplier;
    const uranusDistanceFromSun = 50 * multiplier;
    const neptuneDistanceFromSun = 65 * multiplier;

    solarSystem = new THREE.Group();
    mercuryRotationGroup = new THREE.Group();
    venusRotationGroup = new THREE.Group();
    earthRotationGroup = new THREE.Group();
    marsRotationGroup = new THREE.Group();
    jupiterRotationGroup = new THREE.Group();
    saturnRotationGroup = new THREE.Group();
    uranusRotationGroup = new THREE.Group();
    neptuneRotationGroup = new THREE.Group();

    sun = addUnlitPlanet(sunTexture, 30, 32);

    mercury = addPlanet(mercuryTexture, 1, 32);
    // const mercuryOrbitRing = new THREE.RingGeometry(14.9, 15.1)
    mercuryRotationGroup.add(mercury);
    // mercuryRotationGroup.add(mercuryOrbitRing);
    mercury.position.set(0, 0, mercuryDistanceFromSun);
    solarSystem.add(mercuryRotationGroup);

    venus = addPlanet(venusTexture, 2.9, 32);
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

    mars = addPlanet(marsTexture, 1.5, 32);
    marsRotationGroup.add(mars);
    mars.position.set(0, 0, marsDistanceFromSun);
    solarSystem.add(marsRotationGroup);

    jupiter = addPlanet(jupiterTexture, 33, 32);
    jupiterRotationGroup.add(jupiter);
    jupiter.position.set(0, 0, jupiterDistanceFromSun);
    solarSystem.add(jupiterRotationGroup);

    saturn = addPlanet(saturnTexture, 27, 32);
    const saturnRing = new THREE.RingGeometry(30, 54);
    const saturnRingMaterial = new THREE.MeshBasicMaterial({ map: saturnRingsTexture, side: THREE.DoubleSide })
    saturnRings = new THREE.Mesh(saturnRing, saturnRingMaterial);
    saturnRings.rotation.set(45.5, 0, 0);

    saturnGroup = new THREE.Group();
    saturnGroup.add(saturn);
    saturnGroup.add(saturnRings);
    saturnRotationGroup.add(saturnGroup);
    saturnGroup.position.set(0, 0, saturnDistanceFromSun);
    solarSystem.add(saturnRotationGroup);

    uranus = addPlanet(uranusTexture, 12, 32);
    const uranusRing = new THREE.RingGeometry(14.8, 15);
    const uranusRingMaterial = new THREE.MeshBasicMaterial({ color: 0xB2BEB5, side: THREE.DoubleSide })
    uranusRingMaterial.opacity = 0.5;
    uranusRings = new THREE.Mesh(uranusRing, uranusRingMaterial);

    uranusGroup = new THREE.Group();
    uranusGroup.add(uranus);
    uranusGroup.add(uranusRings);
    uranusGroup.position.set(0, 0, uranusDistanceFromSun);
    uranusRotationGroup.add(uranusGroup);
    solarSystem.add(uranusRotationGroup);

    neptune = addPlanet(neptuneTexture, 11, 32);
    neptuneRotationGroup.add(neptune);
    neptune.position.set(0, 0, neptuneDistanceFromSun);
    solarSystem.add(neptuneRotationGroup);

    solarSystem.add(sun);

    const light = new THREE.PointLight(0xffffff, 1.1, 1000, 0.1);
    light.position.set(0, 0, 0);
    solarSystem.add(light);

    // Create the dashed orbit line
    mercuryOrbitLine = createOrbitLine(mercuryDistanceFromSun, 0x999999);
    mercuryRotationGroup.add(mercuryOrbitLine);
    venusOrbitLine = createOrbitLine(venusDistanceFromSun, 0xfddca4);
    venusRotationGroup.add(venusOrbitLine);
    earthOrbitLine = createOrbitLine(earthDistanceFromSun, 0x4583ff);
    solarSystem.add(earthOrbitLine);
    marsOrbitLine = createOrbitLine(marsDistanceFromSun, 0xfa9868);
    marsRotationGroup.add(marsOrbitLine);
    jupiterOrbitLine = createOrbitLine(jupiterDistanceFromSun, 0xd1cac2);
    jupiterRotationGroup.add(jupiterOrbitLine);
    saturnOrbitLine = createOrbitLine(saturnDistanceFromSun, 0xfee7c5);
    saturnRotationGroup.add(saturnOrbitLine);
    uranusOrbitLine = createOrbitLine(uranusDistanceFromSun, 0xaadce5);
    uranusRotationGroup.add(uranusOrbitLine);
    neptuneOrbitLine = createOrbitLine(neptuneDistanceFromSun, 0x7aa8fb);
    neptuneRotationGroup.add(neptuneOrbitLine);
    moonOrbitLine = createOrbitLine(4, 0x999999);
    earthGroup.add(moonOrbitLine);


    // Debug Purposes
    mercury.geometry.name = "Mercury";
    venus.geometry.name = "Venus";
    earth.geometry.name = "Earth";
    mars.geometry.name = "Mars";
    jupiter.geometry.name = "Jupiter";
    saturn.geometry.name = "Saturn";
    uranus.geometry.name = "Uranus";
    neptune.geometry.name = "Neptune";
    moon.geometry.name = "Moon";

}

export { sun, mercury, venus, earthGroup, earth, moon, mars, jupiter, saturn, saturnGroup, uranus, uranusGroup, neptune, solarSystem, mercuryRotationGroup, venusRotationGroup, earthRotationGroup, marsRotationGroup, jupiterRotationGroup, saturnRotationGroup, uranusRotationGroup, neptuneRotationGroup, saturnRings, uranusRings, mercuryOrbitLine, venusOrbitLine, earthOrbitLine, marsOrbitLine, jupiterOrbitLine, saturnOrbitLine, uranusOrbitLine, neptuneOrbitLine, moonOrbitLine }


export async function addSolarSystem(scene) {
    await setup();
    solarSystem.position.set(0, 0, 0)
    scene.add(solarSystem)
}

export function updateCameraPosition(camera, planet, offset, dampingFactor, fov) {
    // Get the planet's position in world space
    const planetWorldPosition = new THREE.Vector3();
    planet.getWorldPosition(planetWorldPosition);

    const planetRadius = new THREE.Vector3();
    const sphere = new THREE.Sphere();
    const positions = planet.geometry.attributes.position.array;
    const vertices = [];

    for (let i = 0; i < positions.length; i += 3) {
        const vertex = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
        vertices.push(vertex);
    }

    sphere.setFromPoints(vertices);
    sphere.radius *= planet.scale.x;
    planetRadius.set(sphere.radius * 4, sphere.radius * 4, sphere.radius * 4);

    // Calculate the desired position of the camera relative to the planet
    const desiredPosition = new THREE.Vector3().copy(planetWorldPosition).add(offset).add(planetRadius);

    // Use lerp to gradually move the camera towards the desired position
    camera.position.lerp(desiredPosition, dampingFactor);


    // Update camera FOV and aspect ratio to match viewport
    const aspectRatio = window.innerWidth / window.innerHeight;
    camera.fov = fov;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();

    // Make the camera look at the planet in world space
    // Slowly turn the camera to face the planet
    camera.lookAt(planetWorldPosition);
}

export const button = document.getElementById("menu-toggle");

export const toggle = () => {
    document.body.classList.toggle("menu-toggled");
}



