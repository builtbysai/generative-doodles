# №1642 — Ghost in the Code (KT3, PP889)

Study #216 kazuhiro-tanimoto. Gallery date 2006 · 07 · 11 (formula
2002-01-10 + 1643 days). Gallery note draft: "A face barely assembles
from pink noise and keeps changing its mind. Tap for a new soul."

## Driver

Recognition straining against noise; a face barely assembles from a
14 KB rule set, and the hash is the person.

## The piece

From pink-grey noise, a human face barely assembles: eyes as dark
smudges, a suggestion of a nose, the rest dissolving into granular
static. The personality is read from the hash; then the face keeps
changing expressions, a living portrait that never settles on one
emotion. Your brain finds the face before the code finishes drawing
it, and the face keeps betraying the first reading.

- Face assembled from a tiny procedural feature set (eye smudges,
  brow masses, nose wedge, mouth blur) parameterized by a
  hash-derived personality vector: eye separation, eye size and
  height, brow thickness/tilt/height, nose length/width, mouth
  position/width/base curve, face proportions, asymmetry, cheek
  shade, plus per-eye jitter so no two eyes match.
- Expression morphing on slow closed-form LFOs across the feature
  weights: smile (26 s), brow (31 s), eye openness (19 s), mouth
  openness (23 s). Green glints appear in the eyes on a 17 s pulse.
- Grain and pixelation as render passes, not textures: a blocky
  9 px pink/magenta noise ground (9,000 seeded cells), 1,800 stipple
  grain dots and 60 soft blotches per soul, and a coarse 14 px mosaic
  veil over the face.
- Portrait composition: the face fills the frame edge to edge,
  cropped tight like a passport photo from a corrupted file.
  Full-bleed on phones; on desktop a tight portrait frame centred
  on the piece's own pink ground.

## Interaction

Watch-first. The face re-expresses on its own slow cycle. A tap
perturbs the hash: the next seed is dealt from a fixed authored
table of six (1642001, 1642007, 1642013, 1642021, 1642027, 1642033)
and a new personality assembles from the same rules over 2.5 s,
the old soul crossfading out (globalAlpha blend of both faces,
grain and mosaic). A new soul, not a restart. Never click-to-reload.

## Determinism

Frame one is drawn synchronously at a fixed phase, t = 10 s, from
the fixed seed 1642001: a neutral, slightly wary reading, the face
already assembled. The rAF loop is anchored as that phase plus
elapsed time since load, never Date.now(). All randomness comes
from mulberry32 with fixed seeds; no Math.random anywhere. Thumb
rendered twice with the QA harness: byte-identical
(md5 f6abe716deb15a1d843c36b338793159).

## Acceptance criteria

1. Face reads as a face at frame one, never blank noise: yes,
   verified at 1280x900, 390x844 and 720x720.
2. Face is barely there, not a clean identikit: yes, thin radial
   wash plus edge-breaking blobs, heavy grain over the face.
3. Eyes are dark smudges with occasional green glints: yes; glints
   confirmed visible in the tap-settled probe render at t = 14 s.
4. Nose is a suggestion, not a drawn feature: yes, a diffuse soft
   wedge of three wide overlapping blobs.
5. Expression changes on its own slow cycle: yes, probe at t = 20 s
   shows smile 0.16 vs 0.50 at frame one, eye openness 0.61 vs 0.97,
   mouth visibly flatter and more open.
6. Tap deals a new soul from the fixed table: yes, probe tap at
   t = 10 s advances seed 1642001 to 1642007, blend k = 0.47 at
   t = 11.2 s and k = 1 at t = 14 s; the settled render shows a
   visibly different face (eye spacing, brow tilt, mouth).
7. No click-to-reload, no horror aesthetics, no real likeness: yes,
   abstract procedural smudges only.
8. House rules: Visual Viewport sizing, canvas pinned in draw(),
   window.screen phone detection with aspect fallback, one
   synchronous frame at load, typeof-guarded rAF, moveTo before
   every batched arc, alphas rounded to 4 decimals. No em dashes
   in visible copy.
9. Thumb re-renders byte-identical: yes (see Determinism).

## Deviations from the prompt

- The batch spec's standing rule says no in-piece hint text in
  KT1-KT5, but this build's task instruction explicitly requires
  the hint "Tap for a new soul.", and sibling №1640 in the same
  batch also carries title/date/hint plates, so the plates follow
  the №1639 template scaffold as instructed.
- Pixelation is enacted as the blocky noise-ground cells plus a
  coarse mosaic veil pass, not by sampling a low-resolution render:
  node-canvas QA has no offscreen canvas, so there is no image to
  sample; the veil is a deterministic render pass per soul.
- The pink noise ground is seed-independent (one fixed field shared
  across souls); only the face features, grain, blotches and mosaic
  are per-seed and crossfade on tap. The ground is the corrupted
  file, the face is the soul.
- Expression LFOs are functions of piece time only and run
  continuously across a tap; the new soul inherits the same slow
  expression cycle rather than restarting it.

## Fix rounds

- Round 1 (after first QA): the face mass read as a clean egg with
  a hard outline, the eyes as goggle rings, the brows as floating
  ovals, the nose as three separate dots, and the face interior
  too smooth. Thinned the radial wash (peak alpha 0.92 to 0.62),
  added edge-breaking blobs, jittered and de-ringed the eye
  layers, flattened and widened the brows and moved them closer
  to the eyes, merged the nose blobs, raised grain from 1,400 to
  1,800 dots.
- Round 2 (after second QA): the nose still read as a vertical
  capsule and the face outline still survived on the sides.
  Widened and diffused the nose blobs further and added four
  blobs straddling the face edge. Re-rendered all three sizes
  plus expression and tap probe states; all pass.

## QA

Rendered the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 for thumb.png; all three inspected.
Title, date and hint legible at all sizes. Expression probe
(t = 20 s) and tap probe (tap at t = 10 s, mid-blend t = 11.2 s,
settled t = 14 s) rendered separately via the __probe hooks and
inspected: expression visibly changes, tap deals a new soul.
