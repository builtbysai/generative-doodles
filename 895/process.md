# No.895 Cyan Eddy

Study #109 klsr.av, PP56 "The Eddy".

## Concept

A field of gray smoke with exactly one lit current in it. About 600 smoke
particles drift through a slow analytic curl field, and a single vortex at
the exact center of the frame pulls the whole weather into a lazy swirl.
Most particles stay gray; only the fastest tenth light up as cyan-white
filament streaks, so one bright thread is always curling through the gray
toward the eddy, whose core glows faintly cyan. The piece is grayscale
first, cyan by exception, and everything moves at current speed, never
explosion speed.

Interaction: drag to stir. Circular drags around the center feed angular
momentum into the vortex and spin it up, so the eddy tightens, brightens,
and pulls more particles over the filament threshold; straight fast drags
kick nearby particles along the drag path and tear the field into streaks.
A tap is a gust pulse, a radial impulse out of the tap point. A double-tap
calls the eye: for five seconds the curl term fades out, the vortex takes
over, and the field organizes into a clean slow spiral before releasing
back to weather. Sound starts on the first gesture only: deep watery
filtered noise whose resonant bandpass peak follows the same vortex
strength value the visuals use, so spinning the eddy up audibly raises
the resonance.

## Construction

Single self-contained index.html, canvas 2D only, no external assets.
Palette is strict: ground #0A0A0C, smoke #4A4A4E, filament #B8F0E8, eddy
core #54E8D8, deep shadow #141416. No text anywhere except the title.

Motion is a fixed-timestep simulation, as the brief requires: a 1/60 s
accumulator in the rAF loop integrates particle state from a seeded
deterministic initial condition (mulberry32). Each particle's velocity is
sampled per step from an analytic curl field (summed sines with seeded
phases, drifting very slowly in time) plus the vortex term: tangential
speed peaking at a core ring radius, with a gentle inward radial pull so
the swirl spirals rather than merely orbiting. The vortex strength is a
slow breathing LFO plus a spin boost accumulated from the signed
tangential component of the visitor's drags, decaying over about six
seconds. Drag kicks and tap gusts live in a per-particle impulse velocity
that decays exponentially. Particles wrap at the frame edges; frame one
is the seeded initial state drawn synchronously at t = 0 before any sim
step, which is what the determinism gate compares.

Rendering obeys the house limits: no gradients, no shadowBlur, no
ctx.filter, no offscreen canvas. Smoke puffs are three layered flat-alpha
discs in the two grays; the eddy core is five layered flat-alpha cyan
discs. Each frame the particle speeds are ranked and the top tenth are
drawn as two-pass streaks along their velocity (a wider, dimmer cyan pass
under a thin bright cyan-white pass). About one particle in seven is
seeded along a loose spiral arm at init so a lit current reads in the
field from the first frame.

Canvas size comes from the Visual Viewport API with resize listeners on
both visualViewport and window; the canvas CSS size is pinned in px
inside draw() every frame. Phone detection uses window.screen physical
size (min dimension under 700 px) with the aspect ratio only as fallback;
phones run about 350 particles instead of 600. Audio is created lazily
inside the first pointerdown, fully typeof-guarded, and the piece
renders complete in silence.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). All three render cleanly in
  silence: dark ground, gray smoke discs across the whole frame, a ring
  of cyan filament streaks curling around a faint cyan core at exact
  center, nothing clipped on mobile.
- Determinism: thumb.png rendered twice and byte-compared with cmp;
  identical. The duplicate render was deleted.
- One visual fix during QA: the first pass drew the eddy core too hard,
  reading as a concentric target. Layer alphas were roughly halved and
  the core radius slightly reduced so the core sits as a faint glow
  under the filament swirl; renders redone and the byte-compare rerun
  after the fix.
- Deviations from the brief: none of substance. Two recorded choices:
  (1) particles wrap at the edges instead of respawning at a random
  seeded point, because wrap keeps the smoke density even and the wrap
  itself is deterministic; respawn would read as popping. (2) During
  the eye, the vortex gains extra strength and inward pull beyond the
  curl fade, so the spiral reads as organized rather than merely calm.
