# Peripheral Score, №1877 (SM6, PP1124, study #245 simone-massaron)

## Spec
An extreme close-up of weathered rock fills the frame, every pit and
lichen patch sharp. A thin reading head, a vertical hairline, drifts
across the surface; wherever it passes, the texture's dark pits and pale
veins transmute into score marks: dots, slurs, jagged dynamic wedges,
floating on a translucent staff that follows the head. The marks shiver
as if just played, then settle back into rock. The surface never
repeats: new texture scrolls in from the right as the head advances.

## Palette
Rock grey base #82806F (mix of #7A7568 and #8A8578), dark rock #55524A,
pale rock #B8B2A4, pits #3A372F, veins #C9C2B0, lichen pale green
#A8B08A and rust #A96A45, score-mark black #1A1815, hairline white
#F5F2EA, ground #5A564A, plate #1A1815 with title ink #F5F2EA and hint
ink #CFC8B8. Hexes hand-picked from the prompt's named colors; the
study file studies/simone-massaron.md does not exist in the muse-soul
repo.

## Motion and interaction
Drag earned. Drag horizontally to steer the reading head across the
texture; the surface is the score and skimming is how it is read.
Release and the head continues on its own drift (22 world units per
second, easing back toward a slow sinusoidal path). The drag changes
what gets played, not the playing itself. Never click-to-reload.
As the head crosses a pit, vein, or lichen patch, a score mark is
emitted at that spot and a short prepared-guitar tick or scrape sounds
(Karplus-Strong pluck; dots high and short, slurs mid and longer,
wedges low with a noisier decay). Marks shiver for about 1.2 seconds,
then fade back into rock over 3 seconds. Audio starts only inside the
first drag; there is no autoplay. Reduced motion freezes at the fixed
first frame with no shiver.

## Technical approach
2D canvas with WebAudio. Procedural rock texture from seeded tiles
(160 world units wide, mulberry32 per absolute tile index): blotches,
pits, pale veins, lichen clusters, and fine speckle, regenerating
seamlessly ahead of the head as it scrolls. A feature detector reads
the tile feature lists under the head and emits score glyphs: pits
become dots, veins become slurs, lichen becomes dynamic wedges.
Frame one is deterministic: fixed phase t = 9.0 s, head at world
position 1600 and screen fraction 0.42, eight glyphs pre-seeded from
features the head has just passed with fixed ages, seeded RNG only,
no Date.now or Math.random in the visual. Shiver runs at 7 Hz and
6.3 Hz terms, under the 14 Hz flicker limit by construction.

## Deviations from the prompt
One presentation deviation: score marks are quantized to the nearest
of the three staff lines (with a small deterministic offset) instead
of sitting at the exact height of the feature that spawned them. The
prompt wants the marks floating on a staff that follows the head; at
raw feature heights most marks fell far from the staff and read as
stray rock, not notation. Their horizontal position, type, and timing
still come from the feature under the head. One technical note: tile
base tints were removed after QA showed faint straight seams at tile
edges; all tonal variation now comes from the blotches.

## QA
Rendered the actual script with node render-piece.js at 1280x900,
390x844, and 720x720 and inspected all three. Desktop: seamless rock,
hairline and staff visible, marks on the staff lines, plates legible,
ground clean outside the square. Mobile: full-bleed rock, plates and
hint legible and unclipped. Thumb: clear at small size. Thumb is
byte-identical to a fresh independent re-render (md5
5bc3724327c558c9532f679059759622, twice). Two fix rounds: (1) score
marks sat off the staff and tile seams showed as vertical bands;
marks were quantized onto the staff lines and blotch alpha lowered;
(2) seams still faintly visible, so per-tile base tints were removed
in favor of one uniform base, and the seeded marks were tightened
into the staff band.
