# №1788 "Forms of Paper" (SR5, PP1035): process notes

Driver: two seeded growth fronts draw red and green pencil fiber clusters that breathe along the margins of a full-bleed ruled notebook sheet, watch-only.

## Prompt source

TASKS.md prompt block for steve-roden PP1035, EXPANSION #234 (cron expansion study #234, TASKS lines 23277-23358), as transcribed in BATCH-1786-1790-SPEC.md: a sheet of ruled notebook paper fills the frame; erratic hand-drawn line clusters in red and green pencil grow along the left and right edges like fiber traces or signal paths, short angular segments that branch, hesitate, and overlap, never crossing the ruled lines, always hugging the margins; the clusters breathe, segments extend, fade back, and regrow along slightly different paths; palette notebook white, pale blue rules, red pencil (#C0392B) and green pencil (#2E7D4F), graphite smudge at the edges; full-bleed sheet, ruled lines running horizontally across the whole frame, live clusters confined to the two margins like bookends; watch-only; slow deliberate growth; no audio.

## Build

- Full-bleed notebook sheet, ground #fdfdf6, pale blue rules (#a9c6de) running horizontally across the whole frame. Rule spacing 36 px desktop, 30 px phone. No red margin line, per the prompt.
- Growth fronts: 11 clusters per margin, 22 total, built from one seeded stream (mulberry32 seed 1788). Each cluster is a branching random walk confined to a single rule band: every segment endpoint is clamped to stay at least 3 px inside its band, so no segment ever crosses a ruled line. Total 482 segments: 189 red, 293 green, colors split per cluster by the seeded stream.
- Pencil texture: each segment is drawn twice, a main pass at 0.82 alpha and a lighter offset pass at 0.38 alpha with a seeded perpendicular wobble, line width 1.3 to 3.1 px with pressure variation.
- Breathing: each segment has its own breath period (18 to 32 s) and phase offset. Within a cycle it grows with a hesitation plateau (fast start, pause, finish), holds, then fades to 0.15 alpha. Each segment carries two endpoint variants (A and B); the variant drawn alternates each cycle, so regrowth follows a slightly different path. All motion is a closed-form function of piece time on the fixed seeded tables.
- Graphite smudge: 10 soft radial-gradient smudges along both margins, alpha 0.02 to 0.05, kept deliberately faint.
- Plates on canvas, matching the live №1785 template: title "Forms of Paper", date "2006 · 12 · 04", hint "Watch only." No pointer interaction, no audio, never click-to-reload.
- House rules followed: Visual Viewport sizing with resize listened to on visualViewport and window; canvas element pinned in draw() via canvas.style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback; one synchronous frame at load; requestAnimationFrame guarded by a typeof check; deterministic fixed-phase first frame.

## Frame one

Fixed phase at t = 60 s. Both margins carry established clusters mid-breath: a mix of fully extended segments, segments mid-growth, and segments fading. Growth-front tables: mulberry32(1788), 22 clusters (11 per margin), 482 segments, 10 smudges; breath periods 18 to 32 s per segment; fade/regrow schedule per segment is grow with hesitation over the first half of its period, hold to 0.65 of the period, fade to 0.15 alpha by period end, variant alternating each cycle. Frame one verified byte-identical across repeat renders at 1280x900 and 720x720.

## Deviations

- None from the prompt. One build fix during QA, not a prompt deviation: the first render read too sparse and the smudges too blotchy, so cluster count went from 8 to 11 per margin, chains lengthened, and smudge alpha lowered. A latent bug was also fixed in the same round: the variant B endpoint clamp used a hard-coded band ceiling that could have pushed a regrown endpoint across a ruled line; it now clamps to the segment's own rule band.

## QA

- `node ~/workspace/tools/render-piece.js index.html 1280 900` desktop: ruled paper fills the frame, red and green fiber clusters hugging both margins, plates legible, no rule crossings, smudges faint. Good.
- `node ~/workspace/tools/render-piece.js index.html 390 844` mobile: same composition full-bleed, clusters visible in both margins, title and hint plates legible. Good.
- `node ~/workspace/tools/render-piece.js index.html 720 720` thumb: clusters read clearly at thumbnail size, rules and plates legible. Good; thumb.png is this render.
- Determinism: repeat renders at 720x720 and 1280x900 produced identical md5s.
- Re-gated after the density/smudge/clamp fix round; the renders above are from the final file.
