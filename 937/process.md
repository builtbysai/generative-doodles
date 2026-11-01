# No.937 "A Life, Stitched"

Study #115 giorgialupi, PP98 "Fourteen Thousand Four Hundred Ninety-Six" (Giorgia Lupi's Book of Life, Moleskine Foundation, 2021: 14,496 white stitches, one per day of a life, with colored over-stitches marking events).

## Concept

An accordion-fold book sews itself. Thousands of days pass as near-invisible white thread on paper, laid in neat notebook rows across the folds; the viewer has to lean in. Over the top, colored over-stitches mark the events a life is actually remembered by, in a strict stitch legend that is part of the piece: yellow straight stitch for achievement, dark blue for travel, red for love, the same red crossed for a break-up, black crossed for a loss. A needle travels the band left to right, stitching the days in order and popping each event in as its day arrives. When the life is complete the accordion folds shut and reopens on a new one.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets. Strict palette: paper #F2EDE2, day thread #FFFFFF, achievement #E8B62D, travel #2C3E70, love / break-up #C0392B, loss #1A1A1A, legend ink #23211C. The ink appears at very low alpha only as fold shading, notebook rules, and the hair of shadow under each white stitch, so the field reads as faint texture rather than blank paper.
- Layout: a legend strip at the left fold (five stitch samples with their names, always on show), then the accordion band: 4 pages on desktop, 3 on phones. Alternate pages carry a flat ink overlay at alpha 0.03 and every page boundary is a fold seam; faint notebook rules run across all pages, sewn or not.
- Day stitches: 24 rows x 25 columns per page = 600 per page, exactly 2,400 day stitches on desktop and 1,800 on phones (a representative sample of the 14,496 story). Each is a short white dash at alpha 0.52 with seeded vertical jitter (plus or minus 1.1 px) and a whisper of rotation, sitting on its notebook line. Sewing order is page by page, row by row, left to right, so the band reads as one life from birth at the left to the present at the right.
- Lives: 27 events per life. The first five are placed by hand ("a first word", "first train alone", "the island year", "a first love", "grandfather") so frame one always opens on a yellow, two blues, a red and a black cross already glowing in the sewn field. The remaining 22 are drawn from per-event age-plausible windows by the generation's seeded stream (mulberry32, seed 937000 + gen x 1013): six more achievements, five travels, four loves, three break-ups, four losses, each with its own name. Events pop in over the ten stitches after the needle passes their day.
- Loop (105 s): sew 90 s, hold the finished life 10 s, fold shut 3 s (pages collapse leftward toward the legend), reopen 2 s on the next seeded generation. Frame one is the synchronous draw at t = 0 with the sew clock pre-offset so page 1 is complete and the needle sits 45 percent through page 2; the offset is computed from the page count so the staging is identical on phones.
- Interaction: tap finds the nearest sewn event stitch; the needle rests there while it pulses, and a caption card on a paper plate at the bottom names the event. Drag pulls the thread: stitches near the pointer lean along the drag vector with a closed-form exponential spring-back. Double-tap discards the life and starts a fresh generation at the same mid-sew staging. All drawn state is a closed-form function of the piece clock and the recorded tap / drag events; frame one never reads the wall clock.
- Sound (browser only, created lazily inside the first pointer gesture, typeof-guarded): a low thinned thump for roughly every 26 stitches sewn, a soft band-passed creak while dragging, a paper-fold noise as the accordion closes. The piece renders complete in silence.
- House rules applied: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas pixel size pinned in draw() every frame; phone detection via window.screen (min dimension under 700 px) with the h > w x 1.15 aspect fallback; no gradients, no shadowBlur, no ctx.filter, no offscreen canvas; rAF typeof-guarded.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). All clean, silent.
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. Second render deleted.
- Desktop frame one read back: legend strip with all five labeled samples; page 1 fully sewn in faint white dashed rows; needle dot mid page 2 with its short thread trail; the yellow achievement, two blue travel stitches, the red first love and the black grandfather cross all visible in the sewn field; pages 3 and 4 blank paper with faint rules.
- Fix round 1: on the first mobile render the needle had only just entered page 2 (the fixed 0.3625 sew offset means a smaller share of a 3-page life) and the thread trail drew a long straight jump line from the end of page 1 to the start of page 2. The sew offset is now computed from the page count so the needle is 45 percent through page 2 at any size, and the trail breaks wherever consecutive stitches jump a row or page boundary. Re-rendered at all three sizes; the diagonal line is gone.
- Mobile read back after the fix: 3 narrower pages, legend labels still legible at 10 px, nothing clipped; one extra pooled event (the scholarship) lands inside the sewn share on the phone layout, which is consistent with the staging.
- The day field was checked against the near-invisible discipline: at alpha 0.52 over the ink hair-shadow the rows read as texture you lean into, not as crisp dashes and not as blank paper, so the alpha was left as built.

## Deviations

- Day-stitch count is 2,400 on desktop and 1,800 on phones rather than a flat 2,400 everywhere: the grid is defined per page (24 x 25) and phones carry 3 pages instead of 4 so the legend stays legible. Both counts are recorded above; the brief allowed fewer pages on phones.
- On tap, the needle rests at the tapped event for the pulse duration (the brief's "needle jumps") rather than the sewing position freezing permanently; sewing resumes its closed-form position when the pulse ends, so a tap never rewrites the life's timeline.
- Event names: 27 concrete names were written (five fixed, 22 pooled) rather than the rougher six-per-type sketch in the brief, so that every event stitch in every generation has a caption. "The year of the storm" is filed under travel, as its name suggests.
