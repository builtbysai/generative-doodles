# 9063 Prism Split

Near-mirror-symmetric refractive light on black. Cool cyan rays fan out to the left, warm magenta rays to the right, all converging on a glowing yellow-green faceted core. Faint glitch shimmer throughout.

## Technique

A single GLSL fragment shader draws everything analytically: six seeded beam pairs mirrored across the vertical axis (cool left, warm right), each beam a soft-edged ray with a hot core. The center holds rotating faceted polygonal rings in yellow-green. A subtle time-based glitch offset shimmers the beams.

Moving the pointer bends the symmetry axis and retunes the hue. Click reseeds the beam angles, widths, and core geometry. `?seed=` makes a variation shareable.

## Iteration

The first version used a raymarched folded SDF for the structure underneath, but it rendered as two tiny dots, a technique demo with no composition. Rewriting as an analytic beam shader gave the bold symmetric fan the piece needed. Widening from 4 to 6 beam pairs filled the frame.

## Interaction

Move the pointer to bend the symmetry. Click/tap for a new split.
