# No.1813 The Kanary Band

## Spec

TASKS prompt block PP1060, study #237 paul-panhuysen (PH6).

Title: PH6 The Kanary Band

Visual description: A wooden mesh aviary in a garden, morning light. Inside:
purpose-built instruments, small percussion rigs, tiny perches strung with
chimes, a row of miniature tuned bars, a paper drum. About a dozen canaries
hop between them. When a bird lands on an instrument, the instrument answers:
a chime bar sways and shows its shimmer, a drum skin ripples, a perch bell
rocks. No bird is directed; they hop, pause, preen, fly to another perch, and
the instruments play whatever the birds do. The score is bird behavior.

Palette: Warm morning light through the mesh, wood in honey tones, canary
yellow flashes, instruments in brushed metal and pale wood. Garden green
beyond the mesh, soft.

Composition: The aviary centered, front mesh slightly out of focus,
instruments arranged inside like a small stage set. Birds move through the
depth of the space.

Motion/interaction: Watch-only. The birds are autonomous agents with
perching, hopping, and resting behaviors; instruments respond only to
landings. Nothing else happens. Never click-to-reload, never poke the birds.

Technical approach: Bird agents with a simple behavior state machine (hop,
rest, preen, fly between perches), each landing triggering the instrument's
response animation (sway, ripple, rock) plus a visual pulse. Instruments are
passive otherwise. Keep the agent count modest so the motion reads as birds,
not particles.

What to avoid: Do not choreograph the birds or quantize their landings to a
beat; the point is that non-human players are unconducted. No human hand
enters the aviary.

Gallery date: 2006 · 12 · 29 (formula 2002-01-10 + 1814 days).
Gallery note: The birds play the instruments; nothing is conducted. Watch only.

## Build

Twelve canary agents, each with a seeded behavior schedule over a 240 s loop:
rest (3 to 12 s), preen (2 to 6 s), hop to a neighboring perch (0.45 to 0.7 s),
fly to any other perch (0.9 to 1.6 s). Landing times are irregular seeded
values, never quantized to a beat. Eight perches: chime rail, paper drum rim,
three bell perches, two branches, one hanging swing. Each landing feeds a
decaying response on that perch's instrument: chime bars sway with a shimmer
that brightens with the response, the drum skin ripples, bells rock, branches
bob, the swing sways. Instruments are passive otherwise. Birds are drawn back
to front by perch depth, with a fixed per-bird lateral slot so birds sharing a
perch sit side by side instead of stacking exactly.

Frame one is fixed phase t = 60 s. At that phase two birds are mid-flight and
ten are perched, several on instruments. All motion is a closed-form function
of seeded schedules and loop time; no Date, no Math.random.

House rules: Visual Viewport sizing with resize listeners on both
visualViewport and window; canvas pinned in draw() via style width/height;
phone detection via window.screen (min dimension under 700 px) with aspect
fallback; aviary full-bleed on phones, centered on desktop with the garden
green as page ground; one synchronous frame at load; requestAnimationFrame
guarded with a typeof check; prefers-reduced-motion renders a still frame;
title, date and hint plates drawn on canvas. No em dashes in visible copy.
Watch-only, never click-to-reload.

## Deviations

None material. The mesh is drawn as a faint double grid rather than a true
blur, which reads as slightly out of focus at these sizes. The chime row has
five tuned bars; the "small percussion rigs" of the prompt are the three bell
perches plus the swing. Birds that share a perch at frame one sit close
together, as canaries do, with distinct heads and beaks.

## QA

Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected visually. Fix rounds:
birds and instruments scaled down (first build hid the instruments behind
oversized birds), roof peak lowered so it is not clipped on desktop, drum
skin chord artifacts removed, perch slot offsets added so sharing birds read
as separate birds. Final renders: title, date and hint plates fully legible
on desktop, mobile and thumb; no clipping or overlap with key elements;
aviary, chime bars, drum, bells, branches, swing and twelve birds all read.

Determinism gate: thumb rendered twice independently, md5 identical
(c4fd193bf2391505b57b40fafac521fa). index.html md5
7a0ed95b52bdc1c86381182aec66cc33. Frame-one probe: 2 of 12 birds mid-flight
at t = 60 s, 10 perched, 16 landings in the preceding six seconds, so
instruments are visibly responding at frame one.
