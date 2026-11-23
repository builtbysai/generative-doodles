# №115 · Phaseflame - process notes

## Concept
After Lammetje's ArrayPhase. Two hundred twenty vertical columns, each a stack of forty short segments, stand on a deep blue ground. A phase field of layered sines plus noise offsets the stacks, the offset strongest at the base and calming toward the tips, so the columns collectively form rising flame and dune shapes that lick and curl as the field drifts upward. Heat colours only: cream at the hot base through orange to signal red at the cooling tips.

## Construction
- Single self-contained page, no libraries. 2D canvas. Exactly 220 columns of 40 segments (asserted), drawn as small filled rects batched into 18 colour buckets along the ramp #F7E3B0, #F28C28, #E23A2E on ground #14335E. Pure column math, no particle system.
- Per column: offset = A1 sin(x w1 + t) + A2 sin(x w2 minus 1.7t) + A3 noise, with amplitude weighted by (1 minus segment fraction) so the bottom moves most and the top third stays calm; each column also has a seeded height factor from the same noise, so some stacks tower and others crouch. A small per-segment flicker rides on top.
- Drag: horizontal movement shifts the phase (the flames lean), vertical movement scales flame height between 0.45 and 1.75. On release the drag values hold for 4 seconds, then ease back to the autonomous loop. Never click-to-reload.
- Motion and interaction per the prompt. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px every frame; phone detection via window.screen with aspect fallback; full-bleed on phones. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. All three show the woven flame sheet rising from the bottom with cream-to-red height colour and calm deep blue above. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `115/index.html`, `115/thumb.png` (720x720, rendered from the live script), `115/process.md`. Gallery entry for pieces.json: title "Phaseflame", date 2002 · 05 · 06, note "Two hundred twenty columns of short segments rise as flames over deep blue, leaning with a layered phase field. Drag to lean the flames."
