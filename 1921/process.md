# №1921 The Wordsmith's Band (LK2, PP1168, study #251 lauren-kinsella)

## Driver

One invented lyric line is pinned at the top of the frame in warm paper
white and never moves; below it five instrumental agents (piano, synth,
bass, sax, drums) improvise their accompaniment in real time, trying
things, settling into an arrangement, then loosening and trying again.
When an agent locks, its marks snap into aligned vertical bars of light
on a shared grid; when it loosens, the marks scatter and drift. The
experiment is the constant text against the variable music.

## Mechanism

2D canvas, visual only, no WebAudio. The lyric is an immutable string,
one original invented line: "the light you left is still learning how to
stay". The band field fills the lower four-fifths in five lanes, one per
agent. Each agent has a coherence value, a sine on its own period
(piano 20 s, synth 26 s, bass 17 s, sax 29 s, drums 13 s) with a seeded
phase, so the agents converge and drift on their own schedules and never
lock together for long. Coherence maps to a lock amount: marks lerp from
their scattered drifting positions to the nearest column of a shared
16-column grid and are drawn as vertical bars of light with a soft glow
when locked, and as small dots or short dashes when loose. When two or
more agents are locked at once, three full-field bars of light snap into
place at seeded grid columns. Drums add muted charcoal pulse rings on a
1.2 Hz beat at three seeded positions in the drums lane, blooming and
fading inside the lane. All motion runs under 1.2 Hz, well under the
14 Hz ceiling.

## Frame one

FIRST_T = 23 s. Piano and sax are locked into aligned bars of light,
synth and bass are mid-arrangement with faint bars among scattered
marks, drums are loose with pulse rings blooming in the lane. Every
mark, bar and pulse is a pure function of t and the take seed, so frame
one is deterministic and byte-reproducible; thumb and desktop renders
came out md5-identical on second independent runs.

## Interaction

Tap for a new take: a pointerdown re-seeds the five agents from
mulberry32(1921 + take * 7919), rebuilding their phases, mark
positions, drift and pulse spots, and redraws at the current time. The
lyric string is never touched by the tap path, and the band never stops
playing. Watch otherwise. Never click-to-reload. No audio: the piece is
visual only, since watch/tap pieces cannot autoplay sound.

## Palette

Hand-picked from the named colors in the prompt; no study file exists
for lauren-kinsella. Stage ground #14101c, the fixed lyric in warm paper
white #f2e8d5 with date and hint in muted paper #b9ac93, locked bars of
light in warm white #f7ead0. Piano ice blue #9fd4e8, analogue synth amber
#e8a33d, bass deep teal #1f7a6e with brightened bars #2fa893, sax copper
#c47a4a, drums in muted charcoal #6e6e78 with lighter bars #9a9aa4.

## Composition

The lyric line holds the top fifth under a small title plate, separated
from the band by a hairline. The band field fills the lower four-fifths
in five equal lanes, each labeled in small caps at the left edge in the
agent's color. Locked passages read as vertical bars of light against
the drift; loose passages read as scattered dots and dashes. The hint
sits centered at the very bottom.

## Deviations

None from the prompt's mechanism. Per the standing audio rule, the
prompt's five instrumental agents are carried visually, not as real
WebAudio: the piece is visual only, with no sound on load or on tap.
The lyric is an original invented line, not a real Snowpoet lyric.

## QA

Rendered from the actual script with node-canvas and visually inspected:

- Desktop 1280x900: lyric legible in warm paper white under the title
  plate, piano and sax lanes locked into aligned bars, synth mid with
  faint bars among dots, bass loose scatter, drums lane with contained
  pulse rings, full-field light bars visible, hint clear, no overlaps.
- Mobile 390x844: full-bleed framing holds, lyric shrinks to fit the
  width, all five lanes and labels legible, hint clear, no overlaps.
- Thumb 720x720: same first frame, legible at small size.
- Fix rounds: one round after the first visual pass. The drum pulse
  rings were too large and crossed into the sax lane and over the hint;
  radius cut from 0.85 to 0.30 of lane height and pulse centers moved
  into the middle band of the lane. Grid-snapped bars could clip at the
  frame edge; bar columns are now clamped to 0.035 to 0.965 of width.
- Tap probe: default frame md5 21cfed877c4d8680fcf573a952c4aeb9, after
  one tap 387cbcc21e4ef955daf1e1a35ee86f6f, after a second tap
  084f1ed8f385a3d3775dd8b7a7b1387b. Each take is visibly different; the
  lyric is unchanged in every take.
- Determinism: no Math.random, no Date.now, no wall clock; thumb md5
  21cfed877c4d8680fcf573a952c4aeb9 and desktop md5
  febcac1eb4bbf8163546884d16f87212 identical on second independent runs.
  thumb.png is byte-identical to the 720x720 render.

## Known warts

The PIANO lane label sits close to the leftmost locked bar and the bar
passes just behind the label's edge; the label stays readable and the
overlap is the band crowding its own margin, kept as is. The gap between
the date line and the lyric in the top fifth is empty dark ground on
desktop; that emptiness is the quiet above the words, kept as is.

## Source

Prompt block LK2 (PP1168) for study #251 lauren-kinsella, transcribed
from live TASKS.md in the muse-soul repo.
