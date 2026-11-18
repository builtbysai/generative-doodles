# The Crystalline Dialogue, №1881 (MG2, PP1128, study #246 maddalena-ghezzi)

## Spec
TASKS.md prompt block MG2 PP1128: two agents on a dark stage, a warm
vocal line (amber, continuous, breathy) and a cool guitar line (silver,
plucked, faceted). They begin in strict canon: every phrase the voice
sings, the guitar repeats exactly one breath later. Over about 90
seconds the canon loosens into free counterpoint: the guitar decorates,
the voice holds, phrases overlap and miss. In the final third both
renounce form: the lines break into labile fragments that dissolve like
a Proteus, refusing to resolve, and the piece ends on held silence
rather than a cadence. Palette: voice amber, guitar silver-blue, deep
stage black, a faint opal iridescence where the two lines touch.
Composition: two horizontal bands, voice above, guitar below, drifting
toward and away from the center line. Motion-interaction: WATCH ONLY.
Never click-to-reload. Technical approach: 2D canvas. Two sequencers
with a shared phrase source: phase one locks the guitar to the voice
with a fixed delay; phase two adds per-phrase stochastic ornamentation;
phase three dissolves the phrase pool into grains. Visuals are drawn
from the same event stream: each sounded event draws its mark. Avoid:
no literal singer or guitarist figures, no speech bubbles, no
verse-chorus structure, no fade-out ending (it must end in held
silence, a refusal, not a taper).

## Palette
Hand-picked from the prompt's named colors
(studies/maddalena-ghezzi.md does not exist in the muse-soul repo):
stage black #07080A, voice amber #E8A33D, deep amber #B97A1E, pale
amber #F2C063, guitar silver #B9C8D8, silver-blue #8FA8C4, bright
silver #D7E2EC, opal #D5DDE8 with violet #E6D9F2 and green #D9E8E4,
plate #0A0B0E, title ink #EDE6D6, hint ink #C9A86A.

## Motion and interaction
Watch only. There is no tap or click interaction on the stage; the
only control is a visible Sound switch (bottom right), default off.
The dialogue runs about 90 seconds from a fixed start: strict canon
to 26 s, loosening counterpoint to 58 s, dissolving fragments to 84 s,
then held silence. The bands drift toward and away from the center
line, closest together just as the canon loosens, so the lines can
touch. The voice is a smooth amber ribbon with soft halos at each
sounded note; the guitar is a chain of silver diamond facets joined
by a faint thread that breaks across phrase gaps and big leaps, so
the facets stay faceted. Where a voice mark and a guitar mark
coincide on the stage, an opal bloom opens in violet, pale blue and
green. After 84 s no new events sound; the bands stay lit and empty,
a held silence, not a fade. Reduced motion freezes at the fixed first
frame. Flicker is slow by construction: band drift under 0.05 Hz,
breathing halos, no flashing.

## Technical approach
2D canvas with WebAudio. One event stream is generated from a seeded
mulberry32 RNG (seed 1881): voice phrases of 2 to 9 notes with a
random-walk contour in [-1, 1]. The guitar answers from the same
source: phase one repeats each phrase exactly, one breath (2.5 s)
later; phase two shortens the delay toward 0.4 s, jitters timing and
pitch, adds grace-note ornaments, drops about one note in seven, and
places one touch per phrase where the guitar meets the voice's
widest note in mirrored pitch; phase three scatters both voices into
short grains. Events scroll left across a 12-second window, newest at
the right edge. Frame one uses fixed seed 1881 at fixed phase
t = 30.0 s, canon loosening, both bands live with marks and one opal
touch visible, so the thumb is stable; the thumb re-rendered
byte-identical (md5 7a8afd6f346e31ec499ccb2ca3b722ba). Audio is lazy,
created only inside the Sound switch gesture: voice is a pair of
sines (330 Hz base, ±6 semitones from pitch, slow attack, slight
detune shimmer), guitar is a triangle pluck (196 Hz base, fast
attack, exponential decay); visuals run on the closed-form event
model whether or not audio is on, and audio is never autoplayed.

## Deviations from the prompt
Phase boundaries are set at 26 s and 58 s (canon loosening begins
just before frame one at 30 s, so the fixed first frame already shows
the loosening with a touch) rather than at round thirds; the 90-second
arc and the held silence are as specced. The guitar thread is broken
across phrase gaps so long jumps do not draw a diagonal across the
stage. The Sound switch is an HTML button overlaid on the canvas,
not drawn in it, so it stays tappable and legible.

## Gallery note
"A warm vocal line and a cool guitar line drift from strict canon into free counterpoint. Watch the dialogue loosen."
