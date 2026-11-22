# №1974 Infinite Strangers

TL7 / PP1221, study #257 theodora-laird. Gallery date 2007-06-08, shown as "2007 · 06 · 08". Watch-only.

## What the piece does

A 3x4 grid of parallel-universe panels fills the frame. Each panel holds a tiny
flat city (ink and gray buildings with lit paper windows) and a crowd of seven
pictogram strangers standing on a ground line. Small dark objects fall from the
top of each panel, one kind per landing, cycling umbrella, piano, briefcase,
teacup, all flat silhouettes in muted red (#a34a3a). Each panel runs its own
seeded schedule (period 5.5 to 8 s, seeded offset), so falls are staggered
across the grid. When an object lands it rests on the ground for 0.9 s and
fades, a small dust ring expands and fades, and the crowd scatters away from
the landing point and drifts back over about 2.5 s. Every landing anywhere in
the grid advances the narration strip along the bottom by one clause, cycling
through the four clauses of the sentence:

"Awful things happen every day. Pianos fall on the heads of infinite strangers,
in infinite cities, in infinite parallel universes."

Four dots under the strip mark the current clause. The tone is deadpan: the
objects are theatrical props, the strangers are pictograms, nothing violent.

## FIRST_T

FIRST_T = 12 s. By then every panel has seen at least one landing, several
crowds are mid-scatter or reforming, and the narration has advanced past the
first clause. All animation state is a pure function of elapsed time since
load; no wall clock or Date is read for animation. Frame one is reproducible.

## Interaction

Watch-only. There is no pointer interaction; the falling objects are the
metronome and the narration is the melody. Never click-to-reload.

## Layout

Field-like composition: full-bleed on phones, square on desktop. Header with
the letterspaced title and "№ 1974 · Watch only" (stacked under the title on
narrow phones so the two lines cannot collide). Narration strip along the
bottom, typeset in italic Georgia, wrapping to at most two lines at desktop
and thumb sizes. Visual Viewport sizing with resize on both visualViewport
and window; canvas pinned in draw() via style width/height in px; phone
detection via window.screen (min dimension under 700 px) with the aspect
fallback (h > w * 1.15). One synchronous frame at load; every
requestAnimationFrame call guarded with a typeof check. Reduced-motion
preference renders a static frame at FIRST_T.

## Deviations from the prompt

None material. The piano is drawn as a grand piano with an open lid, a prop
stick, legs, and a strip of keys so it reads at panel size. The dust ring
after a landing is a thin expanding circle rather than a cloud, to stay flat
and graphic. The narration strip shows the clauses accumulated so far within
each cycle (clause 1 alone, then clauses 1-2, and so on) with four progress
dots, rather than one clause alone, so the strip always reads as a sentence
in progress.

## Probe results

Rendered with node ~/workspace/tools/render-piece.js from the actual script.

- Desktop 1280x900 at t=12 (FIRST_T): grid, cities, crowds, two umbrellas
  mid-fall, a resting teacup and a resting piano, narration on clause 1,
  one of four dots filled. Clean.
- Mobile 390x844 at t=12: header stacks title over the number line, no
  overlap; grid, crowds, and narration all legible. Clean.
- Thumb 720x720 at t=12: title, grid, and narration strip all legible.
  thumb.png is this render.
- Probe t=8 vs t=40 (both 1280x900): frames differ in the expected way.
  At t=8 the narration shows all four clauses with four dots filled, a
  briefcase falls in the bottom-left panel, a teacup has just landed
  top-right with its dust ring, and the bottom-left crowd is scattered.
  At t=40 the narration shows three clauses with three dots filled, an
  umbrella falls top-right, a briefcase handle enters top of row 3 col 3,
  and different panels are mid-scatter. md5s differ across t=8, t=12,
  and t=40.

## Fix rounds

1. First render: the title overlapped the "№ 1974 · Watch only" label on
   mobile, and the piano read as a red bench. Fixed by stacking the header
   on phones (taller header, number line under the title) and redrawing the
   piano with an open lid, prop stick, and key strip. Also shrank and
   softened the landing dust ring so it no longer reads as a ring around
   the resting object.
2. Second render: all three sizes clean; piano now reads as a grand piano
   with its lid open.

## Known warts

- A falling object entering from the top of a panel is clipped by the panel
  edge for its first fraction of a second, so a briefcase can appear briefly
  as just its handle at the panel top. This reads as the object dropping in
  and was left as is.
- At some moments a resting object has faded almost out while its dust ring
  is still visible, so the ring briefly appears on its own. Minor.
