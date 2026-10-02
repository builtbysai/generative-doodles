# №9041 · Lunar Strip, process notes

Twenty-nine small moon discs in a single horizontal band: one full lunation,
left to right. New, crescent, half, gibbous, full, and back again. The
terminator on each disc is hand-wobbled, never a perfect ellipse. The single
full moon is warm gold, the only color on the sheet.

## Concept

A systematic chart that reads as a print. The idea is one sentence: the moon,
night after night, drawn the way an almanac would if it cared about beauty.
Northern hemisphere convention throughout: waxing moons lit on the right,
waning on the left.

## Technique

- Phases from the real synodic month (29.53 days): disc i gets phase
  (i + 0.5) / 29.53, illumination (1 - cos(2πp)) / 2. The gold disc is
  whichever disc computes the maximum illumination (always i = 14), never
  hardcoded.
- Each phase is built geometrically: the lit region is bounded by the
  wobbled outline limb on the lit side and a half-ellipse terminator whose
  midpoint sits at ±r·cos(phase angle) from center, east for waxing crescent,
  west for waxing gibbous, mirrored for waning. Rendered as one path filled
  with the even-odd rule: ink everywhere except the lit region, so the lit
  part is untouched paper, never flat fill.
- Hand wobble in two places: the disc outline (±2.25% radius noise) and the
  terminator (±6% radius, tapered to zero at the poles so it always meets the
  limb). Faint earthshine wash (alpha 0.055) keeps new moons legible as discs.
- Gold moon: restrained radial glow (2.4r, low alpha), gently modeled gold
  disc, four whisper-faint maria blotches, thin ink outline.
- Print voice per the house rules: warm paper gradient, 36 faint stars kept
  clear of the band, wobbly plate frame, 6000 grain dots, vignette.
- Viewport-invariant 1000×1000 virtual units; click reseeds via ?seed=.

## QA (2026-10-02, local, honest)

- `node --check` on extracted script: clean. No em dashes anywhere.
- CDP fail-closed exception probe (isolated port 9343), desktop and mobile:
  zero exceptions, zero console errors.
- Rendered at 5 seeds (11, 424242, 777001, 90210, 31337) and inspected every
  one at full size: all 29 phases legible in each, gold moon present and
  unclipped, no disc clipped by the frame, stars faint and clear of the band.
- Phase correctness was the hard part and got two rounds of verification:
  (1) an isolated 5-phase test strip (p = 0.525, 0.56, 0.63, 0.73, 0.86)
  rendered large and inspected, all correct; (2) magnified crops of the
  waxing-crescent and waning-gibbous regions of the full strip, every disc
  checked against its computed illumination. Caught and fixed a real bug in
  review: the first terminator formula mirrored the bulge sign, which
  rendered near-full waxing discs as dark (verified wrong on the zoom, fixed,
  re-verified).
- Desktop 850px and mobile 390×844 inspected: square print centers, caption
  holds, no overflow.
- Default seed 11: phases are deterministic across seeds; 11 chosen for a
  balanced star field and clean disc spacing. No seed was rejected; all five
  inspected seeds were composed.

## Revision (Bug, 2026-10-02)
Pixel review: the phases were too small to read at normal viewing size.
Moon radius 11.5 to 14.5, band widened (x 64 to 936), x-jitter tightened.
Re-rendered seed 11 and re-verified: progression legible, no exceptions.
