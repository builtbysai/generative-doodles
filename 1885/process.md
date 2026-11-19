# №1885, 3M Words (MG6, PP1132, study #246 maddalena-ghezzi)

## What it is
A residency journal kept over one compressed year. A single journal page
sits centered on paper white ground with generous margins. Each tap turns
the page to the next of twelve chapters, and each chapter builds itself
in front of you: torn paper sheets land first, then small photographs of
trees and hands, then magenta and peach letter M stamps pressed over the
paste-up, then one short line of text. The page rests between chapters
in a slow day-night tint that drifts on its own clock, independent of
taps. The twelfth chapter is a quiet page: one tree drawn in a single
continuous line, and the words "tree human". One more tap starts a new
year, the same twelve chapters, but every collage re-cut differently.

## Spec source
TASKS.md prompt block PP1132, study #246 maddalena-ghezzi: "A residency
journal kept over one compressed year. Twelve chapters, one per tap: each
chapter is a collage page that builds itself, layering cut paper,
ink-stamped letter-M textures in magenta and peach, small photographs of
trees and hands, and one short line of text. Between chapters the page
rests in a quiet day-night tint. The twelfth chapter ends with a single
tree drawn in one line and the words 'tree human'. Tapping again starts a
new year: the same twelve chapters, but the collages re-cut themselves
differently. Palette: paper white, magenta and peach ink, collage paper
tones (kraft, newsprint, leaf green), one-line tree in ink black.
Composition: a single journal page, centered, generous margins; collage
elements cluster like a real paste-up. Motion-interaction: TAP EARNED.
Tapping turns the page of the residency journal; a journal is turned by
hand and the tap is the page-turn, not a reload. Taps advance, never skip
or reset; the year loops on its own terms. Never click-to-reload.
Technical approach: 2D canvas. Each chapter is a generative collage
(seeded per year): stamped M textures via a stamp brush, torn-paper
polygons with deckled edges, placed photos (procedural tree/hand
sketches), one text line from a small corpus. Day-night tint is a slow
global clock independent of taps. Sound: soft paper sounds per layer
(shuffle, stamp thump), a single struck tone when the tree page
completes. What to avoid: no scrapbook kitsch, no baby photos, no
literal diary text walls, no progress bar or chapter dots; the year must
feel lived, not gamified. Reference: the 2026-06-28 post: 'my year long
self-imposed residency in motherhood: 3M words and includes 12 collages
and a track called tree human'; words by @emmaiduma: 'For you I must
become a tree, every tree is the opposite of wandering'; frame f16:
magenta and peach letter-M ink stamps on paper."

## Mechanism
- Chapters: twelve, one per tap. A tap advances exactly one chapter,
  never skips, never resets. After chapter twelve, the next tap starts
  a new year (year counter increments, chapter returns to one) and every
  collage is re-seeded, so the same twelve lines return on differently
  cut pages. No progress bar, no chapter dots, no chapter number shown.
- Build: each chapter builds itself over 2.4 s after the tap. Torn
  papers land first (staggered from 0 s), then photos (0.34 s on), then
  M stamps (0.44 s on, staggered), then the text line (0.78). Each layer
  fades in over 0.15 of progress with a smoothstep ramp.
- Collage generation: pure function of mulberry32(1885 + year * 7919 +
  chapter * 37). Per chapter: 3 to 5 torn sheets, 1 to 2 photos, 4 to
  6 M stamps, one text line from the twelve-line corpus. When two
  photos appear they are always one tree and one hand, in random order.
- Torn paper: a rectangle whose corners and edge midpoints are jittered,
  filled in kraft, newsprint, leaf green or peach, rotated up to 0.22
  rad. All sheets are placed to stay inside the page.
- M stamps: a two-stroke letter M with a hair offset second impression
  so the ink reads hand-pressed, in magenta or peach, alpha 0.55 to
  0.90, with a few ink speckles. Stamps stay clear of the text line.
- Photos: white-bordered prints holding procedural sketches. The tree
  is a trunk with branches and leaf-green dot canopy. The hand is a tall
  palm with four long fanned fingers, a thumb and a wrist line.
- Twelfth chapter: a quiet page with one faint peach M stamp, then the
  one-line tree. The tree is a depth-first walk, out along each branch
  and back, so the whole tree is a single continuous stroke drawn from
  progress 0.15 to 1.0, followed by the words "tree human".
