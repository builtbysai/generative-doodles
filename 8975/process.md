# №8975 · Euclid Necklace — process notes

## Concept
Seed 128: one cycle of a euclidean rhythm, strung as beads. Bjorklund's
E(k, n) becomes a ring of n bead slots: hits are filled gem beads (base
color, a lighter inner circle, a white highlight, a hairline rim), rests
are open hairline rings. A second rhythm rides a smaller ring inside,
rotated by a seeded offset; one hairline thread runs through every bead
in slot order, smoothed with a closed Catmull-Rom so it hangs like a
real cord instead of a zigzag. Each ring's downbeat gets a diamond
marker, and a hairline arc on the inner ring shows exactly how far the
inner rhythm is turned. A diamond clasp sits at the center. The label is
set into the composition, small and honest: "3 over 8 · 5 over 8 ·
turned 6", with the dot pattern of each rhythm as it actually sits on
the ring, plus a tiny "bjorklund's algorithm, after euclid" credit.
Palettes are one committed OKLCH family per seed (four bone grounds,
two night grounds); the whole page, header to footer, re-themes with
the palette. Click re-strings the necklace: new rhythm pair, new turn,
new palette.

## Success criteria
The diagram reads as jewelry and as music at once. A drummer spots the
tresillo on sight: the default seed deals E(3,8) = x · · x · · x · on
the outer ring against E(5,8) turned 6 inside. The rotation must read as
intentional, not accidental: the arc plus the "turned 6" note plus the
two downbeat diamonds carry that. Bead spacing must feel jeweled, never
cramped, at n = 8, 12, and 16. Plotter-friendly by design: every bead
is a circle, every line a hairline.

## Differentiation from adjacent used families
№9017 Strata Break is concentric ink rings dissolving from order into
chaos with one red ring. This is the opposite gesture: a single precise
bead ring (two, actually, one inside the other) encoding a musical
rhythm, no dissolution, no chaos gradient, a jewelry diagram rather than
an ink study. №8995 Hour Hands is also concentric rings, but it is a
live clock sampling palette journeys with hands and numerals; this is a
static rhythm score with beads, a string, and a downbeat. №9018 Three
Shapes is a tangent chain with construction lines; nothing in the
gallery does rhythm, beads, or a strung thread. The family is new.

## What changed during tuning
1. *The thread started as a straight zigzag* and read as a geometry
   diagram, all spikes. Smoothing it through a closed Catmull-Rom made
   it hang like a cord, with the occasional organic loop where it rounds
   a bead. That single change took it from diagram to necklace.
2. *The inner downbeat marker first sat inside the inner ring* and
   collided with beads on some seeds. Moved it into the gap between the
   rings, symmetric with the outer marker that floats above the outer
   ring. No collisions on any seed tried since.
3. *liteA had a leftover junk expression* (`pal.a[2] * 0 + pal.a[1]`)
   from drafting; simplified to `pal.a[1]` before any render that
   mattered.

## Seeds tried, and why the final won
Seven renders inspected at full size: 128 (default), 7, 42, 99, 2024,
555, 31337, plus one click re-roll (1943790060). All seven are
genuinely good: 7 gives bone and indigo tresillo over cinquillo; 42
gives bone and plum at 5/7 over 16, dense but still jeweled; 99 gives
bone and madder, warm ambers; 2024 and 31337 give the night phosphor
ground with glowing beads; 555 gives bone and verdigris at 3/5 over 8.
The click re-roll landed on night garnet, 3/7 over 16, and the whole
page re-themed cleanly with zero errors. Seed 128 won the default
because it is the brief in one image: tresillo over cinquillo, the two
rhythms a drummer knows by name, on the bone and verdigris ground, and
the turn of 6 puts the inner downbeat where the arc reads clearly.

## Caption (gallery voice)
A tresillo and a cinquillo, strung on one thread and turned against
each other like they are dancing.

## QA
- `cdp_exceptions.py` on `?seed=128` at 1280x800: exit 0, no
  exceptions, no console errors, no log entries.
- Click re-string tested over CDP: caption updates (seed 128 to a fresh
  seed, new pair/turn/palette), composition re-renders, zero errors.
- 1280x800 desktop: no scroll or overflow (scrollWidth/Height equal the
  viewport); composition centered with room for the label.
- 390x844 mobile: no overflow, bead diagram still reads, caption and
  footer present, zero console entries.
- No external resources anywhere in the page (plain canvas + inline
  script), so there is nothing to fail offline.
- Thumb captured at exactly 1280x800 from the final build, default
  seed.
