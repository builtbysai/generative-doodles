# Hershey stroke fonts: the 1967 vector alphabet that never died

**Sources:** kamalmostafa/hershey-fonts (JHF data, James Hurt conversion of
Hershey's originals), Paul Bourke's format doc (1997), hershey-fonts.notes
(use restrictions + format), Wikipedia (history), libhersheyfont C loader,
Lingdong Huang's p5-hershey-js (parser read in full), Golan Levin's
nichtkunst/p5-single-line-font-resources (README read in full), Anders
Hoff's GridFont readme (via Golan's p5 port), hank008/chinese-hershey-font
README (CV algorithm).
**Status:** 2026-09-25, deep. All 30 JHF files decoded with a fresh Python
parser (2,978 glyphs, stroke/path/pen-up counts verified); eight specimens
rendered locally and visually inspected at full res: roman simplex/duplex/
triplex weights, full 96-glyph charmap, pen-up travel map of triplex R,
music/astrology/markers/japanese symbol sets, scale/rotate proof, and
Golan Levin's 52-byte minf alphabet decoded from its base64 string and
rendered. The paulbourke specimen GIFs were not needed; my own renders are
the visual evidence.

## What they are

Around 1967, Dr. Allen Vincent Hershey, working at the U.S. Naval Weapons
Laboratory (later the National Bureau of Standards) in Dahlgren, Virginia,
digitized a repertory of typefaces as vectors for early CRT displays.
Curves became polylines, and each glyph became a list of pen movements:
draw here, lift, move there. The data for 1,377 occidental characters was
published by NIST in 1976 as "A Contribution to Computer Typesetting
Techniques: Tables of Coordinates for Hershey's Repertory of Occidental
Type Fonts and Graphic Symbols." Over 2,000 plottings exist in total,
covering Latin, Greek, Cyrillic, Japanese (kanji, hiragana, katakana),
astrology, music notation, meteorology, map markers, and math symbols.

