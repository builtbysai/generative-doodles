# No.760: Interference Cube

EXPANSION #93 larry-bell, prompt block 1 "Interference Cube".

## Concept

Larry Bell's coated-glass cubes hold one material that reads as several colors
at once, because the color is not in the glass: it is thin-film interference,
a function of the angle between the viewer and the light. This piece puts a
single glass cube in a white gallery void, on a nearly invisible clear
pedestal, over a faint pool of its own light. At rest the three visible faces
already disagree: the left face is vapor gold, the right face is
violet-gray, the top is washed almost to chrome white. Nothing on the cube is
painted; every face runs the same coating model at a different angle offset.
A slow light orbit keeps cycling the faces through the interference range so
the prism unlocks on its own, and dragging shifts the light azimuth directly.
The edges where panes meet carry the brightest interference seams, shifting
gold toward blue, the way Bell's corners burn.

## Construction

**Thin-film LUT model.** The whole palette is one interference cycle, stored
as a lookup table across the six specced anchors: smoke #8E9499 at 0.00,
violet #7A6FA8 at 0.22, teal #5FA8A3 at 0.45, gold #D8B46A at 0.70, chrome
#C9CDD3 at 0.88, wrapping back to smoke at 1.00. A face's position in the
cycle is `u = base + orbit + drag + wobble`, where the wobble is a second,
offset sine (period 31 s, per-face phase), giving the two-offset-sine
interference the prompt asks for. Saturation is `|sin(pi*u)|^0.7`: it peaks
mid-band, and toward the extremes the LUT color is mixed back toward chrome,
so faces wash out at the ends of the cycle instead of going flat or garish.
Interpolation in the LUT is smoothstepped, so hue moves continuously, like
tilting glass, never in steps.

**Face layering.** Each of the three faces is drawn as four translucent
layers, never one flat fill:

1. Transmitted wash: the face polygon filled with the LUT color at alpha
   0.52, the gallery white seen through the coating.
2. A second transmitted layer, inset 16% toward the face centroid, sampled
   0.12 further along the cycle at alpha 0.30, so the hue shifts inside the
   pane.
3. Absorption: six bands from top edge to bottom edge filled with smoke at
   alpha rising quadratically (0.02 to 0.13), the darkening floor of the
   coating.
4. Mirrored streak: a diagonal band across the face in gallery white whose
   alpha follows the face's saturation factor, plus a narrower inner band
   tinted with the face color: the reflection component.

The seams are stroked in three passes (wide faint, medium, narrow near-white
mix) with colors sampled from the LUT near the adjoining faces, so the corner
lines glow brighter than any face. The floor pool is four layered ellipses in
the average dominant hue of the three faces at alpha 0.05–0.08. The pedestal
is a 10%-alpha smoke column with a white edge line, effectively invisible.

**Motion and state.** The light orbit advances `u` by half the LUT cycle per
90 seconds. Dragging horizontally adds to a persistent `dragU` offset
(0.9 of a cycle per full frame width dragged). Recorded choice: when a drag
ends, the offset persists as the new base rather than easing back, so the
visitor's tilt of the glass stays where they left it while the orbit
continues from there. All state is a closed-form function of (drag
accumulation, elapsed t). Frame one is the synchronous draw at orbit t=0;
the animation loop is anchored at offset + elapsed-since-load and never
reads a wall clock. No `Date.now()`, no unseeded randomness (none was
needed; no RNG is used).

**House rules.** Canvas sized from the Visual Viewport API with resize
listeners on both visualViewport and window; `canvas.style.width/height`
pinned in px inside every draw. Phone detection via `window.screen` physical
size (min dimension < 700 px), aspect `h > w*1.15` only as fallback. Cube
scale derives from `min(W, H)` so its proportions hold on phones. Canvas 2D
only, no gradients, no shadowBlur, no offscreen canvas, no audio, no text
beyond `<title>`.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice, `cmp` byte-compare identical
  (re-verified after the fix below); the second render was deleted.
- First pass defect: at the original center height (0.46 H) plus floor
  offset (0.52 S), the floor glow pool fell below the bottom edge on the
  desktop and thumb frames. Fixed by raising the cube center to 0.40 H and
  shortening the pedestal drop to 0.38 S; re-rendered all sizes and
  re-verified byte-identity.
- Read-backs after the fix: desktop and thumb show the full composition:
  gold left face with two diagonal mirrored streaks, violet-gray right face
  with pale reflection bands, near-white chrome top face, glowing seams at
  the three meeting edges, hairline pedestal, and the layered glow pool
  fully inside the frame. Mobile (390 wide) keeps the same proportions with
  the cube centered in the upper half and nothing clipped.
- Palette audit: only the six specced hex values (and mixes between them)
  are used; no other colors appear in the script.
- Deviations: none from the prompt. The drag-persistence choice above is
  the one open point the prompt leaves ("drag disturbs"); it is recorded
  here per the brief.
