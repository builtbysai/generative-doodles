# №1942 Wind Pressure

Prompt block: KD7 / PP1189, study #253 kit-downes.

Driver, in one sentence: a forest of square wooden organ pipes seen from inside the case stands in slanting sunlight with a carved screen shadow crossing the lower right, while a vertical drag raises the wind pressure so the pipes tremble, the shadows shift and a few pipes overblow into thin pale blue screams, and releasing lets the pressure settle slowly back to its idle hum.

## Palette

The study file studies/kit-downes.md does not exist in the repo, so hex values are hand-picked from the prompt's named colors: pipe wood amber #b07a3a with sunlit face #c99a55 and shadow face #7a4e22; shadow brown #3a2415 over case ground #241608; slanting sunlight in warm white #f7e8c8; overblow screams in pale blue #a8c8e0 with core #d6e8f5; plate ink warm white #f2e6cc; gauge rim #c99a55 with a red zone #c25a3a.

## Mechanism

- Six receding ranks of square wooden pipes, 9 pipes in the back rank up to 14 in the front, each pipe with its own seeded shade, tremble phase and frequency (2.2 to 3.8 Hz), overblow threshold (0.72 to 0.92) and overblow phase. Each pipe is drawn with a sunlit left face, a shadow right face, one seeded grain line, a dark mouth slot at the top with a pale lip, and a base shadow grounding its rank.
- Wind is one global variable, idle 0.12. While dragging, the wind chases the drag position fast (top of the frame is full pressure); on release the wind target returns to idle and the pressure settles slowly back. Per-pipe tremble amplitude, sunlight slant displacement, screen shadow displacement and shimmer amplitude all scale with the wind.
- Sunlight: four warm white diagonal bands slanting from the top left plus a soft radial glow at the entry, drifting with the wind. Carved screen shadow: a diagonal crosshatch lattice clipped to the lower right, displaced by the wind. Air shimmer: five faint wavy lines whose amplitude follows the wind.
- Overblow: above its threshold, a pipe sings for part of each cycle (35 percent of a 2 s cycle, phase per pipe), drawing a wavy pale blue streak with a bright core rising from its mouth while the mouth darkens to blue. The cycle is a pure function of t, so a high-wind probe shows screams at frame one.
- The wind gauge sits top right, the only instrument on screen: a dial with ticks at 0, 0.25, 0.5, 0.75 and 1.0, a red zone from 0.75 up, and a needle that points left at idle and right at full pressure.
- Interaction: drag only, vertical position sets the wind. No click-to-reload, no other control. Audio: visual only, no WebAudio.

## Determinism

- FIRST_T = 8. At t = 8 the wind is at idle, the pipes are nearly still, no pipe has overblown, and the sunlight sits mid-slant, so frame one is a calm forest and the first drag is the discovery.
- Seeded PRNG mulberry32(1942); the pipe field is fixed at load from the seed. Every frame is a pure function of t and the wind state; the wind at frame one is idle by construction.
- All motion runs under 4 Hz, well under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: location.search reads ?seed= to vary the pipe field and ?sx=/?sy= to place a drag at load (vertical position sets wind); window.__draw is exposed so a harness can drive draw() with a virtual clock, and window.__piece1942 exposes wind(), setWind() and redraw().

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible, gauge visible at frame one on all sizes, hint readable over the pipes on all sizes, carved screen shadow crosses the lower right, pipes fill the frame on phone and desktop.
- Determinism: a second 720x720 render is byte-identical to thumb.png (md5 86d71971150863020c8b72838bcd1324).
- High-wind probe (probe harness evals the actual script with ?sx=0.5&sy=0.05): wind 0.956, md5 7537f123ef06b052dc71605c4c27d202, visibly different from the default frame: pipes shifted by trembling, gauge needle in the red zone, pale blue overblow streaks rising from several pipe mouths, shimmer lines visible. Same probe at t = 9: md5 301c23b3ad6f95dfbf28a013520792b6, a different frame, so the trembling moves with the clock.
- No em dashes in visible copy or in this file.

## Fix rounds

1. First renders showed a wide empty dark band below the front rank (its base sat at 82.5 percent of the height) and the carved screen shadow was barely visible. Rank spacing widened so the front rank base sits at 92 percent of the height, and the lattice alphas rose from 0.34/0.20 to 0.42/0.26. Re-rendered; pipes now fill the frame and the lattice reads in the lower right.
2. The high-wind probe first rendered byte-identical to the default frame: the script read window.location.search, which the node harness does not populate (it sets global location), and the probe wind was computed from H before resize() ran. The hook now reads bare location.search and computes probe wind from the sy fraction directly. Re-probed; wind 0.956 with screams visible, and the thumb md5 is unchanged, so frame one was unaffected.

## Deviations from the prompt

- The prompt says the carved screen's shadow pattern crosses the lower right; the piece draws it as a diagonal crosshatch lattice clipped to a lower-right wedge, which reads as a carved screen shadow without inventing a specific carving motif.
- The prompt names no pipe count, rank layout, or gauge design; the six ranks of 9 to 14 pipes, the dial with ticks and a red zone, and the shimmer lines are invented staging for the named colors and the single wind control.

## Known warts

- The back ranks are partly hidden behind the front ranks, so some back-rank mouths are covered; the forest still reads as receding ranks.
- At full wind the overblow streaks from the front rank can cross the hint line for a moment, since the streaks rise from mouths near the bottom of the frame.
- The gauge label WIND sits just below the dial and can touch the top pipe row on very short viewports.
