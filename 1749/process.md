# The Inventory Title, No. 1749

ZM6, study #229 studio-zimoun. Watch-only piece.

Gallery note: "A field of ticking kraft units lives and dies under a single line of type that counts them honestly. Watch only."

## Driver

A plain white room, a loose field of small ticking units in the lower
two-thirds, and one line of small type in the top margin that reads as a
live material list. The number in that line is the actual census: units
die and respawn on staggered lifespans, and the count follows them. The
label is the piece, so there is no second caption anywhere.

## Build log

Built 2026-11-13 from the TASKS.md prompt verbatim, with No. 1748 as the
house template.

## Decisions

- Palette, hand-picked from the prompt's named colors
  (studies/studio-zimoun.md does not exist locally): plain white ground
  #FFFFFF, kraft tan units #C49A6C with a darker kraft variant #A67C4E,
  black ticks and dots #111111, inventory type in dark grey #444444.
  Nothing else.
- Units: a fixed pool of 312 slots. Each slot has a seeded lifespan of
  6 to 18 s and a gap of 1 to 4.5 s. A slot is alive when
  (t + offset) mod period is less than its lifespan, so the live census
  is a closed-form function of piece time with no frame-integrated state.
  Each unit is a small kraft square with a black tick hand that rotates
  at a seeded rate of 0.6 to 2.4 rad/s, plus a black center dot. Units
  fade in and out over 0.9 s at each end of a life.
- Inventory line: canvas monospace type in dark grey, centered in the
  top margin, reading "{live} prepared oscillators, cotton balls,
  cardboard box 70x70x70cm". The number is the live census, recomputed
  from the same closed-form state every frame; the pool total of 312 is
  not shown, because the prompt requires the number to equal the
  rendered units, and the rendered units are the live ones.
- Composition: units fill y 0.36 to 0.94 of the viewport, loosely, with
  generous empty space around the top label. Field-like, so full-bleed
  on phones and square on desktop per the house rules.
- Plates: title, formula date 2006 · 10 · 26 and hint "Watch only." on
  pale plates with a grey rule, stacked in the bottom-left corner. The
  usual top-left plate spot would collide with the inventory label, so
  the plates moved down; unit positions are rejection-sampled out of
  that corner at load, so no live unit is ever hidden behind a plate.
- Determinism: mulberry32 seed 1749 for every unit parameter; frame one
  fixed at t = 60.0 s with the field already populated. No Date.now,
  Math.random or performance.now anywhere in frame one.

## Deviations

- Gallery title/date/hint plates sit stacked bottom-left instead of the
  usual top-left, because the prompt's inventory line owns the top
  margin. The plates stay small and clear of the field, and units are
  seeded out of their corner.
- The inventory number counts live units only, not the 312-slot pool;
  this is what the prompt's honesty rule requires.

## Probe results (node probe, census)

Pool 312 slots, 0 units in the plate zone at every size. Live count,
drawn count and the number in the inventory line agree at every sampled
time:

- 1280x900 desktop: t=0: 239, t=10: 246, t=30: 253, t=60: 246,
  t=120: 257, t=300: 252.
- 390x844 mobile: t=0: 246, t=10: 256, t=30: 262, t=60: 256,
  t=120: 247, t=300: 249.
- 720x720 thumb: t=0: 257, t=10: 253, t=30: 258, t=60: 258,
  t=120: 257, t=300: 256.

Counts differ slightly by size because the plate-corner rejection
sampling consumes a different amount of the seeded sequence at each
size; each size is deterministic on its own. Frame one (t=60) shows
246 live units on desktop.

## QA

Rendered from the actual script with node render-piece.js at 1280x900,
390x844 and 720x720; all three inspected visually. Inventory line
readable at every size, field populated at frame one, plates clear of
the artwork, no clipping or phone overflow. No fix round needed.
thumb.png is the 720x720 render.
