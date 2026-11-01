# No.1043 "The Piste, Watched"

Study #128 kyohei-mouri, PP204 "Twenty-Four Cameras" (Fencing Visualized).

## Concept

The hardware's whole job, in one bout. A dark venue seen from above: a single
piste, twenty-four camera positions watching it (twelve per side, each owning
an 8-meter zone of the strip), and two fencers too fast to follow. What the
eye cannot read, the system draws: behind each sword tip a glowing ribbon
unspools, warm for one fencer, cool for the other, so the fastest motion
leaves the longest light. As a fencer crosses the strip, the camera zone
under them pulses and the handoff travels down the line. No scores, no
commentary, no crowd: the bout is a mechanism, and the array is the subject.

## Construction

- **Bout model.** Both fencers are closed-form functions of a per-fencer
  local time on a seamless 45 s loop. Body position along the strip is a sum
  of sine partials at 3, 5, 7 and 9 cycles per loop (advance, retreat, and a
  fast 9-cycle advance/retreat term phased to pass through zero at frame
  one, so the fencers are moving at full speed in the still). A wrapped
  Gaussian bump at 9 cycles per loop is the lunge envelope: it pushes the
  body forward, extends the blade reach from 0.055 to 0.097 of the width,
  and straightens the blade angle as the lunge commits. Blade angle is a
  5-cycle plus 9-cycle sine sum (feints and wrist flicks), damped by the
  lunge envelope. All parameters come from a seeded mulberry32 generator
  jittered around a tuned exchange, so a reseed deals a new bout with the
  same character.
- **Trajectories.** Ribbons are computed analytically, never accumulated:
  each frame, the tip path is sampled backwards over the past 3.0 s
  (110 samples of the closed-form tip function at local time minus age).
  The ribbon is drawn as per-segment quads whose width follows the tip
  speed at that sample (finite difference of the same closed form), with
  alpha fading as (1 - age/3)^1.4 at a 0.85 ceiling, over one wide faint
  glow polyline. Frame one is therefore exact, not a warmup artifact.
- **Camera array.** 24 boxes on stands, 12 per side. Zone of a fencer is
  floor(x * 12). Occupied zones get a white wash at 0.10 alpha modulated
  by a 1.1 s pulse, inset by 1 px so adjacent zones read as separate
  segments, and the two cameras serving an occupied zone brighten in step:
  the handoff, visible.
- **Frame one.** Fixed phase t = 14 s: both fencers mid-strip (x about
  0.43 and 0.54), both lunge envelopes at peak, blades extended and
  crossing, ribbons streaming behind both tips, zones 5 and 6 pulsing with
  their four cameras lit.
- **Interaction.** Drag across the piste slows local time to 0.22x for a
  fencer whose shoulder is within 0.17 of the width from the finger inside
  the piste band, so their ribbon stretches long while slowed. Tap freezes
  ribbon decay for about 2.5 s by easing an age scale toward 0.12 (older
  geometry reads at near-full brightness: the hit, held) while the bout
  keeps moving. Double-tap reseeds the bout parameters.
- **Sound.** Lazy, typeof-guarded WebAudio created on the first gesture:
  two sine whines pitched and gained by each blade's tip speed, a short
  square click when a fencer changes camera zone (the handoff), and soft
  footwork ticks phased by tip speed. Silent and complete without audio.
- **House rules.** Visual Viewport sizing with resize listeners on both
  visualViewport and window; canvas style pinned in px inside draw();
  phone detection via window.screen (min dimension under 700) with the
  aspect fallback; page ground is the venue tone; strict palette (venue
  #070709, piste #0E0F12, line #23252B, cameras #14151A, stands #0B0C0E,
  fencers #0A0B0D, ribbons #FFE9B8 / #7FD4FF, pulses #FFFFFF at 0.1). No
  gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no
  microphone, no visible text besides the title.

## QA log

- Rendered with the house node-canvas renderer at 1280x900 (desktop),
  390x844 (mobile), 720x720 (thumb). All render cleanly in silence (no
  requestAnimationFrame, no AudioContext in the harness; both guarded).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical, before and after the fix round. The duplicate was deleted.
- Desktop read-back: dark venue, horizontal piste with faint center line,
  24 camera boxes in two rows on stands, the four cameras of the two
  occupied zones lit, two segmented pulse washes mid-strip, two near-black
  fencers (body dash, head dot, blade line) in a crossing exchange, a long
  cool ribbon arcing behind B's tip and a warm ribbon trailing behind A's.
- Mobile read-back: piste full width, all 24 cameras in frame and legible,
  both ribbons and both pulse segments visible, nothing clipped.
- Fix round (one): the first build's ribbons read as a small knot at the
  crossing because body travel over the 3 s window was too small, and the
  two occupied zones merged into one slab. Added the 9-cycle
  advance/retreat body term (zero at frame one, peak speed there) so the
  trails stream, and inset the zone washes by 1 px so the segments stay
  distinct. Re-rendered all sizes; determinism re-verified.

## Deviations

- Tap freezes ribbon *decay* only, per the brief's own simpler option:
  the bout keeps moving underneath while the trails hold their brightness,
  implemented as an eased age scale on the analytic ribbon samples rather
  than a stored history buffer (there is no buffer; the history is the
  closed-form past).
- Drag slow-time advances each fencer's local clock at 0.22x inside the
  rAF loop instead of warping a global closed-form event function: frame
  one and all pre-input states are untouched, and the ribbons stay
  analytic because they sample the fencer's own local time.
- Zone pulse phase is a closed-form sine of the piece clock rather than
  an entry-triggered envelope, keeping the whole frame a pure function of
  time before any input.
