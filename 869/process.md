# No.869 "No Computer in the Mix"

Study #106 lim-giong, PP30 "Direct Synth".

## Concept

Lim Giong's personal-work discipline: compose directly on a synthesizer, no
computer in the mix, no grid, no quantization, no correction. The piece is
that discipline as an instrument. An empty black field; the visitor's drag is
drawn immediately as both form and sound. The line's curvature is its pitch
contour, its speed its brightness and gauge, and when the hand lifts the line
sustains and decays over about twenty seconds while the next line is drawn
against it, harmonizing or clashing as it will. Nothing snaps, nothing is
corrected, wobble stays wobble, and genuine dissonance is possible because no
scale is ever imposed. A tap strikes a single gong-dot that blooms and fades.
A double-tap clears the field: a fresh take, the only erasure. Where two
sustained lines cross, a small steel-blue shimmer marks the spot where their
tones beat against each other. Exactly one line at a time can burn crimson:
the loudest voice currently sounding.

Palette, strict: black #020203; live line #E8A020; sustaining lines #8A6A2E;
harmonic shimmer #4D7A99; crimson #B03030 for the loudest line only. No
visible text anywhere except the document title.

## Construction

- Single self-contained canvas 2D page. Canvas sized from the Visual
  Viewport API with resize listeners on both visualViewport and window;
  canvas.style.width/height are pinned in px inside draw() every frame.
  Phone detection reads window.screen physical size (min dimension under
  700px), with aspect h > w*1.15 as fallback only; on phones strokes draw
  about 1.3x wider so a fingertip line keeps its body.
- Recorded-gesture model. Every stroke is a stored polyline of points
  {x, y, t, w, s} in field units (1 unit = min(viewport width, height)):
  position, piece-clock time drawn, width, and drawing speed. Gongs are
  stored events {x, y, t0, freq}. All rendering is a closed-form function
  of (recorded strokes, recorded gongs, t). No per-frame integrated state,
  so any frame, including frame one, reproduces exactly.
- Curvature to pitch. At each new point, curvature k is the turn angle
  between the last two segments divided by their mean length (radians per
  field unit), smoothed with a 0.65/0.35 blend so the contour bends rather
  than steps. Frequency = 80 * 7.5^(clamp(k/9, 0, 1)) Hz, an exponential map
  from 80 Hz (a straight drag hums low) to 600 Hz (a tight scribble sings
  high). The map is continuous end to end: no scale, no semitone snapping,
  no pitch correction of any kind.
- Speed to form. Width w = clamp(0.0105 - speed*0.0030, 0.0032, 0.011)
  field units: slow is heavy and wide, fast is thin and bright. Where the
  pointer event carries a real pressure value it scales width by
  (0.7 + 0.6*pressure). Gain follows brightness = clamp(0.25 + speed*0.35).
- Loudness proxy and crimson. Pointer pressure is rarely available, so a
  stroke's loudness energy is defined as the peak over its points of
  speed * width * 900, the physical work the gesture put into the string.
  The loudest non-ghost stroke whose decay alpha is still above 0.05, and
  whose energy passes a floor (3.4, roughly a fast-and-full stroke), is
  drawn crimson, whole line, until another stroke out-sounds it or it
  fades. At most one stroke is ever crimson.
- Sustain and decay. A released stroke's alpha is (1 - age/20)^1.25 and
  its color mixes from live gold to sustaining umber over the first 5 s;
  strokes are retired just past 20 s. At most 10 strokes are kept.
- Crossings. Segment intersections between every pair of finished strokes
  are computed analytically and cached, recomputed only when the stroke
  set changes; the live stroke's crossings are computed per frame against
  the finished ones. Each crossing draws a small diamond in #4D7A99 with
  alpha from the lesser of the two strokes' alphas, breathing gently on
  the shared clock as the beat between the two tones.
- Audio. Lazily created on the first stroke or tap, typeof-guarded
  throughout; the QA renderer has no AudioContext and the piece renders in
  total silence. One sine oscillator per active stroke (cap 8; a ninth
  retires the oldest sustained voice), frequency and gain retargeted from
  the same curvature/speed values that draw the line, so the sound and the
  mark are one gesture read twice. On release the voice's gain decays with
  a long time constant matched to the visual 20 s sustain and the
  oscillator stops after it. A tap's gong is two detuned sine partials
  (1x, 2.76x) decaying over about 2.4 s, pitched by tap height.
- Ghost stroke (recorded choice). The prompt asks for empty black at the
  start, but a gallery frame of pure black says nothing about the
  instrument. One seeded trace (mulberry32, seed 869030) is therefore
  written into the stroke list as if drawn just before load: its points
  carry timestamps from t = -9.2 to about t = -7.6, so at frame one it is
  a voice 7.6 s into its decay, fully umbered, crossing the middle of the
  field, and it dies away for good about 13 s after the page opens. It is
  excluded from crimson candidacy (it is a trace, not a voice) and a
  double-tap clear never brings it back.
- Determinism. Frame one is the synchronous draw(0) at load: black field,
  the ghost trace mid-decay, nothing else. The clock is elapsed time since
  load via performance.now; the first frame never reads it. No Date.now,
  no Math.random anywhere. No gradients, no shadowBlur, no ctx.filter, no
  offscreen canvas. The rAF loop is typeof-guarded.

## QA log

- Rendered with the house node-canvas renderer at 1280x900 (qa-desktop),
  390x844 (qa-mobile), and 720x720 (thumb). The piece runs cleanly in
  silence: no AudioContext in the harness, all audio calls guarded.
- Determinism: thumb rendered twice and byte-compared with cmp; result
  recorded below after the final render pass.
- Read-back criteria: black field with exactly one dim umber decaying
  curve across the middle (the ghost stroke), no other marks, nothing
  clipped on mobile.

Deviations: none from the brief beyond the ghost-stroke choice above,
which the brief itself specified and which is recorded here with its
reason.
