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
  grass: new THREE.MeshStandardMaterial({ color: 0x7fa356, roughness: 1 }),
  path: new THREE.MeshStandardMaterial({ color: 0xd8c9a6, roughness: 0.95 }),
  wood: new THREE.MeshStandardMaterial({ color: 0x9a6236, roughness: 0.75 }),
  deck: new THREE.MeshStandardMaterial({ color: 0xc9a77c, roughness: 0.8 }),
  char: new THREE.MeshStandardMaterial({ color: 0x1d1d1f, roughness: 0.85 }),
  linen: new THREE.MeshStandardMaterial({ color: 0xe6d9bf, roughness: 0.95, side: THREE.DoubleSide }),
  curtain: new THREE.MeshStandardMaterial({ color: 0xeee3cf, roughness: 1, transparent: true, opacity: 0.88, side: THREE.DoubleSide }),
  roof: new THREE.MeshStandardMaterial({ color: 0x5a5e64, roughness: 0.6, metalness: 0.25 }),
  plastic: new THREE.MeshStandardMaterial({ color: 0xf4f4f2, roughness: 0.35 }),
  panel: new THREE.MeshStandardMaterial({ color: 0x8e5a33, roughness: 0.85 }),
  rail: new THREE.MeshStandardMaterial({ color: 0xa06a3c, roughness: 0.6 }),
  trunk: new THREE.MeshStandardMaterial({ color: 0x5b4a3a, roughness: 1 }),
  poplar: new THREE.MeshStandardMaterial({ color: 0x62a043, roughness: 0.9, flatShading: true }),
  bush: new THREE.MeshStandardMaterial({ color: 0x5f9a3e, roughness: 0.9, flatShading: true }),
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

// black sign with white letters, as on the photo renders
function sign(parent, text, w, h, x, y, z, ry = 0) {
  const c = document.createElement("canvas"); c.width = 512; c.height = Math.round(512 * h / w); const g = c.getContext("2d");
  g.fillStyle = "#151515"; g.fillRect(0, 0, c.width, c.height); g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "middle";
  g.font = `700 ${Math.round(c.height * 0.62)}px system-ui, Arial`; g.fillText(text, c.width / 2, c.height / 2 + 2);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  const s = add(parent, new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: 0.8 }), x, y, z, false); s.rotation.y = ry; return s;
}
function planter(x, z) { add(scene, box(1, 0.6, 0.5), M.char, x, top + 0.3, z); add(scene, new THREE.ConeGeometry(0.45, 0.9, 6), M.bush, x, top + 1.0, z, false); }

// ---------- water ----------
const waterGeo = new THREE.PlaneGeometry(1600, 1600, 160, 160); waterGeo.rotateX(-Math.PI / 2);
const waterMat = new THREE.MeshStandardMaterial({ color: 0x2f6f86, roughness: 0.18, metalness: 0.35, transparent: true, opacity: 0.96 });
const water = new THREE.Mesh(waterGeo, waterMat); water.position.y = -0.15; water.receiveShadow = true; scene.add(water);
const wPos = waterGeo.attributes.position, wBase = wPos.array.slice();

// ---------- the spit ----------
const west = [[6, -122], [-4, -120], [-14, -115], [-22, -106], [-26, -95], [-26, -84], [-23, -73], [-20.5, -62], [-19.5, -45], [-19.5, -10], [-20, 20], [-19.5, 50], [-18.5, 75], [-16, 92], [-12, 103], [-6, 110], [0, 112]];
const east = [[0, 112], [7, 110], [13, 103], [17, 92], [19, 75], [19.5, 50], [19.5, 20], [19, -10], [19, -40], [21, -55], [25, -66], [29, -78], [31, -90], [30, -102], [25, -112], [16, -119]];
const outline = [...west, ...east];
const mkShape = (pts, grow = 0) => { const s = new THREE.Shape(); pts.forEach(([x, z], i) => { const k = 1 + grow / 20; const X = x * k, Z = z * (1 + grow / 110); i ? s.lineTo(X, -Z) : s.moveTo(X, -Z); }); return s; };
const landGeo = (grow, depth) => { const g = new THREE.ExtrudeGeometry(mkShape(outline, grow), { depth, bevelEnabled: true, bevelThickness: 0.6, bevelSize: 1.2, bevelSegments: 3, curveSegments: 24 }); g.rotateX(-Math.PI / 2); return g; };
const wet = new THREE.Mesh(landGeo(2.5, 0.6), M.wetSand); wet.position.y = -1.0; wet.receiveShadow = true; scene.add(wet);
const land = new THREE.Mesh(landGeo(0, 0.9), M.sand); land.position.y = -0.7; land.receiveShadow = true; scene.add(land);
const top = 0.8;

