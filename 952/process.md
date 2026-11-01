# No.952 — Nine Fields, Moving

Study #117 reas, PP113 "Software Sketch No. 1 (after Max Bill)". The rule of Bill's *Neun Felder durch Doppelfarben geteilt* (1968) — nine fields, each divided by two colors — reimagined with the motion the original could not have. The arrangement is not Bill's; only the rule is taken.

## Concept

A 3x3 grid of flat color fields on an off-white ground, thin ground-colored gutters between them. Each field is one rectangle split into two hues by a straight dividing line (seeded angle + offset), with Bill's white overdraw line (2px, 0.9 alpha) along the split. Nothing else: no border, no caption, no texture, no gradient.

The piece is a perpetual quiet argument. Every ~8 seconds exactly ONE field "resolves": over 2 seconds its dividing edge sweeps to a new angle/offset and its two hues crossfade to a neighboring pair (each hue steps +/-1 in the cyclic palette order). Its orthogonal neighbors drift sympathetically, shifting 15% toward the resolved field's new hues over the same window. Fields take turns in a seeded rotation, so the argument never repeats and never hurries.

Interactions:
- TAP a field: it resolves immediately; the 8s schedule restarts from there.
- DRAG: the atelier wind — all dividing edges tilt toward the drag direction while pressed, then settle back over ~1.5s.
- DOUBLE-TAP: a new atelier — all nine fields queue a re-resolution, one every ~6s, with the whole palette walk shifted by a seeded jump (+/-2 or +/-3 steps).

Sound (first gesture only, lazy WebAudio): each resolution plays a soft tuned knock, one pitch per field; the sympathetic drift adds a faint string shimmer.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no visible text except `<title>`.
- Closed-form world state. Field states (hue indices, RGB colors, edge angle/offset) are seeded keyframes; resolutions are scheduled events (t = 8, 16, 24, ... plus tap / double-tap events). A field's drawn state is the smoothstep interpolation between its from/to keyframes inside its 2s resolution window; neighbor drift is a parallel 2s interpolation whose end state persists as the neighbor's new settled color. Events are spaced at least 6s apart (longer than the 2s window), so no field ever has two active transitions — one field moves at a time by construction.
- RNG: mulberry32, two streams (initial states; schedule). Initial hue pairs are seeded, distinct within each field; the resolution order is a seeded permutation of 0-8, reshuffled each cycle.
- Geometry: each field's two regions are the rectangle clipped by the dividing half-plane (Sutherland-Hodgman), filled flat; the overdraw segment is the dividing line slab-clipped to the rect.
- Timing: the piece clock starts at T0 = 9.1s, so frame one catches the first scheduled resolution (t=8) at smoothstep(0.55) of its sweep — edge mid-angle, hues half-crossed. Frame one is drawn synchronously at exactly T0; the rAF loop (typeof-guarded) advances from there using elapsed time. Frame one is never derived from Date.now().
- Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height pinned in px on every draw; backing store scaled by devicePixelRatio (capped at 2). Phone detection via window.screen min dimension < 700px, aspect fallback.
- Audio: all AudioContext use is lazy (created on first pointerdown) and typeof-guarded. Visual renders complete in silence.
- Palette (strict): ground #F4F1E8; cobalt #1B4FCE, vermilion #E8431F, ochre #E8A013, viridian #0F7A52, carbon #1A1A1A, cadmium orange #F4641A; white overdraw.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). All render cleanly in silence.
- Determinism: thumb.png rendered twice and `cmp` byte-compared — identical. The duplicate render was deleted.
- Desktop/thumb read-back: clean 3x3 grid, thin off-white gutters, every field split by a straight dividing line with a thin white overdraw. The middle-left field is visibly mid-resolution at frame one: its ochre/viridian pair is half-crossed through olive and its edge sits at an in-between angle; its neighbors show the faint sympathetic drift. All other fields sit at exact palette colors.
- Mobile read-back: the grid fills the tall frame, fields become tall rectangles, splits and overdraw lines intact, nothing clipped.

## Deviations

- Sympathetic drift uses an RGB lerp of 0.15 where the prompt sketches OKLCH: the brief's own house approximation, recorded here. The drift is applied persistently (it becomes the neighbor's settled color), so sympathy accumulates as a slow tint until that field's own resolution crossfades it back to exact palette hues.
- Tap vs double-tap disambiguation imposes the standard up-to-350ms delay on a tap's resolution; a double-tap inside the window cancels the pending tap and starts the atelier queue instead.
- A forced (tapped) resolution commits any still-running transition on the affected fields to its end state before starting; the schedule spacing (>=6s between events, 2s windows) makes this reachable only through rapid manual tapping, never in the autonomous run.
- The prompt's composition is square; the grid fills whatever viewport it is given (fields stretch to rectangles on wide or tall screens), per the house full-frame rule. The 720x720 gallery thumb is square as specced.
