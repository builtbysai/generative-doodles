# No.605 — The Smudge

EXPANSION #73 paz-tamburrini, prompt block 5 "Gofrado Vivo".

## Concept

A macro study of Tamburrini's embossing (gofrado). The frame is an extreme close-up of beige fibrous paper, full-bleed with no margins. A field of small raised organic reliefs (teardrops, soft circles, leaf-forms) is pressed into the sheet; head-on they would be nearly invisible, so the piece is lit by a slow raking light that orbits once every ~40 seconds, and the reliefs surface and sink as the light passes. At the composition's heart sits one faint red smudge, the single color event, with a few satellite flecks. Meditative, almost still. Double-tapping the paper reseeds the relief field (a new arrangement of the same forms) with a brief "paper settles" fade; the smudge never moves. Single taps and drags do nothing: no zoom, no pan.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio, no microphone.
- Palette, strict and complete: paper beige `#E8DFD2` (ground and facet highlight), fiber `#D6CBB8` (mid tone), warm shadow `#8A7E6E` (shade and hint), red `#A63A2E` (smudge only).
- Relief field: seeded scatter (mulberry32) of ~120 forms in normalized coordinates, with radial acceptance falloff so density thins toward the edges, and a small exclusion zone around the smudge. Each form's outline is generated from one of three shape grammars (teardrop, blob, leaf) and precomputed into facet wedges (centroid plus consecutive outline pairs) with outward normals. Per frame, each wedge is shaded by the dot of its normal against the current light vector, lerping fiber toward shadow on the dark side and toward beige on the lit side; a soft contact ellipse is cast under each form away from the light. Adjacent wedges share near-identical normals, so the shading steps read as a soft relief rather than a crystalline fan.
- Paper fiber: 900 precomputed seeded fine strokes/speckles drawn directly each frame (no offscreen canvas, no `ctx.filter`, no blur anywhere; the smudge's soft edge is four layered translucent irregular polygons plus flecks).
- The smudge is generated from its own fixed seed, independent of the field seed, at a fixed normalized position (0.5, 0.48); reseeds rebuild only the relief field, so the anchor never moves.
- Motion: light angle = fixed offset + elapsed since load, one orbit per 40 s. Time is snapped to 100 ms steps inside `draw()`, which keeps the synchronous first frame byte-reproducible regardless of load-timing jitter and gives the drift a fine stopmotion grain, in keeping with the artist's stepped motion grammar.
- Interaction: `pointerdown` pairs within 350 ms and 60 px count as a double-tap and reseed (seed = fixed base 605073 + reseed count, so the whole session is reproducible); the new field fades in over 1.4 s. Everything else is watch-only.
- House rules: canvas sized from the Visual Viewport API with resize listeners on both `visualViewport` and `window`; canvas CSS size pinned in px inside `draw()` every frame; phone detection via `window.screen` (min dimension < 700 px) with aspect fallback; the field uses cover-fit scaling so the macro stays full-bleed on phones; rAF is `typeof`-guarded and the first frame is drawn synchronously at a constant phase (elapsed 0, fixed raking angle from the upper left). No `Date.now` anywhere (grep-verified: 0 matches).

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb rendered three times and `cmp` byte-compared: identical. Note: an early version without the 100 ms time snap produced a 319-pixel, 1-level difference between two renders in one corner (load-timing jitter flipping a facet's rounded shade); the time snap fixed it and the gate was re-run and passed three times.
- Read-backs: desktop and thumb show the relief field reading clearly under the fixed raking light, density easing toward the edges, fiber grain across the sheet, and the layered red smudge at the heart with its flecks. Mobile (390x844) is full-bleed with the smudge centered, nothing clipped, and the small "double-tap" hint legible in the corner.
- Two build iterations are recorded: an intermediate 3-broad-facet version read as shards with halo discs and was replaced by the final fine-wedge shading with softened contrast and form-matched contact shadows.

## Deviations

- Facet count: the prompt sketch described reliefs generically; each form carries many small wedges rather than 2-3 broad facets, because the broad-facet version read as broken shards at gallery sizes, while fine wedges with shared normals read as pressed paper. Same mechanism (precomputed facets shaded per frame from the light vector), different granularity.
- The "paper settles" fade after a reseed is implemented as a relief-opacity ramp (0.55 to 1 over 1.4 s) rather than a paper overlay, so the smudge stays fully visible as the anchor during the transition.
- No other deviations. No color beyond the smudge, no zoom or pan, light period ~40 s as specced.
