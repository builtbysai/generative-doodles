# №9012 · Murmuration — process

Date: 2026-09-13. Particle typography from the "Word Swarm" seed: a word
rendered as 640 particles that hold letterforms without ever settling.

## Algorithm (own implementation)
- A seeded word is drawn to an offscreen canvas in bold Georgia and its
  pixels sampled into particle targets (shuffled with the seeded rng).
- Each particle springs toward a goal point that circles its target on a
  small perpendicular orbit (own phase, frequency, radius): the letterform
  shimmers instead of freezing.
- Every ~8.5 seconds a gust (direction from the golden angle times the gust
  index, so it is deterministic without an rng stream) scatters the swarm;
  the spring pulls the letters back together.
- Pointer position repels nearby particles gently (pointer events, so touch
  works too).
- Rendered as short velocity-aligned segments in restrained indigo on warm
  paper; live frames use a partial fade so motion leaves comet trails while
  the word stays crisp.

## What the iteration taught
- The first orbit model (perpendicular acceleration) overpowered the spring
  near targets and the word never formed. Restructured as a spring toward a
  moving goal point: tight letterforms that stay alive.
- The first gust schedule fired during the initial fly-in and delayed
  formation; the first gust now waits until the word has formed.
- `?t=` freezes a frame of the simulation; `?word=` plus `?seed=` in the
  URL make a specific word deterministic. Click picks a new word and seed
  and keeps them in the URL.

Default seed 90120912 (word MEADOW). Click the piece for a new word.
