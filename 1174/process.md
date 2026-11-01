# №1174 — Wrong Ways Prevail

Jon Satrom study block JS7, after his doctrine: "there are no right ways to
provoke the glitch, only the wrong ways prevail."

## The piece

A dark stage (#08080A) where generic error dialogs arrive on a fixed 28-second
conductor's score — 14 entrances on a rhythmic grid (0.8s … 24.8s), in a
seeded order. Each dialog drifts in from a screen edge over 0.8s in a 6-step
stepped ease, settles at its seeded resting place, and stacks over the earlier
ones: a fugue of failure. At 27s the whole stage fades and the fugue restarts.

A score strip along the bottom (#141416) draws the composition as notation:
five staff lines, one #00FFC2 note per entrance at its score time and seeded
pitch, notes lighting as their dialog spawns, and a playhead tracking the loop.

The message bank holds 24 absurd errors, written gentle — the computer is
absurd, never accusatory. Three are Satrom's own examples ("The operation
could not be completed because it was Tuesday.", "Error -609: the file is too
honest.", "Your startup disk is almost full of regrets."); the rest are in the
same voice ("The cloud is full. Please imagine smaller weather.", "Your files
have been alphabetized by vibes.", "Error 7: the server responded in
interpretive dance."). Dialog chrome is generic parody — #F0F0F0 bodies,
#D0D0D0 title bars, the three dots in #FF5F57 / #FEBC2E / #28C840, a decorative
OK button. No real OS assets or logos.

## Interaction

Dismissal is impossible, and that is the piece:

- **Tap** a dialog (press and release without dragging) and instead of going
  away it splits into two smaller dialogs carrying the next two messages from
  the bank. Smallest-class dialogs refuse to split and just wiggle.
- **Drag** a dialog to fling it: it flies with the release velocity, decays
  with friction, and bounces off the stage edges (restitution 0.6) until it
  settles.
- At most 12 dialogs may exist; when a spawn or a split exceeds the cap, the
  oldest dialog fades out.

## Construction

- Watch-only state is a pure function of loop time: spawn schedule, resting
  positions, entrance edges and note pitches all derive from one mulberry32
  stream seeded at 1174; drift positions are computed closed-form from the
  stepped ease, never integrated.
- Visitor physics is the sanctioned exception family: a fixed-timestep
  (1/240s) simulation whose initial snapshot is the deterministic score state,
  advanced from recorded pointer events (grabs, flings, splits). Pre-interaction
  frames are therefore identical for every visitor.
- First frame is drawn synchronously at fixed phase T0 = 11s — six dialogs at
  rest, a seventh mid-drift at the left edge, playhead mid-staff with seven
  notes lit. The rAF loop is anchored at phase + elapsed and typeof-guarded.
- Canvas sizes from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas CSS size is pinned in draw(); phone
  detection via window.screen physical size (min dimension < 700px) with the
  h > w·1.15 aspect fallback. Dialog geometry (three size classes) is laid out
  by measuring and wrapping the message text at the current scale.
- House renderer limits respected: no gradients (the dialog shadow is a flat
  offset rect), no ctx.filter, no shadowBlur, no createElement, no
  ImageData/offscreen canvas, no audio, no microphone. Each dot and note head
  is its own path with a moveTo before its arc, per the node-canvas lesson.
- Silent by design.

## QA

- Rendered with the house renderer at 1280×800, 390×844 and 720×720.
- Thumb rendered twice at 720×720 and byte-compared: identical.
- Frame one verified visually at all three sizes: overlapping dialogs with
  readable messages, mid-drift entrance at the left edge, score strip with
  lit notes behind the playhead and dim notes ahead.
