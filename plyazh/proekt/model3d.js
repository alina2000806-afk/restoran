// Interactive 3D model of the spit. Units are metres: x east, z south (entrance), -z north (cape).
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const host = document.getElementById("m3d");
const canvas = host.querySelector("canvas");
const labelsEl = host.querySelector(".m3d-labels");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 1, 0.5, 2000);
camera.position.set(-150, 120, 150);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.maxPolarAngle = Math.PI * 0.46;
controls.minDistance = 18;
controls.maxDistance = 320;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.enablePan = true;
controls.screenSpacePanning = false;

// ---------- light & sky ----------
const hemi = new THREE.HemisphereLight(0xcfe6ff, 0x6b5a3c, 1.1);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff1d6, 2.6);
sun.position.set(-80, 120, 40);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -70, right: 70, top: 120, bottom: -120, near: 10, far: 400 });
sun.shadow.bias = -0.0005;
sun.shadow.normalBias = 0.4;
scene.add(sun);

const skyMat = new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false,
  uniforms: { top: { value: new THREE.Color("#5aa0e0") }, hor: { value: new THREE.Color("#e6f1f7") } },
  vertexShader: "varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
  fragmentShader: "uniform vec3 top,hor;varying vec3 p;void main(){float h=normalize(p).y;gl_FragColor=vec4(mix(hor,top,smoothstep(-.02,.45,h)),1.);}",
});
scene.add(new THREE.Mesh(new THREE.SphereGeometry(900, 32, 16), skyMat));
scene.fog = new THREE.Fog(0xe6f1f7, 350, 900);

// ---------- materials ----------
const M = {
  sand: new THREE.MeshStandardMaterial({ color: 0xe3cfa2, roughness: 1 }),
  wetSand: new THREE.MeshStandardMaterial({ color: 0xc9b07f, roughness: 1 }),
  grass: new THREE.MeshStandardMaterial({ color: 0x7f9a5a, roughness: 1 }),
  path: new THREE.MeshStandardMaterial({ color: 0xc4bfb4, roughness: 0.95 }),
  wood: new THREE.MeshStandardMaterial({ color: 0xa8743f, roughness: 0.7 }),
  deck: new THREE.MeshStandardMaterial({ color: 0xc7a06b, roughness: 0.8 }),
  char: new THREE.MeshStandardMaterial({ color: 0x2b2622, roughness: 0.85 }),
  linen: new THREE.MeshStandardMaterial({ color: 0xf6f0e3, roughness: 0.95, side: THREE.DoubleSide }),
  curtain: new THREE.MeshStandardMaterial({ color: 0xfbf8f1, roughness: 1, transparent: true, opacity: 0.88, side: THREE.DoubleSide }),
  roof: new THREE.MeshStandardMaterial({ color: 0x3b3f44, roughness: 0.55, metalness: 0.3 }),
  plastic: new THREE.MeshStandardMaterial({ color: 0xf4f4f2, roughness: 0.35 }),
  panel: new THREE.MeshStandardMaterial({ color: 0xb98a55, roughness: 0.85 }),
  rail: new THREE.MeshStandardMaterial({ color: 0xd9a066, roughness: 0.6 }),
  trunk: new THREE.MeshStandardMaterial({ color: 0x5b4a3a, roughness: 1 }),
  poplar: new THREE.MeshStandardMaterial({ color: 0x4f7a3a, roughness: 0.9, flatShading: true }),
  bush: new THREE.MeshStandardMaterial({ color: 0x6b8f45, roughness: 0.9, flatShading: true }),
  tub: new THREE.MeshStandardMaterial({ color: 0x9a7448, roughness: 0.7 }),
  tubWater: new THREE.MeshStandardMaterial({ color: 0x7fc7d6, roughness: 0.1, metalness: 0.2, emissive: 0x000000 }),
  glass: new THREE.MeshStandardMaterial({ color: 0x2c3e48, roughness: 0.05, metalness: 0.6, emissive: 0x000000 }),
  net: new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, side: THREE.DoubleSide }),
  rope: new THREE.MeshStandardMaterial({ color: 0xe8dcc4, roughness: 1 }),
  hull: new THREE.MeshStandardMaterial({ color: 0xf4f4f4, roughness: 0.5 }),
  sup: new THREE.MeshStandardMaterial({ color: 0xff7a59, roughness: 0.5 }),
  play: new THREE.MeshStandardMaterial({ color: 0xe9c48f, roughness: 0.8 }),
  bulb: new THREE.MeshBasicMaterial({ color: 0xffd58a }),
  far: new THREE.MeshStandardMaterial({ color: 0x3f5f3a, roughness: 1, flatShading: true }),
  bldg: new THREE.MeshStandardMaterial({ color: 0xd9cfc2, roughness: 0.9 }),
  window: new THREE.MeshStandardMaterial({ color: 0x404a52, emissive: 0x000000, roughness: 0.6 }),
};
const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
const add = (parent, geo, mat, x = 0, y = 0, z = 0, cast = true) => {
  const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = cast; m.receiveShadow = true; parent.add(m); return m;
};

// ---------- water ----------
const waterGeo = new THREE.PlaneGeometry(1600, 1600, 160, 160); waterGeo.rotateX(-Math.PI / 2);
const waterMat = new THREE.MeshStandardMaterial({ color: 0x2f6f86, roughness: 0.18, metalness: 0.35, transparent: true, opacity: 0.96 });
const water = new THREE.Mesh(waterGeo, waterMat); water.position.y = -0.15; water.receiveShadow = true; scene.add(water);
const wPos = waterGeo.attributes.position, wBase = wPos.array.slice();

