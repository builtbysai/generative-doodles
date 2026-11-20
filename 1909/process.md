# №1909 The Rollout (MB6, PP1156, study #249 michele-bonifati)

## Driver

The wait is the composition: portraits arrive on a fixed schedule and
dissolve into the next, the full band only together at the end. A drummer
appears first, then a sax, then a trombone, then a guitarist, each announced
by a hand-lettered character card in the player's own language; each arrival
accretes as a small silhouette along the frame's bottom edge until the last
movement, when all four finally play together in full warm light.

## Mechanism

2D canvas, visual only, no WebAudio. A closed-form movement scheduler runs
a 40 s cycle of five 8 s movements: I Batteria (0-8 s), II Sassofono (8-16),
III Trombone (16-24), IV Chitarra (24-32), V Il quartetto (32-40). In each
solo movement the arriving portrait fades in over 1 s, holds, and dissolves
over the last 1.5 s; the title card shows for the first 3 s. Earlier members
accrete as small silhouettes along the bottom edge of the frame. In the final
movement the frame warms to full warm light and all four play together, with
a small red baton dot travelling from player to player on a 4 s cycle, the
baton-passing of MB1.

Each portrait carries its character behavior: the drummer's bass drum throws
a pulse ring once per beat (1 Hz); the sax breathes a slow wavy line from
its bell; the trombone slide drifts slowly (0.6 rad/s); the guitarist's
strumming hand circles the sound hole at 1 Hz.

## Frame one

FIRST_T = 12 s. Phase 12 sits mid second movement (sax, 8 to 16 s): the sax
title card has dissolved, the sax portrait stands full in the frame with its
keys and bell, and the drummer has already accreted as a small silhouette
along the frame's bottom edge with a faint pulse ring. Every portrait, card
and pulse is a pure function of t, so frame one is deterministic and
byte-reproducible; the thumb and desktop renders came out md5-identical on
a second run.

## Interaction

Watch only. There are no pointer handlers and no audio. The mechanism is
the serialized waiting; a tap-to-advance would turn it into a flipbook and
kill the anticipation. Never click-to-reload.

## Palette

Hand-picked from the named colors in the prompt; no study file exists for
michele-bonifati. Warm paper #f2e8d5 (cards and page ground), lighter paper
#fbf3e2 for the title cards, full warm light #f6dfae for the final movement.
Silhouettes in ink black #1a1712, date line in muted ink #4a4238, title
cards in hand-ink red #a33327, frame rules in warm brown #8a7a5e.

## Composition

A centered portrait frame (slightly portrait, double-ruled) on a warm paper
ground; the page ground is the piece's own background color and the hint
color is flipped to match, per the centered-piece house rule. The title
plate sits top-left, the movement label (I Batteria, II Sassofono, III
Trombone, IV Chitarra, V Il quartetto) at the frame's bottom edge, the hint
"Watch the band arrive, one by one." centered at the bottom. Title cards
are hand-lettered: each character drawn with a small seeded jitter in
position and rotation, in red italic Georgia, with two faint rule lines.

The drummer's card uses the given Italian phrase "l'elemento propulsivo,
nervoso, denso, viscerale". The other three carry short phrases in the same
spirit: sax "il fiato che canta, lungo e caldo", trombone "la voce che
scivola, calda e lenta", guitar "il tema che ritorna, chiaro e lieve".

## Motion

All motion runs near 1 Hz, well under the 14 Hz ceiling. Prefers-reduced-
motion shows the static first frame.

## Deviations

Per the Franke audio rule, the prompt's WebAudio voices are not built: the
piece is watch-only and visual-only, with the movement schedule carried by
a closed-form table instead of real audio. The prompt's "generative voice
per movement" is expressed visually through each portrait's character
behavior (pulse, breath, slide, strum). No page-turn UI, no skip-ahead, no
character select screen.

## QA

Rendered from the actual script with node-canvas and visually inspected:

- Desktop 1280x900: sax portrait reads (head on shoulders, tube arcing
  clear of the body with three key dots, bell at lower right, breath line);
  drummer accreted bottom-left with pulse ring; title, date, label and hint
  all clear, no overlaps.
- Mobile 390x844: full-bleed framing holds; frame, portrait, accreted
  drummer and all text legible, no overlaps.
- Thumb 720x720: same first frame, legible at small size.
- Movement spot-checks at t = 1.5 (drummer card, phrase wraps to two
  legible red lines), t = 4 (drummer portrait, bass drum and snare with
  pulse ring), t = 20 (trombone slide, hand dot, flared bell; two accreted
  figures), t = 28 (guitar body held clear of the shoulders, neck and
  headstock, sound hole; three accreted figures), t = 36 (full quartet in
  warm light, four separate figures front/back staggered, red baton dot
  above the drummer).
- Fix rounds: the sax tube first merged into the shoulder dome (re-routed
  out to the player's right, thinner, keys repositioned); the trombone bell
  first sat behind the head (moved to the far end of the slide); the guitar
  body first vanished into the shoulders (moved out to the player's right);
  the quartet first merged into one black row (front/back stagger, smaller
  figures, drummer pulse rings suppressed). The trombone bell is partly
  hidden behind the guitarist in the quartet; the slide still reads.
- Determinism: no Math.random, no Date.now, no wall clock; thumb and
  desktop renders md5-identical on a second run.
