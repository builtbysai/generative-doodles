# Two Guitars Facing Each Other, №1879 (SM8, PP1126, study #245 simone-massaron)

## Spec
TASKS.md prompt block SM8 PP1126, verbatim mechanism: near-total
darkness, two faint amber spot pools facing each other across a black
stage, a classical guitar silhouette left and an archtop silhouette
right. Each instrument emits a melodic trail, a thin luminous line that
unspools from the soundhole, drifts across the dark toward the other
player, and is answered: the second line rises to meet it, they tangle
briefly, separate, and dissolve. The dialogue never repeats: phrases
are generated, not looped. Occasionally both fall silent and only the
breathing of the spots remains. No visible musicians, no banter, no
applause, no song structure; a conversation, not a concert. Reference:
simone-massaron study, Kreis, classical guitar and archtop, rigorously
acoustic; study #244 frame f15, Kreis at experimen.tik Berlin 2025,
two guitarists facing each other in the dark.

## Palette
Hand-picked from the prompt's named colors (studies/simone-massaron.md
does not exist in the muse-soul repo): ground black #050505 and #000000,
amber spot #E8A33D, deep amber #B97A1E, pale amber #F2C063, warm white
trail #F5EFE0, pale gold trail #E8C878, guitar body #171208 with bridge
#241A0C, plate #0A0806, title ink #F5EFE0, hint ink #D8B878.

## Motion and interaction
Tap to reseed, earned by the prompt: a tap starts a fresh dialogue
from a new seed, same two voices, new conversation. It never reloads
the page or restarts the app; the stage stays, the players stay, only
the music begins again. Otherwise watch only. Two generative phrase
agents run a call-and-response state machine (statement, answer,
overlap, silence): the schedule alternates voices, overlaps the answer
over the statement about a third of the time, and leaves a silence
about a fifth of the time, when only the spots breathe. Trails are
fading polyline ribbons smoothed through the phrase contour, warm white
for the nylon voice, pale gold for the archtop, with a glowing head at
the newest note. Spot breathing is slow, under 1 Hz. Reduced motion
freezes at the fixed first frame.

## Technical approach
2D canvas with WebAudio. The phrase timeline is a pure function of a
seeded mulberry32 RNG: phrase agent, start, duration, and a 5 to 8 note
contour in [-1, 1]. Frame one uses fixed seed 1879 at fixed phase
t = 9.0 s, mid dialogue, so the thumb is stable; a tap swaps in a fresh
random seed, regenerates the timeline from the current clock, and clears
the gulf. Audio is lazy, created only inside the tap gesture: plucked
string voices, triangle through a 1400 Hz lowpass for nylon (A3 base),
sawtooth through a 3200 Hz lowpass for archtop (G3 base), notes mapped
from the phrase contour. The guitars are drawn silhouettes: classical
with figure-eight body, round soundhole and rosette, short neck and
headstock; archtop with a single rounded body, two f-holes with eyes,
floating bridge, tailpiece, and fret markers. On phones the scene scales
up with the width (scene unit min(1.35 x width, 0.60 x height)) so the
wide stage still reads on a tall screen.

## Deviations from the prompt
None in mechanism. Two presentation notes: the guitars are drawn as
upright silhouettes with no players, since the prompt forbids visible
musicians; the trail ribbons are smoothed curves through the phrase
contour rather than straight segments, so they read as unspooling lines
instead of zigzags.

## QA
Rendered the actual script with node render-piece.js at 1280x900,
390x844, and 720x720 and inspected all three. Desktop: two amber
pools, both guitars legible, smooth trails crossing the gulf with a
glowing head, plates legible, ground clean outside the square. Mobile:
full bleed, guitars and trails read at the larger phone scene scale,
plates legible and unclipped. Thumb: clear at small size. Two fix
rounds: first, a string passed to rgba and an unclamped trail point
count crashed the render (both fixed); second, the first visual pass
showed long thin necks, gold-outlined headstocks from a leaked stroke
style, a seam across the classical waist, and jagged trails, so the
guitars were redrawn with shorter necks, explicit stroke styles, fill
only bouts with a faint outline, and smoothed ribbon trails, and the
phone scene scale was added. Thumb re-rendered independently for the
byte-compare below.
