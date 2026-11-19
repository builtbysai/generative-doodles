# No.1888 The Text Seeds the Piece

Study #247 beatrice-arrigoni, prompt BA1 (PP1135) in TASKS.md.
Gallery date: 2007 · 03 · 14 (formula date 2002-01-10 + 1889 days).

## Driver

The text dictates the visual budget. A line of poetry advances across
the field one word at a time, and every word pays for its own motion:
the number of particles it releases is exactly its syllable count, so
a dense stretch of text makes a dense stretch of field and a spare
stretch stays spare. Nothing on screen exists except as a consequence
of a word. Mid-line the delivery crosses the parola-canto threshold,
where speech turns to song, and the particles change state with it,
from drifting amber dots to ringing teal orbits. The poem is the
instrument and the field is what it plays.

## The line

An original invented line of nine words, written for this piece:

Silent evening gathers over the listening garden walls soft.

Syllable counts, as parsed by the piece itself: Silent 2, evening 2,
gathers 2, over 2, the 1, listening 3, garden 2, walls 1, soft 1.
Sixteen particles in total. The song threshold is crossed once eight
cumulative syllables have been released, so the first four words are
speech and the remaining five are song.

## Mechanism

A syllable parser drives the particle budget. It counts vowel groups,
trims a trailing silent e, and carries a small fix table for words the
vowel-group rule would miscount (evening, listening, gathers), so the
counts are asserted by code rather than hand-counted at draw time.
Each word is released one second after the previous one. At release
it spawns exactly its syllable count of particles just below its
position in the line: a one-syllable word drops a single heavy orb,
a polysyllabic word scatters light shards.

A state machine toggles particle physics by delivery state. Speech
particles are warm amber and drift downward with a slow sway.
Song particles are cool teal and ring an orbit anchor below their
word, each on its own faint ellipse, pulsing gently. The orbit rate
is about 0.14 revolutions per second and every other motion is slower,
so flicker stays far below 14 Hz by construction.

Released words render in bone white; words not yet reached render
dimmed at low opacity. No single word is singled out: there is no
karaoke bounce, no highlight on the current word, no subtitle strip.
The text band is marked by two faint rules, and the composition keeps
wide margins on all sides.

## Frame one

Fixed phase t = 6.5 s, warmed with 130 fixed steps of 0.05 s from
t = 0. At frame one seven of the nine words have been released, the
threshold has been crossed, and both states are visible: amber
drifters under the first four words, teal orbiters under the next
three, with "walls" and "soft" still dimmed and waiting. All
randomness is seeded from 1888, so the first render is reproducible.
The live piece then continues from that phase in real time.

## Interaction

Watch only. There is no pointer interaction and no audio: a
watch-only piece cannot autoplay sound, and the prompt forbids
click-to-reload.

## Deviations from the prompt

None material. The palette hexes are hand-picked from the named
colors, since the study file studies/beatrice-arrigoni.md does not
exist in the repo: ground #0E0E0C, bone #EDE6D6, amber #D9A441,
teal #2E7F7A with a softer teal #4FA39D for orbit glow. The poem
line is an original invention, as specified. The syllable parser
uses a small fix table for three words rather than a full English
syllabifier, which is out of scope for a single piece.

## House rules

Visual Viewport sizing with resize on visualViewport and window;
canvas pinned in draw() via style width and height in px; phone
detection via window.screen with the aspect fallback; field-like
composition full-bleed on phones and square on desktop, with the
page ground set to the piece's own ink black. One synchronous
frame at load, requestAnimationFrame guarded by a typeof check,
prefers-reduced-motion freezes at frame one. The text line is
shrunk to fit the field with margins on narrow screens.
