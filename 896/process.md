# No.896 — A_n.'d gh[o]st.'s

Study #110 sakrmusic, PP57 "The Polarity Strobe".

## Concept

A black inkblot sunburst on paper white: a spiky mass with a jagged rim and a
glowing white core, hairline filaments radiating outward like cracked glass.
The mass pulsates, contracting into a tight knot and blooming back out, and
the whole frame strobes: ground and ink invert in a single hard cut, white to
black, black to white. The cut is the signature; there is never a fade. The
piece is watch-only at its core. A tap punches one manual flip; a double-tap
holds the current polarity for five seconds while the piece holds its breath.

## Construction

- One self-contained `index.html`, canvas 2D only, no external assets.
  Palette is strict and total: ground `#F5F5F2` / inverted `#050505`, ink
  `#0A0A0A` (drawn as `#F5F5F2` when inverted), core `#FFFFFF`, hairlines
  `#8A8A88` in both polarities (faint gray reads faint on white and on black).
- The mass: 400 blobs from a seeded mulberry32 stream (seed 896057), each with
  a fixed angle, radial fraction, size, static jaggedness that grows toward
  the rim, and a per-blob shimmer phase. Under the blobs sits a filled rim
  polygon of 96 vertices whose radii are seeded-noise-displaced (with sparse
  spike multipliers) so the 400 blobs read as one solid blot with a jagged,
  spiky rim rather than a scatter of separate dots.
- Pulsation: two detuned LFOs, pure functions of t. Mass scale runs on
  11.3 s and 4.7 s components (range roughly 0.46 to 1.0; scale is exactly
  0.8 at t = 0, a mid-bloom first frame). Filament spread runs on 7.9 s and
  3.3 s components. The periods are incommensurate, so the combined figure
  never simply repeats.
- 300 hairlines radiate from inside the mass to near the frame edges, each
  with a seeded length, a slow angular wobble, and low alpha in `#8A8A88`.
- The core is nine layered flat-alpha discs of `#FFFFFF` with an alpha ramp
  ending in a solid white innermost disc. No gradients anywhere (house
  renderer limit), no shadowBlur, no `ctx.filter`, no offscreen canvas.

### The flicker clock and its hard bounds

- Autonomous flips are scheduled by a phase integral:
  P(t) = integral of 1 / interval(s) ds, where
  interval(s) = clamp(4 − 2 × contraction(s), minimum 2) seconds.
  Baseline is one flip every ~4 s at full bloom, shortening toward ~2 s as
  the mass approaches its tightest contraction.
- HARD BOUND 1: the autonomous interval never goes below 2.0 s, enforced by
  the clamp inside `flipInterval` itself, so no code path can schedule
  faster autonomous flips.
- HARD BOUND 2: a global rate limiter enforces at least 0.5 s between any
  two flips of any kind. A tap is accepted only if at least 0.5 s has passed
  since the most recent flip, autonomous or manual; otherwise it is ignored.
- Polarity at time t is computed, never accumulated: it is the parity of
  floor(P(t)) plus the accepted taps in the event log. The phase integral is
  tabulated incrementally at 0.02 s steps purely as a cache of that closed
  form; registering a double-tap hold invalidates and rebuilds the table
  from the log.
- A double-tap hold freezes polarity for 5 s by pausing the phase integral
  across the hold window (the integrand is zero inside a hold), so the
  autonomous schedule resumes where it left off. Taps arriving during a
  hold are ignored. A double-tap is two presses within 0.35 s: the first
  press flips (subject to the limiter), the second converts to the hold.
- Every flip is a hard cut: the draw pass simply renders the other polarity
  on the next frame. There is no crossfade code path.

### Interaction and audio

- Tap: one manual instant flip (rate-limited as above). Double-tap: hold
  the current polarity 5 s. Nothing else; no drag, no reload gestures.
- Audio starts only on the first pointer press. A low brown-noise bed runs
  through a 220 Hz lowpass at low gain. Each flip, manual or autonomous,
  fires one soft thump: a sine dropping 96 Hz to 38 Hz through a soft-clip
  waveshaper, about 0.22 s. All AudioContext use is lazy and typeof-guarded;
  the piece renders complete and silent with no audio support.
- Canvas size comes from the Visual Viewport API with resize listeners on
  both `visualViewport` and `window`; `draw()` pins `canvas.style.width` and
  `canvas.style.height` in px every frame. Phone detection uses
  `window.screen` (min dimension < 700 px) with the aspect fallback
  `h > w * 1.15`; the blot is sized from the smaller dimension (middle ~60%)
  so it stays centered and whole on phones, and the page ground follows the
  current polarity.

### Determinism

Frame one is the synchronous `draw(0)` call at load: positive polarity,
mass scale 0.8, spread at its t = 0 value. No drawn state is derived from
`Date.now()`; the animation clock is a `performance.now()` offset that only
ever advances past the fixed first frame. All randomness is the seeded
mulberry32 stream consumed once at init.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`:
  `qa-desktop.png` 1280x900, `qa-mobile.png` 390x844, `thumb.png` 720x720.
  Renders clean in silence (no AudioContext in the harness).
- Determinism: `thumb.png` rendered twice and compared with `cmp`:
  byte-identical. The duplicate was deleted.
- First pass fix: the blob field alone read as scattered dots with white
  showing through the mass, and the core stacked to mid-gray. Added the
  filled noise-displaced rim polygon under the blobs, enlarged the blob
  size range, and rebuilt the core as a nine-disc alpha ramp ending in a
  solid white center. Re-rendered all three sizes and re-verified the
  byte-compare after the fix.
- Read-back, final: paper-white ground; a solid jagged black inkblot
  sunburst centered in the middle ~60% with spiky protrusions; a hot white
  core glowing at its heart; ~300 faint gray hairlines radiating to near
  the edges. Mobile render keeps the blot centered and whole with nothing
  clipped. No visible text anywhere except the document title.

## Deviations

- Solid rim polygon under the blob mass (see Construction): the prompt's
  400-blob mass alone did not read as one inkblot at gallery sizes; the
  polygon is drawn from the same seeded, noise-displaced radial logic and
  the 400 blobs remain the visible texture and rim detail on top of it.
- The double-tap's first press flips before the second press converts the
  gesture into the 5 s hold; the hold then freezes that new polarity. This
  keeps every press honest to the rate limiter and avoids retroactively
  undoing a flip the visitor already saw.
