# №9063 · Oxbow — process notes

## Concept

A river system, not a flow field. One main meander grows across the page, its bends tightening via seeded noise until cutoffs pinch off and leave oxbow-lake scar arcs; tributaries branch at acute angles and join at proper confluences, never crossing. The scars of old channels are the subject as much as the live river: every composition is a map of where the water used to be.

## Construction

- Seeded PRNG (mulberry32); `?seed=` support; click regenerates with `history.replaceState`.
- Meander driver: heading = base + bend episodes + meander waves + value noise. Bend episodes are sustained signed turns (130-230 steps, up to ~320 degrees) with smoothstep ramps; turn signs mostly alternate so the river trends across the page instead of coiling; wave amplitudes grow with the reach's age, so early bends run gentle and late bends tighten into hairpins.
- Cutoff: when the head nears its own old bed with opposed headings (backward scan, so the *current* bend is abandoned), the neck pinches. The abandoned bend becomes a scar; the reach re-phases with freshly generated episodes plus a 14-step eased heading change instead of a hard corner.
- Occupancy grid (150x150) enforces the no-crossing rule for live beds only. Scars are open ground (sealing them was found to starve tributaries with no visible benefit). A paleo river is grown first as a ghost: never drawn, never blocks, only its faint scars remain.
- Growth order per attempt: paleo ghost, main stem (west to east, belt-guided), ochre avulsion (splits off mid-reach, gentler episodes), dendritic tributaries (spawn upstream, meander while homing, join the main stem or each other at acute confluences; weave fades near the junction).
- Safety gate: up to 18 derived-seed attempts until the main stem pinches 2+ cutoffs, 3+ tributaries join, the avulsion runs, and the main reach travels real distance; otherwise the best attempt wins by gate-weighted score.
- Rendering: paired bank lines, water as darkened negative space between banks; scars drawn as a faint halo plus a thin dimmer-bone arc fading along its length; vignette, restrained grain. Palette: deep slate ground `#232a30`, bone ink `#e8e2d2`, one ochre accent `#c98a2e` for the youngest channel.

## Iteration

**Handoff.** The previous builder left a working 18KB seeded piece (paired banks, occupancy-grid no-crossing discipline, `?seed=`/click/resize all wired) but it was mid-iteration: sparse composition with vast empty dark areas, channels running nearly straight (the curvature random-walk never committed to a bend), zero cutoffs firing, and scars too faint to read. The coordinator's verdict: not shippable; keep the paired banks and the no-crossing discipline.

**What I changed.**
1. Replaced the weak curvature random-walk with the bend-episode driver above; meanders went from gentle wiggles to S-curves and hairpins (verified: cutoff count went from 0 to 2-5 per composition).
2. Made cutoffs actually pinch: aggressive neck radius, opposed-headings discriminator so S-wiggles are not mistaken for cutoffs, backward scan abandoning the current bend as one clean crescent.
3. Scars redrawn as halo + thin fading crescents at much higher alpha; they now read as the conceptual heart of the piece.
4. Fuller composition: dendritic tributaries (up to 6, joining the main stem or each other), longer ochre avulsion, paleo background scars; growth order tuned (paleo, main, avulsion, tributaries) after instrumenting failure modes showed each system starving the next.
5. Fixed artifacts found in review: margin scribbles (soft margin steering that leans back before the edge), post-cutoff knots (episodes rebuilt after every cutoff so the new reach heads for fresh ground), tangled west-start (first episode delayed and capped), sharp cutoff corners (14-step heading ease).
6. Removed scar grid-sealing: measurement showed the no-crossing rule for live beds was sufficient and sealing paved the grid solid, collapsing tributary joins.
7. Safety gate hardened: 18 attempts, score heavily weighted toward the gate criteria so the fallback is the attempt closest to passing.

**Coordinator polish pass.** Visual review of the finished piece found two artifact families the worker's QA had missed:
8. Sharp rectangular kinks: the main channel's bend episodes and the tributary final-approach pursuit (0.35 gain) could produce near-90-degree folds that read as glitches. Fixed with turn-rate limiters on all three walkers (main 0.05, tributaries and second-order branches 0.09 rad/step): rivers bend, they do not fold. Hairpin episodes (avg 0.011-0.043 rad/step) pass through unclipped.
9. Zigzag cutoffs: sequential cutoffs inserted straight chord segments across each neck, and two cutoffs in a row rendered as an angular zigzag with miter joints. Replaced the chord with a cubic Bezier that leaves the old bed along its tangent and arrives on the current heading, so every cutoff is a smooth new reach. Tributary final-approach gain eased 0.35 to 0.22 to recover join reliability after the limiter.
Re-verified seeds 9063, 424242, 777001 by screenshot: all smooth, no kinks or zigzags, density recovered, gate still passing.

## Differentiation

- **№9059 Crosscurrent:** free flow-field ribbons. Oxbow is a branching river network with cutoff scars, dendritic, not field-following.
- **№8970:** a single greedy plotter line hunting darkness. Oxbow is a growing river network with tributaries and scars.
- **№9006:** geometric Truchet tiles. Oxbow is organic and fluvial.

## QA log

- Seeds 9063, 424242, 777001, 271828: all pass the safety gate on early attempts. Final stats: cutoffs 2-3, tributaries 3-5, avulsion 254-305 pts, paleo scars 2-4, main reach dist 1.1-2.0. Every composition carries 5+ legible scar arcs (main + paleo + avulsion).
- Screenshot-reviewed all four seeds at 1280px: strong meanders, visible scar crescents, full river systems, ochre accent present, no margin scribbles or knots in final state.
- 390px width: square letterboxes correctly, composition reads at small size, hint visible.
- Console check (ccheck.js): zero errors, zero warnings.
- Format spec: title `№9063 · Oxbow`, hint `click for another river`, default seed 9063, DPR capped at 2, square centered and letterboxed, resize redraws, click yields a new seed via `history.replaceState`. Visible copy contains no em dashes, no date strings, no absolute URLs.
- `thumb.png`: 720x720 crop of the square from a live render (seed 9063).
