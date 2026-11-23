# №1684: The Slant Field (KG5, PP931, kjetil-golid)

Date: 2006 · 08 · 22
Interaction: watch-only. "Watch the slant pass through."

## Driver

A field of rigid cuboids lies flat on a plane, and then a wave of slant
passes through it. Each box tilts by an angle set by its position in a
spatial field, so disorder arrives as a gradient, not as noise: the calm
corner barely stirs while the opposite corner goes chaotic. That gradient
is the piece. The wave reverses, the boxes settle flat, the field rests a
breath, and the next wave comes with a different field. Slant is visible
two ways at once: the box leans, and its faces change shade as they catch
a fixed light.

## Mechanism

- Grid: 9 by 9, 81 boxes. Each box has a fixed footprint (deterministic
  size variation by hashed cell index) and a fixed color from the six
  color warm spectrum, assigned systematically by (column + 2 * row),
  never at random.
- Cycle: 24 seconds. Rise 0-8s (a slant front sweeps from the calm corner
  to the chaotic corner), hold 8-10s, reverse 10-18s, rest flat 18-24s.
  The field index advances each cycle: diagonal gradient, radial slant,
  swirl.
- Slant: per box, angle = 0.55 rad maximum times field magnitude times
  wave envelope times a traveling-front term. The diagonal field runs
  0.12 magnitude at the calm top-left corner to 1.00 at the chaotic
  bottom-right corner; the radial field grows with distance from the
  center and tilts outward; the swirl field grows with radius and tilts
  tangentially. Each box lerps toward its target every frame through the
  envelope, which is the "lerp" in the prompt title.
- Render: flat fills only. Each tilted box is drawn as a parallelogram
  top face with a darkened side face revealed by the tilt; top-face
  shading darkens with slant against a fixed light from the top left.
  Shadows are simple flat translucent quads offset down-right, longer
  and slightly darker as slant grows. No photorealistic shadows.
- First frame: t = 0, the field flat and at rest before the first wave,
  so re-rendering the thumb is byte-identical.

## Asserted counts

- 81 boxes (9 x 9 grid), verified by BOX_COUNT in the script.
- 6 palette colors: vermilion #D9481F, ochre #E8A820, rose #D97B7B,
  teal #2E7F7A, cobalt #2B4A8C, plum #6B4E8E, on cream ground #F2EAD8.
- 3 field presets (diagonal, radial, swirl), cycling one per 24s wave.
- 1 interaction: none. Watch-only, no click, no reload.

## Deviations from the prompt

None material. Two small judgment calls: the prompt's "long soft
shadows" are kept short of the box size and low in opacity so the shadow
field never reads as a second grid of gray tiles; on phones the field
goes full-bleed per house rules, so cells are taller than wide and the
boxes read as tall slabs there, while the square desktop and thumb views
keep the cuboids lying flat as specced.

## QA

Rendered the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected visually.
Mid-wave frames were rendered at t = 6 (rise), t = 9.5 (diagonal hold),
t = 30 (radial rise), and t = 54 (swirl rise) and inspected: the calm
to chaotic diagonal gradient, the outward radial tilt, and the
tangential swirl each read distinctly. Thumb re-rendered twice,
md5-identical: 427c3ddfafe2382fa5acdfc8934495f8.
