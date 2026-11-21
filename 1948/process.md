# №1948 Silence Obliterated by Noise

Prompt block: LR5 / PP1195, study #254 lucy-railton.

Driver, in one sentence: a held silence bed, a thin bone-white line low across a chapel grey field with the faintest machinery hum, is interrupted by full-field noise walls of industrial rust and dark machinery texture that slam across the screen and recede, leaving the thin line again; drag upward raises a pressure parameter that makes the bursts more frequent, longer, and denser, and release lets the silence reassert itself, so the piece feels like machinery interrupting a chapel, not a glitch screensaver.

## Palette

Named colors from the prompt, hand-picked hexes: bone white #f2efe6 for the silence line and the hint pill; chapel grey #cfccc2 to #b0ab9d for the field, with #8a867c as the faint shadow under the line; industrial rust #8a3b1e, #a34d24, #5e2a14 for the noise blotches and the pressure fill; machine black #1a1a18 for the wall ground, the plate ink, and the ribs; steel #6e7a80 and #9aa4a8 for the bars, hatch, rivets, and gauge track.

## Mechanism

- Silence bed: a vertical chapel grey gradient. The thin bone-white line runs low at y 0.82 H across the full width, with a 2 px stroke and a slow sine wobble (0.5 rad/s, amplitude 1.5 px at rest). A fainter hum trace sits 14 px above the line at 0.9 rad/s. The line's wobble amplitude grows to 5 px at full pressure, so the hum gets louder as the machinery is pushed closer.
- Burst schedule: candidate bursts start every 4.7 s from t = 14. Candidate k fires when its seeded hash is under the fire probability, 0.22 at rest rising to 0.90 at full pressure. The first candidate always fires, so the piece is guaranteed to speak. Duration grows with pressure, 1.2 s at rest to 4.5 s fully pushed, times a seeded factor of 0.8 to 1.2. Envelope: 12 percent attack, hold to 55 percent, then a linear decay to zero over the last 45 percent, so every burst decays fully back to the bed.
- Noise wall: machine black ground at 0.88 alpha times the envelope, arriving edge to edge. During attack the wall sweeps down from the top; during decay it recedes upward, with a bright rust leading edge while it is moving. Rust blotches, steel bars, vertical machine ribs, a rivet grid, and diagonal scored hatch are drawn from a PRNG seeded per burst and per 6 Hz quantized time step, so the wall shudders like machinery rather than strobing. Density scales with pressure: 14 rust blotches, 10 bars, 8 ribs, 30 rivets at rest; 40 blotches, 32 bars, 26 ribs, 120 rivets fully pushed.
- Interaction, drag: pointer movement upward raises pressure, 0.004 per pixel, so a 250 px upward drag reaches full pressure. Pressure decays exponentially toward 0 with tau 5 s once the drag ends, so release lets the silence reassert itself. A thin steel gauge track at the right edge fills in rust to the current pressure, giving the drag a visible readout.
- Audio: visual only, no WebAudio. The prompt's silence bed and noise engine are realized as a closed-form visual sound model, per the Franke audio rule. No click-to-reload; drag never reloads.

## Determinism

- FIRST_T = 6. At t = 6 the silence bed is held and no burst is active: the first burst starts at t = 14, the second rest burst at t = 28.1. The line sits low, the hum is faint, the field is still.
- Seeded PRNG mulberry32(1948), fresh instances per draw from the piece number, burst index, and quantized time step; every frame is a pure function of t plus the pressure state, which starts at 0, so frame one is fully reproducible. Pressure is the only state, and it only exists after interaction.
- Texture churn is quantized to 6 Hz, hum at 0.5 to 0.9 rad/s, all under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: location.search reads ?p= to set pressure at load and ?seed= to vary the texture seed. window.__draw drives draw() with a virtual clock, and window.__piece1948 exposes pressure(), setPressure(v, t), burst(t), burstCount(t0, t1, p), redraw(t), and firstT.

## Acceptance criteria, as numbers

