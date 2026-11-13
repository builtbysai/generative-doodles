# №1753 "Generation Loss" (PP1000, MF2, marcus-fischer) - build notes

- Date: 2006 · 10 · 30 (formula date for №1753)
- Spec: `~/workspace/goals/generative-doodles-backfill-from-9067/hidden_files/BATCH-1752-1756-SPEC.md`, №1753 section
- Template: /tmp/t1751.html (live №1751 Beat Box), structure, sizing, plates, and guard patterns mirrored
- Interaction: watch-only; no pointer handlers at all, never click-to-reload

## What was built

A dense field of soft marks filling the frame edge to edge on a film-leader grey ground (#A9A49B). Each generation (pass) is a scatter of 96 marks, dashes, small circles, and crosses in three kinds, seeded per pass. Fresh passes (age 0-1) render in ink black (#17150F); older passes fade into pale-silver ghosts (#E8E6E0 / #CFCBC2) that stay legible beneath. Pass 4 is the one warm rust generation (#A6502E with #8A3E22 halo strokes) and fades more slowly, so it refuses to die. Twelve pinned residue marks (three rust) are drawn near full strength whatever their age. A thin margin rule runs along the bottom edge with a live numeral at bottom-right: "GEN 10" at frame one.

## Determinism / adaptation

Per the spec's adaptation flag, the accumulation is a pure function of piece time, never accumulated frame state: `passIndex(t) = floor(t / PASS_LEN)` with `PASS_LEN = 6.0 s`; each pass p draws its marks from `mulberry32(1753 * 7919 + p * 104729)`; the fade is applied by redrawing the full deterministic pass history with alpha `FADE^age` (FADE 0.72, rust pass `RUST_FADE^age` with RUST_FADE 0.88). The margin numeral is computed from the same pass index. Frame one is fixed phase t = 60.0 s: pass 10, generations 0-10 present (eleven deep), numeral GEN 10. No `Date.now()` or `Math.random()` anywhere; `requestAnimationFrame` guarded by a `typeof` check; one synchronous frame at load.

## House rules

- Visual Viewport sizing; resize listened to on visualViewport and window
- Canvas pinned in draw() via canvas.style.width/height in px
- Phone detection via window.screen (min dimension < 700px) with aspect fallback h > w*1.15; field is full-bleed on both phone and desktop (field composition)
- Title/date/hint plates drawn on canvas (title plate top-left, "Watch only." plate bottom-left)
- No em dashes in visible copy; no AI-signature copy; Canvas 2D only

## Deviations from the prompt

- None material. The prompt calls for an "offscreen accumulation canvas faded by a fixed factor each pass"; the shipped build redraws the deterministic pass history each frame instead, per the spec's own adaptation flag, so frame one stays byte-comparable. Visually identical outcome.
- The margin numeral reads "GEN 10" (the current pass index) rather than a bare number, so the count is unambiguous against the date plate.

## QA

Rendered with `node ~/workspace/tools/render-piece.js index.html` at 1280x900, 390x844, and 720x720; all three PNGs read directly.

- Desktop 1280x900: dense mark field edge to edge; ink-black fresh marks on top, pale-silver ghosts beneath, rust marks scattered through and refusing to fade; title plate "Generation Loss / 2006 · 10 · 30" legible top-left; "Watch only." plate bottom-left; margin rule with "GEN 10" bottom-right. No clipping, no empty areas.
- Mobile 390x844: same field, full-bleed, plates legible and not covering the composition.
- Thumb 720x720: same composition, square crop reads well at small size. thumb.png IS the 720x720 render.
- Determinism: two independent 1280x900 renders are byte-identical (md5 32547f118a5f774147bf38526647f0d7 both).
- No post-gate edits; the rendered files are the shipped files.

## Gallery note (for the pusher)

"Each pass fades the field a fraction while fresh marks land; ghosts of earlier generations refuse to die. Watch only."
