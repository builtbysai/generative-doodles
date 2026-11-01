# №1095 — The Robot's Cue Sheet

Marco Tempest study block MT8 (PP256): the MagicRobot timeline-composition system as a pure piece. A gray industrial robot on a pedestal in a dark lab runs a visible cue sheet: a playhead sweeps a timeline strip, and at each amber cue marker the robot interpolates to the next pose in its tree while its face light-panel swaps state and the state display names the pose.

## How it works

- **Closed-form everything.** The pose state at any time is a pure function of loop time (50 s loop). Six cues at t = 2, 10, 18, 26, 34, 42 call REST → GREET → PRESENT → POINT → SCAN → BOW → REST. Each transition is a 1.5 s smootherstep interpolation of every joint between pose sets; nothing is frame-integrated.
- **Robot.** Pedestal and column base, a two-segment arm (shoulder/elbow forward kinematics, angles measured from straight-down), a wrist block, and a block head on a tilting neck. A fourth channel, *lean*, rotates the whole upper assembly about the column base (BOW leans 10°). The figure is scaled about its floor point so it stands ~55% of the frame height.
- **Face panel.** A dark inset panel in the head block carries light patterns only — no face. Four states: idle (dim dots, flat line), open (round eyes, open mouth), smile (arc eyes, smile arc), focus (visor line, dot). The state swaps at the transition midpoint.
- **Servo-breathe.** During holds the joints carry a ~0.5° sine oscillation at integer cycles per loop (13/17/11), so the loop seam is invisible.
- **Timeline.** Bottom 18% strip: track with elapsed portion, six amber diamond cue markers (bright once fired, dim ahead), and a pale playhead with a flag. The state display top-left reads `POSE: <name>` in muted mono, with a small amber square that pulses while a transition is running.
- **Determinism.** Frame one is drawn synchronously at the fixed phase t = 14 s — the PRESENT transition (cue at t = 10) has settled, the display reads POSE: PRESENT, the playhead stands at 28%. The rAF loop is typeof-guarded and continues from that phase.
- **House rules.** Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window, CSS size pinned in draw(), phone detection via `window.screen` (aspect fallback), the square stage centered so the robot/timeline split holds on phones. No audio, no interaction, no gradients, no offscreen canvas, no `ctx.filter`, no shadowBlur, no `createElement`. The only visible text is the specced state display and the `<title>`.

## QA

- `qa-desktop.png` (1280×800): dark lab, robot centered at ~52% of frame height in the PRESENT pose (arm extended forward), block head tilted with the cyan smile panel lit, `POSE: PRESENT` top-left, timeline strip with six amber markers (first two fired bright) and the playhead at 28%.
- `qa-mobile.png` (390×844): square stage centered, split and all elements legible, nothing clipped.
- `thumb.png` (720×720) rendered twice and compared with `cmp`: **byte-identical**; the duplicate was deleted.
