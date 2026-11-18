# №1880 — One Mineral, One Collaborator (MG1, PP1127, study #246 maddalena-ghezzi)

Gallery date: 2007 · 03 · 06 (formula 2002-01-10 + (N+1) days).
Gallery note: "A single crystal grows by alternating lattices, amethyst spines hard-cutting to halite cubes. Watch the crystal change its lattice."

## Mechanism

A dark field holds a single growing crystal, centered, filling about two
thirds of the frame. Growth alternates in strict 25-second phases:

- **Amethyst phase** (t mod 50 < 25): violet hexagonal spines branch
  outward from the crystal surface, tapered shafts with faceted pale
  tips and quartz-white edges.
- **Halite phase** (t mod 50 >= 25): translucent white cubes stack in
  stepped terraces of 1 to 3 cubes, pale top face, warm grey shadow
  side, quartz edges.

One accumulation buffer, two growth rules. Every growth event is
pre-simulated before the first frame from a seeded RNG (mulberry32,
seed 1880) out to a 1200-second horizon. Each event is born at a fixed
time in one lattice phase and keeps its place forever; each new growth
reads the existing crystal surface (a tips list of surface points with
outward normals) as its seed bed, so spines sprout from cube terraces
and cubes cap spine tips. The cut between phases is a single black
frame: for the first 0.15 s of each phase only the ground and plates
draw, no blend, no morph. A faint phase-tinted breath glows behind the
crystal (violet in amethyst, warm grey in halite), under 1 Hz.

Frame one is a fixed phase: **t = 62.0 s, mid-amethyst of the second
cycle**, with one full amethyst phase and one full halite phase already
accumulated, so the crystal is a hybrid from the first frame. No
Date/wall clock/Math.random anywhere in frame one; the timeline is a
pure function of seed 1880.

## Palette (hand-picked; the study file studies/maddalena-ghezzi.md does not exist in the repo)

- Ground near-black: #070608
- Amethyst deep violet: #4C1D95; mid: #7C3AED; light: #A78BFA; pale facet: #C4B5FD
- Quartz white edges: #F5F0E6
- Halite salt white: #F2EFE9 (translucent, alpha 0.55 front / 0.72 top)
- Warm grey shadow: #8A8378 (cube side), #5C564C (unused dark variant)
- Plate: #0A0806, plate line rgba(167,139,250,0.30); title ink #F5F0E6, hint ink #C4B5FD

The title plate carries a live phase label (AMETHYST in #A78BFA,
HALITE in #F2EFE9) under the date.

## Interaction

Watch only. Never click-to-reload. The only control is a visible sound
toggle plate at bottom right ("Sound: off" / "Sound: on"); taps
elsewhere do nothing. Sound is a closed-form model on the same
deterministic event list: soft glass chimes (sine, C major pentatonic
set) on spine tips, low salt-crunch grains (short triangle thud at
82 Hz) on cube stacking. Real WebAudio is created lazily inside the
first toggle gesture only, default silent, never autoplay.
Flicker at or below 14 Hz by construction (the only hard cut is one
black frame every 25 s); prefers-reduced-motion renders the fixed
frame once and does not animate.

## House rules

Visual Viewport sizing with resize listened on visualViewport and
window; canvas pinned in draw() via canvas.style.width/height in px;
phone detection via window.screen (min dimension under 700px) with
aspect h > w*1.15 fallback; field-like composition full-bleed on phones
and square on desktop, with the crystal radius scaled from the width on
phones (min(VW*0.46, VH*0.26)) so it does not shrink to a postage
stamp; one synchronous frame at load; requestAnimationFrame guarded by
a typeof check so node-canvas QA works. No em dashes in visible copy.

## Deviations from the prompt

- The study file does not exist, so palette hexes were hand-picked
  from the prompt's named colors (recorded above) rather than taken
  from a study sheet.
- The cut is implemented as a 0.15 s black window at each phase
  boundary (one black frame at 60 fps would be ~0.016 s and easy to
  miss); the hard cut with no blend is preserved.
- Growth events are pre-simulated to a 1200 s horizon rather than
  generated live; after 20 minutes the crystal stops growing. No
  viewer-visible difference inside any normal viewing session.
- The title plate adds a live AMETHYST/HALITE phase label so the
  viewer can read which lattice is growing.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js
at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three
inspected visually.

- Fix round 1: first render was too small and sparse (growth clustered
  near the seed, crystal ~1/3 of frame). Changed tip selection to bias
  toward the growing front (recent tips, with occasional deep-interior
  seeds), lengthened spines (0.10-0.20 of radius), widened them,
  enlarged cubes, tightened event spacing, and scaled the crystal
  radius from the width on phones. Re-rendered: crystal fills about
  two thirds of the frame on desktop and thumb, spans most of the
  width on mobile, hybrid form (spines from cube terraces, cubes
  capping spine tips) legible at all three sizes.
- Determinism check: thumb re-rendered independently; md5-identical
  to the shipped thumb.png (d234fe9cdf99018143c2e209829ac0d4).
