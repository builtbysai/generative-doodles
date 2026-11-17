# №1843 Sound-House (PS4, PP1090) process notes

## Build
Cutaway house in elevation, five rooms across, built in Canvas 2D from the
live №1841 template (page structure, plates, Visual Viewport sizing, phone
rules mirrored). Warm plaster walls (#E8D9B8), dark wood beams (#4A3220),
candle-amber light, a dark wood roof with chimney, one candle per room, and a
thin melody thread drifting through staggered doorways. Title, date, and hint
plates are drawn on canvas. No click-to-reload; drag is the only control.

## The five room tunings
Each room is tuned a quarter-tone (50 cents) off its neighbor. Cents are
relative to the hymn tonic A 220 Hz in just intonation; the room frequency is
220 x note ratio x 2^(cents/1200). Flat rooms are tinted cooler (blue-grey
#7FA8C9), sharp rooms warmer (amber #E8A33D); the center room is true.

| Room | Tuning | Cents | Name | Tint | Note A freq |
| --- | --- | --- | --- | --- | --- |
| 1 (left) | two quarter-tones flat | -100 | FLAT | cool blue | 207.65 Hz |
| 2 | one quarter-tone flat | -50 | FLAT | cool blue | 213.74 Hz |
| 3 (center) | in tune | 0 | TRUE | candle amber | 220.00 Hz |
| 4 | one quarter-tone sharp | +50 | SHARP | warm amber | 226.54 Hz |
| 5 (right) | two quarter-tones sharp | +100 | SHARP | warm amber | 233.08 Hz |

Tint strength grows with distance from true (base alpha 0.05 center, 0.10 at
one quarter-tone, 0.16 at two). The room being listened to gets +0.12 tint
alpha, a stronger candle glow, a warm outline, a brass diamond marker on the
roof above it, and the word LISTENING under its floor.

## The hymn
A plain twelve-note stepwise line in just intonation over A 220 Hz, five
seconds per note, one 60 second cycle, repeating. No equal temperament
anywhere; the quarter-tones never resolve back to the grid.

| Step | Note | Ratio | Center-room freq |
| --- | --- | --- | --- |
| 1 | A | 1 | 220.00 Hz |
| 2 | C | 6/5 | 264.00 Hz |
| 3 | D | 4/3 | 293.33 Hz |
| 4 | E | 3/2 | 330.00 Hz |
| 5 | F | 8/5 | 352.00 Hz |
| 6 | E | 3/2 | 330.00 Hz |
| 7 | D | 4/3 | 293.33 Hz |
| 8 | C | 6/5 | 264.00 Hz |
| 9 | A | 1 | 220.00 Hz |
| 10 | B | 9/8 | 247.50 Hz |
| 11 | C | 6/5 | 264.00 Hz |
| 12 | D | 4/3 | 293.33 Hz |

## The melody thread
The thread is a thin line across the house whose height is a closed-form
function of position: sharp rooms lift it, flat rooms let it sag, so it kinks
visibly as it crosses each wall. The bright portion runs from the left edge to
a glowing note head; the rest of the path is drawn faint. The head drifts on
a 240 second sine, s(t) = 0.5 + 0.35 sin(2 pi (t - 60)/240), so it crosses
rooms slowly and never jumps. Note dots mark each room center; the sounding
note name is drawn beside the head.

## Drag to room mapping
Dragging horizontally sets the listening position dragX (0 to 1 across the
house). The current room is floor(dragX x 5), clamped to rooms 1 to 5:

| dragX | Room | Tuning |
| --- | --- | --- |
| 0.00 to 0.20 | 1 | -100c |
| 0.20 to 0.40 | 2 | -50c |
| 0.40 to 0.60 | 3 | 0c |
| 0.60 to 0.80 | 4 | +50c |
| 0.80 to 1.00 | 5 | +100c |

Dragging moves the outline, marker, LISTENING label, tint boost, and candle
glow to the new room, and retunes the hymn voice to that room on the next
note. Pointer and mouse events are both handled; there is no other control.

## Frame one state
Fixed phase t = 60 s, pre-drag, dragX = 0.5, center room 3 (0c, TRUE). The
thread head sits mid center room (s = 0.5) showing note A at 220 Hz in room 3
(step 1 of the hymn cycle: floor(60/5) mod 12 = 0). Candle flames are at
their seeded flicker phases. All positions, tints, and flicker are closed-form
functions of piece time plus drag position; the only randomness is the seeded
mulberry32(1843) generator for plaster speckles and flame phases, fixed at
load. No Date.now or Math.random touches frame one.

## Audio
Visuals carry the piece alone. Real WebAudio starts only inside a drag
gesture (pointerdown or mousedown): a single quiet triangle oscillator plays
the hymn line, retuned to the current room's quarter-tone offset on each
note change. Nothing autoplays, and there is no piano, no cathedral reverb,
and no equal-tempered version of the melody.

## Deviations from the prompt
1. No sound toggle plate. The spec makes drag the only control, so the
   template's sound plate was left out; audio starts on the first drag
   instead of a tap on a plate.
2. The room mix is visual, not a full WebAudio crossfade with
   distance-based lowpassing through walls. The single hymn voice retunes to
   the room being listened to, while tint, glow, outline, and marker follow
   the drag on canvas. The audible result is the same tuning rule; the
   wall-filtering is shown, not sounded.
3. The thread head drifts on a slow 240 second sine rather than stepping
   room by room with each hymn note, so that frame one lands mid center room
   exactly as specified.

## QA
Rendered from the actual script with node ~/workspace/tools/render-piece.js
at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three PNGs
inspected visually.

- First render failed with TypeError: a.toFixed is not a function. Cause: a
  pre-formatted alpha string was passed into rgba(), which formats again.
  Fixed by passing the numeric alpha; re-rendered.
- Second render, all three sizes: clean. Desktop shows the five-room
  cutaway, cool tints left, warm tints right, legible tuning labels clear of
  the windows, shadowed doorways reading as passages, the bright thread
  bending at the walls with its glowing head and note A mid center room, the
  outlined current room with brass roof marker and LISTENING below, five lit
  candles, and clean title, date, and hint plates.
- Mobile (390x844): full-bleed house, all labels, thread, marker, and plates
  legible, nothing clipped or overlapping.
- Thumb (720x720): same composition as desktop, clean.
- Re-gated after the fix round: thumb.png is the final 720x720 render, and
  index.html was not edited after it.

Gallery note: "Drag through the rooms; each one tunes the hymn a quarter-tone off. Drag only."
