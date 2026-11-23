# №1310 "Broadcast Slices" (kristan-horton KH7, PP477)

## Prompt

A seated figure with headphones at a counter, sliced into thin vertical
strips, some mirrored, reassembled with gaps; bottle rows and poster
stamps repeat at the edges. The portrait is readable only when the
strips lock into alignment; most of the time they drift out of sync.
Grounded in Horton's Broadcast (2007).

## Build

- Kitchen-white field. The scene is drawn once per strip under a clip
  rect: an abstract seated figure (head ellipse, chrome headphone band
  and ear cups, trapezoid torso, one arm to the counter, amber cup),
  a chrome counter bar, seeded bottle rows at both edges (green, amber,
  chrome), and nine abstract stamp glyphs (diamond, ring, star, cross,
  bar) floating in the upper third. No readable words, no likeness.
- 40 vertical strips with 2 px gaps, so the slice structure reads even
  when locked. 40-second watch-only loop: 0-6 s locked, 6-24 s drift
  out, 24-32 s re-lock, 32-40 s hold. Frame one is the locked portrait.
- Mirror flips: three seeded events per loop (from a mulberry32 stream
  keyed by loop index); a flipped strip toggles and stays flipped for
  the rest of the loop, resetting at the loop boundary.
- Drag scrubs the slice-offset field: horizontal drag accumulates into
  a scrub value (0.35 px per drag px) that shifts each strip's offset
  by a per-strip sine weight, decaying back with tau 1.5 s after
  release. Scrub is computed from the recorded drag event list, never
  from frame state.

## Determinism

- Frame one draws synchronously at exactly t = 0 via a boot flag; the
  performance clock starts only with the rAF loop.
- All randomness is seeded mulberry32 (layout seed 1310, strip seed
  131007, flip seeds 1310 + loop x 7919). No Math.random.
- rAF loop is a plain function declaration behind a typeof guard.
- No offscreen canvas, no gradients, no shadowBlur, no filters, no
  audio, no visible text except the title.

## QA

- Renders inspected at 1280x900, 390x844, 720x720: locked portrait
  reads at all three sizes, mobile full-bleed.
- Thumb rendered three times plus a final re-render after the last
  edit: all cmp byte-identical.
- Forced-time probe (fake rAF clock, piece's own pointer handlers):
  frame one vs t = 15 s differs by 53,369 px (strips drifted out of
  sync); frame one vs t = 36 s differs by only 8,594 px (re-locked,
  the difference being the mirror-flipped strips persisting through
  the loop); a 300 px drag at t = 36.5 s changes 127,183 px (scrub
  permutes the slice offsets).
- Fix: removed a dead no-op assignment in the pointerdown handler
  before final render; thumb re-verified after the edit.
- Final index.html md5: 31194b7aba38fea1610a77192436c37e
