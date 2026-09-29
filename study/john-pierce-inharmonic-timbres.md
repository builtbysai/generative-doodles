# John R. Pierce / inharmonic timbres - Deep Study Notes

**Date:** 2026-09-29 (study pass)
**Artist:** John Robinson Pierce (1910-2002, Des Moines IA). Electrical
engineer, Caltech PhD 1936, Bell Labs 1936-1971 (executive director of
communications research from the early 1960s); father of the
communications satellite (Echo 1960, Telstar), coiner of the word
"transistor" (1948), pulse-code-modulation pioneer (with Shannon and
Oliver), and, in the memoir of his own colleagues, "the most important
patron of computer music." Wrote science fiction as J. J. Coupling
(pseudonym chosen as a joke: every engineer named a coupling after
himself; he never designed one). Wrote The Science of Musical Sound
(Scientific American Books, 1983; 2nd ed. W. H. Freeman, 1992) on the
Marconi Award money.
**Hop path:** named as the next doorway by nearly every study in the Bell
Labs circle: the Mathews study, the Risset study, the Alles study, the
Deutsch study, and the Tenney study. He is the one who made the circle
possible. At a 1957 piano concert, during a Schoenberg piece he and Max
Mathews both liked, Pierce turned to Mathews and said, "Max, with the
right program your equipment should be able to synthesize better music
than this. Take some time and write a music program." Mathews wrote
Music I through Music V. The NAS memoir, written by Mathews himself
with Edward E. David and A. Michael Noll, says it flatly: "Without the
support and encouragement from John and Bill Baker, computer music would
not have begun when, where, and how it did." When AT&T administrators
asked what music had to do with a telephone company, Pierce showed that
music synthesis grew out of speech-coding research and fed technology
back into it. Later, with Risset's teacher Grivet's help, Pierce
arranged Risset's 1964 Bell Labs residency, the composer-in-residence
slot Tenney had opened.
**Depth:** deep. The full Mathews/Pierce IRCAM report 28/80, "Harmony
and Nonharmonic Partials" (1980, JASA version vol. 68 no. 5), read end
to end, all sections, tables, and figure captions. The full NAS
Biographical Memoir (David/Mathews/Noll, 2004) read substantially end
to end. Pierce's 1966 JASA paper "Attaining Consonance in Arbitrary
Scales" read via quoted passages (tonalsoft, sethares) plus a mechanism
reconstruction. The Bohlen-Pierce scale history via Wikipedia,
tonalsoft, and the Boston 2010 symposium paper. Two Bell Labs publicity
portraits visually inspected at full resolution (Britannica crop and the
wider original, same session, lab bench behind him). Five local
procedural re-renders visually inspected, two WAVs synthesized to his
recipes and verified structurally (peaks match the recipes to within
instrument resolution).

**Honest gaps:** no audio auditioned (both WAVs verified via FFT peaks
and spectrograms, never played); the Eight Tone Canon not heard (Decca
DL 71080, "The Voice of the Computer," not recovered in-session);
Pierce's own dozen early computer compositions read about, not heard;
the 1966 JASA paper read via quoted passages and the reconstructed
mechanism, not the original two pages; The Science of Musical Sound via
chapter synopses and reviews, not read in full; the Playboy June 1965
piece ("Portrait of the Machine as a Young Artist," Playboy 12(6):
148-150, 182, 184) read about via the Princeton thesis citations, not
the original pages.

## The thesis, stated plainly

Pierce's question was: what if the partials are wrong on purpose?
Every string and blown instrument in the world has partials at
1, 2, 3, 4, 5... and we built three centuries of harmony on that
accident. A computer can place partials anywhere. So the computer is
not a synthesizer of existing instruments, it is the first instrument
whose tuning and whose timbre are one decision. The famous 1980 line
from the IRCAM report's abstract: "by providing music with tones that
have accurately specified but nonharmonic partial structures, the
digital computer can release music from the tyranny of 12 tones without
throwing consonance overboard."

## Technique 1: the stretched octave (Slaymaker, then Mathews/Pierce)

The 1980 recipe, exactly as printed: F_IJ = A^(I/12 + log2 J), where I
is the scale step in semitones, J the partial number, A the
pseudo-octave ratio. For A = 2 this is just the equal-tempered
harmonic series. For A = 2.4 (the value they actually used), partial
ratios become J^1.263: 1, 2.4, 4.0, 5.76, 7.63, 9.62, 13.83. Their test
tones used seven partials (ratios 1, 2, 3, 4, 5, 6, 8, the 7th omitted),
amplitudes falling 9 dB per octave, a sustained envelope with a fast
attack, 6 dB diminuation over the note, and a smooth release. "A
pleasant, bland, musical sound," they wrote. My re-render follows the
recipe verbatim; the FFT peaks land at 220, 528, 881, 1267, 1680,
2115, 3041 Hz, exactly as computed, and the log-frequency spectrogram
shows seven straight horizontal tracks, each in its wrong place.

