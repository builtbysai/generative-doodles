# No.977 "The Erased Crossing"

Study #120 daito-manabe, PP138 (Terminal Slam, diminished reality).

## Concept

A night crossing seen from above-ish, wide. Pedestrian silhouettes walk the zebra. The system watches: when a walker enters the scan zone it is detected, traced by a flickering mint segmentation outline, dissolved, and inpainted with the machine's best guess at what was behind it: wavy wood-grain striations in amber and teal with dark topographic contour lines. The striated ghosts keep walking their routes, so the crowd is still there, only as hallucination. At the centre stands one real figure in a warm coat who breathes, occasionally adjusts their glasses, and is never erased. The exception proves the system. The tone is infrastructural, not sinister: the machine is just doing its job.

## Construction

- Single self-contained `index.html`, canvas 2D only. The scene is simulated in a 720 x 720 design stage, letterboxed and centred on non-square viewports; the page ground is the asphalt tone so the margins read as more street.
- Sim: fixed timestep 120 Hz, mulberry32 seeded. Frame one is the synchronous draw after exactly 3600 pre-roll steps (30 s of crossing). No wall clock reaches any drawn state; interaction events are consumed in sim time.
- Fourteen walkers on straight seeded routes: two flows along the zebra direction and two crossing it, both ways. Speeds 17-27 stage px/s. A walker is a capsule figure (head circle + stadium body) 26-40 px tall.
- Lifecycle: solid -> detected (0.8 s, flickering mint outline built from per-step hash jitter) -> dissolve (0.35 s, silhouette fades while the striated fill grows upward inside the shape) -> ghost (walks on, fades at the frame edge) -> respawn as a new solid on a generic seeded route.
- Erasure model: detection triggers while a solid walker is inside the scan band (stage y 200-290; the visible scan line is drawn at its centre, y 245), after a per-walker seeded delay of 0.3-3.5 s from band entry. An exemption (tap) suppresses detection; if the delay expires during an exemption, the walker is taken as soon as the exemption lapses, or on its next pass if it has left the band.
- Striations are per-walker seeded data: a set of sine-warped horizontal lines (alternating amber #D9A441 and teal #2E7D7B, every fourth line a dark contour #3A3D46), drawn clipped to the figure path so the pattern travels with the ghost. Dragging through a ghost adds a smear vector to its line field, which bends the waves and relaxes exponentially over about five seconds.
- The real figure stands at stage (360, 392): coat body #8A5A3A, skin head #E8C39E, a 4.5 s breathing scale, and a glasses-adjust loop every 20 s (arm tick rises for 0.5 s, glasses bar flashes, settles by 1.2 s). It has no outline, no lifecycle, no exceptions.
- The first cast is scripted: initial states, positions, spawn times and detection delays are set so that at the 30 s frame-one mark the crossing holds nine striated ghosts, four solid silhouettes, and one hero walker mid-dissolve (band entry at 27.8 s, detection at 29.0 s, dissolve running 29.8-30.15 s, so frame one catches it at p = 0.57 with its outline still flickering). Every respawn after that is generic.
- Interaction: tap a solid/detected/dissolving walker to spare it for 30 s (a tiny mint tick appears above its head; if tapped mid-erasure the system releases it back to solid). Drag through ghosts to smear their inpaint. Double-tap reseeds the crossing (with a 7.5 s pre-roll so the new crossing starts populated).
- Sound, only after the first pointer gesture and all lazy/typeof-guarded: a low traffic hum plus a high wet hiss (looped noise through low/high-pass filters), a soft scan tick on detection, a band-swept noise burst on dissolve, and a quiet two-thump heartbeat every 1.15 s under everything, belonging to the real figure. The QA renders are silent.
- Palette is strict: asphalt #0B0D12, zebra #C9CFDB at 0.5, neon #FF4FD8 / #4FD6FF / #FFC44F, silhouettes #05060A, mask #7DF9C6, fill amber #D9A441 and teal #2E7D7B, contours #3A3D46, coat #8A5A3A, skin #E8C39E. No text anywhere except the `<title>`.

## QA log

- Rendered with the house node-canvas renderer at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). Renders are clean and silent.
- Determinism: thumb.png rendered twice and compared with `cmp`: byte-identical. The duplicate was deleted.
- Fix round 1: the first body-stadium path used wrong arc sweeps and drew as a small squiggle; the capsule is now built from proper top and bottom semicircles. The zebra also covered the whole frame as a barcode; stripes are now clipped to a diagonal crossing band (half-width 205 stage px along the crossing direction) with a faint wash inside the band.
- Read-back, desktop and thumb: dark asphalt, diagonal pale zebra band, neon smears (magenta, cyan, amber) along the top edge with no letters, nine amber/teal striated ghost capsules walking, four black silhouettes with a faint rim, one figure at upper centre ringed by the flickering mint outline with striations growing through it (the engineered mid-dissolve), and the warm-coated real figure solid at centre with its skin-tone head. Mobile: the square stage centres in the tall frame, all figures legible, nothing clipped.

## Deviations

- Detection uses a scan band with a seeded per-walker delay rather than firing exactly on an infinitesimal line. Reason: along-road lanes graze the zone diagonally, and a band plus delay staggers erasures the way the reference footage staggers them; the drawn line still marks where detection lives.
- The mint outline stays visible through the dissolve phase, not only the detection phase. Reason: without it the 0.35 s dissolve reads as a plain fade; with it, the mid-dissolve state the piece is composed around stays legible.
- Silhouettes carry a 1 px rim stroke of zebra tone at 0.14 alpha. Reason: pure #05060A on #0B0D12 is nearly invisible off the zebra; the rim reads as wet edge light and keeps the solid state findable without changing the fill.
- The first cast is scripted rather than purely emergent. Reason: the 30 s pre-roll alone cannot guarantee the composed frame one (ghosts, solids, one mid-dissolve) from random spawns; after the first generation every walker is generic and seeded.
- On phones the composition keeps its square stage (page ground is the asphalt colour, per the dark phone rule) and figures are drawn 1.25x taller so the states stay legible at 390 px wide.
