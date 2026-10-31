# No.745 Ganzfeld Clear

EXPANSION #91 james-turrell, prompt block 2 "Ganzfeld Clear". After Turrell's
Perfectly Clear (MASS MoCA) and All Clear (Gagosian Le Bourget, 2024).

## Concept

An edgeless, full-screen color field. No frame, no horizon, no vignette, no
texture, no text, no UI of any kind: the screen reads as infinite, like
standing inside color. The field IS the piece. Watch-only; the viewer commits
time, the piece gives back color, slowly.

## Construction

- One flat fill per frame. The entire canvas is a single rect filled with one
  computed color. No gradients anywhere (house rule, and the Ganzfeld demands
  flatness), no shapes, no strokes.
- Bath schedule (closed form in loop time t, loop = 720 s, seamless):
  - Four anchors in order: turquoise #46D8C8, magenta #E04AD0, amber #F0A840,
    violet #7A5AE8. Interpolation passes between adjacent anchors only; the
    final crossfade returns violet to turquoise, closing the loop.
  - Each bath gets a 180 s segment: a 160 s hold at the anchor (inside the
    specced 2.5 to 3 minute hold band), then a 20 s crossfade to the next
    anchor, eased with a smoothstep so the change starts and ends at zero
    velocity.
  - Breathing: a luminance multiplier 1 + 0.03 * sin(2 pi t / 24) applies to
    the held and fading color alike (plus or minus 3 percent). The 24 s
    period divides the 720 s loop exactly (30 breaths), so the loop closes
    seamlessly. At t = 0 the sine is 0, so frame one is the anchor exactly.
  - Strobe: once per cycle at mid-cycle, t = 360 s (the start of the amber
    hold). The field lerps toward white #FFFFFF by an envelope
    a = exp(-(t - 360) / 0.04): a = 1 at the peak (pure white), about 5
    percent at 120 ms, under 0.1 percent by 280 ms. One burst only; no other
    event exists in the piece.
- Color math is a straight RGB lerp between neighboring palette anchors,
  staged hold then fade. Construction note: the TASKS block suggested working
  in HSL; the build brief specified staged lerps between the anchors, so the
  interpolation runs anchor to anchor in RGB. Either way the field never
  leaves the segment between two specced colors, and no fifth color appears
  outside the white burst.
- Sizing: canvas from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas.style.width/height pinned in px inside
  draw() every frame; devicePixelRatio applied to the backing store only.
  The page background is set to the current field color each frame so no gap
  can ever show a foreign color.
- Determinism: frame one is the synchronous draw at loop t = 0 (turquoise,
  breathing phase 0). Nothing is derived from Date.now(); the rAF loop, where
  present, is anchored at its first callback timestamp plus elapsed time, and
  is typeof-guarded. The renderer has no rAF, so QA renders are exactly the
  synchronous frame. An inert QA hook (?seed=tNN, house convention) offsets
  the start time for state-forced checks; without it the piece starts at 0.
- No audio, no microphone, no interaction handlers at all.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas), 2026-10-31.

- qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720):
  read back, each is a perfectly flat turquoise field edge to edge, nothing
  else. Pixel probe of thumb.png: exactly one unique color across all
  518,400 pixels, 70,216,200 = #46D8C8.
- Determinism: thumb.png rendered twice, cmp byte-compare identical; the
  duplicate was deleted.
- State-forced checks (throwaway renders via ?seed=tNN, read back, deleted):
  - t = 260 s (magenta bath mid-hold): flat magenta field, one unique color
    218,72,203, which is the magenta anchor under the breathing factor at
    that phase (0.974). Correct.
  - t = 360 s (strobe peak): flat pure white field, one unique color
    255,255,255. Correct.
- Grep audit of index.html: no Date.now, no Math.random, no gradients, no
  shadowBlur, no external URLs, no em dashes. No deviations from the brief.
