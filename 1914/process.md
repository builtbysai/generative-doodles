# №1914 Footfoot (RG3, PP1161, study #250 ruth-goller)

## Driver

A red rug on a dark floor, shot from directly above. Bare feet work a
pedalboard: Whammy, Freeze, octave box. The feet have their own
choreography, independent of whatever the hands might be doing offscreen.
Each pedal press freezes a loop: the Freeze pedal holds a chord in a soft
halo while the feet move on. The loops stack as rings on the rug, pulsing
at their own tempos, until the rug is a clockwork of overlapping frozen
moments. The feet are the whole instrument. No hands, no instrument.

## Mechanism

2D canvas, visual only, no WebAudio. A closed-form 24 s choreography cycle
drives two foot agents from keyframe tables, interpolated with smoothstep,
with separate press windows so a foot can hesitate (a small tremble in the
half second before a press) before committing. Freeze events fall at 3, 9,
15 and 21 s; octave events at 6 and 18 s; the Whammy press runs 11 to
12.6 s. Each Freeze event spawns a pale gold halo ring on the rug centre,
radius by event index (10, 13.5, 17, 20.5 rug units), each with its own
pulse frequency (0.45 to 0.78 Hz) and phase, decaying as exp(-age/10) over
about 30 s. The rings are deliberately not synced to a master clock; their
drift against each other is the point. Each octave event adds a darker
shadow ring at half the freeze frequency, sitting just outside the freshest
freeze ring. Pedal LEDs glow while pressed and decay for 2 s after release;
the Whammy treadle tips while the foot holds it down. Halos are clipped to
the rug rect so the rings never spill onto the floor.

## Frame one

FIRST_T = 21.6 s. The left foot is mid-press on the Freeze pedal, a fresh
halo only 0.6 s old, and three older rings are already stacked on the rug
(aged 6.6, 12.6 and 18.6 s), each pulsing at its own tempo, plus a faint
octave shadow ring from the press at 18 s. The right foot is drifting back
to the frame edge after its octave press. Every foot, pedal and halo is a
pure function of t, so frame one is deterministic and byte-reproducible;
the thumb render came out md5-identical on a second run.

## Interaction

Watch only. There are no pointer handlers and no audio. The mechanism is
the stacking and decay of the halos against the feet's choreography; a
tap-to-advance would turn it into a flipbook. Never click-to-reload.

## Palette

Hand-picked from the named colors in the prompt; no study file exists for
ruth-goller. Rug crimson #8f1d2c with a darker border band #6e1420 and a
pale gold rule #d9b36a; frozen-loop halos in pale gold #e8c878; pedal LEDs
in green #3fd47a and red #e5484d; floor in near-black #0d0b0c; pedalboard
#1a1712 with pedal bodies #241d18; bare feet in skin #c89b7a with shading
#8a6248 and pale gold toenails. Gallery note: "Watch the feet work the
pedals while frozen loops stack on the rug."

## Composition

Overhead square: the rug centred with a margin of dark floor on desktop,
full-bleed across the width on phones, per the field-piece house rule. The
pedalboard runs along the rug's lower third with Whammy, Freeze and octave
in a row, each labelled. The rug carries a faint weave dot grid, a double
pale gold rule, a centre diamond medallion the rings stack over, and fringe
along the top and bottom edges. The title plate sits top-left in pale gold
on the dark floor; the hint runs centred along the bottom. The feet enter
from the frame edges, toes down toward the pedals.

## Motion

All motion runs near 1 Hz or slower, well under the 14 Hz ceiling. The
feet bob gently while hovering, tremble before a press, and squash slightly
flat while pressed. Prefers-reduced-motion shows the static first frame.

## Deviations

Per the Franke audio rule, the prompt's pedalboard is visual only: no
WebAudio, no sound model, since the piece is watch-only. No hands or
instrument appear, per the prompt. The octave shadow ring is drawn darker
than the freeze halos, as a shadow rather than a second gold ring.

## QA

Rendered from the actual script with node-canvas and visually inspected:

- Desktop 1280x900: crimson rug centred on the dark floor, four stacked
  gold rings over the diamond medallion, pedalboard with three labelled
  pedals, left foot pressing Freeze, right foot drifting at the right
  edge, title, date and hint all clear, no overlaps.
- Mobile 390x844: full-bleed rug holds; rings, pedals, feet and all text
  legible, no overlaps.
- Thumb 720x720: same first frame, legible at small size.
- Motion spot-checks at t = 6 (right foot pressing Octave, Freeze LED
  glowing green from the press at 3 s, left foot hovering near Whammy)
  and t = 12 (left foot pressing Whammy with the treadle tipped, Freeze
  LED glowing from the press at 9 s, right foot returning to the edge).
- Fix rounds: the rug fringe first struck through the date line and the
  hint (rug shrunk to 0.80 of the stage and shifted down 12 px); the foot
  first read as a thumb (heel shading arc removed, toes enlarged and
  spread, arch line kept).
- Determinism: no Math.random, no Date.now, no wall clock; thumb and
  desktop renders md5-identical on a second run.
- Known wart: at some phases a foot covers its pedal's LED or label while
  pressing; that is the foot doing its job, not a defect. The right foot
  is cut by the frame edge at rest, by design.
