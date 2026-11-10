# Day Garden (50 of 5000) (No.1679, TH8)

Hobbs's Day Gardens curation ritual, performed live: the algorithm
proposes thousands, taste disposes until one remains.

## Driver

The algorithm proposes thousands, taste disposes until one remains;
the selection sweep IS the piece. A dense grid of tiny seeded
color-geometry studies thins in waves, 50 then 12 then 1. The
survivor blooms from its grid cell to fill the frame, holds in
silence, and the grid returns.

## Mechanism

The thumbnail bank is procedural and seeded: each grid cell is one
study from mulberry32(167900 + idx * 7919), in one of three families:
flat planes (2-3 horizontal or vertical bands), a diagonal split with
an optional thin stripe, or a single horizon line on cream. Palette
is the prompt's soft study palette: warm cream #F0E7D3, muted pink
#D9A8A0, warm gray #B9B0A2, pale amber #E3B34E.

Selection is an artist-tuned scoring function applied live, and the
score is never shown: score = 0.55 * breathing room (cream fraction)
+ 0.30 * simplicity (fewer shapes) + 0.15 * palette harmony (a
pairing table where cream with amber or pink scores highest). Horizon
studies breathe most, so the survivor is the highest-scoring horizon
study; it leads the keep order and every other tile follows by score.
The survivor on desktop is tile 137; it is the same tile every cycle
on the same viewport.

The sweep is spatial as well as ranked: each tile's fade start is a
closed-form function of its horizontal position (a slow left-to-right
pass, marked by a faint white band) plus a seeded jitter, so
rejections arrive in waves rather than one by one. Stage windows:
ranks 50 and up fade during 0-60 s, ranks 12-49 during 60-78 s,
ranks 1-11 during 78-90 s. The survivor blooms by animated
crop-zoom: its rect interpolates from its grid cell to the full
frame with a smoothstep over 15 s, drawing the same study at full
resolution. The hold is the survivor alone on cream with sparse
deterministic paper grain. The grid returns over 5 s: the survivor
dissolves while tiles fade back in, staggered.

## Cycle timing

Total period is 170 seconds, all closed-form functions of piece time.

| Phase | Time | What happens |
| --- | --- | --- |
| Sweep | 0-60 s | Grid thins to 50, in waves |
| Sweep | 60-78 s | 50 thins to 12 |
| Sweep | 78-90 s | 12 thins to 1 |
| Bloom | 90-105 s | Survivor zooms cell to full frame |
| Hold | 105-165 s | Survivor alone, in silence |
| Return | 165-170 s | Grid fades back in |

## Frame one and determinism

Frame one is t = 0: the full dense grid, 247 tiles on desktop
(19 x 13), 72 on mobile (6 x 12), nothing yet refused. All layout,
scoring, and timing come from fixed seeds and closed-form functions
of piece time; there is no unseeded Math.random, no Date, no
performance.now. The live loop only advances a clock from t = 0.
The 720x720 thumb was rendered twice from the script and is
byte-identical both times (md5 861a0dff56a99b168a80d38910a8f28b).

One qualification: tile indices depend on grid dimensions, which
depend on viewport size, so the survivor's index can differ between
a desktop and a phone viewport. On any one device the survivor is
the same tile every cycle, and frame one is byte-reproducible.

## Plates and house rules

Title plate top left: "Day Garden (50 of 5000)", gallery date
2006 · 08 · 17. Hint plate bottom left: "Watch the garden choose."
Page ground is the piece cream (#F0E7D3) with dark ink plates.
Watch-only, no interaction, never click-to-reload. No counters, no
score UI, no ranking display anywhere. Resize is listened to on
visualViewport and window; the canvas element is pinned in draw()
via canvas.style.width and height in pixels. Phone detection uses
window.screen with the aspect fallback. One synchronous frame is
drawn at load and requestAnimationFrame is guarded with a typeof
check, so node-canvas QA works. Flat fills only, no gradients. No
motion above 14 Hz by construction: the only motion is the slow
sweep, bloom, and return.

## QA

Rendered from the actual script with node render-piece.js and
visually inspected at 1280x900 desktop, 390x844 mobile, and 720x720
thumb, plus probe renders at t = 45, 60, 78, 90, 97, 130, 168.
Desktop frame one: dense varied grid, planes, diagonals, and
horizon lines all legible as tiny studies, plates legible, no
clipping. Mobile: grid full-bleed, plates legible. t = 45 shows the
sweep mid-pass, left side thinned to breathers, right side still
dense, no snap. t = 97 shows the survivor mid-bloom, a single
orange horizon line expanding smoothly from its cell. t = 130 shows
the hold: one orange horizon line on cream, paper grain subtle.
t = 168 shows the grid returning with no snap.

Stage counts verified numerically through the probe (alive = alpha
> 0.01): t = 60 gives exactly 50 alive, t = 78 exactly 12, t = 90
exactly 1, t = 130 exactly 1, t = 168 all 247 returning. No fixes
were needed during QA; the first renders were clean.

## Deviations from the prompt

Two small deviations. First, the horizon line is drawn in a deeper
amber (#D98A2B) rather than the pale amber (#E3B34E): at thumbnail
scale the pale amber line vanished against the cream, and the prompt
calls the survivor "a single orange horizon line", so the line keeps
the same palette family but reads as orange. Second, the grid is
full-bleed on desktop as well as on phones: the prompt says "the
grid fills the screen" and the survivor blooms "to full frame", so a
square grid with cream margins on desktop would contradict the
composition; the generic square-on-desktop rule for field-like pieces
is set aside here by the prompt's own composition. The return to the
grid is a 5-second dissolve (165-170 s), which the prompt leaves
unspecified; it keeps the cycle closed-form at 170 s.

## Gallery

Title: Day Garden (50 of 5000). Date: 2006 · 08 · 17. Note ends with
the interaction cue: "Watch the garden choose."
