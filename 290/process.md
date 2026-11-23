# No.661 — La Transición

EXPANSION #80 angela-leible, prompt block 5 "La Transición (after Rodin)".
Her Rodin thesis: "El movimiento es la transición de una actitud a otra" —
movement is the transition from one attitude to another.

## Concept

One horse that exists only in-between. Two keyframe attitudes of the same
procedural horse — A, gathered (neck arched down, legs collected under the
body), and B, extended (neck reaching forward, legs split fore and aft) —
are interpolated continuously, and every frame draws a stack of seven
silhouettes along that interpolation: three translucent ghosts on the
A side in ochre, three on the B side in sienna, and the middle frame solid
in iron black, with a breath of gold dust in its mane. The sweep follows
t = 0.5 − 0.5·cos(2π·time/24 s), clamped to 0.08–0.92, so the solid frame
approaches each keyframe but never resolves into a canonical pose. It is a
frozen transition breathing, not an animation cycle: no motion blur, no
speed lines, no running cycle. Watch-only; there is no interaction.

## Construction

Single self-contained `index.html`, canvas 2D, no external assets.

**The kit.** All geometry is built per frame from one joint kit in local
units (body chest-to-tail ≈ 1.0, horse facing left, y down):

- Body barrel: fixed 13-point outline, drawn smoothed (quadratic midpoints).
- Neck: two segments from the withers (lengths 0.20 / 0.175), drawn as a
  tapered strip (half-widths 0.080 / 0.058 / 0.042) along crest-side normals.
- Head: 10-point outline (forehead, nasal bone, muzzle, chin, jaw, cheek)
  plus a separate ear triangle, in a head-local frame at the poll, scaled 0.92.
- Legs: four two-segment limbs (upper 0.31, cannon 0.32, hoof stub 0.05),
  drawn as tapered strips; front pair at the shoulder (−0.335, 0.10),
  hind pair at the hip (0.35, 0.10).
- Tail: tapered strip along a quadratic curve from the tailhead; its
  control and end points are pose parameters.
- Mane: zigzag band along the nine crest samples of the neck.
- Gold dust: 26 specks from a fixed mulberry32 seed (661002), stored as
  (crest-parameter, normal-offset, radius) and placed on the solid frame's
  mane only, in #E3B95B.

**Pose tables** (angles in degrees, canvas convention: 0° = toward tail,
90° = straight down, 180° = forward; legs are [upper, lower]):

| Joint | A (gathered) | B (extended) |
|---|---|---|
| Neck segment 1 | 222 | 183 |
| Neck segment 2 | 196 | 172 |
| Head | 128 | 158 |
| Front near leg | 96, 86 | 128, 118 |
| Front far leg | 104, 94 | 58, 74 |
| Hind near leg | 78, 98 | 52, 84 |
| Hind far leg | 70, 90 | 98, 116 |
| Tail control | (0.60, 0.16) | (0.68, 0.02) |
| Tail end | (0.545, 0.50) | (0.66, 0.34) |
| Body pitch | +1.5° | −2.5° |
| Body bob | 0.00 | −0.02 |

Every value is linearly interpolated at parameter u; the whole horse is
then pitched about its root, and the root itself travels from right of
center (A, x ≈ 0.615·W) to left of center (B, x ≈ 0.385·W), so the ghost
train stretches horizontally as well as morphing. Ghosts sit at
u = t ± 0.055, ± 0.110, ± 0.165 with alphas 0.32 / 0.21 / 0.13, drawn
outermost first; the solid frame is drawn last at exactly u = t.

**House rules.** Canvas sized from the Visual Viewport API with resize
listeners on both visualViewport and window; canvas style width/height
pinned in px inside layout on every resize. Phone detection via
window.screen (min dimension < 700px), aspect fallback (h > w·1.15) only
when screen is unavailable. Horse scale is min(W·0.30, H·0.34), so the
composition refits the phone frame without clipping. Page ground is the
paper color #EDE4D0. No audio, no microphone, no text anywhere except the
title. Palette is strict: paper #EDE4D0, ochre #C98F3D, sienna #8A4A2B,
iron #2B2622, gold #E3B95B.

**Determinism.** Frame one is the synchronous draw(0) at load: sweep phase
0, t clamped to 0.08, ghosts stacked near attitude A. Nothing is derived
from Date.now(); the loop clock is anchored performance.now() elapsed, and
rAF is typeof-guarded so the headless renderer (no rAF) still gets the
exact frame one. The only randomness is the precomputed mulberry32 dust
table. A QA hook (`FORCE_PHASE`, −1 in the shipped file) can pin the loop
phase for state-forced renders.

## QA log

Renderer: `node ~/workspace/tools/render-piece.js` (node-canvas).

- qa-desktop.png (1280×900): paper ground; solid iron horse right of
  center in the gathered attitude, head lowered, ear up; ochre and sienna
  ghosts trail visibly at the head, neck and legs; gold dust specks along
  the crest. Horse reads unmistakably as a horse.
- qa-mobile.png (390×844): same composition refit to the tall frame,
  nothing clipped, horse and ghost stack legible.
- thumb.png (720×720) rendered twice and byte-compared with cmp:
  identical, before and after the tuning pass. Second render deleted.
- Forced mid-sweep check: a /tmp copy with FORCE_PHASE = 0.25 (t = 0.5)
  rendered at 1280×900 — ghosts spread widest, solid frame centered with
  neck half-extended and legs mid-split, separate ghost heads visible on
  the gathered side. Copy and render deleted after inspection.
- Tuning pass during QA: first build's neck read too thick and the head
  too large (dark blob at the chest), and the horse sat small on phones.
  Fixed by narrowing the neck half-widths (0.088/0.066/0.047 →
  0.080/0.058/0.042), scaling the head outline to 0.92, and changing the
  scale rule from W·0.235 to min(W·0.30, H·0.34). All renders redone and
  the thumb byte-compare re-run after the changes.

## Deviations

- The prompt stages keyframe A entering right and B exiting left while
  also saying the horse runs left-to-right; I followed the explicit
  positional staging (A at right, B at left, horse facing its direction
  of travel, left), since the root-position interpolation is the part a
  viewer actually sees.
- The sweep clamp (0.08–0.92) means the extreme ghosts at ±0.165 can sit
  slightly outside that band (clamped to 0.02–0.98); they still never
  reach a pure keyframe, which is what the "never a canonical pose" rule
  protects.
