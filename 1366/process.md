# №1366 "Tiguex Dawn-to-Dusk" (raven-chacon RC7, PP589)

A city-scale score after Chacon's *Tiguex* (2025): a sepia lithograph-style map
with 20 movement-sites, following the viewer's LOCAL time. Each hour a different
movement's voices enter from a different screen edge — broadcast time the viewer
joins, never changes.

## Frame one (rendered 2026-11-01, hour 10, noon)

Sepia map field (#C9A86A) filling the frame, with a smooth winding river in
river blue (#4A6B8A), faint contour waves, and faint road lines. Exactly 20
movement markers sit at seeded map sites (glyph types cycle: circle-dot,
chevron, arc, cross, diamond), each with a small pseudo-script label mark
(dash plus dot pair) beside it — never letters, never readable words. The
current hour's site (hour % 20) carries a ring in the hour tint. Small
dot-with-stem voice glyphs drift in from the specced edge for the current hour.

At the render hour (10, noon), the tint is noon #F2E6C9 at flat alpha 0.14 and
the voices cross from the east edge toward the west edge ("midday singers
crossing").

## The clock (the adaptation that matters)

This is a CLOCK-PIECE by design, in the Turrell/Irwin precedent line: the
picture is a pure function of local time quantized to whole minutes. There is
no load-time animation phase anywhere in the piece — the rAF loop simply
redraws the current quantized minute each frame, so the picture updates at
minute boundaries and the day runs as it runs.

Consequences, all deliberate:

- The 24-hour cycle is NOT compressed into a watchable loop. Compression would
  break the broadcast-time rule. Instead the piece shows the movement whose
  hour is current, with that hour's voice drifting in from its specced edge,
  and the map tint following the same hour.
- Hour → tint/edge mapping: 05–08 dawn (#E8A87C, alpha 0.22, voices from the
  east edge, "dawn trumpet"); 09–16 noon (#F2E6C9, alpha 0.14, voices crossing
  east→west, "midday singers crossing"); 17–20 dusk (#7A3B4F, alpha 0.28,
  voices from the west edge, "dusk low strings"); 21–04 night (#101820, alpha
  0.42, voices from the north edge, faint night movement).
- Voice motion within the hour: 12 voices, voice k entering at minute k×5,
  traveling from its edge toward the current movement's site (or across the
  field for the noon crossing) over the rest of the hour, with a smoothstep
  fade-in over the first 15% of its travel and fade-out over the last 20%,
  plus a global hour envelope fading in over minutes 0–10 and out over
  minutes 50–60 as the movement's hour passes.
- The shipped thumb is a snapshot of the render hour (hour 10, noon). A
  re-render in a different hour legitimately differs; within the same minute
  it is byte-identical (verified: two 720×720 renders at 10:20 compared
  identical).

## Interaction

Drag pans the map. The map world is the viewport plus a 360 px margin on every
side; pan is clamped to ±180 px in each axis so the map always covers the
frame. There is no tap action, no skipping ahead, no reload, no controls of
any kind. A probe harness (stubbed canvas/window, the piece's own pointer
listeners) confirmed a 100 px right drag shifts every map path coordinate
exactly +100 px in x.

## Audio decision

Voices are VISUAL drifts only. No AudioContext exists in this piece. The
brief permitted tones inside a drag gesture, but the score's broadcast-time
rule is carried fully by the visual drift, and silence keeps the piece inside
the strictest reading of the no-autoplay rule.

## Text decision

No readable English anywhere except `<title>`. Map labels are invented
pseudo-script marks (dash plus dot pairs) beside each site glyph. Device
locale is never read and no real place name is ever rendered — a
locale-derived real name would be readable English and would break
frame-one reproducibility across devices.

## Technique

Canvas 2D throughout. No offscreen canvas, no gradients (the hour tint is a
flat-alpha fill), no shadowBlur, no Path2D, no createElement, no
getUserMedia, no AudioContext. Every arc uses its own beginPath with a
moveTo first (node-canvas batched-arc quirk). Canvas size comes from the
Visual Viewport API with resize listeners on visualViewport and window;
canvas is pinned in draw() via style width/height in px. Phone detection via
window.screen physical size (min dimension < 700 px) with aspect
h > w*1.15 as fallback; the composition is field-like and goes full-bleed
on phones (verified at 390×844, same composition, no clipping). All
non-clock randomness comes from a seeded mulberry32 PRNG (seed 1366000,
per-site/per-hour offsets of index×7919), never Math.random. The rAF loop is
a plain function declaration behind a typeof guard.

## Fix rounds

One: the river first rendered as a sharp zigzag polyline (control points
jumping ±0.16 of map width between rows). Rebuilt with midpoint quadratic
smoothing so it reads as a winding river. Renders re-done after the fix.

## Verification

- Rendered at 1280×900, 390×844, 720×720 with
  `node ~/workspace/tools/render-piece.js`; all three inspected.
- Within-minute determinism: two 720×720 renders at 10:20 EST byte-identical.
- Map: sepia field, smooth river, contour waves, road lines; 20 sites by
  construction (loop count) with the current hour's site ringed; crossing
  voice glyphs visible entering from the east edge at the render hour.
- Drag-pan probe: 100 px drag → exactly +100 px shift in map coordinates.
- Token scan clean: no Math.random, createElement, Path2D, gradients,
  shadowBlur, AudioContext, getUserMedia, or locale/geolocation reads.
