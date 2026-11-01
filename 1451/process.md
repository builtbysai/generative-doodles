# №1451 "The Bone Band, Unfolding" (tabea-blumenschein TB4, PP682)

## Prompt
A long paper strip folded like an accordion into five panels sits across the
frame; each panel holds one drawn scene of a band: skeletal-costumed figures
singing, a voodoo-doll figure dancing, a folk-costumed band celebrating,
figures doing tango steps. The strip unfolds panel by panel, left to right,
then refolds. Palette: paper cream #f2ead8, fold shadow #c8b898, ink
#1a1a1a, bone white #efe8d8, batik indigo #2a3a7a, batik rust #b84a1a, folk
red #c81a2a, folk gold #e8a81a, teal #1a7a6a. Background plain warm gray
#cfc8bc. Never a slideshow, never panels flipping like pages, never a video
player UI, never legible song lyrics, never click-to-reload.

## What was built
- Plain warm-gray ground; a horizontal paper strip across the middle of the
  frame, five equal panels, fold shading on the left edge of panels 1–4 and
  ink panel borders.
- Panel scenes, all stylised contour drawings with flat fills, never
  photorealistic, never legible text:
  1. Skeletal-costumed singers (bone-white bodies, rib lines, skull heads;
     mouths open and close).
  2. Voodoo-doll dancer (batik indigo body, rust patches, gold headband;
     foot taps).
  3. Folk-costumed band (drum and horn players in folk red, gold, teal;
     slight bounce).
  4. Tango couple (indigo and folk-red figures leaning together, arm link;
     gentle sway).
  5. Ensemble reprise (singer + dancer + folk player at reduced scale).
- Loop, 34 s total: panels unfold one at a time (~3 s each) left to right,
  hold ~4 s with micro-motion in the open panels, then refold in reverse.
- Drag right unfolds the strip under the finger panel by panel (continuous,
  never jumping); drag left refolds it; releasing resumes the slow unfold
  from the dragged progress.
- No panel's figure is visible until that panel is more than half open, so
  all five scenes are never visible at once except at full unfold. Frame one
  is the folded strip: five blank cream panels, no figures.

## Adaptations
- Strip as five panel rects with fold shading; unfold as a width tween per
  panel (folded strip ~70% of frame width, full width at full unfold) with a
  slight 3D-ish skew on the panel currently tweening.
- Figures drawn only when their panel is open, with micro-motion (mouth,
  foot) active only when the panel is fully open.
- Fully silent: no AudioContext at all. No offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, or text drawing. No getUserMedia.
- Fading alphas rounded to 4 decimals; dots as own-beginPath arcs or filled
  rects (node-canvas quirks).
- Determinism: frame one = draw(0) via boot flag, clock starts only with the
  rAF loop (plain function declaration behind a typeof guard); all
  randomness from mulberry32 (seed 1451000), never Math.random.
- House rules: canvas size from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in draw(); phone
  detection via window.screen physical size (min dimension < 700 px) with
  aspect fallback; centered composition keeps its shape, page ground takes
  the piece's own background color; checked at 390 wide with no clipping.

## Verification
- Rendered at 1280×900, 390×844, 720×720; all three inspected. Desktop
  frame one: folded cream strip, five panels, plain warm-gray ground, no
  figures. Mobile: same centered composition, no clipping.
- Thumb byte-identical across repeated renders, including a final re-verify.
- Forced-time probe harness (shimmed canvas/window matching render-piece.js,
  piece driven via window.__piece): t=0 redraw pixel-identical; t=34 equals
  t=0 exactly (loop closes); t=17 hold shows all five panels open (panel 0
  singers confirmed by ink-pixel count, 2766 vs 965 folded; saturated figure
  colours present in panels 1–4); t=7.5 shows panel 2 below the visibility
  gate (0 saturated px); t=17 vs t=17.6 differs by 8264 px (micro-motion
  live); t=26 refold shows panel 2's drum as blended folk colour over paper
  (231,176,132 vs paper 242,234,216); drag set to 0.6, release at t=20 holds
  0.6, draw(23) advances to 0.8 (unfold resumes); drag left to 0.2 works.
- Token scan clean: no Math.random, AudioContext, getUserMedia, Path2D,
  createElement, shadowBlur, gradients, or text drawing.

## Fix rounds
None needed.
