# №1709 "Quilt of Jittered Cells" (PP956, EXPANSION #224 aaron-penne)

## Build
- Built from BATCH-1709-1711-SPEC.md (2026-11-11 15:45 run), PP956 section only. Live №1708 used as template (fetched via fetch-blob.py).
- Palette f09 hand-picked from the prompt's named colors (no study file exists in the repo): lemon yellow #F2D61E, orange-red #E8481F, cobalt blue #2545D3, teal #12807A, deep purple #3B1F5E.
- Composition: 6-column grid of rounded-square cells on a deep purple ground. Each cell is a cobalt blue frame with a bold flat fill (yellow, orange, or teal) inside, separated by purple interstitial space. Cell edges are hand-drawn: each side is a 7-segment polyline jittered by seeded fbm noise, so no two edges are alike and nothing reads as a CSS grid. A faint inner seam and a small stitch dot (about 40% of cells) complete the quilt feel, plus fixed seeded grain speckle.
- Motion: watch-only. One slow global wave (period 24 s) drives per-cell translation, rotation (up to about 0.022 rad), and scale (about 1.4%), with phase varying slowly across the grid, so cells breathe in near-unison like fabric in a breeze. No click-to-reload, no interaction.
- Frame one: fixed pre-roll t = 6 s (phaseT = FRAME_T = 6.0). The full grid is legible at frame one, cells offset and slightly rotated but aligned enough to read as a quilt.
- House rules: Visual Viewport sizing with resize on visualViewport and window; canvas pinned in draw() via style width/height in px; phone detection via window.screen (min dimension < 700 px) with aspect fallback; field-like composition full-bleed on phones, square centered stage on desktop; one synchronous frame at load; requestAnimationFrame guarded by a typeof check; title/date/hint plates drawn on canvas ("Quilt of Jittered Cells", "2006 · 09 · 16", "Watch the quilt breathe."); no em dashes in visible copy; no AI-signature copy.
- Responsiveness deviation (documented, not a spec change): on tall phones the grid grows rows to match the stage aspect (6 cols x 14 rows at 390x844) so cells stay near-square instead of stretching into tall rectangles. Per-cell fill and stitch assignments are pure hash functions of (i, j), so they are deterministic for any grid size.

## Deviations from the prompt
- p5.js-to-2D substitution: the prompt's technical approach names p5.js; node-canvas has no WebGL and the piece is built in plain Canvas 2D, which renders identically for this design. No visual deviation.
- Palette hexes hand-picked (see Build above); the spec authorizes this because studies/aaron-penne.md does not exist in the repo.
- Phone row count adapts to aspect (see above); desktop and thumb are the specced 6x6 grid.

## QA
- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three inspected visually.
- Desktop: 6x6 quilt, visible edge jitter and shared-phase ripple, cobalt frames, purple gaps, plates legible. Pass.
- Mobile (first gate): cells stretched into tall rectangles, so the grid was changed to aspect-matched rows and re-gated. Second gate: 6x14 near-square cells, reads as a quilt full-bleed. Pass.
- Thumb (720x720, IS thumb.png): 6x6 quilt, plates legible. Pass.
- Determinism: desktop and thumb renders repeated byte-identical (md5s match across runs); grep confirms zero Math.random / Date.now in index.html. Frame one is a fixed phase of seeded noise only.
- md5 index.html: 6f128c0a168830b41efdc5771339aff7 (post fix round; supersedes the pre-fix value)
- md5 thumb.png: 2369ef57d7ec5d9de898307f955f888c (post fix round; supersedes the pre-fix value)

## Fix round (2026-11-11, parent gate finding)
- Finding: at all three sizes the title plate overlapped the quilt's top row; on the 720x720 thumb the top-left cell was almost entirely hidden behind the title plate and the top row read sliced.
- Fix: added a shared `plateMetrics()` (used by both the grid layout and `drawPlates()`, so the two can never drift apart). The grid rect is now fitted into the band between the plates: top edge at title-plate bottom + 14 px, bottom edge at hint-plate top - 14 px, fitted to the COLS/rows aspect so cells stay square, and centered in the available band. Plates did not move. Palette, 6-column grid (6x6 desktop/thumb, 6x14 phones), seeded deterministic frame one (t = 6 s), edge jitter, and shared-phase ripple are unchanged.
- Re-gate: re-rendered 1280x900, 390x844, 720x720 and inspected all three. Top row fully visible with clear purple space under the title plate at every size; bottom row ends with clear space above the hint plate. Desktop 6x6, mobile 6x14, thumb 6x6.
- Determinism: desktop and thumb renders repeated byte-identical; grep confirms zero Math.random / Date.now in index.html.
- md5 index.html: 6f128c0a168830b41efdc5771339aff7
- md5 thumb.png: 2369ef57d7ec5d9de898307f955f888c

## Gallery entry (for the parent push)
- n: 1709, title: "Quilt of Jittered Cells", date: "2006 · 09 · 16", note: "Bold quilt cells breathe in near-unison, like fabric in a breeze. Watch only."
