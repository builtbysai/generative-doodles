# №1644 — Ghost in the Net (KT5, PP891)

Study #216 kazuhiro-tanimoto. Gallery date 2006 · 07 · 13 (formula
2002-01-10 + 1645 days). Gallery note draft: "A violet cloud-net
streams glowing participants past dark voids. Tap a glow to keep it;
only three fit the plum gallery row."

## Driver

Taste made visible; the stream is infinite, the kept set of three is a
portrait of the chooser.

## The piece

A soft network of violet and lavender clouds drifts across a full-bleed
field, studded with nine near-black voids (missing nodes) and glowing
dots (participants). The system generates outputs continuously: one
candidate every 6 seconds from a fixed seed table (seed 1644000 +
k * 7919), each living 26 seconds, fading in over 1.5 s and dissolving
over its last 4 s. Each candidate is a glowing dot with a halo, a ring,
and three satellite dots on faint threads, all seeded from its own
seed, so every output is distinct and reproducible. Fourteen cloud
clusters (5-9 overlapping low-alpha puffs each) drift on slow
closed-form sine paths; the voids drift the same way.

## Interaction

Tap a glowing dot to keep it: it settles into the next empty slot of
the deep-plum gallery strip along the bottom over a 1.4 s smoothstep,
with a slow settle animation, and stays there as a glowing purple dot
with ring and satellites. The three-slot limit is hard: tapping a
fourth glow while three are kept does nothing except a brief gentle
dim-pulse on the tapped dot. Tapping a kept dot in the gallery strip
releases it: it drifts back up into the cloud and dissolves over
1.5 s, freeing its slot. The stream never stops and never restarts;
there is no click-to-reload anywhere. Keeps persist across the session
via guarded localStorage (key gd-1644-keeps-v1, try/catch, in-memory
fallback when storage is unavailable).

## Determinism

Frame one is drawn synchronously at fixed phase t = 18 s: candidates
0, 1, 2 are already glowing in the cloud, the gallery strip is
present with three empty slots. All randomness comes from mulberry32
with fixed seeds; no Math.random at draw time; the rAF loop is
anchored as the fixed phase plus elapsed time since load, never
Date.now(). Thumb rendered twice with the QA harness: byte-identical
(md5 55767890f7120a2d94a52c9905ec5ed1).

## Acceptance criteria

1. Frame one (t = 18 s) shows the cloud field, dark voids, three
   glowing candidates, and the gallery strip with three empty slots;
   the thumb re-renders byte-identical.
2. Candidates are emitted every 6 s from the fixed seed table;
   unkept candidates fade out and dissolve within their 26 s life.
3. Tapping a glow keeps it (maximum three); a fourth tap while full
   is refused; tapping a kept dot in the strip releases it and frees
   the slot.
4. Kept dots settle into the plum strip with a visible glow and
   persist via guarded localStorage.
5. No click-to-reload; the stream never stops on its own; no em
   dashes in visible copy; motion is slow and flicker safe.

## Deviations from the prompt

- The batch spec's adaptation flags said keeps persist in-memory
  only, no storage; the build task explicitly directed guarded
  localStorage persistence ("as prior pieces do"), so that was
  followed instead. Consequence, flagged: in a real browser a
  returning visit restores its keeps settled in the strip, so frame
  one differs from a fresh visit; in the QA harness (no
  localStorage) frame one is fixed and byte-identical.
- The field is full-bleed on desktop as well as phones (field-like
  composition per the house rules) rather than a centered square;
  the gallery strip runs along the bottom edge, per the prompt's
  composition.
- Candidate 3 is technically live at frame one (born exactly at
  t = 18 s) but at alpha 0, its fade-in just starting, so exactly
  three glows are visible, as specified.

## What was avoided

No slot machine, no unlimited collecting, no avatars or feeds or any
social-network literalism; the net is clouds and voids. No gradients,
no shadowBlur, no offscreen canvas.

## QA

Rendered the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected. Clouds,
voids, and three glowing candidates read clearly at all sizes;
title, date, and hint ("Tap a glow to keep it.") legible; the
gallery strip is readable with three empty slot rings. Interaction
probe (vm-isolated instance, stubbed rAF, piece driven via
window.__probe): live candidates at t = 18 are [0, 1, 2, 3] with
candidate 3 at alpha 0; keeps 0, 1, 2 succeed, a fourth keep is
refused with keeps still 3; releasing slot 0 frees it and keeping
candidate 3 then succeeds; t = 18 vs t = 24 frames differ (motion
live); two fresh frame-one renders are pixel-identical. A render
with three keeps settled shows all three glowing dots in the plum
strip and the kept candidates gone from the field.

## Fix rounds

None. The first build passed the visual check and the interaction
probe with no changes.
