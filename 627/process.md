# №1968 The White Whale

TL1 / PP1215, study #257 theodora-laird, first piece of
EXPANSION #257.
Gallery date: 2007 · 06 · 02. Gallery note: "A golden form
almost finishes, then unravels, leaving one thin white line.
Drag to chase it."

## What it is

A composition approaches completeness on a near-black ground:
a melodic line traced as a luminous gold contour arches over
seven harmonic bands stacked into a golden dome, everything
converging toward a perfect finished form. A faint ghost of
the complete dome stays visible behind the forming bands, the
shape the piece never reaches. Just before the form lands, the
system starts unbuilding it: bands break into ash gray dashes
that scatter outward, the contour frays at the edges, and only
a single bare vocal-like line survives, thin and true in cold
white across the lower third, vibrating slowly. Then the
building starts again. The piece never arrives; it keeps
almost arriving. A state word at the top right names the
phase: BUILDING, ALMOST, UNRAVELLING, ONE LINE.

## Palette

- Near-black ground #0d0c0a (ground, page ground)
- Forming composition warm gold #d9a441, highlight #f2c14e,
  dim ghost gold #8a6a24
- Surviving bare line cold white #f2f4ef
- Dissolution ash gray #8a857c, darker ash #6e6a62

## Interaction

Drag to chase the arrangement. Press and hold and the form
builds faster toward completeness, up to three times the
normal rate, and the contour peak leans toward the pointer.
But holding grows brittleness, shown as a small BRITTLE bar
under the state word, and on release that brittleness is
banked as a dissolve boost, so the harder the visitor held,
the faster the form unravels once let go. Release is the
abandonment. Holding can never win: a faster build only buys
a faster unbuilding. Never click-to-reload: a tap with no
drag does nothing but a brief hold, and the piece keeps its
own 22 s cycle regardless. Motion is all on multi second
timescales, well under the 14 Hz ceiling.
prefers-reduced-motion renders a still frame. No audio: the
prompt's chased-arrangement synth is a closed-form visual
model only, per the Franke audio rule; no real WebAudio, never
autoplay.

## Determinism

FIRST_T = 10 s. At t = 10 the form is about four fifths built
(completeness 0.78): the dome bands are mostly traced, the
contour is mostly drawn, nothing has started to fray yet, and
the survivor line runs steady below. Every element is a pure
function of the composition clock: the 22 s cycle (build 14 s,
almost-complete hold 1 s, dissolve 7 s, completeness topping
out at 0.97 so the form never quite lands), seeded segment
hashes for the dissolve, and the slow vibrato of the survivor
line. The live chase clock starts at FIRST_T and only the
visitor's drag moves it off the closed-form cycle.
QA hooks: window.__draw(t), window.__piece1968 with state(t),
press(x), move(x), release(), step(dt), liveT(),
chaseState(), drawLive(), redraw(t), firstT. Query params:
?t= sets the virtual clock, ?seed= is an alias for it.

## Cycle schedule

Cycle length 22 s, repeating. Build phase t in [0, 14):
completeness eases 0 to 0.97, dissolution 0, phase BUILDING,
then ALMOST from t = 12. Hold t in [14, 15): completeness
0.97, phase ALMOST. Dissolve t in [15, 22): completeness
eases 0.97 to 0, dissolution eases 0 to 1, phase UNRAVELLING,
then ONE LINE once completeness falls below 0.05. Each band
appears in turn as completeness passes its threshold, its arc
sweeping out from the centre; the contour grows center-out
with completeness. During the dissolve, each band and the
contour break into seeded segments that vanish and drift
outward as dissolution grows, turning from gold to ash.

## Probes

Seeded probe harness /tmp/probe-1968.js (loads the actual
script in the render-piece node-canvas shim):

- Frame one (t=10): completeness 0.78, dissolution 0, phase
  BUILDING; md5 26c9e34283ee86c0761e70797ad5eb3f, identical to
  thumb.png, re-rendered twice with identical md5.
- Cycle states: t=2 completeness 0.05 BUILDING; t=14.5
  completeness 0.97 ALMOST; t=18 completeness 0.59,
  dissolution 0.39 UNRAVELLING; t=21.5 completeness 0.01,
  dissolution 0.99 ONE LINE.
- Frames differ over time: md5 at t=2, t=10, t=18 are all
  distinct; re-drawing t=10 returns the identical md5, so
  frame one is deterministic.
- Drag probe: after 3 s held plus 2 s released, the chase
  clock reads 23.70 against 15.00 for 5 s idle, so holding
  advances the build faster; the frames differ; brittleness
  1.30 banked as dissolve boost 1.10 on release, so a long
  chase dissolves the form fast.

## QA renders

node ~/workspace/tools/render-piece.js at 1280x900 desktop,
390x844 mobile, and 720x720 thumb. All three inspected
visually, plus a dissolve frame at t=18 on desktop. Thumb md5
26c9e34283ee86c0761e70797ad5eb3f, re-rendered after the final
fix with identical md5, deterministic frame one confirmed.

## Fix rounds

1. First build rendered clean on desktop and thumb, but on the
   tall mobile sheet the contour arched into a tall spike far
   above the dome, the dome sat low in empty black, and the
   vertical side text was struck through by the survivor line.
   Fix: the contour arch height now scales from the short side
   instead of the height; on phones the dome, contour base, and
   survivor line are lifted (dome 0.60H, line 0.64H); the side
   text block now anchors 6 percent of the height above the
   survivor line, so it never crosses it. Re-rendered and
   re-gated after the fix; desktop, mobile, and thumb confirmed
   clean.

## Deviations from the prompt

One, noted in the brief: the prompt's synth is a closed-form
visual model only. No real WebAudio is built, per the Franke
audio rule, and nothing autoplays. Everything else is as
specced: center-out build, survivor line across the lower
third, drag to chase with release as abandonment, holding
never wins, no generic particle decay (the dissolve is
seeded segment fraying, not particles).

## Known warts

- Mid-dissolve, the surviving contour fragments near the peak
  read as a zigzag rather than a smooth fraying line, because
  each kept segment carries its own seeded vertical jitter.
- The ghost dome is drawn under the formed bands at all times,
  so at full build the outermost ghost arc shows as a faint
  halo just outside the outermost band.
- On phones the form occupies the middle band of the tall
  sheet, with plain near-black above and below; the hint pill
  sits alone near the bottom.
- The contour endpoints carry a small wave dip, so the line
  settles slightly below its base height at both ends.
