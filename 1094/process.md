# №1094 — Three Lit Drones

Marco Tempest study block MT7 (PP255): the BGT mind-read as a lighting trick.
Fifteen skeletal drones hover in a loose ring around a tiny central figure on a
fog-dark stage. A thin arc dial across the top sweeps 1–6; when it lands, the
drones turn to face the figure and exactly N of them fade up red and sink
slightly. The machines "read the mind"; the lighting does the reveal.

## Palette (as specced)

- Stage `#0B0C10`; drones unlit `#1A1A1E` with a `#3A3A40` skeletal outline so
  the frames stay legible in the dark; lit drones `#FF2A1E`; fog `#2A2D33`;
  figure `#0E0E10`; dial `#3A3A40`, marker/needle `#E8E8E6`.
- The only text anywhere is the dial numerals 1–6 (the observed artifact) and
  the `<title>`.

## Cycle (45 s, closed-form in t)

- 0–6 s: the needle sweeps from 1 and lands on the cycle's number.
- 6–10 s: pan — every drone rotates from its tangent heading to face the figure.
- 10–11 s: reveal — the chosen N fade red over a full second (smoothstep,
  never a flash or strobe) and descend: +8% size, a small downward shift.
- 11–16 s: hold.
- 16–18 s: red fades out; the other drones' dim light returns.
- 40–45 s: needle eases back to 1 for the next sweep.

The number per cycle comes from a seeded sequence (mulberry32 keyed by cycle
index); cycle 0 is 3 — the title's number. The revealed set is a seeded
Fisher–Yates shuffle keyed by cycle, first N taken. Each drone's ring angle,
radius jitter, hover-bob frequency/phase are seeded constants; positions are
pure functions of t. Fog is three horizontal bands of layered flat-alpha
ellipses (peak ≈ 0.3) drifting on slow sines. No gradients, no offscreen
canvas, no `ctx.filter`, no shadowBlur, no audio.

## Interaction

Drag horizontally: the needle follows the number under your pointer (position
across the dial span maps to 1–6). On release the choice is recorded as a
single event `{cycle, num}`; from the *next* cycle onward the dial sweeps to
your number and exactly that many drones light. State remains a closed-form
function of t plus that one event.

## Determinism / house rules

- First frame is drawn synchronously at fixed phase t = 13 s — mid-hold:
  needle resting on 3, exactly 3 drones lit red and descended, the other 12
  dark, fog bands in place. The rAF loop (typeof-guarded) is anchored at that
  phase plus elapsed time; `thumb.png` rendered twice and `cmp`-verified
  byte-identical.
- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; `canvas.style.width/height` pinned in draw.
- Phone detection via `window.screen` min dimension < 700 with the
  `h > w * 1.15` aspect fallback; the ring, dial and figure keep their
  composition on a 390-wide phone (drone size steps up slightly).

## QA

- `qa-desktop.png` (1280×800), `qa-mobile.png` (390×844), `thumb.png`
  (720×720) all rendered from the live script with the house renderer.
- Frame-one read (desktop and thumb agree): fog-dark stage, soft fog bands,
  shallow dial arc across the top with numerals 1–6 and the white needle
  resting on 3; 15 skeletal drones in a ring around the tiny figure; exactly
  3 glowing red (left upper, left lower, right lower), each slightly larger
  and lower than the dark twelve.