- Day-night tint: a slow 240 s global clock, independent of taps. Warm
  peach wash by day, cool blue wash by night, never stronger than 0.07
  alpha, laid over the page only.
- Text corpus (one line per chapter, in order): "For you I must become
  a tree", "every tree is the opposite of wandering", "a year, kept in
  twelve pages", "the ink is still wet", "motherhood, in magenta",
  "peach light on paper", "hands that hold, hands that let go", "the
  garden answers slowly", "cut, paste, begin again", "a root is a
  decision", "the page remembers the hand", "tree human".

## Palette (hand-picked; the study file studies/maddalena-ghezzi.md does
not exist in the repo, so these hexes are chosen from the prompt's named
colors)
- Paper white: #F7F3EA (ground), page #FDFBF4
- Magenta ink: #C2185B, soft #D14D7E
- Peach ink: #E8A87C, deep #D98E5F
- Kraft: #C9A876, deep #A9855A
- Newsprint: #EFE9D8
- Leaf green: #5B7A4A, deep #42592F
- Ink black: #1A1A1A, soft #3A3630
- Plates: #1E1710 ground, magenta rule, #F7F3EA title ink, #F2C9A0 hint ink

## Interaction
Tap earned. Tapping anywhere on the page turns it to the next chapter.
Taps advance, never skip or reset, and the year loops on its own terms.
Never click-to-reload. A visible "Sound: off / on" plate sits bottom
right; tapping it toggles sound instead of turning the page. Default
silent. Real WebAudio is created lazily inside the first tap gesture
only, never on load, never autoplay.

## Sound (closed-form model)
A soft paper shuffle on each page turn, a low stamp thump as each M
stamp lands during the build, and a single struck tone (C5 with an
octave shimmer, 2.8 s decay) when the tree page completes. Events
follow the chapter build clock, not the wall clock.

## Frame one (determinism)
Fixed phase t = 2.3 s: chapter one 96 percent built, papers, photos and
stamps in place, the line "For you I must become a tree" fully legible.
Collage, tree path and tint are all pure functions of mulberry32(1885)
and the fixed phase. No Date, no wall clock, no Math.random in frame
one. Thumb renders are byte-identical across independent runs (md5
verified).

## House rules
Visual Viewport sizing with resize on visualViewport and window; canvas
pinned in draw() via canvas.style.width/height in px; phone detection
via window.screen (min dimension under 700 px) with aspect h > w*1.15
fallback; centered journal page keeps its portrait shape on every
screen, page ground set to the piece's own paper white and hint ink
flipped to match; one synchronous frame at load; requestAnimationFrame
guarded by a typeof check; prefers-reduced-motion respected (static
frame one, no loop); all motion well under 14 Hz.

## Gallery
- Date: 2007 · 03 · 11 (formula 2002-01-10 + (N+1) days)
- Note: "A residency journal in twelve chapters, one per tap: torn paper, magenta and peach M stamps, small photographs, and a one-line tree at the end. Tap to turn the page."

## Deviations from the prompt
None of substance. The twelve text lines beyond the two quoted by
@emmaiduma are short invented lines in the same voice, as the prompt
calls for one line per chapter from a small corpus. The study file was
absent, so palette hexes were hand-picked and are recorded above.

## QA
Rendered the actual script with node render-piece.js at 1280x900
desktop, 390x844 mobile and 720x720 thumb; all three inspected
visually. Two fix rounds, both re-rendered and re-inspected: (1) torn
papers first rendered as plain blobs and the text line was washed out
at frame one, so papers became jittered rectangles, the fixed phase
moved to 2.3 s and the text threshold moved earlier; (2) torn sheets
bled past the page edge, a stamp overlapped the text line, and the
twelfth chapter tree was missing its trunk, so sheet and stamp ranges
were pulled inside the page, the trunk start point was added to the
one-line path, and hand fingers were thickened and fanned. The
twelfth chapter was also rendered separately from a temporary copy
(chapter forced to 11) at desktop and mobile: the one-line tree and
"tree human" read cleanly on both. Thumb re-rendered independently
and confirmed byte-identical (md5 d1afb736a6863547231e60aa6ce999ba).
