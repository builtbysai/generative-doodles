# №1794 "Architecture and Incident" (LE3, PP1041): process notes

## Build
- Spec: BATCH-1791-1795-SPEC.md, №1794 section. Template: live №1790/index.html, fetched fresh via gh_api.py.
- Title: Architecture and Incident. Date: 2006 · 12 · 10. Gallery note: "An empty hall, visited by a crow, a door, a patch of sun. Watch only."
- Palette: concrete grey walls (#b7bcc0 left, #a9aeb4 right, #c6c9cc ceiling, #9aa0a6 floor, #8f959b back wall), bone grout (#d8d2c2), shadow blue baseboards and frames (#5f7086). Warm tones only on incidents: sun patch core #f2cf8a / wash #e8b96a, door amber #e8a83c, crow black #14161a with green sheen #2e5d4a, figure #3a3f46.
- Composition: static symmetrical hall in flat perspective, vanishing point at field centre x and 0.40 field height. Two shut doorways on the left wall, one animated doorway on the right wall, one high window on the right wall, a narrow shut doorway centred on the back wall, a ledge on the left wall between the two doors, bone floor grout converging on the vanishing point, ceiling beams, shadow blue baseboards, seeded wall speckle (90 dots, mulberry32 seed 1794).

## Incidents and schedule
- Master cycle 600 s for the three timed incidents, so at most the sun plus one other is ever active. Sun runs its own 240 s crawl.
- Sunlight patch: u = 0.05 + 0.75 * ((t mod 240) / 240) along the left wall, v about 0.35. Drawn as three layered translucent warm parallelograms (soft edge by scaling about the centroid) plus a warm wash ellipse on the floor below.
- Crow: window [100, 140] in the 600 s cycle. Enters from the left edge (100-112, arced flight, flapping wing), perches on the ledge at wall u 0.42 with a small head bob (112-128), flies out to the right edge (128-140). Black silhouette with green sheen arc, bone eye.
- Door: window [220, 245]. Opens 220-228 (smoothstep), holds to 237, closes 237-245. Panel hinged at wall u 0.58 foreshortens as it opens; an amber slit of light grows at the free edge plus a warm spill quad on the floor.
- Figure: window [380, 415]. Walks left to right across the floor at y 0.88 field height, legs and arms swinging on a fixed stride phase, contact shadow underfoot.
- Interaction: watch-only. No pointer handlers, no click-to-reload.

## Frame one (t = 60 s)
- Sun patch at u 0.2375, partway across the left wall, falling across the first doorway, with its warm wash on the floor below. Crow, door and figure all inactive: the hall is otherwise empty. Verified in the renders.

## Determinism
- Fixed phase t = 60 s. All incident states are closed-form functions of piece time on the fixed seeded table; no Date.now() or Math.random() anywhere. Seeded RNG (mulberry32, seed 1794) only. requestAnimationFrame guarded with a typeof check. Canvas 2D only.

## Deviation from the spec
- The spec's technical approach says the hall is rendered once to an offscreen canvas and blitted. The node-canvas QA harness exposes only document.getElementById (no document.createElement), so an offscreen canvas cannot be created in the gate environment. Instead the hall is drawn directly each frame by drawHall(), a pure function of the field rect, so the output is identical every frame and frame one stays byte-comparable. The hall is never animated or redrawn differently; only the incident layer changes over time.

## Fixes during QA
- Fixed a wallPoint bug caught before first render: the bottom-edge x interpolation used the wrong endpoints (now lerp of front and back x at the same u).
- Shortened the ledge from u 0.30-0.82 to u 0.30-0.52 and moved the crow perch from u 0.55 to u 0.42, so the ledge no longer crosses a doorway.
- Fixed a crash found by the incident probe: drawDoor passed a toFixed string into rgba(), which calls a.toFixed(4) itself. Now passes plain numbers.

## QA
- node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three renders read and inspected.
- Desktop: square hall centred on a concrete grey ground, symmetrical corridor to the vanishing point, sun patch partway across the left wall with floor wash, plates legible ("Architecture and Incident", "2006 · 12 · 10", "Watch only.").
- Mobile: full-bleed hall, same composition, plates legible, no clipping.
- Thumb (720x720): same as desktop, clean.
- Incident probe (drawAt via window.__probe): t=106 crow mid-flight entering from the left; t=120 crow perched on the ledge; t=232 door fully open with amber slit and floor spill; t=397 figure mid-walk across the floor. All four states render correctly and match their schedule values.
- No em dashes in visible copy. No AI-signature copy.
