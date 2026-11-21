# №1953 The Errant Pipe

Prompt block: TC2 / PP1200, study #255 tom-challenger.

Driver, in one sentence: a dark church interior holds an unbroken band of silver organ pipes across the top sounding an endless drone, while below a single pale blue breath-phrase arcs and falls as a lung-like swell that the visitor sustains by pressing and holding, and the phrase always runs out because the sax must breathe and the organ never does.

## Palette

Named colors from the prompt, hand-picked hexes: pipe silver #c8ccd2 with shaded side #8f959d and deep shadow #6a6f76; candle amber #e8a33d with dim amber #b97e2a; stone dark grey #333338 to #1c1c1f with mid stone #26262a; breath-phrase pale blue #a8c8e8 with dim pale blue #7fa3c4; plate ink warm off-white #e8e4d8; hint pill pale stone #d8d4c6 with dark ink #1c1c1f.

## Mechanism

- Church interior: stone gradient wall, two tall arched windows glowing faint amber on the sides, and a dark floor band at the bottom where seven candles stand and flicker slowly.
- Organ: an unbroken band of silver pipes across the top third, two ranks of 26 pipes each with seeded heights, rounded caps, and dark mouth slits, held in a dark case frame. The drone never stops: each pipe carries a slow shimmer at 0.6 rad/s, and faint silver lines drift down from the pipe mouths as the endless wind tone made visible.
- Breath-phrase: a pale blue sine-dome arc through the lower two thirds, rising from the left floor and falling to the right floor, its height the phrase height h. A lung-like swell of layered glow ellipses sits at the arc apex and expands and contracts with h. While the phrase is held high, thin keen ticks branch off the arc, long held tones against the drone.
- Sax: one more pipe, except it must breathe. A small amber sax silhouette stands at the left foot of the arc with its bell aimed up the phrase, and a thin pale line joins its bell to the arc while the phrase lives.
- Press and hold: pressing anywhere captures the current breath state and starts the hold. While held and capacity remains, the phrase climbs toward its peak and capacity drains at 1/6 per second, so a full hold lasts at most 6 seconds. Releasing lets the phrase fall at 0.45 per second and capacity refills at 1/8 per second. Capacity always runs out: when it hits 0 the piece enters an exhausted state and the phrase falls and stays dead until capacity refills past 0.5, so holding forever earns only short gasps separated by dead air, never a sustained tone.
- Capacity gauge: a thin bar at 0.83 H showing remaining breath, pale blue while it holds, amber when nearly spent, labeled "breath" and reading "breath spent" at zero. No click-to-reload; press and hold never reloads.
- Audio: visual only, no WebAudio. The drone, the keens, and the held tones are a closed-form visual sound model, per the Franke audio rule. This is a deviation from a literal reading of a sounding piece, recorded below.

## Determinism

- FIRST_T = 8. The autonomous breath cycle is 14 s: rise 0 to 4, sustain 4 to 7, fall 7 to 11, rest 11 to 14. At t = 8 the phrase is falling from its peak at h about 0.84, the lung swell is still wide and glowing, and capacity is part spent at about 0.49, so the piece reads at once as a breath already running out against a drone that never stops.
- Before the first press, every frame is a pure function of t through cycleState(t), so frame one is fully reproducible. The first press captures the cycle state into hState and cState and hands control to the hold model.
- Seeded PRNG mulberry32(1953), fresh instances per draw from the piece number and fixed salts; pipe heights, candle positions, and keen wobble are identical every frame.
- Motion is slow: pipe shimmer at 0.6 rad/s, candle flicker at 1.3 rad/s, breath cycle at 14 s, all well under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: location.search reads ?t=<seconds> to set the virtual clock at load, ?hold=1 to start held at load, and ?seed= to vary the texture seed. window.__draw drives draw() with a virtual clock, and window.__piece1953 exposes setHold(v), step(dt), state(), cycle(t), redraw(t), firstT, and holdMax.

## Acceptance criteria, as numbers

