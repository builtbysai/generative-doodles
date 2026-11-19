# №1903 Slow Sound Exploration

## Driver

Two people in a bright white room trade sounds so slowly that the waiting
itself becomes the subject. A gesture leaves one figure, takes a full minute
to cross the fog between them, and is received and transformed by the other.
Nothing hurries, nothing is won, and the exchange simply continues. The
feeling to hold is unhurried attention: time you can watch pass.

## Mechanism

A 2D canvas, visual only, no WebAudio. The whole state is a pure function
of elapsed time t, so every frame is determined by the clock and nothing
else. The loop runs from a fixed first frame and advances in real time.

## The 60 second transit state machine

Gestures alternate between the two figures on a 120 second cycle. Gesture
k starts at k times 60 seconds. Even k is soft orange and travels left to
right; odd k is muted teal and travels right to left. Progress within a
transit is u equals (t minus start) divided by 60, eased with a smoothstep
so each gesture leaves and arrives gently, and its path rises slightly
mid-crossing. The receiving figure holds the gesture's color as a small
accent at the chest. There is no winner and no end state; the cycle repeats
as long as the piece runs.

## Fog trail fade

Fog is 42 layered translucent blobs drifting at about 0.01 Hz, plus a pale
wash across the floor. Each gesture leaves a trail behind it: a ribbon of
fading dots from the sender's hand to the gesture head, denser and brighter
near the head. Completed crossings leave a full-path trail that fades over
a long 180 second envelope, so up to three past gestures remain faintly
visible in the fog at any time. The fog is the room's memory of the
passage.

## Clock behavior

A wall clock sits centered above the crossing space. Its second hand
advances once per second, quantized to whole seconds with no smooth sweep,
and its minute hand advances once per minute. At the first frame the clock
shows 30 seconds, matching the gesture mid-crossing. The orange second hand
is the only warm mark on the clock face, so the ticking is visible without
breaking the quiet of the room.

## Frame one

FIRST_T is 30 seconds. Frame one shows an orange gesture halfway across
from the left figure, a fading teal trail from the previous crossing behind
it, and the clock at 30 seconds. The loop continues from t equals 30.

## Interaction

Watch only. There are no pointer, touch, or key handlers, no skip button,
no speed control, no progress ring, and no captions narrating the gestures.
Any input that speeds, scrubs, or triggers a gesture would destroy the
premise, so there is none. Reduced motion shows the static first frame.

## Palette

Hand-picked from the named colors in the prompt. Bright white room
#fdfdfb. Fog in translucent pale grey #dfe3e6 with a deeper floor wash
#c9ced2. Gesture shapes in soft orange #e8825a with a lighter core #f2a988,
and muted teal #5f8f8a with a lighter core #8fb3ae. Clock face and title
plate in faint charcoal #3a3d40 with dim grey #7a7f84. Figures in soft grey
#a8adb2 with darker grey #6e7378 heads and arms.

## Composition

A wide field composition, full-bleed on phones and a wide centered stage
on desktop with the page ground set to the piece's own bright white. The
two simple figures stand at the left and right thirds, facing each other,
each drawn as a head, a tapered body column, and one arm reaching toward
the center. The crossing space between them dominates the frame. The clock
hangs centered above it.

## Deviations from the prompt

None. Sound is omitted by design, as specified: a watch-only piece cannot
autoplay audio, and the gestures are visual shapes. The figures are simple
silhouettes, not detailed people, and the room stays bright white with no
added furniture or text beyond the title plate and the hint line.
