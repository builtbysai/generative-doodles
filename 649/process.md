# Apacheta — №649

EXPANSION #79 francisco-gazitua, prompt block 1 "Apacheta". A living trail cairn on a bare dark ridge: stones fall one by one, settle, and stack; the topmost stone turns condor-gold; grown too tall, the cairn topples into a base ring and begins again.

## Concept

The apacheta is a cairn built by many hands over time, one placed stone at a time. The piece keeps that rhythm: an unseen hand drops a stone roughly every four seconds. Each stone is an irregular fractured rock (convex polygon, 6–9 vertices, flat granite fill, one dark fracture facet wedge per stone). The newest stone alone is condor-gold; when the next lands, it reverts to granite. As the stack grows it teeters (a height-scaled sway), and past a height-dependent risk the newest placement destabilizes it: the top stones slide off and settle as a loose base ring around the foot, the survivors' new top turns gold, and stacking resumes from there. Maximum 24 stones in the stack. No text, no buttons.

Interaction: TAP drops the next stone immediately. DRAG while a stone is falling nudges its spin and drift before it lands. No reset control; the topple is the reset.

Palette (strict): ground #0A0A0B, granite #8A8A8C, fracture faces #3A3A3D, topmost stone condor-gold #D9A441.

## Construction

Single self-contained canvas 2D page. Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas style width/height pinned in px inside draw(). Phone detection via window.screen physical size (min dimension < 700 px) with an aspect fallback; the cairn scales and the ridge line sits higher on tall phone frames. All geometry is computed in a unit space scaled by a per-frame unit U derived from the frame's smaller dimension.

Determinism: one mulberry32 seed stream (seed 649079) drives every shape, placement and risk draw. Frame one is the synchronous draw at t = 0 showing a pre-built five-stone cairn at rest, gold on top, ground ring empty; no Date.now() anywhere. The animation clock is anchored at the first rAF timestamp; rAF is typeof-guarded so headless renderers get the static frame one.

Settle / topple model. A fixed-step solver (dt = 1/240 s) advances the simulation to the anchored clock each frame. A spawned stone falls under gravity from a fixed drop height above the current stack top. Contact is resolved against a support query: the highest resting surface under the stone's span (the stack's stones, else the ground line). On contact the stone enters a settle phase (0.45 s): position eases onto the support and its angle eases toward the support tilt plus a small seeded jitter, with one small decaying bounce. Topple is scripted rather than emergent: after each landing, a seeded risk draw (0 below 7 stones, rising to certainty past 16) can trigger it; the top 3–6 stones (bottom two always survive) receive seeded lateral targets on the ground beside the foot and arc out over 1.1–1.8 s, coming to rest tilted as ring stones, excluded from the support query thereafter. Sway is a pure draw-time function of anchored time, amplitude growing with stack height and exactly zero at t = 0. Pointer events are recorded with their anchored timestamps and replayed inside the solver, so a tap or drag has the same effect at any frame rate.

Deviations: (1) The prompt suggests a full impulse physics solver; this piece uses the scripted fixed-step model above instead. It guarantees the hard requirements a free solver cannot: stones always end at rest, nothing interpenetrates wildly or falls forever, and the whole history is deterministic from the seed plus recorded events. The visible grammar (drop, tilt to rest, settle bounce, teeter, topple to a ring) is unchanged. (2) The gold marking is described in the prompt as the topmost stone glowing; it is rendered as a flat gold fill, since the palette forbids gradients and glow effects.

## QA log

Rendered with tools/render-piece.js (node-canvas) at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png) and 720×720 (thumb.png). Frame one shows the five-stone cairn of fractured gray rocks with the gold top stone on the low horizon line; nothing clipped on mobile. Thumb rendered twice and byte-compared identical (determinism gate passed; second render deleted). A state-forced tall-cairn check via the inert `?seed=tall12` hook (pre-places 12 stones) was rendered to /tmp, read back — a tall, narrowing stack with dark fracture facets and the gold stone on top — and deleted. Grep confirms no Date.now, Math.random, createElement, AudioContext, shadowBlur, gradients, offscreen canvas or external URLs; no em dashes; the only text is the <title>.
