# No.729 "Public Trust" — EXPANSION #89 paul-ramirez-jonas, block 2

## Concept

Public Trust (2016) rebuilt as a marquee that never stops making
promises. A wide black board across the top third typesets promises
letter by letter in white plastic letters on an endless seeded loop:
the board never clears, it re-sets in waves, the oldest promise
dropping off as a new one arrives. Below it, a birch table holds the
five oath objects in a neat row: a book, a bottle of water, a stone, a
small bell, and two linked pinky fingers drawn as a simple icon. A
small "make your promise" line sits under the table. The visitor's
toll: TAP an oath object to choose it, then TAP the table, and a
seeded promise from the corpus is typeset onto the board with the
chosen object's icon stamped beside it, while a graphite rubbing of
the promise slides down to the bottom of the frame, yours to take.
TAP-AND-HOLD on the pinky icon performs the pinky promise: it posts
outright, with a small shake of its row. No real text entry anywhere;
the interaction is choosing and witnessing.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets.
  Palette is exactly seven specced tones: marquee black `#0B0B0C`,
  letters `#F5F5F0`, table birch `#D9B98A`, stone `#8A9BA8`, water
  `#4A7FB5`, bell `#B08D3E`, warm gray ground `#E8E2D5`. Secondary
  marks (board frame line, letter tracks, contact shadows, the bell
  band, the bottle highlight, the caption, the rubbing's gray) are
  alpha variants of those tones only; the rubbing is marquee ink at
  52% alpha on a letters-tone paper slip, per the brief.
- Canvas sized from the Visual Viewport API with resize listeners on
  both `visualViewport` and `window`; the canvas is pinned in px
  inside `draw()` every frame. Phone detection via `window.screen`
  min dimension < 700px, aspect fallback only; page ground is the
  warm gray. The marquee grid is 4 rows x 26 columns on desktop and
  4 rows x 24 columns on phones; letters are centered per cell on
  faint track lines, like plastic letters on a real board.
- Corpus: 60 short civic promises ("I promise to wave back", "I will
  return the ladder", "I promise to keep watch", ...) plus 20 generic
  "public figure" style promises ("I will lower your taxes", "I
  promise safer streets", ...), no real names. Every entry is plain
  ASCII, at most 24 characters, verified by script, so each promise
  fits one grid row at either size. Two mulberry32 pickers (auto
  stream, user posts) draw from the mix at roughly three civic to one
  public-figure, never repeating the previous pick, and respect a
  length cap for the current grid (posted promises leave two columns
  for the icon stamp).
- Queue: the board's life is a slot schedule. Each slot is one
  promise's turn: a 0.25 s lead, letters flipping in one at a time at
  0.055 s per letter (each letter scales up over 0.14 s), then a 1.7 s
  hold. Slots run back to back forever. The auto stream fills slots
  in order from a cached prefix of picks; a recorded post event is
  consumed by the first slot that starts at or after the event's
  time, so a post joins the board as the next promise after the one
  currently typesetting. Slot records snapshot the stream counters,
  so when a new event arrives the schedule tail after the event's
  time is truncated and rebuilt exactly. All state derives from
  (seed, events, t). The schedule origin sits at t = -1.05 s, so
  frame one catches the first promise mid-typeset, about fourteen
  letters in, as briefed. When a new promise starts on a full board,
  the rows ride up one row height over 0.45 s and the oldest promise
  fades while sliding left off the board.
- Rubbing: the most recent posted slot drives the bottom slip. As
  its slot starts on the board, the slip (letters-tone paper, icon
  mini at its left, the promise in graphite-gray ink) eases down
  into place over 0.8 s and stays until a newer post replaces it.
  Before any post, the bottom is empty.
- Oath objects: one icon routine draws all five objects (book in ink
  with a letters-tone page block and a brass clasp dot; bottle in
  water blue with an ink cap and a pale highlight; faceted stone in
  stone gray; bell in brass with a clapper; pinky as two linked ink
  hooks), reused at table size and at stamp size on the board and
  the slip. The chosen object lifts slightly and gains an outline
  and an underline. Pointer handling distinguishes tap (under 0.5 s,
  under 14 px of travel) from the pinky hold (0.45 s press, checked
  in the animation loop, fires once). Nothing ever reloads.
- Determinism: frame one is the synchronous draw at schedule t=0,
  never derived from `Date.now()`; elapsed time comes only from
  `performance.now()` relative to the load anchor. The animation
  loop is guarded by a `typeof requestAnimationFrame` check. An
  inert `?seed=tNN` hook pins a schedule time for QA, and
  `?seed=uNN` additionally plants one canned post event (stone,
  t=2) so the post and rubbing path can be rendered headlessly.
- No microphone, no audio. Text appears only where the prompt specs
  it: the marquee promises, the rubbing, and the caption; `<title>`
  carries the piece title.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`:
  - `qa-desktop.png` (1280x900): frame one: the black marquee spans
    the top with its first promise mid-typeset, "I PROMISE TO ST"
    with the next letter caught mid-flip; faint track lines in the
    empty rows; below, the birch table with all five oath objects
    legible in a row (book, blue bottle, gray stone, brass bell,
    pinky hooks), the "make your promise" caption under the table,
    the bottom empty.
  - `qa-mobile.png` (390x844): same frame one; the grid drops to 24
    columns, the table and all five objects survive at phone size,
    nothing clipped.
  - `thumb.png` (720x720): same frame-one state at square size.
- Determinism: `thumb.png` rendered twice and `cmp` byte-compared —
  identical; the duplicate was deleted.
- Forced states (throwaway renders via the `?seed=` hook, read back,
  then deleted):
  - t=14 (desktop): the board is full, four promises stacked oldest
    at top, the stream mixing registers as designed: "I PROMISE TO
    CALL MOM", "I WILL LOWER YOUR TAXES", "I PROMISE TO LOOK UP",
    "I PROMISE THE TRUTH".
  - u=12 (desktop, canned stone post at t=2): the posted promise
    "I WILL FIX THE FENCE" sits on the board with the small stone
    icon stamped beside it, having preempted the auto stream as the
    next slot; the graphite rubbing of the same promise rests at
    the bottom on its paper slip, stone icon included; the next
    auto promise is mid-typeset in the bottom row.
- Script audits: corpus counted programmatically (60 civic + 20
  public, none over 24 characters, ASCII only); source grep clean
  for em dashes, `Date.now`, `Math.random`, and `createElement`.

## Deviations

- The prompt gives the grid as an example ("e.g. 4 rows x 28 cols");
  it is fixed at 4 rows x 26 columns on desktop and 4 x 24 on
  phones, with the corpus capped at 24 characters, so a promise
  always fits its row at either size and the board geometry stays a
  pure function of the frame.
- The prompt's oath-object tones name stone, water, and bell; the
  book and the pinky icon therefore use the palette's ink and
  letters tones (book: ink cover, letters-tone pages, brass clasp;
  pinky: two ink hooks), keeping the piece inside the seven specced
  colors.
- "Oldest promises dropping off the left" is rendered as a combined
  re-set wave: rows ride up one row while the departing promise
  fades and slides left, rather than a letter-by-letter erase, so
  the wave reads at a glance and stays a closed-form function of
  slot start times.
- The auto stream is an endless deterministic schedule rather than
  a fixed-length loop: the marquee "never clears", so there is no
  loop point to close; determinism is kept by deriving every slot
  from the seed, the recorded events, and the schedule time.
