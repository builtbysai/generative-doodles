# No.635 "All'alba"

EXPANSION #77 seba-ilabaca, prompt block 3 "All'alba (Night Becoming Day)".

## Concept

Sebastián Ilabaca's own first authored book, ALL'ALBA (2026), states its thesis in
one line: a walk where night becomes day and the cocoon becomes a flower. The piece
is that thesis as a fixed-scene loop. One night landscape, framed tight, never
changes its layout: a bare branch entering from the upper left, a cocoon hanging
from it at center frame, a cluster of five flowers lower right, a grass silhouette
along the horizon, stars across the top half. Only the hour changes. Over about
75 seconds the sky lerps from night indigo through pre-dawn violet into a dawn of
rose and gold that rises from the horizon (a gradient, never a sun disc), the
flowers bloom petal by petal, the cocoon splits and a moth emerges, flaps twice,
and settles on the branch; three distant birds cross once at daybreak; then dusk
returns everything to night and the loop begins again, identical.

## Construction

Single self-contained HTML file, canvas 2D, no external assets. Strict palette,
nothing else: night indigo #141B33, pre-dawn violet #3A2E5C, dawn rose #E89B7D,
daybreak gold #E8B93B, cocoon silk #C9B896, moth wing #EDE6D2. Silhouettes
(branch, ground, stems, birds) use the night indigo pigment at darker strengths,
same hue, no new colors.

Everything visible is a pure function of one cycle phase p in [0,1), mapped from
elapsed time on an anchored clock (cycle 75 s). Frame one is the synchronous draw
at phase 0, full night. Placement (120 stars, grass blades, flower variation) is
generated once from mulberry32 with fixed seed 635077, so the composition is
identical every loop.

Sky: a vertical linear gradient whose three stops (top / mid / horizon) are lerped
between phase keyframes: indigo at night, violet creeping in at the horizon for
pre-dawn, violet top / rose mid / gold horizon at dawn and daybreak, back through
violet to indigo. The top stays deep at all hours; the gold lives only in the low
band. The ground band stays a dark indigo silhouette; at dawn its rim warms with
thin gold and rose lines.

Petals unroll, never pop or scale-fade: each petal is a parametric spine of eight
segments. Its bend is a curl parameter c in [0,1]; at c = 0 the spine sweeps back
into a tight upward bud and the petal base angles cluster at vertical, at c = 1
the spine is straight and the base angles fan radially. The outline is built from
the spine plus a sine width profile, so opening reads as an unrolling curl.

Cocoon: two silk shell halves hinged at the top attachment; the open amount
rotates them apart. The moth's emerge amount moves it from the cocoon mouth to a
perch on the branch; during phase 0.585 to 0.65 its wings run two full flaps,
then settle open. On the return leg the moth flies back in and the shell closes.

Interaction: TAP only, and only one kind. A tap forces one immediate dawn: the
phase offset is advanced so the cycle jumps to the start of the dawn window
(phase 0.42) and runs from there at normal speed; after daybreak the loop
continues into dusk and night as usual. Taps during dawn, daybreak or the return
are ignored so a tap never skips the night-to-dawn event it asks for. Never
click-to-reload.

### Phase timeline (cycle 75 s)

| Phase range | Clock | What happens |
| --- | --- | --- |
| 0.00 to 0.30 | 0.0 to 22.5 s | NIGHT: stars full, two fireflies pulse near the ground, buds curled, cocoon closed |
| 0.30 to 0.42 | 22.5 to 31.5 s | PRE-DAWN: sky lerps toward violet at the horizon, stars fade to ~8%, fireflies fade out |
| 0.42 to 0.52 | 31.5 to 39.0 s | DAWN RISES: gradient runs violet to rose to gold at the horizon; flowers begin unrolling at 0.44, staggered per flower |
| 0.50 to 0.60 | 37.5 to 45.0 s | COCOON AND MOTH: shell splits 0.50 to 0.57; moth emerges 0.53 to 0.60 |
| 0.56 to 0.60 | 42.0 to 45.0 s | Last flower finishes unrolling (all five open by 0.60) |
| 0.585 to 0.65 | 43.9 to 48.8 s | MOTH FLAPS: two full wing flaps, then settles open on the branch |
| 0.60 to 0.70 | 45.0 to 52.5 s | DAYBREAK HOLD: full dawn sky, flowers open, three chevron birds cross the sky once |
| 0.70 to 0.86 | 52.5 to 64.5 s | DUSK RETURN: sky falls back through violet; petals re-curl 0.70 to 0.85; moth re-enters 0.74 to 0.80; shell closes 0.80 to 0.86 |
| 0.86 to 1.00 | 64.5 to 75.0 s | NIGHT AGAIN: stars return by 0.92, fireflies return 0.84 to 0.97; seamless into phase 0 |

## QA log

Rendered with node ~/workspace/tools/render-piece.js (node-canvas, no
requestAnimationFrame, so renders show the synchronous first frame, phase 0):

- qa-desktop.png (1280x900): full night. Indigo sky with 120 stars across the top
  half, the bare branch sweeping in from the upper left with two twigs, the closed
  silk cocoon hanging at center frame, grass silhouette along the horizon at the
  lower third, five curled pink buds on stems lower right, two gold fireflies
  glowing faintly near the ground. No text anywhere.
- qa-mobile.png (390x844): same fixed composition refit to the portrait frame,
  branch, cocoon, buds, stars and fireflies all inside the frame, nothing clipped.
- thumb.png (720x720): same night frame at square size.
- Determinism: thumb.png rendered twice and byte-compared with cmp; identical.
  Frame one derives only from the fixed seed and phase 0; the script contains no
  Date.now anywhere (a tap only ever shifts the phase offset after load).
- Dawn verification: a throwaway copy rendered with the piece's ?seed=dawn QA
  hook (phase forced to 0.60 at load) showed the dawn state: violet top, rose mid,
  gold band low on the horizon, all five flowers fully unrolled, the cocoon shell
  split open, and the moth perched on the branch with wings open. The throwaway
  file and render were deleted after the check; production loads carry no query
  string and are unaffected.

## Deviations

- Silhouette tones: the strict six-color palette has no near-black for the
  branch, ground, stems and birds, so those are drawn in the night indigo pigment
  at reduced strengths (0.38 to 0.5). Same hue family, no new colors; this is the
  only way to keep silhouettes readable against the indigo sky.
- The moth settles on the branch beside the cocoon rather than on the cocoon
  itself: the prompt fixes the moth's emergence and settling without naming the
  perch, and the branch keeps the settled moth visible against the sky instead of
  lost against the silk shell.
