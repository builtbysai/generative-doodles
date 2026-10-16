# №106 · Fossil Bed - process notes

## Concept
From Bug's ig-artist-study batch 0, prompt 26, sitting in the made.up.lifeforms section of TASKS.md and headed "after mulf"; both names recorded here as the prompt gives them. A static specimen: layered warped noise rendered as relief, lit from the upper left, reading as sedimentary rock holding fossil imprints. Pale bone forms pressed into darker strata, fine sediment grain over everything, presented like a museum slab. No literal species, no labels.

## Construction
- Single self-contained page, no libraries. 2D canvas. Multi-scale warped noise as a heightmap; relief shading from the height gradient dotted with the light direction; threshold bands and mottling for strata; grain folded into the base colour per cell. The heightfield and fossil placement are computed once per size and cached; only the light is applied at draw time.
- Exactly 7 fossil imprints (asserted): one dominant form near centre-left plus 6 smaller imprints scattered by the seeded PRNG "Fossil Bed". Each imprint is an irregular mottled bone patch pressed slightly into the surface with a faint raised rim; no rings, no recognisable anatomy.
- Palette only: strata #3A3129, sediment #6B5B45, bone #D8CBB2, shadow #1A1512.
- Static decision (recorded): the prompt calls this piece static with one curated seed, so the slab never moves and never reseeds. The only interaction is drag-only light: while pressed, the relief light follows the fingertip's angle around the slab; release restores the curated 45 degree upper-left light.
- Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback; slab full-bleed on phones with a small dark margin, centred square on desktop. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before shipping. Hans's real-device check is the final gate.
- QA iterations: early versions read as spiral targets and then as eyeball medallions; the imprints were rebuilt as mottled depressions with irregular outlines, and the strata contrast was lowered twice, before the slab read as rock.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `106/index.html`, `106/thumb.png` (720x720, rendered from the live script), `106/process.md`. Gallery entry prepared for pieces.json with the formula date.
