# No.932 "What the Biobank Sees"

Study #114 stefpos, PP93 "The Exploded Person" (People Like You residency, 2020-21).

## Concept

One person, seen the way a biobank sees them: 312 data points, each carrying its
provenance (blood pressure, ECG trace, a survey answer, a urine sample, a consent
form). The points begin as a person-shaped cloud of blue dots on paper. Then the
formatting process explodes them: point by point they detach and travel, slowly,
to the three places data goes: a neat red grid (structured), a loose violet
scatter that never quite sits still (unstructured), and gold rows stacked like
vials on a shelf (stored). Faint dotted chain-of-custody threads connect each
point's home to its destination while it travels. After a hold in the dispersed
state, the person re-gathers, point by point, back into blue. The violence of
datafication, done at the speed of paperwork.

Interactions: tap cycles the residency perspective (the line at top left names
it, and each perspective re-orders which points detach first); drag disturbs the
field, scattering nearby points, which settle back; double-tap isolates the
unstructured points alone for eight seconds, the data that exists but is not
formatted for research.

## Construction

Single self-contained `index.html`, canvas 2D only, no external assets. Canvas
size comes from the Visual Viewport API with resize listeners on both
visualViewport and window; the canvas style size is pinned in px inside draw();
phone detection uses `window.screen` (min dimension < 700px) with the aspect
fallback `h > w*1.15`. Page ground is the paper colour throughout (light-ground
rule).

**Determinism.** All data is generated once at load from a single mulberry32
stream (seed 93293), in a fixed order, in normalized coordinates independent of
canvas size. Frame one is the synchronous `draw(0)`: the person intact. No
`Date.now()` anywhere; the animation clock is elapsed time since load, and every
drawn position is a closed-form function of loop time plus the recorded event
lists (pending tap, double-tap time, drag samples). No gradients, no
shadowBlur, no ctx.filter, no offscreen canvas.

**Silhouette model.** The person's home positions are rejection-sampled inside
the union of six ellipses (head, torso, two arms rotated ±0.38 rad so they angle
outward, two legs), sampling box x 0.30-0.70, y 0.15-0.94. 312 points; twelve of
them (a fixed stride through the set) are drawn larger and carry the visible
micro-labels, each on a small paper tag so the label stays legible inside the
dot field. Every point carries a tag from the 12-item provenance pool, with
numbered variants where the pool item implies them ("survey answer 17",
"blood sample B"); only the twelve large points show theirs.

**Zones and quotas.** Zone assignment uses exact shuffled quotas rather than
per-point coin flips, so the proportions are the specced ones every load:
140 structured (44.9%), 94 unstructured (30.1%), 78 stored (25.0%). Structured
targets are cells of a shuffled 10 x 14 grid on the left; unstructured targets
are a seeded scatter on the right, and those points keep a slow sinusoidal
wander at their targets (per-point amplitude, frequency, phase, all seeded);
stored targets are four stacked rows along the bottom (20/20/19/19).

**Phase model.** The loop is 120 s: person hold 0-10 s, explode 10-55 s,
dispersed hold 55-70 s, re-gather 70-120 s. A global progress gp(lt) is 0 in
the first hold, rises through the explosion with smoothstep easing at the phase
boundaries, sits at 1 in the dispersed hold, and falls symmetrically through
the re-gather. Per-point staggering is exact: `prog = clamp(gp * 1.35 - rank *
0.35, 0, 1)`, where rank is the point's normalized detach rank (0..1) under the
current perspective; position is the home-to-target lerp at `smootherstep
(prog)`. At gp = 1 every point has prog = 1; during the re-gather the formula
runs in reverse, so the last points to leave are the first to return. Colour is
the same interpolation: blue at prog 0, the zone colour at prog 1. Custody
threads are dotted lines from home to target with alpha `0.10 + 0.20 *
sin(pi * prog)` in transit and 0.10 once arrived, so the dispersed state keeps
a faint web of custody lines. Zone labels fade from 0.35 alpha (person state)
to 0.95 (dispersed).

