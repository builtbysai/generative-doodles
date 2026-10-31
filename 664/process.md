# No.664 — Profecía

EXPANSION #80 angela-leible, prompt block 8 "Profecía (Cóndor y Águila)".
The Condor-Eagle prophecy: two forms of intelligence that split and broke
the balance of the world, reuniting now. No national symbols, no flags,
no dove-of-peace, no text.

## Concept

On a cosmic black ground, two birds spiral toward each other from
opposite corners over 14 seconds. From the top-left, the eagle: a sharp
angular polygon in silver-gray with bright white edges, geometric and
hard. From the bottom-right, the condor: a massive stain-born form in
indigo, its body a field of seeded blotches with pale feather barbs
fanning from the wing spines. Both trail sparse gold dust along their
spiral paths. At the center they merge into a single cinnabar form that
is neither bird (construction below), which hangs for a held moment and
pulses once, a single slow swell mid-hold. Then the loop unwinds: the
form splits, the birds re-emerge and spiral back out to their corners,
dissolve, and for a few seconds only the fading dust remains before the
cycle turns. Watch-only; there is no interaction.

Timeline (40 s loop): approach 0–14, merge crossfade 14–16, merged hold
16–22 (pulse centered at 19), split 22–24, separation 24–38, empty sky
38–40 (birds fade out by 38.7, re-condense at their corners 39.3–40 so
the state at 40 s equals the state at 0 s exactly).

## Construction

Single self-contained `index.html`, canvas 2D, no external assets.

**Spirals.** Both birds fly the same logarithmic spiral (radius shrinking
to 14% over the approach, 285 degrees of sweep), the condor's path being
the eagle's reflected through the center (base angle offset by 180
degrees). Position is a pure function of loop time, piecewise across the
phases above; heading is the numeric derivative of position, so the
birds orient along their velocity in both directions. Bird scale grows
from 0.052·min(W,H) at the spiral mouth to 0.135·min(W,H) at the center.
The spiral is elliptically compressed on narrow frames so the corner
entries never clip on phones.

**The eagle.** A 14-vertex polygon (beak, head, shoulders, long swept
wingtips at ±0.85, shallow trailing notches, tail fan), filled silver
#B9BEC8 and stroked in sharp white #F0F2F5 with miter joins.

**The condor.** A 30-point outline (right half defined with a scalloped,
fingered trailing edge, then mirrored), drawn smoothed. The mass is a
base indigo wash at 0.82 alpha plus 30 seeded blotches (mulberry32 seed
664011, point-in-polygon tested against the outline), and 20 feather
barbs (seed 664023) fanning back from the two wing spines. Blotches and
barbs are drawn clipped to the outline, so the pale feather texture
never fringes past the silhouette.

**The merged form (the morph).** The merged silhouette is built once, by
vertex interpolation between the two birds:

1. Both outlines are resampled to 48 points by arc length. Both outlines
   are defined starting at the beak and running down the right side
   first, so sample i of the eagle and sample i of the condor are
   anatomically corresponding points (beak, right wing, tail, left
   wing).
2. Each resample is normalized (centroid subtracted, divided by RMS
   radius), and the merged vertex set is the component-wise average of
   the two: every vertex of the new form sits exactly halfway between
   the eagle's vertex and the condor's. Sharp silver angles and the
   condor's broad stain mass contribute equally everywhere, so the
   middle state is a genuinely intermediate creature, not a collage of
   parts.
3. The middle state is then shaped into its own being: turned frontal
   (beak up), wings lifted into a V by a shear (y -= 0.60·|x| in the
   turned frame), the tail point compressed (y beyond 0.25 pulled in by
   0.62), and finished with a round body mass (ellipse 0.40 × 0.46), a
   round head, and a small crest triangle at the topmost point. All of
   it is filled in the single cinnabar #C0392B.

During the merge the two birds converge on the center, grow slightly,
and crossfade out while the cinnabar form scales in from 0.55 of its
full size; the split runs the same crossfade in reverse. At full hold
the form spans about 38% of the frame width (the center third), and its
one pulse is a Gaussian swell of +7% scale centered at t = 19 s.

**Gold dust.** 110 seeded specks per bird (seed 664037), laid along each
spiral with a small seeded perpendicular jitter. Dust is a comet trail,
never a pre-drawn path: a speck shows only after its own bird has
passed it on the current flight (the approach deposits at 14·sigma,
the separation at 38 − 14·sigma), ramping in over 0.35 s and decaying
exponentially with a 1.15 s constant, so each bird carries a short
trail of specks behind it that fades over roughly 2–3 s and nothing
ahead of the bird is ever lit. During the empty-sky window (38–40 s)
both full trails linger faintly at 30% strength as the piece's memory,
fading in gently and out again at the wrap. The few specks at the
spiral mouth (sigma < 0.05) form a corner stub whose weight rises to 1
as the bird re-condenses at its corner (t → 40) and starts at 1 as it
sets out (t = 0), so frame one carries only a stub of specks at each
corner and the dust field is identical at t = 40 and t = 0. Peak
speck alpha 0.8.

