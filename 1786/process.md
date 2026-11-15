# №1786 "Fifty Drawings While Listening" (SR3, PP1033)

The driver is the hand: one white card slides forward from the stack and a brush draws it in real time, short wave-like ink gestures swelling and thinning to an invisible ocean rhythm, while finished cards fan into a done pile at the edge.

## Prompt source

TASKS.md, EXPANSION #234 steve-roden, prompt block PP1033 (TASKS lines 23277-23358, read 2026-11-15 from the local TASKS.md copy): "A stack of 50 small white cards on a dark table. One card at a time slides forward and a hand-like brush draws it in real time: short, wave-like ink gestures that respond to an invisible ocean rhythm, strokes swelling and thinning, never the same twice. Finished cards slide to a done pile, its edges visible as a growing fan. Palette: near-black table, white cards, one ink color (warm grey-blue) for the gestures, rust-brown for the box lettering glimpsed at the start. Composition: close overhead view, the active card centered large, the stack and the done-pile fanning at the edges. Motion/interaction: watch-only. Each card is a short performance of about ten seconds; the cycle runs through all 50 before reshuffling the gesture vocabulary."

## Build

Canvas 2D only, built from the live №1785 index.html template (page structure, plates, Visual Viewport sizing, phone detection, guarded requestAnimationFrame loop). Near-black table (#171310 radial to #100d0a) with faint seeded grain. Active card 4:3, warm white (#f7f3ea), centered large; stack of remaining cards at the left edge on desktop (top-left on phones) with a faint pencilled count; done pile fanned at the right edge on desktop (bottom-right on phones). Ink is warm grey-blue (#67788c), drawn as a wet-ink halo pass plus a core pass, line width swelling mid-stroke and thinning at the ends. Box lettering in rust-brown (#9c4a24) on a dark box (#2a1f16).

Gesture vocabulary: per card, a fixed authored table from mulberry32(1786 * 7919 + cycle * 131 + k * 104729 + 13). Each card holds 5 to 9 strokes; each stroke is a closed-form wave (start point, direction, length, amplitude, frequency, phase, max width) drawn segment by segment. Stroke s of a card runs during its slice of the 10 second card slot, so the drawing unfolds in real time. The vocabulary reshuffles each 500 second cycle (cycle index feeds the seed). No Math.random() or Date.now() anywhere; frame one is a closed-form function of piece time.

Timing: 5 second prelude (the rust box is glimpsed, then slides up until only a sliver peeks over the top edge), then card k runs from 5 + k * 10 seconds for 10 seconds each. The active card slides forward from the stack during the first 1.5 seconds of its slot. Watch-only: no pointer handlers, no click-to-reload. Title plate "Fifty Drawings While Listening", date "2006 · 12 · 02", hint plate "Watch only."

## Frame one (t = 60 s)

Fixed phase at t = 60 s, cycle 0, card index 5 (card 6), u = 0.5, so card 6 is halfway through its strokes: 9 strokes in its vocabulary, 4 complete and the 5th halfway drawn, with the brush visible at the current stroke point. Done pile: 5 finished cards (indices 0-4, with 8, 9, 5, 5 and 6 strokes respectively) fanning at the right edge. Stack: 44 cards remaining, shown as a layered pile with the pencilled note "44 left". Box: only a bare box edge peeks over the top edge at frame one, since the prelude ended at t = 5 s; the rust lettering draws only while the box is revealed during the prelude, so no clipped text ever shows (parent gate fix: the lettered sliver read as clipped text at the top edge on desktop and behind the title plate on phones).

## Deviations from the prompt

1. Strokes are clipped to the card rect, so no gesture runs off the paper. The prompt places every gesture on the card; the clip enforces that.
2. A small brush (dark handle, ink tip) is drawn at the current stroke point while a stroke is in progress, to make the hand legible. The prompt names a hand-like brush but does not show one.
3. A faint pencilled "44 left" count sits beside the stack, to make the visibly reduced stack legible at a glance.
4. The box is a sliver at frame one rather than a visible box: the prompt asks for the lettering only "glimpsed at the start", and the full box is visible only during the 5 second prelude.
5. No audio. The prompt states no audio is needed; the piece is about the hand, not the sound.

## QA

Rendered with node ~/workspace/tools/render-piece.js from the actual script at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three PNGs inspected visually. Desktop: near-black table, active card centered large with four and a half warm grey-blue wave gestures, brush mid-stroke, done pile of 5 cards fanning at the right edge, stack of 44 at the left with "44 left", rust box sliver at the top edge, title/date and "Watch only." plates legible, nothing clipped by the plates. Mobile: same composition reflowed, stack top-left, done pile bottom-right, no overlaps, plates legible. Thumb is the 720x720 render. First gate caught stroke tails running off the done-pile cards; fixed by clipping strokes to the card rect and re-gated all three sizes after the edit. No em dashes in visible copy. Deterministic: seeded RNG only, frame one at fixed phase t = 60 s.

## Gallery note

"Fifty cards, one brush, an ocean rhythm. Watch only."
