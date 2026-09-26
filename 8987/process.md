# №8987 · Accumulation

Replaced the earlier alphabet piece at this number with something completely
different: painterly, meditative, no type at all.

## The idea

Sandpaint logic: nothing is drawn except small translucent dots, and a picture
emerges from their accumulation. A hidden density field describes a sunset
landscape (sky gradient, a glowing sun disc, two mountain ridgelines,
foreground), and each dot is rejection-sampled against it, colored by the
field at that spot with a little jitter.

## The field

- Sky: low density, blue-violet warming toward the sun.
- Sun: density 1.0, gold, with a soft glow ring.
- Back mountains: purple-blue ridgeline from layered sine noise.
- Front mountains and foreground: deep plum, densest of all.
- Warm white paper, dots at 10-20% alpha, radii 1-2.5px.

About half a million grains build the full picture in roughly half a minute
on a desktop; the counter under the stage keeps score. Clicking the paper
drops a burst of dots around the pointer for the impatient.

## Notes

No libraries. The image never reads as noise because every dot's position
and color comes from the field, never from a uniform scatter. Seed 7 from
the private sketchbook.
