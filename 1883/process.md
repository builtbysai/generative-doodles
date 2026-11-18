# The Voice Draws a Path in My Body, №1883 (MG4, PP1130, study #246 maddalena-ghezzi)

## Spec
TASKS.md prompt block MG4 PP1130: a large, soft body-shaped field in warm
blush tones fills the frame, drawn like a contour map. A single ink line
draws itself continuously across it, as if exhaled: it thickens where the
field is warm (chest), thins to a hairline at the edges (limbs), pools into
small ink blots at phrase ends. The line never lifts; it is one unbroken
breath that takes about two minutes to cross the body. When it reaches the
far edge it fades and a new breath begins from the throat point. Palette:
ink black line, paper-white ground, body-field in warm blush and pale rose,
throat point in deep red. Composition: the body field is abstract (a soft
vertical mass, not an anatomy chart); the line is the only figure. Motion
and interaction: WATCH ONLY. Never click-to-reload. Technical approach: 2D
canvas. The body field is a radial warmth map (throat hot, extremities
cool); the line is a flow-field follower whose width and opacity sample the
warmth map. Blots form where the follower dwells past a threshold. A subtle
breath envelope (2-minute period) drives global speed. Sound: a single
sustained vocal-like tone (filtered sawtooth with slow formant drift) that
follows the line's width. Avoid: no anatomical literalism, no face or body
outline, no spectrogram aesthetic, no breath-control gameplay; the line must
feel exhaled, not steered.

Gallery note: "One unbroken ink line, exhaled across a warm body field,
thickening where the field is warm. Watch one breath cross the body."

## Palette
Hand-picked from the prompt's named colors (studies/maddalena-ghezzi.md
does not exist in the muse-soul repo): ground paper white #FAF7F2, ink
#1A1715, pale rose #F3D3C8, blush #EBC0B2, warm blush #E8AFA0, chest glow
#E89B88, throat deep red #8E1F2A, plate white #FFFFFF, title ink #1A1715,
hint ink #6B5A52.

## Motion and interaction
Watch only. Taps anywhere except the sound plate do nothing; the line is
never steered. The sound plate at bottom right toggles a single sustained
vocal-like tone, default silent. The tone is a sawtooth through a 900 Hz
lowpass and a bandpass formant drifting 800 to 1100 Hz over the breath, its
gain following the line's current width, a closed-form function of phase.
Real WebAudio is created only inside the sound-toggle gesture, never
autoplay. One breath lasts 120 seconds: the line starts at the throat
point, drifts downward through a seeded smooth-noise flow field, and is
steered back toward the center near the edge of the mass. Speed follows a
2-minute breath envelope, slow at the start, fullest mid breath. In the
last 5 seconds the line fades and a new breath begins from the throat with
a fresh deterministic seed. Blots pool at phrase ends (t = 24, 48, 72, 96,
120 s) and wherever the follower dwells past the threshold. Reduced motion
freezes at the fixed first frame. All motion is slow by construction, well
under 14 Hz.

## Technical approach
2D canvas. The body field is a bezier soft vertical mass, wider at the
chest, drawn in three layered fills (pale rose, blush, warm blush) with a
radial chest glow, four faint ink contour strokes scaled from the same
path, and a deep red throat point with a soft halo. The warmth map is a
radial function of distance from the throat, cooled toward the mass edges.
Each breath is generated once from a mulberry32 seed (1883 + breath index
times 7919) into a 30 Hz point list; the line is drawn segment by segment
so width (0.0012 to 0.0085 of U) and opacity sample the warmth map at each
point. Frame one uses fixed seed 1883 at fixed phase t = 40 s, breath 0,
so the line is partway across the body with blots already pooled at the
24 s phrase end and at early dwells. On phones the scene unit is
min(1.9 x width, 0.72 x height) so the tall mass reads on a tall screen;
on desktop the field is a centered square and the page ground is the
piece's own paper white.

## Deviations from the prompt
One extension: blots also pool wherever the follower dwells past a
threshold, not only at phrase ends, as the prompt's technical approach
allows ("Blots form where the follower dwells past a threshold"). The
sound toggle is a canvas plate hit-tested on pointerdown, since this is
watch-only and there is no other tap action. No anatomical literalism: the
field is an abstract vertical mass with contour lines, no outline, no face.

## QA
Rendered the actual script with node render-piece.js at 1280x900, 390x844,
and 720x720 and inspected all three. Desktop: blush mass centered in the
square, red throat point, ink line meandering down with visible
thickening at the chest and pooled blots, plates legible, ground clean
outside the square. Mobile: full bleed, mass fills the tall frame, line
and blots legible, plates legible and unclipped. Thumb: clear at small
size. One fix round: the first visual pass showed the phone mass too
small on the tall screen and the warm line too thin, so the phone scene
unit was raised to min(1.9 x width, 0.72 x height) and the warm line width
cap raised from 0.0072 to 0.0085 of U, then all three sizes were re-rendered
and re-inspected. Determinism: thumb re-rendered independently and confirmed
byte-identical (md5 bb4c767439bf60fc10e0caf130b06efb both runs); desktop
re-render also byte-identical (md5 cdbf0b50b48f0960559c0adbe3f73e41).
