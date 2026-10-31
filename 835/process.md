# No.835 "Between the Strings"

EXPANSION #102 john-cale, PP4 "Paper Clips" (title suggestion shipped as the title). Cale's "All Tomorrow's Parties" session trick: paper clips wedged between piano strings for an orchestral ring, rebuilt as a prepared-instrument generator.

## Concept

Nine horizontal strings span an ivory field, all sounding one pitch class, drawn as a phase-locked family of shallow sine waves. Paper clips fall slowly from the top on the piece's own schedule and land on strings. Each landing perturbs its string: a kink travels away from the clip and a metallic shimmer settles around it, so the field slowly accumulates into a forest of perturbations. A drag drops clips by hand; a double-tap sends the sweep hand across and every clip lifts away as the front passes it, returning the strings to clean sine. No melody ever forms: the clips are timbre, not notes. No piano is drawn; only strings, clips, and their perturbations.

## Construction

- Layout in unit space (resize invariant): strings at v = 0.13 to 0.87, nine of them, full width at every size. Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas CSS size pinned in px inside draw() every frame; phone detection via window.screen (min dimension < 700) with the h > w * 1.15 aspect fallback.
- String shape: shared fundamental (one pitch class) with a small per-string phase offset, plus a low second harmonic. All clip effects are closed-form functions of clip records and t, never frame-integrated.
- Clip record: {fallStart, landT, vFrom, si, u, dir}. Falls run at 0.16 unit-v per second with a quadratic ease-in; a perched clip rides its string's wave at its own x.
- Perturbation model (per landed clip):
  - Shimmer: a high-frequency ripple multiplied by a Gaussian bed (sigma 0.03 of width) centred on the clip; amplitude builds in over 0.8 s after landing, then relaxes toward a 45% steady state with a 2.5 s time constant. A faint gold trace of the string under the bed marks the metallic ring.
  - Kink: a derivative-of-Gaussian step launched at landing, travelling at 0.34 of width per second in the clip's seeded direction, width growing with age, amplitude decaying as exp(-age / 1.4), dead at 2.4 s. A short ember segment of the string rides the kink front.
  - Landing ring: a gold circle blooming at the clip for 0.7 s.
- Sweep: double-tap records a sweep time. The front crosses the frame in 0.6 s; each clip clears when the front reaches its u (clearT = sweep + 0.6 * u), lifting 30 px and fading over 0.3 s. A clip's string perturbation weight follows the same lift, so the string cleans as the hand passes.
- Cap: at most 24 active clips (falling or perched). Rain events that arrive at the cap are skipped; drag drops at the cap are refused.
- Rain: a seeded schedule (mulberry32, seed 835835) generated at load: first fall at 6.5 s, then every 5 to 12 s, random string and u in [0.06, 0.94]. Activation and the cap check happen in the rAF loop; everything drawn remains a function of (records, sweeps, t).
- Seeded initial clips (frame one): string index 2, u 0.34, landed at t = -1.1 s, kink direction +1 (at t = 0 its kink is mid-travel near u 0.71); string index 5, u 0.68, landed at t = -3.4 s (kink spent, shimmer in steady state).
- Drag drops: entering a new string's band drops one clip at the pointer's x, throttled to one per 0.22 s; the clip falls from the pointer's height (or from just above the string if the pointer is already below it). Double-tap is detected from the pointerdown interval (0.33 s) and suppresses drops for that gesture.
- Audio: lazily created inside the first pointer gesture, typeof-guarded, so the QA renderer (no AudioContext) runs the piece silently without error. A landing plays a soft pluck: partials at 220 / 440 / 660.5 / 1108 Hz (one pitch class, A) through a bandpass whose frequency follows the clip's u (700 to 2500 Hz), so position changes timbre only. The sweep plays a low thunk (130 Hz falling to 55 Hz). Master chain runs through a compressor as limiter at modest gain.
- Palette strict: ivory #EFE6D4, string #1A1A1A, clip metal #8A8F94, ring gold #C9A227, perturbation ember #C9562E. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas. No visible text besides the title.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and cmp-compared byte-identical (duplicate deleted, re-verified after the kink tuning pass). Frame one is the synchronous draw(0); no Date.now anywhere in drawn state (the clock origin is performance.now, and all state is evaluated at piece time t).
- Read-backs: desktop, mobile, and thumb all show nine gently waving black strings on ivory, two small metal paperclip glyphs perched with local shimmer wiggles, and the first clip's ember kink step mid-travel to its right. Nothing clipped on mobile; strings span the full width on the phone path.
- Position audit: a pixel scan for clip-metal tones confirms the clips sit at u 0.34 / v 0.31 (string 2) and u 0.68 / v 0.58 (string 5) at all three sizes.
- Silence: the renderer has no AudioContext; the piece rendered cleanly at all sizes with the audio path guarded.
- Kink tuning: the first frame-one kink read too faint, so kinkAmp was raised (0.011 to 0.014 of min dimension) and its decay slowed (exp(-age/1.1) to exp(-age/1.4), both in the string deflection and the ember overlay); renders redone and byte-compare re-run green.

## Deviations

- The prompt's physical-model notch filter (clip position sets notch frequency, weight sets Q) is realised on two levels: visually as the kink-plus-shimmer perturbation, and sonically as the pluck's bandpass frequency following clip position. The partial stack itself never changes pitch class, per the no-melody rule.
- The sweep clears clips one by one as its front reaches them rather than all at the same instant; this is the brief's own wipe reading ("the clips lift and vanish in a left-to-right sweep over ~0.6 s") applied per clip.
- Rain activation (and therefore exact cap behaviour under heavy user play) is materialised in the rAF loop rather than precomputed, because cap state depends on recorded sweeps; drawn state for any materialised record stays closed-form. Frame one is unaffected: only the two seeded clips exist at t = 0.
