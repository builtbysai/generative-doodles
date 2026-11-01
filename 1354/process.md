# №1354 "Mirror Shield Line" (cannupa-hanska-luger CH3, PP577)

A horizontal line of six hand-made shields — plywood rectangles wrapped in
reflective film, taped edges, visible seams — each catching a different slice
of the sky behind the viewer. Drag a shield to tilt it; align all shields to
the same tilt and the sky snaps whole across the row. Release and they drift
back.

## Composition

- Six shields in a slight arc across mid-screen on a dark earth ground
  (#201a14), each tilted differently at frame one (seeded base tilts ±0.15 rad,
  idle sway ±0.015 rad on 7–13 s periods).
- Each shield: plywood body (#a9825a) with seeded grain flecks and corner nail
  dots, a reflective silver face (#c8ccd2), a duct-tape gray (#6e6e6e) top
  strip, corner patches, and one vertical taped seam. A flat-alpha ground
  shadow sits under each shield. No chrome, no gloss: the shields read as
  taped and handmade.
- The sky is five horizontal bands (upper blue, pale blue, warm cream, tan,
  low brown) plus one warm disc fixed in sky space. Each shield samples a
  different window of that sky: window offset follows the shield's tilt, so
  band alignments and the disc's position differ shield to shield at frame
  one, and line up exactly when the tilts agree.

## Interaction

- Drag-only. Pointer down on a shield grabs it; horizontal drag changes its
  tilt (0.0035 rad/px, clamped ±0.42 rad); the reflection shifts with the
  tilt. No tap action, no buttons, no instructions on screen, never
  click-to-reload.
- Alignment: when all six tilts agree within 0.09 rad, every shield samples
  the same sky slice (plus a faint 0.05 white wash as the snap cue), so the
  bands run continuous across the row — the chord of alignment.
- Release: a shield drifts back to its own base tilt on a slow exponential
  (tau 6 s). The slowness is deliberate: a single pointer can build the
  chord shield by shield before the row relaxes. Multi-touch is also
  supported — each pointer owns one shield, so a multi-finger chord holds
  all tilts exactly while held.

## Adaptations (all recorded, all scoped)

- Sky as seeded drifting flat-alpha bands, NOT the device clock: a
  clock-driven sky would break frame-one reproducibility for the byte gate.
  The drift is a closed-form sine of piece time (0.03 amplitude, 75 s
  period), and the prompt's "drifting gradient" is rendered as layered
  flat-alpha bands, never a canvas gradient.
- No offscreen canvas, no shadowBlur, no Path2D, no createElement, no
  AudioContext (silent piece). All drawing is direct on the main canvas;
  faces use save/clip with a plain rect path.
- Determinism: frame one draws synchronously at exactly t = 0 via a boot
  flag; the clock starts only with the rAF loop (plain function declaration
  behind a typeof guard — the №1278 lesson, caught during writing before
  first render). All randomness comes from mulberry32 streams (seed 1354000
  + index × 7919), never Math.random.
- Study-wide rule honored: no readable English anywhere — no text at all
  except `<title>`. No slogans, fists, or political iconography.
- Phone: the row scales to fit (53 px shields at 390 wide) and keeps the
  single-line composition; the page ground is the piece's own #201a14.

## Verification

- Rendered at 1280×900, 390×844, and 720×720 and inspected all three; thumb
  byte-identical across three renders and matching the shipped thumb.
- Probe harness (driving the piece's own pointer listeners, stubbed rAF for
  manual time control): frame-one band profiles agree only 6.6/9 across
  shields (distinct slices); a +120 px drag changes 27,211 px in that
  shield's region; a held six-pointer chord scores 9.0/9 profile agreement
  (sky snapped whole); a sequential single-pointer chord still scores 9.0/9
  one second after the drags (slow drift-back working); ten seconds after
  the drags agreement falls to 6.2/9 (drifted back apart, as specced).
- Fix rounds: one. The first alignment design (fast tau-0.9 s drift-back)
  made the chord unreachable with a single pointer, because release always
  returns each shield to its own base tilt; fixed with multi-pointer
  support plus the slow tau-6 s drift-back. The first probe's band-edge
  metric was also degenerate at large tilts (face-top wrap) and was replaced
  with a band-profile agreement metric before trusting the result.
- Token scan clean: no Math.random (one comment only, stating it is never
  used), no createElement, no AudioContext, no getUserMedia, no gradients,
  no Path2D, no offscreen canvas.
