# No.850 "Fenway Speaks"

EXPANSION #104 laurie-anderson, PP11 "Audio Drag".

## Concept

Fenway Bergamot is Laurie Anderson's pitch-shifted male alter ego, the
"Voice of Authority" from the 1978 Nova Convention, named by Lou Reed
around 2009: audio drag. The mechanism is a voice dropped into a lower
register that footnotes and contradicts the voice above it. The piece is
that mechanism as pure type. A black screen is split into two registers
by a thin dividing line. Above it, her lines appear in thin white type.
Below it, a beat later, Bergamot's lines type in heavier, slightly
larger grey type, and they undercut what she said. The two voices never
agree. The contradiction is the piece.

Between the registers, centered on the dividing line, sits his mark: a
small paper chip carrying a moustache drawn as two black curved strokes.
When Bergamot's line begins to arrive, the moustache twitches. He is
played straight throughout: pompous in the early pairs, melancholic by
the end. He is not a joke.

## Construction

- Single self-contained index.html, canvas 2D only. No external assets,
  no audio, no microphone.
- Script clock: one pair every 9.5 s, looping through six pairs. Her
  line types at 30 chars/s; a 0.9 s beat of silence follows; his line
  types at 26 chars/s. All state (pair index, reveal character counts,
  twitch windows) is a closed-form function of the script position,
  which is itself a closed-form function of the recorded interaction
  events and elapsed time.
- Frame one anchor: script position starts at herDur(pair 1) + beat +
  1.6 s, so the first frame shows her first line complete and his first
  line part typed. The synchronous first draw is draw(0); no Date.now
  anywhere.
- Interaction, all recorded as events:
  - DRAG horizontally: scrubs the script position forward or backward
    through the pairs (one full screen width = one full script loop).
    On release, the clock resumes 1:1 from the scrubbed position.
  - TAP: Bergamot interrupts with an unscripted aside. The aside takes
    over the lower register for 4.6 s, typing at his rate, with the
    moustache twitch at its start. Asides cycle through the pool below.
  - DOUBLE-TAP (two taps within 0.35 s): reseeds. The pair order is
    reshuffled with mulberry32 seeded 850104 + reseedCount * 7919, and
    any showing aside is cleared.
- Moustache twitch: for 0.6 s after Bergamot (line or aside) starts
  typing, the chip rides a decaying sine (sin(x * 38) * (1 - x / 0.6)),
  offsetting it vertically by up to 2.2 px and rotating it by up to
  0.03 rad.
- Type contrast carries the audio drag: hers is weight 300 in #DCD8CE,
  his is weight 700 at 1.18x size in #8A8A90. Palette is strict:
  black #0D0D0D, her white #DCD8CE, Bergamot grey #8A8A90, moustache
  ink #1A1A1A, paper chip #E4DFD2. No color anywhere.
- Text wraps by word with measureText against a centered column
  (80% of width on desktop, capped at 860 px; 88% on phones). Reveal is
  by character count distributed across the wrapped lines.
- Sizing follows the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas.style.width/height are pinned in
  px inside draw() every frame. Phone detection uses window.screen
  (min dimension < 700) with aspect h > w * 1.15 as fallback only.
- No gradients, no shadowBlur, no ctx.filter, no offscreen canvas.
  rAF is typeof-guarded.

## The script (complete)

Pair 1
- Her: "The ferry was late again. I watched it come in through the fog, very slowly, like it was thinking it over."
- Him: "Correction. Fog is not weather. Fog is the harbor declining to comment. I have consulted the harbor."

Pair 2
- Her: "My neighbor has a dog that barks at exactly six in the morning. The dog has never once been wrong."
- Him: "The dog is wrong. The dog is early. We are all early. The dog merely admits it first."

Pair 3
- Her: "I bought a plant for the windowsill. The label said it would outlive me. I found that comforting."
- Him: "The label is a salesman. Plants outlive everyone. That is not comfort. That is scheduling."

Pair 4
- Her: "On the radio a man said the city is getting quieter. I turned the radio off to listen."
- Him: "You cannot audit silence with the radio off. You can only join it. I join it professionally."

Pair 5
- Her: "I keep a list of everything I have lost. It is the most complete document I own."
- Him: "I also keep a list. Mine is shorter. I lost the list."

Pair 6
- Her: "Late at night the trains sound farther away than they are. I like that the distance lies a little."
- Him: "The distance is not lying. The night is simply larger than the map. Even my voice gets lost in it. Even mine."

## Aside pool (complete)

1. "A footnote. I appear only in footnotes now."
2. "For the record. There is no record."
3. "Let the transcript show that I nodded gravely."
4. "I would like it noted that I object to the quiet."
5. "An interjection, formally submitted, then withdrawn."

All dialogue is original, written for this piece in Anderson's register.
No em dashes anywhere in the dialogue; sentences end with periods.

## Deviations

- No speech synthesis. The prompt's technical approach allows speech
  synthesis (her lines at pitch, his at -8 semitones through a
  lowpass), but house gallery rules keep pieces silent and the QA
  renderer has no speech engine. The audio drag is carried visually
  instead, by the strict type contrast between the registers: thin
  white above, heavy grey below. Recorded here per the brief.
- The prompt's composition note says the upper register holds 3-4 of
  her lines. Here each register shows the current pair's line, which
  wraps to 2-3 lines at working widths; earlier pairs are not kept on
  screen. The two-register contrast and the beat-late arrival are
  preserved exactly.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice, byte-compared with cmp:
  identical. Frame one is the synchronous draw(0) at the fixed anchor.
- Read-backs: see report. Desktop and thumb show her first line
  complete in thin white in the upper register, his first line part
  typed in heavy grey below, the dividing line running behind the
  paper moustache chip at center. Mobile holds the same layout with
  nothing clipped.
