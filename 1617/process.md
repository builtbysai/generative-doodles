# №1617 "Parcae" (SP2, sableraph #213, PP864)

## Design
A tall dark textile field of fine vertical warp striations, after "A Loom For
The Parcaes" (Versum, Jan 2022). One horizontal row of stitches is added per
calendar day, seeded by the date, in slightly varying thread tones. At any
single viewing it looks nearly static; over weeks a band of new texture grows
from the top edge downward. The loom is never finished in a session: after
4,821 days of stitching only about 9.4% of the cloth is covered.

The cloth is warp #0D0D0F with fine vertical striations in thread greys
#1A1A1E, #242428, #2E2E34 and an occasional pale thread #4A4A52, nothing
brighter. The stitched band grows from the top edge: each completed day is
one row, drawn as a full-width horizontal line whose tone is a deterministic
function of its day index. The growing edge is a 24-row strip of visible
stitch dashes at the band's lower edge, so the current day's row can be seen
and touched. The margin note along the bottom edge reads the live counter,
"STITCH 4821 / 51472", with the hint "Drag to disturb today's row."

## Dates and counter
- Loom start: 2013-08-26 (chosen so the frame-one counter matches the
  prompt's "STITCH 4821 / 51472" example exactly).
- Frame-one reference date: 2026-11-07, which is 4,821 days after the start.
- Total rows: 51,472, so completion falls on 2154-07-30, about 141 years
  after the start. The cloth will not finish in any viewing lifetime.
- Counter: day index = floor((now - start) / 86400000), computed live from
  the real date in the browser; it is not a hardcoded string. At frame one
  it reads STITCH 4821 / 51472.

## Frame-one determinism
The first synchronous frame uses a FIXED reference date constant
(2026-11-07) instead of the real clock, so the day index, every stitch tone,
and every warp thread are pure seeded functions of fixed inputs. No
Math.random anywhere; all randomness is mulberry32 keyed by column index,
day index, or (day, stitch) pairs. The live loop recomputes the day index
from the real date only after load, and on the reference date it agrees with
the fixed frame. Verified: thumb.png rendered twice from the actual script
with identical md5.

## Day rollover
When the live loop sees the real day index pass the shown day, the new row
draws stitch by stitch over 5 seconds, left to right, with a short pale
needle tick at the leading stitch, then the piece sleeps again. At frame one
the current row is shown complete, so the thumbnail shows the full band.

## Drag and spring return
Pointer drag disturbs only the fresh 24-row strip at the band's growing
edge. Threads near the pointer lean and part: each stitch is displaced
horizontally away from the pointer (up to 14px) with a small vertical lean,
falling off as a Gaussian in distance and by row age (today's row yields
most, older rows barely move). The compressed history above the strip and
all past days never move; drag cannot rewrite history. On release a damped
spring (exp decay times cos) re-tensions the threads back into place over
about 2 seconds, then the piece sleeps. With reduced motion there is no
spring oscillation: the threads return at once on release.

## Deviations
- Fresh-edge magnification: at true scale one row is cloth height / 51,472,
  far below a pixel, so today's row would be invisible and untouchable. The
  most recent 24 rows are drawn at 1px per row in a strip at the band's
  lower edge, so the growing edge is visible and draggable. The compressed
  band above it stays at true scale.
- Layout: the prompt says portrait frame; the house rule for field-like
  compositions gives full-bleed on phones (portrait, as specced) and square
  on desktop. The cloth fills edge to edge in both.
- Text grey #7E7E88 is lighter than the brightest thread (#4A4A52) so the
  title, date, counter, and hint stay legible on the warp. It is a neutral
  grey, not an accent; all threads stay inside the prompt palette.
- No other deviations. No click-to-reload, no reset, no bright accents.

## House rules
Visual Viewport sizing with listeners on visualViewport and window; canvas
pinned in draw() via style width/height in px; phone detection via
window.screen with aspect fallback; field-like composition full-bleed on
phones, square on desktop; page ground is the piece's own warp color; one
synchronous frame at load; requestAnimationFrame guarded by typeof check;
reduced-motion support (static frame, no spring oscillation). Title
"Parcae", date "2006 · 06 · 16" (formula date), hint "Drag to disturb
today's row." No em dashes in visible copy.