// central path (straight like on the render)
add(scene, box(3.6, 0.12, 196), M.path, 1, top + 0.06, 6, false);
{ const ext = add(scene, box(3.6, 0.12, 24), M.path, 3.2, top + 0.06, -101, false); ext.rotation.y = -0.2; }
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
// ---------- people & small props (budget beach life, as on the photo renders) ----------
const SKIN = [0xe0b08a, 0xd29c74, 0xc58b62].map(c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.8 }));
const CLOTH = [0xffffff, 0x2f4f6f, 0xd9534f, 0x3a7d44, 0xf2c14e, 0x222222, 0x8e7cc3, 0x5bc0de, 0xe8dcc4].map(c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9 }));
const SHORTS = [0x1f3550, 0x333333, 0x6b8fb3, 0x7a5c3a].map(c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9 }));
const pick = a => a[Math.floor(Math.random() * a.length)];
const headGeo = new THREE.SphereGeometry(0.12, 10, 8);
function person(parent, x, y, z, { pose = "stand", rot = 0, s = 1 } = {}) {
  const g = new THREE.Group(), sk = pick(SKIN), sh = pick(CLOTH), pa = pick(SHORTS);
  if (pose === "stand") {
    add(g, box(0.3, 0.82, 0.18), pa, 0, 0.41, 0); add(g, box(0.4, 0.6, 0.22), sh, 0, 1.12, 0);
    [-0.25, 0.25].forEach(a => add(g, box(0.09, 0.55, 0.09), sk, a, 1.1, 0)); add(g, headGeo, sk, 0, 1.6, 0);
  } else if (pose === "sit") {
    add(g, box(0.32, 0.16, 0.42), pa, 0, 0.08, 0.18); add(g, box(0.28, 0.45, 0.14), sk, 0, -0.2, 0.4);
    add(g, box(0.4, 0.55, 0.22), sh, 0, 0.45, 0); add(g, headGeo, sk, 0, 0.88, 0);
  } else if (pose === "lie") {
    add(g, box(0.38, 0.16, 0.7), sh, 0, 0.08, -0.25); add(g, box(0.34, 0.14, 0.85), sk, 0, 0.07, 0.5); add(g, headGeo, sk, 0, 0.12, -0.72);
  } else if (pose === "swim") { add(g, headGeo, sk, 0, 0.05, 0); }
  g.position.set(x, y, z); g.rotation.y = rot; g.scale.setScalar(s); parent.add(g); return g;
}
const TOWEL = [0x5bc0de, 0xd9534f, 0xf2c14e, 0x8e7cc3, 0x3a7d44].map(c => new THREE.MeshStandardMaterial({ color: c, roughness: 1 }));
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
function beachGazebo(x, z, rot = 0, busy = false) {
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
  if (busy) { [-0.8, 0, 0.8].forEach(px => { person(g, px, 0.55, -1.0, { pose: "sit" }); if (px) person(g, px, 0.55, 0.6, { pose: "sit", rot: Math.PI }); });
    [-0.6, 0.3, 0.9].forEach(px => add(g, new THREE.CylinderGeometry(0.11, 0.11, 0.03, 10), M.plastic, px, 0.9, -0.2)); }
  g.position.set(x, top, z); g.rotation.y = rot; scene.add(g); g.updateMatrixWorld(true);
  for (let k = 0; k <= 8; k++) { const t = k / 8; const p = new THREE.Vector3(-W / 2 + t * W, H - Math.sin(t * Math.PI) * 0.25, D / 2).applyAxisAngle(new THREE.Vector3(0, 1, 0), rot).add(g.position); bulbs.push(p); }
}
function umbrella(x, z) {
  add(scene, new THREE.CylinderGeometry(0.05, 0.05, 2.6, 6), M.wood, x, top + 1.3, z);
  const u = add(scene, new THREE.ConeGeometry(1.6, 0.45, 4, 1, true), M.linen, x, top + 2.55, z); u.rotation.y = Math.PI / 4;
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
  if (vip) add(g, box(size + 0.5, 0.08, size + 0.5), M.linen, 0, 3.08, 0);
  else { const r = add(g, new THREE.ConeGeometry(s * 1.6, 1.1, 4), M.roof, 0, 3.6, 0); r.rotation.y = Math.PI / 4; }
  // sofa + table
  add(g, box(size - 0.8, 0.45, 0.9), M.linen, 0, 0.45, -s + 0.6);
  add(g, box(0.9, 0.45, size - 1.6), M.linen, -s + 0.6, 0.45, 0.2);
  add(g, box(1.2, 0.4, 0.8), M.wood, 0.4, 0.45, 0.4);
  if (vip) {
    [-0.7, 0.5].forEach(px => person(g, px, 0.68, -s + 0.6, { pose: "sit" })); person(g, -s + 0.6, 0.68, 0.6, { pose: "sit", rot: Math.PI / 2 });
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
  [-5, -1.5, 2, 5].forEach(px => [-2.5, 2.5].forEach(pz => add(g, new THREE.CylinderGeometry(0.15, 0.15, 1.2, 6), M.char, px, 0.6, pz)));
  add(g, box(11, 0.25, 6.5), M.deck, -0.1, 1.25, 0.6);
  add(g, box(8, 2.9, 5), M.wood, -1.6, 2.8, 0);
  const gable = new THREE.Shape(); gable.moveTo(-2.5, 0); gable.lineTo(2.5, 0); gable.lineTo(0, 1.6); gable.closePath();
  const gg = new THREE.ExtrudeGeometry(gable, { depth: 8, bevelEnabled: false }); gg.rotateY(Math.PI / 2); add(g, gg, M.wood, -5.6, 4.25, 0);
  const pitch = Math.atan2(1.6, 2.5), rl = Math.hypot(1.6, 2.5) + 0.35;
  [-1, 1].forEach(sd => { const r = add(g, box(8.6, 0.08, rl), M.roof, -1.6, 4.25 + 0.8 + 0.06, sd * 1.3); r.rotation.x = sd * pitch; });
  const win = add(g, box(0.1, 2.2, 3.4), M.glass, 2.42, 2.6, 0); cabinWindows.push(win);
  // hot tub on terrace
  const tub = add(g, new THREE.CylinderGeometry(1.15, 1.15, 0.9, 20), M.tub, 4, 1.8, 1.6);
  add(g, new THREE.CylinderGeometry(1.0, 1.0, 0.05, 20), M.tubWater, 4, 2.2, 1.6, false);
  add(g, new THREE.CylinderGeometry(0.12, 0.12, 1.6, 8), M.char, 4.9, 2.4, 0.4);
  [[3.6, 1.4], [4.4, 1.9]].forEach(([a, c]) => person(g, a, 2.1, c, { pose: "swim" }));
  person(g, 1.2, 1.38, 2.4, { pose: "stand", rot: -Math.PI / 2 });
  for (let k = 0; k < 3; k++) add(g, new THREE.CylinderGeometry(0.12, 0.12, 1.4, 6), M.wood, -4.6, 0.25 + k * 0.22, 3.2).rotation.x = Math.PI / 2;
  [[0.2, 3.2], [-0.8, 3.2]].forEach(([a, c]) => { add(g, box(0.55, 0.08, 0.55), M.wood, a, 1.75, c); add(g, box(0.55, 0.5, 0.06), M.wood, a, 2.0, c + 0.26); });
  // stairs to the path side
  for (let k = 0; k < 4; k++) add(g, box(1.4, 0.18, 0.5), M.deck, 4.6, 1.1 - k * 0.27, -3.0 - k * 0.5);
  g.position.set(x, top, z); g.rotation.y = rot; scene.add(g);
  steamSpots.push(new THREE.Vector3(4, 2.4, 1.6).applyAxisAngle(new THREE.Vector3(0, 1, 0), rot).add(g.position));
}

// ---------- zones (south → north) ----------
// Entrance arch at the south tip
(() => {
  const g = new THREE.Group();
  add(g, box(0.4, 4.2, 0.4), M.wood, -2.6, 2.1, 0); add(g, box(0.4, 4.2, 0.4), M.wood, 4.6, 2.1, 0);
  add(g, box(8.2, 0.45, 0.6), M.wood, 1, 4.2, 0);
  add(g, box(3.6, 0.8, 0.12), M.char, 1, 3.5, 0.3); sign(g, "ПЛЯЖ", 3.4, 0.7, 1, 3.5, 0.37);
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
  const yellow = new THREE.MeshStandardMaterial({ color: 0xf2c200, roughness: 0.5 }); [[6.4, 52], [15.6, 52]].forEach(([x, z]) => add(scene, new THREE.CylinderGeometry(0.08, 0.08, 2.6, 8), yellow, x, top + 1.3, z));
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
  add(scene, box(9.2, 0.3, 0.2), M.wood, 10.5, top + 3.2, 13.1); sign(scene, "BAR", 2.4, 0.8, 10.5, top + 2.75, 13.22);
  add(scene, box(4, 2.8, 4), M.wood, 15, top + 1.4, 4.5);
  for (let i = 0; i < 6; i++) add(scene, new THREE.CylinderGeometry(0.22, 0.22, 0.75, 10), M.wood, 7 + i * 1.4, top + 0.6, 12.6);
  [[8, 17], [12, 17], [16, 17]].forEach(([x, z]) => {
    add(scene, new THREE.CylinderGeometry(0.6, 0.6, 0.08, 14), M.wood, x, top + 1, z);
    add(scene, new THREE.CylinderGeometry(0.08, 0.08, 0.8, 6), M.char, x, top + 0.6, z);
    [-1, 1].forEach(s => add(scene, box(0.5, 0.45, 0.5), M.linen, x + s * 1.1, top + 0.47, z));
  });
  stringLights([[5.5, top + 3.6, 19.5], [11, top + 2.9, 20.5], [16.5, top + 3.6, 19.5]], 14);
})();
// Hookah kiosk: separate 2.5 x 2 m booth a few metres from the bar (sand between), sign HOOKAH
(() => {
  const g = new THREE.Group();
  add(g, box(2.6, 2.4, 2.0), M.wood, 0, 1.2, 0);
  add(g, box(2.9, 0.12, 2.3), M.roof, 0, 2.48, 0);
  sign(g, "HOOKAH", 2.0, 0.45, 0, 2.15, 1.03);
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
for (let i = 0; i < 10; i++) beachGazebo(-8.8, -52 + i * 9, Math.PI / 2, i % 3 !== 1);
// North beach loungers both sides
for (let z = -76; z <= -54; z += 4) { lounger(-11, z, Math.PI / 2); lounger(9, z, -Math.PI / 2); }
// SUP / kayak rental + pier (west, upper)
(() => {
  add(scene, box(3, 2.2, 2.2), M.wood, -14.5, top + 1.1, -60); add(scene, box(3.4, 0.12, 2.6), M.roof, -14.5, top + 2.3, -60); sign(scene, "SUP", 1.4, 0.5, -12.98, top + 1.7, -60, Math.PI / 2);
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
  g.position.set(6, top, -114); scene.add(g);
  [[-4, -88], [-6.5, -86], [5, -88]].forEach(([x, z], i) => lounger(x, z, i === 2 ? -0.3 : 0.3));
  for (let r = 0; r < 3; r++) for (let k = 0; k < 6; k++) lounger(-18 + k * 3.2, -96 - r * 4.5, 0.4);
  for (let k = 0; k < 4; k++) { lounger(14 + k * 3, -86, -0.5); lounger(15 + k * 3, -95, -0.5); }
  [[-12, -97], [-2, -101], [19, -90]].forEach(([x, z]) => umbrella(x, z));
  add(scene, box(8, 0.3, 3), M.deck, 38, 0.3, -92, false);
  add(scene, box(6, 0.3, 1.6), M.deck, 32.5, 0.3, -92, false);
  [[37, -97.2], [40.5, -97.2]].forEach(([x, z]) => {
    const c = new THREE.Group();
    [-0.9, 0.9].forEach(dx => { const h = add(c, new THREE.CapsuleGeometry(0.35, 4, 4, 8), M.hull, dx, 0.25, 0); h.rotation.x = Math.PI / 2; });
    add(c, box(2.2, 0.08, 3), M.linen, 0, 0.6, 0);
    add(c, new THREE.CylinderGeometry(0.05, 0.05, 7, 6), M.hull, 0, 4.1, -0.3);
    const sail = add(c, new THREE.PlaneGeometry(2.2, 5.6), M.linen, 0, 4, 0.8, false); sail.rotation.y = Math.PI / 2; sail.rotation.x = 0.05;
    c.position.set(x, 0, z); scene.add(c); boats.push(c);
  });
  stringLights([[-6, top + 4.5, -82], [0, top + 3.8, -84], [6, top + 4.5, -82]], 10);
  stringLights([[-16, top + 4, -92], [-2, top + 3.4, -94], [14, top + 4, -90]], 14);
})();
// lifeguard tower on the main beach
(() => { const g = new THREE.Group(); [[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]].forEach(([a, c]) => add(g, box(0.15, 3, 0.15), M.wood, a, 1.5, c));
  add(g, box(2, 0.15, 2), M.deck, 0, 3, 0); add(g, box(2, 0.5, 0.06), M.wood, 0, 3.3, 0.97); add(g, box(2.4, 0.08, 2.4), M.roof, 0, 4.6, 0);
  [[-0.95, -0.95], [0.95, -0.95], [-0.95, 0.95], [0.95, 0.95]].forEach(([a, c]) => add(g, box(0.08, 1.5, 0.08), M.wood, a, 3.8, c));
  g.position.set(-16, top, -47); scene.add(g); })();
[[-1.8, 96], [3.8, 96], [-1.8, 84], [3.8, 74], [-1.8, 58], [3.8, 24], [-1.8, -8], [3.8, -48]].forEach(([x, z]) => planter(x, z));
// ---------- life ----------
(() => {
  // sunbathers, towels, bags on the main beach
  let k = 0;
  for (let z = -42; z <= 40; z += 4.2) { [[-13.4, z], [-16.4, z + 1.2]].forEach(([x, zz]) => { k++;
    if (k % 3 === 0) person(scene, x, top + 0.42, zz, { pose: "lie", rot: Math.PI / 2 });
    else if (k % 3 === 1) add(scene, box(1.2, 0.03, 0.6), pick(TOWEL), x, top + 0.42, zz, false); }); }
  // people on the sand and in the water
  for (let i = 0; i < 14; i++) person(scene, -18 + Math.random() * 3, top, -40 + i * 6 + Math.random() * 2, { pose: "stand", rot: Math.random() * 6 });
  for (let i = 0; i < 18; i++) person(scene, -23 - Math.random() * 6, -0.05, -40 + i * 5 + Math.random() * 3, { pose: "swim" });
  // bar: bartenders, guests on stools, guests at tables, walnut tables with benches like on the photo
  [9, 12].forEach(x => person(scene, x, top + 0.25, 9.6, { pose: "stand" }));
  [0, 1, 3, 4].forEach(i => person(scene, 7 + i * 1.4, top + 1.0, 12.9, { pose: "sit", rot: Math.PI }));
  [[8, 17], [12, 17], [16, 17]].forEach(([x, z]) => [-1, 1].forEach(sd => person(scene, x + sd * 1.1, top + 0.72, z, { pose: "sit", rot: sd * Math.PI / 2 })));
  [[7, 22.5], [12, 22.5]].forEach(([x, z]) => { add(scene, box(2.2, 0.08, 0.9), M.wood, x, top + 0.78, z); [-0.75, 0.75].forEach(dz => add(scene, box(2.2, 0.06, 0.32), M.wood, x, top + 0.45, z + dz));
    [-0.6, 0.6].forEach(dx => { person(scene, x + dx, top + 0.5, z - 0.8, { pose: "sit" }); person(scene, x + dx, top + 0.5, z + 0.8, { pose: "sit", rot: Math.PI }); }); });
  // hookah kiosk: master inside, glass hookahs on the counter, a waiter carrying one away
  person(scene, 9.2, top, 1.5, { pose: "stand", rot: Math.PI / 2 });
  const glassM = new THREE.MeshStandardMaterial({ color: 0x9fd3e6, roughness: 0.1, transparent: true, opacity: 0.75 });
  [1.0, 2.0].forEach(z => { add(scene, new THREE.SphereGeometry(0.16, 10, 8), glassM, 10.3, top + 1.3, z); add(scene, new THREE.CylinderGeometry(0.03, 0.03, 0.5, 6), M.char, 10.3, top + 1.6, z); });
  person(scene, 13, top, 4.5, { pose: "stand", rot: -0.6 });
  // volleyball players, spectators on the bench, kids in the corner
  [[8.5, 47], [12, 46], [14, 49], [9, 56], [12.5, 57.5], [14.5, 55]].forEach(([x, z], i) => person(scene, x, top, z, { pose: "stand", rot: i < 3 ? 0 : Math.PI }));
  [43.5, 45, 46.5].forEach(z => person(scene, 5.8, top + 0.47, z, { pose: "sit", rot: -Math.PI / 2 }));
  [[9.5, 32], [11.8, 35], [12.6, 31.5]].forEach(([x, z]) => person(scene, x, top, z, { pose: "stand", s: 0.6, rot: Math.random() * 6 }));
  person(scene, 14.5, top, 34, { pose: "stand", rot: Math.PI / 2 });
  // entrance: arriving guests; walkers along the path
  [[0.4, 104], [1.6, 103], [1, 97]].forEach(([x, z]) => person(scene, x, top, z, { pose: "stand", rot: Math.PI }));
  for (let z = -70; z <= 80; z += 19) person(scene, 0.4 + Math.random() * 1.6, top + 0.12, z, { pose: "stand", rot: Math.random() > 0.5 ? 0 : Math.PI });
  // SUP riders and a kayak near the pier
  [[-27, -58], [-30, -66], [-26, -72]].forEach(([x, z]) => { add(scene, box(0.75, 0.12, 3.2), M.sup, x, 0.05, z); person(scene, x, 0.1, z, { pose: "stand", rot: 0.3 }); });
  // cape: sunset watchers, a wooden photo frame
  [[-8, -100], [-6.5, -101], [10, -104], [11, -104.5]].forEach(([x, z]) => person(scene, x, top, z, { pose: "stand", rot: Math.PI * 0.85 }));
  const fr = new THREE.Group(); [[-1.3, 0], [1.3, 0]].forEach(([a]) => add(fr, box(0.18, 2.8, 0.18), M.wood, a, 1.4, 0)); [0.1, 2.75].forEach(y => add(fr, box(2.8, 0.18, 0.18), M.wood, 0, y, 0)); fr.position.set(-8, top, -108); fr.rotation.y = 0.5; scene.add(fr);
  // black bins and planters along the path
  [-60, -20, 18, 50, 86].forEach(z => add(scene, new THREE.CylinderGeometry(0.28, 0.25, 0.9, 10), M.char, 3.6, top + 0.45, z));
})();
// lanterns along the main path
const lanterns = [];
for (let z = -80; z <= 92; z += 8) [[-1.4, z], [3.4, z + 4]].forEach(([x, zz]) => {
  add(scene, new THREE.CylinderGeometry(0.05, 0.07, 0.9, 6), M.char, x, top + 0.45, zz); add(scene, box(0.22, 0.26, 0.22), M.linen, x, top + 1.0, zz); lanterns.push(new THREE.Vector3(x, top + 1.0, zz));
});
// garlands crossing the path between the poplars
for (let z = -84; z <= 90; z += 14) stringLights([[-3.2, top + 5.4, z], [1, top + 4.6, z + 1], [5.2, top + 5.4, z]], 9);

// ---------- east islet across the quiet lagoon ----------
(() => {
  const s = new THREE.Shape(); [[52, -95], [60, -80], [62, -55], [58, -35], [50, -30], [47, -50], [48, -75]].forEach(([x, z], i) => i ? s.lineTo(x, -z) : s.moveTo(x, -z));
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.8, bevelEnabled: true, bevelThickness: 0.4, bevelSize: 1, bevelSegments: 2 }); g.rotateX(-Math.PI / 2);
  const isl = new THREE.Mesh(g, M.grass); isl.position.y = -0.7; isl.receiveShadow = true; scene.add(isl);
  for (let z = -90; z <= -36; z += 5) { tree(52 + Math.random() * 6, z, Math.random() > 0.5 ? "round" : "poplar", 0.9 + Math.random() * 0.4); }
})();

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
const warm = [[10.5, 3, 12], [-12, 3, 65], [11, 3, -18], [11, 3, -36], [6, 3, -112], [1, 3, 98]].map(([x, y, z]) => { const l = new THREE.PointLight(0xffa860, 0, 26, 1.6); l.position.set(x, top + y, z); scene.add(l); return l; });

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
  { id: "vhid", name: "Вхід", p: [1, 6, 100], cam: [30, 26, 140], img: "foto/story-01.jpg", txt: "Арка, рецепція, 6 кабінок, 4 душі, 2 туалети. Кадки з травами замість паркана.", specs: [["Де", "з боку дороги, південь коси"], ["Рецепція", "кіоск 3×2,5 м, графітовий дах"], ["Кабінки", "6 шт., 1,2×1,2 м, висота 2,2 м"], ["Душ", "4 шт. на дерев'яному настилі"], ["Туалети", "2 біотуалети"], ["Огорожа", "умовна: кадки зі злаками, канати"], ["Вхід", "безкоштовний"]] },
  { id: "vip", name: "VIP-альтанки", p: [-12, 5, 65], cam: [-48, 22, 92], img: "foto/story-05.jpg", txt: "4 альтанки зі шторами з льону, м'які дивани, гірлянди. Поруч кальянна.", specs: [["Кількість", "4 альтанки"], ["Де", "західний край пляжу біля входу, на піску біля води"], ["Розмір", "орієнтовно 3×3 м, висота 2,7 м"], ["Каркас", "брус під горіх, верх — бежеве полотно"], ["Штори", "льон з трьох боків, на вечір закриваються"], ["Всередині", "м'які лави-дивани, низький столик, гірлянда"], ["Місткість", "орієнтовно 4–6 людей"], ["Поруч", "кальянна — кальян приносять в альтанку"]] },
  { id: "volley", name: "Волейбол і діти", p: [11, 4, 45], cam: [40, 20, 72], img: "foto/story-06.jpg", txt: "Майданчик на існуючих стовпах, лавки для глядачів, дитячий куточок під тентом.", specs: [["Майданчик", "16×8 м, пісок"], ["Сітка", "2,43 м, на існуючих жовтих стовпах"], ["Глядачі", "дерев'яні лавки по краю"], ["Дитяча зона", "куточок під тентом у тіні дерев"]] },
  { id: "bar", name: "Бар", p: [10.5, 6, 11], cam: [42, 18, 30], img: "foto/story-07.jpg", txt: "Бар з навісом, кухня і гриль, поруч кіоск кальянної (є «кальян на винос»), тераса з простими дерев\u0027яними столами.", specs: [["Павільйон", "орієнтовно 9×4 м, висота 3,3 м"], ["Матеріали", "брус під горіх, графітовий профнастил, стійка з темної дошки"], ["Стійка", "висота 1,1 м, барні стільці"], ["Їжа", "кухня, гриль, снеки, місце для фудтраків"], ["Напої", "бар з алкоголем"], ["Кальянна", "окремий кіоск 2,5×2 м «HOOKAH» поруч: кальяни розносять по всій території"], ["Тиша", "після 22:00"]] },
  { id: "cabins", name: "Будиночки з чанами", p: [11, 7, -27], cam: [50, 22, -10], img: "foto/story-09.jpg", txt: "Два будиночки на палях у ліску, на терасі в кожного свій чан.", specs: [["Кількість", "2 будиночки в ліску"], ["Розмір", "8×5 м, висота 4,5 м"], ["Основа", "на палях 0,8 м"], ["Фасад", "світле дерево, графітові акценти, панорамні вікна, двері 2,1 м"], ["Тераса", "зі сходами, вихід до тихої води"], ["Чан", "дерев'яний, Ø 2 м, на дровах"], ["Сезон", "ночівля цілий рік"]] },
  { id: "beach", name: "Пляж", p: [-11, 4, -5], cam: [-55, 26, 20], img: "foto/story-03.jpg", txt: "Білі пластикові лежаки, парасолі, 10 беседок 6×4 м під профнастилом, настили до води.", specs: [["Беседки", "10 шт. уздовж пляжу"], ["Розмір беседки", "6×4 м, висота 3,5 м"], ["Каркас", "брус 15×15 см під горіх, діагональні розкоси"], ["Борти", "0,9 м з горизонтальної дошки, поручень з трьох боків, фронт відкритий"], ["Дах", "двосхилий, матовий графітовий профнастил"], ["Всередині", "довгий стіл і лави на 8–10 людей, гірлянда"], ["Лежаки", "білі пластикові, платні; бежеві парасолі"], ["Пісок", "природний"]] },
  { id: "sup", name: "Сапи і пірс", p: [-21, 3, -62], cam: [-60, 20, -40], img: "foto/story-10.jpg", txt: "Прокат сапів і каяків, дерев'яний пірс.", specs: [["Пірс", "дерев'яний понтон на палях"], ["Прокат", "сапи, каяки, човни/катамарани"], ["Купання", "так, очерет частково вичищено"]] },
  { id: "mys", name: "Мис", p: [4, 7, -108], cam: [-40, 34, -150], img: "foto/story-11.jpg", txt: "Гойдалка над водою, лежаки, понтон із катамаранами.", specs: [["Де", "північний мис біля «Парк Основа»"], ["Фотозони", "2: гойдалка над водою і рамка на заході сонця"], ["Відпочинок", "білі пластикові лежаки, гірлянди, ліхтарі на піску"], ["Найкраще", "захід сонця над великою водою"]] },
];
const card = host.querySelector(".m3d-card");
function showCard(z) {
  if (!z || !z.img) { card.hidden = true; return; }
  card.querySelector("img").src = z.img; card.querySelector("b").textContent = z.name; card.querySelector("p").textContent = z.txt; const dl = card.querySelector("dl"); dl.innerHTML = ""; (z.specs || []).forEach(([a, b]) => { const dt = document.createElement("dt"); dt.textContent = a; const dd = document.createElement("dd"); dd.textContent = b; dl.append(dt, dd); }); card.scrollTop = 0; card.hidden = false;
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
  { p: [-1, -56], look: [-20, -60] }, { p: [1, -76], look: [-8, -86] }, { p: [2, -92], look: [-10, -98] }, { p: [5, -108], look: [6, -116] },
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
const inside = (x, z) => { // stay on land: point in the spit outline, 2 m from the edge
  let c = false; for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) { const [xi, zi] = outline[i], [xj, zj] = outline[j]; if ((zi > z) !== (zj > z) && x < (xj - xi) * (z - zi) / (zj - zi) + xi) c = !c; }
  if (!c) return false; return outline.every(([px, pz]) => Math.hypot(px - x, pz - z) > 1.5);
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


// ---------- cinematic intro: camera flies along the spit, the beach "grows" south → north, night turns into morning ----------
const buildables = scene.children.filter(o => o !== water && !o.isLight && !o.isPoints && !(o.geometry && (o.geometry.type === "ExtrudeGeometry" || (o.geometry.type === "SphereGeometry" && o.geometry.parameters.radius > 500))) && Math.abs(o.position.x) < 45 && o.position.z > -135 && o.position.z < 125);
buildables.forEach(o => o.userData.s0 = o.scale.clone());
const camPath = new THREE.CatmullRomCurve3([[-30, 170, 330], [-75, 60, 170], [-58, 28, 60], [-52, 24, -20], [-40, 34, -95], [-110, 90, 40], [-150, 120, 150]].map(p => new THREE.Vector3(...p)));
const tgtPath = new THREE.CatmullRomCurve3([[0, 0, 60], [0, 2, 90], [0, 2, 30], [0, 2, -30], [4, 2, -100], [0, 0, -10], [0, 0, 0]].map(p => new THREE.Vector3(...p)));
let cine = null;
const easeIO = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
const backOut = k => { const c = 1.6; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); };
function cineFrame(t) {
  const u = Math.min(1, (t - cine.t0) / cine.dur), e = easeIO(u);
  camera.position.copy(camPath.getPoint(e)); const tg = tgtPath.getPoint(e); controls.target.copy(tg); camera.lookAt(tg);
  const front = 125 - 290 * Math.min(1, u / 0.72);
  buildables.forEach(o => { const k = Math.max(0, Math.min(1, (o.position.z - front) / 22)); const s = k <= 0 ? 0.0001 : backOut(k); o.scale.set(o.userData.s0.x * s, o.userData.s0.y * s, o.userData.s0.z * s); o.visible = k > 0; });
  night = nightTarget = Math.max(0, 0.9 - u * 1.6);
  dispatchEvent(new CustomEvent("beachcine:progress", { detail: u }));
  if (u >= 1) endCine();
}
function endCine() {
  if (!cine) return; cine = null; buildables.forEach(o => { o.scale.copy(o.userData.s0); o.visible = true; });
  night = nightTarget = 0; nightBtn.textContent = "☾ Ніч"; camera.position.set(-150, 120, 150); controls.target.set(0, 0, 0); controls.autoRotate = true;
  dispatchEvent(new Event("beachcine:end"));
}
addEventListener("beachcine", e => { setMode("orbit"); card.hidden = true; flight = null; controls.autoRotate = false; cine = { t0: clock.getElapsedTime(), dur: (e.detail && e.detail.dur) || 11 }; buildables.forEach(o => { o.scale.setScalar(0.0001); o.visible = false; }); });
addEventListener("beachcine:skip", endCine);

