# No.512 Overlapping Runners

EXPANSION #61 alice-piaggio, prompt AP8. Study reference: Alice Piaggio's Visa FIFA World Cup 2026 campaign bodies, each figure redrawn in overlapping transparent color layers.

## Concept

Two rubbery runners stride down a giant brand-blue diagonal slash on a white ground. Neither body is drawn once: every limb, the torso and the head are painted four times, once in each wash color (yellow, pink, cyan, red) at globalAlpha 0.35, each pass nudged a few units and hue-shifted, so the figures read as translucent layers sliding over each other, the way her campaign figures are the same body redrawn with hue-shifted passes. The bigger runner is exactly twice the smaller one's height, and both are placed along the slash so their limbs ride on and across it. Watch-only: the wash hues cycle slowly, the runners bob along the slash, and the big runner's trailing leg kicks on a roughly 3-second cycle. Double-tap reseeds the scene (runner count 1-3, slash angle, wash hue set). No text, no logos, no brand marks anywhere.

## Construction

- Single self-contained index.html, 2D canvas, no external assets. Composition built in a 1600x1000 design stage (16:10) fitted whole into the viewport, so the landscape shape survives portrait phones; page ground is the piece's own white.
- Canvas size comes from the Visual Viewport API with resize listeners on visualViewport and window; draw() pins canvas.style.width/height in px every frame. Phone detection per house rule (window.screen min dimension < 700px, aspect fallback) is computed, though the stage fit makes the composition identical at phone size.
- Slash: one rotated flat rect, #1A2FB0, thickness 0.22 x stage width (the brief's ~25% band), long enough to bleed off both corners, running top-left to bottom-right.
- Runner: parametric joint pose in a local frame (origin at hip, +x the running direction). Limbs and torso are round-capped thick strokes (capsules), head a filled circle. One iteration during QA folded the trailing shin further (foot tucked toward the body) and slimmed the torso so the stride reads elastic instead of stiff.
- Washes: pass p uses BASE_WASH[p] hue-shifted by baseHue + cycle + p*12 - 18 degrees, drawn at globalAlpha 0.35 with a small per-pass offset (4 + 3p units along per-pass directions), so the layered offsets fringe visibly at the silhouette edges.
- Motion: hue cycle is a 26 s sine of +/-16 degrees shared by all passes; bob is a 2.2 s sine moving each runner +/-4% of its height along the slash axis, with a matching +/-0.02 rad pitch; the kick is pow(max(0, sin(2 pi t / 3)), 3) rotating the big runner's trailing shin. All phases derive from one loop clock anchored as PHASE0 + elapsed, so the loop is seamless.
- Seeding: mulberry32. The shipped first frame is a fixed seed (512008) with the runner count forced to the specced two; double-tap steps the seed with an LCG and reseeds count (1-3), slash angle jitter, and the wash hue set, per the brief's reseed rules. A ?seed= query override exists for the QA renderer.

## Deviations

- Filter adaptation (per the build brief): the brief's hue-rotate filter shifts are NOT used, because ctx.filter is unavailable in the QA renderer. Instead a small HSL helper (hexToHsl / hslToHex / shiftHue) precomputes hue-shifted variants of the four wash hex values in plain JS, and the slow hue cycle just re-derives the four pass colors per frame from the loop phase. Same visual mechanism, no filter dependency, and frame one is computed from constants only.
- Slash thickness is 22% of stage width rather than a literal 25%: at 25% the band swallows the smaller runner whole; at 22% the small runner still straddles the band's lower edge with its lead leg, keeping limbs visibly overlapping the slash as specced.
- No hint text: the piece is watch-only and the brief forbids text, so the double-tap reseed ships without an on-canvas cue.

## QA log

- Renderer: node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: first frame is the synchronous draw at constant PHASE0 = 2.35 s (fixed hue-cycle, bob and kick phases; kick evaluates to rest pose there). No Date.now anywhere; elapsed time comes only from the rAF timestamp, rAF typeof-guarded. thumb.png rendered twice and cmp byte-compared: identical, verified after the final fix pass; the duplicate render was deleted.
- Desktop read-back: thick blue slash corner to corner; two elastic runners mid-stride along it, the big one upper-left with head and trailing leg over the band's top edge, the small one (half height) lower-right straddling the bottom edge; four wash layers fringe in cyan/pink at the silhouettes; no text or logos.
- Thumb read-back: same read at gallery size; layering still visible.
- Mobile read-back: 16:10 stage letterboxed centered on white, both runners fully in frame on the slash, nothing clipped.
- Fix pass during QA: folded the trailing shin, slimmed torso/limb widths slightly, and raised per-pass offsets (4 + 3p) so the transparency layering reads at all sizes; all renders regenerated and the determinism gate re-passed.
