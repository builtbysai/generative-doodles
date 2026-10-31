# No.653 - Cinco Estrellas

EXPANSION #79 francisco-gazitua, prompt block 5 "Cinco Estrellas". His
Constelacion de la Cruz del Sur as a suspension system: "Cinco estrellas,
sostenidas y centradas en el espacio por la flexibilidad del acero y la
permanencia de la piedra."

## Concept

Black space. A low granite base band fills the bottom fifth of the frame.
Above it, five stone points hang in the true geometry of the Southern Cross,
each a flat paper-white angular shard, held by thin steel lines that converge
on a small ring anchor above center, with weaker lines interconnecting the
cross arms. The constellation hangs still, swaying almost imperceptibly.
Drag any star and the whole figure flexes, the stretched lines thinning as
they lengthen; release and it breathes back to the true cross and settles.
No labels, no decorative stars, no twinkle, no text.

## Construction

- Single self-contained index.html, canvas 2D, strict palette: ground
  #0A0A0B, stars paper #F2EDE4, steel lines #8A8A8C, base #3A3A3D.
- Star coordinates. Catalog positions projected onto the tangent plane
  (x offset = delta RA x cos Dec, y offset = delta Dec), then oriented as
  the cross is seen facing south, so east (Mimosa) falls to the left and
  the most southern star (Acrux) sits at the foot. Normalized units,
  x right, y down; the cross spans 6.00 vertically and 4.07 horizontally.

  | star    | RA (deg) | Dec (deg) | norm x | norm y | shard size |
  |---------|----------|-----------|--------|--------|------------|
  | Gacrux  | 187.79   | -57.11    |  0.04  | -2.99  | 0.85       |
  | Acrux   | 186.65   | -63.10    |  0.61  |  3.00  | 1.00       |
  | Mimosa  | 191.93   | -59.69    | -2.03  | -0.41  | 0.92       |
  | Imai    | 183.79   | -58.75    |  2.04  | -1.35  | 0.72       |
  | Epsilon | 185.34   | -60.40    |  1.26  |  0.30  | 0.55       |

  Shard sizes follow apparent magnitude (Acrux brightest and largest,
  Epsilon dimmest and smallest). Each shard is a seeded irregular polygon
  of 6 to 8 vertices (mulberry32, seed 653001), a stone chip, never a
  star glyph. Shard outlines and the base band's irregular top edge are
  the only uses of the RNG.
- Physics: Verlet integration at a fixed dt of 1/240 s on the anchored
  clock (rAF timestamps, offset plus elapsed since load, never Date.now),
  followed each step by iterative distance-constraint projection: rigid
  tethers from each node to the fixed ring anchor, and compliant
  inter-node springs (correction factor 0.20) along the cross outline
  (head to each arm, crossbar, arms to foot) plus Epsilon's two braces.
  Light gravity (55 px/s^2). A gentle sinusoidal sway force (5 px/s^2)
  keeps the idle hang barely alive.
- Home springs: each node also feels a spring toward its own rest place
  (KH 26 /s^2), the y target pre-sagged by GRAV / KH so the hang settles
  on the true cross rather than below it. Velocity damping is a per-step
  keep factor of 0.9795 (decay rate about 5/s, near half of critical for
  the home spring), so a release overshoots once, gently, and settles
  within a few seconds. A per-step displacement clamp keeps the solve
  stable under violent pointer motion.
- Lines show stretch by thinning: width falls from about 1.12 px toward
  a 0.45 px floor as a line's length grows past its rest length (links
  drawn at 0.85 of that), per the prompt's stretch rule.
- Drag: pointerdown within a node's grab radius pins it (position and
  previous position both set to the pointer each step, so the held star
  carries no Verlet velocity); on release the star starts from rest at
  the displaced position and the springs drive the oscillation. Nothing
  else responds to input; there is no reset and no reload interaction.
- Rest solution: nodes initialise exactly at the layout positions with
  zero velocity, so frame one is the true cross with taut lines, drawn
  synchronously at t = 0 before any step runs. Layout is rebuilt on
  resize (cross scale = min of height and width fits), and the sim
  resets to rest on resize.
