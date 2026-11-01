# No.922: Zippo Season

Study #113 miriam_quick, PP83 "Hold the Line" (Miriam Quick, 2024): the 2023
Canadian wildfire season as a field of fire glyphs. Not a map of Canada: the
season band is the map. Two causes, two glyphs, two timbres, nothing else.

## Concept

A horizontal band runs the full width at mid-height: April to November, 240
days, months lettered beneath. Every one of the season's 6,600 fires is one
tiny mark on the band. Human-caused fires are small sharp orange flame glyphs
(the Zippo lighter ting); natural fires are low brown ember dashes (the wood
crackle). A soft amber glow pools where marks cluster. The season burns left
to right at 2.5 seconds per day on a seamless 600 second loop; marks fade to
ash in the last seconds and re-ignite. The legend sits top-left, legend-first
in the Quick manner: glyph samples with their sound names, the compression
"1 day = 2.5 seconds", and the arson ledger, "your fires", which counts every
fire the visitor strikes.

Tap strikes a match: a Zippo spark ignites a small cluster of human flame
glyphs that settles into the band for the rest of the pass, and the count in
the legend grows. Drag is wind: the glow stretches downwind and fresh flares
lean. Double-tap pauses the burn on that day and shows its fire count as one
large number. Sound starts on the first gesture: human fires ting (a 2200 Hz
sine, 80 ms decay), natural fires crackle (bandpassed noise), scheduled from
the playhead's crossings so the rhythm is the data.

## Construction

Single self-contained index.html, canvas 2D, no external assets. Canvas size
comes from the Visual Viewport API with resize listeners on both
visualViewport and window; canvas.style.width/height are pinned in px inside
draw() every frame. Phone detection uses window.screen (min dimension < 700)
with aspect h > w * 1.15 as fallback only. Palette is exactly the brief's six
values: ground #0A0605, flame #FF7A1A, ember #8A5A33, glow #FFB347 (always at
low alpha), season line #2A1D12, caption #9B8B7A. No gradients, no shadowBlur,
no ctx.filter, no offscreen canvas. rAF is typeof-guarded; the AudioContext
is created lazily inside the first pointerdown and typeof-guarded.

Dataset (synthesized, seeded; mulberry32, seed 9226600):

- Daily weight = (0.35 + 2.8 * gauss(day 105, sigma 38) + 0.9 * gauss(day 150,
  sigma 16) + 0.5 * gauss(day 62, sigma 20)) * (0.75 + 0.5 * rng): a low April
  base, a broad July peak, a mid-August front bump, a June shoulder.
- Weights are normalised to 6,600, floored, and the remainder distributed by
  largest fractional part, so the season sums to exactly 6,600 fires.
- Per fire, drawn from the same seeded stream in day order: within-day offset
  (rng), vertical band jitter (mean of three rng draws mapped to -1..1),
  cause human with p = 0.40.
- Verified statistics: 6,600 fires total; 2,612 human (39.6 percent); peak day
  102 (mid-July) with 79 fires; day 0 has 6 fires, day 239 has 7; 500 fires
  fall in days 0 to 49, the span already ignited in frame one.

Ignition model: a fire's ignition moment in loop seconds is its float day
times 2.5. Loop position is a closed-form function of piece time plus the
recorded pause intervals (double-tap pauses are subtracted, so the season
resumes exactly where it froze). Frame one is the synchronous draw at t = 0
with the playhead pre-advanced 125 loop seconds, i.e. day 50; no Date.now
anywhere. A fire younger than 0.9 loop seconds is a flare (glow halo, larger
glyph, lean from the current wind); older fires are settled glyphs, batched
by cause into two single-path fills per frame. Density glow pools are drawn
per day as flat alpha ellipses scaled by that day's share of the peak count.
The final 6 seconds of the loop fade all marks to ash.

Interaction state is recorded events only. Raw tap candidates are classified
purely from the list: two candidates within 0.35 s and close together become
a pause (double-tap); a lone candidate matures 0.35 s after the tap into a
strike. Strike clusters hold 6 to 10 flame glyphs whose layout is seeded per
strike ordinal, so the arson count and the cluster shapes are reproducible
from the event list; clusters persist until the loop wraps past their
ignition point. Drag records pointer velocity into a wind vector that decays
as exp(-dt / 1.8) after release; it stretches glow pools downwind and leans
fresh flares. Audio scheduling runs outside draw(), walking the events whose
ignition moments the playhead crossed since the previous frame.

Deviations and notes:

- The legend uses the brief's sanctioned short labels, "human · ting" and
  "natural · crackle", rather than the longer "human: the Zippo ting"
  wording, so the legend stays legible at phone width.
- Strike clusters ignite on the band at the tap's x position (glyph vertical
  placement is band-relative), because the discipline of the piece is that
  marks live on the band; a tap far from the band still lands its cluster on
  the band beneath the tap.
- Ignition audio is thinned to at most about ten scheduled sounds per frame
  crossing, sampled evenly through dense stretches, with extra crackle
  bursts on very dense crossings; on the 79-fire peak day this reads as a
  crackle bed instead of 79 discrete clicks. Crackle playback rate and buffer
  offset use Math.random: sound only, never drawn state.
- Glow pools are gated to days with at least 6 fires; in this dataset every
  day qualifies, so pools run season-wide with alpha and radius scaled by
  density.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). The
  piece renders cleanly in silence; no AudioContext exists in the harness.
- Determinism: thumb.png rendered twice and cmp byte-compared identical.
  Frame one is draw(0): playhead at day 50, 500 fires ignited, arson 0.
- Desktop readback: smoke-black field, band at mid-height with its first
  fifth covered in orange flame teardrops and brown ember dashes, amber glow
  pooled along the ignited stretch with a brighter burning front at the
  playhead, months APR to NOV beneath, four-line legend top-left.
- Mobile readback: band spans the full width, legend and all eight month
  labels legible at 390 wide, nothing clipped.
- One fix round: the first build's fresh-ignition flare halos (radius up to
  3.2 flame heights at alpha 0.30) merged at the frame-one front into a
  single amber disc. Halo radius cut to 1.1 to 2.0 flame heights and alpha to
  0.20, after which the front reads as a burning edge of individual flares.
  All renders redone and the byte-compare rerun after the fix.
- Dataset verified by replaying the generator with the same seed and RNG
  consumption order: total exactly 6,600, human share 39.6 percent, peak day
  in July.
