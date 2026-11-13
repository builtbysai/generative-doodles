// paint-streets.js -- Stage 5: four NYC streets as unrolled paintings.
// Procedural canvas 2D, no assets. Structure first (flat colour masses,
// hard edges); brush dabs are sparse texture on top (strokes flag).
// 2048x1024 panorama, horizon y=563 (55%). Landmarks stay in the central
// 60% so the left/right edges tile around the cylinder.

export const STREETS = ['washington-square', 'dumbo', 'soho', 'coney-island'];
const W = 2048, H = 1024, HOR = 563;

// Deterministic RNG (mulberry32) so a baked street is stable.
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function mk() {
  const c = document.createElement('canvas'); c.width = W; c.height = H; return c;
}

// The only gradient allowed: the sky.
function sky(g, top, bot) {
  const gr = g.createLinearGradient(0, 0, 0, HOR);
  gr.addColorStop(0, top); gr.addColorStop(1, bot);
  g.fillStyle = gr; g.fillRect(0, 0, W, HOR);
}

function R(g, x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
function ellipse(g, x, y, rx, ry, c) {
  g.fillStyle = c; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 7); g.fill();
}

// One brush dab: a short rotated stroke with round caps.
function dab(g, x, y, len, ang, w, c) {
  g.strokeStyle = c; g.lineWidth = w; g.lineCap = 'round';
  const dx = Math.cos(ang) * len / 2, dy = Math.sin(ang) * len / 2;
  g.beginPath(); g.moveTo(x - dx, y - dy); g.lineTo(x + dx, y + dy); g.stroke();
}

// Scatter n dabs inside a rect, colours picked from the list.
function dabs(g, r, n, x, y, w, h, cols, len) {
  for (let i = 0; i < n; i++)
    dab(g, x + r() * w, y + r() * h, len * (0.6 + r()), (r() - 0.5) * 0.9,
        2 + r() * 5, cols[(r() * cols.length) | 0]);
}

// Basketball court hint: painted lines, centre, lower third.
function court(g, cx, y, c) {
  g.strokeStyle = c; g.lineWidth = 5; g.globalAlpha = 0.85;
  g.beginPath(); g.moveTo(cx - 330, y + 240); g.lineTo(cx - 200, y);
  g.lineTo(cx + 200, y); g.lineTo(cx + 330, y + 240); g.closePath(); g.stroke();
  g.beginPath(); g.ellipse(cx, y + 120, 130, 34, 0, 0, 7); g.stroke();
  g.beginPath(); g.moveTo(cx - 200, y); g.lineTo(cx + 200, y); g.stroke();
  g.globalAlpha = 1;
}

// Ground plane with converging seams and sparse dashes.
function ground(g, c, seam, r, n) {
  R(g, 0, HOR, W, H - HOR, c);
  // Brushy seams (Stage 13c): each seam is three offset strokes, so
  // the converging lines read as painted, not ruled.
  g.strokeStyle = seam;
  for (let i = -4; i <= 4; i++) {
    for (const [off, w, a] of [[0, 3, 0.8], [-3, 2, 0.4], [3, 2, 0.4]]) {
      g.lineWidth = w; g.globalAlpha = a;
      g.beginPath(); g.moveTo(1024 + i * 90 + off, HOR);
      g.lineTo(1024 + i * 320 + off * 3, H); g.stroke();
    }
  }
  g.globalAlpha = 1;
  g.lineWidth = 2;
  for (let i = 0; i < n; i++) {
    const x = r() * W, y = HOR + 20 + r() * (H - HOR - 40);
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + 20 + r() * 40, y); g.stroke();
  }
}

