# №1515 "The Stock-Photo Choir" (clement-cogitore CC4, PP762)

Gallery date: 2006 · 03 · 06 (formula date; recorded here only, never drawn
in the piece).

## Prompt, as built

A field of generic anonymous shapes — smiling arcs, pointing arms, skyline
blocks, handshake blobs — in neat advertising rows, all in flat happy
colors. One thin gold voice-line sweeps across the field left to right;
wherever it passes, generic shapes briefly re-stage into one specific scene
(a single figure standing apart, facing the viewer) and then dissolve back
to generic. The same face-shape appears in many rows at once.

## Palette (only these six hexes appear in the file)

- Field overexposed white-grey #e8e8e2 (full-bleed ground)
- Generic shapes: flat coral #e0785a, flat sky #7aa8c4, flat leaf #8aa86a
- Voice-line gold #d9a441
- Standing-apart figure ink black #1a1a1a

## Composition

Generic glyphs in a grid filling the field (cell = max(84 px, 0.15 × min
dimension); 11 × 6 on 1280 × 720 desktop, 6 × 6 on the 720 × 720 thumb,
4 × 10 on 390 × 844 mobile). Each cell holds one seeded glyph type
(smiling arc with two dot eyes, pointing arm, three skyline blocks, or
handshake blob of two discs plus a bar) in one seeded flat color, with a
small seeded jitter inside its cell. Assignment comes from a single
mulberry32 stream (seed 1515000) consumed in cell order, so every layout
is deterministic per canvas size.

The voice-line is drawn vertical and sweeps horizontally. That is the
reading the prompt's Technical section forces: it defines the line as "a
sweeping x position with a radius of influence", and it is the only
reading under which one face-shape appears in many rows at once (the line
crosses every row simultaneously). The prompt's word "horizontal" is read
as the sweep direction.

The standing figure is a single abstract silhouette: blank head disc (no
facial features), torso, arms, legs, all ink black. The "face-shape in
many rows at once" is that blank head disc appearing in every row the
line crosses. "Never twice at once" is honored per row: with cell spacing
≈ 108 px and influence radius 94 px, at most one glyph per row can ever
reach morph ≥ 0.9 (that needs distance < ≈ 19 px from the line), so no row
ever shows two fully re-staged figures; re-staged figures occur only at
the line, never elsewhere.

## Sweep timing and influence radius

- Sweep loop: 48 s. Scheduled line position goes from x = −R (offscreen
  left) at t = 0 to x = W + R (offscreen right) at t = 48, then wraps;
  because the line and its glow are fully offscreen at both ends, the
  frame at t = 48 is byte-identical to t = 0.
- Influence radius R = round(0.13 × min(W, H)) — 94 px on a 720 canvas.
- Morph factor for a glyph at distance d from the line:
  m(d) = 0.5 × (1 + cos(π × d / R)) for d < R, else 0 — compact support,
  1 exactly at the line, 0 at and beyond R, so the loop closes exactly.
- Rendering of a morph: the generic glyph is drawn at alpha (1 − m) in
  its own flat color and the standing figure at alpha m in ink, both
  centered on the same point. At m = 1 only the figure is visible; at
  m = 0 only the generic glyph. A generic shape's color is never changed
  by anything else.
- Voice-line rendering: 3 px gold line plus layered flat-alpha glow rects
  (36 px at alpha 0.06, 18 px at alpha 0.10). No canvas gradients anywhere.

## Drag mapping (closed-form over recorded events, never frame-integrated)

- Pointer down grabs the line with an offset (pointer x minus line x), so
  the line never jumps on grab.
- While dragging, the line follows pointer x minus the grab offset
  (clamped to [−R, W + R]): holding still holds the line in place (the
  re-staged scene holds longer); moving the pointer faster than the sweep
  (≈ 19 px/s on a 720 canvas) speeds the sweep.
- On release, the line springs back to the scheduled sweep over 2 s with
  a smoothstep blend, computed in unwrapped sweep-phase space (release
  offset = shortest-path delta in [−0.5, 0.5] from the schedule), so the
  blend never sweeps spuriously across the field and reaches the schedule
  exactly at release + 2 s.
