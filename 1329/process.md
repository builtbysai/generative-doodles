# №1329 "God Painting" (rashid-johnson RJ2, PP496)

## Source
Rashid Johnson's God Paintings (Hauser & Wirth Paris, "Anima," 2024;
Château La Coste 2026): vesica-piscis forms carved into a layer of red oil
paint, applied with brush and palette knife, arranged vertically so the
repetition takes on a meditative quality.

## Frame one
A vertical canvas in deep Anxious Red (#B3121B), thick impasto suggested by
900 seeded flecks in flat alpha. Into the wet red are carved dark
almond-shaped vesica-piscis forms (#4A0B0E insets with #1F0608 undercut
shadows offset down-right and #D93B2C knife-ridge highlights along the
upper edge), arranged in 7 uneven rows of 4-7 with irregular vertical
rhythm and slight horizontal jitter. Canvas edges keep an 8% breathing
margin. Exactly one "broken" almond (row 2, third from left at frame one)
is half-carved and abandoned: its upper half stays red, cut by a dark
baseline. The almond is the ONLY form; the red field IS the world.

## Motion (all closed-form over piece time and recorded events)
- Breathing: a slow 12-second swell/contraction cycle across the whole
  field, each row phase-offset, never fully synced.
- Touch: tapping an almond deepens it (carve animation darkening over
  0.5 s) and it slowly re-fills with red over 20 s.
- Drag: dragging across the canvas leaves temporary knife-ridge streaks
  in ridge highlight color, fading over 6 s.
- Never click-to-reload. No text, no symbols inside the almonds, no
  mandala symmetry, no kaleidoscope, no glowing neon.

## Determinism
Frame one is drawn synchronously at exactly t = 0 via a boot flag; the
clock starts only with the rAF loop. All layout, flecks, and the broken
almond come from seeded mulberry32 streams (seeds 1329000/1329001), never
Math.random. Resize redraws at the current piece time, never restarting.

## Adaptations
- Carve effect as flat-alpha inner shadow and dark inset shapes; NO
  gradients (QA renderer cannot render them reliably).
- Impasto texture from seeded procedural flecks, never a photo texture.
- Phone: full-bleed red field; layout keyed to viewport dimensions.

## QA
Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, 720x720
thumb. Desktop and mobile both read as a red oil field of carved dark
almonds with one half-carved broken almond. Thumb rendered three times,
byte-identical, matching the shipped thumb. Token scan clean of
Math.random, createElement, AudioContext, getUserMedia, shadowBlur,
gradients, and offscreen canvas (one comment states Math.random is not
used). No fix rounds required; first renders read correctly.