// ---------- the spit ----------
const west = [[-1, -108], [-6, -104], [-12, -96], [-15, -86], [-17, -74], [-18, -60], [-18.5, -40], [-19, -10], [-19.5, 20], [-19.5, 50], [-19, 75], [-17, 92], [-13, 103], [-7, 110], [0, 112]];
const east = [[0, 112], [7, 110], [13, 103], [17, 92], [19, 75], [19.5, 50], [19.5, 20], [19, -10], [18.5, -40], [18, -60], [17, -74], [15, -86], [12, -96], [6, -104], [1, -108]];
const outline = [...west, ...east];
const mkShape = (pts, grow = 0) => { const s = new THREE.Shape(); pts.forEach(([x, z], i) => { const k = 1 + grow / 20; const X = x * k, Z = z * (1 + grow / 110); i ? s.lineTo(X, -Z) : s.moveTo(X, -Z); }); return s; };
const landGeo = (grow, depth) => { const g = new THREE.ExtrudeGeometry(mkShape(outline, grow), { depth, bevelEnabled: true, bevelThickness: 0.6, bevelSize: 1.2, bevelSegments: 3, curveSegments: 24 }); g.rotateX(-Math.PI / 2); return g; };
const wet = new THREE.Mesh(landGeo(2.5, 0.6), M.wetSand); wet.position.y = -1.0; wet.receiveShadow = true; scene.add(wet);
const land = new THREE.Mesh(landGeo(0, 0.9), M.sand); land.position.y = -0.7; land.receiveShadow = true; scene.add(land);
const top = 0.8;

// central path (straight like on the render)
add(scene, box(3.6, 0.12, 196), M.path, 1, top + 0.06, 6, false);
// kerbs
add(scene, box(0.25, 0.25, 196), M.wood, -0.95, top + 0.12, 6, false);
add(scene, box(0.25, 0.25, 196), M.wood, 2.95, top + 0.12, 6, false);
// grass strips along the east tree line
[[9, -70, 12, 40], [10, 40, 14, 90]].forEach(([x, z, w, d]) => add(scene, box(w, 0.08, d), M.grass, x, top + 0.04, z, false));

// ---------- trees ----------
const trees = [];
const poplarGeo = new THREE.SphereGeometry(1, 7, 6); poplarGeo.scale(1.3, 5.2, 1.3);
const roundGeo = new THREE.IcosahedronGeometry(2.4, 0);
const trunkGeo = new THREE.CylinderGeometry(0.25, 0.35, 1, 6);
function tree(x, z, kind = "poplar", s = 1) {
  const g = new THREE.Group();
  const h = kind === "poplar" ? 7 * s : 3 * s;
  const t = add(g, trunkGeo, M.trunk, 0, h / 2, 0); t.scale.y = h;
  const c = add(g, kind === "poplar" ? poplarGeo : roundGeo, kind === "poplar" ? M.poplar : M.bush, 0, kind === "poplar" ? h + 4 * s : h + 1.5 * s, 0);
  c.scale.multiplyScalar(s);
  g.position.set(x, top, z); g.rotation.y = Math.random() * 6; scene.add(g); trees.push(c);
}
// rows of poplars both sides of the path
for (let z = -88; z <= 86; z += 7) {
  if (z < -60 || z > -50) tree(-3.2 + Math.random() * 0.6, z + Math.random() * 2, "poplar", 0.9 + Math.random() * 0.25);
  if (!(z > 22 && z < 34)) tree(5.2 + Math.random() * 0.6, z + Math.random() * 2, "poplar", 0.9 + Math.random() * 0.25);
}
// east edge trees & forest around cabins
for (let z = -84; z <= 92; z += 9) tree(16 + Math.random() * 1.5, z, Math.random() > 0.4 ? "poplar" : "round", 0.8 + Math.random() * 0.4);
[[11, -60], [13, -54], [10, -40], [14, -34], [11, -46]].forEach(([x, z]) => tree(x, z, "round", 0.9));
// a few trees on the west beach edge near VIP
[[-16, 46], [-17, 60], [-16, 74], [-15, 86]].forEach(([x, z]) => tree(x, z, "poplar", 1));

