# №1655 "(0+|Phi*|0-)" - process notes

Driver: a near-empty vacuum births and annihilates rare white-gold dots where faint wave trains cross.

## Build
- HF8 (PP902), #217 HAL09999. Spec: `BATCH-1653-1655-SPEC.md`. Title "(0+|Phi*|0-)" verbatim, gallery date 2006 · 07 · 24, gallery note: "Virtual particles flicker into being where wave trains cross, then annihilate. Watch only."
- Event scheduler: fixed seeded schedule (mulberry32, seed 1655), never Math.random at runtime. Poisson-like gaps from the seeded stream, exponential with mean 30 s, clamped to 14..75 s. 49 events over 0..1500 s; 29 of 49 leave an annihilation ring (seeded 60%).
- Event lifecycle, all closed-form in piece time t: 3.5 s approach (two faint wave trains, sets of 5 parallel pale-blue wavefront lines, converge on the crossing point from directions ang and ang + ~1.15..1.45 rad), 1.4 s dot (white-gold core with soft glow, fades in, lingers, fades out; the trains dissolve as it forms), 2.6 s annihilation ring (pale-blue circle expanding 5 to 54 px, fading to nothing; the dot's last breath inside it), then gone. Positions are seeded, off-center by rejection sampling (distance from center > 0.10 in normalized units).
- Blue smoke ribbon: second seeded stream (seed 9021655), mean gap 80 s, first at 57.7 s; each ribbon is a closed-form curl path (sums of sines) drawn as a 36-segment fading trail in translucent ice blue, 8..11 s duration. 2 ribbons in the first 300 s.
- Field: near-black ground #04050a; 7 large soft deep-blue washes (alpha 0.012..0.020) and 760 fixed-seed grain dots (alpha 0.04..0.18, slow closed-form sine shimmer only), so the vacuum has texture without ever reading as stars.
- Audio: silent build. No WebAudio added. The prompt's whisper ping per event has no earned gesture to enable it (watch-only, no pointer input at all), and the spec expects a silent build. Noted here per spec.
- House rules: Visual Viewport sizing with visualViewport + window resize listeners; canvas.style.width/height pinned in px in size(); phone detection via window.screen (min dimension < 700 px) with aspect fallback; field rect is full viewport on phones and a centered square on desktop, page ground the piece's own near-black; fixed PHASE = 6 s first frame, rAF loop anchored as offset + elapsed-since-load, guarded by typeof check; no Math.random, all seeds fixed; no offscreen canvases, no document.createElement; moveTo before every arc; alphas rounded to 4 decimals inside rgba(). Watch-only, strictly: no pointer listeners are attached anywhere (render harness logs only vv:resize and win:resize). Flicker safety: births and annihilations are slow envelopes (seconds), nothing flashes faster than ~14 Hz by construction.

## Acceptance criteria (numbers)
- Frame one at t = 6 s: exactly one event in progress, in approach phase; the vacuum reads calm with faint grain visible, not pure black and not busy.
- Determinism: two fresh loads produce byte-identical event schedules.
- Sparsity: mean interval between births over the first 300 s >= 20 s (measured 25.39 s), min gap >= 14 s (measured 14.00 s).
- Lifecycle: event 0 (birth 8.0 s) is approach at 6.0 and 7.5 s, dot at 8.7 and 9.2 s, ring at 10.5 and 11.8 s, gone at 12.5 s; no events active at t = 20 s.
- Thumb rendered three times at 720x720: byte-identical md5.
- No em dashes, no AI-signature copy, no click-to-reload, no in-piece UI beyond the standard title/date/hint plates.

## What was probed / measured
- Probe harness (/tmp/probe-1655.js, node-canvas, same shim as render-piece.js): determinism true (identical schedule JSON across two fresh loads); 49 events over 0..1500 s; first 6 birth times 8.00, 77.00, 102.27, 130.34, 144.34, 158.34 s; 12 events in the first 300 s, mean interval 25.39 s, min gap 14.00 s, max gap 69.00 s; 29 of 49 events leave a ring; ribbons at 57.68, 217.68, 327.65, 487.65 s (2 in the first 300 s). Lifecycle checks all matched (approach 6.0/7.5, dot 8.7/9.2, ring 10.5/11.8, gone 12.5). Frame-one pixel stats at 1280x900: meanRGB 8.913, litPixels 12,050 (plates account for ~11,100 of the bright pixels; the field itself is near-black grain), brightPixels 11,149. Field rect desktop: FX 190, FY 0, FW 900, FH 900, isPhone false. Listeners: vv:resize, win:resize only.
- Gate renders (render-piece.js): desktop 1280x900, mobile 390x844, thumb 720x720 three times. Thumb md5 7138485470b664d415c6450f3bd973fd on all three runs, byte-identical.
- All three renders visually inspected: desktop shows the vast near-black vacuum with faint deep-blue grain, the two converging wave-train fans off-center upper-left, plates legible, no visible seam at the square field boundary; mobile full-bleed with legible plates; thumb reads the same at small size. Extra time-slice renders inspected: t = 8.7 s shows the small white-gold dot with glow at the crossing point; t = 10.8 s shows the faint pale-blue annihilation ring; t = 62 s shows the ice-blue ribbon curling through the upper right. All quiet and sparse, as briefed.

## Deviations
- Silent audio build, as the task directs and the spec expects: the prompt's whisper ping per event is not built, because a watch-only piece with no pointer input offers no gesture to lazily enable WebAudio, and autoplay is never allowed.
- None otherwise. No prompt demand was found unachievable; the Poisson timing is approximated honestly as seeded exponential gaps from a fixed seed, which is the deterministic form the series requires.

## Fix rounds
- Round 1: probe showed a mean birth interval of 21.28 s with an 8 s minimum gap after the first tuning pass. Raised the exponential clamp floor from 8 to 14 s and the mean from 28 to 30 s. Re-probed: mean interval 25.39 s, min gap 14.00 s, first event unchanged at 8.0 s.
- Round 2: the dot-phase train dissolve drew the converged trains at fixed half strength. Added a fade parameter so the trains fade out over the first 40% of the dot's life.
