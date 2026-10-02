# Joan Shogren: Study Notes

**Profile:** Joan Shogren (Mount Vernon, Washington, July 5, 1932, to
Santa Clara, California, June 15, 2020). Chemist by degree (San Jose
State University, early 1950s), professional photographer in high school,
then secretary in the SJSU chemistry department, graphic designer,
origami knack. In spring 1963, just before Easter break, she told
graduate student Jim Larsen that computers should be able to "design a
picture". Larsen and assistant professor of chemistry Ralph Fessenden
translated her "laws of art" into code for an IBM 1620. The first public
showing of the results opened May 6, 1963, in the SJSU Spartan
Bookstore, nearly two years before the Stuttgart and Howard Wise shows
of 1965. Two decades later, in 1984, T/Maker contracted Shogren, Mike
Mathis, and Dennis Fregger to design the first serious clip art for the
Macintosh, sold as "ClickArt Publications". She had to sign an NDA and
was loaned unshipped Macs by Apple. Heidi Roizen, T/Maker co-founder,
said Joan designed each image "pixel by pixel ... almost like
needlepoint".

**Depth:** deep on text, deep on five images, one local re-render sheet.
Read in full: Verity Babbs, "Who Was Joan Shogren, the Secretary Who
Pioneered Computer Art?" (Artnet News, May 7, 2025); the full Spartan
Daily front page and page 6 continuation (May 3, 1963, "Chemists Turn
'Electronic Artists' at SJS" / "Chemists' Computer Art Can Be Seen
Monday"); the full San Jose Mercury News "Art By The Numbers: World's
First Computer Show" (May 4, 1963); Brad Fregger's Joan Shogren archive
page via the Wayback Machine snapshot of March 21, 2023 (the live
fregger.com/Joan page is now a 404; text plus all images recovered from
the archive); Dennis Fregger's 2007 New Scientist letter; Valentina
Tanni's "Computer Art pioneers: Joan Shogren"; the DADA agent entry
summary; the tedium clip-art history for the ClickArt line; the
eko33.com Shogren essay as a check (derivative, nothing new). Five
images visually inspected at full resolution: the Tanni photo of Joan
holding two works; the artnet crop of the 1966 Mercury feature with two
photos; the Spartan Daily May 3 front page; the Spartan Daily page 6
continuation; the Mercury News May 4, 1963 page. One PIL re-render sheet
built and visually inspected: the number sheet, a tile interpretation,
and an oils interpretation of one 40 by 40 constrained-random grid.
NOT seen: any original 1963 number sheet or painting, the IBM San Jose
office commission, ClickArt artwork beyond packaging photos, the
fregger.com "Thinking Machines" and ClickArt sample images (listed on
the archived page but not downloaded this session), the San Jose
Mercury News May 3, 1963 announcement (listed, not inspected).

## The instrument: rules in, numbers out, hands finish

The instrument has three stations, and the composition happens across
all three. Stage 1, Shogren: "We start by taking statements from artists
about what good art is," Larsen told the Spartan Daily, "and feed this
into the computer. The information must first be translated into
mathematics, as this is the only language computers know." Her laws, in
her own 1963 words: "Such items as proportion, balance, and a centre of
interest are what we ask the computer to work with." The 1966 followup
expands the list: centers of interest, color harmony, proportion,
foreground color, shadings and background color, among others.

Stage 2, the IBM 1620: it "produces a page of as many as 1,600 numbers
from 0 to 5 arranged in what is supposed to be an artistic pattern"
(Mercury, May 4, 1963). Dennis Fregger's summary is the clearest
specification we have: "The computer filled in a grid at random, except
as constrained by 'rules of art' entered on punched cards, specifying
colour, colour harmony, rhythm and composition." So the generation is
constrained randomness, not a drawn picture: the computer never places
a shape, it places a class label per cell.

Stage 3, the technician: the sheet comes out looking "something like an
income tax table, an array of closely-spread numbers" and "require
translation for human appreciation." Senior chemistry major Marvin Coon
was the usual interpreter. He assigned a color and a shape to each
number ("all the fives might become yellow blobs. The twos might be
black squiggles. Then he paints by the numbers"), and "once you've
assigned a color to a number, you've got to stick with it." Shapes:
"squares, rectangles, distorted areas and triangles."

Fessenden's framing is the Renaissance workshop, inverted: "Everything
except the overall design is left to the human. It's impossible to tell
how it will turn out until you look at them." And: "Like the master
painters of the Renaissance, it leaves the details to technicians."
He also admitted the yield: "About every other painting is judged
something of a failure."

## What makes it sing

The separation of concerns. The computer decides placement classes
under the laws; the human decides what a class MEANS, once, irrevocably,
and then executes. This is a genuinely modern move: the machine
proposes a structure it cannot finish, and the human's single binding
choice (the color map) plus medium choice (oils vs miniature tile vs
crayon and India ink) is the artwork. The Mercury 1966 caption names
three generations of interpretation of the same program output: the
"most primitive and crude" in oils, a "more refined design" via
miniature tile, the "most recent" in crayon, India ink and acrylic
polymer. One number sheet can be many paintings. The Tanni photo shows
two of these side by side: the oils mosaic is a square-cell field with
an irregular lighter mass drifting off the center (the center of
interest reads even through the halftone), the tile panel is a tall
narrow board of vertical segmented columns in alternating light, mid,
and dark values, strict rhythm, textile-like.

The other thing that sings is the economy. Five values only, 0 to 5.
Six classes of mark. The laws are coarse. The entire aesthetic comes
from the locked mapping and the hand. This is the opposite of the
period's plotter-line aesthetic: no curves, no geometry games, just a
number field made visible by a human hand that had to commit.

## Composition and palette notes

From the photos: the tile panel uses narrow vertical columns with
1-2-3 stacked segments per column, values alternating so no two adjacent
tiles share a tone; ground is the dark end of the palette. The oils
panel keeps the square grid visible, paint over paint, with the focal
mass lighter than its dark surrounding ground. Both read as mosaic
before they read as anything else. The "rhythm" law from Dennis
Fregger's letter is visible in the tile panel: columns march, segments
syncopate.

## Re-render findings

Built the instrument in PIL: a 40 by 40 = 1,600 number sheet, values 0
to 5, constrained by an elliptical focal region for the center of
interest, a left-right balance pass per value class, and a tight value
budget (most cells low, few high). Then two interpretations of that
one sheet: a miniature-tile panel in six locked tones, and an oils
panel with 5s as yellow blobs, 2s as black squiggles, 3s as triangles,
4s as squares. All three frames visually inspected.

Findings: the number sheet at this coarseness reads as texture, not
composition; the laws as I encoded them are weak composition rules, and
the yield confirms Fessenden's "every other one is a failure." The
tile interpretation is the stronger of the two because the locked
column rhythm carries the composition even when the numbers underneath
are mush. The blobs-on-ground reading needs the focal ellipse to be
aggressive or the center of interest vanishes. The real compositional
act in this instrument is the interpreter's locked color map and the
choice of medium, not the punched-card rules. That is the lesson worth
carrying: constrain the structure loosely, commit the reading totally.

## Avoid-list additions

- The "computer as artist" framing where the machine is blamed or
  credited for everything; Shogren's own three-stage credit (her laws,
  Larsen and Fessenden's translation, Coon's interpretation) is the
  honest version.
- Income-tax-table number grids shown as themselves and called art;
  in her system the sheet was never the artwork.
- Claiming "laws of art" as a program name without saying which laws
  and what they constrain.
- The primitive look as an alibi for arbitrary randomness; her grids
  were constrained by named principles and half were rejected.

## Honest gaps

No original 1963 output seen in person or in a high-res archival scan;
the artwork knowledge here is through 1960s newspaper halftones. The
exact "laws" as encoded on the punched cards are lost; Dennis Fregger's
letter names colour, colour harmony, rhythm, composition, and the 1963
and 1966 articles name proportion, balance, center of interest,
foreground and background color, but the actual code and the IBM 1620
programs are not known to survive. The number-to-shape vocabulary is
known only by example (blobs, squiggles, squares, rectangles, distorted
areas, triangles). The "every other one is a failure" rejection pass
is unrecorded. The IBM San Jose office commission is cited but its
location and form are unverified. The Wikipedia notability dispute is
recorded from Brad Fregger's account only. ClickArt artwork beyond the
packaging photos was not inspected this session. The Spartan Daily May
6, 1963 exhibition itself left no catalog.

## Seeds

363. **Income Tax Table**: the number sheet is a visible layer of the
finished piece, not discarded after interpretation. A coarse digit grid
printed under translucent painted cells, so the viewer can read the
0 to 5 classes through the paint. The technician's locked color map is
the wall label: "5 = yellow blob, 2 = black squiggle." Distinct from
any seed that hides the score; the score stays on stage.
Success: a stranger can match three cells to the legend, and the
painting without its legend reads as a weaker object.

364. **One Sheet Three Mediums**: from the 1966 caption's three
generations. Generate one constrained number grid, then interpret it
three ways side by side: mosaic tile columns, flat painted blobs and
triangles, and a black-and-white ink reading. Same structure, three
technicians. Distinct from 363 Income Tax Table (the readings compared
vs the score exposed).
Success: the three panels are unmistakably the same piece, and the
viewer picks a favorite medium without needing to be told the rules.

365. **The Lock-In**: from Coon's rule, "once you've assigned a color
to a number, you've got to stick with it." An interactive piece where
the viewer is the technician: the number sheet is dealt, the viewer
assigns each number a color one at a time, irrevocably, then the piece
paints itself in that mapping. The drama is the commitment, not the
result. Distinct from 364 One Sheet Three Mediums (one binding choice
vs three finished readings), and from 357 The Rater's Matrix (taste as
training vs taste as an irrevocable bet).
Success: the viewer hesitates before assigning 5, and the finished
piece feels owned rather than generated.
