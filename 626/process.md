# No.626 "Opposites Mix"

EXPANSION #76 soledad-romero, prompt block 2 "Los Opuestos se Mezclan" (OPUESTOS).

## Concept

Her OPUESTOS book as a living field. Two textured force fields share the screen
on paper margins: SILENCE on the left (deep blue, a whale silhouette drifting
slow) and NOISE on the right (hot coral-orange, a parrot silhouette flitting
fast on seeded hops). Between them runs a vertical blend band, about one third
of the width, where the two fields mix and exactly three new hues are born:
violet, ember, dusty rose. The mixture is the subject: inside the band only,
hybrid forms (whale body with parrot beak and tail; parrot body with a whale
fluke) drift and dissolve. Purity at the edges, mixing in the middle.

Interactions: drag horizontally moves the blend band (eased; hybrids
redistribute to wherever the band goes). Tap fires a mixing storm: for about
2.5 seconds the fields churn faster and the band widens to half the width,
then settles back. Never click-to-reload; the fields never collapse.

## Construction

- Single self-contained canvas 2D page. Canvas size from the Visual Viewport
  API with resize listeners on visualViewport and window; canvas pinned in px
  inside draw() every frame. Phone detection via window.screen (min dimension
  under 700px) with aspect fallback; layout is proportional so the band stays
  at one third on phones. Page ground is the paper tone.
- Fields are a mosaic of small cells, never a gradient. Each cell samples two
  precomputed 32x32 seeded value-noise grids (mulberry32, bilinear, wrapping).
  The blue field scrolls slowly down-left; the orange field scrolls faster.
  Outside the band, a cell takes one of three tones of its field color chosen
  by the noise value, with a slow global "breathe" offset on the tone index.
- Mix quantization: inside the band, each cell computes
  v = clamp(posFrac * 0.75 + (meanNoise - 0.5) * 0.7 + 0.125, 0, 1), where
  posFrac is the cell's horizontal position across the band. v is then
  quantized to exactly three mix hues: v < 0.36 violet #7A4E8C,
  0.36 to 0.64 dusty rose #C98A72, above 0.64 ember #C9562E. No other mix
  colors exist anywhere in the piece; the band is drawn as opaque mosaic
  cells over a rose base fill, so the mix reads as woven texture, not a ramp.
- Creatures are flat silhouettes with no faces or eyes. The whale follows a
  slow two-sine figure in the blue field. The parrot follows a precomputed
  seeded sequence of 24 hop targets in the orange field (first target fixed
  upper-right); each hop darts with an ease-out over the first 55% of a 0.9s
  period, then rests.
- Hybrids: three, each with its own period (21 to 34s) and phase offset.
  Alpha is sin(pi * phase)^1.5, so they fade in, drift within the current
  band (x is computed from the live band center and half-width), and dissolve.
  At frame one exactly two are clearly visible; the third sits at phase 0.92,
  nearly dissolved. Hybrids are never drawn outside the band.
- Storm: a timed envelope on the anchored clock (0.35s attack, hold to 1.2s,
  decay to 2.5s) that multiplies both fields' scroll churn and widens the
  band half-width from 1/6 to 1/4 of the field width.
- Determinism: frame one is the synchronous draw(0) at load: band centered,
  storm off, whale and parrot at their phase-0 positions, two hybrids up.
  All motion derives from elapsed time anchored at the first rAF timestamp;
  no Date.now(), no Math.random(). rAF is typeof-guarded so the piece renders
  its first frame in environments without it.

## Deviations

- Tone-family shades: the brief fixes one hex per field (silence blue, noise
  orange), but a textured noise field cannot be built from a single flat hex
  without becoming the flat background the prompt forbids. Each field color
  therefore appears at three strengths (roughly 0.85x, 1.0x, 1.12x of the same
  RGB), and the creature silhouettes use a darker strength of their own
  field's pigment (whale 0.52x blue, parrot 0.60x orange, wing 0.78x). These
  are the same pigments at other strengths; no new hues are introduced. The
  three mix hues and the paper are used at exact specified values only.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- thumb.png rendered twice and byte-compared with cmp: identical.
- Read-backs:
  - qa-desktop.png (1280x900): textured blue mosaic field at left with the
    dark whale silhouette mid-left (fluke and pectoral fin read clearly);
    center band shows the quantized mix as woven vertical zones, violet at
    the band's left, dusty rose through the middle, ember at the right edge;
    two hybrids visible inside the band (violet whale-parrot upper, rose
    parrot-fluke middle) and the third ember hybrid faint and dissolving at
    the band's lower end, per its phase; parrot silhouette upper-right in
    the orange noise field; paper margins on all sides; no text.
  - qa-mobile.png (390x844): same composition refit to the tall frame, band
    still about one third of the width, whale and parrot inside their
    fields, hybrids inside the band, nothing clipped.
  - thumb.png (720x720): same frame-one state as desktop; composition holds
    at square format.
