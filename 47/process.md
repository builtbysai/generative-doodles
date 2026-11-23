# №48 · Halftone Print - process notes

## Concept
A live generative flow field wearing an analog finish (after
darien.brito; prompt 13 in Bug's ig-artist-study queue): curving
smoke bands rendered entirely as halftone dots on a fixed print
grid, dot radius encoding field intensity. Paper #f4f1ea, ink
#1a1a1a, two colors only.

## Construction
- Single self-contained page, canvas 2D, no libraries. The field
  is layered sines whose periods are all integer ratios of the
  18 second loop, so the seam closes exactly. Two early QA passes
  rebalanced the field and its contrast curve: the first was a
  plain gradient, the second saturated into one black mass; the
  shipped version reads as distinct smoke bands.
- Drag stirs a vortex under the finger that decays in about three
  seconds. Paper margins on desktop, dots to the edges on phones
  via the screen-size check; Visual Viewport sizing; canvas
  pinned by style.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing (three iterations, see above). Hans's
  real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `48/index.html`, `48/thumb.png` (720x720, rendered from the live script), `48/process.md`. Gallery entry added to pieces.json with the formula date.
