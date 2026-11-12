# №1722 Ink Threshold

Driver: one continuous value-noise scalar field, quantized to hard levels; the threshold steps every 8 s and the navy blobs grow, merge and split around the new level while pale striations trace the boundaries.

## Spec

- Prompt: zach-bodtorf PP969/ZB3, EXPANSION #226. Title: Ink Threshold.
- Gallery date: 2006 · 09 · 29 (formula 2002-01-10 + 1723 days).
- Hint plate: "Watch the threshold step."
- Interaction: watch-only, no pointer interaction, never click-to-reload.
- Loop: 48 s period, seamless. Threshold steps every 8 s through 6 levels.
- Frame one: fixed phase t = 8.5 s, just after the step at 8 s (threshold 0.38), so the three blobs read clearly.

## Acceptance criteria (measured)

- Blob count (navy connected components, plates masked out, probed at 720x720): 3 at t=0.5, 3 at t=8.5 (frame one), 3 at t=16.5, 4 at t=24.5, 5 at t=32.5, 6 at t=40.5. Range 3-6 across the loop, inside the spec 3-7.
- Navy area (share of stage): 35.4% at t=0.5, 32.5% at t=8.5, 28.7% at t=16.5, 23.6% at t=24.5, 18.6% at t=32.5, 14.0% at t=40.5. Blobs shrink and split as the threshold rises, then reset at the loop seam.
- Level count: 5 hard levels (3 pink wash bands + navy + striation lines). No smooth gradients anywhere; every band edge is a hard marching-squares boundary.
- Step interval: 8 s. Threshold steps: 0.34, 0.38, 0.42, 0.46, 0.50, 0.54.
- Loop period: 48 s (6 steps x 8 s).
- Striations: pale pink contour lines stroked at all three band boundaries (0.45T, 0.80T, T), hugging every blob edge.
- Field: 6 gaussian bumps on a jittered 3x2 grid (seeded, separated so blobs stay distinct) plus two octaves of seeded value noise (5x5 amp 0.10, 9x9 amp 0.04) for edge wobble. All blobs come from the one field; no random or free-floating shapes.
- Flicker safety: threshold steps are slow (8 s), no strobing, no audio.

## Palette (hand-picked hexes, see Deviations)

- Wash low band: #F8A8CC (pale pink)
- Wash mid band: #EF6FB0 (mid pink)
- Wash high band / page ground: #D63384 (magenta)
- Navy blobs: #16294E (deep navy)
- Striations / title ink: #FBD3E8 (pale pink)
- Hint ink: #F8A8CC
- Plates: #16294E with rgba(249,215,232,0.55) outline

## Technical

- Canvas 2D only, marching squares (90x90 grid) for fills and contour strokes.
- Seeded PRNG mulberry32(1722); no Math.random, no wall clock for frame one.
- House rules: Visual Viewport sizing with resize listeners on visualViewport and window; canvas pinned in draw() via style width/height in px; phone detection via window.screen (min dimension < 700px) with aspect fallback (h > w*1.15); full-bleed on phones, square on desktop; one synchronous frame at load; requestAnimationFrame guarded by typeof check; reduced-motion honored (frame one only).
- Template: №1719 index.html (plate layout, sizing, guard structure).

## QA

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three inspected visually. Desktop: square stage, 3 large blobs, hard edges, striations hugging edges, plates clear. Mobile: full-bleed, blobs read, plates do not collide. Thumb is the 720x720 render output.
- Loop probed with /tmp/probe-1722.js (drawAt at 6 phases + navy component counting): counts and areas above. Two small satellite components counted by the raw probe sit under the navy title/hint plates and are masked out of the reported counts.
- Fix round: first build used random bump placement and thresholds 0.28-0.58; the low threshold merged everything into one giant mass (61% navy, effectively 2 blobs). Fixed by placing bumps on a jittered 3x2 grid with tighter sigmas (0.12-0.17) and raising the step range to 0.34-0.54, then re-probed and re-rendered.

## Deviations from the prompt

- Fragment shader / p5.js pixel pass replaced by canvas 2D marching squares (node-canvas QA has neither WebGL nor p5; same quantized-field result, hard edges preserved).
- Palette hexes hand-picked from the prompt's named colors: studies/zach-bodtorf.md (f04) does not exist in the repo, so no study palette was available to draw from.
- Threshold step values (0.34-0.54) and the 48 s loop period are build choices implementing the prompt's "~8 seconds" step and 4-6 level quantization (5 levels used).
