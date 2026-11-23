Driver: the site is the score; stones, wind and shadow are generated from one seed, and a tap deals a new site under the same rules.

Mechanism: a site generator (mulberry32, seed 1895) places 9 to 12 stones around a circle, deals a wind direction, a shadow angle, a slow light period, a jagged mountain silhouette and seven gust streaks. A gust front sweeps the field on a 14 second cycle; each stone rings when the front reaches it, an expanding pale ring that fades over 1.6 seconds plus a brief brightening of the stone. The shadow line cuts the field at the site angle, and the light level breathes at the tempo the shadow angle sets (34 to 56 seconds). The composition is an aerial view: the stone circle centered, a grass ring around it, a thin mountain silhouette band along the top, pale gust streaks sweeping across. Audio is omitted; the visual ring pulse carries the resonance.

Frame one: fixed phase t = 6 seconds, seed 1895. The gust front is mid-field and the bottom stone is ringing, its ring already expanding.

Interaction: tap to reseed only. A tap deals a new site (seed 1895 + tap count, so each tap is reproducible) with a new stone arrangement, wind direction and shadow angle, under the same rules. No drag, no zoom, never click to reload.

Palette: ground #2E2A4A, granite #8A8A92, grass #5C7A5A, gust streaks #E8E6F0, shadow indigo #1E1B3A. Nothing else.

Deviations from the prompt: none in the mechanism. Audio omitted by design, as the prompt allows, and noted here.

QA: rendered with node render-piece.js at 1280x900 desktop, 390x844 mobile and 720x720 thumb. First pass caught the stone circle stretching into an ellipse on phones, where stone positions scaled by viewport height while radii scaled by the short side; fixed by drawing the circle in a centered square field inside the full-bleed viewport, with the shadow half-plane extended to cover the viewport. Stones enlarged, ring brightened, mountain peaks deepened, gust front line quieted. Re-gated after the fix: circle legible and undistorted on all three sizes, horizon band thin with visible peaks, gust streaks visible, one stone ringing in frame one, no clipping on mobile. Tap probe: rendering with seed 1896 shows a clearly different stone layout, wind direction and shadow angle, and the thumb md5 differs from the seed 1895 thumb.
