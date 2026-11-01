# №1187 — Rock Speaker Garden (4 Hours)

Jeff Kolar study block JK4, grounded in Kolar's *Rock Speaker Garden* (2023) at the Chicago Athletic Association: "10 tracks. 4 hours. A multi-channel audio installation." The piece is the installation drawn as its own plan view — the courtyard from above, the programme running on its own schedule, nobody allowed to press anything.

## What you see

A gravel courtyard in plan: a dashed S-curve walking path crosses a dark ground plane seeded with speckle and faint worn patches. Ten speaker monoliths sit along the path at seeded positions (never a grid), each a low dark block with a pale top edge, a speaker dot in its zone colour, and its track number, 01–10.

Each monolith broadcasts its track as expanding concentric rings in its own colour — magenta, cyan, yellow, violet, orange, sky, acid, coral, bronze, blue — at its own cadence (2.2–4.5 s per ring, two rings per zone, half a cadence apart, fading as they grow). Where two zones' rings cross, the exact circle–circle intersection points flare white: multichannel bleed, the sound of one garden zone leaking into another, computed geometrically for all 45 zone pairs rather than faked with glow.

A ghost visitor walks the path at constant speed, trailing a short fading tail. When it stands within a zone's inner reach, that monolith lights: top edge turns pale, its number brightens, its speaker dot comes up. The header keeps the programme clock — the full four hours compressed into a three-minute cycle, so frame one already reads 1:25:20 / 4:00:00, with a hairline filling beneath it. There is no play button and no track selector, because the installation does not take requests.

## Sound

None. The piece ships silent: the ten tracks exist only as rings. Kolar's garden is heard by walking it; here it is read by watching it, and the bleed points are where you would have heard two tracks at once.

## Interaction

Drag pans the plan (clamped to ±15% of the viewport); the walk, the rings and the clock ignore the pan completely and keep their own course. On portrait phones the plan turns 90° so its long axis runs down the screen — the pan is applied in screen space first, so the plan still follows the finger's direction.

## Determinism

Everything is a closed-form function of piece time plus the pan offset. Zone positions, cadences and phases come from one mulberry32 stream; the gravel from another; ring radii are pure functions of t; the visitor's place on the path is (t / 180 + phase) mod 1 and its trail is the same function at earlier parameters. The first frame is drawn synchronously at a fixed phase, T0 = 64 s — visitor between zones 05 and 06 with 06 lit, sixty ring-crossing bleed points live — and any re-render of that frame is byte-identical.
