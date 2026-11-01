# №1240 — Noise Karaoke

Adán De La Garza study, block ADG1 (PP399). After his Dada karaoke performed
with Flinching Eye: an entire room to embrace yelling (and whispering)
nonsense.

## The piece

A karaoke machine that sings nonsense to a pounding beat. The dark bar room
is a red-framed screen with curtain drapes and a swagged valance at its
sides, and a green crowd waveform running along the bottom of the frame,
pulsing as if a whole room were yelling along.

The screen sings generated Dada syllables in a big round font. A verse is
two lines; each syllable is highlighted in bouncing-ball yellow as the beat
hits it, sung syllables stay lit at half strength, and a small yellow ball
hops from syllable center to syllable center (arced hop, stepped at 12 fps).
After the second line there is one beat of glitch bar, then the next verse.

Every other 30-second block the screen glitches down into a whisper
section: the big text is gone, the screen dims, the curtains darken, and a
line of tiny grey syllables crawls slowly along the screen's bottom edge.
The crowd waveform falls nearly flat. The song holds its place through the
whisper and resumes on the exact syllable where it left off.

## The syllable bank

Syllables are built by a seeded generator: a consonant cluster (thw, bl,
shh, kw, rr, mmp, zz, fr, and kin) plus a vowel core (eee, aa, oo, uh),
sometimes a coda, with case noise applied the way the prompt's examples
wear it ("thwweeeerRRrmmp", "blaaT", "shhhKWEE") — some syllables shouted
in full caps, some with only their tails raised. Words are 1–3 syllables;
lines are 4–6 words, stopping early once a line holds about ten syllables
so the type stays big. Verses are generated on demand from the seed, so
the bank never runs out.

First three lines of the bank as built:

- `VRAASSplaampfliirr froTRREENG thworraT kwambraaOSS`
- `blEEshheeeff mmpeepmmpeessgruh kroTRANG PLAATsnosnee`
- `flUHFRIIplii ZZUHbroo plootriimpla aashKWOOMPsnuhsh`

## Sound

House adaptation: the prompt's WebAudio noise-burst beat ships as a visual
beat only. The highlight, the hopping ball and the crowd waveform carry
the beat; the piece is silent. No audio APIs, no microphone.

## Interaction

- Drag horizontally: tempo, from 0.4 (the whisper floor, never below) to
  2.0. Tempo changes are recorded as segments in the beat clock, so the
  beat phase stays continuous across a change.
- Tap: advance to the next verse.
- Double-tap: reseed the syllable bank and restart the song.

## Numbers

- Beat: 0.5 s at tempo 1 (2 beats/second, one syllable per beat).
- Verse/whisper cycle: strict 30 s blocks, alternating.
- Contrast: verse waveform envelope peaks at 1.00 of the band's half-height
  (0.45 floor + 0.55 beat pulse); the whisper envelope tops out at 0.12 —
  12% of the verse peak, under the 15% ceiling. Whisper type is ~15 px
  against the verse's ~26 px on desktop, crawling at 9 px/s against the
  verse's two syllables a second.
- First frame: fixed phase T0 = 7.3 s, verse block. Song beat 14.6 lands
  in verse 1, line 2, on the syllable "gruh" — highlighted, ball above it
  mid-hop from "mmpeess". Line 1 ("VRAASSplaampfliirr froTRREENG thworraT
  kwambraaOSS") is already fully sung and lit at half strength.
