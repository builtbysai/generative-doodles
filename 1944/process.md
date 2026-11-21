# №1944 Ring of Horns

Prompt block: LR1 / PP1191, study #254 lucy-railton.

Driver, in one sentence: a dark hall seen from the center, a ring of eight horn loudspeakers on tall stands around the listener, red and white horns alternating, a lone amber bench and a leaning cello at the middle, while one horn at a time swells with a slow cello-like tone and the lead voice travels horn to horn around the ring, and a horizontal drag steers the diffusion so the lead moves to the horn under the hand and the ring rebalances around it.

## Palette

Hex values are hand-picked from the prompt's named colors: hall black #0a0a0c with a lifted wash #141417 behind the ring, horn red #a8261c (at rest #5e1712, bell interior #3d0f0b) and horn white #e8e2d4 (at rest #8d8778, bell interior #4a463c), bench amber #c98a2e shaded #7a5216, cello varnish brown #7a4a22 shaded #4a2c14, warm gold #d9a441 for the active horn glow and the travelling wave rings, stand poles #2c2c30, plate text warm off-white #e8e2d4. The page ground is hall black, so the square desktop stage blends into it.

## Mechanism

- 8 voice agents, one per visible horn, in just intonation above a 55 Hz cello A: ratios 1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2 (55, 62, 69, 73, 83, 92, 103, 110 Hz). Voice types cycle drone, sine, whisper, so the ring carries all three named tones at once. The plate names the current lead horn, its tone type, and its frequency.
- Diffusion scheduler: the lead voice rests 6 s on one horn, then steps to the next, travelling around the ring forever. leadAt(t) is floor(t / 6) mod 8. At FIRST_T = 8 the lead is horn 2 (index 1), a faint sine at 62 Hz.
- Voice amplitude: the lead swells toward 1, neighbours fall off with circular distance as exp(-d squared / (2 times 1.1 squared)), every voice breathes slowly at 0.5 rad/s with its own phase, and every horn keeps a faint 0.18 floor so the ring never goes silent. At t = 8 the lead horn amplitude is 0.700 and the opposite horn is 0.181.
- Visuals run on this closed-form sound model. The active horn glows faintly in warm gold (radial gradient plus a gold rim on its bell mouth) and throws three slow wave rings toward the listener, each cycling over 6 s and fading as it widens. No pinging tones, no sweep effects: the rings breathe at 1/6 Hz.
- Interaction, drag: pointer movement maps horizontal drag to lead steps, one step per ninth of the stage width. A drag re-anchors the scheduler at the dragged horn and drag time, so after the drag the lead keeps travelling from there. The lead follows the hand; the ring rebalances around it.
- Audio: visual only, no WebAudio. The tones are shown, not sounded: the plate names the lead tone and frequency, and the glow and wave rings are the visible diffusion. No click-to-reload; dragging never reloads.

## Determinism

- FIRST_T = 8. At t = 8 the scheduler lead is horn 2 (floor(8/6) = 1), mid swell, with the wave rings partway through their cycle and the bench and cello fixed at the middle.
- Horn positions, voice ratios, phases, bench, and cello are all fixed constants or pure functions of the piece number and t. Drag state starts empty, so frame one is fully reproducible.
- All motion runs at or under 0.5 rad/s, far under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: location.search reads ?lead=N to set the lead horn at load. window.__draw drives draw() with a virtual clock, and window.__piece1944 exposes lead(), amp(), dragLead(), redraw(), and firstT.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Eight horns, red and white alternating, on tall stands around a dim gold ring; the lead horn glows gold with wave rings; the amber bench and leaning cello anchor the middle third; plates legible on all sizes; full-bleed on the phone, square on desktop; hint readable on its dark pill.
- Determinism: a second 720x720 render is byte-identical to thumb.png (md5 5961f2214288ea6b02ee3d2795fdcffa). The probe harness default render reproduces the same md5.
- Scheduler probe: lead is 1 at t = 8, 2 at t = 14, 3 at t = 20. Redraw at t = 14 gives md5 ae527676905ee293f6635a549cbcd64f, different from frame one, with the gold glow on the next horn.
- ?lead=3 probe md5 69cf3d4e52d4581d9fefb3d8c1596e60.
- Drag probe (probe harness evals the actual script, dispatches pointer events through its own listeners, advances the virtual clock via window.__draw): drag right 150 px from (360,360) on the 720 stage, two drag steps of 64 px, redrawn at t = 8, md5 69cf3d4e52d4581d9fefb3d8c1596e60, identical to the ?lead=3 probe, with the gold glow and wave rings moved to horn 4 and the plate reading "horn 4 leads · bowed drone · 73 Hz". Drag left 150 px moves the lead to horn 8 (index 7), md5 2900159a7b862b641476586955f44077. The drag probe image was visually inspected.
- No em dashes in visible copy or in this file.

## Fix rounds

1. The first render had the bench overlapping the lower-left white horn's bell and the cello overlapping the lower-right white horn. The bench moved up and shortened (from cy + 0.13s to cy + 0.08s, width 0.20s to 0.17s) and the cello moved left and scaled to 0.8. Re-rendered all three sizes; the bench and cello now clear every horn, and the thumb md5 changed to 5961f2214288ea6b02ee3d2795fdcffa.

## Deviations from the prompt

- The prompt calls for 8 spatialized voice agents with a Web Audio multichannel panner or stereo-pan simulation. The piece implements the agents as a closed-form sound model (just-intonation frequencies, scheduler, per-voice amplitude) with no real WebAudio, per the Franke audio rule: visuals run on the model, real audio only lazily inside a gesture, and visual-only is documented here. The visible behavior matches the prompt: the lead travels horn to horn, swells as it passes the listener, and drag steers it.
- The prompt names no horn positions, bench or cello shapes, or wave-ring form; the perspective ellipse ring, the two-ellipse cello body, and the three slow wave rings are invented staging for the named colors and composition.

## Known warts

- The wave rings from the lead horn extend past the stage edges on desktop and phone; they read as diffusion spilling out of the hall, but the largest ring is clipped by the stage boundary.
- The top horn's stand is short and its foot floats above the floor ellipse, since the top of the ring sits high; the other seven stands read as grounded.
- On the phone size the left and right horns sit close to the stage edges, though none is clipped.
