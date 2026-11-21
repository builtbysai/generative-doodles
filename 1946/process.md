# №1946 Tune Their Perception

Prompt block: LR3 / PP1193, study #254 lucy-railton.

Driver, in one sentence: a black stage where three disciplines take turns leading, a huge screen of orange-red blocks and black screens, a silver membrane reflector catching sculptural light, and a tiny cellist silhouette gliding between mic and amp, violin, and the desk, while a vertical drag nudges which discipline leads and the leadership always rotates back on its own, and the projected line drifts across the screen as light, not as a caption.

## Palette

Hand-picked from the prompt's named colors: screen orange-red #e8481f and brighter #ff5a26 with a dark ember #1c0d08, membrane silver #c9ccd2 with dim #8a8f98 and highlight #f2f3f5, stage black #0a0a0a with a dim floor #171717, projected text white #ffffff, plate ink near white #f5f2ee, hint warm grey-white #d8d4cc.

## Mechanism

- Leadership scheduler: 12 s sections that repeat film, light, cello. The leader runs at full brightness; the other two layers dim (screen to one ember block at 0.20 alpha, reflector to 0.45, cellist to a slower bow and quieter sound line).
- Film layer: a 4 s cue timeline. Each cue seeds 2 to 4 orange-red blocks from mulberry32(1946 * 100 + cue * 7919); cues 3 and 7 are black screens, the few minutes of film stretched thin. Blocks drift a few pixels on slow sines.
- Light layer: a membrane-like silver ellipse mid frame with a wavy edge (5-fold sine wobble at 0.4 rad/s) and two light streaks rotating across it at 0.06 rad/s.
- Cello layer: a pure black silhouette about 6.5 percent of the stage tall, gliding between three stations (mic and amp at 0.22, violin at 0.50, desk at 0.78 of stage width) with a station change every 9 s and a 2 s smooth glide. The bow swings at 0.9 rad/s when the cello leads, 0.3 otherwise. A faint warm backlight halo (alpha 0.09, 0.16 when the cello leads) lets the black figure read against the black stage without growing it. Station markers: a mic stand and amp box at the mic station, a low desk at the desk station.
- Sound model: a thin waveform along the bottom, a closed-form sum of three sines. Amplitude 7 px and alpha 0.8 when the cello leads, 2.5 px and 0.35 otherwise. Visual only, no WebAudio, no autoplay.
- Projected text: the line "the light spinning on its axis, locked in its own cycle" in large italic serif, drawn twice (a soft offset copy at 0.35 alpha, then the line at 0.92 alpha when film leads, 0.55 otherwise), drifting leftward across the screen at 16 px/s with a phase that puts a readable fragment mid-screen at frame one. It is clipped to the screen rect, so it reads as light on the screen, never as a caption.
- Interaction, vertical drag: pointer movement accumulates a bias, clamp(-dy / (H * 0.35), -1, 1). Drag up, toward the screen, biases the film; drag down, toward the cellist, biases the cello. While |bias| is over 0.3 the bias overrides the scheduler. After release the bias decays with a 4 s time constant inside draw(), so leadership rotates back to the scheduler on its own. No click-to-reload; a tap does nothing.
- Audio: visual only, per the Franke rule. No WebAudio is created.

## Determinism

