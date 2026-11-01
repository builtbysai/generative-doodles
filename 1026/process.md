# No.1026 — What the Frame Carries

Study #126 tomoaki-yanagisawa, PP187 "The Mesh Frame".

## Concept

A tall translucent frame stands alone in a dark theater. No dancers: the prop performs by itself, gliding and turning on a slow 50-second loop. Projection-mapped imagery plays across its inner surface and belongs to the frame — when the frame turns, the imagery turns with it, exactly. Every ~17 seconds the mapping breathes: the same imagery swells a few percent past the frame's edges at faint alpha, then is pulled back in. Three imagery modes cycle every ~16 seconds: flowing contour lines, a drifting point field, and slow color washes.

## Construction

- **The lock is structural, not simulated.** There is no offscreen buffer and no second transform to keep in sync. Each frame the canvas transform is set to the frame's own transform (translate to the frame center, rotate, then a shear composed from the tilt parameter). All imagery is a pure function of frame-local coordinates and piece time, drawn under that transform and clipped to the frame's inner rectangle. The spill pass calls the same imagery function with a 1.07 scale and a 0.15 alpha multiplier, still under the same transform. It is therefore impossible for the imagery to lag, drift, or counter-rotate against the frame: there is only one transform.
- **Frame motion is closed-form.** Center sway, rotation, and tilt are sums of sines of loop time (period 50 s, with a 25 s harmonic). The tilt parameter drives a horizontal shear (kx up to ±0.30) and a smaller vertical shear (ky up to ±0.10), reading as perspective skew on the 2D rectangle.
- **Fit pass.** Before drawing, the four local corners are pushed through the shear and rotation analytically; if the rotated bounding box (plus sway) would leave the viewport, the frame is scaled down uniformly until it fits. On desktop and thumb sizes the fit factor is 1 (frame height is exactly 70% of viewport height); on a narrow phone it shrinks the frame so the tilted prop stays whole.
- **Imagery modes** (all seeded with mulberry32, all functions of local coords + t):
  1. Contours: 15 wavy horizontal polylines, y displaced by two seeded sine fields evolving in t, stroked in #7FD4FF with per-line alpha variation.
  2. Points: 130 seeded points drifting rightward in local space with wraparound, gentle vertical sine wander, warm #FFF3D6.
  3. Washes: 9 flat-alpha blobs in #2A1E3F / #0E2A3A drifting on slow seeded orbits over a bare glass field.
- **Members.** The frame body is a full-rect fill of #C9D2DD at 0.25 alpha (the glass), four member bars at the same tone, and inner/outer edge strokes in #FFFFFF at 0.6. The prop is drawn geometry only; no image is loaded.
- **Interaction.** Drag offsets the frame's position and rotation (eased in while dragging, exponential spring-back over ~5 s after release; the imagery follows because it shares the transform). Tap advances the mapping mode. Double-tap reseeds the frame proportions and imagery and restarts the loop clock. Event handlers are pointer + mouse.
- **Audio.** Created lazily inside the first pointer gesture, typeof-guarded. A low sine voice retunes per mode (147 / 196 / 262 Hz) through a lowpass; a short band-passed noise exhale fires when a spill envelope starts. Silent and complete without audio.
- **Determinism.** Frame one is drawn synchronously at load at the fixed offset T0 = 10 s. The rAF loop (typeof-guarded) advances from the performance clock relative to load; no wall-clock date is ever read. All randomness is seeded.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Clean renders, no errors, resize listeners registered.
- Determinism: thumb.png rendered twice and `cmp` byte-compared — identical. Duplicate deleted.
- Read-back, desktop and thumb: tall glassy frame tilted mid-turn in the #070708 void; cyan contour lines flow inside it parallel to its tilt, visibly locked to the frame's angle; thin white member edges at both rects. Frame height 70% of viewport.
- First mobile render clipped the frame's right corners (rotated bounding box wider than 390 px). Fixed with the analytic fit pass described above; re-rendered — the mobile frame is now whole and centered, still tilted, contours still locked.
- Frame one catches mode 0 (contours), no spill (spill windows fall at t mod 17 in [0,3); T0 = 10 is clear of them), matching the brief.

## Deviations

- **No offscreen buffer for the imagery** (the prompt's technical approach suggested rendering imagery to a buffer, then drawing it with the frame's transform). The renderer used for QA provides no offscreen canvas, and computing the imagery directly in local space under the frame transform is strictly stronger: the lock holds by construction rather than by bookkeeping. Recorded as an improvement, not a shortcut.
- **Drag return is an exponential spring** (~5 s to settle) applied to a recorded drag event, rather than integrating spring physics per frame — keeps every frame a closed-form function of time plus the event list, which the determinism gate requires.
