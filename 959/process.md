# No.959 — An Empty Room

Study #117 reas, PP120 "An Empty Room, Breathing". The quietest mechanism in the set: a generative space that simply exists.

## Concept

A square of deep dark blue-black void. Centered in it, one large soft rectangle — the room — drawn barely lighter than the void, its edges breathing in and out by ±2% over a 90-second cycle. Inside, exactly 40 dust motes drift at very low alpha, brightening only as they cross an invisible diagonal beam (the beam is never drawn; it exists only in the motes). Every 240 seconds a single "colorform" ghost — a large pale circle, bar, arc, or ring at 0.05 alpha — drifts across the room over 60 seconds and dissolves. Nothing else. No text, no counter, nothing to read: the piece refuses information and rewards the glance that catches the ghost.

Interaction is deliberately minor, a disturbance of a room that mostly ignores you:

- TAP — a breath: the room swells +4% and settles over ~6 s.
- DRAG — stir the dust: motes near the drag path take a decaying swirl offset, resettling over ~30 s.
- DOUBLE-TAP — a new room: reseeded proportions (room rect 62–78% of frame), mote anchors, and ghost vocabulary order.

## Construction

Single self-contained `index.html`, canvas 2D only, no external assets. Everything drawn is a closed-form function of piece time `t` and the recorded event list (breaths, stirs, generation) — no integration, no frame-state. Frame one is the synchronous draw at the fixed offset t = 205 s, chosen so a ghost is ~40% across its crossing (u = 25/60 ≈ 0.417) and the room is mid-breath. `Date.now()` is never used; the rAF loop (typeof-guarded) only advances t from its own first timestamp.

- Room model: per-generation fractions of frame width/height from a mulberry32 stream (width 0.66–0.76, height 0.60–0.74; on phones the width is forced to 0.78). Breathing scale = 1 + 0.02·sin(2πt/90 + phase) + the sum of tap-swell bumps (each +0.04·(1 − age/6)² for age in [0,6)).
- Motes: exactly 40, seeded anchors in room-normalized coordinates. Each position = anchor + two incommensurate sines per axis (amplitudes 0.010–0.048 of room size combined, periods 60–180 s), mapped through the current (breathing) room rect, so the dust breathes with the room. Drag stirs add, per event, a perpendicular swirl offset weighted by a Gaussian of the mote's distance to the drag path points, decaying as exp(−age/9) and expiring at 30 s.
- Beam: a fixed diagonal line through the room center (per-generation angle −38° to −22°). A mote's brightness multiplier is a Gaussian of its perpendicular distance to that line (half-width 8.5% of room width): alpha scales by 0.45 + 1.1·boost and the color lerps up to 80% from mote #C8D2E0 toward beam tint #E8EEF7. Nothing else renders the beam.
- Ghosts: cycle length 240 s; the crossing occupies t mod 240 in [180, 240), so each cycle opens on an empty room. Shape = the generation's seeded permutation of [circle, bar, arc, ring] indexed by cycle; size, vertical offset, and angle come from a per-cycle hash-seeded stream, so any cycle is reproducible. Alpha envelope = 0.05·sin(πu)^0.8; horizontal travel from −0.78 to +0.78 of room width.
- Sound (lazy, typeof-guarded, created only on first pointerdown; the piece renders complete in silence): looped filtered noise as room tone at gain 0.015; a 55 Hz swell voice whose gain tracks the live ghost alpha (max 0.018); near-inaudible high pings (gain 0.006, throttled to one per 2.5 s) when a sampled mote crosses the beam center. No microphone, ever.
- Sizing follows the Visual Viewport API with resize listeners on both visualViewport and window; the canvas CSS size is pinned in px on every draw. Phone detection uses window.screen's physical min dimension (< 700 px) with the tall-aspect rule as fallback only.

Palette is strict: void #07080D, room #0E1119, edges #1A2130, motes #C8D2E0, beam tint #E8EEF7 (only as mote brightening), ghosts #D8DCE4. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas.

## QA log

Rendered with the house node-canvas renderer (one synchronous frame, no rAF, no audio):

- qa-desktop.png (1280×900): void field; the room rectangle centered at ~70% of frame with its #1A2130 edge just legible; 40 faint motes scattered inside; the cycle-0 ghost (an arc, per the generation's vocabulary order) mid-crossing at whisper alpha on the room's left half; one mote near center visibly brighter where it sits in the beam.
- qa-mobile.png (390×844): phone path taken (screen min dimension < 700); room width 78% of frame as specified; motes, edge, and ghost arc all present; nothing clipped.
- thumb.png (720×720): same composition as desktop, square.
- Determinism: thumb.png rendered twice and byte-compared with cmp — identical. The duplicate render was deleted.
- Ghost pixel measurement (thumb.png, sampled with node-canvas): void corner mean luminance 9.33 (exact #07080D); room interior pixel reads exactly (14, 17, 25) = #0E1119. A 48×48 window scan of the room found the brightest window at (378, 234) with mean luminance 24.39 against a room-window median of 18.67 — an elevation of +5.72. Full coverage by the ghost at frame one's alpha (≈0.0486) would give ≈ +9.9, so +5.72 in a 48 px window is consistent with the arc stroke partially covering the window. The ghost is present at exactly the specced whisper level; per the brief it was measured, not thickened.

Deviations: none of substance. Two recorded notes: (1) on narrow phone frames the ghost's travel range is computed from the room width as specified, so a large ghost centered near the room's edge can extend slightly past the room rect onto the void — it still reads as a shape crossing the room, and the desktop/thumb frames keep it fully inside; (2) beam pings check a rotating subset of motes (every 7th) per frame rather than all 40, a perf measure that only affects the (already near-inaudible) ping timing.
