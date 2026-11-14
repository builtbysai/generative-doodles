# The Header System, №1771

## Driver

A white band across the top of the screen carries a name in black sans-serif type, and below it an icy field that barely moves, crossed by a single red hairline. The feeling is that of a gallery label that outlasts the work it names: the header is fixed and certain, the field underneath is slow weather, and the red line is the one thing in the room that is still deciding where to go. Nothing asks to be touched. You watch the name change once an hour and wonder whether the field has changed at all since you last looked.

## Mechanism

The canvas fills the viewport. The top fifth is painted as a fixed white header band with the current artist name at left, a thin black rule at its foot, and the piece title, formula date and a Watch only hint in small type at the right end. The field below is a perlin-advected gradient: a vertical ice gradient overlaid with ninety horizontal strips whose tone is mixed between two ice greys by a seeded two-dimensional value-noise field sampled at the current phase, plus three large soft radial washes that drift almost imperceptibly. The red hairline is a smooth curve through nine control points spanning the field width; each point's vertical offset follows a seeded random walk with gentle mean reversion, stepped in fixed 1/30 s increments. The header name is a deterministic rotation through eight artist names, indexed by floor of elapsed hours from load, starting at Richard Chartier. The header itself never animates; only the name text swaps once per hour.

## Palette

White header, black ink, ice blue-grey field (pale top #eef3f6 to deeper #c7d3da, bands mixed between #e7edf1 and #b4c3cd), one red line #c8102e. Page ground is the ice tone #dfe7ec.

## Interaction

Watch-only. No click, drag or tap interaction of any kind. The field evolves on its own clock; the name changes once per hour.

## Frame-one phase

Fixed phase t = 60 s. At load the red-line walk is pre-run from t = 0 to t = 60 in 1/30 s steps with the seeded generator, so the hairline is already visibly bent at frame one, and the field bands are sampled at phase 60. The header shows the first rotation name, Richard Chartier. All randomness is seeded (mulberry32, seed 1771); no Math.random and no wall-clock time enter the visual state, so frame one is reproducible.

## Deviations from prompt

The header band is painted on the canvas rather than built as a separate DOM element. It is visually identical to a fixed DOM band (top fifth, white, black sans-serif name, thin rule, never animating) and keeps the piece a single self-contained canvas, which is the series convention and what the thumbnail byte gate can verify. No other deviation: palette, composition, watch-only motion, hourly name change and the slowly bending single red line are all as specced.
