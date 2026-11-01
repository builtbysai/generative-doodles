# №1348 "What Have You Lost?" — process notes

Eric Gottesman, EG5 (PP571). A dark bulletin-board field crowded with
small "lost" flyers, one large blank flyer at center.

## Frame one

Full-bleed dark board (#2E2A24) with faint speckle. 36 small flyers on a
seeded, jittered grid plus 4 half-pinned flyers at the frame edges (40
total). Each small flyer is a torn-corner rectangle in warm paper
(#E8E0CC with #C9BFA4 shade edge and grain flecks), carrying 2–3 abstract
marks — a blob cluster, a hook arc, a ring pair — suggestive, never
literal, plus a crimson tear-strip at the bottom edge and a pin dot at
the top. No flyer overlaps the center flyer (rejection-checked with a
margin). The center flyer is 2.2× the small size, blank except a pulsing
amber ring (#F5C86E) where a phone number would be — the number is
absent by design. No visible text anywhere except `<title>`; no digits,
no words on any flyer.

## Motion and interaction

- Center pulse: the amber ring breathes on a 5.5 s period while the board
  is silent, quickening to 2.5 s while recent tap activity decays
  (exponential, tau 4 s).
- Tap a small flyer: it speaks — a 600 ms amber ripple expands from the
  flyer and a sine tone sounds (180–660 Hz by flyer index, 1.2 s decay).
  A chorus follows: the nearest flyers within 3 distance bands answer at
  90 ms intervals, nearest first, volume falling with distance (capped
  at 18 voices). Ripples are closed-form functions of piece time and the
  recorded tap list, never timers.
- Drag a flyer: it follows the pointer and stays where put; the pin
  re-seats with it. Tap vs drag is separated by an 8 px movement
  threshold on release.
- The center flyer is not tappable and not draggable; it only pulses.

## Audio rule

Tones sound ONLY through lazily created, typeof-guarded WebAudio inside
the tap gesture. The board is silent until tapped. No microphone, no
recording, no autoplay.

## Determinism

Frame one draws synchronously at exactly t = 0 via a boot flag; the
clock starts only with the rAF loop (plain function declaration behind a
typeof guard). All layout, marks, grain, and chorus order come from
seeded mulberry32 streams (seed 1348000 + flyer index × 7919), never
Math.random. Resize rebuilds the layout from the same seed for the new
size.

## House adaptations

Visual Viewport sizing with resize listeners on visualViewport and
window; canvas pinned in draw() via style width/height in px; phone
detection via window.screen physical size (min dimension < 700 px) with
aspect fallback; field-like composition full-bleed at all sizes. All
glow and shading is layered flat alpha — no gradients, no shadowBlur,
no filters, no offscreen canvas, no createElement. Dots are drawn as
individual beginPath arcs (moveTo before each arc) per the node-canvas
quirk. The `document.body` style guard is wrapped in try/catch (the QA
renderer defines no body).

## Verification

Rendered at 1280×900 desktop, 390×844 mobile, 720×720 thumb; all three
inspected. Thumb rendered three times plus the shipped thumb — all
`cmp` byte-identical. A node harness drove the piece's own pointer
listeners and confirmed: 36 grid flyers + 4 edge flyers, zero flyers
overlapping the center, a tap creates one event with an 18-voice
chorus, a center tap creates nothing, and a drag moves a flyer by the
exact drag delta without firing a tap. Token scan clean except
AudioContext inside the tap-handler-only tone player, behind typeof
guards.

md5 index.html: bd9169a60850002a15e0bbef25044c4d
