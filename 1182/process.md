# №1182 — Rubber Chicken Orchestra

Jason Soliday study block SD7, after the "thirteen for twenty-five" liner notes (the Ryan Dunn duo): "concrete clatter and squall... a flock of rubber chickens, artificial ducks, squeal and squawk." Six absurd domestic objects sit on a shelf as flat icons — rubber chicken, toy accordion, squealing wheel, rubber duck, finger-fried circuit board, degreased gear — and each one is an instrument whose sound is drawn instead of heard. Only one performs at a time. A tiny conductor's baton at the end of the shelf taps twice before every handoff.

## The turn stream

Turns are addressed, not accumulated. Turn *j* is derived from seeded hashes of (masterSeed 19, *j*): its instrument is picked from the hash stream with the previous turn's instrument excluded (no repeats, ever), and its duration is 3.00–6.00 s in 0.25 s steps. Turn start times are cumulative sums, walked on demand — the state at any piece time *t* is a pure function of *t* plus the visitor's tap list, with no frame-integrated state. Turn 0 is the chicken (6.0 s), so the first frame lands mid-squawk.

Tapping an object steals the turn: the tap is recorded as (time, instrument), the interrupted turn is abandoned, the stolen turn runs its full hashed duration from the tap, and the stream re-anchors — subsequent turns continue from the next stream index, their no-repeat rule now measured against the stolen instrument. Re-anchoring is implemented as a segment list rebuilt from the tap list each frame, so it is deterministic given the taps.

## Emissions

Each instrument's emission fills the upper screen, centred over the performer, and is a closed-form function of turn-local time τ:

- **Chicken** — concentric squeal rings in #FF9F1C expanding at 95 px/s, nine rings phased 38 px apart, alpha falling with radius, plus a jagged squawk zigzag at the centre that pulses with the beak's 0.3 s open/close steps.
- **Accordion** — six zigzag creak lines fanning upward, each spawning 0.65 s after the last, growing to a fixed reach and fading over 2.4 s; the shelf icon's bellows breathe in the same rhythm.
- **Wheel** — a spinning dashed ring, and spark bursts every 0.4 s: nine seeded rays per burst that stretch and die in 0.75 s.
- **Duck** — quack bubbles rising from the emission centre, one every 0.5 s, wobbling sideways on a hash-seeded drift, swelling and fading over 3.4 s.
- **Circuit** — a cloud of ~110 glitch pixels in four greens, re-scattered every 0.12 s from hashes of (turn, step), so the sputter is stepped, never smooth.
- **Gear** — two saw-tooth wave rows grinding in opposite phase directions across the screen, with a ghost gear outline turning at the centre.

Emissions fade in over the first 0.25 s of a turn and out over the last 0.8 s. The performing icon animates in sympathy — chicken tilts and snaps its beak, bellows spread, wheel and gear rotate, duck bobs, circuit LED blinks — while idle icons sit dimmed at 55% alpha. During the final 0.5 s of a turn the baton dips twice (two 0.18 s taps) to hand off.

## Determinism and house rules

- First frame is drawn synchronously at the fixed phase T0 = 1.9 s (inside turn 0): chicken mid-squawk, beak open, squeal rings mid-expansion across the upper screen, baton at rest. The rAF loop is `typeof`-guarded and anchored as T0 + elapsed since load; seeded hashes are the only randomness.
- Canvas size comes from the Visual Viewport API with resize listeners on both `visualViewport` and `window`; `canvas.style.width/height` are pinned in px in `draw()`. Phone detection via `window.screen` physical size (min dimension < 700 px) with the `h > w·1.15` aspect fallback; on phones the shelf wraps 3+3 across two shelf rows and the baton moves to the end of the lower row.
- No gradients, no `ctx.filter`, no shadowBlur, no `createElement`, no ImageData or offscreen canvas, no audio, no microphone. Every arc is its own path with a `moveTo` before it, per the node-canvas batched-subpath lesson. Silent by design.
- Visible text is only the title and the six object names (the active name set bold and bright).

## QA

- `thumb.png` rendered twice at 720×720 and byte-compared (`cmp` identical); desktop (1280×800) and mobile (390×844) renders read by eye: shelf with six labelled flat icons, chicken mid-squawk with beak open, concentric rings filling the upper screen, baton at rest at the right end of the shelf; mobile holds the same read in the 3+3 wrap.
