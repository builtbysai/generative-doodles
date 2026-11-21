# №1950 The Face as Light Event

Prompt block: LR7 / PP1197, study #254 lucy-railton.

Driver, in one sentence: a small cellist sits center frame on a near-black stage and slowly dissolves into warm amber smoke that thickens when the bow digs in and thins to reveal her again when she rests, while only the bow arm, rimmed in cool light, stays sharp and keeps moving in slow arcs, and no face ever appears, so the piece feels like withdrawal into light rather than disappearance into dark.

## Palette

Named colors from the prompt, hand-picked hexes: stage black #0a0806 to #120d08 for the ground; amber smoke #d98a2b, #e8a94a, #8a4d16, #f2c078 for the puffs, swirl bands, and glow; faint cool backlight rim #a8c8d8 and #6e8a99 on the bow arm; silhouette warm near-black #171008 with an ember rim #3a2412; plate ink warm amber #e8c890 and a bright amber hint pill #f2c078.

## Mechanism

- Sound model, closed form: the bowed-tone energy envelope is energy(t) = 0.55 + 0.30 sin(2 pi (t - 2) / 26) + 0.10 sin(2 pi t / 7 + 1.0), one generative drone swelling on a 26 s cycle plus a 7 s bow-stroke tremor, clamped to 0 to 1. Smoke density follows the energy directly; silhouette opacity is 1 - 0.6 times density, so dense smoke hides her and resting smoke reveals her. The bow arm angle is -0.5 + 0.45 sin(2 pi t / 7), slow arcs on the stroke cycle.
- Smoke: 280 seeded puffs drifting on closed-form wrapped paths with a 0.2 rad/s sinusoidal wobble, plus 5 slow swirl bands turning at 0.05 rad/s. Puff radius grows with density (14 to 74 px times 0.7 to 1.3), alpha grows with density (0.03 to 0.10 times 0.3 to 1.0). Lit puffs carry a brighter amber core at half alpha, so the smoke has depth instead of flat discs.
- Stage: a near-black vertical gradient with a warm lift toward the floor, and a soft amber radial glow behind the figure whose radius and alpha swell with the drone, so the light itself breathes.
- Figure: a seated cellist, small and center frame. Head is a plain dark shape with a hair mass, no face is ever drawn, not even blurred. Torso is a quiet seated shape with an ember rim on the lit side; the cello body leans against her left side with its neck rising toward her shoulder. Opacity is inverse to smoke density.
- Bow arm, the one sharp element: shoulder pivot, a bent elbow, a hand knot, and a thin bow held steep across the cello, its tilt following the same 7 s stroke cycle. Drawn in cool rim light at 0.9 alpha with a warm amber edge, brighter and crisper than the silhouette, so it stays legible through the smoke.
- Interaction: watch only, per the prompt. No pointer handlers, no click-to-reload, no drag. The watching is the interaction.
- Audio: visual only, no WebAudio. The prompt's bowed-tone energy and generative drone are realized as a closed-form visual sound model, per the Franke audio rule.

## Determinism

- FIRST_T = 14. At t = 14 the bow angle is -0.5 rad, crossing the middle of its arc, energy is 0.7059, smoke density 0.7059, silhouette opacity 0.5764: the smoke is dense but the silhouette is still partly visible, and the bow arm is mid-arc.
- Seeded PRNG mulberry32(1950), fresh instances per draw from the piece number and particle index; every frame is a pure function of t, so frame one is fully reproducible. No wall-clock randomness at load.
- Slowest motion 0.05 rad/s, fastest the 7 s stroke cycle, all under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: location.search reads ?t=<seconds> to render at that time at load. window.__draw drives draw() with a virtual clock, and window.__piece1950 exposes energy(t), density(t), silhouette(t), bowAngle(t), redraw(t), and firstT.

## Acceptance criteria, as numbers

- Frame one: t = 14, energy 0.7059, density 0.7059, silhouette 0.5764, bow angle -0.5000. Second 720x720 render byte-identical to thumb.png, md5 14697f65eaac2d305744cefb6d2cc5ad.
- Time probe t = 74 (FIRST_T + 60): energy 0.1529, density 0.1529, silhouette 0.9082, bow angle -0.6952, md5 7d1394f7e7719c6f848ed679d564a9f3. The smoke has thinned to a faint haze, the silhouette stands clear, and the bow sits at a different arc position. It differs from frame one.
- Time probe t = 20: energy 0.2797, density 0.2797, silhouette 0.8322, bow angle -0.8518, md5 36d6a4649ae5757aa0000a57344455c9. A resting moment between the two, smoke thin, figure clear, bow near the low end of its swing.
- Energy range over a full drone cycle: about 0.15 at the trough (t = 74) to about 0.95 near the swell peak, so the piece cycles between near-reveal and near-dissolve roughly every 26 s.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible, no collisions, hint readable on its amber pill on all sizes, field full-bleed on the phone and square on desktop, figure small and center frame, bow arm sharp with its cool rim, smoke warm amber throughout, no face anywhere.
- Probe frames at t = 20 and t = 74 inspected: smoke thins, silhouette clarifies, bow moves to a different arc position, the warm glow dims with the drone. The piece changes with time as the model requires.
- No em dashes in visible copy or in this file.

## Fix rounds

1. First build: the bow arm was a straight line and the bow crossed it at a similar angle, so the pair read as a clock hand or antenna. The elbow now bends off the shoulder-to-hand line, and the bow is shorter (120 px scale) and steeper (1.25 rad base tilt), clearly angled away from the arm. Re-rendered and re-gated; the arm now reads as an arm holding a bow.
2. First build: the smoke puffs read as distinct hard-edged bubbles, and the swirl bands read as geometric rings. Puff count rose from 240 to 280 with larger radii (14 to 74 px) and lower alpha (0.03 to 0.10), bright cores limited to a quarter of puffs at half alpha; swirl band alpha and line width reduced. The smoke now reads as warm haze with soft discs rather than bubbles.

## Deviations from the prompt

- The prompt names no drone period, stroke period, or energy numbers. The 26 s drone cycle, 7 s bow-stroke cycle, and the exact envelope formula are invented staging for the named mechanism, so the smoke has a repeatable swell-and-rest rhythm.
- The smoke is drawn as seeded vector puffs and swirl arcs rather than a fluid simulation; it reads as warm stage haze, not as sampled smoke.
- The prompt's one generative drone is realized as a closed-form visual sound model with no WebAudio, per the Franke audio rule; the visible behavior matches the prompt (swells move the smoke) without sound.

## Known warts

- The smoke puffs are still visible as soft discs on close inspection, especially at high density; at thumb size they read as haze, at desktop size the disc edges show.
- The cello reads as a dark oval leaning against the torso rather than a clearly shaped instrument; the neck line is faint and can be lost in the smoke.
- The figure is intentionally small and dark, so on a phone the cellist is a small dark shape and the piece leans on the smoke and the bow arm to carry the image.
- The swirl bands can still read as faint large rings in the upper half of the frame at high density, a geometric trace inside otherwise soft smoke.
