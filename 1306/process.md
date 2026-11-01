# №1306 "Orbit Composite" — process notes

## Source
Kristan Horton, KH3 (PP473), from the karen-kraven chain's next study.
Grounded in Horton's *Orbits* (2009): a mound of studio detritus shot from
many circled perspectives and digitally layered, abstraction until a
trapdoor (a cast-off vinyl record) yanks it back to reality.

## Frame one
A slate field holding a centered, densely layered mound of translucent
detritus shapes in crimson, burnt orange, ochre, bone, and teal shadow:
record discs with grooves, plates, tool bars, doorknobs, plain paper slips,
and shard polygons, all flat alpha shapes, no gradients. A large dark
record with bone groove rings sits hazily at the bottom center of the
pile, partially overlapped by mound items, with a faint groove outline
over the pile bottom. Twelve small perspective thumbnails arc down the
left edge; the first is highlighted with a bone border. No visible text
except `<title>`. Watch-only: no interaction, no hint text.

## Motion (watch-only, 72 s loop, closed-form over piece time)
- 0-60 s: the composite crossfades through 12 circled perspectives, 5 s
  each. Each view is a rotation of the same seeded debris set (30 degrees
  per view); adjacent views blend with a smoothstep crossfade.
- 60-66 s: resolve beat. One seeded view (drawn from the loop's PRNG
  stream) renders crisp: zero jitter, higher alpha, the record trapdoor
  more visible, its thumbnail highlighted.
- 66-72 s: dissolve back into layered abstraction (jitter and alpha ease
  back), then the loop reseeds and restarts.
- Layer cap: 9 layers, per the prompt's mush warning. No recognizable
  branded objects; paper slips are plain. No photorealism, no gradients.

## Determinism
Frame one draws synchronously at exactly t = 0 via a boot flag; the
performance clock starts only with the rAF loop. All loop layouts, the
resolve view, and the grain flecks come from a seeded mulberry32 PRNG
(seed 1306000 + loop x 7919), never Math.random. The rAF loop is a plain
function declaration behind a typeof guard.

## House rules applied
Visual Viewport sizing with resize listeners on visualViewport and
window; canvas pinned in draw() via style width/height in px; phone
detection via window.screen physical size (min dimension < 700 px) with
aspect h > w x 1.15 as fallback. Portrait panel centered on desktop with
the page ground in the piece's own slate; full-bleed on phones. All
layers drawn directly on the main canvas (the QA renderer has no
offscreen canvas); no ctx.filter, no shadowBlur, no gradients; dots drawn
as paired arcs with a moveTo before every batched arc.

## Verification
Rendered at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three
read correctly (mound centered, record at bottom center, thumbnails
along the left edge, first thumbnail highlighted). Thumb rendered three
times, cmp byte-identical. A forced-time probe at t = 62 (resolve beat)
differs from frame one in 124,317 of 518,400 pixels, confirming the
resolve path runs and changes the frame. Token scan clean of Math.random,
createElement, AudioContext, getUserMedia, gradients, shadowBlur, and
filters.

## Fix rounds
None required. First renders at all three sizes read correctly and the
resolve probe passed on the first build.
