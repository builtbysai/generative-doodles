# №442 Mountain of Stools

## Concept
Scale-inversion dreamscape after Maité Léon's MIDNIGHT SUN, from EXPANSION #51 prompt 2 in TASKS.md. Five giant wooden stools stand on a dark rocky summit like a mountain range; the strangeness is scale alone. Two tiny human silhouettes stand between the legs of the largest stool, people as punctuation. A pale sun breathes in a green-to-gold sky while heat shimmer ripples the horizon ridge.

## Construction
- Single self-contained index.html, canvas 2D only, no external assets, no audio, no text or UI anywhere in the piece.
- Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height pinned in px on every draw; phone detection via window.screen min dimension < 700 with the aspect fallback.
- Sky: vertical gradient #BFE3B4 to #F5E7A0, sun disc #FDF3E3 with a radial glow whose radius breathes 0.9-1.1 on a 12s cycle, four translucent cloud bands drifting slowly (positions from the loop phase, wrapped).
- Rocks: three layered noise-displaced ridge polygons (seeded LCG, fixed seed) in #5A5178, #4A4460 and #3B3550 with violet wash #6B5B8E bands and facet shading. The back ridge's top edge is the horizon at 35% height and ripples with two phase-shifted sine waves as heat shimmer.
- Stools: five, heights 40-75% of canvas height, drawn as correctly proportioned furniture at enormous scale: tapered legs with a back-edge perspective offset, side and front stretchers, an extruded seat built from a gradient front band plus a lighter top face with warm edge #A0714A over wood #6B4A2E, faint grain curves on the top face. One stool (second from back) is wireframe: legs only, drawn as warm-edge outlines with a faint fill, no seat, no stretchers. Long soft shadows run right across the rocks from every stool, drawn as gradient-faded bands. The giant centre stool sways 1 degree on an 18s cycle around its feet.
- Figures: two near-black #1A1626 silhouettes, 2.8% of canvas height, standing on the front shelf between the centre stool's legs.
- Interaction: drag pans the scene with parallax, sky at 0.10, sun at 0.25, back ridge at 0.40, mid shelf at 0.65, front shelf at 1.0, eased toward the drag target and clamped. No click-to-reload, no other controls.
- Determinism: the synchronous first frame is drawn at the constant loop phase OFFSET = 3.7s; the rAF loop (typeof-guarded) is anchored as offset + elapsed-since-load. All randomness comes from the fixed-seed LCG used once at load for the ridge shapes.

## QA log
- Rendered with node ~/workspace/tools/render-piece.js at 720x720 twice: byte-identical (cmp clean), confirming the determinism gate.
- First inspection pass found two faults, both fixed and re-rendered: the figures were painted before the front rock shelf and were completely covered by it (moved after the shelf), and the wireframe stool's legs rendered as faint hairlines (stroke thickened, faint warm fill added so the outlined legs hold their volume).
- Phone check at 390x693: composition holds. The stools tower and crop at the frame edges as intended, the sun glow sits top-left, the wireframe legs read against the sky, and both tiny figures remain visible between the centre stool's legs near the bottom.
- Final thumb.png is the verified 720x720 render.
