# №1362 "Tremble Staves" (raven-chacon RC3, PP585)

A wordless water opera after Chacon's *Tremble Staves* (2017–2019): a cello
floats half-submerged in dark water, a bird-figure crosses on a fixed clock
and tows it, and two hands must fret and bow the same instrument to voice it.

## Frame one (t = 0, boot-flagged)

Night sky `#05080C` with seeded stars above a horizon at exactly 60% height;
deep water `#0E2A38` below. The cello drifts at center: bone body
`#E8E0D0` with rust wear, dark neck and scroll, four string lines, slanted
f-hole strokes, tailpiece — the lower half tinted by a translucent water
overlay so it reads half-submerged, with a foam ring at the waterline.
Ambient standing-pool ripple rings shimmer faintly. No bird yet (it enters
on the fixed clock); no text except `<title>`.

## Motion and interaction (all closed-form over piece time + recorded events)

- Bobbing: the cello rides a 6 s sine (±3.5 px) with a 9 s tilt sine (±0.03 rad).
- Bird: 48 s loop; during phase 10–22 s a dark-slate silhouette (body, head,
  beak, flapping wings) crosses left to right at ~25% height, tethered to the
  cello while near it; the cello is towed up to 10% of frame width toward the
  bird and eases back to center by phase 30 s.
- Ripples: seven seeded standing-pool sources pulse periodic expanding
  flat-alpha rings; drags in the water record samples and spawn expanding
  rings (6 s life) along the drag path.
- Multi-touch cello: one touch on the cello frets (small light dot); a second
  touch bows (larger glow). Tones sound only while touches are held.
- Drag anywhere else in the water disturbs it; drag never reloads anything.

## Adaptations

- Water ripple is closed-form expanding flat-alpha rings from recorded
  disturbances — no heightfield buffer, since the QA renderer paints one frame.
- Cello is a simple silhouette with string lines; the bird-figure is a
  silhouette only, never realistic. The bird is filled `#16202E`, slightly
  lighter than the night sky, so it reads against it (a true-black silhouette
  was invisible).
- Audio: bowed-string tones ONLY via lazily created, typeof-guarded WebAudio
  inside pointer gestures, gated by touch count (one touch: 98 Hz sawtooth
  through a lowpass; two touches add a 146.8 Hz triangle harmony). Nothing
  sounds on the clock, nothing autoplays, no microphone.
- No offscreen canvas, no gradients, no shadowBlur, no Path2D, no
  createElement. Canvas size comes from the Visual Viewport API with
  window.innerWidth/Height fallback; the canvas is pinned in draw();
  phone detection uses window.screen physical size (min dimension < 700 px)
  with the aspect fallback; the field-like composition goes full-bleed on
  phones.

## Determinism

Frame one is `draw(0)` via a boot flag; the clock starts only with the rAF
loop (a plain function declaration behind a typeof guard). All randomness
comes from mulberry32 streams (seed 1362000 + index × 7919), never
Math.random. The thumb renders byte-identical across repeated renders.

## QA and fix rounds

- Rendered at 1280×900, 390×844, 720×720 and inspected all three; thumb
  byte-identical across repeated renders, including after the final fix.
- Fix round 1: the first body (two overlapping ellipses + rect) read as a
  round blob with no waist and its f-hole arcs read as closed eyes. Rebuilt
  as a single waisted bezier outline (upper bout, pinched waist, lower bout,
  pointed bottom) with slanted f-hole strokes; the waterline now crosses at
  the waist, so the cello reads half-submerged.
- Fix round 2: the bird silhouette was first filled sky-black and invisible
  against the sky; refilled slightly lighter (`#16202E`).
- Matched-timestamp probe harness (stubbed rAF, piece's own pointer
  listeners): bird region at t = 16 differs by 2,076 px vs t = 0 (bird
  visible mid-crossing, cello towed); a drag at t = 16 changes 912 px at
  t = 16.5, all confined to the drag-path band with 0 px in a far control
  region; a cello touch changes 276 px, all inside the cello region, with
  no crash in the audio-less harness. An early probe bug (first rAF
  invocation anchors the clock, so an unprimed drive always draws t = 0)
  was fixed in the harness, not the piece.
- Token scan: no Math.random, createElement, getUserMedia, Path2D, gradients,
  shadowBlur, or offscreen canvas; the single AudioContext mention is the
  typeof-guarded lazy creation inside the gesture path.
