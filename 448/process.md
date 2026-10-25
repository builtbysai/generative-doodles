# №448 Paper Palace — process.md

## Concept
Billowing-canopy dreamscape, serene and matte, per BATCH-446-448-SPEC §448
(maite-leon prompt 8). A small townhouse on gray rocky islets in a perfectly
calm blue sea; above it one giant red silk cloth billows like a second sky;
a thin crescent moon hangs left. No storm drama: sea glass, cloth silk,
nothing threatens. Watch-only ambient loop plus drag breeze; never
click-to-reload. No in-piece text or UI; the gallery note carries the cue.

## Construction
- Single self-contained index.html, canvas 2D only, no external assets,
  no offscreen canvases, no document.createElement, one script block.
- House rules from the №441 reference: Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas.style.width/height pinned
  in draw(); phone detection via window.screen min dimension < 700px with
  aspect fallback; one synchronous frame at load from constant PHASE0 = 2.0s;
  rAF guarded by a typeof check; all authored data from seeded mulberry32
  PRNGs (grain, islet noise), so the first frame is deterministic.
- Layout (fractions of canvas): horizon at 0.55H with a faint white horizon
  line so the line reads through the single sky/sea colour #7FA8C9. House
  total height = 0.25 x min(W,H), centred, base at horizon + 0.03H, on the
  central islet. Cloth spans the full width with lower edge rippling around
  0.34H (peaks near 0.39H, i.e. the top 40%); 48 vertical fold strips shade
  crests #E85A6E and fold-backs #7A1226 over the #C41E3A base.
  Moon: evenodd crescent, diameter 0.08 x min(W,H), centred at 0.24W (left
  third), 0.20H, drawn in front of the cloth so it stays visible.
- House: walls #A9BFD4, pitched roof #5B6B7A, centred door, exactly 6
  windows in a 2 x 3 grid (#F5F0DC). Rocks: three seeded noise-displaced
  mounds (#8A8A8A with #5B5B5B crevices), central one carrying the house.
- Loop, all seamless on the 14s cloth wave: cloth vertex wave (14s), sea
  reflection shimmer on the same phase, and one window lighting every 20s
  in fixed order 1-6 (index = floor(t/20) % 6, fading over its 20s slot,
  lit colour #F5D90A at partial alpha to keep the palette matte). At load
  (t = 2.0s) window 1 is lit at partial fade-in.
- Reflection: low-alpha cloth band and house smear below the horizon,
  plus calm horizontal shimmer strokes in the sea.
- Interaction: pointer drag measures pointer velocity; cloth billow
  amplitude multiplier = 1 + breeze x 1.4, where breeze eases toward the
  drag velocity while dragging and decays exponentially (time-based, from
  the loop clock) on release, settling back fully. No tap/click action.

## QA log
- Thumb determinism gate: rendered 720x720 twice from the actual script;
  both sha256 702821f6fd4388e5920fc4e322bfdc5204dee0b2d14ee269dbb6a369e62ecef1,
  byte-identical (cmp clean). Note: an earlier build rendered
  96b72c89... before the fixes below; the final thumb is the 7028... file.
- Desktop 1280x900 inspected: horizon at 55%, house 25% height on the
  central islet, cloth spanning the top 40% with rippling lower edge, moon
  in the left third, three islets, calm matte palette. Correct.
- Mobile 390x844 inspected: centred subject keeps its shape, house and
  moon proportionate, cloth and islets read cleanly, no clipping. Correct.
- Fixes during QA: (1) the first crescent path (two arcs) rendered as a
  broken shape; replaced with an evenodd two-circle crescent, now a clean
  thin crescent. (2) The door touched the bottom-middle window; window
  rows moved up (0.14 / 0.44 of wall height) so the door clears the grid.
  (3) Cloth fold-strip alphas softened (0.45/0.42 to 0.30/0.28) for a more
  matte silk read.
- Spec deviations, all noted: (a) sky and sea share the spec colour
  #7FA8C9, so a faint white horizon line and the sea shimmer/reflection
  are what mark the 55% horizon; no extra colour was introduced. (b) The
  moon is drawn in front of the cloth (the cloth occupies the top 40%,
  where the moon sits) so it stays visible; a moon behind the cloth would
  be hidden. (c) House height is taken as 0.25 x min(W,H) rather than
  0.25 x canvas height, so the centred subject keeps its shape on phones
  (identical on square/desktop renders). (d) A centred door in roof colour
  was added; the spec sanctions simple extruded rects and a townhouse
  door is part of that reading.
- Nothing pushed; no repo touched; pieces.json untouched, as briefed.
