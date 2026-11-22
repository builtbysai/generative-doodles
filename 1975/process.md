# №1975 Burn and Stamp

TL8 / PP1222, study #257 theodora-laird. Gallery date 2007-06-09, shown as "2007 · 06 · 09". Interaction cue: drag to push the exposure.

## What the piece does

A procedural monochrome landscape (banded sky with a pale sun and drifting cloud streaks, three ridged mountain layers with a snow line, tree ticks and a mist band, a lake with wave lines, reflection streaks and grain, a dark shore with grass ticks) runs a 24 second cycle: build, burn, sign, rebuild.

- Build, 0 to 9 s: exposure rises from 0 to 1 and the landscape emerges from black toward full detail.
- Burn, 9 to 15 s: exposure rises from 1 to 6 and the detail burns out until the image is almost nothing but white.
- Stamp hold, 15 to 18 s: exposure holds at 6 and a single hot-pink wordmark, fEEo, stamps across the burn at a slight angle, with a misregistered darker pink shadow copy and an underline rule, then holds.
- Fall and black hold, 18 to 24 s: exposure falls back to 0, the image drops to black, and the cycle restarts with the rebuild.

The burn destroys real rendered detail by clipping, not by a white overlay: every drawn gray is its base luminance times the exposure, clamped to white, so lighter grays clip first and the darkest detail (tree ticks, shore band) is the last to go.

## FIRST_T

FIRST_T = 7 s. At t = 7 the build is nearly complete (exposure about 0.86), so the first frame shows the landscape in full detail, still rising out of black. The frame is a pure function of elapsed time plus drag state; no wall clock or Date is read for animation state.

## Interaction

Drag to push the exposure. Dragging upward runs the virtual clock at 2.5x, so the burn comes sooner; dragging downward runs it at 0.15x, holding back the light and keeping the detail. The pointer only ever changes the clock rate, never the phase, and the clock is continuous, so the burn and the stamp are always traversed: the cycle can be paced, never skipped. There is no click to reload and no reseed. In reduced motion mode there is no automatic loop; a drag still paces the cycle by nudging the clock directly.

## Deviations from the prompt

One, technical only. The prompt describes the landscape rendered to a buffer with an exposure parameter. This build applies the exposure per element at draw time (each gray is base times exposure, clamped to white) instead of using a literal offscreen buffer, because the node-canvas QA shim provides no document.createElement and a buffer canvas would break the render check. The visible effect is identical, and the burn still destroys real detail by clipping. No visual deviation.

## Probes

Rendered with node ~/workspace/tools/render-piece.js from the actual script. Note: the render tool resizes its canvas to the stage, so each PNG is the stage only (828x828 desktop, 390x844 mobile, 720x720 thumb).

- t = 7, desktop 1280x900, mobile 390x844, thumb 720x720: full landscape in near-full detail, caption and hint legible, no clipping or overlap. Clean on all three sizes.
- t = 12, burn in progress (exposure 3.5): sky, ridges and water washed to white; only the tree ticks and the shore band survive as gray. Confirms the burn eats detail progressively by clipping.
- t = 16.5, stamp hold (exposure 6): pure white with the pink fEEo wordmark as the only color. Pixel check: 2,650 sub-250 gray pixels outside the caption and stamp areas (antialiased edges only), darkest 95, which is the hint text; zero pink pixels outside the stamp bounding box.
- t = 21, black hold (exposure 0): mean luminance 0.2, only the caption and hint readable in light gray on black.
- t = 25.5, rebuild (exposure about 0.07): the ridge lines faintly re-emerging from black. Confirms the rebuild comes up from black.
- Drag probe: the render tool has no pointer or drag hook, so drag was code-verified, not render-probed. The render log lists the pointerdown, pointermove, pointerup, pointercancel and pointerleave listeners as registered, and the pacing code (rate 2.5x up, 0.15x down, continuous clock, clamp so the clock never goes negative) was inspected in the source. The reduced-motion drag path nudges the clock directly and redraws.

## Fix rounds

One fix round, after the first render pass.

- The mist band showed as a gray lens at the horizon: where the mid ridge crest dipped below the horizon, the semi-transparent mist was composited over the bare near-black ground instead of over ridge fill. Fixed by extending the far ridge fill down to the water line, so the horizon gap is always covered by ridge gray. Verified gone in the re-rendered burn probe.
- Cloud streaks read as hard white bars and could hang half cut at an edge. Fixed by wrapping their horizontal position into the stage and softening them (alpha 0.55 to 0.32, thinner).
- Far ridge merged with the sky at first frame exposure. Darkened from base 0.80 to 0.74 and the mist from 0.86 to 0.80 for separation. Verified in the re-rendered first frame.

## Known warts

None open. Minor notes: the top-left cloud streak can sit half off the left edge while drifting, which reads as a cloud entering the frame; the far ridge is deliberately faint against the sky at first frame exposure, and separates fully as the build completes.
