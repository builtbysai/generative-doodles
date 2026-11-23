# No.579 — Manet Duerme la Siesta

EXPANSION #70 maria-j-luque, prompt block 3 "Momentitos" (title suggestion used verbatim).

## Concept

Her tender art-history fanfiction mode: a famous painter caught in a small, private moment, painted with affection and never mockery. Manet naps on a green sofa after finishing a big canvas; the canvas leans against the wall beside him, already painted. The room is mostly quiet space: a night window upper-right, a lamp glowing on a side table, a cat asleep on the rug. The artist is tiny in the room and the face is deliberately simple — closed-eye lines and a beard shape — because she paints the moment, not the portrait. Nothing explains anything: no plaques, no labels, no captions. The only text in the piece is a tiny lowercase "drag" hint.

## Construction

- Single self-contained `index.html`, canvas 2D, 1000x1000 stage space scaled by `min(viewW, viewH)`.
- Strict palette from the prompt: sofa green #5A7A5A, lamp yellow #E8B93C, room cream #F0E6D2, night #1A2A4A. Every other tone (floor, wood, skin, blanket, jacket, cat, rug) is a computed mix of two of those four hexes toward cream or night, so nothing outside the palette family appears.
- The leaning canvas's "painting" is abstract only: a muted blue band, a pale ochre counter band, a low green mass, four dark silhouette verticals with pale heads, and 26 seeded translucent dabs. No real composition is copied.
- Motion is watch-only, three quiet loops on one anchored clock:
  - Breath: a ~5.2 s sine; the chest ellipse and the arm draped over it ride a translate of up to 3.6 stage px. The head never moves; he is never woken.
  - Cat tail: flicks once per breath loop — a brief ease window late in each cycle lifts the tail tip; otherwise the tail rests wrapped around the curled body.
  - Lamp: a flat glow disc whose alpha pulses by ±0.022 around 0.115 on a slow sine — almost imperceptible, no gradients anywhere.
- Interaction: drag only, a gentle three-depth parallax (window/canvas 0.35, sofa/lamp 0.70, rug/cat 1.0), clamped and smoothed. No tap action.
- Paper grain: 340 precomputed seeded speckles drawn directly each frame (no offscreen canvas, no filters).
- House rules: Visual Viewport sizing with resize listeners on visualViewport and window; canvas pinned in px inside draw() every frame; phone detection via window.screen (min dimension < 700px) with the aspect fallback (h > w*1.15) checked in resize(); the interior keeps its framing on phones and the page ground is the room cream.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared — identical; second render deleted. Frame one is the synchronous draw at constant PHASE0 = 0: breath at rest height (sin 0), lamp at its steady mid alpha, tail fully at rest (the flick window sits late in the cycle), parallax zero. The rAF loop is typeof-guarded and anchored as PHASE0 + elapsed; grep confirms zero `Date.now`, zero `document.createElement`, zero `AudioContext`, zero `roundRect`.
- Read-back, desktop: napping figure small on the green sofa lower-center, dark beard and closed eye legible, chest and blanket clear; leaning canvas at left with its abstract bands and figures; night window upper-right with crescent moon and stars; lamp glowing on its side table at right; grey-blue cat curled on the rug. Nothing clipped.
- Read-back, mobile: the whole interior fits the 390-wide stage centered on the cream ground; every element (window, canvas, sofa, sleeper, lamp, cat, hint) present and unclipped.
- Read-back, thumb: scene reads at gallery size; sleeper, sofa, window, and cat all identifiable.

## Deviations

- The prompt allows canvas touches in "the master's palette" and, in the parent brief, muted red/blue/ochre derived from the listed hexes mixed toward cream. A muted red cannot be mixed from the four listed hexes (green, yellow, cream, night blue), so per the brief's own fallback ("if in doubt use the listed hexes flat") the leaning canvas uses only muted blue, pale ochre, and muted green mixes. Recorded here as the one palette judgment call.
- Skin, wood, floor, blanket, and cat tones are two-hex mixes of the strict palette rather than new hexes, keeping the piece inside the specced color family (same approach as sibling pieces in this batch).
- A tiny lowercase "drag" hint sits in the bottom-right corner, the maximum text the brief allows; there are no other words in the piece.
