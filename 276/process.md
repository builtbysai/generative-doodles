# No.586 — Quero a Minha Mãe

EXPANSION #71 julia-barata, prompt block 2 ("Ocho Cuerpos"). Built 2026-10-31. Build + QA only; not pushed by the builder.

## Concept

Her repeated-figure sequencer, straight from the Gravidez cover: eight nude female figures in a single row on flat saturated red — the same body redrawn eight times, the belly growing left to right, the narrative carried entirely by micro-variation. Above each head, a hand-lettered bubble speaks one word and lets it decay: the full cry "QUERO A MINHA MÃE..." breaks down through fragments ("MÃE...", "M...", "...MÃE?") into silence, then lands whole again as a shout. The first figure holds a pregnancy test and a small "SIM" sign. Below the row, the book's brushy title: GRAVIDEZ. The interaction is the sequence itself: dragging horizontally scrubs the row through its growth states while the bubbles stutter along the decay chain; tapping a figure freezes her mid-stutter and her bubble repeats once, larger. Otherwise the row drifts slowly sideways and back, breathing, never still and never fast.

Bubble assignment (fixed by the brief; seven texts across eight figures):

| Figure | Belly | Bubble |
|---|---|---|
| 1 | 0.05 | "QUERO A MINHA MÃE..." (+ pregnancy test, "SIM" sign) |
| 2 | 0.18 | "MÃE..." |
| 3 | 0.32 | "MÃE...!" |
| 4 | 0.45 | "M..." |
| 5 | 0.58 | "...MÃE?" |
| 6 | 0.72 | "MÃE!..." |
| 7 | 0.86 | (silent — hand resting on belly) |
| 8 | 1.00 | "QUERO A MINHA MÃE!" |

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio, no microphone.
- Palette (strict, three colors only): flat red ground #D42B1E (also the page ground), ink black #1A1A1A, paper white #FAF7F0. The red is never softened; no fourth color anywhere, the hint included (paper at 55% alpha over the red).
- Stage is a 1000x1000 virtual square centered in the viewport, scaled by min(W,H); canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; `canvas.style.width/height` pinned in px inside `draw()` every frame; phone detection via `window.screen` min dimension < 700px with aspect fallback (kept from the house template). On phones the square stage spans the full width and the row shrinks with it — no figure is clipped.
- One parametric body: `drawFigure(cx, feetY, belly, idx, phase)` builds each woman from the belly parameter — belly side-width, hip width, belly-bottom depth, belly arc and navel, head tilt and arm swing are all functions of belly in [0,1]; canonical states are [0.05 … 1.00]. The body is a single filled torso outline (white against the red), two loose leg strokes, two breast arcs in her economy of line, dot eyes, scribble hair. Every figure redraws from its own mulberry32 stream (seed 586100 + idx·131), so the wobble is fixed per figure: the same body, redrawn, never traced and never flickering. Figure 1 additionally holds a small white pregnancy test (two ink marks) and the "SIM" sign; figure 7's right arm bends so the hand rests on the belly.
- Bubbles: wobbly hand-drawn rounded rects (seeded corner jitter) with long tails to the heads, sitting on a shallow arc — middle bubbles ride higher, neighbours staggered ± so the long first bubble and the small second never overlap. The two long cries are set in two lines ("QUERO A MINHA" / "MÃE..." and "MÃE!") at a narrower fit width; all lettering uses seeded per-glyph jitter. Bubble text is data from the fixed chain above; no other text exists in the piece besides GRAVIDEZ, SIM, and the one-word "drag" hint.
- Scrub: pointer drag maps horizontal travel (±420 stage units) to scrub in [-1,1]; while scrubbing, each figure's belly becomes canonical + scrub·0.55 (clamped, with a small high-frequency tremor) and each bubble's text shifts along the decay chain by round(scrub·2.5) steps (a shift that would land a speaking figure on the silent slot keeps her own text). On release the scrub eases back to 0 with an exponential settle anchored to elapsed phase, and the row returns to its canonical states. Tap (short, near-stationary press on a figure): that figure freezes at her scrub-moment belly for 1.6s, her bubble flickers to the neighbouring fragment for the first 0.42s, then swells to 1.38x and settles — the repeat, once, larger.
- Auto-drift: the whole row shifts ±9 stage units on a 9-second sine and each figure bobs ±2.2 units on a 7-second sine with per-figure phase offsets. All motion derives from PHASE0 + elapsed; PHASE0 = 0 and frame one is scrub 0, so the first frame is exactly the canonical cover composition.
- Determinism: frame one is one synchronous fully-composed draw at PHASE0. rAF is `typeof`-guarded and anchored as fixedOffset + elapsed, so the QA renderer (no rAF, no AudioContext, no `document.createElement`) draws frame one and stops. `Date.now` is never called; `performance.now` only measures elapsed time since load for the rAF anchor.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`:
  - `qa-desktop.png` (1280x900): eight white figures on flat red, bellies growing left to right, seven bubbles decaying along the arc with no overlaps, figure 7 silent with hand on belly, figure 1's test and SIM sign in hand, GRAVIDEZ brushy below, "drag" hint bottom right.
  - `qa-mobile.png` (390x844): the square stage spans the full phone width, all eight figures and all bubbles inside the frame, SIM sign fully on stage, title legible.
  - `thumb.png` (720x720): the full sequence reads at gallery size; the decaying bubbles stay legible down the row.
- Fixes during QA: (1) first pass — figure 1's SIM sign board hung off the left stage edge (clipped on mobile); the board was re-angled inward over the body on its stick. (2) First pass — figure 2's bubble overlapped and swallowed the right half of figure 1's long bubble; the long cries now run narrower in two lines and the bubble arc gained an alternating stagger, so no two bubbles touch. (3) Belly growth was strengthened (side-width and bottom-depth ranges widened) so the left-to-right sequence reads at thumbnail size, not just in the belly arcs.
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared — identical; the second render was deleted.
- Grep checks: zero `Date.now`, zero `document.createElement`, zero AudioContext, zero external URLs.

## Deviations

- The brief lists seven bubble texts for eight figures and names figure 7's silence as a construction choice left to the builder ("fig7 (silent, hand on belly)"); implemented exactly that — figure 7 has no bubble and her right hand rests on her belly. No other deviation from the prompt block.
