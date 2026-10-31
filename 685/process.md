# No.685 — Thaki

EXPANSION #83 lachimuchina, prompt block 5 "Thaki" (Thaki, Vilca, Tara: caravan routes inscribed on the land as memory).

## Concept

A dark land field at night, full-bleed. Across it, pale caravan routes slowly inscribe themselves: each enters from one edge, wanders with the switchback zigzag of a mountain traverse, and exits at another edge. Finished routes cool from bright new-path cream down to a dim ghost tone and stay underneath as dozens of older paths accumulate into a palimpsest. Small ember rings, pacarinas (places of origin, stopping points), appear where caravans rested and are never cleared within the cycle. The base state is watch-only. Dragging inscribes a temporary route of your own in the breath-shimmer tone; it joins the memory and fades away over about a minute. No map UI, no compass, no labels, no text anywhere: memory traces, not navigation.

Palette (strict): land night #131A17, new path #E8D9A8, old path ghost #5A5A48, pacarina marker #C9683A, breath shimmer #7FA8A0.

## Construction

Single self-contained index.html, canvas 2D, no external assets, no audio.

- Seeded world (mulberry32, seed 685001). At load, 44 routes are precomputed as normalized polylines with cumulative arc lengths, a birth time and a draw duration (17 to 30 s) on a 240 s loop clock, plus 0 to 2 pacarina positions each. Eighty seeded land blotches (tonal shades of the land tone at very low alpha) give the field its quiet variation.
- Route generation. Each route walks from a point on one edge to a point on a different edge. The heading persists (caravan momentum, turn clamped per step), steers toward the exit, and a switchback phase repeatedly flips a perpendicular bias so the path zigzags like a mountain path rather than beelining; small seeded noise keeps it off any GPS straightness. One Chaikin pass (0.25 corner cut) softens corners without straightening the switchbacks.
- Renderer adaptation (deviation from the prompt's technical note, required by this environment). The prompt suggested a fading offscreen accumulation layer; the QA renderer here has no offscreen canvas, and the house determinism gate forbids frame history anyway. The palimpsest is therefore data, not pixels: every frame redraws all routes from the seeded set, with each route's revealed fraction and alpha computed purely from its age on the loop clock. A route draws in the new-path tone (revealed trail at 0.5 alpha, the leading 7 percent of arc at 0.95), cools in the same tone for 26 s after completion, then sits in the ghost tone, alpha easing from 0.30 to 0.12 until the loop wraps and the cycle repeats identically. Because births are spread across the whole loop, frame one at t = 0 is already a developed palimpsest: most routes are ghosts, a few are cooling, and two or three are part-drawn stubs entering from the edges. Live routes at any moment stay well under the prompt's ceiling of about 12.
- Pacarinas. A marker appears once the inscription's progress passes its arc-length fraction and remains for the rest of the cycle at fixed alpha: an ember ring with a filled center dot. Markers were thinned during QA (0 to 2 per route, smaller radius, lower alpha) so they read as occasional stopping points rather than a scatter.
- Visitor route. Pointer drag samples points at least 6 px apart on the anchored elapsed clock; the path draws in breath shimmer at 0.85 alpha while dragging, then fades linearly over 60 s after release and is discarded. No click-to-reload anywhere.
- House rules. Canvas size from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style width/height pinned in px inside draw(); phone detection via window.screen physical size (min dimension < 700 px) with aspect h > w * 1.15 as fallback only; the field is full-bleed at every size and the page ground is the land tone. Determinism: frame one is the synchronous draw at loop t = 0; nothing derives from Date.now(); the animation clock is anchored elapsed time and route progress is a pure function of loop phase; requestAnimationFrame is typeof-guarded (the headless QA renderer has none, so QA frames are the synchronous t = 0 draw). A QA hook (?seed=tNN) pins elapsed time for phase inspection, following the batch convention.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and cmp byte-compared identical, before and after the marker tuning pass; second renders deleted.
- Frame one read back at all three sizes: dark land with subtle tonal blotches; several bright routes wandering edge to edge with visible switchback character, two or three part-drawn stubs at the edges; dozens of faint ghost routes beneath; occasional ember pacarina rings; no text, nothing clipped. Mobile is full-bleed and complete.
- Phase check: a forced render at t = 120 (via the ?seed=t120 hook, scratch file in /tmp, deleted after inspection) shows a different mix of bright, mid-draw and ghost routes, confirming the palimpsest cycles as designed over the 240 s loop.
- Tuning pass: pacarina density and prominence reduced after the first read-back (markers on nearly every route at full size read as a target scatter); all renders redone and the byte-compare re-run.
