# №1978 Caustics

Driver: layered moving ridged noise projected as hot gold caustic filaments across a pale submerged body and deep green water, the light doing all the moving while the body stays still.

FIRST_T: 9 seconds into a 60 second cycle. Every time driven value derives from the virtual clock t, so frame one is a pure function of FIRST_T. No wall clock, no unseeded randomness at frame one. Static layout comes from a mulberry32 PRNG seeded 1978.

Cycle length: 60 seconds. The caustic field crawls on that cycle and never repeats a path within it.

Interaction: watch-only. No pointer handlers change the piece. Hint reads "Watch the light move."

Probe results: rendered at t=9 (FIRST_T) and t=29 (FIRST_T+20 s) at 720x720. The two frames visibly differ: the caustic web is denser in different regions, filaments have crawled and split into new arrangements, and the bright clusters on the body have moved. md5 of the t=9 render is 7706f626dbc29d72c917894b484152da; md5 of the t=29 render is d2862baacb01eb876fa413adf1d2b176. thumb.png is byte-identical to a fresh 720x720 render at t=9.

Deviations from the prompt: none material. No audio is implied by the prompt and none is present. The body is an abstract cropped form with no face and no full figure, per the prompt. The gallery date 2007 · 06 · 12 appears under the title.

Known warts: the caustic web reads slightly scribbly at full density, with a few thin tangles that look more like threads than light, especially on the body at the upper left. The surface shimmer bands near the top are still faintly regular at desktop size. The body contour is a gentle S curve and could read as a flat slab at a quick glance, though the shading band along its edge separates it from the water.
