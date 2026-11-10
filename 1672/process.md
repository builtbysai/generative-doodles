# №1672 "Flow Field, Thick Blocks" (TH1) - process notes

Opening piece of EXPANSION #220 tyler-hobbs. Built 2026-11-09 from
BATCH-1668-1672-SPEC.md, section "№1672 TH1", following the spec and the
house rules at the top of that file. Formula date 2006 · 08 · 10.
Live №1667 "Golden Eye" used as the code template.

## What it is

The Fidenza engine running live. A flow field is seeded over the canvas
from layered value noise (three octaves of a seeded value-noise grid).
Fourteen walkers step along the field vectors, stamping thick rounded
capsule blocks (rect plus two end circles, never an arc() subpath) along
the streamlines. Every placement is checked against a spatial hash with
an exact capsule segment-distance test: the distance between two blocks'
centerlines must clear the sum of their half-widths plus a 5px minimum
gap, so no two shapes ever touch or overlap. Walkers stop stamping where
there is no free space ahead and roam on; spent or strayed walkers are
respawned every round.

Turbulence is a slow parameter (0.5 + 0.5 sin, period about 140s): the
field breathes between calm parallel lanes and storm vortices. Palettes
cycle every 180s of piece time in the spec's order: sand-warm, then
cobalt, then bone/black with a single red accent, each color picked from
the palette's weighted table. On a cycle change the old field fades out
over eight seconds while the new field grows in (a crossfade of intent,
not a cut); the field restarts with a fresh seed per cycle.

## Deviations from the prompt

- Palette order fixed to sand, then cobalt, then bone/black, matching the
  spec's "sand-warm, then cobalt, then rust" sequence, rather than a
  weighted random pick per cycle. Within-palette colors remain weighted
  picks from the spec's tables.
- The pale bone color of the sand palette (#E8D9B8) is kept exactly as
  specified even though it reads faint on the warm paper ground; it is
  the lightest voice in the set, weighted lowest (0.20).
- Frame one is a fixed developed state: the field is pre-run for 1400
  placements from the seeded RNG before the first draw, so the first
  frame already shows blocks pouring along the lanes. The animation then
  keeps adding blocks at 240 per second until the field saturates.

## House rules

- Visual Viewport sizing; resize listened to on visualViewport and
  window. Canvas element pinned in draw() via canvas.style.width/height
  in px. Phone detection via window.screen (min dimension under 700px)
  with aspect fallback (h > w*1.15). Field-like composition, full-bleed
  on phones, square on desktop; the piece's own warm paper ground is the
  page ground.
- One synchronous frame at load; requestAnimationFrame calls guarded by a
  typeof check so node-canvas QA works.
- Deterministic fixed-phase first frame: seeded RNG only
  (mulberry32(1672) and per-cycle mulberry32(1672 + cycle*7919)), no
  Date.now() or Math.random() anywhere. Two renders of the desktop frame
  produce identical md5s.
- No em dashes in visible copy; no AI-signature copy; watch-only, no
  click-to-reload and no other interaction. Title/date/hint plates drawn
  on canvas: "Flow Field, Thick Blocks", "2006 · 08 · 10", "Watch only."

## Build problems found and fixed

1. First gate was nearly empty (66 blocks on desktop): walkers stalled
   forever at the first collision because a failed placement never moved
   the walker, and simulate() only respawned walkers after a fully dead
   round. Fixed: a failed walker advances along the field without
   stamping, and spent or strayed walkers are respawned every round.
2. Same gate exposed a second bug: a walker advanced only 0.92 * block
   length after placing, so the next block on the same streamline
   overlapped the one just laid (capsule ends overlap when the center
   distance is under half the two lengths plus width allowance). Fixed:
   advance is now length * 0.92 + 40px clearance.
3. The bounding-circle collision test forbade parallel lanes packing side
   by side. Replaced with an exact segment-to-segment distance test
   between capsule centerlines; verified correct on six unit cases
   (parallel, crossing, collinear gap, T shape, far diagonal).
4. Spatial-hash cell widened from 72 to 96px so the 3x3 cell search covers
   the true maximum collision distance (about 92px at the largest block
   size).

## QA results

Rendered with node ~/workspace/tools/render-piece.js from the actual
script and visually inspected all three:

- Desktop 1280x900: 200 blocks. Dense sand field, ochre/rust/bone
  capsules pouring along visible curving streamlines, parallel lanes,
  generous unmarked margin, no overlaps, plates legible.
- Mobile 390x844: 141 blocks. Dense field, lanes radiating from a vortex
  in the upper right, plates legible, full-bleed.
- Thumb 720x720 (thumb.png IS this render): 118 blocks. Same field,
  reads clearly at small size.
- Determinism: desktop rendered twice, identical md5
  239ee0b75a368ae56e7f743b7d767bd3; frame one sha256
  fb4026c319ac7998a8b68835b4a916ef8f0babd688ed342d452bdb92b39e5041.
- Cycle-transition path exercised in node: drawAt(186.5) switches to
  cobalt with the sand field fading; drawAt(195) prunes the faded field;
  a 60fps emulation from t=180 to t=200 grows the cobalt field to 442
  blocks with no exceptions and no visible sand ghosts. A long
  emulation (t=6 to t=66) grew the sand field to 489 blocks.

## Files

- index.html (md5 347dd027fd2c499d85c58cea2f04b2bb)
- thumb.png (md5 75c2156612ce2760aeff771f641d2ba0, the 720x720 render)
- process.md (this file)

Gallery note: "Thick blocks pour along a flow field, never touching,
palettes swapping slowly. Watch only."