const cabinWindows = [], steamSpots = [], boats = [], buildingsLit = [], bulbs = [];
// ---------- builders ----------
function lounger(x, z, rot = 0) {
  // plain white plastic sun lounger, 1.9 x 0.65 m
  const g = new THREE.Group();
  add(g, box(0.65, 0.07, 1.25), M.plastic, 0, 0.36, 0.3);
  const b = add(g, box(0.65, 0.07, 0.75), M.plastic, 0, 0.55, -0.6); b.rotation.x = -0.75;
  [[-0.28, -0.75], [0.28, -0.75], [-0.28, 0.85], [0.28, 0.85]].forEach(([a, c]) => add(g, box(0.06, 0.34, 0.06), M.plastic, a, 0.17, c));
  g.position.set(x, top, z); g.rotation.y = rot; scene.add(g);
}
// closed beach gazebo 6 x 4 m, as on the client's photo: timber posts in 3 bays, diagonal braces,
// 0.9 m half-walls with a top rail on three sides, open gable trusses, gable roof of profiled sheet
function beachGazebo(x, z, rot = 0) {
  const g = new THREE.Group(); const W = 6, D = 4, H = 2.2, R = 1.0, P = 0.14;
  add(g, box(W + 0.2, 0.12, D + 0.2), M.deck, 0, 0.06, 0);
  const xs = [-3, -1, 1, 3];
  const beam = (x1, y1, z1, x2, y2, z2, t = 0.1, mat = M.wood) => {
    const a = new THREE.Vector3(x1, y1, z1), b = new THREE.Vector3(x2, y2, z2), len = a.distanceTo(b);
    const m = add(g, new THREE.BoxGeometry(t, t, len), mat, (x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2);
    m.lookAt(g.localToWorld(b.clone())); return m;
  };
  // posts on both long sides and in the middle of the short sides
  xs.forEach(px => [-D / 2, D / 2].forEach(pz => add(g, box(P, H, P), M.wood, px, H / 2 + 0.1, pz)));
  // top plates and tie beams
  [-D / 2, D / 2].forEach(pz => add(g, box(W + 0.3, 0.16, 0.14), M.wood, 0, H + 0.1, pz));
  xs.forEach(px => add(g, box(0.14, 0.16, D + 0.2), M.wood, px, H + 0.1, 0));
  // diagonal braces in every bay of the long sides and both ends (inverted V from the plate down to the posts)
  [-D / 2, D / 2].forEach(pz => xs.slice(0, 3).forEach((px, k) => {
    const nx = xs[k + 1], mid = (px + nx) / 2;
    beam(px, H - 0.75, pz, mid - 0.2, H + 0.02, pz); beam(nx, H - 0.75, pz, mid + 0.2, H + 0.02, pz);
  }));
  [-W / 2, W / 2].forEach(px => { beam(px, H - 0.75, -D / 2, px, H + 0.02, -0.35); beam(px, H - 0.75, D / 2, px, H + 0.02, 0.35); });
  // half-walls (back and both ends), front towards the water left open; light top rail as on the photo
  const wall = (cx, cz, w, d) => { add(g, box(w, 0.85, d), M.panel, cx, 0.55, cz); add(g, box(w + 0.06, 0.07, d + 0.1), M.rail, cx, 1.0, cz); };
  wall(0, -D / 2 + 0.05, W, 0.05); wall(-W / 2 + 0.05, 0, 0.05, D); wall(W / 2 - 0.05, 0, 0.05, D);
  // gable trusses: rafters at each tie beam, ridge, king post
  xs.forEach(px => { beam(px, H + 0.18, -D / 2 - 0.1, px, H + 0.18 + R, 0); beam(px, H + 0.18, D / 2 + 0.1, px, H + 0.18 + R, 0); add(g, box(0.1, R, 0.1), M.wood, px, H + 0.18 + R / 2, 0); });
  add(g, box(W + 0.5, 0.14, 0.14), M.wood, 0, H + 0.18 + R, 0);
  // roof sheets with overhang
  const slope = Math.atan2(R, D / 2), len = Math.hypot(R, D / 2) + 0.45;
  [-1, 1].forEach(sd => { const r = add(g, box(W + 0.9, 0.04, len), M.roof, 0, H + 0.28 + R / 2, sd * (D / 4 + 0.08)); r.rotation.x = sd * slope; });
  // table and benches
  add(g, box(2.4, 0.06, 0.9), M.wood, 0, 0.85, -0.2); add(g, box(0.1, 0.75, 0.1), M.char, 0, 0.45, -0.2);
  [-0.95, 0.55].forEach(bz => add(g, box(2.4, 0.06, 0.35), M.wood, 0, 0.5, bz));
  g.position.set(x, top, z); g.rotation.y = rot; scene.add(g); g.updateMatrixWorld(true);
  for (let k = 0; k <= 8; k++) { const t = k / 8; const p = new THREE.Vector3(-W / 2 + t * W, H - Math.sin(t * Math.PI) * 0.25, D / 2).applyAxisAngle(new THREE.Vector3(0, 1, 0), rot).add(g.position); bulbs.push(p); }
}
function umbrella(x, z) {
  add(scene, new THREE.CylinderGeometry(0.05, 0.05, 2.6, 6), M.wood, x, top + 1.3, z);
  add(scene, new THREE.ConeGeometry(1.5, 0.5, 12, 1, true), M.linen, x, top + 2.55, z);
}
function stringLights(pts, n = 20) {
  const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)));
  for (let i = 0; i <= n; i++) { const p = curve.getPoint(i / n); bulbs.push(p); }
}
function gazebo(x, z, { vip = false, rot = 0, size = 4 } = {}) {
  const g = new THREE.Group(); const s = size / 2;
  add(g, box(size + 0.8, 0.25, size + 0.8), M.deck, 0, 0.12, 0);
  [[-s, -s], [s, -s], [-s, s], [s, s]].forEach(([a, c]) => add(g, box(0.2, 2.8, 0.2), M.wood, a, 1.5, c));
  add(g, box(size + 0.6, 0.18, size + 0.6), M.wood, 0, 2.95, 0);
  const roofM = vip ? M.linen : M.roof;
  const r = add(g, new THREE.ConeGeometry(s * 1.6, 1.1, 4), roofM, 0, 3.6, 0); r.rotation.y = Math.PI / 4;
  // sofa + table
  add(g, box(size - 0.8, 0.45, 0.9), M.linen, 0, 0.45, -s + 0.6);
  add(g, box(0.9, 0.45, size - 1.6), M.linen, -s + 0.6, 0.45, 0.2);
  add(g, box(1.2, 0.4, 0.8), M.wood, 0.4, 0.45, 0.4);
  if (vip) {
    [[-s, 0, 0], [s, 0, 0], [0, -s, Math.PI / 2]].forEach(([a, c, ry]) => {
      const cur = add(g, new THREE.PlaneGeometry(size, 2.6, 8, 1), M.curtain, a, 1.5, c, false);
      cur.rotation.y = ry + Math.PI / 2; const p = cur.geometry.attributes.position;
      for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin(p.getX(i) * 3) * 0.12);
      p.needsUpdate = true; cur.geometry.computeVertexNormals();
    });
  }
  g.position.set(x, top, z); g.rotation.y = rot; scene.add(g);
  const wp = (a, c) => new THREE.Vector3(a, 3.05, c).applyAxisAngle(new THREE.Vector3(0, 1, 0), rot).add(g.position);
  [[-s, -s, s, -s], [s, -s, s, s], [s, s, -s, s], [-s, s, -s, -s]].forEach(([a, b, c, d]) => {
    for (let i = 0; i <= 5; i++) { const t = i / 5; const p = wp(a + (c - a) * t, b + (d - b) * t); p.y -= Math.sin(t * Math.PI) * 0.35; bulbs.push(p); }
  });
  return g;
}
function cabin(x, z, rot = 0) {
  const g = new THREE.Group();
  for (let i = -1; i <= 1; i += 2) for (let j = -1; j <= 1; j += 2) add(g, new THREE.CylinderGeometry(0.15, 0.15, 1.2, 6), M.char, i * 3, 0.6, j * 2.5);
  add(g, box(9, 0.25, 6.5), M.deck, 0.9, 1.25, 0.6);
  add(g, box(6, 3.2, 5), M.wood, -0.6, 2.95, 0);
  add(g, box(6.6, 0.35, 5.6), M.char, -0.6, 4.7, 0);
  const win = add(g, box(0.1, 2.2, 3.4), M.glass, 2.42, 2.6, 0); cabinWindows.push(win);
  // hot tub on terrace
  const tub = add(g, new THREE.CylinderGeometry(1.15, 1.15, 0.9, 20), M.tub, 4, 1.8, 1.6);
  add(g, new THREE.CylinderGeometry(1.0, 1.0, 0.05, 20), M.tubWater, 4, 2.2, 1.6, false);
  add(g, new THREE.CylinderGeometry(0.12, 0.12, 1.6, 8), M.char, 4.9, 2.4, 0.4);
  // stairs to the path side
  for (let k = 0; k < 4; k++) add(g, box(1.4, 0.18, 0.5), M.deck, -3.4 - k * 0.5, 1.1 - k * 0.27, -2.5);
  g.position.set(x, top, z); g.rotation.y = rot; scene.add(g);
  steamSpots.push(new THREE.Vector3(4, 2.4, 1.6).applyAxisAngle(new THREE.Vector3(0, 1, 0), rot).add(g.position));
}