- FIRST_T = 16. At t = 16 the scheduler is in the light section, so the reflector leads: the membrane is bright with a slow streak crossing it, the screen is dimmed to one ember block (cue 4, not a black screen cue), and the cellist is small at the violin station mid-stage. Cues 3 and 7 are black screens, so 16 was chosen to avoid them at frame one.
- Seeded PRNG mulberry32(1946), one fresh instance per cue, so every frame is a pure function of t plus the interaction state, which starts empty, so frame one is fully reproducible.
- All motion runs under 1.1 rad/s, far under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: location.search reads ?seed= to vary the film cue jitter and ?lead=film, ?lead=light, or ?lead=cello to force the leader at load. window.__draw drives draw() with a virtual clock, and window.__piece1946 exposes leader(t), bias(), redraw(t), and firstT.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible and clear of the screen border, hint readable, field full-bleed on the phone and square on desktop, screen dominant in the upper two thirds, reflector bright mid frame, cellist small at the bottom, projected text fragment readable as drifting light.
- Determinism: a second 720x720 render is byte-identical to thumb.png (md5 080bb6f458daa882ed34dc1a9560db21). The probe harness default render reproduces the same md5.
- Scheduler probe: t = 4 leader film md5 855279c4d01115c883c40a79bb0495f9; t = 16 leader light md5 080bb6f458daa882ed34dc1a9560db21; t = 28 leader cello md5 26e67bf20b8048fd1c54ba989a2859c8. Three leaders, three different frames.
- Drag probe (probe harness evals the actual script, dispatches pointer events, advances the virtual clock via window.__draw): drag up 12 steps of 22 px from center, bias 1.000, leader film at t = 16, md5 6dbb932c9372bf78a1a989980c7bc257, bright orange-red blocks on the screen; drag down the same distance, bias -1.000, leader cello at t = 16, md5 6b35574cbb9b7e082711899b9c08f417, dimmed screen, brighter cellist halo, stronger sound line. Both differ from the default frame and from each other.
- Return probe: after release, drawn at t = 40, bias 0.002 for both drag directions, leader film (the scheduler's section at t = 40), and both released renders are byte-identical (md5 4eab53a9fed9160d5f5933c69fcbbddc). Leadership rotates back on its own.
- ?lead= probes match the drag probes exactly: ?lead=film md5 6dbb932c9372bf78a1a989980c7bc257, ?lead=light md5 080bb6f458daa882ed34dc1a9560db21, ?lead=cello md5 6b35574cbb9b7e082711899b9c08f417.
- No em dashes in visible copy or in this file.

## Fix rounds

1. Frame one at FIRST_T = 12 fell on cue 3, a black screen cue, so the screen was entirely empty, and the projected line was mostly off-screen right. FIRST_T moved to 16 (light section, cue 4 with blocks), and the text drift gained a +40 s phase so a readable fragment sits mid-screen at frame one. The cellist was also nearly invisible as pure black on black, so a faint warm backlight halo was added behind the figure and the figure grew from 0.055 to 0.065 of stage height. Re-rendered; all three sizes inspected again.
2. The dimmed ember block at 0.28 alpha read as a muddy brown slab dominating the screen while the light led. Dimmed alpha dropped to 0.20. Re-gated all three sizes; thumb re-render byte-identical to the probe harness default (md5 080bb6f458daa882ed34dc1a9560db21).

## Deviations from the prompt

- The prompt names no block positions, cue lengths, station positions, or streak angles; the cue timeline (4 s cues, black cues 3 and 7), the 12 s scheduler sections, the three station fractions, and the streak geometry are invented staging for the named colors and composition.
- The prompt calls for generative cello-like audio; the piece implements the sound as a closed-form visual waveform only, with no WebAudio, per the Franke rule (real audio only lazily inside a gesture, never autoplay). The visible behavior matches the prompt: the sound line drives hardest when the cello leads.
- The cellist carries a faint warm backlight halo so the pure black silhouette reads against the black stage. The figure itself stays pure black and small; the halo is stage light, not a spotlight on a star.

## Known warts

- At any moment only a fragment of the projected line is visible, since the line is longer than the screen; the full sentence is never on screen at once. That is the drift behavior, but a viewer may not catch the whole line in one pass.
- During black screen cues (3 and 7, a quarter of the time) the screen is empty except for the drifting text, which is per the prompt's stretched-thin film but can read as a dead screen on a quick glance.
- The cello-lead difference is subtle on a still frame: a brighter halo and a stronger sound line, with the bow angle the only figure change. The cellist deliberately never grows, so the lead change is felt more in motion than in a screenshot.
