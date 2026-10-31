# No.717 Horizon Touch

EXPANSION #87 janine-antoni, prompt block 6 "Horizon Touch". After Antoni's
*Touch* (2002): a tightrope strung across the full width of the frame exactly
at the horizon of a dusk seascape, and a small dark silhouette walking it.
With each step the rope dips, and at the deepest point of the dip the walker
appears to step onto the water itself.

## Concept

A seascape reduced to bands and a line. Sky above a crisp horizon at
mid-height, sea below, one rope at horizon height, one walker. Nothing else:
no boat, no birds, no face, no photorealism. The drama is entirely in the
walker's balance and in the rope's response: the dip travels with the walker
(slightly behind), pulsing with the gait, and at full dip the feet come down
through the horizon line onto the sea.

## Construction

- **Bands, not gradients.** The prompt calls for vertical sky and sea
  gradients; per the house no-gradient rule both are built from flat
  horizontal bands (7 sky, 7 sea) stepping between the specced endpoint
  tones (#0E1E33 to #4A6E8A for the sky; a horizon-lightened tone down to
  #16324A for the sea), with the interpolation eased so the steps bunch
  near the horizon. Faint seeded shimmer lines breathe on the sea, and a
  pale glint segment (#F5D9A0) sits on the horizon under the walker,
  brightening as the dip deepens.
- **Walker.** Minimal stick silhouette (torso line, head dot, two arm
  lines, two leg lines), about 8% of frame height. It crosses left to
  right over a 60-second cycle, then the loop restarts on the next seeded
  cycle. Balance is procedural: torso tilt and arm flap are driven by a
  seeded sum of three sines, so the figure continually corrects itself.
  Legs alternate as a function of distance travelled, with a seeded gait
  phase so frame one already stands mid-stride.
- **Dip and lag model.** The rope is a polyline: on the horizon line
  everywhere except under the walker, where a Gaussian (sigma seeded per
  cycle, ~0.075-0.105 of width) lifts it by a small clearance. The dip
  centre trails the walker by 0.45 s of travel (the lag). The dip amount
  pulses with the step cycle, and at full pulse the rope is pulled from
  its clearance above the line to slightly below it, so the feet,
  planted on the rope, touch and cross the horizon at the deepest point
  of each dip. All of it is a closed-form function of cycle time and the
  cycle seed; taps and cycle rollovers only re-anchor the epoch.
- **Determinism.** Frame one is a synchronous draw at exactly t=0
  (pre-loop draws are pinned to 0; the animation loop is anchored as
  epoch + elapsed). No Date.now, no Math.random; per-cycle variation
  comes from mulberry32 seeded by cycle index. Canvas is sized from the
  Visual Viewport API with resize listeners on both visualViewport and
  window, pinned in px inside draw(); phone detection via window.screen
  (min dimension < 700) with the aspect fallback. The walker's start
  point has a pixel floor so its raised arms stay on-canvas on narrow
  phones. Strict palette: sea #16324A, sky #0E1E33-#4A6E8A, rope #2A2E36,
  walker #0A0C10, glint #F5D9A0.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. (First pass failed: frame one had been drawn from the live
  clock at ~0s; fixed by pinning pre-loop draws to exactly t=0, the
  series-standard anchoring.)
- Fix round 1: the sea rendered as one flat sky-coloured field. Cause: a
  band colour had been produced as an rgb() string and fed back into the
  hex-only mixer, yielding NaN channels and an ignored fillStyle. The
  colour pipeline now works on RGB arrays end to end; the sea bands step
  correctly from horizon tone down to #16324A.
- Fix round 2: at frame one the walker's raised arm clipped the left
  edge on the 390-wide mobile render. The crossing start now has a
  pixel floor (max of the seeded width fraction and 0.036 of height),
  keeping the whole figure in frame at every size.
- Mid-crossing check: a throwaway t=30 render (forced-time copy in /tmp,
  deleted after inspection) shows the walker mid-rope with the dip
  travelling under it and the glint beneath, as designed.
- Read-backs: desktop and thumb show the banded dusk, crisp horizon,
  rope spanning edge to edge, walker at the left at crossing start;
  mobile keeps the horizon at mid-height and the full figure in frame.
  No text anywhere except the title.

## Deviations

- Vertical gradients replaced by flat stepped bands (house rule), with
  eased step spacing to keep the dusk falloff reading smoothly.
- The prompt's "dip deep enough to visibly touch the horizon line" is
  realised as the rope travelling from a slight clearance above the line
  to slightly below it at full dip, rather than bottoming out exactly on
  the line: a dip that only reaches the line from above reads as a hump,
  while crossing it reads as the walker stepping onto the water, which
  is the prompt's stated image.
