# No.600 "Cosas de Todos los Días"

EXPANSION #72 clara-lagos, prompt block 8 "Azul de Delantal". Her whole register as a single still life in motion: the objects of her strips on a kitchen table, each wearing exactly one touch of her soft blue. Nothing happens, tenderly, on loop.

## Concept

A kitchen table (a simple ink ellipse top with two legs) on generous paper, holding six objects from Clara Lagos's strips: Noah's two small glasses, Emi's bundle of feathers, a jar of planted seeds with a sprout, the searched-for crayon, a leaf, and a stone. The blue budget is the identity: each object gets exactly one touch of soft blue #3E6FA8 (a glass rim, one feather's tip, the jar's label band, the crayon's wrapper band, the leaf's central vein, one spot on the stone) and no object may lose it. There is no narrative arc; the piece is pure register. The objects drift very slowly and resettle into a new loose constellation every ~20 seconds. Tapping an object letter-reads its vignette caption ("los vasos de Noah", "las plumas de Emi", "las semillas en el frasco", "el crayón buscado", "la hoja", "la piedra"); dragging nudges it, and it stays near where it was left.

## Construction

- Single self-contained canvas piece, 1000x700 stage letterboxed on the paper ground (#FAF7F0); strict three-color palette: ink #1A1A1A, paper #FAF7F0, soft blue #3E6FA8.
- Loose hand line: every outline is built at load from wobbled segments and jittered ellipse point sets (quadratic midpoints and vertices displaced by a mulberry32 stream, fixed seed 600072). No randomness runs during draw(); the wobble is part of each object's fixed geometry, so the line never flickers.
- Constellation system: six layouts are generated at load from the seeded stream. Each layout places the six objects inside the tabletop ellipse (x within ±232 of center, y within ±38, scaled-ellipse separation check of 118 units with deterministic rejection sampling), so objects always belong on the table and never collide. The 20-second cycle holds a settled constellation for 13 s, then eases (smoothstep) into the next over 7 s; the sequence wraps through all six layouts.
- Interaction: pointer drag on an object moves it (clamped to the stage); on release the offset is stored as a persistent nudge added to that object's constellation targets, so it settles near where it was left and rejoins later constellations from there. A tap (short, under 7 units of travel) shows the object's caption beneath it in a hand-style font, fading in, holding, and fading out over ~3.2 s. Tap on empty paper does nothing. Never click-to-reload; no erase.
- House rules: canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas.style.width/height pinned in px inside draw(); phone detection via window.screen (min dimension < 700px) with the h > w*1.15 aspect fallback (the square-ish stage letterboxes on phones, table keeps its place, ground stays paper); a synchronous fully composed first frame at PHASE0 = 0 (constellation 1 settled, no captions); rAF typeof-guarded and anchored as PHASE0 + elapsed-since-load; no Date.now() anywhere; no audio, no microphone.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and cmp byte-compared: identical (second render deleted). Re-verified after the fix round below.
- First render pass: all six objects present, one blue touch each, generous margins, mobile unclipped. Two fixes followed: (1) layout band tightened (y ±52 to ±38, x ±238 to ±232) because tall objects (leaf, crayon) crossed the table's rim line in the wider band; (2) feather bundle respaced (wider fan, narrower plumes) so it reads as feathers rather than a scribble. Re-rendered all sizes and re-inspected: every object now sits on the tabletop; the crayon rests lightly against the stone, which reads as a loose constellation rather than a collision.
- Interaction verified at code level (the QA renderer fires no pointer events): drag/nudge persistence, tap caption timing, and the 20 s constellation cycle are state-driven and deterministic.
- Grep-level checks: zero Date.now, zero document.createElement, zero AudioContext, zero external URLs, zero em dashes in visible copy. Only in-piece text: the six captions and the small "tap · drag" hint.

## Deviations

- None from the prompt block. Construction choices recorded: six seeded constellation layouts (the prompt fixes the ~20 s resettle rhythm, not the count of arrangements); the caption fade runs ~3.2 s end to end (the prompt's "then fades" without a duration); a dragged object's nudge persists across constellations so "settles near where you left it" survives the next rearrangement.
