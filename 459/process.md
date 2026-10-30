# Headcount

## Concept

EXPANSION #55 (paul-blow), prompt PB3. After Paul Blow's "Delayering Middle
Management": a magenta-skinned suited figure stands centered on a flat
pale-yellow field, formal black suit, cream shirt, tie, neutral expression,
while his own stretched heads sprout radially from his neck like petals or
tentacles. Comic, not horror: every head is a simple rotated ellipse with two
dot eyes and a straight neutral mouth. Dragging is the delayering: each drag
stroke sprouts one more head, up to twelve, each swaying on its own spring
phase like a petal in slow air.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets.
- Palette is exactly the prompt set: ground pale yellow #F5E9C8, suit
  #14141C, shirt #F7F2E4, heads cycling peach #F2B28C, salmon #E88E6E,
  magenta #E91E63. The tie is the palette magenta; a ground shadow uses the
  suit colour at 8% alpha. Nothing else.
- Figure centered, full figure at roughly 75% of frame height; flat field,
  no props. On phones the composition keeps its shape (figure height is
  capped by the frame width so the wide head fan cannot clip) and the page
  ground is the piece's own pale yellow.
- Each head sits on a curved stalk drawn from the neck anchor along a radial
  fan angle; fan angles re-spread evenly whenever the head count changes.
  Head sway is a damped spring per head (stiffness 10, damping 3.4) driven
  toward a shared slow two-sine noise, each head offset by its own phase and
  amplitude from a seeded mulberry32 stream (seed 45913). Load-time layout
  is fully seeded; Math.random appears only inside the reseed gesture.
- Interaction: pointer drag, on release of a stroke that moved, sprouts one
  head (max 12). Double tap or double click reseeds the count (4 to 9) and
  rotates the palette variant (the three skin tones rotate through the fan
  and the hands/neck assignments follow the set order). In-piece hint is the
  single lowercase word "drag" in the bottom-left corner, salmon at 65%
  alpha. Nothing else is written on the piece.
- Determinism: the spring simulation is pre-rolled at a fixed 1/60 step to a
  constant phase of 14.0 s before the first draw, so frame one always shows
  the seeded six heads fully developed at the same sway state. The animation
  loop, where available, is anchored as that fixed offset plus elapsed time
  since load, and is guarded by a typeof check on requestAnimationFrame.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp.
- Visual check: full figure in frame at all three sizes, head fan unclipped
  on mobile, heads read as comic petals, palette restricted to the spec set.

## Deviations

- The prompt does not fix an initial head count; six heads at load was
  chosen as the seeded default because it reads clearly as a petal fan
  without crowding the shoulders.
- Hands and the neck stub take tones from the same three-colour skin set
  (the prompt names no separate hand colour); no colour outside the set is
  introduced.