// ---------- 1. Washington Square Park, golden hour ----------
function washingtonSquare(g, r, rd, strokes, density) {
  sky(g, '#f7b733', '#fcf6d8');
  if (strokes) dabs(g, rd, 60 * density | 0, 0, 0, W, 400, ['#f7b733', '#fcf6d8', '#f2a03a'], 30);
  ellipse(g, 1680, 170, 70, 70, '#fdf3c0'); // low sun
  R(g, 180, 420, 320, 143, '#8a5a44'); R(g, 1540, 400, 340, 163, '#8a5a44');
  R(g, 180, 420, 320, 14, '#7a4a2e'); R(g, 1540, 400, 340, 14, '#7a4a2e');
  for (const tx of [300, 460, 1590, 1740]) { // plane trees flanking
    R(g, tx - 10, 470, 20, 93, '#5a3a22');
    ellipse(g, tx, 420, 110, 95, '#2e4d2a'); ellipse(g, tx + 60, 460, 80, 70, '#2e4d2a');
  }
  // The Arch: piers + entablature + attic; opening cut in sky colour.
  R(g, 844, 243, 70, 320, '#f2ede2'); R(g, 1134, 243, 70, 320, '#ddd5c2');
  R(g, 844, 183, 360, 60, '#f2ede2'); R(g, 844, 143, 360, 40, '#f2ede2');
  R(g, 844, 223, 360, 8, '#7a4a2e'); // shadow line under the entablature
  g.fillStyle = '#fcf6d8'; g.beginPath(); g.moveTo(914, HOR); g.lineTo(914, 380);
  g.arc(1024, 380, 110, Math.PI, 0); g.lineTo(1134, HOR); g.closePath(); g.fill();
  // Dark outline on the Arch (structure, not strokes): white marble on
  // the pale horizon sky is invisible without it — in the 3D view the
  // Arch read as a pale blob until this was added. Matches the piece's
  // outlined/toon language.
  g.strokeStyle = '#7a4a2e'; g.lineWidth = 6;
  g.strokeRect(844, 143, 360, 40); g.strokeRect(844, 183, 360, 60);
  g.strokeRect(844, 243, 70, 320); g.strokeRect(1134, 243, 70, 320);
  g.beginPath(); g.moveTo(914, HOR); g.lineTo(914, 380);
  g.arc(1024, 380, 110, Math.PI, 0); g.lineTo(1134, HOR); g.stroke();
  ground(g, '#b98a5e', '#7a4a2e', r, 40);
  ellipse(g, 1024, 780, 270, 62, '#7a4a2e'); // fountain basin
  ellipse(g, 1024, 776, 238, 50, '#e8c96a'); ellipse(g, 1024, 772, 150, 30, '#f7e08a');
  court(g, 1024, 830, '#f2ede2');
  if (!strokes) return;
  dabs(g, rd, 55 * density | 0, 180, 330, 420, 200, ['#2e4d2a', '#3d6b35'], 28);
  dabs(g, rd, 55 * density | 0, 1470, 330, 420, 200, ['#2e4d2a', '#3d6b35'], 28);
  dabs(g, rd, 55 * density | 0, 0, HOR, W, H - HOR, ['#b98a5e', '#c99a6a', '#7a4a2e'], 30);
}

