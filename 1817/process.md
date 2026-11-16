# №1817 The Bowing Clock

## Prompt (TASKS.md, PP1064, study #238 arnold-dreyblatt, reference M3)

Title: The Bowing Clock. A single bow arm strokes in an unbroken metronomic rhythm, seen in closeup. Each downstroke releases a pulse ring that travels outward through a ring of modified instruments (bass bodies, cimbalom frames, a hurdy gurdy wheel) arranged around the arm; the instruments light up only when the pulse passes them. The arm is the only clock in the piece. Palette: rehearsal-room grey, amber stage light, black shadows. Composition: the arm centered; instruments as a radial ensemble around it; pulse rings expanding on each stroke. Motion-interaction: watch-only. Small accents occasionally shift between strokes, but the stroke rate never wavers. No input. Technical approach: a single master clock drives both the arm animation and the instrument responses; response brightness follows a fixed delay per instrument distance from the arm. What to avoid: do not make this a drum machine with kick visuals; the pulse must visibly originate in the arm, not in a grid or sequencer UI.

## Build

- Single self-contained index.html. One master clock, phaseT in seconds, drives the arm angle and every pulse ring, so the arm and the instrument responses can never drift apart.
- Arm: a tapered bow rod pivoted at the center, swinging 0.55 rad either side of vertical with a 2.0 s full cycle. One downstroke per cycle, 30 downstrokes per minute (0.5 Hz), constant by construction. Amber tip and frog grip, dark hub.
- Pulse rings: launched at the bottom of each downstroke (t = 1.5 s mod 2 s), expanding at 0.48 S per 1.8 s (S = min viewport side), fading over a 1.8 s life. No grid, no sequencer UI, no kick visuals; the ring is born at the arm hub.
- Radial ensemble, 8 instruments, fixed positions, fixed distances, asserted count:
  - Inner ring, distance 0.24 S, pulse delay 0.900 s: bass body at 0 deg, cimbalom frame at 90 deg, bass body at 180 deg, hurdy gurdy wheel at 270 deg.
  - Outer ring, distance 0.36 S, pulse delay 1.350 s: hurdy gurdy wheel at 45 deg, cimbalom frame at 135 deg, bass body at 225 deg, hurdy gurdy wheel at 315 deg.
  - Delay = distance / ring speed, ring speed 0.2667 S per second.
  - Instrument brightness peaks as a ring crosses its distance (Gaussian falloff plus a short trailing afterglow), so instruments light in turn, inner ring first, outer ring second.
- Small accent dots on each instrument shift once per stroke, as a deterministic function of the stroke index (seeded mulberry32(1817)); the stroke rate never wavers.
- Palette: rehearsal grey ground #3B3B37, amber stage light #E8A33D / #F2C878 / #C07F22, black shadows #1A1A18, grey instrument line #8A8A82.
- Watch-only, no input handlers. Flicker is nil by construction: the only periodic motion is the 0.5 Hz arm and the slow pulse rings. prefers-reduced-motion renders the still frame one.
- Frame one is fixed phase t = 10.7 s: arm mid-downstroke (angle +0.445 rad, moving down), pulse ring at 0.32 S, partway out, inner ring instruments lit amber and the outer ring approaching lit. Deterministic, seeded PRNG only.
- Plates: title plate "The Bowing Clock" with date "2007 · 01 · 02" top left, hint plate "Watch only." bottom left. Page ground is the piece's own rehearsal grey; centered geometry kept, full-bleed field treatment not applicable.
- House rules: Visual Viewport sizing with resize listeners on visualViewport and window; canvas pinned in draw() via canvas.style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback; one synchronous frame at load; requestAnimationFrame guarded by a typeof check.

## Deviations from the prompt

None material. Two clarifications: the prompt says "a ring of modified instruments" without a count; this build fixes the ensemble at 8 instruments on two rings (listed above) so the pulse delay per instrument is a fixed function of distance. The prompt's "small accents occasionally shift between strokes" is implemented as accent dots that shift once per stroke index.

## QA

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually.
- Round 1: instruments too large and overlapping, shadow pools and halos drawn at full-frame scale, bass necks reaching the frame edge on mobile. Fixed by shrinking the instrument scale (0.55 to 0.32 of S), tightening the rings (0.26/0.40 to 0.24/0.36 of S), shortening bass necks, and scaling shadow, halo, and accent offsets to instrument size.
- Round 2: re-rendered all three sizes and inspected again. Desktop, mobile, and thumb all read: centered bow arm mid-stroke, amber pulse ring partway out, inner instruments lit amber, outer instruments grey and waiting, plates legible, nothing clipped, no overlap between plates and the ring.
- Determinism gate: thumb.png rendered twice independently, md5 identical (bd5e37a6512569f197d51b2a75e2b1b9).
- No em dashes in visible copy. No AI-signature copy.

## Gallery

- Title: The Bowing Clock
- Date: 2007 · 01 · 02
- Note: "The arm is the only clock; the pulse lights the instruments in turn. Watch only."