// ---------- loop ----------
function resize() { const r = host.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / r.height; camera.updateProjectionMatrix(); }
new ResizeObserver(resize).observe(host); resize();
let visible = true;
new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.01 }).observe(host);
const clock = new THREE.Clock(); const v = new THREE.Vector3(); let last = 0;
renderer.setAnimationLoop(() => {
  if (!visible) return;
  const t = clock.getElapsedTime(), dt = Math.min(t - last, 0.05); last = t;
  if (cine) cineFrame(t);
  else if (mode === "walk") stepWalk(dt);
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
  light: { wood: 0x9a6236, deck: 0xc9a77c, roof: 0x5a5e64, char: 0x1d1d1f, linen: 0xe6d9bf, panel: 0x8e5a33 },
  dark: { wood: 0x5a3e2b, deck: 0x3b2a1f, roof: 0x2a2a30, char: 0x1c1c1e, linen: 0xd9d4cc, panel: 0x26221f },
  red: { wood: 0x8a4f2a, deck: 0xa9784a, roof: 0x8e2a22, char: 0x5b4a3a, linen: 0xefe6d6, panel: 0x2b2b2b },
  log: { wood: 0xe4c79a, deck: 0xc99e64, roof: 0x6b4e2e, char: 0xa9784a, linen: 0xf3ead9, panel: 0xd6b07c },
  white: { wood: 0xf4f4f2, deck: 0xe8e2d6, roof: 0xdfe5e8, char: 0x2f6f86, linen: 0xffffff, panel: 0xffffff },
  boho: { wood: 0xd9b98e, deck: 0xb5855a, roof: 0xc9a46a, char: 0x7a5a3a, linen: 0xf2e6d0, panel: 0xc8a273 },
};
addEventListener("beachstyle", e => { const p = STYLE_MAT[e.detail.style]; if (!p) return; for (const k in p) M[k].color.setHex(p[k]); });
host.classList.add("ready"); dispatchEvent(new Event("beach3dready"));
