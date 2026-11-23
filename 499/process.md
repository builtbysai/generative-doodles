# №1580 Shibuya, Accumulated (ayumu-nagamatsu AN5, PP827, expansion #208)

## Build
- Self-contained `index.html` (canvas 2D only, no external assets, no audio),
  built from the №1575 template shell: Visual Viewport sizing with resize
  listeners on visualViewport and window, canvas pinned in `draw()` via
  `canvas.style.width/height` in px, phone detection via `window.screen`
  (min dimension < 700px) with aspect fallback, full-bleed field on phones
  and desktop, seeded RNG mulberry32 with seed 1580, one synchronous frame
  at load, `requestAnimationFrame` guarded by a typeof check.
- 60 agents on horizontal lanes inside the live "now" band (top 11% of the
  field). Each agent is a pure function of time: wrapped horizontal position
  with slow net drift plus a slow sinusoidal wobble, seeded colour
  (amber / headlight white / signal red / occasional teal) and size.
- Slit-scan, closed-form: for each agent, past positions at 0.18 s steps
  are sunk downward at 5% of viewport height per second, so the trail at
  any time t is reproducible from t alone. Alpha swells just below the band
  then decays with age (old streaks sink and fade); smears widen slightly
  with age; varied trail lengths and start offsets make the field denser
  toward the bottom. Additive ('lighter') compositing lets overlapping
  streaks brighten into ghost buildings. Where nothing moves, the field
  stays black.
- Tap anywhere reseeds the traffic field (seed = 1580 + tapCount * 7919,
  deterministic per session state). Never reloads the page.
- Caption chip: "Shibuya, Accumulated · 2006 · 05 · 10 · Tap for a new
  rush hour." Gallery date 2006 · 05 · 10 (formula 2002-01-10 + (N+1) days).

## Deviations from the prompt
- The prompt's literal mechanism (copy a 1px slice into an accumulation
  buffer shifted down 1px each frame) is implemented as closed-form trails,
  not a persistent buffer: a frame-history buffer would make frame one
  depend on prior frames and fail the deterministic byte gate. The visible
  result is the same accumulation downward. (Also required by the build
  brief and the batch spec's AN5 adaptation flag.)
- On-page caption chip is included per the build brief's hint-text
  requirement, although the batch spec says gallery notes carry the cues;
  the brief governs.
- Agent net drift is deliberately slow (0.0015-0.0045 field fractions/s)
  so sunken trails read as near-vertical streak-buildings; visible motion
  in the live band comes from the wobble plus the slow drift. First build
  used fast agents (up to 0.095/s) and the QA renders showed diagonal
  streaks, which the prompt forbids; speeds were cut and the piece
  re-rendered and re-inspected.

## QA
- Rendered the actual script with node ~/workspace/tools/render-piece.js
  at 1280x900 desktop, 390x844 mobile, 720x720 thumb. All three PNGs
  inspected visually: vertical streak-buildings on a black field, denser
  toward the bottom, live blob band at the top with a faint divider, no
  horizontal streaks, no clipping, caption legible at all three sizes.
- Thumb byte-identical across two consecutive renders of the same script
  (md5 748953c4cad36f4904311800111ab035 both times).
- index.html md5: f488e6169a9916db55fddcded91a8bee (final file, after the
  speed fix).
- Nothing pushed; files staged only, per the task brief.

## Status
- Staged at ~/workspace/goals/generative-doodles-backfill-from-9067/hidden_files/build-an5/1580/
  (index.html, process.md, thumb.png). Ready for the parent run to push
  and verify live.