// ---------- zones (south → north) ----------
// Entrance arch at the south tip
(() => {
  const g = new THREE.Group();
  add(g, box(0.4, 4.2, 0.4), M.wood, -2.6, 2.1, 0); add(g, box(0.4, 4.2, 0.4), M.wood, 4.6, 2.1, 0);
  add(g, box(8.2, 0.45, 0.6), M.wood, 1, 4.2, 0);
  add(g, box(3.6, 0.8, 0.12), M.char, 1, 3.5, 0.3);
  g.position.set(0, top, 100); scene.add(g);
  // pergola
  for (let i = 0; i < 6; i++) add(scene, box(7, 0.15, 0.2), M.wood, 1, top + 3.2, 94 + i * 1.1);
  [[-2.4, 93.5], [4.4, 93.5]].forEach(([x, z]) => add(scene, box(0.25, 3.2, 0.25), M.wood, x, top + 1.6, z));
})();
// Reception kiosk + service block (east, bottom): 6 changing cabins, 4 showers, 2 WC
(() => {
  add(scene, box(3.2, 2.6, 2.4), M.char, -5, top + 1.3, 90);
  add(scene, box(3.8, 0.2, 3), M.wood, -5, top + 2.7, 90);
  for (let i = 0; i < 6; i++) { add(scene, box(1.4, 2.3, 1.6), i % 2 ? M.wood : M.char, 7 + (i % 3) * 1.7, top + 1.15, 78 + Math.floor(i / 3) * 4); }
  add(scene, box(6, 0.15, 10), M.deck, 8.7, top + 0.08, 80, false);
  for (let i = 0; i < 4; i++) { add(scene, new THREE.CylinderGeometry(0.06, 0.06, 2.4, 6), M.char, 13 + (i % 2) * 1.6, top + 1.2, 77 + Math.floor(i / 2) * 2); }
  for (let i = 0; i < 2; i++) add(scene, box(1.3, 2.4, 1.3), M.wood, 14, top + 1.2, 82 + i * 1.6);
})();
// 4 VIP gazebos (west, lower)
[[-12, 52], [-12, 61], [-12, 70], [-12, 79]].forEach(([x, z]) => gazebo(x, z, { vip: true, rot: Math.PI / 2, size: 4.2 }));
// deck path from main path to VIP
add(scene, box(9, 0.12, 1.4), M.deck, -6, top + 0.06, 65, false);
// Volleyball court (east)
(() => {
  add(scene, box(9, 0.06, 17), new THREE.MeshStandardMaterial({ color: 0xead7ab, roughness: 1 }), 11, top + 0.03, 52, false);
  [[6.6, 43.6, 9, 0.08], [6.6, 60.4, 9, 0.08]].forEach(([x, z, w, d]) => add(scene, box(w, 0.07, d), M.rope, x + 4.4, top + 0.06, z, false));
  [[6.6, 52], [15.4, 52]].forEach(([x, z]) => add(scene, box(0.08, 0.07, 17), M.rope, x, top + 0.06, z, false));
  [[6.4, 52], [15.6, 52]].forEach(([x, z]) => add(scene, new THREE.CylinderGeometry(0.08, 0.08, 2.6, 8), M.wood, x, top + 1.3, z));
  add(scene, new THREE.PlaneGeometry(9.2, 0.9), M.net, 11, top + 2.1, 52, false);
  add(scene, box(0.5, 0.45, 5), M.wood, 5.8, top + 0.22, 45);
})();
// Kids corner with shade sail (east)
(() => {
  add(scene, box(7, 0.06, 7), M.play, 11, top + 0.03, 34, false);
  add(scene, box(2.2, 1.6, 2.2), M.wood, 10, top + 0.8, 33);
  const slide = add(scene, box(0.9, 0.08, 3), M.sup, 12.2, top + 0.85, 33.6); slide.rotation.x = 0.45;
  [[7.8, 30.8], [14.2, 30.8], [11, 37.4]].forEach(([x, z]) => add(scene, new THREE.CylinderGeometry(0.06, 0.06, 3.2, 6), M.char, x, top + 1.6, z));
  const sail = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(7.8, top + 3.1, 30.8), new THREE.Vector3(14.2, top + 3.1, 30.8), new THREE.Vector3(11, top + 2.8, 37.4)]);
  sail.computeVertexNormals(); add(scene, sail, M.linen, 0, 0, 0);
})();
// Bar with kitchen, deck and tables (east, centre)
(() => {
  add(scene, box(13, 0.25, 11), M.deck, 11, top + 0.12, 14, false);
  add(scene, box(9, 1.1, 1.2), M.char, 10.5, top + 0.8, 11);
  add(scene, box(9.4, 0.08, 1.5), M.wood, 10.5, top + 1.38, 11);
  add(scene, box(9, 2.8, 1), M.char, 10.5, top + 1.65, 8.2);
  [[6, 7.6], [15, 7.6], [6, 13], [15, 13]].forEach(([x, z]) => add(scene, box(0.25, 3.4, 0.25), M.wood, x, top + 1.7, z));
  add(scene, box(10.6, 0.25, 6.4), M.roof, 10.5, top + 3.5, 10.3);
  add(scene, box(4, 2.8, 4), M.wood, 15, top + 1.4, 4.5);
  for (let i = 0; i < 6; i++) add(scene, new THREE.CylinderGeometry(0.22, 0.22, 0.75, 10), M.wood, 7 + i * 1.4, top + 0.6, 12.6);
  [[8, 17], [12, 17], [16, 17]].forEach(([x, z]) => {
    add(scene, new THREE.CylinderGeometry(0.6, 0.6, 0.08, 14), M.wood, x, top + 1, z);
    add(scene, new THREE.CylinderGeometry(0.08, 0.08, 0.8, 6), M.char, x, top + 0.6, z);
    [-1, 1].forEach(s => add(scene, box(0.5, 0.45, 0.5), M.linen, x + s * 1.1, top + 0.47, z));
  });
  stringLights([[5.5, top + 3.6, 19.5], [11, top + 2.9, 20.5], [16.5, top + 3.6, 19.5]], 14);
})();
// Hookah kiosk attached to the bar: 2.5 x 2 m timber booth with counter and sign
(() => {
  const g = new THREE.Group();
  add(g, box(2.6, 2.4, 2.0), M.wood, 0, 1.2, 0);
  add(g, box(2.9, 0.12, 2.3), M.roof, 0, 2.48, 0);
  add(g, box(2.2, 0.5, 0.08), M.char, 0, 2.15, 1.02);
  add(g, box(2.3, 0.08, 0.5), M.wood, 0, 1.1, 1.2);
  add(g, box(0.6, 0.8, 0.06), M.char, 0.7, 0.5, 1.05);
  g.position.set(9, top, 1.5); g.rotation.y = -Math.PI / 2 + Math.PI; scene.add(g);
  stringLights([[5.5, top + 3.4, 1.5], [9, top + 2.9, 3.5], [12.5, top + 3.4, 1.5]], 8);
})();
// Two cabins with hot tubs in the woods (east, upper)
cabin(11, -18, -Math.PI / 2 + 0.05);
cabin(11, -36, -Math.PI / 2 - 0.05);
// Main beach (west): loungers, umbrellas, open gazebos
for (let z = -42; z <= 40; z += 4.2) {
  lounger(-13.4, z, Math.PI / 2 - 0.04); lounger(-16.4, z + 1.2, Math.PI / 2 + 0.04);
  if (Math.round(z) % 3 === 0) umbrella(-14.9, z + 0.6);
}
// 10 open gazebos along the main beach
for (let i = 0; i < 10; i++) beachGazebo(-8.8, -52 + i * 9, Math.PI / 2);
// North beach loungers both sides
for (let z = -76; z <= -54; z += 4) { lounger(-11, z, Math.PI / 2); lounger(9, z, -Math.PI / 2); }
// SUP / kayak rental + pier (west, upper)
(() => {
  add(scene, box(3, 2.2, 2.2), M.char, -14.5, top + 1.1, -60);
  add(scene, box(2, 0.25, 14), M.deck, -21, 0.35, -62, false);
  for (let i = 0; i < 4; i++) add(scene, new THREE.CylinderGeometry(0.12, 0.12, 2, 6), M.char, -21 + (i % 2 ? 0.9 : -0.9), -0.4, -56 - Math.floor(i / 2) * 10, false);
  for (let i = 0; i < 5; i++) { const b = add(scene, box(0.75, 0.12, 3.2), i % 2 ? M.sup : M.hull, -23.3 + 0, 0.05, -58 - i * 2); b.rotation.y = 0.05; }
})();
// Cape: arch with swing, loungers, pontoon with catamarans
(() => {
  const g = new THREE.Group();
  [[-1.8, 1], [1.8, 1]].forEach(([x, s]) => { const l = add(g, box(0.25, 4.6, 0.25), M.wood, x, 2.2, 0); l.rotation.z = s * (x < 0 ? -0.12 : 0.12); });
  add(g, box(4.4, 0.3, 0.3), M.wood, 0, 4.4, 0);
  add(g, box(1.6, 0.12, 0.5), M.wood, 0, 1, 0);
  [-0.7, 0.7].forEach(x => add(g, new THREE.CylinderGeometry(0.02, 0.02, 3.3, 4), M.rope, x, 2.7, 0, false));
  g.position.set(1, top, -96); scene.add(g);
  [[-4, -88], [-6.5, -86], [5, -88]].forEach(([x, z], i) => lounger(x, z, i === 2 ? -0.3 : 0.3));
  add(scene, box(8, 0.3, 3), M.deck, 14, 0.3, -98, false);
  add(scene, box(1.6, 0.3, 8), M.deck, 9, 0.3, -96, false);
  [[13, -103.2], [16.5, -103.2]].forEach(([x, z]) => {
    const c = new THREE.Group();
    [-0.9, 0.9].forEach(dx => { const h = add(c, new THREE.CapsuleGeometry(0.35, 4, 4, 8), M.hull, dx, 0.25, 0); h.rotation.x = Math.PI / 2; });
    add(c, box(2.2, 0.08, 3), M.linen, 0, 0.6, 0);
    add(c, new THREE.CylinderGeometry(0.05, 0.05, 7, 6), M.hull, 0, 4.1, -0.3);
    const sail = add(c, new THREE.PlaneGeometry(2.2, 5.6), M.linen, 0, 4, 0.8, false); sail.rotation.y = Math.PI / 2; sail.rotation.x = 0.05;
    c.position.set(x, 0, z); scene.add(c); boats.push(c);
  });
  stringLights([[-6, top + 4.5, -82], [0, top + 3.8, -84], [6, top + 4.5, -82]], 10);
})();
// lanterns along the main path
const lanterns = [];
for (let z = -80; z <= 92; z += 8) [[-1.4, z], [3.4, z + 4]].forEach(([x, zz]) => {
  add(scene, new THREE.CylinderGeometry(0.05, 0.07, 0.9, 6), M.char, x, top + 0.45, zz); add(scene, box(0.22, 0.26, 0.22), M.linen, x, top + 1.0, zz); lanterns.push(new THREE.Vector3(x, top + 1.0, zz));
});
// garlands crossing the path between the poplars
for (let z = -84; z <= 90; z += 14) stringLights([[-3.2, top + 5.4, z], [1, top + 4.6, z + 1], [5.2, top + 5.4, z]], 9);

