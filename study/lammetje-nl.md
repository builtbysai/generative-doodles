# Lammetje (Jeroen Lam): Study Notes

**Profile:** x.com/lammetje_nl (login wall, not accessed) | generative artist
from the Netherlands | 30+ years in the creative industry as a developer and
digital creator | self-taught artist | long-form on fx(hash), short-form on
objkt.com, exchange.art, The Function | Guest of Honor, Generative Art Summit
Berlin (in honor of Herbert W. Franke).
**Key works:** *Intertwine* (fxhash long-form, by early 2023), *Donuts And
Windows* (128 editions), *JustATriangle* (HTML/SVG series).

**Depth:** six tweet images recovered at full resolution (1000-1200px) via the
buhitter archive of his X timeline and inspected pixel by pixel. The
*Intertwine* mechanism was reverse-engineered through stephenswat/coagulate
(Jan 2023), a black-box reimplementation whose generate.py was read in full;
his actual source was not seen. NOT seen: his X profile (login-walled), any
fxhash token page (fxhash returned 402 to fetches), any video or motion
documentation, his own code. His bio centers *movement*, so the stills
understate him the way they understated okazz_. What follows is certain about
the six images and the reimplementation's mechanism; everything about his
fxhash editions is known only through secondary sources.

## Who he is
A Dutch developer with three decades in the creative industry who came to
generative art self-taught and treats it as algorithm exploration plus
relentless refining: "Exploration of an algorithm and refining is the core of
his creative process. His work is centered on simple aesthetics, movement,
color, light and texture." That sentence is the whole practice. He does not
chase novelty of subject; he picks one algorithm and refines it until the
output is unmistakable. His X presence is a daily ritual, "gm" with the
sun and coffee emoji under a new piece, warm and unpretentious. One tweet
gives the game away: "JustATriangle)10, made with html, svg, gradients and
dropshadows, yeah still got to learn P5". He was building the work in raw
HTML/SVG before he had even picked up p5. The tool is never the point.

## The six images, read off the pixels

**1. Intertwine, monochrome (dark ink on paper).** Thousands of fine straight
line segments on off-white paper, forming flowing bands like wood grain or
marble. The bands are not smooth curves: they are chords between jittered
points, so every "flow" has a hand-plotted, threadlike quality. Where bands
bunch, they knot into dense dark tangles. Portrait format, paper margin.

**2. Intertwine, purple.** Same family, purple-to-magenta ink on cream. The
knots read as whorls and eyes. Comparing the two: the system is identical,
only the palette changes, and the palette change is enough to make it a
different piece. The color is doing compositional work, not decoration.

**3. Donuts And Windows #13.** Hundreds of overlapping translucent circles and
rings on a flat teal ground: orange-red, white, dark navy, thin outlines and
filled discs mixed. They cluster in a loose central cloud with a generous
teal margin. Translucency is the only depth cue; overlaps bloom into new
hues. Flat, graphic, playful. The margin is doing half the work.

**4. Red silk (dark).** Luminous red-orange-white particle streams on
near-black, like silk caught mid-billow. Rendered as thousands of fine
*dotted* trails, not continuous lines; the dots give it a woven, textile
grain. White-hot cores where the flow bends hardest, deep red at the edges.
The single most "light and texture" piece of the six.

**5. Soft color-field blobs.** Huge overlapping translucent gradient shapes,
cyan/magenta/cream, filling the frame edge to edge. The overlaps quantize
into visible stepped bands at the edges, a banding artifact worn as texture.
Dreamy, no linework at all. The opposite pole from Intertwine: same love of
translucency, zero drawing.

**6. Black disc-field ("Playing with code again").** An irregular blob-mass of
stamped black discs on white, the interior knocked out in a halftone/dither
pattern with small blue, red, and yellow accents showing through underneath.
Reads as an experiment, not a finished piece: mass first, erosion second,
color as the reward for looking inside.

**JustATriangle (text only, not seen):** a numbered series ()03, )10...,
"made with html, svg, gradients and dropshadows". One triangle, explored
through rendering attributes alone.

## The technique, decoded
The coagulate reimplementation nails the Intertwine mechanism, and it is not
what the images suggest. There are no agents and no flow field. It is:

1. A diamond-square noise heightfield (40x60).
2. Grid points jittered with random noise.
3. From each point, flood-fill to neighbors in the same *quantized elevation
   band*.
4. Draw many random straight chords from the seed point to reachable points,
   weighted toward similar heights.
5. Color each line by elevation, from a palette spanning two random hues.

The marble bands are iso-lines of fractal terrain drawn as chords. The knots
are steep terrain where bands bunch. The threadlike quality is jitter plus
straight segments. It is contour-tracing disguised as flow. This matters for
the study: the beauty is in the *mapping* (elevation to line, band to
thread), not in any particular shape.

The Donuts mechanism is the inverse discipline: one primitive, flat ground,
translucency, tight palette. The red silk is long-exposure dotted trails on
dark, color by energy. Three completely different engines, one sensibility:
simple means, refined until they sing.

## Motif evolution
Line-tangles (Intertwine, by early 2023) came first as the long-form
statement. Then the practice fans out: luminous dark flows, soft
translucent color-fields, flat graphic circle pieces (Donuts And Windows),
tiny raw-SVG triangle studies. The through line is not a motif but a
method: pick a small engine, refine it across a series, post daily. The
*Donuts And Windows* run to 128 editions is the method at full stretch.
Later work gets flatter, bolder, more graphic; the early work is all
thread and texture.

## Palette discipline
Two modes, never mixed. Mode one: monochrome or single-hue ink on paper
(Intertwine black, Intertwine purple). Mode two: flat saturated ground with
a tight warm/cool accent set (teal ground with orange-red/white/navy;
near-black with red-orange-white). He never uses the full rainbow; even the
playful pieces commit to four or five colors. The ground is always doing
work: paper margin, teal field, black void.

## What to steal (study, not copy)
- The refine-one-engine method: a series is 128 variations of one small
  idea, and the smallness is what makes the series cohere.
- Translucency as the only depth cue. No shadows, no gradients on the
  forms themselves (except the dedicated gradient pieces); overlaps make
  the new colors.
- Contour-chords: mapping a scalar field to straight chords between
  jittered points gives a threadlike quality no smooth curve has.
- The dither as reward: a solid mass with a dithered interior that reveals
  color underneath. Erosion as composition.
- Dotted trails for luminous flow: dots read as textile, lines read as
  wire. The dot is doing the silk.
- Margins as composition: the Intertwine paper margin and the Donuts teal
  margin are load-bearing, not leftover.

## What NOT to do
- Do not copy the flow-band tangle look. The marble/woodgrain contour-band
  is his signature the way the clock gauge is okazz_'s; recognizable at
  thumbnail size. The *mechanism* (scalar field to chords) is free, the
  *look* is not.
- Do not ship overlapping translucent circles on a flat teal ground. That
  exact piece exists 128 times.
- Do not confuse his simplicity with easiness. Every piece here is one
  idea executed with total control; a loose imitation reads as a sketch
  of his work, not as its own piece.
- Do not treat the stills as the whole work. His bio leads with movement;
  assume every static image here is a frame of something that moves.
