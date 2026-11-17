# №1837 Early Computers (KS6, PP1084, #240 konrad-sprenger)

## Driver

A fairground orchestrion playing itself. A long paper roll scrolls past a
bank of brass hammers, and where the paper is punched the hammers fall, so
the machine plays pitch combinations no human hand could reach. The roll
never tears and the mechanism never tires. The viewer is the audience, not
the operator: there is no crank to turn and nothing to touch except a sound
toggle.

## Mechanism built

- 2D canvas. A dark walnut cabinet holds an aged-paper roll across the lower
  two thirds of the scene, with a brass name strip reading ORCHESTRION, a
  horizontal brass rod across the hammer bank, and walnut rollers at both
  ends of the paper.
- The roll is a tileable 84-column pattern in 9 lanes (voices). Each lane is
  a Nancarrow-like canon voice with its own period (3, 5, 4, 7, 3, 8, 5, 11,
  6 columns) and offset, plus a small set of seeded extra holes, for 192
  holes per tile. Holes scroll right to left at 0.9 columns per second.
  Sprocket holes run along the top and bottom margins of the paper.
- A brass reader bar stands at the strike line (62 percent across the
  scene). One brass hammer per lane pivots off the bar onto its own steel
  tine; the hammer angle is a direct function of the nearest hole's distance
  to the line, so a hammer falls exactly as its hole passes, with a brass
  flash on the tine at the strike.
- Sound is off by default and silent unless the visitor taps the Sound plate.
  On the first tap a WebAudio context starts lazily; each lane crossing the
  line then plays a short triangle pluck at its own pitch (C4 to E5 scale).
  No autoplay, no drone.
- Watch only. The only click target is the sound toggle; there is no crank,
  no operator, and no click-to-reload.
- House rules followed: Visual Viewport sizing with resize on visualViewport
  and window, canvas pinned in draw(), phone detection via window.screen
  with aspect fallback, field-like full-bleed on phones and square on
  desktop, one synchronous frame at load, requestAnimationFrame guarded by
  a typeof check, reduced-motion support, no flicker above 14 Hz by
  construction (motion is a slow 0.9 column per second scroll plus hammer
  falls tied to hole crossings).

## Deviations from the prompt

None in substance. Two presentation choices worth noting: the hammer bank is
realized as a vertical brass reader bar at the strike line with one hammer
per lane pivoting off it, rather than a horizontal keyboard row, because the
nine lanes are stacked vertically and each hammer must sit over its own
lane; and the optional WebAudio is plucks only, with no drone, keeping the
machine quiet until the visitor asks for sound.

## Fixed frame-one phase

t = 47.8 s. The hole pattern is generated once at load from mulberry32(1837)
and the scroll offset is a pure function of t, so frame one is fully
reproducible. At t = 47.8 s the roll is mid-scroll with two lanes striking
(verified with the probe: activeAt(47.8) = 2). The thumb was rendered twice
from the final file and is byte-identical (md5 5086ea64e8890139ade279ec462a3705).

## QA

Rendered with node render-piece.js at 1280x900 desktop, 390x844 mobile, and
720x720 thumb; all three inspected. Desktop, mobile, and thumb are clean:
title plate, date, hint, and sound plates legible; no spill past edges; no
merged shapes; hammers visible as a vertical bank at the strike line with
two mid-strike at frame one. One fix round: the first build stacked all nine
hammers on a single pivot so they overlapped into one shape, and the
ORCHESTRION strip sat under the title plate on phones; both fixed by giving
each lane its own pivot on the reader bar and moving the strip to the right
on phones.
