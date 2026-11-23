# Plotted, Not Printed (No.1677, TH6)

A plotter pen draws charcoal bars on a sheet, slowly and imperfectly: the program is precise, the pen is not.

## Mechanism

The sheet is a closed-form function of piece time. Each variation is a
fixed-seed bar layout: 32 vertical bars whose widths come from weighted
probabilities (hairline, narrow, medium, wide), most running nearly the
full inner height of the sheet, some shorter. One seeded column per
variation dissolves into diagonal crosshatch instead of solid ink. Two
seeded bars per variation lift a fraction early, leaving a hairline gap
of bare paper near the foot.

The pen model draws each bar top to bottom in small segments. Wobble is
a closed-form sine function of bar index and height, so the same stroke
always wobbles the same way. Ink density varies per segment from a
deterministic integer hash, between 0.94 and 1.00 alpha. The first
12 scaled pixels of every stroke are pooled ink (#0E0E0E) with a small
pool blob at the landing point, darker than the body ink (#1A1A1A).
Between bars the pen lifts, arcs to the next bar top over 0.8 seconds,
and lands again.

The arm is two-segment inverse kinematics from a mount block on the
top edge to the pen tip. Segment length follows the pen distance, so
the elbow never swings outside the viewport on narrow screens. The
arm is plain dark machinery: two bars, joint discs, a pen holder and
a nib. No face, no character.

## Cycle timing

Each sheet runs draw, then park (10 s), then breath (8 s), then the
next variation begins on a fresh sheet. Total period is 1062 seconds.

| Variation | Seed | Draw | Park | Breath | Total |
| --- | --- | --- | --- | --- | --- |
| 0 | 167701 | 252 s | 10 s | 8 s | 270 s |
| 1 | 167702 | 228 s | 10 s | 8 s | 246 s |
| 2 | 167703 | 270 s | 10 s | 8 s | 288 s |
| 3 | 167704 | 240 s | 10 s | 8 s | 258 s |

Draw time per bar is proportional to its height; the crosshatch column
takes 1.7x longer because it is drawn twice over. A sheet takes
3.8 to 4.5 minutes to complete, inside the prompt range.

## Frame one and determinism

Frame one is t = 100, about 40 percent through the first sheet: 12 of
32 bars complete, the pen mid-stroke on the next bar, pooling visible
at every stroke start, the early-lift gap already showing on one bar.
All layout comes from mulberry32 fixed seeds; wobble and density come
from closed-form sine and hash functions of bar index and height. There
is no unseeded Math.random, no Date, no performance.now in the piece.
The live loop only advances a clock from t = 100. The 720x720 thumb
was rendered twice from the script and is byte-identical both times
(md5 82f1610f3348de875d8cc086b295ff55).

## Plates and house rules

Title plate top left: "Plotted, Not Printed", gallery date
2006 · 08 · 15. Hint plate bottom left: "Watch only." Page ground is
the piece paper white (#F4F1E8) with dark ink plates. Watch-only, no
interaction, never click-to-reload. Resize is listened to on
visualViewport and window; the canvas element is pinned in draw() via
canvas.style.width and height in pixels. Phone detection uses
window.screen with the aspect fallback. One synchronous frame is drawn
at load and requestAnimationFrame is guarded with a typeof check, so
node-canvas QA works. Flat fills only, no gradients. No motion above
14 Hz by construction: the only motion is the slow pen and arm.

## QA

Rendered from the actual script with node render-piece.js and visually
inspected at 1280x900 desktop, 390x844 mobile, and 720x720 thumb.
Desktop: sheet centered, 12 bars drawn, pen mid-stroke, arm folded
from the top edge mount, plates legible, no clipping. Mobile: sheet
keeps its landscape shape, bars legible, arm elbow inside the frame,
plates legible. Late-cycle check at t = 248 shows the full sheet with
the crosshatch column (second from right) and the pen on the final
bar. Park check at t = 258 shows the arm parked above the sheet with
the completed drawing held still.

Fixes made during QA: the first render had oversized ink-pool blobs
(radius tied to bar width, up to 29 px on wide bars) and heavy
horizontal banding from density alpha 0.80 to 1.00; blobs are now
capped at 6.5 scaled pixels and density runs 0.94 to 1.00. The first
mobile render put the arm elbow off-screen; segment length now follows
pen distance, keeping the elbow inside the viewport.

## Deviations from the prompt

One small deviation. The prompt asks for a fresh sheet to feed after
the breath. The sheet change here is a cut at the cycle boundary: the
completed sheet holds still through the breath, then the next variation
appears as a fresh blank sheet with the pen returning to the first bar.
There is no animated feed slide, because a sliding sheet would move
the drawing surface under the pen model. The parked breath is kept
exactly as specified.

## Gallery

Title: Plotted, Not Printed. Date: 2006 · 08 · 15. Note ends with the
interaction cue: "Watch only."

## Gate fix round (fly, parent)
The builder's arm mount sat on the viewport top edge with viewport-scaled segment lengths (0.22-0.40 VH), so on tall phones the arm was a giant zigzag spanning most of the screen while the sheet sat small below it; the paper was not the hero. Fix: mount just above the sheet (sheet top minus 20 scale px) and segment lengths sheet-scaled (0.22-0.42 of sheet width). Arm now stays compact on desktop and mobile, elbow inside the frame, mount fully visible. Thumb re-rendered byte-identical after the fix. New index.html md5 1c981a2b8b7b644ca5429c0ef3b19139, thumb md5 1a120c578e6000d1def852d83111a1e9.