- Frame one: t = 6, no burst, pressure 0. Second 720x720 render byte-identical to thumb.png, md5 04db514fa1892b4aa6457a9172657611.
- Burst schedule at rest: 4 bursts in the window t = 14 to 60. Under full pressure: 9 bursts in the same window. First rest burst k = 0 starts at t = 14, duration 1.08 s, envelope 1 at t = 14.5, no burst at t = 16.5.
- Burst vs silence pixels differ: t = 14.5 md5 86cd23adaa952d8cc056c88f06df0d56 (burst, env 1) and t = 14.8 md5 ab177ede5e6c7fc6a79ebc3b6952fc08 (burst, env 0.58) vs silence t = 6 md5 04db514fa1892b4aa6457a9172657611, and decay t = 16.5 md5 bf475858cc20188ee67291f3a1d0bea0, which is the silence bed again with the line restored.
- Drag probe: simulated upward drag from (360, 600) to (360, 350), 250 px, pressure 1.000 at the end of the drag, 0.905 at redraw t = 6.5, md5 3f145336a31c015f19cfdc6888c63394, different from the silence frame. The gauge fills in rust to about 90 percent and the line wobble visibly grows.
- Pressure density probe: ?p=1 at t = 14.8, burst env 1, duration 4.05 s, md5 d9fca194d0afd863ff87403fac1a7cdf, a wall far denser than the rest burst at the same time.
- Release probe: pressure 1.000 at t = 20, redrawn at t = 32, pressure 0.091, md5 b0231578ccd965dd8d9c2877eb1eb07f, the silence bed restored and the gauge nearly empty. Decay tau 5 s confirmed: exp(-12/5) is 0.09.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible, no collisions, hint readable on its pill on all sizes, field full-bleed on the phone and square on desktop, the thin line low across the full width, the gauge track visible at the right edge.
- Burst frame at t = 14.5 inspected: full-field machine black wall, rust blotches, steel bars, vertical ribs, rivet grid, diagonal hatch, plate ink flipped to bone white and legible. Decay frame at t = 16.5 inspected: fully back to the silence bed, line restored, no residue.
- Full-pressure frame (?p=1, t = 14.8) inspected: the wall is far denser than the rest burst, with many more blotches, bars, and rivets, and the gauge filled in rust.
- No em dashes in visible copy or in this file.

## Fix rounds

1. The first burst render showed the title in machine black over the near-black noise wall, nearly illegible during a burst. Plate ink now flips to bone white whenever the active burst envelope is above 0.4. Re-rendered and re-gated; the burst plate is legible and the thumb md5 is unchanged, so frame one was unaffected.

## Deviations from the prompt

- The prompt calls for a silence bed of faint sine and sparse bowed tones and a granular noise engine. The piece realizes both as a closed-form visual sound model with no WebAudio, per the Franke audio rule; the visible behavior matches the prompt (held line, hum, structured bursts, full decay) without sound.
- The prompt names no burst times, densities, or gauge. The candidate grid (first burst at t = 14, every 4.7 s), the fire probabilities (0.22 at rest, 0.90 pushed), the durations (1.2 s to 4.5 s), and the right-edge pressure gauge are invented staging for the named mechanism, so the pressure control has a visible readout.
- The noise texture is drawn vector shapes (blotches, bars, ribs, rivets, hatch) rather than sampled industrial audio; it reads as machinery texture, not as a glitch screensaver.

## Known warts

- At full pressure the wall is very dense and can feel busy; the rust blotches, bars, and rivets overlap heavily at the top of the frame.
- A rust blotch can sit directly under the title during a burst; the plate ink flips to bone white to compensate, but the title can still sit on a blotch edge.
- The gauge track is a thin grey line visible even at rest, a permanent vertical mark on the right edge of an otherwise empty field.
- The silence bed is intentionally near-empty, so the thumb reads as mostly blank grey with a thin line; the piece only shows its character once the first burst arrives at t = 14.
