# №9037 · Synchrony — process

A night field of fireflies that flash to their own rhythms and slowly fall
into step with their neighbors. Your pointer is weather: drift through the
field and the rhythm shatters, hold still and watch it gather again.

## The idea

Real Photinus fireflies synchronize their flashes. The mechanism here is a
Kuramoto model: each fly has a natural frequency (period ~2.6s, ±10%) and
nudges its phase toward nearby flies every frame. Given a quiet minute, the
whole field locks. A computed order parameter drives the small
SYNCHRONY readout, an honest trait legend for the piece.

A few flies (8%) are rebels with no coupling at all. They drift through the
locked field flashing to their own rhythm, which makes the synchrony feel
earned rather than mechanical.

## Interaction

- Move / drag: flies near the pointer scatter and their phases shatter
  (close in, a full reset; further out, a fray). Startled flies stop
  listening to neighbors until they settle.
- Click / tap: a soft clap that shoves phases in a ring.
- Stillness: nothing disturbs them, coupling rebuilds the wave in ~20s.
- `?seed=` resows the field.

## Rendering

Canvas 2D. A static night backdrop (gradient sky, moon with halo, 170
stars, hill silhouette, vignette) composited each frame under a persistent
glow layer that fades slowly, so flashes leave light trails. Flashes are
pre-rendered radial sprites in three warms (amber, gold, green) drawn with
lighter blending. Grass blades sway on the main canvas; every fly carries a
faint ember so the field never feels empty on the dark beat between
collective flashes.

## QA (2026-10-01, local)

- `node --check` on extracted script: clean.
- CDP fail-closed exception probe, 15s desktop + 12s mobile: zero
  exceptions, zero console errors.
- Sync probe (the actual claim of the piece): order parameter 0.35 → 0.99
  over ~25 quiet seconds; a human-speed drag drops it to ~0.82; 15s of
  stillness rebuilds to ~0.99. Verified live via `window.__syncR`.
- Desktop 1280x800 and mobile 390x844 screenshots inspected: bright beat,
  dark beat, post-drag scatter all read correctly; caption/meter layout
  holds on narrow screens.
- Tuned twice from probe data: first the coupling was too weak to hold
  (sync decayed after 20s), then the disturbance couldn't overcome the
  coupling (startled flies now stop listening; close range hard-resets phase).
