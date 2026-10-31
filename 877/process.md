# No.877 "Lockdown Mixer" - process

Study #107 xu-jared, PP38 "Dirty Video Mixer": her lockdown-era circuit-bent
video mixers (2021), CRT glitch, phosphor, sync loss. A broken video mixer
you can play. The signal is abstract (drifting bands, a pulsing circle); the
breakage is the subject.

## Concept

A slow, clean-ish feed (phosphor green and amber horizontal bands drifting at
different rates, one pulsing circle at center) is permanently being bent by a
dirty mixer: horizontal hold slips per slice group, vertical sync rolls,
chroma smears sideways off the hot parts of the signal, a tear line flickers
through at irregular intervals, scanlines crawl over everything, and the
corners sit in CRT vignette. Interaction bends the signal path itself:
horizontal drag is the horizontal hold, vertical drag is vertical sync, a tap
is a chroma slap, a double-tap loses sync entirely for about five seconds
before the frame crashes back to lock with a low thump. Nothing stays fixed:
after any interaction the dirt decays over a few seconds, and then the
mixer's own seeded dirt schedule starts dirtying the picture again. Clean is
the exception. Sound, started only by the first gesture, is the mixer's
electrical voice, not music: a very quiet 15.68 kHz CRT whine, a soft mains
buzz, filtered noise whose cutoff follows your drag, and the re-lock thump.

## Construction

- Single self-contained index.html, canvas 2D, no external assets. Strict
  palette: CRT black #050505, phosphor green #33FF66, phosphor amber
  #FFB000, chroma magenta #FF2E88 (smear pass only, never a flat fill),
  sync white #E8E8E0 (tear edge only). No visible text except the title.
- The feed is analytic, not a bitmap. Ten seeded bands (alternating green and
  amber, alpha 0.22 to 0.72, each with its own slow drift speed and sway)
  plus the pulsing circle are evaluated by one drawFeed(t) function that is
  periodic in H, so vertical roll wraps seamlessly.
- Offscreen adaptation (deviation, recorded): the prompt's technical route
  renders the feed to an offscreen canvas and slices it with drawImage. The
  house renderer has no offscreen canvas, so the feed is instead drawn
  directly per slice: the frame is split into 48 horizontal slices (40 on
  phones), each slice is clipped and the analytic feed is drawn under that
  slice group's own horizontal translation. The visual result is the same
  operation (per-slice hold slip of a periodic signal) with no intermediate
  surface, and frame one stays a pure function of t.
- Hold slip: slices are grouped in fives; each group's offset is
  slipAmp * (seeded 2D value noise over group and slow time), where slipAmp
  grows with the square of the dirt level, plus the live drag offset.
- Dirt model: dirtLevel(t) is a closed-form function of t and the recorded
  event list. The autonomous part is a seeded 1D value-noise floor
  (0.16 + 0.62 * noise(t * 0.045)) that keeps the mixer wandering between
  mild and dirty on its own; taps and sync losses add exponentially decaying
  boosts (tau 1.4 s and 3.0 s), and an active drag adds a flat lift. Drag
  slip and roll are recorded on release as decaying offsets (tau 1.5 s), so
  the picture re-locks over 1 to 3 s after the hand leaves, then the noise
  floor takes over again. Design note: the autonomous floor never reaches
  zero, which is the reading of "clean is the exception" used here; the
  fully clean state exists only as a brief pass-through right after a
  release decay crosses the floor's low phase.
- Sync loss: a double-tap records a loss event. lossRoll(t) integrates an
  eased free roll (0.55 * H per second) for 5 s, then eases the offset to
  the nearest whole-frame multiple over about 0.35 s, which reads as the
  crash back to lock; the draw loop watches the loss window close and fires
  the thump (audio permitting).
