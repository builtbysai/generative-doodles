# Kenneth Knowlton / Stan VanDerBeek / Poemfields - Deep Study Notes

**Date:** 2026-09-30 (study pass)
**Artists:** Kenneth C. Knowlton (born 1931; physicist, PhD MIT 1962,
Bell Labs Techniques Research Department from 1962), Stan VanDerBeek
(1927 to 1984; painter turned collage filmmaker, Movie-Drome builder,
self-described "technological fruit picker").
**Hop path:** named as a next doorway by the A. Michael Noll study and
the Frieder Nake / Georg Nees study the same morning, and sitting at
the center of the Bell Labs circle: Knowlton's language was the medium
everyone else at the Labs drew through.
**Depth:** deep. Knowlton's own "Computer-Produced Movies" (Science,
26 November 1965) read end to end. Thomas Dreher's "History of
Computer Art" (philarchive) BEFLIX and Poemfield passages read end to
end. Kaitlyn Kramer's artcritical account of the 2015 Andrea Rosen
Poemfield installation read end to end. The AT&T Archives description
of the eight-film series read end to end. The SAIC Conversations at
the Edge program page and the Free Library / BroadwayWorld / MoMA
collection biographical passages read. The BEFLIX syntax summary from
content-animation.org.uk's indexed text read (the page itself failed
to fetch in-session, so the scanner syntax comes secondhand and is
marked accordingly). One genuine Poemfield still visually inspected at
full res: the SAIC CATE page's Poemfield No. 7 frame, 1024x807. Two
adjacent images inspected: a framed VanDerBeek computer-animation
print from 1977-78 (documentspace, 325x390, later work but the same
hand) and the four-panel iso-contour stills from Knowlton and Lillian
Schwartz's Pixillation (1970, openculture, 560x438). Six local
procedural re-renders built and visually inspected (see below).

**Honest gaps:** no Poemfield film watched in motion this session; all
film knowledge comes from stills and prose (the AT&T Archives copy
itself is noted as suffering color decay). Knowlton's 1964 AFIPS paper
is known through quotes only. The original BEFLIX source was not
recovered; the 26-scanner syntax (IF...T...LABEL, scanners A through
Z) comes from a secondary summary. The "fringer," kaleidoscope, zoom,
and letter-font subroutines Knowlton wrote for VanDerBeek are
described, not seen. My letter-form re-render frame is a weak
stand-in (the glyphs came through faintly). The remastered HD No. 1
and No. 2 were not seen. An image-search result that looked like a
colorized Bell Labs film frame turned out to be Naoko Tosa's "An
Expression" (1985) and was excluded on verification. Harmon's
Studies in Perception I read about, not inspected.

## The facts that matter

VanDerBeek, a Black Mountain College painter turned collage
filmmaker, started working with Knowlton at Bell Labs in 1964. The
arrangement had the tacit approval of department head John Pierce but
was never formal; the artist/engineer collective E.A.T.
(Rauschenberg, Kluever, 1966) helped facilitate it. From 1966 to
about 1969, on an IBM 7094 fed by punch cards, they made eight
computer-animated films titled Poemfields: No. 1 (1965), No. 2
(1966), No. 3 (1967), No. 5 (1967, "Free Fall," 1968 release),
No. 7 (1971), and others undated. The poems were VanDerBeek's own.
"To visualize this," he wrote in Art in America (January 1970),
"imagine a mosaic-like screen with 252 x 184 points of light; each
point of light can be turned on or off from instructions on the
program."

BEFLIX ("Bell Flicks," 1963-64) is the first specialized computer
animation language for bitmap movies. The pipeline: FORTRAN IV
program (earlier FAP macros on FORTRAN II), punched cards, IBM 7094,
output to magnetic tape, Stromberg-Carlson 4020 microfilm recorder.
Knowlton used the 4020 in typewriter mode instead of vector mode:
characters of fixed size typed on the CRT face, which gives the
frames their mosaic texture. Then the crucial second step: the
camera was slightly defocused, turning the finely structured
characters into what the Chilton account calls "contiguous blobs of
different intensities." Two-step softening, discrete then optical,
is the whole look.

The frame format: a 252 by 184 array of cells, 46,368 in all, each
holding a gray value from 0 to 7 (3-bit). The microfilm recorder
could resolve a 1024-by-1024 grid, but Knowlton threw most of it
away to make the computation tractable. Gray levels were produced by
positioning different characters at different places inside each
cell. The language had about 25 instruction types: draw a line (with
beginning and end points, width in raster units, gray shade, and
speed expressed as raster units advanced per frame), arcs and other
curves, paint an area a solid gray, copy one area onto another, shift
an area up/down/left/right by N raster positions, fill a region
outlined by a specific shade, enlarge part or whole, and gradually
dissolve one picture into another that had been drawn on an
auxiliary "drawing board" inside the computer. The later form of the
language is scanner-based: 26 scanners named A through Z walk over
the surface, and instructions take the form
IF...(condition)...(condition) T (action)..(action) LABEL.

Economics, from Knowlton's own numbers: only one picture per run of
identical frames was generated; the optical house duplicated the
rest. His 17-minute demonstration film was about 25,000 frames, 3000
unique pictures, made from roughly 2000 punched cards, in two months
of solo work: two hours of 7094 checkout plus two hours of
production, at roughly $600 per minute of film. The 7090's core held
about two fine-resolution frames at once; a disc held 440. Every
constraint in BEFLIX (the 252x184 grid, the 8 grays, generate-only-
unique-frames) is this budget turned into form.

