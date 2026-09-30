# №8962 · Reverse Lookup — process notes

## Seed
266 "Reverse Lookup" (from Sabat's Table 3: cents to simplest ratio, simplicity
ranked but system-filtered).

## Concept
The piece inverts its own parameter table. Drag across the spectrum: the piece
finds the four nearest of 16 table entries by hue, ranks them by simplicity
(distance to anchor hues plus saturation penalty), then applies the system
grammar: never three picks in a row of one temperature. Vetoed candidates are
drawn struck through in red with the reason named ("would make 3 warm in a
row"); the surviving simplest entry wins and is stamped into the history strip.
The veto is visible and legible.

## Technique
Raw canvas 2D, pointer capture for drag. Table entries carry hue, saturation,
lightness, temperature, and a computed simplicity rank. Lookup is exact hue
distance; grammar checks the last two history entries. If the grammar vetoes
all four (rare), the simplest wins by override.
