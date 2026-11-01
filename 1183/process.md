# №1183 — Asemic Score

Jason Soliday study block SD8 (PP342), after "Asemic Translation Poem No.001"
(Oct 2026): asemic writing as a score, the scan as the performance.

## The page

A sheet of paper (#F2EDE3) on a dark desk holds six staves of generated,
meaningless glyphs — no letters anywhere, on the page or in the chrome; even
the header is a row of larger decorative glyphs and the page number is a row
of dots. Each glyph is 1–3 primitives composed in its cell — arc, dot,
vertical with serif ticks, spiral, cross — chosen by hash from
(master seed, page, staff, index). Staff counts run 12–20 glyphs.

## The performance

A teal scan line (#2E7D7B, 60% alpha) descends the page at a steady rate:
one staff per 8 s, 48 s per page. As it crosses a staff, the glyphs fire
left to right across most of the staff's window
(fire time = page start + staff × 8 s + x-fraction × 6 s, closed form).
A fired glyph stays lit (#C33E3E, heavier stroke) for the rest of the page
and launches one event shaped by its primary primitive:

- arc → expanding arc
- dot → pulse (ring + shrinking core)
- vertical → falling line
- spiral → expanding double ring
- cross → scatter of four ticks

Events live 2.2 s, colored from {#2E7D7B, #C33E3E, #E8A93D} by glyph hash,
alpha fading in five steps. Tapping a glyph fires it early — reading ahead,
the one allowed interference; the scan itself never pauses. At the bottom
the page wipes (a 0.4 s sweep) and a fresh page generates from the next page
index: the score is never the same twice.

## Determinism and house rules

First frame is synchronous at fixed phase T0 = 21 s: page 0, scan line
inside the third staff, the two staves above fully lit red, the third
partially lit with events in flight. The rAF loop is typeof-guarded and
anchored at T0 + elapsed; all randomness is seeded integer hashes.
Canvas size comes from the Visual Viewport API with resize listeners on
visualViewport and window; the CSS size is pinned in draw(). Phone
detection via window.screen (min dimension < 700 px) with the aspect
fallback. No gradients, no ctx.filter, no shadowBlur, no createElement,
no ImageData, no offscreen canvas, no audio, no microphone. Silent.
Arcs are drawn as standalone paths with a moveTo before each, per the
node-canvas batched-subpath lesson.
