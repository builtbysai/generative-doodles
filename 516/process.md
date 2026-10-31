# No.516 Giant on a Minipony

EXPANSION #62 giulia-pastorino, prompt GP4. Source: her giant-headed
woman on a minipony ("Donna in carne dalla testa grossa su minipony
dalla testa piccola", 2019) - the extreme scale mismatch, the two-dot
face grammar, and crayon texture over flat fields, never gradients.

## Concept

A rider with a head roughly three times normal proportion (one flat
blue hair mass with a bun, a plain face carrying exactly two dot eyes
and one bent-line mouth, nothing more) sits on a tiny black pony about
a quarter of her height. She wears a trapezoid dress of four warm
stripes (orange, yellow, deep red, orange in the shipped seed) bowed
on a slight curve across the torso; her stick arms and legs are plain
skin tone, with deep-red shoes. The scene sits on a cream ground
inside a blue painted frame border about 4% of the canvas width, with
exactly three sparse crayon props that never touch the figures in the
opening frame: a sun disc top-left, a potted plant bottom-right,
wavy ground scribbles bottom-left.

Watch-only loop: the pony ambles left to right across the cream field
at a steady 60 design px/s, legs alternating in diagonal pairs, tail
swaying, the whole pony bobbing gently while the rider bobs on her
own phase on top. At both ends the pony slips behind the frame and
wraps to the other side. The props stay still. Per the prompt, a tap
anywhere reseeds (never a page reload): new hair colour (blue or
red), new stripe order, new prop set drawn from the slot variants
(crescent moon for the sun slot, a stack of books for the plant slot,
three small flowers for the scribble slot).

## Construction

Single self-contained index.html, canvas 2D, no external assets.

- Seeded layout via mulberry32. The seed comes from ?seed= in the URL
  when present, otherwise the fixed default 51611, chosen because it
  rolls the prompt's named configuration: blue hair and the
  sun / plant / scribbles prop set. Layout precomputes the hair
  colour, the shuffled stripe order (with a rotation pass that keeps
  the doubled orange from landing on itself, so all four bands
  read), the three prop-slot picks, 150 crayon hatch strokes lying
  in the frame band, and 820 grain specks.
- Pony: flat ellipse body, stroked neck, ellipse head and muzzle,
  triangle ear, one cream dot eye, four stroked legs swung by a leg
  phase tied to distance travelled (stride 95px), curved tail with a
  tuft. Rider: hair fall ellipse behind the dress, stick legs, the
  dress drawn as a clipped trapezoid with each stripe band filled as
  a bowed path, a small neck, stick arms (the front one reaching
  toward the pony's neck), then the hair mass and the face circle
  set down-right inside it, with the two dot eyes and bent-line
  mouth stroked last.
- The amble position is a pure function of phase: pony centre
  x = -219 + mod(621 + 60t, 1464), so at the constant first-frame
  phase the pony sits exactly centred in the field, mid-stride at
  leg phase 0.9. The figure group is clipped to the cream field, so
  the wrap happens behind the frame band rather than across it. A
  flat pale ellipse travels under the pony as a ground shadow.
- Canvas size comes from the Visual Viewport API with resize
  listeners on visualViewport and window; draw() pins
  canvas.style.width/height in px every frame. Phone detection uses
  window.screen physical size (min dimension under 700px) with
  aspect h > w*1.15 as fallback. The square composition letterboxes
  on any screen and the page ground is the piece's cream.

Deviations, with reasons:

- Skin tone #F0BE96: the prompt's palette names no skin colour, but
  the figure needs one; a flat warm peach from the same warm accent
  family as the dress stripes is used for the face, neck, arms and
  legs. Everything else is strictly the listed palette (cream
  #F7F2E4, blue #2B4FB0, red #E6392B, pony black #1A1A1A, stripes
  #E8722A / #F2B705 / #C23B2A). Flat fills only, no gradients
  anywhere.
- Crayon grain: the prompt asks for crayon texture over the fills.
  House renderer limits (no document.createElement, no offscreen
  canvas) rule out a pre-rendered texture canvas, so the grain is a
  precomputed seeded array of 820 tiny specks in the palette inks at
  low alpha, drawn directly every frame, plus the seeded hatch
  strokes on the frame band. Same static crayon read, same palette.
- Prop variants on reseed: the prompt's own reseed spec calls for a
  new prop set per tap, so each of the three fixed slots has one
  alternate (moon, books, flowers). The shipped seed shows exactly
  the prompt's named set (sun disc, potted plant, ground scribbles),
  and there are always exactly three props.

## QA log

Rendered with node ~/workspace/tools/render-piece.js (no rAF, no
AudioContext, no createElement in the harness, as required).

- qa-desktop.png (1280x900): blue frame with visible crayon hatch,
  cream field; sun disc top-left clear of the rider; giant blue hair
  mass and bun, face with two dot eyes and a bent-line mouth; four
  distinct dress bands; pony centred mid-stride with alternating
  legs, tail and cream eye; potted plant bottom-right and ground
  scribbles bottom-left, nothing touching the figures.
- thumb.png (720x720): same read at gallery size.
- qa-mobile.png (390x844): square stage letterboxed on the cream
  page ground, frame complete on all four sides, pony and rider
  whole, props in place, nothing clipped.
- Fix during QA: the first candidate seed (51604) rolled the
  alternate prop set (crescent moon, book stack) and the next
  candidate put the two orange stripes adjacent, merging them into
  one band. The default seed was changed to 51611, which rolls the
  prompt's named prop set, and a rotation pass was added to the
  stripe layout so the doubled colour never sits on itself; all
  sizes re-rendered and the determinism gate re-passed.
- Determinism: first frame is the synchronous draw at constant
  phase PHASE0 = 2.3s (pony centred in the field, legs at the fixed
  mid-stride phase). No Date.now anywhere; the rAF loop is
  typeof-guarded and anchored as PHASE0 + elapsed. thumb.png
  rendered twice and cmp byte-compared: identical.
