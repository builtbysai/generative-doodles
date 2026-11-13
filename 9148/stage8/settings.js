// settings.js - Stage 8: the settings engine.
//
// Every control applies LIVE (no reload, the routine does not restart).
// The settings object IS the preset format (JSON-serializable); the
// presets agent saves/loads it, the panel agent edits it through set().
//
// Contract notes (read before changing a default):
// - KITS.teal.shorts is '#f5efe0' and BALLS.orange is '#e8722a': the
//   code's actual PALETTE.cream / ball base. The brief's #f2ede2 and
//   #e86a2a were from-memory values; the code values keep the defaults
//   byte-identical to Stages 1-7.
// - disorder maps to the rim-erosion uniform as uErode = 1.56 -
//   disorder (2 * 0.78 - disorder). The direct mapping (uErode =
//   disorder) is backwards: a LOWER threshold erodes MORE, so disorder
//   0 would erase the outline entirely and disorder 1 would clean it.
//   The mirrored mapping preserves the default (0.78 -> 0.78), points
//   the right way (more disorder = more erosion), and never degenerates
//   (uErode stays in [0.56, 1.56]; >1 disables erosion).
// - `move` is a one-shot trigger, not state: set({move: 'Finger spin'})
//   jumps the clock and the stored value stays 'full', so the same
//   move can be jumped to again and presets never carry a jump.
// - cameraMode and format are stored only; the viewer implements the
//   camera modes and the resize. lighting overrides are applied by
//   applyLighting(), which the viewer calls after the scene manager's
//   per-frame lighting (the scene manager would otherwise win).
import { makeBrushTexture } from '../stage4/look.js';
import { recolourKit } from '../stage1/player-model.js';
import { MOVE_MAP, ROUTINE_BEATS } from '../stage2/routine.js';

export const DEFAULT_SETTINGS = {
  strokeSize: 1.0, density: 1.0, disorder: 0.78, tempo: 144,
  kit: 'teal', ball: 'orange', palette: 'golden',
  cameraMode: 'director', lighting: 'auto',
  fisheye: true, fisheyeStrength: 0.6,
  move: 'full', routine: 'full', format: '16:9', sound: false,
};

const DEFAULT_DISORDER = 0.78; // == the Stage 4 uErode default

export const PRESETS = {
  KITS: {
    teal: { jersey: '#0f766e', shorts: '#f5efe0', headband: '#0f766e' },
    crimson: { jersey: '#991b1b', shorts: '#fef2f2', headband: '#991b1b' },
    royal: { jersey: '#1d4ed8', shorts: '#eff6ff', headband: '#1d4ed8' },
    black: { jersey: '#18181b', shorts: '#e4e4e7', headband: '#18181b' },
  },
  BALLS: {
    orange: '#e8722a', black: '#26262a', pink: '#f472b6', blue: '#3b82f6',
  },
  PALETTES: {
    golden: { paper: '#efe8d8', ink: '#1a1512' },
    noir: { paper: '#e8e8e8', ink: '#000000' },
    candy: { paper: '#ffe8f0', ink: '#3a1a2a' },
  },
  LIGHTING: {
    golden: { sun: '#ffb347', sunI: 2.2, hemiSky: '#ffd9a0', hemiGround: '#8a6a4a', hemiI: 0.9 },
    noon: { sun: '#fff4e0', sunI: 2.4, hemiSky: '#bcd8e8', hemiGround: '#777777', hemiI: 0.9 },
    dusk: { sun: '#ff8a5c', sunI: 1.6, hemiSky: '#7a5a8a', hemiGround: '#4a3a4a', hemiI: 0.7 },
    night: { sun: '#7a9cc8', sunI: 1.2, hemiSky: '#2a3a5a', hemiGround: '#1a1a2a', hemiI: 0.5 },
  },
  MOVES: Object.fromEntries(MOVE_MAP.map((m) => [m.name, m.start])),
  ROUTINES: {
    full: { start: 0, end: 24 },
    handles: { start: 0, end: 9 },
    spin: { start: 9, end: 18 },
    finger: { start: 18, end: 24 },
  },
  FORMATS: ['16:9', '9:16', '1:1', '4:5'],
};

// Map an absolute beat to the looped routine beat for a section.
// full = beat % 24; otherwise the beat wraps inside [start, end).
// Handles negative beats (mod, not remainder).
export function loopBeat(beat, routine = 'full') {
  const sec = PRESETS.ROUTINES[routine] || PRESETS.ROUTINES.full;
  const period = sec.end - sec.start;
  const m = ((beat - sec.start) % period + period) % period;
  return sec.start + m;
}

