# №1502 "Nothing Discarded" (claire-atherton CA7, PP749)

Gallery date: 2006 · 02 · 21 (formula date; not shown in the piece).

## Prompt, as built

A cutting table. The main scene plays in a central panel: a simple room, a
figure crossing it slowly. Around the panel's edges, short strips of unused
material hang like offcuts: a doorway, a hand, a window, a road. One by one,
an offcut strip slides into the panel, plays for a few seconds as part of the
scene, then slides back out to the edge — nothing is thrown away.

## Palette (prompt only, no other color)

Table walnut #6b4a3a; panel cream #e8e0d0; room shapes slate #4a5a7a,
charcoal #2a2a30; offcut strips gold #d9a441, teal #2e6f6a, brick #a8674a,
grey #b8bcc0. Motifs inside the strips use charcoal and cream only.

## Composition

- Walnut table ground, full frame, with seeded speckle flecks (fixed at load
  from mulberry32 seed 1502000, never per-frame random).
- Central cream panel: slate floor band (bottom 22%), charcoal wall cabinet
  upper left, slate wall window upper right. Both room fittings are sized
  from the min dimension so they never turn into slits on portrait phones,
  and the cabinet sits clear of the figure's path.
- Fringe: four offcut strips around all four edges — doorway (gold, top),
  hand (teal, right), window (brick, bottom), road (grey, left). Each strip
  carries its motif in charcoal/cream: doorway frame + cream interior +
  walnut dot handle; hand as cream palm disc + four finger rects + charcoal
  wrist; window as charcoal frame + cream panes + charcoal cross; road as a
  charcoal diagonal band with cream dashes.
- Crossing figure: small, abstract, slate torso/legs with charcoal head,
  walking the floor line left to right.

## Timing

- Full return loop: 48 s. Figure crossing period: 16 s (3 crossings per
  loop), linear left-to-right with a 4 s bob sine (period divides both 16
  and 48, so the loop closes exactly).
- Offcut rotation queue: crossing k plays offcut (k mod 4) — doorway,
  hand, window, road, then doorway again. Within its crossing the strip
  slides in over 2 s (smoothstep), holds in the panel 2–8 s, slides out
  8–10 s, and rests at the fringe for the rest of the crossing. At loop
  phase 0 every strip is at its fringe, so t = 48 and t = 96 are
  pixel-identical to frame one.
- In-play position: the strip enlarges 1.45x into the panel's upper-middle
  area, above the figure's path, never becoming the main scene.

## Drag mapping (closed-form over the recorded event list)

- Pointerdown on a strip grabs it; pointermove projects the pointer onto
  the strip's fringe-to-panel axis, clamped 0–1, so the strip follows the
  drag directly.
- Drag toward the panel (release at s >= 0.7 while scheduled fringe):
  a guest play — the strip holds in the panel 3 s, then eases back to its
  scheduled position over 1.5 s, then follows the schedule exactly.
- Drag away (release at s <= 0.3 while scheduled in-play): the strip is
  sent back to the fringe for the rest of that crossing only; the next
  crossing plays normally.
- Any other release decays back to the schedule with tau 0.4 s.
- Drags starting off a strip are ignored. Drag never deletes a strip,
  never pins one into the panel permanently, never changes the figure's
  crossing, never restarts anything. No click action exists.

## House-rule compliance

- Canvas from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
- Phone detection via window.screen (min dimension < 700 px) with aspect
  fallback. On phones the panel narrows so the side fringe strips plus a
  margin fit inside the frame (checked at 390 wide: no strip touches the
  frame edge); page ground is the piece's own walnut.
- Frame one is draw(0), drawn synchronously at load; the rAF loop is a
  plain function declaration anchored on its first call. Every animation
  sine runs on loop-local time. No Math.random for visible state, no
  Date.now()/performance.now(), no AudioContext at all (fully silent),
  no offscreen canvas, no Path2D, no gradients, no shadowBlur, no
  ctx.filter, no document.createElement, no WebGL, no getUserMedia, no
  localStorage, no visible text except <title>.
- node-canvas quirks honoured: dots are own-beginPath arcs with a moveTo
  first (elsewhere filled rects); fading alphas rounded to 4 decimals.

## QA (render-piece.js + vm-isolated forced-time harness, probe-1502.js)

- Desktop 1280x720, mobile 390x844, thumb 720x720 renders inspected:
  panel room, fringe strips, and figure all read cleanly at both sizes.
- Thumb re-rendered twice: byte-identical.
- Probe results (all pass):
  - Loop closure: t = 48 vs t = 0 = 0 px; t = 96 vs t = 0 = 0 px.
  - Figure repeats: figureX at loop times 8/24/40 identical (640 px).
  - Rotation: active offcut at loop times 5/21/37 = 0/1/2, each at
    slide s = 1 mid-play.
  - Drag-in: offcut 2 dragged from fringe to panel at t = 20 reaches
    s = 1; guest hold still s = 1 at t = 22; frame at t = 26 is 0 px
    vs an undragged instance at t = 26 (returned exactly).
  - Drag-away: offcut 0 in-play at t = 5 dragged to its fringe reaches
    s = 0; still s = 0 at t = 9 where the schedule says 0.5 (dismissed
    for the crossing; frame differs from undragged by 22,313 px);
    next crossing offcut 1 plays normally at s = 1 at t = 21.
  - Off-strip drag: 0 px change.
- Fix rounds (1): the first mobile render clipped the left and right
  fringe strips off the frame edges (panel too wide for the side strips
  on a 390 px phone), and the wall window read as a tall slit. Fixed by
  narrowing the phone panel to leave strip + margin room on both sides
  and sizing both room fittings from the min dimension (cabinet moved
  to the upper wall, clear of the figure). All renders and probes
  re-done after the fix; the first probe run's drag failures were a
  harness anchoring bug (first rAF call anchors the clock), fixed in
  the harness, not the piece.

## Deviations from the prompt

None, apart from the documented QA-renderer adaptations already in the
house rules (canvas 2D throughout; no text, no audio, closed-form drag
state). The prompt's "offcuts as objects with fringe/in-play states and
a rotation queue" is implemented literally.
