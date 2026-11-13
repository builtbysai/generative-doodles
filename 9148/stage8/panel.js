// panel.js - Stage 8: the settings panel.
//
// A custom panel (no lil-gui): sliders, swatches, selects and one
// toggle, wired to the settings engine through the shared contract:
// settings.get() / settings.set(patch) / settings.onChange(fn) /
// settings.PRESETS. Every control calls settings.set() on input;
// nothing here is decorative. The panel does NOT implement export
// or preset IO: the footer buttons call the hooks passed in, and
// are disabled (muted, not hidden) when a hook is absent.
//
// Signature: buildPanel(settings, container, hooks = {})
//   hooks: { onExport(), onSavePreset(), onLoadPreset(file) }
// Returns: { element, refresh() }.

const FALLBACK = {
  KITS: {
    teal: ['#0f766e', '#f2ede2'],
    crimson: ['#a31621', '#f2ede2'],
    royal: ['#1d4ed8', '#f2ede2'],
    black: ['#1a1a1a', '#d8d2c4'],
  },
  BALLS: { orange: '#e85d04', black: '#222222', pink: '#f4a6c1', blue: '#3a86ff' },
  PALETTES: {
    golden: ['#efe8d8', '#2a2118'],
    noir: ['#e8e6e1', '#111111'],
    candy: ['#ffe9f2', '#40203a'],
  },
  CAMERA_MODES: ['director', 'tracking', 'fixed'],
  LIGHTING: ['auto', 'golden', 'noon', 'dusk', 'night'],
  MOVES: ['full', 'Control dribble', 'Crossover', 'Between the legs', 'Behind the back',
    'Spin move', 'Around the world', 'Retrieval dribble', 'Finger spin'],
  ROUTINES: ['full', 'handles', 'spin', 'finger'],
  FORMATS: ['16:9', '9:16', '1:1', '4:5'],
};

const CSS = `
.fbp { position: fixed; top: 12px; right: 12px; z-index: 50; width: 300px;
  max-width: calc(100vw - 24px); max-height: calc(100vh - 24px); overflow-y: auto;
  background: rgba(18,18,22,0.88); color: #f2ede2; border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  font: 13px/1.4 system-ui, sans-serif; }
.fbp.fbp-collapsed { width: auto; }
.fbp-head { display: flex; justify-content: space-between; align-items: center;
  padding: 10px 12px; cursor: pointer; font-weight: 700; font-size: 14px;
  user-select: none; }
.fbp-head button { background: none; border: none; color: inherit; font: inherit;
  cursor: pointer; padding: 0 2px; }
.fbp-sec-head { display: flex; justify-content: space-between; align-items: center;
  padding: 8px 12px 2px; font-weight: 700; font-size: 11px;
  text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.75;
  cursor: pointer; user-select: none; }
.fbp-row { display: flex; align-items: center; gap: 8px; padding: 5px 12px; }
.fbp-row > label { flex: 0 0 84px; opacity: 0.9; }
.fbp-row input[type=range] { flex: 1; min-width: 0; }
.fbp-val { flex: 0 0 auto; text-align: right; opacity: 0.8; min-width: 34px; }
.fbp-chips { display: flex; gap: 6px; flex-wrap: wrap; flex: 1; }
.fbp-chip { display: flex; gap: 2px; padding: 3px; border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.25); background: transparent; cursor: pointer; }
.fbp-chip.on { border-color: #fff; box-shadow: 0 0 0 1px #fff; }
.fbp-dot { width: 14px; height: 14px; border-radius: 50%; display: block; }
.fbp-row select { flex: 1; min-width: 0; background: #222; color: inherit;
  border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 4px 6px;
  font: inherit; }
.fbp-row input[type=checkbox] { accent-color: #f2ede2; width: 16px; height: 16px; }
.fbp-foot { display: flex; gap: 8px; padding: 10px 12px 12px; margin-top: 6px;
  border-top: 1px solid rgba(255,255,255,0.12); }
.fbp-foot button { flex: 1; background: #f2ede2; color: #111; border: none;
  border-radius: 6px; padding: 7px 4px; font: inherit; font-weight: 600; cursor: pointer; }
.fbp-foot button:disabled { opacity: 0.35; cursor: default; }
`;

function injectCss() {
  if (document.getElementById('fbp-style')) return;
  const st = document.createElement('style');
  st.id = 'fbp-style';
  st.textContent = CSS;
  document.head.appendChild(st);
}

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}

// Option list for a select: PRESETS entry (array, or object keys) or fallback.
function optionList(presets, key, fallback) {
  const v = presets[key];
  if (Array.isArray(v) && v.length) return v;
  if (v && typeof v === 'object') return Object.keys(v);
  return fallback;
}

