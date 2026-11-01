# №1202 — A Better Ghost

Evan Meaney study block EV3. After his VDB work made from home movies
recovered from failing hard drives: "while error and decay may keep us up
at night, they might also be the way we put our ghosts to bed."

A dark room. On the screen, a home movie: a dim figure walks across a
blue field. The place never changes. The person fades.

## How it works

- **The walk.** The figure crosses the field in 15 s and wraps; five
  crossings make the 75 s loop. Two stepped leg poses alternate at
  2 steps/sec. Three ghost-bands follow the same walk function at
  −1.1 s, −2.2 s, −3.3 s, so the procession is one walker read at four
  moments, not four walkers.
- **The fade law.** Playback stutters at hashed times (gaps of 5–9 s,
  derived from a seeded integer hash — never from Math.random). Each
  stutter ends with the lead figure one step more transparent:
  opacity = max(0.16, 1 − 0.09 × stutters ended). It steps; it never
  drifts, and it never reaches zero — the ghost persists, faintly.
  Ghost opacities are the lead's × 0.40 / 0.25 / 0.12.
- **Stutters.** For 0.5 s the movie is drawn in 18 horizontal slices
  whose x-offsets re-hash every 0.08 s; the hardest-sheared slices get
  a cyan fringe line, and a magenta band chews vertically through the
  frame. Between stutters the picture is completely calm.
- **Ghost scars.** Each ghost carries permanent slice offsets of its
  own — ghost g is displaced in more bands, by larger hashed amounts —
  so the trailing copies are not just fainter, they are more damaged.
- **The seam.** At 74.4 s a stronger, darker stutter masks the loop
  reset: the mourning restarts under cover of the worst damage.

## The seance

Holding a touch is the only interaction. A summon factor rises over
1.5 s while held and decays over 3 s on release, computed piecewise
from the recorded hold intervals. Ghost opacity scales by up to
×(1 + 1.8·s) and the lead gains a little back; a pale ring gathers at
the fingertip. The figure almost returns. It is never saved — release,
and everything sinks again on the same schedule.

## House notes

- Silent by design. No sound is recorded or played; the "playback"
  is entirely drawn.
- The whole frame is drawn slice-by-slice every frame, so shear is
  native to the rendering rather than a post effect. No offscreen
  canvas, no gradients, no filters.
- First frame is a fixed phase (piece time 31 s: five stutters have
  landed, the lead walks at 55% opacity, calm between stutters),
  drawn synchronously at load; the animation clock is anchored to
  that phase. All variation comes from seeded hashes.
