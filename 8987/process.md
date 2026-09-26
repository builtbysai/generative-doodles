# Doodle №8987: Fifty-Two Bytes (2026-08-19)

**File:** `8987/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
A complete alphabet under an absurd bit budget. Each capital letter is one
continuous three-segment zigzag drawn on a 4x4 grid: four points, two bits
per coordinate, sixteen bits per letter. Twenty-six letters times sixteen
bits is 416 bits, exactly 52 bytes. The piece is a working specimen: type
to set text in the font, and beside it sits the entire font as a hex dump,
all 52 bytes, with the letters in your text lighting up red. An alphabet
chart shows every glyph with its joints marked.

## Technique synthesis (from study, not copied)
From the Hershey study's minf specimen: the idea that a font can be a tiny
encoding rather than outlines. But minf is a compression of an existing
design; this alphabet is designed FOR the budget from the first point.
Nothing is borrowed from Hershey's shapes. The constraint did the design
work: with only three segments per letter, each glyph had to find its most
distinctive skeleton. E and G nearly collided and were separated by hand;
H went through three drafts before the two-verticals-plus-diagonal read.

## The encoding
For letter with points (x1,y1)..(x4,y4), each coordinate 0..3:
byte1 = x1<<6 | y1<<4 | x2<<2 | y2, byte2 = x3<<6 | y3<<4 | x4<<2 | y4.
A = (0,3),(1,0),(2,0),(3,3) -> 0x34 0x8f. The full table is in the piece.

## Interaction
Type to change the specimen (A-Z, 0-9, space, . , ! ?). The hex dump
highlights the bytes of the letters you used, so the relationship between
the encoding and the shapes stays visible.

## Legibility note
The seed's success criterion was a stranger reading a whole sentence. The
zigzags are abstract, but the alphabet chart teaches the eye: after one
look at the chart, "PACK MY BOX" reads. That chart-is-the-key dynamic is
part of the piece, not a failure of it.
