# №1763 "Skylark Archive" (PP1010, SS4, simon-scott) - build notes

## Spec
TASKS.md prompt block simon-scott SS4 (PP1010). Date 2006 · 11 · 09. Watch-only.
Gallery note: "Thin song traces spiral up from a dark peat margin and thin out one by one until the last few climb highest in amber. Watch only."
Study: studies/simon-scott.md, mechanism 7: skylark grief, Apart; father died April 3 2020, skylarks recorded at New Decoy 48 hours later, archival urgency for a declining species.

## Driver
An archival countdown written in ascent: a vast pale sky holds thin song traces that spiral upward from a dark peat margin, and over one long cycle the population thins one trace at a time while the last three climb higher and warm to amber before fading, then the archive reseeds.

## Build
Canvas 2D, structure/sizing/plates/guard patterns mirrored from live №1759.
- Ground: morning-grey sky #D8D5CE. Bottom margin: dark peat brown #33291D band, horizon very low (7% of height, min 48 px desktop / 56 px phone), with a pale 1 px horizon rule. Traces in ink black rgb(27,27,27) fading to pale silver rgb(176,176,180) at their peaks; the three final traces warming to soft amber rgb(198,152,92).
- 24 traces, each an upward-spiraling path: a main sine waver (2.4-5.0 cycles over the climb) plus a finer curl harmonic (6-11 cycles), amplitude growing with height so the line curls more near the top, slow phase drift over time so the traces breathe without flicker. All parameters from a seeded mulberry32 RNG (seed 1763); no Date.now()/Math.random(); no unseeded randomness anywhere.
- Origins stratified across the margin and seeded-shuffled, so traces are scattered along the whole margin and the three final traces do not bunch at one edge.
- Cycle 120 s, closed-form functions of piece time throughout. Population: 24 traces at cycle start, dropping one every 4.6 s from t = 12 s (drop times 12 + i*4.6 for the 21 ordinary traces), so 3 remain alone from t = 104 s; each drop fades over 2 s. The final three fade out 116-120 s as the cycle closes, then everything reseeds at the wrap.
- Climb height tied to scarcity: height stretches by up to 30% as the population thins, and final traces stretch a further 22%, so the last traces climb nearest the top. Final traces warm to amber as the population falls (warm 0.55 at full population, rising toward 1.0 as traces drop).
- Each trace rises from the margin over 9-16 s after a staggered birth (0.35 s apart by index), then holds its height; alpha fades from 0.85 at the base to near 0 at the tip so every trace dissolves near the top.
- Frame one: fixed phase t = 60.0 s, population 13 of 24, visibly thinned with gaps where dropped traces stood, two amber final traces climbing highest. No Date.now()/Math.random(); seeded RNG only, so frame one is byte-reproducible.
- House rules: Visual Viewport sizing, resize on visualViewport and window, canvas pinned in draw() via style width/height in px, phone detection via window.screen min dimension < 700px with aspect fallback (h > w*1.15), field-like full-bleed composition, one synchronous frame at load, requestAnimationFrame guarded by typeof check, reduced-motion respected (still frame), title/date/hint plates drawn on canvas against the dark peat margin so they read on the pale sky, no pointer handlers at all (watch-only, no click-to-reload), no em dashes in visible copy, no AI-signature copy. Fading alphas rounded to 4 decimals before stringifying; traces drawn as moveTo/lineTo segments, no batched arcs.

## Periods (seconds)
- Cycle 120. Drop schedule: one ordinary trace every 4.6 s from t = 12 s to t = 104 s, each fading over 2 s. Final three hold alone 104-116 s, fade 116-120 s. Reseed at the wrap.
- Rise durations 9-16 s per trace, births staggered 0.35 s apart. Waver phase drift 0.05 rad/s (main) and 0.09 rad/s (curl); amplitude breathing 0.11 rad/s. All motion well below 14 Hz by construction.

## Deviations from the prompt
None. No literal birds anywhere (the trace is the song, not the bird); no narrative overlay beyond the thinning itself. Trace origins are stratified-then-shuffled rather than purely random, so the margin reads evenly scattered on every size; the population schedule, palettes, and watch-only interaction follow the prompt exactly.

## QA
Rendered with node ~/workspace/tools/render-piece.js from the actual script; all three PNGs read and inspected.
- Desktop 1280x900: pale morning-grey sky, 13 thin traces spread across the full width rising from the peat margin, ink at the base fading to silver at the peaks, three amber traces climbing highest and nearest the top, visible gaps where dropped traces stood, title/date plate and "Watch only." hint legible on the dark peat band, nothing clipped.
- Mobile 390x844: same composition full-bleed, traces legible across the width, amber finals visible, plates fit and read, nothing clipped.
- Thumb 720x720: same composition, traces and plates legible; thumb.png IS this render.
- Determinism: desktop render repeated, md5 identical (7f69e96d1adb8e7a8c4d44016a02d773 both runs).
- One fix round: first build clustered traces toward the middle (pure random origins); origins changed to stratified-then-seeded-shuffled and all three sizes re-rendered and re-inspected. No post-gate edits (process.md only).

## Files
- index.html - 9,390 bytes
- thumb.png - 720x720 render
- md5 index.html: fd9404e30728bc4c62d303e3cfd743f9
- md5 thumb.png: fe3fb45b98e1ec2f9504b63b530d9148
