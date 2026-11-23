# №1994 Britain in Colour, Pointed and Shot: process notes

SN3 / PP1241, study #260 syd-nuku. Tap-to-advance print stack.
Gallery date: 2007 · 06 · 28. Hint: "Tap to turn to the next print."

## Build

- Driver: a point-and-shoot diary as a stack of twelve prints; one print
  fills the view, the next peeks at the right and bottom edges, and a tap
  flips the top print away to reveal the next one in the fixed diary
  order. Study ref: M3 point-and-shoot diary.
- Template: `1991/index.html` structure (Visual Viewport sizing, canvas
  pinned in draw(), phone detection via window.screen with aspect
  fallback, full-bleed on phones / square on desktop, one synchronous
  frame at load, requestAnimationFrame guarded by typeof check).
- Each print is a white-bordered photo on a dark tabletop ground. The top
  print sits shifted up-left by the peek offset so the next print's edge
  and date stamp show at the right and bottom, like a print stack.
- Twelve procedurally drawn vernacular scenes, flat shapes in true film
  colour (muted greens and greys, flash-warm foregrounds, sky gone
  slightly cyan), each with a seeded light leak, a soft vignette, film
  grain, and a white date stamp in monospace at the bottom right.
- Motion: the frame holds; grain shimmers on a slow 7.3 s sine with small
  amplitude, and the stack shuffle offset wobbles on a 24 s sine. The
  print-flip runs 0.55 s: the outgoing print lifts, slides right,
  rotates slightly and fades while the incoming print slides from the
  peek offset into place. Taps during a flip are ignored. No audio.
  No em dashes in visible copy.
- Title/date plate drawn on canvas: "№1994 · Britain in Colour, Pointed
  and Shot" and "2007 · 06 · 28" top left, frame counter ("1 / 12") top
  right, hint bottom centre, clear of the date stamp.

## The 12-frame order (fixed, never reordered, never reseeded)

1. Beached Boat: 03 JUN 07
2. Ferry Deck: 04 JUN 07
3. Ridge Walkers: 09 JUN 07
4. Allotment: 11 JUN 07
5. Service Station: 14 JUN 07
6. Caravan Park: 16 JUN 07
7. Bus Stop, Rain: 18 JUN 07
8. Garden Fence: 21 JUN 07
9. Corner Shop: 23 JUN 07
10. The Pier: 25 JUN 07
11. Playing Field: 27 JUN 07
12. Terraced Street: 28 JUN 07

## Determinism

- FIRST_T = 6 s. At t = 6 the grain shimmer is at a fixed phase, the
  stack shuffle offset is fixed, and the flip is at rest, so frame one
  (Beached Boat) is byte-stable. No wall-clock or random seed at load;
  all motion is a pure function of t, and all per-frame detail is drawn
  from seeded PRNGs.
- Determinism check: two fresh loads at t = 6 give identical md5
  (e11ebbbe9952fe0cc27891acb9a973c4), and an independent re-render of the
  staged file matches the staged thumb.png byte-for-byte
  (590b5fea82f1b40b93a9a85af6dc9bc2).

## Probe results (probe-1994.js, desktop 1280x900 renders)

- Tap walk: idx advances 0 → 1 → 2 → … → 11 → 0, each settled frame
  rendering a distinct image (13 settled renders, all distinct md5s);
  frame names follow the diary order above. A second tap issued
  mid-flip is ignored and the flip still settles on exactly the next
  index. Wrapping 11 → 0 returns to Beached Boat.
- Note: the settled render of frame 0 after a full 12-tap loop differs
  in md5 from the load-time frame 0, because it is drawn at a later
  virtual clock (grain shimmer phase and shuffle offset have moved).
  The index, name and scene are identical; only the time-dependent
  shimmer differs. This is by design.
- Mid-flip renders inspected: the outgoing print lifts, slides right and
  rotates while the incoming print slides into place; no tearing or
  blank frames.
- Desktop, mobile and thumb renders inspected: title, date line, counter,
  hint and date stamp legible at all three sizes; next-frame peek
  visible at the right and bottom edges; no clipped content at 390 wide.

## Fix rounds

1. First gate: the next-frame peek was invisible, because the top print
   covered the whole stage and hid the offset print behind it. Fixed by
   shifting the top print up-left by the peek offset so the next print
   shows at the right and bottom, and the flip now ends at that shifted
   top position. Grain was also lifted (alpha 0.05–0.16) so it reads as
   visible film grain.
2. Second gate, per-frame read-through: ferry lifebuoy's white arc read
   as a smile, so it was removed; the ferry passenger's, pier figure's
   and playing-field players' heads floated above their bodies, so the
   heads were lowered to overlap; the bus-stop umbrella hovered above
   the figure's head, so it was lowered over the head, and the puddle
   blobs were faded; the caravan awning swallowed the wheels and the
   washing line crossed the second caravan's roof, so the awning became
   a groundsheet and the line was raised clear of the roof; the corner
   shop's upper windows floated in the sky, so the brick facade was
   extended up behind them. Re-gated fully after the fixes: desktop,
   mobile and thumb re-rendered and inspected; probes re-run on the
   final file. No edits since.

## Deviations from the prompt

- None in content. The prompt's seven extra vernacular subjects were
  chosen as caravan park, bus stop in rain, garden fence, corner shop,
  pier, playing field and terraced street, all in the same register.
- The date line "2007 · 06 · 28" is drawn under the title as part of the
  title plate (house rule), though the prompt itself carries no date text.

## Known visual warts (honest)

- The garden-fence roses read as flat green lollipops with pink dots
  rather than climbing growth; charming in the flat vernacular register,
  but the stems are only implied.
- The pier bench reads as a small table rather than a bench, and the
  rowing boat below the pier is small enough to be missed at a glance.
- Mid-flip, the outgoing print's title plate can clip at the top edge
  for a few frames as the print lifts; it settles cleanly.
- On phones the boat's mast reads taller and thinner than on desktop,
  because the portrait stage stretches the scene vertically.
- The allotment bean poles are very faint; the watering can sits half
  behind the gravel path and reads as a small blue mark.
