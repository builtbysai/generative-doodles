# №1313 "The Lean" — process notes

Leslie Hewitt LH2 (PP480), expansion #168. A photo-sculpture leaning against
a gallery wall, seen from a slight side angle: the artwork is a 3D object,
not a flat image.

## Frame one

Wall plaster fills the upper 55%, floor the lower 45% in perspective. A maple
frame with a thin aluminum inner edge leans at 8 degrees off vertical, pivoted
on its bottom center, casting a long soft shadow to the right (two layered
flat-alpha parallelograms). Inside the print: a document field with a fold
line, a torn top-right corner, ink scrawl doodles, a pictured leaning square
of wood (the form rhyming with its content), and a faded coral-and-sage
snapshot with a white border, slightly rotated. At the frame's left base:
three stacked clothbound books (oxblood, ochre, slate) with blank cloth backs
— one spine flipped away from the viewer, rebuffing the gaze — and a small
leaning maple block standing on the books against the frame's edge. No glass
anywhere; the panel leans, unsecured, and never hangs flat.

## Motion

Watch-only, 60-second loop. The panel settles 1–2 pixels over the loop as a
damped oscillation (2 * exp(-t/9) * sin(1.1t) px), then holds, as if gravity
is still deciding. Once per loop (phase 40–46 s) a soft viewer-presence
shimmer band crosses the glassless print, clipped to the print field. Drag
shifts the viewpoint: recorded drag events contribute a parallax offset
decaying with tau 1.2 s, clamped to ±14 px, applied at different factors per
layer (wall 0, panel 0.6, books 0.8); release returns to rest. Never
click-to-reload; no glass reflection UI chrome.

## Determinism

Frame one is drawn synchronously at exactly t = 0 via a boot flag; the
performance clock starts only with the rAF loop. All variation comes from a
seeded mulberry32 PRNG (seed 1313000): wall flecks and scrawl paths. No
Math.random, no frame-integrated state; drag parallax is a closed-form
function of recorded events and piece time.

## House-rule compliance

Visual Viewport sizing with resize listeners on visualViewport and window;
canvas pinned via canvas.style.width/height in px; phone detection via
window.screen physical size (min dimension < 700 px) with aspect fallback;
full-bleed field composition on phones, checked at 390 wide. Single
self-contained HTML file, silent, no external assets. node-canvas QA
constraints honored: no requestAnimationFrame (typeof-guarded, plain function
declaration), no AudioContext, no document.createElement, no WebGL, no
offscreen canvas, no ctx.filter, no shadowBlur, no gradients (shadows and
shimmer are layered flat alpha shapes); dots drawn as rects; moveTo before
every batched arc. No visible text except <title>. No getUserMedia.

## Fix rounds

1. The leaning maple block was first drawn before the panel and hidden
   behind it. Moved after the panel restore, positioned from the panel's
   rotated left edge at book-top height, so it reads leaning against the
   frame's base on the books.
2. The resize handler redraws at the current piece time, never restarting
   the performance.

## QA

Rendered with node tools/render-piece.js at 1280×900 desktop, 390×844
mobile, 720×720 thumb; all three inspected. Thumb rendered three times plus
a final re-verification, all cmp byte-identical. index.html md5:
7b21fe1029330c08f6f1db256941966e.
