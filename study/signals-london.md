# Signals London: Study Notes

**Depth:** deep. Read the full Interfaces journal article "Signals Crossing Borders: Cybernetic Words and Images and 1960s Avant-Garde Art" end to end (644 lines, all 69 numbered sections), the Artnet account of the 2018 Kurimanzutto tribute show, the Room and Book listing for Signals Vol.1 No.8, and the QAGOMA and Ocula accounts of David Medalla's Cloud Canyons. Visually inspected ten images: the Signalz 1.1 front page (Aug 1964), the Cruz-Diez photo-strip page from Signals 1.9, the Signals 1.10 spread with the Cruz-Diez statement and Heisenberg reprint, the Soto back cover with The Little Yellow (1965) and the grid of 20 Soto signatures, the Otero special issue cover (49 por ciento, pink and blue duochrome), the front and back covers folded out together, the Found Poem for Takis page with the Cloud Canyon detail above it, the Found Poem for Otero tool diagram page, the 2018 installation view with Takis Signal (1964) at center, and a Cloud Canyons foam cluster on its circular plinth. Locally re-rendered two studies and inspected them.

## What Signals was

Signals London ran from 1964 to 1966: a gallery at 39 Wigmore Street (first at 92 Cornwall Gardens) plus a broadsheet, Signals Newsbulletin of the Centre for Advanced Creative Study, eleven numbers between August 1964 and March 1966. Directed by Paul Keeler, edited by David Medalla, with Gustav Metzger, Marcelo Salvadori, Christopher Walker and Guy Brett as co-founders of the Centre. The name came from Takis's Signal sculptures: tall thin antennae with blinking lights on top, built to register rapid technological change. The gallery gave London debuts to Lygia Clark, Helio Oiticica, Otto Piene, Harry Kramer and others, and showed Jesus Rafael Soto, Carlos Cruz-Diez, Alejandro Otero, Sergio de Camargo and Mira Schendel alongside historic constructivists: Gabo, Mondrian, Malevich, Lissitzky, Moholy-Nagy, Brancusi, Calder, Duchamp, Albers.

The bulletin is the more radical half. It was not a catalogue for the gallery. It was a second exhibition space that happened to be printed, folded rather than bound, printed in black plus two inks per issue, and mailed through embassies and airmail to readers on both sides of the Atlantic and both sides of the Iron Curtain. Circulation reached about 10,000 by the second issue. It reprinted Heisenberg on modern physics, New Scientist articles, Shakespeare, Mayakovsky, Hopi songs, letters from Mumford and Lowell protesting the Vietnam war, and poems for Takis by Gysin, Ansen and Farman-Farmaian, all set in the same visual register as the artwork. That last reprint is what ended it: the backer, Charles Keeler Sr., withdrew support. Final issue January 1966, last exhibition September 1966.

## The bulletin as a generative system

Four mechanisms matter for our work, and all four are layout algorithms before they are editorial choices.

First, the duochrome issue. Each number runs black plus two inks, and the pair changes per issue and per featured artist: lemon and navy for the Soto issue (1.10), acid pink and electric blue for Otero (2.11), metallic copper for the Takis found poem issue. Medalla also hand-tinted photographs of other artists' work into the issue colors, so the whole network of reproduced work takes on the tint of whoever leads that number. The pair becomes shorthand for an artist's identity even when their own work ranged wider. In code terms: one global two-color palette per run, applied to every asset without exception, including the masthead, the captions and Shakespeare. The constraint is what makes 24 pages read as one object.

Second, the photo-strip. In Signals 1.9 the Cruz-Diez works do not sit in a grid. Selected and captioned by the artist, they snake through the pages as a continuous strip, and the reader has to hunt to find the sequence: the caption in the article says the reader-viewer must make an effort to discover the images. Presentation becomes navigation. The page is a path, not a table.

Third, the page as the work itself. The back cover of the Soto issue does not reproduce The Little Yellow; it presents it: an electric yellow square over a black square nested in regular black lines, printed straight onto the glossy stock. There is no photograph pointing elsewhere. Above the fold on the same spread, twenty Soto signatures are printed in a grid, each slightly different, mechanical reproduction hollowing the signature out into pattern. Folding the broadsheet out joins front and back, and the signatures rhyme with the layout elements on the front page. The support is part of the piece, and folding is an operation the reader performs.

