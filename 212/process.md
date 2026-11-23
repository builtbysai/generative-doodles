# No.400 Snow Cello — process

## Concept

After Anna Galitskaya's (@galitskaya.illustration)
Wonderful Winter Week leopard cellist: a whimsical
anthropomorphic leopard seated in a snowy clearing at
night, serenely bowing a cello. Snow falls steadily
through the whole scene, and each bow stroke sends
faint gold note-shapes drifting up off the strings.
It is a pure motion loop — watch-only, no interaction
at all — and the clearing is the scene: no stage, no
spotlight, no text.

Palette is closed at the five specced hexes: night
#1E3A5F, snow #F4F6F8, leopard gold #D9A441 with ink
spots #2B2620, cello brown #8A5A33, note-gold
#E8A93D. Flat colour only; hexes are used flat or at
flat alpha steps. The page ground takes the night
tone, and the centred fit keeps the whole clearing
in frame at any aspect.

## Construction

One canvas, design space 1280x900, centred fit
(S = min(W/DW, H/DH)); the canvas is pinned via style
width/height in px every frame and sizing comes from
the Visual Viewport API with resize listeners on both
visualViewport and window. Phone detection uses
window.screen physical size (min dimension < 700px)
with the aspect fallback (h > w*1.15).

The clearing is drawn as JS data every frame: a flat
moon disc upper right with faint flat craters, six
snowy pines framing the sides (stacked ink triangles
at low alpha, each tier capped with a small flat snow
triangle), a translucent back ridge and the snowfield
hill, and a soft ink shadow pooled under the figure.

The leopard is a flat seated-body recipe drawn in
local space (origin at the ground contact point):
curling tail with ink tip, seated haunch, torso, a
front leg to a flat paw, and a round head with two
serene closed eyes, nose and a small mouth curve.
Spots come from fixed tables baked at load from a
fixed-seed LCG — polar placement scaled inside the
torso and haunch ellipses, authored spots on the
forehead — so no spot ever strays outside its
silhouette. Counts are asserted at load (12 torso
spots, 9 haunch spots, 5 head spots).

The cello sits angled across the body in its own
tilted frame: two bout ellipses and a waist in flat
brown, ink neck and scroll, two faint snow strings,
a pale bridge and an endpin reaching the snow. The
far paw rests on the cello neck. The bow arm is two
segments — shoulder to elbow to hand — and the hand
rides the bow axis on a 4s sine; the bow itself is a
long ink line through the hand with a faint parallel
hair line. The whole figure breathes 0.99–1.01 about
its base point on the same 4s phrase, and the head
tilts faintly on that phrase about the neck.

Notes are exactly 12 abstract shapes (ellipse blob +
stem, half of them with a flag tick — never real
notation), asserted at load. Each rises from the
cello strings on a 16s cycle (two whole cycles per
loop), the twelve staggered by 4/3s so the rises
interleave; each drifts right and sways as it climbs
about 250px. Alpha is a stepped envelope (eighths of
a sine arch), zero at both ends of the rise, so
nothing pops at the wrap.

Snow is exactly 150 particles, asserted at load, each
baked from the same seeded LCG: a whole number of
field heights per 32s loop (k = 1, 2 or 3) and a sway
whose period divides the loop (8s or 16s), at one of
three flat alpha steps. Every flake is home again at
the wrap.

Loop length: 32s, seamless. The bow phrase is 4s —
exactly 8 cycles per loop, asserted. Motion is
watch-only; there are no pointer handlers.

Determinism: frame one is drawn synchronously at the
constant phase T0 = 14.0s — the bow exactly at its
mid-stroke crossing (sine zero), snow mid-fall,
notes spread through their rises with several
mid-rise — and the animation clock advances from
that anchor in fixed 1/60 ticks accumulated from rAF
timestamps; rAF is typeof-guarded. Frame one never
reads a wall clock.

## QA log

- Rendered with the house node-canvas renderer at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png)
  and 720x720 (thumb.png). The renderer confirms both
  resize listeners register (watch-only: no pointer
  listeners).
- First pass fixes: the single closed-eye arc read
  as a smile and the face had no clear eyes, so the
  face was rebuilt — two serene closed eyes as
  shallow cap arcs, nose and mouth re-centred on the
  muzzle, forehead spots lifted clear of the eyes.
  The cello sat small and low at the body's side; it
  was scaled up (1.12) so it sits across the torso,
  and the far paw was moved onto the cello neck where
  the tilted neck actually runs. The notes climbed
  in a column straight through the head's edge; their
  origins moved to the strings and each rise now
  drifts right as it climbs, streaming past the ear
  instead of through it. Spot counts trimmed (14→12
  torso, 10→9 haunch) and radii tightened so the
  pattern reads as leopard spots, not holes. All
  renders redone after the fixes.
- Desktop: the leopard sits centred on the snowfield,
  cello across the body, bow crossing the strings at
  mid-stroke, gold notes lifting off the cello and
  drifting up past the ear, moon flat at upper right,
  snowy pines framing both sides, snow falling
  through everything.
- Thumb: leopard, cello, notes, moon and pines all
  read instantly at gallery size; the scene sits
  centred on the continuous night ground.
- Mobile: centred fit keeps the whole clearing in
  frame — leopard, cello, notes, moon and both pine
  clusters — on the continuous night page ground, no
  letterbox seam.
- Thumb rendered three times from the shipped
  script: byte-identical every time (md5
  c67ea50518f8b930cb3f2770c832ba35), including once
  after a comment-only cleanup of the script.
- Grep-verified in the piece script: no gradients,
  no shadowBlur use (the word appears once, in a
  comment noting its absence), no offscreen canvas,
  no Math.random, no Date.now, no em dashes, no
  absolute URLs. The palette holds only the five
  specced hexes, each used flat or at flat alpha
  steps.
