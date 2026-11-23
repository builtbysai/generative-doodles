# No.380 Boho Jungle — process

## Concept

After Jen K's (@jenkbdoodles) maximalist animal print: flat jungle fauna at hero scale on light beige, three registers with no negative space left over. Five hero animals, exactly, in the fixed species order leopard, tiger, zebra, leopard, tiger: white leopards with black spots and ringed rosettes, orange tigers with black stripes, one black-and-white zebra with a zigzag mane and dark muzzle. Spiky tropical plants fill the mid register, tiny red berry clusters and dots the micro register. The beige ground is the background; there is no scene and no sky. The field breathes and sways on a 40 second loop, and a drag turns nearby animals slightly toward the pointer before they settle home.

## Construction

One canvas, 2D, flat colour only: ground #EFE3CC, animals #FAFAF5 and #1E1E1E, tiger #E08A3C, leaves #4E7A4E and #7A9B4E, berries #B33A3A. Nothing else. No offscreen canvas, no sprites, no gradients, no filters, no shadowBlur.

Design space 1280x900, cover-fit (full-bleed field at every size, phones included), sized from the Visual Viewport API with resize listeners on visualViewport and window; the canvas is pinned in px every frame; phone detection via window.screen min dimension under 700px with the aspect fallback. Pointer coordinates convert through the stored cover transform (S, OX, OY).

Each animal is authored in local coordinates (facing +x, about 290 design px tall, a third of the design height): tail, far legs, torso bean, near legs, paws, chest, head, muzzle and ears, all flat filled paths. Patterns are data tables generated once from a fixed mulberry32 seed: leopard torso spots (minimum-spaced so the coat reads as spots, not smudge; ringed rosettes constrained fully inside the torso), chest spots, tiger stripes hanging from the back and rising from the belly plus chest stripes, zebra torso and chest bands. The table passes are drawn clipped to the animal's own torso and chest paths on the same canvas. Authored marks sit on top unclipped: head spots, forehead stripes, head bands, leg spots and tapered leg bands matched to the leg width, tail spots, tail bands and the zebra's tail tuft. The two repeated species mirror their pattern tables (patFlip), so the second leopard and second tiger do not wear identical coats. The animal count and species order are asserted at load.

Plants: 18, asserted. Twelve back plants on a jittered grid plus six shorter foreground tufts along the bottom; each is a quadratic stem with stacked triangle leaves alternating sides and greens, computed from data each frame. Berries (26 clusters), single dots and 20 filler sprigs are rejection-sampled off the animals' body ellipses so the micro register fills gaps without freckling the fauna.

Motion: a 40s loop. Animals breathe at scale 0.98 to 1.02 and plants sway plus/minus 3 degrees, both on 2 whole cycles per loop with seeded phase staggers. Drag is the only interaction: while dragging, each animal within 360 design px of the pointer eases its turn toward a tilt of up to 0.16 rad, head up when the pointer is above it and head down when below, scaled by closeness, with the sign corrected for mirrored animals. On release the target returns to zero and the fixed-step integrator snaps the turn to exactly zero below 0.001 rad, so every animal settles back to precisely its authored rotation. Never click-to-reload; there is no tap action and no text or UI of any kind.

Determinism: the first frame is drawn synchronously at the constant phase T = 11.3s into the loop, leaves mid-sway, animals mid-breath, all turns exactly zero. The animation clock is anchored to that constant plus elapsed time since load, advanced in fixed 1/60 ticks; requestAnimationFrame is typeof-guarded. No wall clock and no Math.random anywhere; the thumbnail reproduces byte-identically from the shipped script.

## QA log

- Rendered with the node-canvas QA renderer at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). Thumb rendered twice: byte-identical.
- First pass: heads sat too low and merged into the chest mass, ears were stubs, and ringed rosettes clipped at the torso edge read as scribbles. Rebuilt the head group (head raised and moved forward, chest shrunk, ears enlarged, muzzle stepped forward with the nose at its tip), constrained rosettes fully inside the torso, and re-rendered.
- Second pass: the two leopards wore visibly identical coats, spot clumps smudged, and a filler sprig landed on the zebra's cheek. Added minimum spot spacing, widened the chest-spot field, mirrored the pattern tables for the repeated species (second leopard, second tiger), tightened the sprig rejection, and pulled the right-edge leopard in so its head enters the frame. Re-rendered all three sizes; thumb byte-identical again.
- Final inspection: desktop shows all five animals reading instantly as leopard, tiger, zebra, leopard, tiger, packed in spiky leaves and berries with animals bleeding off the left, right and bottom edges. Mobile crop is full-bleed with the zebra whole in frame. Thumb reads as a dense jungle toss at gallery size.
- Compliance greps: no em dashes, no absolute URLs, no Math.random, no createElement, no gradients, no shadowBlur. Asserts hold: exactly 5 animals in the specced species order, exactly 18 plants, loop exactly 40s.
