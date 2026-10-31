# No.559 — Souvenirs del Viajero Experto

EXPANSION #67 roberta-vazquez, prompt RV7 (verified verbatim from TASKS.md).

## Concept

A 9-panel taxonomy page of tacky souvenirs in Roberta Vázquez's specimen-catalogue
mode: a blue anthropomorphic rodent traveler with a brown suitcase recurs in every
panel, and each panel carries a tan specimen-label caption underneath. The order
never shuffles; it reads as a catalogue. Below the grid stands a hero zone with the
traveler at large scale beside his own big suitcase, which is the piece's main
interactive prop: drag it and it opens, the green lizard springs out and perches on
the traveler's head; release and the lizard crawls back in. Tapping any panel makes
the traveler briefly reenact that souvenir's gag.

The nine panels, in fixed order:

1. Extravagant handmade collar of tiny white hands, worn proudly, one grand hand on
   a display stand. In-panel line: "¡hecho a mano!"
2. Pink message tee reading "PARIS MON AMOUR", worn, with a second tee on a rack.
3. Protected-beach starfish heist stopped mid-theft: sand strip, prohibition sign
   (mini starfish under a red slash), speech bubble "¡alto!".
4. "I ♥ Benidorm" memory tattoo (the ♥ drawn as a red heart) being needled onto his
   chest while he cries; ink bottle labelled "tinta" on the floor.
5. Fridge magnets including an Ibiza bikini magnet, with the in-panel caption
   "arte con mayúsculas"; S-O-L letter magnets, starfish and heart magnets.
6. Nostalgic trash: he holds up a used napkin ("Nápoles…"), crumpled tissue pile and
   a tissue box.
7. Chipotle sauce bottle as gastronomic souvenir; it burns him: open mouth, sweat
   drops, looping steam, "Acapulco…" and "¡pica!".
8. The involuntary souvenir: a live, friendly green lizard hitchhiking in the open
   suitcase; in-panel note "el comienzo de una amistad".
9. Home at last: traveler content (happy closed eye), wearing the hand collar again,
   open suitcase with the starfish and the chipotle bottle on a stool beside him.
   In-panel line: "en casa".

Specimen labels (verbatim, under each panel): "souvenir artesanal", "souvenir
textil", "souvenir prohibido", "souvenir permanente", "souvenir imán", "souvenir
nostálgico", "souvenir gastronómico", "souvenir involuntario", "souvenir total".
All labels and in-panel text are Spanish; no English appears on the page. The only
other visible text is the interaction hint "drag · tap".

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no URLs,
  no audio, no microphone. Flat fills only, no gradients anywhere.
- Strict palette, nothing else: traveler blue #5A8AD6, suitcase brown #8A5A30,
  collar white #FFFFFF, tee pink #F06AA8, starfish orange #F07B2E, tattoo red
  #D93A2B, bikini yellow #F2D230, trash grey #9A9A9A, chipotle red #C0392B, lizard
  green #5AB85A, banner tan #EAC97E, ink #1A1A1A.
- Design space 1080×1240 (portrait page). Grid: 3×3, panels 328×236 with wobbly
  seeded frames, tan label banner under each. Hero zone below a wobbly divider
  line: traveler at 2.4× beside the 425×158 hero suitcase (lid hinged at its top
  edge, tan straps, tan interior with a folded pink tee inside when open).
- One parametric `traveler()` rig (ears, snout, whiskers, tail, arm poses, open /
  happy / crying eyes, smile / flat / open / wavy mouths, optional shirt fill) is
  reused at every scale so the character design never changes between panels, as
  the prompt requires. The lizard, starfish, tiny hand, heart and suitcase are
  shared prop functions too.
- Lettering: canvas text in a rounded bold stack ("Chalkboard SE", "Comic Sans MS")
  with per-string seeded jitter (rotation/offset per character), so the Spanish
  reads hand-lettered and never shimmers between frames. Label font size auto-fits
  its banner.
