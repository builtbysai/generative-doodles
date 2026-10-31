# No.656 "Hanan Pacha"

EXPANSION #79 francisco-gazitua, prompt block 8 "Hanan Pacha" (verified verbatim from TASKS.md). Angela Leible's celestial world, her "Condor" and "Aguila" paintings and the Hanan Pacha cosmology, as a flight band.

## Concept

A dark celestial band crosses the upper two-thirds of a near-black frame. Six flat geometric birds, three condors and three aguilas built from triangles, ride slow thermal loops inside it and never land. One thin gold ring drifts along the band as a thermal marker; birds whose rails pass near it ride a little higher. The piece is watched, not played: the only touch is wind. Dragging shifts a wind vector that bends every flight path leeward until it decays back to calm.

Strict palette, four tones: ground #0A0A0B, celestial band #14161A, birds paper #F2EDE4, thermal ring gold #D9A441. No text, no gradients, no feather detail, no flapping.

## Construction

- **Rails.** Each bird rides a thermal street: a shallow S-curve run down the band, a banked turn, and the ride back.
  - theta(t) = dir * 2*pi*t/period + phase, period 46-76 s
  - x = cx + ax*sin(theta), with ax about 0.105-0.155 of the frame width
  - y = cy + flip * ay * g(theta), g = (sin^3 + 0.45 sin^5) / 1.45, ay about 0.020-0.031 of the frame height
  - A slow seeded bob (about 131 s) moves each rail center vertically by 1% of the frame height so the street does not look machined.
  - Both velocity components carry the same cos(theta) factor, so heading stays within about 25 degrees of horizontal through the turns: the bird eases at the ends of its run instead of whipping through a vertical dive. (Two earlier rail models, a closed ellipse and a 1:2 Lissajous, both force vertical headings at the loop ends; under them the birds read as origami darts. See QA log.)
- **Bank.** Signed heading rate from the rail's analytic first and second derivatives: bank = clamp(1.15 * (vx*ayy - vy*axx) / (vx^2 + vy^2), +/-0.62). Near zero along the straights, saturating in the turns. In the flat silhouette, roll is rendered as wing foreshortening (shoulder and tip heights scaled by cos(bank)), tip sweep-back (sin(bank)), and a small lean (0.12 * bank). The wing geometry itself is rigid: nothing flaps, ever.
- **Birds.** Local units, half-span = 1, heading = +x. Each wing is one rigid quad (front, shoulder, tip, back), plus a body diamond and a tail fan triangle that overlaps the body's rear point so the silhouette never notches. Condors: half-span 0.122 of min(W,H), tips almost straight out (x 0.02), longer body. Aguilas: half-span 0.100, tips swept back (x -0.20) into a shallower V, smaller body. Depth is seeded per bird (0.72 far to 1.12 near) and drives size, alpha (0.60 to 1.00), and wind response. Species order, rail centers (hand-set spread plus seeded jitter), phases, directions, and flips all come from mulberry32, seed 656001. Far birds draw first.
- **Thermal marker and lift.** Ring center is a pure function of the clock: x = W*(0.34 + 0.16*sin(2*pi*t/170)), y at band center with a slow 97 s bob, so frame one finds it left of center. Lift per bird = 0.045*H * exp(-d^2 / (2 sigma^2)) with sigma = 0.17*W, d the distance from the bird's rail center to the ring; applied as an upward offset.
- **Wind.** Drag state only. While dragging, wind leans toward the drag displacement (clamped to 0.14*min(W,H)) at a rate of 8/s; on release it decays with a 1.8 s time constant and snaps to zero below 0.05 px, so the sky is calm again after about six seconds. Bird offset = wind * (0.45 + 0.55 * depth fraction). Wind is zero at frame one and only ever comes from recorded drags.
- **House rules.** Sizing from the Visual Viewport API with resize listeners on both visualViewport and window; canvas style pinned in px inside every draw; phone detection via window.screen minimum dimension under 700 px (aspect h > w*1.15 only as fallback when screen is absent), phone birds scaled 1.12x; band refits by frame fractions (top 4.5% to 68.5% of height). Frame one is the synchronous draw at t = 0 on an anchored clock built from rAF timestamps (offset plus elapsed since load); no Date.now anywhere; rAF is typeof-guarded; no offscreen canvas, no filters, no audio.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Thumb rendered twice and cmp byte-compared: identical. Second render deleted.
- Pass 1 (ellipse rails, single-triangle wings): birds read as origami darts; headings went vertical at the loop ends and one bird poked above the band. Replaced the rail with a 1:2 Lissajous.
- Pass 2 (Lissajous rails): still vertical headings at the turnarounds (the y oscillation continues while x stalls) and the long single-triangle wings read as sails. Replaced the rail with the S-curve street above, whose velocity components share a cos(theta) factor.
- Pass 3 (S-curve rails, triangle wings): headings disciplined, but the near condor's huge triangular wings read as a kite and the tail fan notched away from the body. Wings rebuilt as tapered quads, span trimmed (condor 0.138 to 0.122), body lengthened, tail overlapped into the body, bank lean reduced (0.20 to 0.12). All renders redone; thumb byte-compare re-run, identical.
- Final read-back: six paper birds inside the band at varied depths, wings flat and rigid, headings near horizontal with visible bank on the turning birds; one thin gold ring left of center with clear space around it; mobile refits the same band to the tall frame with nothing clipped.
- Wind check: a forced render through the inert ?seed=wind hook (preset leeward wind, deleted after inspection) shows the whole flock displaced right and slightly down versus the calm frame, nearer birds more, ring unmoved. The hook is inert without the query string.

## Deviations

- The birds are drawn as seen from above/below in the flat poster manner (wingspan perpendicular to the body axis), rather than as side profiles. The prompt's geometry (triangle-built silhouettes, bank from the rail tangent, wings absolutely rigid) reads correctly in this projection, and the two projection attempts that kept a profile tangent (ellipse and Lissajous rails) failed the read as birds. Recorded here per the gate's instruction.
- The prompt says 5-7 birds; the piece flies exactly 6 (3 condors, 3 aguilas).
- No other deviations. No photorealism, no feather detail, no flapping, no gradients, no sky blue, no text.