**House rules.** Canvas sized from the Visual Viewport API with resize
listeners on both visualViewport and window; canvas style width/height
pinned in px in draw via resize handling. Phone detection via
window.screen (min dimension < 700px), aspect fallback (h > w·1.15)
only when screen is unavailable. Page ground is the cosmic #070912. No
audio, no microphone, no text anywhere except the title. Palette is
strict: ground #070912, silver #B9BEC8, white #F0F2F5, indigo #2B3A7A,
pale #E8E2D0, cinnabar #C0392B, gold #D9A441.

**Determinism.** Frame one is the synchronous draw(0) at load: loop time
0, eagle just inside the top-left corner, condor just inside the
bottom-right, the first dust specks on the trails, center empty. Nothing
is derived from Date.now(); the loop clock is anchored
performance.now() elapsed, all positions, the morph, the pulse and the
dust are pure functions of loop phase, and rAF is typeof-guarded so the
headless renderer (no rAF) still gets the exact frame one. A QA hook
parses `?seed=tNN` from the URL to pin the loop time for state-forced
renders; it is inert in normal viewing.

## QA log

Renderer: `node ~/workspace/tools/render-piece.js` (node-canvas).

- qa-desktop.png (1280×900), frame one: dark sky, silver eagle just
  inside the top-left corner, indigo condor mass just inside the
  bottom-right with pale barbs contained in the silhouette, sparse gold
  specks along both spiral paths, center empty.
- qa-mobile.png (390×844): same composition refit to the tall frame via
  the elliptical spiral compression; both birds inside the frame,
  nothing clipped.
- thumb.png (720×720) rendered twice and byte-compared with cmp:
  identical, before and after the tuning pass. Second render deleted.
- Forced merge check: rendered with the seed hook at t = 18 s
  (1280×900, throwaway in /tmp, deleted after inspection): the cinnabar
  form at center at full scale, wings spread symmetric, round body,
  head and crest on top, birds fully merged away, faint dust ring of the
  inner spiral around it. Also rendered t = 7 s to check the approach:
  the condor reads as a broad indigo bird with feather texture, the
  eagle as a sharp silver bird, dust trailing behind both.
- Tuning pass during QA: the first build had three faults. The condor's
  barbs were drawn unclipped and fringed past the silhouette like a
  comb; they are now clipped to the outline and shortened, and the base
  wash went from 0.55 to 0.82 alpha so the mass reads. The dust trails
  were visible along the whole spiral at frame one; the decay constant
  went from 3.5 s to 2.3 s and the peak alpha from 0.9 to 0.8, so frame
  one carries only the first specks. The merged form first read as a
  four-pointed star; the V shear was strengthened (0.38 to 0.60), the
  tail point compressed, and the body ellipse and head enlarged, after
  which it reads as a winged figure with a round body and crest. All
  renders redone and the thumb byte-compare re-run after the changes.
- Fix round (fly's visual gate, 2026-10-31): frame one still FAILED.
  The nearest-pass dust model keyed each speck's alpha to the time
  since the closest pass in loop-circular terms, so at t = 0 every
  speck on both spirals sat within ~7 s of some pass and the whole
  spiral stood speckled at once: the sky read as a dotted orbit
  diagram before anything had flown. The model was replaced with the
  comet-trail model described under Gold dust above: per-pass deposit
  times, a 0.35 s ramp-in and a 1.15 s decay (a ~2–3 s trail behind
  each bird, nothing ever lit ahead of it), a faint full-trail linger
  during the empty-sky window, and a corner stub at the spiral mouths
  that makes frame one carry a few specks per corner and keeps the
  field periodic across the wrap. Everything else untouched.
  Re-verified: qa-desktop.png frame one shows the silver eagle just
  inside the top-left and the indigo condor just inside the
  bottom-right, each with a stub of two or three faint specks, center
  empty, no trace of the spiral; qa-mobile.png the same refit to the
  tall frame, nothing clipped. Forced renders (throwaways, deleted):
  t = 7 s shows both birds mid-spiral with short fading trails behind
  them along the arcs just traversed and nothing ahead; t = 18 s shows
  the cinnabar merged form at center at full hold scale, birds fully
  merged away (the inner dust ring from the old model is gone; the
  held moment now sits in a clean sky). thumb.png re-rendered twice
  and byte-compared with cmp: identical.

## Deviations

- The prompt's 14 / 8 / 14 / 4 block split is kept in spirit: the 8 s
  merged block is implemented as a 2 s merge crossfade, a 6 s full hold,
  and a 2 s split, with the pulse centered in the block at t = 19 s.
  Approach and separation spirals are a full 14 s each, and the empty
  sky is 2 s of fully empty frame inside the 38–40 s window (the birds
  fade out and re-condense within it), which is what makes the wrap
  seamless.
- The merged form's silhouette is the vertex-average morph described
  above, plus deterministic shaping (frontal turn, V shear, tail
  compression, body mass, head, crest). The shaping is what the prompt
  asks the middle state to read as (broad symmetric wings raised in a
  V, a round body mass, a small head crest); the underlying vertex set
  is the literal halfway morph of the two resampled outlines.
