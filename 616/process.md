# No.616 — The Sketchbook Machine

EXPANSION #74 adolfo-serra, prompt block 8 "Cuaderno de Campo" (TASKS.md, verified verbatim).

## Concept

Serra's Domestika sketchbook doctrine as an instrument: the notebook as a photo library filed by category. A paper page with a stitched margin fills the frame. Along the bottom edge sit five category glyphs, drawn pictograms only (fox head = animal, fern = vegetation, hooded head = character, boat = object, house with tree = place), each inside a faint pencil circle that is its tap zone. No words or letters appear anywhere in the piece; the glyphs are the interface.

Interactions, per the prompt:
- TAP a category glyph: a motif from that category is stamped onto the page at a seeded spot.
- DRAG on the page: draws a turmeric wash stain along the path; on release the stain is read into a creature standing on the stain's own contour, closing the loop back to block 1 (No.609, Coreografía de manchas).
- DOUBLE-TAP the page: turns to a fresh page. The old page is kept; nothing is ever erased. A tally of dots at the top-right counts the pages (no numerals). The book caps at 12 pages; after that, double-tap does nothing (the book is full).

## Construction

Single self-contained `index.html`, canvas 2D only, no external assets.

**Motif library (5 categories x 3 parametric generators), ink line work with small turmeric touches:**
- animal: fox, bird, fish (the contour-creature profiles shared with No.609)
- vegetation: fern (stem and leaflets, accent tip), seed pod (accent-washed pod, ink seed dots), leaf sprig (one accent-filled leaf)
- character: hooded figure (turmeric hood, paper face), dancer, long-neck head
- object: boat (accent sail), cup (accent band, steam curls), key (accent bow dot)
- place: house (accent roof), lighthouse (accent lamp), arch (accent sun)

**Page model:** pages are data. Each page is a list of marks in filing order; a mark is either a stamp (category, variant, normalized position, scale, rotation, flip, birth time) or a stain (normalized path points, creature type, anchor angle, flip, birth time). Only the current (last) page is drawn. Turning a page pushes a new empty mark list. Marks are stored in normalized coordinates, so the book survives resizes intact.

**Stain reading:** on drag release, the stain's centroid and radius are computed from its path; a creature (fox / bird / long-neck / fish, chosen from a seeded stream keyed to the stain count) is anchored at a point on the stain's contour on its upper arc and drawn in the tangent frame (radial for the fish), exactly the contour-reading mechanism of No.609. The reading draws itself in six stepped fractions after the wash settles.

**Accent decision:** the prompt allows one pigment accent per session, seeded from turmeric / walnut / Aegean. This build fixes the session accent to turmeric #D9A441 (the seeded choice for this piece, recorded here): stains are turmeric wash, never walnut, and all accent touches across stamps and the current-page tally dot use turmeric only. Palette is otherwise strict: paper #F5F0E6, ink #26221E, pencil gray #8A8578.

**House rules:** canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas style width/height pinned in px inside draw(); phone detection via window.screen (min dimension < 700px) with the h > w*1.15 aspect fallback only; paper grain is precomputed seeded speckle data drawn directly; no offscreen canvas, no ctx.filter, no audio, no microphone.

**Determinism:** frame one is one synchronous draw at load: page 1 pre-filed with one starter stamp from each category (fox, fern, hooded figure, boat, house) and a single tally dot. No Date.now anywhere; elapsed time comes from performance.now anchored at load, and the rAF loop is typeof-guarded. All randomness is mulberry32: per-category streams (seed 616100 + category index) drive stamp placement, variant, rotation and flip; the stain stream (seed 616500 + stain count) drives creature type, anchor and flip. Sessions are reproducible.

## QA log

Rendered with the repo QA renderer (node-canvas, no rAF):
- qa-desktop.png (1280x900): stitched dashed margin inside the frame; five starter stamps spread with breathing room (fox upper left, fern upper center, hooded figure right, boat lower left-center, house lower right); five glyph pictograms along the bottom in pencil circles (fox head, fern, hooded head, boat, house with tree), all legible; one turmeric tally dot at the top-right corner; no letters anywhere; nothing clipped.
- qa-mobile.png (390x844): same page composed for the tall frame; stamps and glyph row fully legible at 390 wide, glyph circles uncrowded, nothing clipped.
- thumb.png (720x720): matches the desktop composition.
- Determinism gate: thumb.png rendered twice and byte-compared with cmp — identical. Second render deleted.

Deviations: none from the prompt. Two implementation notes: (1) stamp spots for glyph taps come from the per-category seeded stream with a spacing retry against existing stamps on the page, so the page accumulates without stacking motifs on top of each other; (2) the page-turn is an instant turn (no page-curl animation), keeping the notebook's marks-as-data model exact.
