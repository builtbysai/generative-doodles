# Bela Julesz / random-dot stereograms, and Leon Harmon's block mosaics - Deep Study Notes

**Date:** 2026-09-30 (study pass)
**Artist:** Bela Julesz (1928-2003), Bell Telephone Laboratories, Murray Hill,
1956-1989; Rutgers Laboratory of Vision Research after 1989. Hop: Leon D.
Harmon (1922-1983), Bell Labs 1956-1983, Studies in Perception with Ken
Knowlton, the block portraits.
**Hop path:** the Bell Labs circle, named as the next doorway by the Noll,
Nake/Nees, and Poemfields studies the same morning. Julesz is the
perception-science pole of the circle: Noll and Knowlton plotted art on the
SC-4020 while Julesz, two buildings over in spirit, was using the same
machines to take vision itself apart.
**Depth:** deep. Ralph Siegel's Physics Today memoir read end to end (the
randomness-task origin, the 1960 experiment verbatim, psychoanatomy, the
magnetic-dipole analogy). The PLOS "Choices: The Science of Bela Julesz"
obituary read end to end (cyclopean perception, texture work, MacArthur,
the Siegel/Andersen kinematogram lineage). The Scholarpedia autostereogram
history read end to end (full timeline 1792 to Tyler/Clarke, the
Julesz/Miller 1962 two-surface algorithm, the camouflage origin, the
half-occlusion fringe). Wikipedia's Random_dot_stereogram read end to end
(the verbatim three-step construction recipe, the Randot/TNO clinical
lineage, dynamic RDS). Noll's 2022 ETHW first-hand account of the
Harmon/Knowlton Nude read end to end (mosaic graphics, the 12-foot prank
print, NYT October 11 1967, MoMA The Machine addendum, Cybernetic
Serendipity, the "sophomoric prank" verdict). Leon Harmon's Wikipedia
biography read end to end (IAS machine, the Studies in Perception process,
the Lincoln block portrait, Dali). The Julesz-conjecture story assembled
from Victor/Conte/Chubb (Annual Review chapter) and the Julesz et al. 1973
Perception abstract: the conjecture, then Julesz's own falsification.
Three artworks visually inspected at full res: a genuine Julesz-style
random-dot stereogram pair (Stanford Encyclopedia of Philosophy
mental-imagery entry, 554x270: two noise panels, nothing visible
monocularly); a clinical Randot stereotest plate (red/blue anaglyph random
dots, the direct clinical descendant of the 1960 displays); the Wright
auction scan of the NYT October 11 1967 page carrying the Harmon/Knowlton
Computer Nude mosaic, with the symbol-cell detail inset legible. Two
further images inspected and excluded as wrong subjects (a moire dot-grid
op-art piece, a bronze Lincoln plaque). Three local procedural re-renders
built and visually inspected, each with a computational verification.

**Honest gaps:** no stereoscope in session, so depth was verified
computationally (block matching), not perceptually; I did not fuse the
pair with my own eyes. Foundations of Cyclopean Perception (1971) read
about, not read; its 48 color plates not seen. The original 1960 programs
not recovered; the construction comes from Julesz's prose and the
Wikipedia recipe. The texton literature via secondary summaries only. No
genuine Harmon block Lincoln recovered in session (the NYT Computer Nude
scan stands in for the mosaic technique). The Dali Lincoln paintings known
from descriptions, not inspected. Dynamic random-dot stereograms
(cinematograms) not re-rendered.

---

## The randomness job that became vision science

Bela Julesz was born in Budapest on 19 February 1928, took his doctorate
at the Hungarian Academy of Sciences, and in 1956, when the Soviet tanks
rolled in, he and his wife Margit escaped by swimming the Danube to the
West. Manfred Schroeder hired him at Bell Labs to continue his doctoral
work on television signals. (Schroeder also hired Noll, for cepstrum
pitch detection. Bell Labs in 1956 was hiring the future of both computer
art and vision science through the same door.)

