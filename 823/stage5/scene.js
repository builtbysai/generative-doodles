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
const PAPER = new THREE.Color(0xf3e4ce); // blank canvas
// Bring landmarks closer to the performer without enclosing the farthest shot.
const CYL_RADIUS = 17;
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
  'washington-square': { sun: 0xffd6a0, sunI: 2.35, hemiSky: 0xb6d1d2, hemiGround: 0x986b62, hemiI: 0.90 },
  'dumbo': { sun: 0xffd5b8, sunI: 2.1, hemiSky: 0xadb8db, hemiGround: 0x626c82, hemiI: 0.84 },
  'soho': { sun: 0xffac8f, sunI: 1.90, hemiSky: 0x8875ab, hemiGround: 0x53476a, hemiI: 0.84 },
  'coney-island': { sun: 0x87cbd6, sunI: 1.75, hemiSky: 0x536b9f, hemiGround: 0x50446e, hemiI: 0.82 },
};

// Sky-top colour per street (the top of each painting's sky gradient
// in paint-streets.js). The scene background: the low Stage 7 camera
// angles look UP past the 12 m cylinder's top edge, and without this
// the frame's top shows the black void. A flat sky-top colour blends
// with the painting's sky at its top edge. Lerped during the fade.
const STREET_SKY = {
  'washington-square': 0x183b60,
  'dumbo': 0x434f83,
  'soho': 0x302e63,
  'coney-island': 0x121f40,
};

// Ground colours per street (top-down texture).
const GROUND = {
  'washington-square': { base:'#bc806e', field:'#cb9478', edge:'#986677', seam:'#6b5a6a', line:'#fff0d0', accent:'#f6ac6e' },
  dumbo: { base:'#677888', field:'#7c8796', edge:'#4d6a7d', seam:'#44556a', line:'#fbe5c9', accent:'#dc9c90' },
  soho: { base:'#554c6d', field:'#695672', edge:'#785569', seam:'#342e51', line:'#ffe0bd', accent:'#ea997d' },
  'coney-island': { base:'#46445d', field:'#54516e', edge:'#704f6c', seam:'#2e365a', line:'#ffdfbb', accent:'#ff8c83' }
};

