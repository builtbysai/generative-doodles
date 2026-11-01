# №1188 — Wind Chimes, Prepared Copper

Jeff Kolar study block JK5 (PP347), after Wind Chimes (2016): a
"multichannel, wind powered sound installation composed for prepared
copper chimes and custom electronics", hung from tree limbs on
S. Laflin St, Chicago. The artist never touches the chimes; the wind
performs them. This piece keeps that contract literally.

## The instrument

Nine chimes hang from two sagging limb lines (#1A1C1E) across the top of
a night field (#0D0F12): five in the left cluster, four in the right,
staggered slightly lower. Each chime is a hanger wire, a small striker
disk (#8C5A2B), and one copper tube (#B87333) patched with verdigris
(#43B3AE). Tube lengths decrease across each cluster, longest first.
Nothing else is on stage except the wind itself, drawn as faint
streaks (#2E3436) drifting left to right, and a small caption:
"S. Laflin St — wind performs".

## The weather

One 60-second weather cycle drives everything: 15 s of calm, a front
that ramps in over 3 s, holds for 14 s, releases over 3 s, then 25 s of
calm again (envelope 0.25 in the calms, 1.0 through the front). Each
tube swings as a closed-form two-partial pendulum,

θ(t) = A·sin(2πf₁t + φ) + 0.4·A·sin(2πf₂t + φ′),  A = base × front(t),

with f₁ set by tube length (longer is slower, 0.37–0.54 Hz) and
f₂ ≈ 1.47 f₁. Both partials are quantized to whole cycles per 60 s
(f = k/60, f₂ = round(1.47k)/60), so the swing — and the whole piece —
loops seamlessly with no seam and no drift.

## The collision score

Collisions are not simulated live; they are a score the weather wrote.
At load, the piece samples every tube's swing at 0.02 s steps over the
base cycle (front envelope only) and records an event whenever two
adjacent tubes in a cluster come within touching distance, re-arming
only after they separate again. The precompute finds **30 collision
events in the 60-second cycle** — 24 of them during the front, the rest
scattered through the calms. Each event draws a copper-toned ring
(#FFD9A0, 55% alpha fading in five steps) that expands from the contact
point over 1.4 s to eight tube-widths, and both struck tubes flash to
#FFD9A0 for 0.25 s. All geometry is defined in units of
min(viewport width, height), so the score is identical at every size.

The one interference: dragging makes a local gust. Gusts are recorded
events that add decaying amplitude to the chimes near the drag, so the
tubes visibly lean into weather you made — but honestly stated, gusts
bend the live swing only; the rings still follow the base weather
score, not the gust. The viewer is weather, never the player, and no
chime can be plucked.

## Determinism and house rules

First frame is synchronous at fixed phase T0 = 24 s, mid-front: the
seed (mulberry32, 222920) was tuned so that a collision lands at
t = 23.84 s — frame one opens on tubes 2 and 3 of the left cluster
still flashing from the strike, their ring just expanding, while an
older ring from the pair at the cluster's far end (t = 23.20 s) is
still travelling.
The rAF loop is typeof-guarded and anchored at T0 + elapsed; all
randomness is the one seeded stream. Canvas size comes from the Visual
Viewport API with resize listeners on visualViewport and window; the
CSS size is pinned in fit(). Phone detection via window.screen
(min dimension < 700 px) with the aspect fallback. No gradients, no
ctx.filter, no shadowBlur, no createElement, no ImageData, no
offscreen canvas, no audio, no microphone. Silent — the collisions
are drawn, never heard.
