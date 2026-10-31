# No.824 The Flicker Engine

EXPANSION #101 tony-conrad, PP1. Tony Conrad, The Flicker (1966), rebuilt as a render loop.

## Concept

The piece is five frames and nothing else: a WARNING card, TONY CONRAD PRESENTS, THE FLICKER, BLACK, WHITE. No imagery ever enters the flicker; the content is what the viewer's nervous system invents. The screening follows Conrad's shape, accelerate, dwell, decelerate, abrupt stop, holds black, then the warning card returns and a new screening begins. A double-tap reseeds the block map (a new screening, the prompt's own mechanic). Pointer x modulates the cycle speed slightly. Reduced motion replaces the strobing with slow fades.

Palette is absolute: #000000 and #FFFFFF only. There is no sound.

## Construction

Single self-contained index.html, canvas 2D, no external assets. Canvas size comes from the Visual Viewport API with resize listeners on visualViewport and window; draw() pins canvas.style.width/height in px every frame. Phone detection uses window.screen physical size (min dimension < 700px) with the aspect fallback h > w*1.15. The piece is full-bleed at every size, so the phone path only affects the card type size floor.

Timeline of one screening (screening seconds): 0-3 warning card, 3-5 TONY CONRAD PRESENTS, 5-7 THE FLICKER, 7-330 block cycles, 330-334 held black, then rollover to a fresh warning card.

Block map. A seeded generator (mulberry32) builds 47 cycles, after Conrad's 47 test variations. Each cycle holds 4-8 black/white pairs; block bases run 40-115 ms with a per-pair bias, longer black on odd cycles, and every block is clamped to a 42 ms floor. A compensating pair is appended per cycle so black and white totals are exactly balanced. Verified on the shipped seed: 47 cycles, balanced true, minimum pair 84 ms, maximum base rate 11.90 Hz, map length 51.6 s (the map repeats within the flicker section).

Screening clock and the walker. The frame shown is a closed-form function of (screening clock, block map, pointer-x factor, reduced-motion state); no drawn state is frame-integrated and nothing reads Date.now(). Block consumption is advanced by an incremental walker that splits the elapsed span at the arc knots and pointer-segment boundaries, then subdivides into substeps of at most 0.1 s. The map is flattened once per build into pair tables with cumulative starts, so the pair under the playhead is a binary search. The walker's map position is kept wrapped in [0, map length) and pair boundaries are crossed by an exact snap; this matters, see the QA log. Pointer moves are recorded as segments {screening time, factor} with factor 0.833-1.20 across the width, and the walker applies them as it passes them, so the whole history stays deterministic. A reseed or screening rollover bumps a walker epoch and restarts the walk.

Frequency cap, by construction. Perceived flicker rate for a pair is the consumption speed divided by the pair length: rate = eff / pairSeconds, where a full black+white pair is one flash cycle. The fastest raw speed product is arc 1.10 x pointer 1.20 = 1.32, and the shortest pair is 84 ms, so uncapped the top rate would be 11.90 x 1.32 = 15.7 Hz, above the 14 Hz ceiling. The walker therefore caps the consumption speed per pair under the playhead: eff = min(speed, 14 x pairMs / 1000), which forces every displayed pair period to at least 1/14 s. Verified two ways on the shipped build: algebraically over all 324 pairs the worst rate is exactly 14.000 Hz; empirically, walking the full screening at 1 ms sampling with the pointer pinned at maximum, the shortest full black-to-black period measured 0.0710 s against the 0.07143 s bound, inside the 1 ms sampling step. Measured perceived rates: about 6.9 Hz average in the dwell, about 5.3 Hz across the accelerate ramp, slower still at the arc's tails, which is the intended Conrad shape (the film itself starts and ends slow).

Arc compression. The original runs 30 minutes; the screening here runs 334 s (about 5.6 minutes, a compression of roughly 5:1) so the full accelerate-dwell-decelerate-stop shape is experienceable in a gallery visit. The arc: accelerate 0-90 s (speed 0.55 to 1.10), dwell 90-240 s (1.10), decelerate 240-330 s (1.10 to 0.45), abrupt stop at 330, black hold 4 s.

Reduced motion, two routes. (1) System: if matchMedia('(prefers-reduced-motion: reduce)') matches at load, reduced mode is on from the start. (2) Visitor toggle: a tap in the top-right corner zone (outer 15% of width and height) toggles reduced mode; the gallery note documents it ("tap the top-right corner to soften"). In reduced mode the flicker section is a triangle-wave fade, one full black-white-black cycle per 2 s. A plain tap anywhere else does nothing. A double-tap reseeds the map and restarts the screening at the warning card.

## QA log

Renders via node ~/workspace/tools/render-piece.js: qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720). All three show frame one, the warning card: plain white sans-serif centered on black, four lines ("WARNING" / "This film may be especially unsuitable for epileptics" / "or others with a sensitivity to light" / "A physician should be in attendance"), legible, nothing clipped on mobile, nothing else on screen. thumb.png rendered twice and cmp-compared: byte-identical; the duplicate was deleted. The renderer has no requestAnimationFrame, so the synchronous first frame is the held card at t = 0, exactly as specced. Frame one never reads Date.now().

Two defects found and fixed during QA, both in the consumption walk:

1. Slow-walk defect. The first walker recomputed consumption from s = 7 on every frame (O(screening time) per frame) and located pairs by linear scan; a full-screening 60 fps simulation took seconds per frame late in the screening. Rebuilt as the incremental walker with flattened pair tables and binary search. After the rebuild, a fresh full-screening walk at 60 fps costs 9 ms total in the node harness, max 1 ms per frame.

2. Floating-point freeze. The first incremental version stored the map position unwrapped; after the first full map pass (~68 s in an early tuning), increments smaller than the ulp of the accumulated position rounded away at a pair boundary and the film froze on one field for the rest of the screening. Fixed by keeping the position wrapped in [0, map length) and snapping across pair boundaries exactly when the remainder in a pair is ~0. After the fix, total consumption matches the arc integral: 81.3 map-seconds at screening t = 100 (integral 81.25) and 305.0 at t = 330 (integral 305).

One tuning pass: the first generator's block bases (46-164 ms) centered the dwell rate near 5.3 Hz, under the prompt's 6-14 Hz band; bases were tightened to 40-115 ms, moving the dwell average to about 6.9 Hz with peaks capped at 14 Hz.

Deviations, with reasons:

- Screening length 334 s instead of the original's 30 minutes: the prompt's own 30-minute structure cannot complete in a gallery session; the compression keeps the full arc shape experienceable and is recorded here and in the code. Sessions may still end early by leaving, as the prompt allows.
- The warning card's wording is assembled from the lines the prompt sanctions (physician-style, after Conrad's own card); no other text appears anywhere in the piece besides the two title frames and the document title.
- The reduced-motion toggle is an invisible corner tap rather than a drawn control, because the prompt forbids decorative UI; it is documented in the gallery note instead.
