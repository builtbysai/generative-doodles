# No.507 "Goal Ball"

EXPANSION #61 alice-piaggio, prompt AP3: her anthropomorphic soccer ball (2026).

## Concept

The ball IS the body. One big soccer ball, white with blue pentagon patches,
fills the center of a lime ground and wears her face grammar on its
upper-left side: two big oval black eyes, red brow arcs, red blush strokes,
a small smile. Two giant detached hands, one ground-tinted green and one
white, reach in from the top corners but never touch it. Two tiny boot legs
in striped socks and red cleats kick out from the ball's lower edge. It is a
watch-only poster that breathes: the ball bobs and squashes, the boots snap
a kick every few seconds, the hands hover. Double-tap reseeds the patch
layout, kick angle, and hand placement.

Palette, flat fills only, no gradients: lime #BCE62E, ball white #F2F0EA,
patch blue #1B63F0, eye black #000000, blush/brow red #E8543A, cleat red
#E63946, sock stripes #1B63F0 on white.

## Construction

- Single self-contained index.html, canvas 2D, no external assets.
- Layout is generated from a seeded RNG (mulberry32, fixed base seed
  507061): patch rotation and per-pentagon jitter, kick spread, hand tilts
  and hover phases, and the grain field. Double-tap / dblclick advances the
  seed and rebuilds the layout.
- Ball: circle at 55% of the smaller canvas dimension, six pentagon patches
  (one center, five on a ring) clipped to the circle. The face is anchored
  each run to whichever ring pentagon lands nearest the upper-left, so the
  face always sits on that pentagon area even after a reseed.
- Hands: mitten construction (ellipse palm, four capsule fingers, capsule
  thumb) drawn in a unit space scaled to 1.7x the ball diameter (1.45x on
  phones). Placement is parametric: each hand is aimed from its frame
  corner toward the ball center, and its reach is clamped so the
  fingertips always keep at least a 10% gap from the ball, then drifted
  slowly for the hover.
- Legs: drawn before the ball so the sock roots tuck under the ball edge.
  White sock capsule with two blue stripes, red boot, three dark cleat
  dots. The kick is a 2-frame snap: within each ~3s cycle the legs flick
  between tucked and extended poses for three short frames.
- Motion loop: bob and squash are phase-shifted sines on a 2.6s period,
  hand hover on a 5.5s period, kick on a 3s cycle. All phases derive from
  one clock: phase = PHASE0 + elapsed, with PHASE0 = 1.35s as a constant
  pre-roll. Frame one is a single synchronous draw at that constant phase;
  nothing in frame one comes from Date.now(). requestAnimationFrame is
  typeof-guarded before the loop starts.
- Sizing follows the house rules: canvas size from the Visual Viewport
  API with resize listeners on visualViewport and window, canvas style
  width/height pinned in px inside draw(), phone detection via
  window.screen physical size (min dimension < 700px) with the aspect
  fallback h > w*1.15. The composition is square logic centered on the
  frame; the page ground is the lime.
- Deviation (grain): the prompt's ground texture is normally a
  pre-rendered grain canvas, but the QA renderer provides no
  document.createElement and no offscreen canvas. Adaptation: the grain
  is a precomputed seeded array of 240 tiny specks in three near-lime
  tones, drawn directly onto the ground every frame. Same static
  textured read, no offscreen surface needed.
- Deviation (outlines): the hands carry a thin dark palm outline (dark
  green on the green hand, near-black on the white hand) so the cropped
  giant palms stay legible against the lime. The ball itself gets a thin
  patch-blue outline. Both are flat strokes from the palette family.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp;
  identical. Second render deleted.
- Desktop read-back: face reads instantly over the upper-left pentagon
  (eyes, brow arcs, blush, smile all legible), six blue patches clipped
  cleanly to the ball, green and white giant hands cropped by the top
  corners with a clear gap to the ball, grain visible across the lime.
- First pass issue: the boot legs read as plain red hooks; the white
  striped sock sat almost entirely behind the ball edge, so the stripes
  never showed. Fixed by lengthening the sock and moving both stripes
  and the boot outward; re-rendered, and the striped socks and cleats
  now read at all three sizes.
- Mobile read-back: square composition centered and kept in shape, face
  and patches legible, both hands still entering from the top corners,
  legs visible, nothing clipped.
- No microphone, no audio, no external requests.
