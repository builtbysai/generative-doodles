# Architecture Is the Sounding Body, No.1826

## Prompt source

TASKS.md, ellen-fullman study #239, EF3 / PP1073: the same string installation restaged in three rooms in sequence: a concrete domed rotunda (strings stretched low across the floor, performer dwarfed), a church-like hall with a chandelier (strings hanging vertical from the ceiling, doubled in a mirrored floor), an industrial hall (strings from ceiling trusses, flight cases). Each room visibly changes what the wires do: the rotunda rounds the sound, the church lengthens it, the hall hardens it. Palette: concrete grey, chandelier gold and mirror silver, industrial safety-orange truss accents; the strings always bare steel. Composition: wide establishing shot per room; the instrument small at first, then the camera settles close enough to watch the wires shiver. Interaction: watch-only. Slow crossfade between rooms every 45 seconds, the drone re-voicing itself through each space's reverb. No input. Technical approach: 2D canvas with parallax room drawings plus WebAudio convolver with three distinct impulse characters (rotunda, church, warehouse). Wires drawn per room geometry; shiver amplitude follows the convolver's wet level. What to avoid: no generic reverb preset feel; each room must be visually and sonically distinguishable; no performer close-ups, the room is the performer here.

## Driver

The room is the instrument: three architectures voicing the same strings three different ways.

## Build

- Single self-contained `index.html`: one script block, one synchronous frame at load (t = 60 s, mid-church, fully settled), `requestAnimationFrame` guarded by a `typeof` check.
- Seeded PRNG (mulberry32, seed 1826) places all string layouts; no unseeded `Math.random()` or `Date.now()` affects frame one. Audio impulse generation uses `Math.random()` only, inside the sound path, never in the visual frame.
- Room cycle: 45 s per room in the order rotunda, church, hall, with a 5 s crossfade at each block start. A slow zoom runs from wide to close inside each block (0.88 to 1.0, divided by 0.88 so the room always covers its frame), plus a faint parallax drift between wall and string layers.
- Rotunda: concrete-grey wall gradient, elliptical dome with two inner rings and a bright oculus casting a light shaft, pilaster seams, perspective floor seams fanning from a vanishing point. Fourteen steel strings stretch low across the floor between two anchor rails, slightly sagging. One tiny dark performer stands dwarfed among them.
- Church: warm stone wall, four pointed-arch windows in pale gold, a gold chandelier ring with eight candle dots and a radial glow, a silver mirror floor. Twelve steel strings hang vertical from the ceiling and are doubled in the floor as fainter reflections; a faint gold ellipse mirrors the chandelier.
- Hall: dark walls, safety-orange ceiling trusses with cross bracing, ten steel strings angling down from the trusses to floor anchors and flight-case tops, black flight cases with silver edges and corner protectors stacked at both sides, an orange hazard strip near the front edge.
- Wires shiver: each string is a segmented line whose middle sways with a per-room amplitude and rate that follow the convolver wet level (rotunda 0.7 px at 0.6 Hz, church 1.8 px at 1.1 Hz, hall 1.1 px at 2.6 Hz). Ends stay pinned.
- Sound: optional and off by default. A SOUND OFF/ON pill at top right lazily creates the AudioContext on the first tap only, never autoplay. Three detuned sine drones (55, 82.41, 110 Hz) run through a convolver whose impulse is rebuilt per room: rotunda 1.2 s warm decay, church 3.6 s bright long decay, hall 1.8 s decay with discrete early-reflection taps; wet level follows the same per-room values as the shiver. The visuals carry the piece with sound off.
- Watch-only: no pointer handlers on the canvas at all. Hint reads "WATCH ONLY · ROOMS CHANGE EVERY 45 SECONDS". A room label (I · ROTUNDA / II · CHURCH / III · HALL) sits top left on a dark backing plate, with a thin progress line along the bottom of the frame marking the 45 s block.
- Reduced motion: `prefers-reduced-motion` renders the single static frame at t = 60 and never starts the loop.
- House rules: Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned in `draw()` via `canvas.style.width/height` in px; phone detection via `window.screen` (min dimension under 700px) with aspect fallback; field-like composition is full-bleed on phones and a centered 16:10 frame on a dark ground on desktop; no flicker by construction (shiver rates at most 2.6 Hz); no em dashes in visible copy.
- node-canvas quirks: a `moveTo` precedes every batched arc and ellipse; dots are drawn as single-arc paths with a leading `moveTo`; fading alphas are rounded to 4 decimals before stringifying.

## Gallery

- Title: Architecture Is the Sounding Body
- Date: 2007 · 01 · 11 (formula 2002-01-10 + 1827 days)
- Note: "The same strings voiced by three rooms: rotunda, church, hall. Watch the rooms trade the strings every 45 seconds."

## Acceptance criteria

1. Frame one shows the church fully settled: four gold arch windows, chandelier with glow, twelve vertical strings doubled in the mirror floor, label and progress line legible, nothing clipped.
2. All three rooms are visually distinct at 1280x900, 390x844, and 720x720, with every string anchored to a real surface (rail, ceiling, truss, floor, or case top) and nothing bleeding outside the frame.
3. The piece is watch-only: no click, drag, or tap on the canvas changes anything; sound starts only from the SOUND toggle.
4. First frame is deterministic: seeded PRNG only, fixed phase at t = 60 s.
5. Reduced motion renders a single static frame.
6. No em dashes in visible copy; no AI-signature copy.

## Deviations

Two small ones, both in service of the prompt. The dome is drawn as a wide shallow ellipse rather than a semicircle, because a true semicircle spanning this wide frame would be taller than the room; the oculus still sits at its apex. The sound toggle is a visible pill button rather than a hidden gesture, so the optional drone is discoverable without changing the watch-only canvas.

## QA

- Rendered from the actual script with node-canvas at 1280x900, 390x844, and 720x720; all three inspected.
- Fix round 1: pixel sampling showed the zoom left a dark band inside the frame and the progress bar floated over bare ground, so the zoom is now divided by its widest value (0.88) and the room always covers its rect; the rotunda dome was rebuilt as an ellipse with rings and the oculus moved to its apex; church windows widened on phones.
- Fix round 2: two hall strings ended mid-air at case-top height with no case beneath them, so case-anchored strings now land on the actual two-high case stacks; the room label moved off the truss lines and onto a dark backing plate so it reads over gold windows and orange truss alike.
- After both rounds: desktop, mobile, and thumb all read cleanly; the rotunda and hall were additionally rendered at both sizes from temp copies at t = 10 s and t = 105 s and inspected (temp copies deleted, staged index.html untouched).

## Parent fix round (gate, 2026-11-16)
- The piece shipped with no title/date plate (hint only as a DOM overlay). Added a title and date plate drawn on canvas top-left; on phones the room label shifts down 46 px so the two plates stay clear. Thumb re-rendered from the fixed script and re-gated at desktop, mobile, and thumb sizes.