The fonts are public domain with light strings attached (the JHF
distribution asks you to credit Hershey and converter James Hurt, and not
to redistribute in the NTIS's own format). Because a stroke font is just
coordinates, it scales, rotates, and shears with grade-school math, which
is why it survived: CAD programs, gnuplot, laser engravers, and pen
plotters all still speak it.

## The format, decoded by hand

One line per glyph. Columns 0:4 hold Hershey's character number, 5:7 the
vertex count (a checksum of sorts), column 8 the left bearing, column 9
the right bearing. Then come coordinate pairs, each two ASCII characters,
each relative to 'R'. The pair " R" (space-R) is the pen-up: lift the
stylus, move, do not draw. Coordinates use a y-down printing convention,
origin near the glyph center.

Example, the 8th symbol, an H:

```
8  9MWOMOV RUMUV ROQUQ
```

Left bearing M-R = -5, right W-R = +5, advance 10 units. Then: move to
(-3,-5), draw to (-3,+4), pen up, move to (+3,-5), draw to (+3,+4), pen
up, move to (-3,-1), draw to (+3,-1). Nine pairs including the bearings,
exactly as the vertex count says.

Two details worth stealing. First, the loader I read (libhersheyfont)
maps Latin glyphs to ASCII purely by line order, starting at 32: the
Hershey character number is metadata, the file position is the encoding.
Second, there is no fill, ever. Bold is faked with parallel strokes
(duplex doubles them, triplex triples and adds serifs), and solid areas
are faked with hatching. The music font's note heads are the proof: solid
black ellipses rendered as diagonal hatch strokes, because a pen cannot
paint.

## The numbers, from my decode

| font | glyphs | strokes | pen-ups | character |
|---|---|---|---|---|
| rowmans (Roman Simplex) | 96 | 189 | 94 | ~2 strokes per glyph |
| rowmand (Roman Duplex) | 96 | 399 | 304 | doubled strokes |
| rowmant (Roman Triplex) | 96 | 860 | 765 | tripled + serifs |
| cursive | 96 | 166 | 71 | long flowing paths, 11.3 pts/stroke |
| markers | 97 | 104 | 72 | tiny symbols, 3.2 pts/stroke |
| japanese | 193 | 1244 | 1051 | kanji + both kana |
| music | 96 | 462 | 367 | notation + letters, hatched heads |

Simplex to triplex is the clearest demonstration in the set of what
"weight" means without outlines: add strokes, not thickness. My roman
weights specimen shows it plainly. Simplex reads like architectural
lettering, triplex like an engraved book face, and both are the same
skeleton wearing different numbers of passes.

The pen-order map of triplex R is the most instructive render. Numbered
strokes with red dotted travel lines show the digitizing logic: the stem
is drawn as nested passes, the bowl as concentric loops, and the pen
travels in long diagonals between stroke groups. On a real plotter those
red lines are air time, and minimizing them is the whole game of pen
plotting. A font's beauty on screen and its efficiency on paper are two
different scores.

## The scene around it

**Lingdong Huang's p5-hershey-js** is the canonical creative-coding
interface. The parser is 3KB and honest: key glyphs by Hershey number,
map char codes through a cmap table, walk the pairs, beginShape/endShape
on " R". The gem is the `noise` argument to putChar: pass a number and
every vertex gets cubed-gaussian jitter on x; pass an object with x/y
functions and you get per-vertex displacement. Generative wobble is a
designed feature of the text renderer, not a hack around it.

**Golan Levin's p5-single-line-font-resources** is the monoline universe
in one repo, and it reframes Hershey as one citizen among many:
SVG 1.1 fonts (the Relief face from Toulouse, ISO 3098 technical
lettering built from lines and arcs, Windell Oskay's Evil Mad Scientist
archive), genuine single-line TTFs parsed with opentype.js (quadratic
beziers, real curves, most graphics software renders them wrong),
vintage hardware ROM fonts (HP1345A vector display, Apple 410, Commodore
1520 plotter, the Asteroids arcade font), KST32B (Saka.N's 4,125-glyph
monospace set encoded as byte-stream drawing opcodes on a 30x32 grid),
the M+ stroke font (~5,200 single-stroke CJK glyphs pulled from
LibreCAD), Hofstadter's Letter Spirit gridfonts, Jongmin Kim's LeonSans,
Licia He's DearPlotter, Moebio's Typode. The throughline: every
pen-plotter, laser projector, and CNC machine wants the same thing,
letters as toolpaths, and each era solved it differently.

**Anders Hoff's GridFont** (2019, ported by Golan) is the most
generative-native of the bunch. Glyphs are defined in a tiny
turtle-graphics language on a grid: `S4,9:DS6|S3DtRqS2eLp` describes a b
as two paths with relative moves (p/N/t/L/R/e), draws (D), and quadratic
hints (q/t). It is a font you program, not a font you trace, and it is
explicitly meant for plotter drawings.

**minf**, also Golan's, is the endpoint of that idea and my favorite
artifact of the session. The entire uppercase alphabet is 52 bytes: each
glyph is one polyline through 4 points on a 4x4 grid, each coordinate 2
bits, shipped as a 72-character base64 string. I decoded it and rendered
all 26. The disclaimer in the source is the whole review: "No claims are
made about minf's attractiveness or legibility." A, E, F, H, I, L, M, N,
O, T, V, X, Z survive; the rest are handsome zigzags. A font as a
compression stunt, and it still sets a readable-ish sentence.

**chinese-hershey-font** (Lingdong's project, forks by hank008 and
others) attacks the missing piece: CJK coverage. It rasterizes a TTF
glyph, scans it at many angles looking for line segments likely to be
strokes, then connects, merges, and cleans them into polylines, emitting
classic Hershey format or JSON. Seventy-three thousand characters of
Mingti as single-line strokes. Deriving stroke fonts from outline fonts
by computer vision, instead of hand digitizing, is the pragmatic answer
to Hershey's 2,000-glyph head start.

## What makes it sing

The constraint is the aesthetic. One pen, no fill, lift to move: every
Hershey rendering carries the ghost of the machine that drew it. The
triplex serifs are not decoration, they are extra pen passes that happen
to look like serifs. The hatched note heads are not shading, they are a
workaround that happens to look like engraving. When the toolpath is the
typography, efficiency decisions become style decisions, and sixty years
later the style still reads as honest.

## Avoid-list additions

- Fake "plotter style" that draws filled outlines with a wobble filter.
  Real single-line work never fills; if you want weight, add passes the
  way duplex and triplex do.
- Ignoring pen-up travel. Any piece that animates stroke drawing without
  showing or minimizing the travel is missing half the composition.
- Using Hershey glyphs as clip art. The interesting move is the pipeline:
  toolpath in, toolpath out, SVG export for a real pen (Golan's
  p5.plotSvg bridge exists for exactly this).

## Technique takeaways for pieces

- Stroke fonts are resolution-independent by construction; a piece can
  zoom from caption to billboard with zero assets.
- Pen-up order is a free animation timeline: draw the strokes in file
  order and the letter constructs itself the way the digitizer drew it.
- The noise hook pattern (p5.hershey.js) generalizes: any vector source
  becomes generative the moment vertex placement goes through a function.
- Bit-budget fonts (minf, KST32B opcodes) suggest pieces where the
  encoding is the concept: 52 bytes of alphabet, glyphs as 4-point walks.
