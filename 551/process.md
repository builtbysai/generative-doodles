# №1690 "Tectonics Study" (MK3, mpkoz PP937, EXPANSION #222)

Date: 2006 · 08 · 28. Gallery note: "A grey room recurses inside its own framed picture, five levels deep. Watch only."

## Prompt (verbatim, TASKS.md)
The Droste/recursion mechanism. A minimal grey gallery room: an ornate patterned rug on the floor, and a framed picture on the wall that shows the same room with the same rug, smaller; inside that picture the room appears again, recursing at least 5 visible levels. The recursion is LIVE: a camera slowly pushes toward the frame, and each level's content is the actual current render of the next, so the viewer falls into the recursion. Every 90 seconds the recursion resets with a new rug pattern (new seed, same ornate style). Palette: room in cool greys (#B9BCC0 walls, #9A9DA2 floor); rug in Persian tones (madder red #A63A2E, indigo #2E3A6E, saffron #D9A13B, cream #E8DCC0). Frame matte black. Composition: camera at standing eye height, frame on the far wall centered, rug leading from the foreground to the frame. The recursion target (the framed picture) occupies the center third. Motion/interaction: watch-only. The slow push-in is constant and smooth; the rug reseed is the only cut, and it must land mid-push without a visible jump (crossfade the texture, never the camera). Technical: render-to-texture feedback approximated in canvas 2D by drawing the room recursively as a function (draw room at scale s, inside it draw the framed picture containing the room at scale s*k, at least 5 visible levels, 6 feedback passes max); rug patterns from a seeded ornamental tile generator. Canvas 2D ONLY. Avoid: static nested images, obvious texture seams between levels, sudden camera jumps, decorative frames-within-frames beyond the one mechanism.

## Build
- Single `drawRoom(rect, depth, t, seeds, fade)` function; the framed picture (center third of the room width, matte black frame, cream mat) contains the same room at the next depth. Depths 0-5 = 6 passes (MAX_DEPTH 5); depth 5 draws a flat grey panel with a rug sliver instead of recursing further, so the mechanism stops cleanly at the pass limit.
- Rug: seeded ornamental tile generator (mulberry32, seed 937 + cycle*7919). Trapezoid in perspective bands: indigo end borders, saffron guard stripes, madder field with a cream/indigo/saffron diamond lattice, nested-diamond center medallion. Seeded variation picks the lattice accent and medallion accent per cycle.
- Camera: zoom(t) = 1 + 0.30 * (0.5 - 0.5*cos(2*pi*t/90)), applied as a canvas scale about the frame center. Rug reseed at each 90 s boundary crossfades over 2 s (previous pattern drawn at alpha 1-f, new at f); the camera never jumps.
- Frame one: t = 30 (fixed phase, 30 s into the 90 s cycle), zoom 1.225, rug fade complete, so several recursion levels are visible at first paint. All randomness is seeded; no Date.now()/Math.random() touches frame one.
- House rules: Visual Viewport sizing with resize on visualViewport and window; canvas pinned in draw() via style.width/height; phone detection via window.screen (min dimension < 700px) with aspect fallback; centered geometric piece, square field on desktop, full-bleed on phones, page ground #B9BCC0 (the wall color); title/date/hint plates drawn on canvas ("Tectonics Study", "2006 · 08 · 28", "Watch only."); watch-only, no click-to-reload; no em dashes in visible copy; requestAnimationFrame guarded with typeof checks; reduced-motion respected.
- Template: live №1687 index.html (fetched via fetch-blob.py), plate/layout/loop structure reused.

## Deviations from the prompt
- Camera push: the prompt says the push-in is constant and the reseed lands mid-push. A constant linear push would jump at the 90 s wrap, which the prompt also forbids ("never the camera", "no sudden camera jumps"). The push is therefore a smooth 90 s in-out breathing cycle (zoom 1.00 to 1.30 and back, derivative zero at the boundary), so the reseed lands at the widest point with zero camera discontinuity and the rug crossfade is the only change at the cut. The push is constant and smooth within each leg; it eases at the extremes rather than running linearly forever.
- Deepest level (depth 5) is a flat panel with a rug sliver rather than a seventh recursion, per the prompt's own 6-pass maximum.

## QA (node-canvas renders from the actual script)
- Desktop 1280x900: grey room, Persian rug leading from the foreground (cropped by the push-in, as intended) to the centered black frame; inside the frame the room repeats with its own rug and frame, and two further levels plus the deepest panel are visible. Title/date plates top left, "Watch only." bottom left. No seams, no strobing (motion is a slow 90 s zoom; nothing above 14 Hz by construction).
- Mobile 390x844: full-bleed room, same composition, recursion visible (outer frame plus two inner levels clear); plates legible.
- Thumb 720x720: square field, recursion reads clearly at thumbnail size; this file IS thumb.png.
- No post-gate edits to index.html; md5s below are of the gated files.

## Files
- index.html md5: bb6add2fe648bf11ab6e2bdd0eb5d0d9
- thumb.png md5: fc30261d69b0e1fd67943aff06fe8e58
