// scene.js — Stage 5: the 2.5D stage.
//
// Architecture: the painting is flat, the character is 3D. The street
// painting's SKY + LANDMARKS half (top 55%) wraps a backdrop cylinder;
// the GROUND is a separate top-down texture on a circular plane (the
// painting's ground half is a perspective view and cannot map onto a
// flat plane — its court lines live on the 3D ground, where the
// character plays and the halftone shadow falls).
//
// The painting REVEALS ahead of the camera: a wipe arc grows with the
// beat clock, leading the camera's view direction by 36 degrees (10%
// of a full orbit). Fragments behind the wipe edge show blank paper.
// Street changes every 16 beats with a 1-beat crossfade; the wipe
// resets each street, so the wrap is seamless.
//
// Backgrounds are baked once per street at init — no per-frame canvas
// calls. paintStreet call count is exposed for the bake test.

import * as THREE from '../stage1/vendor/three.module.js';
import { paintStreet, STREETS } from './paint-streets.js';

export const BEATS_PER_STREET = 16;
export const WIPE_LEAD_DEG = 45; // lead over the view direction
const PAPER = new THREE.Color(0xefe8d8); // blank canvas
const CYL_RADIUS = 30;
const CYL_HEIGHT = 12;

// Where each street's landmark sits in the panorama (u coordinate):
// the Arch and the Wheel are centred (0.5), DUMBO's bridge tower is
// at 0.32 (its block spans x 540-780 of 2048). The cylinder rotates so
// the landmark — not the panorama's centre — faces the camera.
const LANDMARK_U = {
  'washington-square': 0.5,
  'dumbo': 0.32,
  'soho': 0.5,
  'coney-island': 0.5,
};

// Per-street light: the character's toon lighting shifts with the time
// of day. Lerped during the street fade.
const STREET_LIGHTS = {
  'washington-square': { sun: 0xffb347, sunI: 2.2, hemiSky: 0xffd9a0, hemiGround: 0x8a6a4a, hemiI: 0.9 },
  'dumbo': { sun: 0xfff4e0, sunI: 2.0, hemiSky: 0xbcd8e8, hemiGround: 0x777777, hemiI: 0.8 },
  'soho': { sun: 0xff8a5c, sunI: 1.6, hemiSky: 0x7a5a8a, hemiGround: 0x4a3a4a, hemiI: 0.7 },
  'coney-island': { sun: 0x7a9cc8, sunI: 1.2, hemiSky: 0x2a3a5a, hemiGround: 0x1a1a2a, hemiI: 0.5 },
};

// Sky-top colour per street (the top of each painting's sky gradient
// in paint-streets.js). The scene background: the low Stage 7 camera
// angles look UP past the 12 m cylinder's top edge, and without this
// the frame's top shows the black void. A flat sky-top colour blends
// with the painting's sky at its top edge. Lerped during the fade.
const STREET_SKY = {
  'washington-square': 0xf7b733,
  'dumbo': 0x7fb2d9,
  'soho': 0x6b4a7a,
  'coney-island': 0x0d1b3a,
};

// Ground colours per street (top-down texture).
const GROUND = {
  'washington-square': { base: '#b98a5e', seam: '#7a4a2e', line: '#f2ede2' },
  'dumbo': { base: '#6f6a63', seam: '#4a4642', line: '#e8e2d4' },
  'soho': { base: '#4a4442', seam: '#2a2624', line: '#d8d2c4' },
  'coney-island': { base: '#7a5a3a', seam: '#4a3420', line: '#f2e8d8' },
};

