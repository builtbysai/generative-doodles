# №1990 The Column, Pt. 2

- Title: The Column, Pt. 2
- Prompt code: MC7 / PP1237
- Study: #259 mateo-villanueva-brandt
- Gallery date: 2007-06-24, shown as "2007 · 06 · 24"
- Interaction cue: "Watch the spray burst and the halo answer."
- Interaction: WATCH-ONLY. No pointer listeners of any kind.

## What the piece does

A body-painted figure crouched on shoreline rock, half-vanished into the
rock it is painted to match, with only a pale gold backlit halo around
the bowed head marking it. Sea spray explodes around the figure in slow
20-second waves and fills the frame; there is no horizon, only grey mist
with soft drifting veils above a wet brown rock mass. Each burst rises
over 2.5 seconds, peaks near 4 seconds, and decays to a hush by 14
seconds; the halo swells and fades with the same envelope, never fully
going out. Between bursts the air stays alive with slow mist motes.

## FIRST_T and cycle

- FIRST_T = 24 s. Burst phase tau = 24 mod 20 = 4 s, the burst peak, so
  the first frame shows spray at full height and the halo at full gold.
- CYCLE = 120 s. Bursts repeat every 20 s (BURST_PERIOD = 20); per-burst
  amplitude varies 0.75 to 1.00 by a hash of the burst index, so no two
  waves are quite alike.
- Halo intensity = 0.35 + 0.65 * burst envelope, so it dims to a faint
  gold ring in the hush and flares with each burst.
- All randomness is seeded (mulberry32, hash noise). No Date, no wall
  clock in animation state. The first frame is deterministic.

## QA hook

?t= and ?seed= set the virtual clock at load. window.__draw(t) drives
draw with a virtual clock. window.__piece1990 exposes firstT, cycle,
state(t), burst(t), halo(t) and redraw(t).

## Deviations from the prompt

None material. The figure is deliberately a smooth, near-featureless
crouched shape in rock colour with a bowed dark head, per the prompt's
"half-vanishes; only the halo separates it". The rock's wet sheen is
drawn as short pale streaks, and foam flecks cluster along the crest;
both are part of the rock surface, not added effects.

## Probes

Rendered with node ~/workspace/tools/render-piece.js from the actual
script, seed 24 unless noted:

- render-desktop.png, 1280x900, seed 24,
  md5 7b93d5ab69b4e1e0c8a65731100d312a
- render-mobile.png, 390x844, seed 24,
  md5 a726c0dd6c08601b88e0c98deb6df24a
- thumb.png, 720x720, seed 24,
  md5 ea8fe3c2d72e7bb972233d87a9283358
- probe-t44.png, 1280x900, seed 44,
  md5 dc0898b2f44f65cad0149024c0cb31b4
- probe-t60.png, 1280x900, seed 60,
  md5 7ed02cc769b01cd4c9bcdc901ef5d534

Pixel-diff counts (threshold 8 per channel, 1280x900 = 685,584 px):

- First frame (t=24, burst peak) vs t=60 (burst hush, tau=0):
  28,193 pixels differ (4.1%). Spray collapses, halo dims.
- Probe t=44 (burst peak, tau=4) vs t=60: 27,634 differ (4.0%).
- First frame vs probe t=44: only 410 differ (0.1%). Both are at the
  same burst phase (tau=4); the difference is only the per-burst
  amplitude hash and slow mist drift, as designed.
- Figure box (x 590-700, y 390-570) first frame vs t=60: 240 of
  19,800 pixels differ (1.2%), spray passing in front of the figure
  and the halo dimming. The figure's position and outline are
  unchanged in all three renders, confirmed visually.

Thumb rendered twice at seed 24: md5 identical both times,
ea8fe3c2d72e7bb972233d87a9283358.

All three sizes were visually inspected: desktop square stage centered
with grey mist ground, mobile full-bleed, thumb square. Figure,
halo, spray, rock crest, caption and hint all read at every size.
Caption top left and hint bottom center are legible throughout.

## Fix rounds

1. First gate: the figure floated about 0.045H above the rock crest
   (crest at center sits lower than the flat 0.585H figure base) and
   the contact shadow rendered as a grey half-disc bowl under it;
   the mist bands had hard rectangular edges reading as grey bars;
   the rock sheen streaks were long and rain-like. Fixed by computing
   the figure base from the crest profile and sinking it a hair into
   the rock, replacing the shadow with a thin dark ellipse, feathering
   the mist bands with vertical gradients at lower alpha, and
   shortening and thinning the sheen streaks. Re-rendered all three
   sizes and both probes, re-gated.

Total fix rounds: 1.

## Known warts

- The crouched figure is deliberately smooth and near-featureless, so
  at thumbnail size it reads a little like a rounded vase or egg
  sitting on the rock; the gold halo ring and the bowed dark head are
  what mark it as a figure.
- The rock sheen streaks still read faintly as thin vertical lines at
  desktop size, though short now; at mobile and thumb sizes they are
  barely visible.
- The dark undercut lip along the crest makes a wavy dark band just
  under the crest line; it reads as the rock's shadowed edge, which is
  the intent, but it is the strongest horizontal in the lower half.
