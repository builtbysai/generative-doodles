# Post-Choreography

## Concept

No.1085 is Tatsuya Ishii's 3D Edit seat on 24 Drone Flight made into a pure piece: the edit, not the flight. The upper two-thirds of the square is a stereoscopic pair — the same twelve-drone flock rendered twice, left eye over a blue-slate tint, right eye over a plum tint, the two channels offset by a slight parallax so the pair reads as assembled footage rather than one picture split in half. The footage itself barely moves: the flock holds formation with only small station-keeping drift. All the motion lives in the lower third, an edit timeline with two stacked tracks, REAL and DELUSION, where a thirty-second loop plays through three edits: a hard cut, a two-second morph, and a slow push. The channels obey the timeline — which take leads, and how the two takes blend, is decided by the playhead, not by the drones.

Frame one is fixed at media time 17 seconds, inside the morph band. The playhead stands over the striped band on both tracks, and both channels show the crossfade mid-blend: every orb carries a soft doubled core, the sharp REAL render and the jittered DELUSION render at equal weight.

## Construction

The flock is twelve drones at seeded formation slots, each rendered as a pale orb on a mast over a skeletal X frame with rotor rings — the glyph language of the Nishimoto flock pieces, kept deliberately identical so the footage matches across the study. Every position is a closed-form function of a single media-time parameter: slot plus a small sum-of-sines station-keeping drift. The REAL render samples that function exactly; the DELUSION render adds a seeded per-drone jitter at higher frequencies, the reconstruction shimmer. Each channel draws both layers under its own clip region — DELUSION underneath, REAL on top — with global alpha set by the edit's lead mix, and with the formation center shifted ±0.75% of the square plus a per-drone depth term for the parallax.

The edit is three pure functions of media time. The lead mix is 1 (REAL) until the hard cut at 10 seconds, 0 (DELUSION) until 16, then a smoothstepped crossfade across the two-second morph band back to 1. The push is a second smoothstep: from 24 seconds to the loop point, the formation scales up by twelve percent around each channel's center. The timeline draws the same structure literally — cyan blocks where REAL leads, a magenta block where DELUSION leads, and the morph band as alternating slivers of the two take colors on both tracks, because the band is a blend and the drawing says so. Cut lines and small diamonds mark the three edits; the playhead is a thin light line with a triangular head.

The media clock is closed-form in elapsed time plus recorded scrub events. Unattended, media time advances from the fixed first frame through the thirty-second loop. A drag that starts on the timeline strip captures the playhead: while scrubbing, media time is exactly the pointer's timeline position and both channels show that frame of the edit — scrub into the band and the crossfade follows the finger. On release, an anchor pair (elapsed, media) is recorded and playback resumes from the scrubbed position analytically; nothing is frame-integrated, here or anywhere in the piece. Drags that begin on the footage itself do nothing — the footage is not the interface; the edit is.

The piece is silent; no sound is specced for the editor's desk. The canvas uses Visual Viewport dimensions with resize listeners on both the Visual Viewport and window, pins its CSS pixel size during setup and drawing, and detects phones from the physical screen size with an aspect fallback. The square composition — stereo view above, timeline below — is centered and holds at phone size, with the track labels enlarged slightly on small screens. The animation loop is guarded when requestAnimationFrame is unavailable.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js`:

- Desktop: 1280 x 800, saved as `qa-desktop.png`.
- Mobile: 390 x 844, saved as `qa-mobile.png`.
- Thumbnail: 720 x 720, saved as `thumb.png`.

The desktop frame shows the split view with the blue-slate left channel and plum right channel, each holding the complete twelve-drone formation with pale orbs over dark skeletal frames, the formations offset by the parallax shift and every orb doubled by the mid-morph crossfade. The timeline strip below shows the REAL and DELUSION labels, the cyan and magenta take blocks, the striped morph band with the playhead standing in it, the hard-cut line and marker diamonds. The mobile frame keeps the whole square composition with all twelve drones per channel inside their windows and the labels legible. The only visible text in any render is the specced track labels, REAL and DELUSION.

Determinism was checked by rendering the 720 x 720 frame twice and comparing the files byte for byte. They matched (`cmp` clean). The duplicate was deleted. The synchronous first frame uses a fixed 17-second phase into the media loop, so the first frame — playhead position, crossfade weight, drone positions — does not depend on wall-clock or setup time.

Hygiene checks found no date-derived frame state, external assets, absolute URLs, visible text beyond the document title and the specced track labels, gradients, shadow blur, canvas filters, offscreen canvas creation, element creation, audio, or microphone access.

## Deviations

- One refinement round during QA: the first build's formation was scaled too wide for a half-width channel, and the outer drones clipped at the channel seams. The slot spread and glyph size were reduced so all twelve drones sit complete inside each eye's window; the parallax and crossfade behavior are unchanged.
- The morph band is drawn on both timeline tracks as alternating cyan and magenta slivers rather than as a single blended-color block, since the piece may not use gradients; the slivers state the same fact — two takes at equal weight — in the strip's own graphic terms.
