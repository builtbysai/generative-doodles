# No.818 — The Hidden Singers

EXPANSION #100 rhys-chatham, PP3. Chatham's angel-choir engine: audience
members at Guitar Trio performances kept asking where the singers were
hidden. There were no singers. A single amplified string, driven hard,
produces partials that fuse in the ear into a choir. The piece restages
that question visually and lets the viewer ask it again.

## Concept

One thick low-E string lies across the frame at the lower third on a
near-black ground. Above it, harmonics 2 through 16 rise as vertical sine
arcs, each arc's height set by its amplitude (gain divided by the partial
number raised to 1.55). As the loop's gain climbs, the individual arcs
thicken and their envelopes are summed into a single composite
standing-wave silhouette. Where adjacent partial envelopes reinforce, the
profile swells into rounded lobes; where they cancel, it narrows into
neck-like constrictions. At full gain the profile reads, barely, as a row
of standing presences — a choir that nobody drew. No figure is a sprite,
no face exists anywhere in the piece; every silhouette feature is a
consequence of the sum. Watch-only: the audience question ("where are the
singers?") is the payoff, so there is nothing to touch.

## Construction

- Single self-contained index.html, canvas 2D only. No gradients, no
  shadowBlur, no ctx.filter, no offscreen canvas; depth is built from
  layered flat-alpha fills and strokes only.
- Loop: 36 s, seamless, all closed-form in loop time t.
  - 0–3 s: the strum. Every partial carries a strike excitation
    (0.38 · e^(−t/1.05) times its weight) and the string blooms: three
    stacked strokes (11 px at low alpha, 6 px mid, 3 px near-full) with
    brightness driven by a decaying strum envelope. The master fade
    ramps in over the first 0.45 s so the strike blooms instead of
    popping.
  - 3–12 s: partials rise in sequence. Partial n begins its smoothstep
    rise at 3 + (n−2)·(9/14) s and completes it over 2.5 s, so the
    harmonics arrive from the lowest upward.
  - 12–26 s: gain climb (0.55 → 1.0, smoothstep) while the formation
    factor goes 0 → 1. The individual arcs fade to 28% of their alpha
    and thicken (line width grows with gain), and the composite
    silhouette fades in beneath them.
  - 26–30 s: the choir holds at full gain and full formation.
  - 30–36 s: master fade eases to zero by 35.2 s; the loop restarts
    into the strum.
- Envelope-sum construction: the profile is sampled at 261 points across
  the width. Profile(u) = (Σ_{n=2..16} a_n · |sin(nπu)|) · env(u), where
  env(u) = 0.58 + 0.42·|sin(3πu)| is the third partial's own envelope:
  the summed mass gathers into broad standing presences grouped by a
  partial of the same series, while the sum's own ripples cut the neck
  constrictions between them. Partial weights run 1/n^1.1, flat enough
  that the upper partials contribute real lobes instead of letting the
  second partial draw two domes. Normalisation is a static constant
  computed once at load: the maximum of the full-gain profile over 1201
  samples. Full gain reaches the design height (52% of frame height on
  desktop, 46% on phone). The formed silhouette is then quantised into
  8 figure cells along the width: within each cell the profile is
  multiplied by a raised window, sin(πv)^0.8 over the cell-local
  coordinate v, which falls to zero at the cell boundaries. The mass
  therefore separates into eight distinct standing presences with real
  gaps down to (or near) the string between them, each form narrower
  than tall and gently domed by the window, while every figure's height
  is still authored by the envelope sum sampled inside its cell. The
  windowed profile is filled at three nested depths (1.0, 0.80, 0.60
  scale) in flat ghost-white alpha so each figure carries a denser
  core, with a brighter stroke along the top edge. Nothing horizontal
  is drawn: no strata, no seams. Nothing humanoid is drawn either; the
  figures are the sum, windowed.
  (Three earlier constructions failed the visual gate and were
  replaced: a straight rectified sum at 1/n^1.55 read as two landscape
  domes; a signed phase-shifted sum collapsed into canyons with an
  unanchored right edge; and the envelope-grouped sum filled in
  horizontal band strata read as a stratified mountain range — the
  continuous mass, however lobed, is a landscape until the windowing
  separates it into figures. The failures are recorded here because
  they are how the shipped construction was arrived at.)
- The string is drawn as a shallow sine-displaced path (fundamental
  shape sin(πu), small amplitude tied to the strum envelope plus a
  gentle residual shimmer) so it stays alive without audio.
- Frame one: the synchronous first draw is at fixed loop phase 27 s,
  inside the choir hold, so the standing silhouettes are already formed;
  a just-struck frame would hide the subject. The animation loop anchors
  at that phase (phase = 27 + elapsed, mod 36) and never derives
  anything from Date.now().
- Sizing: canvas from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas.style.width/height pinned in px
  inside draw() every frame; devicePixelRatio capped at 2. Phone
  detection via window.screen (min dimension < 700 px) with the aspect
  fallback h > w·1.15; on phones the string sits slightly higher and the
  silhouette slightly shorter so nothing crowds the edges.

## Palette reading (deviation, with reason)

The prompt lists string #D8D2C0, partials "ghost white #F2EEE2 deepening
to pale gold", background #08080A. The only gold named anywhere in this
study's palette family is #EAC887 (PP2's harmonic rings), which the brief
for this piece explicitly rules off-palette. So the deepening is done by
density instead of hue: layered ghost-white fills at rising alpha make
the choir read warmer and denser as gain climbs, while the colour never
leaves #F2EEE2. Recorded here as the standing reading for this piece.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280×900
  (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png).
- thumb.png rendered twice and byte-compared with cmp: identical
  (determinism gate passed); the duplicate was deleted.
- First read-back failed the visual gate: summing rectified envelopes at
  steep weights produced two symmetric domes (landscape, not singers);
  a signed phase-summed variant collapsed into canyons and left the
  right edge unanchored. Rebuilt as the envelope-grouped sum described
  above with horizontal band strata, and the string given a heavier
  core stroke so it reads as a thick string rather than a hairline.
- Read-backs after the rebuild: see the build report. Desktop and thumb
  show the thick pale string at the lower third with the banded
  silhouette standing above it as a row of lobed presences with neck
  constrictions, no faces, no figures drawn. Mobile keeps the full
  width of string and arcs with nothing clipped.
- Gate-fix round (fly's visual gate): the banded rebuild still failed
  the read — one continuous stratified mass with notches and wide
  humps is a mountain range / mesa landscape, not a choir; the
  horizontal strata and dark seams were the main geology cue. Fix:
  the strata, seams, and clipped-band fills were removed entirely and
  the formed silhouette rebuilt as 8 windowed figure cells (window
  sin(πv)^0.8 per cell, zero at cell boundaries, heights still from
  the envelope sum), filled at three nested depths with the top-edge
  stroke kept. Everything else — loop phases, formation factor, arcs,
  string, palette, frame one at 27 s — is unchanged.
- Read-backs after the gate fix: desktop and thumb show eight separate
  pale standing presences above the thick string, gaps running down
  to the string between them, heights varying with the sum (tallest
  where the third partial's envelope peaks), no faces, no figures
  drawn. Mobile reads the same row taller and narrower, nothing
  clipped. thumb.png re-rendered twice and byte-compared with cmp:
  identical (determinism gate passed again); the duplicate was
  deleted.
- No audio, no microphone, no interaction handlers at all.
