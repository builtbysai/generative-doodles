# №119 Grassline - process

## Concept
From Michaël Zancan's grass.js, reached through the lammetje network
study. A field of plant-like density built only from vector strokes:
thousands of short 1px segments placed by a growth rule, accumulating
into thickets that read as vegetation from a distance and pure linework
up close. Plotter aesthetic, uniform stroke weight, no fills. Paper
#F4F1E6, ink #1A1A18, and one seeded accent family; the seed drew iron
red #8A2A1A.

## Construction
- Canvas 2D. A pool of growing tips rises from three root points along
  the bottom edge. Each step advances a tip along its heading with
  noise, an upward bias, and a gentle pull toward its home column; tips
  fork probabilistically at golden-angle jitter and inherit their
  lineage's colour (about one lineage in ten is accent). Segments are
  capped at 38,000 and the oldest recycle out.
- Tip lifetime is measured in frame-height units, so stems span the
  full height on tall phone frames as well as desktop. Growth is
  pre-rolled at load (bounded so recycling cannot eat the stem bases),
  so the first synchronous frame already shows a developed thicket.
- Segments draw batched by colour, age bucket and depth band: fresh
  growth is full weight at the roots and lightest at the tips. The
  fingertip is wind: dragging builds a gust that bends nearby stems
  with a height-weighted falloff, and on release the gust decays and
  the stems spring back. Growth never stops.

## QA log
- Rendered at 1280x900, 390x844 and 720x720 and inspected, three passes.
- Fix 1: age-only alpha made the young growth at the top darkest and the
  roots palest, inverting the composition. Compressed the age range and
  added depth weighting (roots full weight, tips lightest).
- Fix 2: tip lifetime in fixed steps left the top half of tall phone
  frames empty, and an over-long pre-roll let recycling sever the stem
  bases, floating the thicket. Lifetime now scales with frame height,
  pre-roll is capped against the segment budget, and a weak home-column
  pull (tuned down after a first attempt braided the stems into ropes)
  keeps each thicket over its roots without tying it down.
- Final renders: three rooted thickets on desktop, dense at the base and
  sparse at the tips; on mobile the thickets merge into one lush
  full-bleed mass.
