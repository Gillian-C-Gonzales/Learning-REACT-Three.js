import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('canvas');

//1. Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xF0F0F0);

//2. Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
camera.position.z =  5;

//3. Object
const geometry  = new THREE.DodecahedronGeometry();
// Lambert Material: adds reflective ability
const material = new THREE.MeshLambertMaterial({color:'#468585', emissive:'#468585'});
const dodecahedronGeometry = new THREE.Mesh(geometry , material);

const boxGeometry = new THREE.BoxGeometry(2,0.1, 2)
// Basic material has no reflective surface
const boxMaterial = new THREE.MeshBasicMaterial({color:'#B4B4B3'});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = -1.5;

scene.add(dodecahedronGeometry);
scene.add(box);

//4 Light
const light = new THREE.SpotLight(0x006759, 100);
light.position.set(1, 1, 1);
scene.add(light);

//5. Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);

// 6. Add orbit controls\
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

//7. animations
function animate(){
    requestAnimationFrame(animate);

    dodecahedronGeometry.rotation.x += 0.01;
    dodecahedronGeometry.rotation.y += 0.01;

    box.rotation.y += 0.005;

    controls.update();
    renderer.render(scene, camera);
}

// 8. Handle window resizer
window.addEventListener('resize', ()=> {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();