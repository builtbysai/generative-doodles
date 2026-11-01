# №1230 — gains + losses (A Letter)

Leslie Supnet study block LS7 (PP389), after her 2011 film *gains + losses*, a letter to her cousin that was never finished. A small ink figure crosses an empty landscape at its own pace while fragments of the letter drift past at different depths, and vignettes from old drawings surface at the frame edges and dissolve. Heavy, quiet, with the red scarf as the levity.

## The letter fragments

The text is the voice; there is no narration. The twelve fragments, in letter order (the first is the prompt's own):

1. respect their need for privacy
2. i am writing this slowly
3. the house is quiet in the mornings
4. you would have laughed at the garden
5. some things keep, some things go
6. i kept the blue cup
7. write back when you can
8. the train still passes at six
9. i am learning to leave space
10. forgive the short letters
11. the light here does something kind
12. yours, still

Each fragment rides its own depth: a parallax factor (0.55–1.0), its own height band, and a type size that grows with its depth. All twelve circulate on one long wrap span, so a fragment that leaves the left edge eventually re-enters from the right carrying the next line of the letter. Alpha falls off toward the frame edges, so lines arrive and depart like thoughts rather than captions.

## The walker and the world

The figure is 1/8 of the frame height, drawn in ink lines: head, torso, two legs, one arm, and a single red scarf (#A63A2E) — the only red in the piece. It walks in place near the left of the frame while the world scrolls beneath it at 26 px/s, but only while it is walking. The narrative runs on a 48-second cycle:

- **0–20 s — walk.** Four-pose leg cycle at 6 fps, arm swinging against the legs, scarf trailing in a three-step wave.
- **20–26 s — pause.** Legs together, arm down, scarf settled and hanging. The world stops with it.
- **26–34 s — sit.** Lowered onto folded legs, head bowed a little, hand resting toward a knee, scarf hanging.
- **34–48 s — walk again**, and the cycle repeats.

The landscape is three depths of hand-jittered ink polylines — a far hill line (parallax 0.25), a mid ground (0.55) with sparse marks dealt by world cell (fence posts, a bare tree, a distant house outline), and a near ground (1.0) with short texture strokes. All linework re-jitters per 6 fps step so the ink boils gently, the way hand-drawn film does.

## Vignettes

Five small ink sketches from old drawings — a cup, a train, a garden gate, a window with light, an empty chair — fade in at alternating frame edges on a hashed schedule (100-second supercycle, roughly 8 seconds each, peak alpha 0.45), sit in the margin like a memory, and dissolve. Five never crowd: only one is ever up at a time.

## Day and night

Every 40 seconds the passage changes: day paper (#E8E0CC) crossfades over 2 seconds to night (#1A1A22), the ink lines turn bone, the fragments turn bone-faded, faint stars come out, and 40 seconds later it fades back. The scarf stays red through both.

## Interaction

- **Drag horizontally** scrolls the landscape — the letter unscrolling. The figure is not moved and does not hurry; you move the world, not the walker. Walking fragments and ground marks all shift together at their own parallaxes.
- **Double-tap** starts a new letter: the fragment order and the vignette order are reshuffled from a new seed. Same words, different letter.

## Determinism and house notes

The first frame is drawn synchronously at a fixed phase, T0 = 8 s — day, the figure mid-walk with its scarf out, five fragments legible ("the house is quiet in the mornings", "some things keep, some things go", "the light here does something kind", the tail of "respect their need for privacy" leaving at the left, "forgive the short letters" sinking behind the far hill at the right), and the cup vignette faint at the right edge. The animation loop is anchored as T0 + elapsed-since-load; every position is a closed-form function of piece time plus the recorded drag offset and reseed count. Seeded hashes only — no `Math.random`, no gradients, no filters, no offscreen canvas, no audio. The thumb was rendered twice and byte-compared identical.