// Top-down ground texture: base wash, sparse radial seams, court lines
// (centre circle + key, centred on the character), sparse dashes.
// Dimensions are REAL: the disc is 60 m across, so 1024 px = 60 m
// (17 px/m). The centre circle is 1.8 m radius, the key 4.9 x 5.8 m —
// the first version drew them at 3x scale and the court dwarfed the
// character. Seams are thin, low-alpha, and start away from the centre
// (16 full-length seams read as a starburst under the character).
export function paintGround(name, size = 1024) {
  const g = GROUND[name];
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const x = c.getContext('2d');
  const S = size;
  x.fillStyle = g.base;
  x.fillRect(0, 0, S, S);
  // Radial seams from r = 0.15S outward: 8, thin, low-alpha.
  x.strokeStyle = g.seam;
  x.lineWidth = 1.5;
  x.globalAlpha = 0.3;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    x.beginPath();
    x.moveTo(S / 2 + Math.cos(a) * S * 0.15, S / 2 + Math.sin(a) * S * 0.15);
    x.lineTo(S / 2 + Math.cos(a) * S, S / 2 + Math.sin(a) * S);
    x.stroke();
  }
  x.globalAlpha = 1;
  // Sparse dashes.
  x.lineWidth = 3;
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 90; i++) {
    const px = rnd() * S, py = rnd() * S;
    if (Math.hypot(px - S / 2, py - S / 2) < S * 0.22) continue; // keep the court clean
    x.strokeStyle = rnd() > 0.5 ? g.seam : g.line;
    x.globalAlpha = 0.5;
    x.beginPath();
    x.moveTo(px, py);
    x.lineTo(px + (rnd() - 0.5) * 40, py + (rnd() - 0.5) * 8);
    x.stroke();
  }
  x.globalAlpha = 1;
  // Stage 13c: radial brush dabs + colour variation on the ground disc.
  // Strokes run radially (out from the centre, following the seams) or
  // tangentially, each a lightened/darkened variant of the base, so
  // the court reads as painted, not flat. The court stays clean.
  const baseRgb = [parseInt(g.base.slice(1, 3), 16), parseInt(g.base.slice(3, 5), 16), parseInt(g.base.slice(5, 7), 16)];
  x.lineCap = 'round';
  for (let i = 0; i < 300; i++) {
    const a = rnd() * Math.PI * 2;
    const rr = S * (0.24 + rnd() * 0.26);
    const px = S / 2 + Math.cos(a) * rr, py = S / 2 + Math.sin(a) * rr;
    const ang = rnd() < 0.6 ? a : a + Math.PI / 2;
    const f = 0.85 + rnd() * 0.3;
    x.strokeStyle = `rgb(${Math.min(255, baseRgb[0] * f) | 0},${Math.min(255, baseRgb[1] * f) | 0},${Math.min(255, baseRgb[2] * f) | 0})`;
    x.globalAlpha = 0.25 + rnd() * 0.25;
    x.lineWidth = 2 + rnd() * 4;
    const len = 12 + rnd() * 30;
    x.beginPath();
    x.moveTo(px - Math.cos(ang) * len / 2, py - Math.sin(ang) * len / 2);
    x.lineTo(px + Math.cos(ang) * len / 2, py + Math.sin(ang) * len / 2);
    x.stroke();
  }
  x.globalAlpha = 1;
  // Court: centre circle (1.8 m radius = S*0.03) + key (4.9 x 5.8 m),
  // centred on the character.
  x.strokeStyle = g.line;
  x.lineWidth = 3;
  x.beginPath();
  x.arc(S / 2, S / 2, S * 0.03, 0, Math.PI * 2);
  x.stroke();
  x.strokeRect(S * 0.46, S * 0.5, S * 0.08, S * 0.10);
  return c;
}

