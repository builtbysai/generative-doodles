# №44 · Color Break - process notes

## Concept
Five luminous white elliptical loops turn slowly on black, seeded
eccentricity and tilt, integer rotation rates, 32 second loop
(after mathiaskrissmer; prompt 9). One accent only: flat vermilion
#ff2e1f, appearing solely on loop segments inside a single
drifting zone. The zone is an alpha test, never drawn; its
outline is never visible. Inside segments render vermilion in one
flat pass, no glow; outside segments render white with additive
passes, split at segment level on the zone boundary. Idle, the
zone drifts on its own path. Drag moves it, eased.

## Construction
- Single self-contained page, canvas 2D, no libraries. Loops are
  110-segment polylines; each segment is classified by its
  midpoint against the zone radius.
- Visual Viewport sizing; canvas pinned by style; centered
  composition with the page ground matched to the piece.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. Hans's real-device check is the final
  gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short. (No.42's caption is the
  generated binary string the prompt specifies.)
- Files: `44/index.html`, `44/thumb.png` (720x720, rendered from the live script), `44/process.md`. Gallery entry added to pieces.json with the formula date.