// ---------- 2. DUMBO, afternoon ----------
function dumbo(g, r, rd, strokes, density) {
  sky(g, '#7fb2d9', '#d6e9f4');
  if (strokes) dabs(g, rd, 50 * density | 0, 0, 0, W, 320, ['#7fb2d9', '#d6e9f4'], 30);
  ellipse(g, 300, 150, 60, 60, '#fdf6c8'); // high sun
  for (const [x, y, w, h] of [[1560, 380, 60, 120], [1630, 330, 80, 170], // skyline
      [1720, 400, 55, 100], [1790, 350, 70, 150], [1880, 410, 60, 90],
      [1960, 370, 88, 130]]) R(g, x, y, w, h, '#5a6b7a');
  R(g, 1500, 500, 548, 63, '#4a7d9c'); // river glint
  for (const wx of [60, 1300]) { // brick warehouses + dark window grids
    R(g, wx, 360, 260, 203, '#8e3b2f'); R(g, wx, 360, 260, 12, '#6f2a22');
    for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++)
      R(g, wx + 24 + col * 58, 400 + row * 50, 30, 30, '#4a1f1a');
  }
  // Manhattan Bridge tower + arch, centre-left; cables to both sides.
  R(g, 540, 120, 240, 80, '#9a8f7a'); R(g, 560, 200, 200, 363, '#9a8f7a');
  R(g, 740, 200, 20, 363, '#7a6f5a'); // shaded side
  g.fillStyle = '#bcd6e9'; g.beginPath(); g.moveTo(600, HOR); g.lineTo(600, 360);
  g.arc(660, 360, 60, Math.PI, 0); g.lineTo(720, HOR); g.closePath(); g.fill();
  g.strokeStyle = '#6f6a63'; g.lineWidth = 4;
  g.beginPath(); g.moveTo(560, 160); g.quadraticCurveTo(300, 420, 60, 360); g.stroke();
  g.beginPath(); g.moveTo(760, 160); g.quadraticCurveTo(1050, 420, 1300, 380); g.stroke();
  ground(g, '#6f6a63', '#565049', r, 30);
  court(g, 1024, 760, '#f2ede2');
  // No cobble texture: the brief forbids full-texture ground noise; the
  // seams and dashes carry the street. The tower stays a flat mass.
}

// ---------- 3. SoHo, dusk ----------
function soho(g, r, rd, strokes, density) {
  sky(g, '#6b4a7a', '#e88a4a');
  if (strokes) dabs(g, rd, 60 * density | 0, 0, 0, W, 320, ['#6b4a7a', '#e88a4a', '#8a5a8a'], 30);
  ellipse(g, 1500, 430, 55, 55, '#f7c95c'); // low sun
  for (const [x, y, w, h] of [[40, 300, 300, 263], [360, 260, 280, 303], // facades
      [660, 320, 300, 243], [980, 250, 300, 313], [1300, 310, 280, 253],
      [1600, 270, 300, 293], [1920, 320, 128, 243]]) {
    R(g, x, y, w, h, '#3a4a42');
    R(g, x, y, w, 12, '#1f2a26'); R(g, x, y + 60, w, 6, '#1f2a26');
    const cols = w < 200 ? 1 : 3; // narrow edge facade gets one column
    for (let row = 0; row < 2; row++) for (let col = 0; col < cols; col++) {
      const wx = x + 30 + col * ((w - 60) / 3), wy = y + 90 + row * 80;
      g.fillStyle = r() < 0.4 ? '#f7c95c' : '#1f2a26';
      g.beginPath(); g.moveTo(wx, wy + 44); g.lineTo(wx, wy + 12);
      g.arc(wx + 18, wy + 12, 18, Math.PI, 0);
      g.lineTo(wx + 36, wy + 44); g.closePath(); g.fill();
    }
  }
  for (const fx of [500, 1400]) { // fire escapes: zigzag + platforms
    g.strokeStyle = '#1f2a26'; g.lineWidth = 5; g.beginPath(); g.moveTo(fx, 300);
    for (let i = 0; i < 8; i++) g.lineTo(fx + (i % 2 ? 60 : 0), 300 + i * 30);
    g.stroke();
    R(g, fx - 10, 360, 80, 6, '#1f2a26'); R(g, fx - 10, 460, 80, 6, '#1f2a26');
  }
  for (const [tx, ty] of [[500, 260], [1450, 310]]) { // water towers
    R(g, tx - 8, ty - 70, 16, 70, '#5a4030'); R(g, tx + 30, ty - 70, 16, 70, '#5a4030');
    R(g, tx - 15, ty - 130, 70, 60, '#5a4030');
    g.fillStyle = '#4a3428'; g.beginPath(); g.moveTo(tx - 20, ty - 130);
    g.lineTo(tx + 20, ty - 160); g.lineTo(tx + 60, ty - 130); g.closePath(); g.fill();
  }
  ground(g, '#4a4442', '#1f2a26', r, 30);
  for (const lx of [300, 1750]) { // street lamps with warm glow
    R(g, lx - 4, 420, 8, 180, '#1f2a26');
    ellipse(g, lx, 410, 34, 34, 'rgba(247,201,92,0.25)');
    ellipse(g, lx, 410, 12, 12, '#f7c95c');
  }
  court(g, 1024, 760, '#f2ede2');
  if (!strokes) return;
  dabs(g, rd, 40 * density | 0, 0, HOR, W, H - HOR, ['#4a4442', '#5a5452'], 28);
}

