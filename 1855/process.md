# No.1855 As We Breathe (TW8, PP1102, study #242 theresa-wong)

Gallery date: 2007 · 02 · 09. Interaction cue: "Drag the listening pool through the room."

## Spec as built

A gallery room in plan view, walls as thin lines, sparsely furnished: a darkwood
chair, a tall steel plinth carrying a darkwood sculpture, a low plinth carrying a
steel ring sculpture, and a doorway of warm daylight in the top wall. One song
lives in the room in three fragments, one bound to each sounding object: a breath
at the chair (looped noise through a soft bandpass, slow swell), a hummed phrase
at the tall plinth (two sawtooth oscillators through voice formant bandpasses,
slow vibrato), a bowed note near the doorway (low sawtooths at 65.4 and 98 Hz,
slow vibrato, soft lowpass). Each fragment shows three slow rings around its
object, brighter as the listening pool nears, plus a small amber dot marking its
home. The low plinth is a silent object, present for composition only.

The listening pool is a small amber circle that drifts on its own slow path.
Drag moves the pool; while dragging it follows the pointer, and on release it
returns gently to its drift path over about four seconds. Fragment gains are
distance based (crossfade radius 0.42 of the room's min dimension) and each
fragment also gets a distance based lowpass, so the song near you is present and
bright while distant fragments are quiet and muffled. Per-fragment base gains
are 0.13 to 0.17 with a master of 0.8, so all three fragments can never play at
full volume at once.

## Palette (hand picked from the prompt's named colors)

- Gallery white ground #EFEDE8, floor #E7E4DD, concrete grey #B9B6AF
- Walls #8A8781, wall seams rgba(156,153,143,0.35)
- Dark wood #4A3220, wood highlight #6B4A2F, wood shadow #332412
- Brushed steel #9AA3AD, steel highlight #C3CAD1, steel shadow #6E767E
- Daylight doorway #F2C879, door glow #E8A44A
- Listening pool amber #E8A44A, pool highlight #F2B45C, ring amber #C77F22
- Plates #FBFAF7 with ink #2E2C29 and hint grey #5C5954

## Deviations from the prompt

- A small "Sound: on / Sound: off" plate sits bottom right, following the
  No.1851 template for this study. It is a mute toggle, not a play button:
  there is no play button anywhere, audio is never autoplayed, and a tap
  alone never resets the piece.
- The prompt names "a few sculptural objects on plinths" without fixing the
  count. Two plinths are drawn (tall with a darkwood sculpture, low with a
  steel ring). Only the tall plinth carries a fragment; the low plinth is
  silent, keeping the room sparse as the composition requires.
- The doorway fragment is anchored just inside the room below the doorway
  (0.78, 0.10) so its rings and dot are visible on the floor rather than
  hidden in the wall line; the warm light spill marks the doorway itself.

## Determinism

Fixed phase FRAME_T = 60.0 s. No wall clock, no unseeded random in the visual
path: object jitter comes from mulberry32(1855), the drift path is a pure
function of phase time, and all pulses are slow sines of phase time. At frame
one the pool sits mid-drift at about (0.30, 0.60), next to the chair, so the
breath fragment rings are the bright ones. Distance gains are recomputed inside
draw() as a pure function of pool position, so frame one is already correct
before any animation step runs. Two desktop renders of the actual script are
byte identical (md5 55ac42435add2c219be2cc0dfc856c49). The only Math.random in
the file fills the audio noise buffer inside ensureAudio, which runs only
inside a visitor gesture and never affects the drawn frame.

## House rules

- Self-contained index.html, 2D canvas only. One synchronous frame at load;
  requestAnimationFrame guarded with a typeof check.
- Visual Viewport sizing with resize listeners on both visualViewport and
  window; canvas element pinned in draw() via canvas.style.width/height in px.
- Phone detection via window.screen (min dimension under 700 px) with the
  aspect fallback (h > w*1.15). Plan-view room is full-bleed on phones and a
  centered square on desktop; the page ground takes the piece's own gallery
  white and the hint color is dark grey on the light plates.
- Title plate and date plate drawn on the canvas ("As We Breathe",
  "2007 · 02 · 09"); hint line ends with "Drag the listening pool through
  the room."
- Flicker at or below 14 Hz by construction: all motion is slow sines with
  periods of 5.5 s and longer, plus the slow drift. prefers-reduced-motion
  freezes the drift at the frame-one position; drag still works and still
  redraws.
- Audio only lazily inside the first visitor tap or drag (ensureAudio); no
  autoplay; never click-to-reload; a tap alone never resets the piece.
- No em dashes anywhere in visible copy or in this file.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at
1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three renders were
visually inspected. One defect was found and fixed: the first build stroked
the wall path with closePath, which drew a diagonal line from the bottom left
corner to the doorway. The walls are now stroked side by side with explicit
lineTo calls and no closePath. After the fix all three renders are clean:
walls complete with the doorway gap and warm spill, pool over the chair with
bright breath rings, plates legible with no overlap on desktop or mobile.
On mobile the hint plate and the sound plate sit edge to edge at the bottom
but do not overlap.
