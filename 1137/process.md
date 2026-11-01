# №1137 — 483 Lines

kimchi and chips study block KC2: their 2014 Jeju piece, in which 483 nylon
threads — exactly the number of visible scanlines in an NTSC field — hang as
a folded thread-matrix whose depth is "activated by tuning."

## Idea

One NTSC field made architecture. 483 thin vertical lines fill the frame
edge to edge on black #050507, each displaced horizontally by a slow wave
field, bending and gathering into ridges and valleys like the folded
thread-matrix. Brightness is never painted on: it is computed from the
field's own geometry, so where the lines converge the phosphor blooms and a
fold ridge glows like a mountain range. Every ~45 seconds a field-sweep — a
warm horizontal band, CRT refresh — rolls top to bottom, and in its wake the
wave phases re-tune into a new fold configuration. The piece is the tuning,
happening forever.

## Implementation

- Exactly 483 core lines span the frame width at rest (NLINES = 483, kept
  at every canvas size, phones included). Because the waves displace the
  whole field sideways, guard threads continue past both edges — the
  physical thread matrix is likewise wider than its aperture — so the field
  stays full-bleed at every phase. Lines are 73-point polylines.
- Displacement is a pure function of position and effective time: two
  standing waves in y (periods ~2.3 and ~5.1 cycles per frame height, phase
  drift ~0.1 Hz), each amplitude- and phase-modulated across x, plus a broad
  travelling fold in x, plus one roaming ridge (a tanh step whose centre
  wanders with y). Six seeded configurations (mulberry32, base seed
  11372014) cycle in order.
- Convergence is analytic, not counted: the renderer evaluates dD/dx in
  closed form alongside D. Compression c = −dD/dx drives each segment's
  alpha (0.07 floor to 0.35 in phosphor #CFE4FF); past c > 0.34 a second
  pass lays short white bloom segments over the squeeze. Segments are
  bucketed into 22 alpha levels and stroked as batched paths under
  'lighter' — no gradients, no shadowBlur, no flicker noise, no VHS
  clichés.
- Field-sweep: the band position is a smootherstep of sweep progress over
  4.2 s; each point's displacement blends old → new configuration by its
  height relative to the band, so the re-tune visibly happens in the band's
  wake. A warm #FFF4E0 pass brightens segments inside the band. Sweeps fire
  every 45 s of effective time; double-tap forces one immediately.
- Interaction, all closed-form from recorded events: drag records pointer
  samples (45 ms throttle, last 16 kept); each sample pulls a local tanh
  ridge with fast attack and ~1.5 s exponential release, so a fold follows
  the hand and blooms where it sharpens. A tap that is not a double-tap
  becomes, after the 350 ms window, a 5-second hold: phase time freezes
  (holds are subtracted in effTime) and the bloom sits and intensifies. A
  double-tap cancels the pending hold and re-tunes now. Never
  click-to-reload.
- Sound, under the house Franke rule: the visuals are complete silent.
  WebAudio is created lazily inside the first pointer gesture, typeof-
  guarded — a 1573.4 Hz sine (the 15.734 kHz NTSC line rate folded down a
  decade) at gain 0.008, and a band-passed noise bed whose gain follows the
  frame's mean convergence brightness. CRT hum, not music.
- Determinism: the first frame is drawn synchronously at fixed phase
  T0 = 26 s (config 1 mid-drift, its ridge lit around mid-height); the rAF
  loop is typeof-guarded and anchored at load, piece time = T0 + elapsed.
  Canvas size comes from the Visual Viewport API with resize listeners on
  both visualViewport and window; the canvas CSS size is pinned in fit()
  and again in draw(); phone detection uses window.screen (min dimension
  < 700) with the aspect fallback.

## Frame one

A full field of fine vertical phosphor lines bent by the standing waves,
brightness terrain wandering across it, and one bright fold ridge glowing
just right of centre — strongest around mid-height, dissolving toward the
top and bottom of the frame.
