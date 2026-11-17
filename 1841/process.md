# №1841 Three Inventors (PS2, PP1088, #241 phillip-sollmann)

Gallery date: 2007 · 01 · 26. Interaction: Watch only.

## Driver

Three lineages of invented sound share one dark stage, and none of them needs a
player. On the left, thin metal leaves hang in a steel frame and tremble the
way Bertoia's rods do when the air moves. In the middle, wooden bars of
graduated length are struck by small mallets with no hands on them, Partch's
instruments playing themselves. On the right, a perforated brass disc spins
before a nozzle, chopping air into a siren tone the way Helmholtz's siren did.
Over all of it a slow band of color crosses the stage, its hue drifting from
deep blue toward amber, paraphrasing changes in the sound too small to notice
at first. The viewer does nothing but watch the microscopic developments.

## Mechanism

2D canvas, one synchronous frame at load, motion loop on requestAnimationFrame
with reduced-motion support (static frame only). House template mirrored from
№1836: Visual Viewport sizing with resize on visualViewport and window,
canvas pinned in draw() via style width/height, phone detection via
window.screen with aspect fallback, full-bleed on phones and square on
desktop.

- Bertoia station: seven steel leaves hang from a top bar inside a frame.
  Each leaf sways on two slow closed-form sines plus a decaying ring from
  seeded pluck events (Poisson schedule, mulberry32(1841), 240 s horizon).
- Partch station: eight pale wood bars, graduated in length, struck by small
  mallets with no hands. Seeded strike schedule (same generator, 0.35/s);
  on a strike the mallet dips and the bar vibrates with an exponentially
  decaying sine. Bar pitches follow just-intonation ratios 1, 9/8, 5/4, 4/3,
  3/2, 5/3, 15/8, 2 over a 196 Hz base.
- Helmholtz station: a brass disc with twelve perforations rotates once per
  24 s on an axle stand; a steel nozzle tube from the right aims at its rim,
  with a faint air wedge between nozzle and disc.
- Color band: a soft horizontal wash (vertical gradient, peak alpha 0.14)
  whose hue is the closed-form function 130 + 90*sin(2*pi*t/240), deep blue
  to amber over a 240 s cycle, with a slow left-to-right luminance sweep
  (90 s) inside the wash. Never a hard beam.
- Sound: default silent. A Sound toggle plate (bottom right) starts WebAudio
  only on tap: bar strikes sound as marimba tones, leaf plucks as inharmonic
  metallic partials, and the siren as a quiet sine gliding on the closed-form
  frequency 520 + 260*sin(2*pi*t/47). Visuals work fully with audio off.
  No oscillators are drawn; only the objects appear.

## Deviations from the prompt

None material. The color band's left-to-right traversal is rendered as a
slow luminance sweep inside the horizontal wash plus the hue traversal, so
the band stays a soft wash rather than a moving beam. The nozzle is drawn as
a short steel tube with a flared tip rather than a bare pipe end, so it reads
as a nozzle at small sizes.

## Fixed frame-one phase

t = 63.0 s. At this phase the band hue is 219.7 (deep blue), bar 3 is
mid-strike (seeded strike at t = 62.85), and leaf 2 is ringing (seeded pluck
at t = 62.70, amplitude 0.9). All motion is a closed-form function of t with
seeded schedules only; no wall clock, Date.now, or unseeded random at frame
one. Thumb re-rendered twice: identical md5, byte gate passes.

## QA

Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, 720x720 thumb;
all three inspected. Desktop: three stations read clearly in a row, band is a
soft blue wash, plates legible, nothing spills past the scene edges. Mobile:
full-bleed, all stations legible, disc and nozzle read at small size. Fixed
during QA: leaves were first placed across the full width and strayed into
the center and right stations; their positions were corrected to span only
the Bertoia frame. The nozzle was first a stroked line with a triangle tip
and read as an arrow; it is now a filled tube with a flared tip.

Parent fix round (gate, 2026-11-16 22:45 run): the Helmholtz nozzle tube ended exactly at the scene's right edge and was clipped on phones; disc center moved 0.81 to 0.79 of scene width and nozzle shortened 0.067 to 0.045, so the full nozzle sits inside the frame on all sizes. Thumb re-rendered and re-gated byte-identical.
