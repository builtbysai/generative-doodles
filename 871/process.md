# №871 Chrome-Forward

SOA1 / PP1271, study #264 sheldon-omar-abba. Formula date 2004 · 05 · 31.
Opens #264 with its siblings.

The driver, as a felt phenomenon: an automobile framed like a
portrait sitter. Head-on, low, chrome-forward, patient. The car
is the face; the people are accessories, a hand on a door handle
at the left edge and a shoulder passing at the right edge, never
entering the center. The motion is almost none: a slow settle,
like the subject relaxing for the camera.

## Build

- First frame: FIRST_T = 0 s into a 60 s cycle. The settle is a
  closed-form sine: the car sinks up to 5 px by mid-cycle and
  returns to its first-frame height at the seam. The headlight
  glow breathes on the same 60 s clock, full at the seam and
  softer mid-cycle. The shoulder passes the right edge once per
  cycle, in from t=12 to t=48 and gone again by the seam. The
  film grain shimmer shares the 60 s period. All motion is a
  function of cycle phase, so frame one is deterministic and the
  frame at FIRST_T + 60 equals the frame at FIRST_T.
- Motion and safety: nothing changes faster than the 60 s cycle,
  far below the 14 Hz limit by construction. No flicker, no
  strobe, no rapid on/off anywhere. Reduced motion is supported:
  with prefers-reduced-motion the loop never starts and the
  piece rests on its first frame.
- The sitter: one procedural vehicle, posed head-on, drawn in
  canvas 2D. Deep red paint, the one saturated color for the
  session, with a lighter roof and darker lower body, a dark
  windshield with a single slow reflection streak and a small
  rear-view mirror, chrome roofline and hood creases, chrome
  rings around warm headlights with a soft glow on the dusk air,
  a four-slat chrome grille with a small round badge, amber
  indicators, a wide chrome bumper, a plate reading 871, small
  chrome side mirrors, and dark wheels peeking below the body.
  The backdrop is night dusk blue with a warm horizon glow
  behind the car, faint distant rooftops, and a dark street with
  a soft shadow and a faint paint reflection under the car.
- Edge figures: at the left edge a dark-coated sleeve enters
  from the frame edge and a skin-tone hand with four curled
  fingers rests on a bright chrome door handle. At the right
  edge a dark-coated shoulder with a head in profile drifts in
  to 0.92W at mid-cycle and back out; its center never passes
  0.92W, so it never enters the center of the frame.
- Film grain: 700 seeded dots over the frame, alpha breathing
  slowly on the cycle clock, present but never the subject.
- Caption plate top left (№871 · Chrome-Forward,
  2004 · 05 · 31) and hint bottom center (Watch it settle.),
  drawn in-canvas in the template's place, pale chrome white
  over the dusk ground.
- Watch-only; the patience is the content, and hurrying it
  would make it a car ad. No tap, no click-to-reload, no reseed.
  Visual-only: no WebAudio, no autoplay audio, per the Franke
  rule. Canvas 2D only. No em dashes in visible copy.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected visually, plus probes at
  t=0, t=30 (mid-cycle), and t=60 (loop return).
- Determinism: two draws at t=0 differ in 0 pixels.
- Seamless loop: frames at t=0 and t=60 (FIRST_T + 60) differ in
  0 pixels, md5-identical.
- Mid-cycle motion: t=0 vs t=30 differ in 32.43% of pixels,
  dominated by the headlight glow breathing and the grain
  shimmer changing by a unit or two over wide areas, plus the
  shoulder entering at the right edge and the 5 px settle
  shifting the car outline. Visually the change is a slight
  dimming of the halos, a barely perceptible sink, and the
  passerby at the edge.
- Shoulder pass confirmed visually at t=30: the figure stands
  at the right edge with head and rim-lit shoulder, clear of
  the car and clear of the center.
- Fix rounds: 1. Round 1: the hand was a tiny tan blob at the
  frame edge, so the handle, palm, and fingers were enlarged
  to read at thumb size; the roof read van-wide, so the roof
  and windshield were narrowed and the glass sides sloped more.

## Deviations

- None from the prompt. Head-on portrait framing, generous
  space around the car, no three-quarter angle, no motion blur,
  no tracking shot, watch-only, edge figures only.

## Known warts

- The car is a flat stylized front view, so at thumb size it
  can read slightly van-like despite the narrowed roof; the
  portrait framing is deliberate.
- The chrome door handle is mostly hidden behind the palm, so
  the hand reads as a hand at the edge rather than clearly
  gripping a handle.
- The dark band of distant rooftops reads as a near-continuous
  horizon line behind the car at desktop size.
- The grain is nearly invisible in stills by design; the settle
  itself is near-invisible in stills and only shows across
  time.
