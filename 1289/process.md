# №1289 "Mirror-Drawing" (swapnaa-tamhane ST2, PP456)

## Prompt

A near-black indigo field with a loose spiral of 12-20 small mirror shards,
each catching a warm pinpoint of light; the spiral reads as a drawn line that
only exists where light hits. Grounded in Tamhane's mirror-on-achadiya works
(2020-2023) and Kutch lippankam mud-mirror craft: she "draws" with mirrors on
the cloth.

Palette: night indigo #101E33, deep cloth #182B47, mirror face #DCE4EC,
mirror edge #8FA0B5, light pinpoint #F0D488, faint cloth weave #223B5C.

## Composition

Centered square field of deep cloth on a night-indigo page ground, at all
sizes. Sixteen mirror shards, 12-26 px across, irregular 5-7 vertex polygons
(never circles, never perfect squares), placed on a loose 2.2-turn spiral
with generous gaps, seeded (mulberry32, fixed seed 1289) so the layout is
identical on every load and resize. A faint weave of flat-alpha lines crosses
the field. The warm light pinpoint parks at a fixed spot clear of every shard,
so frame one carries no glint.

## Motion / interaction

Drag anywhere to move a light source. The light follows the pointer with
heavy damping (closed-form exponential easing between recorded anchors and
targets, tau 0.35 s while dragging). A mirror GLINTS, a brief white flash on
the shard plus an expanding ring, only when the carried light crosses within
shard radius + 16 px while the light is moving; glints never fire on their
own. On release the light slows and parks (tau 0.9 s easing toward a
velocity-projected park point clamped to the field), still able to glint while
settling, then rests. Watch-only otherwise. Never click-to-reload. No
auto-twinkling, no lens flare, no gradient wash, no UI marking the light.

## House adaptations

- Visual Viewport sizing with listeners on visualViewport and window;
  canvas pinned in draw() via style width/height in px.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect h > w*1.15 as fallback; the centered square keeps its shape on
  phones with the page ground in the piece's own night indigo.
- Determinism: the synchronous first frame draws at exactly t = 0 via a boot
  flag; the performance.now() clock starts only with the first rAF tick.
  All animation state is a closed-form function of recorded pointer events
  and piece time, never frame-integrated state.
- node-canvas limits respected: no requestAnimationFrame (typeof-guarded),
  no AudioContext, no document.createElement, no WebGL, no offscreen canvas,
  no ctx.filter, no shadowBlur, no gradients (halos and glows are layered
  flat-alpha circles); dots drawn as single beginPath arcs, rings as single
  stroked arcs, never batched arcs sharing a subpath.
- No visible text except <title>. Silent, no audio, no microphone use.

## QA

- Rendered with node render-piece.js at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected. Frame one at all sizes: dark indigo
  field, loose spiral of pale irregular shards, warm pinpoint parked at the
  top of the field, no glint. Mobile holds the same read, square whole.
- Thumb rendered three times plus the shipped thumb: all byte-identical.
- Mechanics verified with a node harness (fake rAF clock, pointer events
  through the piece's own handlers): two no-event renders byte-identical
  (no auto-glint, no drift); a dense grid drag sweep produced up to 290
  near-white glint pixels mid-sweep, decaying back to zero after release.
  A single diagonal sweep threaded between the generously gapped shards and
  produced no glint, which is correct behavior for the spacing.
- Token scan clean of unseeded randomness, element creation, audio/mic
  APIs, gradients, filters, shadowBlur (single hit is a comment stating no
  Math.random is used).

## Fix rounds

1. The first rAF kickoff called the loop immediately with ts = 0, which
   would have pinned T0 before the first real tick and made piece time huge.
   Rewritten to arm the loop from the real scheduler only.
2. That rewrite first used a named function expression followed by
   requestAnimationFrame(loop), which throws ReferenceError in a real
   browser (the №1278 lesson: the QA renderer defines no rAF, so renders
   pass anyway). Rewritten as a plain function declaration; renders
   unchanged after the fix.
