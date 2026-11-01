# No.1037 "The Eyes, Issued"

Study #127 toshitaka-mochizuki, PP198 "What You Wear to See" (border 2015 stereo-camera headsets).

## Concept

Vision as issued equipment. A pair of headset-eyes floats on a black field, facing the viewer: two large dark lenses in a functional rig body, a stereo-camera bar between them. The eyes look at an invisible point that travels a slow seeded scan. Behind them, the world they see renders as a faint fisheye grid whose distortion center is the gaze point itself, so the mediated world bulges and slides with the looking. Periodically the rig calibrates: both lenses snap to center and a thin red crosshair flashes over each lens, then the hunt resumes. Not VR marketing, not cute eyes: dark glass, mechanically hunting, per-pair calibrated and never quite in agreement.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets. Strict palette: field #070708, body #15161A, lenses #0A0B0D, glass highlights #7FD4FF at 0.4 alpha or below, rig #23262B, fisheye field #1A2030 at 0.5 alpha, calibration crosshair #FF3B30. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas; glass is layered flat-alpha arcs and discs.
- Sizing from the Visual Viewport API with resize listeners on visualViewport and window; canvas style width/height pinned in px on every draw. Phone detection via window.screen physical size (min dimension < 700px), aspect h > w*1.15 as fallback only. All geometry derives from u = min(W, H), so the headset scales to fit phone width whole.
- Determinism: frame one is the synchronous draw at fixed phase T0 = 8 s. Everything (scan, warp, lens aim, calibration envelope) is a closed-form function of piece time plus recorded pointer events; the rAF loop (typeof-guarded) runs on a wrapped 48 s clock anchored at load, never on Date.now. The 48 s loop is seamless: all scan and jitter frequencies are integer cycle counts per loop.
- Gaze: an invisible target on a seeded Lissajous-ish scan (2 and 3 cycles per loop plus a 5-cycle wobble). Phases place the gaze left of center at frame one, so both pupils and highlights sit visibly offset toward the left in the still, and the fisheye bulge sits on that side.
- Fisheye field: grid lines drawn as polylines; every sample point is warped radially around the current gaze point with factor f = 0.74 + 0.85 / (1 + d^2/rho^2), rho = 0.34u. Magnification near the gaze, compression far away: the grid spreads where the eyes look and squeezes at the edges. The warp center is the live gaze (scan, drag, or calibration center), so the distortion is the seeing, not decoration.
- Calibration-error model: each lens aims at gaze + err, where err is a per-lens constant offset drawn from the pair seed (up to about 0.016u horizontally, 0.012u vertically, different for each lens, so the two lenses never quite agree) plus a hunting jitter: two sines at integer cycle counts per loop (29-38 and 7-11 cycles), amplitude about 0.004-0.008u, different phases per lens. Pupil offset is the direction from lens center to that lens's own aim point, scaled and clamped; the specular highlight rides further along the same offset and the crescent arc follows it, so each lens converges and diverges slightly differently as the target moves.
- Calibration: envelope snaps at t = 0, 12, 24, 36 s inside the loop (about 0.85 s each): the effective gaze blends to frame center and, past envelope 0.45, a thin red crosshair with a ring is drawn over each lens. Tap forces the same snap immediately.
- Interaction: drag overrides the gaze with the pointer (lenses and warp follow: be seen); on release the gaze drifts back to the scan over 1.4 s via a recorded release event. Tap forces a calibration flash. Double-tap reseeds the pair (new constant errors, jitter phases, scan phases and amplitudes) via an LCG-advanced seed. Events are recorded with piece-time stamps and all state stays a closed-form function of them, including across the loop wrap.
- Audio (lazy, typeof-guarded, created only inside the first pointer gesture; silent and complete in QA): a faint looped-noise wash through a lowpass under everything; a quiet triangle servo whir whose gain and pitch follow gaze speed, updated in the rAF loop; a camera-shutter double-click (two short square blips) on each calibration, periodic or tap-forced. No microphone, no autoplay.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Renders cleanly in silence (no AudioContext, no rAF in the harness).
- Determinism: thumb.png rendered twice and cmp byte-compared identical; duplicate deleted. Re-verified after the tuning round.
- Frame one read-back (t = 8 s): black field with a faint grid visibly warped, lines spreading toward the upper-left where the gaze sits and bowing across the frame; large dark headset centered, two big dark lenses with pupils offset up-left and small cyan highlights riding the same offset, slightly different per lens; rig bar with two camera nubs between the lenses; top strap hint. Mobile: headset whole with margins, same composition.
- Tuning round: the first pass shaded the lenses with two broad alpha discs (0.10/0.08) that read as cartoon eyes, and the pupil offset and warp were too weak to read in a still. Fixes: shading alphas cut to 0.05/0.035 with smaller radii, specular dot shrunk to 0.10R, crescent arc alpha cut to 0.13, pupil offset factor raised from 0.10 to 0.16 of aim distance, warp strengthened (base 0.74, reach 0.85, rho 0.34u). Re-rendered all sizes and re-verified determinism.

## Deviations

- None from the brief. Notes: the calibration crosshair is a drawn mark as specced, not text; the only text in the piece is the `<title>`. The pupil is drawn as a black disc with a rig-tone ring inside the lens glass (a mechanical aperture, not an iris) to keep the tracking readable against the near-black lens at thumbnail size.
