# №1140 — Another Moon

kimchi and chips study block KC5 (2021– ). Their second moon — laser
projectors drawing a moon in the night sky, powered by solar energy
harvested during the day and stored in batteries — as a piece: the
physics is the content. The moon is not free. It runs on a budget.

## The piece

A night landscape in silhouette: two analytic ridge lines (a far ridge
and a near ridge in #0A0D12), three blocky structures standing on the
near ridge with a few faint lit windows, 150 seeded stars twinkling
overhead. Upper-left hangs the real moon — small, warm #F5EEDC, static,
with soft craters. Upper-right hangs the second moon — larger, cold
laser-blue #CDE9FF, and visibly *constructed*: eleven thin beams
(#9FCBEE) converge on its disc from three off-frame projector points.
The beams run faint along their whole throw, brighten where they cross
the haze band above the hills, and are drawn again at full strength
inside the disc, clipped to it — the moon is the place where the fan
meets. The disc itself is layered flat-alpha circles inside a
layered flat-alpha halo; no gradients anywhere.

Along the very bottom edge runs the only UI the prompt allows: a
hairline charge bar, #DFF3FF filling a #1A2230 track.

## The budget

One cycle is 2 minutes: a 60-second day and a 60-second night.

- **Day.** Charge fills at 100/60 per second. A dawn-to-dusk wash
  (sinusoidal over the day) lifts the sky toward dawn grey, lightens
  the hills, fades the stars and the real moon, and the second moon is
  off — the projectors are charging.
- **Night.** The moon shines with brightness B = clamp(charge/30),
  and drains at 1.5·B per second: linear while the battery is healthy,
  an exponential tail once charge falls under 30. The moon's *phase*
  is the charge fraction — a shadow disc offset by (1 − charge/100)
  across the lit disc, so the moon visibly wanes as the battery
  drains. Tuned so the no-event cycle is exactly periodic: every
  night opens at 100, ends at ≈15.4, and the next day refills to the
  cap before dusk. Left alone, the moon survives every night but
  thins to a crescent by dawn; spend the charge badly and it dims
  out early.

Charge is a closed-form function of time and the recorded event
list: `chargeAt(t)` walks analytic segments (split at phase
boundaries and event edges) from a fixed anchor, each segment
integrated in closed form — linear fill, linear drain, exponential
tail, exponential discharge burn. Nothing is frame-integrated.

## Interaction

- **Drag up from the landscape** — borrow light: while the drag
  lasts (and once recorded), harvesting runs +2.2/s faster, and a
  stream of 22 seeded motes rises from the hills into the moon.
- **Drag down from the moon** — dim to save: brightness and drain
  both drop to 0.35× for the drag's duration.
- **Double-tap** — full discharge: the moon flares to 1.35× and
  burns the whole remaining charge exponentially in 5 seconds,
  then the piece waits for the next day.
- Never click-to-reload.

## Sound

Specced but under the house Franke rule: the visuals are complete
silent. On the first visitor gesture only, a lazily created,
typeof-guarded WebAudio layer fades in — looped noise through a
300 Hz lowpass (night air) at gain 0.011, a bandpassed cricket
shimmer at 0.0035, and two cold sines (196 Hz, 294.5 Hz) whose gain
tracks the moon's brightness at ≤0.012. Never autoplays.

## House rules

Canvas sized from the Visual Viewport API with resize listeners on
both the viewport and the window; CSS size pinned in `fit()` on
every draw. The scene is a landscape composition letterboxed into
the viewport (on portrait phones it takes the middle 94% of the
height, so both moons and the bar stay readable). Phone detection
via `window.screen` (min dimension < 700, aspect fallback), star
count reduced on phones. First frame drawn synchronously at the
fixed phase t = 90 s — mid-night, charge 55%, the second moon
bright and gibbous with its beam fan readable, the hairline half
full — and the loop is anchored to that phase plus elapsed time
behind a `typeof requestAnimationFrame` guard. Every disc is its
own `beginPath`; beam fans are stroked polylines. No gradients, no
`ctx.filter`, no shadowBlur, no offscreen canvas, no
`createElement`, no microphone. Visible text is the `<title>`
only; the charge hairline is the only UI.

QA notes: the first render's real-moon halo read as hard concentric
rings — re-layered into three softer steps (0.030 / 0.055 / 0.09) —
and the phase offset was eased from 1.5R to 1.25R so the 55%-charge
frame-one moon reads gibbous rather than a thin crescent. Extra
phases (midday wash, late-night waning) were verified from
phase-shifted scratch copies, since removed.
