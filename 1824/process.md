# No.1824 The Walk Is the Score (EF1, PP1071)

EXPANSION #239 ellen-fullman. Gallery date 2007 · 01 · 09.
Gallery note: "A room seen from above, the Long String Instrument strung across it. Drag along the wires to walk the performer."

## Driver

Walking is the score, the body crossing thresholds retunes the room.

## Build

Source: TASKS.md, ellen-fullman prompt block, EF1/PP1071, opening
EXPANSION #239. A top-down room plan on a dark near-black blue floor.
24 steel wires run left to right between two pale wood resonator boxes,
converging slightly onto the boxes at both ends (spread pinched to 0.80
at the boxes). A small performer figure in pale linen stands at the
middle of the wire band; a warm amber glow marks the floor at her feet.
The wires nearest her bloom amber, with longitudinal ripples travelling
along the wire toward the right box, drawn as brightness pulses and
short dashes moving along x, never as transverse arcs. Six invisible
thresholds divide the room length; each is marked only by a small tick
and diamond on the top edge of the room, in her notation. A dim band of
audience silhouettes sits along the bottom edge of the room.

Interaction is drag only, lengthwise only. Pointer x maps to the
performer target and she follows with lag, lerping 0.18 per frame, like
a body walking; her legs stride and her bow, drawn along the wire,
dips and lifts with the walking phase. Pointer y is ignored entirely,
so crosswise dragging does nothing and she never leaves the wire band.
There is no click-to-reload, no plucking, no transverse vibration, no
pitch sliders or knobs.

Sound is a just-intonation drone stack on WebAudio, created lazily
inside the first gesture only, never autoplay: eight sine partials over
a 55 Hz root with ratios 1, 9/8, 5/4, 3/2, 5/3, 2, 7/4, 15/8. Each of
the six floor zones carries its own partial-gain table, so harmony
shifts as she crosses a threshold, with gains ramped over 0.6 s. When
she stops, the master and partial gains decay over 2.5 s after 1.5 s
idle. All audio calls are guarded with typeof checks and try/catch, so
the node-canvas QA harness renders without audio.

Palette:
- Floor near-black blue #0A0E1C, lighter toward the top #0E1326
- Bare steel grey wires #9AA3B2, dim far wires #5F6878
- Pale wood resonators #C9A876, edge and grain #A9855C
- Warm amber position glow #E8A33D, deep amber bloom core #C77F1F
- Audience dim silhouette band #232A3D and #1B2133
- Performer pale linen #EDE6D6
- Title and hint plates #0A0E1C fill, ink #D8DEE9, hint #C7D2E0

## Frame one (fixed phase t = 60 s)

Verified from the shipped script: the performer stands at x = 0.32
(zone 1) with the wires nearest her already blooming amber, ripple
dashes mid-travel along the wires, both resonators in place, and the
audience band along the bottom. No wall clock is read for frame one.

## Deviations from the prompt

1. Thresholds are marked only by small ticks and diamonds on the top
   edge of the room. The prompt calls them invisible and marked by her
   notation; no lines are drawn across the room, so the thresholds
   themselves stay invisible in the field.
2. The performer walks the middle of the wire band (one fixed height),
   since the transverse axis is inert by the prompt's own rule; her
   position is a single lengthwise fraction.
3. Ripple dashes travel toward the right box only, giving the
   longitudinal wave a single direction of travel, as sound runs from
   the performer outward along the wire.
4. The hint plate carries the gallery note's interaction cue verbatim:
   "Drag along the wires to walk the performer."

## Acceptance criteria

1. Frame one is deterministic: fixed phase t = 60 s, no unseeded
   randomness or wall clock in frame one.
2. Exactly 24 wires, asserted by the harness probe.
3. Wires run left to right between two pale wood resonator boxes,
   converging slightly onto the boxes.
4. The performer is small against the instrument, with an amber floor
   glow at her feet and a bow drawn along the wire.
5. Lengthwise drag moves the performer with lag and changes rendered
   pixels; crosswise drag does not move her.
6. Each of the six zones retunes the drone partial gains; stopping
   decays the drones.
7. No plucking, no transverse vibration, no sliders or knobs, no
   click-to-reload, no autoplay audio.
8. Flicker at or below 14 Hz by construction: the fastest motion is
   the bow swing at walking speed and ripple dashes at 0.05 room
   widths per second; all ambient motion periods are 47 s or longer.
9. prefers-reduced-motion renders a static frame; every
   requestAnimationFrame call is guarded with a typeof check.
10. Title plate "The Walk Is the Score" and date "2007 · 01 · 09"
    top left, hint plate bottom left, legible at 1280x900, 390x844,
    and 720x720.

## QA

Rendered from the actual shipped script with node-canvas
(~/workspace/tools/render-piece.js):

- Desktop 1280x900: square room centred on the dark floor. 24 wires
  between the wood boxes, amber bloom around the performer at x 0.32,
  audience band along the bottom, plates legible, no overlaps.
- Mobile 390x844: full-bleed portrait room, same scene, performer
  and wires legible, hint plate fits inside the viewport.
- Thumb 720x720: square room, same composition as desktop, plates
  legible.

Interaction probe (node harness on the shipped script, /tmp/probe1824.js):

- wireCount 24: PASS.
- Lengthwise drag to fraction 0.80: performer moved 0.32 to 0.7988,
  zone 1 to zone 4, rendered pixels changed: PASS.
- Crosswise drag at the same x: performer delta 0.00000: PASS.
  (Pixels still changed between the two crosswise snapshots only
  because the ripple phase advanced with time, not because she moved.)
- No em dashes in the piece or this file; audio guarded for the
  harness; all requestAnimationFrame calls typeof-guarded.

No fix rounds needed: the first renders read cleanly at all three
sizes, so no rework was done after the probe.
