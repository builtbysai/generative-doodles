# №1277 "Nomads, Dreamers" — process notes

## Prompt (suchitra-mattai SM6, PP436)

Six mirror-polished steel pods stand in a circle on dark ground, each draped
with a monumental sari tapestry in deep magenta, emerald, and cobalt with gold
trim, the cloth spilling from the pod tops to the earth. Pod tops catch the
light in slow bright sweeps. Small figures cross between the pods
occasionally, silhouettes against the fabric. Grounded in Mattai's
*becoming* / *we are nomads, we are dreamers* (2024, Socrates Sculpture
Park): a monument to the state of becoming, with hanging braided-sari phala
globes and a nomadic garden at the base. Exactly six pods.

## What was built

- Six tapestry strips hang from the top edge with pale-sky gaps between
  them, in magenta #B3125B, emerald #1E6B4F, and cobalt #22427C, with gold
  #D4A017 trim on both hanging edges and seeded gold diamond patterning.
  Each strip sways on its own phase and period; the cloth spills from the
  pod tops and pools at the foot in a flared trapezoid.
- Six steel pods (#8A93A3) sit at the base in a row, rounded tops with a
  flat light facet for the mirror face, on charcoal ground #1A1C1E under a
  pale sky band #D8E4E0. Five braided-sari phala globes hang on thin lines
  between the pods; low dark garden tufts run along the ground line.
- Walkers: dark silhouettes cross the ground line on a 34 s cycle, one
  mid-crossing at frame one.

## Interaction

- Watch-only drift by default: tapestries sway continuously.
- Drag horizontally to stir a breeze: each drag segment adds a decaying
  impulse (tau 3 s) that raises sway amplitude, then settles.
- Tap a pod to make it catch the light: a bright band sweeps across that
  pod's face over 1.6 s. Taps are distinguished from drags by movement
  under 12 px.

## House adaptations and determinism

- Frame one is boot-flagged to exactly t = 0: the synchronous first draw
  is `draw(0)` and the clock starts with the rAF loop. This is the №1275
  lesson applied in advance: no `performance.now()` or `Date.now()` value
  reaches frame one.
- All state is closed-form over piece time and recorded event lists:
  sway phases, breeze decay, sweep windows, and walker positions are
  functions of t and the drag/tap lists, never frame-integrated.
- QA renderer limits honored: no gradients, filters, shadowBlur, offscreen
  canvas, element creation, or audio. Mirror sweeps and cloth are flat
  alpha shapes; dots are rotated rects; circles use a `moveTo` before
  every arc.
- No visible text except `<title>`. No literal park, no skyline.

## Fix rounds

1. First render showed no tapestry fill at all, only trim lines and gold
   diamonds on sky: the cloth path traced the right edge bottom-to-top
   and the left edge top-to-bottom, a self-canceling loop under the
   nonzero fill rule. Rebuilt as a proper perimeter (top edge, right
   edge top-to-bottom, bottom edge, left edge bottom-to-top); the cloth
   now fills.
2. Walker offsets shifted so one figure is mid-crossing at frame one
   instead of both being off-frame or entering at the edge.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected.
- Thumb rendered three times at 720x720: all byte-identical.
- Desktop read: six cloth strips with gold trim and diamond pattern,
  pale-sky gaps, five phala globes, six steel pods with mirror facets,
  one small walker silhouette at the ground line.
- Mobile read: same scene full-bleed, pods at the base, cloth full
  height, page ground in the piece's own background color.
