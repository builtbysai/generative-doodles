# №1800 "The Ether Is Full" (SC1, PP1047) - process.md

EXPANSION #236 robin-rimbaud, first piece of the study. Gallery date 2006 · 12 · 16.
Gallery note: "A needle sweeps the band; a rare catch, held, then gone. Drag to tune."

## What it is

A dark radio-spectrum field. A horizontal frequency band runs edge to edge
across the frame: faint phosphor-green and pale-grey ticks along its top and
bottom edges, two thin drifting waveforms, and 420 seeded static specks that
breathe but never move. A tuning needle sweeps the band slowly. When it locks
onto a fragment, the caught signal is drawn large at center in a single warm
amber, held with added weight, then dissolves back into the band. Most of the
time the piece is near-silence.

## Palette

- Ground #080A07 (near-black), band tint #0D120B
- Phosphor green #7FB069, pale grey ticks #9AA29A
- Caught fragments: warm amber #E8A33D, the only warm colour
- Needle and plates: pale #C9D2BC on #10130E

## Needle path

Free sweep is a closed-form slow noise path, three sines at 211 s, 53 s and
17 s periods:

    x(t) = 0.5 + 0.30*sin(2*pi*t/211) + 0.09*sin(2*pi*t/53 + 1.7)
               + 0.04*sin(2*pi*t/17 + 0.6)

At t = 60 s the free path sits at 0.8165, but the needle is locked on catch 2
at frame one, so it reads 0.62. While a catch is active the needle is pinned
at the fragment's band position; otherwise it follows the free path.

## Catch schedule and fragment table

Catch table repeats every 300 s (CYCLE). Eight catches per cycle, built from
seeded tables (mulberry32, seed 1800) with small jitter on all but the pinned
frame-one catch. Types cycle waveform / pattern / glyphs. Envelope is 9 s:
1.5 s draw-in, 5 s weighted hold (halo ramps in over 1.5-3.5 s), 2.5 s
dissolve.

| cycle k | idx | t0 (s) | x | type | seed |
|---------|-----|--------|------|----------|------|
| 0 | 0 | 12 + jitter | 0.31 | waveform | 1901 |
| 0 | 1 | 33 + jitter | 0.52 | pattern | 1908 |
| 0 | 2 | 55 exact | 0.62 | glyphs | 1915 |
| 0 | 3 | 97 + jitter | 0.24 | waveform | 1922 |
| 0 | 4 | 140 + jitter | 0.78 | glyphs | 1929 |
| 0 | 5 | 178 + jitter | 0.44 | pattern | 1936 |
| 0 | 6 | 211 + jitter | 0.68 | waveform | 1943 |
| 0 | 7 | 256 + jitter | 0.36 | glyphs | 1950 |

The table is built for k = -1..2, so catches exist before and after frame
one. Jitter is +/-4 s in time and +/-0.03 in x. Note: the seed column above
is 1800 + idx*7 + (k+1)*101, so the frame-one catch (k = 0, idx 2) has seed
1800 + 14 + 101 = 1915 in the code's numbering; the fragment generator for
that catch is seeded from that value. See the CATCHES build in index.html
for the exact arithmetic.

Frame one catch: k = 0, idx 2, t0 = 55 s, x = 0.62, type glyph burst. At
t = 60 s it is 5.0 s old, mid weighted hold: envelope alpha 1, halo at full
strength. 26 glyphs from an ASCII set (x + * # % = ~ ^ . : ; / | o - & ?),
sizes 10-36 px, scattered over a 0.56 field-width by 0.20 field-height
region at band center.

Fragment generators (all seeded, closed-form of piece time):

- waveform: sum of two sines with seeded frequencies and phases, plus a
  fainter echo line offset down.
- glyphs: 26 seeded glyphs as above.
- pattern slice: 5 x 18 grid of seeded dots and squares between two
  bounding rules, about 62 percent of cells filled.

The halo is three low-alpha concentric ellipse rings (alpha 0.06 / 0.045 /
0.03 at full hold) hugging the fragment's own width and height. No glow,
no bloom, no shadow blur.

## Interaction

Watch-first. Drag tunes the needle: while held, the needle follows the drag
position along the band. While dragging, any catch scheduled within the next
25 s whose band position lies within 0.12 of the drag position fires early,
so the system catches more readily where the viewer tunes. On release the
needle resumes its own slow sweep. A tap without drag does nothing. No
click-to-reload anywhere. No audio; visuals carry the piece alone.

## Frame one (fixed phase t = 60 s)

Needle locked at band position 0.62, mid-sweep. One warm-amber glyph-burst
fragment (seeded as above) mid weighted hold at center, halo at full
strength. Band sparse elsewhere: ticks, two drifting waveforms, thin static.
No pointer input has happened; frame one is pre-drag. All randomness is
seeded mulberry32; no Date.now or Math.random affects frame one. The live
loop starts its wall clock only after the fixed first frame is drawn.

## House rules

- Visual Viewport sizing; resize listened to on visualViewport and window.
- Canvas element pinned in draw() via canvas.style.width/height in px.
- Phone detection via window.screen (min dimension under 700 px) with
  aspect fallback (h > w*1.15).
- Field-like band composition: full-bleed on phones, square on desktop.
  On desktop the band fills the square field edge to edge horizontally.
- One synchronous frame at load; requestAnimationFrame calls guarded by a
  typeof check. Canvas 2D only.
- Title/date/hint plates drawn on canvas, mirrored from live №1799:
  "The Ether Is Full", "2006 · 12 · 16", hint "Drag to tune."
- No em dashes in visible copy. No AI-signature copy.

## Deviations from the prompt

None material. Two clarifications, both inside the spec's own adaptation
flag: the halo is drawn as three low-alpha concentric ellipse rings (the
spec's stated approach), and the drag-catches-more-readily rule is
implemented concretely as early firing of a nearby scheduled catch rather
than inventing new fragments on the fly, so the catch table stays fixed
and frame one stays byte-comparable.

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js:

- Desktop 1280x900: near-black field, square field centered, band edge to
  edge with green/grey ticks, two drifting waveforms, thin static; needle
  locked at 0.62 with triangle marker; amber glyph burst at center with
  faint halo rings; title plate top-left, "Drag to tune." bottom-left.
- Mobile 390x844: band full-bleed, same content, plates legible.
- Thumb 720x720: same composition, legible; used as thumb.png.

Fix rounds: first gate showed the halo rings far too large (radius from
fragment height, spanning most of the frame) and glyphs slightly over the
band edges; fixed by shrinking the halo to hug the fragment (rx 0.58w,
ry 0.68h, alpha 0.06/0.045/0.03) and reducing fragment height to 0.20 of
field height. Re-gated after each edit; final renders inspected and pass.

Determinism check: two desktop renders produce identical md5
(28f9a823baa8e3ec7eb7b5c972893d43). No em dashes in index.html.
