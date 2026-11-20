# №1917 A Different Drummer Every Track (RG6, PP1164, study #250 ruth-goller)

## Driver

One song, one detuned bass figure, one voice, held steady in amber across
the middle of the frame. Above them, five empty drum thrones arc across
the top. Each tap seats a new drummer, Tom Skinner's skitter, Seb
Rochford's weight, Bex Burch's wooden pulse, Frank Rosaly's brushwork,
Jim Hart's metal song, and the whole rhythmic world around the song is
replaced while the song itself never changes. Each replacement re-colors
everything underneath: the drummer's accent washes the frame, the voice
line takes a tint of it, and the struck-glyphs radiating from the throne
change shape, density and swing. The seated drummer plays for a while,
then stands, leaving the throne empty until the next tap. The tap is a
substitution, never a reset.

## Mechanism

2D canvas, visual with a soft lazy thump only inside the tap gesture. The
song layer is a fixed closed-form loop that never depends on the drummer:
a thick amber bass figure with its detuned shadow a few px low, a
brighter amber voice line braiding gently above it, and a slow pulse dot
under each beat. Five drummer agents are closed-form strike models with
distinct strike-density (1.6 to 5.2 strikes per second), swing
(0.06 to 0.30), glyph shape (ticks, discs, bars, brush arcs, rings) and
fan spread. Strikes are scheduled as pure functions of seating time, so
every glyph, trail and pulse ring is deterministic. A tap seats the next
drummer in order, with a 1.2 s crossfade of rhythmic feel: the outgoing
drummer's glyphs fade out from their own throne while the incoming
drummer's fade in, and the frame wash lerps from one accent to the next.
A drummer plays for 18 s, then stands; the wash recedes over 2.5 s and
the throne stays empty until the next tap. The voice line takes a 35%
tint of the seated drummer's accent; the bass never changes color.

## Frame one

FIRST_T = 6 s. Tom Skinner has been seated since t = 0 and is
mid-gesture, the skitter already radiating upward from the leftmost
throne, the song band steady underneath, the frame washed faintly teal.
Every glyph, line and wash is a pure function of t and the seating state,
so frame one is deterministic and byte-reproducible; the thumb and
desktop renders came out md5-identical on a second run.

## Interaction

Tap to seat a new drummer. A tap is a re-seeding, never a reload: the
song is untouched, only the rhythmic world is replaced. No other
interaction. Sound only inside the tap gesture: a single soft 55 Hz
thump at low gain, created lazily on the first tap, never autoplay.

## Palette

Hand-picked from the named colors in the prompt; no study file exists
for ruth-goller. The unchanging song in steady amber #d99a3c with a
brighter voice #e8b45a and a detune shadow #8a5a1e, on a warm
near-black ground #161009 with a faint lift #1f170e behind the band.
The five drummer accents, one each, muted and distinct: Tom Skinner
teal #6fae9e, Seb Rochford rust #b4502f, Bex Burch wood ochre #a67c3d,
Frank Rosaly violet #8f86c2, Jim Hart steel #9fb0c0. Empty thrones in
muted wood-grey #6b5a44. Title and hint in warm off-white #f2e6d4,
date line in muted warm grey #b39a78.

## Composition

A field-like composition: full-bleed on phones, square on desktop, the
page ground set to the piece's own background color. The throne row arcs
above, the song band holds the middle, the seated drummer's gestures
radiate upward as struck-glyphs with faint motion trails. The title plate
sits top-left with the current drummer's name top-right and their style
word small under their throne, the gallery note centered at the bottom
(one line; the title wraps to two lines on narrow screens).

Gallery note: "One detuned bass figure and one voice hold steady while
each tap seats a new drummer over them, re-coloring the same song. Tap
to seat a new drummer."

## Motion

Fastest strike rate is 5.2 per second and glyphs fade rather than blink,
so the frame never flickers above 6 Hz by construction, well under the
14 Hz ceiling. Prefers-reduced-motion shows the static first frame.

## Deviations

Per the Franke audio rule, the prompt's bass and voice are carried
visually, not as real WebAudio: the song is a closed-form line model,
and the only sound is a soft thump created lazily inside the tap
gesture. Taps seat drummers in fixed rotation order (Skinner, Rochford,
Burch, Rosaly, Hart, then Skinner again) rather than at random, so the
sequence stays deterministic and reproducible. The drummer figures are
simple seated forms (head, torso, arms, two drums) rather than detailed
portraits, keeping the glyphs and the wash as the carriers of identity.

## QA

Rendered from the actual script with node-canvas and visually inspected:

- Desktop 1280x900: five thrones arc above the band, Skinner seated
  leftmost in teal with ticks radiating upward on faint trails, style
  word SKITTER under the throne, bass and voice lines steady across the
  middle with pulse dots beneath, title, date, drummer name and hint
  all clear, no overlaps.
- Mobile 390x844: full-bleed framing holds; title wraps to two lines,
  drummer name fits top-right, throne row, band and all text legible,
  no overlaps.
- Thumb 720x720: same first frame, legible at small size.
- Tap probe (?seed=2): Bex Burch seated at the middle throne in ochre
  with bar glyphs and WOODEN PULSE, md5 distinct from the default
  frame; the probe confirms a tap visibly re-seats a different drummer.
- Fix rounds: the voice line first failed to draw (a color-lerp
  helper returned an rgb() string the alpha helper could not parse;
  it now returns hex); the glyph fan first spread nearly horizontal
  and mostly off-frame (now an upward fan with motion trails); the
  top-right label first collided with the long title on the probe
  frame (now name-only, with the style word under the throne).
- Determinism: no Math.random, no Date.now, no wall clock; thumb
  md5 92c86b3ddb5ce4d854536b61ea86d943 and desktop md5
  f63b3b907fbf50f66cc536885e857239 identical on a second independent
  run.

## Known warts

The middle of the frame between the throne row and the band is open
dark space; that is the breathing room the composition asks for, kept
as is. A few of the widest glyphs leave the frame at the top and side
edges, which is the radiating outward doing its job. The drummer figure
is a simple seated form; the glyphs and the wash carry the identity.