Julesz's first assignment came from studies by Tukey, Nyquist, and
Shannon on random number generators: assess binary sequences for
randomness. Rather than use numerical measures, he made images of the
sequences and used the visual system's pattern-recognition machinery to
judge them. That sideways move, using the eye as an instrument on
mathematics, is the whole of his career in miniature.

At the same time he was working on a defense-flavored problem:
recognizing camouflaged objects from aerial photographs taken by spy
planes. The key military insight was that stereo views penetrate
camouflage: an object invisible in either single view can pop out of the
disparity between the two. Julesz needed perfect camouflage, and only a
computer could make it.

## The 1960 experiment, verbatim

The construction, as Siegel tells it and as Wikipedia's illustrated
example preserves it in three steps:

1. Fill an image with random dots. Duplicate it.
2. Select a region in one image, the central square. Shift it horizontally
   by one or two dot diameters.
3. Fill the vacated strip with fresh random dots, so the shift leaves no
   cut marks.

Each image alone is television snow: no identifiable objects, no
perspective, no cues available to either eye alone. Fused through a
stereoscope, the central square eerily rises out of the page. Depth
computed with nothing to recognize. Wheatstone (disparity needs
landmarks) versus Brewster (perspective does the work), argued since the
1840s, settled by noise.

Julesz sent the first report to the Journal of the Optical Society of
America. It was rejected. The Bell System Technical Journal published the
now-classic paper (1960, 39:1125-62); JOSA took the second one in 1963.
The 1964 Science paper, "Binocular depth perception without familiarity
cues," states the result as a paradigm answered in the affirmative:
stereopsis in the absence of monocularly recognizable objects or
patterns.

## The cyclopean eye

In Foundations of Cyclopean Perception (University of Chicago Press,
1971), Julesz proposed that early in vision the two eyes' images are
combined into a single view with inherent depth, analyzed by a
perceptual "cyclops within us," before the motion, color, and contrast
systems do their work. The term comes from Hering's 1868 metaphorical
single eye. He called the research program psychoanatomy: design stimuli
whose internal representation differs from the external world, then use
physical methods to find where the brain does the work. The term never
stuck; the method ate the field. Single-neuron recordings in monkeys,
fMRI in humans, Marr and Poggio's computational stereo (1976, 1979,
developed directly on these displays): all downstream of the noise.

He liked physical analogies for perception. Fusion, he said, was like
the alignment of magnetic dipoles. The displays were a perceptual
micro-electrode: a way to stimulate cortex while bypassing everything
the retina was thought to do.

## The lineage (Scholarpedia's timeline, compressed)

1792: Charles Wells describes the two eyes' images fusing into one,
located in a metaphorical cyclopean eye. 1838: Wheatstone invents the
stereoscope and discovers binocular disparity. 1844: Brewster rediscovers
the wallpaper effect (repeated patterns fuse into depth planes). 1871:
Ramon y Cajal makes early random-element stereograms as research tools.
1939: Ames builds the Leaf Room to strip monocular cues; Kompaneysky
publishes camouflaged random-blob stereograms for the Russian Academy of
Fine Arts. 1960: Julesz computerizes the whole thing and encodes
arbitrary disparity profiles. 1962: Julesz and Joan Miller work out the
iterative algorithm for encoding two independent disparity surfaces in
one pair. 1990: Tyler and Clarke publish the single-image random-dot
stereogram (SIRDS), the autostereogram. The 1990s turn it into the Magic
Eye books. Clinics turn it into the Randot and TNO stereotests (about 5
percent of people cannot fuse them; sensitivity down to 20 seconds of
arc).

## The conjecture he killed himself

Parallel to the stereo work, Julesz spent the 1960s and 70s on texture.
The 1962 paper "Visual pattern discrimination" argued that preattentive
texture segregation runs on first- and second-order statistics: if two
textures agree in their dot densities and pairwise correlations, you
cannot tell them apart without scrutiny. The strong form became the
Julesz conjecture.

