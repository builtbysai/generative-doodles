# No.535 "Grandfather's Garden"

EXPANSION #64 naida-mazzenga, prompt NM7 ("The Snail Garden"). Watch-only motion loop, no interaction, no hint text.

## Concept

A vegetable garden seen at snail scale, after Naida Mazzenga's "The Snails from My Grandfather's Garden" (Milan Presse, 2025). Giant flat leaves arch overhead like trees, dewdrops hang as white orbs under their rims, and the soil rolls away in brown hills. Five snails, each with a different shell (red striped, blue spotted, red spiral, red-and-blue banded, plain), glide very slowly along leaf-vein and soil paths, laying faint silver trails. A tiny watering can on the far horizon, about 5% of the frame height, gives the scale joke. Everything is flat color from the prompt palette: leaf green #4E9A3D, deep leaf #2E6B34, soil brown #7A5230, shell cream #F5E9C8, accents #C0392B and #2B4FE0, dew white #FFFFFF, trail silver #C0C0C0 at 40% alpha. Slowness is the point: snail periods run 88 to 120 seconds.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets, no audio. Design space 1080 x 1080, centred square stage; canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; `canvas.style.width/height` pinned in px inside `draw()` every frame; phone detection via `window.screen` (min dimension < 700px) with the aspect fallback.
- Leaves are quadratic-bezier spines with a sine-profile blade built from offset samples, so the blade, central vein and side veins all follow the same curve; each leaf sways a fraction of a degree around its base on a 47-second sine.
- Snail position is a pure function of time (sine-driven parameter along a quadratic path), so the silver trail is computed per frame by sampling the same function at earlier times: 20 segments, alpha and width fading with age, never stored pixels. Heading comes from the velocity vector; the body tilt is the velocity angle folded into [-pi/2, pi/2] and the body is mirrored when travelling left.
- Snails are folk-simple: a cream body blob with a thin soil outline, two waving antenna strokes with small knobs, no eyes and no faces. Shell patterns are drawn clipped to the shell circle (stripes, seeded spots, a stroked spiral, concentric bands, one quiet top-rim band for the plain shell).
- Dewdrops hang from whichever leaf-rim point hangs lower at four seeded anchors, with a small pendulum sway. A fifth drop runs an 18-second cycle: it grows at its anchor, detaches, falls with a quadratic ease to the soil, makes a two-arc splash, and regrows.
- Riso grain is a precomputed seeded speck array (mulberry32, fixed seed 535001) drawn directly each frame; the QA renderer has no offscreen canvas, so no pre-rendered grain layer is used.

## Deviations

- Phone fit: the brief allowed the field to go full-bleed on phones, but a cover crop sliced the two left-hand snails in half at 390 wide. The piece uses the centred square on all screens instead; the letterbox ground is the warm sky cream #F5E9C8, so the sky reads as continuing. Recorded here per the house rule that deviations carry reasons.
- The far and near soil hills share the single specced soil brown; an early version parted them with a green meadow band along the near crest, but it read as a stray ribbon across the frame, so it was removed and the hills are separated by the horizon silhouette, stones and grain instead.
- The plain shell's distinguishing mark is a quiet band along the top rim of the shell; a bottom arc tried first read as a smile, which the prompt's no-cute-faces rule rules out.

## QA log

- Renderer: `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp, identical. First frame is the synchronous draw at the constant loop phase PHASE0 = 6.0s, with the snails mid-path and short trail stubs behind them; the rAF loop is typeof-guarded and anchored as PHASE0 + elapsed since first frame. No Date.now anywhere.
- Visual read-back, desktop and thumb: five giant arching leaves with vein lines over rolling brown soil; five distinctly patterned snails on their paths with silver trails at foot level; white dew orbs hanging under three leaf rims; the small green watering can standing on the far crest at the right. Warm, calm, nothing clipped.
- Visual read-back, mobile: whole square visible inside the cream ground, all five snails whole, can and drops legible, nothing clipped.
- Fixes during QA: (1) snail heading math rotated leftward snails by the raw velocity angle and stood one on its head; tilt is now folded to a path slope before dampening. (2) A snail whose velocity angle wrapped past -pi flipped its body above its shell; fixed by the same fold. (3) The unpainted letterbox rendered black in QA stills; the full canvas is now washed cream before the stage transform. (4) The meadow crest band was removed (see Deviations). (5) Phone fit changed from cover to centred square (see Deviations). All renders re-run and the determinism gate re-passed after each fix.
- Hygiene grep: no gradients, no URLs, no Date.now, no createElement, no audio or mic calls in the file.
