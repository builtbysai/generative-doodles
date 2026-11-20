# №1918 Dolomite Water (RG7, PP1165, study #250 ruth-goller)

## Driver

One water particle's journey through the Dolomites, told in four
languages that never translate each other. The particle falls as alpine
rain, joins a stream, rests in a high lake, seeps into limestone, and
returns as mist over the Peitlerkofel meadow. Each language names a stage
of the journey; the languages just take turns. The bass sits underneath
the whole journey as a slow glacial drone. The slowness is the content.

## Mechanism

2D canvas, visual only, no WebAudio. A closed-form 120 s cycle runs
bottom-to-top through five 24 s stages: rain, stream, lake, limestone
seep, mist. The world is five stacked zones, each 0.62 stage-heights
tall; a camera follows the particle, so the particle climbs slowly from
near the bottom of the frame to near the top while the world scrolls past
it. Every zone, streak, line and caption is a pure function of piece
time t.

Each zone has its own character: diagonal rain streaks falling slowly in
the rain zone; five wavy flow lines drifting left to right in the stream
zone; one still ellipse with two reflection lines in the lake zone;
horizontal strata bands with faint vertical cracks in the limestone zone;
soft drifting white ellipses in the mist zone. Above the mist zone sits
the meadow that closes the piece: a green band with the Peitlerkofel
peak and snow cap rising behind it, scrolling into view as the cycle
ends.

The particle is one bright glacial drop with a white core and a fading
trail of nine earlier positions. Its behaviour changes per stage: a rain
streak above it while falling, a sideways carry in the stream, a faint
expanding ring while resting in the lake, drip dots sinking below it
while seeping, a soft halo as mist.

Four caption schedulers run on independent timers (Italian 11 s, German
13 s, Ladin 17 s, English 9 s), each cycling the five stage words in its
own language and ink: ochre, rust, pine, iron blue. Each word fades in
and out around its change, so the four streams interleave and never sit
in step. The words are short original stage-naming words, never
translated, never subtitled. The glacial drone is one slow deep-teal
sine line along the bottom edge, the bass underneath the journey.

## Frame one

FIRST_T = 32 s. The particle is mid-stream (stage 2 of 5), the stream
zone fills most of the frame with rain below and the lake above, and
two caption streams sit at full strength with the other two mid-fade
(Italian "lago", German "See", Ladin "ruf", English "limestone"). Every
streak, line, caption and wisp is a pure function of t, so frame one is
deterministic and byte-reproducible; the thumb and desktop renders came
out md5-identical on a second run.

## Interaction

Watch only. There are no pointer handlers and no audio. Never
click-to-reload.

## Palette

Hand-picked from the named colors in the prompt; no study file exists
for ruth-goller. Ground in mist white #ece9e1, rain-slate #5c6670,
glacial cyan #4a90a4 and pale cyan #7fc4d4, limestone grey #b8b4ac with
deeper strata #8f8a80, mist white #f7f4ec, meadow green #6d8a63, peak
grey #6a7076. The four language inks: ochre #a87c2e, rust #9c4a2a, pine
#3d6b4f, iron blue #3a5a7a. Title in dark slate #2e3438, date line in
rain-slate #5c6670.

## Composition

A vertical journey column in the centre of the frame, framed by two
quiet limestone lines, on a mist-white ground. The journey runs
bottom-to-top as a vertical scroll the piece advances through on its
own; language captions stream along the left margin like marginalia; the
mountain meadow closes the piece at the top of the world. Field-like
composition: full-bleed on phones, square on desktop, the page ground
set to the piece's own background color. The title plate sits top-left,
the gallery note centered at the bottom.

Gallery note: "One water particle falls as rain, rests in a high lake,
seeps into limestone, and returns as mist, named in four languages that
never translate each other. Watch the particle make its slow journey."

## Motion

All motion runs under 1 Hz, well under the 14 Hz ceiling.
Prefers-reduced-motion shows the static first frame.

## Deviations

Per the Franke audio rule, the prompt's slow glacial drone is carried
visually, not as real WebAudio: the piece is watch-only and visual-only,
with the bass expressed as one slow deep-teal sine line along the bottom
edge. The Ladin stage words (plöia, ruf, lech, sas, nëbia) are short
original words in the Dolomites language named in the prompt; no study
file exists to check them against.

## QA

Rendered from the actual script with node-canvas and visually inspected:

- Desktop 1280x900: lake ellipse with reflection lines at the top, five
  stream lines across the middle, the particle bright on its stream line
  with a fading trail, rain streaks in the bottom band, all four caption
  streams legible in their inks along the left margin, title, date and
  hint clear, no overlaps.
- Mobile 390x844: full-bleed framing holds; lake reads as a wide
  ellipse, particle and trail clear, captions legible, hint clear of the
  rain streaks, no overlaps.
- Thumb 720x720: same first frame, legible at small size.
- Fix rounds: the first frame at t = 36 showed only a sliver of the
  rain zone, so FIRST_T moved to 32 s, giving the rain a real band; the
  rain streaks first crossed the hint line, so streaks now stop above
  92% of the frame height; the lake ellipse first read as a circle on
  mobile, so its height is now capped at half its width; the particle
  and its trail were enlarged after the first render left them faint.
- Determinism: no Math.random, no Date.now, no wall clock; thumb md5
  973085e1be4c1477c712ef7d58f0c47e and desktop md5
  98153ebf2a2a0a486172055dd9413e54 identical on a second independent run.
- Parent fix round (fly gate, 2026-11-20): the glacial drone line was
  centered at H - 2.8% and struck straight through the hint text on all
  three sizes. Moved to H - 6 with amplitude H * 0.004 so it rides the
  very bottom edge, clear of the hint. Thumb re-rendered and re-gated
  byte-identical (new thumb md5 f57050af452d07e640e5073086eab886);
  index.html md5 now fe237f2b636a1b578d2f36a2c49c5edf.

## Known warts

The rain streaks cluster toward the right of the column at the fixed
first frame, a hash-distribution quirk, kept as is. The meadow and peak
sit at the top of the world and are out of frame at the fixed first
phase; they scroll into view as the cycle ends.