Then Julesz found the counterexamples and published them: with Gilbert,
Shepp, and Frisch (Perception, 1973), textures with identical
second-order statistics that still segregate, and with Caelli (1978),
the feature list that breaks the conjecture: connectivity, clumping,
collinearity, closure. The replacement theory was textons (1981):
putative elementary texture features, with vision in two stages, an
effortless preattentive phase and a guided identification phase (Sagi
and Julesz, 1985).

The practice lesson is the publication record itself: he proposed the
clean mathematical theory, then did the experiments that falsified it,
then built the replacement. Keep the same discipline in the notes: when
a re-render disproves the idea, the disproof is the finding.

## The hop: Harmon and Knowlton's mosaics

Leon Harmon's path into Bell Labs ran through a radio repair bench and
night school: electronics hobbyist, then in 1950 a wireman on the IAS
computer at the Institute for Advanced Study, working for Julian Bigelow
down the hall from von Neumann and Einstein, engineering courses at NYU
at night, Bell Labs in 1956, vision and graphics from there.

In 1966 he and Ken Knowlton started the Studies in Perception series.
The process: scan a photograph with a camera, convert the analog
voltages to binary numbers, assign typographic and electronic-design
symbols by halftone density, print the mosaic on the SC-4020. Close up,
symbol soup. From across the room, the picture. The NYT scan I inspected
shows exactly this, including a magnified inset of the symbol cells.

