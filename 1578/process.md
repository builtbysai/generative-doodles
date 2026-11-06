# №1578 One Frame of Smoke — process notes

- Prompt: ayumu-nagamatsu AN3, PP825, expansion #208. Watch-only.
- Gallery: title "One Frame of Smoke", date 2006 · 05 · 08 (formula
  2002-01-10 + (N+1) days), note "One frozen curl of blue glass smoke;
  only the light moves. Watch the light orbit."
- Palette: ground #08080A; glass-smoke deep blue #2E5ECC, ice blue
  #9AC4E8, white-hot highlights #FFFFFF. Nothing else.

## Build

- Self-contained index.html from the №1575 template boilerplate
  (Visual Viewport sizing, canvas pinned in draw(), phone detection
  via window.screen with aspect fallback, rAF guarded by typeof,
  mulberry32 seeded with 1578, one synchronous frame at load).
- The frozen form is a precomputed noise-displaced tube: a short tail
  sweeping up from the lower left into a spiral curl (theta -2.1 to
  3.3 rad, radius shrinking inward), built once in buildForm() from
  the seed and never animated. The tube is drawn as 90 cross-sections
  of 9 concentric flat-alpha discs (deep blue outside, ice blue mid,
  white core), no gradients, no ctx.filter, no WebGL.
- Only the light moves: a point light orbits the crest on a 40 s loop
  (angle = fixed phase 0.8 + TAU * t / 40). It drives a visible light
  point with halo, a soft refracted pool on the ground below the
  crest, a continuous specular sheen line offset toward the light
  along the tube, a bright core line, a soft flare at the
  cross-section nearest the light, and 8 fixed caustic bands across
  the tube that brighten and dim in sequence as the light orbits.
- No pointer interaction at all (watch-only per prompt and the #208
  header). No audio. No Math.random, no Date.now() in the draw path;
  first frame is draw(0) at fixed phase. Hint chip (ice blue, dark
  text) reads "One Frame of Smoke · 2006 · 05 · 08 · Watch the light
  orbit." No em dashes in visible copy.

## Deviations from the prompt

- None in behavior or palette. Two implementation choices, both
  inside the prompt's allowance ("layered alpha strokes", "no real
  raytracing needed"): the caustics and speculars are layered
  flat-alpha strokes, not a shader; and the "seen slightly from
  below" is carried by the vertical squash (0.92) of the spiral and
  the crest sitting at 52% of frame height rather than by a 3D
  projection, keeping the piece canvas-2D only.

## Fix rounds (gate-caught)

1. First build: per-disc specular rim arcs read as ribs, giving the
   tube a segmented caterpillar look, and the caustic bands crossed
   the whole tube too strongly. Replaced the arcs with one continuous
   sheen line offset toward the light; thinned, shortened and dimmed
   the caustics (12 to 8 bands, max alpha 0.30 to 0.13); softened the
   hot-spot flare; raised disc rings 7 to 9 for smoother shading.
2. Same round: a kink and bulge at the tail/spiral joint. Cause: the
   tail ended at the nominal spiral start, but the spiral's actual
   start is noise-displaced. Fixed by computing the displaced start
   point first and aiming the tail bezier at it, with matching end
   tangent and radius (0.060).

## QA

- Rendered the actual script with node ~/workspace/tools/render-piece.js:
  1280x900 desktop, 390x844 mobile, 720x720 thumb. All three PNGs
  inspected visually: the curl reads as one frozen glass wave-crest,
  the light point and sheen are visible, the joint is seamless, no
  clipping, no particle chaos, caption legible at all sizes.
- Thumb byte-identical across two consecutive renders of the final
  script (md5 87bdb4193eb3abf21a672010d9dce816, twice).
- grep confirms no Math.random, Date.now, or pointer handlers in
  index.html. Nothing pushed; staged only.
