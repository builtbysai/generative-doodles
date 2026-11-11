# №1702 "Asemic Engine" - PP949, EXPANSION #223 piter-pasma

Date: 2006 · 09 · 09. Gallery note: "A pen writes an endless page of looping script that means nothing. Watch only."

## Build
A generative asemic writing script, black ink on paper white. A pen cursor
draws looping, toothy, stemmed glyphs left to right across a full-bleed page
with book margins; finished lines stack above while the current line sits in
the lower third, and when the page fills it turns (2 s crossfade) and writing
resumes on a fresh page. No real letters or words ever: every glyph is built
from a small stroke-primitive set, so the script has rhythm but no alphabet.

Template: live №1700 (structure, plates, sizing, hint) mirrored per spec.

## Generator model
The generator is exactly 59 lines (counted from the asemic-generator marker
through makePage, and displayed in the corner as "gen 59 lines"), an echo of
the original's 59 lines of code. Glyphs come from seven stroke primitives
(loop, teeth, stem, arch, wave, tail, dot) plus an occasional flourished
capital at word starts. A bigram-style transition table (NEXT) picks each next
primitive from the previous one, so the script has Markov rhythm; glyphs are
1 to 3 primitives, words 2 to 7 glyphs, with a 12 percent chance of a
trailing dot. No glyph repeats identically twice in a row: makeWord re-rolls
any glyph whose primitive signature matches the previous glyph (up to 4
tries, then forces a different first primitive), and the signature chain is
kept in a module-level lastSig so the rule holds across word, line, and page
boundaries. Each line's slant drifts by a random walk clamped to within 3
degrees. Small per-point jitter (seeded, 0.05 u) keeps the strokes from
reading as a font.

## Pen and page model
The page is a timeline of strokes and pauses, all durations in u units so
they are stage independent. Nib weight varies with stroke speed: each stroke
draws a speed factor s in [0.7, 1.35], width 0.16 u / s, pen speed
3.6 u/s * s, so faster strokes draw thinner. Word pauses are 0.12 s, line
pauses 0.7 s. A full page takes 224.9 s (3.7 minutes), inside the 3 to 5
minute acceptance range. The pen nib is a small dark wedge drawn at the
current stroke point, oriented along the stroke direction. When the page
fills, the old page crossfades out over 2 s while the new page (generated
from the continuing seeded RNG) crossfades in and the pen restarts at line 1.
Reduced motion shows the pre-rolled frame only.

## Deviations
- Nib weight varies per stroke rather than continuously within a stroke:
  each stroke gets one speed factor, so one width, which keeps the stroke
  count low enough to redraw every frame. The visible effect matches the
  prompt: thin fast strokes sit next to heavy slow ones.
- No typing sounds, no user typing input, no buttons, no hidden controls.
  Watch only, per spec.

## House rules
Visual Viewport sizing, resize on visualViewport and window; canvas pinned in
draw() via style width/height in px; phone detection via window.screen (min
dimension under 700 px) with aspect fallback (h > w*1.15); square stage on
desktop, full-bleed on phones, page ground is the piece's own paper white;
one synchronous frame at load; requestAnimationFrame guarded by a typeof
check; deterministic fixed-phase first frame (seeded RNG mulberry32(1702)
only, no Date.now()/Math.random() affecting frame one); pre-roll is 7
completed lines plus 45 percent of line 8 (penT0 163.6 s), so the current
line sits in the lower third at frame one; no em dashes in visible copy;
title/date/hint plates drawn on canvas; no gradients, no shadowBlur, no
Path2D, no createElement; dots drawn as single arcs with a moveTo first;
crossfade alphas rounded to 4 decimals.

## QA
Rendered with node render-piece.js and inspected all three sizes.
- Desktop 1280x900: seven finished lines plus a partial eighth with the pen
  nib at its end; loops, teeth, arches, waves, descenders and flourished
  capitals all legible as illegible script; title plate top left, hint plate
  bottom left, "gen 59 lines" counter bottom right.
- Mobile 390x844: full-bleed; same pre-roll, glyphs legible, plates fit.
- Thumb 720x720 (thumb.png is this render): same pre-roll, legible.
- Determinism: two desktop renders byte-identical (md5
  7d3abee0a7003fe060c336953d5ad929); thumb re-render byte-identical to
  thumb.png (md5 ba8d40493acdfc2c7a7136344af69548).
- Probe harness (/tmp/test1702.js, node-canvas with __probe): page 1 has
  170 glyphs, page 2 has 174, page 3 has 167, with zero consecutive
  identical glyph signatures on any page and none across the page 1 to 2
  boundary; slant per line 0.21 to 2.04 degrees, all within 3 degrees; full
  page 224.9 s; 10 lines per page; generator 59 lines.
- Live-loop harness (/tmp/test1702-live.js, driven rAF): 5 s of writing
  advances the pen with no error; driving past the page end turns the page
  and the 2 s crossfade completes with no error; the post-turn frame shows
  a fresh page with the pen starting line 1.

## Files
- index.html - md5 cc27a85a32e3b16a9974508841a992ff
- thumb.png - md5 ba8d40493acdfc2c7a7136344af69548 (720x720 render)
- process.md - this file
