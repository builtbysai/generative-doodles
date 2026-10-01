# №9030 · River System: process notes

## Seed
268 "River System" (FUTURE_PIECES seed 63, from the Nature of Code study).
Default seed 268; `?seed=` picks another river, click reseeds a fresh one.

## Concept
An adaptive river ecosystem, drawn as ink on warm paper. A slow river winds
across the page on a time-varying 2D noise flow field: faint slate current
streaks ride the field between two hand-wobbled ink banks. In it live 24
small fish, each a Reynolds Vehicle with four steering drives: riding the
current (flow-follow), hunting food (seek), settling to feed (arrive), and
keeping distance (separation). The piece is the adaptation, not the field.
Every fish keeps exponential traces of its own recent history, how well it
has been eating and how crowded it has been, and every fraction of a second
it re-aims its four weights from that history: hunger raises hunting,
feeding raises settling, crowding raises spacing, calm raises drifting.
Weights relax slowly, so over two or three minutes the school visibly
changes character from a loose blue stream of drifters to a gold, settled
feeding school, then scatters red hunters when the patch runs dry.

Each fish carries its readout on its body: a tail ribbon stamped with the
color of whichever drive currently leads, plus a tiny four-segment bar by
the head showing all four weights at a glance. Along the bottom edge a
memory ledger stacks the whole school's average weights, one thin column
per second, about five minutes deep, so the adaptation has a written
record. Food is finite: amber patches bloom, get eaten down, and regrow;
drifting motes ride the current. Press and hold anywhere and that patch of
river starves: the water goes grey, the food dies, and the school visibly
reroutes around the dead water. Let go and it slowly comes back to life.

## Family
adaptive-behavior ecosystem instrument: 24 Vehicles whose
seek/arrive/separation/flow weights adapt from each creature's own recent
feeding and crowding history (exponential memory traces with slow weight
relaxation), ribbon tails colored by dominant drive, per-fish four-segment
weight readouts, a population memory ledger strip along the bottom edge,
and hold-to-starve rerouting, all in ink on warm paper over a time-varying
noise flow field inside a meandering channel.

## Differentiation
- Not №8992 Confluence: that is dark, additive smoke whose particles tint
  by flow direction and pool white at convergences. This is opaque ink on
  paper; the field is only weather, and the color lives on the creatures'
  behavior, not on the flow.
- Not №9008 Field Notes: that is a static, layered inked flow field, the
  field itself as portrait. Here the field is deliberately quiet scenery;
  the subject is 24 agents whose steering weights learn.
- Not №9026 Flight Deck: that is a 3D z-stack flight through particle
  trails. This is a flat 2D plate you read like a naturalist's chart,
  ledger included.
- Not №9007 Old Courses: no survey plate, no cartouche; the river is
  alive and present-tense, and nothing about it is a map of the past.

## What I iterated
- First build jammed: fish camped at the inlet where food spawned and
  piled in the left corner. Fixed by raining motes along the whole river,
  a soft wall at the inlet, and a wrap-around river so downstream fish
  re-enter upstream instead of stacking at the edge.
- Food balance took three passes. Too scarce and the school locked into
  permanent hunting (all red); too rich and it locked into settling (all
  gold). Tuned patch drain, regrowth, bite size, and metabolism until the
  diagnostics showed real phases: drift, hunt, settle, disperse.
- Settlers originally stacked on one point at each patch. Each fish now
  holds its own slowly circling anchor spot in the patch, so a feeding
  school reads as a loose ring, not a knot.
- Weights adapt in audited phases, verified by an in-page diagnostic
  (mean weights, dominant-drive counts, closest-pair distance) at
  simulated minute 3 versus minute 0.
- Strengthened readouts rather than seeds: ribbon color by dominant
  drive, four-segment bars per fish, and the ledger strip with plain-word
  legend (current, food, settle, space on narrow screens).
- Portrait phones: the meander is gentler and the channel wider so the
  river keeps its presence at 390x844.

## Verification
- Zero console errors or page exceptions at 1280x800 and 390x844
  (cdp_exceptions.py, isolated port 9337, 30s and 20s watches).
- No scroll or overflow at either size; click and tap reseed; press and
  hold starves (verified with a synthetic hold: the starved disc emptied
  and red seekers rerouted around it).
- thumb.png is exactly 1280x720, captured from the seeded run once the
  school had learned the river, gold migration arcs and all.

## Gallery note suggestion
*twenty-four small swimmers keep relearning the same river, and the strip along the bottom remembers how*