// ---------- far shores ----------
(() => {
  const mk = (x, z, w, d) => { add(scene, box(w, 2, d), M.far, x, 0.6, z, false); for (let i = 0; i < w / 6; i++) { const t = add(scene, new THREE.ConeGeometry(2.5 + Math.random() * 2, 7 + Math.random() * 6, 6), M.far, x - w / 2 + i * 6 + Math.random() * 3, 5, z + (Math.random() - 0.5) * d * 0.6, false); } };
  mk(-260, 0, 120, 520); mk(250, -40, 110, 520); mk(0, -330, 600, 60);
  // a few apartment blocks on the east bank, like on site photos
  [[215, -60], [215, -10], [220, 40], [205, 95]].forEach(([x, z], i) => {
    const b = add(scene, box(14, 22 + (i % 2) * 8, 46), M.bldg, x, 11 + (i % 2) * 4, z, false);
  });
  buildingsLit.push(...scene.children.filter(o => o.material === M.bldg));
})();

// ---------- night glow ----------
const glowTex = (() => { const c = document.createElement("canvas"); c.width = c.height = 64; const g = c.getContext("2d"); const r = g.createRadialGradient(32, 32, 0, 32, 32, 32); r.addColorStop(0, "rgba(255,236,190,1)"); r.addColorStop(.3, "rgba(255,200,120,.55)"); r.addColorStop(1, "rgba(255,180,100,0)"); g.fillStyle = r; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); })();
const mkPoints = (arr, size) => new THREE.Points(new THREE.BufferGeometry().setFromPoints(arr), new THREE.PointsMaterial({ map: glowTex, size, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xffd28a }));
const bulbPts = mkPoints(bulbs, 1.1); scene.add(bulbPts);
const lanternPts = mkPoints(lanterns, 2.6); scene.add(lanternPts);
const steam = mkPoints(steamSpots.flatMap(p => [0, 1, 2].map(i => p.clone().add(new THREE.Vector3(0, 0.6 + i * 0.7, 0)))), 2.4);
steam.material.color.set(0xffffff); steam.material.blending = THREE.NormalBlending; steam.material.opacity = 0.35; scene.add(steam);
// a handful of real lights for warm pools at night
const warm = [[10.5, 3, 12], [-12, 3, 65], [11, 3, -18], [11, 3, -36], [1, 3, -94], [1, 3, 98]].map(([x, y, z]) => { const l = new THREE.PointLight(0xffa860, 0, 26, 1.6); l.position.set(x, top + y, z); scene.add(l); return l; });

