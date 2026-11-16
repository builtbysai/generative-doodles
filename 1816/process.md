# No.1816 "The Unfretted String" (AD1, PP1063)

## Source
Prompt block arnold-dreyblatt, AD1 (PP1063), EXPANSION #238, TASKS.md.
Reference: studies/arnold-dreyblatt.md, M1 (the excited string), M2
(nodal regions). Opens EXPANSION #238 arnold-dreyblatt. Gallery date
2007 · 01 · 01 (formula date 2002-01-10 + 1817 days).

## Driver
One wire, one root. A single piano wire is pinned at full speaking
length for the whole piece while a bow keeps a steady rhythmic stroke
and the contact point slides between nodal fractions. The harmonic
partials bloom as translucent rings above the wire, each ring colored
by the just-intonation partial sounding when it was born. Nothing is
fretted, nothing bends, nothing retunes; the fundamental never moves.

## What was built
- One bare steel grey wire (#B9BDC4) stretched horizontally across the
  full frame at 0.52 of field height, from 0.06 to 0.94 of field width,
  pinned by dark steel anchor blocks at both ends. The wire is drawn
  at the same place at every t: it never shortens and the root stays
  pinned.
- A warm bow-wood bow (#8A5A33, frog #2E2118, pale hair #D8CDB8)
  entering from below, tilted 15 degrees off vertical with the tip
  leaning left. It strokes along its own axis with a 4 s period
  (down then up), amplitude 0.045 of field height, and the contact
  point slides between the nodes on a fixed 60 s cycle.
- Rings bloom at the contact point every 4 s and live 9 s: radius
  grows to the harmonic's max radius, center rises 0.12 of field
  height, alpha fades from 0.55 to 0, with a fainter inner echo ring
  at 0.72 radius and 0.35 alpha. Each ring takes the hue of the
  harmonic sounding at its birth.
- Node cycle, fixed: 20 s per node, 1/2 then 1/3 then 1/4, then
  repeat. The last 3 s of each dwell slide smoothly to the next node.
  Harmonic 2 sounds over 1/2, harmonic 3 over 1/3, harmonic 4 over 1/4.
- Contact glow: a small pale gold glow marks where the hair meets
  the wire.
- Watch-only. No pointer or keyboard handlers are registered at all,
  so input does nothing by design.
- True time: after the fixed first frame, phase is computed from a
  wall-clock start captured at load, so dropped frames never lose time.
- Reduced motion: prefers-reduced-motion renders a still frame.
- House rules: single HTML file, inline JS/CSS, canvas 2D only, no
  document.createElement; Visual Viewport sizing with resize listeners
  on visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  (min dimension under 700px) with aspect fallback; wire full-width
  on both phone and desktop, square field on desktop, full-bleed on
  phones, page ground deep black (#0B0B0D); one synchronous frame at
  load; all requestAnimationFrame calls guarded with a typeof check.
  Title/date/hint plates drawn on canvas. Flicker is 0.25 Hz by
  construction (4 s bow stroke, 4 s ring births), far below 14 Hz.

## Just-intonation ratio table
Ring radius and hue map to the overtone series. Max radius is a
fraction of field width; radius grows as (age / 9) ^ 0.75 of that max.

| Harmonic | Ratio | Node | Max radius | Hue |
| 1 | 1/1 | open string | 0.34 | brassy gold #D9A441 |
| 2 | 2/1 | 1/2 | 0.28 | gold-pale #E3C078 |
| 3 | 3/1 | 1/3 | 0.22 | pale blue #A9C6DE |
| 4 | 4/1 | 1/4 | 0.17 | copper #B87333 |
| 5 | 5/1 | 1/5 | 0.13 | pale copper #D99A6C |
| 6 | 6/1 | 1/6 | 0.10 | steel blue #7FA3C4 |

The node cycle exercises harmonics 2, 3, and 4, per the prompt. The
lookup is implemented for all six harmonics in the HARMONICS table.

## Fixed phase (frame one, t = 30 s)
Deterministic, reproducible every load; no wall clock is read for
frame one. Node 1/3 is held (dwell 20 to 40 s), so the contact point
sits at one third of the wire and the sounding harmonic is 3
(ratio 3/1, pale blue). The bow is at stroke center
(sin(15 PI) = 0), mid-stroke. Two rings are alive: born at 24 s
(age 6.0 s, radius 0.66 of max, fading) and born at 28 s (age 2.0 s,
radius 0.22 of max, bright), both pale blue. Next node change at
t = 40 s (slide 37 to 40 s to node 1/4, copper); next ring birth at
t = 32 s.

## Deviations from the prompt
- Wire shimmer: the prompt says the wire never bends, so the build
  adds only a faint standing shimmer (amplitude 0.002 of field height,
  zero at the anchors, three half-waves) so the sounding string reads
  as alive rather than dead. The wire never shortens, never frets,
  and the root never moves.
- Table scope: harmonics 1, 5, and 6 are in the implemented lookup
  table but the 60 s node cycle never sounds them, since the prompt
  fixes the cycle to 1/2, 1/3, 1/4. No other deviation.

## QA
Rendered the actual script with node ~/workspace/tools/render-piece.js:
- 1280x900 desktop: PASS. Wire straight across the full square field
  at 0.52 height with anchors at both ends, bow mid-stroke crossing
  at one third of the wire, two pale blue rings blooming above the
  contact point, title/date and "Watch only." plates legible, nothing
  clipped, no plate overlapping the wire or the bow.
- 390x844 mobile: PASS. Full-bleed field, wire full width, bow
  crossing at one third, rings visible above the wire, plates legible,
  nothing clipped.
- 720x720 thumb.png: PASS. Same fixed-phase frame as desktop, wire,
  bow mid-stroke, and both rings reading at first glance. Thumb was
  rendered last from the final index.html.
- Determinism: thumb rendered twice independently, md5 identical
  both times (e0a438b22e163ae6ca8ea0379406b093).
- One fix round: the first render showed the wire shimmer at 0.0035
  of field height reading as a wavy wire, so the amplitude was cut to
  0.002 and all three sizes were re-rendered and re-inspected.
- No post-gate edits were made after the final renders.
