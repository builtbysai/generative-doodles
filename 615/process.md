# No.615 — The Forest Within Me

EXPANSION #74 adolfo-serra, prompt block 7 "El Bosque Dentro de Mí". His wordless book as an endless walk: a small child on a winding path through a gnarled, near-black forest, memory fragments drifting overhead. No text anywhere; no interaction cue is shown, per the wordless rule.

## Concept

- A seeded Catmull-Rom path winds from the lower-left corner to the upper-right, kept clear as a moss-lit corridor through four depth layers of procedural gnarled trees.
- The child (cream silhouette with bark-dark outline masses, side view) walks the path forever on a 52-second arc-length loop, fading out at the top end and fading back in at the bottom. Frame one parks him at 18% along the path, mid-stride.
- Four memory fragments float in the upper half: pale cream frames with amber-tinted interiors (amber exists only inside the frames), holding a fox head, a house, a bird, and a leaf, all drawn from his motif vocabulary.
- Palette is strict: deep forest #101511, moss #5A6E4C, bark #3A3129, cream #EDE6D6, amber #D9A441 (frame interiors only). Layer tints are blends of those five.

## Construction

- Single self-contained index.html, canvas 2D only. Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas.style.width/height pinned in px inside draw() every frame. Phone detection via window.screen physical size (min dimension < 700px), aspect fallback h > w*1.15.
- Layer stack, back to front: (0) far forest, small moss-light trees, parallax depth 0.15; (1) mid-far forest, depth 0.4; then the path ribbon (moss wash, cream centre light, dashed bark edge); (2) mid-near forest, depth 0.7; the four memory fragments (they sit inside the forest's depth, so the front layer can cross them); (3) front forest, largest and darkest trees, depth 1.0; the child, drawn last so he always reads on the path; released birds above everything.
- Trees are recursive gnarled branch systems (quadratic segments with bend jitter, seeded per layer with mulberry32), generated in local coordinates and rotated around their bases for sway. Bases are sampled with an edge-bias push and rejected if they fall inside the layer's path-corridor distance, so the corridor stays clear at every depth; corridor width grows with layer scale.
- Child: procedural walker (two-segment legs, counter-swinging arms, bob) built from bark-under/cream-over stroked limbs; position and heading come from an arc-length lookup on the path, so he never leaves it. Walk phase is anchored so t=0 is mid-stride.
- Interaction: vertical drag dollies the four forest layers (per-layer translate + slight scale by depth) while path, fragments, and child stay anchored; on release the dolly eases back to rest. Tap a fragment: it brightens for a beat and releases a tiny cream bird that flutters up and off the top of the frame; the fragment stays. No click-to-reload anywhere.
- Determinism: frame one is drawn synchronously at load with t=0 (fixed path progress 0.18, phase 0). The rAF loop is typeof-guarded and anchored to elapsed time since load; frame one is never derived from Date.now(). All randomness is mulberry32 from fixed seed 615074; the whole scene is rebuilt from the seed on resize. No AudioContext, no offscreen canvas, no ctx.filter, no document.createElement calls (the canvas is in the static HTML).

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). thumb.png rendered twice and cmp byte-compared: identical; second render deleted.
- First pass failed read-back: an edge-bias sign bug (cx * sign(cx) = |cx|) pushed every tree to the right and downward, leaving the left half empty and massing the forest bottom-right. Fixed to sign(cx) * pow(|cx|, 0.55); forest now frames all four edges at every size.
- Child readability: front-layer crowns could cover the child where they lean over the corridor (visible on the mobile render as a dark smudge over him). The child is now drawn after the front layer; he reads cream and on-path in all three sizes. Recorded as a deliberate deviation from strict depth order in favour of the prompt's hard rule that the child is always on and readable on the path.
- Fragment depth: fragments were first drawn under layers 2 and 3, and the fox frame was heavily obscured at thumb size. They now sit between layers 2 and 3, so only an occasional front branch crosses a frame, which reads as depth.
- Final read-back: desktop and thumb show the path winding corner to corner with the child mid-stride at 18%, the four fragments (fox, house, bird, leaf) floating in the upper half with amber interiors, gnarled bare trees and fern undergrowth framing the edges, nothing clipped. Mobile keeps the full winding path, the child on it, all four fragments legible, forest filling the tall frame.
- Deviations: (1) child drawn above the front layer, reason above; (2) the walk loop uses a subtle fade-restart at the path ends rather than a scrolling path, as briefed; (3) canopy tufts on far-layer trees are soft dark discs, kept small and sparse so the forest reads gnarled rather than cute. No other deviations.
