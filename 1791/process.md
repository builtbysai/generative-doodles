# №1791 "Stencil, Ink, Repeat" (SR8, PP1038, steve-roden)

Completes EXPANSION #234 steve-roden. Date 2006 · 12 · 07. Watch-only, no click-to-reload, no interaction of any kind.

## Build

Template: live №1790/index.html (fetched fresh via gh_api.py, sha b37872a7e78f0125f273cf052641fbea2c34f1b4). Canvas 2D only. Seeded RNG mulberry32(1791) only; no Math.random() or Date.now() anywhere in the script. One synchronous frame at load; requestAnimationFrame calls guarded with typeof checks. Visual Viewport sizing with resize on visualViewport and window; canvas pinned in draw() via canvas.style.width/height in px; phone detection via window.screen (min dimension < 700px) with aspect fallback (h > w*1.15). Field-like composition: full-bleed sheet on phones, centered square sheet on desktop with table grey (#8f8d86) at the frame edges.

## Composition

Top-down view of a paper-white sheet (#f6f2e9) on a table. A bordered grid of 4 columns by 8 rows (32 cells) is drawn in graphite lines; a stencil head on an arm enters from the top edge, descends at irregular intervals, and presses spiky rust-orange (#B4552D) burst marks. Each burst is rotated slightly, jittered in position, scale (0.90-1.10) and alpha (0.72-0.95), with a darker core and ink specks. About 16% of presses are doubles: a second, offset, darker (#7a3318) impression, the ink pooling the prompt calls for.

## Press schedule (closed form, fixed seeded table)

Press times are generated from seeded gaps of 3.2-5.6 s, so the rhythm is steady but never metronomic. Prefix gaps are scaled so press 13 lands exactly at t = 60 s; suffix gaps are scaled so the last press lands at t = 140 s. Press times (s): 4.85, 8.07, 12.67, 15.97, 21.21, 24.69, 27.88, 33.37, 37.91, 42.81, 47.23, 52.04, 56.10, 60.00, 64.72, 68.80, 73.27, 77.55, 82.44, 87.12, 92.18, 97.37, 100.57, 104.12, 108.26, 113.06, 117.80, 120.95, 125.15, 129.71, 135.04, 140.00. The sheet fills over 140 s, holds to 150 s, then swaps: the finished sheet slides down out of frame while a fresh blank sheet slides in from the top (150-168 s). Cycle length 168 s, then the next sheet starts filling. The head dwells 0.55 s on each press, lifts over 0.4 s, travels to the next cell during the gap, and descends over 0.4 s. At least one darker double is guaranteed among the presses visible at frame one.

## Frame one (fixed phase t = 60 s)

Mid-sheet: 14 bursts pressed (three full rows plus two in the fourth row). Press 13 is landing exactly at t = 60 s, so the head is down on the row-4, column-2 cell with the fresh burst's spikes peeking out below the head block and a soft shadow under the head. At least one darker double is visible (row 1, column 3, and row 3, column 4). Verified via window.__probe: pressedCount(60) = 14, anchorIndex() = 13, headState(60) = { press: 1, k: 13 }.

## Deviations

None from the prompt. The head's arm extends to the top edge of the frame so the tool stays visible as the mechanism, per the prompt.

## QA

- node ~/workspace/tools/render-piece.js index.html 1280 900 (desktop): paper-white square sheet centered, table grey at the edges, 14 rust-orange bursts in bordered rows, head down mid-press on the 14th burst, doubles visible, title/date plates and "Watch only." hint legible.
- 390x844 (mobile): full-bleed sheet, same composition, head down on the row-4 burst. The title plate slightly clips the top spikes of the first-row, first-column burst; this is the series' standard plate-over-field layout and is accepted.
- 720x720 (thumb.png): same as desktop, square.
- Determinism: two desktop renders byte-identical (md5 c3d7724b7e70e08d2d9338b5c5e77fab both runs).
- One fix round during the build: the first render failed with a TypeError because rgba() was passed pre-formatted strings; fixed by passing numbers. A second fix round: the probe showed the head lifted (press 0) at frame one because headState picked the next press with a strict greater-than test; fixed so the head is down exactly on a press time and dwells over the cell just pressed. Re-gated all three sizes after each fix.
- No em dashes in visible copy; no click handlers; no Math.random()/Date.now().

## Gallery note

"A stencil head presses rust-orange bursts into bordered rows. Watch only."
