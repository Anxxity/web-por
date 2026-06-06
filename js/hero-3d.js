import * as THREE from 'three';
import { buildSo101Arm } from './so101-urdf-loader.js';

const canvas = document.getElementById('hero-3d');
if (!canvas) throw new Error('hero-3d canvas not found');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 2, 0.1, 100);
camera.position.set(0.4, 2.2, 11);
camera.lookAt(0.9, 1.55, 0);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

function resize() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

const particleGeo = new THREE.BufferGeometry();
const pCount = 120;
const pPos = new Float32Array(pCount * 3);
for (let i = 0; i < pCount; i++) {
  const r = 3.0 + Math.random() * 2.5;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6 + 2.0;
  pPos[i * 3 + 2] = r * Math.cos(phi) * 0.5;
}
particleGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
scene.add(
  new THREE.Points(
    particleGeo,
    new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.038, transparent: true, opacity: 0.45 })
  )
);

scene.add(new THREE.AmbientLight(0xffffff, 1.4));
const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
keyLight.position.set(4, 7, 5);
keyLight.castShadow = true;
scene.add(keyLight);
const fillLight = new THREE.DirectionalLight(0xc7e8ff, 1.1);
fillLight.position.set(-4, 2, 3);
scene.add(fillLight);
const tealLight = new THREE.PointLight(0x14b8a6, 4.5, 10);
tealLight.position.set(-2, 3, 3);
scene.add(tealLight);
const amberLight = new THREE.PointLight(0xf59e0b, 2.8, 8);
amberLight.position.set(2.5, 5, 2);
scene.add(amberLight);
const rimLight = new THREE.DirectionalLight(0x14b8a6, 1.2);
rimLight.position.set(0, 3, -6);
scene.add(rimLight);

let targetX = 0;
let targetY = 0;
let smoothX = 0;
let smoothY = 0;

window.addEventListener(
  'pointermove',
  (e) => {
    targetX = (e.clientX / window.innerWidth) * 2 - 1;
    targetY = (e.clientY / window.innerHeight) * 2 - 1;
  },
  { passive: true }
);

const clock = new THREE.Clock();
let robot = null;

const armStage = new THREE.Group();
scene.add(armStage);

buildSo101Arm({ targetHeight: 6.0 })
  .then((arm) => {
    robot = arm;
    robot.alignBaseToFloor(0);
    armStage.position.set(5.05, -0.5, 0);
    armStage.rotation.y = 0.22;
    armStage.add(robot.arm);
  })
  .catch((err) => console.warn('Arm load failed:', err));

function updateArm(t) {
  if (!robot) return;

  const mx = -smoothX;
  const my = -smoothY;
  const reach = Math.sqrt(mx * mx + my * my);
  const reachFactor = Math.min(1, reach * 1.15);

  const targets = {
    1: mx * 1.15,
    2: -0.55 - my * 0.72,
    3: 0.95 + my * 0.55 - reachFactor * 0.18,
    4: null,
    5: Math.sin(t * 0.35) * 0.18,
    6: 0.35 + (Math.sin(t * 1.05) * 0.5 + 0.5) * 0.45,
  };

  const blend = 0.09;
  for (const id of ['1', '2', '3', '5', '6']) {
    const current = robot.angles[id];
    const next = robot.clampJoint(id, targets[id]);
    robot.setJointAngle(id, current + (next - current) * blend);
  }

  const j2 = robot.angles['2'];
  const j3 = robot.angles['3'];
  const wristTarget = robot.clampJoint('4', -(j2 + j3) * 0.42 + 0.2);
  const j4 = robot.angles['4'];
  robot.setJointAngle('4', j4 + (wristTarget - j4) * blend);
}

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  smoothX += (targetX - smoothX) * 0.07;
  smoothY += (targetY - smoothY) * 0.07;

  updateArm(t);

  const pulse = (Math.sin(t * 2.8) + 1) * 0.5;
  tealLight.intensity = 3.5 + pulse * 2.5;
  tealLight.position.x = Math.sin(t * 0.3) * 3;
  tealLight.position.z = Math.cos(t * 0.3) * 3;

  renderer.render(scene, camera);
}

animate();
