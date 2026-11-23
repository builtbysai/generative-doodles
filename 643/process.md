# №1984 As the Element

- Title: As the Element
- Prompt code: MC1 / PP1231
- Study: #259 mateo-villanueva-brandt
- Gallery date: 2007-06-18, shown as "2007 · 06 · 18"
- Interaction cue: Drag the light across the body.

## What the piece does

A black reclined figure lies against dark rock as one continuous mass. The body is coated in the element: wet sheen is the only anatomy. A cold silver highlight band slides along the body on a slow 96 second orbit, and specular glints swell over the shoulder, ribs, hip, thigh and calf stations as the light passes, then dissolve as it leaves. The figure runs diagonal across the lower third, head low at the left, feet rising to the right. Dark rock fills the upper two thirds with a noise displaced lower edge, faint graphite mottling and a few short cracks. Spray particles drift upward at the top edge. Wet streaks and thin ripples slide slowly along the body so the sheen crawls as if water moves across skin. Palette is grayscale only: near-black ground, wet graphite body and rock, one cold silver highlight. No face, no landscape detail, no colour.

## FIRST_T and cycle

- FIRST_T = 14 s, CYCLE = 96 s.
- At t = 14 the light sits near the middle of the stage (x about 0.51, y about 0.38), over the ribs, so the first frame shows the shoulder and rib highlights readable while the hips stay half dissolved.
- The light orbits on a smooth sine path, so the sheen crawls and the anatomy breathes in and out without a cut. No wall clock or Date enters the animation state. All randomness is seeded (mulberry32, hash1 value noise).

## Interaction

DRAG moves the hard light source. Pointer down, move and up handlers on the canvas set a drag target from the pointer position; the light vector eases toward it at 0.22 per frame, so the specular band, the anatomy glints, the rim light and the rock sheen all slide across the body together. On release the target clears and the light eases back to the automatic orbit. Never click-to-reload. No audio.

## Technical

- Layered gradient bodies: rock is a vertical gradient with faint graphite bands and mottled blobs; the body is a diagonal gradient with mottled blobs, a sliding silver band, station glints, wet streaks and ripples, all clipped to one silhouette path.
- A single light vector drives every specular effect.
- The figure and the rock share one noise field (the same hash1 and fbm functions, same SEED), so they read as one mass.
- House rules: Visual Viewport sizing with resize listened to on visualViewport and window, canvas element pinned in draw() via canvas.style.width and height in px, phone detection via window.screen (min dimension under 700px) with aspect fallback (h greater than w times 1.15). Field-like composition: full-bleed on phones, square on desktop. One synchronous frame at load, requestAnimationFrame guarded with a typeof check. prefers-reduced-motion leaves the first frame still. Flicker is far below 14 Hz by construction: the fastest modulation is the spray twinkle at 0.8 radians per second.

## QA hook

- `?t=<seconds>` or `?seed=<seconds>` sets the virtual clock at load.
- `window.__draw(t)` redraws at a virtual time.
- `window.__piece1984` exposes firstT, cycle, auto(t), light(), setLight(x, y), releaseLight(), isDragging() and redraw(t).

## Deviations from the prompt

None material. The rock strata bands were kept very faint (alpha about 0.10) so they read as rock texture, not landscape detail. The body span and thickness are widened on phones (x 0.10 to 0.92, radius factor 0.085) so the figure keeps its presence in the tall full-bleed stage.

## Probes

All renders from the actual script with node ~/workspace/tools/render-piece.js. Times are the ?seed= probe clock.

- render-desktop.png, 1280x900, seed 14: md5 5f482cb822b9b15ac073fe38f4df2b3e
- render-mobile.png, 390x844, seed 14: md5 443bcc2c3a6a22433685bafaeac1f2a4
- thumb.png, 720x720, seed 14: md5 06b4f816771128da8b65eacceea2b35b
- Thumb determinism: thumb.png rendered twice, both md5 06b4f816771128da8b65eacceea2b35b, identical.
- probe-t38.png, 1280x900, seed 38: md5 71c4c51920975951a2ee960caf35259d
- probe-t60.png, 1280x900, seed 60: md5 9eeb2ec021087e0da4d5302a8b35ace7
- probe-drag.png, 1280x900, seed 14, light dragged to (0.12, 0.22) via probe-drag.js: md5 36ce3e9b67cdabb84f7b19e667564de7. Light at load (0.506, 0.383), after drag (0.132, 0.225). The highlight band and glints visibly moved to the head and shoulder end.
- probe-release.png, 1280x900, seed 14, same drag then releaseLight plus 30 redraws: md5 f3b5bedb4fc05bd0bcc87018aba55660. Light returned to (0.505, 0.383), matching auto at t = 14 (0.506, 0.383) to within easing residue.
- All three sizes and all probes were visually inspected. The drag probe confirms the interaction: dragging the light slides the highlights and lights the head and shoulder, while the hip and thigh dissolve.

## Fix rounds

- Round 0, first build: body read as a flat mid-gray slug, rock strata bands read as strong horizontal stripes, cracks read as long scratches, wet streaks read as scratch lines, head end was a flat chop, head clipped off frame on mobile.
- Round 1: darkened the body base (BODY_TOP to [20, 21, 26]), narrowed and strengthened the highlight band (width 0.11, peak alpha 0.38), tightened the glint halos and brightened their cores, cut rock band alpha to about 0.10 with 4 thinner bands, shortened cracks to 4 short ones at alpha 0.22, cut streaks to 16 at lower alpha, added rounded head and foot caps in the local gradient colours, widened the body span and radius on phones.
- Round 2: head still clipped on mobile, so the phone body start moved from 0.04 to 0.10. Streak length and alpha cut again (0.55 radius, alpha 0.015 to 0.055) and ripple alpha cut to 0.06 with shorter arcs, after the long diagonal streak lines still read as scratches on mobile.
- Re-gated after every edit. Final renders inspected at all three sizes plus the time and drag probes.

## Known warts

- The figure is deliberately abstract: at the first frame the anatomy is only a soft band and two glints, so a viewer who does not drag may read it as a dark ridge rather than a body. Dragging resolves it.
- The spray at the top edge can read as faint stars at a glance, since it is small silver dots on black. It stays within the brief (spray particles at the top edge).
- On the tall phone stage the rock occupies a large empty dark area above the figure. That is the brief (dark mass filling two-thirds) but the phone frame feels emptier than the square desktop frame.
- After release, the light returns to within 0.0002 of the automatic orbit rather than exactly to it, because easing is asymptotic. The difference is far below one pixel of highlight movement.
