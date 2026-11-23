# No.929 "I Am a Piece. Ask Me Anything."

Study #114 stefpos, PP90 "The Piece Is the Ruler" (Posavec and Quick, *I Am a Book*, 2020).

## Concept

A first-person narrator that is also its own measuring instrument. The page is a book page: paper ground, a gold measured strip living in the upper field, a thin rule at 66% height, and the narrator's caption card in the band below. The narrator advances on its own slow timer (7 seconds per card, seamless wrap through 10 cards); it does not wait to be asked. Every number it states is measured live from the render at draw time: its width, its height, the exact length of the strip it is showing you, the seconds you have spent looking, the marks it is drawn with, and the height you last held it at, converted to anteater-tongues. No charts, no axes, no graphs: the strip is the visualization. Typography is the voice; there is no speech synthesis.

Interactions: tap turns the page (advance one card, page-turn wipe, paper swish). Drag upward lifts the whole stage with your finger and the caption switches to the live altitude reading while held; release settles it back on a closed-form damped spring, and the piece remembers the lift for card 6. Double-tap slams it shut: a full-screen ink flash of exactly 200 ms, then it reopens on a seeded jump of 1 to 9 pages (mulberry32, never a reload).

## Construction

Single self-contained `index.html`, canvas 2D only, no external assets. Canvas size from the Visual Viewport API with resize listeners on both `visualViewport` and `window`; `canvas.style.width/height` pinned in px inside every `draw()`. Phone detection via `window.screen` physical size (min dimension < 700 px) with the aspect fallback (`h > w * 1.15`); the light-ground phone rule holds: page ground is the paper tone and caption text wraps greedily by measured word widths to stay inside the padded width at 390 px.

State is closed-form over (t, recorded events): the card anchor (index + piece-time), the double-tap pending window (0.35 s), the drag lift, the release event feeding the spring `lift * exp(-3.2 dt) * cos(11 dt)`, and the slam flash window. Frame one is the synchronous `draw(0)`: card 1, strip at rest, no wipe (the opening card is flagged settled so the page-turn wipe only plays on real page changes). The rAF loop is `typeof`-guarded; all audio is lazily created on the first pointer gesture and `typeof`-guarded throughout: page swish (band-passed noise), slam thump (72 Hz sine drop), paper creak while lifting. The piece renders complete in silence.

Card visuals, each a 1:1 embodiment of its text:
1. The gold strip, resting (half the canvas width).
2. The strip spanning exactly the canvas width, edge to edge, ink end ticks at both rims.
3. A strip of exactly S px, where S is 60% of the width rounded, the same S the caption states three times.
4. A thin ink progress line of the elapsed seconds (capped at 600 for the line's length) with a gold cap; the count in the text is uncapped and always the true whole seconds since load.
5. The strip on a gently tilting stage (rotation is a pure function of t).
6. The strip drawn raised by the last recorded lift, clamped to the field; before any lift it rests, and the caption honestly reads 0.0.
7. A ring of exactly M ticks around the strip; M is `TICKS.length`, counted from the array that is drawn, never typed into the text.
8. A vertical gold strip at the left edge whose rect height is exactly the canvas height, ticks at both rims, drawn across the rule (it rides the lift offset with the rest of the stage, and its length never changes).
9. The strip dimmed to 45% alpha, expectant.
10. The museum: cards 2, 3 and 8's strips together at low alpha.

### Card script (verbatim templates; bracketed values are measured at draw time)

1. "Hello. I am a piece. Ask me anything."
2. "I am [W] pixels wide. I weigh nothing, but if I were printed I would be heavy."
3. "This strip is [S] pixels long. Not [S-1]. Not [S+1]. [S]."
4. "You have been looking at me for [T] seconds. In that time about [4T] babies were born. I counted none of them."
5. "Lift me. Go on. I am data, I can take it."
6. "You are holding me [A] anteater-tongues up. Impressive."
7. "I am drawn with [M] marks. Every mark is load-bearing."
8. "I am [H] pixels tall. From rule to rim."
9. "Slam me shut and I will tell you something new. That is the deal."
10. "That is everything I know. It was all true. Ask me anything."

### Truth checks performed

- W and H are `Math.round(viewW/viewH)` from the Visual Viewport measurement, the same values that size the canvas; card 2's strip is drawn with length argument `viewW` itself, and card 8's strip with rect height `viewH` itself, so the drawn object and the stated number are the same quantity by construction.
- S is computed once per draw as `Math.round(viewW * 0.6)` and used both as the strip's drawn length and as the text value (including S-1 and S+1, computed by arithmetic, not typed). At 720 px wide, S = 432 and the strip is drawn 432 px.
- T is `Math.floor(t)` of the piece's own elapsed clock (seconds since load); the babies figure is exactly `4 * T` computed in the same function, matching the caption's "about" claim of roughly four births per second.
- A is `(Math.round(lastLiftPx * 0.021 * 10) / 10).toFixed(1)`, where `lastLiftPx` is the actual pixel lift recorded from the pointer (live during a hold, remembered after release). One decimal, always formatted.
- M is `TICKS.length` (48) read from the array the draw loop iterates; the loop draws exactly one tick per array entry.
- The slam flash duration is the constant 0.2 s (200 ms), as specced.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Renders cleanly in silence (no AudioContext in the harness; every audio path is guarded).
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared identical; the duplicate was deleted. Frame one contains no time-dependent text (card 4's seconds reading is the only clock-bound card, and it is not frame one).
- First pass bug, fixed: the page-turn wipe also covered frame one (the opening card counted as freshly changed), hiding the strip behind the wipe clip and leaving a stray page-edge line. The opening anchor is now flagged settled; the wipe plays only on real page changes. Re-rendered all sizes and re-verified the byte-compare.
- Read-back: desktop, mobile and thumb all show paper ground, the gold strip with ink end ticks centred in the upper field, the thin rule, and card 1 in the band ("Hello." in ink, "I am a piece." in brag red, "Ask me anything." in ink). Mobile text is one line, legible, unclipped at 390 wide.
- Grep-verified: no em dashes anywhere in the file (including all card texts), no gradients, no shadowBlur, no ctx.filter, no offscreen canvas creation, no Date.now, no Math.random, no absolute URLs. All randomness is the seeded mulberry32.

## Deviations

- Card 4's strip: the brief pairs the seconds text with "a thin progress line of the elapsed seconds"; the line's drawn length saturates at 600 seconds so the object stays on the page, while the stated count T is never capped and stays literally true. The line is a progress bar for the first ten minutes, the number is forever.
- Card 6 before any lift: the card still enters the rotation on the timer (the narrator does not wait), showing the strip at rest and the honest reading 0.0 anteater-tongues, exactly as the brief allows.
- Card 8's strip is drawn at the left edge inside the padded field rather than at x = 0; its length is exactly the canvas height either way, and the end ticks mark both rims of the canvas. It is drawn under the caption text layer so the narrator's words stay readable where they cross.
