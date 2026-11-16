# No. 1827 "The Shoveler" (EF4, PP1074)

A slow meditation of one long tone, interrupted by a wooden tool striking
3, 6, then 9 wires. Watch only.

## Spec

Source: TASKS.md prompt block ellen-fullman, EF4, PP1074, EXPANSION #239
ellen-fullman. Close on the wooden shoveler tool striking a fan of nine
parallel wires: each strike sends a percussive crack through the drone,
the wires rippling lengthwise, then settling back into the long tone. The
tool alternates between striking groups of 3, 6, and 9, building slow
rhythm inside pure sustain.

## Driver

A slow meditation of one long tone, interrupted by a wooden tool striking
3, 6, then 9 wires.

## Palette

- Workshop black ground: #0b0a09, wall gradient #17130f to #100d0b
- Pale struck wood: #c9a06b, dark wood edge #8a6a3e, grain #a97f4c,
  worn striking edge #e8cda0
- Hand: #b98d5f, thumb shade #a87c50, finger lines rgba(90,60,30)
- Sleeve: #211d19
- Steel wires: base rgb(150,156,164) warming toward rgb(216,178,112)
  under the work light, hairline highlight rgba(235,240,245)
- Warm work light: rgba(216,164,92)
- Impact flash: white #ffffff
- Plates: title #9a917f, date #7a7264, hint #8a7a5e

## Build

Canvas 2D. A tight crop on the tool and the fan: nine parallel steel wires
run left to right across a dark workshop wall, fanning slightly narrower
toward the right, each anchored by a dark plate and a steel bolt. A warm
work light glows from the upper right and catches the wires more toward
that side. A dark sleeve and a faceless hand enter from the top edge,
gripping a long wooden shaft whose flat paddle blade rests on the middle
of the fan. Seeded dust motes (26, mulberry32 seed 1827) drift in the
light, with faint seeded vertical plank seams in the wall.

## Strikes

Strike k lands at t = 12 + 11k + 3 sin(1.3k) seconds, so intervals wander
between about 8 and 14 seconds and never fall into a metronome. Group
size cycles 3, 6, 9: group 3 strikes the middle three wires (indices 3-5),
group 6 the middle six (indices 1-6), group 9 all nine. Each strike is an
event inside the sustain, never a beat: the tool lifts slightly, plunges
at the strike, and rebounds over about 1.6 seconds. The struck wires
show a longitudinal compression wave, bright bands travelling along the
wire from the strike point and decaying over seconds, plus a brief white
tick spanning the struck group at the strike point, gone in a third of a
second. Between strikes the wires settle into a faint standing shimmer,
the long tone made visible.

## Sound

Watch only, default silent. A SOUND OFF button at top right starts the
audio lazily on tap, never on load: a sustained drone bed (55 Hz and
55.4 Hz sines, 110.3 and 165.2 Hz triangles through a master gain) plus
struck-string transients per struck wire, inharmonic partials at ratios
1, 2.76, 5.4 with a short filtered noise crack, mapped to group size.
The visuals carry the piece with sound off.

## Frame one

Fixed phase t = 60 s. The nearest strikes are 6.7 s behind (k = 4, group
6, at 53.35 s) and 7.6 s ahead (k = 5, at 67.65 s), so the compression
wave has decayed and the tool rests on the wires, settled into the long
tone. Frame one is byte-comparable.

## Interaction

Watch only. No input. Hint reads: WATCH ONLY, THE TOOL STRIKES 3, 6,
THEN 9 WIRES.

## Deviations

None from the prompt. The hand is a simple palm ellipse with finger
lines and a thumb bump, deliberately faceless, per the spec. Sound is
opt-in through a visible toggle because the piece is watch-only; the
spec's WebAudio approach is implemented behind that toggle.

## House rules

Visual Viewport sizing with resize listened to on visualViewport and
window; canvas pinned in draw() via canvas.style.width/height in px;
phone detection via window.screen (min dimension under 700 px) with
aspect fallback (h > w * 1.15); field-like composition full-bleed on
phones, centered square on desktop, page ground the piece's own
background color on both. One synchronous frame at load; every
requestAnimationFrame call guarded by a typeof check. Flicker well under
14 Hz by construction (one flash per strike, strikes 8 to 14 s apart,
flash gone in 0.3 s). prefers-reduced-motion renders the still frame
one. All fading alphas rounded to 4 decimals; moveTo before every arc
and ellipse.
