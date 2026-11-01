# №1215 — "Keep It Away From Everything"

Amy Szczepanski study block AS8 (PP374). Grounded in the Big_Sleep codec joke — a codec
that locks up your file forever — and the line: "the only way to fully prepare our media
for the future is to prepare ourselves for a future apart." The archival paradox: the
only way to preserve the image is to lock it away where no one can see it.

## What happens

A Null_Sets band print hangs at the center of a dark vault (#050508), drawn as a disc.
A seal of three concentric steel rings closes over it across two minutes: the visible
disc shrinks, the rings dim with it, and below 30% aperture the print itself darkens
toward black (brightness ×(0.4 + 0.6·R/(0.3·R0))). When the seal completes, the screen is
pure black for ten seconds and a single small line of text appears at center: "saved." —
the only text in the piece, fading in after one second and out in the last. Then the seal
reopens over twenty seconds and the print returns at full saturation. The cycle is 180
seconds of seal time: close [0,120) → black hold [120,130) → reopen [130,150) → bright
hold [150,180) → the next close.

## The print (computed, never hand-picked)

36 flat horizontal bands clipped to the disc, computed from the bytes of Romeo and
Juliet (the balcony speech, embedded verbatim). Band b takes a 24-byte chunk of the
text: hue = fixed 10-color table at (chunk sum mod 10) — #E5484D, #F76B15, #FFC53D,
#46A758, #12A594, #0090FF, #6E56CF, #D6409F, #FF4D6D, #101010 — and shade from the
chunk's byte-mean mod 3 (flat factors 0.76 / 1.00 / 1.16). No gradients anywhere; every
band is one flat fill.

## Saturation

Before its first sealing the print sits at 88% saturation (each band mixed 12% toward
its own luminance). After the reopen it is drawn at full saturation — the return is
brighter than what was taken away. On later cycles the close begins by dimming back
down to 88% over its first ten seconds.

## The seal

Aperture radius R goes R0 → 0 over the close with a smoothstep ease (slow start, steady
middle, slow final pinch into zero). R0 = 0.34 × min(viewport). Three flat steel rings
ride just outside the aperture (centerlines R+10k, R+26k, R+46k, k a viewport scale):
the inner ring (#6A6A72) carries amber #FFB000 warning ticks, the middle (#55555C)
carries lighter segment arcs, the outer (#43434A) carries steel ticks. The rings creep
in alternating directions at 0.004–0.010 rad/s. There is no lock icon and no padlock —
the rings are the seal. Ring brightness tracks the aperture (0.5 + 0.5·R/R0), so the
room darkens as it closes.

## Negotiation (drag)

The viewer can negotiate with the seal but never stop it. Seal time is an integrated
clock: a walk over recorded drag events. While a drag moves outward from center, seal
time advances at 0.4×; while it moves inward, at 2.2×; the effect lingers 1.5 s after
the last radial movement. The multiplier applies only during the close and reopen
phases — the holds (bright hold, and the black "saved." hold) always run at 1×, so the
absence can be delayed but never skipped, shortened, or escaped. With no input, seal
time is wall time and frame one is exact.

## Determinism and house rules

The first frame is drawn synchronously at a fixed phase, T0 = 55 s of seal time:
mid-close, the disc at ~56% aperture (smoothstep(55/120) ≈ 0.437 closed), three steel
rings around it with amber ticks on the inner ring, vault black beyond, no text.
The rAF loop (typeof-guarded) replays seal time from the recorded event list, so any
session with the same input history shows the same frame. Sizing comes from the Visual
Viewport API with resize listeners on both the viewport and the window; the canvas CSS
size is pinned in draw(). Phone detection via window.screen physical size (min
dimension < 700 px) with aspect fallback (h > w × 1.15), used to tighten the ring scale.
No canvas gradients, no ctx.filter, no shadowBlur, no createElement, no
ImageData/offscreen canvas, no microphone, no sound. Silent.
