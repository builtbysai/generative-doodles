# No.553 — Loco Pimiento

EXPANSION #67 roberta-vazquez, prompt RV1 ("The Angry Pantry"). A 6-panel gag page
starring a furious green bell-pepper office worker, in Roberta Vázquez's page
architecture: chunky hand-lettered title, wobbly panels, tan caption banners,
hatched office grounds, all text in Spanish.

## Concept

A portrait comic page on paper cream. Across the top, "LOCO PIMIENTO" in chunky
red display letters with a black offset shadow and per-letter jitter, with the
small script byline "por ROBERTA VÁZQUEZ". Below, a 2 rows x 3 columns grid of
wobbly hand-drawn panels tells the gag: the pepper mops a flooding office, breaks
the company computer ("¿QUÉ DIABLOS ACABO DE HACER?"), terrifies his coworkers
(a purple eggplant, an orange carrot, a radish), and keeps his job only because
nobody dares fire him. Tan caption banners carry the narration: "LOCO PIMIENTO
ES UN PELIGRO TRABAJANDO", "ROMPE COSAS", "PERO NADIE SE ATREVE A DESPEDIRLO
PORQUE ESTÁ PIRADO…".

Each panel has an anger state (0-3). TAP a panel to advance its state: brows
steepen, the mouth goes flat, wavy, zigzag teeth, open shout, the crosshatch
ground gets denser, the flood rises, the computer screen breaks, the coworkers
sweat and tremble. DRAG horizontally to shake the page: panels wobble and the
pepper's pupils dart. The pepper is furious in every state and never smiles.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets.
  Design space is a 1080 x 1440 portrait page, scaled to fit and centered;
  the page keeps its shape on phones and the page ground is the paper cream.
- Strict palette, nothing else: pepper green #5C7A3D, banner tan #EAC97E,
  office ground #B96A35, eggplant purple #8A5AA8, carrot orange #E07B39,
  title red #D93A2B, ink #1A1A1A, paper cream #F2E8D0.
- Panel frames are jittered-rect paths from one seeded wobble family (seed per
  panel), double-stroked for a redrawn marker feel. No straight vector borders.
- Crosshatch grounds are drawn directly each frame as two diagonal line fields
  clipped to the panel; spacing shrinks as the panel's anger state rises
  (30 units at state 0 down to 13.5 at state 3). No offscreen canvas.
- Lettering is canvas text with seeded per-letter rotation and offset jitter
  (title, byline, captions, speech bubble) so nothing sits on a clean baseline.
- The pepper is a parametric rig: lobed bell body, stem, heavy green lids over
  cream eyes, brow angle and mouth shape driven by the anger state, an anger
  puff at state 3. Coworkers are parametric eggplant / carrot / radish figures
  with raised arc brows, wavy worried mouths, cream sweat drops at fear 2+,
  and a tremble at fear 3.
- Canvas size comes from the Visual Viewport API with resize listeners on both
  visualViewport and window; the canvas CSS size is pinned in px inside draw().
  Phone detection uses window.screen (min dimension < 700px) with the
  height > width * 1.15 aspect test only as fallback.
- Determinism: the first frame is drawn synchronously at the constant phase
  PHASE0 = 2.4 with all panels at their initial composed states; the rAF loop
  (typeof-guarded) is anchored as PHASE0 + elapsed since load. Frame one never
  derives from Date.now(). All randomness is mulberry32 with fixed seed 553067
  (plus fixed per-panel seeds).
- Initial panel states (the escalation read across the page):
  panel 1 (mopping, caption "ES UN PELIGRO TRABAJANDO") state 0;
  panel 2 (flood rising, mop held up, bucket afloat) state 1;
  panel 3 (computer error, red X screen, speech bubble, caption "ROMPE COSAS") state 2;
  panel 4 (eggplant and carrot watching) state 1;
  panel 5 (broken chair, radish watching) state 2;
  panel 6 (whole pantry huddled, caption "PERO NADIE SE ATREVE…") state 3.
- Hint: one small lowercase "tap · drag" in the bottom-right corner. Nothing else.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp:
  identical. The second render was deleted.
- Read-back, desktop and thumb: chunky red title with black offset shadow and
  script byline on top; six wobbly double-stroked panels on cream; the furious
  heavy-lidded green pepper in five panels (flat, wavy, zigzag and shouting
  mouths by state, never a smile); purple eggplant, orange carrot and red
  radish coworkers with worried faces and sweat drops; tan banners with all
  three Spanish captions legible; the "¿QUÉ DIABLOS ACABO DE HACER?" bubble over
  the red-X monitor; crosshatch visibly denser in the later panels; flood water
  risen in panel 2; "tap · drag" hint bottom-right.
- Read-back, mobile: the portrait page fits the 390px width whole, letterboxed
  on the paper-cream ground; title, all six panels, captions and characters
  legible; nothing clipped.
- Fixes during QA: first pass had characters in panels 3-6 overflowing the
  right panel edge (radish and the panel-6 pepper were visibly cut by the frame)
  and a broken chair that read as a plain stool. Cast positions and scales were
  reworked per panel and the chair redrawn with a tilted slatted backrest, a
  splayed leg and a snapped-off leg on the floor; all sizes re-rendered and the
  determinism gate re-passed.

## Deviations

- The radish is drawn in title red #D93A2B. The prompt calls the radish pink,
  but the strict palette names no pink; rather than add a ninth color, the
  radish takes the palette's red (the same construction choice the brief
  directed). Its cream root tip and green leaves come from the paper cream and
  pepper green already in the palette.
- Panel scenes assign the three specced captions to panels 1, 3 and 6 and give
  each panel one beat of the prompt's story (mop, flood, computer, coworkers,
  breakage, huddle) instead of repeating the full sequence inside every panel;
  the tap-to-escalate behavior is per panel as specced.
- The speech bubble appears in panel 3 at state 2 and up (the moment the error
  lands); at states 0-1 the monitor shows ordinary work lines instead. This
  keeps the tap escalation readable in the panel the quote belongs to.
