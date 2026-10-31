# No.754 Scrim Dissolve

EXPANSION #92 robert-irwin, prompt block 3 "Scrim Dissolve" (verified verbatim from TASKS.md). After Scrim Veil - Black Rectangle - Natural Light (Whitney, 1977) and Squaring the Circle (Hirshhorn, 2016).

## Concept

A white room whose far corner has been quietly edited. The wall truly turns in a cove, but a floor-to-ceiling scrim stretched across the left portion of the room flattens the turn: behind the scrim the curve is offset, softened, out of focus, and replaced by one straight shadow, so the corner reads squared. The only other evidence is a band of light leaking past the scrim's far edge and a single tension line down the scrim's face. Both come and go on slow, mismatched rhythms across an 8-minute cycle, so the anomaly is noticeable, then gone, then noticeable again. The viewer's eventual noticing is the piece. Nothing explains the trick, nothing is revealed, there is no interaction.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets. Strict palette, nothing else is drawn: scrim #FAFAF8, room #EDEEEB, tension line #D8D9D5, curved-wall shadow #C9CAC6, light-leak #FFFDF5.
- Room: flat #EDEEEB field; the right wall and the floor each sit a whisper darker under low-alpha overlays of the curve tone; faint ceiling line at 0.055H and floor line at 0.80H in the tension tone.
- The coved corner (centered at 0.42W, off-center) is drawn as layered bands of the curve tone, never a hard line: right of the scrim it is clipped and drawn at full strength; behind the scrim it is clipped to the scrim and drawn again shifted left by a 0.007W parallax lag, spread wider, in more and fainter passes, so the world behind the scrim reads slightly out of focus. Over that, behind the scrim only, one straight quiet shadow at the scrim's inner edge stands in for the turn: the corner reads squared.
- Scrim: a translucent plane (scrim tone at alpha 0.35) from ceiling line to floor line across the left 0.36 of the frame (0.40 on phones), with seeded vertical sheen bands (mulberry32, seed 75492) of the scrim tone at low alpha and one faint warm band.
- Tension line: a 1.4px vertical thread at 0.185W in the tension tone; its alpha is a closed-form function of cycle time, two fades per 480 s cycle, phase-shifted against the leak, ranging about 0.05 to 0.22.
- Light leak: four layered warm-white bands centered on the scrim's right edge, widths scaled to the frame, alphas multiplied by a leak level that swells once per cycle (0.55 at t = 0, mid-glow; range 0.10 to 1.00).
- Motion is watch-only, an 8-minute seamless cycle; leak and tension use integer cycle ratios (1 and 2 per cycle) so the loop closes exactly. No interaction handlers of any kind.
- Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas style width and height pinned in px inside draw(); phone detection via window.screen physical size (min dimension under 700px) with the h > w*1.15 aspect fallback only.
- Determinism: frame one is the synchronous draw at cycle t = 0. All state is a closed-form function of cycle time plus the one fixed seed. No Date.now(), no Math.random(), no ctx.filter, no offscreen canvas, no gradients: the soft focus is precomputed layered strokes, as the house rules require. rAF is typeof-guarded so the QA renderer (no rAF) still produces frame one.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. The duplicate was deleted.
- Read-back, desktop: pale room filling the frame; scrim third at left with faint vertical sheen variation; a bright warm seam at the scrim's far edge; a soft gray cove band at the corner right of it; floor line and subtly darker floor below. Mobile: same structure refit, scrim widened to 0.40, nothing clipped. Thumb: same.
- Pixel samples on qa-desktop.png at y = 0.45H confirm every layer numerically: scrim field (241,242,239); tension line dip to (239,240,235) at exactly 0.185W against (241,242,239) neighbors; squared-line dip (235,234,232) at about 0.348W behind the scrim; light-leak peak (243,241,237) at 0.36W, warm channel dominant, the brightest point in the corner zone; cove minimum (209,209,206) at 0.42W; right wall (233,234,231); floor (232,233,230) below the line at 0.80H.
- Deviations: none from the prompt. Construction choices within it: the out-of-focus wall behind the scrim is built from layered low-alpha strokes rather than a blur filter (renderer has no ctx.filter); the leak and tension rhythms are integer-ratio sines so the 8-minute cycle is seamless and frame one is reproducible.
