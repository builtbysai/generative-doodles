# No.631 "Hold Your Line"

EXPANSION #76 soledad-romero, prompt block 7 "Retratos Sin Miedo" (NUNCA LLEGARAS A NADA as a courage mechanic).

## Concept

Seven abstracted figure-portraits stand in a row against a storm-gray ground while a storm of gray arrows and static streaks blows horizontally across the whole frame: the criticism. Unprotected portraits flicker and dim under the storm but are never erased. Dragging holds a soft shield of warm gold light over one portrait: the storm parts around it, that figure stands bright and still, and a faint golden thread connects it to the viewer at the bottom edge. One shield, one portrait; the choice matters. Releasing dissolves the shield and the storm returns. A double-tap is a moment of defiance: all seven stand bright for one breath while the storm keeps blowing. Archetypes only, no likenesses, no text anywhere.

The seven, in row order with their inks: the thinker (deep blue #1E4D8C, big head, hand to chin), the singer (coral #E2725B, open oval mouth), the runner (moss #6A9A5B, mid-stride), the builder (violet #7A4E8C, holding a horizontal beam), the dreamer (amber #C9862E, tilted head, closed-eye arcs), the dancer (cream #F5F1E8, one arm up, skirt triangle), the writer (rose #E87B9C, holding a pen diagonal). Ground #232323, plaques #2E2E2E, storm gray #6B6B6B at seeded strengths, shield gold #E8B93B. No other colors.

## Construction

Single self-contained index.html, canvas 2D, no external assets. Canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window; draw() pins canvas.style.width/height in px every frame. Phone detection via window.screen physical size (min dimension < 700px) with the aspect fallback h > w*1.15; on phones the row refits with smaller portraits, still seven across, and the page ground takes the piece's ground tone.

Storm: 300 particles built from mulberry32 seed 631076 lineage (positions seed 90210). Each particle has a seeded start position, lane, speed, streak length, arrow-or-streak type, gray strength, and turbulence parameters. A particle's position is a pure function of the anchored elapsed time t: x wraps on an extended track, y adds a seeded sine turbulence. Nothing accumulates frame to frame.

Density / flicker model: each portrait has an analytic local storm density, a seeded sum of three sines over t (seed 4711), clamped to [0,1]. Flicker alpha = 0.97 - 0.52 * density, so alpha ranges 0.45..0.97: portraits dim and waver under dense storm but never vanish and never fall. Frame one is the synchronous draw at t = 0 with figure alpha fixed at 0.75 (mid-flicker) and particles at their seeded starts, storm mid-blow. The rAF loop is typeof-guarded and anchored to its first timestamp (elapsed since first frame); no Date.now() anywhere.

Shield: pointer/touch/mouse handlers feed one state machine. While held, shield strength rises toward 1; on release it decays in small steps per frame, giving roughly a one-second dissolve. The shield is drawn as six layered gold alpha discs (no shadowBlur, no filters). Storm parting: a particle whose head falls inside the shield disc is not drawn; particles near the rim are pushed radially outward by a pure deflect function. Protected portrait: among portraits whose centers lie inside the disc, the one nearest the shield center (the disc radius, 15% of width, is slightly wider than the portrait spacing, so two centers can fall inside; nearest wins, exactly one is protected). A protected portrait draws at full alpha, still, and a gold bezier thread runs from its base to the bottom edge.

Double-tap (two taps within 0.35 s and 60 px, tracked on the anchored clock) sets a defiance window of 2.5 s during which all seven portraits draw at full alpha while the storm continues unimpeded.

QA hooks: the renderer's seed argument can force states for throwaway verification renders (seed containing "shield" parks a full-strength shield over the builder, index 3; "defy" forces the defiance state). These read location.search only and are inert in normal use.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas shim; no rAF, no pointer events, so frame one and forced states are what get verified).

- qa-desktop.png (1280x900): seven distinct archetype portraits in a row on plaques under dense gray storm arrows and streaks; thinker, singer (open mouth reads), runner, builder, dreamer (closed eyes), dancer, writer all identifiable; no text; nothing clipped.
- qa-mobile.png (390x844): all seven portraits across the narrow frame, smaller but distinct, storm throughout, nothing clipped.
- thumb.png (720x720): rendered twice and byte-compared with cmp: identical. Determinism re-verified after each fix round.
- Forced shield render (throwaway, seed=shield, deleted after reading): gold layered halo centered on the builder; storm streaks absent inside the disc and flowing around it; builder at full brightness; golden thread curving from the builder to the bottom edge. Two fix rounds came out of this check: (1) protection originally went to the first center found inside the disc, which lit the runner instead of the builder because the disc spans two centers; switched to nearest-center. (2) Deflecting both ends of each streak produced long diagonal chords across the disc; replaced with skip-inside plus rim deflection, which reads as a clean parting.
- Fix round on the builder: the beam originally sat at the head's top edge and swallowed it; beam raised and arms lengthened so the head reads beneath it.
- Grep-level checks: no Date.now, no Math.random, no createElement, no AudioContext, no ctx.filter, no shadowBlur, no external URLs in the piece.

## Deviations

- Singer's open mouth and dreamer's closed-eye arcs are drawn in the plaque tone (#2E2E2E) as negative marks on the ink silhouette; the strict palette fixes portrait inks and ground tones, and a negative-space mark keeps the faces inside it. No new hue introduced.
- Shield strength envelope advances per frame call rather than by wall-clock dt; the rise and the roughly one-second dissolve therefore track the display refresh. This keeps all state a function of the anchored loop with no extra clocks.
- Frame one figure alpha is a fixed 0.75 (the brief's specified mid-flicker value) rather than the flicker function's t=0 output, so the synchronous first frame matches the spec exactly; from the first animated frame onward the analytic flicker governs.
