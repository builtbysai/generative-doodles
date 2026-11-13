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
.fbp {
  position:fixed;top:18px;right:18px;z-index:50;width:312px;
  max-width:calc(100vw - 36px);max-height:calc(100dvh - 36px);overflow-y:auto;
  background:#f6e7d1;color:#263348;border:1px solid #263348;
  box-shadow:7px 7px 0 rgba(38,51,72,.21);
  font:12px/1.45 "Trebuchet MS", system-ui, sans-serif;
  scrollbar-width:thin;scrollbar-color:#a68f83 transparent;
}
.fbp button,.fbp select,.fbp input {font:inherit}
.fbp.fbp-collapsed {width:auto;background:#263348;color:#fff0d7;box-shadow:4px 4px 0 rgba(38,51,72,.22)}
.fbp-head {
  display:flex;align-items:center;justify-content:space-between;gap:22px;
  min-height:40px;padding:0 13px;cursor:pointer;user-select:none;
  font-size:10px;font-weight:800;letter-spacing:.13em;text-transform:uppercase;
  border-bottom:1px solid rgba(38,51,72,.22);
}
.fbp-collapsed .fbp-head {border-bottom:0}
.fbp-head:before {content:"";display:block;width:8px;height:8px;flex:none;background:#ed885e;transform:rotate(45deg)}
.fbp-head span {flex:1}
.fbp-head button {border:0;color:inherit;background:transparent;cursor:pointer;font-size:17px;line-height:1;padding:8px 0}
.fbp-head:focus-visible,.fbp-sec-head:focus-visible,.fbp button:focus-visible,
.fbp input:focus-visible,.fbp select:focus-visible {outline:2px solid #f08d60;outline-offset:2px}
.fbp-sec-head {
  display:flex;align-items:center;justify-content:space-between;
  padding:12px 13px 8px;border-top:1px solid rgba(38,51,72,.14);
  font-size:10px;font-weight:800;letter-spacing:.13em;text-transform:uppercase;
  cursor:pointer;user-select:none
}
.fbp-sec-head span:last-child{font-size:13px;opacity:.7}
.fbp-sec-body{padding-bottom:10px}
.fbp-row{display:flex;align-items:center;gap:10px;padding:5px 13px;min-height:27px}
.fbp-row>label{flex:0 0 81px;color:#6e6570;font-weight:600;font-size:11px}
.fbp-row input[type=range] {
  flex:1;min-width:0;height:3px;border-radius:0;cursor:pointer;
  accent-color:#e57250
}
.fbp-val{flex:0 0 auto;min-width:36px;text-align:right;color:#5e5b6b;font:600 10px/1.2 ui-monospace,monospace}
.fbp-chips{display:flex;flex:1;flex-wrap:wrap;gap:5px}
.fbp-chip{
  display:flex;gap:1px;padding:3px;border-radius:0;cursor:pointer;
  border:1px solid #cbb6a2;background:#e7d5c3;transition:border-color .15s ease,background .15s ease
}
.fbp-chip.on{border-color:#263348;background:#263348}
.fbp-dot{display:block;width:14px;height:17px}
.fbp-row select{
  flex:1;min-width:0;background:#f9eedc;color:#263348;
  padding:6px;border:1px solid #cbb6a2;border-radius:0
}
.fbp-row input[type=checkbox]{accent-color:#e57250;width:16px;height:16px}
.fbp-foot{
  display:grid;grid-template-columns:1fr 1fr 1.2fr;gap:6px;
  padding:12px 13px 14px;border-top:1px solid rgba(38,51,72,.2)
}
.fbp-foot button{
  min-height:36px;padding:5px 2px;border:1px solid #263348;border-radius:0;
  color:#263348;background:transparent;cursor:pointer;
  font-size:10px;font-weight:700;letter-spacing:.02em
}
.fbp-foot button:last-of-type{background:#263348;color:#f6e7d1}
.fbp-foot button:disabled{opacity:.32;cursor:default}
@media (max-width:600px){
  .fbp{top:auto;right:0;left:0;bottom:0;width:auto;max-width:none;max-height:75dvh;border-left:0;border-right:0;border-bottom:0;box-shadow:0 -9px 28px rgba(25,35,49,.2)}
  .fbp.fbp-collapsed{top:12px;right:12px;bottom:auto;left:auto;width:auto;max-height:none;box-shadow:3px 3px 0 rgba(38,51,72,.22)}
  .fbp-head{min-height:42px}
}
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
  const headerTitle = el('span', '', 'Streetball / 9148');
  head.appendChild(headerTitle);
  const collapseBtn = el('button', '', '-');
  collapseBtn.setAttribute('data-action', 'collapse-panel');
  collapseBtn.setAttribute('aria-label', 'Collapse panel');
  head.appendChild(collapseBtn);
  root.appendChild(head);

  const body = el('div', 'fbp-body');
  root.appendChild(body);
  head.setAttribute('role','button');
  head.tabIndex=0;
  head.setAttribute('aria-expanded', String(!opts.startCollapsed));
  const togglePanel = () => {
    const hidden = body.style.display === 'none';
    body.style.display = hidden ? '' : 'none';
    collapseBtn.textContent = hidden ? '-' : '+';
    headerTitle.textContent = hidden ? 'Streetball / 9148' : 'Edit';
    // Collapsed, the panel shrinks to the header (otherwise the 300 px
    // header bar covers the HUD on a 390 px phone).
    root.classList.toggle('fbp-collapsed', !hidden);
    head.setAttribute('aria-expanded', String(hidden));
  };
  head.addEventListener('click', togglePanel);
  head.addEventListener('keydown', (event) => {
    if (event.target === head && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();togglePanel();
    }
  });
  // Start collapsed (the piece is the point; the panel is a tool).
  // The viewer passes this on narrow viewports, where the open panel
  // would cover the whole portrait stage.
  if (opts.startCollapsed) {
    body.style.display = 'none';
    collapseBtn.textContent = '+';
    headerTitle.textContent = 'Edit';
    root.classList.add('fbp-collapsed');
  }

  function section(title, key) {
    const secHead = el('div', 'fbp-sec-head');
    secHead.setAttribute('data-section', key);
    secHead.setAttribute('role','button');secHead.tabIndex=0;
    secHead.appendChild(el('span', '', title));
    const ind = el('span', '', '-');
    secHead.appendChild(ind);
    const secBody = el('div', 'fbp-sec-body');
    const toggleSection = () => {
      const hidden = secBody.style.display === 'none';
      secBody.style.display = hidden ? '' : 'none';
      ind.textContent = hidden ? '-' : '+';
      secHead.setAttribute('aria-expanded', String(hidden));
    };
    secHead.addEventListener('click', toggleSection);
    secHead.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();toggleSection();
      }
    });
    secHead.setAttribute('aria-expanded','true');
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