// ---------- 4. Coney Island, night ----------
function coneyIsland(g, r, rd, strokes, density) {
  sky(g, '#0d1b3a', '#16264d');
  for (let i = 0; i < 90; i++) R(g, r() * W, r() * 420, 3, 3, '#cfe0ff');
  ellipse(g, 1800, 130, 42, 42, '#f2ede2'); // moon
  ellipse(g, 1815, 120, 38, 38, '#0d1b3a'); // crescent cut
  g.strokeStyle = '#2a3a5a'; g.lineWidth = 10; // Parachute Jump legs
  g.beginPath(); g.moveTo(280, HOR); g.lineTo(360, 150); g.stroke();
  g.beginPath(); g.moveTo(440, HOR); g.lineTo(360, 150); g.stroke();
  g.lineWidth = 3; // cross-braces
  for (let y = 180; y < HOR - 40; y += 40) {
    const t = (y - 150) / (HOR - 150), half = 20 + t * 80;
    g.beginPath(); g.moveTo(360 - half, y); g.lineTo(360 + half, y + 40); g.stroke();
    g.beginPath(); g.moveTo(360 + half, y); g.lineTo(360 - half, y + 40); g.stroke();
  }
  ellipse(g, 360, 150, 10, 10, '#ff5da2'); // top beacon
  // Wonder Wheel: neon ring, spokes, gondolas, A-frame legs.
  g.strokeStyle = '#ff5da2'; g.lineWidth = 8;
  g.beginPath(); g.arc(1024, 330, 190, 0, 7); g.stroke();
  g.strokeStyle = '#2a3a5a'; g.lineWidth = 4;
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4; g.beginPath(); g.moveTo(1024, 330);
    g.lineTo(1024 + Math.cos(a) * 190, 330 + Math.sin(a) * 190); g.stroke();
  }
  const ncol = ['#ff5da2', '#ffd23f', '#35d0d0'];
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6;
    R(g, 1024 + Math.cos(a) * 190 - 10, 330 + Math.sin(a) * 190 - 8, 20, 16, ncol[i % 3]);
  }
  ellipse(g, 1024, 330, 16, 16, '#ffd23f'); // hub
  g.strokeStyle = '#2a3a5a'; g.lineWidth = 12;
  g.beginPath(); g.moveTo(1024, 330); g.lineTo(920, HOR); g.stroke();
  g.beginPath(); g.moveTo(1024, 330); g.lineTo(1128, HOR); g.stroke();
  g.strokeStyle = '#6b4a2e'; g.lineWidth = 8; // Cyclone hill + lattice
  g.beginPath(); g.moveTo(1420, HOR); g.lineTo(1620, 220); g.lineTo(1820, HOR); g.stroke();
  g.lineWidth = 3;
  for (let x = 1460; x < 1800; x += 40) {
    const ty = 220 + Math.abs(x - 1620) * 1.715;
    g.beginPath(); g.moveTo(x, HOR); g.lineTo(x, ty); g.stroke();
  }
  ground(g, '#7a5a3a', '#5a4030', r, 30);
  g.strokeStyle = '#5a4030'; g.lineWidth = 2; // boardwalk plank lines
  for (let y = HOR + 30; y < H; y += 34) {
    g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
  }
  court(g, 1024, 760, '#f2ede2');
  if (!strokes) return;
  dabs(g, rd, 40 * density | 0, 0, HOR, W, H - HOR, ['#7a5a3a', '#8a6a4a'], 28);
  for (let i = 0; i < 24 * density; i++) { // neon sparkle ON the wheel ring
    const a = rd() * 6.283;
    ellipse(g, 1024 + Math.cos(a) * 185, 330 + Math.sin(a) * 185, 3, 3,
            ncol[(rd() * 3) | 0]);
  }
}

