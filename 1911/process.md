# №1911 The Letter Before the Anthem (MB8, PP1158, study #249 michele-bonifati)

## Driver

Memory first, then music: the letter writes itself, dissolves, and the
anthem keeps returning to its final line.

## Mechanism

2D canvas, visual only, no WebAudio and no audio autoplay. The whole piece
is a closed-form schedule, a pure function of piece time t. The letter
writes line by line (3.4 s of writing per line, 1.4 s pause, one line every
4.8 s), holds, then dissolves over 24 to 28 s while the anthem ground fades
in. From 28 s the anthem runs in 16 s cycles: 12 s of music, then 4 s where
the staff dims and the letter's final line returns as a quiet caption. Each
cycle is a return of the same fixed twelve-note folk-like melody, re-voiced
further from the original each time.

## The letter

Original lines written for this piece. No real anthem lyrics, no real names
of historical figures, no slogans.

1. He was nineteen when the hills took him in.
2. He carried no flag, only a coat and a name.
3. His letters home came folded small, in pencil.
4. He wrote that the night was cold, the valley kind.
5. Remember me the way the song remembers.

Line 5 is the caption that reappears between anthem repetitions. The
letter draws in italic serif with a small ink pen dot at the end of the line
still being written, over faint ruled lines on bone paper.

## Melody and harmonizer progression table

Fixed melody, twelve scale degrees, one note per second of the music window:
[0, 2, 4, 5, 4, 2, 0, -2, 0, 2, 4, 7]. The same melody every repetition.

Voicings, semitones above the bass for each return. Each return reaches
further from the original:

- Return 1: [0, 4, 7] — close major triad.
- Return 2: [0, 3, 7, 12] — minor triad with an octave.
- Return 3: [0, 4, 7, 11, 14] — added major seventh and ninth.
- Return 4: [0, 3, 6, 10, 15, 19] — wide stack reaching past the octave.
- Return 5 and later: [0, 4, 8, 11, 15, 19, 24] — two octaves.

The voicing draws as a column of dots under each melody note, below the
five-line staff, so the widening is visible as the columns grow taller.
A small "Return N" label under the staff counts the returns.

## Frame one

FIRST_T = 12.0 s. At 12.0 s lines one and two are complete and line three
is about two thirds written, with the pen dot still on the page. Every
written character is a pure function of t, so frame one is deterministic
and byte-reproducible. No wall clock, no Date.now(), no unseeded
Math.random (only a seeded sin hash for a tiny per-line baseline offset).

## Interaction

Watch only. No pointer handlers, no audio, no click-to-reload. The
mechanism is remembrance; a control would make it a singalong.

## Palette

Hand-picked from the named colors in the prompt (no study file exists for
michele-bonifati). Bone paper #f1ead8 on a darker bone ground #ddd2b8,
sheet edge #b9ab8a, iron-gall ink #2b2620, faint ruled ink #8a7f6d,
secondary ink #6e6558. Anthem section: deep red #7c1712, near-black red
#1a0d0b for staff lines, bone note heads #efe6d0, chord dots #e8dcc2,
caption line in pale grey #cfc9bd.

## Composition

Field-like: full-bleed on phones, a centered paper sheet on desktop with
the page ground in darker bone. Title plate top-left, hint centered at the
bottom, both drawn twice so the ink flips to pale grey when the anthem
takes over. The letter fills the frame; the ensemble (staff, melody notes,
chord stacks) plays across the same frame as the letter dissolves.

## Motion

All motion runs near 1 Hz, well under the 14 Hz ceiling. Writing is about
13 characters per second, the melody advances one note per second, the
now-line sweeps once per 12 s. Prefers-reduced-motion shows the static
first frame.

## Deviations

- The prompt's technical approach names WebAudio and a spoken reciting
  voice. Per the Franke audio rule, this piece is visual only: the
  handwriting is a closed-form stroke schedule, the harmonizer is a fixed
  progression table, and there is no audio at all, so nothing can autoplay.
- The prompt's "ensemble plays in the letter's margins" is rendered as the
  staff fading in across the frame during the dissolve, with the chord
  stacks below it, rather than literal figures in the margins.
- No karaoke, no singalong, no sloganizing, no historical-footage
  slideshow. The anthem is notes and chord stacks only, never lyrics.

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js
and visually inspected:

- Desktop 1280x900: bone paper, title "The Letter Before the Anthem" and
  "№1911 · 2007 · 04 · 06" top-left, two complete italic lines, third line
  mid-write with the pen dot, ruled lines, hint at the bottom. Legible,
  no overlaps.
- Mobile 390x844: full-bleed paper, same first frame, letter font fitted
  down so the longest line clears the margins. Legible, no clipping.
- Thumb 720x720: the 720x720 render of the final index.html, same first
  frame, delivered as thumb.png.
- Anthem phase checked with a temporary FIRST_T of 40.0 s (desktop and
  mobile): deep red ground, five-line staff, twelve bone melody notes with
  stems, chord-stack dot columns below, "Return 1" label, pale grey title
  and hint. Mobile anthem framing holds, no clipping.
- Caption phase checked with a temporary FIRST_T of 42.0 s: staff dimmed
  to 30 percent, caption "Remember me the way the song remembers." in pale
  grey italic, centered, clear of the Return label. Temporary probe files
  were left in /tmp only; the delivered index.html keeps FIRST_T = 12.0.
