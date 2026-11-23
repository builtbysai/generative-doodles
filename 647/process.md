# №1988 The Room's Own Light

- Title: The Room's Own Light
- Prompt code: MC5 / PP1235
- Study: #259 mateo-villanueva-brandt
- Gallery date: 2007-06-22, shown as "2007 · 06 · 22"
- Interaction cue: "Watch the room breathe."
- Interaction: WATCH-ONLY. No pointer listeners of any kind.

## What the piece does

A wide shot of a church hall under warm tungsten practicals. Three tall
arched stained glass windows glow jewel colors on the back wall, a
hymn-number board (312, 458, 207) hangs at the right, two pendant lamps
throw warm cones of light, and four soft dark figures stand across the
middle band on a plank wood floor that falls away toward the viewer.
The figures shift weight almost imperceptibly on slow sines, dust
drifts and twinkles inside the lamp cones and the middle window shaft,
and the tungsten glow breathes over a four minute cycle with a gentle
flicker. The room breathes but nothing happens.

## FIRST_T and cycle

- FIRST_T = 31 s. Sway phases were chosen so every figure is mid-shift
  at the first frame (sway sines about 0.6, -0.7, 0.4, -0.5), with dust
  already visible in the light.
- CYCLE = 240 s. The tungsten glow breathes 0.94 to 1.00 on a slow
  cosine. Flicker is a sum of sines at 0.6 Hz and 1.7 Hz, far below
  the 14 Hz limit by construction.
- Figure sway periods are 8.5, 10.0, 9.2 and 11.0 s, amplitude about
  0.22 percent of stage width plus a lean of at most 0.005 rad.
- All randomness is seeded (mulberry32, hash noise). No Date, no wall
  clock in animation state. The first frame is deterministic.

## QA hook

?t= and ?seed= set the virtual clock at load. window.__draw(t) drives
draw with a virtual clock. window.__piece1988 exposes firstT, cycle,
state(t), glow(t), sway(i, t) and redraw(t).

## Deviations from the prompt

None. The prompt calls for group blocking held in the real room with
no stylization and no effects, and the piece keeps to that: flat wood
tones, soft figure shapes with no faces, light as plain translucent
cones and radial pools, no vignette and no grade wash. The small jewel
rose fan inside each window arch is part of the window glazing, not
an added effect.

## Probes

Rendered with node ~/workspace/tools/render-piece.js from the actual
script, seed 31 unless noted:

- render-desktop.png, 1280x900, seed 31,
  md5 b98841a2bebc332492094f260965bc91
- render-mobile.png, 390x844, seed 31,
  md5 d18bd9fcea6940839001c2880049f7c1
- thumb.png, 720x720, seed 31,
  md5 32b5031347aae9bc10cffa117f7ba6e9
- probe-t60.png, 1280x900, seed 60,
  md5 0ec21b91a19f2907db4129cebb15a443
- probe-t120.png, 1280x900, seed 120,
  md5 feb7956479e8040c64dbfea4ad780a67

The t=60 and t=120 probes differ from the first frame (dust
redistributed, figures shifted a few pixels) while the composition
holds exactly. Thumb rendered twice at seed 31: md5 identical both
times, 32b5031347aae9bc10cffa117f7ba6e9.

All three sizes were visually inspected: desktop square stage
centered with deep wood ground, mobile full-bleed, thumb square.
Windows, hymn board, lamps, figures, floor pools and dust all read
at every size. Caption top left and hint bottom center are legible
throughout.

## Fix rounds

1. Rose fan in the window arches first sat low across the horizontal
   mullion and read as a pasted sticker. Moved it up inside the arch
   (cy top plus 0.30 of window width) and shrunk it to 0.17 of window
   width. Re-rendered all three sizes and both probes, re-gated.

Total fix rounds: 1.

## Known warts

- The figures are deliberately plain dark columns with small round
  heads, per the prompt (soft shapes, never detailed). At thumbnail
  size they read a little like chess pawns, but the grouping and the
  warm rim light keep them human in scale.
- The wainscot rail passes behind the figures at shoulder height,
  which is correct depth but makes the rail read as a line through
  the group at small sizes.
- The floor cross seams widen quickly toward the viewer, so the
  nearest boards read as large tiles rather than planks.
