# №1134 — Samaras

Jussi Ängeslevä study block JA7 (Samaras, Guangzhou Terminal 3 kinetic
sculpture). Built 2026-11-01. Build + QA only; not pushed.

## The piece

A high dark space (`#07090D`) hung with 30 samara flying-seeds (24 on
phones), each on its own faint winch line from a bronze drive beam
along the top. Every seed is a curved wood blade (`#C8A87A`, shaded
through brass `#8A6A3A`) with a brass spine and a dark bronze seed pod
at the pivot. The seeds autorotate on their own axes like helicopter
seeds (period 6–10 s, direction seeded per seed), drift slowly down
individual lanes over 44–74 s, and are winched smoothly back up over
4 s in an endless cycle — the winch is an eased interpolation, never a
teleport, and spin eases off while a seed is being hauled. Warm top
light (`#FFE3B3`) catches each wing as it turns broadside; hubs along
the beam flash an occasional gear glint (`#E8C876`). The lower third
is deep shadow (`#1A1208`): descending seeds dim into it, "land", and
rise again.

## Adaptation choices

- **Physics exception, as specced.** The piece runs a fixed-timestep
  simulation (DT = 1/120) in the rAF loop from a seeded deterministic
  initial state. Vertical cycle position is a closed-form function of
  sim time (descent + eased winch); the rotation angle and the stir
  state (drift spring, spin boost) are integrated at the fixed step.
  Frame one is the seeded state after a fixed 90 s pre-roll, so the
  seeds hang at varied heights and spin phases from the first frame.
- **The spin is a projection, not a texture.** Each blade is drawn
  root-to-tip each frame: horizontal extent follows cos(rot), apparent
  blade thickness follows |sin(rot)| — edge-on it collapses to a
  sliver, broadside it opens to full pale wood — and the fill mixes
  brass → wood → top-light by the same broadside factor, so the warm
  catch sweeps each wing once per revolution.
- **Lanes rarely overlap** because lane x-positions are a shuffled
  stratification (one seed per slot, jittered inside it), not pure
  random placement. Draw order is far-to-near by seeded depth.
- **No gradients anywhere.** The top light is six flat alpha strips;
  the shadow floor is sixteen overlapping bands with a quadratic
  alpha ramp before the seeds, plus nine dimming strips drawn over
  the seeds in the lower third — no hard floor edge. Every ellipse
  and arc is drawn on its own path (node-canvas renders batched
  ellipse subpaths as connected polygons — house lesson from №1120).
- **Palette is closed** to the seven specced colors; all shading is
  done by mixing between them and by alpha.
- **Determinism.** Seeded mulberry32 only; no `Math.random`, no
  `Date` in the drawing path (event timestamps are used only for
  double-tap detection). The synchronous first frame is drawn at
  load; the rAF loop is typeof-guarded and continues from the
  pre-rolled state.
- **House rules throughout:** Visual Viewport sizing with resize
  listeners on both visualViewport and window, canvas CSS size pinned
  in fit(), phone detection via `window.screen` min dimension
  < 700 px (aspect fallback), DPR capped at 2. No `ctx.filter`, no
  shadowBlur, no offscreen canvas, no `createElement`, no audio, no
  microphone. The only text is the `<title>`.

## Interaction

Drag stirs the air: seeds near the pointer gain angular velocity
(sign from the drag's tangential direction) plus a radial drift,
answered in the sim by damped springs (stiffness 3.2, damping 2.4,
spin boost decaying at 1.1/s), so the field settles back to its lanes
in a few seconds. A tap gives the same stir at rest strength.
Double-tap reseeds wing shapes, lanes and phases (new seed, fresh
pre-roll). Nothing ever reloads. Silent by design.

## QA

Rendered with `~/workspace/tools/render-piece.js` (node-canvas):

- `qa-desktop.png` 1280×800 — dark high space; 30 seeds at many
  heights and spin phases; broadside wings pale with warm catches
  (top-left, center), edge-on wings as thin slivers; lines to hubs on
  the top beam; soft shadow floor below, lowest seeds dimmed into it.
  One tuning round during QA: the first pass read as bare spines and
  knobs — blade half-thickness raised (0.15–0.22 → 0.24–0.34 of wing
  length), the edge-on thickness floor raised, the wood mix and warm
  catch strengthened, pods shrunk slightly, and the floor's hard
  base-rect edge replaced with the banded ramp.
- `qa-mobile.png` 390×844 — 24 seeds, same composition held in
  portrait; bright catches legible, shadow floor soft.
- `thumb.png` 720×720 — rendered twice and `cmp`-compared:
  **byte-identical**; the duplicate was deleted.