// Swatch map for a chip group: PRESETS entry (object) or fallback.
function swatchMap(presets, key, fallback) {
  const v = presets[key];
  if (v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length) return v;
  return fallback;
}

// Colour dots for one swatch entry: a hex string, an array of hex
// strings, or an object whose hex values are collected (jersey/shorts,
// paper/ink, ...). Capped at 3 dots.
function chipColors(entry) {
  if (typeof entry === 'string') return [entry];
  if (Array.isArray(entry)) return entry.filter((c) => typeof c === 'string').slice(0, 3);
  if (entry && typeof entry === 'object') {
    return Object.values(entry).filter((c) => typeof c === 'string' && c.charAt(0) === '#').slice(0, 3);
  }
  return ['#888888'];
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function fmt(n) { return String(Math.round(n * 100) / 100); }

export function buildPanel(settings, container, hooks = {}, opts = {}) {
  injectCss();
  const presets = settings.PRESETS || {};
  const syncers = [];
  const sync = (s) => { for (const f of syncers) f(s); };

  const root = el('div', 'fbp');
  root.setAttribute('data-panel', 'settings');

  // Header: title + collapse toggle. Collapsed, only this row shows.
  const head = el('div', 'fbp-head');
  head.appendChild(el('span', '', 'Settings'));
  const collapseBtn = el('button', '', '-');
  collapseBtn.setAttribute('data-action', 'collapse-panel');
  collapseBtn.setAttribute('aria-label', 'Collapse panel');
  head.appendChild(collapseBtn);
  root.appendChild(head);

  const body = el('div', 'fbp-body');
  root.appendChild(body);
  head.addEventListener('click', () => {
    const hidden = body.style.display === 'none';
    body.style.display = hidden ? '' : 'none';
    collapseBtn.textContent = hidden ? '-' : '+';
    // Collapsed, the panel shrinks to the header (otherwise the 300 px
    // header bar covers the HUD on a 390 px phone).
    root.classList.toggle('fbp-collapsed', !hidden);
  });
  // Start collapsed (the piece is the point; the panel is a tool).
  // The viewer passes this on narrow viewports, where the open panel
  // would cover the whole portrait stage.
  if (opts.startCollapsed) {
    body.style.display = 'none';
    collapseBtn.textContent = '+';
    root.classList.add('fbp-collapsed');
  }

  function section(title, key) {
    const secHead = el('div', 'fbp-sec-head');
    secHead.setAttribute('data-section', key);
    secHead.appendChild(el('span', '', title));
    const ind = el('span', '', '-');
    secHead.appendChild(ind);
    const secBody = el('div', 'fbp-sec-body');
    secHead.addEventListener('click', () => {
      const hidden = secBody.style.display === 'none';
      secBody.style.display = hidden ? '' : 'none';
      ind.textContent = hidden ? '-' : '+';
    });
    body.appendChild(secHead);
    body.appendChild(secBody);
    return secBody;
  }

  function sliderRow(parent, key, label, min, max, step) {
    const row = el('div', 'fbp-row');
    row.appendChild(el('label', '', label));
    const input = el('input', '');
    input.type = 'range';
    input.min = min; input.max = max; input.step = step;
    input.setAttribute('data-key', key);
    const val = el('span', 'fbp-val');
    input.addEventListener('input', () => {
      const v = parseFloat(input.value);
      val.textContent = fmt(v);
      settings.set({ [key]: v });
    });
    row.appendChild(input);
    row.appendChild(val);
    parent.appendChild(row);
    syncers.push((s) => { input.value = s[key]; val.textContent = fmt(s[key]); });
  }

  function swatchRow(parent, key, label, map) {
    const row = el('div', 'fbp-row');
    row.appendChild(el('label', '', label));
    const chips = el('div', 'fbp-chips');
    const val = el('span', 'fbp-val');
    const buttons = {};
    for (const name of Object.keys(map)) {
      const b = el('button', 'fbp-chip');
      b.type = 'button';
      b.setAttribute('data-chip', key + ':' + name);
      b.setAttribute('aria-label', label + ' ' + name);
      b.title = name;
      for (const c of chipColors(map[name])) {
        const dot = el('span', 'fbp-dot');
        dot.style.background = c;
        b.appendChild(dot);
      }
      b.addEventListener('click', () => settings.set({ [key]: name }));
      chips.appendChild(b);
      buttons[name] = b;
    }
    row.appendChild(chips);
    row.appendChild(val);
    parent.appendChild(row);
    syncers.push((s) => {
      for (const name of Object.keys(buttons)) buttons[name].classList.toggle('on', s[key] === name);
      val.textContent = s[key];
    });
  }

  function selectRow(parent, key, label, options, labelFor) {
    const row = el('div', 'fbp-row');
    row.appendChild(el('label', '', label));
    const sel = el('select', '');
    sel.setAttribute('data-key', key);
    for (const opt of options) {
      const o = document.createElement('option');
      o.value = opt;
      o.textContent = labelFor ? labelFor(opt) : opt;
      sel.appendChild(o);
    }
    sel.addEventListener('change', () => settings.set({ [key]: sel.value }));
    row.appendChild(sel);
    parent.appendChild(row);
    syncers.push((s) => { sel.value = s[key]; });
  }

  function toggleRow(parent, key, label) {
    const row = el('div', 'fbp-row');
    row.appendChild(el('label', '', label));
    const input = el('input', '');
    input.type = 'checkbox';
    input.setAttribute('data-key', key);
    const val = el('span', 'fbp-val');
    input.addEventListener('change', () => settings.set({ [key]: input.checked }));
    row.appendChild(input);
    row.appendChild(val);
    parent.appendChild(row);
    syncers.push((s) => { input.checked = !!s[key]; val.textContent = s[key] ? 'On' : 'Off'; });
  }

  // Look
  const look = section('Look', 'look');
  sliderRow(look, 'strokeSize', 'Stroke size', 0.5, 2.0, 0.05);
  sliderRow(look, 'density', 'Density', 0.15, 1.5, 0.05);
  sliderRow(look, 'disorder', 'Disorder', 0, 1, 0.01);
  swatchRow(look, 'kit', 'Kit', swatchMap(presets, 'KITS', FALLBACK.KITS));
  swatchRow(look, 'ball', 'Ball', swatchMap(presets, 'BALLS', FALLBACK.BALLS));
  swatchRow(look, 'palette', 'Palette', swatchMap(presets, 'PALETTES', FALLBACK.PALETTES));

  // Sound
  const sound = section('Sound', 'sound');
  toggleRow(sound, 'sound', 'Sound');
  sliderRow(sound, 'tempo', 'Tempo', 60, 180, 1);

  // Camera
  const cam = section('Camera', 'camera');
  selectRow(cam, 'cameraMode', 'Camera', optionList(presets, 'CAMERA_MODES', FALLBACK.CAMERA_MODES), cap);
  selectRow(cam, 'lighting', 'Lighting', optionList(presets, 'LIGHTING', FALLBACK.LIGHTING), cap);
  toggleRow(cam, 'fisheye', 'Fisheye');
  sliderRow(cam, 'fisheyeStrength', 'Fisheye amt', 0, 1, 0.05);

  // Play
  const play = section('Play', 'play');
  selectRow(play, 'move', 'Move', optionList(presets, 'MOVES', FALLBACK.MOVES),
    (m) => (m === 'full' ? 'Full routine' : m));
  selectRow(play, 'routine', 'Routine', optionList(presets, 'ROUTINES', FALLBACK.ROUTINES),
    (r) => ({ full: 'Full', handles: 'Handles', spin: 'Spin', finger: 'Finger spin' }[r] || cap(r)));
  selectRow(play, 'format', 'Format', optionList(presets, 'FORMATS', FALLBACK.FORMATS));

  // Footer: preset + export buttons. Disabled (muted) when the hook is absent.
  const foot = el('div', 'fbp-foot');
  const saveBtn = el('button', '', 'Save preset');
  saveBtn.setAttribute('data-action', 'save');
  saveBtn.disabled = typeof hooks.onSavePreset !== 'function';
  saveBtn.addEventListener('click', () => { if (hooks.onSavePreset) hooks.onSavePreset(); });
  const loadBtn = el('button', '', 'Load preset');
  loadBtn.setAttribute('data-action', 'load');
  loadBtn.disabled = typeof hooks.onLoadPreset !== 'function';
  const fileInput = el('input', '');
  fileInput.type = 'file';
  fileInput.accept = '.json,application/json';
  fileInput.style.display = 'none';
  fileInput.setAttribute('data-action', 'load-file');
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length && hooks.onLoadPreset) hooks.onLoadPreset(fileInput.files[0]);
    fileInput.value = '';
  });
  loadBtn.addEventListener('click', () => { if (hooks.onLoadPreset) fileInput.click(); });
  const exportBtn = el('button', '', 'Export clip');
  exportBtn.setAttribute('data-action', 'export');
  exportBtn.disabled = typeof hooks.onExport !== 'function';
  exportBtn.addEventListener('click', () => { if (hooks.onExport) hooks.onExport(); });
  foot.appendChild(saveBtn);
  foot.appendChild(loadBtn);
  foot.appendChild(exportBtn);
  foot.appendChild(fileInput);
  body.appendChild(foot);

  if (typeof settings.onChange === 'function') settings.onChange((s) => sync(s));
  container.appendChild(root);
  sync(settings.get());
  return { element: root, refresh() { sync(settings.get()); } };
}
