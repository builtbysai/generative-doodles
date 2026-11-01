# №1247 — Key Phrase

Adán De La Garza study block ADG8 (PP406), after his *Key Phrase* (2018): a zine
of problematic machine translations screenshotted from a cheerful language app —
"at least 25% of the translations were problematic." The piece rebuilds that app
as a procedural flashcard machine. The machine is sunny, encouraging, and
completely unbothered by what it is teaching.

## What you see

An app-green field with flat sunny circles and a darker ground band. Across the
top: a close button (the piece's one red accent), a progress bar that fills
across a ten-card lesson, and a streak flame whose count only ever rises. In the
center, a white flashcard at 70% of frame width: a generic geometric owl (yellow
disc body, two big eyes, triangle beak — no real mascot likeness), the line
"The owl says:", and the phrase in big friendly caps.

Each card runs an 8-second cycle. It flips in with a scale-x squash (0.3 s),
holds, and at 5.2 s a big green checkmark badge and the word "Correct!" slam in
with a three-step bounce (overshoot 1.45 → squash 0.86 → rebound 1.12 → settle)
and hold for a full 2 seconds — long enough to feel wrong. The stamp appears
regardless of anything; there is nothing to answer and no way to be wrong, which
is the point. Then the card leaves and for 0.8 s the mascot's face loads: a
yellow disc that stretches, wobbles, and grows a small melt-drip underneath
before the next card flips in.

First frame (fixed phase T0 = 5.4 s): the first documented phrase,
"IT IS NOT YOUR LAND," is on the card and the "Correct!" stamp has just slammed
— caught in bounce frame 2, squashed flat. Progress bar 1/10, streak 1. The
approval and the wrongness in a single frame.

## The phrase bank

Four phrases are De La Garza's documented screenshots, verbatim, and always open
the run in order:

1. IT IS NOT YOUR LAND
2. YOU HAVE NO CULTURE
3. WE DO NOT THINK
4. I NEVER MAKE FOOD FOR MY CHILDREN

Fourteen generated variants follow in the same machine-flat grammar (seeded
shuffle after the documented four):

5. THE RIVER IS NOT YOURS
6. WE EAT AT NIGHT
7. YOUR HOUSE IS TOO QUIET
8. I HAVE NO GRANDMOTHER
9. THE CHILDREN ARE WATCHING
10. THIS LAND REMEMBERS
11. THE MOUNTAIN DOES NOT MOVE FOR YOU
12. WE COUNT THE RAIN DIFFERENTLY
13. YOUR NAME IS DIFFICULT TO KEEP
14. THE ROAD ENDS BEFORE THE VILLAGE
15. NOBODY HERE OWES YOU A SONG
16. THE SEA WAS NEVER EMPTY
17. MY FATHER SPEAKS TO THE STONES
18. WE DO NOT SELL THE MORNING

The uncanniness is aimed at the machine and its colonial phrase-stock, never at
a real person or group, and never at learners. The app finds all of it equally
correct.

## Interaction

- **Tap** — next card now.
- **Drag** — skip the whole lesson: jump to the first card of the next lesson.
  The progress bar resets; the streak keeps counting.
- **Double-tap** — reseed the phrase bank (new shuffle, new salt). The streak
  carries over: the streak is forever and never falls.

## House notes

- Ships **silent**. The app would chirp; the house ships it mute.
- Flat fills only: no gradients, no canvas filters, no shadow blur, no
  offscreen canvas, no image data. The card's drop shade is a flat offset
  rounded rect, the leaks and melts of other pieces reduced here to polygons.
- No `Math.random` anywhere: the phrase order is a Fisher–Yates shuffle driven
  by an integer hash of the reseed salt.
- Determinism: the first frame is drawn synchronously at the fixed phase
  T0 = 5.4 s; the animation loop is anchored to that phase plus elapsed time,
  and guarded by a `typeof requestAnimationFrame` check, so the QA renderer's
  single synchronous pass produces the exact shipping frame.
- Canvas size comes from the Visual Viewport API with resize listeners on both
  the viewport and the window; the canvas CSS size is pinned in `resize()`;
  phone detection uses `window.screen` physical size (min dimension < 700 px)
  with an aspect-ratio fallback.
