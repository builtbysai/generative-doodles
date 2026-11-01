# №1427 "Seven Deadly Accidents in the Household" (wolfgang-muller WM4, PP650)

A plain domestic interior — table, lamp, chair, kettle, mirror, rug, window — drawn
in flat, unfussy lines, where one household object at a time has a small, precise
accident. Each accident is small, legible, and slightly funny, and it stays played
out: the crack stays cracked, the leg stays off. The room never resets to pristine.

## Frame one (t = 0, boot flag)

Pristine room. Wall in room paper #e8e2d4 with faint seeded speckles, floor in
#b8b2a2. Mirror (steel glass, wood frame) on the left wall, four-pane window on
the right wall, table center with a warm-shaded lamp and a steel kettle, a
ladder-back chair right of the table, a striped rug on the floor. No accident has
happened yet; no red anywhere. No visible text except `<title>`.

## The seven accidents (schedule, one at a time)

One per 12 s, each animating over 2.5 s (smoothstep) and then holding:

1. **Lamp tips** (t = 6): the lamp rotates off vertical around its base (32°),
   shade askew; a small red triangle of spilled light appears on the table.
2. **Kettle boils over** (t = 18): a flat puddle ellipse grows under the kettle,
   steam puffs rise from the spout on a periodic cycle, a red boiling dot sits
   on the body.
3. **Mirror cracks** (t = 30): one clean jagged white line (seeded jag) draws
   down the glass, revealed progressively; a red dot marks the crack origin.
4. **Chair loses a leg** (t = 42): the front-right leg detaches, rotates out and
   lies on the floor beside the chair; the chair tilts a few degrees; a red dot
   marks the leg socket.
5. **Rug slides** (t = 54): the whole rug shifts right with a wrinkle fold on its
   leading edge; a red tassel appears at the corner.
6. **Window fogs** (t = 66): a flat-alpha fill fogs all four panes, with two
   drip streaks; a red dot sits on the sill.
7. **Table wobbles** (t = 78): the table rocks on a slow sine tilt; a red wedge
   dot appears under the short leg.

Each accident carries exactly one red accent, per the palette note. After t = 78
the room sits in its fully-accidented steady state with only ambient motion
(lamp-glow flicker, kettle steam) looping. Damage is a closed-form function of
piece time and the recorded event list — it never decreases, so there is no wrap
reset to paper over: the "seamless loop" of the prompt is honoured by the ambient
motion, while the accident progression is deliberately one-way, as the prompt's
own "stays played out / never resets to pristine" requires.

## Interaction

Drag, never click-to-reload; no reset control exists.

- Dragging (press + move on) an intact object triggers its accident early, at the
  press time, instead of its scheduled time.
- Dragging an already-broken object rearranges the break: accumulated drag
  distance (distance/400, clamped to 1) modulates the damage — a longer drag
  lengthens the mirror crack past its end, tips the lamp further, deepens the
  window fog, widens the kettle puddle, slides the rug further, tilts the chair
  more, and widens the table wobble. All modulation is closed-form over the
  recorded drag-event list and time.

The "camera's attention" from the prompt is carried by the motion itself plus the
single red accent per accident: the room stays calm while one thing goes wrong.

## Technical

- Room as a static scene graph of seven accident-capable objects, each with a
  two-state accident animation (intact, accidented) and a damage parameter.
- Frame one = draw(0) via boot flag; the rAF clock starts only with the rAF
  loop, written as a plain function declaration behind a typeof guard.
- All randomness from mulberry32 (seed 1427000 + index·7919): wall speckles, rug
  stripes, mirror-crack jag. Never Math.random (the one grep hit is a comment).
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
  Phone detection via window.screen physical size with aspect fallback; the
  field-like room composition goes full-bleed on phones (verified at 390 wide).
- Fully silent: no AudioContext, no getUserMedia, no offscreen canvas, no
  gradients (fog and glow are flat-alpha fills), no shadowBlur, no Path2D, no
  createElement, no localStorage, no fillText/strokeText.
- Node-canvas quirks: every fading alpha rounded to 4 decimals before
  stringifying; dots as filled rects or own-beginPath arcs.

## Verification (forced-time probe harness, stubbed rAF driving the piece's own
loop, pointer events to its own listeners; 1280×900)

- Two fresh instances byte-identical at t = 0; thumb byte-identical across
  repeated renders.
- Schedule order confirmed: t = 0 all zones clean (0 red / 0 crack / 0 puddle);
  t = 10 lamp spill red 32 px, others 0; t = 22 kettle puddle 967 px, mirror 0;
  t = 35 mirror crack 396 px; t = 45 chair socket red 64 px; t = 82 table wedge
  red 56 px.
- Rug slide: left edge moves 256 → 294 px at t = 60 (0.03W, as specced).
- Window fog: pane-center pixel (242,239,232) → (236,232,221) at t = 70.
- Early trigger: press + drag on the mirror at t = 3 produces crack pixels by
  t = 10, well before its scheduled t = 30.
- Modulation: dragging the broken mirror lengthens the crack from 396 to 434 px
  in the extended mirror zone.
- No reset: crack pixels identical (396) at t = 110 and t = 200; lamp spill
  varies only 39 → 32 px between those times because the table wobble tilt
  (post-t = 78) rotates the spill triangle slightly — the wobble, not a reset.

## Fix rounds

1. Chair back first read as an empty frame overlapping the window: added a
   mid-back slat so the back reads as a chair. All renders re-done after the fix.
2. Probe harness first failed to anchor the rAF clock (first advance call set
   startTime), making scheduled accidents appear absent; the harness was fixed
   to call the captured callback at t = 0 first. Not a piece issue; all
   schedule probes re-run and passing after the fix.
