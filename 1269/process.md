# №1269 "Mismatched Karaoke" (sdk-forsale SF6, PP428)

## Prompt
A noraebang screen split into two scrolling lanes: a stylized Colorado drive
(red rocks, big sky) and a Seoul drive (palaces, neon), flat and wistful.
A subtitle ball bounces; the subtitles are original nonsense verses in English
and romanized Korean that slowly desync and mistranslate each other.
Endless loop; tap a subtitle to "correct" it and it mistranslates harder;
drag scrubs both lanes together. Never click-to-reload.

## House adaptations
- **Silent visual piece.** The prompt's "looping plucked folk melody" via
  WebAudio ships with no audio output of any kind: no AudioContext, no sound.
  The bouncing ball, the scrolling lanes, and the desyncing subtitles carry
  the song visually.
- **Original verses only.** All four verses and their mistranslation ladders
  are invented nonsense (the moon rides a yellow bus; shoes that remember
  roads; a river that hums; stars counted and lost at seven). No copyrighted
  lyrics, no spinning stars, no score, no karaoke cheese.
- **Romanization kept consistent.** One early draft mixed Hangul into a
  romanized line; it was corrected to full romanization before QA.

## Mechanics (all closed-form over piece time and recorded events)
- **Lanes.** Colorado scrolls at 22 px/s, Seoul at 17 px/s; both tile from
  seeded segment generators (mesa heights/widths, palace widths/heights,
  neon colors all from an integer hash, never Math.random). A drag adds its
  x-delta to a single scrub offset applied to both lanes.
- **Subtitles.** One verse lasts 24 s. The English line's ball hops
  syllable-cluster by syllable-cluster with a sine bounce; the Korean line
  runs on its own clock, desynced by 2 s per completed loop plus 1.5 s per
  "correction", with its current hop underlined in cyan.
- **Tap to correct.** A tap inside the subtitle band increments the current
  verse's correction count, stepping its mistranslation ladder (level =
  corrections + floor(loopCount / 3), capped at 2). The line visibly changes
  to a wronger variant; nothing else announces the correction.
- **Determinism.** Frame one is drawn synchronously at t = 0 (verse 1,
  ball at the first hop, lanes at offset 0). The rAF loop is anchored as
  elapsed-since-load and guarded by a typeof check, so the node-canvas QA
  renderer draws exactly the t = 0 frame.

## Frame-one read (verified at 1280x900, 390x844, 720x720)
Top lane: pale sky, flat yellow sun, red-rock mesas over a sand ground strip.
White divider. Middle lane: night sky with flat star dots, palace blocks with
upturned blue roofs and magenta/cyan neon bars. Lower third: dark subtitle
band with a magenta rule, the yellow English line ("the moon rides a yellow
bus to Denver") with the ball above its first hop, the white romanized
Korean line below with a cyan underline on its current hop, and a dim hint
line ("tap a line to correct it · drag to scrub"). Mobile holds the same
read, full-bleed, text fitting the width.

## QA
- Rendered with node ~/workspace/tools/render-piece.js at all three sizes;
  desktop and mobile renders inspected personally.
- Thumb rendered twice at 720x720, `cmp` byte-identical.
- Token scan clean of AudioContext, createElement, getUserMedia, gradients,
  shadowBlur, offscreen canvas, getImageData, and Math.random.
- One fix round: the QA renderer has no `document.body`, so the body
  background assignment is now guarded by a typeof/existence check; the
  browser path is unchanged.
- md5 of shipped index.html: 416b0e3d19dab28dbdc9b8869cc130f5
