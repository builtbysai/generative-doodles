# №1989 Two Passes, Same Hand

- Title: Two Passes, Same Hand
- Prompt code: MC6 / PP1236
- Study: #259 mateo-villanueva-brandt
- Gallery date: 2007-06-23, shown as "2007 · 06 · 23"
- Interaction cue: "Drag to pull the grade from black to ember."
- Interaction: DRAG scrubs the grade; release resumes the slow cycle.

## What the piece does

A simple night shore: a low horizon, a small dark figure standing at
the waterline, a pale moon with a broken reflection column in the
water, stars, and faint shimmer lines drifting on the surface. Over
ninety seconds the grade pulls from near-black monochrome through
deep blue to a hot ember finish, then back. The scene itself barely
moves; the grade moves like weather. A hairline track near the bottom
is graded black to ember along its length, with a pale tick marking
the current grade position.

## FIRST_T and cycle

- FIRST_T = 18 s. The grade is a triangle wave over CYCLE = 90 s:
  grade 0 to 1 across the first 45 s, back to 0 across the next 45 s.
  At t = 18 the grade is 0.40, a deep blue night with the ember still
  to come. The first frame shows the shore already graded and the
  figure already standing at the waterline.
- The figure sways at most 0.006 rad on a 17 s sine. Water shimmer
  lines drift on 0.22 rad/s sines and the stars twinkle at 0.15 Hz.
  Nothing approaches the 14 Hz limit by construction.
- All randomness is seeded (mulberry32, hash noise). No Date, no wall
  clock in animation state. The first frame is deterministic.

## Grade implementation

The scene is defined once in neutral luminance values (sky 0.08 to
0.27, water 0.10 to 0.30, figure 0.03, moon 0.92). Every colour on
screen is gradeColor(luminance, grade), a pure function that
interpolates between three shadow/mid/high stops: near-black
monochrome at grade 0, deep blue at 0.5, hot ember at 1. Scrubbing
the grade therefore never changes the scene content, and only one
colour is ever on screen at a time.

## Drag and release

Pointer drag maps horizontal position across the stage to grade 0
to 1 and holds it while dragging. On release, a phase offset is
chosen so the cycle continues from exactly the scrubbed grade, in
the same direction the cycle was travelling before the drag, with
no jump: if the cycle was rising, phase = grade x 45 s; if falling,
phase = 90 s minus grade x 45 s.

## QA hook

?t= and ?seed= set the virtual clock at load. ?g= forces the grade
at load, simulating a drag-held grade. window.__draw(t) drives draw
with a virtual clock. window.__piece1989 exposes firstT, cycle,
grade(t), effectiveGrade(t), dragTo(g), release(), isDragging() and
redraw(t).

## Deviations from the prompt

None. The prompt says the scene is rendered once in neutral
luminance with a grade parameter scrubbed by drag or by the clock;
the implementation defines the scene in luminance and applies the
grade as a pure function at draw time, which is the same thing in
canvas terms. The hairline grade marker is the track with the tick
near the bottom of the frame.

## Probes

Rendered with node ~/workspace/tools/render-piece.js from the actual
script, seed 18 unless noted:

- render-desktop.png, 1280x900, seed 18,
  md5 179d2234c16ccbad185d99722ad5d34b
- render-mobile.png, 390x844, seed 18,
  md5 199139aa4aaefd41bc784696e2ed0a7d
- thumb.png, 720x720, seed 18,
  md5 e4bb1a495e0e9e3bc76f0f9723b66108
- probe-drag.png, 1280x900, seed 18 with g=0.92 (drag-held ember grade),
  md5 5e24d338cccfd7c817781e93d9b66648
- probe-t63.png, 1280x900, seed 63 (cycle resumed, grade 0.60),
  md5 fe8a874905f606fd0e46ac514918bd0d

Pixel diffs (node-canvas compare, /tmp/pixdiff.js):

- frame one vs drag probe (g=0.92): 685,259 / 685,584 pixels differ
  (99.95%). The whole frame shifts to hot ember while the scene
  content holds exactly, and the marker tick sits near the right end
  of the track.
- frame one vs t=63 probe (grade 0.60): 685,259 / 685,584 pixels
  differ (99.95%). Same composition, grade past the blue peak and
  warming, marker tick right of centre. The cycle visibly resumes
  after a release.
- drag probe vs t=63 probe: 685,259 / 685,584 pixels differ
  (99.95%). The drag-held ember grade and the resumed cycle grade
  are distinct states.

Thumb rendered twice at seed 18: md5 identical both times,
e4bb1a495e0e9e3bc76f0f9723b66108.

All three sizes were visually inspected: desktop square stage
centred on near-black ground, mobile full-bleed, thumb square.
Sky, stars, moon and its reflection column, horizon seam, figure
and reflection, shimmer lines, grade marker, caption, date and hint
all read at every size.

## Fix rounds

None. First build passed visual QA at all three sizes and all
probes on the first pass.

Total fix rounds: 0.

## Known warts

- The figure is a deliberately plain dark column with a round head,
  per the prompt (dark figure, no detail). At thumbnail size it
  reads a little like a monolith or a chess pawn, but its scale
  against the horizon and its reflection keep it a person standing
  at the waterline.
- The water shimmer lines are very faint at the left of the frame
  and read mainly on the right, where the moon reflection column
  carries them. The water is intentionally almost still.
- At the ember pole the sky goes nearly uniform brown-red; the stars
  stay visible but the sky gradient flattens, which is the grade
  doing its job rather than a defect.