const CLAMPS = {
  strokeSize: [0.5, 2.0],
  density: [0.15, 1.5],
  disorder: [0, 1],
  tempo: [60, 180],
  fisheyeStrength: [0, 1],
};
const ENUMS = {
  kit: PRESETS.KITS,
  ball: PRESETS.BALLS,
  palette: PRESETS.PALETTES,
  cameraMode: { director: 1, tracking: 1, fixed: 1 },
  lighting: { auto: 1, ...PRESETS.LIGHTING },
  routine: PRESETS.ROUTINES,
  format: Object.fromEntries(PRESETS.FORMATS.map((f) => [f, 1])),
  move: { full: 1, ...PRESETS.MOVES },
};

export function createSettings(ctx) {
  const { player, heroMesh, heroHull, ballHull, halftone,
    clock, audio, sceneManager, sun, hemi } = ctx;
  // ctx also carries ballMesh, director, camera, renderer (accepted;
  // the viewer uses them for the camera modes / format resize, which
  // this module only stores).
  let current = { ...DEFAULT_SETTINGS };
  const listeners = new Set();

  function applyBrush() {
    const old = heroMesh.material.map;
    heroMesh.material.map = makeBrushTexture({
      size: current.strokeSize,
      density: current.density,
      disorder: current.disorder,
    });
    if (old) old.dispose();
    // Rim erosion follows disorder (mirrored mapping, see the header).
    const uErode = 2 * DEFAULT_DISORDER - current.disorder;
    heroHull.material.userData.uErode.value = uErode;
    ballHull.material.userData.uErode.value = uErode;
  }

  function applyPalette() {
    const p = PRESETS.PALETTES[current.palette];
    sceneManager.setPaper(p.paper);
    heroHull.material.color.set(p.ink);
    ballHull.material.color.set(p.ink);
    halftone.material.uniforms.uInk.value.set(p.ink);
  }

  function applyLighting() {
    if (current.lighting === 'auto') return;
    const L = PRESETS.LIGHTING[current.lighting];
    sun.color.set(L.sun);
    sun.intensity = L.sunI;
    hemi.color.set(L.hemiSky);
    hemi.groundColor.set(L.hemiGround);
    hemi.intensity = L.hemiI;
  }

  function applySound() {
    if (current.sound) {
      audio.setMuted(false);
      // Async by design: enable() creates/resumes the AudioContext.
      // set() must not block on it. Without a user gesture the context
      // starts suspended and resumes on the next gesture (the panel
      // toggle IS a gesture, so the normal path is immediate).
      void audio.enable();
    } else {
      audio.setMuted(true);
    }
  }

  function applyKeys(keys) {
    if (keys.some((k) => ['strokeSize', 'density', 'disorder'].includes(k))) {
      applyBrush();
    }
    for (const k of keys) {
      if (k === 'tempo') clock.setBpm(current.tempo);
      else if (k === 'kit') recolourKit(player, PRESETS.KITS[current.kit]);
      else if (k === 'ball') player.recolourBall(PRESETS.BALLS[current.ball]);
      else if (k === 'palette') applyPalette();
      else if (k === 'lighting') applyLighting();
      else if (k === 'move') {
        // One-shot trigger (see the header): jump, do not store.
        if (current.move !== 'full') clock.setBeat(PRESETS.MOVES[current.move]);
      } else if (k === 'routine') audio.setSection(PRESETS.ROUTINES[current.routine]);
      else if (k === 'sound') applySound();
      // cameraMode, format, fisheye, fisheyeStrength: stored only
      // (the viewer implements them; the lens reads them per frame).
    }
  }

  function validate(key, value) {
    if (key in CLAMPS) {
      const n = Number(value);
      if (!Number.isFinite(n)) return undefined;
      const [lo, hi] = CLAMPS[key];
      return Math.min(hi, Math.max(lo, n));
    }
    if (key in ENUMS) {
      if (!(value in ENUMS[key])) return undefined;
      return value;
    }
    if (key === 'sound' || key === 'fisheye') return !!value;
    return undefined;
  }

  function set(patch) {
    const changed = [];
    for (const [k, v] of Object.entries(patch)) {
      if (!(k in current)) continue; // unknown keys ignored
      const nv = validate(k, v);
      if (nv === undefined) continue; // invalid values ignored
      if (k === 'move') {
        // Trigger: jump even if the value repeats (the stored value
        // is always 'full', so every real move name is a fresh jump).
        if (nv === 'full') continue;
        current.move = nv;
        changed.push(k);
        continue;
      }
      if (nv === current[k]) continue; // no change, no work
      current[k] = nv;
      changed.push(k);
    }
    if (changed.length) {
      applyKeys(changed);
      // Consume the move trigger: the stored value returns to 'full'.
      if (changed.includes('move')) current.move = 'full';
      const snapshot = { ...current };
      for (const fn of listeners) fn(snapshot, [...changed]);
    }
    return changed;
  }

  // Re-apply every stored key (after a preset load, or to refresh the
  // stack). The move key is always 'full' here, so no jump fires.
  function apply() {
    applyKeys(Object.keys(current));
  }

  function onChange(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  return {
    get: () => ({ ...current }),
    set,
    apply,
    applyLighting,
    onChange,
    PRESETS,
    loopBeat,
  };
}
