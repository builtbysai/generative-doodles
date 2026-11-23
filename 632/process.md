# №1973 Hyper-Real

TL6 / PP1220, study #257 theodora-laird.
Gallery date: 2007 · 06 · 07. Gallery note: "One figure in two rooms: the solo room composes and erases in monochrome, the live room burns amber around her, and the black gutter between them never lets the two touch. Watch only."

## What it is

A clean diptych, equal halves, with a thin pure black gutter
between them, 2% of the width. The same figure sits at the same
position in both panels, and the two panels never merge, never
exchange elements. The gutter is the boundary she guards.

Left panel, the solo room: monochrome (silver, gray, black),
nearly silent. The figure sits at a desk with a paper in front
of her and composes in the TL1 white-whale cycle: five staff
lines trace left to right and sixteen notes appear in turn as
the composition builds for 14 s, it holds almost complete for
1 s, then it dissolves for 7 s, the lines fading and the notes
drifting as they are erased, and only a single bare line
survives on the paper. The working hand sweeps the paper in
small deliberate motions while building, and lifts and stills
as the composition unravels. The left hand rests on the paper.

Right panel, the live room: the same monochrome figure, arms
open, with a band of warm amber energies moving around her.
Twelve light agents orbit her on two ellipses, inner ring one
way in 9 s, outer ring the other way in 13 s, each with a short
trail behind it. Two rings pulse slowly around her, three
ribbons of warm light flow across the panel, and a warm glow
sits behind her. The improvisation never stops and never rests.
The energies light her with a faint amber rim; they do not
change her.

## Palette

- Page ground near-black #0b0b0d; gutter pure black #000000
- Left panel ground cool dark gray #161619; right panel ground
  warm dark #1b1813
- Monochrome figure: silver #c9c9c6, near-white #e8e8e4,
  mid gray #8a8d90, ash #6e6a62
- Paper #cfcfc8, ink marks #1a1a1a
- Warm energies: amber #e8a33d, highlight #f7c65a,
  dim amber #8a5f1f

## Interaction

Watch-only. There is no pointer interaction: the piece is a
diptych to watch, and the contrast between the quiet left panel
and the kinetic right panel is the content. No audio: visual
only. All motion is on multi second timescales, well under the
14 Hz ceiling. prefers-reduced-motion renders the fixed first
frame still.

## Determinism

FIRST_T = 12 s. The 22 s cycle builds for 14 s, so at t = 12
the left panel is almost complete (phase ALMOST, completeness
about 0.92): the staff is mostly traced, the notes mostly
placed, nothing has started to fray yet, and the survivor line
runs steady on the paper. The right panel energies are mid
orbit. Every element is a pure function of the clock: the
cycle state, the hand sweep, the agent orbits, the ring pulse,
and the ribbon drift. The figure rig is shared by both panels
with identical head, shoulders, torso, and seat height; only
the arms differ. QA hooks: window.__draw(t),
window.__piece1973 with state(t), redraw(t), firstT. Query
params: ?t= sets the virtual clock, ?seed= is an alias for it.

## Deviations from the prompt

None. The left panel runs the TL1-style build/abandon/survive
cycle as specced, reusing the idea from №1968 with a new
staging (staff and notes on a paper, a working hand, a
survivor line) rather than copied code. The right panel runs
its own energy-agent system on a shared clock so the contrast
reads. The studio is never presented as collaborative: the
left panel is authored alone, the right is played together,
and the gutter never lets the two touch.

## Probes

Rendered with node ~/workspace/tools/render-piece.js from the
actual script.

- Desktop 1280x900 at t = 12 (FIRST_T): ALMOST. Left panel
  staff mostly traced, fifteen of sixteen notes placed,
  survivor line steady, working hand mid sweep. Right panel
  agents mid orbit with trails and warm glow. Clean.
- Mobile 390x844 at t = 12: diptych full-bleed, panels
  legible, captions and hint clear, no clipping or overlap.
  Clean. The figure reads small against the tall sheet, which
  is inherent to a two-panel piece on a tall phone.
- Thumb 720x720 at t = 12: clean, both panels and the gutter
  read at small size.
- Desktop 1280x900 at t = 8: BUILDING, completeness about
  0.59. Three staff lines traced partway, eight notes placed,
  hand mid sweep. Right panel agents in different orbit
  positions from t = 12. Differs from the first frame as
  expected.
- Desktop 1280x900 at t = 40: UNRAVELLING (cycle position 18
  s, dissolution about 0.42). Staff lines faded, notes faded
  and drifting, working hand lifted and still, survivor line
  still bold at the foot of the paper. Right panel agents in
  yet another configuration. Differs from both earlier probes
  as expected.

No fix rounds were needed: the first build passed visual QA
on all three sizes and both probes on the first pass.
