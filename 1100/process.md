# №1100 — True/False Machines

Onformative study block OF5 (PP261): the true/false (2017) kinetic light
sculpture as a piece. A dark room, a 4×3 grid of tall columns, each holding a
warm tube behind a shutter. The machine runs its procedures forever: cover,
hold the darkness, expose, hold the brightness — and once per cycle a single
column covers on its own, proving the unison is a choice, not a constraint.

## Construction

- **Columns.** Each column is a dark housing (`#101216`, edge `#4A5058`) with a
  recessed cavity. Inside sits a vertical tube whose core colour mixes from
  covered slate `#2A2E36` to lit `#FFE9C4` with openness, wrapped in layered
  flat-alpha glow rects (no gradients anywhere). A shutter panel rotates about
  the column's vertical centre axis: its apparent width follows cos φ, its face
  shading shifts and darkens as it turns, and a thin edge sliver sells the
  panel's thickness. Two white cue-glint pinpoints sit on each housing's top
  corners. Open columns also spill a faint warm halo into the room.
- **Procedures, closed-form.** Every column's openness is an analytic function
  of t — a short event list evaluated per frame, never integrated. The 40 s
  loop runs two procedures: the first sweeps its expose-wave left→right and its
  cover-wave right→left; the second sweeps top→bottom and bottom→top. Between
  waves the machine holds — five-plus seconds of full dark, then of full
  light. During the first lit hold, column (2,1) runs a solo cover and reopen.
  Rotations take 2.6 s with a mechanical ease-in-out plus a ~2° settle
  overshoot. State at t = 40 s equals state at t = 0 (all covered), so the
  loop is seamless. No flicker, no strobe: the machine never blinks.
- **Determinism.** Frame one is drawn synchronously at the fixed phase
  t = 6.4 s — mid expose-wave of the first procedure: left columns fully lit,
  the wave visibly crossing the middle columns, the right still covered. The
  rAF loop (typeof-guarded) continues from that phase; there is no state to
  desynchronise.
- **House rules.** Canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas CSS size pinned in
  draw(); phone detection via window.screen physical size (min dimension
  < 700 px) with aspect fallback — phones get a slightly wider grid fraction,
  the composition otherwise identical. Watch-only: no interaction handlers.
  Silent: no audio of any kind. No offscreen canvas, no canvas gradients, no
  ctx.filter, no shadowBlur, no createElement. The only text is the <title>.

## QA

Rendered with the house renderer (node-canvas): qa-desktop.png 1280×800,
qa-mobile.png 390×844, thumb.png 720×720 rendered twice and byte-compared
with cmp — identical; duplicate deleted. Frame one reads as specified: dark
room, 4-wide × 3-tall grid of tall columns, left portion glowing warm through
exposed tubes, middle columns caught mid-rotation with shading-shifted
shutters, right portion dark and covered.
