# No.1565 "Color Is a Verb"

- Title: Color Is a Verb
- Prompt code: TW6 / PP812, EXPANSION #206 shunsuke-takawo
- Formula date: 2006 · 04 · 25
- Interaction cue: Drag to bend a ribbon.
- Gallery note: "Thick translucent ribbons flow across white ground, their colors a function of position and time, overlapping into deeper hues. Drag to bend a ribbon."

## Felt driver

Color as something that happens, not something that is. Six thick ribbons pour in from the frame edges, tangle loosely at the center, and pour out again, each one carrying a slow rainbow that slides along its length as it flows. Where they cross, the colors do not fight; they deepen into each other, the way wet paint does. The white ground stays white and mostly empty, so the color feels loud precisely because it is outnumbered.

## Mechanism

- Each ribbon is a cubic Bezier from one frame edge to the opposite edge, its control points pulled toward a seeded knot point near the center, plus a two-sine wiggle perpendicular to the chord (amplitudes 0.02-0.05 and 0.008-0.02 of the field, frequencies 1-1.5 and 2-2.5). Six ribbons: three left to right, two top to bottom, one diagonal pair (top to right, left to bottom). All geometry is seeded by mulberry32(1565000).
- Each ribbon is sampled at 200 points. Hue at arc position u and piece time t is a closed form: base hue plus 70 degrees of sin(2pi * 0.75u + 0.22t) plus 28 degrees of sin(2pi * 1.6u - 0.15t), so colors migrate along each ribbon as time passes; the wiggle phase also drifts slowly with t (0.12t, -0.09t), so the paths undulate. Saturation 74%, lightness 57%.
- Translucency and overlap: each segment is filled opaque with its color pre-blended toward paper white (0.65 color + 0.35 white), and where a segment crosses an earlier ribbon its color is the alpha-over blend of its saturated color onto the color already on the canvas there (recursive, in draw order). This is the translucent-overlap look the prompt asks for, computed explicitly rather than with globalCompositeOperation multiply: per-segment multiply fills leave light hairline seams at every shared anti-aliased edge, and multiply of two pre-blended pastels turns crossings muddy olive-gray instead of the deeper hues the prompt wants. The explicit blend gives the same deeper-hue crossings as translucent paint and tiles seamlessly. See the fix rounds below.
- Segment quads are built from precomputed per-point normals, so neighboring quads share exact edge vertices, and each quad is extended 0.75 px along the path so shared edges overlap rather than gap.
- The lead ribbon (left to right, coral base) carries a black hairline spine along its centerline, drawn source-over after the ribbons.
- Field: square and centered on desktop (side = min(VW, VH)), full-bleed on phones (window.screen min dimension under 700 px, aspect fallback h > w * 1.15). Ground is flat #FAF7F0 everywhere; no gradients anywhere.
- Page shows only the title, the formula date, and the hint line ("Drag to bend a ribbon."), drawn on the canvas.

## Palette

- Ribbon base hues: coral 12, teal 175, gold 42, violet 270, crimson 350 (sixth ribbon repeats coral at a different phase), each swinging about 98 degrees through the spectrum as a function of position and time, on paper white #FAF7F0. One black hairline spine, rgba(20,18,16,0.85), on the lead ribbon only.

## Interaction

- Watch-only endless flow: ribbons undulate and their hues migrate on a slow loop with no input.
- Drag: pointerdown latches the ribbon nearest the touch point; while pressed, that ribbon's path bends toward the pointer through a Gaussian displacement (sigma 0.19 of field, pull 0.12 of field, capped at 0.85 of the distance to the pointer). Other ribbons do not move. On release the displacement decays exponentially with a 0.9 s time constant, so the ribbon springs back to the undisturbed flow. No click-to-reload.

## Determinism approach

- All layout randomness comes from mulberry32(1565000) at load: endpoints, knot offsets, control-point jitter, widths, hue phases, wiggle amplitudes and frequencies.
- Ribbon paths and hues are closed-form functions of piece time plus seeded state plus recorded drag samples (pointer position is the last sample at or before t; displacement factor ramps in over 0.15 s and decays exponentially after release). No frame-integrated state, no Math.random at draw time, no wall-clock phase. One synchronous frame is drawn at load from t = 0; requestAnimationFrame calls are typeof-guarded.

## QA renders inspected

- Desktop 1280x900: six bold ribbons enter from the edges, knot at center, exit opposite edges; overlaps read as deeper blended hues; lead-ribbon spine visible; square field centered on the white ground; title, date and hint legible; no clipping.
- Mobile 390x844: same six ribbons, full-bleed, no clipping; ribbon widths hit the 26 px floor.
- Thumb 720x720: final render, knot and color migration read clearly at gallery size.
- White share at 720x720: 72.3% near-paper pixels.

## Fix rounds

1. First build drew each ribbon as per-segment quads with multiply + alpha fills. A 3x crop showed fine light hairlines across every ribbon at segment joints. Rebuilt as butt-capped strokes: same hairlines. Proved by a flat-hue control render that the lines are not hue stepping but the anti-aliasing seam of adjacent fills (two half-coverage passes leave white in the boundary pixel).
2. Switched to opaque pre-blended fills (translucency baked into the color) with shared-vertex quads: seams gone, but crossings were computed as multiply of two pastels and came out as muddy olive-gray blocks with hard rectangular edges.
3. Crossings now use the explicit alpha-over blend (saturated top color over the canvas color, recursive in draw order) and 200 segments: seams gone, crossings read as deeper saturated hues, verified in a 3x crop. No further rounds.
4. Probe caught a drag bug before shipping: the nearest ribbon was recomputed from the live pointer position, so dragging the lead ribbon 70 px diagonally bent a different ribbon at the knot instead (moved 0.0 px, while pixels still changed). The session now latches the nearest ribbon at pointerdown; probe then measured 66.7 px of bend on the grabbed ribbon and 0.0 px on the others.

## Probe results (probe-1565.js, 14/14 passed)

- Frame-one determinism: two fresh 720x720 renders byte-identical (md5 1085568013a7387394aceb7012622653); a second thumb re-render matches the shipped thumb byte-identically.
- Geometry: 6 ribbons; widths 30.8-38.0 px at 720, 26.0 px floor at 390; desktop field square 900x900 centered at x=190; mobile field full-bleed 390x844.
- White share 72.3% at 720x720.
- Flow: t=0 vs t=20 pixels differ.
- Drag: nearest ribbon (lead) bends 66.7 px toward a 70 px drag at t=1.4; a non-nearest ribbon moves 0.0 px; after release the residual displacement at t=10 is 0.005 px; dragged vs undisturbed pixels differ at t=1.4.
