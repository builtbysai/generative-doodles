# No.1779 Tuned to the Alcove (SV4, PP1026)

Completes the fourth piece of EXPANSION #233 stephen-vitiello. Gallery date: 2006 · 11 · 25.
Gallery note: "Gusts cross silver strings between dark winter trunks; the strings ring in standing waves and shed warm white nodes. Watch only."

## Build

Canvas 2D only, no WebGL, no DOM text, no audio code. Template: live No.1775 index.html, fetched fresh at build.

- Pale winter sky fills the field (#DCE2E5) with three faint horizontal bands of colder air (#D2DADD) for depth. The page ground is the same sky color, so the desktop square field blends into the page.
- Trunks: three dark bark brown-black trunks anchor each edge (#211A14 with #3B2E22 bark strokes), drawn from a fixed authored table of field fractions, slightly tapered and leaning. The strings are the subject; the trunks only frame them.
- Strings: three thin silver wires (#B9BEC2) at 0.28, 0.50 and 0.72 of the field height, spanning from the left trunk group to the right, with anchor dots at each end. Each string carries a standing wave with 2, 3 and 4 half-waves top to bottom, dividing the frame into three registers.
- Gusts: a fixed authored table of 26 gust births inside a one hour cycle, gaps 17 to 180 s, each naming the strings it excites and a strength from 0.50 to 1.00. Each gust sends a bright band of moving air across the field over 120 s (low alpha white, core 0.16 times strength) and carries faint drifting particles that brighten inside the band. Particles are 80 fixed seeded points (mulberry32, seed 1779).
- Vibration: each string's displacement is a closed-form damped standing wave, a function of piece time since its last gust: amplitude 0.028 of field height times strength times exp(-0.02 times age), times sin(n pi u) times cos(2 pi fVis age + phase). Warm white nodes (#FFF6E0 with a soft glow) sit at the antinodes, brightness following the envelope, shown while the envelope is above 0.05.
- String frequencies: top 98 Hz, middle 147 Hz, bottom 196 Hz nominal resonance; the visible oscillation is a slowed visual analogue at 0.42, 0.55 and 0.68 Hz with fixed phases 0.0, 1.1 and 2.3, so the standing wave reads on screen.
- Frame one: fixed phase t = 60 s. Gusts born at 12 s (strings 0 and 1, strength 0.70), 38 s (strings 1 and 2, strength 1.00) and 55 s (string 0, strength 0.55) have all arrived; envelopes are 0.498, 0.644 and 0.644, so all three strings are mid-vibration with 2, 3 and 4 warm white nodes visible. Gust bands from those three births sit at field fractions 0.40, 0.18 and 0.04.
- Plates: solid bark-black fills with white ink, title plate top left ("Tuned to the Alcove" / "2006 · 11 · 25"), hint plate bottom left ("Watch only.").

## Deviations and interpretations

- No audio at all. The prompt offers a sine stack as optional; the visuals carry the piece alone, so no WebAudio code is included and nothing is muted by default or lazy in a gesture.
- The gust table was expanded at build: the first draft had 9 gusts with a 365 s gap after the 55 s gust, and a probe showed every string envelope at 0.000 by t = 400 s, so the piece would sit still for minutes at a time. The table now holds 26 gusts with gaps of 17 to 180 s and the decay was slowed from 0.035 to 0.02 per second, so the strings ring most of the time while the timing stays irregular. The frame-one gusts (12, 38, 55 s) are unchanged.
- The visible string oscillation is a slowed visual analogue of the nominal resonant frequencies (see Build), since real 98 to 196 Hz vibration is invisible.
- The faint horizontal sky bands are an interpretation: the prompt names a pale winter sky, and the bands give the field depth without adding objects.
- Palette hexes are hand-picked from the prompt's named colors (bark brown-black, pale winter sky, thin silver wires, warm white vibration nodes). studies/stephen-vitiello.md does not exist in the muse-soul repo, so no study file was invented or cited.
- No em dashes anywhere in visible copy.

## House rules

Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned in draw() via style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback (h > w * 1.15); field-like full-bleed layout on phones, square centred field on desktop with the page ground set to the piece's own sky color; one synchronous frame at load; requestAnimationFrame guarded with a typeof check; deterministic fixed-phase first frame with seeded RNG only, no Date.now or Math.random anywhere in the script; watch-only, never click-to-reload; no AI-signature copy. Reduced motion: the animation loop does not start, so the piece rests at the fixed frame one.

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js:

- Desktop 1280x900: pale sky field with dark trunk groups at both edges, three silver strings at three heights with clear standing-wave curves, warm white nodes at the antinodes (2 top, 3 middle, 4 bottom), faint vertical gust bands and tiny drifting particles visible, title plate "Tuned to the Alcove / 2006 · 11 · 25" top left and "Watch only." bottom left, both fully legible.
- Mobile 390x844: full-bleed field, trunks at the edges, strings and nodes visible, plates fully legible with solid fills.
- Thumb 720x720: same composition as desktop, plates legible, nodes visible. This render is thumb.png.

Motion verified separately with a probe script calling the exposed drawAt hook: at t = 60 s envelopes are 0.498, 0.644, 0.644; at t = 100 s they are 0.224, 0.289, 0.289 with the strings in a different phase and the gust bands moved right; at t = 400 s they are 0.033, 0.123, 0.123, strings 1 and 2 still ringing from the 330 s gust.

Fix round: first render had gust bands too faint to read (core alpha 0.10), raised to 0.16, and the probe showed all envelopes at 0.000 by t = 400 s, so the gust table was expanded from 9 to 26 births and decay slowed from 0.035 to 0.02 per second. All three sizes re-rendered and re-inspected after the fix; thumb.png is the final 720x720 render.
