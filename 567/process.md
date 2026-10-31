# No.567 "Él Es Así" — EXPANSION #68 teresa-ferreiro, prompt TF7

## Concept

A 10-panel dark bait-and-switch carousel in Ferreiro's structure. At a night party, a blonde friend with a beer tells the red-haired woman to go talk to her boyfriend. She says he is just introverted, hiding in a corner. The friend corrects her: he is in the corner literally eating dirt and staring at her, which means he wants to go home. Hard cut: SEIS MESES DESPUÉS. At her door, the woman reveals she lost a baby at three months: he broke the open-relationship rule, came home drunk with an STI, and gave it to her. The friend asks if he still eats dirt. The woman is outraged and calls her toxic. The friend answers: "Con la boca llena de tierra, te lo dijo." Final flashback: the party again, the boyfriend in the corner eating soil, the exact same pose. Closing caption card: "En otros seis meses, se habrá olvidado de lo de la ETS también."

No moralizing text, no redemption, no explaining the metaphor: the dirt is literal. The friend is the only sane person in the piece and is never the butt of the joke. All lettering is Spanish, hand-lettered with seeded per-letter jitter.

## Construction

- Single self-contained `index.html`, canvas 2D, 1080x1080 design space. One wobbly-framed panel at a time (seeded jittered rects), strict palette only: night purple #4A2E5A, dirt brown #6B4A2E, six-months grey #9A9A9A, silence white #F5F5F5, ink #141414, beer amber #E8A33D. Flat fills, no gradients.
- The boyfriend is a single parametric rig (crouched haunches, hunched ink torso, head low, pupils pushed left in a fixed stare, one hand scooping, one hand holding a dirt clump at a dirt-smeared mouth). The identical call, position and scale are used in panel 3 and panel 9 for the visual rhyme; a smaller instance sits in the corner of panels 1 and 2. His only ambient motion is a subtle 2-frame chew (0.45 s per frame, clump lowers and the mouth opens on frame 1).
- The dirt pile is a seeded mound of ellipses and clod specks. Dragging on it in any dirt panel (1, 2, 3, 9, and the small pile on the caption card) grows it via a shared `pileGrow` value; it never runs out and never shrinks.
- Carousel: TAP advances, panel 10 wraps to panel 1 (navigation, not click-to-reload). Panel 4 is a full ink-black panel with "SEIS MESES DESPUÉS" in white shouty lettering; tapping it runs a timed fade: 0.45 s fade to black, ~1 s hold on black, 0.45 s fade in on panel 5. Taps during the fade are ignored. A small "panel n / 10" counter and a subtle "tap" hint sit at the bottom.
- House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas pinned in px inside draw() every frame; phone detection via window.screen (aspect h > w*1.15 fallback only); page ground is the night purple; the panel keeps its shape on phones.
- Determinism: frame one is the synchronous draw at constant PHASE0 = 1.7 (panel 1 fully composed, chew at a fixed frame). rAF is typeof-guarded and anchored as PHASE0 + elapsed since load; no Date.now anywhere. Seeded RNG is mulberry32 with fixed seeds (567000 family).

### Panel texts (all of them)

1. Friend: "Ve a hablar con tu novio."
2. Woman: "Es que es muy introvertido. Está escondido en un rincón."
3. Friend: "Está en el rincón, sí: comiendo tierra y mirándote fijamente." / "Eso significa que se quiere ir a casa."
4. "SEIS MESES DESPUÉS"
5. Woman: "Perdí al bebé a los tres meses."
6. Woman: "Rompió la norma de la relación abierta. Volvió borracho, con una ETS, y me la pasó."
7. Friend: "¿Sigue comiendo tierra?" / Woman: "¡Eres una tóxica!"
8. Friend: "Con la boca llena de tierra, te lo dijo."
9. (no text, flashback)
10. "En otros seis meses, se habrá olvidado de lo de la ETS también."

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared, identical; re-verified after the pupil fix; the second render was deleted.
- Read back all three official renders: panel 1 shows the party scene with the blonde friend holding her amber beer and speaking, the brown-haired woman beside her, and the boyfriend visible crouched in the dark corner at right with his dirt pile in front of him, hand at his smeared mouth. Mobile keeps the whole panel in frame, nothing clipped.
- Spot-checked panels 3, 4, 5, 7, 9, 10 via throwaway preset-panel copies in /tmp (deleted after QA): panel 3's wide shot with both bubbles and the larger boyfriend; panel 4's black card; panel 5's grey doorstep with the purple door and the woman's sad face; panel 7's outrage beat; panel 9's silent rhyme of panel 3; panel 10's caption card with the small dirt pile.
- Fix during QA: the boyfriend's pupils first sat symmetric and read as a normal gaze; both pupils and brows were shifted left in the rig so the stare back at the room reads at gallery size. All sizes re-rendered, determinism gate re-passed.
- Grep confirms zero `Date.now`, zero `document.createElement`, zero AudioContext, zero gradients, no external assets.

## Deviations

1. The woman's red hair is rendered in dirt brown #6B4A2E, the palette's only warm hair tone. The palette is strict and contains no red; amber is spoken for (the friend's blonde hair and her beer). No off-palette color was introduced.
2. Dialogue for panels 1, 3, 5, 6 and 7 was composed in Spanish from the prompt's described beats, plain and factual for the revelation panels as briefed. The prompt's quoted material is used verbatim: the woman's "muy introvertido, escondido en un rincón" (panel 2, expanded with "Es que es" and "Está"), "SEIS MESES DESPUÉS" (panel 4) and the caption card (panel 10). Panel 8 uses the brief's Spanish rendering of the prompt's quoted friend line: "Con la boca llena de tierra, te lo dijo."
3. The counter and hint are lettered in silence white at 55% alpha instead of ink, because the page ground here is night purple (the sibling pieces sit on paper).
4. The caption card (panel 10) carries a small dirt pile in its bottom-right corner as a quiet visual rhyme; it is also draggable like the other piles. No text was added.
5. The friend keeps her beer only in the party panels (1 and 2); in the wide shots (3, 9) and at the doorstep she is empty-handed, so the eye stays on whoever is speaking.
