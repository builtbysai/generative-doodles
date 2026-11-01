# №1301 — Code of Points (karen-kraven KK6, PP468)

A risograph-printed field on which three gymnastics balance-beam routines are
scored as rhythmic mark sequences, after Kraven's Simone (2016) risograph
posters of Code-of-Points scripts.

## Bands, top to bottom

- Comaneci 1976, black #222222: dense dot-dash runs, 38 s loop, single pass.
- Miller 1996, teal #3E7C7B: airier loops, 47 s loop, 2 px misregistration
  second pass at low alpha.
- Biles 2016, coral #D96C4F: sharp angular bursts, 55 s loop, 3 px offset
  second pass at low alpha.

The three bands run independently and phase-drift; no two loops share a
length or density. Generous paper margins on desktop; full-bleed on phones.
Grain is static seeded flecks, never animated noise. No gymnast figures, no
beam apparatus, no Olympic marks: only the score.

## Motion

Watch-only. Each band's trace dot runs its routine left to right at a fixed
tempo, drawing its path: marks behind the head render full strength, marks
ahead stay faint, so the played portion is always legible. On completion the
band reseeds to a different routine fragment from a seeded sequence.

Drag slows or speeds the nearest band's tempo, like holding the paper: each
recorded drag event contributes a closed-form time boost that decays with a
2.5 s tau, so head position is an analytic function of recorded events and
piece time, never frame-integrated state.

## Determinism

Frame one is drawn synchronously at exactly t = 0 via a boot flag; the clock
starts only with the rAF loop. All fragments, grain, and reseeds come from
mulberry32 sequences keyed by band and cycle index. No Math.random anywhere.

## Verification

- Rendered at 1280x900, 390x844, and 720x720; inspected at all three sizes.
- Thumb rendered three times, byte-identical.
- Fake-rAF probe: dark-pixel count rises as heads advance (5775 at frame
  one, 6877 at t = 20 s, 8013 at t = 40 s after band 0 reseeds), and a
  rightward drag on the middle band changes the frame, confirming the tempo
  effect.

## Fix rounds

- Misregistration pass initially drew marks at band-relative x instead of
  absolute x, offsetting the ghost pass from the main marks; fixed by
  building the absolute mark first and passing it to both passes.
- Resize handler could re-draw frame one after the first frame; guarded so
  the boot draw runs exactly once.
