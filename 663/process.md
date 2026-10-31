# No.663 — Centauresa

EXPANSION #80 angela-leible, prompt block 7 "Centauresa".
Her Wild Woman register: "CENTAURESA, mujeres que andamos a caballo…
arquetipo femenino de libertad." A herd runs wild across a dusk ridge,
and among them rides one woman who is a single unbroken line of bone
white: the herd is mass, she is the line.

## Concept

Dusk in flat bands: ember sky over a darkening horizon, a near-black
ridge across the lower third. Through the middle band runs the herd,
ten horses built as one merged stain-mass of sienna and ochre blotches,
no outlines, no sprites, necks and heads suggested by blotch chains
rising from the mass. Over and through the herd moves the rider: one
continuous bone line that never lifts. A moving point rides a
procedural gallop course (a figure-eight with rearing arcs) or, while
dragged, follows the viewer's fingertip; every step it is recorded
into a trail whose older segments fade away over six seconds, so
exactly one continuous visible length exists at any time. At the head
of the trail sits a small horse-and-rider figure drawn as a single
silhouette contour in the same stroke: she is always seated, always
riding, never a standing figure. This is the one piece in the study
where drag belongs: the rider answers the hand, and the herd parts
gently around her recent wake.

## Construction

Single self-contained `index.html`, canvas 2D, no external assets.
Strict palette: ember #C96A3A, ridge #2B2622, low dark #1A1410, herd
sienna #8A4A2B and ochre #C98F3D, rider line bone #EDE4D0.

**Sky.** Four flat horizontal bands (no gradients, per house style):
#C96A3A, then two flat steps mixed between the ember and dark palette
endpoints (#A34E26, #6E3B1E), then #3A2415 to the horizon. The ridge is
a filled silhouette whose crest is a seeded sum of sines, drawn after
the herd so the horses' legs sink behind the crest line.

**Herd composite.** Each horse is 31 flat irregular blotches (9-vertex
seeded shapes, vertically squashed by group) placed on a horse
skeleton: barrel chain, belly, tail mass, a neck chain rising at the
front, head and muzzle, legs. Blotch shapes and jitters are seeded
once (mulberry32, seed 663001) and fixed; anchors move as pure phase
functions of the anchored clock (slow rightward drift with wrap, a
small surge, a minute bob). Drawing is two-pass across the whole herd:
every barrel first, then every neck, head and leg, so no head is
orphaned behind a neighbour's body. All blotches are opaque; where
same-tone masses touch they merge into one breathing herd. Legs are
drawn but fall behind the ridge crest.

**Trail model.** The simulation runs at a fixed dt of 1/60 s from the
anchored clock. The head point follows its target through a momentum
spring (stiffness 26, damping 9.2): the target is the gallop course
point while autonomous, the pointer while dragging. On release, the
offset between the release point and the course point is stored and
decays with a 2.5 s time constant, so she blends back onto her own
course without the line lifting. Pointer events are recorded with
anchored times and replayed inside the fixed-step simulation, keeping
the state deterministic. Each step appends the head point to the
trail; rendering buckets the trail into 24 age bands over a 6 s fade
window, alpha falling to zero and line width tapering from 0.0052·H
to 0.0018·H, stroked bucket by bucket so the whole trail remains one
continuous visible stroke. The simulation is pre-rolled 1.2 s before
frame one, so the first frame already carries the line's first short
length entering the herd band.

**The figure.** At the trail head, one unbroken stroke draws a
43-point silhouette contour (midpoint-quadratic smoothing): clockwise
from the mount's muzzle, under the body (foreleg spike, belly, hind
leg V, buttock, tail, croup, back), with the woman as a detour along
the back (her back, head, arm reaching to the rein and back, her leg
down the flank), then up the shoulder to the withers, crest, ear and
face, ending at the muzzle where it began. Orientation: pitch follows
the velocity, clamped to ±0.35 rad and smoothed slowly, and the
figure mirrors with hysteresis when the course wheels back, so she
stays near upright; the gallop and the rearing read through her
position on the course, not through roll.

**Wake.** Herd blotches within 0.09·H of a trail point younger than
1.2 s are pushed radially away by up to 0.03·H with distance and age
falloff; as the line ages away the herd settles back.

**Determinism.** Frame one is the synchronous draw at t = 0 after the
fixed 1.2 s pre-roll; nothing is derived from Date.now(). Canvas size
comes from the Visual Viewport API with resize listeners on
visualViewport and window; the canvas is pinned in px inside draw();
phone detection uses window.screen (min dimension < 700) with the
aspect ratio only as fallback. rAF is typeof-guarded; there is no
audio, no microphone, no offscreen canvas, no filter.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js`:

- `qa-desktop.png` (1280×900): four flat ember bands, the merged
  sienna/ochre herd mass across the middle band with neck chains and
  heads rising from it, legs sunk behind the dark ridge, and at the
  left the rider's bone line just beginning, her figure entering the
  herd band.
- `qa-mobile.png` (390×844): the same composition refitted to the
  tall frame; the course is narrowed and centred (0.52·W centre,
  0.27·W amplitude) and the figure scaled down (0.13·H) so nothing is
  clipped at the edges.
- `thumb.png` (720×720): rendered twice and `cmp` byte-compared,
  identical; the second render was deleted.
- State-forced check (throwaway render via the piece's inert
  `?seed=t9` hook, read back, then deleted): at t = 9 s the full bone
  trail arcs in one continuous fading length from the herd's middle
  up to the figure at the right, the herd parting subtly along the
  recent wake; the figure reads as a rearing horse-and-rider gesture
  at the trail's head.
- The figure contour went through three tested revisions in an
  isolated harness before settling: earlier freehand paths with
  retraced legs collapsed into scribble at piece scale; the final
  silhouette contour (dense points, leg spikes, rider as a back
  detour) reads at the shipped size. A probe render confirmed frame
  one state: tilt −0.157 rad, facing right, head at (292, 456) on
  desktop.

## Deviations

- The prompt's ember sky "fading" is built as four flat bands, per
  the house no-gradient rule; the two middle tones are flat steps
  mixed between the palette's ember and dark endpoints.
- Figure pitch is clamped near level (±0.35 rad) rather than rolling
  with the full velocity direction: a single-line figure stops
  reading as a rider when rolled steeply. The rearing arcs and
  gallop remain in the course itself.
- The rider figure is one silhouette contour for mount and woman
  together, instead of a mount arc with a separate rider stroke on
  top: it is still exactly one unbroken line, and it is the version
  that stays legible at the piece's scale.
