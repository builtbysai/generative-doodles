// Free camera for Streetball. The routine and the background run independently.
// One finger / left mouse = orbit. Two fingers / shift or right drag = pan.
// Pinch / wheel = dolly. Double click / R = reset. No external dependencies.
import * as THREE from 'three';

const TAU = Math.PI * 2;
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

export function createOrbitCamera({ camera, element, onChange = () => {} }) {
  const defaults = { azimuth: 0, elevation: 0.20, radius: 5.9,
    target: new THREE.Vector3(0, 0.94, 0) };
  const state = { azimuth: defaults.azimuth, elevation: defaults.elevation,
    radius: defaults.radius, target: defaults.target.clone() };
  const pointers = new Map();
  let dragging = false;

  // Constrain the viewer inside the 17m panorama and above the court.
  function place() {
    const a = state.azimuth, e = state.elevation, r = state.radius;
    const ce = Math.cos(e);
    camera.position.set(
      state.target.x + Math.sin(a) * ce * r,
      state.target.y + Math.sin(e) * r,
      state.target.z + Math.cos(a) * ce * r,
    );
    camera.lookAt(state.target);
    if (camera.fov !== 40) {
      camera.fov = 40;
      camera.updateProjectionMatrix();
    }
    return state;
  }
  function changed() { place(); onChange(); }
  function orbit(dx, dy) {
    const speed = 0.006;
    state.azimuth = ((state.azimuth - dx * speed) % TAU + TAU) % TAU;
    state.elevation = clamp(state.elevation + dy * speed, 0.035, 1.32);
    changed();
  }
  function dolly(factor) {
    state.radius = clamp(state.radius * factor, 2.0, 12.0);
    changed();
  }
  function pan(dx, dy) {
    // Map CSS pixels into camera-space world units at the focus depth.
    const scale = 2 * state.radius * Math.tan(THREE.MathUtils.degToRad(40) / 2) /
      Math.max(100, element.clientHeight);
    const a = state.azimuth, e = state.elevation;
    const ca = Math.cos(a), sa = Math.sin(a), ce = Math.cos(e), se = Math.sin(e);
    state.target.x += (-dx * ca - dy * se * sa) * scale;
    state.target.y += dy * ce * scale;
    state.target.z += ( dx * sa - dy * se * ca) * scale;
    state.target.x = clamp(state.target.x, -2.4, 2.4);
    state.target.y = clamp(state.target.y, 0.40, 2.40);
    state.target.z = clamp(state.target.z, -2.4, 2.4);
    changed();
  }
  function reset() {
    state.azimuth = defaults.azimuth;
    state.elevation = defaults.elevation;
    state.radius = defaults.radius;
    state.target.copy(defaults.target);
    changed();
  }
  function averageAndDistance() {
    const vals = Array.from(pointers.values());
    if (vals.length !== 2) return null;
    return {
      x: (vals[0].x + vals[1].x) / 2,
      y: (vals[0].y + vals[1].y) / 2,
      dist: Math.max(1, Math.hypot(vals[1].x - vals[0].x, vals[1].y - vals[0].y))
    };
  }
  function pointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== 0 && event.button !== 1 && event.button !== 2) return;
    event.preventDefault();
    // Focus for keyboard controls without scrolling the page.
    element.focus({ preventScroll: true });
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY,
      pan: event.shiftKey || event.button === 1 || event.button === 2 });
    try { element.setPointerCapture(event.pointerId); } catch (_) { /* ignored */ }
    dragging = true;
    element.classList.add('camera-dragging');
  }
  function pointerMove(event) {
    const previous = pointers.get(event.pointerId);
    if (!previous) return;
    event.preventDefault();
    const before = averageAndDistance();
    const dx = event.clientX - previous.x;
    const dy = event.clientY - previous.y;
    pointers.set(event.pointerId, { ...previous, x: event.clientX, y: event.clientY });
    const after = averageAndDistance();
    if (before && after) {
      if (Math.abs(before.dist - after.dist) > 0.01) dolly(before.dist / after.dist);
      if (before.x !== after.x || before.y !== after.y) pan(after.x - before.x, after.y - before.y);
    } else if (previous.pan || event.shiftKey) {
      pan(dx, dy);
    } else {
      orbit(dx, dy);
    }
  }
  function pointerEnd(event) {
    pointers.delete(event.pointerId);
    if (pointers.size === 0) {
      dragging = false;
      element.classList.remove('camera-dragging');
    }
  }
  function wheel(event) {
    event.preventDefault();
    dolly(Math.exp(clamp(event.deltaY, -350, 350) * 0.00125));
  }
  function keyDown(event) {
    const active = document.activeElement;
    if (active !== element) return;
    let handled = true;
    switch (event.key) {
      case 'ArrowLeft': orbit(-28, 0); break;
      case 'ArrowRight': orbit(28, 0); break;
      case 'ArrowUp': orbit(0, -22); break;
      case 'ArrowDown': orbit(0, 22); break;
      case '+': case '=': dolly(0.88); break;
      case '-': case '_': dolly(1.14); break;
      case 'r': case 'R': case 'Home': reset(); break;
      default: handled = false;
    }
    if (handled) event.preventDefault();
  }

  element.style.touchAction = 'none';
  element.style.cursor = 'grab';
  element.tabIndex = 0;
  element.setAttribute('role', 'img');
  element.setAttribute('aria-label', 'Animated basketball scene. Drag to rotate, scroll or pinch to zoom, shift-drag to pan. Press R to reset.');
  element.addEventListener('pointerdown', pointerDown);
  element.addEventListener('pointermove', pointerMove);
  element.addEventListener('pointerup', pointerEnd);
  element.addEventListener('pointercancel', pointerEnd);
  element.addEventListener('lostpointercapture', pointerEnd);
  element.addEventListener('wheel', wheel, { passive: false });
  element.addEventListener('contextmenu', event => event.preventDefault());
  element.addEventListener('dblclick', reset);
  element.addEventListener('keydown', keyDown);
  place();

  return {
    update: place, reset, orbit, pan, dolly,
    get state() { return { azimuth: state.azimuth, elevation: state.elevation,
      radius: state.radius, target: state.target.clone(), dragging }; },
    dispose() {
      element.removeEventListener('pointerdown', pointerDown);
      element.removeEventListener('pointermove', pointerMove);
      element.removeEventListener('pointerup', pointerEnd);
      element.removeEventListener('pointercancel', pointerEnd);
      element.removeEventListener('lostpointercapture', pointerEnd);
      element.removeEventListener('wheel', wheel);
      element.removeEventListener('dblclick', reset);
      element.removeEventListener('keydown', keyDown);
      pointers.clear();
    }
  };
}
