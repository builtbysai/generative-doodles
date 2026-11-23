# №1569 Walk Between Raindrops

- **Study:** #207 senbaku-deconbatch, SB2, PP816
- **Gallery date:** 2006 · 04 · 29
- **Interaction cue:** Watch the weather change.
- **Interaction:** watch-only. No pointer listeners of any kind.

## Spec

Soft watercolor washes in sage and teal drifting across warm paper, built
from thousands of high-transparency overlapping circles; thin node-garden
line clusters (tiny networks of connected nodes) knit through the washes
like veins. The washes breathe slowly, edges never sharpen. Palette: warm
paper #F2EDE4 ground; sage #9DB89A, teal #5E8F8B, deep green #3E5E4E, all
at low alpha. Nothing else. Composition: full-bleed wash field, denser at
the edges, a pale breathing hole near center-left. Motion: watch-only.
Particles advect through a slow noise vector field, leaving translucent
trails that accumulate into washes; every ~25 s the field direction
reseeds itself so the weather changes without a cut. Never any pointer
interaction, it is weather, not an instrument. Reference study:
senbaku-deconbatch vector-field watercolor.

## Deterministic wash construction

No frame-integrated accumulation anywhere, no Math.random, no Date.now.
All particle parameters come from a single mulberry32 stream seeded with
1569, built once at load. Every frame is a pure function of piece time t:

- Each of 700 wash particles has a seeded base position (rejection
  sampled so density rises toward the edges and falls to near zero inside
  the pale hole), a palette color (sage 5/11, teal 4/11, deep green 2/11),
  radius 9-26 px, alpha 0.030-0.055, and slow sinusoidal drift parameters.
- `posAt(p, f, tau)` is closed-form: two slow sinusoids plus a bounded
  sine drift along the current field direction. No state carries between
  frames.
- Each particle is drawn as the deterministic union of its positions over
  a fixed trailing window ending at t: 20 samples, 0.35 s apart (7 s
  window), alpha fading with sample age. Alpha accumulation does the
  watercoloring; there are no blur filters. Frame one is pre-warmed
  because the window reaches back before t=0, so washes are present from
  the first frame.
- The pale hole near center-left (0.38, 0.44 of frame) rejects wash and
  node samples inside radius 0.10-0.12 of frame size, breathing on a
  0.13 rad/s sine, with a soft fade to 1.4x radius. Measured hole-region
  paper fraction at t=0: 0.9838.
- Node garden: 80 sparse particles on the same closed-form paths, drawn
  as deep-green dots (alpha 0.45) with thin lines (alpha up to 0.13) to
  near neighbors within 72 px.

## 25 s reseed schedule

- Reseed index is `floor(t / 25)`, a function of piece time only.
- `epochAngle(e) = 1.25*sin(e*1.7 + 0.4) + 0.6*sin(e*0.9 + 2.1)` gives
  each epoch a new global field direction.
- Over the first 4 s of each epoch the direction eases from the previous
  epoch's angle to the new one (smoothstep blend), so the weather changes
  without a cut. Trail samples use `fieldAngle(tau)` at their own time,
  so the transition is continuous across the trailing window too.
- Verified: epoch 0 at t=3, epoch 1 at t=25, epoch 2 at t=50; a t=27
  render inspected visually shows the washes shifted with the hole
  intact and no jump.

## House rules

- Visual Viewport sizing with resize listeners on visualViewport and
  window only; canvas element pinned in draw() via
  canvas.style.width/height in px.
- Phone detection via window.screen (min dimension under 700 px) with
  aspect fallback (h > w * 1.15). Field-like composition: full-bleed on
  phones, square centered on desktop with the paper ground.
- One synchronous frame at load (`draw(0)`); every requestAnimationFrame
  call guarded with a typeof check so node-canvas QA works.
- No em dashes in visible copy, no AI-signature language. No audio.
- No Path2D, no gradients, no shadowBlur. Every arc is preceded by a
  moveTo (node-canvas batched-arc quirk); every fading alpha is rounded
  to 4 decimals before stringifying (scientific-notation alpha quirk).

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js
at 1280x900 desktop, 390x844 mobile, and 720x720 (thumb.png). All three
inspected visually: soft low-alpha sage/teal/deep-green washes, thin
node-garden veins visible, pale hole near center-left, denser edges,
full-bleed on mobile with no clipping, square centered on desktop.

Probe harness /tmp/probe-1569.js, all checks passed:

- Two fresh 720x720 renders at t=0 byte-identical
  (md5 980cf738316ec572b68a0ecec2b4e69c); same-env redraw at t=0
  identical.
- t=3, t=25, t=50 frames each differ from the previous; epochs step
  0, 1, 2 at the 25 s boundaries.
- Palette bounds check on thumb.png: 22 of 518,400 pixels sit a hair
  outside the strict paper/palette blend range (worst (60,98,83),
  2 units below deep green), all antialiased caption text; no
  out-of-palette color anywhere. The earlier blue-cast flag was a bad
  heuristic: teal (94,143,139) legitimately has B above R.
- Listeners are resize only (vv:resize, win:resize). No pointer,
  mouse, touch, or click listeners in the source. No Math.random,
  no Date.now.

## Fix rounds

1. First build: washes read as sparse discrete circles, not washes;
   the pale hole was too large and empty; on mobile the trails broke
   into dashes. Fix: particles 460 to 700, radii 5-20 to 9-26 px,
   alpha 0.020-0.045 to 0.030-0.055, trail 12 samples at 0.7 s to
   20 samples at 0.35 s (7 s window), drift amplitudes reduced so
   trail samples overlap into continuous wash, hole radius 0.14 to
   0.10 of frame size with fade to 1.4x, node link alpha 0.10 to 0.13.
   Re-rendered all three sizes and re-ran the probe; all checks pass.
   Second build is the shipped staging.

## Deviations from the prompt

None material. Two faithful interpretations worth noting:

- The prompt's "slow noise vector field" is realized as a closed-form
  sinusoidal field with a per-epoch direction, rather than a literal
  Perlin field, because a Perlin field integrated per frame cannot be
  re-rendered byte-identically; the closed-form field keeps the same
  slow advective look while satisfying the determinism requirement.
- The prompt's "thousands of overlapping circles" is realized as
  700 particles x 20 trail samples = 14,000 circles per frame.
