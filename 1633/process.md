# Paint, Vanish, Repeat - process notes

## What it is
Study #215 marcelo-soria-rodriguez, prompt MSR2 (PP880 The Vanishing
Paint). A painting machine that paints itself in front of the viewer:
fine hatched arcs and translucent circles laid down group by group from
the centre outward, then a vanishing mode that crossfades the image to
near-nothing over 6 seconds and repaints it at a different time scale.
The artwork is the performance of painting, not the final image.

## Driver
The piece is the performance of painting. The watchable behaviour is
strokes being laid down, vanishing, and repainting at a different time
scale. Everything in the build serves that: strokes appear one at a
time with a visible brush tip, groups stay fully visible while the next
group is drawn, the vanish is a slow crossfade rather than a cut, and
no two cycles are alike.

## Design decisions
- Cycles: each cycle paints 8 stroke groups in ring order, centre
  outward, then vanishes over VANISH = 6 s, then the next cycle begins.
  Cycle parameters come from mulberry32(SEED + cycle * 7919): time
  scale, rotation, stroke counts, colours, and the egg position all
  change every cycle. Measured: cycle 1 time scale 1.413 (paint
  33.9 s, 63 strokes), cycle 2 time scale 1.565 (paint 37.6 s,
  60 strokes), cycle 3 time scale 0.857 (paint 20.6 s, 64 strokes).
  No cycle repeats the previous one.
- Strokes: 7 to 9 per group, about 60 per cycle. Two kinds: hatched
  arcs (arc segment plus radial hatch ticks that appear as the arc is
  drawn) and translucent circles (low-alpha fill plus a stronger
  outline arc). Each stroke reveals progressively over its own time
  slice, so the painted area grows monotonically through the paint
  phase. A small filled dot marks the leading tip of the stroke
  currently being drawn, the visible brush agent.
- Colours: warm paper cream ground #F2EAD8; ink strokes in sienna
  #A0522D, indigo #2E4057, oxblood #6E2434; the vanishing wash in pale
  grey #D9D9D2.
- Easter egg: one small indigo eight-point star, at a seeded position
  that changes every cycle. It is drawn ONLY during the vanishing
  phase, fading in as the painting fades out and fading away in the
  last 0.6 s of the vanish, so it is visible only while the painting
  vanishes. Cycle 1 egg sits right of centre (probe pixel 492, 377 at
  720x720). Verified visually in a mid-vanish render: the dark star
  stands out against the washed-out painting.
- Interaction: watch-first and fully autonomous. Tap toggles pause:
  the clock freezes, so the brush agents stop exactly where they
  stand; a second tap resumes from the same instant. Never
  click-to-restart, no reload, no reset button.
- Composition: portrait field. Full-bleed on phones; centred portrait
  sheet on desktop with the page ground the piece's own paper cream.
  Title "Paint, Vanish, Repeat", date "2006 · 07 · 02", hint "Tap to
  pause the painting mid-stroke." No em dashes in visible copy.
- No progress bar, no UI chrome, no audio.

## Deviations from the prompt
- The prompt's technical approach paints each cycle to an offscreen
  buffer with per-stroke alpha. This build draws strokes directly with
  per-stroke alpha and crossfades them with a stroke alpha multiplier
  plus the pale grey wash, because the node-canvas QA harness provides
  no document.createElement for an offscreen canvas. The visible
  result is the same: strokes fade together to near-nothing under the
  wash, then the next cycle repaints from a blank field.
- The prompt says the vanishing mode fires after the painting is
  complete; this build holds the completed painting only for the
  instant the paint phase ends before the 6 s vanish begins, so the
  loop keeps moving. The completed state is still visible and is what
  reduced-motion viewers see.

## House rules applied
- Visual Viewport sizing with resize listened to on both
  visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  (min dimension under 700 px) with aspect fallback (h > w * 1.15);
  one synchronous frame at load; every requestAnimationFrame guarded
  with a typeof check so node-canvas QA works.
- Deterministic fixed-phase first frame: frame one is at 45% of cycle
  1's paint phase, so the thumb shows a partly painted work growing
  from the centre, never a blank field. No Math.random anywhere; all
  randomness is the seeded PRNG. Reduced-motion draws the completed
  cycle 1 painting immediately.
- Flicker: none by construction; the only motion is slow stroke
  reveals and the 6 s crossfade, well below 14 Hz. Flat colours, no
  decorative gradients, no shadowBlur.
- QA hook: ?cycle=K previews cycle K at a mid-paint phase.

## Acceptance criteria, measured
Probe harness: /tmp/probe-1633.js, evaluating the actual script with
node-canvas at 720x720.
- Painted-pixel count grows monotonically during a paint phase:
  10,882 / 21,520 / 30,787 / 44,885 / 64,918 ink pixels at 15 / 35 /
  55 / 75 / 95% of cycle 1 paint, strictly increasing. PASS.
- Vanishing crossfades to near-nothing over the stated 6 s: ink pixels
  inside the painting rect fall from 64,918 at 95% paint to 20,235 at
  mid-vanish and 0 at the end of the vanish (threshold 18 per channel
  against the wash-blended ground). PASS.
- Cycle 2 parameters differ from cycle 1 and its time scale differs:
  time scale 1.413 vs 1.565, paint 33.9 s vs 37.6 s, rotation 2.304 vs
  2.382 rad, 63 vs 60 strokes. PASS. A cycle 2 render is visibly a
  different painting.
- Each cycle contains one hidden Easter egg motif visible only during
  one phase: indigo eight-point star, vanishing phase only (see
  Design decisions). Probe: egg-region ink 342 at mid-vanish, 0 at
  vanish end; the star is absent from paint-phase drawing by
  construction (drawEgg is only called when fade > 0). PASS.
- Tap toggles pause mid-stroke, freezing brush agents exactly where
  they stand, second tap resumes: pause flag false to true to false
  across two taps; two draws at the same frozen clock are
  pixel-identical (PNG buffers equal). PASS.
- Frame one deterministic: two draws at PHASE produce byte-identical
  PNG buffers. PASS.
- No progress bar, no UI chrome: only title, date, and hint plates.
  PASS.

## QA
- Rendered from the actual script with node render-piece.js at
  1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three
  renders inspected visually. Mid-paint cluster of hatched arcs and
  translucent circles in sienna, indigo, and oxblood reads clearly;
  title, date, and hint all legible on both sizes; portrait sheet
  centred on desktop, full-bleed on mobile.
- Mid-vanish render (PHASE forced to paint end + 3 s in a /tmp copy
  only) inspected: full painting faded under the pale grey wash, the
  indigo star egg clearly visible right of centre, title and hint
  plates untouched by the wash.
- Cycle 2 render (?cycle=1 preview in a /tmp copy only) inspected:
  visibly different painting, stronger oxblood presence, different
  arrangement.
- Thumb byte-identical across two consecutive renders:
  md5 a2a450695332097c7e2ef7bf23496813, both runs.
