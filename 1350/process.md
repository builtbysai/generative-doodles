# №1350 "Flag" — eric-gottesman EG7 (PP573)

## The piece

A wall of "book pages" — a 4×3 grid filling ~80% of the frame on a dark
wall ground (#1C1A16). Each page holds ~14 rows of pseudo-text dashes
(#8A8272 on #E4DCC8, with a #CFC4A8 shade strip along the bottom edge):
short gray dashes of varying lengths, ragged ends, occasional indents
and sparse rows. No readable text anywhere — dashes only, never
letterforms, per the study-wide rule.

Every cycle a squeegee pass sweeps down the wall, laying a bold vermilion
(#B03A2E) emblem across the pages; where the emblem lands, the
pseudo-text is replaced by flat vermilion. Between passes the pages
slowly regenerate their text-blocks, only to be printed over again.

## Loop (25 s, watch-only except tap)

- Pages full (4 s) — frame one opens here.
- Squeegee pass (3 s): a dark printer's bar (#3A3A3E) travels
  top-to-bottom; the emblem is revealed progressively under the bar.
- Dwell (1 s): bar parked at the bottom edge, emblem fully revealed.
- Printed hold (5 s): emblem full, bar gone.
- Regeneration (8 s, staggered): each page's text-block fades back
  over the emblem, page by page (5 s per page, starts staggered over
  3 s), until the wall is whole again.
- Rest (4 s): pages full, then the cycle repeats with a fresh emblem.

## Interaction

TAP = an early squeegee pass with a fresh emblem variant (new seed,
same family of marks). Tap vs drag is separated by a 12 px movement
threshold. A tap during a pass is ignored — a pass is never restarted
mid-sweep. Drag does nothing. Tap never reloads.

## The emblem

Seeded geometric marks, invented, never a real symbol: each pass picks
2–3 distinct primitives from a family of 6 — ring, horizontal bar,
split disc (two filled semicircles with a gap), vertical bar, opposing
arc pair, diagonal bar — combined in flat vermilion. Variant k is drawn
from mulberry32(1351000 + k × 7919), where k counts passes started
(auto cycles plus taps), so every pass is reproducible from its event
history. The emblem is centered on the wall, spanning ~2 pages wide.
Cycle 0's variant is a split disc crossed by a horizontal bar.

## Adaptations (QA renderer)

- Pages and emblem are drawn directly on the main canvas — no
  per-page offscreens, no offscreen canvas anywhere.
- The pass is an animated clip: the emblem layer is drawn inside a
  clip rect whose bottom edge follows the squeegee bar, so the emblem
  appears exactly as the bar lays it down.
- Regeneration is a per-page alpha ramp: each regenerating page is
  redrawn (paper, shade strip, dashes) with globalAlpha easing 0→1
  over the emblem, so the text-block fades back in and the vermilion
  fades out beneath it.
- No gradients, no shadowBlur, no Path2D, no createElement, no
  AudioContext — the piece is silent. All flat color fields.
- Sizing from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() with
  style.width/height in px. Phone detection via window.screen
  physical size; the centered composition keeps its shape on phones
  and the page ground is the piece's own #1C1A16 ground. No hint text
  (no visible text except `<title>`).

## Determinism

Synchronous first frame at a constant phase via a boot flag
(frame one = draw(0); the clock starts only with the rAF loop). The
loop state machine is a pure function of piece time plus the recorded
tap list, simulated forward from t = 0 — so frame one and every loop
are reproducible. All randomness comes from seeded mulberry32 streams
(page layouts: 1350000 + page × 7919; emblem variants: 1351000 +
variant × 7919), never Math.random. The rAF loop is a plain function
declaration behind a typeof guard.

## Verification

- Rendered with the QA renderer at 1280×900, 390×844, and 720×720;
  all three inspected. Frame one: full wall of dash-textured pages,
  no emblem, no bar, at both sizes.
- Thumb rendered twice: byte-identical.
- Forced-time probes (temp harness driving draw(t) directly):
  t = 0 pages full, 0 vermilion px; t = 5.5 mid-pass, bar present
  (18,974 px) with the emblem's top portion revealed (40,089
  vermilion px); t = 7.5 dwell, full emblem (86,690 px) with the bar
  parked; t = 10 hold, full emblem, no bar; t = 17 mid-regeneration,
  emblem fading (11,092 px); t = 21/24 rest, clean pages, 0 vermilion.
- Tap probes: a tap at t = 2.0 starts an early pass (bar visible at
  t = 2.5); a second tap at t = 4.0, during that pass, is ignored —
  t = 6.0 shows the tap pass's hold phase (full emblem, no bar),
  not a restarted pass.
- Token scan clean: no Math.random, createElement, AudioContext,
  getUserMedia, gradients, shadowBlur, or offscreen canvas.
- Built clean on first pass; no fix rounds needed.
