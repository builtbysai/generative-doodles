# No.538 — Silent Nine

EXPANSION #65 nadia-hafid, prompt NH2. From Mal olor p.42: nine silent
panels, objects as actors, near-silent storytelling.

## Concept

A 3x3 grid of deadpan micro-panels on flat pink with thin black
gutters. Each panel stages one tiny office ritual with symbol-faces
(dot eyes, single line mouths, blank by default). Nobody says anything:
the only marks inside the speech balloons are punctuation, following a
small tension curve across the reading order — calm "..." early, "?"
in the middle, "!" near the end, "..." to close. Exactly one figure
in the grid is gray, the contrasting outsider in Hafid's sense. Tap
reseeds the grid: a new nine-panel micro-story is generated from the
scene grammar and wipes in panel by panel. Between taps the page is
completely still.

Palette, strict, nothing else: pink #F2B3C0, ink black #161616,
gray #CFCFCF, white #FFFFFF. Flat fills only, no gradients, no
texture, no shadows.

## Construction

Single self-contained index.html, canvas 2D. Square stage fitted to
the Visual Viewport (resize listeners on visualViewport and window);
canvas CSS size pinned in px inside draw() every frame. Phone
detection via window.screen physical size (min dimension < 700px)
with aspect h > w*1.15 as fallback; composition keeps its shape on
phones, page ground is the pink.

Scene grammar (functions figureScene / objectCloseup, here FIG_DRAW /
OBJ_DRAW over a shared panel-local coordinate system):

- Figure scenes (pool of 8, 6 distinct per grid): phoneCall (figure
  with phone at ear), twoAtTable (two seated figures, cup on table),
  clasp (close-up of clasped hands), forkPause (partial figure, hand
  holding a fork paused over a plate), coffeeChat (figure holding a
  cup with both hands), standingPair (two standing figures),
  readingPaper (figure behind a newspaper of gray column blocks),
  typingDesk (seated figure at a desk with laptop).
- Object close-ups (pool of 6, 3 distinct per grid): shoe (ballet
  flat), phone (smartphone), fork (fork beside a plate), cup (coffee
  cup on saucer), watch (wristwatch), keys (key ring, two keys). The
  first object pick always comes from the core four (shoe, phone,
  fork, cup), so at least one canonical close-up is always present.
- Layout: 3 of the 9 positions are object panels, 6 are figure
  panels, chosen by the seed. The gray figure is chosen among
  full-figure panels only (never the clasp or fork-pause close-ups).
- Balloons: figure panels only, each with a seeded chance; the
  punctuation is fixed by reading position via the curve table
  [..., ..., ..., ?, ?, ?, !, !, ...]. Post-pass guarantees the arc
  reads: if no "...", "?" or "!" landed, one is forced onto a figure
  panel in its zone; a figure in the last panel always closes with
  "...".

Interaction: tap (pointerdown / mousedown / touchstart) increments
the seed (mulberry32, BASE_SEED 538065 + tapCount * 7919), builds a
fresh story, and replays a quick flat wipe — each panel's scene is
revealed left-to-right through a clip, staggered 55 ms per panel,
320 ms per panel. No drag, no reload. The only word on the page is
the small "tap" hint in the corner.

Determinism: frame one is a synchronous draw(0) with the wipe long
finished (wipeStart = -10), never derived from Date.now(). The rAF
loop is typeof-guarded and anchored to its first timestamp; the QA
renderer has no rAF, so it captures exactly that first frame.

Punctuation rendering call: balloon punctuation ("...", "?", "!") is
drawn with canvas fillText in a bold rounded sans stack, as the brief
allows, rather than as hand-drawn glyph paths. The hint word "tap"
uses the same text path. No other text exists anywhere in the piece.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas shim,
no rAF / AudioContext / createElement / offscreen canvas).

- qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720
  rendered from the actual script.
- Determinism gate: thumb.png rendered twice, cmp byte-compared —
  byte-identical. Second render deleted.
- Grep audit: zero gradient calls, zero URLs, no audio/mic APIs.
- Fix pass 1: the first build passed panel-local sizes straight into
  stage-unit helpers, blowing every element up ~3.3x (giant heads,
  giant watch). Rebuilt the panel layer so a per-panel local context
  converts positions and sizes to stage units before touching ctx;
  re-rendered and re-passed the byte-compare.
- Fix pass 2: balloon punctuation could be assigned to the two
  close-up figure scenes that did not draw balloons, silently
  dropping the "!" beat; both scenes (clasp, forkPause) now draw
  balloons, and the closing "..." is guaranteed. The clasp panel was
  redrawn twice (horizontal ellipses read as eyes; then oversized
  cuff blobs) and settled as two tall leaning hand ellipses with
  finger arcs and crossed thumbs. The fork-pause arm now enters from
  the panel corner with a slim cuff band instead of floating mid-air.
- Final read-back, desktop + thumb: 3x3 deadpan panels; 6 figure
  scenes (twoAtTable, standingPair, typingDesk, forkPause, clasp,
  coffeeChat) + 3 object close-ups (cup, watch, fork) in the initial
  grid; exactly one gray figure (standingPair, left); balloons read
  "..." -> "?" -> "!" -> "..." across the grid; zero real words
  besides the "tap" hint. Mobile: whole square letterboxed on the
  pink ground, nothing clipped, all panels legible.

## Deviations

- Object pool extended with watch and keys beyond the prompt's four
  named close-ups (shoe, phone, fork, cup) so reseeds stay varied;
  the core-four guarantee keeps every grid anchored in the named set.
  Reason: 3 picks from only 4 kinds would repeat the same trio on
  most taps.
- Panel interiors are white with a pink floor band, rather than pink
  panels on pink ground, so the black gutters and symbol-faces stay
  legible; the page, margins and floor bands carry the flat pink.
- Speech-balloon tails are drawn filled with one stroked edge instead
  of fully outlined, to keep the tail from doubling the balloon's
  outline weight at small sizes. No visual difference at panel scale.