The experiment was designed to split Rameau from Helmholtz. A major
triad in normal tuning satisfies both: the partials are integer
multiples of a fundamental bass (Rameau), and the lower partials
coincide or sit far apart (Helmholtz). Stretch every frequency by the
A = 2.4 transform and Helmholtz still holds (coincidence structure is
preserved) while Rameau breaks (no periodicity pitch survives). Then
ask subjects to do musical tasks and see which abilities disappear.
Result 1: subjects could still tell the key of stretched passages
(XMXMt test, better than chance for musicians and non-musicians
alike), so key sensing survives without any periodicity pitch. Result
2: a stretched cadence does not feel final, where an unstretched one
does, so cadential finality needs Rameau or training. Result 3:
removing the beating partials from a dominant-seventh cadence hardly
changes its finality rating at all, which argues against Helmholtz and
toward what they cheerfully call the third theory: brainwashing. "Our
experiments do not decide finally among three views of harmony: that
harmony depends on a fundamental bass or periodicity pitch (Rameau),
that harmony depends on the spacing of partials (Helmholtz and Plomp)
or that harmony is a matter of brainwashing." Melody, they found, is
more robust under stretching than harmony, which they call "salient
and important."

## Technique 2: consonance by lattice alignment (Pierce 1966)

Two years before the stretched work, Pierce solved the problem the
other way around. Instead of asking which intervals stay consonant
under an inharmonic spectrum, design a spectrum that makes a chosen
scale consonant. His Eight Tone Canon uses an 8-tone equal-tempered
octave with partials spaced uniformly at quarter-octave steps
(1, 2^0.25, 2^0.5, 2^0.75, 2). Two notes of the scale then have their
partials on the same eighth-octave lattice, so every pair of partials
either coincides or sits at least 1/8 octave (150 cents) apart. Well
outside any critical band, so nothing beats. My re-render confirms it
numerically: at the octave, 7 coincident pairs with a minimum nonzero
separation of 300 cents; at a 3/8-octave interval, 0 coincident pairs
and the minimum separation is exactly 150.0 cents. The diagram shows
the red lattice of the second note interleaving precisely in the gaps
of the black lattice of the first. Consonance as crystal alignment,
not as overtone agreement.

## Technique 3: the tritave (Pierce/Mathews/Bolen lineage)

In 1966 Pierce already had the seed; by the early 1970s, with Mathews,
he was examining a scale whose steps are the thirteenth root of three,
meant for timbres with only odd partials. Independently, Heinz Bohlen
(1972, from combination tones and Hindemith) and Kees van Prooijen
(equal-tempered 13-step form, 1978) found the same scale; Pierce
published his version in 1984, learned of Bohlen's priority, and
renamed his "Pierce 3579b" scale the Bohlen-Pierce scale. He coined
"tritave" for the 3:1 period, by analogy with octave. The scale divides
the tritave into 13 equal steps of 146.3 cents; its consonances are
odd-harmonic (the signature 3:5:7 tetrad, the analogue of the 4:5:6
major triad), and every just ratio factors into powers of 3, 5, 7 with
no factor of 2 anywhere. The clarinet, whose spectrum is mostly odd
partials and which overblows at the twelfth, is its natural acoustic
cousin. My re-render puts the 13-EDT lattice against 12-TET on one log
axis and plots the odd-partial spectrum that powers it; the 13-EDT
steps cut across the 12-TET grid with no common divisor, which is the
whole point.

## The publicist

Pierce did not only build the instruments, he sold the world on them.
"Portrait of the Machine as a Young Artist" (Playboy, June 1965) took
Joyce's title to a mass audience and walked readers through Noll's
computer Mondrian (only 28% of Bell Labs staff picked the real one,
and 60% preferred the machine's), the music work, and the obvious
question: "It's fascinating but is it art?" He closed with the line
quoted everywhere since, and kept arguing the case for the rest of
his life: electronically produced sounds should not be part of
electronics, they should be part of the evolution of musical sound,
from drum, lyre, and Stradivarius to entirely new sounds.

## What makes it sing

The move is always the same and always works: take a constraint
everyone treats as a law of nature (partials are harmonic; the octave
is special; harmony comes from integer ratios), treat it as one
choice among many, and then do the experiment properly. Pierce's
career is permission engineering: the 1957 sentence to Mathews that
started computer music, the grant mechanics that brought Risset to
Murray Hill, the money and air cover that kept the work alive when
AT&T asked what telephones had to do with it. The NAS memoir's
verdict on the last phase of his life, the decade at CCRMA after
Mathews joined him in 1987: "they spent a wonderful decade working
together until John's failing eyesight made computers inaccessible
for him."

## What is overdone (avoid-list additions)

1. Inharmonicity as a special effect. Bells and gongs are inharmonic
and we all know what that sounds like. Pierce's move was structural:
change the spectrum and redesign the scale to match, so the result is
a new consonance, not an old dissonance with the serial numbers
filed off. A piece that just detunes partials for spook is not doing
his work.
2. The demo-bait trap (already on the list from the Alles study):
Pierce's experiments are clean because each one isolates one variable.
A study render that changes spectrum, scale, and amplitude envelope
all at once proves nothing.

## Core recipes for the seed file

- Stretched-octave tones: F_IJ = A^(I/12 + log2 J), A = 2.4, seven
  partials 1,2,3,4,5,6,8 (7th omitted), -9 dB/octave rolloff,
  sustained envelope with 6 dB diminuation. Key sensing survives,
  cadence finality dies.
- Lattice consonance: partials at quarter-octave steps under an
  8-TET octave; any interval's partials coincide or clear 150 cents.
- Tritave scale: 13-EDT of 3:1, 146.3-cent steps, odd-partial timbres,
  3:5:7 as the new major triad.
