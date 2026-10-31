# No.822 - Rêve Parisien

EXPANSION #100 rhys-chatham, PP7. Chatham performed Rêve Parisien in
front of Jacob Kassay's silvered paintings; this piece restages that
encounter. Two foggy silver panels hang side by side on a dark ground,
and a thin electric-white trace, the trumpet line, arcs between and
across them. No trumpet is drawn. The line is the instrument.

## Concept

The panels are Kassay silver: a surface that holds a room only as fog.
Each panel carries a soft reflection field (a bright window patch, a
warm patch, dim sunken shapes) that is never still, so the metal never
freezes into flat grey. The trace is a musical phrase drawn as a smooth
curve across both panels; every 8 seconds a new phrase replaces it,
drawing itself in over 1.5 seconds while the old one fades. The viewer
is a body in the room: dragging is the viewer's passage, shifting the
reflection field on both panels and bending the trace toward the drag;
on release, both relax home. Double-tap reseeds the phrase sequence,
the prompt's own specced mechanic.

## Construction

Single self-contained index.html, canvas 2D only, no external assets.

- Silver engine (borrowed from the Kassay pieces, No.808/809): each
  panel is precomputed seeded data in panel-relative units: a flat
  silver base, 18 soft clouding patches (nested low-alpha ellipses with
  per-layer center jitter), 1500 weave specks, and an oxidation field
  built as a per-cell threshold stain (seeded value noise times an
  inward falloff, drawn as small overlapping low-alpha rects, densest
  at the edge line, feathering to an irregular front). Top and bottom
  bands use the noise-front construction; vertical edges use a seeded
  strip variant, deeper on the outer edges (0.17) than the inner (0.09).
- Reflection field: four patches per panel (bright rect, warm blob,
  cool blob, dim rect) with parallax depths 0.50 to 1.00. Their drawn
  offset is the viewer shift times depth. The second panel mirrors the
  patch layout, so the pair reads as one room across two canvases
  rather than two clones; clouds, weave, and stain stay independently
  seeded per panel (seeds 822101, 822202).
- Viewer state is closed-form: completed drags decay exponentially
  (tau 1.6 s) after release, and an idle sway (sum of two slow sines)
  keeps the reflection in motion when untouched. The sway is exactly
  zero at t = 0, so frame one sits settled at center.
- Phrase generator: phrase k of a segment is a pure function of
  (segment seed, k) via mulberry32(seed + k * 7919). Five anchors span
  the composition; their heights follow a seeded arc (40 percent of
  phrases dip instead of rise) with seeded jitter, clamped to the
  composition. Anchors are sampled through a Catmull-Rom spline
  (113 points) and stroked in three passes (wide low-alpha, mid, thin
  core) for the glow. Drag bend offsets the anchors by a sine weight
  peaking mid-phrase.
- Phrase clock anchoring: the first segment starts at t = -2 s, so at
  frame one (t = 0) phrase 0 is 2 s into its 8 s slot and its 1.5 s
  draw-in is complete; the trace is whole in the thumbnail. Draw-in
  progress and the previous phrase's fade are closed-form in t.
- Palette (strict): silver #B9BEC4, oxidation #8A5A2A, trace #F5F2E8,
  ground #0C0D10. All other tones are mixes of these: silver toward the
  ground for dim and deep tones, silver toward the trace tone at 0.30
  for the brightest reflection, silver toward the oxidation at 0.18 for
  the warm patch, oxidation toward the ground for the deep stain.
- Layout: Visual Viewport sizing with resize listeners on both
  visualViewport and window; canvas pinned in px in draw(); phone
  detection via window.screen (min dimension under 700) with aspect
  fallback. On phones the panels shrink and stay paired side by side
  (the dialogue is horizontal); page ground is the ground tone.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and compared with cmp;
  byte-identical. Frame one is the synchronous draw at t = 0; no
  Date.now anywhere in the drawing path; all randomness is seeded
  mulberry32 streams consumed at layout.
- First render caught a real bug: the Catmull-Rom t-squared
  coefficient was missing its -p3 term, so the trace exploded into
  spikes running off the composition (sampled x reached 1.38).
  Coefficient fixed; sampled range verified inside the anchors' span.
- Second bug: mix() originally parsed only hex strings, so chained
  mixes (panel base, stain tones) produced NaN colors and the canvas
  silently kept the previous fill, which killed the silver base and
  rendered the oxidation in leftover weave grey. mix() now parses
  both hex and rgb() strings; after the fix the amber creep reads on
  all edges and the panels sit at full silver.
- Patch softness passes: reflection alphas lowered (bright rect 0.40),
  rect inset deepened to 0.34, blob layers raised to 15 and cloud
  layers to 12 to break up concentric banding.
- Read-backs: desktop and thumb show two foggy silver panels with
  amber edge creep, soft bright and dim reflections (mirrored between
  panels), and one smooth white trace arcing across both. Mobile keeps
  the pair whole and centered, nothing clipped.
- Deviations from the prompt: none of substance. Two recorded choices:
  on phones the panels shrink side by side instead of stacking (above),
  and the brightest silver mix runs toward the trace tone rather than
  the ground, since a reflection brighter than the base silver cannot
  be mixed toward a darker ground.
