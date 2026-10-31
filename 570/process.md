# No.570 — Soy Otra

EXPANSION #69 power-paola, prompt PP2 ("Cada Vez Que Me Dibujo"). Title from the prompt's title suggestion.

## Concept

An ADENTRO-mode self-portrait that mutates. An elongated nude figure sits knees-up, arms wrapped around her legs, head turned up — the pose conceals, exactly like hers, no sexualization. Above her head a hand-drawn bubble carries her sentence verbatim: "CADA VEZ QUE ME DIBUJO SOY OTRA." Every tap redraws the self: a new variant of the same pose, sketched on stroke by stroke, never the same face twice in a row. Dragging on the hair grows it, and grown-out hair changes style. She signs it the way the prompt fixes it: "powerpaola 2026", lower left.

## Construction

Single self-contained `index.html`, canvas 2D only, no external assets, no audio, no microphone. Design space 1080×1080 on a square stage; sizing from the Visual Viewport API with resize listeners on both visualViewport and window; the canvas is pinned in px inside `draw()` every frame. Phone detection via `window.screen` (min dimension < 700px), aspect fallback only; the centered figure keeps its shape on phones and the page ground is the paper colour.

Palette strict: ink #141414 on paper #FAF6EA; tattoos only in faded blue-black #2A3A4A. Flat line work, no fills on the figure, no gradients.

The figure is parametric. Pose is fixed (head, shoulders, elbows outside the knees, wrists clasped in front of the shins, two round knees, shins, feet); every stroke is a sampled polyline (bezier/arc samplers) with a tiny seeded hand-wobble per stroke index, so the drawing is identical frame to frame. The sketch-on transition spends 0.85s of progress across the ordered item list by stroke length: hair behind, legs, torso, tattoos, arms, head, hair in front, face, adornments.

Variant parameter space (drawn from a mulberry32 stream, fixed seed 570069, so the whole sequence of selves is deterministic):

- hair: 5 styles — long, bob, bun, curls, crop — plus a length 0.35–1.0
- gaze: up, left, right, closed
- mouth: small smile, flat, small open
- septum ring: present in ~45% of selves
- flower earring: none / left / right
- watch: none / left wrist / right wrist
- forearm tattoo: left / right / both, motif from a set of 6 (star, crescent moon, flower, heart, snake, eye); the second arm takes a different motif
- chest tattoo: present in ~85% of selves, same 6-motif set

"Never the same face twice in a row" is enforced on the face signature (hair style + gaze + mouth + septum + earring): the generator redraws until the signature differs from the previous self.

Interaction: TAP (short, low-movement press anywhere) = a new self, sketched on. DRAG starting on the hair grows it live; at full growth the style advances (long → bob → bun → curls → crop) and growth restarts. Dragging up shortens, floored at 0.25. A drag never triggers the tap redraw (movement threshold). Hint is one small lowercase "tap", bottom right.

Determinism: frame one is drawn synchronously at load with the sketch already complete (`sketchStart` in the past), at the constant phase PHASE0 = 1.7; the rAF loop (typeof-guarded, absent in the QA renderer) is anchored as PHASE0 + elapsed since load. No `Date.now()` anywhere. First variant dealt by the seed: curls, gaze left, small smile, septum ring, left flower earring, flower tattoo on the left forearm, crescent-moon chest tattoo.

## QA log

Renderer: `node ~/workspace/tools/render-piece.js` (node-canvas, no rAF).

- qa-desktop.png (1280×900): bubble verbatim across two lines, curly-haired first self centered with negative space around her, knees up, arms around the legs, clasped hands, crescent chest tattoo clear of the knee line, flower forearm tattoo, septum ring, flower earring, signature lower left, "tap" lower right. Nothing clipped.
- qa-mobile.png (390×844): phone path taken, stage spans the full width, whole figure and bubble inside, nothing clipped.
- thumb.png (720×720): rendered twice and `cmp` byte-compared — identical; second render deleted.
- Interaction harness (throwaway, fake rAF pumped by hand, shim listeners): frame one from the harness is byte-identical to thumb.png; a tap produces a visibly different second self (long hair, flower chest tattoo, tattoos on both forearms) and a third (bob, flat mouth, snake chest tattoo); a mid-sketch frame ~0.15s after the tap shows the new self half-drawn (hair and legs in, face not yet), confirming the stroke-by-stroke transition; a downward drag on the hair grew the bob out and cycled it to the bun style without triggering a redraw.
- Grep checks: no `Date.now`, no `document.createElement`, no gradients, no URLs, no audio/mic calls.

Fixes during QA: the first body geometry crowded the legs into a narrow column and one knee arc swept under its centre, crossing the torso; knees were re-spaced and lowered, the bad arc re-angled over the top, feet redrawn as separate mounds with soles, and the chest tattoo shrunk and lifted so it clears the knee line. Pupils were first swallowed by the eyelid stroke; they were lowered 5 units and enlarged so the gaze reads.

## Deviations

- The signature reads "powerpaola 2026" verbatim from the prompt (the prompt's composition note fixes the year as 2026, her in-world present).
- Tattoo motifs are a fixed set of six small designs rather than free invention per self, so the redraw stays deterministic and in her small-tattoo register; positions vary by variant (forearm side, chest presence) as the prompt's "different tattoo positions" requires.
- Hair drag grows on vertical drag only (down = longer, up = shorter); on reaching full length it changes style, per the brief's "grows/changes".
