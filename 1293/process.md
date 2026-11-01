# №1293 "Kabir's Cloth" (swapnaa-tamhane ST6, PP460)

## Prompt
A handmade khadi-paper ground (fibrous, deckled edges) on which layer upon layer
of abstract woven marks accumulate: horizontal weaving lines overlaid with
drifting calligraphic scrawls that suggest script without being legible, each
layer in a slightly different hand and shade; a recycled-plastic glint crosses
one corner. Grounded in Tamhane's *Kabir Was Both Kori and Julaha* (2020, woven
by Premji Bhai, Bhuj) and her Kabir-as-method: the weaver-saint whose songs
accrued authorship over centuries, drawing as marks by many hands.

## Palette (verbatim)
Khadi ground #E9E2D0; fibre fleck #CFC3A6; first hand (ink) #2A2620; second
hand (indigo) #2E4A6B; third hand (madder) #8E3B2A; plastic glint #B8C4CC; edge
shadow #B0A68E. Page ground is a darker warm brown (#2E2820) so the deckled
paper edge reads on all sides.

## Composition
Square paper panel, centered, deckled edge on all sides (seeded jitter polygon),
soft offset shadow beneath. Fourteen horizontal weave lines with slight sag.
Three hands of scrawls: 6 ink, 7 indigo, 8 madder paths, each a seeded
random walk flowing diagonally, smoothed so it reads as calligraphy, never
forming real words or letters. One small plastic glint shard in the top-left
corner, well under 5% of the frame.

## Motion (watch-only, 28 s loop, all closed-form over piece time)
- 0–5.5 s: a shuttle line weaves left to right, laying down the horizontal
  lines one at a time (each line reveals left to right with a staggered start).
- 5.5–11 s: first hand (ink) draws its scrawls in sequence, tighter and slower.
- 11–15.5 s: second hand (indigo), faster and looser.
- 15.5–19.5 s: third hand (madder), fastest and loosest; the plastic glint
  fades in during this phase.
- 19.5–23 s: hold, cloth feels full.
- 23–28 s: the loop sheds back to bare paper (uniform layer fade), then
  reseeds with different scrawl paths.

## Determinism
Frame one draws synchronously at exactly t = 0 via a boot flag: bare khadi
paper with deckled edge, fibre flecks, and faint wash blobs; no weave, no
scrawls, no glint yet. The performance.now() clock starts only with the rAF
loop. Loop reseeds use a seeded mulberry32 PRNG (seed 1293000 + loop x 7919),
never Math.random, so repeated loads produce the same pattern sequence.

## House adaptations
Visual Viewport sizing with resize listeners on visualViewport and window;
canvas pinned in draw() via style width/height in px; phone detection via
window.screen physical size (min dimension < 700 px) with aspect fallback;
square paper kept whole on phones with the page ground in the piece's own dark
background color. No gradients, no shadowBlur, no filters, no offscreen
canvas, no createElement, no audio, no microphone. Dots drawn as paired arcs
with moveTo before every batched arc. No visible text except <title>. No
legible text or letterforms anywhere: scrawls suggest writing without being
writing. rAF loop is a plain function declaration armed from the real
scheduler only (the №1278 lesson: a named function expression followed by
requestAnimationFrame(loop) throws in a real browser and is invisible to the
QA renderer, which defines no rAF).

## QA
Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop,
390x844 mobile, 720x720 thumb; all three inspected. Frame one: bare khadi
paper, deckled edge, faint wash blobs, fibre flecks. Forced-time probes (temp
copies, discarded): t = 12 shows hand 1 complete and hand 2 beginning;
t = 21 shows the full cloth, all three hands layered, glint top-left;
t = 26 shows layers faded to 40% in the shed phase. Thumb rendered three
times at 720x720, cmp byte-identical, matching the shipped thumb.

## Fix rounds
1. First scrawl pass read as sharp zigzags, not drifting calligraphy:
   turn rate cut from 0.9 to 0.55 x looseness per step and two passes of
   neighbor-averaging smoothing applied to every path.
2. Fibre flecks were nearly invisible at thumb scale: dash length raised to
   max(2 px, 1% of paper size) and alpha raised.

## Files
- index.html (md5 0f1d2b525024f829dc8a850eb1d8cd9c)
- thumb.png (720x720, md5 1734be61306c9f239201f72413a2001c)
- qa-desktop.png (1280x900), qa-mobile.png (390x844)
