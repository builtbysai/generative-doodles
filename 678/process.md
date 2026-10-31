# No.678 — Del Mapocho al Plomo

EXPANSION #82 clemente-mckay, prompt block 6. Build and QA only; not pushed.

## Concept

Clemente McKay's HUELLA ANDINA cycle — the Mapocho valley to Cerro El Plomo at 5400 m — as a sounded ascent. One line, the river itself, traverses the frame from lower-left to upper-right: a meander across the valley floor, then switchbacks up a stone face to a snow-crowned peak with a small sun disc above it. Along the line sit the marks of the route: paired footstep dots, two woven textile bands at crossings, and clusters of small clay offering figurines at three waypoints (source, mid, summit). The only text is the three altitude marks the prompt specifies: 0 m, 2700 m, 5400 m.

Dragging anywhere projects the pointer onto the line and climbs; the altitude drives a thin, airy soundscape. Release and the place holds where it was left, then the marker drifts slowly back to the valley over about twenty seconds. There is no progress bar, no summit celebration: the ascent is contemplative, the sound stays thin.

## Construction

**Path / altitude mapping.** The traverse is a Catmull-Rom spline through 23 authored waypoints (composition space, y down), resampled to 561 points uniform in arc length. The normalized arc-length parameter s ∈ [0,1] IS the altitude parameter: 0 m at the source, 5400 m at the summit, read linearly (2700 m sits at s = 0.5). Pointer position is converted to composition space and projected onto the path by a coarse nearest-sample scan (every 2nd of the 561 points) plus a fine pass over the neighbouring samples; the marker is drawn at the projected s. The line's colour follows the terrain it crosses: river blue on the meander, blending to stone through the climb, whitening into snow at the top.

**Terrain.** A seeded ridge silhouette (mulberry32, seed 678001) rises with the route; the slope is filled with stone at low alpha over the dusk sky, a soft green wash (30 overlapping feathered strips) lies over the valley stretch, and a snow cap hugs the crest near the peak with tongues reaching down the face. The composition is a centred square field (scale = min(W,H)) refit to any frame; phones get the same centred composition letterboxed on the dusk ground.

**Ascent state.** Altitude is a pure function of recorded pointer events on the anchored performance clock: `drag` tracks the projection live; on release the state becomes `hold` — constant for 2.5 s, then a smoothstep drift back to 0 over 20 s. Frame one is an explicit synchronous draw at t = 0 with altitude forced to 0.

**Soundscape layers (gesture-gated).** The AudioContext is created lazily inside the first pointerdown, fully typeof-guarded and try/caught; before that gesture, and in any environment without WebAudio, the piece runs silently and completely. One shared 2 s white-noise loop feeds three filtered layers whose gains follow altitude with setTargetAtTime smoothing: river hiss (lowpass 420 Hz, 0.055 max, fading out by mid-heights), mid wind (bandpass 520 Hz, peaking across the middle band), and summit wind (bandpass sweeping 1600→2300 Hz, 0.026 max, thin). Discrete tones: passing an offering waypoint (rising edge of a 0.012 proximity window) fires one soft breath tone — sine plus band-passed breath noise, 1.6 s, peak 0.055 — its pitch picked from a pentatonic set (D E G A C) by a seeded generator keyed to the waypoint and second. In the valley (altitude < 0.22), a seeded per-7-second-window schedule occasionally adds a very quiet bird chirp (peak 0.018). Master gain 0.9 into the destination; the loudest moment of the piece is intentionally quiet.

**Determinism.** No Date.now anywhere; all animation (sun pulse, marker glow) is a function of the anchored clock value passed into draw(). The rAF loop is typeof-guarded; the QA renderer (no rAF, no AudioContext) draws frame one synchronously and stops. Math.random appears only inside lazy audio code (noise buffers, chirp jitter) and can never affect a pixel. A `?seed=t<seconds>` hook forces a fixed frame time for headless state checks, with altitude held at 0.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png). Thumb rendered twice and `cmp` byte-compared: identical (second render deleted). Re-verified after each fix round below.
- Desktop read-back: dusk field, river meander in blue across the green valley with source figurines and the marker at 0 m, switchbacks climbing the stone face past the grey textile band, the mid waypoint cluster (three figurines) at 2700 m, the striped textile band, snowfield and crest, summit figurines, and the sun disc with halo fully visible above the peak; 5400 m legible. Nothing clipped.
- Mobile read-back: the centred composition letterboxes on the dusk ground; the full traverse, both textiles, all three figurine clusters, all three altitude marks, and the sun remain in frame; nothing clipped.
- Fix rounds during QA: (1) the first pass drew the valley as a hard-edged green rectangle and the snow as a floating slab that covered the sun; the valley became a feathered overlapping-strip wash and the cap was rebuilt to hug the ridge crest with snow tongues; (2) the sun disc was re-seated up-left of the path's end so it crowns the peak in the sky instead of hiding behind the snowfield.

## Deviations

- The sun disc sits in the sky just above the summit rather than centred exactly on the path's final point, and the snow cap is terrain decoration the path passes beside at the very top; both are compositional readings of "the peak crowned with a small sun disc" that keep the disc visible at every size.
- Altitude marks are placed just below their path points (the 5400 m mark also nudged left) so the line never strikes through the words.
- The prompt says the soundscape "holds where you left it, slowly drifting back": the hold is a fixed 2.5 s beat before the 20 s drift begins.
- Bird-tone timing uses a seeded schedule on the anchored clock instead of unseeded chance, keeping the piece's determinism discipline; the sounds themselves only exist after a visitor gesture, per browser autoplay policy.
