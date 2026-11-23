# №9083 · Undertow

Replaced 2026-10-14. The previous piece ("Strides", a Penrose-triangle impossible-geometry study) was rejected by Hans. New direction: organic but code-native.

## Concept

Hundreds of luminous particles ride an invisible current — a curl-noise vector field on near-black. Each particle draws a short glowing trail as it goes, so the current itself becomes visible: teal and indigo streamlines that converge, shear, and re-form. The field breathes on a 24-second periodic cycle, so the macro flow loops seamlessly even though no single particle repeats.

## Technique

- 2D simplex noise (seeded), curled into a divergence-free flow field
- 340–950 particles (scaled to viewport), each with a 12-point trail history
- Two-pass stroke: soft full trail + bright head segment
- Fade-fill canvas for motion trails; hue follows field energy (cyan → teal → indigo)
- Pre-rolled 420 frames at load so the flow lines are developed on first paint
- Touch/drag stirs the current: a tangential swirl around each pointer (multi-touch)
- Double-tap reseeds the noise permutation for a new current

## Why it works

No objects, no puzzles — just current. The beauty is emergent from the field math. In motion it reads as deep water or slow wind; the stagnation points where lines converge feel like real undertow.
