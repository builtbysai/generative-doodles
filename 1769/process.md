# №1769 "One Pink Field": process notes

## Driver

A single flat pink field, almost empty. One small pale sprig crosses it so slowly you could watch a whole minute and barely see it move, and a line of tiny dark rose text sits at the very bottom edge, never moving. The piece is about waiting inside a color.

## Mechanism

Full-bleed flat pink (`#f2a6c2`) fills the canvas; the page ground is the same pink, so on desktop the square field and the ground read as one continuous field. One procedural sprig (stem as a quadratic curve, seven small solid leaves, three buds at the tip) is drawn in near-white (`#fdf6f3`, low contrast against the pink). The sprig travels a cubic bezier path as a pure function of piece time: each leg crosses the field in 600 seconds, then the sprig rests off-field for a 90 second pause before re-entering from a different edge. Four legs cycle left to right, top to bottom, right to left, bottom to top (leg length 690 s). The sprig rotates to face its direction of travel from the bezier tangent. The bottom text line ("one pink field, one sprig, ten minutes", lowercase serif, dark rose `#7c2a44`) is drawn on the main canvas at the field's bottom edge every frame and never moves. No gradients, no shadows, no second object, nothing faster than a minute.

## Palette

- Field: `#f2a6c2` (flat pink, Pinkcourtesyphone register)
- Sprig: `#fdf6f3` near-white, buds `#f9e3ec`
- Text and plates: dark rose `#7c2a44`, plate ink near-white, date ink pink

## Interaction

Watch-only. No pointer handlers at all, no click-to-reload. The loop advances only by the clock.

## Frame-one phase

Fixed phase t = 60 s. The sprig is 10 percent into its first crossing (leg 0, left to right), sitting just inside the left edge of the field at about 9 percent across, angled along the bezier tangent. The bottom text line is in place. Two desktop renders at 1280x900 are byte-identical (md5 ee9dda283502c5bed555f07e8f9f738d), confirming the fixed phase.

## Deviations from prompt

- Leg endpoints sit exactly on the field edges (0.0 / 1.0) rather than off-field, so at the fixed frame-one phase the sprig is fully visible on phones instead of half clipped at the left edge. The pause between crossings still hides it completely, so the re-entry reads the same.
- The spec's "procedural sprig sprite" is drawn as stroke paths on the main canvas, never a sprite bitmap or offscreen canvas, per the batch spec adaptation flag.
- Title plate (title + formula date) and a small "Watch only." hint are drawn on canvas per house rules; the hint sits top-right so it never collides with the artwork's bottom-edge text line.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js:

- Desktop 1280x900 (/tmp/1769-desktop.png): flat pink field with no gradient or shadow, one pale sprig visible mid-field left, bottom text line legible, plates discreet top-left and top-right.
- Mobile 390x844 (/tmp/1769-mobile.png): full-bleed pink, sprig fully visible near the left edge, text line at the bottom edge, plates fit.
- Thumb 720x720 (thumb.png, md5 8b08af5e575ee6bd746c6f7af19463a8): same composition, sprig visible.

First build had two faults, both fixed and re-gated: the leaves were drawn as paired arcs and rendered as broken outline fragments (rebuilt as solid pointed ovals from two quadratic curves), and the sprig was half clipped at the left edge on mobile (leg endpoints moved onto the field edges). No em dashes in visible copy. No Math.random or Date.now in the visual state; leaf jitter comes from a mulberry32 seed fixed at load.

## Files

- index.html (md5 882e7b7798a9d16def0913ac8ff7c49f)
- thumb.png (md5 8b08af5e575ee6bd746c6f7af19463a8, 720x720)
- Gallery note: "One flat pink field; a pale sprig drifts across it over ten minutes, a tiny text line fixed at the bottom edge. Watch only."
- Formula date on piece: 2006 · 11 · 15