Fourth, the found poem. Found Poem for Takis (Signals 1.7) sets nearly 120 alphabetized words, many of them Cold War and military terms (advance, aircraft, ammunition, arc of observation, casualty, guided weapon, own troops), in the issue's copper ink beside a celestial diagram, with instructions sending the reader to a rules box: alight on the words in the manner of a Ouija board. The reader's drifting finger composes the poem. Found Poem for Otero does the same with rows of line-drawn tools and their names, trowels and smoothers rhyming as stanzas. A fixed alphabetized word field plus a wandering reader equals a text no one wrote in advance.

Around these four sits the mosaic method Medalla took from McLuhan: quotations, scientific reports, poems, diagrams and artwork woven with no hierarchy, texts in English, French, Spanish, Portuguese and Greek. Pamela Lee's line in Chronophobia, quoted in the article, is the sharpest summary: the gallery's interests were in articulating new perceptual modes, seeing works of art as vehicles of energy. The bulletin trained that perception in print.

## Medalla's Cloud Canyons

The gallery's co-founder made the kinetic work that best matches the bulletin's own logic. Cloud Canyons (begun 1963, first shown at Signals in 1964) are bubble machines: compressors under transparent tubes push soapy liquid up as foam, which rises in columns, oozes over the top, droops down the outside of the tube and rejoins the bath to be subsumed and risen again. Medalla called them auto-creative, coined against Metzger's auto-destructive art. The form is never repeated: gravity, air currents, temperature and humidity steer each column. He traced the idea to seeing a wounded guerrilla foaming at the mouth as a child in Manila, to coconut milk foaming in his mother's cooking, to clouds over Manila Bay and the Grand Canyon, to a soap factory in Marseille and the head on a beer in Edinburgh, all of which the sources repeat with unusual consistency. In the 1965 Mmmmmmm Manifesto he promised sculptures that would breathe, perspire, cough, laugh and crawl among people.

What matters here: the sculpture is a recycling loop with a visible phase change. Matter goes up as energy, comes down as matter, and the interesting shape lives at the turnover at the top of the tube, where the column loses its vertical discipline and curls. Nothing is stored; the piece is the turnover, repeated.

## Re-rendered locally (2026-10-01)

Two studies in Python and PIL, frames in the study working folder.

R1, duochrome bulletin model: a black masthead, a mosaic of quote tiles, a numbered photo-strip winding across the right margin, and an alphabetized found-poem word field in a bordered box, all in black plus lemon and navy only. What it taught: the two-ink rule holds a page together even when the content is deliberately miscellaneous, but the strip and the mosaic fight if both are dense. In the real 1.9 the strip wins whole pages and the text yields; my first pass let them share a page and the strip read as decoration instead of a path. Separation is the mechanism, not the palette alone.

R2, Cloud Canyons model: five tubes, foam blobs rising with a sinusoidal droop, three frames. What it taught: regular blobs read as a bead chain, not foam. The real columns work because blob size varies continuously, merges are common, and the droop at the top is asymmetric and slow. A foam model needs coalescence and a long lazy turnover, not a stack of circles.

## Generative takeaways

1. One duochrome pair per run, applied to everything. Let a single two-ink decision tint images, text, captions and furniture alike, and change the pair per seed or per featured subject. The coherence is free; the identity comes from restraint.
2. Make the reader hunt the sequence. A snaking photo-strip or path layout that has to be discovered beats a grid that can be taken in at a glance. Navigation time is part of the composition.
3. Print the work, do not reproduce it. When the page (or the screen) can be the direct site of the piece, skip the photograph pointing elsewhere. Folding, scrolling and unfolding are operations the reader performs on the work.
4. Alphabetized word field plus a wandering reader. A fixed sorted vocabulary read by Ouija drift, a pointer, or a slow automatic cursor is a complete text generator with no model required.
5. Build the turnover, not the column. In any recycling system (foam, dust, particles), the shape worth composing is where the rising phase gives up and falls back. Put the variation there.

## Honest gaps

No original issue handled; all pages seen as 480px wide reproductions in the journal article, legible for layout and color but not for fine type. The Iniva 1995 facsimile box was identified, not opened. Cloud Canyons seen in installation stills only, never running live, so foam timing and sound are from text. The Soundings Two exhibition checklist is known from the article's summary, not from a catalogue. Brett's Exploding Galaxies monograph was quoted throughout the article but not read directly.