- Frame one: t = 8, phrase height h about 0.84, capacity c about 0.49, organ band sounding, seven candles lit. Second 720x720 render byte-identical to thumb.png, md5 5a370662b8f307e3801a693480df908b.
- Time probe: ?t=12 at 720x720 (rest phase, phrase dead, organ still sounding), md5 d8e2f85cb093ff382e13822c5b836586, different from frame one.
- Held probe: setHold(true) then step 2.0 s at t = 8, state h 1, c 0.152, md5 70d97c05d1ee68e3ca5c8e3a9e247030, different from frame one. The render shows the phrase at full peak with keen ticks and the gauge nearly empty and amber.
- Released probe: setHold(false) then step 2.0 s at t = 8, state h 0, c 0.736, md5 ebcb238c038d8160544ac286c899a248, different from held. The render shows the phrase gone, the organ still sounding, the sax alone, and the gauge refilling.
- Exhaustion probe: setHold(true) then step 0.5 s forty times (20 s continuous hold), minH 0, maxH 1, capacityHitZero true, phraseDied true, final state h 0.1, c 0.25, exhausted true. Holding forever cannot sustain the phrase.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible on their dark backdrops over the silver pipes, no collisions, hint readable on its pill on all sizes, organ band full width on the phone and square on desktop, breath arc a smooth dome with the lung swell glowing at the apex, seven candles along the floor, capacity gauge clear of the candles.
- Held and released probe renders inspected: the held frame shows the phrase at peak with keens and a nearly spent amber gauge; the released frame shows the phrase dead with the organ still sounding.
- No em dashes in visible copy or in this file.

## Fix rounds

1. First render showed the breath arc as a sharp tent peak (two quadratic segments meeting at the apex) and the lung glow as heavy flat discs. The arc is now a smooth sine dome sampled in 48 segments, and the glow radii and alphas are reduced so it reads as a swell, not a target.
2. First render showed the title and date half lost over the bright silver pipes. Dark translucent backdrops now sit behind both plate groups, so the plates stay legible at all sizes.
3. First render showed the capacity gauge crossing the candle flames. The gauge moved up to 0.83 H, into clear wall space above the floor band, and the candles moved down to 0.945 H.
4. Probe round found the hold model let a forever hold hover at phrase height about 0.55 by refilling capacity the moment it hit zero. Added an exhausted state: once capacity hits 0 the phrase stays dead until capacity refills past 0.5. Re-probed over 20 s of continuous hold: capacity hits zero, the phrase dies while still held, and it never sits at peak for the whole hold.
5. Probe round found the dead phrase flattening into a faint line along the floor at h = 0. The arc is now skipped entirely when h is at or below 0.005. Re-probed: the released frame is clean, frame one md5 unchanged.

## Deviations from the prompt

- The prompt names no timings, counts, or positions. The 14 s breath cycle, the 6 s hold capacity, the 8 s refill, the 0.5 exhausted refill threshold, the two ranks of 26 pipes, and the seven candles are invented staging for the named mechanism, so frame one already reads as a breath running out against a drone.
- The prompt calls for an organ sounding an endless wind tone and a sax sounding keens and long held tones. The piece realizes both as a closed-form visual sound model with no WebAudio, per the Franke audio rule; the visible behavior matches the prompt (drone shimmer, keen ticks, held phrase) without sound.
- The sax is drawn as a small stylized amber silhouette rather than a detailed instrument; at thumb size it reads as a curved pipe with a bell at the foot of the arc.

## Known warts

- The lung glow is still three concentric circles at the apex; at thumb size it can read as a target behind the arc rather than a lung, though the flattened ellipse inside it softens the effect.
- The sax silhouette is small and stylized; at thumb size it reads as a hook with a dot, and the bell can be mistaken for one more candle flame until the pale line to the arc is noticed.
- The arched windows are very faint on the left side at mobile size and read as dark shapes more than glowing windows.
- The drone lines drifting from the pipe mouths are faint and short, easy to miss; the endless tone is carried mostly by the pipe shimmer.
