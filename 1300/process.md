# №1300 "37 Fouettes" (karen-kraven KK5, PP467)

## Prompt
Kraven's *37 Fouettes* (2015): a field of textile-pattern cells (cellulose
weave motif) across which black Labanotation glyphs march in a horizontal
score; from each glyph a particle pirouettes, spinning outward in tightening
spirals, 32 turns for 32 fouettes, leaving faint circular trails. One fouette
in vermillion: the one that failed. Landscape score layout, staff in the
upper third, pirouette field in the lower two-thirds. The score plays left to
right automatically; dragging the reading head scrubs the score, and dragging
backward rewinds and re-triggers fouettes. Each fouette carries a 1/32
Pascalian chance of being the red failed one. No dancers, no ballet literalism,
no metronome-perfect regularity.

## Build
- Single self-contained `index.html`, silent, no external assets.
- Paper white #F2EDE3 ground; very faint cellulose-weave grid; two staff
  lines; 14 abstract Labanotation-style glyphs (diamond, triangle, double
  bar, hook, ring, cross, chevron) at seeded irregular spacing along the
  staff, so the score never marches metronomically.
- Reading head: vertical ink line with a dot, advancing across the staff
  over a 40 s loop. Each glyph triggers its fouette when the head passes it.
- Fouette: a particle spiraling from the glyph's field anchor, 32 turns over
  6 s, radius growing sublinearly so the turns tighten as it spins outward;
  the trail is drawn as the analytic spiral path up to the current angle,
  older segments fading toward the path start, completed fouettes fading out
  over 2 s so trails never clutter.
- Failure roll: seeded mulberry32 stream, one roll per trigger in trigger
  order (roll < 1/32 fails, drawn in vermillion #B13A2A). First 64 rolls fail
  at trigger indices 2, 3, 28: deterministic, reproducible, genuinely chancy.
- Scrub: pointer drag moves the head; fouettes ahead of the head vanish and
  glyphs behind stay triggered, so dragging backward rewinds and re-triggers.
  On release the head resumes advancing from the release point. Head state
  is a closed-form function of the drag/release anchors and piece time; each
  fouette is a closed-form function of (t - t0). Nothing is frame-integrated.
- Frame one is exactly t = 0 via a boot flag: head parked at the staff start,
  glyphs on the staff, weave on the paper, field empty. The rAF loop is a
  plain function declaration armed from the real scheduler only (the №1278
  lesson); no performance.now()/Date.now() value reaches frame one, and no
  Math.random is used anywhere.

## QA
- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, 720x720
  thumb; all three inspected. Desktop and mobile both read: faint weave,
  staff with 14 irregular glyphs, head at the left margin, empty field below.
- Thumb rendered three times at 720x720, `cmp` byte-identical.
- Harness probe (fake rAF clock, pointer events through the piece's own
  handlers): head dot present at the left margin at t = 0; field gains
  fouette pixels between t = 3 and t = 10; after a scrub to x = 400 and a
  2 s advance, the head line sits at x = 457-458, matching 400 + (1152/40)*2
  exactly; seeded failure-roll indices confirmed (2, 3, 28 in the first 64).
- Fix round: the first render put the head at the right edge at frame one,
  because the resume anchor baseX started at 0 and the wrap modulo mapped it
  to the staff end. Fixed by initializing baseX to the staff margin on first
  sizing (guarded so later resizes never clobber a drag anchor); re-rendered
  and re-inspected at all three sizes after the fix.

## Files
- index.html (md5 c793be104a0b255c18647b8ba074af00)
- thumb.png (720x720, rendered from the finished index.html)
- qa-desktop.png (1280x900), qa-mobile.png (390x844)
