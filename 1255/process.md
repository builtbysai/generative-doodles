# №1255 — Irretrievable Replies

Jenna Maurice study block JM8, after *I Wish I Had One Million Things to Tell You* (2024): her first boyfriend's printed emails, read aloud while she holds up images for the words as they are uttered. Her own replies were never printed. They are irretrievable, and the piece is built around that one-way archive.

## The mapping

The stream at the bottom is the printed side — his words. When a word carrying an image is read, its picture blooms in the dark field above: the archive answering. The gaps are the other side of the correspondence — the places where her reply would stand. They were never printed, so they are typeset as absence: an underscore run in a dim gap tone, sized to the word that is not there. Nothing ever blooms for a gap, and no gap ever resolves. The field stays empty at those moments on purpose.

All text is generated for this piece. There are no real letters and no personal data.

## The letters

Three generated letters rotate on double-tap reseed. Letter 1 (the opening letter, 86 tokens):

> i _____ the photograph _____ that _____ by _____ lake the back door _____ latched and _____ are laughing in _____ of them _____ _____ never _____ to swim _____ _____ the house smelled _____ _____ and somebody else's _____ _____ the road home _____ all _____ if _____ _____ keep the letters _____ sent that _____ write _____ _____ you _____ because i _____ _____ million things _____ tell you and _____ of _____ fit in _____ envelope so _____ _____ telling _____ now _____

(underscores stand for gap tokens; the underlying words exist only as widths)

Statistics, counted from the shipped data:

- Letter 1: 86 tokens, 35 gaps (41%), 8 image words — photograph→photograph, lake→lake, door→doorway, house→house, road→road, home→doorway, letters→letter, envelope→letter.
- Letter 2 (the train): 51 tokens, 19 gaps (37%), 3 image words — road, letter, home→doorway.
- Letter 3 (the garden gate): 41 tokens, 13 gaps (32%), 4 image words — tree, photograph, house, hand.

## Reading engine

- One word at a time in a typewriter face along the bottom band (bottom 20% of the frame). The current word is underlined in the rust accent; read words sit at full alpha, unread words at 25%. The line crawls left so the current word holds at 40% of the width.
- Word durations are hashed (1.45–2.0 s, about one word per 1.7 s); image words add a half-second linger, so the reading dwells where a picture is about to appear.
- A bloom is a pure function of the reading clock: it fades in over 1.2 s from the moment its word starts, holds about 6 s, and fades over 5 s. Positions are hashed from the word index and spread across the field. At most five blooms are meant to coexist; if more pile up, the oldest yield (alpha cut). The vignettes are simple sepia line glyphs — doorway, lake, house, photograph, hand, tree, letter, road — drawn faint, never illustrated.
- When the reading runs past the end of a letter it rests, then starts the same letter again. The gaps are in the same places. They will be empty again.

## Interaction

- Tap: pause / resume the reading.
- Drag horizontally: scrub the reading backward or forward (about 33 px per reading-second). Scrubbing back un-reads words and their blooms unbloom; everything on screen is a function of the reading position plus the recorded drag offsets, so the state recomputes consistently.
- Double-tap: reseed — the next generated letter, read from the beginning.

## House notes

- Silent; no audio of any kind.
- Determinism: the synchronous first frame is drawn at a fixed phase — the reading clock set so word 14 ("latched") has just begun — with the lake bloom (word 9) in its fade and the doorway bloom (word 12) at full hold; the photograph bloom (word 3) has already faded out. The rAF loop is typeof-guarded and anchored to that phase plus elapsed time; seeded integer hashes only, no Math.random.
- Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size pinned in draw(); phone detection via window.screen (min dimension < 700) with the aspect fallback. On phones the type and vignettes scale up slightly and the same frame-one read holds.
- No gradients, no ctx.filter, no shadowBlur, no createElement, no ImageData or offscreen canvas.
- The underscore runs use the gap tone lifted one step (#4A4A57 over the deep field) so the absence registers as typeset marks rather than vanishing into the #2E2E34 band line, which keeps the exact gap-empty palette value.
