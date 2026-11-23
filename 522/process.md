# №1639 — Identity Studies, After Himself (MSR8, PP886)

Study #215 marcelo-soria-rodriguez, closing piece of the arc. Gallery date
2006 · 07 · 08 (formula 2002-01-10 + 1640 days). Gallery note draft:
"A polycircle system paints itself, dreams, and resolves again every ninety
seconds. Hold to slow the dream."

## The piece

A seeded polycircle engine paints intersecting circles in crimson, ochre,
cobalt and ink on cream, then the painting passes through a synthetic dream
state and re-resolves into a sharper self-portrait of the system, on a
90-second cycle: crisp polycircles (30 s), dream wash (30 s), resolved
self (30 s), then repeat with a new seed from a fixed authored table of
four seeds (1639001, 1639007, 1639013, 1639021). The watchable behavior
is a system watching itself dream.

- Crisp phase: 26 seeded circles (asserted count), some filled at low
  alpha, drawn in the polycircle palette.
- Dream phase: the same field re-rendered from the same seed with
  desaturated violet/grey palette, a violet-grey ground, jittered
  positions and each circle re-drawn twice at small offsets with low
  alpha, so edges smear. Transitions in and out over 4 s (smoothstep).
- Resolved phase: re-rendered from the NEXT seed in the table, crisp
  palette, plus a finer layer of 40 small circles (shifting resolution)
  and faint quadrant split lines with each quadrant of the field shifted
  a little, a fragmented perspective of the same system.

## Interaction

Press and hold anywhere: while held, the phase timer runs at one quarter
speed, so the dream lingers; on release the cycle resumes its own tempo.
Shared transformation, not control. While held, the hint plate border
turns violet. No click-to-reload anywhere; no tap action besides hold.

## Determinism

Frame one is drawn synchronously at a fixed phase, t = 12 s inside the
crisp polycircle phase, from the fixed seed 1639001. The rAF loop is
anchored as that phase plus elapsed time since load, never Date.now().
All randomness comes from mulberry32 with fixed seeds. Thumb rendered
twice with the QA harness: byte-identical (md5 02eebbdd17574adca4ff9afd68367958).

## Deviations from the prompt

- No offscreen buffer, no blur pass, no canvas filter: node-canvas has
  no createElement/offscreen canvas in the QA harness, so the dream wash
  is simulated on the main canvas with layered low-alpha smear strokes
  and jittered re-draws, per the batch spec's adaptation flags. The
  two-layer render is enacted as a re-render from a perturbed seed, not
  a diffused copy of the same image.
- The resolved phase re-renders from the next seed in the authored table,
  not from the dream image: the sharpening is a re-render, as the prompt
  allows ("a re-render from the perturbed seed, not the same image").
- Hold slows the phase timer to 0.25x for the whole cycle, not only the
  dream phase: the timer is a single clock, and slowing it while held
  makes the dream linger whenever the viewer holds during it, which is
  the behavior the prompt describes in practice.

## What was avoided

No model-loading theatrics, no face, no static final render. The piece
is a continuous 90-second cycle with no resting state.

## QA

Rendered the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, 720x720 thumb; all three inspected. Circles are clipped
to the square field (verified by pixel sampling outside the square:
cream). Title, date and hint legible at all sizes; the title font
shrinks to fit the square on phones. Dream (t = 45 s) and resolved
(t = 75 s) phases rendered separately via the __probe.drawAt hook and
inspected: dream is a desaturated violet-grey wash with smeared edges;
resolved is a new seed with the small-circle layer and quadrant splits.
