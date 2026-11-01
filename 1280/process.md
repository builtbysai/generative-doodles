# №1280 "Beautiful Zameen" (jagdeep-raina JR1, PP439)

## Prompt

A hand-stitched textile on muslin: a central drawn vignette of farmers' hands
holding crops and photographs, in loose washes over a sepia-washed ground,
framed by a thick phulkari border of dense darn-stitch geometric cells. At the
base, a prayer-like sewn verse runs in wavy hand-stitched lines. Grounded in
Raina's *Beautiful Zameen* (2022) and *Chemical Cotton Flowers* (2021), with
the sewn verse "please strip them of these / chemical cotton flowers / let
them cling to peace" — on the Green Revolution's legacy and the dangers women
face in agricultural labor.

Palette (verbatim): muslin #E8DCC3; sepia ground #C9A87A; handspun-silk red
#B03A2E; phulkari mustard #D9A441; border indigo #2E3A5C; cotton-flower white
#F5F0E6; field green #6B7F4E; stitch shadow #4A3B2A; ground ink #171310.

## What was built

- Square composition, centered, on the piece's own ink ground (full width on
  phones). The phulkari border occupies the outer 15% on all four sides: an
  indigo band carrying two dense rows of darn-stitch diamond cells per side,
  dashed outlines in mustard, red, and cotton white with center dots, each
  cell seeded with its own size jitter and rotation so the stitching reads
  hand-sewn, never machine-neat. A dashed mustard stitch line frames the
  vignette inside the border.
- Vignette: sepia wash blobs (flat alpha ellipses) over muslin; converging
  field rows in field green behind the figures (the low, kneeling viewpoint);
  two loose-wash draped figures, one in handspun-silk red, one in field
  green, with drape fold lines and sepia heads; their arms meet at center
  where two hands hold a small askew cream photograph with a sepia image
  inside, plus three crop stalks. Seven cotton plants stand in the
  foreground, stems with clustered white bolls.
- Verse band at the bottom of the inner field: three lines on wavy
  baselines (sine offset per word). Only Raina's actual English line is
  used; no Gurmukhi script is fabricated anywhere.

## Motion / interaction (all closed-form over recorded events + t)

- Verse stitch-in: 13 words stitch in one by one over 30 seconds (word i
  starts at i * 30/13 s, fades in over 1.8 s with a dashed red stitch line
  beneath it). At frame one (t = 0) no word is yet stitched; the band shows
  only the faint dotted guide curves of the cloth's marked lines.
- Border ripple: dragging across the border records touch points; each
  border cell displaces radially from the touch (exponential falloff with
  distance, sine oscillation, 1.2 s decay) and compresses (scale down to
  0.6) — the border "hardens," then relaxes.
- Breeze: after 4 seconds without pointer activity, a slow breeze passes
  through the cotton flowers (sway amplitude ramps over 3 s, 7 s sine per
  plant phase). At load the piece counts as long-idle, so the breeze is on
  at frame one.
- Never click-to-reload. No audio. No microphone.

## House adaptations

- Visual Viewport sizing with resize listeners on visualViewport and
  window; canvas pinned in draw() via style width/height in px; phone
  detection via window.screen physical size (min dimension < 700 px) with
  the aspect fallback; checked at 390 wide (square full-width, centered).
- Determinism (№343 rule, №1275 lesson): the synchronous first frame draws
  at exactly t = 0 via a boot flag; the performance.now() clock starts only
  with the rAF loop. Thumb rendered three times at 720x720 plus the shipped
  thumb: all four byte-identical.
- QA renderer limits respected: no requestAnimationFrame (typeof-guarded),
  no AudioContext, no document.createElement, no WebGL, no offscreen
  canvas, no ctx.filter, no shadowBlur, no gradients (all fills are flat
  alpha shapes); dots drawn as paired arcs with moveTo before every
  batched arc; wash ellipses preceded by moveTo.
- No visible text except <title> and the specced verse itself.

## QA

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (desktop), 390x844 (mobile), 720x720 (thumb); all three inspected.
- Frame-one read: indigo phulkari border dense with dashed diamond cells;
  muslin field with sepia washes; two draped figures holding a photograph
  between them, cotton plants in the foreground, converging field rows
  behind; verse band showing only faint guide curves at t = 0.
- Fix rounds: none required — first renders passed at all three sizes.
- index.html md5: 5b84cd754265f66593d7ce0b427bf917
