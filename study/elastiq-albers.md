# Elastiq AutoAlbers: Study Notes

**Author:** David Aerne / meodai | **Site:** albers.elastiq.ch (titled "AutoAlbers") | **Doorway:** the last un-followed doorway from the Anatoly Zenkov session; cited next to Zenkov in Golan Levin's color lectures and in student notes alongside poline, parametric pottery, and the Ottosson picker.

**Depth: deep.** The full 21KB app bundle read (module JS, not obfuscated beyond minification), the CSS read, three seeded compositions visually inspected at full resolution in headless Chrome (?seed= param gives deterministic compositions), and the core strip-fold plus goo-connector mechanic re-implemented fresh in plain canvas and visually inspected at t=0.05, 0.5, 0.95.

## What it is

A contemplative fullscreen piece: 4 to 10 horizontal palette strips that start as near-flat stacked bands, then over about two seconds fold, tilt, and flow into one another until they read as a single monolithic ribbon form. Then the composition cuts and a new one begins. The page background is set from a palette color, a heavily blurred copy of the artwork (70px CSS blur) floats behind as ambient glow, the whole canvas stack is CSS-rotated (20% of the time by a random angle, otherwise 0/90/180/270), and the top-right "AA" button slides in the artist's statement. Keyboard: n for a new composition, space to pause, arrows to scrub time and fold progress, f for fullscreen. Colors render in Display-P3 when the screen supports it, via canvas 2d `colorSpace: "display-p3"` and CSS `oklch()`.

## The composition engine, from the source

**Palette (`ot` + `at`).** Picks e hues spread around the wheel with a minimum 60-degree gap, shuffles them, then maps palette index to lightness (a ramp from random min to random max, 50% chance reversed) and chroma (ramp scaled by 0.4). If more colors are wanted than hues, the extra ones are interpolated in oklab between neighbors via `color-mix()`, so the ramp stays continuous. Same DNA as poline's anchor idea, tuned for strip stacks rather than wheels.

**Strips.** Each strip gets a canvas transform built like this: translate to center, scale 0.75, translate to its row, add per-strip noise offsets (simplex noise over time plus a per-strip random in [-1, 1]), then rotate by `(noise + rnd1) * foldDeg * t`, where t is the coalesce progress 0 to 1 and foldDeg is 5, 15, or 25 degrees (5 most of the time). So at t=0 the strips are nearly flat bands; at t=1 each carries its own tilt and drift and they nest into a folded stack.

**Goo connectors (the signature).** When `gooey` is true (50% of compositions), the engine computes the true screen-space corners of every strip by applying each strip's matrix, finds where each strip's bottom edge crosses the next strip's top edge with a line-intersection test, and draws a connector: a quad from strip u's bottom edge to strip u+1's top edge whose sides are cubic beziers with control points pulled along the edges by `gooIntensity` (0.01 to 0.5). The connector is filled with a linear gradient from color u to color u+1. When gooey is false, strips just overlap hard-edged, or 5% of the time the strips are drawn with `multiply` composite and no connectors at all.

**The coalesce loop.** Progress eases 0 toward 0.9 at `(1-G)*0.02` per frame (about two seconds at 60fps), then the composition resets and a new random one is generated. There is also a slow global drift: a time counter advances every frame and, in 10% of compositions, rotates every color's hue over time; arrow keys scrub this drift and the fold progress by hand.

**Variant flags (all in the generator).** 11% dark background (#202126); 3% "emitting background" where the copy canvas shows at 50px blur and 60% opacity as a halo; ~87% "sharp" where a verbatim copy of the base canvas is displayed on top (visually redundant, probably scaffolding for a removed effect); 30% vertical strip squash by `0.1 + (0.1+chroma)^lightness`; 20% extra horizontal noise drift; 10% the blurred ambient layer hidden; 5% of dark compositions get the page background tinted to a palette color hue-shifted 180 degrees.

**Dead code, honestly noted.** `tooHigh = !gooey && h() < 0` can never be true (the seeded RNG returns [0,1)), so the extra tall-rect drawing branch is a disabled experiment left in the bundle. Same for the intersection debug drawing (`st = false`) and a never-appended debug canvas. The mask canvas's `source-out` composite against a full-opaque image is a no-op; the "mask" is effectively just a duplicate layer.

## What makes it sing

The fold progress t is the whole piece: a single scalar that takes a static palette stack and turns it into an event. The goo connectors sell it, because the gradient across each join makes the eye read one continuous ribbon instead of stacked bars, and the per-strip noise offsets keep it from ever looking mechanical. The palette recipe is doing quiet work too: the 60-degree minimum hue gap plus shuffled order means even a 4-color composition never sits in one hue neighborhood, and the lightness ramp gives the stack its top-to-bottom read.

## Overdone / avoid

- Two seconds per composition is fast for "contemplative"; several of my seeded captures cut mid-thought. The pacing wants a longer dwell at the monolith state before the reset.
- The ambient blurred copy plus the halo variant plus the display-P3 vibrancy can stack into pure glow soup on wide-gamut screens; the strongest captures were the ones where the fx layer was hidden.
- The whole-stack CSS rotation is a cheap trick that works (the 90-degree captures read as a different piece), but it is doing compositional work the strips themselves could do.

## Derived, not copied

The portable recipes: (1) one progress scalar driving a static stack into a folded form, with per-element noise offsets so the fold never looks synchronized; (2) connectors drawn in true screen space after the transforms, with a gradient across the join, which is what turns bars into ribbon; (3) the palette recipe of hue-spread plus shuffled order plus lightness ramp, which guarantees variety without mud; (4) seeded compositions with a `?seed=` param so any state is reproducible and inspectable. My local re-render confirmed the mechanic and showed the knobs: foldDeg at 15 with gooIntensity 0.22 gives gentle necks; push both and the ribbons pinch into wasp waists.
