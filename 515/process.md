# No.515 Lunar Cat

EXPANSION #62 giulia-pastorino, prompt GP3. After her "Gatto lunare" (2020).

## Concept

One giant ochre animal stands in the lower two-thirds of a near-black field: a long horizontal body on four column legs, a tiny head at the left end carrying her whole face grammar (two dots and a bent-line mouth, nothing more), and a pink ribbon tail arcing over its back from the right hip. The body is not a surface but a field, covered in dark-blue 8-ray asterisk bursts; the same motif returns in the sky behind it at two to three times the scale, so the animal reads as a piece of the night that learned to walk. Four oversized round feet in pink, blue, and cream anchor the columns. Watch-only: the body bursts pulse in a slow wave that travels along the animal, the sky asterisks drift left and wrap, the tail sways. Double-tap reseeds the burst field and the foot colors.

## Construction

- Single self-contained index.html, canvas 2D, no external assets, no audio. Design stage 1080x1080 (square logic), fitted with a min-scale letterbox; the page ground is the same near-black #141414, so the composition keeps its shape on phones.
- Palette, flat fills only, no gradients anywhere: ochre body #E89A1B, bursts dark blue #2B3A8C, ground #141414, tail pink #F0608E, feet drawn from #F0608E / #2B4FB0 / #F2F2E4, face ink #141414.
- The animal is one path (rounded-rect body 790 long, four 64-wide leg columns, circle head of diameter 98 = 1/8 of body length, two small ear triangles) filled once in flat ochre.
- Body bursts: 44-51 seeded asterisks (radius 13-26) scattered over the silhouette's bounding box and clipped to the body path, so none spill. Each pulses with alpha 0.7-1.0 on a phase set by its x position, which makes the wave travel along the body.
- Crayon grain: 850 precomputed seeded specks in four ochre tones, drawn directly each frame inside the same clip (the QA renderer has no offscreen canvas, so no pre-rendered grain layer).
- Background asterisks: 13 seeded asterisks at radius 38-70, alpha 0.75, drifting left at 5 design px/s with wraparound.
- Tail: a 36-wide round-capped pink quadratic stroke from the right hip over the back; its control point sways on two slow sines.
- Feet: ellipses 120 wide against 64-wide legs, one seeded palette color each.
- House rules: canvas size from the Visual Viewport API with resize listeners on visualViewport and window; canvas CSS size pinned in px inside draw(); phone detection via window.screen physical size (min dimension < 700px) with the h > w*1.15 aspect fallback only.
- Determinism: the first frame is drawn synchronously at the constant loop phase PHASE0 = 3.1s; the rAF loop (typeof-guarded) is anchored as PHASE0 + elapsed since load. Nothing in frame one derives from a wall clock. All scatter comes from mulberry32 with the fixed seed 515003 (a ?seed= override exists for testing); double-tap steps the seed through an LCG and rebuilds the scene.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp after the final edit; identical. The duplicate render was deleted.
- Read-back of all three renders: the ochre long body on column legs fills the lower two-thirds; the tiny head at the left end shows two dot eyes, the bent mouth, and ear tips; dark-blue asterisk bursts cover the body and legs without spilling; the larger asterisks sit in the sky band above the body; the pink tail arcs from the right hip over the back; the four feet (cream, pink, blue, blue on the shipped seed) are each wider than their leg. On mobile the square composition letterboxes onto the matching near-black ground with nothing clipped.

## Deviations

- Background asterisks are confined to a top band (centers y 34-250, body top at y 430) rather than scattered over the whole sky. Reason: they drift horizontally forever, and the band is what guarantees the prompt's "background asterisks never overlap the body" rule at every moment of the loop, not just in frame one.
- Two small ear triangles are included in the head silhouette. The prompt fixes the head as tiny with a two-dot face and forbids a realistic cat; the ears are flat silhouette only, no added detail, and they are what lets the tiny head read as a cat at thumbnail size.
- Foot colors are independent seeded picks from the three-color palette, so a reseed can repeat a color (the shipped seed has two blue feet). The prompt fixes the palette ("feet from...") rather than a one-each assignment.
- Head diameter was set to exactly 1/8 of body length (98 of 790) in a final pass, tightening an initial 1/7.3.