- Interaction: pointer events in design coordinates. Drag starting on the hero
  suitcase sets the open amount from drag distance (the case also nudges with the
  drag); the lid rotates open and the lizard rides an eased quadratic arc from the
  case mouth to the traveler's head, perching (and waving) once fully open; on
  release the open amount animates back and the lizard returns along the same arc.
  A tap (small movement, short press) on a panel triggers a 1.4 s gag envelope for
  that panel only: collar hands wiggle, tee wearer bounces, starfish chase wiggle,
  tattoo needle buzz, magnets hop, napkin waves, chipotle steam burst and shake,
  panel lizard jumps, home panel bounces. Ambient motion: hero traveler's breath
  bob, chipotle steam loop, panel lizard's tail wag — all pure functions of the
  loop phase. Never click-to-reload.
- House rules: canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas CSS size pinned in px inside draw() every
  frame; phone detection via window.screen (min dimension < 700 px) with the
  aspect fallback only; on phones the page spans the full width and centres on the
  tan ground, keeping its shape; page ground is the banner tan #EAC97E.
- Determinism: frame one is the synchronous draw at the constant phase PHASE0 = 1.7
  (grid composed, hero suitcase closed, traveler standing by). The rAF loop is
  typeof-guarded and anchored as PHASE0 + elapsed; no Date.now anywhere; all
  randomness comes from mulberry32 with fixed seeds (wobble paths, lettering
  jitter), so every frame is reproducible. Gag/drag state never affects frame one.

## QA log

- Renders via `node ~/workspace/tools/render-piece.js`: qa-desktop.png (1280×900),
  qa-mobile.png (390×844), thumb.png (720×720).
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared — identical.
  Second render deleted. Also grepped the script: zero Date.now, zero gradient
  calls, zero URLs.
- Read-back, desktop and thumb: all nine panels legible with the blue traveler in
  each; labels fully readable and in order; hero traveler and closed hero suitcase
  clear of the grid; hint subtle in the corner.
- Read-back, mobile: the whole portrait page spans the full 390 px width, centred
  on the tan ground; no panel, label, or hero element is clipped.
- Fix pass 1 (after first read-back): the closed hero lid overlapped the third
  row's label banners — hero case moved down and shrunk (body 425×158, lid 104)
  and the divider raised, clearing the grid. Shirt text moved onto the chest,
  "¡alto!" bubble repositioned off the sign, tattoo needle and ink bottle enlarged
  and grounded, fridge and magnets scaled up, napkin and tissue box grounded on
  the floor line, chipotle bottle enlarged and its steam tightened, the
  "el comienzo de una amistad" note moved clear of panel 8's lid, panel 9's open
  suitcase given a tan interior so it reads as a case.
- Fix pass 2: tee lettering fits the chest at the larger traveler scale; the
  Benidorm tattoo is lettered in palette white so it reads against the blue body
  (see deviations); the hand collar enlarged in panels 1 and 9 so the ring of
  tiny hands reads at gallery size.

## Deviations

- The tattoo's lettering ("I", "Benidorm") is drawn in palette white rather than a
  dark ink colour: at panel scale, ink #1A1A1A lettering on the blue body was
  illegible in the QA read-back. White is inside the strict palette (the collar
  colour) and keeps the gag readable; the heart itself stays tattoo red #D93A2B.
- Panel 9's caption in the prompt is a summary ("the traveler at home… content")
  with no fixed souvenir label beyond the taxonomy; its specimen label is
  "souvenir total" and its small in-panel line is "en casa", both Spanish, matching
  the catalogue voice of the other panels.
- Panel 3's "stopped mid-theft" beat is carried by a prohibition sign (mini
  starfish under a red slash) plus an off-panel guard's bubble "¡alto!", since the
  prompt names no guard character and no new character was invented.
- The hero drag opens the suitcase by drag distance and the lizard's perch is an
  eased arc driven by that same open amount (rather than a spring simulation), so
  the motion stays inside the piece's deterministic, phase-based discipline and
  frame one is never affected by pointer state.
