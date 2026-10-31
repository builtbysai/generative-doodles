# No.646 "Apacheta" - EXPANSION #78 paulo-cox, block 6

## Concept

The apacheta, the stone cairn raised at Andean passes as a sacred-mountain
marker, taken from Paulo Cox's adjacency to sculptor Francisco Gazitua and
his "Apacheta" stone works. One cairn stands alone on a near-black ground:
five to nine irregular stones stacked toward the top of the frame, each
smaller than the one below, each slightly rotated, the top stone marked
with a single amber dot. Nothing else is in the frame but one faint flat
shadow ellipse under the base stone. The stack breathes with a
barely-perceptible sway, as if in mountain wind. Dragging through the
stack disturbs it: stones shift, one may topple and roll a short way, and
the cairn slowly rebuilds itself, stone by stone, into a new stable
arrangement. A double-tap raises a fresh cairn of a different height.

Palette (strict): ground #0C0F0A, stones in three flat grays #3A3F45 /
#565C64 / #7A8189, top-stone amber #E8A33D, shadow black #060807. No text
anywhere. No 3D rendering: flat forms and the one shadow ellipse only.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets,
  no audio. Canvas size comes from the Visual Viewport API with resize
  listeners on both visualViewport and window; draw() pins
  canvas.style.width/height in px every frame. Phone detection uses
  window.screen physical size (min dimension < 700px) with the aspect
  fallback h > w*1.15; the layout is all fractions of the frame, so the
  cairn refits a phone frame and the page ground is the piece's own
  near-black.
- Seeded generation (mulberry32): a cairn is pure data before it is
  pixels. Each stone is a rounded polygon of 7 to 10 vertices with uneven
  angular spacing and strong radius jitter, so no outline is an ellipse
  and no two stones share a silhouette. Widths strictly decrease up the
  stack (factor about 0.80 to 0.87 per level); heights are gently
  decreasing, jittered, and normalised. Adjacent stones never share a
  gray. In layout each stone sinks a tenth of its height into the stone
  below so the stack reads as contact, not floating.
- Stability model: at build time every stone's centre offset is clamped
  inside the horizontal span of the stone below (offset random walk,
  damped toward the centre line, hard clamp at 0.30 of the base width),
  so every generated arrangement stands by construction. During a drag,
  stones near the pointer path accumulate a horizontal shove; when a
  stone's centre passes 30 percent of the width of the stone below it,
  that stone and everything above it topple.
- Disturbance physics: the topple runs as a fixed-step simulation (120
  steps per second) on the anchored clock, starting from the recorded
  drag event. Falling stones take gravity, a sideways velocity and a
  tumble, land on the ground line or on a resting stone, and settle to a
  near-flat angle with a small seeded jitter. The simulation is a pure
  function of the segment start state plus the recorded event, so it is
  deterministic for a given interaction.
- Rebuild model: once every stone is at rest, the system waits a beat,
  generates a NEW arrangement from a counter-stepped seed (same stone
  count, new widths, rotations and gray order), and places the stones
  one at a time, bottom first. Per-stone time is clamped so the whole
  rebuild runs about twenty seconds. Each placement is a closed-form
  ease in elapsed time: rise from the captured fallen pose to an apex
  above the slot, then settle down onto the target, rotation easing to
  the placed angle. Because the plan captures its start poses, a rebuild
  always completes; a scattered pile is never the final state.
- Double-tap reseed: a fresh cairn of a new height (5 to 9 stones) is
  generated and placed with the same grammar, faster (about four seconds
  in all), stones flying in from above the frame.
- Sway: a two-sine horizontal offset, amplitude scaled by height within
  the stack (tops lean more than the base), and exactly zero at t = 0,
  so frame one is the cairn at rest.
- Frame one is the synchronous draw at t = 0 on the anchored clock; no
  Date.now anywhere. rAF is typeof-guarded; there is no offscreen
  canvas, no filter, no AudioContext, no document.createElement.

## QA log

- Rendered with node render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png) and 720x720 (thumb.png). Thumb rendered twice
  and byte-compared with cmp: identical. The second render was deleted.
- Desktop and thumb: one cairn of six stones centred in vast dark
  margins, irregular lopsided outlines with varied tilts, stones in
  contact, the single amber dot on the top stone, one faint shadow
  ellipse under the base. Mobile: the same cairn refitted to the tall
  frame, nothing clipped.
- Mid-rebuild verification: an inert ?seed=midrebuild hook winds the
  rebuild clock back at load so t = 0 falls mid-plan. The forced render
  (kept in /tmp during QA, deleted after) shows the two bottom stones
  placed, the third stone in flight above its slot, and the remaining
  stones waiting tilted on the ground at either side. The hook was also
  used to catch a layout-timing fault during development: scattered
  poses computed before the first resize used a degenerate layout, so
  the forced setup now runs after the boot resize.
- Fix rounds during QA: (1) the first outline pass used 5 to 8 vertices
  with mild radius jitter and read as smooth stacked ellipses; vertices
  went to 7 to 10 with uneven angular spacing and much stronger radius
  jitter, and the base width was narrowed so the stones read chunkier.
  (2) Stones floated a few px apart at their jittered edges; each stone
  now sinks a tenth of its height into the one below. All renders were
  redone and the byte-compare re-run after each round.
- Fly visual-gate fix round (post-build): the gate renders still read as
  smooth floating discs, not a cairn - clear ground gaps between every
  pair of stones, one middle stone visibly wider than the stone beneath
  it. Root causes: the polar-jitter outlines' true extents were far
  smaller than the nominal w/h (and the midpoint-quadratic path shrank
  them further), so the stacking pitch exceeded the drawn heights; and
  per-vertex radius factors made drawn widths random even though wFrac
  decreased. Geometry-only fix, everything else untouched: (1) outlines
  are now built edge by edge in perimeter order - a flat bottom face, a
  flat top bearing face, near-vertical sides, seeded dents and bulges -
  then normalised so the bounding box is exactly [-1,1] x [-1,1], so a
  stone's drawn width and height are its w and h and widths narrow
  monotonically as wFrac dictates; (2) the path is now a chunky polygon
  of straight runs with each corner cut by a short quadratic (14 percent
  of each neighbouring edge), so faces stay flat and corners read as
  rock; (3) layout stacks on true faces: the base stone's flat bottom
  rests on the ground line and each stone above sinks 22 percent of its
  own height into the stone below (nominal totalH raised to 0.76*H to
  hold the stack's overall proportions). Re-rendered at all three sizes
  and read back: one connected stack with no ground gaps up the central
  column, widths visibly narrowing stone by stone, chunky rock
  silhouettes, amber dot on the top stone, shadow ellipse intact.
  Thumb byte-compare re-run: identical. The ?seed=midrebuild forced
  render was re-checked with the new geometry (base placed, second
  stone seated on it, third mid-flight, rest waiting on the ground) and
  deleted after inspection, as before.

## Deviations

- None from the prompt's prohibitions. Two construction choices within
  its wording: the rebuild's per-stone duration is clamped (1.5 to 3.0 s)
  so a nine-stone rebuild lands near twenty seconds rather than exactly
  on it, and a dragged stone that shifts without toppling still triggers
  the settle-and-rebuild the prompt describes for disturbance, since the
  arrangement it returns to is a new seeded one either way.
