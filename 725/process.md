# The Void Blooms — No.725

EXPANSION #88 okazzsp, prompt block 6 "The Void Blooms".

## Concept

Negative-space figuration. A dark field fills edge to edge with flat
cartoon daisies in neon pop colors, and the flowers cover everything
except one clean silhouette: a simple rounded bear head (two round ears,
one round head, the KUMALEON bear) that stays bare dark ground. The
figure is the hole. No skull, no face inside the silhouette, no shading:
flat superflat flowers only, and the void stays empty.

The loop runs about 45 seconds. Flowers pop in ring by ring from the
silhouette outward, each scaling from zero to full with a slight
overshoot. The full field holds for about 12 seconds while a few flowers
swap petal colors, then everything fades to ground and the cycle
restarts. Watch-only; a tap reseeds with a new color assignment and size
jitter. Frame one is the ground with the first ring of flowers around
the void already mid-pop, so the bear outline is the first thing traced.

Palette, strict: ground #101014; petals #FF5DA2, #FFD23F, #3FA7FF,
#5FD35F, #FF8C42, #9B5DE5; centers #FFFFFF. Nothing else.

## Construction

Single self-contained index.html, canvas 2D, no external assets, no
audio, no text beyond the title. Layout is computed in design units
(1 unit = min(canvas width, height), origin at canvas center), so the
composition survives any aspect.

Mask placement method. The silhouette is a mask made of three circles:
the head (r 0.175, centered at 58% of frame height) and two ears
(r 0.078, up and out from the head center). Candidate flowers are laid
out by rejection sampling on a jittered grid (spacing 0.037 units,
jitter plus or minus 0.011, seeded by mulberry32). For each candidate
the signed distance to the mask is the minimum over the three circles
of (center distance minus circle radius). A flower is kept only if that
distance exceeds 0.45 times its own radius, so the center plus a margin
clears the mask and no petal mass intrudes into the void. Placements
are precomputed per seed (per epoch); a tap starts a new epoch and
regenerates them.

Size-class edge rule. Each kept flower takes one of three size classes
from its signed distance to the mask boundary: under 0.055 units from
the edge, small (base radius 0.0175); under 0.15, medium (0.027);
beyond, large (0.041); each radius then jittered by a seeded factor of
0.85 to 1.15. Small flowers pack densely along the outline so the bear
reads crisply; large flowers fill the far field. Flowers are drawn
large first, small last, so the crisp edge flowers sit on top. Each
daisy is 6 to 8 rounded petals (ellipses) around a white center, all
flat fills.

Motion model. Everything is a closed-form function of loop time from
the epoch seed; nothing is integrated. Bloom delay is keyed to each
flower's distance from the silhouette centroid, normalized over the
placed flowers (the void holds no flowers, so raw distance never starts
at zero): the nearest ring starts at delay about minus 0.6 s, already
mid-pop at t = 0, and the far field starts up to about 17 s in. Pop-in
is a 1.5 s back-out ease peaking near 1.1 scale. Hold swaps: about 5.5%
of flowers carry a seeded swap time between 20.5 and 30 s; at the swap
the flower dips to 0.55 scale over 0.55 s and its petal color flips at
the bottom of the dip. Fade runs 31 to 38 s as a global smoothstep
alpha ramp with a slight shrink; 38 to 45 s is bare ground before the
loop restarts.

House rules honored: canvas sized from the Visual Viewport API with
resize listeners on visualViewport and window; canvas style width and
height pinned in px inside draw(); phone detection via window.screen
minimum dimension under 700 px with the tall-aspect fallback only;
silhouette stays centered on phones because the layout is defined
relative to frame height at every aspect. Frame one is the synchronous
draw at loop t = 0, never derived from Date.now; the animation clock is
offset plus elapsed since load, and requestAnimationFrame is
typeof-guarded (the QA renderer has no rAF, no AudioContext, no
offscreen canvas, no ctx.filter; none are used).

Deviations: none from the prompt. Two implementation notes. (1) The
piece carries the series' inert QA hook: a ?seed=tNN query renders the
frame at NN seconds into the loop; it has no effect in the gallery,
where the query string is empty. (2) The prompt's hold is specified as
about 12 s; the loop allocates bloom to about 19 s (delay spread plus
pop tail), hold 19 to 31 s with swaps inside it, fade 31 to 38 s, and
ground rest to 45 s, matching the specified timings within the stated
approximations.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas, the
piece's own script).

- qa-desktop.png (1280x900, t = 0): dark ground; the first ring of
  small daisies is mid-pop around the bear-head position (centered,
  about 58% of frame height), tracing the void's outline at small
  scale. As specced for frame one.
- qa-mobile.png (390x844, t = 0): same first-ring state; the silhouette
  position stays centered in the tall frame, ring flowers visible
  around it, nothing clipped.
- thumb.png (720x720, t = 0): same state at thumbnail size.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate render was deleted.
- Forced full-bloom check: throwaway render at seed t20 (1280x900)
  showed the complete field: dense neon daisies edge to edge in all six
  petal tones, and the bear head (round head, two round ears) clean,
  empty, and immediately readable at center, with the small size class
  lining the outline. The throwaway render was read, then deleted.
- Fix during QA: the first frame-one render came back as pure ground.
  Bloom delay had been keyed to raw distance from the silhouette
  centroid, which never falls below the head radius, so even the
  nearest ring started about 2.5 s late. Delays are now normalized over
  the placed flowers' distance range; frame one shows the ring mid-pop
  as specced, and all renders were redone. Placement, palette, and the
  full-bloom state were unchanged by the fix (the t20 check render is
  byte-identical before and after, since only delays moved).