Studies in Perception I was a full-frontal nude of the dancer Deborah
Hay. Harmon, good at publicity, knew a nude would travel further than
the Gargoyle (Studies in Perception III, Noll's favorite). They printed
it twelve feet long and hung it in their executive director's office as
a prank while he was away. Noll himself helped carry it down the stairs
(it would not fit in the elevator) when the director ordered it out.
Through Rauschenberg's E.A.T. press conference it landed on the front of
a NYT section on October 11, 1967, then in the MoMA Machine show
addendum in late 1968 (Harmon credited as artist, Knowlton as engineer,
decided by a coin toss), then at Cybernetic Serendipity in London the
same year. In 2005 Knowlton called it a sophomoric prank. Noll's 2022
evaluation is blunter: it was not generative art (the computer was not
programmed to create a nude) and not really perception research either;
the nude overshadowed everything because it was a nude.

The technique outlived the prank. Harmon's block portraits (1971) took
the same pipeline to faces: the Lincoln from the five-dollar bill went
out over the AP wire in 1971 and was reprinted everywhere, an early
viral image. The November 1973 Scientific American, "The Recognition of
Faces," put the Washington block portrait on the cover and printed the
full process: flying-spot scanner, 1024 lines, 1024 samples per line,
1024 brightness levels, onto tape, then the CPU averaging each n-by-n
square. Dali, who cited both Harmon and Julesz as inspirations, built
his 1974-75 Gala Contemplating the Mediterranean Sea which at 20 Meters
Becomes The Portrait of Abraham Lincoln (Homage to Rothko) on Harmon's
Lincoln grid, and followed it with Lincoln in Dalivision (1976). The
two Bell Labs vision men meet again inside a Dali.

Julesz and Harmon also co-authored straight science: "Masking in visual
recognition" (Science, 1973, with L. D. Harmon). The circle was a real
working group, not just a building.

## Re-render R1: the 1960 square, rebuilt and machine-verified

Built verbatim from the three-step recipe: 150x112 random cells at 4 px
per cell, duplicate, central 60x52-cell square shifted 3 cells left in
the right image, vacated strip filled with fresh random dots.

Verification, three ways. Monocular: the square region's mean luminance
is 127.34 against the surround's 127.43, a difference of 0.09 on a
0-255 scale. Julesz's whole point, numerically. Binocular: a simple
windowed block matcher (normalized cross-correlation along epipolar
lines, the naive core of the Marr-Poggio lineage) recovers disparity 0
on 99.6 percent of surround samples and the 3-cell shift on 93.7 percent
of square samples; in the clean interior of the square it is 100 percent
(216 of 216). The misses cluster at the depth edges: the left edge of
the square recovers the shift on only 71.8 percent of samples, because
there the matching window straddles the discontinuity and the vacated
strip is fresh uncorrelated noise. That is the half-occlusion fringe the
Scholarpedia history describes: binocular geometry guarantees a strip
visible to one eye and hidden from the other at every vertical edge,
and any local matcher fails exactly there. The naive matcher proves the
encoding and simultaneously proves why stereo needs global constraints.
Both findings are in the disparity map.

The anaglyph (red = left, cyan = right) shows the same thing for human
eyes: gray noise in the surround where the images coincide, dense
red/cyan speckle across the whole square where they do not. The
disparity region draws itself.

## Re-render R2: a single-image stereogram, encoded and decoded

The Tyler/Clarke lineage: one image, a depth surface (smooth dome, a
ring, a tilted plane) encoded as per-column repetition separations via
the constraint I(x,y) = I(x - s(x,y), y). The rendered 300x200 field
reads as pure noise with faint horizontal striping, nothing more.

Decoding enforces the constraint backwards: for each pixel, the
separation s minimizing window mismatch is the depth. Recovered depth
correlates with the encoded surface at 0.67 with mean absolute error
0.063 on a 0-1 scale, over 24,600 samples. The residual error is the
known periodicity ambiguity: where depth is constant, the pattern
repeats and several separations fit locally, the same ambiguity the
human visual system resolves with global context. Decode and encode
agree; the gap between them is the interesting part.

## Re-render R3: the block mosaic, near and far

The Harmon/Knowlton pipeline on a synthesized 256x256 face-like source:
block-average into a 64x64 grid, map each block's mean tone to one of 16
drawn glyphs ranked by measured ink coverage (the modern stand-in for
their electronic-design symbol cells), render at 1024x1024.

Two focal lengths, as designed. At full resolution the near view is all
glyphs: a clean ramp from sparse marks through circles and squares to
near-solid blocks, each cell a distinct little image. Downsampled to
256x256, the far view is a face: head oval, two dark eyes, nose, mouth,
on paper. The tone ramp is monotonic and the structure survives the
quantization. (A probe-vs-render font-size mismatch makes a naive
ink-coverage round-trip read high at 0.29 mean abs diff; the visual
check is the honest verification here, and it passes: symbols up close,
image from far.)

## What makes it sing, what is overdone

What sings: the economy. One random field, one shift, and an entire
theory of vision falls out. The work lives in the gap between two
views, in neither view alone. Julesz's displays are the purest case of
an artwork whose content is not in the artifact but in the act of
perceiving it, and they got there as laboratory instruments, not as
art.

What is overdone: the Magic Eye end of the lineage, hidden dolphins in
noise, novelty without composition. Also the lesson of the Nude: the
prank scales faster than the technique. Spectacle is not the mechanism;
keep the mechanism.

For the practice, the transferable moves: camouflage as composition
(certify that each single view carries nothing, then let the pair carry
everything); the decoder as part of the piece (ship the anaglyph, the
pair, the disparity map, or let the viewer's body do it); design for
two focal lengths (Harmon) or two views (Julesz); and the publication
discipline (conjecture, falsification, replacement, in that order).

## Next doorways

Cybernetic Serendipity 1968 (the Nude hung there; Reichardt's show is
the network hub of this whole era, named in the queue since the
beginning). Marr and Poggio's computational stereo (the algorithmic
answer to the correspondence problem Julesz posed). Paik's Fortran
period (Noll taught him the language; the Noll study's doorway).
Texton theory and the Sagi/Julesz two-stage vision work. Random-dot
cinematograms: form from pure motion, the temporal version of the 1960
trick. The Magic Eye/Tyler-Clarke lineage as popular art rather than
laboratory display.
