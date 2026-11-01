# №1496 "The Table Tap" (claire-atherton CA1, PP743)

A cutting room in flat shapes: a long walnut table across the lower third,
two abstract editor figures seated opposite each other at left and right,
and a single long panel filling the upper portion showing a slow landscape
strip. As the panel plays, both figures' hands hover; at the same instant
both hands tap the table, and the panel cuts to the next scene. The tap is
the cut.

## Palette (CA1 only)

Room cream #e8e0d0; table walnut #6b4a3a; figures' clothes charcoal
#2a2a30 and slate #4a5a7a; panel sky-grey #b8bcc0; tap flash gold
#d9a441. No other color. The prompt carries no skin tone, so each figure's
head disc uses the contrasting clothes tone (slate head on the charcoal
figure, charcoal head on the slate figure) with a cream dot eye — a cream
head would vanish against the cream room ground.

## Composition

Panel inset with generous empty room around it (upper portion); table band
across the lower third; figures seated at left and right with torsos above
the table, arms reaching toward the centre, hand discs hovering above the
table surface. On phones the same centered composition holds with no
clipping (figure unit from min(W, H), panel and table in frame fractions).

## Motion

Watch-first, tap loop. Four landscape scenes with their own lengths —
hills 10 s, lake 14 s, field 9 s, coast 15 s, 48 s total loop. Each scene's
internal motion (drifting sun, ripples, cloud) runs on scene-local time
only, so the loop closes exactly. At each cut both hands dip to the table
in the same frame (one shared tap window, 0.5 s after the boundary) and a
small gold dot flashes under each hand on the table; the cut itself is a
hard cut, never a flash transition, and there is no countdown or visible
timer. Frame one opens on hovering hands, not mid-tap (the tap window
excludes the exact loop start).

Dragging horizontally across the panel holds the current scene longer:
the drag maps pointer x displacement to a hold factor on the invisible
duration meter (rate = clamp(1 - |dx|/300, 0.25, 1)), the hands hover
trembling but do not tap, and releasing lets the next simultaneous tap
arrive. Drag never cuts the scene itself, never moves a figure, never adds
a third editor. Drags starting off the panel are ignored.

## Technical

Scenes as a loop array with a duration meter that fills invisibly; cut
events fire when both hand sprites animate a tap in the same frame; drag
maps pointer x to a hold factor on the meter. Effective (meter) time is
the closed-form integral of the rate over recorded drag segments in
absolute piece time, so a hold delays the next cut and release resumes
from the held position with no jump and no restart.

Fully silent (no AudioContext at all); no offscreen canvas, gradients,
shadowBlur, Path2D, createElement, getUserMedia, or text drawing; no
fading alphas at all (every fill opaque); dots as own-beginPath arcs with
moveTo first (node-canvas quirks). Frame one = draw(0) via boot flag,
clock starts only with the rAF loop (plain function declaration behind a
typeof guard); all decoration from mulberry32 (seed 1496000), never
Math.random (the single "Math.random" token hit is the code comment
stating it is never used). Every animation sine runs on loop-local or
scene-local time, never absolute piece time (the №1482 lesson).

## Verification

Rendered at 1280x900, 390x844, and 720x720 and inspected all three; thumb
byte-identical across repeated renders. Forced-time probe harness
(vm-isolated instance, real node-canvas, piece driven via
window.__piece): t = 0 redraw 0 px; fresh instance t = 0 identical;
t = 48 vs t = 0 = 0 px and t = 96 vs t = 0 = 0 px (loop closes exactly);
scenes cycle 0 → 1 → 2 → 3 at boundaries 10/24/33 s with tap windows true
just after each cut (10.2, 24.2, 33.2) and false otherwise; scene frames
differ by 202,998 / 251,762 / 267,788 px; table-band gold 0 px pre-tap,
216 px during the tap (both hands' dots, one shared window), 0 px
post-tap; panel drag from t = 8 to t = 12 at +300 px holds effective time
at 9.00 (still scene 0) where undragged it would be 12 (scene 1), and
after release effective time resumes to 10.00 at t = 13 with the cut
arriving; figure x positions unchanged by a panel drag (256, 1024);
off-panel drag ignored (holding false, effective time unheld).

## Fix rounds (1, composition)

First renders placed the figures overlapping the panel's lower band and
drew heads and hands in room cream, which vanished against the cream
ground (mobile read as floating dots). Fixed by shrinking the figure unit
(min(W, H) x 0.07), shortening the panel (0.48H) and lowering the table
(0.72H) so heads clear the panel, drawing heads in the contrasting
clothes tone with cream dot eyes, and drawing hand discs in the figure's
own clothes color with the arm at hand height. All renders re-done after
the fix; no clipping at either size.
