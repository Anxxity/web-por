import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildSo101Arm } from './so101-urdf-loader.js';

const canvas = document.getElementById('hero-3d');
if (!canvas) throw new Error('hero-3d canvas not found');

const armHud = document.getElementById('hero-arm-hud');
const armHudText = armHud?.querySelector('.arm-hud-text');
const armHudJoints = document.getElementById('arm-hud-joints');
const pendant = document.getElementById('workbench-pendant');
const slidersWrap = document.getElementById('pendant-sliders');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCompactViewport = window.matchMedia('(max-width: 640px)').matches;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
camera.position.set(4.8, 4.4, 7.6);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.enableZoom = false;
controls.enablePan = false;
controls.minPolarAngle = 0.25;
controls.maxPolarAngle = Math.PI * 0.49;
controls.target.set(0, 2.2, 0);
controls.update();

function resize() {
  const w = canvas.clientWidth || 1;
  const h = canvas.clientHeight || 1;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

// Engineering CAD grid & shadow floor
const grid = new THREE.GridHelper(12, 24, 0x14b8a6, 0x475569);
grid.material.opacity = 0.28;
grid.material.transparent = true;
scene.add(grid);

const floorGeo = new THREE.PlaneGeometry(14, 14);
const floorMat = new THREE.ShadowMaterial({ opacity: 0.22 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Subtle ambient particles
const particleGeo = new THREE.BufferGeometry();
const pCount = 70;
const pPos = new Float32Array(pCount * 3);
for (let i = 0; i < pCount; i++) {
  const r = 2.6 + Math.random() * 3.0;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  pPos[i * 3 + 1] = Math.abs(r * Math.sin(phi) * Math.sin(theta)) * 0.7 + 0.6;
  pPos[i * 3 + 2] = r * Math.cos(phi);
}
particleGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
scene.add(
  new THREE.Points(
    particleGeo,
    new THREE.PointsMaterial({ color: 0x60a5fa, size: 0.04, transparent: true, opacity: 0.45 })
  )
);

// Studio + robotics rig lighting
scene.add(new THREE.AmbientLight(0xffffff, 1.35));
const keyLight = new THREE.DirectionalLight(0xffffff, 2.9);
keyLight.position.set(5, 8, 5);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1024, 1024);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xc7e8ff, 1.1);
fillLight.position.set(-5, 3, 3);
scene.add(fillLight);

const tealLight = new THREE.PointLight(0x14b8a6, 4.2, 12);
tealLight.position.set(-2.5, 3.5, 3);
scene.add(tealLight);

const amberLight = new THREE.PointLight(0xf59e0b, 2.4, 9);
amberLight.position.set(2.5, 5, 2);
scene.add(amberLight);

let targetX = 0;
let targetY = 0;
let smoothX = 0;
let smoothY = 0;
let armMode = 'follow';
const manualAngles = { 1: 0, 2: -0.52, 3: 0.96, 4: -0.35, 5: 0, 6: 0.52 };

window.addEventListener(
  'pointermove',
  (e) => {
    targetX = (e.clientX / window.innerWidth) * 2 - 1;
    targetY = (e.clientY / window.innerHeight) * 2 - 1;
  },
  { passive: true }
);

if (pendant) {
  pendant.querySelectorAll('[data-arm-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      armMode = btn.dataset.armMode;
      pendant.querySelectorAll('[data-arm-mode]').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      if (slidersWrap) {
        slidersWrap.hidden = armMode !== 'manual';
      }
    });
  });

  pendant.querySelectorAll('input[data-joint]').forEach((slider) => {
    slider.addEventListener('input', () => {
      const id = slider.dataset.joint;
      manualAngles[id] = (parseFloat(slider.value) * Math.PI) / 180;
    });
  });
}

const clock = new THREE.Clock();
let robot = null;
let isHeroVisible = true;
let rafId = null;
let lastHudUpdate = 0;

const armStage = new THREE.Group();
scene.add(armStage);