// Court paint is a real top-down surface, not a decal hanging behind the
// player. At 34 m diameter the playable markings occupy only the central
// few meters; broad graphic shapes live outside the contact area.
export function paintGround(name, size=1024) {
  const p=GROUND[name];
  if(!p)throw new Error('Unknown ground: '+name);
  const c=document.createElement('canvas');c.width=c.height=size;
  const g=c.getContext('2d'), S=size, C=S/2;
  let seed=3781+name.length*193;
  const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
  const rectangle=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(x,y,w,h);};
  const polygon=(points,col)=>{
    g.fillStyle=col;g.beginPath();g.moveTo(points[0][0],points[0][1]);
    for(let i=1;i<points.length;i++)g.lineTo(points[i][0],points[i][1]);
    g.closePath();g.fill();
  };
  const stroke=(x1,y1,x2,y2,col,w,alpha=1)=>{
    g.strokeStyle=col;g.lineWidth=w;g.globalAlpha=alpha;
    g.lineCap='round';g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();g.globalAlpha=1;
  };
  rectangle(0,0,S,S,p.base);
  // Large asymmetrical print blocks: pigment, not colored glass or noise.
  polygon([[0,S*.17],[S*.23,0],[S*.37,0],[0,S*.45]],p.edge);
  polygon([[S*.74,0],[S,0],[S,S*.42],[S*.91,S*.36]],p.field);
  polygon([[0,S*.8],[S*.22,S],[0,S]],p.field);
  polygon([[S*.82,S],[S,S*.68],[S,S]],p.edge);
  // Rectilinear masonry grids, faint and broken, remain outside the court.
  for(let i=0;i<16;i++){
    const y=i*S/15;stroke(0,y,S,y,p.seam,1.8,.11);
    if(i%3===0)stroke(0,y+5,S*.32,y+5,p.line,1.5,.08);
  }
  for(let i=0;i<16;i++){
    const x=i*S/15;stroke(x,0,x,S,p.seam,1.7,.07);
  }
  // A second, softly offset court-color field frames the figure.
  g.beginPath();g.arc(C,C,S*.145,0,Math.PI*2);g.fillStyle=p.field;g.fill();
  g.beginPath();g.arc(C,C,S*.125,0,Math.PI*2);g.strokeStyle=p.edge;g.globalAlpha=.38;g.lineWidth=12;g.stroke();g.globalAlpha=1;
  // Sporadic long directional scuffs; center remains legible.
  for(let i=0;i<480;i++){
    const x=rnd()*S,y=rnd()*S;
    const d=Math.hypot(x-C,y-C);
    if(d<S*.11)continue;
    const a=rnd()*Math.PI*2,len=5+rnd()*43;
    stroke(x,y,x+Math.cos(a)*len,y+Math.sin(a)*len,
      rnd()>.48?p.line:p.seam,1+rnd()*4,.055+rnd()*.18);
  }
  // Pigment chips under the rim of the mural, at believable ground scale.
  for(let i=0;i<90;i++){
    const a=rnd()*Math.PI*2,d=S*(.17+rnd()*.27);
    const x=C+Math.cos(a)*d,y=C+Math.sin(a)*d;
    stroke(x,y,x+(rnd()-.5)*22,y+(rnd()-.5)*15,p.accent,2+rnd()*6,.16+rnd()*.20);
  }
  // The near player's key and center-circle marks use correct world size.
  g.strokeStyle=p.line;g.lineWidth=3.2;g.globalAlpha=.94;
  g.beginPath();g.arc(C,C,S*.053,0,Math.PI*2);g.stroke();
  g.strokeRect(S*.428,S*.50,S*.144,S*.171);
  g.beginPath();g.arc(C,S*.50,S*.074,0,Math.PI);g.stroke();
  g.globalAlpha=1;
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
      uArcLength: { value: 1 }, // retained for diagnostics
      uOpacity: { value: 1 },
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
      uniform float uOpacity;
      varying vec2 vUv;
      void main() {
        // The painting spans the full horizon. No paper wipe: free camera
        // rotation must not reveal unpainted wedges in the city.
        // From inside the cylinder, screen-right has decreasing cylinder U.
        // Flip the image horizontally so signs and landmarks read normally.
        vec3 paint = texture2D(uMap, vec2(1.0 - vUv.x, 0.45 + vUv.y * 0.55)).rgb;
        gl_FragColor = vec4(paint, uOpacity);
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
  // The full panorama stays visible at every camera angle. Keep the
  // old wipe measurements for compatibility; no paper gaps during orbit.
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
    // Backdrop is part of the WORLD, not the camera rig. Its landmark
    // anchors to the far side of the court and stays fixed on free orbit.
    const cur = baked[streetIndex];
    const curU = LANDMARK_U[cur.name];
    lastLandmarkU = curU;
    // The camera at +Z looks through the performer to the FAR wall -Z.
    // CylinderGeometry's u=.5 is this far wall. Aim the landmark at
    // azimuth + PI, rather than at the camera's own position.
    // After mirroring the sample U, center the street's painted landmark.
    lastRotY = (curU - 0.5) * Math.PI * 2;
    layers[0].mesh.rotation.y = lastRotY;
    layers[0].mat.uniforms.uMap.value = cur.tex;
    layers[0].mat.uniforms.uArcStart.value = curU - 40 / 360;
    layers[0].mat.uniforms.uArcLength.value = 1;
    layers[0].mat.uniforms.uOpacity.value = 1;
    layers[0].mesh.visible = true;
    layers[0].mat.opacity = 1;
    grounds[0].mat.map = cur.groundTex;
    grounds[0].mat.opacity = 1;
    if (fadeFrom >= 0) {
      const prev = baked[fadeFrom];
      const prevU = LANDMARK_U[prev.name];
      layers[1].mesh.rotation.y = (prevU - 0.5) * Math.PI * 2;
      layers[1].mat.uniforms.uMap.value = prev.tex;
      layers[1].mat.uniforms.uArcStart.value = prevU - 40 / 360;
      layers[1].mat.uniforms.uArcLength.value = 1; // fully revealed
      layers[1].mesh.visible = true;
      layers[1].mat.uniforms.uOpacity.value = 1 - fadeT;
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