// Backdrop material: painting texture + wipe arc, both in UV space.
// The cylinder counter-rotates with the camera (see createSceneManager),
// so the painting's landmarks always sit behind the character and the
// wipe is measured in panorama turns, not world angles. (The first
// version wiped in world angles with a fixed cylinder: the camera
// orbited away from the landmarks and stared at the panorama's empty
// stretch for 40% of every street.)
function makeBackdropMaterial(tex) {
  return new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uMap: { value: tex },
      uPaper: { value: PAPER },
      uArcStart: { value: 0 },  // turns
      uArcLength: { value: 0 }, // turns
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform sampler2D uMap;
      uniform vec3 uPaper;
      uniform float uArcStart;
      uniform float uArcLength;
      varying vec2 vUv;
      void main() {
        vec3 paint = texture2D(uMap, vec2(vUv.x, 0.45 + vUv.y * 0.55)).rgb;
        // Vertical map, done HERE (not via texture repeat/offset — a
        // custom shader ignores the texture matrix, so repeat/offset
        // silently did nothing and the first version showed the
        // painting upside-down with the ground on the cylinder).
        // CylinderGeometry's torso pushes uvs.push(u, 1 - v) with
        // vertex.y = -v*height + halfHeight, so uv.y = 1 at the TOP
        // and 0 at the BOTTOM (verified in the vendored source — an
        // earlier version assumed the opposite and inverted the sky).
        // v' = 0.45 + uv.y*0.55 maps the cylinder top to the painting's
        // top (sky) and the cylinder bottom to the painting's horizon
        // (55% height) — the sky + landmarks half.
        // Wipe in panorama turns: revealed if inside the arc.
        float d = mod(vUv.x - uArcStart, 1.0);
        // 0.5-degree soft edge (0.0014 turns). When the arc is complete,
        // force fully revealed (else the modulo seam shows a paper sliver).
        float edge = uArcLength >= 0.999 ? 1.0
          : smoothstep(uArcLength + 0.0014, uArcLength - 0.0014, d);
        vec3 col = mix(uPaper, paint, edge);
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }`,
  });
}

export function createSceneManager({ scene, camera, sun, hemi }) {
  // Bake all four streets once. paintCalls counts paintStreet calls
  // (the bake test asserts it stays at 4 during playback).
  let paintCalls = 0;
  const baked = STREETS.map((name) => {
    paintCalls++;
    const canvas = paintStreet(name);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    // NOTE: no repeat/offset crop here — the backdrop shader is custom
    // and ignores the texture matrix. The sky+landmarks crop is applied
    // in the shader's v mapping (see makeBackdropMaterial).
    tex.anisotropy = 4;
    const groundTex = new THREE.CanvasTexture(paintGround(name));
    groundTex.colorSpace = THREE.SRGBColorSpace;
    groundTex.anisotropy = 4;
    return { name, tex, groundTex };
  });

  // Two backdrop cylinders for the crossfade (current + next).
  // Explicit render orders: the fading layer draws on top of the new one.
  const cylGeo = new THREE.CylinderGeometry(
    CYL_RADIUS, CYL_RADIUS, CYL_HEIGHT, 64, 1, true);
  const layers = [0, 1].map((i) => {
    const mat = makeBackdropMaterial(baked[0].tex);
    const mesh = new THREE.Mesh(cylGeo, mat);
    mesh.position.y = CYL_HEIGHT / 2;
    mesh.renderOrder = -1 + i;
    mesh.frustumCulled = false;
    scene.add(mesh);
    return { mesh, mat };
  });
  // Two ground discs for the crossfade.
  const groundGeo = new THREE.CircleGeometry(CYL_RADIUS, 64);
  const grounds = [0, 1].map((i) => {
    const mat = new THREE.MeshBasicMaterial({
      map: baked[0].groundTex, transparent: true, toneMapped: false,
    });
    const mesh = new THREE.Mesh(groundGeo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -0.01; // under the halftone shadow plane
    mesh.renderOrder = -3 + i;
    scene.add(mesh);
    return { mesh, mat };
  });

  let streetIndex = 0;      // current street
  let fadeFrom = -1;        // street fading out, or -1
  let fadeT = 1;            // 0..1 across the 1-beat fade
  // Wipe arc in panorama TURNS. The cylinder counter-rotates with the
  // camera, so the view always hits the panorama at the street's
  // landmark u (LANDMARK_U). The arc starts 40 degrees behind the view
  // so the whole visible window is revealed from the first frame.
  let arcLength = 0;        // wipe arc length (turns)
  let beatOffset = 0;       // beat at which the current street started
  let lastBeat = 0;
  let lastRotY = 0;         // current layer's rotation (for wipeEdgeWorld)
  let lastLandmarkU = 0.5;

  const tmpColor = new THREE.Color();
  const tmpColor2 = new THREE.Color();

  function setLights(name, otherName, t) {
    const a = STREET_LIGHTS[name];
    const b = otherName ? STREET_LIGHTS[otherName] : a;
    sun.color.copy(tmpColor.setHex(a.sun)).lerp(tmpColor2.setHex(b.sun), t);
    sun.intensity = a.sunI + (b.sunI - a.sunI) * t;
    hemi.color.copy(tmpColor.setHex(a.hemiSky)).lerp(tmpColor2.setHex(b.hemiSky), t);
    hemi.groundColor.copy(tmpColor.setHex(a.hemiGround)).lerp(tmpColor2.setHex(b.hemiGround), t);
    hemi.intensity = a.hemiI + (b.hemiI - a.hemiI) * t;
    // Scene background = the sky-top colour (see STREET_SKY).
    if (!scene.background) scene.background = new THREE.Color();
    scene.background.copy(tmpColor.setHex(STREET_SKY[name]))
      .lerp(tmpColor2.setHex(otherName ? STREET_SKY[otherName] : STREET_SKY[name]), t);
  }

  // Camera azimuth (radians): one full orbit per street, CONTINUOUS
  // across street changes (beat/16 turns — at beat 16 the azimuth is
  // 2*pi, identical to 0, so there is no jump). An earlier version
  // reset the azimuth per street via beatOffset, which would snap the
  // camera back at every street change.
  function cameraAzimuth(beat) {
    return (beat / BEATS_PER_STREET) * Math.PI * 2;
  }

  // `azimuth` (Stage 7): the ACTUAL camera azimuth, passed by the
  // director. When omitted, falls back to cameraAzimuth(beat) - the
  // continuous orbit the Stage 5/6 viewers use. The wipe arc is
  // beat-driven and azimuth-independent, so the reveal stays aligned
  // under a directed camera: the visible UV window is always centred
  // on the landmark, whatever the azimuth.
  function update(beat, azimuth) {
    // Direct computation from the absolute beat (jump-safe: a viewer
    // jumping to beat 40 lands on street 2, not street 1). An earlier
    // version advanced one street per call and broke on jumps.
    const streetNumber = Math.floor(beat / BEATS_PER_STREET);
    const newIndex = ((streetNumber % STREETS.length) + STREETS.length) % STREETS.length;
    const newOffset = streetNumber * BEATS_PER_STREET;
    const progress = (beat - newOffset) / BEATS_PER_STREET;
    // Fade over the first beat of each street (except the piece's start).
    const fading = streetNumber > 0 && progress < 1 / BEATS_PER_STREET;
    fadeFrom = fading ? (newIndex + STREETS.length - 1) % STREETS.length : -1;
    fadeT = fading ? progress * BEATS_PER_STREET : 1;
    streetIndex = newIndex;
    beatOffset = newOffset;
    lastBeat = beat;
    // Wipe: the arc grows one full turn per street, leading the view by
    // WIPE_LEAD_DEG. Tracked as a growing value, NOT modulo — modulo
    // would shrink the arc back when the wipe completes its turn.
    arcLength = Math.min(
      progress + (40 + WIPE_LEAD_DEG) / 360, 1);
    // Layers: layer 0 = current street, layer 1 = fading street. Each
    // layer counter-rotates with the camera so ITS landmark faces the
    // camera — the painting unrolls behind the character as the camera
    // orbits. (The first version rotated both layers identically and
    // DUMBO's off-centre tower sat 54 degrees off-screen.)
    const az = azimuth !== undefined ? azimuth : cameraAzimuth(beat);
    const cur = baked[streetIndex];
    const curU = LANDMARK_U[cur.name];
    lastLandmarkU = curU;
    lastRotY = az + (0.5 - curU) * Math.PI * 2;
    layers[0].mesh.rotation.y = lastRotY;
    layers[0].mat.uniforms.uMap.value = cur.tex;
    layers[0].mat.uniforms.uArcStart.value = curU - 40 / 360;
    layers[0].mat.uniforms.uArcLength.value = arcLength;
    layers[0].mesh.visible = true;
    layers[0].mat.opacity = 1;
    grounds[0].mat.map = cur.groundTex;
    grounds[0].mat.opacity = 1;
    if (fadeFrom >= 0) {
      const prev = baked[fadeFrom];
      const prevU = LANDMARK_U[prev.name];
      layers[1].mesh.rotation.y = az + (0.5 - prevU) * Math.PI * 2;
      layers[1].mat.uniforms.uMap.value = prev.tex;
      layers[1].mat.uniforms.uArcStart.value = prevU - 40 / 360;
      layers[1].mat.uniforms.uArcLength.value = 1; // fully revealed
      layers[1].mesh.visible = true;
      layers[1].mat.opacity = 1 - fadeT;
      grounds[1].mat.map = prev.groundTex;
      grounds[1].mat.opacity = 1 - fadeT;
      setLights(cur.name, prev.name, 1 - fadeT);
    } else {
      layers[1].mesh.visible = false;
      grounds[1].mesh.visible = false;
      setLights(cur.name, null, 0);
    }
    grounds[0].mesh.visible = true;
    grounds[1].mesh.visible = fadeFrom >= 0;
  }

  // The wipe edge's world position (for the reveal-lead measurement).
  // Local theta = (landmarkU - 40deg + arcLength) turns; world theta
  // adds the layer's counter-rotation. Position convention:
  // (sin(theta), ., cos(theta)) * R.
  function wipeEdgeWorld(out) {
    const local = (lastLandmarkU - 40 / 360 + arcLength) * Math.PI * 2;
    const world = local + lastRotY;
    out.set(Math.sin(world) * CYL_RADIUS, 2, Math.cos(world) * CYL_RADIUS);
    return out;
  }

  // The backdrop point directly behind the character from the camera.
  // Takes the actual azimuth when the director passes it (Stage 7);
  // falls back to the orbit otherwise.
  function viewBackdropWorld(beat, out, azimuth) {
    const viewAngle = (azimuth !== undefined ? azimuth : cameraAzimuth(beat)) + Math.PI;
    out.set(Math.sin(viewAngle) * CYL_RADIUS, 2, Math.cos(viewAngle) * CYL_RADIUS);
    return out;
  }

  // Wipe paper colour (Stage 8 palette). Both backdrop layers share
  // the module-level PAPER Color object as their uPaper uniform value,
  // so one set() recolours both.
  function setPaper(hex) {
    PAPER.set(hex);
  }

  return {
    update,
    setPaper,
    get paper() { return PAPER.getHex(); },
    get streetName() { return STREETS[streetIndex]; },
    get streets() { return STREETS; },
    get paintCalls() { return paintCalls; },
    get arcLength() { return arcLength; },
    get arcStart() { return lastLandmarkU - 40 / 360; },
    cameraAzimuth,
    wipeEdgeWorld,
    viewBackdropWorld,
  };
}