**Perspectives.** Eight, in tap order: PI, nurse, participant, manager, lab
tech, data manager, researcher, funder. The piece starts on "participant"
(index 2). Each perspective has its own detach order: a Fisher-Yates shuffle of
the point indices from an independent mulberry32 stream seeded `932930 +
perspectiveIndex * 7919`, precomputed for all eight perspectives at load.

**Interaction mechanics.** A tap resolves after a 0.38 s window (so a second
tap inside the window becomes the double-tap instead): single tap advances the
perspective; double-tap starts the 8 s unstructured isolation (fade 0.5 s in
and out, non-unstructured points and the structured/stored labels fade to
near-paper). Drag records timestamped pointer samples (normalized coords, max
60 kept); each point's drawn position adds a repulsion offset summed over
samples, weighted by `exp(-(d/0.09)^2) * exp(-age/1.1)`, capped at 0.08
normalized units, so the field dents under the finger and heals.

**Audio.** Lazy and typeof-guarded; the AudioContext is created only inside the
first pointerdown, and the piece renders complete in silence. Detachments make
soft pipette clicks (a short sine chirp, volume scaled by how many points are
in transit, thinned to one per 90 ms), scheduled from the animation tick, never
from draw(). A looped, lowpassed noise source sits under a gain that opens only
during the re-gather phase (the paper rustle). Dragging adds faint static
ticks. The noise buffer is filled from a seeded stream, not Math.random.

**Palette (strict).** Paper #F7F3E8, person blue #2471A3, structured #C0392B,
unstructured #7D3C98, stored #B9770E, threads #8A8578, labels #1A1A1A. The only
off-list colour on screen is the paper itself behind micro-labels. Visible text
is only the specced text: the three zone labels, the perspective line, the
twelve micro-labels, and the title.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js index.html W H out.png`:

- qa-desktop.png (1280x900): paper ground; a clearly readable standing person
  of blue dots at centre (round head, neck gap, torso, both arms angled out
  with negative space against the torso, two separated legs); twelve larger
  labelled points with legible tags (urine sample, ECG trace, MRI slice, diet
  diary, voice note, sleep hours); zone labels faint at the edges (STRUCTURED
  left, UNSTRUCTURED right, STORED bottom); "perspective: participant" at top
  left. No threads at frame one, as specced.
- thumb.png (720x720): the same composition; the person reads at thumbnail
  size.
- qa-mobile.png (390x844): phone path; the composition square centres in the
  tall frame, person and labels intact, nothing clipped, micro-labels small
  but present.

Determinism: thumb.png rendered twice and compared with cmp: byte-identical
(duplicate deleted). Repeated after the fix round below: byte-identical again.

Fix round: the first build's silhouette read as a loose vertical column (arms
merged into the torso mass, head indistinct, dots too sparse). The silhouette
was re-proportioned (larger head, arms rotated to ±0.38 rad and angled outward,
figure scaled to 0.88 about its centre), the base dot radius raised from
0.0034*S to 0.0042*S, and paper tags placed behind the micro-labels. Re-rendered
at all three sizes; the person now reads immediately at every size.

## Deviations

- Zone membership uses exact shuffled quotas (140/94/78) instead of independent
  ~45/30/25 coin flips per point. Reason: the proportions are part of the data
  the piece states; exact quotas keep every load identical to the spec instead
  of binomially drifting around it.
- The perspective list uses the brief's fixed eight names verbatim, including
  singular "manager" where the prompt's prose list had "managers"; the brief's
  explicit list wins.
- Micro-labels sit on small paper-coloured tags rather than directly on the dot
  field. Reason: legibility at gallery sizes; the tag is drawn in the paper
  colour, so the palette is unchanged, and the tag reads as a specimen label,
  which suits the subject.
