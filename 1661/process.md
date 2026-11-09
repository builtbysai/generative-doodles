# №1661 "Calian, Species Study" — process notes

Driver: a field you can dive into, where colonies bloom, crash, and echo across it, carried on faint currents — the life cycle is the picture, and the zoom is the way in.

## Build
- EDG6 (PP908), #218 eric-de-giuli. Title "Calian, Species Study", gallery date 2006 · 07 · 30, gallery note: "Colonies bloom, compete, collapse and echo across a zoomable ecosystem. Drag to pan; scroll to dive deeper."
- Colony field on a 64x64 grid over a 1600-unit world (4096 cells). Five species: fleshy pink (235, 150, 150), rose (205, 105, 125), ochre (217, 164, 65), teal (63, 168, 160), violet-grey (143, 134, 168), on deep blue-black ground #05070f. Currents drawn as 80 faint cyan threads (alpha 0.07) traced along a closed-form flow field.
- Life cycle: growth is driven by a slow resource wave (period 150 s, spatial phase from a seeded 17x17 value-noise lattice), so different regions boom and bust at different times. Cells grow toward strength 1, spread to empty neighbours when strong and fed, get converted by a stronger neighbouring species, and decay when their region busts. A mature colony that dies echoes: it seeds a new colony of the same species at least 12 cells away. Spores ride the current field and seed new ground far from home.
- Each occupied cell is drawn as a jittered, overlapping disc with a soft halo and a darker core when mature, plus three short growth filaments when strength passes 0.7. The jitter (±0.35 cell) and radius variation (0.85-1.25) break the grid so clusters read as single amorphous bodies, not dot arrays.
- Motion/interaction: drag pans the field (pointer events), wheel zooms toward the cursor, pinch zooms on touch; zoom multiplier clamped 0.5x to 8x. No reset, no reload; the world persists under the view.
- Zoom reveals structure, never just scales pixels: at 2x each occupied cell resolves into a 4x4 sub-colony of smaller discs with lightened variants; at 4x and deeper, six tiny dots per cell appear as well. Three zoom bands in all (base, sub-colony, dots).
- House rules: Visual Viewport sizing with visualViewport + window resize listeners; canvas.style.width/height pinned in px in size(); phone detection via window.screen (min dimension < 700 px) with aspect fallback; field-like composition, full-bleed on phones and desktop; fixed PHASE = 90 s first frame (the sim is pre-rolled 360 steps of 0.25 s, so frame one shows established colonies at different growth stages, never an empty field), rAF loop anchored as offset + elapsed-since-load, guarded by typeof check; seeded mulberry32 RNG (seed 16610730), no Math.random anywhere; moveTo before every arc; alphas rounded to 4 decimals inside rgba(). Reduced motion renders a still frame. Nothing changes faster than ~14 Hz by construction: the resource wave period is 150 s and the flow field drifts at 0.04-0.10 rad/s.
- Silent build, no audio (batch standing rule).

## Acceptance criteria (numbers)
- Species count 5, all alive at frame one (measured 5: pink, rose, ochre, teal, violet-grey).
- Colony count at frame one: distinct connected colonies, double digits, across all five species (measured 58: pink 18, rose 10, ochre 14, teal 5, violet-grey 11).
- Occupied cells at frame one between 15% and 35% of the grid: a living field, not a carpet and not a desert (measured 948 / 4096 = 23.1%).
- Boom/bust/echo cycle demonstrably running during the pre-roll: echoes > 0 and spores > 0 (measured echoes 13, spores 29, from 30 initial seeds).
- Zoom levels: 3 bands with new structure at each (measured 3; verified visually at 4x and 8x).
- Determinism: two fresh loads give an identical grid signature (measured 2787987 both loads).
- Thumb rendered twice at 720x720: byte-identical md5.
- No em dashes, no AI-signature copy, no click-to-reload, no reset.

## What was probed / measured
- Probe harness (/tmp/probe-1661.js, node-canvas, same shim as render-piece.js): speciesAlive 5; occupied 948/4096 (0.231); colonies 58 (per-species 18/10/14/5/11); stats seeds 30, echoes 13, spores 29, simT 90; gridSignature 2787987 identical across two fresh loads; zoom probe to 2x then 8x draws cleanly, signature unchanged after zoomed draws; listeners registered: pointerdown/move/up/cancel, wheel, visualViewport resize, window resize.
- Tuning history: first pre-roll came out nearly empty (67 cells, 2 species extinct) because busts outlasted regrowth; growth, spread, and spore rates were raised and the resource amplitude narrowed (0.35) until occupancy reached 23%. A real bug was caught in the same round: the echo test read the dying cell's strength at the moment of death, after gradual decay, so it could never fire; a per-cell mature flag now records whether the cell ever passed strength 0.6, and echoes went from 0 to 13.
- Gate renders (render-piece.js): desktop 1280x900, mobile 390x844, thumb 720x720 twice. Thumb md5 b883169c5b3d08a4d675e2b9a3ba26d7 both runs, byte-identical. index.html md5 31d8ea17788ca1c22733323fda7e7ab2.
- All three renders visually inspected: desktop shows distinct colonies in all five species at different stages, small echo colonies far from their parents, and faint cyan current threads; mobile full-bleed with the same field and legible plates; thumb reads the same field at small size. Zoom renders at 4x and 8x inspected separately: 4x resolves sub-colonies inside each cell with filaments; 8x into the ochre colony shows the 4x4 sub-discs, darker cores, and tiny dots, new structure at depth, not scaled pixels. Title plate "Calian, Species Study / 2006 · 07 · 30" and hint plate "Drag to pan. Scroll to zoom." legible in all three.

## Deviations
- Scope: the world is a finite 1600-unit field and panning is clamped to its edges (220-unit margin), so "infinite scope" is approximated by depth (8x zoom with new structure at each band) rather than unbounded panning. The zoom promise itself is kept in full: deeper zoom reveals finer procedural structure from the same field.
- No double-tap zoom step: wheel on desktop and two-finger pinch on touch cover the spec's zoom interaction; a tap does nothing, so there is no tap-to-reseed or reload path.
