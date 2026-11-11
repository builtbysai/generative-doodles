# History, Accumulated — №1688

MK1, mpkoz PP935, EXPANSION #222. Date 2006 · 08 · 26 (formula date).

## Build

- Canvas 2D only. Seeded looping choreography: 8 keyframed skeleton poses over a
  24 s loop (standing, arms up, arabesque, crouch, leap, turn, bow, wide arms),
  smoothstep-interpolated. No randomness anywhere; no `Math.random`, no `Date`.
- Trail: 81 shells sampled every 0.25 s over the last 20 s, oldest first.
  Each shell extrudes ribbon strips along 14 bone segments (round caps, lighter
  core sheen). Per-segment color comes from segment velocity: slow segments
  stay teal (torso/legs) or dusty pink (arms); fast segments burn amber into
  ember red. Alpha decays exponentially (`0.95 * exp(-age/5)`); shells older
  than 12 s render as thin ghost wireframes.
- Room: plain grey gradient wall, black stage floor. Shells are drawn mirrored
  below the floor line, clipped to the floor region and dimmed to 40 percent,
  under a translucent floor sheen.
- Camera: fixed low three-quarter angle; pointer/touch movement sets a drift
  target, eased toward each frame (max ~12 px, more for points higher above
  the floor). Watch-first; no clicking, no reload, no scrubbing.
- Frame one is at t = 20 s, so the nautilus is already accumulated at first paint.
- Plates drawn on canvas: title "History, Accumulated", date "2006 · 08 · 26",
  hint "Move the pointer to drift the camera."
- House rules: Visual Viewport sizing with resize on visualViewport and window;
  canvas pinned in draw() via style width/height; phone detection via
  window.screen (min dimension < 700 px) with aspect fallback; one synchronous
  frame at load; requestAnimationFrame guarded by typeof check; reduced-motion
  renders the static first frame only.

## Deviations

- Full-bleed stage on desktop as well as phones, per the prompt's composition
  ("full-bleed stage, figure centered"), instead of the house rule's square
  field on desktop.
- Decay steepened from exp(-age/7) to exp(-age/5) and the newest shells made
  wider after the first QA pass, so the current dancer reads against the fan
  of older shells. Wireframe threshold moved from 14 s to 12 s.
- The head is a plain circle (no face) tinted dusty pink; the prompt forbids a
  literal human face.

## QA

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 desktop,
  390x844 mobile, 720x720 thumb; all three inspected.
- First gate FAILED: the figure was nearly invisible, only faint pale discs.
  Root cause found by pixel probing and a wrapped-context stroke log:
  `boneColor` passed an `rgb(...)` string back into `mixRgb`, which only
  parsed hex, producing `NaN` color components that node-canvas reads as
  transparent black. Fixed by adding a `toRgb` parser that accepts both hex
  and `rgb(...)` strings. Re-gated after the fix; no further edits since.
- Desktop (1280x900): teal torso and legs read clearly, pink/amber arm fan
  above, ghost wireframe shells at the edges, floor reflection dimmed below
  the floor line, plates legible top-left and bottom-left.
- Mobile (390x844): figure centered and complete, reflection visible, plates
  legible, no overflow.
- Thumb (720x720): same composition, figure and nautilus read at small size.
- Motion check: `drawAt(8)` renders a different pose (arabesque, arms raised)
  with pointer drift applied, confirming the loop animates and drift works.
- Flicker: no strobing by construction; all motion is slow smoothstep
  interpolation of a 24 s loop, well under 14 Hz.

## Files

- `index.html` — md5 856bad059c0493f88e9414016872639f
- `thumb.png` — md5 d972b54725edd37a639687fafcd72939 (720x720 render)

Gallery note: "Ribbon shells of a dancer accumulate into a nautilus of motion. Move the pointer to drift the camera."
