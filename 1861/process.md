# No.1861 Palm Tuning (CK6, PP1108, study #243 carla-kihlstedt)

Gallery date: 2007 · 02 · 15. Interaction cue: "Watch only."

## Spec as built

Source prompt: TASKS.md, carla-kihlstedt block, PP1108. Extreme close-up of
a hand, palm up, with string tunings inked in ballpoint across the skin.
The palm fills the frame under warm dim lamplight: a large skin-tone mound
with a heel and a soft shadow where it curves away, four soft rounded
fingers cropped by the top frame edge, a thumb entering from the left edge,
and three restrained crease lines. A varnish-brown band runs down the right
frame edge, carrying four violin strings.

Four tunings cycle on a fixed 48 s loop, one per violin string, 12 s each:
G3 196 Hz, D4 294 Hz, A4 440 Hz, E5 659 Hz. Each marking is drawn in
ballpoint blue with a seeded tilt and a wobbled underline, fades in over
1.5 s, holds, and fades out over the last 1.5 s of its slot; the previous
marking lingers as a faint ghost at 0.10 alpha. The string matching the
marking being read is drawn taut and bright, its tension shifted by the
marking, while the other three hang slack and dim, and four short bowed
phrase marks appear beside the active string, fading with the ink. Shallow
depth of field feel comes from large soft low-alpha lamplight washes behind
the palm.

## Palette (hand picked from the prompt's named colors)

- Lamplight ground #241811, glow #6B4423, soft glow #4A2E1A
- Skin highlight #EBC49C, skin #D9A986, skin low #C98F66, skin deep #B57E56
- Crease #9C6B45
- Ballpoint blue #1F3A93, ballpoint soft #3B5BB5
- Ink black #1A1512
- Varnish brown #5C3A1E, varnish highlight #7A4E28, varnish low #3E2712
- Strings dim #D8C9A8, lit #F2E8D0
- Plates cream #F2E8D8 with ink #241811 and hint #5C4A38

## Deviations from the prompt

- Visual-only adaptation, per the build brief: no WebAudio and no sound
  toggle anywhere. The whispered voice reading the tunings becomes visible
  ink: the markings fade and rewrite on the fixed loop, the violin string
  at the frame edge retunes visibly (tension and brightness shift per
  marking), and short phrase marks appear as small bowed strokes. The
  piece is silent.
- The hand is drawn abstractly: a palm field with crease lines, fingers as
  soft rounded forms at the frame edge, no face, no palmistry symbols, no
  mystical or horror framing.
- Watch only: there is no pointer interaction of any kind. The hint plate
  reads "Watch only."

## Determinism

Fixed phase FRAME_T = 60.0 s. No wall clock, no unseeded random in the
visual path: marking tilts and underline wobbles come from mulberry32(1861
+ idx * 13), phrase-mark positions from mulberry32(1861 + idx * 29), and
all motion is a pure function of phase time. At frame one the cycle sits
mid-slot on the second marking, so "D4 294 Hz" is fully inked with the
ghost of "G3 196 Hz" behind it. Two desktop renders of the final script
are byte identical (md5 1c4a2392a20bb84f4c099ded2eac1ad1).

## House rules

- Self-contained index.html, 2D canvas only. One synchronous frame at load;
  requestAnimationFrame guarded with a typeof check.
- Visual Viewport sizing with resize listeners on both visualViewport and
  window; canvas element pinned in draw() via canvas.style.width/height in px.
- Phone detection via window.screen (min dimension under 700 px) with the
  aspect fallback (h > w*1.15). Field-like composition: full-bleed on phones
  and a centered square on desktop; the page ground takes the piece's own
  lamplight dark and the hint color is dark on the cream plates.
- Title plate and date plate drawn on the canvas ("Palm Tuning",
  "2007 · 02 · 15"); hint plate reads "Watch only."
- Flicker at or below 14 Hz by construction: the only motion is the slow
  48 s ink cycle and a 9 s string wobble. prefers-reduced-motion freezes
  the loop at the frame-one position.
- Never click-to-reload; a tap does nothing. No em dashes anywhere in
  visible copy or in this file.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at
1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three renders were
visually inspected. One defect was found and fixed: the first build sized
the palm mound from min(width, height), so on the tall phone field the palm
was a small circle floating in dark space. The palm radii now follow the
field's own width and height, so the palm fills the phone frame top to
bottom. After the fix all three renders are clean: palm fills the frame on
desktop, mobile, and thumb; the D4 marking is legible in ballpoint blue
with its ghost G3 behind it; strings and phrase marks show on the varnish
band; plates are legible with no overlap on any size. thumb.png is the
720x720 render of the final index.html.
