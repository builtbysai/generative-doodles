# No.624 — An Altar for Clarity

EXPANSION #75 mariona-cabassa / theinvisiblecircle, prompt block 8 "Summoner" (verified verbatim from TASKS.md).

## Concept

Her VISION SUMMONERS as a chargeable talisman. A symmetric eye-flower mandala floats on a dark ground, beginning dim and barely visible. Touch is the ritual: press and hold (or drag) and the charm charges slowly, its rings igniting from outer to inner until the center eye opens and faint constellation lines reach out to the frame edges. Release and it dims back to rest on its own. Nothing is instant, nothing is automatic, and there is no text or instruction anywhere on screen; the affordance is discovered.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio, no microphone.
- Mandala: seeded generator (mulberry32, fixed seed 624075) producing seven concentric elements, strictly symmetric by construction: outer rim with 48 fine ray ticks, 16 large petals (pink), a ring of 32 dots (gold), 24 petals (green), a scallop ring (pink), 12 petals (gold), an inner rim, and the center eye (gold lids, blue iris #1E4D8C, dark pupil, lashes that appear as it opens). Petals are stroked outlines with a faint fill and a center vein, in her tattoo line style.
- Palette (strict): ground #141210; color mode gold #C9A227, blossom pink #E87B9C, leaf green #6A9A5B, eye blue #1E4D8C. Ink mode re-tints the identical geometry in bone white #F0E6D2 only (iris becomes a bone ring, pupil a bone dot).
- Charge: a 0..1 value driven by the anchored elapsed clock (rAF timestamps minus a load anchor; rAF typeof-guarded). Holding raises it over ~4 s; release decays it over ~6 s. Each ring has an ignition threshold, outer lowest, so rings light outer to inner; ring alpha runs from a 0.12 rest floor to full as its threshold passes. The eye's opening is a smoothstep of charge between 0.82 and 1.0. Glow is layered translucent halo discs drawn as shapes behind the charm, growing with charge. No shadowBlur, no filters, no offscreen canvas.
- Constellations: four seeded chains (mulberry32) of star points reaching toward the left, right, top, and bottom edges, revealed as charge passes 0.5 and flaring briefly on a flash.
- Interactions: press-and-hold or drag anywhere charges. A tap on the center eye while fully charged fires a flash (constellations flare, glow surges) and adds one star-seed at a seeded frame-edge point (position from mulberry32 keyed by the seed count, so it is reproducible). A double-tap anywhere except the eye toggles color / black-ink mode; the geometry does not change, only the tint. Single taps otherwise do nothing.
- House rules: canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size pinned in px inside draw(); phone detection via window.screen physical size (min dimension < 700 px) with aspect h > w*1.15 fallback; the charm stays centered and large on phones (radius 0.415 of the min dimension vs 0.40 desktop).
- Determinism: frame one is a synchronous draw at load — rest state, color mode, charge 0, eye closed, no constellations, no star-seeds. No frame is ever derived from Date.now(); all randomness is mulberry32 with fixed seeds.

## QA log

- Renders: `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp — identical; the second render was deleted.
- Read-back: desktop and mobile both show the dim symmetric charm on the dark ground — outer pink petals, gold dots, green petals, scallops, gold inner petals, the closed eye as a thin almond line inside the inner rim. Faint but clearly present ("barely visible, not absent"), nothing clipped on mobile, the composition centered with generous dark margins.
- Fully charged state verified with a state-forced throwaway copy in /tmp (charge forced to 1, three star-seeds forced), rendered and read back, then deleted: all rings at full alpha in their colors, glow halos layered behind the charm, the eye fully open with blue iris and dark pupil, constellation lines extending to the frame edges with star points, and three small star-seeds twinkling at the left and right edges.
- Grep-level checks: no Date.now, no Math.random, no createElement, no shadowBlur, no filter, no external URLs, no visible text beyond the <title>.

## Deviations

- Star-seed persistence is session-only: star-seeds live in an in-page array and are lost on reload, rather than being stored in localStorage. The brief for this build forbids relying on localStorage (the QA renderer and some gallery contexts do not provide it reliably), and the prompt's accumulation reads naturally as within a sitting with the piece. The 40-seed cap is kept.
- QA hooks: the script reads two optional window globals (__forceCharge, __forceSeeds) solely so throwaway verification copies can force the charged state. They are inert (undefined) in the shipped file and affect nothing in normal use.
