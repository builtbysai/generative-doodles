# No.1848 "The Third Voice" (TW1, PP1095, #242 theresa-wong)

Driver: one body makes two sounds on a dark stage, an amber thread from the cello and a pale blue thread from the microphone, and where they cross they become a single violet-white hum that brightens and dims with their beating.

## Counts asserted

- Source threads: 2 (amber from the cello f-holes, pale blue from the microphone).
- Merged thread: 1 (violet-white, leaving the merge point and exiting the right edge).
- Merge points: 1, at 0.66 W, 0.30 H, with the magenta stage wash centered there.
- Dust motes riding the threads: 36, seeded (mulberry32, seed 1848).
- Generative voices: 2 (bowed-string sawtooth at 110 Hz through a lowpass, breathy vocal sawtooth at 110.77 Hz through two formant bandpasses plus seeded-noise breath), plus one hybrid hum sine at 220.4 Hz whose gain beats at 0.77 Hz. The 0.77 Hz beat drives both the merged ribbon brightness and the warm/cool balance of the stage wash.

## How it works

- Threads are Catmull-Rom curves sampled into polylines, drawn as three layered strokes (wide faint glow, mid, thin bright core) with a slow perpendicular sway driven by fixed-phase time. Frame one is t = 60.0 s, where the beat phase puts the merged ribbon at 0.98 brightness.
- The cellist is a plain silhouette only: head circle, seated torso blob, two-bout cello with neck and scroll, a thin amber bow line, and a small microphone disc with pale blue rim at her mouth. No facial or body detail. Amber rim light on the warm side, pale blue on the cool side.
- Watch only. The merge happens without the viewer; there is no drag, no click-to-reload, nothing steerable.
- Audio starts only from the Sound plate tap, never autoplay. Reduced motion is respected (no animation loop).

## Deviations from the prompt

- Sound plate retained: the template's tap-to-enable audio control (Sound: off/on, bottom right) is kept even though the piece is watch only. Reason: the prompt requires WebAudio, and the house rules require audio only inside a user gesture. The plate only starts or stops sound; it never steers the merge or any visual.
- Hexes hand-picked from the prompt's named colors (near-black stage #08080B, warm amber #E8A33D/#F5C46A, pale blue #A8C8E8/#D6E6F7, merged violet-white #B9A8F5/#EFEAFF, magenta wash #D6336C). No studies/theresa-wong.md exists in the repo, so there was no study palette to follow.
- 36 faint dust motes added along the threads (seeded, decorative). Not in the prompt; they make the ribbons feel luminous rather than drawn lines.
- Merge point placed upper-right of center (0.66 W, 0.30 H) so the three threads balance on both desktop and phone aspect ratios; the prompt does not fix its position.

## QA

- Rendered with node render-piece.js from the actual script at 1280x900 desktop, 390x844 mobile, 720x720 thumb. All three inspected: title/date plate legible and unclipped, hint "Watch only." and Sound plate legible, figure small and centered, threads cross at the magenta wash and the merged thread exits right, nothing clipped on mobile.
- Fix round: first render failed on a code bug (stringified alpha passed into rgba, which calls toFixed itself); fixed at all eight call sites and re-rendered. Second fix: cello was hard to read against the near-black ground, so the figure fill was lightened to #17151C and an amber rim arc added to the cello's lower bout; re-rendered and re-inspected all three sizes.
- Determinism: thumb.png re-rendered at 720x720 gives the same md5 (854c586d66b1f8029d6d66b77b6ed4bf).
- No em dashes in visible copy. No Math.random, Date.now, or performance.now anywhere in the file; first frame uses fixed phase t = 60.0 s and a seeded RNG.
