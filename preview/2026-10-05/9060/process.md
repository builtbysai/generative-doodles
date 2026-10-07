# №9060 · Uncurl Etude - process notes

## Concept
FUTURE_PIECES.md seed 44: a drawing that exists only as angleDiffs. A
wire-bending machine (safety-orange bender head: rounded housing, two feed
rollers, direction arrow, clamp jaws, steel snout, status LED) travels a
seeded polyline at a CONSTANT feed rate, extruding a steel wire point by
point. At full length: clamp beat (jaws close, amber LED, "> CLAMP ENGAGED"
HUD tick), then the head retreats along the exact same path, rollers
reversing, wire retracting through the head. Dwell, then extrude again.
One continuous mechanical motion, no cuts, no fades. HUD: feed length (mm),
turn count, current angle delta, mode - machine-voice monospace.
Click/tap reseeds; ?seed= shareable. Animated, single file, canvas 2D.

## Construction
- mulberry32(seed); default seed 906007 (chosen after node pre-screen +
  visual comparison of 3 seeds; see below).
- Turning history: 150 segments. Per-segment delta is ~0 (gauss 0.028 rad:
  straight feed with slight wobble); with p=0.105 per segment (min 5 segs
  after a bend) a decisive bend lands: crisp corner (0.35-0.9 rad, 62%),
  hard bend (0.95-1.55, 28%), fold-back (1.7-2.5, 10%). Anti-spiral guard:
  decaying cumulative turn flips the next bend's sign past 1.1 rad.
  Gentle homing nudge (dd*0.045) past radius 0.62 keeps the part composed.
- Path is normalized (uniform scale, centered in the margin rect) to fit any
  viewport; feed speed = totalLen/13s so the rate is constant within a run
  on every screen.
- Head pose: arc-length parameter s, heading = tangent smoothed over +-2
  segments (head rotates through turns, never steps). Nose is exactly at the
  wire tip in both directions. Vibration: perpendicular dual-sine ~1.4px
  while feeding only. Rollers: angular velocity = v/rollerR, sign flips on
  reversal. Direction arrow flips with travel direction; LED green feeding,
  amber clamp, dim dwell.
- Phases: EXTRUDE 13s -> CLAMP 1.0s -> RETRACT 13s -> DWELL 1.2s -> loop.
  No easing anywhere; s is continuous across every seam by construction.
- Wire: shadow pass + dark outline + steel body + offset top highlight +
  ruler ticks every 8 segments. Live-tip segment bridges the vibrating nose
  to the laid wire so the joint never gaps.

## Iteration
- v1: bend model was "small turns every segment" - produced a tangled
  bird's-nest blob (v1_mid_extrude.png). Rejected the approach, not the
  seed: rewrote as real bender programs do (straight feed, decisive bends
  at points) + anti-spiral guard + gentle homing instead of a steering yank
  (the yank itself was adding big per-segment turns and inflating TURNS).
- Seed comparison (node seed_screen.js pre-screen over 906001-906040 on
  spread/aspect/bends/crossings, then visual): 906007 (varied part:
  zigzag, open loop, curl; 15 bends, 0 crossings) beat 906003 (one big
  plain C-loop) and 906031 (hook shape, dead space below). Screenshots:
  v3_s906007.png, v3_s906003.png, v3_s906031.png.
- Head legibility: enlarged the head 1.28x (v5_headzoom.png) - rollers,
  arrow, LED, snout all read at full-frame scale.
- Clamp jaws were drawn under the snout and invisible (v6_clampzoom.png);
  moved them to the nose tip, drawn after the snout, gap 10S->2.5S.
- Palette: warm copper (A) vs cool steel (B) on identical seed/phase
  (v7_copper.png, v7_steel.png). Steel won: the safety-orange head pops
  against cool steel, reads more "machine", and the head/wire separation
  makes the uncurl easier to follow.
- Mobile 390x844: part was top-aligned leaving a dead bottom third
  (v8_mobile.png); fit now centers the part in the margin rect
  (v9_mobile.png). Desktop unaffected.

## Differentiation
Checked against the ledger's used/retired/paused families. The paused
family is head-led chain-follow creatures (worms, snakes, ribbons). This is
a machine extruding a wire along its own turning history - mechanical, not
alive; no creature behavior anywhere. No other piece is a wire-bender.

## QA log
- Screenshots inspected at pixel level (not thumbnails): mid-extrude,
  clamp (full part + engaged tick), mid-retract, second-cycle extrude.
  The uncurl reads as one continuous motion; reversal flips only the
  arrow/roller direction, position and orientation stay continuous.
- shots/phase_shot.py: phase+s-targeted captures via window.__probe.
- shots/cycle_qa.py: 62s run, two full cycles, synthetic click mid-retract:
  phases EXTRUDE->CLAMP->RETRACT->DWELL->EXTRUDE seamless; click reseeded
  cleanly to a new history; zero console/page errors.
- cdp_exceptions.py: zero exceptions/errors at 1280x800 (30s) and at
  390x844 mobile (20s).
- Responsive: full-viewport canvas + resize handler (refits path); HUD and
  head scale with S = clamp(min(W,H)/720, 0.62, 1.15).
- thumb.png: 720x720 from a real 900x900 render at CLAMP (full sculpture).
- Visible copy check: no em dashes, no date strings, no absolute URLs.
  Title: "№9060 · Uncurl Etude".
