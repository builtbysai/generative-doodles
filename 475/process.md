# No.475 The Capsule

EXPANSION #57 julandthefox (Giulia Neri), prompt GN3.

## Concept

Her New Scientist piece as a gentle physics toy. A giant red-and-white pill
capsule lies tilted across a pale cream field. Inside the translucent white
half sits the closed-eye woman, knees drawn up, tiny against the capsule
walls. Soft shadows fall under the capsule. Nothing else: empty cream above
and below, no symbols, no labels. It is a mood, not a message about medicine.

Drag tilts the capsule (plus/minus 25 degrees, soft spring back on release)
and she slides gently to the low end, eyes closed throughout. Tap or
double-tap reseeds her starting position. The capsule breathes almost
imperceptibly. Never click-to-reload.

## Construction

- Single self-contained index.html, canvas 2D, prompt palette only: ground
  cream #EFE3C8, capsule red #D61F26, capsule white #F7F4EC, dress #D9A03F,
  hair #3B2A24. One lowercase "drag" hint in the corner, capsule red at low
  alpha; no other text.
- Capsule: a stadium outline about 82% of frame width, drawn in a rotated
  frame at a seeded resting tilt (about -8 degrees). Red half filled opaque;
  the woman is drawn clipped inside the stadium; the white half is then laid
  over her at 0.55 alpha so she is seen through the glass, with a soft
  highlight stripe along the top and a faint seam band at the join. Three
  radial-gradient shadows sit under the capsule, following its axis.
- Woman: simplified seated silhouette built from flat shapes. Hair mass and
  face-framing strands, flaring mustard dress, two knee mounds with crease
  shading, skin shins and bare feet on the inner floor, arms curving down to
  hands resting on the knees, closed eyes as two short strokes. Her height
  is the smaller of 25% of frame height and 68% of the capsule diameter, so
  she always fits the white half.
- Physics: tilt and her slide run on damped springs in the animation loop.
  Drag maps horizontal travel to a target tilt clamped at 25 degrees; on
  release the capsule springs back to its resting tilt. Her target position
  follows sin of the tilt (the offset from rest), so she settles at the low
  end with a slower, softer ease, plus a slight trailing lean while she is
  still moving. Breathing is a 0.5% scale sine on a 7s period.
- Grain: a precomputed seeded array of about 1100 low-alpha dots (warm dark
  and light) drawn identically every frame over everything.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in draw()
  every frame. Phone detection via window.screen (min dimension under
  700px) with the h > w*1.15 aspect fallback; on phones she gets a 1.22x
  legibility bump and the composition keeps its shape; page ground is the
  cream.
- Determinism: the first frame is drawn synchronously at the constant
  resting state (seeded tilt, seeded start position, zero physics time).
  Nothing in frame one comes from the clock. requestAnimationFrame is
  typeof-guarded and the loop steps physics from frame timestamps, so the
  node QA renderer draws the same frame. All seeded layout uses mulberry32
  with a fixed seed; tap reseeds derive from the same seed family.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb rendered twice and byte-compared with cmp,
  identical; repeated after each fix below. Second render deleted.
- Desktop and thumb: the capsule reads instantly (opaque red half,
  translucent white half), tilted diagonally across the middle band with
  soft shadows beneath. The woman is clearly visible through the glass,
  seated with knees drawn up, shins and bare feet on the capsule floor,
  hands resting on her knees, eyes closed. Hint sits quietly in the corner.
- Mobile: composition keeps its shape; capsule and woman both legible,
  nothing clipped.
- Fixes during QA: the first figure read as a plain bell shape, so the
  knees were raised and widened into distinct mounds with crease shading
  and a centre crease, skin shins and feet were drawn in front of the dress
  hem, hair strands were added in front of the shoulders to frame the face,
  and her height cap was raised from 64% to 68% of the capsule diameter.
  A second pass raised the knees further (centre at 46% of her height),
  strengthened the crease outline under each knee, shortened the shins
  into a tucked pose, added a soft seat shadow, centred the feet, put the
  hands on top of the knees, and raised the phone legibility bump to
  1.22x. All renders were regenerated and the determinism gate re-passed
  after the final fix.
- Deviations from the prompt letter: one. GN3's palette names only dress
  and hair for the woman; her skin is drawn in #EBC9A8, the skin tone from
  the same artist's palette as used in GN1, so the face, hands and feet
  read against the dress. No other deviations.
