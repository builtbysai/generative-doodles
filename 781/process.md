# No.781 Sky Room

EXPANSION #95 doug-wheeler, prompt block PP6 "Sky Room" (verified verbatim from TASKS.md). After 49 Nord 6 Est 68 Ven 12 FL (2020): a room that reads as atmosphere, not architecture.

## Concept

Walls, ceiling, and floor are all washed in one milky blue. On the rear wall a white rectangle glows with soft, bleeding edges, unbounded by any frame. The polished floor mirrors it honestly. One small seated silhouette sits at the rectangle's left, dwarfed, and never moves. The only motion is breath: over a seamless 54 s loop the rectangle's brightness swells and recedes by about 6 percent while the room's blue deepens and lifts in counter-phase, the dawn/twilight creep of the real installation.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets. Strict palette: room blues #6E97C4 and #8FB3D9, rectangle #F4FAFF, bleed #DCE8FF, silhouette #101318. No other colors are introduced; all intermediate tones are mixes of the two room blues.
- Canvas size comes from the Visual Viewport API, with resize listeners on both `visualViewport` and `window`; `draw()` pins `canvas.style.width/height` in px every frame. Phone detection via `window.screen` (min dimension < 700 px), aspect `h > w*1.15` as fallback only. Page ground is the deeper blue #6E97C4.
- Room: fine 2 px horizontal bands stepping between the two blues, lightest around the rectangle's height, plus seven nested low-alpha ellipses of the light blue behind the rectangle for central luminosity. No gradients anywhere; layered flat shapes only.
- Rectangle: 40% of frame width, centered on the rear wall. Drawn as a glow stack: six nested flat rects of the bleed color at low alpha around a tight bright core, so the edges bleed with no frame line and no corner marks.
- Honest reflection: the floor line sits at 0.70 of frame height. The reflection is the same glow-stack geometry (core plus all bleed layers) mirrored across the floor line, squashed vertically to 55%, drawn at 40% alpha, and driven by the same breathing function as its source, so source and reflection can never drift apart. It is computed mirrored geometry, not a generic gradient wash.
- Silhouette: one seated side-profile path (head circle, torso/thigh/shin polygon, seat block), base on the floor line, left of the rectangle, about 13% of frame height. No time parameter reaches the silhouette code.
- Breathing: `breathAt(t) = sin(2π t / 54)`, a closed-form master sine. Rectangle core alpha and bleed scale ride it (+/-6%); the room band mix shifts by the negative of the same value (counter-phase). Frame one is the synchronous draw at t = 0, where the sine is exactly 0: mid-swell, as specced.
- Determinism: frame one never derives from `Date.now()`; every animated quantity is a closed-form function of t. rAF is typeof-guarded, so the QA renderer (no rAF) draws frame one synchronously. No audio, no interaction handlers of any kind: watch-only per the prompt.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and `cmp` byte-compared: identical. The comparison render was deleted.
- Read-back, desktop: milky blue room, glowing white rectangle centered with a soft bleed halo and no frame reading, squashed 40%-alpha mirror of the rectangle in the floor below the floor line, small seated silhouette at the rectangle's left.
- Read-back, mobile (390x844): same composition in the tall frame; rectangle keeps its 40%-of-width proportion, reflection fully visible, silhouette legible, nothing clipped.
- Read-back, thumb (720x720): same read at square size.
- Fix rounds: the seated silhouette's first two path drafts read as a pawn-like glyph; the torso was widened and the thigh lengthened so the knee and shin fall in front of the seat block, giving a clear seated profile. All renders redone and the byte-compare re-run after the fix.

## Deviations

- None from the prompt's substance. The prompt calls for a gradient room and a blurred glow; per house renderer rules (no `ctx.filter`, no offscreen canvas, gradients avoided) both are built from layered flat bands and nested alpha shapes, which read the same at frame one and throughout the loop.
