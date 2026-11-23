# №1963 Language (nearly there)

CW4 / PP1210, study #256 caius-williams, opening the #256 batch.
Gallery date: 2007 · 05 · 28 (formula date 2002-01-10 + 1964 days).
Gallery note: "Two voices circle one mic, trading the lead and never quite landing in unison. Tap to swap the lead."

## The piece

A small room, pints on a table, a mic in the middle. Two voices
negotiate around the mic: the singer, long held tones on a near
orbit in pale gray; the string, a low answer on a farther orbit in
charcoal. They trade the lead in long phrases and never quite land
in unison. Tap swaps which voice leads. The tap is a handoff, not
a reseed: the timeline keeps running and the roles exchange over a
six second crossfade.

## Palette

- Paper ground #f3f0e8 (warm B and W photo paper)
- Ink #1a1a1a
- Singer tone, pale gray #c9c9c9; singer ring, mid gray #8f8f8f; singer label #6e6e6e
- String answer, charcoal #2e2e2e; string lighter #555555
- Warm table amber #b5772e; dark edge #8a5a1e
- Pint foam #faf7ef

## Determinism

FIRST_T = 32 s. At t = 32 the singer's second phrase (22 to 34 s)
is at full hold while the string's answer (30 to 42 s) is still
rising toward its late peak, so frame one shows both breath forms
circling the mic at different strengths. The orbit angles at t = 32
put the singer up-left of the mic and the string to its right.
Every frame is a pure function of t and the lead state; no wall
clock is read. Reduced motion shows the still frame at FIRST_T.

## Sound model (visual only)

Per the Franke audio rule, the prompt's WebAudio is not built.
The visuals run on a closed-form model: a 48 s negotiation cycle
with 12 s phrases. The singer rises fast (2 s), holds, and falls
fast (2 s), cresting early in its phrase. The string rises slowly
(8 s) and falls fast (2 s), cresting late, and keeps a 0.35 floor,
a low drone that never quite goes silent. The two peaks never
coincide. Orbit speeds are 0.11 rad/s (singer, counterclockwise)
and -0.07 rad/s (string, clockwise). All motion is under 0.1 Hz,
well under the 14 Hz ceiling.

## Interaction

Tap (pointerdown or click on the canvas) swaps the lead voice and
stamps the handoff time. The lead weight moves from 0 to 1 over
CROSS = 6 s on a smoothstep curve, so the outgoing voice thins
and the incoming voice thickens gradually. The phase readout in
the top-right plate shows "Singer leads", "String leads", or
"Handoff: string leads" / "Handoff: singer leads" while crossing.
Hint: "Tap to swap the lead."

## QA probes (all from the actual script, node-canvas)

- Desktop 1280x900, mobile 390x844, thumb 720x720: inspected.
  Mobile fills the viewport, plates top, hint bottom, caption
  adjacent to the artwork.
- Determinism: thumb re-rendered byte-identical.
  thumb.png md5 70a17001038b9771056bccc74d9e0fae.
- Time probes: t=10 md5 f075076452e1b3f106aec9b92ede2f51,
  t=40 md5 e1214bcc2f9370e5843a9e2f2df59c5d, FIRST_T=32 md5
  70a17001038b9771056bccc74d9e0fae. All three differ.
- Lead probes (probe harness /tmp/probe-1963.js, ?lead= and
  ?cross= read at load): default at t=32 is lead singer,
  "Singer leads", weight 1.000. With ?lead=string&cross=0.5 the
  phase reads "Handoff: string leads", weight 0.500, settling to
  1.000 by t=35; md5 cb77ac96f6d6991ddc4f509564054df5. Settled
  string lead reads "String leads", md5
  985f5ba7a8d7b65055b5b835278cef27, and the render shows the
  string form bold and the singer form faint, the reverse of
  the default frame.
- Tap probe (window.__piece1963.tap): tap at t=32 flips the lead
  to string, weight 0.000 at the tap, 0.500 at t=35, 1.000 at
  t=38. A second tap at t=40 flips it back to singer. The
  timeline is untouched by the tap; only the lead state changes.

## Fix rounds

1. First render: the singer's pale gray form was nearly invisible
   on the paper, the string orbit sat too far from the mic, a
   faint horizon line read as a stray mark, and FIRST_T = 18
   landed in a gap where the singer was silent, contradicting
   the documented rationale. Fixed by adding a mid-gray singer
   ring (#8f8f8f) with a higher alpha floor, pulling both orbits
   closer to the mic, enlarging both breath forms and the mic
   head, removing the horizon line, darkening the singer label
   to #6e6e6e, and moving FIRST_T to 32 with a corrected
   rationale. Re-rendered and re-gated after the edit.

## Deviations from the prompt

- The string keeps a 0.35 envelope floor, so it never goes fully
  silent; the prompt's listening gaps are singer-only silences.
  This reads as the low string drone bed the prompt describes.
- The singer's ring is drawn in mid gray (#8f8f8f) rather than
  the specified pale gray, so the near orbit stays visible on
  the paper ground. Its fill and head dot stay pale gray.
- WebAudio is not built, per the standing Franke audio rule;
  the two voices are a closed-form visual model only.

## Known warts

- At some orbit angles the singer's breath form passes behind
  the mic head and is partly hidden; this is the circling
  geometry working as designed, but the near form can look
  briefly clipped.
- The desktop stage has a wide quiet band between the plates
  and the mic; the composition is intentionally sparse.
- The two orbit angles coincide near t = 10 (both forms on the
  same side of the mic); the piece passes through that alignment
  once per cycle.
