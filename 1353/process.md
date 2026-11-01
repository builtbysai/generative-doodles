# №1353 "Breath Vessels" (cannupa-hanska-luger CH2, PP576)

## What it is

A night field of eight hand-built globular whistle vessels resting on bare
earth under a dark, faintly starred sky. The vessels stand as an organ row in
two staggered depths — a smaller back row and a larger front row — so depth
reads by scale, never by perspective. Each vessel is an irregular seeded blob
in stoneware #6b5a4a with char shading, speckle flecks, and a tilted head
bump suggesting a dingo/bird/animal head, with a small dark mouth aperture at
its tip. Three vessels carry a faint warm chamber glow at rest.

## Motion and interaction

- Fixed 30 s clock (the visitor cannot change it, only join it): vessel k
  blows at cycle time k × 3 s, strictly left-to-right by x position. A blow is
  a visible breath ripple — an expanding flat-alpha ember ring from the
  aperture, plus a second trailing ring — and a glow pulse in the vessel's
  chamber. The sequence reads as call-and-response across the row.
- Drag across the field is the visitor's breath: the nearest vessel answers
  with a stronger, warmer ripple and a glow boost that decays over ~2.5 s.
  Drag state is a recorded event list; every ripple and glow is a closed-form
  function of piece time and those events, never frame-integrated state.
- Watch-first; no buttons, no instructions on screen, no click-to-reload.

## Adaptations (all documented, all deliberate)

- **Audio rule (overrides the prompt's clock tone):** the 30 s clock breath is
  visual only. Tones sound ONLY via lazily created, typeof-guarded WebAudio
  inside the drag gesture — a low sine, 90–174 Hz by vessel index, panned by
  vessel x position, 1.2 s decay. No autoplay, no clock audio, no microphone.
- **WebGL/shader specs adapted to canvas 2D:** the QA renderer has no WebGL,
  so vessels are procedural flat shapes, breath is expanding flat-alpha
  rings, and there are no shaders anywhere.
- **No camera, no gradients, no shadowBlur, no Path2D, no offscreen canvas,
  no createElement** — everything draws directly on the main canvas.
- **Determinism:** frame one is a synchronous fixed-phase draw(0) via a boot
  flag; the rAF clock starts only with the loop. All randomness comes from
  seeded mulberry32 streams (seed 1353000 + index × 7919), never Math.random.
  The rAF loop is a plain function declaration behind a typeof guard.
- **Phone presentation:** canvas pinned in draw(), sized from the Visual
  Viewport API, phone detected via window.screen physical size (min dimension
  < 700 px) with aspect fallback; the centered composition keeps its shape on
  narrow screens with the page ground in the piece's own sky color.

## Study-wide rule

No readable English anywhere on screen. The piece carries no text at all
except the HTML title.

## QA (2026-11-01, fly's gate)

- Rendered with the QA renderer at 1280×900, 390×844, and 720×720; all three
  inspected. Thumb renders byte-identical across repeated renders.
- Fix round: the first head bumps read as detached balls (a "snowman"
  effect). They were reworked into tilted, faintly outlined bumps embedded in
  the vessel shoulder, with the aperture moved to the bump's tip.
- Forced-time probes (probe harness driving the piece's own rAF loop and
  pointer listeners): t = 0 baseline 5,367 ember pixels (chamber glows only);
  t = 1.0 → 13,064 (vessel 0's blow ring visibly crossing the field, confirmed
  in the probe render); t = 4.0 → 9,998 (vessel 1's ring); drag at t = 5.0 →
  7,839 ember pixels at t = 5.6 (visitor ripple + glow boost). An early probe
  bug (first loop invocation anchors the clock, so an unprimed drive always
  draws t = 0) was fixed in the harness, not the piece.
- Token scan clean except one comment stating Math.random is never used.
- md5 of shipped index.html: 29c4d6991914d44790fc29fcdd2dfd43
