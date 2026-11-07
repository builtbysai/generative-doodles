# №1604 "The Hand, Visible Again" (AW5, aluan-wang #211, PP851)

Driver: a brush with no hand re-performs a recorded gesture on blank paper, its line thinning where the hand sped up and blooming where it slowed, on a 55-second loop that closes exactly.

## What was built
- Self-contained index.html (no external assets, no pointer listeners, watch-only). Paper #F5F1E8 full-bleed; ink #141414, wash grey #B9B4A8, one coral stroke #E8734A that rises once, one pink wash #E8B4B8. Nothing else.
- Four seeded gesture variants cycle one per loop. Each variant is six strokes: ink, wash, coral (biased to rise), ink, ink, ink. Hand paths are seeded random walks (mulberry32, fixed seed); the brush tip is a closed-form lagged blend of recent hand points, so tip position, tip speed, and line width are pure functions of piece time with no accumulated state. Width is inverse to tip speed (fast thins to a hairline, slow blooms to wide pools); where width passes a threshold, wash blobs pool, pink on the wash stroke.
- Loop: 45 s painting, 10 s rest, 55 s cycle. During the rest the finished gesture fades to a fresh sheet (fade 47-54 s) so the loop closes exactly (blank at t=0 and t=55) while a new variant begins next cycle. The brush rests at the lower right during the rest and travels between stroke starts during the gaps.
- Frame one is phase-shifted to PHASE=24 s, mid-gesture: three strokes complete (including the coral rise and the pink wash) and the fourth underway, with the brush tip visible on the paper, so the thumb shows ink, not blank paper.
- Paper grain is 420 seeded dots plus 26 faint fibres; strokes carry a soft wash halo under-pass and seeded 4% bristle skips for dry-brush texture.
- House rules: Visual Viewport sizing with resize on visualViewport and window; canvas pinned in draw(); phone detection via window.screen (min dimension < 700 px) with aspect fallback; field composition full-bleed on phones, square on desktop; one synchronous frame at load; rAF guarded by typeof; reduced-motion draws the static frame only. Title, date "2006 · 06 · 03", and hint rendered on the page. No em dashes in visible copy.

## Fix rounds
1. First build: composition good, but the thin wash stroke rendered beaded (segment joints double-covered at low alpha while middles stayed faint), visible on a 2x crop.
2. Fix attempt: denser sampling (N=230, half step) cured the beading but changed the seeded walk, tangling the gesture into a knot with one oversized pink pool. Reverted.
3. Final fix: kept the original 110-point seeded walk and subdivided it to 219 dense points for rendering only (same rng consumption, same geometry, halved speed-profile frequencies, lag offsets doubled). Beading gone, composition preserved. Verified on desktop, mobile, and thumb renders.

## Deviations from the prompt
- None in the visual or interaction spec. Two mechanism choices the prompt leaves open: (a) the sheet fades to fresh paper during the rest so the 55 s loop closes exactly instead of accumulating gestures forever; (b) the spring-damper is evaluated in closed form (lagged blend of the recorded path) rather than frame-integrated, per the batch spec, so frame one stays byte-identical.

## QA
- Rendered with node ~/workspace/tools/render-piece.js from the actual script at 1280x900, 390x844, and 720x720; all three inspected visually. Desktop and thumb show the coral rise, pink wash pools, hairline-to-bloom width change, and the brush tip mid-stroke; mobile is full-bleed with legible captions.
- Determinism: thumb rendered twice, md5 identical (3d13a3bf2cc47f388982306271514693).
- Forbidden-API grep: zero hits for Math.random, Date.now, shadowBlur, or gradients.
