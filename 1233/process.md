# №1233 — Bad Stars

Christina Battle study block CB2 (PP392), after her *BAD STARS* (2018): a bright
floral-wallpaper room, idyllic nature videos, and ominous text overlaid. The
title is the thesis — *disaster* from *dis-aster*, the bad star. The calm here
is genuinely calm; that is what gives the phrases their weight.

## The room

Every frame is bordered by floral wallpaper (about 26 px): a cream-pink ground
(#F5D7DF) with a repeating data-drawn flower tile — five petals alternating
#E8A0B4 / #D66A8A, an ochre centre, a sea-glass leaf dot — plus thin pink frame
rules. The room is the frame; the scenes play inside it.

## The scenes

Five flat procedural scenes cycle in 25-second slots, in fixed order. All
motion is quantized to an 8 fps step grid (`step = floor(t × 8)`): sway, bob
and bloom phases advance in steps, and the 1.5 s crossfade between scenes is
quantized to eighths — handmade, never smooth.

1. **Tidal flat** — pale sky, a sea-glass sheen band with slow stepping wave
   lines, wet sand with darker patches, three ochre starfish, scallop shells.
2. **Clouds over water** — three flat sky bands, six drifting cloud clusters
   (white and cream, grey undersides), sea-glass water with reflected streaks
   under each cloud, one tiny sail at the horizon.
3. **Narwhal** — a blue-grey narwhal (parametric ellipse body, tail flukes,
   spiral-marked tusk) surfacing on a 3-step bob, flattened ripple rings
   expanding at the waterline, gull marks in a pale sky.
4. **Cacti blooming** — three saguaros (column, arms, rib shade) in a flat
   desert with mesa silhouettes; pink blooms at the tips open and close in
   a 4-step cycle.
5. **Trees swaying** — four trees on a two-band meadow, canopies leaning in
   stepped offsets, flower specks, a small butterfly.

## The phrases

One phrase per scene, verbatim, hand-set in Georgia serif, ink #1B1B1B,
centred on a pale card (#F6EFE3). It steps in over slot-local [6 s, 8 s],
holds to 16 s, steps out by 18 s — alpha computed from 8 fps step counts, so
the fade itself ticks. The six phrases:

- "we heard people trying to dig through the rubble"
- "we had always known there was something off about him"
- "the water kept rising after the rain stopped"
- "no one remembered locking the door"
- "the sirens were for another town"
- "it was a clear day, like this one"

Their order is a seeded Fisher–Yates shuffle (seed 1233 → order
[0, 5, 3, 2, 4, 1]); slot *k* takes phrase `order[k mod 6]`. Double-tap
increments the seed and reshuffles.

## The intrusions

At most boundaries the last 4 seconds of a slot are replaced — exactly 4.0 s,
never announced, no phrase — then the next scene fades in over 0.75 s and the
calm resumes. The plan is a fixed function of the boundary index *k*
(window [25k − 4, 25k)): no intrusion before k = 1, then the types cycle
volcano (k = 2), burning bush (k = 3), street grate (k = 4), volcano (k = 5),
and so on.

- **Burning bush** — green bush blobs on a dusk field, fourteen two-tone flame
  tongues (#E86A2C over #F2B04A) whose heights re-hash every two steps, embers.
- **Street grate** — dark asphalt with pavement seams, a slatted grate, eight
  grey smoke blobs rising, growing and thinning.
- **Volcano** — ash-banded sky, a flat cone with a crater pulsing at 4 fps,
  three lava dribbles of stepping length, falling ash, a smoke plume.

## Interaction

- **Drag left/right** — a swipe past ~44 px nudges the scene cycle one step
  forward or back (which scene art a slot shows); during the drag the scene
  shifts a few pixels with the finger. Disturbance, not control: timing,
  phrases and intrusions never move.
- **Double-tap** — reseeds the phrase order.
- A small hint chip ("drag to nudge the calm · double-tap to reseed") sits at
  the bottom of the scene and fades out by t = 11.5 s; it is long gone by
  frame one.

## House rules

- Canvas sized from the Visual Viewport API (visualViewport + window resize
  listeners); canvas CSS size pinned in draw().
- Phone detection via window.screen physical size (min dimension < 700 px),
  aspect fallback h > w × 1.15.
- Determinism: synchronous first frame at fixed phase T0 = 33 s; the rAF loop
  (typeof-guarded) is anchored as T0 + elapsed. All randomness is a seeded
  sine hash — no unseeded randomness anywhere.
- Silent. No gradients, no ctx.filter, no shadowBlur, no createElement, no
  ImageData / offscreen canvas, no microphone. Discs are drawn as fresh paths
  with a moveTo before each arc; the narwhal's ellipse body is a parametric
  polygon, since a plain arc would render a circle.
- Visible text: the phrases and the fading hint chip only (both specced).

## Files

- `index.html` — the piece (md5 3fdcfa72c4bbf4524051ce098a6dc1c0)
- `thumb.png` — 720×720, rendered from the live script; rendered twice and
  byte-compared (cmp): **byte-identical**
- `qa-desktop.png` — 1280×800 render
- `qa-mobile.png` — 390×844 render

Frame-one read (T0 = 33 s, slot 1, local t = 8 s): clouds over water inside
the floral wallpaper border — banded sky, sun disc, drifting clouds, sea-glass
water with reflection streaks and the tiny sail — with the phrase card at full
alpha, centred: **"it was a clear day, like this one"**. The phrase window
[31 s, 43 s] covers T0 with the fade-in complete at 33 s exactly.

QA beyond frame one (temp T0-shifted copies, discarded): tidal flat at 8 s
with "we heard people trying to dig through the rubble" and the hint chip;
narwhal at 58 s with "no one remembered locking the door"; cacti at 83 s with
"the water kept rising after the rain stopped"; trees at 108 s with "the
sirens were for another town"; volcano intrusion at 48 s; burning bush at
73 s; street grate at 98 s. Two build fixes came out of that pass: the
wallpaper ground originally filled the whole canvas over the scene (now
painted as border strips only), and the narwhal's body was first drawn as a
circle and its ripples as round rings (now a true ellipse and flattened
rings); the saguaro columns were rebuilt from rect + disc primitives after a
path diagonal tapered them into spikes.
