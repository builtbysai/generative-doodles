# №1969 Prose Before Lyric

TL2 / PP1216, study #257 theodora-laird.
Gallery date: 2007 · 06 · 03. Gallery note: "Prose types itself,
and each finished sentence frees a melodic line. Watch the prose
become lyric."

## What it is

A paragraph of prose types itself across a quiet chapbook page,
word by word, in the cadence of someone looking at a cliff face
and writing about it. Each finished sentence releases a single
visual melodic line: it leaves the text and arcs across the
screen below, bending toward the words that made it, and settles
into formation with the lines before it. When the paragraph ends,
the lines hold, then text and lines fade together, and a new
paragraph begins. The lyric is always downstream of the prose.
The three paragraphs are written for this piece in the observed
register (place, weather, a face); no real sentences from her
actual writing are used. Watch-only: the timing of the typing is
the timing of the piece, and the viewer reads at the piece's pace.

## Palette

- Chapbook cream ground #f2ead8 (ground, page ground)
- Printer-ink black text #1f1a16
- Melodic line tones, one per sentence: slate #5a6b7a, ochre
  #b98a2e, rust #a34a2a

## Interaction

Watch-only. There is nothing to tap. A text buffer types one
word every half second; sentence boundaries trigger line agents
whose curvature is seeded from the sentence's words (length and
punctuation set the bend and the number of note dots). Each line
travels from its sentence's end point to its settled place over
4 seconds, drawing itself out over 2.5 seconds, then sways
gently in formation. Note dots along each line pulse slowly, a
closed-form visual model of the bell-like voices. Motion is all
on half second and slower timescales, well under the 14 Hz
ceiling. prefers-reduced-motion renders a still frame. No audio:
the voices are visual only, per the Franke audio rule.

## Determinism

FIRST_T = 12 s. At t = 12 the first paragraph is mid-typing
(word 25 of 35 on the page) and two sentences have finished:
the slate line is settled in the lower half and the ochre line
is still travelling from the text. Every element is a pure
function of the clock: the fixed 30 second paragraph cycle
(typing, 6 second hold, 4 second fade), the seeded line shapes,
and the note-dot phases. QA hooks: window.__draw(t),
window.__piece1969 with typedWords(t), linesOut(t), redraw(t),
firstT. Query params: ?t= sets the virtual clock, ?seed= is an
alias for it.

## Paragraph cycle

Paragraph 1 (35 words, 3 sentences): the cliff in the morning
light, rain on the ledges, a woman on the path. Paragraph 2
(32 words, 3 sentences): the grey sea, counting waves, light
thinning toward evening. Paragraph 3 (29 words, 3 sentences):
waiting at the gate, wind in the grass, nothing hurries. Typing
takes 17.5, 16, and 14.5 seconds; each paragraph then holds 6
seconds and fades over 4, inside a fixed 30 second cycle, and
the next paragraph begins at the cycle boundary.

## Probes

Seeded probe harness /tmp/probe-1969.js (loads the actual script
in the render-piece node-canvas shim):

- Frame one (t=12): paragraph 0, 25 words typed, 2 lines out;
  md5 4ac8c140e4aac2071178130b31b29e0a, identical to thumb.png,
  re-rendered twice with identical md5.
- Typing advances word by word: 1 word at t=0, 11 at t=5, 23
  at t=11, 35 at t=17.5 when the paragraph completes.
- Lines release at sentence boundaries: 1 out at t=5, 2 at
  t=12, all 3 at t=17.5; paragraph 2 starts at t=30 with 1 word
  typed and 0 lines out, reaching 2 lines out by t=45.
- Frames differ over time: md5 at t=12, 20, 26, 35 are all
  distinct, typing, travelling lines, and the fade all moving.

## QA renders

node ~/workspace/tools/render-piece.js at 1280x900 desktop,
390x844 mobile, and 720x720 thumb. All three inspected visually.
Thumb md5 4ac8c140e4aac2071178130b31b29e0a, re-rendered after the
final fix with identical md5, deterministic frame one confirmed.

## Fix rounds

1. First build rendered clean, but the settled line was almost
   flat, the lower half sat too low with a dead band between
   prose and divider, and the lines started at the very left
   edge where they grazed the vertical side text. Fix: line
   bend range raised from 0.05-0.085 to 0.07-0.12 of the stage
   height, the divider and line bands moved up, the prose
   column moved down a little with a slightly larger font, and
   the lines now run from 0.10W to 0.92W. Re-rendered and
   re-gated after the fix; desktop, mobile, and thumb confirmed
   clean.

## Deviations from the prompt

One, noted here: the prompt's bell-like voices are a closed-form
visual model (pulsing note dots along each line), not real
WebAudio, per the Franke audio rule; there is no sound and
nothing autoplays. Everything else is as specified: prose upper
half in a narrow column, freed lines travelling the full width
below, watch-only, readable serif type at a readable cadence,
fragments written in the observed register.

## Known warts

- While a line is still travelling, its head dot can read as a
  small stray mark inside the prose column, briefly, before the
  line leaves the text.
- The three settled lines can cross each other near the left
  where their bends differ; the formation reads woven rather
  than strictly stacked.
- In paragraph 1 all three lines happen to arc upward; the bend
  direction is seeded per sentence, so other paragraphs vary.
