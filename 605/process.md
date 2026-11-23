# №1910 Rintocchi (MB7, PP1157, study #249 michele-bonifati)

## Driver

Everything in the courtyard starts on the bell. A drag-swung strike
re-seeds the whole field, and between strikes it blooms.

## Mechanism

2D canvas with WebAudio, under the Franke audio rule: the bell model and
the ensemble re-seeding are closed-form state, and sound happens only
inside the drag gesture, never autoplay. The courtyard holds three
dancers in pale cloth, two seated musicians (drum left, long-neck lute
right), and one poet in black, all placed by a seeded generator
(mulberry32). A strike event re-seeds the generator, so the dancers take
new positions, the musicians change phrase (new bob periods and phases),
and the poet speaks a new line from a fixed list of five. The previous
state crossfades by construction: the old formation is replaced at the
strike and the new resonance rings are born at the bell mouth.

The bell hangs from a beam across the top third. Its swing is a damped
cosine set by the last strike, decaying exponentially, so it is near rest
between strikes. Three resonance rings widen from the bell mouth across
the courtyard after each strike and fade over about five seconds.

## Frame one

FIRST_T = 2.4 s. The opening strike sounded at t = 0 and seeded the
courtyard; by 2.4 s the bell swing has decayed to near rest, the first
resonance rings have grown wide and faint across the stone, and the
dancers are mid-bloom in their fixed seeded formation. Every figure is a
pure function of t and the seed, so frame one is deterministic and
byte-reproducible. No wall clock, no Date.now(), no unseeded
Math.random; the only randomness is mulberry32(seed).

## Interaction

Drag-earned. Dragging horizontally swings the clapper with the pointer;
a hard swing past the rim strikes at once, and releasing after a drag of
more than 40 px strikes with strength from the drag distance. Each strike
re-seeds the courtyard and rings the bell: inharmonic partials at ratios
1, 2.76, 5.40, 8.90 over a 220 Hz base, with long decays (6.0, 4.0, 2.6,
1.6 s). The AudioContext is created lazily inside the first pointer
gesture only. Never click-to-reload; there is no game score, no
rhythm-matching, and no preset strike pattern.

QA hook: ?sx= / ?sy=, and ?seed=sx,sy as render-piece.js passes it. A
seeded render re-seeds the courtyard as if a strike had sounded at that
drag position, so the probe frame visibly differs from the default.

## Palette

Hand-picked from the named colors in the prompt; studies/
michele-bonifati.md does not exist. Night indigo sky #141a33 deepening
to #0b0e1e. Stone #8a6f4d with dark stone #5d4a33 and joints #3f3325,
lit amber #e8a94e and soft amber #f2c078. Dark bronze bell #6b4f2a with
rim light #a67c3d and dark bronze #3d2c17. Dancers in pale cloth #e8e2d4
shaded #b9b2a0. The poet in black #0a0a0c with rim #4a4238. Title plate
#e8e2d4, dimmed #9a8f7a.

## Composition

The bell dominates the top third, hung from a beam at the very top edge.
The courtyard stone fills the lower two-thirds, with an amber light pool
under the bell and slab joints. The three dancers stand across the
middle of the stone, the musicians sit at the far left and right edges,
and the poet stands between the dancers. Title plate top-left, the
poet's line in amber above the hint, hint centered at the bottom. The
bell is centered, so the plate clears it on desktop and phone alike.

## Motion

All motion runs near 0.15 Hz, well under the 14 Hz ceiling: slow dancer
sway, musician bob, decaying bell swing, widening resonance rings.
Prefers-reduced-motion shows the static first frame.

## Deviations

Two, both from the prompt's technical approach, per the Franke audio
rule in the brief. First, the bell and ensemble are a closed-form state
model rather than live WebAudio synthesis driving the visuals: the
visuals never depend on audio output, and sound is a gesture-gated
effect only. Second, the strike schedule is drag-earned rather than
civic and irregular on its own: the piece has no autonomous strikes,
because an autonomous strike clock would break first-frame
determinism; the opening strike at t = 0 stands in for the city's
last ring. The poet's lines are five fixed sentences, not generated
text. No game score, no rhythm-matching, no preset strike patterns, no
tourist framing.

## QA

Rendered from the actual script with node-canvas render-piece.js and
visually inspected all three sizes.

- Desktop 1280x900: inspected. Bell centered in the top third, clapper
  at rest, three resonance rings wide across the stone, three dancers,
  two musicians, black poet, all separated, title and date legible,
  poet line and hint legible.
- Mobile 390x844: inspected. Full-bleed phone framing, bell and
  courtyard fill the frame, all figures distinct, title and hint
  legible. The poet stands close to the third dancer's raised arm on
  the narrow frame; the figures stay distinct and it reads as the
  ensemble standing together.
- Thumb 720x720: inspected, delivered as thumb.png of the final file
  at the default (pre-drag) state.

Fix round: the first renders had the title overlapping the support beam
and the left musician overlapping the first dancer. Moved the beam to
the top edge (H * 0.008), moved the musicians to the far edges
(x 0.05 and 0.92), spread the dancers (x 0.22, 0.48, 0.74), and moved
the poet to x 0.585. Re-rendered all three sizes and re-inspected.

Drag probe: render at 720x720 with seed "0.7,0.3" via the ?seed= hook.
Default thumb md5 4f707b8989e7ae7aa80fb65e448aae9e; probe md5
5295ac1c9818536e4d0e383567f0a33f. The frames visibly differ: the
dancers take new positions and poses in the probe frame, confirming a
strike re-seeds the courtyard. (The poet line happens to draw the same
sentence in both; the formation change is what the probe asserts.)

No em dashes in visible copy. No AI-signature language.
