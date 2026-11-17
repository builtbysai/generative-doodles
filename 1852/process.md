# No.1852 Bloom (TW5, PP1099, study #242 theresa-wong)

Gallery date: 2007 · 02 · 06. Interaction: Watch only.

## Spec as built

An empty concert hall prepared for a performance with no performers yet.
Thirty-six long steel strings stretch wall to wall and recede toward a
vanishing point at the center of the hall. Very slowly the strings begin
to shimmer, each in its own color, and the shimmer spreads until the whole
hall is one undulating field. The bloom completes over about four minutes
and holds. In the foreground, as witnesses: an electric guitar on a stand
at lower left, a laptop at lower right, a PA stack at the right edge, and
dark red velvet ropes on posts holding back an empty audience area with a
few dim empty chairs. No performers, no sweeping stage lights, no applause,
no explanatory text.

## Palette (hand-picked from the prompt's named colors)

- Deep hall black: ground #07080B, wall #0B0D12 to #05060A, floor #0A0B0F to #040507
- Strings shimmering steel blue to warm gold: steel #5A7FA8, steel highlight #8FB4D4, gold #E8B95C, gold highlight #F5D489
- Guitar and laptop as dark silhouettes: #0E0F13 with edge #1B2230, screen #101623
- Velvet rope in dark red: #6E1423, highlight #8E2438; posts #15161C with tops #2A2C36
- Plates: #0A0B0E with line rgba(200,210,225,0.28), title ink #EDEDE8, hint ink #9AA3AD

## Motion and interaction

Watch only. There is no pointer interaction at all: no drag, no tap
target, no sound plate. The room tunes itself. Each string enters one by
one in seeded order, then its hue oscillates between steel blue and warm
gold on a slow per-string LFO (0.018 to 0.068 Hz, far under the 14 Hz
flicker limit), with a small shimmer bead travelling slowly along the
string. A warm wash centered on the vanishing point grows with the bloom
so background and foreground merge into one field as the bloom completes.
The animation loop advances a phase clock from the fixed frame-one phase;
prefers-reduced-motion skips the loop and holds the first frame.

## Determinism

Fixed-phase first frame at t = 60.0 s into the 240 s bloom, so the bloom
already reads partway: the earliest strings are gold-tinged and the wash
has begun, never a black empty hall. All string geometry, phases, LFO
rates, and sags come from a mulberry32 seeded PRNG (seed 1852). No wall
clock, no unseeded random, no Date. One synchronous frame is drawn at
load; requestAnimationFrame calls are guarded with typeof checks so
node-canvas QA works. A window.__probe.drawAt(t) hook is exposed for
gating.

## Deviations from the prompt

1. Audio omitted entirely. The prompt's technical approach names WebAudio
   with dozens of string voices, but this piece is watch only and the
   house rule is that audio runs only lazily inside a first visitor tap;
   a tap-to-listen plate would contradict the watch-only spell, so the
   piece is visual only. The string voices are simulated visually by the
   per-string hue LFOs and travelling shimmer beads.
2. The prompt suggests 2D canvas or WebGL. Built as 2D canvas only, per
   the house rule that node-canvas QA must run the actual script.
3. Field is full-bleed on every screen, matching the live No.1851 template
   in the same study, rather than square on desktop. The wide hall
   perspective needs the width, and the template's fieldRect is full-bleed.
4. The four-channel panning simulation has no visual counterpart and is
   not represented; the per-string entry order and LFOs carry the
   "voices entering one by one" idea instead.
5. No studies/theresa-wong.md exists in the repo, so palette hexes were
   hand-picked from the prompt's named colors as instructed.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js
at 1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three renders
were visually inspected. First pass caught two defects and both were
fixed and re-rendered: the guitar was clipped at the bottom edge (moved
up and shrunk so the stand legs are fully in frame) and the gold shimmer
was too faint at frame one (entry and hue curves steepened so the earliest
strings read clearly warm gold at t = 60 s). Final renders are clean:
plates legible with no overlap, hint "Watch only." readable, ropes red
and sagging, PA stack and laptop silhouettes present, strings converging
on the vanishing point with gold and steel strands mixed.

## Files

- index.html (self-contained, 2D canvas)
- thumb.png (720x720 render of frame one)