const PAINTERS = {
  'washington-square': washingtonSquare,
  'dumbo': dumbo,
  'soho': soho,
  'coney-island': coneyIsland,
};

// ---------- Multi-pass paint treatment (Stage 13c) ----------
// Runs after a street painter finishes: the painting is already
// composed (masses + landmarks), and the treatment paints ON TOP of
// it in three passes, sampling the canvas's own colours so the
// brushwork always matches the palette:
//   1. Wash: big soft low-alpha dabs, broad colour variation.
//   2. Touches: short directional strokes, oriented by region
//      (sky horizontal, facades vertical, ground converging to the
//      vanishing point), each a lightened/darkened variant of the
//      colour underneath.
//   3. Details: dark edge strokes along the horizon, bright accents.
function paintTreatment(g, r, strokes) {
  if (!strokes) return;
  const img = g.getImageData(0, 0, W, H).data;
  const px = (x, y) => {
    const i = ((Math.min(H - 1, Math.max(0, y | 0))) * W + Math.min(W - 1, Math.max(0, x | 0))) * 4;
    return [img[i], img[i + 1], img[i + 2]];
  };
  const shade = (c, f) => `rgb(${Math.min(255, c[0] * f) | 0},${Math.min(255, c[1] * f) | 0},${Math.min(255, c[2] * f) | 0})`;
  // 1. Wash: 40 big soft dabs, sky and ground.
  for (let i = 0; i < 40; i++) {
    const x = r() * W, y = r() < 0.5 ? r() * HOR * 0.7 : HOR + r() * (H - HOR);
    g.globalAlpha = 0.05 + r() * 0.05;
    dab(g, x, y, 120 + r() * 160, (r() - 0.5) * 0.4, 18 + r() * 22, shade(px(x, y), 0.9 + r() * 0.2));
  }
  g.globalAlpha = 1;
  // 2. Touches: 800 directional strokes.
  for (let i = 0; i < 800; i++) {
    const x = r() * W, y = r() * H;
    let ang;
    if (y < HOR * 0.55) ang = (r() - 0.5) * 0.3;                 // sky: horizontal
    else if (y < HOR) ang = Math.PI / 2 + (r() - 0.5) * 0.4;     // facades: vertical
    else ang = Math.atan2(HOR - y, 1024 - x) + (r() - 0.5) * 0.3; // ground: to the VP
    g.globalAlpha = 0.35 + r() * 0.3;
    dab(g, x, y, 14 + r() * 26, ang, 2 + r() * 4, shade(px(x, y), 0.82 + r() * 0.36));
  }
  g.globalAlpha = 1;
  // 3. Details: dark edge strokes along the horizon + bright accents.
  for (let x = 0; x < W; x += 14 + r() * 20) {
    g.globalAlpha = 0.3 + r() * 0.3;
    dab(g, x, HOR - 2 + r() * 6, 10 + r() * 14, (r() - 0.5) * 0.5, 2 + r() * 2, shade(px(x, HOR + 10), 0.6));
  }
  for (let i = 0; i < 60; i++) {
    const x = r() * W, y = HOR + r() * (H - HOR);
    g.globalAlpha = 0.25 + r() * 0.25;
    dab(g, x, y, 6 + r() * 10, r() * Math.PI, 1.5 + r() * 2, shade(px(x, y), 1.25));
  }
  g.globalAlpha = 1;
}

export function paintStreet(name, { strokes = true, density = 1.0 } = {}) {
  const fn = PAINTERS[name];
  if (!fn) throw new Error('unknown street: ' + name);
  const c = mk();
  const g = c.getContext('2d');
  let seed = 7;
  for (const ch of name) seed += ch.charCodeAt(0);
  fn(g, rng(seed), rng(seed + 999), strokes, density);
  paintTreatment(g, rng(seed + 4242), strokes);
  return c;
}
