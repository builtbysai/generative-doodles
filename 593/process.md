# No.593 "31. Mamá" — EXPANSION #72 clara-lagos, block 1 "Treinta y Un Días"

## Concept

Clara Lagos's numbered-vignette engine (after her Inktober 2025 run): 31 small
cards, one numbered micro-moment per day of a single visit — a child staying
over — reading in order as one quiet 31-day story. No invented drama, no
tidy grid, no skipping numbers. The band meanders like notebook pages; day 31,
"Mamá" arriving, is a larger card, the moment the month was leading to.

Each card: a prominent hand-lettered number, one title-word, one tiny ink
drawing. Under the centered card, its caption line in her plainspoken Spanish
types itself in. Tapping a card flips it to its making-note (where she drew
it). The month never reshuffles.

## Construction

- Single self-contained `index.html`, canvas 2D, stage coordinates 0..1000,
  square stage letterboxed on the paper color; Visual Viewport sizing with
  resize listeners on `visualViewport` and `window`; canvas CSS size pinned
  in px inside `draw()`; phone detection via `window.screen` min dimension
  (< 700) with aspect fallback.
- Palette, strict: ink `#1A1A1A`, paper `#FAF7F0`, one soft blue `#3E6FA8`
  spent only on day 6's ball returning over the fence and day 14's bucket.
  Card stock is a near-white tint of the paper tone (`#FFFEFA`).
- The 31 days are a fixed array (word / scene / caption), in order:
  1 Llegada "Llegó con la valijita." · 2 Limones "Limones paraguayos del
  fondo." · 3 Gato "El gato vino a saludar." · 4 Silencio "A veces no hace
  falta hablar." · 5 Escuchar "Escuchar también es un juego." · 6 Devolver
  "La pelota volvió sola." · 7 Desayuno "Desayuno sin apuro." · 8 Plaza "La
  plaza de siempre." · 9 Cartas "Me ganó dos veces." · 10 Lluvia "Llovió y
  miramos." · 11 Cocina "Ayudó a revolver." · 12 Siesta "Siesta corta." ·
  13 Bici "Sin rueditas, casi." · 14 Mar "El mar estaba bravo." · 15 Kiosco
  "Una moneda, una golosina." · 16 Dibujo "Dibujó la casa." · 17 Vecinos
  "Saludaron como siempre." · 18 Perro "El perro de la esquina." · 19 Mercado
  "Compramos de más." · 20 Cuento "El mismo cuento otra vez." · 21 Fotos
  "Sacó fotos borrosas." · 22 Jardín "Plantó algo y esperó." · 23 Mate "Probó
  y puso cara." · 24 Noche "Contamos estrellas." · 25 Cumpleaños "Cumple del
  abuelo." · 26 Río "Tiró piedritas." · 27 Cine "Se durmió a la mitad." ·
  28 Escribir "Escribió una carta." · 29 Valija "Armó la valija sola." ·
  30 Víspera "Mañana viene mamá." · 31 Mamá "Mamá."
- Each of the 31 scenes is a small parametric ink glyph drawn from primitives
  (lines, arcs, ellipses) in a shared scene box; card positions, meander
  (sine drift + seeded jitter), tilts and spacing irregularities are all
  precomputed from mulberry32 seed 593071, so no randomness runs in `draw()`.
- Interaction: horizontal drag walks the month (view eases to the drag
  target); the card nearest center lifts and scales slightly, and its caption
  re-types at ~30 ms per character. Tap a card: it flips (width follows
  |cos| of the flip progress; the back is drawn unmirrored past halfway) to
  ruled notebook paper reading "dibujada en" + its place, rotating by day
  index through plaza / sala de espera / café / cocina / en el colectivo,
  plus "día N de 31"; the tapped card also eases to center. Tap again flips
  back. After 4 s idle, a slow auto-drift (26 stage units/s) walks the month
  and ping-pongs at the ends. Never click-to-reload.
- Determinism: frame one is the synchronous `draw(PHASE0)` at load — day 1
  centered, lifted, caption fully typed (typewriter start parked far in the
  past). No `Date.now()` anywhere; the rAF loop is `typeof`-guarded and
  anchored as PHASE0 + elapsed via `performance.now`.

## QA log

- Rendered with `~/workspace/tools/render-piece.js`: qa-desktop.png
  (1280x900), qa-mobile.png (390x844), thumb.png (720x720). Thumb rendered
  twice and `cmp` byte-compared: identical (re-verified after the fix round);
  the second render was deleted.
- Desktop/thumb frame one read-back: header "treinta y un días, una visita",
  day 1 (Llegada: door, child, suitcase) centered and lifted with caption
  "Llegó con la valijita." complete below; cards 2 Limones, 3 Gato,
  4 Silencio trail right with prominent numbers; nothing clipped.
- Mobile read-back: the square stage letterboxes on the paper color, the band
  spans the full 390 width, centered card and caption legible, hint present.
- Preset checks on throwaway copies (deleted after): end-of-month view shows
  card 31 larger, mother with arms open and child running, caption "Mamá.";
  a mid-month view with card 14 flipped shows the making-note back reading
  correctly ("dibujada en / cocina / día 14 de 31") — the blue bucket sits on
  card 14's front, its Mar waves and caption "El mar estaba bravo." verified
  in the same pass.
- Fixes during QA: (1) the flipped back was painted mirrored (negative
  scaleX) — now the card width follows |cos| and the back is drawn
  unmirrored; (2) the title word crowded two-digit numbers ("31.Mamá") — the
  word is now placed after the measured number width.
- Grep-level checks: no `Date.now`, no `document.createElement`, no
  `AudioContext`, no external URLs, no em dashes in visible copy.

## Deviations

- Frame one shows the band trailing to the right of centered day 1 rather
  than both ways: day 1 is by definition the first card, so there is no
  earlier day to trail left; the left of the stage is the notebook margin
  where the month begins. Recorded as a read of the brief, no content added.
- Day 11's scene is the pot with steam only; the blue apron the prompt allows
  on a helper figure was not drawn (no figure in the glyph), so the blue
  budget is spent exactly twice: the ball (day 6) and the bucket (day 14).
- A small header line, "treinta y un días, una visita", sits above the band;
  it is framing text in her register, not an extra vignette.
