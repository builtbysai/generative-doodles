# №1260 — Oracle Walk

Esther Hz study block EH5, after her *Oracle* (2025, Union Hall): visitors enter
blindfolded, guided hand/arm/shoulder past 16 pieces, removing the blindfold only
when they feel called. Her answer to the statistic that viewers average eight
seconds per piece. Sixteen pieces hang here; the walk lets you properly see
exactly one of them.

## The ritual

1. **Prologue.** The wall from afar: sixteen small framed pieces in a dim room,
   barely lit, none of them readable. Two lines of gold type:
   "hold your question in mind." / "when you are ready, press and hold to be
   blindfolded." A press-and-hold of 1.2 s (a thin gold line fills while you
   hold; moving or releasing cancels) lowers the blindfold over one second.
2. **The walk.** Near-black. A flat-drawn hand in skin tone (#C9A184), pointing
   gently right, is the guide. You drag; the drag sets a destination and the
   hand walks to it at its own capped pace (0.30 screen-widths per second) — pull
   fast and it lags, then catches up. You are being led, not driving. Around the
   hand is a small breathing hole of dim visibility. Each piece sits at a fixed
   interval along a wall roughly five screen-widths long; as the hand nears one,
   its outline and a breathing glow gather (proximity-squared falloff), its art
   ghosts in at low alpha, and near enough, its number warms up in gold. You
   sense the pieces. You do not see them.
3. **The call.** Tap while a piece is within reach (within 45% of the spacing)
   and the blindfold lifts once — the only lift of the walk. The room brightens,
   that piece hangs large at center in a pale frame, its commentary in bone
   italic beneath it, and below that, in gold, the question it asks back. The
   revelation holds 14 seconds, or ends on a tap.
4. **The end.** Dark again. If a piece was called: "the walk ends. one piece was
   yours." If the hand reaches the wall's end uncalled: "no piece called. that
   is also an answer." After about 11 seconds, or on a double-tap, the room
   returns to the prologue. A new walk may call a different piece; no walk ever
   shows two.

## House adaptations

- The prompt's typed personal question and typed reply become silent ritual
  beats: the question is held in mind, never typed; the revealed piece's
  question back is shown, never answered in the piece. No text input exists in
  a canvas doodle, and the silence is closer to the original anyway.
- The original's vertical scroll becomes a guided horizontal walk along one
  wall, with the drag pace capped — the guidance is the medium.
- The blindfold's "soft vignette with breathing holes" is built from layered
  flat-alpha discs (no gradients, no filters, per house rules), and all sixteen
  artworks are flat procedural shape programs that scale from thumbnail to
  full-frame, so the revealed piece is the same object you sensed in the dark.

## The sixteen pieces

| # | type | commentary | question back |
|---|------|-----------|---------------|
| 1 | rings collage | cut from a calendar i kept meaning to throw out. | what date do you keep circling? |
| 2 | bead grid | beads from a necklace that broke on the bus. | what came apart in public? |
| 3 | stacked stones | stacked by the river. the river was unimpressed. | what are you balancing that isn't yours? |
| 4 | thread lines | thread my grandmother measured twice and cut once. | what are you still tied to, on purpose? |
| 5 | paper-cut sun | made during a power outage. it remembers the dark better than i do. | who do you call when the power's out? |
| 6 | clay coil | coiled at the kitchen table. the table wobbled the whole time. | what are you making slowly, on purpose? |
| 7 | mirror shards | a mirror that fell and got a second job. | which version of you does the dishes? |
| 8 | paint field | painted over a grocery list. the list won. | what did you mean to buy instead? |
| 9 | moon phases | the moon, sixteen times, from the same porch. | what do you check on every night? |
| 10 | ladder | a ladder for getting down, mostly. | what are you climbing down from? |
| 11 | woven net | mended three times. it holds what it holds. | what keeps slipping through? |
| 12 | seedling | planted the week the letter came. | what are you growing that nobody's seen? |
| 13 | wave lines | drawn from the sound of the radiator, not the sea. | what noise have you learned to sleep through? |
| 14 | two masks | two masks. they take turns being the brave one. | what are you not saying in the group chat? |
| 15 | button cluster | spare buttons from coats i no longer own. | what are you keeping, just in case? |
| 16 | contour map | a map of the neighborhood as it was told to me. | whose directions are you still following? |

Commentary and questions are written crowd-tiny and specific, in Hz's wry,
earnest register — no mystical-wisdom voice, no crystal-ball cliches.

## House rules and determinism

Silent; no external assets; no gradients, canvas filters, shadow blur, element
creation, pixel buffers/offscreen canvas, audio or microphone APIs, no
unseeded randomness (a single integer hash drives the prologue's glow phasing).
Canvas size comes from the Visual Viewport API with resize listeners on both
visualViewport and window; the CSS size is pinned in draw(); phone detection
uses window.screen's physical size (min dimension < 700) with the aspect
fallback. The prologue goes to two rows of eight on phones. The synchronous
first frame is drawn at fixed phase 0 — the prologue — and the rAF loop
(typeof-guarded) is anchored to that phase. All animation (breathing glows,
the hand's bob, state timing) is a function of the anchored phase and recorded
pointer events.

## QA

- `qa-desktop.png` (1280×800) and `qa-mobile.png` (390×844): the prologue. All
  sixteen frames on the wall band (a first pass overflowed the desktop width —
  the frame size is now computed from the column count so the row always fits),
  instruction lines reading exactly: "hold your question in mind." and "when
  you are ready, press and hold to be blindfolded."
- `thumb.png` (720×720) rendered twice: byte-identical (cmp). Duplicate deleted.
- Forced reveal (temp copy, discarded): piece №5, the paper-cut sun, large and
  framed; commentary "made during a power outage. it remembers the dark better
  than i do."; question back "who do you call when the power's out?"
- Forced walk (temp copy, discarded): near-black field, the guide's hand inside
  its breathing hole; with the hand rested on piece №3, a pixel probe at the
  piece's glow patch read rgb(83,79,73) against background rgb(10,9,8) — the
  proximity glow confirmed numerically, not just eyeballed.
