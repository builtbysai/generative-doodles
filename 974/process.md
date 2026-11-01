# No.974 — The Sound Is the Light

Study #119 kyle-mcdonald, PP135 "Light Leaks": THE SOUND IS CONTROLLED BY THE LIGHT.

## Concept

A dark cylindrical room, drawn as one curved panoramic band of near-black across the
frame. At its centre a pile of 26 mirror-spheres sits on a low platform, ringed by
slowly swirling dust made of tiny binary ticks. A single soft greenish-white beam
rakes across the pile on a slow seeded cycle. The beam is the only musician: a
sphere sounds only while the light is on it. Each sphere carries one sine voice
whose pitch is mapped from its position in the pile (200-1200 Hz across the pile,
left-to-right rank lifted by height). Where the beam touches, the sphere flares
with a star-burst and throws off an expanding mint ring, the tone made visible.
Nothing twinkles on its own; every flare and every note is caused by the beam.

## Construction

- Causality model: the beam is a straight band whose centre point and tilt are a
  closed-form composition of slow LFOs (a main sweep of 34-60 s period, a 13.7 s
  secondary, a 31 s tilt wobble, a 23 s vertical sway), seeded per composition.
  Each composition lasts 180 s of piece time; the last 4 s crossfade into the next
  cycle's parameter set so the path re-seeds without a jump cut.
- Fixed-step simulation at 120 Hz. Per step, each sphere's beam intensity is the
  smoothstepped perpendicular distance from its centre to the beam centreline,
  normalised by the beam half-width. Flare level attacks fast toward intensity and
  decays with a 0.45 s time constant, so dwell reads as brightness: a sphere the
  beam lingers on burns brighter than one it brushes.
- Ripples are an event list, not a field: a mint ring spawns when a sphere's flare
  level crosses 0.5 upward, and re-spawns at most every 1.15 s while a level stays
  above 0.78 (a pinned sphere pulses slowly rather than strobing). Rings expand at
  46 px/s and die at 2.2 s.
- Frame one: at load the sim pre-rolls exactly 3600 fixed steps (30 s) before the
  first synchronous draw, so frame one already has the beam inside the pile, four
  spheres mid-flare and three ripples mid-expansion. No wall clock feeds the drawn
  state; `Date.now` appears nowhere.
- Dust: 90 particles (60 on phones) on seeded elliptical orbits around the pile,
  positions closed-form in piece time, drawn as alternating dark/light binary
  micro-ticks. A tick shimmers in beam colour when the beam intensity at its
  position exceeds 0.25.
- The room band is two quadratic curves (top edge dipping at centre, bottom edge
  bulging) filled one step above the void: void #060709, band #0B0D10. The beam is
  drawn as three layered flat-alpha polygons (no gradients), plus one soft wash
  pass over the pile so lit spheres sit inside the light.
- Audio is lazy and typeof-guarded, created on the first pointer gesture only:
  a 55 Hz + 82.5 Hz sub-drone bed, and one sine voice per sphere whose gain tracks
  its flare level each frame. The visual piece is complete in silence. On a
  double-tap reseed the old voices are stopped and disconnected before new ones
  are built for the new pile.
- Interaction: TAP cues the light: the beam's centre blends over ~1 s to a line
  through the tap point, holds, and blends back over 7 s, so spheres along that
  line flare in sequence. A tap is held 0.35 s of piece time so a double-tap can
  pre-empt it. DRAG-HOLD pins the beam on the held point; spheres under it sustain
  their flares and the chord holds; release resumes the sweep. DOUBLE-TAP starts a
  new composition: new seeded pile, new beam path, ripples cleared.
- House rules honoured: canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas CSS size pinned in px on
  every draw; phone detection via window.screen (min dimension < 700 px) with the
  h > w*1.15 aspect fallback; page ground is the chamber tone; rAF guarded by a
  typeof check; no gradients, no shadowBlur, no ctx.filter, no offscreen canvas,
  no microphone, no visible text beyond the title.

## QA log

- Rendered with render-piece.js (node-canvas) at 1280x900, 390x844 and 720x720.
  All three complete in silence, no errors.
- Determinism: thumb.png rendered twice and cmp-compared byte-identical, verified
  again after the audio-teardown fix; the duplicate render was deleted.
- Desktop/thumb read-back: near-black chamber band curving across the frame, the
  platform ellipse centred with 26 pale spheres (specular dots upper-left), the
  beam raking in from the upper right across the pile's right half, four spheres
  mid-flare with white star-bursts, three mint ripples expanding, dust ticks
  ringing the pile with shimmer near the beam.
- Mobile read-back: phone layout taken via window.screen; 22 spheres, pile and
  beam centred in the tall frame, flares and ripples legible, nothing clipped.
- Hygiene grep: zero hits for Date.now, createElement, shadowBlur, gradients,
  getUserMedia; audio only behind the first gesture.

## Deviations

- Sphere count is 26 on desktop and 22 on phones (spec range 20-30 either way);
  the phone reduction keeps the pile readable at 390 px wide.
- The room band tone #0B0D10 is not in the prompt palette; the prompt asks for the
  band to sit one step above the void, and #060709 is the only near-black given,
  so one derived step was taken and the palette is otherwise exact.
- Platform rim is stroked with the dust-dark palette tone #3A3D46 at 0.35 alpha so
  the platform edge reads against the band; no new hue introduced.
- Ripple re-triggering under a sustained flare is throttled to 1.15 s intervals;
  the prompt says pinned spheres sustain their tones into a chord, and the slower
  visual pulse keeps the sustain from reading as a strobe.
