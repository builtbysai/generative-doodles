# No.638 "Refugios Escondidos"

EXPANSION #77 seba-ilabaca, prompt block 6 "Refugios (Hummingbird City)": his Santiago Wild Fest poster concept, the city as cold geometry and the refuges as warm, scarce, hidden life.

## Concept

A dense low-poly night city fills the frame: flat gray building slabs in two depth bands, darker roof lines, water towers and antennae, a few amber lit windows. Tucked into rooftop edges and alley gaps are exactly five refuges, small warm glow pockets with a tiny flower cluster at the core. One hummingbird makes endless rounds between them: a quick green streak in flight, then a hover of a few seconds at each refuge, wings a figure-eight blur, before darting on. The viewer's pleasure is the hunt: pan the city, find a warm pocket, tap it, and the bird breaks its route to come to your find.

## Construction

- Single self-contained canvas 2D piece. Strict six-color palette: city gray #23272E, roof dark #171A1F, window amber #D8A94E, refuge glow #E89B5A, hummingbird green #5EBF8A, wing white #F2EDDA. Tone variation only through alpha of the same hexes.
- City geometry is seeded data (mulberry32), generated per generation into plain arrays and drawn directly every frame; no offscreen canvas. The world is a toroidal block 2 frame-widths wide: a back band (shorter slabs at 50% alpha, sparse windows) and a front band (taller slabs, roof strips, window grids with a low lit probability, water towers on about a fifth of wide roofs, antennae with amber tips on others). All entities are drawn at three wrap shifts so panning is seamless.
- Refuges: exactly five, one per fifth of the block with seeded jitter. Odd refuges nestle at the roof edge of the nearest front building; even ones sit low in the nearest alley gap between buildings. Each is three layered translucent glow discs (no shadowBlur) with a slow breathing scale, plus a five-petal flower cluster with a pale core.
- Itinerary model: a state machine on the anchored elapsed clock. The bird hovers at a refuge for a seeded 3 to 5 s (hover wobble plus a periodic dart toward the flower core), then flies a cubic bezier to the next refuge in a seeded shuffled visiting order that cycles forever. Flight targets are unwrapped near the departure point so the bird always takes the short way across the seam; flight duration scales with distance (0.6 to 2.8 s). Positions are a pure function of segment start, duration and clock, and a sync loop catches up segment transitions deterministically.
- Interaction: drag pans the block (tap versus drag separated by an 8 px threshold). A tap is held briefly to disambiguate: a second tap within 0.36 s is a double-tap and reseeds (new generation, new city, new refuge placements, bird restarts its rounds); a lone tap lands on the nearest refuge within range, flares its glow for about 2 s, and retargets the bird to hover there next, continuing the round from that refuge. Never click-to-reload.
- House rules: Visual Viewport sizing with resize listeners on both visualViewport and window; canvas pinned in CSS pixels inside draw(); phone detection via window.screen minimum dimension under 700 with aspect fallback; rAF typeof-guarded and anchored to elapsed-since-first-frame; frame one is the synchronous draw at t=0.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and cmp byte-compared, identical; second render deleted, and re-verified after the window-density fix below.
- Grep confirms no Date.now, no Math.random, no document.createElement, no AudioContext, no ctx.filter, no shadowBlur, no external URLs, no em dashes.
- Read-back, desktop and thumb: cold gray slab skyline over the dark, sparse amber windows, three of the five refuges visible in the opening window (two rooftop pockets, one alley pocket lower center-right), each a layered warm glow with the flower core readable, and the green hummingbird hovering at the first refuge at left, wing blur and needle beak visible. Mobile: the block refits to the tall frame, bird and pockets legible, nothing clipped.
- One fix round during QA: the first build lit too many windows (about sixty in the opening window), which fought the poster's cold, mostly-dark city. Lit probability cut from 0.07 to 0.045 in the front band and 0.035 to 0.02 in the back band; all renders redone and the byte-compare re-run.

## Deviations

- The opening window shows only the refuges inside the visible half of the 2-wide toroidal block (three of five at frame one); the rest are found by panning. This follows from the prompt's own pan-to-search design, where the block must be wider than the frame.
- The bird is not drawn while it is in the hidden half of the block (its toroidal relative position decides visibility), so a flight crossing the seam exits one edge and re-enters the other, as a wrapped world requires.
- Antenna tips carry a tiny amber beacon dot, using the palette's window amber; it reads as part of the city's sparse lit points, not a new color.