// ---------- day / night ----------
const DAY = { top: "#5aa0e0", hor: "#e6f1f7", fog: 0xe6f1f7, sun: 2.6, sunC: 0xfff1d6, hemi: 1.1, water: 0x2f6f86, exp: 1.0 };
const NIGHT = { top: "#14204a", hor: "#5a4468", fog: 0x3a3050, sun: 0.45, sunC: 0x9fb4ff, hemi: 0.5, water: 0x1d3c50, exp: 1.25 };
let night = 0, nightTarget = 0;
function applyMood(t) {
  const L = (a, b) => new THREE.Color(a).lerp(new THREE.Color(b), t);
  skyMat.uniforms.top.value.copy(L(DAY.top, NIGHT.top)); skyMat.uniforms.hor.value.copy(L(DAY.hor, NIGHT.hor));
  scene.fog.color.copy(L(DAY.fog, NIGHT.fog));
  sun.intensity = DAY.sun + (NIGHT.sun - DAY.sun) * t; sun.color.copy(L(DAY.sunC, NIGHT.sunC));
  hemi.intensity = DAY.hemi + (NIGHT.hemi - DAY.hemi) * t;
  waterMat.color.copy(L(DAY.water, NIGHT.water));
  renderer.toneMappingExposure = DAY.exp + (NIGHT.exp - DAY.exp) * t;
  bulbPts.material.opacity = 0.15 + t * 0.85; lanternPts.material.opacity = t;
  warm.forEach(l => l.intensity = t * 260);
  cabinWindows.forEach(w => w.material.emissive.setRGB(t * 1.0, t * 0.62, t * 0.3));
  M.tubWater.emissive.setRGB(0, t * 0.25, t * 0.35);
  M.window.emissive.setRGB(t * .5, t * .4, t * .25);
  M.bldg.emissive.setRGB(t * 0.12, t * 0.09, t * 0.05);
}
applyMood(0);

// ---------- labels, cards & fly-to ----------
const ZONES = [
  { id: "vhid", name: "Вхід", p: [1, 6, 100], cam: [30, 26, 140], img: "foto/vhid.jpg", txt: "Арка, рецепція, 6 кабінок, 4 душі, 2 туалети. Кадки з травами замість паркана." },
  { id: "vip", name: "VIP-альтанки", p: [-12, 5, 65], cam: [-48, 22, 92], img: "foto/after-vip.jpg", txt: "4 альтанки зі шторами з льону, м'які дивани, гірлянди. Поруч кальянна." },
  { id: "volley", name: "Волейбол і діти", p: [11, 4, 45], cam: [40, 20, 72], img: "foto/after-voleybol.jpg", txt: "Майданчик на існуючих стовпах, лавки для глядачів, дитячий куточок під тентом." },
  { id: "bar", name: "Бар", p: [10.5, 6, 11], cam: [42, 18, 30], img: "foto/after-bar.jpg", txt: "Бар з навісом, кухня і гриль, поруч кіоск кальянної (є «кальян на винос»), тераса з простими дерев\u0027яними столами." },
  { id: "cabins", name: "Будиночки з чанами", p: [11, 7, -27], cam: [50, 22, -10], img: "foto/after-domyky.jpg", txt: "Два будиночки на палях у ліску, на терасі в кожного свій чан." },
  { id: "beach", name: "Пляж", p: [-11, 4, -5], cam: [-55, 26, 20], img: "foto/3d-plyazh.jpg", txt: "Білі пластикові лежаки, парасолі, 10 беседок 6×4 м під профнастилом, настили до води." },
  { id: "sup", name: "Сапи і пірс", p: [-21, 3, -62], cam: [-55, 18, -40], img: "foto/3d-plyazh.jpg", txt: "Прокат сапів і каяків, дерев'яний пірс." },
  { id: "mys", name: "Мис", p: [3, 7, -96], cam: [-30, 24, -130], img: "foto/before-mys.jpg", txt: "Гойдалка над водою, лежаки, понтон із катамаранами." },
];
const card = host.querySelector(".m3d-card");
function showCard(z) {
  if (!z || !z.img) { card.hidden = true; return; }
  card.querySelector("img").src = z.img; card.querySelector("b").textContent = z.name; card.querySelector("p").textContent = z.txt; card.hidden = false;
}
card.querySelector("button").onclick = () => card.hidden = true;
ZONES.forEach(z => { const el = document.createElement("button"); el.type = "button"; el.className = "m3d-tag"; el.textContent = z.name; el.onclick = e => { e.preventDefault(); if (mode === "walk") return showCard(z); fly(z); }; el.tabIndex = -1; labelsEl.appendChild(el); z.el = el; });
let flight = null;
function fly(z) {
  setMode("orbit");
  controls.autoRotate = false;
  flight = { t: 0, from: camera.position.clone(), to: new THREE.Vector3(...z.cam), tf: controls.target.clone(), tt: new THREE.Vector3(z.p[0], 1, z.p[2]) };
  showCard(z);
}

