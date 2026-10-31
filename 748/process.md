# No.748 Hind Sight

EXPANSION #91 james-turrell, prompt block 5 "Hind Sight" (Dark Space, MASS MoCA).

## Concept

A dark-adaptation meditation. The screen starts pitch black. Over ten minutes a
faint luminous form rises from below the visibility threshold, first nothing,
then a whisper of blue-gray, then the suggestion of a doorway, following the
real curve of pupil dilation. The piece adapts with the viewer, and it charges
the full price of admission: there is no skip, no timer, no brightness
shortcut, no tap to reveal. Any shortcut would destroy the mechanism, so the
piece registers no pointer input at all. One tall rounded doorway, centered,
occupying 40% of the frame height, in two colors only over black: edge #8AA8C8,
core #C8DCE8, on field #000000 with page ground #060608. No other imagery, no
sound, no text except the title.

Frame one, and therefore the thumbnail, is a pure black square. That is
correct and expected: at cycle t = 0 the adaptation envelope is exactly zero,
so nothing has risen yet. The piece is the wait.

## Construction

Single self-contained index.html, canvas 2D, no external assets. Sizing from
the Visual Viewport API with resize listeners on visualViewport and window;
the canvas pixel size is pinned via canvas.style.width/height inside draw()
every frame. Phone detection via window.screen physical size (min dimension
under 700px) with the aspect fallback, per house rules; on phones the form
keeps its 40% height share and its width is capped to the frame.

The form is an arch-topped doorway path (semicircular top, straight sides).
Because radial gradients are unreliable in the QA renderer and banned by the
house rule, the soft edge is built from layered alpha shapes: six concentric
copies of the doorway path, drawn largest first, shrinking toward the core.
Three outer layers carry the edge color #8AA8C8 (coefficients 0.035, 0.040,
0.050, cumulative about 12% alpha at the form boundary) and three inner layers
carry the core color #C8DCE8 (0.025, 0.020, 0.018, adding about 6%). Every
coefficient is multiplied by the adaptation envelope A(t).

The envelope is a closed-form function of cycle time in a 720-second loop:

- Minutes 0 to 10: A = 1 - e^(-t/240), the dark-adaptation curve from the
  prompt, fast in the first three minutes (A = 0.53 at t = 180), slow after
  (A = 0.92 at t = 600). The form is never brighter than this curve allows;
  even fully risen it tops out near 12% edge alpha over black.
- Minute 5: A is multiplied by one gentle sine breath, 1 + 0.12 sin(pi (t -
  270) / 60) for t in [270, 330], a single pulse centered on t = 300.
- Minutes 10 to 12: A falls linearly from its minute-10 value back to zero,
  and the cycle restarts at black.

Determinism: frame one is the synchronous draw at cycle t = 0 (A = 0, pure
black). The animation loop is anchored as elapsed-since-load added to that
fixed origin; Date.now() is never consulted, and no random source exists in
the piece at all. The rAF loop is typeof-guarded so the no-rAF QA renderer
runs the synchronous frame only. An inert QA hook, ?seed=tNNN, starts the
cycle at second NNN; it exists only for state-forced verification renders and
is absent in normal viewing.

Interaction: none, deliberately. The script installs no pointer, mouse,
touch, or click handlers. This is the prompt's hard rule, not an omission.

## QA log

Renderer: ~/workspace/tools/render-piece.js (node-canvas).

- thumb.png (720x720) rendered twice and byte-compared with cmp: identical.
- Frame-one renders read back and pixel-audited (corners, center, form area,
  whole-image maximum): qa-desktop.png (1280x900), qa-mobile.png (390x844),
  and thumb.png are all (0,0,0) at every sampled point with a whole-image
  maximum channel value of 0. Pure black at all three sizes, as specced.
- State-forced throwaway renders via the inert ?seed hook, read back, pixel
  sampled, then deleted:
  - t = 300 (minute 5, pulse peak): the doorway is a whisper. Center sample
    (20,24,27), edge sample (12,15,18), corners (0,0,0). The layered arch
    form reads clearly once seen, blue-gray, core lighter than edge.
  - t = 600 (minute 10, full rise): the complete faint doorway. Center
    (22,27,30), edge band (13,17,20), which matches #8AA8C8 at about 10 to
    12% over black; just above the halo (0,0,0), so the glow stays contained.
    Still extremely faint, as specced: it never becomes a lit picture.
- Grep audit of index.html: no Date.now, no Math.random, no createElement,
  no AudioContext, no gradient or shadowBlur calls, no external URLs, no em
  dashes, no input listeners of any kind.

## Deviations

- The prompt's technical note suggests a radial-gradient doorway. Replaced
  with the layered-alpha stack described above, per the standing house rule
  (the QA renderer has no reliable gradients or shadowBlur); the cumulative
  alphas land on the prompt's own numbers, about 12% at the edge and about
  6% added at the core.
- The pulse at minute 5 is a half-sine bump (rise and return within one
  minute) rather than a full sine cycle, so the breath never dips the form
  below the adaptation curve. One pulse, low amplitude, as specced.
