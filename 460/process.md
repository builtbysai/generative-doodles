# No.460 Door Policy

## Concept

From Paul Blow's Invisible Companies series (EXPANSION #55, prompt PB4): a dark,
empty, near-black surround holds one glowing freestanding doorway at 60% of the
frame height, center-right. Through the part-open door, a warm office interior
with silhouetted figures seated at desks. Warm yellow light spills from the
revealed part of the opening onto the dark ground as a gradient wedge. A lone
small businessman in silhouette stands at the left, facing the door, briefcase
in hand, with a thin warm rim light on the side the door's glow would catch.
One door, one joke. Huge dark negative space does the rest.

Palette, nothing else: surround #0B0B10, door glow gradient #FFD166 to #FF9E3D,
interior silhouettes #2A2118, the businessman #1A1512.

## Construction

Single self-contained index.html, 2D canvas, no external assets, no audio, no
microphone. Canvas is sized from the Visual Viewport API with resize listeners
on visualViewport and window; draw() pins canvas.style.width/height in px every
frame. Phone detection uses window.screen physical size (min dimension under
700px) with the aspect fallback; this is a centered composition, so it keeps its
shape on phones and the page ground is the piece's own #0B0B10.

The door is an emissive gradient panel hinged at the left edge of the opening:
its projected width is door width times cos(angle), so as the angle grows the
panel foreshortens and more interior is revealed. The interior is a seeded
mini-scene clipped inside the door frame: a warm gradient room, a back-wall
panel offset by a perspective shear tied to the door angle, and 3 to 5 desks in
two rows with seated figures (head and shoulders) behind most of them. The
light spill is a gradient wedge composited over the ground from the revealed
base of the opening; its length, spread and alpha are driven by sin(angle), so
it widens and brightens as the door opens and shrinks as it closes.

Interaction, per the prompt: drag on the door and the panel follows the pointer
in real time (angle recovered from the pointer's x position via acos, clamped),
with the spill wedge tracking it. Interior figures sway at their desks on a
seamless 60 second ambient loop. A tap (press released with no drag) reseeds
the interior scene: the seeded stream advances and a new desk arrangement and
figure count are generated. Never click-to-reload.

Determinism: all load-time layout comes from mulberry32 with fixed seeds
(arrangement zero is seed 46055). The synchronous first frame is drawn at a
constant loop phase with a fixed 21000 ms pre-roll baked into the loop clock:
door at the fixed inviting angle of 1.12 rad, spill wedge visible, figures
mid-sway. Frame one is never derived from Date.now() minus an offset; the rAF
loop is anchored as pre-roll plus elapsed-since-load, and rAF is guarded with a
typeof check so the node QA renderer (no rAF, no AudioContext, no
document.createElement, no offscreen canvas) draws the same frame.

The only in-piece text is the single lowercase hint "drag" in the bottom-right
corner, in dim warm orange. No text inside the office, no jump scares, no
photorealism.

Deviations from the prompt letter: none of substance. Two execution notes: the
businessman carries a thin rim light in the palette's own glow colors, because
#1A1512 on #0B0B10 is otherwise nearly invisible and the prompt asks for him to
be seen facing the door; and the interior desk count range is 3 to 5 rather
than fully open, so every reseeded arrangement stays legible at door scale.

## QA log

Rendered with node ~/workspace/tools/render-piece.js from the actual script:

- qa-desktop.png (1280x900): the glowing door reads instantly against the
  dark; the part-open panel separates from the interior by its reversed
  gradient; two figures at desks and a second-row desk are visible through the
  revealed opening; the spill wedge fans across the ground from the door base;
  the businessman stands clear at the left with briefcase and rim light; the
  "drag" hint sits dim in the bottom-right corner.
- qa-mobile.png (390x844): the composition keeps its shape; door, frame,
  businessman and hint are all inside the frame, nothing clipped; spill wedge
  intact.
- thumb.png (720x720): same composition at gallery size, door glow and
  businessman both legible.
- Determinism gate: thumb.png rendered twice and byte-compared with cmp:
  identical. thumb2.png deleted after the check.
- First pass fixes: the first render's door angle (0.95 rad) left the interior
  a narrow strip with one oversized figure; the angle was opened to 1.12 rad,
  figure scale reduced, desk count set to 3 to 5 spread across the opening,
  desk legs lengthened, the panel gradient reversed against the interior's,
  and the back-wall panel shrunk to a window-like rectangle. Re-rendered and
  re-inspected after the fix.
