# №1887 Water Particles (MG8, PP1134, study #246 maddalena-ghezzi)

## What it is
A dark river of particles flows across the frame in four language-colors:
slate blue, olive green, terracotta and steel grey on deep river black.
Each particle keeps its own color and follows the one ahead in its lane,
like water particles following each other, forming braided currents that
split around a crumbling rock slightly right of center and rejoin
downstream. Each color leaves a faint pale gold harmonic trail, and pale
gold glints shimmer off the current. The flow never stops and never
repeats exactly. Watch only.

## Prompt (TASKS.md, PP1134, verbatim in substance)
"A dark river of particles flows across the frame. The particles carry
four language-colors: slate blue (English), olive green (Italian),
terracotta (Ladino), steel grey (German). They do not mix into brown:
each keeps its color and follows the one ahead like water particles
following each other, forming braided currents that split around a
crumbling rock formation at the center and rejoin downstream. Overtones
shimmer off the current: each color leaves a faint harmonic trail. The
flow never stops and never repeats exactly. Palette: slate blue, olive
green, terracotta, steel grey on deep river black; harmonic trails in
pale gold. Composition: the current fills the frame horizontally; the
crumbling rock sits slightly right of center; the split and rejoin are
the composition's event. Motion-interaction: WATCH ONLY. The piece is a
river; damming it would be a different piece. The viewer watches the
four languages flow as one water. Never click-to-reload. Technical
approach: 2D canvas with WebAudio. A flow-field particle system with
four color cohorts; each particle steers toward the particle ahead in
its lane (follow-the-leader flocking), keeping color separation. The
central obstacle is a crumbling formation (eroding polygon) that splits
the field. Sound: four vocal-like formant drones, one per language
cohort, their mix following each cohort's visible mass. What to avoid:
no flag colors, no translated subtitles, no language labels on screen,
no world-music montage cliche; the languages must be colors and
currents, not captions. Reference: Dolomite sung in English, Italian,
Ladino and German; Betty Accorsi: 'the voices of Ghezzi and Goller
have different overtones depending on the language that the song is in,
and they follow each other like water particles'; Foxy Digitalis: 'a
backward-facing river cuts through a crumbling landscape in search of
an epicenter'."

## Mechanism
- Particles: 240 total, 60 per cohort, held close to six horizontal
  lanes (lane jitter plus or minus 0.02, spring back to the home lane
  at 0.22) so the colors braid instead of scattering or banding.
- Flow field: downstream drift plus a slow meander (sine terms under
  0.15 rad/s) and a lane spring. Around the rock, an elliptical
  deflection pushes particles out along the ellipse normal, stronger
  the deeper inside the zone, and a hard core-exclusion keeps them out
  of the rock itself, so the stream visibly parts and rejoins.
- Follow-the-leader: within each cohort, particles are sorted by x and
  each steers slightly toward the particle ahead of it (the next one
  downstream), so each color travels as a following chain.
- Trails: each particle keeps its last 12 positions, drawn as a short
  pale gold polyline (alpha 0.20). The trail is cleared on wrap-around
  and on the rock-core push, so no trail ever spans the frame or
  crosses the rock.
- Ribbons: one faint smooth wave per cohort (alpha 0.05), deflected
  around the rock with a push that falls smoothly to zero at the edge
  of the deflection zone, so the currents bend without hard corners.
- Rock: a jagged 13-point polygon from mulberry32(1887), dark stone
  #20242A with a #3E444D edge, two subtle darker facets, five crack
  segments across the upper face, and twelve small fragments breaking
  off the downstream face only, drifting slowly right.
- Glints: 26 pale gold points riding the current, pulsing slowly
  (0.35 rad/s, under 1 Hz) between alpha 0.10 and 0.32.
- Colors never mix: particle heads are drawn as solid dots in their
  cohort color with normal compositing, no additive blending, so the
  four colors stay distinct and never muddy into brown.

