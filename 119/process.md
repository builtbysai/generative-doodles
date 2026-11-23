# №134 · Hex House Study - process notes

## Concept
After Char Stiles's Genuary 2025 "brutalism" piece and her SDF house: a brutalist mansion built from rounded-box signed distance fields, floating in a black void. It assembles itself from scattered blocks, takes a slow quarter-turn orbit, then holds while its one cyan neon strip pulses. One warm amber window, off-center, is the focal point.

## Construction
- Single self-contained page, no WebGL. A canvas-2D software raymarcher (bounding-sphere reject, up to 56 steps, reduced grid of about 30k rays upscaled) evaluates a scene of ten rounded-box SDFs: plinth, main block, left wing, right tower, roof slab, setback storey, tower cap, entry block, the amber window and the neon strip.
- Palette is the spec's five values only: ground #0B0B0D, concrete #8A8F98, chrome edges #C8CCD4, window #FFB347, neon #5AF2FF. Concrete is shaded by one analytic light with a ten-step soft shadow; grazing faces mix toward chrome through a procedural band environment, so edges catch an invisible city without any sky or ground plane. The window is emissive amber; the strip is emissive cyan.
- A 20s seamless loop: 0 to 6s the blocks fly in from scattered positions and snap with easeOutBack overshoot, staggered per block; 6 to 16s the camera orbits one quarter turn; 16 to 20s hold, with the neon strip pulsing once (a gaussian bump peaking at 17.6s). The house sits centered at about 55% of frame height with generous black margins, framed by fitting the short axis so portrait panes keep the whole house.
- The amber window is a thin sharp-cornered box sitting proud of the main facade; its lower right is honestly occluded by the entry block from some angles.
- Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px inside draw; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load (opened at 11s, assembled and mid-orbit) and requestAnimationFrame is guarded so node-canvas QA works.

## Interaction
- Drag orbits the camera freely; vertical drag tilts. The drag carries inertia: on release the camera keeps its velocity briefly, decays, then eases back into the loop's own orbit. Single touch only, no pinch.
- Never click-to-reload. No text, no UI beyond the hint.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before reporting. The house reads clearly at all three sizes: plinth, wings, tower, slabs and entry block distinct, amber window glowing off-center, neon strip visible along the roof slab's front edge at its baseline brightness (the pulse peaks later in the loop).
- Two fixes during QA: the window first rendered with a visible notch at its top-right corner, where rays slipped past its rounded corner and caught the shadowed facade behind; the window box was made thicker, sharper-cornered and slightly larger until the artifact shrank to a natural occlusion edge. Camera basis code was also cleaned of a placeholder cross-product draft before first render.
- Deviation: none from the visual spec. The prompt allowed a WebGL shader or a 2D fallback; this is the spec file's prescribed route for the QA harness, a real SDF raymarch done in software on 2D canvas, not a flat isometric fake.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short ("drag to orbit the house").
- Files: `134/index.html`, `134/thumb.png` (720x720, rendered from the live script), `134/process.md`. Gallery entry for the parent to add: №134, title "Hex House Study", formula date 2002 · 05 · 25, note ending "Drag to orbit the house."
