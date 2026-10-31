# No.819 "Antiphonal Compass" — EXPANSION #100 rhys-chatham, PP4

## Concept

An overhead plan of Chatham's antiphonal writing (A Crimson Grail, 2005/2009):
eight emitter nodes stand at the compass points around a dark center, the
audience void. A crimson motif pulse orbits the ring and is handed from node
to node; each handoff flares at the receiving node, and the center stirs
faintly each time the pulse completes a full orbit. The ring is the ensemble.
There are no guitars and no letters: the compass is read by position alone,
brass ticks marking the ring where letters would go.

Interaction follows the prompt's own mechanics. Dragging in a circle around
the center spins the source: the pulse follows the drag's angular travel, and
on release the thrown velocity decays slowly back to the resting orbit.
Double-tap reseeds the motif, cycling the pulse token through three shapes:
shard, diamond, teardrop.

## Construction

Single self-contained `index.html`, canvas 2D, no external assets. Canvas
size comes from the Visual Viewport API with resize listeners on both
visualViewport and window; `draw()` pins the canvas CSS size in px every
frame and applies the devicePixelRatio transform. Phone detection uses
`window.screen` (min dimension < 700px) with the aspect fallback
`h > w * 1.15`; the composition is center-weighted and fills the frame at
every size, so no phone-specific layout branch is needed.

Palette is strict: ground #0B1020, brass #C9A227, pulse #C8102E, center void
#05060C. Node bodies and lines are recorded mixes of those four tones only:
node fill = mix(brass, ground, 0.45), node rim = mix(brass, ground, 0.25),
orbit circle = mix(brass, ground, 0.72), center lift = mix(void, brass, 0.22).
No gradients, no shadowBlur, no ctx.filter, no offscreen canvas; the pulse
glow is three concentric flat-alpha crimson discs.

Orbit model. The pulse angle is a closed-form function of a recorded segment
list, never frame-integrated:

- Free segment: th(t) = th0 + W_REST*dt + (w0 - W_REST)*TAU*(1 - exp(-dt/TAU)),
  with TAU = 7 s, so a thrown velocity relaxes exponentially onto the rest
  velocity from wherever the release left it, in either direction.
- Drag segment: the pulse angle is the grab angle plus the pointer's
  accumulated unwrapped angular delta, stored as {t, th} samples and
  evaluated by piecewise-linear interpolation.
- Release velocity is read from the last ~0.18 s of drag samples and clamped
  to +/-4.5 rad/s.

Rest-orbit choice: W_REST = pi/16 rad/s, exactly one node spacing (pi/4)
every 4 s, a 32 s full orbit. The decay target is this slow orbit rather
than zero: a dead stop would kill the piece, since the handoffs are its only
event; at rest the ensemble keeps passing the motif hand to hand, quietly,
forever.

Handoffs and flares. The rAF loop compares the unwrapped angle against node
boundaries (interpolating the crossing time inside the frame) and appends
{t, node} to an event log; each flare is then drawn closed-form from its
event age: ring radius = flareMax * (1 - (1-p)^3), alpha = 0.85 * (1-p)^1.5
over a 1.6 s life, plus an exp(-3.2 * age) crimson core flash on the
receiving node. The center pulse is likewise closed-form: with rev the
unwrapped revolutions from node 0's angle, a Gaussian in rev (sigma 0.045)
lifts the void toward the brass mix at each completed orbit, and a faint
brass ring expands across the void as frac(rev) runs 0 to 1.

Trail. Fourteen ghost tokens are drawn at t - j*0.16 s by re-evaluating
angleAt/omegaAt at those past times, alpha 0.40 * (1 - j/15), shrinking with
j. Times before the seeded handoff at t = -0.5 are skipped, so frame one
shows a short young tail rather than a pile-up on the node.

Determinism. Frame one is the synchronous draw(0) at orbit phase 0 with the
resting velocity: the initial free segment starts at t0 = -0.5 exactly on
node 1 (NE) with w0 = W_REST, and the handoff log is seeded with that
handoff, so at t = 0 the pulse sits 0.5 s of rest travel past the node, its
flare mid-expansion, trail behind it, center calm (frac(rev) = 0.14, well
past the completion flash). No Date.now anywhere; the piece clock is
performance.now minus a load-time origin, used only by the rAF loop and
pointer handlers. Seeded geometry (node size jitter, tick length jitter)
comes from mulberry32(819137), consumed once per resize in a fixed order.
Frame one flies the shard, the first of the three motif variants.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js: qa-desktop.png
  (1280x900), qa-mobile.png (390x844), thumb.png (720x720).
- Determinism gate: thumb.png rendered twice and cmp-compared byte-identical
  (check render deleted).
- Desktop and thumb read back: deep blue ground, eight brass nodes on a dim
  orbit circle, 72 brass ticks with long ticks at the node angles, NO
  letters or labels; dark center void with a faint inner ring; at the NE
  node a crimson flare ring mid-expansion, a crimson core flash on the node,
  and the crimson shard token just past it, headed clockwise, with a short
  tapering trail behind it along the arc.
- Mobile read back: the full ring, ticks and void sit inside the 390-wide
  frame with margin to spare, nothing clipped; composition centers
  vertically in the tall frame.
- Fix round: the first trail used 10 tokens at 0.085 s spacing, which at the
  rest velocity bunched into an unreadable smear under the token and, before
  the seeded handoff, stacked clamped tokens on the node. Rebuilt to 14
  tokens at 0.16 s spacing with pre-handoff times skipped; re-rendered all
  three sizes and re-ran the byte-compare green.
- Deviations: none from the prompt's substance. Two recorded choices: the
  decay target is the slow rest orbit instead of a full stop (above), and
  handoff events are logged by the rAF loop with interpolated crossing
  times while every drawn quantity (angle, flare, center pulse, trail)
  remains a closed-form function of the recorded events and t.
