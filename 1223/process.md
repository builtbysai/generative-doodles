# [pink noise] — №1223

Clint Enns study block CE8 (PP382), after Hollis Frampton's bracketing in
(nostalgia) and Zorns Lemma, via Enns's described-but-unmade subtitle film
[pink noise].

## The piece

A film with no image. The screen is black (#050505) for the entire cycle.
The only things that ever appear are subtitles describing sounds that are
not there. There is no actual pink noise, no sound of any kind, and no
audio API anywhere in the file — silence and absence are the work.

It opens with the instruction card, amber #FFB000 on black, held a full
5 seconds:

PUT ON 3D GLASSES NOW - INSERT EARPLUGS

Then the captions, one at a time, centered in the lower third (72% of the
frame height), each fading in and out over 0.4 s at the edges of its hold.
Caption text is #E8E8E8 with the brackets drawn dimmer, #6A6A72. Between
captions, and after the last one, the screen is pure black.

Dragging across the black reveals a faint waveform — the pink noise that
isn't playing. It is a 1/f-ish value function (five summed sines, amplitudes
falling as 1/(k+1), hashed phases, slow drift) whose swell runs on its own
~23 s period, deliberately decorrelated from the captions: it illustrates
nothing, starts and stops with nothing, and knows nothing about the
subtitle schedule. It rises over 0.3 s while the pointer is held, never
exceeds alpha 0.35, and fades over 0.5 s on release. Nothing else is ever
drawn: no border, no progress bar, no hint text.

## The caption sequence

The four captions given in the prompt stand verbatim at their places —
"[pink noise]" opens the sequence and "[silence, but the wrong kind]" sits
at its center of gravity. The other seventeen were written for this build
in the same register: lowercase inside the brackets, domestic, specific,
mundane, slightly off. The sequence closes with "[pink noise]" reprised,
a bookend.

Timing is hashed per caption (integer hash, seed 1): each gap is 2–6 s,
each hold 4–8 s, cube-shaped so most run short and a few run long. A
trailing gap of 2.95 s closes the loop.

| # | starts | holds | caption |
|---|--------|-------|---------|
| — | 0.00 | 5.00 (card) | PUT ON 3D GLASSES NOW - INSERT EARPLUGS |
| 1 | 7.12 | 5.99 | [pink noise] |
| 2 | 15.17 | 4.00 | [a door closes upstairs] |
| 3 | 21.17 | 4.15 | [rain, somewhere else] |
| 4 | 30.59 | 4.07 | [the radiator ticks] |
| 5 | 36.91 | 5.22 | [the hum gets louder] |
| 6 | 47.87 | 4.32 | [a fridge cycles off] |
| 7 | 54.52 | 4.06 | [footsteps, then not] |
| 8 | 61.12 | 4.60 | [a television through a wall] |
| 9 | 68.14 | 6.35 | [silence, but the wrong kind] |
| 10 | 76.58 | 4.36 | [breathing, not yours] |
| 11 | 83.11 | 5.21 | [a tap dripping into a full sink] |
| 12 | 93.27 | 4.07 | [the pipes knock twice] |
| 13 | 101.73 | 4.04 | [a phone buzzing inside a drawer] |
| 14 | 107.98 | 4.07 | [the floor settling] |
| 15 | 115.40 | 4.18 | [a chair moves, no one in it] |
| 16 | 123.88 | 5.07 | [wind, against the wrong window] |
| 17 | 132.20 | 4.60 | [the fridge cycles back on] |
| 18 | 139.02 | 4.69 | [a radio left on in an empty room] |
| 19 | 145.88 | 7.16 | [your own pulse, in one ear] |
| 20 | 157.91 | 4.26 | [traffic, or water, far off] |
| 21 | 165.26 | 7.69 | [the hum gets softer] |
| 22 | 176.87 | 4.17 | [pink noise] |

Total cycle: 183.99 s, looping.

## House implementation notes

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; CSS size pinned in draw(); phone detection via
  window.screen physical size (min dimension < 700 px) with aspect fallback;
  caption and card type scale down on phones, and any line too wide for the
  frame is shrunk to fit 92% of the width.
- Determinism: the synchronous first frame is drawn at the fixed phase
  T0 = 2 s, inside the amber card; the rAF loop (typeof-guarded) is anchored
  at that phase plus elapsed time. Seeded hashes only; no random calls.
- Pointer visibility is closed-form: recorded down/up events are walked at
  draw time (rise 1/0.30 s held, fall 1/0.50 s released), never
  frame-integrated.
- No gradients, no canvas filters, no shadow blur, no created elements, no
  pixel-buffer or offscreen-canvas APIs, no microphone, no audio.

## QA

- qa-desktop.png (1280×800) and qa-mobile.png (390×844): frame one shows
  the amber card, exact text, centered on black; the full line fits on one
  line at phone width.
- thumb.png (720×720) rendered twice and compared with cmp: byte-identical.
  Re-verified after a comment-only wording edit; still byte-identical.
- Off-phase check (temporary T0 edit, copy discarded): at t = 45.0 s,
  inside the long gap after "[the hum gets louder]", a pixel scan of the
  render found all 518,400 pixels exactly #050505 — pure black, zero
  exceptions.
- Off-phase check 2: at t = 70.0 s the render shows "[silence, but the
  wrong kind]" alone in the lower third, brackets dim, inner text bright.
- Token grep over index.html for audio APIs, random calls, gradients,
  element creation, pixel buffers, offscreen canvas, microphone and shadow
  blur: clean.
