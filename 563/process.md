# No.563 — Hay Que Cerrar el Hociquito

EXPANSION #68 teresa-ferreiro, prompt TF3 ("The Nolan Date"). A 4-panel dating-satire carousel, one panel at a time.

## Concept

A cinema-dark date. He performs cinephilia; she does not blink. Her unimpressed face is drawn at exactly the same size in every panel (head radius fixed at 62 design units); only his arm gestures inflate from panel to panel (amp 0.3 → 0.85 → 1.4). Panel 3 breaks the format: one giant yellow monologue bubble bursts the panel frame and overlaps the margins, stuffed with his complete Nolan rant, too long to fit, so it scrolls. Panel 4: she has left, her empty chair slides in, and the caption closes the loop: "SE VAN... Y VUELTA A EMPEZAR."

## Construction

- Single self-contained `index.html`, canvas 2D, 1080×1080 design space, square stage centered (full-width on phones). Page ground is the cinema darkness #1E1E2E everywhere.
- Strict palette, flat fills only, no gradients: cinema darkness #1E1E2E, monologue yellow #F5D90A, spotlight amber #E8A33D, table red #A33A3A, ink #141414, paper #F5EEDA. The spotlight pool is amber at 16% alpha (a flat translucent fill, not a gradient).
- Wobbly panel frame and bubbles: seeded jitter rounded-rect paths (mulberry32, fixed seeds per call site), so lettering and frames feel hand-drawn but render identically every load.
- Panel 1: table with two glasses, his line as a paper bubble, her deadpan reply. Panel 2: he smokes (animated paper smoke curls, red cigarette tip), name-drop chips for Interstellar / Oppenheimer / Origen bob over him (Oppenheimer in yellow), brag bubble below. Panel 3: the giant yellow bubble (968×700, larger than the frame's inner area, drawn over the frame edges) with the rant clipped inside; horizontal drag scrolls the text, the bubble never moves; a "· · ·" tick shows more text remains. Panel 4: his apology bubble, her empty chair sliding in over 0.9s with a cubic ease when the panel arrives, ink caption strip with the closing line.
- Her face rig: ink hair disc, paper face disc offset down, flat brows, dot eyes, one straight mouth line. She never smiles in any panel.
- Interaction: tap advances the carousel (panel 4 wraps to panel 1; this is carousel navigation, not click-to-reload). On panel 3, drag scrolls the rant; a movement threshold (14 design units) separates drags from taps. Hint text: "tap" in the corner, "drag · tap" on panel 3; panel counter "1 / 4" top right.
- Determinism: the first frame is drawn synchronously at the constant phase PHASE0 = 1.4 (panel 1 fully composed, smoke at a fixed curl); the rAF loop is typeof-guarded and anchored as PHASE0 + elapsed since load. No `Date.now()` anywhere. Seeded RNG: mulberry32(563068) plus fixed per-shape seeds.
- Sizing follows the house rules: Visual Viewport API with resize listeners on visualViewport and window, canvas style pinned in px inside draw(), phone detection via window.screen (min dimension < 700px) with the aspect fallback only when no screen size exists.

## The full rant text (panel 3, verbatim as shipped)

"A ver, es que Nolan es espectacular, sí, todo explota muy bonito y la música te deja sordo, pero en el fondo es superficial, es un tráiler de dos horas y media. Los personajes son planos, planos, planos: no hablan como personas, hablan como notas al pie de página, y se pasan media película explicándose la trama el uno al otro por si no te has enterado. ¿Y Origen? Origen es Paprika con presupuesto. Satoshi Kon lo hizo antes, lo hizo mejor y sin necesitar cuatro escenas de señores en traje explicando qué es un sueño dentro de un sueño dentro de un sueño. Y lo de que el amor trasciende el espacio y el tiempo... por favor. Eso lo dice una postal de cumpleaños, no una película seria. Que si el tiempo va para atrás, que si va para adelante, que si la peonza cae o no cae: quince años hablando de una peonza, quince años. Tenet no la entiende ni él, y lo sabe, y le da igual, porque pone un órgano a todo volumen y ya parece profundo. Y te digo más: si tienes que hacer diagramas para que tus amigos entiendan tu película, igual el problema no son tus amigos. El montaje hace trampa, el sonido mezcla los diálogos bajitos a propósito para que parezca complejo, y el final siempre es un señor llorando en cámara lenta mientras todo gira. Espectacular, sí. Vacío también."

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png).
- thumb.png rendered twice and byte-compared with `cmp`: identical. Second render deleted.
- Read back all three renders: panel 1 shows the dark date scene under the amber spotlight pool, both figures at the red table, his bubble ("me gustan las películas que te dejan pensando durante días") and her deadpan reply ("o sea, películas traumáticas tipo Todd Solondz") fully legible; her face is flat-browed and unsmiling. Mobile keeps the whole panel in frame, nothing clipped.
- One fix during QA: her first hair construction drew a black band across her eyes; rebuilt as an ink hair disc behind a paper face disc so the deadpan features sit clear.

## Deviations

- His panel-1 line is rendered in Spanish ("me gustan las películas que te dejan pensando durante días"), as directed by the brief; the prompt quotes it in English but the piece's dialogue is Spanish throughout.
- Panel 3's scroll: the prompt says drag horizontally scrolls the text inside the bubble. Implemented literally: horizontal drag distance drives the (vertical) text offset inside the fixed, clipped bubble, since the rant is a wrapped text column taller than the bubble. The bubble itself never moves.
- The rant is composed in full from the prompt's listed points rather than abbreviated, per the prompt's own rule that the length is the joke; the complete text is recorded above.
- Panel 4's spoken line adds a trailing "¿hola?" as he notices the empty chair; the specced content (Oppenheimer "too technical" critique, apology, empty chair, closing caption) is unchanged.
