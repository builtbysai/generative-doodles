# No.1667 Golden Eye

Date: 2006 · 08 · 05
Study: #219 jos-vromans, prompt PP914 JV4
Interaction: watch-only
Sound: silent

## Driver

Golden threads wind around a knot that pulls every point inward.

## Mechanism

- 54 gold threadlines (#D8A94E) on black, drawn as polylines whose angle
  is a closed-form parametric function of radius and piece time: a slow
  constant spin plus a per-thread winding term (sine in radius, mixed
  directions and frequencies), so the threads wind, cross, and reach
  past the frame edges instead of forming uniform radial spokes.
- 240 particles from a fixed mulberry32 seed table (seed 1667). Each
  particle's position is a closed-form function of piece time: a cycle
  phase advances it from the field edge inward along a spiral (tangential
  offset, 1.2 to 3 turns) toward the knot, brightening from gold to
  near-white as it lands, then it restarts at the edge. No Math.random,
  no accumulated state.
- The knot is a small near-white core plus 140 fixed-seed dots drawn
  with additive ('lighter') alpha around it, so the glow comes from
  drawn points only. No gradient object, no pre-rendered sprite, no
  drawn iris or eyeball.
- Frame one is drawn at a fixed phase (t = 6.0 s), a developed state:
  threads already crossing, knot glowing, points mid-spiral. The rAF
  loop is anchored as that offset plus elapsed time, so frame one is
  byte-comparable. Reduced-motion renders the still developed frame.
- Square composition, centered knot; page ground is the piece's own
  black, plates are dark with gold text. Title/date plate top-left,
  "Watch only." hint plate bottom-left.

## Deviations from the prompt

None material. One fix round during QA: the first build gave the knot
a flat gold halo disc with a hard edge, which read too much like a
drawn disc; it was removed and the knot is now a small near-white core
with a soft additive dot halo only.

## QA

Rendered with node ~/workspace/tools/render-piece.js and visually
inspected at 1280x900 desktop, 390x844 mobile, and 720x720 thumb.
Thumb rendered twice after the final edit and confirmed byte-identical
(md5 20f1a9c4d23e0901f81225206bf0233d).
