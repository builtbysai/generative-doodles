# №7 · Tide - process notes

## Concept
A pendulum wave. A row of glowing bobs hangs from a pivot bar, each
swinging at a slightly different frequency. They start in unison, then
the frequency differences bloom into traveling waves: clusters form,
dissolve, and re-form, and the whole row breathes back into alignment
on a slow cycle. Drag to stir: nearby bobs are pushed and settle back
on springs.

## Construction
- Single self-contained page, canvas 2D, requestAnimationFrame, no
  libraries. mulberry32 PRNG; default seed 7. `?seed=` shareable;
  `?t0=` jumps to a time offset (used for the thumb).
- Physics: bob i swings at f0 + i*df (f0 ~0.32-0.42 Hz, df ~0.006-0.01).
  Angle = amp * sin(2*pi*f*t). All phases start at 0 for the unison
  opening. Touch adds spring-damper offsets (stiffness 14, damping 4.5).
- Rendering: fade with rgba(ground, 0.20) each frame for trails.
  Strings are 1px rgba white 0.13. Bobs are pre-rendered radial glow
  sprites (16 hues, cyan to magenta) plus a solid bright core.
  DPR capped at 2; Visual Viewport sizing; canvas pinned by style.
- Palette: cyan #... to magenta across the row (hue 180-200 to 300-330)
  on near-black #050508. 26-60 bobs depending on width, 60fps on phones.

## Differentiation
- vs No.10 (Drift): Drift is a vortex flow field with neon trails.
  Tide is a physical pendulum system; its interest is in harmonic
  interference, not fluid advection.
- vs No.14 (Armature): Armature is rotating 3D wireframe solids. Tide
  is 2D, gravitational, meditative.
- vs No.8923 (Night Water): Night Water is free-floating motes you
  stir. Tide is constrained harmonic motion; the wave patterns are
  emergent from the frequency lattice, not from touch.
- Family name: "harmonic systems". First pendulum piece in the series.

## Motion
Continuous evolution, not a loop. Frequencies differ per bob so the
pattern never exactly repeats within a viewing session; unison returns
approximately every 1/df seconds (~100-160s). Hypnotic, never chaotic.
Touch to disturb, watch it settle.
