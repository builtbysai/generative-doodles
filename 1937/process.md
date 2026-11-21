# №1937 Obsidian

Prompt block: KD2 / PP1184, study #253 kit-downes.

Driver, in one sentence: a black field, nearly still, in which slow currents of dark red and umber rise from the bottom corners over many minutes and a band of brighter matter occasionally surfaces in the center third, spreads, and cools back into the black, the record sleeve's volcanic slow process made watchable, where the waiting itself is the piece.

## Palette

Hex values hand-picked from the prompt's named colors: volcanic black ground #0a0808, cooling basalt grey #2b2726, umber #5a3a22, deep ember red #6e1f12, slow ember red #8c2f1a, bright band rust orange #c65a1e with a brighter core #d97a2e, plate ink warm ash #d8d2c8 with muted ink #8f887c.

## Mechanism

- Slow convection simulation. Fourteen seeded plumes enter from the bottom corners, seven from the left and seven from the right, and wander upward on two slow sines each. Each plume carries a temperature that cools exponentially as it rises and pulses slowly with t on a five to ten minute period. Brightness and color are tied to temperature: hot ember at the base, cooling through umber to basalt grey, then black. Plumes are drawn as soft ribbons of overlapping circles, wider and hotter at the base, narrowing and cooling as they rise, with a hotter thin core along the same path.
- Cooling basalt. Six very faint large grey masses drift almost imperceptibly, giving the black field a slow geological texture.
- Bright bands, rare convection events. Each band surfaces in the center third, spreads horizontally, then cools back into the black. A band rises smoothly over 60 s to its peak, then decays exponentially with a 300 s half-life. Seeded schedule: band 0 at t = 0 (y 0.401, peak 0.847), band 1 at t = 749.8 (y 0.442, peak 0.998), band 2 at t = 1350.5 (y 0.484, peak 0.869), band 3 at t = 2033.4 (y 0.510, peak 0.926), band 4 at t = 2447.5 (y 0.602, peak 0.822), band 5 at t = 3155.3 (y 0.600, peak 0.890). Bands are drawn as three rows of overlapping circles (glow, band, core) stepped at 0.3 radii so the edge is smooth, never beaded, with the alpha tapering toward each end so a band spreads and fades instead of ending abruptly.
- Interaction: watch only. No pointer handlers are attached. Drag does nothing, the process does not negotiate. No click-to-reload anywhere.
- Audio: visual only, no WebAudio. The prompt's technical approach describes a visual convection simulation and the piece is a watch-only slow process; per the Franke rule the prompt WebAudio is not built and nothing autoplays. This is a deviation from the prompt's "musical response" framing, which is carried by the visual slowness instead.

## Determinism

- FIRST_T = 90. Fixed phase state at frame one: t = 90 s, band 0 (triggered at t = 0, peaked at 60 s) is mid-cooling at about 0.77 brightness, so frame one already shows the black field with faint ember currents and one cooling rust band mid-surface. The currents read at a glance while still evolving slowly.
- Seeded PRNG mulberry32(1937) for plume, blob and band parameters. Every frame is a pure function of t.
- All motion is slow sines with periods of minutes, and redraws are throttled to four per second, far under the 14 Hz ceiling. prefers-reduced-motion renders a still frame at FIRST_T.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. No clipped text, no plate collisions, title and date legible at thumb size, hint legible on all three sizes. Field-like composition: full-bleed on phones, square on desktop.
- Time probe via query params: ?t=NNN renders the frame at simulated time NNN seconds (render-piece.js passes its seed argument as ?seed=, and a numeric seed is read as the probe time too). Probe renders at 1280x900: default t = 90 md5 20d65856006ac49ee7889b4858ac3b4d, ?t=3000 md5 035f655469b04a9d0f1e80fde4752333. The probe differs from the first frame subtly but visibly: band 0 has fully cooled away, band 4 (triggered at t = 2447.5) is a faint dim smudge lower in the center third, and the plumes have wandered into different shapes along both edges. The field is the same piece, minutes later.
- Determinism: a second 720x720 render is byte-identical to thumb.png (md5 fa13900ae9ec33ce3cda421bd3bc7819).

## Fix rounds

1. First render: the bright band read as a row of distinct beads, hard circle edges along its length, and the plumes were almost invisible, so the field read as empty black with a dotted line. Stepped the band rows at 0.3 radii with lower per-circle alpha and an end taper, which made the band smooth with soft ends, and raised plume base temperature, slowed cooling, and raised plume alpha.
2. Second render: the band was smooth, but the currents were still only vague smudges at the corners. Raised plume alpha again (0.09 plus temperature times 0.24, core 0.10 plus temperature times 0.32), slowed cooling further, and raised the pulse floor. Currents now read as faint ember ribbons rising from both bottom corners at a glance, still faint enough that the field stays nearly still.

## Deviations from the prompt

- Audio is visual only, no WebAudio built. See Mechanism above.
- The six band trigger times and the six basalt masses are seeded inventions inside the prompt's own rules (bands surface roughly in the center third, roughly every ten minutes, cooling over long half-lives); the prompt gives no exact schedule, so a seeded one is used and recorded here.

## Known warts

- At t = 3000 the field is very dark: band 4 is mostly cooled and no band is near peak, so between events the piece is nearly black with only the faint currents. That is the brief (bands are rare, the slowness is the material), not a rendering fault.
- On phones the currents are faintest near the top of the tall frame, where the plumes have cooled most; the band carries the middle of the frame instead.
- The band is a flat horizontal spread by design; it has no vertical structure, so it reads as a cooling seam rather than a cloud.

## Gallery

- Date: 2007 · 05 · 02 (formula date for №1937).
- Proposed gallery note: "Ember currents rise through volcanic black over minutes. Watch only. Slow currents rise."
