# №1410 "Degrees of Deaf Rage" (christine-sun-kim CS3, PP633)

## What it is

A panel of six angle diagrams on paper #e8e2d4. Each panel holds one
protractor-style angle meter (vertex, fixed arm, moving arm, red arc, steel
tick marks every 15°) and one short incident label. The angle of each arc
and the amount of charcoal stipple in its panel both measure the feeling:
wider angle, heavier charcoal. The angriest panel — the curators/salary
label — sits off-center (row 2, col 1 on desktop), larger than its
neighbours, and visibly the dirtiest.

## Prompt fidelity

- Six panels in a loose grid sharing row baselines; angles vary wildly
  (frame-one angles span roughly 30° to 140°).
- Angles slowly open and close like jaws, each at its own seeded rate
  (periods 9–20 s, amplitudes 6–18°).
- Charcoal density breathes with angle: stipple count runs from ~30 dots
  at the narrowest angle to ~410 at the widest, plus a density boost on
  the anchor panel.
- Dragging an angle's arm opens or closes it, and the charcoal in that
  panel thickens or thins to match; on release the breathing resumes
  around the dragged angle with a phase reset, so there is no jump and
  history never rewrites.
- Labels stay fixed and readable; the measurement stays honest.

## Text (explicit prompt exception)

The prompt specs the labels as short plain text sprites carrying the
artist's own dry incident phrasings, kept verbatim and brief, and says
they stay fixed and readable. The piece carries the prompt's own two
example phrasings verbatim — "museums with zero deaf programming" and
"curators who think it's fair to split my salary fee with interpreters" —
plus four more short labels in the same dry register (a meeting held
without an interpreter; a caption that says only "[music]"; a phone call
treated as the only way to reach me; a lecture with no visual access).
No other readable text exists besides `<title>`. No shouting text, no
generic anger imagery, no decorative protractors, no panel whose angle
measures nothing.

## Study-wide rules

Touch/drag, never click-to-reload; seamless loops; pseudo-gestures only
(not applicable here — no gestures are depicted); never a piece that asks
the viewer to "experience deafness" by muting or muffling. The piece is
about sound politics and access, not imitation. No audio at all — the
measurement is the subject, and no AudioContext, getUserMedia, offscreen
canvas, gradient, shadowBlur, Path2D, or createElement appears anywhere.

## Adaptations

- Each panel is an angle meter (vertex, two arms, arc) with a
  charcoal-density parameter tied to angle; charcoal is seeded noise
  stipple (420 precomputed points per panel, drawn as 2×2 filled rects
  at soft alpha), never a gradient or canvas-fade.
- All motion is closed-form over piece time and recorded drag events:
  jaw breathing is a sine per panel; drag is a live angle that becomes
  the new breathing base on release (phase reset, no jump).
- Node-canvas quirks honored: every fading alpha is rounded to 4
  decimals before stringifying (scientific-notation alphas parse as
  opaque in node-canvas); dots are filled rects; every arc gets its own
  beginPath.
- Determinism: synchronous first frame at a constant phase via a boot
  flag (frame one = draw(0), clock starts only with the rAF loop, which
  is a plain function declaration behind a typeof guard); all randomness
  from a seeded mulberry32 PRNG (seed 1410000, per-panel streams at
  1410000 + index·7919), never Math.random.
- Viewport from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() with
  canvas.style.width/height in px. Phone detection via window.screen
  physical size (min dimension < 700 px) with aspect h > w·1.15 as
  fallback. Desktop uses a loose 3×2 grid with the anchor panel wider;
  phones use a 2×3 grid keeping the same composition, page ground in the
  piece's own paper color.

## Fix rounds

One fix round during the build: the anchor panel was first assigned to
index 1 (top-row middle), which overlapped the first panel and hid it
while doubling its labels. The anchor is now index 3 (row 2, col 1 on
desktop), the label order was rearranged so the curators/salary label
sits on the anchor panel, and all renders were re-done after the fix.

## Verification (forced-time probe harness, stubbed rAF driving the piece's
own loop, pointer events to its own listeners)

- Two fresh instances render byte-identical frame-one images; the thumb
  re-renders byte-identical.
- Panel 5 (lecture panel) frame-one angle 31.5°; t=0 vs t=5 differ in
  805 px inside that panel (jaws breathe).
- Dragging panel 5's arm tip to a 150° angle: dragged vs undragged at the
  same clock time differ in 2,910 px, and stipple-aware deviating pixels
  rise 3,931 → 5,635 (charcoal thickens with the angle).
- Anchor panel dark-pixel count 905 vs 532 for the small-angle panel 5
  (anchor visibly dirtiest).
- Desktop (1280×900), mobile (390×844), and thumb (720×720) renders all
  inspected: six panels, labels readable, angles varied, anchor wider
  and dirtiest, no clipping on phones.
- Token scan clean: no AudioContext, getUserMedia, createElement,
  Path2D, shadowBlur, or gradient tokens in index.html.

## Files

- index.html — md5 cc24e7df172ce612f9dd4746ade20236
- thumb.png (720×720), qa-desktop.png (1280×900), qa-mobile.png (390×844)
