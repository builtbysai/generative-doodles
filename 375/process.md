# No.375 Dark Eggs

## Concept

After Olena Kovalova's (al_kovalyova_design) Dark Academia
Easter pivot: decorated eggs as medallions on near-black.
Twelve eggs in a 3 by 4 grid, each one a field of tiny gold
motifs (thistles, crescents, eye-spirals, cross-stitch
diamonds) inside a thin gold ring, sage sprigs standing in
the gutters between them. The mood is nocturnal: no pastels,
no chicks, no bunnies. Every egg opens like a locket to
reveal a tiny hidden scene, and the whole grid can be
scattered and watched as it settles home.

## Construction

One canvas, flat colour only, palette closed at ground
#121216, egg field #1E1A1E, gold #C9A24B, bronze #6B4C2A,
slate #3A3A44 and sprig sage #5C7A58. Design space 1280x900,
centred fit; the page ground takes the piece's near-black.

Eggs are 150 design px tall (one sixth of the design height)
and 116 wide, drawn from a single bezier egg path, narrower
at the top. The count is asserted at load: exactly 12 eggs,
and exactly 12 motif layouts, one per egg, asserted unique.
All layouts draw from one shared motif library: thistle
(stem, crosshatched bulb, crown spikes, two leaves),
crescent (two-arc even-odd fill), eye-spiral (Archimedean
spiral in a ring with a pupil dot), cross-stitch diamond
(outline, X stitch, centre dot) and a plain dot. The twelve
arrangements: concentric diamond rings; one great thistle
with crescent guard; crescent and dot rows; eye-spiral
heart with diamond corners; diamond lattice; thistle column;
four motif bands; thistle fan over a low eye; an authored
constellation; a 3x3 chequer with an eye at its heart; a
diamond ring around a thistle; two eyes with a crescent
waist. Twelve sage sprigs stand at fixed gutter and margin
positions.

Motion is a 48 second loop. Each egg sways plus/minus 3
degrees (2 whole sway cycles per loop, fixed per-egg phase)
and the gold shimmers (alpha 0.66 to 1.0, 3 whole shimmer
cycles per loop, fixed per-egg phase), so the field breathes
without ever leaving the loop.

Interaction, per the piece's spec: tap and drag are kept
separate by a movement threshold (under 10 design px of
travel and under 0.4s is a tap; anything further is a drag).
A tap on an egg toggles its locket: the interior is drawn
first (a slate inner egg holding a scene from a fixed table
of three: gold bird perched on a sage sprig, sage
fiddlehead, gold crescent moon), then the two half-egg
shells, hinged at their outer edges, foreshorten as they
swing open (horizontal scale follows cos of the swing
angle), leaving a gold seam sliver at the centre. Tap again
to close; the swing eases and snaps exactly to 0 or 1. A
drag shoves eggs near the pointer path with soft physics
(velocity impulses fall off with distance); on release a
damped spring (stiffness 30, damping 6.5, integrated in
fixed 1/60 ticks) settles every egg back and snaps it to
exactly its grid slot. Dragging never reloads anything.

Determinism: frame one is drawn synchronously at the
constant phase T = 13.0s into the loop, shimmer mid-wave,
sway mid-swing, all eggs closed and exactly on grid. The
animation clock is anchored to that constant plus elapsed
time since load, advanced in fixed 1/60 ticks; frame one is
never drawn from Date.now(). Pointer coordinates convert
through the stored fit transform (S, OX, OY). Sizing uses
the Visual Viewport API with resize listeners on both
visualViewport and window; the canvas is pinned every frame
via style width/height in px; phone detection uses
window.screen minimum dimension under 700px with an aspect
fallback. No offscreen canvas, no gradients, no filters,
no shadowBlur; all marks are JS data drawn directly each
frame. requestAnimationFrame is typeof-guarded.

## QA log

Rendered with node ~/workspace/tools/render-piece.js:
qa-desktop.png (1280x900), qa-mobile.png (390x844),
thumb.png (720x720).

- Desktop: full 3x4 grid centred, all twelve layouts
  distinct and legible, gold rings and slate hairlines
  reading, sprigs in the gutters and margins, ground
  continuous to every edge.
- Mobile: centred fit on the near-black ground, whole grid
  in frame.
- Thumb re-rendered from the shipped script: byte-identical
  (md5 8bfd976f...), confirming the constant-phase first
  frame.
- Locket probe (temporary copy, not shipped): eggs forced
  open at 1.0 and 0.55. Fully open eggs show the bird and
  fiddlehead scenes on slate with shells swung to slivers
  at the edges; the half-open egg shows the moon scene
  mid-reveal behind the swinging shells.
- Fix during QA: the bird scene's body was slimmed and its
  tail lengthened so it reads as a perched songbird rather
  than a round chick silhouette; thumb re-verified
  byte-identical after the change (the scene never appears
  in the closed first frame).
- Grep checks: no absolute URLs, no createElement or
  offscreen canvas, no shadowBlur, no gradient calls in the
  shipped script.
