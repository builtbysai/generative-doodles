# №1703 "Droste Bloom" - PP950 / PSA8, EXPANSION #223 piter-pasma (complete)

Date: 2006 · 09 · 10. Gallery note: "A translucent pink-peach blob holds an infinite Droste recursion in its glowing core. Drag to move the recursion focus."

## Build
Genuary 2024 day 3, "THE DROSTE EFFECT". A translucent pink-peach blob
floats large at center frame on deep plum-black, with a soft layered halo
behind it and five seeded iridescent arc hints (pale cyan, lavender, gold)
hugging its wobbly edge. Inside the blob, the same blob shape repeats as
nested scaled copies descending into a glowing core: each level carries a
warm inner glow and a thin rim ring in peach, amber, lavender, or pale
pink, and the stacked translucent fills brighten toward the core like
subsurface glow. The zoom is a continuous scale phase with a 24 second
wrap cycle; the blob breathes on a 9 second cycle at plus or minus 3.5
percent scale. Drag moves the recursion focal point: deeper levels shift
progressively toward the pointer (the outer blob stays put, so the tunnel
bends), with fast damping while dragging and a slow exponential recenter
over about 10 seconds after release. Silent: no audio, no particle
glitter, no camera shake.

Template: live №1700 (structure, plates, sizing, hint) mirrored per spec.

## Recursion and the seamless wrap
Levels are drawn at scales R * 0.52^(i - z) for i = 0..9, clipped to the
blob outline, where z is the zoom phase in [0, 1). At z = 1 each level
occupies exactly the position of the level above it at z = 0, so the rim
set is identical across the wrap. Two alpha fades keep the stacked fill
identical too: the outermost level fades to zero as its rim leaves the
blob (smoothstep over its scale from R to R / 0.52), and the innermost
level fades in with z (alpha = z), so the layer count at every radius is
the same at z = 0 and z = 1. A constant body fill at alpha 0.12 keeps the
blob present mid-cycle while the outermost level is fading. Probe numbers
(/tmp/probe1703.js, node-canvas): 7 levels analytic at frame one (scale
over 4 px, alpha over 0.03), 6 rim rings counted as luminance peaks on a
horizontal ray through the center (offsets 13, 25, 48, 94, 180, 347 px),
both above the 5 level acceptance bar. Wrap check: mean absolute pixel
difference z = 0 vs z = 1 is 0.098 per channel (max 66 on a 2 px central
dot), and z = 0.999 vs z = 0.001 is 0.131 (max 67, same dot): no visible
pop at the phase wrap. Focus check: a probe frame with focus (60, -30)
shows the tunnel bending toward the upper right with the outer blob
unmoved. Focal damping rate is 5/s while dragging (about 63 percent of
the way in 200 ms) and 0.3/s on release (about 95 percent recentered in
10 s).

## Deviations
- WebGL-to-2D substitution (per task brief and house rules): node-canvas
  has no WebGL, so the prompt's WebGL2 shader with log-polar domain
  repetition is a 2D construction: nested scaled and translucent copies of
  the blob drawn recursively, with the zoom realized as the continuous
  scale phase above. The visible behavior matches the prompt: infinite
  recursion, slow inward tunnel, breathing blob, drag-bent focus.
- The prompt's glassy refractions are suggested by the layered halo, the
  warm inner glow per level, and the iridescent rim arcs, not by a
  refraction shader.
- No gradients, no shadowBlur, no Path2D, no createElement, per house
  rules. Glow is layered translucent ellipse and blob fills; fading alphas
  are rounded to 4 decimals before stringifying.

## House rules
Visual Viewport sizing, resize on visualViewport and window; canvas pinned
in draw() via style width/height in px; phone detection via window.screen
(min dimension under 700 px) with aspect fallback (h > w*1.15); square
stage on desktop, full-bleed on phones, page ground set to the piece's own
deep plum-black; one synchronous frame at load; requestAnimationFrame
guarded by a typeof check; deterministic fixed-phase first frame (zoom
phase 0, breath scale 1, focus centered, seeded RNG mulberry32(1703) only
for the rim arcs, no Date.now()/Math.random() affecting frame one); no em
dashes in visible copy; title/date/hint plates drawn on canvas; drag
interaction only, never click-to-reload, no buttons.

## QA
Rendered with node render-piece.js and inspected all three sizes.
- Desktop 1280x900: blob large at center with generous dark surround;
  six rim rings legible from the edge to the glowing core; iridescent
  arcs hug the edge; title plate top left, hint plate bottom left.
- Mobile 390x844: full-bleed; blob centered and legible, rings read
  clearly, plates do not clip.
- Thumb 720x720 (thumb.png is this render): recursion and halo legible.
- Mid-cycle frame (z = 0.5, /tmp/1703-mid.png): rings grown outward,
  core still bright, blob edge holds; no emptiness mid-cycle.
- Focus frame (/tmp/1703-focus.png): tunnel bends toward the pointer.
- Determinism: thumb re-render byte-identical (md5 d15349cf2bf318c16370eea2b5397b15).
- Fix round: first gate showed the iridescent arcs floating off the
  wobbly blob edge as stray rings; fixed by stroking the arcs along the
  same radius function as the blob edge, and re-gated after the fix.

## Files
- index.html - md5 ae621d66bcb3c7ef0dbb075ed5301b10
- thumb.png - md5 d15349cf2bf318c16370eea2b5397b15 (720x720 render)
- process.md - this file