// ---------- walk mode ----------
const EYE = top + 1.7;
const walk = { x: 1, z: 104, yaw: Math.PI, pitch: -0.05, keys: {}, auto: false, seg: 0, u: 0 };
// route along the path with places to look at
const ROUTE = [
  { p: [1, 104], look: [1, 90] }, { p: [1, 84], look: [9, 80] }, { p: [0, 70], look: [-12, 68] },
  { p: [1, 52], look: [11, 52] }, { p: [1, 34], look: [11, 33] }, { p: [1, 16], look: [10, 11] },
  { p: [-1, 0], look: [-11, -4] }, { p: [1, -22], look: [11, -20] }, { p: [1, -38], look: [11, -36] },
  { p: [-1, -56], look: [-20, -60] }, { p: [1, -76], look: [-8, -86] }, { p: [1, -90], look: [1, -100] },
];
let mode = "orbit";
const walkUI = host.querySelector(".m3d-walk");
function setMode(m) {
  mode = m; host.classList.toggle("walking", m === "walk");
  controls.enabled = m === "orbit"; walkUI.hidden = m !== "walk";
  host.querySelectorAll("[data-act=walk]").forEach(b => b.classList.toggle("on", m === "walk"));
  if (m === "walk") { flight = null; controls.autoRotate = false; camera.fov = 62; }
  else { camera.fov = 38; walk.auto = false; host.querySelector("[data-act=auto]").classList.remove("on"); }
  camera.updateProjectionMatrix();
}
host.querySelector("[data-act=walk]").onclick = () => { if (mode === "walk") { setMode("orbit"); fly({ cam: [-150, 120, 150], p: [0, 0, 0] }); card.hidden = true; } else { Object.assign(walk, { x: 1, z: 104, yaw: Math.PI, pitch: -0.05 }); setMode("walk"); } };
host.querySelector("[data-act=auto]").onclick = e => { walk.auto = !walk.auto; e.currentTarget.classList.toggle("on", walk.auto); if (walk.auto) { const nearest = ROUTE.reduce((b, r, i) => Math.abs(r.p[1] - walk.z) < Math.abs(ROUTE[b].p[1] - walk.z) ? i : b, 0); walk.seg = Math.min(nearest, ROUTE.length - 2); walk.u = 0; } };
// drag to look around
let drag = null;
canvas.addEventListener("pointerdown", e => { controls.autoRotate = false; flight = null; if (mode === "walk") { drag = { x: e.clientX, y: e.clientY }; canvas.setPointerCapture(e.pointerId); } });
canvas.addEventListener("pointermove", e => { if (!drag) return; walk.yaw += (e.clientX - drag.x) * 0.005; walk.pitch = Math.max(-0.9, Math.min(0.6, walk.pitch + (e.clientY - drag.y) * 0.004)); drag = { x: e.clientX, y: e.clientY }; walk.auto = false; host.querySelector("[data-act=auto]").classList.remove("on"); });
canvas.addEventListener("pointerup", () => drag = null);
// keyboard
addEventListener("keydown", e => { if (mode !== "walk") return; walk.keys[e.code] = true; if (/Arrow|Key[WASD]/.test(e.code)) { e.preventDefault(); walk.auto = false; } });
addEventListener("keyup", e => { walk.keys[e.code] = false; });
// on-screen hold buttons
walkUI.querySelectorAll("[data-mv]").forEach(b => {
  const on = e => { e.preventDefault(); walk.keys[b.dataset.mv] = true; walk.auto = false; host.querySelector("[data-act=auto]").classList.remove("on"); };
  const off = () => { walk.keys[b.dataset.mv] = false; };
  b.addEventListener("pointerdown", on); b.addEventListener("pointerup", off); b.addEventListener("pointerleave", off); b.addEventListener("pointercancel", off);
});
const inside = (x, z) => { // stay on land
  if (z < -104 || z > 110) return false;
  const half = z < -90 ? 6 + (z + 104) * 0.6 : z > 100 ? 13 - (z - 100) * 0.9 : 17;
  return Math.abs(x) < half;
};
function stepWalk(dt) {
  if (walk.auto) {
    const a = ROUTE[walk.seg], b = ROUTE[walk.seg + 1];
    const len = Math.hypot(b.p[0] - a.p[0], b.p[1] - a.p[1]);
    walk.u += (dt * 4.2) / len;
    if (walk.u >= 1) { walk.u = 0; walk.seg++; if (walk.seg >= ROUTE.length - 1) { walk.seg = ROUTE.length - 2; walk.u = 1; walk.auto = false; host.querySelector("[data-act=auto]").classList.remove("on"); } }
    const u = walk.u; walk.x = a.p[0] + (b.p[0] - a.p[0]) * u; walk.z = a.p[1] + (b.p[1] - a.p[1]) * u;
    // look toward the point of interest, easing between segments
    const la = a.look, lb = b.look, k = u * u * (3 - 2 * u);
    const lx = la[0] + (lb[0] - la[0]) * k, lz = la[1] + (lb[1] - la[1]) * k;
    const want = Math.atan2(-(lx - walk.x), -(lz - walk.z));
    let d = want - walk.yaw; d = Math.atan2(Math.sin(d), Math.cos(d)); walk.yaw += d * Math.min(1, dt * 2);
    walk.pitch += (-0.04 - walk.pitch) * dt * 2;
  } else {
    const K = walk.keys, sp = (K.ShiftLeft || K.ShiftRight ? 7 : 3.4) * dt;
    let f = (K.KeyW || K.ArrowUp || K.fwd ? 1 : 0) - (K.KeyS || K.ArrowDown || K.back ? 1 : 0);
    let s = (K.KeyD || K.right ? 1 : 0) - (K.KeyA || K.left ? 1 : 0);
    if (K.ArrowLeft) walk.yaw += dt * 1.6; if (K.ArrowRight) walk.yaw -= dt * 1.6;
    if (K.turnL) walk.yaw += dt * 1.4; if (K.turnR) walk.yaw -= dt * 1.4;
    const nx = walk.x + (-Math.sin(walk.yaw) * f + Math.cos(walk.yaw) * s) * sp;
    const nz = walk.z + (-Math.cos(walk.yaw) * f - Math.sin(walk.yaw) * s) * sp;
    if (inside(nx, walk.z)) walk.x = nx; if (inside(walk.x, nz)) walk.z = nz;
  }
  const bob = (walk.auto || Object.values(walk.keys).some(Boolean)) ? Math.sin(performance.now() * 0.009) * 0.04 : 0;
  camera.position.set(walk.x, EYE + bob, walk.z);
  camera.rotation.set(walk.pitch, walk.yaw, 0, "YXZ");
}

