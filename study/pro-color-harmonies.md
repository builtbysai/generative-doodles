# Pro Color Harmonies: Study Notes

**Author:** meodai (David Aerne) | **Repo:** github.com/meodai/pro-color-harmonies (MIT) | **Demo:** meodai.github.io/pro-color-harmonies/ | **Doorway:** the last un-followed doorway from the Anatoly Zenkov session; same author as poline, RampenSau, FarbVelo.

**Depth: deep.** Full README read, the live demo visually inspected full-page via headless Chrome, the actual generator source read (modifiers.ts, enhancer.ts, color.ts verbatim), and the triadic/triangle recipe plus all four modifiers re-implemented fresh in plain canvas (with my own OKLCH to sRGB) and visually inspected side by side.

## What it is

A dependency-free TypeScript palette library built on the observation that naive harmonies (complementary = hue + 180, triadic = +120/+240 in HSL/HSV) often look unbalanced or muddy, especially in the yellow/orange/green regions. Everything happens in OKLCH. It leans on the "magic numbers" from Ryan Feigenbaum's (royalfig) color-palette-generator research. The demo page is a clean Iosevka-set editor: base color picker (wide gamut via color(display-p3 ...) or oklch() input), color count, harmony selector with geometric glyphs, four styles, Random/Export, and two XY pads for the four modifiers. The page background is a huge blurred render of the current palette, and the code example section shows how to reproduce it.

## The core ideas

**Six harmony types, four styles.** Types: analogous, complementary, triadic, tetradic, splitComplementary, tintsShades. Styles are not presets, they are different logics: `square` is the mathematical one (strict angles), `triangle` is perceptual (bends angles so red/orange/yellow look balanced), `circle` is emotional (hue/lightness bands, "fiery vs tranquil" story shifts), `diamond` is luminosity-aware (driven by lightness and chroma, so dark or light bases still give usable UI palettes). Every generator returns exactly 6 base colors; fewer colors are sampled evenly, more are interpolated between the 6.

**Adaptive thresholds with blended strategies.** A dark base (L < 0.3) gets a different generation strategy than a light base (L > 0.7), but near a threshold the library computes BOTH strategies and interpolates, so dragging a slider never snaps the palette. This is the fix for the classic threshold-jump problem and it is directly reusable in generative work: any time you branch behavior on a continuous parameter, blend the two branches near the boundary.

**Named mud zones.** `avoidMuddyZones` carries three explicit zones with names: `brown-olive` (hue 25-65), `sick-green` (100-140), `corpse-cyan` (180-200). Escape rule: muted colors (chroma < 0.15) get pushed toward sophisticated neutrals (chroma halved); saturated ones are shoved past the nearest zone edge with a 10-degree margin and a 1.1x chroma boost to climb out of the mud. Honest naming, mechanical rule.

**Chroma narratives.** Per harmony type and style there is a hand-tuned 6-value chroma multiplier pattern, e.g. triadic/triangle gets `[0.7, 1.0, 0.85, 1.0, 0.75, 0.6]` ("Natural visual rhythm") while complementary/circle gets `[1.0, 1.1, 0.8, 0.6, 0.9, 0.5]` ("Emotional contrast"). The palette is not six equal citizens, it has a saturation rhythm. There is also a role system for the circle style: protagonist, deuteragonist, supporting, accent, background, neutral, each with a chroma multiplier, lightness shift, and a presence weight (how often it should appear). Breathing room: optional alternating lightness shifts so neighbors separate.

**The four modifiers, in the actual source.** All take intensity -1 to 1:
- `sine`: fundamental + 0.3-weighted second harmonic across the palette index, hue shift up to +-45 degrees, lightness ripple at 1.5x frequency. The gentle one.
- `wave`: feeds the palette index (plus a sine seed) through 8 iterations of the logistic map x = r*x*(1-x) with r = 2.0 + m*1.2. Chaotic but deterministic and smooth because the output is averaged (x*0.85 + 0.075) before being mapped to hue/lightness/chroma shifts. My re-render showed it is surprisingly mild at 0.6 because the smoothed output centers near 0.5.
- `zap`: spiral modulation. Position along the palette becomes an angle (tightness 0.2 + |m|) and sqrt-scaled radius; hue shift = cos(angle)*radius*90*m, lightness and chroma get the sine component. By far the most dramatic: in my re-render at 0.6 it turned ochre into mauve, teal into sage and then blue. The energetic one, as advertised.
- `block`: triangular wave (asin(sin()) form, softened by 1-0.3*|x|) for stepped lightness/hue/chroma bands. At 6 colors the frequency floor is 1, so it reads as a soft alternate-band rhythm, stronger with longer palettes.

**Polish pass.** A final sweep boosts chroma in mid-tones and warms highlights, "mimicking how painters adjust colors for vibrancy". Plus gamut clamping that reduces chroma while preserving lightness and hue, targeting sRGB or Display P3.

## What makes it sing

The honesty about where naive theory fails (yellow/orange/green mud), and the way taste is encoded as data: chroma narrative patterns, named mud zones, style-dependent angle bends. Nothing here is a neural net or a vibe; it is arithmetic plus observed perceptual facts. The threshold-blending trick is the most portable idea in the file.

## Overdone / avoid

- The demo's own default look is fine, but every palette it emits has the same 6-color rhythmic shape, which gets recognizable if you use it raw. The modifiers exist for a reason; use them.
- The `square` style is just math with a nicer coat. Do not mistake it for the perceptual work.
- In my re-render the wave modifier at moderate intensity barely moves the palette; if you want chaos, push it hard or it reads as sine.

## Derived, not copied

The portable recipes: (1) branch on continuous parameters, but blend branches near the boundary; (2) name your mud zones and write explicit escape rules instead of hoping; (3) give a palette a chroma rhythm, not equal saturation everywhere; (4) spiral-modulate a palette for energy, sine-modulate for calm.
