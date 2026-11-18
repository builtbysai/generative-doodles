# The Music Gets There First, №1882 (MG3, PP1129, study #246 maddalena-ghezzi)

## Spec
TASKS.md prompt block MG3 PP1129: a dark field crossed by faint veils
(translucent grey curtains, structures, grids). The viewer draws
candidate paths with a finger. Each proposed path is judged: accepted
paths bloom into full melodic contours (amber lines that flower into
tone clusters, growing richer the longer they hold), refused paths
crumble to ash and fall. About half the proposals are refused. A small
listening ear, drawn as a concentric ring, pulses at the judging point
before each verdict. The field keeps no score; every new drag is judged
fresh. Motion-interaction: DRAG EARNED. Dragging to propose a path is
the piece. The refusal is the mechanism, not a failure state. Never
click-to-reload; there is no reset, only the next proposal. Technical
approach: 2D canvas. Each stroke is analyzed (curvature, speed,
pressure proxy from velocity); an acceptance function scores it against
a hidden target region that moves slowly over time, so refusal is
principled, not random. Accepted: the stroke becomes a Karplus-Strong
phrase that thickens with harmonics. Refused: granular scatter, the
stroke pixels breaking into falling ash particles. Avoid: no score
counter, no win/lose framing, no tutorial text explaining the
judgement, no way to game the target (it must stay veiled); the refusal
must feel like listening, not like losing.

## Palette
Hand-picked from the prompt's named colors (studies/maddalena-ghezzi.md
does not exist in the muse-soul repo): ground near-black #0E0E10, veil
grey #8A8A92, grid grey #6E6E76, judgement amber #E8A33D, ash pale grey
#C9C9CC, accepted-path gold #E8C878 with deep gold #D9A441, refused-path
char #3A3A3E with deep char #2E2E33, title ink #EDEAE2, hint ink
#C9A86A, plate #0A0A0C.

## Mechanism
Six translucent vertical curtains sway slowly (under 0.1 Hz) over a
faint structure grid. A hidden target point drifts on two slow sines
(0.031 and 0.021 rad/s), never drawn, never revealed. On pointerup a
drag is judged after a 0.7 s listening beat, during which the concentric
ear ring pulses amber at the path midpoint. The acceptance score is
0.55 * proximity of the path midpoint to the hidden target + 0.25 *
smoothness (mean turning angle) + 0.20 * length, accepted at 0.5 or
above; ordinary drags land near the threshold on either side, so about
half are refused. Accepted paths bloom over 2.5 s: the line thickens,
two harmonic echo lines appear offset from it, and five to seven tone
clusters flower along the contour with glowing halos, then the whole
contour holds and fades over the next six seconds. Refused paths break
into segments (about a quarter of segments let go at once) and scatter
into pale ash particles that drift and fall for 2.5 s. Finished paths
are pruned, so the field keeps no history and no score. The ear ring
lingers faintly at the midpoint of a held accepted contour.

## Motion and interaction
Drag to propose a path. The drag draws a thin grey line while in hand;
on release the ear listens, then the verdict lands. There is no reset,
no tap action, and no click-to-reload. Veil sway, ring pulse, bloom,
and ash fall are all slow, under 2 Hz by construction; reduced motion
freezes at the fixed first frame (dragging still draws and judges, one
frame per event).

## Technical approach
2D canvas with WebAudio. Frame one is a fixed phase t = 0 with seed
1882 (mulberry32): veils at rest, one seeded accepted contour mid bloom
(verdict 1.4 s in the past, bloom 56 percent) with its ear ring faintly
visible at the midpoint, and one seeded refused contour mid fall
(verdict 1.1 s in the past) broken into segments with ash already
falling, so the thumb is never an empty field. Audio is lazy, created
only inside the first pointerdown gesture: an accepted path plays a
Karplus-Strong phrase, a noise-seeded plucked-string buffer per tone
cluster, mapped onto a pentatonic scale from the contour height. The
visuals run on the closed-form sound model regardless of audio. Canvas
sizing follows the house rules: Visual Viewport with resize on
visualViewport and window, canvas pinned in draw() via style width and
height in px, phone detection via window.screen (min dimension under
700 px) with aspect fallback, field-like composition full-bleed on
phones and square on desktop, one synchronous frame at load,
requestAnimationFrame guarded by a typeof check.

## Gallery note
"Draw a path through the veils and the music judges it, blooming or
crumbling to ash. Drag to propose a path."

## Deviations from the prompt
One small addition: the listening ear ring lingers faintly at the
midpoint of an accepted contour while it holds, so the judging point
stays readable after the verdict; the prompt only requires the ring
before the verdict. No score counter, no win/lose framing, no tutorial
text, and the target stays veiled, all as specced.

## QA
Rendered the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected. Fix round 1:
the refused segments read too dim, so their alpha went 0.75 to 0.90,
and the frame-one accepted contour gained the faint lingering ear ring
at its midpoint. Re-rendered all three after the fix; desktop, mobile,
and thumb all read correctly. Thumb rendered twice independently:
md5 e46757c2e27afa0558dc32f224ffda08 both times, byte-identical.
Interaction probe (synthetic pointer events against the real script):
a mid-field arc drag changed 2,145 pixels on release and 2,185 more
when the verdict landed, accepted with score 0.576; a far corner drag
was refused with score 0.355 and changed 1,526 pixels at its verdict,
confirming both verdict paths change rendered pixels.