Poemfield-specific mechanics: for the artist films Knowlton wrote
special subroutines for kaleidoscopic patterns, "fringer," special
zooms, dissolves, and letter fonts. VanDerBeek then wrote about 100
lines of BEFLIX in terms of those subroutines for Man and His World
(1967, the Expo 67 US pavilion dome film). Dreher's account of
Poemfield No. 2 is the key compositional finding: words and
background patterns are dissolved again and again into entropic
fields full of elements, before new calligraphic patterns arise.
The program's grid serves double duty: the distribution of elements
works like a patchwork rug, and the same grid carries readable
words. He notes the "zigzag character" of the patterns, an artifact
of the cell walk.

Then a second authorship pass, optical: the films were made in black
and white and colored afterward by Robert Brown and Frank Olvey,
"with a vibrant palette of red, green, and blue light." No. 2 and
No. 5 were colorized by them; the remastered No. 1 replaces the
color with cerulean blue to emphasize the underlying BEFLIX
programming. Sound: free jazz by Paul Motian on No. 2, John Cage and
computer-generated sounds elsewhere. Kramer's account of No. 5,
"Free Fall": a purple grid deteriorates into fields of red, falling
bodies materialize, and the letters F R E E F A L L litter the
screen in varying compositions. At the 2015 Andrea Rosen show, five
films ran in staggering synchrony with overlapping soundtracks, and
the reviewer describes phrases pulsing on screens amid arbitrary
patterns of light: the viewer supplies the reading.

## What the stills show

The SAIC Poemfield No. 7 frame (1024x807) is the single most
informative image of the session. It is a pink/magenta field in
which the discrete cells are plainly visible: you can count the
pixel structure with your eye. Lighter cross bands (one vertical,
one horizontal) carry a row of black glyphs built from the same
cells: slashes, dot-matrix circle-O shapes, small multicolor
clusters. At the center sits a kaleidoscopic mandala made of the
cells themselves, mirrored into symmetry. Three findings from one
frame: the grid is never hidden, it IS the texture; letters and
ornament are the same material; the mandala center is what the
kaleidoscope subroutine was for.

The documentspace 1977-78 framed print shows where the hand went
next: a neon mandala of pink, teal, and yellow squiggles on black,
with the color passes slightly misregistered, so every curve wears
a chromatic ghost. The Knowlton/Schwartz Pixillation panels show
the other pole of his practice: scanned imagery reduced to
iso-contour line fields, the computer as a seeing machine rather
than a drawing machine.

## The local re-render (stand-in, from the documented recipe)

Six frames from a Python/PIL script honoring the real constraints:
252x184 cells, 8 gray levels, NEAREST upscale so the cells stay
visible, a defocus pass (Gaussian blur) as the optical second step,
and a hue tint as the Brown/Olvey stand-in.

1. Words frame: "POEM / FIELD" in cell vocabulary on the 8-level
grid with the cross bands of the No. 7 still. Honest note: the
glyphs came through faintly at the chosen upscale, so this frame
proves the format, not the lettering.
2. Dissolve frame: the word frame mid-dissolve toward a random
entropic field, with a staggered per-cell front (a zigzag sweep
order, my own invention for legibility) so the front itself reads
as a moving band between legibility and noise. This is the No. 2
mechanic as Dreher describes it.
3. Mandala frame: an 8-fold mirrored pattern built from the same
8-level vocabulary, cells view.
4-6. The defocused/tinted versions of each: the discrete cells melt
into contiguous blobs, which is exactly what the Poemfield frames
look like when the camera did its half of the work.

What the re-render taught: the dissolve front is the interesting
object, not the start or end states; defocus is doing half the
aesthetic labor (sharp cells look like a spreadsheet, blurred they
look like the film); and 8 gray levels are plenty when the grid is
the subject. Script and frames kept with the study evidence.

## What sings, and what is overdone

What sings: the grid as the aesthetic rather than an artifact to
hide; words and noise as one material, so meaning keeps dissolving
and re-forming; the two-step softening (discrete then optical) as a
general recipe; the second-authorship colorization pass, which lets
one work exist in multiple color lives; the economics made visible,
generate only the unique frames.

Overdone, for the avoid-list: mosaic/pixel work that hides the grid
it claims to celebrate; sterile ASCII art that is text-as-texture
without the dissolve grammar (Poemfield is animated, words become
fields, fields become words; static glyph mosaics miss the point);
smoothing everything into gradient mush, which loses the
discrete-then-defocused two-step that gives the real frames their
bite.

## Piece seeds

274. **Dissolve Front** (see FUTURE_PIECES.md)
275. **One Material Two Registers** (see FUTURE_PIECES.md)
276. **The Defocus Tax** (see FUTURE_PIECES.md)

## Next doorways

Bela Julesz's random-dot stereograms (named by the Noll, Nake/Nees,
and Deutsch studies; the perception-science pole of the Bell Labs
circle). Nam June Paik's Fortran period (named by the Noll and
Nake/Nees studies; Noll taught him Fortran). The Lillian Schwartz
and Knowlton collaborations (Pixillation, UFOs). Cybernetic
Serendipity 1968. Leon Harmon's Studies in Perception series.