// ---------- buttons: overview, night, fullscreen ----------
host.querySelector("[data-act=all]").onclick = () => { card.hidden = true; fly({ cam: [-150, 120, 150], p: [0, 0, 0] }); card.hidden = true; setTimeout(() => controls.autoRotate = true, 1800); };
const nightBtn = host.querySelector("[data-act=night]");
nightBtn.onclick = () => { nightTarget = nightTarget ? 0 : 1; nightBtn.textContent = nightTarget ? "☀︎ День" : "☾ Ніч"; };
const fsBtn = host.querySelector("[data-act=full]");
fsBtn.onclick = async () => {
  const full = host.classList.contains("full") || document.fullscreenElement === host;
  if (full) { host.classList.remove("full"); document.body.classList.remove("noscroll"); if (document.fullscreenElement) await document.exitFullscreen().catch(() => {}); }
  else { host.classList.add("full"); document.body.classList.add("noscroll"); if (host.requestFullscreen) await host.requestFullscreen().catch(() => {}); }
  fsBtn.textContent = host.classList.contains("full") ? "✕ Закрити" : "⤢ На весь екран"; setTimeout(resize, 60);
};
document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement && host.classList.contains("full")) { host.classList.remove("full"); document.body.classList.remove("noscroll"); fsBtn.textContent = "⤢ На весь екран"; setTimeout(resize, 60); } });

// ---------- loop ----------
function resize() { const r = host.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / r.height; camera.updateProjectionMatrix(); }
new ResizeObserver(resize).observe(host); resize();
let visible = true;
new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.01 }).observe(host);
const clock = new THREE.Clock(); const v = new THREE.Vector3(); let last = 0;
renderer.setAnimationLoop(() => {
  if (!visible) return;
  const t = clock.getElapsedTime(), dt = Math.min(t - last, 0.05); last = t;
  if (mode === "walk") stepWalk(dt);
  else {
    if (flight) {
      flight.t = Math.min(1, flight.t + dt * 0.9); const k = 1 - Math.pow(1 - flight.t, 3);
      camera.position.lerpVectors(flight.from, flight.to, k); controls.target.lerpVectors(flight.tf, flight.tt, k);
      if (flight.t >= 1) flight = null;
    }
    controls.update();
  }
  night += (nightTarget - night) * Math.min(1, dt * 3); applyMood(night);
  for (let i = 0; i < wPos.count; i += 1) { const x = wBase[i * 3], z = wBase[i * 3 + 2]; wPos.array[i * 3 + 1] = Math.sin(x * 0.05 + t * 0.9) * 0.12 + Math.sin(z * 0.07 + t * 0.6) * 0.1; }
  wPos.needsUpdate = true;
  boats.forEach((b, i) => { b.rotation.z = Math.sin(t * 0.9 + i) * 0.03; b.position.y = Math.sin(t * 1.2 + i) * 0.08; });
  steam.material.opacity = 0.18 + Math.sin(t * 1.5) * 0.08;
  renderer.render(scene, camera);
  const r = canvas.getBoundingClientRect();
  ZONES.forEach(z => {
    v.set(...z.p).project(camera);
    const dist = camera.position.distanceTo(new THREE.Vector3(...z.p));
    const on = v.z < 1 && Math.abs(v.x) < 1.05 && Math.abs(v.y) < 1.05 && (mode !== "walk" || dist < 45);
    z.el.style.opacity = on ? 1 : 0; z.el.style.pointerEvents = on ? "auto" : "none";
    z.el.style.transform = `translate(${(v.x * 0.5 + 0.5) * r.width}px,${(-v.y * 0.5 + 0.5) * r.height}px) translate(-50%,-100%)`;
  });
});
// style chips on the page recolour the model
const STYLE_MAT = {
  light: { wood: 0xa8743f, deck: 0xc7a06b, roof: 0x3b3f44, char: 0x2b2622, linen: 0xf6f0e3, panel: 0xb98a55 },
  dark: { wood: 0x5a3e2b, deck: 0x3b2a1f, roof: 0x2a2a30, char: 0x1c1c1e, linen: 0xd9d4cc, panel: 0x26221f },
  red: { wood: 0x8a4f2a, deck: 0xa9784a, roof: 0x8e2a22, char: 0x5b4a3a, linen: 0xefe6d6, panel: 0x2b2b2b },
  log: { wood: 0xe4c79a, deck: 0xc99e64, roof: 0x6b4e2e, char: 0xa9784a, linen: 0xf3ead9, panel: 0xd6b07c },
  white: { wood: 0xf4f4f2, deck: 0xe8e2d6, roof: 0xdfe5e8, char: 0x2f6f86, linen: 0xffffff, panel: 0xffffff },
  boho: { wood: 0xd9b98e, deck: 0xb5855a, roof: 0xc9a46a, char: 0x7a5a3a, linen: 0xf2e6d0, panel: 0xc8a273 },
};
addEventListener("beachstyle", e => { const p = STYLE_MAT[e.detail.style]; if (!p) return; for (const k in p) M[k].color.setHex(p[k]); });
host.classList.add("ready");