- Tear line: a seeded schedule of 401 tears (gap 2.2 to 6.5 s, duration
  0.35 to 1.1 s, seeded height and direction). The first tear is seeded live
  at t = 0 (starts at t = -0.25, duration 1.5 s, at 14% height) so frame one
  shows it. A tear redraws a thin band of the feed displaced hard sideways
  and edges it with a sync-white line whose alpha follows a sine envelope.
- Chroma smear: within each slice, the hot parts of the feed (bands with
  alpha at least 0.45, plus the circle ring) are redrawn twice in magenta
  with the 'lighter' composite at small opposite x offsets, alpha scaled by
  the smear level (dirt-driven, plus a decaying boost per tap slap). Magenta
  appears nowhere else.
- Scanlines: a fixed overlay of 1 px black lines every 3 px at alpha 0.16.
  Vignette: eight layered flat-alpha black edge steps plus four flat corner
  rects; no gradients anywhere.
- Sizing and house rules: canvas size from the Visual Viewport API with
  resize listeners on both visualViewport and window; canvas.style.width
  and height are pinned in px inside draw() every frame; phone detection via
  window.screen physical size (min dimension under 700 px) with the
  h > w * 1.15 aspect fallback; the feed fills the frame and the page ground
  is the CRT black.
- Determinism: frame one is the synchronous draw(0). Every drawn quantity is
  a function of the seeded constants (mulberry32, seed 87738), the recorded
  event list, and t. No Date.now, no Math.random in the draw path, no
  gradients, no shadowBlur, no ctx.filter, no offscreen canvas. The rAF loop
  clock uses performance.now with a frame-counter fallback; neither feeds
  frame one.
- Audio: created lazily inside the first pointerdown, fully typeof-guarded
  (window.AudioContext / webkitAudioContext, try/catch). Whine oscillator
  15680 Hz at gain 0.0035, mains buzz 60 Hz and 120 Hz at 0.005 / 0.0022,
  looped seeded noise through a lowpass whose cutoff (350 to about 3600 Hz)
  and gain follow the same dirt and drag-activity values the visuals use,
  thump = 64 Hz sine burst with an exponential decay envelope. No
  microphone. The piece renders complete in total silence in the QA harness.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js (node-canvas):
  thumb.png at 720x720, qa-desktop.png at 1280x900, qa-mobile.png at
  390x844. All render cleanly in silence (no AudioContext, no rAF in the
  harness; the synchronous draw(0) is the frame).
- Determinism: thumb.png rendered twice and compared with cmp: byte
  identical. The duplicate was deleted. Re-verified after the clock-fallback
  edit (Date.now fallback replaced by a frame counter): still identical.
- Read-back, thumb and desktop (frame one, mid-bend as specced): amber band
  across the top, broad green band, black gap, amber band through the
  center carrying the pulsing circle (green fill, amber ring), the circle
  visibly sheared where slice groups slip, a second green band below, dark
  olive and green bands in the lower third, fine scanline texture over
  everything, corners darkened by the layered vignette, magenta present
  only as a faint additive halo hugging the circle's edge, and the seeded
  tear's thin sync-white line crossing the black gap near the top at about
  14% height. Nothing reads as literal video content; no text anywhere.
- Read-back, mobile (390x844, phone path): same composition in the tall
  frame; the circle scales to the narrow width and sits whole at center,
  bands run full-bleed, scanlines and vignette intact, nothing clipped.
- Static scans of index.html: no Date.now, no Math.random, no shadowBlur,
  no gradient constructors, no getImageData, no createElement, no
  ctx.filter, no em dashes.
- Deviations recorded: (1) analytic per-slice feed instead of an offscreen
  canvas (renderer limit; same visual operation, keeps frame one pure);
  (2) autonomous dirt implemented as a seeded noise floor that never fully
  reaches zero instead of a literal decay-to-clean-then-regrow cycle, the
  reading of "clean is the exception" noted above; (3) the audio whine sits
  at 15680 Hz rather than a full 15.7 kHz-plus hearing-edge tone so it
  stays a quiet presence instead of a dog whistle on laptop speakers; it is
  gain-capped at 0.0035 either way.
