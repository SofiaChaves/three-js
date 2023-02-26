import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './styles.css';

//Screen Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

//Scene
const scene = new THREE.Scene();
//scene.background = new THREE.Color('#fff');

//Object
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: '#00aaaa',
});
const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const loader = new GLTFLoader();
loader.load('the_smoking_room/scene.gltf', (gltf) => {
    const scale = 17;
    gltf.scene.position.set(0, -27, -3.5);
    gltf.scene.scale.set(scale, scale, scale);
    scene.add(gltf.scene);
});

//Light
const light = new THREE.PointLight('#ffffff', 5, 100);
light.position.set(0, 10, 10);
scene.add(light);
const ambientLight = new THREE.AmbientLight('#333');
scene.add(ambientLight);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 15;

//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(3);
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.enableDamping = true;
controls.enablePan = false;

//Resize Event
window.addEventListener('resize', () => {
    //Sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
    renderer.render(scene, camera);
    controls.update();
    window.requestAnimationFrame(loop);
};

loop();
