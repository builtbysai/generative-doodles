# No.968 — The Shortest Stack

Study #119 kyle-mcdonald, PP129 "Binary Stacks".

## Concept

Kyle McDonald's Binary Stacks (2008) is a counting machine, not a simulation: draw binary numbers as strips of black and white pixels, count up from zero, and lay each strip on whichever horizontal stack is currently shortest. The complexity comes from the counting alone. This piece renders that mechanism as knit: every bit is a small rounded stitch-rect with a faint vertical rib, two yarns only (black #111216, white #F2EFE6) on a dark ground #0E0F13, inside a black ribbed hem border. Strips land at 7 per second with a brief amber highlight, and when the counter passes its maximum a new season begins on top while older seasons compress and fade below, so the field becomes a striated cliff of binary. A thin strip of bit cells in the bottom hem shows the current count as it is placed. No text anywhere except the page title; the counter is drawn as bits, never digits.

## Construction

- Counting model: each season is fully precomputed from its seed before it is drawn. A season has N stacks (seeded base 14–20 with a ±2 seasonal jitter, clamped 12–22), a bit width of 8 or 9 (maxCount 255 or 511), and a counter running 0..maxCount. For each count value, the target stack is the one with the fewest cells; ties go to the lowest stack index. Because shortest-first placement balances the stacks, stack strip counts differ by at most one, which sets the season's column count exactly.
- State is closed-form: machine time maps to a season index and a number of completed placements (rate 7/s), so any frame, including frame one, is a pure function of time plus recorded interaction events. Seasons are built lazily and cached per generation; up to four are visible at once, newest on top, with band heights weighted 1 / 0.8 / 0.62 / 0.46 and alphas 1 / 0.82 / 0.66 / 0.5.
- The in-flight strip slides from just above the current season's band onto its target stack over 0.12 s with an amber overlay; landed strips keep a fading amber glow for 0.8 s. Stitch height is capped at 1.6× the cell width so stitches stay stitch-shaped instead of stretching into bars when a band is tall.
- Interactions: a quick tap reseeds the sweater (new stack count and maximum, cliff restarts); press-and-hold pauses the counter with the in-flight strip hovering and pulsing; double-tap cycles the yarn palette (classic, inverted, amber-on-black — always exactly two yarns) and reseeds.
- Sound is lazy and gesture-gated (AudioContext created on first pointerdown, typeof-guarded): a soft knit-click per placed strip with pitch rising with the count, a low thump when the shortest-stack floor rises, and a tape-rewind sweep at a season change. Silent in the QA renderer by construction.
- House rules applied: canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window, style width/height pinned in draw(), phone detection via window.screen (min dimension < 700) with aspect fallback, seeded mulberry32 RNG, no gradients, no shadowBlur, no ctx.filter, no offscreen canvas, rAF typeof-guarded, no microphone, no date-derived state.

## QA log

- Rendered with the node-canvas QA renderer at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), and 720×720 (thumb.png). All render cleanly in silence.
- Determinism: thumb.png rendered twice and byte-compared with cmp — identical; the duplicate was deleted. Frame one is the synchronous draw at machine time 50.07 s, never derived from Date.now().
- Frame one shows season 1 complete (a full striated field of black/white stitch rows in the lower band) and season 2 growing above it (94 strips placed), with the freshly landed strips glowing amber near the growing edge and one strip mid-drop. The shipped seed (7) was chosen so the first two seasons are both 8-bit with 16 and 17 stacks, which is what makes that opening composition exact.
- Mobile: the full field fits the 390-wide frame, nothing clipped, hem and counter strip intact. On phones the seasons run 8-bit only with stack counts clamped to 20–22, keeping the stitch pitch at or above 3 px; recorded here as a deliberate deviation from the seeded parameter ranges, for legibility at phone scale.
- One fix round during build: the first renders stretched stitches to the full row height, so they read as vertical barcode dashes; capping stitch height at 1.6× cell width restored the knit-row reading at all three sizes, and the frame-one offset was nudged (50.0 → 50.07 s) so the in-flight strip is caught mid-drop rather than parked above the hem.
