# No.983 "The Wood Sings" — PP144 Timber/Timbre (study #120, daito-manabe / molg)

## Concept

A wooden electronic instrument, after molg's Timber/Timbre: a hybrid of a
cello and a circuit board, carved from warm wood, floating on black. The
wood is the interface — there are no knobs, sliders or screens. Eight
strings run across the grain; 22 brass nodes sit along them. Touch a node
and it lights, the glow runs outward along the grain lines, and its tone
rings. Drag across the strings and you bow them: the grain lights in a
wave behind the drag and a chord sustains while you move. Idle, the
instrument breathes — a sap-glow travels the grain — and roughly every
30 seconds it tunes itself with a slow five-note arpeggio.

Only warm colors exist here. The one piece of text is the small engraved
label the prompt specifies: "TIMBER / TIMBRE".

## Construction

- **Body.** Built in a 1000x1000 unit space, drawn under a slight
  rotation (-0.10 rad) so the instrument floats diagonally. The outline
  is a sampled polygon: cello bouts (lower bout, waist pinch, upper
  bout) down the left side, a straight circuit-board edge with three
  rectangular notches down the right. Two cable curves droop from behind
  the lower edge; five tiny slotted screws sit near the edges.
- **Grain.** A seeded flow field (a slow sine warp along the length,
  plus tangential swirl around three knot centers) is integrated into
  ~34 polylines, kept only while inside the body polygon, and flattened
  into a segment list once at load. Every fifth line is a highlight
  tone. Knots are drawn as five concentric wobbly rings each. All glow
  is layered flat-alpha strokes along these stored segments — no
  gradients, no shadowBlur, no offscreen canvas.
- **Sap-glow.** A bright front travels the grain at 55 units/s
  (closed-form in t, period ~23.6 s): grain segments near the front are
  restroked with the sap tone under a highlight core. A very soft wooden
  knock sounds on each completed pass, once audio exists.
- **Nodes and pitch.** Node counts per string are [3,3,2,3,3,2,3,3] = 22,
  positions seeded with a minimum spacing. Pitch is positional: the
  fraction of string remaining below the node maps to a degree of the
  current scale (three scales: A minor pentatonic, A major pentatonic,
  A dorian colour), 110–440 Hz. Double-tap cycles the scale — the
  retune — and the engraved label reads "RETUNED" for 1.5 s.
- **Glow model.** Everything drawn is a closed-form function of piece
  time t plus recorded events. Plucks and string crossings append glow
  sources {x, y, t0, strength}; each grain segment's brightness is the
  sum of sources with exp distance falloff (radius ~120) times an
  attack/decay envelope (~1.5 s). Bow drags also stamp the strings
  themselves, so crossed strings light segment by segment and relax.
- **Idle arpeggio.** First at t = 9.2 s, then every 30 s: five distinct
  nodes (seeded per cycle) pulse 0.55 s apart, each contributing the
  same glow/flare envelope as a pluck, at lower strength. Frame one is
  the synchronous draw at T0 = 11.0 s, chosen so the sap front is
  mid-body and two arpeggio pulses are still visibly glowing.
- **Sound (the piece).** Lazy, typeof-guarded WebAudio, created only on
  the first gesture; the visual is complete in silence. Plucks are true
  Karplus-Strong: the algorithm is run in JS into an AudioBuffer per
  pitch (cached) and played back — cheap, and it genuinely decays like
  a string. The bow is a sawtooth through a lowpass whose cutoff follows
  drag speed, pitched by the nearest node. Arpeggio notes play at low
  gain; the sap pass knocks softly.
- **Interaction.** Tap (with a 0.22 s commit window so a double-tap can
  pre-empt it) plucks the nearest node within range, or taps the wood
  itself for a tone-less glow. Drag bows. Double-tap retunes. Canvas is
  sized from the Visual Viewport API with listeners on both
  visualViewport and window; style width/height are pinned in draw()
  every frame; phone detection uses window.screen with the aspect
  fallback.

## QA log

- Rendered with the house node-canvas renderer at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png);
  silent render, no errors.
- Determinism: thumb.png rendered twice and byte-compared with cmp —
  identical. Frame one derives from the fixed T0 offset and the seed
  only; no wall clock feeds any drawn state (Date.now is never used;
  performance.now only advances piece time after frame one).
- Read-back: desktop and thumb show the full instrument — cello bouts
  left, notched board edge right, continuous flowing grain with three
  knots, 8 pale strings with 22 brass nodes, 5 screws, two cables
  drooping below, the engraved "TIMBER / TIMBRE" label bottom-center,
  the sap band warming the mid-body grain, and flare rings on two
  arpeggio nodes. Mobile: the instrument scales to the width and sits
  whole in the tall frame, label legible, nothing clipped.
- Fix round: grain segments first drew with butt caps, which left
  visible dashes at polyline joints; round caps/joins fixed it. The
  sap band's falloff was widened (sigma 90 to 115) and its highlight
  core raised so the traveling glow reads in a still frame.

## Deviations

- **Sap tone layering.** The specced sap color #7D5A2E is darker than
  the body #8A5A33, so stroked alone it cannot read as a glow. It is
  laid down exactly as specified (alpha 0.3, wide stroke) and a
  narrower highlight core (#C98F4E) rides inside it; the band reads as
  warm moving sap-light while keeping the specified tone present.
- **Retune scope.** The prompt says nodes "reshuffle to a new scale";
  pitch stays honestly positional (it is derived from string length),
  so retuning cycles the scale set rather than scrambling pitches
  arbitrarily. Recorded here because it is a reading of the prompt, not
  a literal shuffle.
- **Strings across the grain.** Following the source text ("across the
  grain run 8 strings"), the strings run vertically across the
  horizontal grain flow rather than along the body like a cello's; a
  horizontal drag then literally crosses them, which is what the bow
  interaction describes.
