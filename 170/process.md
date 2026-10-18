# No.170 Beyond the Great Star

## Concept
A colossal 96 pointed star in gold line on deep blue, ringed by smaller and smaller eight point stars that step down in size as they grow outward, until the rim dissolves into tiny stars. The whole disc turns a quarter turn per 50 second loop, and once per loop a brightness wave travels from the centre outward. Majestic, not busy. Watch only.

## Construction
Palette is exactly the spec: ground #10254E, gold #C9A227, and the third ring out in bone #F2EDE3. The centre star is the star polygon {96/47}: one continuous stroked path stepping 47 of the 96 rim vertices, which weaves the radiant, filled-looking medallion a many pointed star needs. Twelve rings follow; ring radius grows geometrically from 0.40 to 0.98 of the disc, motif size is inversely proportional to radius (the step-down that counteracts natural growth with distance), and each ring's motif count is rounded to a multiple of four. Because the centre star has 96 points, every ring count divides by four, and each motif has eight points, rotating the disc by exactly a quarter turn maps it onto itself, so the 50 second loop closes seamlessly. The brightness wave is an 8 second gaussian front in radius, adding at most 0.38 alpha as it passes each ring, once per loop. No glow, no gradients, nothing in the corners but deep blue.

## QA log
Rendered at 1280x900, 390x844 and 720x720 and inspected all three. The first centre, an alternating-radii 96 point outline, read as an empty gear ring rather than a star; the {96/47} star polygon fixed it and is recorded here as the one deliberate construction change from the spec's letter (its tech note suggested a plain star polygon). Rings now step down visibly, the bone ring reads as a rhythm accent at third position, and the rim dissolves into fine stars on desktop and phone alike. Frame one is offset 4.5 seconds, catching the brightness wave mid disc. Renderer reports resize listeners only, confirming watch-only.
