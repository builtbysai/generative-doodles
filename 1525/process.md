# №1525 — Three Rooms, One Evening (bintou-dembele BD6, PP772)

Gallery date: 2006 · 03 · 16 (recorded here only, never drawn in the piece).

## Spec

The frame is split into three vertical bands, each with its own small group of
dancer-marks moving in its own style: left band slow and ritual (circling),
middle band film-like (marks freeze in posed tableaux, then jump to a new
pose), right band concert-like (marks bouncing to a visible pulse line). A
thin shared pulse line runs across all three bands at the bottom. At
intervals, one mark crosses from one band into the next, carrying its style
with it for a while before adopting the new band's style.

Palette (only these colors): field near-black #14121a; left band marks ochre
#c98f3d; middle band marks bone #d8d2c4; right band marks brick #a34a2e;
band dividers faint #3a3540; pulse line gold #c9a86a.

Composition: three equal vertical bands; pulse line horizontal across the
bottom; marks small within their bands; dividers thin, never walls.

## Mechanics

- 120 s loop, loop-local time throughout, so the frame at t=120 and t=240 is
  byte-identical to t=0. All motion periods divide 120 s: circling periods
  24/30/40/60 s, tableau pose changes every 8 s across 5 poses (40 s pose
  cycle), shared pulse period 2 s.
- Left band: 4 ochre articulated glyphs (torso + arm + leg lines) on
  individual circular paths with per-mark radius noise, counter-clockwise.
- Middle band: 4 bone glyphs frozen in one of 5 poses, jumping to the next
  pose every 8 s (pose index offset per mark).
- Right band: 4 brick glyphs bouncing to the shared 2 s pulse; bounce height
  follows |sin| of the pulse phase, so all four share the pulse but differ
  in amplitude and base height.
- Shared pulse line: gold, horizontal at 0.92H, alpha breathing
  0.45–0.80 on the same 2 s pulse.
- Crossing (one mark at a time, slowly): left mark 1 travels to the middle
  band on a fixed schedule — blend ramps 20–40 s, fully adopted 40–68 s,
  blend back 68–88 s, home 88–120 s. During the blend the mark's position
  and limb angles interpolate between its circling behaviour and a fixed
  middle-band tableau spot, so it visibly carries its old style before
  adopting the new one. The crossing mark keeps its ochre origin color
  throughout (it is the same dancer travelling).
- Dragging a divider left or right moves that divider (clamped so bands keep
  at least 0.15W and stay ordered); the widened band's marks spread out and
  the narrowed band's marks close up. Dragged dividers stay where released.
  A drag-end reassignment check is implemented per the Technical note, but
  marks are positioned by fraction within their band, so divider drags
  re-spread marks rather than stranding them across a divider.
- Dragging on the crossing mark during a travel window hurries its
  crossing: boosted time advances 3x while the drag overlaps the window,
  computed in closed form from the recorded drag segments (an open drag
  counts live up to the current time). Dragging the mark outside a travel
  window has no visible effect.
- Drag never removes a divider, never stops a band, never merges two bands,
  never syncs all three into one style.

## House-rule adaptations

Canvas 2D only; everything closed-form over loop-local time and recorded
events, never frame-integrated; fixed-phase first frame (frame one =
draw(0)); rAF loop as a plain function declaration; viewport from the Visual
Viewport API with canvas pinned in draw() and a guarded size fallback
(visual viewport, else window, else 720×720); phone detection via
window.screen with aspect fallback; dots/lines drawn as separate stroked
subpaths with moveTo before each segment; fading alphas rounded to 4
decimals; fully silent, no AudioContext at all, no getUserMedia, no
gradients, no visible text except the title. Per-cycle variation: none —
the same crossing mark crosses every loop, which is what keeps the loop
exactly closed. Seeded mulberry32 (seed 1525000) for all mark layout.

## Deviations from the prompt

None beyond the adaptations above, plus three recorded readings: (1) the
crossing is one fixed mark per loop with a return leg, since a single
one-way crossing cannot restore the loop-start state; (2) the crossing mark
keeps its origin color while travelling, since the prompt assigns no color
change; (3) divider drags re-spread marks within their bands (see above).

## QA

Probe script probe-1525.js (vm-isolated, real node-canvas, driving the
piece's own rAF loop): 31/31 pass. Frame one identical across fresh
instances; loop closure at t=120 and t=240 byte-identical; left ochre 781
px, middle bone 757 px, right brick 852 px at t=0 with no cross-band color
above 100 px; left moves 0→6 s, middle frozen 0→4 s and jumping 0→9 s,
right bouncing 0→0.5 s and same phase at 0 and 2 s; pulse line mean red
41.0 → 57.4 over the pulse half-period; crossing mark home at t=0 (w=0),
mid-blend at t=26 (w=0.216), adopted in the middle band at t=50 (w=1,
5 marks in the middle band, 3 left), back home at t=100 (w=0), exactly one
ochre mark (210 px) in the middle band at t=50; divider drag +120 px
followed exactly, bands not merged (gap 120 px), left spread 169.1 → 242.7
px, divider line redrawn at the new position, bands still moving after the
drag; crossing-mark drag hurries the mark from x=174.3 to x=298.1 at t=28;
same drag sequence byte-identical across instances.

Fix rounds: 1 piece fix (an open crossing-mark drag now counts live toward
the hurry boost, so the hurry shows while the pointer is still down, not
only after release); 1 probe-side threshold correction (pulse-line mean
over a 7 px band dilutes the ~2 px line, so the brightness threshold went
from 20 to 10 points — the 0.45 → 0.80 alpha swing itself is unchanged).
Renders re-done after the fix; thumb md5 unchanged. Desktop (1280×720) and
mobile (390 wide) renders inspected personally: three bands legible, no
clipping, distinct glyph styles per band, gold pulse line across the
bottom. Thumb re-rendered twice, both byte-identical to the shipped thumb.
Forbidden-API grep clean: no Math.random, Date.now, performance.now,
AudioContext, getUserMedia, Path2D, createElement, localStorage, gradients,
fillText, strokeText.
