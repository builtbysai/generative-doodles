# №1637 "Centrifugal" (MSR6, PP884, #215 marcelo-soria-rodriguez)

## Prompt
A rotational field flings painterly stroke masses around a seeded center:
arcs of cream, black radial streaks, gold smears, a red-ringed core. The
piece never settles; the whirlpool varies in violence on a slow cycle,
sometimes a calm gyre, sometimes a roar. Palette: oxblood red ground;
cream, gold, black, pink, a hot red core; strictly painterly, no neon.
Square composition, vortex slightly off-center, field fills the frame
edge to edge. Watch-first, autonomous. Tap to reseed the violence level
(a reseed is a new storm, not a restart). Never drag-to-stir.

## Build
- Self-contained index.html, canvas 2D only, no external assets.
- Ground is oxblood red (#6B1A12) with 260 seeded grain flecks. 96
  painterly strokes (asserted count) in cream, gold, black, pink and
  hot red, each drawn as a 7-point spiral polyline with a bristle split
  (one heavy pass plus two thinner offset passes) and grain flecks
  along its length, so the marks read as loaded brush strokes, not
  vector lines. Each stroke spirals inward 22% over its length and
  wavers on a gentle seeded sine (14-point polyline), so the field
  reads as flung marks, never as concentric rings or a calm mandala. 26 black radial streaks run from mid-field to the rim.
  The core is a hot red disc with a dark oxblood ring and five tight
  cream arcs orbiting it.
- Motion is closed-form over piece time: stroke angles follow a spin
  phase that is the exact integral of a violence-modulated rate, and
  stroke radii drift inward and respawn at the rim on a fixed cycle.
  Violence varies on a 48 s cycle (calm gyre to roar and back) and
  scales stroke length, alpha and streak strength.
- Tap deals the next storm from a fixed authored table of five
  (multipliers 0.90, 0.55, 1.35, 0.70, 1.15, each with its own fixed
  seed). The spin phase stays continuous across a tap; the stroke
  field is re-dealt from the new seed, so a tap is a new storm, not a
  restart. Drag does nothing. Taps are recorded with their piece time,
  so the phase is a pure function of time and tap history.
- Frame one is at fixed phase t = 14 s, mid-climb toward the roar peak
  at t = 24 s, so the vortex is already developed with strokes
  mid-flight. No wall clock, no Math.random anywhere; all values come
  from mulberry32 with fixed seeds.
- Full-bleed field on phones and desktop; page ground is the piece's
  own oxblood. Title "Centrifugal" and date "2006 · 07 · 06" on a cream
  plate with a gold border, top center; hint "Tap to reseed the
  storm." on a matching plate, bottom center.

## Deviations from the prompt
- The prompt's "stroke agents with tangential velocity bent by a radial
  force field" is enacted as closed-form motion (seeded angles, radii
  and spin phase as pure functions of piece time) rather than
  frame-integrated agents, per the standing determinism rule: frame
  one must be reproducible byte-for-byte, and a tap must deal from a
  fixed table. The visible behavior is the same: strokes arrive at
  speed and are bent around the center.
- The prompt's "tap perturbs the seed" is enacted as dealing the next
  entry of a fixed five-storm table (multiplier plus seed), never a
  random perturbation, so every storm is reproducible.

## Interaction
- Watch-first, autonomous. The whirlpool breathes between calm gyre
  and roar on its own 48 s cycle.
- Tap: reseed the storm (next violence level and new stroke field
  from the fixed table). Drag: nothing.

## QA
- Rendered the actual script with node-canvas at 1280x900 desktop,
  390x844 mobile and 720x720 thumb; all three renders visually
  inspected before finishing.
- Thumb rendered twice independently; md5s compared (see report).
- No em dashes in visible copy. No AI-signature copy.
