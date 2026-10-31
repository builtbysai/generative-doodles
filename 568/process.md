# №568 — Solterona

EXPANSION #68 teresa-ferreiro, prompt TF8 ("The Aunt Reclaims"). A 5-panel tap-advanced carousel reclaiming spinsterhood, after her "Socorro" post. The aunt never gets a man, a punchline, or a smile: the silence is the ending.

## Concept

- **Card 0 (caption card, verbatim):** "Socorro 🗿▪️▪️▪️▪️▪️🔫👀 #stoppodcast #auntie"
- **Panel 1:** Beach sunset. The grey-haired aunt relaxes on a pink towel on the sand, eyes open, calm. A small sea creature pops out of the teal sea shouting "¡TÍA!".
- **Panel 2:** Domestic interior. Two grey podcast bros at a table with a microphone state their dating-market thesis; a child relays it and asks the 51-year-old aunt if she agrees. She says nothing at all — no bubble — and her silent presence is the rebuttal. The two quote bubbles can be tapped to mute them (they grey out with a muted-speaker mark); her silence grows.
- **Panels 3–4:** Abstract indoor grounds (flat pink/teal fields). Her face, large and still at centre, never changes. The men's quotes crowd the four corners in small grey type, more of them already muted on panel 4; her internal monologue sits quietly at the side margins in ink italics.
- **Panel 5:** The beach again, framing identical to panel 1, but her eyes are closed and the creature waits without a word. Dragging the sun down loops the piece back to panel 1: the sun starts low there and rises slowly back to its place, watch-only.

## Construction

- Single self-contained `index.html`, canvas 2D, 1000×1000 design space, wobbly ink (#141414) frames drawn from a seeded jitter function (`jit`, hash-based, frame-count independent); RNG is mulberry32, seed 568068.
- Strict palette, flat fills only: sunset pink #F2A7C3, sea teal #2E8B8B, silver hair #C9C9C9, sand #EAD9A6, podcast-bro grey #6A6A6A, ink #141414. Page ground is the sand colour. Sand doubles as the skin tone throughout (the palette carries no skin colour).
- Sizing from the Visual Viewport API with resize listeners on both `visualViewport` and `window`; canvas CSS size pinned in px inside `draw()` every frame; phone detection via `window.screen` min dimension < 700px with aspect fallback only; on phones the square stage spans the full width, centred.
- Determinism: frame one is drawn synchronously at load at constant `PHASE0 = 1.1` and shows the caption card fully composed. The rAF loop is `typeof`-guarded and anchored as PHASE0 + elapsed since load; no `Date.now`, no offscreen canvas, no `document.createElement`, no audio, no external assets. Ambient motion (creature bob on a 9s cycle, the face's 6s breathing) is a pure function of that anchored time.
- Interaction state machine: `cur` 0 (card) → 1…5 (panels) → wraps to the card on tap. Panel 2 taps are hit-tested against the two quote-bubble rects first (mute toggle), and advance otherwise. Panel 5 tracks the sun: a pointer-down within 120 units of the sun starts a sun drag (clamped to just above the horizon); releasing at y ≥ 440 jumps to panel 1 with a 6s eased sun-rise (`riseFrom`/`riseT`), releasing higher leaves the sun where it was dropped. Entering panel 5 by tap always resets the sun to its high position. Carousel navigation is state change, never a reload.
- Hint: one lowercase word inside the frame's bottom-right — "tap" everywhere, "drag" on panel 5. A small "n / 5" counter tag sits bottom-left on panels.

### All in-piece texts

- Card 0: `Socorro 🗿▪️▪️▪️▪️▪️🔫👀 #stoppodcast #auntie` (verbatim from the prompt).
- Panel 1: `¡TÍA!`
- Panel 2, bro A: `Pasados los treinta, una mujer ya no tiene opciones para ligar.`
- Panel 2, bro B: `Ninguna. Cero opciones. Que se haga a la idea.`
- Panel 2, child: `Tía, ¿tú estás de acuerdo?`
- Panel 3, her monologue: `Están en todas partes. Siempre están.` / `Su cortejo se sueña como una pesadilla.`
- Panel 4, her monologue: `A veces la única respuesta es el silencio.` / `Un silencio incómodo. Y mío.`
- Panel 3, men's quotes (last one pre-muted): `¿Y no te sientes sola?` · `A tu edad ya no se puede elegir.` · `¿Ni un novio? ¿En serio?` · `Todavía estás a tiempo.`
- Panel 4, men's quotes (three of four pre-muted): `El reloj biológico no perdona.` · `Alguien habrá, mujer.` · `Se te va a pasar el arroz.` · `Piénsatelo, que luego...`

## Deviations

1. **Flat bands instead of a gradient sky.** The prompt's technical note mentions a gradient sunset; the series house rule bans gradients outright, so the sunset is built from flat horizontal bands (pink sky, sand light-band, teal sea, sand shore), per the build brief.
2. **No purple on panels 3–4.** The prompt describes "purple/pink" abstract grounds, but purple is outside the strict six-colour palette; the grounds are flat pink and teal fields in swapped arrangement, per the brief.
3. **Panel 2's quote is worded, not quoted.** The prompt gives the podcast thesis only as an English paraphrase ("women over 30 have no dating options") and quotes no Spanish line for it; the two bro bubbles above were written in Spanish in her register. The child's question is likewise written from the prompt's described beat. All such texts are listed in full above.
4. **Monologue lines written for this piece.** The prompt names the monologue's three beats (men perpetually present; pursuit felt as a nightmare; uncomfortable silence as the only response) without quoting lines; the four short lines on panels 3–4 were written to those beats and are listed above.
5. **Emoji render monochrome in the QA renderer.** As with №562's caption card, the card-0 emoji (🗿 ▪ 🔫 👀) come out as flat monochrome glyphs under node-canvas — verified in the QA renders, no tofu boxes — and browsers render them as standard colour emoji. The string itself is byte-verbatim.
6. **Sun-drag loop mechanics.** The prompt's "drag the sun down = loops back to panel 1" is implemented with a release threshold at the horizon line and a 6s eased rise on panel 1; a short drag that is released early leaves the sun lowered on panel 5 instead of snapping back, so the gesture never fights the reader.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png). **Determinism gate: thumb.png rendered twice and `cmp` byte-compared — identical** (re-verified after the fix pass below). Second render deleted.
- Frame-one read-back (all three sizes): caption card verbatim with #stoppodcast and #auntie, emoji as monochrome glyphs, no tofu, wobbly frame on the sand ground, "tap" hint; mobile keeps the whole square stage, nothing clipped.
- All five panels additionally verified via throwaway state-preset copies in /tmp (deleted after QA): panel 1 beach with open eyes and the "¡TÍA!" bubble; panel 2 bros/mic/child with the aunt bubble-less in the armchair, plus a both-muted preset (grey bubbles, silver text, mute marks clear of the words); panel 5 identical framing, eyes closed, creature silent, "drag" hint.
- **Fix pass during QA:** the first panel 3/4 presets showed the corner quote tags too short for two-line quotes — the second line spilled past the box ("puede elegir.", "perdona.") — and the bottom-left tag collided with the "n / 5" counter. Fixed by making the tags 88 units tall with vertically centred text, moving the bottom tags up to y=810, and relocating the mute marks to the tags' bottom-right corners (also applied to panel 2's quote bubbles). All sizes and presets re-rendered; determinism gate re-passed.
- Hygiene greps: zero `Date.now`, zero gradient calls (the word appears only in two comments), zero URLs, zero `createElement`/`AudioContext`.