if (prefersReducedMotion || isCompactViewport) {
  if (armHud) armHud.classList.add('is-ready');
  if (armHudText) {
    armHudText.textContent = 'SO-101 6-DOF · URDF/STL (Desktop 3D)';
  }
} else {
  buildSo101Arm({ targetHeight: 5.2 })
    .then((arm) => {
      robot = arm;
      robot.alignBaseToFloor(0);
      armStage.rotation.y = -0.35;
      armStage.add(robot.arm);
      canvas.classList.add('is-loaded');
      if (armHud) armHud.classList.add('is-ready');
      if (armHudText) {
        armHudText.textContent = 'SO-101 6-DOF · Live URDF';
      }
    })
    .catch((err) => {
      console.warn('Arm load failed:', err);
      if (armHudText) armHudText.textContent = 'SO-101 URDF';
    });
}

function getTargetJoints(t) {
  if (armMode === 'manual') {
    return {
      1: manualAngles[1],
      2: manualAngles[2],
      3: manualAngles[3],
      4: manualAngles[4],
      5: manualAngles[5],
      6: manualAngles[6],
    };
  }

  if (armMode === 'home') {
    return { 1: 0, 2: -0.35, 3: 0.7, 4: -0.35, 5: 0, 6: 0.25 };
  }

  if (armMode === 'demo') {
    const cycle = t * 0.85;
    return {
      1: Math.sin(cycle) * 1.1,
      2: -0.45 + Math.sin(cycle * 2) * 0.35,
      3: 0.85 - Math.cos(cycle * 2) * 0.32,
      4: -0.25 + Math.sin(cycle * 2) * 0.2,
      5: Math.cos(cycle) * 0.6,
      6: 0.25 + (Math.sin(cycle * 2 + 1.2) * 0.5 + 0.5) * 0.55,
    };
  }

  // Default: follow pointer
  const mx = -smoothX;
  const my = -smoothY;
  const reach = Math.sqrt(mx * mx + my * my);
  const reachFactor = Math.min(1, reach * 1.15);
  return {
    1: mx * 1.15,
    2: -0.55 - my * 0.72,
    3: 0.95 + my * 0.55 - reachFactor * 0.18,
    4: null,
    5: Math.sin(t * 0.45) * 0.22,
    6: 0.35 + (Math.sin(t * 1.05) * 0.5 + 0.5) * 0.45,
  };
}

function updateArm(t) {
  if (!robot) return;

  const targets = getTargetJoints(t);
  const blend = armMode === 'manual' ? 0.22 : 0.09;

  for (const id of ['1', '2', '3', '5', '6']) {
    const current = robot.angles[id];
    const next = robot.clampJoint(id, targets[id]);
    robot.setJointAngle(id, current + (next - current) * blend);
  }

  const j4Target =
    targets[4] !== null
      ? robot.clampJoint('4', targets[4])
      : robot.clampJoint('4', -(robot.angles['2'] + robot.angles['3']) * 0.42 + 0.2);

  const j4 = robot.angles['4'];
  robot.setJointAngle('4', j4 + (j4Target - j4) * blend);
}

function updateHud(t) {
  if (!robot || !armHudJoints || t - lastHudUpdate < 0.12) return;
  lastHudUpdate = t;
  const deg = (rad) => `${Math.round((rad * 180) / Math.PI)}°`;
  armHudJoints.textContent = `J1 ${deg(robot.angles['1'])} · J2 ${deg(robot.angles['2'])} · J3 ${deg(robot.angles['3'])}`;
}

function animate() {
  if (!isHeroVisible || document.hidden) {
    rafId = null;
    return;
  }
  rafId = requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  smoothX += (targetX - smoothX) * 0.07;
  smoothY += (targetY - smoothY) * 0.07;

  updateArm(t);
  updateHud(t);
  controls.update();

  const pulse = (Math.sin(t * 2.4) + 1) * 0.5;
  tealLight.intensity = 3.5 + pulse * 2.2;

  renderer.render(scene, camera);
}

function startLoop() {
  if (!rafId && isHeroVisible && !document.hidden) {
    clock.getDelta();
    animate();
  }
}

const heroSection = canvas.closest('.hero');
if (heroSection && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      isHeroVisible = entries[0].isIntersecting;
      if (isHeroVisible) startLoop();
    },
    { threshold: 0.02 }
  );
  observer.observe(heroSection);
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) startLoop();
});

startLoop();
