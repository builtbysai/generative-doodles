# №1536 "The Worried Note" (arthur-jafa AJ1, PP783)

Gallery date: 2006 · 03 · 27 (recorded here only, never drawn in the piece).

## What it is

A single abstract mark — a thick short bar with a rounded end, like a bent note
stem — drifts left to right across a near-black field (#0d0c10). The stem is
bone (#ddd3b8); the bent tip is signal red (#b33324), the "worried" segment,
always the same segment. The mark does not move at one speed: it plays a
phrase — fast for a beat, frozen for a beat, repeated (it jumps back a short
distance and replays the same stretch), then slowed to a crawl, then frozen
again. Each replayed stretch leaves a faint ghost bar (#4a4438) along the path;
ghosts accumulate along the path only, and reset at the loop boundary. Nothing
else moves.

## Structure (all closed-form, no frame integration)

- Super-loop of 4 phrases, 43.924033463315574 s total. Each phrase has the five
  beats fast / freeze / replay / slow / freeze, with per-beat durations varied
  by a seeded mulberry32 stream (seed 1536000, advancing per phrase), so
  successive phrases differ in duration and the piece is never metronomic,
  while every phrase index stays reproducible.
- Path coordinate s (fraction of one full traverse) is a closed-form function
  of loop-local time: fast and slow beats advance at their rates, freeze beats
  hold, the replay beat jumps back by delta then re-advances exactly delta so
  it re-traces the same stretch and nets zero. The mark's x maps s onto
  12%–88% of the field width; y is the field's vertical center (the middle
  third). At the loop boundary the mark cuts back to the start, like a film
  loop restart.
- Loop-local time is snapped to a 1e-9 grid so t = LOOP lands exactly on 0 and
  loop closure is byte-exact.
- Ghosts: one per replay beat already started in the current loop, drawn as a
  horizontal bar over the re-traced stretch. Erasure applies to its own loop
  only, so the loop repeats exactly.
- Drag: pointerdown on the mark grabs it; while dragged the mark follows the
  pointer plus the phrase offset since grab (s(u) − s(grab)), so it tracks the
  pointer exactly during freeze beats, advances ahead during fast beats, and
  jumps back relative to the pointer during replay beats — the speed-phrase
  survives under the pointer. On release it resumes the scheduled path (a cut
  back to schedule). Pointerdown on a ghost erases that ghost only (mark hits
  take priority where they overlap). Drag never smooths the motion, never adds
  a mark, never plays the phrase at one steady speed.
- Probe-only hook `window.__t36` exposes loop length, loop-local time, phrase
  and beat, path coordinate, mark position (displayed and scheduled), ghosts
  with erased flags, drag mode, and the field rect. It draws nothing.

## House-rule adaptations

- Canvas 2D only; fully silent (no AudioContext at all); flat colors, never
  gradients; fading alphas rounded to 4 decimals; dots/arcs with moveTo before
  batched arcs; rAF loop as a plain function declaration; frame one = draw(0);
  viewport from the Visual Viewport API with the canvas pinned in draw();
  phone detection via window.screen with aspect fallback (field-like layout:
  full-bleed on phones, centered square on desktop over the same ground).
- The prompt's "re-randomized within bounds each phrase" is adapted to the
  seeded mulberry32 stream above, so every phrase is reproducible.
- Reading: "travelling left to right across the middle third" is read as the
  mark travelling left to right positioned in the middle third vertically,
  traversing 12%–88% of the field width.

## QA (probe-1536.js, vm-isolated, real node-canvas, driving the piece's own
rAF loop; clock anchored with a dummy rAF call)

All 22 probes pass, including: frame one identical across fresh instances;
loop closure at t = LOOP and t = 2L byte-identical; phrase 0 beat order
fast/freeze/replay/slow/freeze; fast rate > slow rate > 0; freeze beats hold
s constant; replay dips below the beat-start value and returns to it; s in
[0, sTotal] and the mark inside the traverse at every 0.25 s sample over the
full loop; 4 phrases with all consecutive durations differing; no ghosts
before the first replay, ghosts present after, segments lying along the
traverse; mark frozen relative to the pointer during freeze drag, jumping
back relative to the pointer during replay drag, resuming the scheduled path
after release; ghost drag erasing only that ghost with the mark unchanged;
identical drag sequences byte-identical.

Fix rounds:
- 1 piece fix, caught by fly's own mid-loop inspection (not the probe suite,
  whose phrase-0 checks passed): beat start times were first stored absolute
  while the path function treated them as phrase-relative, so phrases 1–3
  computed a wildly wrong path coordinate (negative s, mark off the traverse
  at t = 30). Beat starts are now stored phrase-relative and the phrase start
  stays absolute; the path, ghost timing, and ghost hit-testing all use the
  same convention. After the fix, s progresses 0 → 0.545 across the loop and
  the mark stays inside the traverse at every sample; the thumb is unchanged
  (frame one is phrase 0, which was already correct).
- 1 probe-side correction: the replay check first recorded s at beat-detection
  time (already mid-dip) as the reference; it now references s just before
  the replay beat, inside the preceding freeze. No piece change.

Renders inspected personally: qa-desktop.png (1280×720) shows the bone
bar-mark with its red bent tip left of center in the middle third, generous
black margins, no ghosts at frame one (no replay has happened yet);
qa-mobile.png (390 wide) shows the same mark full-bleed, no clipping; a
mid-loop frame at t = 30 shows three faint ghost bars accumulated along the
path behind the mark. Thumb byte-compare: two independent 720×720 renders
byte-identical to the shipped thumb. Forbidden-API grep: 0 hits.
