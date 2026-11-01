# №1207 — Why Make a Broken Thing

Evan Meaney study block EV8, grounded in his 2011 Electrofringe talk "Why to Make a Broken Thing" and the glitch-tutorial-as-essay tradition: the tutorial inverted into a lesson where the student's only assignment is damage.

## The piece

The composition opens perfect and corporate-clean: white field `#FAFAFA`, a precise `#E5E5EA` grid, a 6×6 field of immaculate rounded squares in a single generic gray `#8E8E93`. Below it, a near-black tally strip (bottom 8%) carries one line of chalk (`#EDEDED`): *"why make a broken thing."*

Nothing moves. The piece waits. Each **drag** of the finger — a real drag, at least 24px; a mere press teaches nothing — breaks exactly **one** thing: the unbroken cell whose centre is nearest the drag's midpoint. Breaks are never repeated on the same cell within a lesson, and there is no repair, no undo, no fix button. Breaking is the curriculum.

**The four breaks** cycle in a fixed lesson order — break *k* takes type *k* mod 4 — and each settles over 1.2 seconds, then holds forever:

- **Shear** — the square tears sideways (up to 18px, direction hashed per break) over a blue `#1B4FD8` smear trail of three fading ghost copies.
- **Fringe** — the square stays put but its borders bloom: magenta `#FF2B8D` double outlines offset to both sides, with a cyan `#00E5FF` inner edge.
- **Fray** — one corner (hashed) dissolves into rot-black scanline bars, fronted by a cyan advance line, spreading ~45% across the cell.
- **Rot** — the cell fills with rot black `#0B0B0D` from one corner in five staged coverage steps, stranding a few gray and magenta static flecks.

**The tally** is the only feedback, and it is a lesson log, not a score: *"why make a broken thing."* before the first break, *"things broken: N."* as they accumulate, and at twelve — the composition gloriously ruined — *"good. again?"* After a 4-second pause on the congratulation, a one-frame white flash resets the board to perfect clean and the strip's right end advances its small marker: *lesson 2*, *lesson 3*, …

## Relation to №1197

This piece shares its clean-grid geometry with №1197 "Dirty New Media" (joncates JC6) and deliberately **inverts** it. In №1197 the rot is autonomous — dirt is the default, it spreads on its own, and the visitor's drag is a squeegee that *cleans* (temporarily). Here nothing ever breaks on its own, the visitor's drag is the sole source of damage, one deliberate break at a time, and cleaning does not exist. Cates: the world dirties itself and you can only wipe. Meaney: the world stays clean until you choose to break it — so why make a broken thing?

## Frame one

Fixed phase T0 = 0: the pristine grid, the strip reading *"why make a broken thing."*, *lesson 1* at its right end — the board waiting for the student's first drag. The first frame is drawn synchronously at this constant phase; the rAF loop is anchored as T0 + elapsed-since-load. Breaks are recorded events (cell, type, piece-time), and every broken cell renders as a pure function of its age, so the state of the board is always recomputable from the event list. Thumb byte-compare passes.

## Verification beyond the still frame

The headless renderer draws only the fixed first frame, so the interaction was exercised by driving the piece's own script in a Node harness with synthetic pointer events: a press without movement breaks nothing; a drag breaks exactly one cell; a drag outside the grid breaks nothing; a broken cell is never re-broken; the type order cycles shear → fringe → fray → rot across all twelve breaks; a 13th drag during the congratulation does nothing; the reset fires after the 4-second pause and advances the lesson counter. A still rendered from that harness at eight breaks shows all four break types settled and the tally reading *"things broken: 8."*

## House rules

Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; CSS size pinned in draw(); phone detection via `window.screen` physical size (min dimension < 700px) with aspect fallback (on narrow screens the chalk line shrinks to fit so it never collides with the lesson marker). Seeded integer hashes only — no `Math.random`. No gradients, no `ctx.filter`, no shadowBlur, no `createElement`, no ImageData/offscreen canvas, no audio, no microphone. Silent by design; the only visible text is the chalk in the tally strip.