- Canvas size comes from the Visual Viewport API with resize listeners
  on visualViewport and window; draw() pins canvas.style.width/height
  in px. Phone detection via window.screen (min dimension under 700 px)
  with aspect fallback (h > w x 1.15); on phones the cross scales to
  80 percent of width and nothing clips. rAF is typeof-guarded. No
  audio, no microphone, no offscreen canvas, no filters, no gradients.
- QA hooks (house standard, inert in normal viewing): ?seed=disturb
  draws the synchronous frame with Acrux pulled off its rest position,
  unsolved, so line stretch and thinning can be checked headlessly.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). All
  three read back: five paper shards in a recognisable Southern Cross
  (Gacrux head, Acrux foot and largest, Mimosa left, Imai right and
  higher than Mimosa as in the real sky, Epsilon small beside the
  Acrux-Imai side), steel lines fanning to the ring above, granite
  base band below, nothing clipped on mobile, no text.
- Determinism: thumb.png rendered twice and cmp-compared
  byte-identical; second render deleted. Frame one is the synchronous
  draw at t = 0 at the rest solution.
- Disturbed state verified two ways, both throwaway and deleted after
  read-back: (1) a ?seed=disturb render at 720x720 showing Acrux pulled
  down-left with its lines stretched; (2) a scripted drag simulation
  (rAF and pointer events driven headlessly for 14 s): Acrux pulled
  158 px to the lower left, held, released. Shard centroids measured
  from the pixels against rest (Gacrux 361,151; Imai 473,242; Mimosa
  247,293; Epsilon 429,333; Acrux 395,482 at 720x720): while held,
  Acrux sat 113 px off home and the web flexed with it (Epsilon drawn
  100 px along, Imai 76 px); 0.5 s after release every star was within
  8 px of home; from 5.5 s to 14 s all centroids matched rest to 1 px.
  The sim neither explodes nor drifts.
- Grep confirms zero Date.now, Math.random, createElement,
  AudioContext, gradients, or shadowBlur in the file.
- Fix rounds during QA: (1) the first frame-one read-back had small
  pebble-like shards and a dense triangulated web that hid the cross;
  shard radius rose from 0.20 to 0.30 of a unit and the link set was
  cut to the cross outline plus Epsilon's braces (the Gacrux-Acrux
  spine link and the Epsilon-Gacrux link were dropped; the tethers
  hold the vertical). (2) The first drag simulation showed a hard pull
  cartwheeling the whole constellation around the single ring anchor:
  tethers plus links alone leave rotation about the anchor free. Home
  springs were added (see Deviations), the held star's Verlet velocity
  was zeroed so release energy comes only from displacement, link
  compliance dropped from 0.45 to 0.20 so links stretch instead of
  dragging the web rigidly, and velocity damping was retuned from a
  0.36/s decay (badly underdamped, many visible cycles) to about 5/s.
  The re-run simulation above is the result.

## Deviations

- Epsilon Crucis placement: the brief describes the fifth star as
  offset beside the Acrux-Mimosa arm, but its catalog position places
  it beside the Acrux-Imai arm, between Acrux and Imai on the west
  side. The same brief demands true Cruz del Sur geometry, so the
  catalog position wins and Epsilon sits at its real coordinates
  (1.26, 0.30). Recorded here rather than silently.
- Home springs are an addition to the brief's listed model (tethers,
  inter-node springs, light gravity). They are required for the
  brief's own outcome, a constellation that flexes and breathes back
  to the true cross: without them the figure is a rigid body free to
  rotate about the one anchor point, and a firm drag flips it over
  the ring (observed in simulation). The springs realise the artwork's
  stated doctrine, stone points held and centered in space, and are
  weak enough that a held drag still flexes the figure by over
  100 px. Gravity sag against them is pre-compensated, so the settled
  hang is the catalog cross, not a drooped copy.
- The held star carries no throw velocity on release (see
  Construction). The brief does not ask for a throw, and zeroing it
  keeps the settle to the brief's single gentle oscillation.
