# No. 1832 "Frequency Generators" (KS1, PP1079)

A self-playing electric guitar, struck by solenoids in uneven Euclidean
patterns, its strings shivering and its harmonics blooming in pale gold
above the body, while a phosphor-green pattern readout advances along
the bottom edge. Watch only.

## Spec

Source: TASKS.md prompt block konrad-sprenger KS1, PP1079, EXPANSION #240
konrad-sprenger. A close-up of an electric guitar laid flat, its strings
stretched over visible mechanical fingers, small solenoid strikers
hovering above each string. A narrow pattern readout runs along the
bottom edge like a paper roll, advancing in uneven ticks. The guitar
plays itself: strikers fall, strings shiver, harmonics bloom as thin
bright lines above the body. No human anywhere. Palette: matte black
guitar body, steel grey strings, brass strikers, readout in phosphor
green on near-black, harmonic blooms in pale gold. Composition: the
guitar fills the frame diagonally, headstock at lower left; the readout
is a strip at the bottom fifth. Motion-interaction: WATCH ONLY. The
machine composes and performs; the viewer cannot play it. The strikers
move in Euclidean-dotted patterns, sometimes doubling into rolls that
blur. Technical approach: 2D canvas. Each string is a line with a struck
displacement wave drawn as a quick decaying oscillation. Strikers are
small rectangles that dip before each hit; a pattern sequencer advances
the readout with irregular tick spacing. WebAudio: struck-string
synthesis, detuned partials per string (sound ONLY via an opt-in toggle
on first tap, never autoplay). What to avoid: no player hands, no
plectrum UI, no play button; no regular 4/4 grid anywhere.

## Driver

A machine plays a guitar no one touches, and the pattern readout is the
only score it will ever need.

## Palette

- Ground: #070708, room gradient #070708 to #0e0d0c
- Matte black guitar body: #111214, radial highlight #1a1a1d, edge
  rgba(220,220,230, 0.14); neck #101012, headstock #0c0c0e
- Steel grey strings: rgba(154,160,168), hairline rgba(225,230,235)
- Brass strikers and fingers: #c9a227, dark brass #8a6f2e, highlight
  #e8d9a0; sound-hole ring #b08d3e
- Readout phosphor green: #39ff6a on near-black #050805
- Harmonic blooms: pale gold #f2e3b0, bloom glow rgba(232,217,160)
- Plates: title #c8c4b8, date #8a8578

## Build

Canvas 2D. The guitar is drawn in a rotated frame (angle -0.61 rad,
scale 1.12), headstock lower left, body upper right, six steel strings
running from the headstock over frets, mechanical fingers, and a bridge
to the sound hole. A slim dark rail behind the fingers carries six small
brass finger blocks, one under each string. Six brass solenoid strikers
hover above the strings at the strike point, each dipping just before
its hit and rebounding after. Thin pale-gold harmonic lines rise above
the body from each recently struck string, with a soft gold glow over
the body just after a strike. Seeded dust motes (22, mulberry32 seed
1832) drift over the body, with seeded faint scratches on the matte
finish. The readout strip fills the bottom fifth of the room: a
near-black paper roll with phosphor-green ticks and dots for every
sequencer event in a 16 s window around now, a bright playhead at
center, and labels for the pattern counts and the roll strings.

## Sequencer

A 9.7 s pattern cycle repeats with per-string hit offsets chosen to
wander, never a grid. Hit counts per cycle are 3, 5, 4, 2, 3, 3 for
strings 1 to 6 (low E to high E), printed in the readout as
KS1 EUCLID 3 5 4 2 3 3. Two hits are rolls: string 3 at cycle offset
5.9 s and string 5 at 3.9 s, each played as a rapid triple strike; the
striker blurs into ghost rectangles while a roll runs and the string
displacement is larger. Each string's displacement is a quick decaying
oscillation, envelope exp(-age / 0.9), shaped to peak near the strike
point and vanish at nut and bridge.

## Sound

Watch only, default silent. A SOUND OFF button at top right starts the
audio lazily on tap, never on load: struck-string synthesis per string,
base frequencies 82.41, 110.0, 146.83, 196.0, 246.94, 329.63 Hz with
detuned partials at ratios 1, 2.02, 2.94, 4.2, scheduled from the same
Euclidean event list as the visuals, rolls rendered as three rapid
plucks 0.14 s apart. The visuals carry the piece with sound off.

## Frame one

Fixed phase t = 60.7 s. The low E string was struck 0.1 s ago, so it
shivers and blooms in frame one; the D string is 0.2 s from its next
hit, its striker already plunging. Frame one is byte-comparable.

## Interaction

Watch only. No input except the optional sound toggle. Hint reads:
WATCH ONLY.

## Deviations

None from the prompt. The study file
~/workspace/muse-soul/studies/konrad-sprenger.md does not exist locally,
so hex values were hand-picked from the prompt's named colors. The
readout labels name the pattern counts and roll strings in plain text,
since the paper roll is the piece's only score.

## House rules

Visual Viewport sizing with resize listened to on visualViewport and
window; canvas pinned in draw() via canvas.style.width/height in px;
phone detection via window.screen (min dimension under 700 px) with
aspect fallback (h > w * 1.15); field-like composition full-bleed on
phones, centered square on desktop, page ground the piece's own
background color on both. One synchronous frame at load; every
requestAnimationFrame call guarded by a typeof check. Flicker well under
14 Hz by construction (strikes are brief dips and blooms, no flashing).
prefers-reduced-motion renders the still frame one. All fading alphas
rounded to 4 decimals; moveTo before every arc and ellipse.
