# №1929 The Long Ferment

Driver: eight jars of half-finished musical ideas ferment on a dark shelf
under a slow season clock, and nothing ever finishes on screen.

FIRST_T: 96. The year is 240 s (four 60 s seasons); one jar is released
every 120 s, twice a year. At t = 96 the first jar is halfway through its
rise off the shelf, the clock reads spring, and the fifth jar was stirred
earlier in the year.

Palette: hand-picked from the prompt's named colors, since
studies/chris-hyson.md does not exist in the repo. Shelf dark wood brown
#4a2f1d, wall #20140d, liquids cloudy amber #c98f2e, teal #3f7d78, bone
#d8cbb2, rust #a6502a, season clock and plates pale chalk #e8e2d2.

Mechanism: eight jar agents, each with a seeded liquid color, fill level,
motif (stems, piano figure, drum loop, vocal line) and cloud blobs.
Cloudiness drifts on the 240 s seasonal clock, so a jar clouded in winter
clears by summer. A release scheduler lifts one jar per 120 s block (jar
block mod 8): 12 s rising out of frame, 6 s empty slot with a chalk
outline, 12 s for a new cloudy jar to settle in, seeded fresh by its
generation count. Once a year jar 5 is opened, stirred once (lid lifts,
two swirl arcs turn) and closed again. Watch only, no audio, no input.

Deviations from the prompt: the release is staged late in each 120 s
block (seconds 90 to 120) so the first frame can catch a jar mid-release;
the season clock also carries a faint arc of the year already past, to
make the slow hand legible at a glance. No progress bars or percentages
anywhere, per the prompt.

Fix log:
- Round 1: first render showed all jars resting at FIRST_T = 96. The
  release window was coded at the start of each 120 s block, so the jar
  had already settled. Moved the release window to seconds 90 to 120 of
  each block (rising 90-102, empty 102-108, settling 108-120) in
  releaseState, jarGen and phaseWord. Re-rendered: jar 0 is now mid-rise
  and the plate reads "a jar leaves".
- Round 2: two-phase probe. Rendered at FIRST_T = 200 (autumn, all jars
  resting, cloudiness shifted) and confirmed the scene differs from the
  FIRST_T = 96 frame.

QA: node render-piece.js at 1280x900 desktop, 390x844 mobile, 720x720
thumb. All three inspected: clock legible, jars read on shelf and phone,
hint wraps to two lines on mobile. Determinism: every jar, cloud and hand
is a pure function of t and the seeded PRNG.

Known warts: on the tall phone frame the composition sits in a band with
generous empty wall above and below, inherent to full-bleed on a tall
screen. The rising jar's lid reads slightly detached from its glass at
mid-rise. The stir swirl is only visible for 12 s of each 240 s year, so
most visits never see it.
