import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

const MESH_BASE = 'asses/meshes/so101/';
const URDF_PATH = 'asses/urdf/so101_base.xacro';

const HOME_POSE = {
  1: 0,
  2: -0.55,
  3: 0.95,
  4: 0.25,
  5: 0,
  6: 0.4,
};

function parseVec3(str, fallback = [0, 0, 0]) {
  if (!str) return fallback;
  return str.trim().split(/\s+/).map(Number);
}

function parseOrigin(el) {
  if (!el) return { xyz: [0, 0, 0], rpy: [0, 0, 0] };
  return {
    xyz: parseVec3(el.getAttribute('xyz')),
    rpy: parseVec3(el.getAttribute('rpy')),
  };
}

function applyOrigin(group, origin) {
  group.position.set(origin.xyz[0], origin.xyz[1], origin.xyz[2]);
  group.rotation.set(origin.rpy[0], origin.rpy[1], origin.rpy[2], 'ZYX');
}

function meshPathFromUrdf(filename) {
  const name = filename.split('/').pop();
  return `${MESH_BASE}${name}`;
}

export function parseSo101Urdf(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
  if (doc.querySelector('parsererror')) {
    throw new Error('Failed to parse URDF');
  }

  const materials = {};
  doc.querySelectorAll('material').forEach((el) => {
    const color = el.querySelector('color');
    if (!color) return;
    materials[el.getAttribute('name')] = parseVec3(color.getAttribute('rgba'), [0.8, 0.8, 0.8, 1]);
  });

  const links = {};
  doc.querySelectorAll('link').forEach((el) => {
    const name = el.getAttribute('name');
    const visuals = [];
    el.querySelectorAll('visual').forEach((vis) => {
      const meshEl = vis.querySelector('mesh');
      if (!meshEl) return;
      const matEl = vis.querySelector('material');
      visuals.push({
        origin: parseOrigin(vis.querySelector('origin')),
        mesh: meshPathFromUrdf(meshEl.getAttribute('filename')),
        material: matEl?.getAttribute('name') || '3d_printed',
      });
    });
    links[name] = { name, visuals };
  });

  const joints = [];
  doc.querySelectorAll('joint[type]').forEach((el) => {
    const parent = el.querySelector(':scope > parent')?.getAttribute('link');
    const child = el.querySelector(':scope > child')?.getAttribute('link');
    if (!parent || !child) return;

    const limitEl = el.querySelector(':scope > limit');
    const axisEl = el.querySelector(':scope > axis');
    joints.push({
      name: el.getAttribute('name'),
      type: el.getAttribute('type'),
      parent,
      child,
      origin: parseOrigin(el.querySelector(':scope > origin')),
      axis: parseVec3(axisEl?.getAttribute('xyz'), [0, 0, 1]),
      limit: limitEl
        ? {
            lower: Number(limitEl.getAttribute('lower') ?? 0),
            upper: Number(limitEl.getAttribute('upper') ?? 0),
          }
        : null,
    });
  });

  return { materials, links, joints };
}

function getMaterial(name, materials, cache) {
  if (cache.has(name)) return cache.get(name);

  const rgba = materials[name] || [0.85, 0.85, 0.85, 1];
  const [r, g, b, a = 1] = rgba;
  const isMotor = name === 'sts3215';
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(r, g, b),
    roughness: isMotor ? 0.35 : 0.42,
    metalness: isMotor ? 0.55 : 0.08,
    transparent: a < 1,
    opacity: a,
  });
  cache.set(name, mat);
  return mat;
}

async function loadLinkVisuals(link, urdfMaterials, stlLoader, matCache) {
  const tasks = link.visuals.map(async (vis) => {
    const holder = new THREE.Group();
    applyOrigin(holder, vis.origin);

    const geometry = await stlLoader.loadAsync(vis.mesh);
    geometry.computeVertexNormals();

    const mesh = new THREE.Mesh(geometry, getMaterial(vis.material, urdfMaterials, matCache));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    holder.add(mesh);
    return holder;
  });

  return Promise.all(tasks);
}

export async function buildSo101Arm(options = {}) {
  const response = await fetch(options.urdfPath || URDF_PATH);
  if (!response.ok) throw new Error(`URDF fetch failed: ${response.status}`);
  const urdf = parseSo101Urdf(await response.text());

  const stlLoader = new STLLoader();
  const matCache = new Map();
  const linkGroups = {};
  const jointNodes = {};

  for (const [name, link] of Object.entries(urdf.links)) {
    if (name === 'world') continue;
    const group = new THREE.Group();
    group.name = name;
    const visuals = await loadLinkVisuals(link, urdf.materials, stlLoader, matCache);
    visuals.forEach((v) => group.add(v));
    linkGroups[name] = group;
  }

  for (const joint of urdf.joints) {
    const origin = new THREE.Group();
    applyOrigin(origin, joint.origin);

    const axis = new THREE.Group();
    origin.add(axis);

    const child = linkGroups[joint.child];
    if (child) axis.add(child);
    jointNodes[joint.name] = { origin, axis, joint };
  }

  const childLinks = new Set(urdf.joints.map((j) => j.child));
  const rootName = Object.keys(linkGroups).find((name) => !childLinks.has(name)) || 'base';
  const root = linkGroups[rootName];

  for (const joint of urdf.joints) {
    const parent = linkGroups[joint.parent];
    const node = jointNodes[joint.name];
    if (parent && node) parent.add(node.origin);
  }

  const arm = new THREE.Group();
  arm.add(root);
  arm.rotation.x = -Math.PI / 2;

  const box = new THREE.Box3().setFromObject(arm);
  const size = box.getSize(new THREE.Vector3());
  const targetHeight = options.targetHeight ?? 4.2;
  const scale = targetHeight / Math.max(size.y, size.z, size.x, 0.001);
  arm.scale.setScalar(scale);
  arm.updateMatrixWorld(true);

  const homePose = options.homePose ?? HOME_POSE;
  const angles = { ...homePose };

  const api = {
    arm,
    angles,
    joints: jointNodes,
    setJointAngle(id, angle) {
      const node = jointNodes[id];
      if (!node) return;
      const [ax, ay, az] = node.joint.axis;
      node.axis.rotation.set(0, 0, 0);
      if (Math.abs(az) >= Math.abs(ay) && Math.abs(az) >= Math.abs(ax)) {
        node.axis.rotation.z = angle;
      } else if (Math.abs(ay) >= Math.abs(ax)) {
        node.axis.rotation.y = angle;
      } else {
        node.axis.rotation.x = angle;
      }
      angles[id] = angle;
    },
    clampJoint(id, angle) {
      const limit = jointNodes[id]?.joint.limit;
      if (!limit) return angle;
      return Math.max(limit.lower, Math.min(limit.upper, angle));
    },
    alignBaseToFloor(offsetY = 0.08) {
      arm.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(arm);
      const center = bounds.getCenter(new THREE.Vector3());
      arm.position.set(-center.x, -bounds.min.y + offsetY, -center.z);
      arm.updateMatrixWorld(true);
    },
  };

  Object.entries(homePose).forEach(([id, angle]) => {
    api.setJointAngle(id, api.clampJoint(id, angle));
  });
  arm.updateMatrixWorld(true);

  return api;
}
