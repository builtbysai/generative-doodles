// presets.js - Stage 8: JSON preset save/load for the freestyle
// basketball piece. The settings object IS the preset format; this
// module only wraps it in a versioned envelope and validates on load.
// Validation never throws: unknown keys are ignored, out-of-range
// numbers are clamped, invalid enum/boolean values fall back to the
// default. Only unparseable JSON or a missing settings object fails.

export const DEFAULT_SETTINGS = {
  strokeSize: 1.0,
  density: 1.0,
  disorder: 0.78,
  tempo: 144,
  kit: 'teal',
  ball: 'orange',
  palette: 'golden',
  cameraMode: 'director',
  lighting: 'auto',
  move: 'full',
  routine: 'full',
  format: '16:9',
  sound: false,
};

// Numeric keys: [min, max].
const NUMERIC = {
  strokeSize: [0.5, 2.0],
  density: [0.15, 1.5],
  disorder: [0, 1],
  tempo: [60, 180],
};

// Enum keys: allowed values.
const ENUMS = {
  kit: ['teal', 'crimson', 'royal', 'black'],
  ball: ['orange', 'black', 'pink', 'blue'],
  palette: ['golden', 'noir', 'candy'],
  cameraMode: ['director', 'tracking', 'fixed'],
  lighting: ['auto', 'golden', 'noon', 'dusk', 'night'],
  move: ['full', 'Control dribble', 'Crossover', 'Between the legs',
    'Behind the back', 'Spin move', 'Around the world',
    'Retrieval dribble', 'Finger spin'],
  routine: ['full', 'handles', 'spin', 'finger'],
  format: ['16:9', '9:16', '1:1', '4:5'],
};

const BOOLEAN = ['sound'];

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

// Validate one settings object. Returns { valid, applied } where
// `valid` holds only known keys with in-range values and `applied`
// lists the known keys the input carried.
function validate(input) {
  const valid = {};
  const applied = [];
  for (const key of Object.keys(input)) {
    if (key in NUMERIC) {
      const [lo, hi] = NUMERIC[key];
      const v = input[key];
      valid[key] = typeof v === 'number' && Number.isFinite(v)
        ? clamp(v, lo, hi)
        : DEFAULT_SETTINGS[key];
      applied.push(key);
    } else if (key in ENUMS) {
      valid[key] = ENUMS[key].includes(input[key])
        ? input[key]
        : DEFAULT_SETTINGS[key];
      applied.push(key);
    } else if (BOOLEAN.includes(key)) {
      valid[key] = typeof input[key] === 'boolean'
        ? input[key]
        : DEFAULT_SETTINGS[key];
      applied.push(key);
    }
    // Unknown keys are ignored.
  }
  return { valid, applied };
}

// Save: takes the settings ENGINE (anything with .get()) or a plain
// settings object. Returns the preset as a JSON string.
export function savePreset(settings) {
  const snap = typeof settings.get === 'function' ? settings.get() : settings;
  return JSON.stringify({
    version: 1,
    app: 'freestyle-basketball',
    settings: snap,
  });
}

// Load: parses `json` (a string, or an already-parsed object),
// validates, then applies through the settings ENGINE (needs
// .set(patch) + .apply()). Returns { ok: true, applied: [keys] } or
// { ok: false, error }. Never throws on bad input.
export function loadPreset(json, settings) {
  let parsed;
  try {
    parsed = typeof json === 'string' ? JSON.parse(json) : json;
  } catch (e) {
    return { ok: false, error: 'not valid JSON' };
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)
    || !parsed.settings || typeof parsed.settings !== 'object'
    || Array.isArray(parsed.settings)) {
    return { ok: false, error: 'missing settings object' };
  }
  const { valid, applied } = validate(parsed.settings);
  settings.set(valid);
  settings.apply();
  return { ok: true, applied };
}