## Palette (hand-picked; the study file studies/maddalena-ghezzi.md does
not exist in the repo, so these hexes are chosen from the prompt's
named colors)
- Slate blue #4A6B8A, olive green #6B7A3A, terracotta #C06B4A,
  steel grey #8A8F94
- Deep river black #0A0C0E (ground), pale gold trails #D9C08A
- Rock: #20242A fill, #3E444D edge, #14171A facets and cracks
- Plates: #101315 ground, gold rule, #EDE6D2 title ink, #D9C08A hint ink

## Interaction
Watch only. Never click-to-reload; taps elsewhere do nothing and the
river is never dammed. A visible "Sound: off / on" plate sits bottom
right; tapping it toggles sound. Default silent. Real WebAudio is
created lazily inside that first tap gesture only, never on load,
never autoplay.

## Sound (closed-form model)
Four formant-like drones, one per cohort: sawtooth oscillators at
110.0, 130.81, 98.0 and 123.47 Hz through bandpass filters at three
times the fundamental (Q 2.5). Each drone's gain follows its cohort's
slowly varying visible mass (a sine of phase time, offset per cohort),
from 0.018 to 0.040 when sound is on, silent otherwise.

## Frame one (determinism)
Fixed phase t = 40 s, warmed by 360 fixed simulation steps (dt 0.05)
from mulberry32(1887) initial conditions, so the split around the rock
is already formed and the braids are mid-flow. Rock polygon, cracks,
crumbs, glints and all particle seeds are pure functions of
mulberry32(1887). No Date, no wall clock, no Math.random in frame one.
Thumb renders are byte-identical across independent runs (md5 verified).

## House rules
Visual Viewport sizing with resize on visualViewport and window; canvas
pinned in draw() via canvas.style.width/height in px; phone detection
via window.screen (min dimension under 700 px) with aspect h > w*1.15
fallback; the river is full-bleed on phones and a centered square on
desktop (page ground is the same river black); one synchronous frame
at load; requestAnimationFrame guarded by a typeof check;
prefers-reduced-motion respected (static frame one, no loop); all
motion well under 14 Hz; moveTo before every batched arc; fading
alphas rounded to 4 decimals before stringifying. No em dashes in
visible copy. No language labels anywhere on screen.

## Gallery
- Date: 2007 · 03 · 13 (formula 2002-01-10 + (N+1) days)
- Note: "Four language-colors flow as one dark river, parting around a crumbling rock and rejoining downstream, each leaving a faint gold trail. Watch the currents flow."

## Deviations from the prompt
None of substance. The rock sits slightly right of center (0.58, 0.50)
as the prompt's composition asks, rather than dead center. The hint
line on screen is shortened to "Watch the currents flow." so it fits
beside the sound plate on phones; the full wording lives in the
gallery note above. The study file was absent, so palette hexes were
hand-picked and are recorded above.

## QA
Rendered the actual script with node render-piece.js at 1280x900
desktop, 390x844 mobile and 720x720 thumb; all three inspected
visually. Fix rounds: (1) a string alpha crashed the first render,
fixed by passing the number; (2) the ribbon detour around the rock
drew blocky right angles, the rock read as a light crystal shard,
crumbs sat on its face like bubbles, particles scattered like a
starfield, and the mobile hint plate collided with the sound plate, so
the ribbon deflection was made smooth, the rock was darkened and
jagged, crumbs were moved downstream and shrunk, particles were
tightened to their lanes, and the hint was shortened, then all three
sizes were re-rendered and re-inspected; (3) gold trails drew as long
horizontal lines spanning the frame because a wrapping particle's
trail still connected its old and new positions, so trails are now
cleared on wrap and on the rock-core push, then all three sizes were
re-rendered and re-inspected and are clean. Thumb re-rendered
independently and confirmed byte-identical (md5
61abf75574566546075828ebb42ebb07).
