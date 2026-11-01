# No.1005 "On Cue, Every Night"

Study #123 yuya-hanai, PP166 "Run Every Night": Hanai's spectacle discipline,
the live system that must work in front of everyone, made visible as a control
room of six channels feeding one show.

## Concept

Six system lanes (CAMERA / PROJECTION / TRACKING / LIGHT / SOUND / NETWORK)
scroll their own live signals in the top two-thirds of a dark room. Below them,
a stage window combines the six signals into a single performing figure. Every
60 seconds the show cues: a 5 second countdown locks the lanes, the figure
performs for 20 seconds, the lanes release. Lanes fault on a seeded schedule
and the show genuinely loses those signals and simplifies, but a show always
completes. The status line along the bottom counts the truth of the sim:
"SHOW 214/214. ON CUE." at load, incrementing after each completed show.

## Construction

Everything is a closed-form function of piece time t and the recorded
interaction events. Frame one is the synchronous draw at the fixed offset
T0 = 14 s: cycle position 14 is mid-performance, and the tracking lane is
mid-fault.

- Lane signals. Each lane's waveform is a seeded function rawVal(lane, s, st)
  of position s and scroll time st, with its own character: camera is two
  layers of value noise (jittery), projection is two summed sines (smooth),
  tracking is thresholded noise (spiky), light is a slow sine pair, sound is
  two dense noise layers, network is a sparse packet bump train over a near
  flat baseline.
- Scroll lock. During the countdown the lanes lock: scroll time is a
  piecewise function of cycle position that crawls during the 5 s countdown
  (5 s of real time becomes 0.8 s of scroll) and runs 1:1 otherwise, so the
  lock is real in the drawn signal, not a label.
- Faults. Fault windows repeat on a 47 s seeded pattern per lane (different
  windows per lane; tracking's first window is 13.2-17.7 s so frame one
  catches it). A fault factor ramps down in 0.15 s and recovers over 0.8 s.
  Fault behaviour is per lane and real in the signal: camera freezes its
  frame (stutter), projection and sound drop toward flatline, tracking drops
  to zero (dropped frames), light sags to a low level instead of zero, network
  flatlines. A red flash fires at each fault onset and decays exponentially;
  a thin red underline holds while a fault is active.
- The figure is drawn from the lanes, not beside them. Its horizontal path
  reads the tracking value, its vertical bob the camera value, its arm swing
  the camera and projection values, its glow radius the light value, its
  trail length and density the sound value, its body and head colours the
  projection and camera health. A network fault makes it flicker. When two or
  fewer lanes are healthy the figure collapses to a point and a stem: the
  mix has genuinely thinned. It still performs. The show count is computed
  from completed 20 s windows, which faults cannot cancel by construction.
- Interaction. Tap a lane to inspect it full-frame for 10 s. Drag on a lane
  to stress it: for 30 s an extra fault pattern (windows on a 23 s cycle) is
  added to that lane, doubling its fault rate. Double-tap is opening night:
  the cue epoch resets, stress clears, and faults are suppressed for the
  first show (25 s) so the night opens perfect.
- Audio. Six lazy, typeof-guarded oscillator voices (one per lane, character
  types and pitches per lane) behind a master gain that rises during shows.
  Each voice's gain follows its lane's live health, so a fault drops its
  voice out of the mix. No audio exists before the first pointer gesture;
  the visual is complete in silence.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). All
  render cleanly in silence; listeners registered are visualViewport resize,
  window resize, and canvas pointerdown/move/up.
- Determinism: thumb.png rendered twice and cmp byte-compared identical;
  the duplicate was deleted. Frame one derives from the fixed offset T0 only.
- Read-back, desktop: six stacked lanes with tiny mono tags at left, each
  waveform visibly in its own character (camera jittery cyan, projection
  smooth mint, tracking flatlined yellow inside a red fault wash with the
  onset edge at left, light a slow magenta swell, sound dense gray, network
  near-flat slate with one packet bump). Stage window below holds the small
  figure (cyan head, mint body, layered magenta glow) performing with
  tracking lost. Status line reads "SHOW 214/214. ON CUE." in mint along
  the bottom.
- Read-back, mobile: the same stack compressed into the tall frame, lanes
  and tags legible, figure and glow whole in the stage window, status line
  intact, nothing clipped.
- Hygiene: no gradients, no shadowBlur, no ctx.filter, no offscreen canvas,
  no Date.now, no external references, no em dashes. Canvas size comes from
  the Visual Viewport API with resize listeners on visualViewport and
  window; canvas.style width/height are pinned in px every draw; phone
  detection uses window.screen with the aspect fallback.

## Deviations

- Network line colour: the specced network hex #2B3038 is used for the
  lane's border tone, but the waveform itself is stroked in the derived
  slate #4A5060. At 1.4 px on the #07080C room, #2B3038 is nearly invisible
  and the lane would read as dead when healthy, which would fake a permanent
  fault. The slate is the same hue family lifted until the sparse healthy
  signal is honestly visible.
- Lane fill reuses the specced stage tone #0E1118 rather than introducing a
  new hex; the stage-window border uses the series-standard hairline
  #3A3D46. No other colours are introduced.
- Audio voices are simple continuous oscillators with health-driven gains
  rather than literal static, plucks and pings; the mechanism that carries
  the piece (a faulting lane drops out of the mix, the mix swells during
  the show) is exact, the timbres are approximations.
- Opening night restarts the show counter from the seeded 214 baseline, in
  keeping with its reset semantics; the counter remains a truthful count of
  completed shows since the night opened.
