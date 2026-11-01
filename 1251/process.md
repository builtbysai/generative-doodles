# №1251 — It's Just the TV

Jenna Maurice study block JM4, after her *"It's just the TV"* (2024): her
family pointing their Hi8 camera at the television, mesmerized by video
feedback, recreated as an installation. A boxy 90s CRT glows in a dark
living room at dusk; the room barely moves and the feedback does all the
work. Warm and domestic — no neon, no rave, no sharp digital edges.

## House adaptation

A real video-feedback loop needs a frame buffer fed back into itself,
which the QA renderer cannot do (no offscreen canvas, no pixel readback).
The recursion is therefore drawn as **stored-transform iteration**: a
content program — a domestic glyph scene of a sofa silhouette, a floor
lamp and a window — is drawn, then redrawn inside itself under iterated
scale (≈0.80, slowly breathing), rotation (a fraction of a degree to ~2°,
oscillating) and a slight drift, out to the current recursion depth. Each
nesting level alternates a warm amber or magenta phosphor wash and gets a
soft phosphor double-stroke (two flat alpha outlines) instead of any blur.

## The room

Near-black walls (#141210); furniture as dark silhouettes at the edges:
a floor lamp left with a faint flat amber glow disc, a picture frame
right, curtain strips at both edges, and the viewer's own sofa back as
low humps along the bottom. The TV body carries two knobs and a
dot-grille speaker panel on its side, little feet, and a VCR underneath
with a single green clock dot and one dim dash — no readable digits,
no text anywhere beyond the title.

## The photo

A tap drops the family photo into the feedback (a single tap is
debounced 360 ms so a double-tap can reseed instead). It also drops on
its own once per ~50 s cycle, at a seeded moment early in the cycle.
The still — three flat sepia figures and a dog inside a thin frame — is
born at a middle level of the recursion and is carried outward as the
spiral turns, its level index falling over ~26 s while its alpha fades.
It is redrawn at its resident level and every deeper one, smaller and
fainter each time, so it reads half-dissolved into the tunnel.

## Interaction

- **Drag vertically** — recursion depth eases between 2 and 8.
- **Tap** — drop the photo into the feedback.
- **Double-tap** — reseed (new hashes, photo births cleared).
- Silent throughout; no audio of any kind.

## Determinism

The first frame is drawn synchronously at a fixed phase, T0 = 12 s:
feedback at depth 5, mid-drift, and the seeded photo (dropped at
≈4–8 s into the cycle) already half-dissolved at a middle level.
Animation continues as T0 + elapsed since load via a
`typeof`-guarded `requestAnimationFrame`. Everything random-looking —
static sparkle (regenerated on an 8 fps step grid), level rotations,
drop times — comes from seeded sine hashes; there is no
`Math.random`, no gradients, no filters, no shadowBlur, no offscreen
canvas. Canvas size comes from the Visual Viewport API with resize
listeners on both `visualViewport` and `window`; the canvas CSS size is
pinned in `draw()`; phones are detected via `window.screen` (min
dimension < 700) with the aspect fallback.
