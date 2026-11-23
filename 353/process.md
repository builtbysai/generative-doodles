# No.925 "I Am a Piece. I Am a Portal to the Data."

Study #113 miriam_quick + stefanie_posavec, PP86 "I Am a Piece".

## Concept

The piece is a small book that narrates itself in the first person. There are no
charts, bars, axes, or legend tables anywhere: the discipline of the source
work (Quick and Posavec, I Am a Book) is that the object is the data, at 1:1
scale. A rounded ink book with an orange spine idles in the upper field of a
paper page, breathing on an 8 second loop. Below a thin ink rule, a caption
band carries the narrator's voice in serif type. The narrator waits: cards
advance only when the reader turns the page with a tap. Dragging handles the
book; releasing drops it, and it splashes exactly as wide as it is. A double
tap slams the cover (a 200 ms full screen ink flash) and the book reopens on
a different card.

Palette, strict: paper #FAF7F0, ink #141210, accent #E4572E (the spine and the
bookmark, the one loud color), drop blue #2E86AB (the 6 px drop only), mouse
gray #8A8578 (the cover ring and the loop track).

## The card script (verbatim, as generated at draw time)

Bracketed values are measured live from the actual canvas and draw state each
frame, so the statements stay true at every size.

1. "I am a piece. I am a portal to the data."
   Visual: the book, plain.
2. "I am [W] pixels wide. That is not an accident."
   W = Math.round(viewW), the real CSS width. Visual: a rule with end ticks
   spanning exactly the canvas width, edge to edge.
3. "A mouse drinks less than 6 ml of water a day. My drop is exactly 6 pixels."
   Visual: a drop glyph exactly 6 CSS px tall, drop blue, resting on the
   cover ring.
4. "I am [H] pixels tall. I counted."
   H = Math.round(viewH). Visual: a rule with end ticks spanning exactly the
   canvas height at the left side.
5. "My loop takes 8 seconds. You are inside second [S]."
   S = floor(elapsed mod 8) + 1, live. Visual: a thin progress line under the
   book, filled to the live loop fraction.
6. "I draw myself with 60 marks. Every one is placed."
   Visual: exactly 60 ink ticks around the book, placed by a fixed formula
   (angle i/60 of a turn, radius wobbled by sin(3a + 1.7), length by
   sin(5a + 0.4)); the text reads TICKS.length, so the count cannot drift
   from what is drawn.
7. "Drop me. I splash exactly as much as I am."
   Visual: 0.45 s after the card is entered, the book hops once on its own
   and lands with a splash.
8. "I have told you everything I am. Turn the page."
   Visual: the book closed, spine at full accent with a bookmark ribbon.

## Construction

Single self contained index.html, canvas 2D, no external assets, no absolute
URLs, no date strings, no em dashes anywhere (grep verified).

Sizing: canvas size comes from the Visual Viewport API with resize listeners
on visualViewport and on window; draw() pins canvas.style.width and height in
px every frame. Phone detection uses window.screen physical size (min
dimension under 700 px) with the aspect fallback h > w * 1.15. On the light
ground the page background is the paper color, and caption type scales down
and wraps (measured, word wrapped, up to the lines it needs) so it stays
legible and unclipped at 390 px wide.

Determinism: frame one is a synchronous draw(0) at load: card 1, book at home
at rest, breathing angle sin(0) = 0. Nothing is derived from Date.now(); the
clock is performance.now() relative to a start captured at init, and the QA
harness (which has neither performance nor rAF) draws exactly the t = 0 frame.
requestAnimationFrame is typeof guarded. All state is recorded events, and
every pose is a closed form function of those events and t: no frame
integration anywhere.

Fall model (closed form ballistic): a release records {t0, x0, cy0, vx, vy}
with velocity taken from the last two pointer samples and clamped. While
airborne, cx = x0 + vx dt and cy = cy0 + vy dt + (G/2) dt^2 with G = 1500
px/s^2. The landing time is the positive root of cy(dt) = restCenterY,
solved analytically. After landing, the splash puddle appears: an ellipse
whose full width equals the book's width exactly (the 1:1 joke, kept
honest), swelling from 0.55 to 1.0 of that width in 0.22 s, then fading out
by 2.4 s. The book rests, then glides home on a smoothstep between 0.9 s and
2.1 s after landing. The card 7 self drop reuses the same machinery with a
synthetic release (vy = -230 px/s from home), created once per card entry
behind a selfDone flag. Drag tilt is a direct function of the last two
pointer samples' horizontal velocity, clamped to 0.35 rad; idle breathing is
0.02 sin over the 8 s loop.

Interaction details: a tap is a short press without movement. A single tap is
held for a 0.35 s window so a second tap inside it can be read as the slam;
a lone tap then turns the page. The slam advances by 1 + floor(rng() * 7)
cards from a seeded mulberry32 stream, so it always lands on a different
card and never reloads.

Audio: created lazily inside the first pointer gesture, typeof guarded
(AudioContext or webkitAudioContext), and silent in the QA harness. Page turn
is a band passed noise swish sweeping 500 to 2600 Hz. The landing plays a low
thud plus a droplet plink whose gain envelope ends at exactly 6 ms, because
the drop is exactly 6 px. The slam is a 95 Hz book thump with a low passed
noise knock. Landing sounds are scheduled at release time plus the
analytically computed flight time, so sound and splash agree.

## Deviations

- Card 5's "loop": the narrator never auto advances (the brief: the voice
  waits for the reader), so the honest loop the piece can state is its own
  idle breathing loop, 8 seconds, which is what the card names and what the
  progress line draws. Recorded here because the brief left the interval to
  the build.
- The drop glyph is drawn as a small bezier teardrop 6 CSS px tall; at that
  size it reads as a blue bead on the cover, which is the intended joke: it
  really is only 6 px.
- The cover carries one mouse gray ring as its only decoration. It is a
  printed cover motif, not a data mark; card 6's 60 ticks are separate and
  exactly counted.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas), silent, no
rAF, no audio.

- qa-desktop.png (1280x900): paper ground; ink book centered in the upper
  field with orange spine, paper page edge at the right, gray cover ring;
  thin rule at 66 percent height; caption band reads "I am a piece. I am a
  portal to the data." in one line, centered, unclipped.
- qa-mobile.png (390x844): same composition on the phone path; book smaller
  and higher in the tall frame; caption on one legible line, unclipped.
- thumb.png (720x720): same frame one at gallery size.
- Determinism: thumb.png rendered twice and compared with cmp: byte
  identical. The duplicate was deleted.
- Grep checks: no em dash characters in index.html; no http references; the
  only visible text at frame one is caption card 1 (the title element carries
  the piece name).
