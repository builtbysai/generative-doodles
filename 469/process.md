# No.469 Blackout

EXPANSION #56 andrea-ucini, prompt UC5. Watch-only, no interaction, no hint text.

## Concept

Ucini's Cicero "Blackout" as a slow dramatic loop. On a muted beige field, a
large solid red clenched fist rises out of cracked dark earth; thin red
fissures spread and glow across the ground as it climbs. Behind it, a thin
black industrial skyline band: smokestacks at the left, leaning utility poles
with sagging wires in the center, small houses with a few lit windows at the
right. The fist is the only red object in the frame; the single accent carries
the whole poster.

## Construction

- Single self-contained index.html, canvas 2D only. Canvas sized from the
  Visual Viewport API with resize listeners on visualViewport and window;
  canvas.style.width/height pinned in px on every draw. Phone detection via
  window.screen (min dimension under 700px) with the aspect fallback. Page
  ground is the piece's own beige.
- Palette is exactly the prompt's five colors: ground #E3D5BC, earth and
  crack cores #2A2118, fist #D9261C, skyline #1A1A1A, lit windows #F2C14E.
  The fissure glow is the fist red at or below 0.5 alpha; the fist's groove
  lines are the earth color at low alpha. No sixth color appears.
- Loop: 48 seconds, three acts of 16. Act 1 the fist rises (smoothstep
  easing) and the fissures reveal in step with its height; act 2 it holds
  at full height while the fissure glow breathes faintly and one window
  flickers; act 3 it sinks back and the cracks fade with it. Loop timing is
  integral (48 = 3 x 16), so the cycle is seamless.
- Fist: one filled silhouette path, chunky and wider than it is tall above
  the wrist, with four shallow knuckle bumps across a nearly flat top
  (curled fingers, not standing ones), three short vertical grooves in the
  knuckle band, one fold seam beneath it, and the thumb drawn as groove
  arcs only, since thumb and fist share one red: the long top edge across
  the fingers plus the rounded tip at the lower left; the heel carries no
  line and merges into the palm.
- Fissures: seeded jagged polylines (mulberry32, fixed seed 469) radiating
  from the fist's base, a few branching once. Three passes per crack: a
  wide faint red glow, the dark earth-colored core, a thin brighter glow
  line. Reveal fraction equals the fist's lift. They are clipped to the
  earth's own outline, a jagged-topped band with a low mound heaped at the
  fist's base; the edge points are generated once per frame from a fixed
  seed and shared by the earth fill and the fissure clip.
- Skyline: silhouette strip on a baseline at 36% height. Factory block with
  three smokestacks at left; three leaning poles with crossarms and
  quadratic sagging wires at center; three pitched-roof houses at right.
  Four lit windows; one flickers (cosine cycle phased to full brightness
  at the first frame, with an occasional dropout), the rest burn steady at
  lower alpha.
- Determinism: the single synchronous first frame is drawn at a constant
  pre-roll of t = 24s, mid-hold: fist at full height, fissures fully spread
  and glowing, flicker window lit. Frame one never derives from Date.now();
  the rAF loop (typeof-guarded) is anchored as PHASE0 + elapsed since load.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp:
  identical. Second render deleted.
- Iteration 1: the first fist read as a scalloped glove: knuckle bumps too
  tall and separate, thumb drawn as a fully outlined ellipse floating
  mid-fist, and shallow fissures streaked across the fist and floated as
  red stubs on the beige. Fixed by flattening the knuckle bumps, widening
  the mass, and keeping only the thumb's top-edge and tip grooves.
- Iteration 2: fissures clipped to the earth outline (shared seeded edge
  points for fill and clip), so they radiate from the base across the
  mound and dark ground only, never over the fist or the field. Thumb arc
  tightened and shortened so it reads as a thumb edge crossing the
  fingers, not a swoosh.
- Final renders checked: the red fist reads instantly as a clenched fist;
  skyline band complete with stacks, poles, wires, houses; one window
  bright, the rest dimmer; fissures radiate from the base; the fist is
  the only red object. On mobile the poster composition keeps its shape,
  the fist sits lower (size follows the smaller dimension, as in sibling
  pieces) and nothing is clipped.
- No deviations from the prompt's letter. No audio, no microphone, no
  interaction, as specced for a watch-only piece.
