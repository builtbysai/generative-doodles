# No.790 "The Banner"

EXPANSION #96 daniel-buren, prompt block PP7 "The Banner" (verified verbatim from TASKS.md).

## Concept

Buren's Peinture-Sculpture (1971): a giant double-sided striped banner hung across the Guggenheim rotunda, dividing the space in two, removed the day before the opening after complaints. Here the banner hangs from the top edge of the frame to 85% of its height and splits the frame into two background halves that differ only in tone (left #E4DED2, warmer/lighter; right #D6D0C2, cooler/darker), so the cloth is the only event. One face carries white/red stripes, the far face white/blue, at the 8.7 cm module (one stripe pair = frame height / 34). Watch-only: on a seamless 36 s loop the banner sways and turns, and at the edge-on moment the two faces trade. It hangs, it never stands: the hem stays clear of the bottom edge, and even at the center crossing it is still rippling, never frozen.

## Construction

Single self-contained index.html, canvas 2D, no external assets. Canvas is sized from the Visual Viewport API with resize listeners on both visualViewport and window; the canvas element's CSS size is pinned in px inside draw() every frame. Phone detection uses window.screen physical size (min dimension < 700 px) with the h > w*1.15 aspect as fallback only; the banner is laid out in frame fractions, so its hang proportions hold at any size, and the page ground is the left-half tone #E4DED2.

The banner is drawn as a stack of horizontal stripe quads. Width tapers slightly from top (half-width 0.240 W) to hem (0.205 W) for the hanging perspective. Two closed-form deformations ride on the silhouette:

- Pendulum sway: a shear that is zero at the top rail and grows linearly to +-0.045 W at the hem, driven by sin(phase). This gives the +-12 degree swing read without rotating the attachment off the top edge.
- Cloth ripple: two sine waves along the height (2.0 and 3.7 cycles over the hang, amplitudes 0.0040 W and 0.0025 W, phases advancing at 2x and -3x the loop phase), so the edges breathe continuously.

Face trade function: with p = 2*pi*t/36, the virtual facing is turn = cos(p). The apparent half-width scales by max(|turn|, 0.045), so at the quarter period the banner collapses to a thin sliver but never vanishes. The stripe color is mix(RED, BLUE, bw) where bw = smoothstep(clamp(0.5 - 0.5*turn/0.28)), i.e. the crossfade runs over |turn| < 0.28: pure red face while the red side fronts us, an even red-blue mix exactly at edge-on, pure blue once the far face has opened. White stripes stay #F4F1EA on both faces. Because the sway is a pure sine and the facing a pure cosine of the same phase, the 36 s loop is exact: it passes through center at t = 0, 18, 36 with no cut or jump.

Frame one is the synchronous draw at t = 0: sway zero, turn = 1, red face fully shown. All geometry and color are closed-form functions of the loop phase; the rAF loop (typeof-guarded) only advances t from its own start timestamp. No clock reads shape the drawing, no randomness is used at all, no audio, no interaction handlers. An inert T_OFF constant (0 in the shipped file) exists only so QA can render later loop phases headlessly from a throwaway copy.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js: qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720).
- Determinism: thumb.png rendered twice and compared with cmp: byte-identical. The duplicate was deleted.
- Frame one read back at all three sizes: red/white banner hanging center from the top edge, hem clear of the bottom, two background halves in close tones, ripple visible in the silhouette, nothing clipped on mobile.
- Pixel audit of the desktop frame (center column scan): stripe runs are a uniform 12-13 px for both white and colored stripes; the single 10 px run is the final stripe clipped by the hem. The last banner run ends at y = 765 of 900, exactly the specced 0.85 hang. An apparently thicker mid-height stripe in the scaled read-back view was checked and is a display-scaling artifact, not a geometry defect.
- Face trade verified from throwaway copies with the phase offset set to 9 s and 18 s (copies and renders deleted after inspection): at 9 s (quarter period) the banner is a narrow sliver showing the half-and-half red-blue mix, hem swung widest by the pendulum shear; at 18 s (half period) the blue face is fully open at full width, centered.

## Deviations

- The prompt's "+-12 degrees rotation" is realized as the combination of width foreshortening (cosine facing) and hem shear rather than a literal rigid rotation of the quad: a flat 2D quad cannot rotate in depth, and pinning the top edge is what keeps the banner hung rather than floating. The visible behavior (sway, turn, face trade at edge-on) matches the prompt.
- The prompt describes the sway as "damped to near-stillness" but also demands a seamless loop with no cut; a true damped sine cannot loop, so the sway is a pure sine of constant amplitude, per the brief's instruction to use a pure sine sway so the loop is exact. The ripple keeps it from ever reading as frozen at the center crossing.
