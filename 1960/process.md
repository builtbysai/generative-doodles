# №1960 The Knock Counts (CW1, PP1207)

Study #256 caius-williams, opening piece of the study. Gallery date 2007 · 05 · 25
(formula date 2002-01-10 + 1961 days). Gallery note: "Bow strokes rasp pale
streaks across scarred wood while palm knocks ring out in warm white. Drag to
bow the wood."

## What it is

A dark close view of wooden surface, scarred like a double bass body, with a
contact mic clamped near the bridge point. The wood fills the frame; the mic
sits at the golden-ratio point (0.618 W, 0.382 H). Scheduled bow strokes rasp
across as pale streaks and palm knocks land as expanding warm white rings,
on a 48 second working cycle. The visitor drags to bow the surface (drag
speed sets the rasp) and taps to land a palm knock. Never click-to-reload.

## Palette

- Wood amber light #b07a3a, mid #8a5a28, dark grain #5a3a1c
- Shadow black #0d0906, page ground #17100a
- Knock rings, warm white #f5ead6
- Bow streaks, pale ash #d8cfc0
- Mic brass #c9a35a, mic body #2a2a2e, plate white #f2ede1

## Determinism

FIRST_T = 18.5 s. At t = 18.5 the second scheduled bow stroke (12 to 20 s)
is three quarters through, so a long pale streak already crosses the wood,
and the knock at 18 s is half a second old, its warm white ring just
opening. Frame one is a pure function of t plus recorded touch events; the
wood grain, scars and knots are seeded and static.

## Motion and interaction

- Scheduled cycle (48 s): bow strokes at 2-8 s, 12-20 s, 26-31 s, 36-44 s;
  knocks at 6, 10, 18, 24, 33, 41, 46 s. Finished strokes linger as a
  fading smear for 6 s; knock rings expand and decay over 2.5 s.
- Pointer: drag draws a bow stroke, rasp from drag speed (0.35 to 1);
  a quick tap (under 250 ms, under 12 px moved) lands a palm knock.
  Visitor strokes fade over 5 s; at most 8 strokes and 12 knocks kept.
- Mic glow breathes at about 0.1 Hz. All motion is well under the 14 Hz
  flicker ceiling. Prefers-reduced-motion shows a still frame at FIRST_T.
- Audio: visual only, per the Franke audio rule. The prompt's WebAudio
  is not built; visuals run on a closed-form sound model, no autoplay.

## House rules

Self-contained index.html, canvas 2D only, no external assets. Visual
Viewport sizing with resize listened to on visualViewport and window.
Canvas pinned in draw() via canvas.style.width/height in px. Phone
detection via window.screen (min dimension under 700 px) with aspect
fallback (h > w * 1.15). Field-like composition: full-bleed on phones,
square on desktop. One synchronous frame at load; requestAnimationFrame
guarded with a typeof check. No em dashes in visible copy. Hint reads
"Drag to bow the wood. Tap to knock."

## QA probes (node-canvas, actual script)

- Desktop 1280x900, mobile 390x844, thumb 720x720: inspected, all pass.
  Desktop shows the streak, the ring at the mic, the knot pair and the
  plates. Mobile fills the viewport, plates and hint legible, caption
  adjacent to the artwork.
- Determinism: thumb re-rendered, md5 identical both times:
  4b8511abc41027a88762a2f12b0da0a9.
- Time probe (?seed=30): md5 5119520ebfe6341fa4df82a27d9149ed, frame
  differs from frame one as expected.
- Tap probe (?tap=0.30,0.75): md5 7854c6043603dbfffa8c72b715557af7,
  impact dot visible at the tapped point. Note: at the exact probe
  instant the ring radius is zero, so only the dot shows; the ring
  expands over the following 2.5 s in live use.
- Bow probe (?bow=0.15,0.80,0.85,0.25): md5 1a4ce0826cfb6c30bb2d34b5a672b01d,
  visitor stroke visible as a bright diagonal across the wood.
- Live pointer handlers (pointerdown/move/up/cancel) registered on the
  canvas; they cannot fire under node-canvas, so the query-param probes
  above are the interaction evidence.

## Fix rounds

None. First build passed the gate as rendered; no rework was needed.

## Deviations from the prompt

- WebAudio not built: visual-only per the Franke audio rule. The drone
  bed is shown as the mic's slow breathing glow, not heard.
- No finger-slide smear as a separate gesture: drag strokes already smear
  into the grain; slides are not distinguished from bow strokes.

## Known warts

- The scheduled 12-20 s bow stroke passes directly over the mic puck in
  frame one. It reads as the bow working near the bridge point, which
  matches the prompt, but it slightly muddles the mic at first glance.
- The probe bow stroke is a straight 3-point polyline, while scheduled
  strokes are curved; real drag strokes are polylines too, so this is
  honest to the interaction, just plainer than the scheduled art.
