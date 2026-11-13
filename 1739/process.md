# Carve (No.1739)

TD4, #228 taylor-deupree, PP986. Gallery date 2006 · 10 · 16.

## Mechanism

A full-bleed woven field is drawn procedurally each frame in canvas 2D: vertical warp threads in warm amber and rust on deep umber, crossed by horizontal weft bands in an alternating over-under pattern, plus a faint diagonal hatch and 1400 seeded speckles for layered noise. All thread variation comes from a deterministic hash, so the weave is identical on every load.

Twenty-six holes are placed by a seeded PRNG (mulberry32, seed 1739) with a minimum separation so none cluster. Each hole is a pure function of simulation time: it carves open over 5 seconds, one hole every 6 seconds, as an expanding radial gradient with a solid black core fading to a soft edge. After the field is mostly holes, regrowth starts from the corners over 40 seconds, slower than the carving, then a short pause of intact weave and the loop repeats (280 second cycle).

## Interaction

Watch-only. No input of any kind is read; the carving follows its fixed schedule.

## Frame one

Fixed phase at simTime 60 seconds, so nine holes are already fully carved and scattered across the field, with the weave still tight around them. No wall clock or unseeded randomness is used at frame one.

## Deviations

None from the prompt. The field is full-bleed on desktop as well as phones, per the prompt's "full-bleed texture fills the frame", rather than the house square-on-desktop convention for centered pieces.
