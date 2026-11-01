# №1087 "The Third Rail" — Tatsuya Ishii study block TI8

Syn's backstage infrastructure as a pure piece: the machine before the
performance. A ceiling rail, a small dark wall hanging from a bundle of real
catenary cables, a grooved winch drum, and a motor-drive test unit with the
one green LED. Everything half-visible, diagrammatic, low-luminance.
Watch-only; no interaction, no audio.

## How it works

- **Closed-form in t throughout.** 30 s seamless loop. The wall's horizontal
  position is a triangular wave over the loop — constant freight speed
  (amplitude 0.02 of frame, about 2 px/s at 720 px), never eased. At the loop
  seam the triangle closes, so the drift loops exactly.
- **Real catenaries.** Each of the four cables is a true cosh curve through
  its two endpoints: for a given parameter a, the vertex offset h and level C
  are solved exactly from the endpoints, and a is bisected (48 iterations)
  so the midpoint sag below the chord hits its target (outer cables sag
  more). Because the endpoints ride on the drifting wall, the bundle is
  re-derived every frame from the wall position — the curves genuinely
  re-drape as the wall inches along.
- **The rail.** Two chords with ties at 15% from the top, full width.
  Fixed roller blocks sit at the thirds; two smaller trolley blocks ride
  the rail with the wall. Four pulleys hang below the rail anchors.
- **Winch drum.** Lower-left: four concentric groove rings, three spokes
  rotating at exactly 2 revolutions per 30 s loop (the rotation closes at
  the seam), a hub, and a cable running from the drum up to the rail.
  Labelled "200N".
- **Drive unit and LED.** Lower-right box with vent slits, labelled
  "MOTOR DRIVE UNIT" / "OSC>MODBUS" in tiny #4A5568 mono. The LED is the
  only saturated color in the piece: a 1 Hz square wave, on for the first
  half of each second, with a flat-alpha halo disc when lit.
- **The wall.** #101016 with a faint rail-gray edge; its projected sphere
  is two layered flat-alpha discs of #1E3A5C (0.5 / 0.35) — no gradients.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas CSS size pinned in draw(); phone
  detection via window.screen physical size (min < 700) with aspect
  fallback. Centered square stage on a page ground of the same #060608
  black, so the frame reads full-bleed on phones and labels bump slightly.
- Determinism: the first frame is drawn synchronously at the fixed phase
  t = 10 s (wall a third through its outbound drift, LED inside its ON
  half-second); the rAF loop is guarded by a typeof check and anchored as
  phase + elapsed.
- No audio (none specced), no interaction handlers, no visible text beyond
  the three specced labels and the <title>, no gradients, no offscreen
  canvas, no ctx.filter, no shadowBlur, no createElement.

## QA

- Rendered with the house renderer at 1280×800, 390×844, and 720×720.
- Thumb rendered twice at 720×720 and byte-compared with cmp: identical;
  duplicate deleted.
- Frame one: near-black frame; rail line at 15% with roller blocks at the
  thirds and two wall trolleys; four gray catenary cables bow from the
  pulleys down to the small dark wall at lower-center, its dim blue sphere
  on the face; grooved winch drum lower-left with its cable to the rail;
  drive unit lower-right with the green LED lit and the tiny labels in
  place. Mobile holds the same composition, nothing clipped.
