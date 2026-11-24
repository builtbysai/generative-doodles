# No.872 "The Meet-Up"

SOA2 / PP1272, study #264 sheldon-omar-abba. Formula date 2004 · 06 · 01.

## Prompt summary

A recurring civic ceremony in a parking lot. Cars ring the lot, hoods
open, kids leaning out of windows, a man scrolling his phone on the
hood of a mint-green Caprice, the waiting kept in the frame. Nothing
is posed that was not already happening. Palette: golden-hour parking
lot, chrome, asphalt, phone-screen blue. Composition: the lot as a
circle of activity, no single hero. The ritual is the subject, so the
frame holds the whole ring. Motion: the meet-up runs its evening
loop: arrivals, door-slamming, slow circling, the long wait. TAP
earned: tap to jump to next year's meet-up (same lot, slightly
different cars, the kids taller). The recurrence is the mechanism, so
advancing the recurrence is a faithful control. Technical: a
recurring-event generator with a year parameter; the ritual
choreography stays fixed while the year changes the props. Avoid:
trophy shots, judging lines, the event ever ending.

## The driver

The wait. The piece is about a ceremony that happens every year in
the same lot and never ends, so the image is a ring with no hero and
no climax: seven cars parked nose-in around a painted ring, the
mint-green Caprice at the front with its hood open and a man
scrolling his phone on it, kids leaning out of three windows, two
figures talking in the middle beside a cooler, a folding chair and a
grill. One car slow-circles the driving lane with its headlights on,
a door slams once per cycle, the grill smoke rises, the golden light
breathes. Nothing arrives and nothing leaves. The tap does not
interrupt the ritual; it advances it by one year, which is the only
change the ritual allows.

## Palette

Warm asphalt #4a3e34 with a lighter lot ellipse #5c4e40, faded
paint #d6c49e, grass verge #60683a, cream #f6ecd8 caption and hint.
Car colours are drawn per year from a muted twelve-colour bank
(cream, maroon, navy, silver, teal, rust, charcoal, gold). The
Caprice is always mint green #a8d8c4. Phone-screen blue #609ee8 is
the one cool accent: the man's phone and its glow on his shirt.

## The year generator

Five fixed years, 2023 to 2027, in order, wrapping. Each year is a
seeded assignment (mulberry32 on 872, year index) of colours and
body styles (sedan or hatchback) for the seven ring cars and the
circling car, plus a kid height factor that grows 0.72 to 1.08, so
the kids get taller every year. The choreography is fixed across
years: same ring slots, same kid slots, same Caprice in the same
place, same door, same circling car, same centre group. A small sign
at the top of the lot carries the meet-up year, so the tap's effect
is legible in the frame itself.

## Motion

60 s cycle, FIRST_T 6 s. All motion is a pure function of cycle
phase, so the frame at FIRST_T + 60 equals the frame at FIRST_T.
The circling car makes one slow lap of the driving lane per cycle.
Slot 3's driver door swings open over cycle seconds 18 to 20.7,
holds, and slams shut by second 25.8. Kids bob on a double-frequency
sine, the two centre figures sway, grill smoke rises on a three
wisp schedule, and the golden-hour wash warms and cools by a few
percent over the cycle. Shadows stretch a little as the evening
wears on. No flicker above 0.2 Hz anywhere by construction.

## Interaction

Tap jumps to next year's meet-up. The year index advances, and a
0.8 s golden band sweeps left to right across the frame while the
new year's cars settle in. Taps during the sweep are ignored; the
first tap after the sweep advances again. The walk wraps from 2027
back to 2023. No click-to-reload anywhere.

## Deviations

None material. Visual only, per the Franke audio rule. The door
slam, the circling car and the grill are invented staging inside the
prompt's stated loop (arrivals, door-slamming, slow circling, the
long wait). The five years 2023-2027 are the generator's fixed
range; the gallery date stays the formula date 2004 · 06 · 01.

## QA

Rendered with node ~/workspace/tools/render-piece.js at 1280x900
desktop, 390x844 mobile and 720x720 thumb; all three inspected
visually. Probes run against the actual script: loop seam t=6 vs
t=66 differs 0.00 percent; time probes t=6 vs t=21 and t=6 vs t=36
differ 3.65 and 4.35 percent above threshold; door region t=24 vs
t=25 differs 2.27 percent; tap walk 2023 to 2024 to 2025 to 2026 to
2027 to 2023; mid-transition tap ignored, post-sweep tap advances;
year 2023 reproduced exactly (0.00 percent) after a full five tap
walk; 2023 vs 2024 settled frames differ 7.84 percent above
threshold. Door-open, mid-sweep and settled 2024 frames rendered
and inspected. Fix rounds: x2. Round 1: shadow offset was computed
in the wrong units and floated detached from the cars; the Caprice
was drawn nose-out with its open hood at the trunk end; the
circling car was drawn over the parked cars. Fixed by expressing
the shadow in car-length units, pointing the Caprice nose-in, and
drawing the circling car first so parked cars occlude it.

## Known warts

The circling car passes close behind parked cars at the sides of
the ring and briefly overlaps their outer corners; it reads as
passing behind them, which is the intended depth. The door is a
small detail and is partly hidden when the circling car passes
slot 3 at the same phase. Kids are small pictograms and read as
coloured dots at thumb size. On tall phones the ring is a tall
ellipse with a quiet centre; the centre figures are small. The
golden-hour wash shifts every pixel by a level or two across the
cycle, so raw pixel diffs read near 100 percent; thresholded diffs
above 8 levels are the honest measure here.
