# №1821 Lapse

## Driver

One slow strobe drifting on a long sine; the interference breathes, locks, breaks, re-locks.

## Prompt (TASKS.md, AD6, PP1068, study #238 arnold-dreyblatt)

Title: Lapse. Visual description: In a dark room a projector throws a strobe-lit image onto a screen: violet and gold ripples stand in interference waves, like water frozen mid-vibration. The strobe rate drifts slowly, so the wave pattern breathes, locks, breaks, and re-locks. The frame of the screen and the dark room stay still; all motion is in the interference. Palette: near-black room, violet projection, brass-gold highlights. Composition: the projection screen centered; wide dark margins of room around it. Motion-interaction: watch-only. Strobe drift is the only variable; keep the strobe slow and gentle, never fast flashing (photosensitivity). No input. Technical approach: generate a standing-wave pattern whose phase steps at the strobe rate; vary the strobe rate on a slow sine so beats form and dissolve. What to avoid: fast flashing; sharp strobe cuts; any seizure-risk frequencies.

## Build

- Single self-contained index.html. One master clock, phaseT in seconds, drives the wave phase and the brightness envelope, so the two can never drift apart.
- Strobe: rate 1.0 + 0.6 sin(2 pi t / 47), so 0.4 to 1.6 Hz, maximum 1.6 Hz, far below the 14 Hz limit. The brightness envelope is a sine of the exact integral of that rate, so all changes are soft fades, never hard cuts. Beat amplitude 0.65 + 0.35 sin(2 pi t / 47 + 1.2) breathes on the same 47 s drift, so the pattern locks, breaks, and re-locks.
- Interference: two ripple sources at u = -0.32 and u = +0.32 inside the screen, wavenumber 16 rad per screen unit. A 46 by 28 dot grid samples the standing-wave field; crest dots run violet to pale violet, trough dots run brass gold, dot size and alpha follow the local wave amplitude. Faint continuous ripple arcs from each source sit under the dots.
- The screen is centered with wide dark margins of room around it: desktop width min(0.74 VW, 1.15 VH), 0.88 VW on phones, height 0.62 of width. The screen and the room stay still at every t; only the interference inside the screen moves. The room has a faint violet wash from above and a black floor shadow, both static. A soft projector glow around the screen breathes with the strobe envelope.
- Palette: near-black room #0B0A10 / #060509, deep violet screen ground #14102A, violet projection #7A5CFF / #4B2FBF / #B9A8FF, brass-gold highlights #D9A441 / #E8C878, brass frame #8A6D2F.
- Watch-only, no input handlers. prefers-reduced-motion renders the still interference pattern with no strobe.
- Frame one is fixed phase t = 60 s: strobe near its fastest drift point (about 1.59 Hz) with the interference partway through a beat, envelope near full. Deterministic, no wall clock, no random values.
- Plates: title plate "Lapse" with date "2007 · 01 · 06" top left, hint plate "Watch only." bottom left. Page ground is the piece's own near-black; centered geometry kept, full-bleed field treatment not applicable.
- House rules: Visual Viewport sizing with resize listeners on visualViewport and window; canvas pinned in draw() via canvas.style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback; one synchronous frame at load; requestAnimationFrame guarded by a typeof check.

## Deviations from the prompt

None material. The prompt's standing-wave pattern is rendered as a sampled dot field plus faint ripple arcs rather than a per-pixel field, so the piece stays node-canvas QA friendly and keeps the series dot-and-line mark-making; the two-source interference, the drifting strobe, and the still screen and room are as specced.

## QA

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually.
- Round 1: desktop, mobile, and thumb all read clean on first render: centered brass-framed screen, violet and gold interference clusters clearly visible against the dark screen ground, ripple arcs faint under the dots, wide dark room margins, title/date and "Watch only." plates legible, nothing clipped, no overlap between plates and the screen. No fix round needed.
- Determinism gate: thumb.png rendered twice independently, md5 identical (see below).
- Safety: strobe maximum 1.6 Hz by construction, soft sine envelope, no hard cuts; reduced-motion renders a still frame.
- No em dashes in visible copy. No AI-signature copy.

## Gallery

- Title: Lapse
- Date: 2007 · 01 · 06
- Note: "A slow strobe breathes through violet and gold interference. Watch only."