- Drag never adds a second line, never freezes a re-staged scene
  permanently (every morph relaxes once the line moves on), never changes
  a generic shape's color.

## House-rule compliance

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height
  in px. Phone detection via window.screen physical size (min dimension
  < 700 px) with aspect fallback; the composition is field-like and goes
  full-bleed on phones (mobile render confirmed, no clipping).
- Fixed-phase first frame: draw(0) runs synchronously at load; the rAF
  loop is a plain function declaration whose first call anchors the clock
  (elapsed 0 → draw(0) again). No Date.now / performance.now content.
- Every animation quantity is a function of loop-local time (sweep phase)
  and the recorded drag list. No Math.random anywhere; all variation is
  the seeded stream above.
- Fully silent: no AudioContext at all. No offscreen canvas, Path2D,
  ctx.filter, gradients, shadowBlur, document.createElement, WebGL,
  getUserMedia, localStorage, or fillText. No visible text except
  <title>. Dots are own-beginPath arcs with moveTo first; fading alphas
  are rounded to 4 decimals before stringifying (node-canvas quirks).
- Study guard: mechanisms only, abstract shapes only, no likenesses, no
  real names, no readable text, no depiction of children, soldiers, or
  any identifiable event or ritual. The standing figure has no facial
  features; the smiling-arc glyphs are the prompt's own generic shapes,
  not portraits.

## Probe results (probe-1515.js, vm-isolated instance, real node-canvas)

All 21 checks pass, including:

- Loop closure: t = 48 vs t = 0 = 0 px; t = 96 vs t = 0 = 0 px;
  frame-one redraw = 0 px.
- Sweep: pos(0) = −94 = −R; pos(24) = 360 = W/2; pos(48) = pos(0) (wrap);
  pos(47.99) = 813.81, approaching W + R = 814; monotonic over [0, 48).
- Morph and relax (centre glyph, pass time 26.58 s): morph 0 before
  arrival, exactly 1 at the line, 0 at pass + 8 s; glyph-region pixels
  change by 4,296 px at pass and return to exactly 0 px difference after.
- Never twice: over 1 s samples across the whole loop, max one glyph per
  row with morph ≥ 0.9; fully morphed glyphs never exceed the row count.
- Drag hold: line stays exactly at the pointer (95.17 px at t = 12 and
  t = 14) while held; at t = 17, after release at t = 14 and the 2 s
  blend, line position equals the schedule exactly (227.58 px).
- Drag faster: pointer moving 400 px in 2 s (200 px/s) moves the line
  exactly with it (pos 495.17 px vs 495.17 expected), far above the
  ≈ 19 px/s sweep speed.
- Forbidden-API grep clean; palette grep confirms only the six specced
  hexes appear in the file.
- Thumb byte-compare: thumb.png plus two independent 720 × 720 renders
  are byte-identical (md5 d88420010f77ae224c15105367a6ce5c).
- Renders inspected personally: desktop 1280 × 720 (neat generic rows,
  no line visible at frame one as designed) and mobile 390 × 844
  (full-bleed, no clipping).

## Fix rounds

None to the piece. The first probe run failed five checks for two
harness-only reasons, both fixed in probe-1515.js with the piece file
untouched: (1) the sweep-end expectation ignored the loop wrap (pos(48)
correctly equals pos(0)); (2) the drag probes called the harness
down/move/up helpers with (x, t) while the interface takes (x, y, t),
so drag events were recorded with undefined times. After those two
harness corrections, all 21 checks pass on the unchanged piece.

## Files and hashes

- index.html — md5 08dafe2a7926bc71a87c6be80bf704f2
- thumb.png (720 × 720) — md5 d88420010f77ae224c15105367a6ce5c
- qa-desktop.png (1280 × 720), qa-mobile.png (390 × 844), probe-1515.js
- Nothing pushed to GitHub, as instructed.
