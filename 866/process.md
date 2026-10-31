# No.866 — Recorded From Somewhere

Study #106 lim-giong, PP27 "Night Market Xianchang": his on-the-scene poetics — real recorded places as instruments, the night-market ambience of *Insect Awaken*, the Three Gorges boat collisions translated to light. The piece is a documentary of where it is running; it never explains its inputs.

## Concept

A dark field of 620 small marks (dots and short dashes) fills the frame edge to edge — no frame, no border, no centre object. The place is the composition. How many marks burn bright, how warm they run, and how fast they drift all come from a simulated place-state:

- **Ambience** — a slow weather level that swells and lulls over minutes. Loud means a denser bright population and faster drift; quiet means sparse, dim, slow.
- **Day cycle** — a full simulated day compressed into 24 minutes eases the palette between mark warm `#D8A03C` (day/loud) and mark cool `#3C5A6E` (night/quiet), each mark keeping its own warm/cool bias so the field never flips as one.

At peak ambience a seeded few marks (5%) flare deep red `#6E1F24`. Seeded ambient transients — the ambience's own boat collisions — flash a local cluster on a slow cadence tied to ambience height. Nothing changes instantly: every state eases over seconds, weather rather than switches, and no input is ever read out on screen (no meters, no clocks — the place reads only in the marks).

Interaction:

- **Watch-only** by default — a pure documentary loop, always recording.
- **Drag** disturbs the recording: the path stirs marks into a slow swirl that settles back over seconds.
- **Tap** is a collision: a sharp local burst at the tap point, marks flashing outward in collision flash `#E8E2D4` with an expanding ring.
- **Double-tap** reseeds the field and the place-state (new epoch).
- **Sound** (first gesture only): a granular bed whose density tracks the lit mark population, plus short metallic pings on collisions and ambient transients.

## Construction

Single self-contained `index.html`, canvas 2D only, strict five-colour palette: night base `#060607`, mark warm `#D8A03C`, mark cool `#3C5A6E`, collision flash `#E8E2D4`, deep red `#6E1F24` (peak ambience only). No gradients, shadowBlur, filters, or offscreen canvas anywhere. No text except the `<title>`.

**Simulated-place model (the no-mic route).** The prompt offers device inputs with a graceful fallback to a simulated ambience; house rules forbid microphone input in gallery pieces, so the simulated route is the shipped route. The day cycle is likewise simulated from the piece clock rather than read from the device clock, which keeps every frame deterministic and makes a loud noon and a quiet midnight both reachable inside one sitting. Ambience is closed-form: A(t) = clamp01(0.45 + Σ aₖ(sin(ωₖt + φₖ) − sin φₖ)) over three seeded sine terms (periods ~150–620 s), so A(0) = 0.45 exactly. Warmth is a cosine over the simulated day, anchored at day phase 0.718 (late afternoon), giving warmth ≈ 0.80 at frame one. Drift distance is the closed-form integral of the drift speed 0.30 + 1.25·A(t), so mark drift literally accumulates the weather the place has had.

**Marks.** 620 seeded marks (mulberry32, field seed 866027 + epoch × 7919): 42% gather around seven seeded cluster centres (the patchiness), the rest spread uniform; every mark carries a drift vector near the epoch's prevailing wind, a lit threshold, a flicker phase, a wander phase, a warm bias (±0.4), and a flare flag. A mark's brightness eases across a 0.16-wide threshold ramp against the population level P = 0.95·A + 0.03, so population changes read as weather fronts crossing individual thresholds, never as switching. Positions are wrapped unit-space: base + drift vector × drift distance + small sinusoidal wander.

**Interaction model (closed form).** Drags are recorded as stir samples (position, carry velocity, time); a frame evaluates each mark's swirl offset as a sum over live samples — tangential flow plus velocity carry, Gaussian falloff (σ = 0.16·S), exponential settle (τ = 5 s, gone by 9 s), total offset clamped to 0.085·S. Bursts (taps and ambient transients) are recorded events with the same evaluation for every mark: flash = Gaussian falloff × exp(−2.1·age), push following u·e^(1−u) peaking at 0.5 s. Any frame can be recomputed from the seed, the place functions, and the event lists alone; nothing is frame-integrated.

**Audio.** Created lazily inside the first pointerdown; all `AudioContext` use typeof-guarded and wrapped in try/catch. The bed is short bandpassed noise grains (450–2750 Hz, Q 7) scheduled from the rAF loop at a rate that tracks the lit population (mean interval 0.55 s → 0.05 s). A ping is two sine partials (f, 2.756f) with a 0.55 s exponential decay. Ambient transients ping as their seeded times pass, scaled by their ambience-weighted amplitude. The piece renders and runs completely silent where no AudioContext exists.

**House rules.** Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size pinned in px inside `draw()` every frame; phone detection via `window.screen` (min dimension < 700) with aspect fallback (phones get marks ×1.35 for legibility; the field is full-bleed at every size). rAF is typeof-guarded.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png). All render cleanly in silence (the harness has no AudioContext and no rAF; only the synchronous frame-one draw runs).
- **Determinism:** thumb.png rendered twice and `cmp` byte-compared — identical, re-verified after every tuning round. Frame one is the synchronous `draw(0)`: ambience 0.45, warmth ≈ 0.80 (late afternoon), drift distance 0, no events. No `Date.now`, device clock, or wall-clock value feeds any drawn state; time is elapsed-since-load and frame one is t = 0.
- Read-back, round 1: correct structure (full-bleed mark field, warm cast, one loose lower patch) but the field read as sparse embers — most marks sat at the 0.045 alpha floor and effectively vanished, and dashes read scratchy-long. Fixed: marks enlarged (1.7–3.9 units), dash length shortened, per-mark warm bias widened to ±0.4 so slate-cool marks read against the gold even in the afternoon, cluster share raised to 42%.
- Read-back, round 2: marks present and the warm/cool mix read, but the unlit half of the population still dropped out, leaving the perceived density well under the recorded 620. Fixed: alpha floor raised to 0.15 and the lit threshold given a +0.08 population offset, so at mid ambience the unlit marks remain visible as dim recording texture.
- Read-back, round 3 (final): a dense recording texture edge to edge at all three sizes — warm gold and cool slate small marks, a denser patch gathering lower-centre, no centre object, no text; mobile holds the field with nothing clipped. No further changes.

## Deviations

- **Simulated ambience instead of device inputs** (microphone loudness, real clock, device motion): the prompt explicitly sanctions the simulated fallback ("it must work beautifully on simulated ambience; the mic is an enhancement, never a gate"), and house rules forbid mic input in gallery pieces. The simulation is anchored and seeded, so the documentary is of a place that behaves like a place — it is simply not the room the screen happens to be in. Pointer velocity stands in for device motion in the one place motion is felt: drag stirs.
- No other deviations. Palette, mark count (~600), watch-only default, drag/tap/double-tap mapping, transient behaviour, deep-red-at-peak rule, and the no-readout rule are all as specced.
