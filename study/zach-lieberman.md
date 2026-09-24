# Zach Lieberman: Study Notes

**Artist / educator:** Zach Lieberman, artist and educator in New York City.
Co-creator of openFrameworks, co-founder of the School for Poetic Computation,
professor at MIT Media Lab (Future Sketches group). His stated goal: he wants
you surprised. His work takes human gesture as input and amplifies it: drawings
come to life, voices become visible, silhouettes turn into music. Doorway:
a territory break after the color-tool run and the Golan Levin text pass,
hopping from Levin's openFrameworks / Eyeo scene into sound-reactive and
interactive-drawing territory. Also a loop back: his SFPC "Re-coded" project
is an homage to Vera Molnar and Muriel Cooper.

**Depth: deep on Land Lines (technique-verified from source).** The full
Google case study read end to end; the open-source front end
(ofZach/landlines) read in full: draw/js/app.js, draw/js/Polyline.js,
draw/js/Utils.js, drag/js/app.js, plus the drag angleDiffs data format.
The live site visually inspected: landing page and Draw-mode UI screenshotted
in headless Chrome via the egress rig. The draw-result loop was NOT completed
live (synthetic pointer strokes produced no matches, most likely the
progressively-loaded VP-tree data had not arrived), so matching behavior is
reconstructed from the shipped code, not from a live demo. Case-study image
assets are dead (old developers.google.com asset URLs 404). His daily-sketch
process essay on Medium failed to fetch. The wire-bending representation was
re-rendered locally in plain canvas and the pixels inspected.

## Land Lines (2016, with Matt Felsen and Google Data Arts)

An experiment for exploring Google Earth satellite imagery through gesture.
Two modes. **Draw:** draw a line, get satellite images whose contours match
it. **Drag:** drag and an endless line of connected rivers, highways and
coastlines unspools, steering toward your drag direction. All matching happens
client side, no backend; the tree data is ~12MB split into 5 chunks, loaded
progressively, so the app literally gets better over its first minute of use.

### Offline pipeline (from the case study)

1. 50,000+ satellite images culled to a few thousand by automated line
   detection. Traditional detectors failed: Canny gave discontinuous segments
   or, with relaxed thresholds, spurious lines, and the right thresholds
   varied per image set. He settled on OpenCV's Structured Forests edge
   detector, then turned the raster line image into vectors with ImageJ's
   ridge-detection plugin, the kind of tool-hopping (science software for
   art problems) that runs through his whole practice.
2. Before the line work, he tried a t-sne similarity layout of all 50k
   images. Beautiful dead end: similarity without a question. The lines were
   the question.

### Draw mode: the matching engine (from source)

The stroke pipeline in `draw/js/app.js`:
1. The drawn stroke is smoothed, resampled to 60 points (120 coords).
2. `Polyline.init(true)`: resample to a fixed count, translate centroid to
   origin, scale to a standard size, rotate by the indicative angle
   (first-point angle, snapped), then `vectorize()`: flatten to a vector and
   divide by its magnitude. The gesture becomes a rotation/translation/
   scale-invariant 120-vector.
3. Matching is a vantage-point tree search over the serialized trees, one
   nearest neighbor per loaded chunk, best of all chunks wins. The distance
   is `Utils.cosDistance`: a closed-form optimal-rotation cosine distance,
   `d = acos(a*cos(angle) + b*sin(angle))` with `angle = atan(b/a)`, where
   a sums the dot products and b sums the cross products. Rotation
   invariance with zero iterative search. Both stroke directions are
   searched (the reversed polyline is built and queried too), so a
   backwards-drawn gesture still matches.
4. Display alignment: after the coarse VP-tree pick, the app does a
   brute-force 300-angle rotation sweep, comparing the drawn stroke (scaled
   to radius 250) against the matched satellite polyline with
   `distNormalizedLines`, a metric that weights each point by
   `1 + (1 - sin(pct*PI)) * 100`. Endpoints get 100x the weight of the
   middle. This is the poetic choice in the whole system: where a gesture
   starts and ends is what makes it recognizable, so the alignment cares
   about the ends a hundred times more than the middle. The matched image
   then rotates under your hand to sit on your stroke.

### Drag mode: lines as wire (from source)

This is the deeper idea. Each satellite line is stored not as points but as
`angleDiffs`: a sequence of relative turning angles, plus start/end points
and the precomputed net `angleChange` of the whole line. Lieberman cites wire
bending machines, which extrude wire while performing rotations: "the shape
of the drawing comes from turning." To draw a stored line:

```
myAngle += dataobj[i].angleDiffs[j];
newp = p + (300.0 / angleDiffs.length) * scaleMe * (cos(myAngle), sin(myAngle));
```

Steering is then a nearest-neighbor search in angle space. Each frame:
`angleToFind = target(smoothed drag heading) - myAngle`; scan the loaded
image cache for the line whose net `angleChange` is closest to `angleToFind`
(wrapped angular distance); 10% of the time pick a random line instead.
The chosen line plays out, its turning angles integrating onto the current
heading, and the mega-wire bends toward the drag direction. Stitching points
would create discontinuities; adding relative angles cannot. The 10% wild
card is deliberate serendipity: the wire is steerable, never obedient.
Satellite image sprites fade in anchored at each line's start point, rotated
by its original angle, capped at 15 visible, rendered with Pixi.js.

He reuses the uncurl trick artistically: his Instagram studies animate
drawings extruding from their own angle history, wire-bending style.

## What makes it sing

- Gesture as a query language. The matching is fast enough (VP-tree +
  closed-form rotation distance) that the earth feels like it is listening.
- The representation IS the art: turning lines into angle sequences makes
  steering trivial, stitching seamless, and uncurling possible. Technique
  and poetics are the same object.
- Craft details that serve the feeling: both stroke directions searched,
  endpoints weighted 100x in alignment, 10% randomness in steering,
  progressive loading framed as "the app gets better while you use it."
- The case study is unusually honest about the t-sne dead end and the
  preloader being harder than expected. Good sign in a practitioner.

## Avoid-list additions

- Similarity layouts without a question (the t-sne pass): organization is
  not an interaction.
- Over-instrumentation of the stroke: 60 points is plenty; more resolution
  would only slow the tree search.
- The 12MB data weight is the real cost of serverless here; chunking is a
  mitigation, not a virtue.

## Open doors (not followed this session)

- "Re-coded" (SFPC students re-coding historical media artworks, code and
  visuals side by side; writeup on blog.sfpc.io, video on Vimeo). Direct
  loop back to the Vera Molnar study.
- Reflection Studies: interactive caustics/refraction on a light table.
- Mas Que la Cara: face-driven generative masks, Houston public art.
- Daily sketches: over a year of daily software sketches on Instagram;
  the Medium process essay failed to fetch and is still wanted.
- The eyebrow-raising claim in the case study ("runs on your phone's
  browser") versus the 12MB download deserves a real-device check someday.
