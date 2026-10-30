# Pink Manager — No.463

EXPANSION #55 paul-blow, prompt PB7.

## Concept

A reseedable one-panel editorial portrait generator in Paul Blow's magenta-skin grammar: a neutral-expression suited figure with unnatural flat skin on one flat ground. The tonal composition never changes; only the colorway and the small pose facts (head tilt, tie angle, hand gesture) are reseeded, the way the artist fixes a composition and re-rolls its colors. The economy is the identity: one head, one suit, one tie, one ground, nothing else.

## Construction

- Single self-contained canvas 2D page. The figure is fully parametric: head ellipse with ears, two dot eyes, one straight neutral mouth line, a small neck block, a shoulders trapezoid for the suit, a shirt triangle, and a knot-and-blade tie rotated by the seeded tie angle.
- Tonal-first, palette via LUT, per the prompt's stated workflow: the drawing code works in fixed tone roles (ground, skin, suit, shirt, ink); a lookup table maps those roles to the active colorway. Colorways: magenta #E91E63 on pale yellow #F5E9C8, cobalt #2B5FE3 on cream #F2EAD8, teal #1E8A8A on sand #EAD9BC. Suit is always #14141C, shirt always #F7F2E4.
- Seeded RNG (mulberry32, fixed seed). Load-time state is pinned: first colorway (magenta on pale yellow) and the seeded base pose (slight head tilt, swung tie, raised-hand gesture). Tap or double-tap advances the seeded stream and reseeds colorway, tilt, tie angle, shoulder width, head squash, and gesture variant (none, hand at lapel, hand raised at side).
- Drag: the head follows the pointer with parallax eased toward a target clamped to plus/minus 6px, so the portrait feels alive without ever breaking the flatness. The page ground follows the active colorway's ground color.
- Sizing from the Visual Viewport API with resize listeners on visualViewport and window; the canvas CSS size is pinned in draw() every frame. Phone detection via window.screen minimum dimension under 700px with an aspect fallback. The centered composition keeps its shape on phones; in portrait the figure grows to fill more of the tall frame.
- Determinism: the synchronous first frame is drawn at a constant phase (the portrait is a still composition; the rAF loop, typeof-guarded and anchored as fixed offset plus elapsed since load, only serves the drag easing). No audio, no microphone.
- Hint: one lowercase word "drag" in the bottom-left corner, suit color at low alpha. Nothing else.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp — identical.
- First render pass found the portrait too small in the tall phone frame; the portrait sizing was reworked so landscape and square frames keep the 60 percent composition and portrait phones fill more of the height. The raised-hand sleeve was also thickened so the gesture reads as an arm rather than a stick. Re-rendered and re-verified after the fix.
- Desktop, mobile, and thumb all show: portrait centered, magenta skin on pale yellow, neutral dot eyes and straight mouth, black suit trapezoid with cream shirt and legible tie, raised skin hand at the right, flat ground, hint in the corner, nothing clipped.
- The QA renderer has no document.body, so the page-ground assignment is guarded; in a real browser the body background follows the active colorway.
