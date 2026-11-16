# №1812 "Self-Willed Machine" (PH5, PP1059), #237 paul-panhuysen

## Build
Canvas 2D only, built from the live №1807 template (fetched 2026-11-15 via
fetch-blob.py, sha d66764c45c933c9cf839aeb6dd0783a85ee56710). One
self-contained index.html, no external assets, no audio.

## Scene
A dark industrial green press (PRESS No. 5, with a REGISTER slip gauge)
dominates the left two-thirds. A wide white paper feed runs diagonally
through it, laying down 260 seeded falling dashes of primary blue, yellow
and red ink that drift down the feed. On the right, a pin-up wall labelled
KEPT MISTAKES fills slowly over the loop; bottom left, a bin labelled GOOD
PRINTS collects the good sheets. Title "SELF-WILLED MACHINE", date
"2006 · 12 · 28" and hint "WATCH ONLY" are drawn on canvas.

## Loop and event schedule (closed form, no live state)
Loop length 300 s. Misprint events on a fixed authored irregular table:
18 s slip, 47 s overprint band, 83 s plaid, 121 s slip, 158 s band,
196 s plaid, 229 s slip, 262 s band, 289 s plaid. Each misprint is a
segment that travels down the feed over 8 s, then the operator's hand
enters from below on a 12 s scripted cycle (starting 4 s after the
event): rises to the feed, carries the sheet diagonally to the wall,
pins it, retreats. Pinned prints accumulate in nine authored wall slots
and the wall resets when the loop restarts. The bin gains one sheet every
45 s, capped at three. The register gauge needle jumps while a misprint
is on the feed.

- Registration slip: the dash field inside the segment is redrawn offset
  along the feed, bracketed by red rules.
- Overprint band: translucent blue and red bands across the paper.
- Plaid strip: a blue-check fabric segment replaces the paper, with the
  dash pattern landing on the weave offset by 7 px.

## Frame one (t = 60 s, fixed phase)
Early in the loop, wall nearly empty: the 18 s slip misprint is pinned
(slot 0, top left of the wall) and the hand is mid-cycle pinning the
47 s overprint misprint (slot 1), fingers up against its bottom edge.
No misprint segment is on the feed at this instant (the 47 s band has
already been collected); the next event is the 83 s plaid strip. The
bin holds two good prints. Frame one is byte-comparable: seeded RNG
only, no Date.now or Math.random, and the animation loop continues
from t = 60 s.

## Deviations from the prompt
None in intent. Two implementation notes, both per the spec's adaptation
flag: (1) there is no accumulated-state rendering from a live buffer;
dash fields, misprint events, the hand cycle and wall contents are
re-rendered each frame from fixed parameters plus the closed-form event
schedule, so frame one stays byte-comparable; (2) the hand is a simple
articulated sprite (palm, four fingers, thumb, dark sleeve cuff), not a
detailed figure, keeping it a collector of mistakes, not a hero.

## QA
- node render-piece.js at 1280x900, 390x844 and 720x720; all three PNGs
  read and inspected.
- First gate found three faults, all fixed and re-gated: the PRESS No. 5
  plate was half hidden behind the paper feed (moved to the top right of
  the press body); the KEPT MISTAKES label was overlapped by the top
  pinned print at small sizes (moved to the bottom edge of the wall);
  the hand was hidden behind the print it was pinning (the hand now sits
  below the print with fingers up against its edge, and the sheet is
  drawn on the wall, not in the hand, during the pin phase).
- Event branches exercised by rendering time-shifted copies at t = 20 s
  (slip), t = 50 s (band) and t = 85 s (plaid): all render cleanly; the
  plaid frame shows the blue-check segment with misaligned dashes, the
  gauge needle jumped, and two prints pinned.
- Determinism: three consecutive 1280x900 renders of the shipped file
  are byte-identical (md5 20f1227e443e7f1aad8bb9cc422144ba).
- Desktop render: press, diagonal dash feed, gauge, bin and wall all
  legible; title, date and hint plates clear.
- Mobile render (390x844): full-bleed field composition holds; prints
  and hand remain readable at small size.
- Thumb render (720x720): same composition, all plates legible.

## Gallery entry
- n: 1812, title: "Self-Willed Machine", date: "2006 · 12 · 28",
  note: "The press keeps misprinting; the mistakes get pinned up. Watch only."
- Title checked against live pieces.json (2,008 entries): zero verbatim
  duplicates. №1812 does not exist yet.
