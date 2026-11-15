# No.1777 Winds After the Storm (SV2, PP1024)

Opens EXPANSION #233 stephen-vitiello with No.1776. Gallery date: 2006 · 11 · 23.
Gallery note: "Light shimmers across three grey panes; each brightening sends amber rings along the contact-mic wires. Watch only."

## Build

Canvas 2D only, static canvas drawing, no DOM text, no animation loop state.
Template: live No.1775 index.html, fetched fresh at build.

- Three tall grey panes fill the field, divided by a dark frame and two mullions. Pane greys, left to right: #B4BBC1, #C0C6CB, #ADB4BA. A faint white edge highlight runs down the left side of each pane. Page ground is the pale daylight grey-blue #C9CFD4, the piece's own ground.
- Light field: three vertical bright bands crossing the glass, drawn as low-alpha strips with no canvas gradient object. Main band: period 240 s, offset 60 s, peak alpha 0.55, sigma 0.10 of field width. Second band, pale daylight blue: period 360 s, offset 210 s, peak 0.30, sigma 0.16. Third, fainter band: period 90 s, offset 15 s, peak 0.18, sigma 0.08. All three are closed-form functions of piece time. A broad daylight wash follows the brightness at the photocell.
- Contact mics: one small dark disc per pane at fixed relative positions (0.17, 0.30), (0.50, 0.44), (0.83, 0.36), each with a tiny silver centre dot.
- Wires: thin near-black quadratic curves from each mic down to the top edge of the small homemade box, with a slight sag. The box sits at the bottom centre of the field (relative x 0.43 to 0.57, y 0.80 to 0.875), dark grey #2E3236 with a lighter top edge and two small screws.
- Photocell: one warm amber dot (#D98A2B) on the box face, with a halo whose radius and alpha follow the closed-form brightness at the photocell position. Amber is the only warm colour in the piece.
- Ripples: expanding amber rings centred on the photocell, clipped to the field. A ring lives 60 s and grows to 0.42 of the field side while its alpha fades from 0.85 to zero.
- Ring births: rising crossings of brightness threshold 0.70 at any of the three mics, computed numerically from the closed-form brightness function over one 720 s cycle. Birth table, repeating each cycle: 21.9, 101.2, 180.1, 271.5, 357.5, 440.3, 524.4, 594.1, 681.9 s. Gaps are 79.3, 78.9, 91.4, 86.0, 82.8, 84.1, 69.7 and 87.8 s, irregular and weather-like, never metronomic.
- Frame one: fixed phase t = 60 s. The main band is centred on the middle pane (u = 0.5), brightness at the photocell is 0.889, the amber halo is near full, and one ring is alive, born at 21.9 s, age 38.1 s, 63.5 percent expanded at alpha 0.31.

## Deviations and interpretations

- The prompt offers a quiet WebAudio drone (filtered noise tracking the light level). The drone is omitted entirely: the piece reads fully muted as a light play, and no audio is needed for the acceptance. No WebAudio code is present, so there is no autoplay question.
- The prompt says ripples travel along the wires and are rendered as expanding rings from the photocell. The rings are drawn centred on the photocell on the glass, as the spec directs; the wires themselves stay still, carrying the mics to the box.
- The prompt names no hex colours. The palette was hand-picked from the named colours: cold greys for the panes, pale daylight blue for the second light band and the ground, thin black wire, one warm amber pulse. No study file exists for stephen-vitiello, so no study colours were borrowed.
- Plates use solid near-black fills with white ink and a thin white border, following the No.1775 template, so the title stays legible over the light ground.

## House rules

Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned in draw() via style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback (h > w * 1.15); field-like full-bleed layout on phones, square centred field on desktop with the page ground set to the piece's own pale grey-blue; one synchronous frame at load; requestAnimationFrame guarded with a typeof check; deterministic fixed-phase first frame with no Date.now or Math.random anywhere in the script; watch-only, never click-to-reload; no AI-signature copy; no em dashes in visible copy.

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js:

- Desktop 1280x900: three grey panes with the bright daylight band crossing the middle pane, frame and mullions, three mics with wires curving to the dark box at bottom centre, amber photocell dot with halo, one faint amber ring partway expanded and clipped at the field bottom. Title plate "Winds After the Storm / 2006 · 11 · 23" top left, "Watch only." bottom left.
- Mobile 390x844: full-bleed triptych, bright band down the middle pane, wires and box small but clear, ring visible around the box, both plates fully legible.
- Thumb 720x720: same composition as desktop. This render is thumb.png.

Motion and determinism verified with a probe script calling the exposed drawAt hook: brightness at the middle mic is 0.536 at t = 0, 0.889 at t = 60 and 0.464 at t = 120; rings alive at t = 60 (birth 21.9, age 38.1), t = 300 (birth 271.5, age 28.5) and t = 719 (birth 681.9, age 37.1); the cycle wraps cleanly at t = 721.9 (birth 681.9, age 40.0); drawing t = 60 twice produces byte-identical output; the frame changes between t = 0 and t = 120.

Fix round: the first render drew the light field in 72 strips, which left visible regular vertical striping across the panes. Strips raised to 200; all three sizes re-rendered and re-inspected after the fix, and the band is now smooth.
