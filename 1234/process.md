# №1234 — Mapping the Prairies

Christina Battle study block CB3, after her 2012 *Mapping the Prairies Through Disaster*: sunny photographs of decaying rural buildings, survivor quotes, and the whole thing installed in a room clad in reflective metal sheeting — a reference to dust storms electrifying metal.

## What it is

A wide "photograph" — flat prairie sky, sun, a decaying building centred low over a fenced grass band — is set into a steel-sheeted room. Steel bands border the frame top (~12% of height) and bottom (~16%), with panel seams, rivet rows, and a specular highlight that slides across the metal as if light were circling the room. The five survivor quotes scroll as a single slow line through the lower steel band, never over the building:

- "the wind took the roof before we heard it"
- "we waited in the cellar three hours"
- "the elevator stood. the barn did not"
- "you could see the storm from the porch, coming all afternoon"
- "after, the quiet was the worst part"

## House adaptations (stated per the brief)

1. **Steel without gradients.** The source prompt's brushed-steel gradient tiles are replaced by flat steel bands (#B9C0C7) with hard-edged flat specular polygons: a wide white parallelogram at alpha 0.25 (plus a wider companion band at alpha 0.10) with a fixed lean, sliding on a 60-second orbit. No canvas gradients anywhere in the piece.
2. **Sferics without sound.** The prompt's WebAudio lightning-static crackle ships silent. Lightning is a closed-form visual event only: on a hashed ~47-second schedule a distant flicker lightens the sky one step for 0.4 s and the grain overlay bursts into bright static ticks — the crackle made visible. There are no audio APIs in the file at all.

## Models

- **Building cycle.** Three buildings rotate in 30 s slots over a 90 s cycle — farmhouse, grain elevator, collapsing barn — with a stepped crossfade (8 fps quantised alpha steps) during the last 1.6 s of each slot. Each building is a flat-shape drawing in a unit coordinate system (photo height / 100): the farmhouse has a two-plane sagging roof, porch on posts, one boarded window (crossed planks), one cracked window; the elevator has a headhouse, distributor pipe, annex shed, and a column of windows; the barn leans (top shifted), one roof plane intact and the other caved to a sunken ridge with a dark gap, X-braced door, board lines. Weathering is seeded: rust streak rects bleeding down from roof edges and windows, and siding speckles.
- **Specular orbit.** Centre x = W · (−0.35 + 2.8 · phase) where phase runs over a 60 s cycle, so the band sweeps fully across and off both edges. Vertical drag adds a persistent offset to the centre and to the parallelogram's lean (clamped), shifting the light angle by hand.
- **Quote marquee.** The five quotes are laid out as one looping strip (measured text widths + a fixed gap) scrolling right-to-left at 30 px/s at reference width, offset = (speed · t + scrub) mod strip-length, drawn with wrap copies so the band is never empty. Horizontal drag changes the scrub offset; a double-tap advances a seed that reshuffles the quote order (widths re-measured).
- **Lightning.** Event k starts at k·47 + hash(k)·30 s, lasts 0.4 s with a linear falloff; while active the sky lightens, speckle density roughly triples (black grain at 8% alpha), and a burst of white static ticks crosses the photo — a pure function of t.
- **Grain.** Hashed speckle on a 6 px grid over the photograph, re-seeded at 8 fps steps (floor(t·8)), black at 8% alpha.

## Determinism

The synchronous first frame is drawn at the fixed phase T0 = 17 s: building slot 0 (the farmhouse) fully up, specular centre at ≈ 0.44·W mid-slide across both steel bands, and the first quote — "the wind took the roof before we heard it" — mid-scroll and fully readable in the lower band (its predecessor in the loop, "after, the quiet was the worst part," is also visible at the left on the wrap copy). The rAF loop is typeof-guarded and anchored at T0 + elapsed; all randomness is the seeded sine hash, with per-frame state derived from t plus recorded drag offsets only.

## Interaction

- Horizontal drag — scrubs the quote band (the text follows the finger).
- Vertical drag — shifts the light: specular centre offset and lean.
- Double-tap — reseeds (reshuffles) the quote order.
- Otherwise watch-only: buildings cycle, light orbits, quotes scroll.

Canvas is sized from the Visual Viewport API with resize listeners on both visualViewport and window, its CSS size pinned in px inside draw(); phone detection uses window.screen (min dimension < 700) with an aspect fallback, and quote type is capped by viewport width so the band stays legible on phones.

Silent. No external assets. No gradients, no ctx.filter, no shadowBlur, no offscreen canvas, no ImageData, no unseeded randomness, no audio or microphone APIs.
