# №108 · Intangible Mass - process notes

## Concept
From Bug's ig-artist-study batch 0, prompt 28, made.up.lifeforms section, after mulf. A seamless loop of looming structure: enormous peculiar formations rising from darkness, lit as if by a flashlight beam that sweeps slowly across them. Cave formations, deep-sea growths made mineral. Dark, vast, a little scary. No monsters, no faces, no text.

## Construction
- Single self-contained page, no libraries. Software-shader route on 2D canvas: ridged fbm at large scale forms the mass, shaded by height and depth, multiplied by a soft cone beam mask; the field is computed per cell on a reduced-resolution grid (adaptive cell size) and drawn as soft cells, identical in the browser and in node-canvas QA renders. No WebGL.
- The mass fills the lower three quarters, rising from the bottom edge; black void above. The beam sweeps left to right and back on wrapped sine time; the warp field breathes on the same wrapped time, so the 24 second loop (the longest in the batch) closes seamlessly.
- Palette only: abyss #08070A, stone #2E2A33, lit stone #6B5F6E, beam #E8E0D0.
- Drag: the fingertip aims the beam directly while pressed; on release the offset decays and the automatic sweep resumes.
- Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback; field full-bleed on phones and desktop. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before shipping. Hans's real-device check is the final gate.
- QA iteration: the first pass left the unlit mass nearly invisible and its surface too low; the surface profile was raised into the lower three quarters and the ambient light floor lifted so the formations loom even outside the beam.
- Distinctness check against No.106 Fossil Bed: 106 is a fully lit relief slab filling the frame with bone fossil forms; 108 is an abyss-black field whose mass fills only the lower three quarters under a sweeping beam.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `108/index.html`, `108/thumb.png` (720x720, rendered from the live script), `108/process.md`. Gallery entry prepared for pieces.json with the formula date.
