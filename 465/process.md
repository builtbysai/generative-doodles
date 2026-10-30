# No.465 Starfisher

EXPANSION #56 andrea-ucini, prompt UC1.

## Concept

His "Be patient" as a generative twilight scene. A small child sits on a dark
flat horizon at the lower right, holding a fishing pole so long it arcs across
the entire frame. At its tip, far away in the upper left, a small white net
hovers beneath the only star in the sky. Nothing else exists: no second star,
no moon, no clouds. The whole piece is the disproportion between the reach and
the target, held quietly. It is watch-only; patience is the interaction.

## Construction

- Single self-contained index.html, canvas 2D, exactly the prompt palette:
  sky gradient #2B4A7A (top) to #101C38 (horizon band), ground #0E1420,
  star #FFFFFF, shirt #D9261C, pants #2B4A7A, pole #6B5B45, net #F5F2EA.
- Composition: sky fills the top 70%, the flat ground the lower 30%. The
  child is about 15% of frame height, seated on the horizon at the lower
  right with legs stretched out along the ground. The star sits in the
  upper-left quadrant; the pole runs from the child's hands on a quadratic
  bezier across the frame to a tip just beneath the star.
- The child is built from stroked shapes in Ucini's flat economy: blue pants
  legs along the ground with small pole-brown shoes, a red torso leaning
  slightly back, red sleeves reaching forward to a pale hand on the pole,
  a pale face with light hair swept over the top.
- The net hangs from the pole tip on a short cord: a cream rim ellipse with
  crosshatch lines clipped inside it. It swings as a pendulum with an 8s
  period.
- Motion is a seamless 40s watch-only loop with no interaction at all: the
  star twinkles on a 5s cycle (opacity 0.7 to 1, with a 4-point sparkle that
  only appears near the peak), the net sways on its 8s pendulum, and the
  child's torso breathes almost imperceptibly on an 8s cycle. Every period
  divides 40, so the loop boundary is exact. No UI, no text, no hint.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in draw()
  every frame. Phone detection via window.screen (min dimension under
  700px) with the h > w*1.15 aspect fallback; the composition keeps its
  shape on phones (figure scale is based on the smaller frame dimension),
  the star and net grow slightly on small screens to stay legible, and the
  page ground is the sky's top colour #2B4A7A.
- Determinism: the first frame is drawn synchronously at a constant loop
  phase (t = 13s pre-roll baked in: star at its twinkle peak with sparkle
  showing, net centred at mid-sway, breath mid-cycle). The animation loop,
  when running, is anchored as that fixed offset plus elapsed time since
  load, and requestAnimationFrame is typeof-guarded so the node QA renderer
  draws the same frame. All load-time layout uses a seeded mulberry32 RNG
  (two micro-jitters on the pole's control point); no Math.random anywhere.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb rendered twice and byte-compared with cmp,
  identical. Second render deleted after the check.
- Desktop and thumb: twilight gradient falls from deep blue to the dark
  horizon band; one bright star upper-left with its sparkle at peak; the
  pole arcs from the child's hands across the whole frame; the net hangs
  beneath the star, crosshatch visible; the child sits small at the lower
  right, red shirt against the dark ground. Huge negative space intact.
- Mobile: composition keeps its shape; child, pole arc, net and star all
  legible, nothing clipped; page ground matches the sky top.
- Deviations from the prompt letter: one. The prompt names "light hair" but
  the palette lists no hair colour; the hair is drawn in a pale tint of the
  pole brown #6B5B45 rather than introducing a new hue, and the face uses
  the net cream #F5F2EA. No other deviations: one star only, no moon, no
  clouds, no text, no interaction.
