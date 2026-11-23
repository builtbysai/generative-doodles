# Panel Wall (No. 481)

EXPANSION #58 giuliadallara / Giulia Dall'Ara, prompt GD1.

## Concept

The O.R.I Altini 70th-anniversary facade read as a generative system: a wall of framed panels telling one commissioned story in comic-strip form, folk-modernist and flat. The canvas is a seeded grid of panels on a mustard ground. Each panel holds exactly one idea and one of four types: a narrative figure (a simplified worker/founder figure holding one object: a small sun, a box, a flag, or a disc-topped vessel), a botanical glyph (coral, veined leaves, or a sun disc), a lettering panel of bold glyph-like letterform marks drawn purely as shapes (no real words, no text rendering anywhere), or a pure pattern panel (chevrons, zigzag bands, or dot rows). Flat opaque fills and hard edges only, in mustard #E3A92C, dark teal #14453F, rust red #C33E21 and cream #F4EBD3. No gradients, no shadows.

Watch-only: panels crossfade between two seeded motif variants on a 12 second loop and pattern panels phase-shift with the loop phase. There is no interaction and no hint text.

## Construction

Single self-contained index.html, 2D canvas only, no external assets, no audio, no microphone.

- Seeded RNG: mulberry32 with fixed seed 481058 drives the panel composer. Nine panel descriptors are precomputed from one seeded stream; the first four types are a seeded shuffle of all four types, so every wall contains at least one figure, botanical, lettering and pattern panel. Each descriptor also carries a seeded ground (cream weighted most, then teal, mustard, rust) and two motif seeds, seedA and seedB.
- Grid: gutters are 3 percent of width and height in the mustard ground color, so outer margins and panel spacing are all ground. Column and row counts adapt to aspect: 4 columns by 2 rows when wider than 1.25, otherwise 3 columns by 3 rows. Flat dark teal border strips run full-bleed across the whole canvas, centred in each horizontal row gutter, and every panel is finished with a hard teal frame stroke drawn on top of its motif.
- Canvas sizing comes from the Visual Viewport API with window inner size as fallback. Resize listeners are registered on both visualViewport and window. In draw(), canvas.style.width and height are pinned in px every frame. Phone detection uses window.screen (minimum dimension under 700px), with the aspect fallback (height greater than width times 1.15) only when screen dimensions are unavailable. The wall fills the frame at every size and the page ground is the mustard.
- Each panel type is its own draw function. The botanical library is parametric: coral is branch recursion (depth 5 for the main stem, 4 for the side stems, main length min(0.32 of width, 0.23 of height)), leaves are bezier leaf shapes with a straight vein stroke, and the sun is a disc with eight ray strokes. Lettering glyphs are six shape-built marks (cross-barred post, ring with stem, caret over a bar, zigzag, stepped mark, disc and post) laid out 3 by 3 in tall panels, 2 by 3 in narrow panels, 3 by 2 in wide panels. Pattern panels are clipped to the panel rect; chevron and zigzag rows and dot rows are offset by the loop phase, so they phase-shift as the cycle runs.
- Motion and determinism: loop phase is t modulo 12 seconds divided by 12. The crossfade weight is a cosine blend sharpened with a smoothstep, so each variant dwells near full strength; at the fixed first frame the incoming variant sits at about 0.99 alpha and one motif reads cleanly per panel. The first frame is drawn synchronously at a constant t = 5 seconds, never derived from Date.now(). The animation loop is guarded by a typeof check on requestAnimationFrame and anchored as 5 plus elapsed rAF time, so a renderer without rAF stops after the deterministic first frame. The code uses no offscreen canvas, no document.createElement, no AudioContext and no fillText.

## QA log

Rendered with node ~/workspace/tools/render-piece.js at all three sizes; the renderer reported vv:resize and win:resize listeners at each size.

- qa-desktop.png (1280x900): 4 by 2 wall. Zigzag pattern, a figure holding a box, a 3 by 3 lettering panel, and a tall coral panel on the top row; dot-row pattern, coral, dot rows over a faint zigzag ground, and a lettering panel below. Full-bleed teal strip between the rows. Flat, hard-edged, nothing clipped.
- qa-mobile.png (390x844): 3 by 3 wall of tall panels. Zigzag, figure and lettering on top; coral, dot rows and coral in the middle; dot rows, lettering (2 by 3) and a figure holding a vessel at the bottom. Two full-bleed teal strips. All motifs legible, nothing clipped.
- thumb.png (720x720): 3 by 3 wall, all four panel types clearly present (zigzag and dot patterns, two figures with different held objects, two lettering panels, two coral panels), flat folk-modernist look.
- Determinism: thumb.png rendered twice and compared with cmp; byte-identical. The second render was deleted.
- Source check: no gradients, no shadowBlur, no fillText, no Date.now, no createElement and no AudioContext in index.html (grep count 0).
- Review pass during QA: the first renders showed the outgoing motif ghosting through at t = 5s (a leaf visible behind coral, smudged lettering) and sparse lettering in tall panels. Fixed by sharpening the crossfade weight with a smoothstep, making lettering grids aspect-adaptive with larger glyphs, passing loop phase (not crossfade weight) as the pattern phase-shift parameter, and scaling coral length to panel height. Re-rendered and re-read all three sizes after the fix; ghosts are gone and coral now fills its panel height.

Deviations: none from the brief. Pattern motifs are clipped at panel edges by design, as tiling patterns are.
