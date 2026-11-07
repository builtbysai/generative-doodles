# No.1611 "Print Scale / Room Scale" (JL4, jinyao-lin #212, PP858)

Driver: scale is a decision, not a slider; the mechanism is one identical fan field shown at exactly two framings, switched by a 3s camera push on tap.

## What was built

One fixed fan field, built once from a seeded mulberry32 RNG (seed 1611007): a jittered 7x9 grid over a 1.0 x 1.5 field plus a looser 6-fan cluster near (0.55, 0.75), where the room-scale camera settles. Each fan is 9-13 tapered quadrilateral blades radiating from a node, each blade with a centre crease line, middle blades longest so the silhouette reads as a paper fan. Blades sway slowly out of phase, with sway phase coupled to grid position so neighbours move like a canopy.

Two framings of the same field, never an in-between rest state:
- Print scale (frame one): pale ground #D5E2E8, slate-blue blades #6E8A9E with deep blades #233038; the full field width is shown, about 33 fans visible on desktop, each 10-14% of frame width. A botanical specimen sheet.
- Room scale: near-black ground #0B0E12, dark blades #3E5566 with pale highlight blades #A8C4D8; the camera shows a fixed visible area around the cluster, 7-8 fans at 30-50% of frame, cropped by the edges. A storm of huge dark fans.

Tap switches scale: a 3s camera push interpolates camera rect and palette (smoothstep) between the two fixed endpoints. The switch is a closed-form function of piece time and the recorded tap times, so at rest the piece sits exactly at one scale or the other. Tap again returns. No other interaction, no click-to-reload.

House rules: self-contained index.html; Visual Viewport sizing with resize on visualViewport and window; canvas pinned in draw() via style width/height in px; phone detection via window.screen (min dimension under 700px) with aspect fallback; field-like composition full-bleed on phones and desktop (the field is 1.5 tall so tall phone frames stay full-bleed with no empty bands); one synchronous frame at load; requestAnimationFrame guarded by a typeof check; seeded RNG only, no Math.random, no Date.now; fixed-phase first frame; prefers-reduced-motion honoured with a typeof-guarded matchMedia check. Gallery date is 2006-06-10, displayed as "2006 · 06 · 10". Title, date and hint are drawn over small ground-coloured label plates so they stay legible where fans pass behind them.

## Fix rounds

1. First render: blades were narrow and widely spaced, so the fans read as spiky thistles, and the title/hint text collided with blades. Widened the blades (mid-blade half-width 13% of blade length), raised the blade count to 9-13 with a narrower spread, and put title, date and hint on ground-coloured label plates.
2. Second render: print scale read botanical, but the room-scale test render merged into flat slate blobs because the deep blades were lerped to the same colour as the regular blades. Reworked the room palette mapping: deep blades become the pale highlight #A8C4D8 at room scale, with a near-black crease, so fans keep separating. Also spread the room-focus cluster wider (6 fans, radius up to 0.18, 0.85 size) so it reads as a loose thicket in print scale instead of one dark knot.
3. Third render (all sizes plus a room-scale test render from a tap-injected copy in /tmp): print reads as a specimen sheet of creased paper fans, room reads as huge dark fans sweeping a near-black field, mobile is full-bleed with no empty bands. Accepted.

## Verification

- Rendered 1280x900, 390x844, and 720x720 from the actual script; all three inspected visually.
- Room scale verified with a tap-injected copy (taps.push(-1) before the first draw, /tmp only, shipped file untouched): 7-8 huge fans, cropped by the edges, highlight blades separating.
- Determinism: thumb rendered twice, md5 identical (4aaa826f641bee4afd1a4a10f2cf1112).
- Forbidden-API check: no Math.random, no Date.now, no gradients, no shadowBlur, no reload. The only listeners are the required resize listeners plus pointerdown/touchstart for the tap.

## Deviations from the prompt

- Autumn variant not implemented as a third state: the prompt allows it as a third mint, but the brief fixes tap as a two-state switch (tap goes to room, tap again returns), so the piece commits to exactly the two specified palettes.
- Fan counts and sizes are approximate at the edges of the prompt's ranges: print shows about 33 fans on desktop (about 40 on the square thumb) at 10-14% of frame; room shows 7-8 fans at about 29-50% depending on screen aspect, because a single uniform field cannot hit every range exactly on every aspect. The two committed framings read as botanical vs. storm as specified.
- The room-scale camera holds a fixed visible area (rather than a fixed width) so the fan count stays in range on portrait phones as well as desktop.
