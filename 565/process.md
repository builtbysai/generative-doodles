# No.565 — Amiga, Date Cuenta

EXPANSION #68 teresa-ferreiro, prompt TF5 ("Scott the Scrotum"). A 5-slide
carousel about the dog-woman who misreads Scott's dilated pupils as love.
Scott is never redeemed; the friend is right and is never the villain. The
crude nickname stays verbatim: it is the piece's title mechanism.

## Concept

One portrait slide at a time on paper #F5EEDA, wobbly ink #141414 frames,
night-party purple #4A2E5A scenes, a small "slide n / 5" counter bottom-left
and a subtle "tap" hint bottom-right. The arc:

1. Party. In the back, a guest silhouette and the friend mid-praise
   ("¡es tan atento, tan cariñoso!"). Front and centre, the dog-woman
   (tan, floppy ears, purple dress, tail) hears it and thinks, in a cloud
   thought bubble: "por favor, que no sea Scott, el escroto".
2. She earnestly tells Scott (paper skin, ink hair, dilated ink pupils)
   "sentí una conexión profunda contigo en la fiesta"; he recoils, hands
   up: "Ay, Dios..."
3. She points at him: "¡mira sus pupilas! ¡eso es atracción!". The friend,
   arms crossed, corrects her: "es el alcohol, no el amor".
4. The punchline panel: Scott's face fills the slide, pupils as huge red
   dots with tiny ink centres. Caption band: "solo parece cariñoso los
   fines de semana".
5. The tribunal: a four-panel recap strip (plea, recoil, correction, red
   pupils) above a warning-yellow banner that slams down on arrival:
   "BEWARE! / SCOTT / THE SCROTUM", the nickname largest. Closing caption
   underneath, underlined: "amiga, date cuenta".

## Construction

- Single self-contained index.html, canvas 2D only, no external assets,
  no audio, no microphone. Strict six-colour palette (dog-woman tan
  #C9A06A, pupil red #D93A2B, warning yellow #F5D90A, night purple
  #4A2E5A, ink #141414, paper #F5EEDA); flat fills only, no gradients.
- Characters are parametric functions (dogWoman, scott, friend, guest)
  reused across slides and miniaturised in the slide-5 recap strip, so
  the cast never changes design.
- Lettering is canvas text in a rounded-bold system stack with per-letter
  jitter seeded by the string itself (mulberry32 over an FNV hash), so
  the hand-lettered wobble is identical every frame and never shimmers.
  Bubbles are wobbly seeded rounded rects with tails; slide 1's plea is a
  scalloped thought cloud with a trail of shrinking circles.
- Interaction:
  - TAP advances the carousel (slide 5 wraps to slide 1: navigation, not
    click-to-reload).
  - TAP on Scott's face on slide 4 toggles his pupils between huge red
    and normal ink (the misread signal). Tapping elsewhere on slide 4
    advances as usual.
  - DRAG starting on the dog-woman (slides 1-3) feeds wagEnergy from
    pointer distance; her tail wag frequency and amplitude rise with it
    and settle over about a second after release. A plain tap on her
    does not advance the carousel.
  - The slide-5 banner slam is an easeOutBack scaleY from the banner's
    top edge over 0.55 s, driven purely by time since slide entry, so it
    is deterministic from the entry moment.
- Idle motion is a function of the shared clock only: party string lights
  twinkle on staggered sines; the tail has a slow base wag.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas.style.width/height
  pinned in px inside draw() every frame; phone detection via
  window.screen (min dimension < 700px) with the h > w*1.15 aspect
  fallback only; on phones the square stage spans the full width, slide
  shape kept whole, page ground is the paper.
- Determinism: frame one is the synchronous draw at constant PHASE0 =
  1.7, slide 1 fully composed, no animation mid-flight. The rAF loop is
  typeof-guarded and anchored as PHASE0 + elapsed; no Date.now, no
  offscreen canvas, no document.createElement anywhere. Pointer state
  (slide index, pupil toggle, wag energy) never touches frame one.

### Slide texts (all in-piece text)

- S1 praise bubble: "¡es tan atento, tan cariñoso!" (construction: the
  prompt describes overheard roommate praise without quoting it).
- S1 thought bubble: "por favor, que no sea Scott, el escroto" (Spanish
  rendering of the prompt's quoted plea, per the brief).
- S2 her line: "sentí una conexión profunda contigo en la fiesta"
  (construction: the prompt paraphrases her confession of a deep
  connection at a party). His line, verbatim from the prompt: "Ay, Dios..."
- S3 her insistence: "¡mira sus pupilas! ¡eso es atracción!"
  (construction wording of the prompt's described beat). Friend's line,
  verbatim from the prompt: "es el alcohol, no el amor".
- S4 caption: "solo parece cariñoso los fines de semana" (per the brief;
  carries the prompt's punchline that he only seems loving on weekends).
- S5 banner, verbatim from the prompt: "BEWARE! SCOTT THE SCROTUM".
  Closing caption: "amiga, date cuenta" (the piece's title, used as the
  verdict line; construction addition).

## QA log

- Rendered with ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and cmp byte-compared:
  identical (re-verified after every fix pass). Second render deleted.
- Read-back, desktop and mobile: slide 1 fully composed: purple party
  slide, string lights, guest silhouette and praising friend in the back,
  the worried dog-woman large in front with her thought cloud legible
  ("por favor, que no sea Scott, el escroto"), tail low at the hip,
  counter "slide 1 / 5" and "tap" hint clear of the slide. Mobile: the
  stage spans the full 390px width on the paper ground, nothing clipped,
  all text legible.
- Slides 2-5 additionally verified during QA via throwaway copies with
  the start slide changed (files deleted after): slide 2 earnest/recoil
  beat reads; slide 3 correction beat reads with the friend front and
  centre; slide 4 giant face with huge red pupils and caption band;
  slide 5 recap strip, settled banner and closing caption all legible.
- Fixes during QA: (1) the tail first sat at mid-torso, thick, and read
  as a third arm: moved to hip height behind the dress, thinned, shorter
  curl; (2) the worried brows slanted down toward the centre and read
  angry: flipped to rise toward the centre; (3) slide 3's speech tail
  stabbed into the friend's bubble: rerouted to land on the dog-woman's
  head clear of it. All sizes re-rendered and the determinism gate
  re-passed after each fix.

## Deviations

- Slide 2's earnest line and slide 3's insistence line are written out
  in Spanish from the prompt's paraphrased beats (the prompt quotes only
  "Ay, Dios..." and "es el alcohol, no el amor" for those slides); both
  wordings are recorded above.
- The closing caption "amiga, date cuenta" on slide 5 is an addition:
  the prompt ends the arc on the tribunal banner, and the piece's own
  title is used as the verdict line under it. The banner itself is
  unchanged and remains the largest element.
- A tap that starts on the dog-woman is reserved for the tail gag and
  does not advance the carousel, so the drag beat cannot be skipped past
  by accident; taps anywhere else advance.
