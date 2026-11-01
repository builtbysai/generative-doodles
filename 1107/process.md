# №1107 — Strata

Daniel Franke study block DF4 (Abstract History Machine / An iPhone's DNA). Title per the block's Title suggestion: "Strata".

## The piece

A simulated ice core in Franke's white-diagram register: paper ground `#F2EFE8`, a centered column 25% of frame width rising from a baseline, built of mineral strata bands, each named in tiny mono type with a leader line, alternating left and right. Eight minerals, each standing for the smartphone innovation it decomposes into: Gold (camera contacts), Lithium (battery anode), Cobalt (battery cathode), Silicon (computation), Neodymium (magnets and speakers), Aluminium (casing), Copper (wiring), Carbon (composites).

## Mechanism (closed form, no frame-integrated state)

- The strata are a seeded infinite sequence: one period of 40 layers (mulberry32 pick with no immediate repeats, thicknesses normalized) totals exactly 3.6 stage units of material. Any material coordinate u resolves to a layer by period arithmetic, so the sequence is valid in both directions forever.
- The loop is 90 s. Entry scroll B(t) is the analytic integral of a sinusoidal entry rate; over one loop B advances exactly 3.600000 units (verified numerically), i.e. exactly one sequence period, so the loop seam is invisible.
- Core height H(t) is a smooth grow/melt cycle (0.52 to 0.78 of frame). The visible stack is the material window [M, B] with M = B − H: new layers push in at the bottom (the newest band renders partial, outlined dashed as the re-ice intake), the top layer is cut by M and dissolves under seeded shimmer ticks whose density follows the melt rate rM = v − dH/dt, proven non-negative across the whole loop (0.027 to 0.053 units/s). Mass is conserved by construction: what melts off the top is the same window arithmetic that re-ices at the bottom. The loop never settles to a final state.
- Frame one is a synchronous draw at fixed phase t = 40 s: core at H = 0.73, nine bands visible (Copper, Carbon, Lithium, Carbon, Silicon, Lithium, Gold, Lithium, Gold), melt shimmer active, intake band forming.

## Interaction

- DRAG across the core = heat. Recorded heat samples form a decaying field along the core's height: bands near the touch thin locally (anchored at their bottom edge) and fill with shimmer, and a capped global melt offset (max 0.10 units, ~22 s decay) shortens the core; on release the offset decays and the core regrows. All of it is a closed-form function of the recorded event list and t.
- TAP a stratum = its story: the band brightens under an ink outline and its mineral name plus innovation line appears in small mono beside it, fading over 6 s, tracking the band as the stack moves.
- DOUBLE-TAP = new core: reseeds the 40-layer period, clears heat and story. Never click-to-reload.

## Sound

A cold crystalline drone (two detuned sines through a lowpass, pitch falling as melt rate rises) starts lazily inside the first visitor gesture, typeof-guarded WebAudio, never autoplay. The visuals are complete without it.

## House compliance

Visual Viewport canvas sizing with resize listeners on visualViewport and window; canvas CSS size pinned in draw(); phone detection via window.screen (min dimension < 700) with aspect fallback; full-bleed paper including page ground. No offscreen canvas, no gradients, no ctx.filter, no shadowBlur, no createElement, no microphone. Visible text limited to the specced strata labels and the tap story.

## QA

Rendered with the house renderer at 1280x800, 390x844, and 720x720. Thumb rendered twice and byte-compared with cmp: identical; duplicate deleted. Loop arithmetic verified numerically (seam, melt-rate sign, height range) as recorded above.
