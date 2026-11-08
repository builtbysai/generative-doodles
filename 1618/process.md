# №1618 "39508" (SP3, sableraph #213, PP865)

## Design
A dense page of Adam Smith, mid-erasure. The opening sentence of The Wealth of
Nations (1776) is tiled into a fixed 37,326-character corpus that fills a square
text block with book margins on paper #EFEDE6, in ink #2A2A2E. With each edition
bought, the next four characters are struck, left to right, top to bottom;
struck characters collapse to hairline paper-colored gaps, so the page is a
ledger of absence as much as of text. Frame one shows the piece at its most
alive: 1,648 characters struck, about 55% of the visible page gone, the top
half empty and the bottom half still dense. A single counter line sits at the
bottom, "EDITIONS 412 / 10000 · CHARACTERS REMAINING 35678", with a thin red
ledger rule #B03A2E beneath it. Nothing else. One tap is one edition; there is
deliberately no reset.

## Corpus
Public-domain passage, Adam Smith, The Wealth of Nations, Book I, Chapter 1,
opening sentence (225 characters including the trailing space): "The greatest
improvement in the productive powers of labour, and the greater part of the
skill, dexterity, and judgment with which it is anywhere directed, or applied,
seem to have been the effects of the division of labour. " The passage is tiled
166 times and cut to exactly 37,326 characters, so the counter arithmetic is
exact: 37,326 - 412 x 4 = 35,678 remaining.

## Mechanics
- Per-edition count: 4 characters, fixed. Total editions 10,000; the corpus is
  fully struck after edition 9,331 (9,331 x 4 = 37,324, the last two characters
  fall with edition 9,332), after which further taps change nothing and the
  counter reads 0 remaining.
- Starting erasure index: 1,648 characters (412 editions x 4). Chosen because
  the prompt's own example counter reads EDITIONS 412 / CHARACTERS REMAINING
  35678, and 1,648 of the 2,992 characters visible on the page is 55% struck,
  which is the prompt's "half text, half absence" mid-erasure state.
- The visible page shows the first 2,992 characters of the corpus on a fixed
  88-column by 34-row monospace grid (rows are computed from the block height
  and are the same at every size, since all geometry is a fraction of the
  square). Erasure proceeds through the corpus in order, so the struck region
  is a clean top-down sweep.
- Tap is the transaction and the only interaction: pointerdown records the
  point, pointerup buys one edition only if the pointer moved under 12px (a
  drag is not a tap) and at least 2 seconds of piece time have passed since the
  last tap (one tap per fade window, so speed cannot be gamified). The newly
  struck four characters fade from full ink to paper over 2 seconds.
- Persistence: the edition count is stored in localStorage under
  `doodles-1618-editions` on every tap and restored on load when present and
  valid (0-10000). All localStorage access is guarded by a typeof check and
  try/catch, so the node-canvas QA harness (no localStorage) renders the fixed
  start. There is no reset control anywhere; irreversibility is the piece.

## Frame-one determinism
The first synchronous frame is a pure function of fixed constants: the corpus,
the 88x34 grid, the starting edition count 412, and no fade in progress
(fadeStart is -infinity until the first tap). The rAF loop is guarded by a
typeof check and reduced-motion renders the static frame. Verified: two
independent 720x720 thumb renders have identical md5
(71d411cf9baf1bbcf58ca2b9d262143c).

## Deviations
- The prompt says "tiny serif text"; the text is set in Courier New monospace
  on a fixed-width grid. This is the task's own allowance ("a monospace-ish
  grid or precomputed line breaks") and it is what makes the no-reflow rule
  hold exactly: struck characters leave their cell empty and nothing after
  them shifts. Courier is a typewriter serif, so the page keeps its printed
  character.
- The text is hard-wrapped at 88 characters per line, so words split across
  line ends. The mechanism erases characters bluntly, and the dense page is a
  texture first; word-aware wrapping would change which characters are visible
  per line and break the fixed-grid guarantee.
- The page shows the first 2,992 characters of the 37,326-character corpus;
  the counter counts the whole corpus, as the prompt's example does. Once
  erasure passes the visible window the page keeps emptying until nothing
  remains, which is the piece's own end state.

## House rules
Visual Viewport sizing with listeners on visualViewport and window; canvas
pinned in draw() via style width/height in px; phone detection via
window.screen with aspect fallback; centered square text block on every size,
page ground is the piece's own paper #EFEDE6, hint in dark ink to match; one
synchronous frame at load; requestAnimationFrame guarded by typeof check; no
Math.random anywhere; no click-to-reload; no reset button; no em dashes in
visible copy. Title "39508", date "2006 · 06 · 17" (formula date), hint "Tap to
buy an edition."

## QA
Rendered the actual script with node-canvas at 1280x900 desktop, 390x844
mobile, and 720x720 thumb; inspected all three. Fix rounds: (1) the counter
and hint were left-aligned from center because drawText sets textAlign left;
restored center alignment before the counter, so the counter now fits on
mobile and thumb; (2) the red ledger rule antialiased to pale pink on mobile
at a fractional y, so its y is now rounded and its thickness raised to at
least 1.5px; verified solid red on all three sizes by pixel scan (ledger rows:
desktop 806, mobile 576, thumb 645, each exactly the computed position).
Tap behavior verified headlessly: one tap advances exactly one edition
(412 to 413, remaining 35,678 to 35,674), persists to localStorage, an
immediate second tap is ignored, a drag is ignored, and a reload restores
the persisted count.
