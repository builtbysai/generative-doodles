# No.554 "Mugre Debajo del Sofá" (EXPANSION #67 roberta-vazquez, prompt RV2)

## Concept

Roberta Vázquez's fixed creature ensemble staged the way the prompt asks: a sitcom cast lineup, then the gang in a moonlit alley, then the dive bar. One landscape page, three wobbly hand-drawn panels, all lettering in Spanish and deliberately wobbly.

- Panel 1 (full width, tan): the six-member cast under an ink title band reading "MUGRE DEBAJO DEL SOFÁ": grey mouse with a stitched eye, purple bug flashing a peace sign, blue alien holding a Q-tip, winged blue insect, muscular green lizard in a black shirt, winking white cat in ripped green pants.
- Panel 2 (indigo alley): the mouse, bug and cat hang out under a tan moon and stars, next to a trash can and a puddle. The whole conversation is two bubbles: "¿qué plan hoy?" and "¡pues lo de siempre!".
- Panel 3 (wood-brown bar): a multi-armed cockroach bartender (ink body, wood shell) works a counter with bottle shelves, while the cat and the lizard sit on stools as patrons. A bubble over the bar carries the tequila ritual: "la sal por la nariz, y el limón por los ojos".

Interaction is tap-only. Tapping a cast member in the lineup fires its signature bit plus a gag bubble. Tapping the bartender calls a new round: another drink slides onto the counter and the chaos level rises (more ink spills on the counter front, more smoke wisps). Ambient motion is small: a gentle idle bob in the lineup, the insect's wing flutter, the bartender's six arms swaying, smoke rising. Never a reload.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets. Design space 1200 x 800, scaled and centred; page ground is the banner tan #EAC97E everywhere.
- Strict palette, flat fills only, no gradients: ink #1A1A1A, banner tan #EAC97E, mouse grey #9A9A9A, bug purple #8A5AA8, alien blue #4E9AD6, lizard green #5AB85A, cat white #F2F2F2, bar wood #7A5230, alley indigo #2E3A5A.
- The cast is six parametric functions (drawMouse, drawBug, drawAlien, drawInsect, drawLizard, drawCat) drawn from local coordinates with the origin at the ground line. The same functions reappear in the alley and bar panels at smaller scales, so the fixed traits (stitched eye, Q-tip, peace sign, ripped pants, black shirt) never change design between panels.
- Panels are wobbly rounded-rect paths: points sampled along the edges with seeded jitter and drawn as a smoothed closed curve, filled and ink-stroked. The alley and bar scenes are clipped to their panel path and the frame is re-stroked on top.
- Hand lettering: each string is drawn letter by letter with rotation and baseline jitter from a mulberry32 stream seeded by a hash of the string itself, so the lettering wobbles but is identical on every frame. Speech bubbles are wobbly white rounded rects with a tail, sized by a word-wrap pass.
- Signature bits, driven by a sine envelope over 1.2 s from the tap: the mouse's stitches rotate and twitch, the bug's peace hand scales up, the alien's Q-tip travels to its ear and scrubs, the insect's wings flutter faster as it lifts, the lizard flexes both arms (with a bicep bulge), the cat tilts its head, winks its other eye and waves a paw. The gag bubble stays up for 2.8 s.
- Bar chaos: level 0 to 4. Drinks occupy precomputed counter slots; the first two are present from load, each new round stamps the next drink's birth time and it slides in over 0.7 s. Spill ellipses on the counter front and smoke wisps above the counter are drawn in counts tied to the chaos level. Bar dressing (bottles, alley stars) is precomputed once from fixed seed 554066.
- House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height pinned in px inside draw(); phone detection via window.screen (min dimension < 700 px) with the aspect ratio only as fallback; on phones the composition keeps its shape, spans the full width, and centres on the tan ground.
- Determinism: the first frame is drawn synchronously at load at constant PHASE0 = 2.0 (lineup posed, alley calm, bar at chaos 0, no bit running). The rAF loop is typeof-guarded and anchored as PHASE0 + elapsed; frame one is never derived from Date.now(). mulberry32 seeded RNG only; no audio, no microphone.

## Gag bank (fixed Spanish script, one line per cast member)

- Mouse: "me cosieron un ojo, pero veo venir todo."
- Bug: "paz y amor... pero de lejos, eh."
- Alien: "en mi planeta esto es higiene."
- Insect: "yo solo pasaba volando, ¿eh?"
- Lizard: "este cuerpo no se hace solo."
- Cat: "debajo del sofá se vive mejor."
- Bartender (on a new round): "ronda nueva. luego no lloréis."

## QA log

- Rendered with ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp: identical. Second render deleted.
- First visual pass: the lineup, alley and bar all read, but the shelf bottles rendered as pinched diamonds (the wobble smoothing collapses narrow rects) and the alley trash can read as a hanging tag. Fixed both: bottles are now drawn as explicit bottle silhouettes (body, shoulder, neck) at a larger minimum size, the bartender's held bottle uses the same silhouette, and the trash can is a tapered slatted path with an ink lid. The first alley bubble was also widened slightly so the opening "¿" clears the bubble edge.
- Second visual pass: desktop shows the six-member lineup under the banner with every fixed trait legible, the indigo alley with moon, both bubbles and the gang, and the brown bar with bottle shelves, the six-armed bartender, two drinks on the counter and the cat and lizard patrons. Thumb reads the same at gallery size. Mobile spans the full 390 px width, centred on the tan ground, nothing clipped.
- Grep checks: no Date.now, no gradient calls, no external URLs in the file.

## Deviations

- The winged insect has no gag of its own in the prompt's tap list (the prompt lists bits for mouse, bug, alien, lizard and cat); it still gets a bit (faster wing flutter and a lift) plus a gag line, so all six lineup members respond to taps the same way.
- The prompt's bar scene names the bartender and the chaos; the cat and lizard appear as bar patrons on stools and the mouse and bug join the cat in the alley, which is how the full cast covers all three panels with unchanged designs, as the prompt's composition implies ("cast members also appear in the alley/bar panels").
- Bottle and bubble colours reuse only palette colours; the smoke wisps use the mouse grey at low alpha and the bug's belly uses the banner tan at 85% alpha, both flat fills within the strict palette.
