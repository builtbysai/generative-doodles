# №1270 — Nagging Ribbons (sdk-forsale SF7, PP429)

## Prompt
Korean commemorative ribbons cascade from the top of the frame, white, red,
and blue, each lettered in gold with a loving nag in English and romanized
Korean. They flutter; a ticker along the bottom scrolls Seoul LED bus-board
etiquette messages. Tap a ribbon to accept it: it folds itself into a
name-tag. Drag a ribbon to stretch it; release folds it back. Grounded in
Sammy Seung-min Lee's *Nagging* (2025) and *Accolade* (2025).

## Frame one (fixed phase t = 0)
Ten ribbons on desktop (six on phones) hang at varied lengths from gold
rosettes across the top of a dark ground (#1E1B16), each lettered vertically
in gold with one nag and its romanized Korean. The ticker band runs along
the bottom with the first etiquette message. No name-tags yet; the corner
cluster fills only as ribbons are accepted.

## Mechanics (all closed-form over piece time and recorded events)
- Flutter: each ribbon is a 7-segment strip; segment offsets are sine wind
  growing toward the tail, plus a small whole-ribbon sway. No frame-integrated
  state anywhere.
- Tap a ribbon (pointer down/up within 10 px): the ribbon folds toward its
  rosette over 0.8 s, then a name-tag appears in the bottom-right corner
  cluster. A fresh ribbon respawns in the freed slot 2 s later.
- Drag a ribbon: the strip stretches with the drag (0.9 px per px dragged);
  on release the stretch decays as exp(-dt/0.45) and the ribbon folds back
  to rest, settling after 2.5 s.
- Ticker: the eight etiquette messages joined with separators scroll left at
  26 px/s, wrapping closed-form.

## House adaptations
- Typed names: the prompt's "variant of your typed name" becomes a
  GENERATOR-written retranslated name. Each accepted tag takes the next name
  from a small bank (Sammy, Seungmin, Lee, Esther, Mama, Suchitra) through
  the piece's own syllable-map transform (sam -> saem, my -> mi, lee -> i,
  es -> e-seu, ther -> teo, and so on), so tags read "Saem-mi", "E-seu-teo",
  and the like. A canvas piece takes no typed input.
- No audio anywhere; the piece is silent.
- Nag phrases: exactly 12, plain and specific, loving and wry, never cruel.
  The initial set shows distinct nags (stepped assignment); respawned
  ribbons may repeat one.

## Palette
Background #1E1B16; ribbon white #F2EFE4, red #C0392B, blue #2E5FA3;
gold lettering #C9A24B; tag ground #EFE8D2, sumi ink #26241F.

## QA
- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, 720x720
  thumb; all three inspected.
- Fix rounds: (1) the first mobile pass overlapped ten ribbons across
  390 px, so phones now hang six ribbons with widths capped to their slot;
  (2) the first pass repeated nags across slots, so the initial set now
  assigns distinct nags; (3) the first V-notch tails were drawn in ribbon
  color and invisible, so the notch is now cut from the ground color;
  (4) a misapplied edit briefly skipped folding ribbons in the draw loop,
  which would have frozen the accept fold; caught on re-read and fixed
  before final render.
- Thumb rendered twice at 720x720 and byte-compared with cmp.
- Token scan clean of unseeded randomness, element creation, offscreen
  canvas, gradients, filters, shadowBlur, and audio/mic APIs; rAF only
  behind a typeof guard, with one synchronous frame drawn at load.
