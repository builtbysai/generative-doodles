# Archive Carousel, No.1819

Driver: a viewing machine, seventy-seven catalogued objects on a ring; drag turns it, settling re-seeds the arrangement.

## What it is

A slow-turning carousel ring in a dark archive room carries seventy-seven sepia archive objects: books, letters, photographs, pamphlets. Each object wears a small numbered catalog card, 1 to 77, in red on paper cream. Dark archive shelving fades out at the left and right edges. The ring turns slowly on its own; dragging rotates it by hand. When rotation settles, the arrangement re-seeds into a new one of twenty-eight deterministic variations, each a seeded shuffle of the seventy-seven objects around the ring slots.

## Interaction

Drag to turn the carousel. Dragging rotates the ring by hand; releasing lets momentum decay, and when rotation settles the arrangement re-seeds. Never click-to-reload; drag is rotation, not refresh.

## Palette

Archive sepia #8A6D3B, light sepia #B99B62, dark sepia #5C4622; ink black ground #14100C; paper cream #F2E8D5 and #D8C9A8; one catalog-red accent #A93226.

## Acceptance numbers

- Exactly 77 objects, number cards 1 to 77, every number present exactly once. Verified by probe: slot order is a permutation of 1 to 77.
- Exactly 28 deterministic variations, seeded by rotation count (mulberry32 over the turn count). Verified by probe: 28 settles produce 28 distinct arrangements.
- Drag changes rotation: probe drag(300) moved rotation from 0.4200 to 0.9780 rad and changed the rendered pixels.
- First frame deterministic: fixed phase t = 60 s, rotation 0.42 rad, variation 0. A fresh render is byte-identical to the first.

## QA

Rendered from the actual script with node-canvas at 1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three inspected visually: ring and objects clean, no clipping, title plate and hint legible, number cards present on the front arc. Mobile keeps the carousel shape with the page ground set to the ink-black background.

## Deviations

None from the prompt. No invented names or readable personal text appear on the objects; number cards only. The shelf spines at the edges are abstract marks with no text.
