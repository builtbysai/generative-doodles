# The Sempere Account — process notes

## What it is
Study #215 marcelo-soria-rodriguez, prompt MSR3 Identity Vector. His
first code system reborn: a Sempere-style field of soft geometric cells
and line fans, where the entire parameter set is derived from a small
dataset describing an identity. Feed it a different identity and the
whole drawing re-parameterises into a visibly different portrait: same
grammar, different person.

## Driver
Identity as parameter: one grammar, many portraits. The system reads a
small identity dataset and the drawing re-parameterises; the watchable
behavior is the system "reading" the data and choosing, stroke by
stroke, who to draw.

## Design decisions
- Demo identity set (five invented identities, no real personal data):
  alba-ruiz [3, 17, 64] tags weaver, quiet; kofi-mensah [11, 5, 29]
  drummer, bright; yuki-tanaka [2, 23, 81] gardener, slow; nils-berg
  [9, 31, 47] sailor, north; priya-nair [5, 13, 97] coder, monsoon.
- Mapping: FNV-1a hash of the identity string (handle, numbers, tags)
  seeds mulberry32. The hash drives subdivision depth (4 to 6), an
  extra-split chance per leaf, fan count (3 to 6) with base angle,
  spread, ray count and radius per fan, accent choice (0 rust, 1 teal,
  2 plum) and accent weight (0.30 to 0.45), and the cell palette
  weights. The glyph derives from a dedicated sub-hash of the identity
  string so the demo set carries five distinct glyphs.
- Paint machine (from MSR2's device): every portrait is a stroke list
  built from its parameter vector, cells first in reading order, then
  fan rays, then the glyph last. A read takes 6 s; strokes appear in
  order, so the "reading" is visible. Frame one is identity 0 sixty
  percent read (PHASE0 3.6 s): all 20 cells plus 49 of 94 rays.
- Cells: guillotine subdivision of the square with paper gaps between
  tiles, flat fills from the skewed palette, ink outlines at 0.35
  alpha. One cell in five carries a small inner mark (dot, tick, ring).
- Fans: 3 to 6 seeded centres, rays in ink (62%), accent, gold, slate;
  alpha 0.35 to 0.65. Portraits are clipped to the square, so no ray
  escapes onto the page ground.
- Split compare (the spec's recommended reading): on tap, the previous
  portrait holds the left half while the new identity paints
  progressively into the right half, divided by an ink line; when the
  read completes, the divider sweeps left over 1.5 s and the new
  portrait takes the full frame. Tapping mid-read freezes the previous
  portrait at its read progress in the left half.
- Glyph: one small abstract mark in accent colour, hidden in one
  corner per identity. Types: circle and cross, triangle, three dots
  in an L, arc and dot, square and diagonal, two concentric circles.
- Palette: warm grey ground #E8E2D6, dusty gold #C2A15A, slate blue
  #5A6E8C, warm grey #B4AA97, ink #23211E; accents rust #B4552D,
  teal #2F7A6E, plum #6E5A8A.
- Composition: square, centred, the cell field fills the square edge
  to edge; page ground is the piece's own warm grey. Title "The
  Sempere Account" and date "2006 · 07 · 03" on a solid paper plate,
  top centre. No hint text in the piece (the batch spec: gallery
  notes carry the interaction cues). No em dashes in visible copy.
- Interaction: tap cycles to the next demo identity and repaints.
  No text input field, no charts, bars, or data text anywhere; the
  only fillText calls are the title and date. Never click-to-reload.

## Deviations from the prompt
- The prompt allows the viewer to enter or pick an identity; per the
  batch spec adaptation and the task brief there is no text-input UI.
  Tap cycles a fixed authored table of five seeded demo identities.
- The prompt's side-by-side compare is realised as the split-field
  read described above (previous portrait left, new portrait painting
  right, divider sweep to full frame), not a permanent two-up layout.
- Five demo identities instead of the batch spec's three, per the
  task brief (at least four).

## House rules applied
- Boilerplate adapted from №1630: Visual Viewport sizing with resize
  on visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  (min dimension under 700 px) with aspect fallback (h > w * 1.15);
  square centred composition, page ground the piece's own background;
  one synchronous frame at load; requestAnimationFrame guarded with a
  typeof check so node-canvas QA works.
- Deterministic fixed-phase first frame: frame one is at 3.6 s into
  identity 0's read, so the thumb shows a partly read portrait, never
  a blank field and never a finished painting. No Math.random anywhere;
  all randomness is the seeded PRNG. No localStorage: every visit
  starts at identity 0, so frame one is identical in the browser and
  in the harness.
- Flicker: none by construction; the only motion is the 6 s read and
  the 1.5 s divider sweep, well below 14 Hz. Reduced-motion: draws the
  completed portrait immediately; tap jumps straight to the next
  completed portrait.
- No offscreen canvas, no gradients, no shadowBlur, no audio.

## Asserted counts (probe-measured)
- Five demo identities. Parameter vectors, all distinct:
  alba-ruiz: depth 4, 20 cells, 3 fans, 94 rays, accent teal, skew
  0.446, glyph corner 3 type 2, 115 strokes.
  kofi-mensah: depth 6, 66 cells, 4 fans, 83 rays, accent rust,
  skew 0.389, glyph corner 1 type 1, 150 strokes.
  yuki-tanaka: depth 6, 69 cells, 3 fans, 78 rays, accent rust,
  skew 0.368, glyph corner 3 type 5, 148 strokes.
  nils-berg: depth 4, 18 cells, 4 fans, 91 rays, accent teal,
  skew 0.373, glyph corner 3 type 4, 110 strokes.
  priya-nair: depth 6, 65 cells, 3 fans, 87 rays, accent plum,
  skew 0.449, glyph corner 2 type 4, 153 strokes.
- Cell counts take three distinct values (18, 20, 65, 66, 69); all
  five fan-angle sets differ; accents cover all three (rust, teal,
  plum); all five line densities differ; all five glyphs differ.

## QA
- Probe harness (/tmp/probe-1634.js, 22 checks, all passed):
  parameter vectors differ as above; paramsFor(0) reproducible
  including the full stroke list; five taps cycle back to identity 0
  with a byte-identical parameter vector; repaint progresses (0.5 s
  vs 3 s: 182,173 px differ; 3 s vs 5.9 s: 8,935 px differ; settled
  portrait differs from mid-read by 235,950 px); settled portrait
  pixel-stable over time (0 px differ); split left half holds the
  previous portrait exactly (0 px differ) while the right half shows
  the new identity (210,656 px differ); only two fillText calls
  (title, date); no input element, no Math.random, no chart/bar
  wording, no em dash in visible strings.
- Rendered from the actual script with node render-piece.js at
  1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three
  inspected visually. Desktop: teal-skewed cell field with two fans
  reading, title and date legible on the paper plate. Mobile:
  square centred, page ground warm grey, copy legible, rays
  contained. Thumb matches the desktop composition.
- Probe renders inspected: completed identity 0 (all three fans, glyph
  bottom-right), mid-split (teal identity 0 left, rust identity 1
  painting right, divider at centre), settled identity 1 (rust
  portrait, 66 fine cells, glyph triangle top-right).
- Fix round (1): the first build let fan rays escape the square onto
  the page ground (visible in the identity 1 completed render).
  Portraits are now clipped to the square in drawPortrait; probes
  re-run clean and the renders re-inspected.
- Thumb byte-identical across two consecutive renders:
  md5 16ed13c5332f6c4c677c670114e68d0d, both runs.
  index.html md5 ae565073bdb9c54f382baddd356e2232.
