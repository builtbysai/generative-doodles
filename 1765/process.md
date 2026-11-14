# FloodLines (No. 1765)

The felt driver is a gauge becoming a picture: a drowned road brightens a fraction each time the flood reaches a new mark, as if the water itself were slowly developing the photograph, then lets it sink back into mist.

## Spec

TASKS.md prompt block PP1012, study #231 simon-scott (SS6), mechanism: a projected image of a flooded fen road on a dark wall, thin water-level lines creeping slowly upward, the image brightening a fraction each time a line reaches a new mark, then the lines receding and the image dimming back to mist. Study: studies/simon-scott.md ('FloodLines', debut installation May 2015, Touch; f09).

## Mechanism

The flood runs on a seeded irregular schedule of 16 cycles. Each cycle rises slowly toward a target gauge mark, then falls quicker back to the resting waterline. The water level is a pure function of simulation time, so the motion is fully deterministic. Gauge marks sit at 0.70, 0.62, 0.54 and 0.46 of the projection height. The active level line creeps upward with a noise-wobbled edge; every mark it passes leaves a faint residual line behind it, and the residuals fade as the flood recedes. Brightness is mapped to the current high-water mark: 0.52 at the resting line, rising to 1.00 at the top mark, applied as a dark veil over the projection that lifts as the water rises. Mist bands drift slowly across the image and thicken when the picture is dim. The projection itself is a layered gradient field: drowned green over mud brown with a flooded road band low, seeded dark tree masses along the top with faint reflection streaks in the water, pale sheen streaks on the wet road, and a soft projector glow at the top edge.

## Palette

Dark gallery ground near black with a green cast, the projection in drowned green and mud brown, mist in pale grey, the level lines in luminous pale blue.

## Periods

First cycle: rise 70 seconds to the 0.54 mark, fall 20 seconds. Later cycles: rise 44 to 72 seconds, fall 15 to 26 seconds, targets drawn from the 0.70, 0.62, 0.54 and 0.46 marks in seeded order, so the flood never quite reaches the same mark twice and no two cycles share a length. Mist drift 0.004 to 0.012 radians per second. No flicker: nothing oscillates faster than the cycle schedule.

## Frame one

Fixed phase t = 60 seconds. The simulation is pre-run from t = 0 to t = 60 in fixed 1/30 second steps with seeded RNG only, so frame one sits mid-rise of the first cycle: the active line near the 0.56 mark, residual lines at the 0.70 and 0.62 marks, brightness about 0.85, mist thin. First frame rendered identically at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected. Desktop uses a centered landscape projection on the dark wall; phones use the full bleed with the projection centered in the upper half. Title plate sits top left, clear of the projection; hint plate sits bottom left.

## Interaction

Watch-only. No input. The flood cycle runs continuously.

## Deviations from the prompt

None in substance. Two judgment calls: the residual lines at passed marks persist through the rise so the gauge reading is visible at frame one, and the brightness floor is 0.52 rather than near black so the drowned image never fully disappears into the wall. No words or letters appear as visual content anywhere in the piece; the gauge marks are plain ticks at the projection edge.

## Gallery note

A flooded fen road projected on a dark wall; pale blue level lines creep upward and the drowned image brightens a fraction at each new mark, then recedes into mist. Watch only.

## Plates

Title: FloodLines. Date: 2006 · 11 · 11. Hint: Watch only.
