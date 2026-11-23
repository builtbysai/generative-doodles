# Part C-128-81 - №1685 (KG6, #221 kjetil-golid, PP932)

## What it feels like

A technical drawing sheet on a warm gray ground. First the ground appears:
a faint grid, hatched strips along the top and left edges, three empty
label slots waiting at the bottom. Then six chunky parts draw themselves
in blueprint order, two pills, two cubes, two elbow joints, each in flat
blueprint blue, dusty pink, orange, or dark maroon. Beside each part a
callout in thin mono type gives its part number and the real parameters
that built it: size, slant, palette index, subdivision depth. The sheet
holds, fades, and assembles itself again. Tap any part and its callout
brightens while the other five fade to a whisper; tap empty space and
the full sheet returns. The annotation layer is the database.

## Mechanism

Six parts are generated from a fixed parameter record each: type, size,
slant, palette index, subdivision depth, and a sheet position. Pills are
capsules with chord lines across them, cubes are front faces with a
lighter top face and darker side face plus a subdivision grid, elbows
are L-shaped joints with ring lines along each arm. Every callout line
is computed from the same record that drew the part, so no label can
lie about its part. Part numbers are built from the size values, so the
title part, a pill 128 wide and 81 tall, is C-128-81.

Draw order is ground, then parts in blueprint order, then callouts with
leader lines. Each part wipes in left to right in its own rotated frame
over 0.8 seconds, staggered 0.75 seconds apart; callouts follow, one
every 0.35 seconds. The full cycle is 34 seconds: 8 seconds to assemble,
a hold to 32 seconds, a 2 second fade, then assembly again. Frame one
is the fully assembled sheet, so the first frame is reproducible.

Tap handling keeps a hit map of part bounds in sheet space. A tap inside
a part selects it: its callout draws at full strength with a heavier
leader line and a small square marker at the part edge, and the other
callouts drop to 20 percent. A tap on empty space clears the selection.
The layout is a landscape sheet on desktop and a portrait sheet filling
the phone, each with its own part positions, so callouts stay legible
and clear of their neighbors on both.

## Deviations

None. The piece follows the prompt as written. The draw-on loop repeats
every 34 seconds rather than assembling only once, so a visitor arriving
after the first assembly still sees the sheet draw itself.
