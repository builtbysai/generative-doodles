# No.676 "Neosincretismo"

EXPANSION #82 clemente-mckay, prompt block 4. Build and QA only; not pushed.

## Concept

Clemente McKay's core term, neosincretismo, as a single morphing
profile: the European bell he met in his Italy residency and the
pre-Columbian whistling vessel fused in one clay instrument. One large
profile in burnished clay on a dark ground breathes between the two
heritages on a 44 s loop. It hurries through the pure grammars and
dwells at the ambiguous midpoint, where the form is genuinely neither,
the outline picks up a gold shimmer, and the small caption under the
profile ("campana" / "huaco") fades out completely, because at the
center there is no word for it yet. Interior chamber lines fade in only
as the vessel grammar takes over. A horizontal drag scrubs the morph;
release and the loop resumes from the scrubbed phase.

## Construction

- Matched point sets. Both profiles are authored as right halves of
  sixteen points each in profile space (x 0..1, axis at 0.5; y 0 top,
  1 bottom), running from the top axis point down the right side to
  the bottom axis point. The left half is the exact mirror, so both
  profiles and every interpolated state are bilaterally symmetric by
  construction. Point i of the bell answers point i of the huaco:
  crown knob top to stirrup arch top, knob stem to spout leg, crown
  shoulder to body shoulder, wall to body swell, sound bow to base
  curve, flared lip and mouth underside to the chambered foot.
- Morph. The full contour (30 points) is the point-by-point lerp of
  the two sets at amount m, drawn as one smoothed closed path
  (quadratic curves through segment midpoints), filled with clay and
  stroked once in engobe. A breath scale of 0.35 percent on an 8.5 s
  period is applied about the profile center.
- Dwell easing. Loop phase u in [0,1) becomes a ping-pong triangle
  tri, then m = tri + (0.8 / 2pi) * sin(2pi * tri). The slope of this
  map is 1.8 at the poles and 0.2 at the center, so the piece passes
  the pure bell and the pure huaco relatively quickly and lingers in
  the middle range where the form is unnameable. The map is monotonic,
  so there is no snap or backtracking anywhere in the cycle.
- Stirrup opening. The vessel's arch is a true hole: a seven-point
  arch polygon rides in the same path as the contour and is cut with
  an even-odd fill. Its points interpolate from a hairline sliver at
  the top center (invisible at the bell pole) to the full opening,
  with weight smooth(0.10, 0.70, m). It carries its own thin engobe
  edge at the same weight.
- Chamber lines. Three thin engobe polylines inside the body (whistle
  channel dropping from the spout, a chamber divider, the lower
  chamber arc), authored in the central region both silhouettes
  share, fading in at smooth(0.55, 0.92, m) * 0.75 alpha.
- Gold shimmer. Weight exp(-(m - 0.5)^2 / (2 * 0.13^2)). The contour
  is stroked three extra times in gold: once centered at alpha
  0.20 * w, and twice offset horizontally by plus and minus
  (1.1 + 0.9 * sin(1.4 t)) px * w at alpha 0.26 * w, so the line
  carries a slight sliding double edge only near the midpoint.
- Caption. "campana" at alpha 1 - smooth(0.16, 0.44, m); "huaco" at
  alpha smooth(0.56, 0.84, m). At m = 0.5 both are exactly zero. It is
  the only visible text, per the prompt.
- Drag scrub. Pointerdown records the anchored scrub offset and
  start x; pointermove sets scrub = base + (dx / canvas width) *
  22 s (a full-width drag scrubs a half loop). Pointerup commits the
  offset simply by leaving it in place. The morph is always evaluated
  at elapsed-plus-scrub, a pure function of the anchored clock plus
  the recorded offset. No click-to-reload anywhere.
- Palette, strict: clay #A4552F, engobe line #E4D3B8, ground
  #100D0B, midpoint shimmer #D9A441. Nothing else.
- House rules. Single self-contained index.html, canvas 2D only, no
  external assets, no absolute URLs, no date strings, no em dashes.
  Size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas style pinned in px inside draw();
  phone detection via window.screen (min dimension < 700) with the
  h > w * 1.15 aspect fallback only. rAF is typeof-guarded; the QA
  renderer has no rAF and no AudioContext and the piece still draws.
  No microphone, no audio. No RNG is needed at all: every point is
  authored, nothing is randomized.

## QA log

- Determinism: frame one is the synchronous draw(0) at load, the pure
  bell at m = 0 with scrub 0. It is never derived from Date.now();
  the loop runs on an anchored performance.now() offset. thumb.png
  rendered twice and cmp byte-compared: identical. The second render
  was deleted.
- qa-desktop.png (1280x900): dark ground, one large clay bell with a
  small crown knob, clean swelling sides, a flared mouth with a
  slightly arched underside, a single engobe contour, and the small
  caption "campana" under it at full alpha. Nothing else in the
  frame.
- qa-mobile.png (390x844): the same bell refit to the phone frame,
  centered in the square composition field, caption legible, nothing
  clipped.
- Forced midpoint check (throwaway render at seed=t11, deleted after
  inspection): m = 0.5. A plump neither-form with a flat base, the
  stirrup opening half grown at the top with its engobe edge, a faint
  gold double edge along the contour, chamber lines not yet present,
  and the caption entirely absent. Verified as specified.
- Forced huaco pole check (throwaway render at seed=t22, deleted):
  globular vessel, full stirrup arch cut through at the top, whistle
  channel, chamber divider and lower chamber arc in thin engobe, and
  the caption "huaco" at full alpha.
- Fix round: the first huaco render came to a pointed cusp at the
  base (the lowest authored points were clustered, so the smoothing
  concentrated curvature there). Points 12 to 16 of the vessel half
  were respaced into a flatter, chambered foot; re-rendered and
  re-verified at the pole and the midpoint, and the thumb
  byte-compare was run again after the change: identical.

## Deviations

- The stirrup arch is rendered as an even-odd hole inside the single
  filled contour rather than as part of the outer outline. A stirrup
  spout's opening is enclosed by clay on all sides; tracing it into
  the outer contour would have required a self-touching path and
  broken the one-line read. The silhouette, the fill, and the engobe
  contour remain a single profile; only the opening is cut, and it
  grows out of nothing as the vessel grammar arrives.
- No seeded RNG is used, against the "seeded RNG only if needed"
  allowance: the morph needs no randomness, and authored points keep
  the two heritages exactly matched.
