# No.999 "Phenomena" — process

Study #122 satoshi-horii, PP160 "Amplify the Minuscule" (404 Festival billing:
rhythm and motion culled from minuscule phenomena, amplified and edited).

## Concept

A 24x24-unit patch at the center of a dark field holds a minuscule phenomenon:
14 dust motes drifting, one trembling line, one pulsing dot. It stays tiny.
Everything else in the frame is that patch, amplified x40:

- CURRENT (cyan): a 500-particle field whose global drift is the patch's mean
  mote x-velocity, amplified. The patch sneezes left; the room sweeps left.
- SEISMIC (yellow): a waveform band whose trace is the trembling line's mean
  y-velocity history, amplified. The line trembles; the frame shakes in writing.
- BREATH (magenta): expanding rings and a layered sun whose pulse rate and
  radius follow the pulsing dot's brightness, amplified.

Along the bottom, an edit bar with three faders (CURRENT / SEISMIC / BREATH)
mixes the lanes live. The faders drift on their own slow seeded edit; dragging
one makes the edit yours for 20 s. Tap the patch to sample a new phenomenon;
double-tap to reseed the patch and all lanes.

## Construction

- Fixed-step simulation at 120 Hz (DT = 1/120). Frame one is the synchronous
  draw after exactly 2400 pre-roll steps (20 s of earned state). Nothing drawn
  is derived from Date.now or a wall clock; the rAF loop (typeof-guarded)
  advances the same fixed steps, capped per frame.
- The patch is pure data, never pixels. Motes are integrated agents (spring
  toward per-mote seeded target velocities, seeded jitter, wall bounce). The
  trembling line is an 11-point polyline defined by three seeded sine
  components; the pulsing dot is a seeded brightness oscillator. The patch is
  rendered from that data at 1-2 px scale inside a hairline frame, 30-56 px
  across depending on frame size.
- Channels, computed from the sim state every step:
  - X = mean mote vx (signed, patch units/s). It drives CURRENT's global drift
    at x40 (plus a seeded static curl field so the flow reads as a current).
  - Y = the trembling line's mean y-velocity (analytic derivative of the same
    components that draw the line). Every step appends Y to a history buffer;
    SEISMIC draws that buffer, x40, as a scrolling trace, plus a second pass
    over the same buffer delayed 2 s at alpha 0.22.
  - B = the pulsing dot's brightness level blended with its normalized
    derivative and a mote-density shimmer term (smoothed derivative of the
    fraction of motes in the patch's left half). B sets the breath sun's radius
    and glow; a ring is spawned at each brightness peak and expands at a
    B-driven rate, so the ring train is the pulse, made visible.
- Faders map 0..1 to lane gains 0..1.4. Idle fader value is a closed-form
  seeded LFO (0.72 +/- 0.16). A visitor drag sets userVal and holds it for
  20 s of piece time, then blends back to the drift over 2.5 s (smoothstep),
  so the edit never jumps.
- Audio is lazy and typeof-guarded, created only on first pointerdown: band-
  passed noise for CURRENT (gain by |X|), a 46 Hz rumble for SEISMIC (gain by
  |Y|), a 96 Hz swell for BREATH (gain by B); the fader gains are the mixer.
  The visual is complete in silence, which is how QA renders it.
- House rules honored: Visual Viewport sizing with resize listeners on both
  visualViewport and window; canvas style pinned in px inside draw(); phone
  detection via window.screen min dimension < 700 with the h > w*1.15 aspect
  fallback; page ground is the field tone; no gradients (breath is layered
  flat-alpha strokes and fills), no shadowBlur, no ctx.filter, no offscreen
  canvas, no external assets. Visible text is only the three fader tags and
  the <title>.

### Deviations

1. Data, not pixels: the reference mechanism samples a 24x24 offscreen canvas
   per frame. The house renderer forbids offscreen canvases, and pixel
   readback would make the channels a picture of the data instead of the data.
   The channels here are computed from the same agent state that draws the
   patch, which is the honest version of the same stats.
2. Y channel source: the brief allows mean mote dy or the trembling line's
   mean y-velocity. The line's velocity was chosen because the line is the
   patch's visible trembling element; its trace on screen is literally the
   tremor, amplified.
3. One fix round after first render read-back: (a) the patch was centered on
   the full canvas height while the lanes center on the field above the edit
   bar, so the patch hung below the breath rings; it now centers on the field
   height. (b) The two-component tremor's mean velocity largely cancelled
   into a slow, over-smooth trace; a third small-amplitude high-frequency
   component (whose derivative is anything but small) was added to the line
   itself, and the seismic window widened to 2 samples per column. The trace
   is still nothing but the line's own y-velocity. (c) Breath rings expanded
   too fast for more than one to exist at a time; expansion slowed so the
   ring train reads as a train.

## QA log

- Renderer: node ~/workspace/tools/render-piece.js (node-canvas harness, no
  rAF, no AudioContext). Piece renders cleanly in silence at all sizes.
- qa-desktop.png (1280x900): dark field; three magenta breath rings at
  different radii around a layered magenta sun; cyan current streaks sweeping
  in curl arcs; the yellow seismic waveform spanning the full width with its
  faint delayed echo; the tiny hairline patch dead center inside the rings
  (mote specks, tremor squiggle, pulse dot all visible); edit bar with three
  labeled faders, handles near their drift positions. Nothing clipped.
- thumb.png (720x720): same composition at square format; patch, rings, trace
  and bar all legible.
- qa-mobile.png (390x844): phone path (screen min dimension < 700); patch
  stays centered and tiny (30 px floor), waveform spans the width, rings and
  sun hold center, faders spread across the bar with tags legible. Nothing
  clipped.
- Determinism: thumb.png rendered twice and cmp byte-compared: identical,
  before and after the fix round. The duplicate render was deleted.
- Hygiene grep: no gradients, shadowBlur, ctx.filter, offscreen canvas,
  getImageData, Date.now, external references, or em dashes in index.html.
