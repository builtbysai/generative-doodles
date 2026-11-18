# The Sonic Box, №1874

Study #245 simone-massaron, prompt SM3, PP1121. Date 2007 · 02 · 28.

## Spec

A transparent archtop guitar body, larger than the frame, floats in near-black
darkness. Inside it drift the contents of a preparation kit: two screws, two
clothespins, a rubber mallet head, a folded cloth, a small stone. Six silver
string-lines run the length of the box. Wood grain is drawn on the inner
walls, visible through a glass top with a faint diagonal sheen. The two
f-holes are dark windows into the drift.

## Palette

Amber wood (#b57a35 rim, #c98f4a purfling), dark hollow-body brown (#2a1a0e
to #160c05 inner walls), object greys and brass (#a8a8a0, #c49a4a, #6e6a62),
string silver (#c9c9c4, brightening to #f0e8d8 while vibrating), near-black
ground (#0c0908).

## Motion and interaction

DRAG EARNED. Pointer and touch drag orbits the listening point around the
box: the viewpoint angle crossfades and shifts three depth layers (grain
back, strings and objects mid, rim and glass front) and pans and filters the
audio field. The objects drift on their own by summed-sine Brownian motion;
you move the ear, not the objects. When a drifting object touches a
string-line, the line vibrates and a Karplus-Strong pluck sounds, with
timbre set by the object type (stone bright and high, mallet low and
muted, cloth softest). An orbit dial at bottom right shows where the ear
stands. Never click-to-reload. Audio starts only inside the first drag
gesture, never on load; the piece is visual-only until then.

## Determinism

Fixed-phase first frame at FRAME_T = 5.0 s. All motion is a pure function
of time from mulberry32 seeded with 1874; no Date.now or Math.random
anywhere. The stone rests on string 3 at frame one, so one string is
mid-vibration in the first frame. Reduced motion freezes drift at the
fixed first frame; drag still orbits.

## Deviations

None from the prompt. The three rendered depth layers are shifted in
parallax rather than crossfaded in opacity, because the layers share the
body outline and opacity fades would wash out the rim; the orbit still
reads as a moving viewpoint through the layer shifts plus the audio pan
and filter.

## QA

Rendered the actual script with node render-piece.js at 1280x900,
390x844, and 720x720 and inspected all three. Fix rounds: first pass the
body was oversized and the objects were zero size (sizes computed before
layout); second pass the body was resized, objects enlarged and brightened,
and the warm halo behind each object was toned down. Final renders: the
body reads as a resonant wooden room on all sizes, all seven objects and
six strings are visible, the stone sits on a string, and the title, date,
and hint plates are legible and unclipped on desktop, phone, and thumb.
