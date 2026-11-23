# №1915 The Deer in Wintercroft (RG4, PP1162, study #250 ruth-goller)

## Driver

A Cafe Oto solo set staged as alpine folk-horror. A performer in a white
polygonal deer mask stands in dry-ice fog; later, the same mask becomes a
cloaked horned figure with a staff in a snow forest. The mask's geometry is
the only hard-edged thing in a soft world. Low bass tones shake the fog
into interference patterns. The figure barely moves; the fog moves for it.

## Mechanism

2D canvas, visual only, no WebAudio. A closed-form 48 s cycle runs two
stagings: I The Mask in Fog (0 to 24 s) and II The Horned Figure in Snow
(24 to 48 s), with a 4 s slow cross-dissolve at each boundary, computed by
a smoothstepped staging alpha. The figure is one static sprite with two
costumes, drawn off-centre at 38 percent of the stage width: the deer-mask
costume in bone white with faceted polygon edges, antlers, ears, eye slits
and a nose triangle; the horned costume in fog grey-blue with a pointed
hood, a dark face opening with two faint bone eyes, sweeping bone horns,
and a dark wood staff with a forked top, a bone charm nested in the fork,
and a hand gripping the shaft. Sway is at most 0.004 rad on a 24 s period.

Fog is layered noise fields: soft radial-gradient puffs drifting slowly,
their sideways displacement driven by a sub-bass oscillator whose
amplitude swells once every 16 s. The figure is drawn between the back and
front fog layers, so fog veils its lower half while the mask stays
hard-edged. Bass interference is two expanding ring sets in cold green,
one at the figure's feet and one further out in the fog, offset by 2 s so
their rings cross; a ring is emitted at each note onset, every 4 s,
decaying over 3.6 s. The forest staging holds the same composition with
seeded pines replacing the dark: distant trees behind the figure, near
trees at the sides, snow caps on every tier, and 70 falling snow dots
drifting down at seeded speeds.

## Frame one

FIRST_T = 6 s. Phase 6 sits mid first staging (the mask in fog, 0 to 24
s): the deer-mask costume stands full in the frame, the bass is near its
peak so the fog displacement reads, and the ripple ring from the note
onset at t = 4 s is 2 s old and clearly visible. Every element, figure,
fog, ripples and snow, is a pure function of t, so frame one is
deterministic and byte-reproducible; the thumb render came out
md5-identical on a second run.

## Interaction

Watch only. There are no pointer handlers and no audio. The mechanism is
stillness: a tap or a click would turn the long holds into a flipbook and
kill the waiting. Never click-to-reload.

## Palette

Hand-picked from the named colors in the prompt; no study file exists for
ruth-goller. Bone white #e8e4d8 for the mask, shaded bone #cfc9b8 for the
cloak shadow side, fog grey #9aa3a8 with pale fog #c3c9cc and #d3d8db for
the drifting layers, snow blue-black #0d1520 for the page ground and the
deepest night #080f18, forest blue #16202e, dark wood #3a2a1e for the
staff, cold green #7fb89a for the bass ripples, hooded cloak in fog
grey-blue #5a6672 with darker hood #49545f, snow ground #c9d2d8.

## Composition

A field-like fog composition: full-bleed on phones, square on desktop,
with the page ground set to the piece's own snow blue-black so the stage
square blends into it. The masked figure stands off-centre against deep
fog; the snow-forest version holds the same composition with trees
replacing the dark. The title plate sits top-left in bone white with the
date line in pale fog, the staging label (I The Mask in Fog, II The
Horned Figure in Snow) sits centred above the hint, and the hint "Watch
the fog answer the bass while the masked figure barely moves." sits
centred at the bottom.

## Motion

All motion runs well under the 14 Hz ceiling: fog drift near 0.05 Hz,
figure sway 1/24 Hz, ripples 1/4 Hz, snow falling slowly. Prefers-reduced-
motion shows the static first frame.

## Deviations

Per the Franke audio rule, the prompt's bass is not built as real audio:
the piece is watch-only and visual-only, with the sub-bass carried by a
closed-form oscillator that drives fog displacement and ripple emission
instead of a WebAudio source. The prompt's two stagings are kept exactly,
with the same figure position and composition in both. No narrative is
added; it stays a mask, a staff, and fog.

## Gallery note

"Watch the fog answer the bass while the masked figure barely moves."

## QA

Rendered from the actual script with node-canvas and visually inspected:

- Desktop 1280x900: deer-mask figure reads (faceted mask with eye slits
  and nose, antlers with tines, ears, cloak with shaded half and fold
  line); soft fog puffs behind and in front of the figure; faint cold
  green ripple rings at the figure's feet and out in the fog; title, date,
  staging label and hint all clear, no overlaps.
- Mobile 390x844: full-bleed framing holds; figure, mask and all text
  legible, no overlaps.
- Thumb 720x720: same first frame, legible at small size.
- Staging spot-checks at t = 22 (cross-dissolve, both costumes ghosting
  together as intended, label still I) and t = 30 (horned figure in snow:
  hood with dark face and two eyes, horns, staff with forked top and charm
  nested in the fork, arm and hand gripping the shaft, snow-capped pines,
  falling snow, label II).
- Fix rounds: the first fog pass used flat ellipses that read as soap
  bubbles, rebuilt as soft radial-gradient puffs; the mask first floated
  above the cloak with a visible gap, lowered so the muzzle overlaps the
  shoulders; the figure was enlarged from u 0.10 to 0.12 of the stage;
  the staff charm first floated above the fork, moved down to nest inside
  it; ripple alpha raised from 0.30 to 0.36 so the rings read at frame one.
- Determinism: no Math.random, no Date.now, no wall clock; thumb renders
  md5-identical on a second run.
- Known warts: the tree trunks read as plain dark blocks against the pale
  snow ground; the horns are nearly straight sweeps rather than curved.
  Both are within the flat, hard-edged style of the piece.
