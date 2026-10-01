# Computer Technique Group, Tokyo

**Date:** 2026-10-01
**Subject:** The first Japanese computer art group; the incremental metamorphosis method
**Hop path:** Cybernetic Serendipity (2026-09-30 study) named CTG as the lone Japanese exhibitors, and a bridge to the Japanese computer art thread
**Depth:** deep (mechanism re-rendered locally; 7 images inspected at full resolution)

## Who they were

The Computer Technique Group (CTG) was founded in 1966 by Masao Komura while he was still a student at Tama Fine Arts University (he graduated in 1969). The members named in the sources: Haruki Tsuchiya (systems engineer), Kunio Yamanaka (aeronautic engineer), Junichiro Kakizaki (electronic engineer; one source spells it Kazizaki), Makoto Ohtake (architectural designer), Koji Fujino (systems engineer), and Fujio Niwa (systems engineer). Komura was the only artist in the group; everyone was in their early twenties. The group's manifesto stated its aim as "the restoration of man's innate rights of existence by means of computer control."

Note on the name: early English-language sources spell him Komura, but the artist himself prefers Kohmura. The V&A uses Kohmura now and notes the older spelling.

Their work ran in parallel with E.A.T. (Experiments in Art and Technology), the New York artist-engineer collaboration founded the same year, 1966. Jasia Reichardt, who put CTG into Cybernetic Serendipity, quotes the group's attitude to computer-aided work: the artist designs a system, a method of producing a given repertoire of forms, and "it is the program itself that is the work of art." CTG contributed 24 works of computer-generated art and computer poetry to Cybernetic Serendipity. The group disbanded in 1969.

The hardware: Fortran IV on an IBM 7090, drawn on a Calcomp 563 plotter, at the IBM Scientific Data Centre in Tokyo. The key works were plotted in late 1967 or early 1968.

## The mechanism: incremental metamorphosis

Almost everything CTG showed was a transformation of simple, famous contours. The method, reconstructed from the images and the catalogue text:

1. Take two (or more) closed outlines, digitized by hand as point sequences.
2. Resample both to equal point counts, matched by position around the outline.
3. Draw N intermediate contours, each point a linear blend of its two correspondents.
4. The sequence itself is the picture.

The catalogue text for the two Return to Square versions makes the control variable explicit. Version (a): 50 incremental steps in arithmetic series, black on white. Version (b): 30 incremental steps in geometric progression, white on black. Same subject, two progressions, two polarities. The (a)/(b) pairing is a controlled experiment: the progression is the work's variable, not a rendering detail.

Running Cola is Africa (No. 3 in CTG's Metamorphoses Series) extends the method to three keys: a running man's contour changes to a Coca-Cola bottle outline, then to the outline of Africa. Idea by Komura (product designer), data by Ohtake (architectural designer), programme by Fujino (systems engineer). The sheet carries the keys in a top row and the full condensed transformation as an overlapping band below. It is one of the earliest examples of morphing: image transformation by computer.

## The works, with their credits

**Return to Square (a):** "A computer metamorphosis. A square is transformed into a profile of a woman and then back into a square." 50 steps, arithmetic series, black on white. Idea by Masao Komura, programme by Kunio Yamanaka. Motif Edition ME/02/2.

**Return to Square (b):** "One of two works on this theme. Return to square (a), however, is programmed according to an arithmetic series, and this one is programmed according to geometrical progression." 30 steps, white on black. This is the version used for CTG's 1968 Tokyo Gallery exhibition poster ("media transformation through electronics," September 5 to 21, 1968, one month after Cybernetic Serendipity opened) and for Morton Subotnick's 1969 album Touch.

**Running Cola is Africa:** No. 3 in the Metamorphoses Series. "A computer algorithm converts a running man into a bottle of cola, which in turn is converted into the map of Africa." Motif Edition ME/02/1.

**Automatic Painting Machine No. 1:** an interactive computer installation that responded to sound and light input from a "happening zone," an area of the gallery that participants would sometimes inadvertently pass through.

**The source image:** the woman's profile in Return to Square was traced from a 1964 Vogue spread, a William Klein photograph of four models' hair styling. CTG lifted one head outline from a fashion magazine and made it the keyframe of a computer metamorphosis.

**The Motif Editions portfolio:** seven lithographs published in London in 1968 in connection with Cybernetic Serendipity, to sell to visitors at the ICA and on the American tour. Two works by CTG, plus Charles Csuri and James Shaffer, William Fetter, Maughan S. Mason, Donald K. Robbins, and Kerry Strand. The complete set was acquired by the V&A in 1969 for 5 pounds; the Science Museum Group holds the set too.

## Komura after CTG

Katsuhiro Yamaguchi, in his book on 20th-century art and the machine, describes Komura's "wordless dictionary" of the 1980s as a "nonman performance" about the process of production: "conceptual art of the computer era." His gloss: in a computer society where information is digitized, "the digitization of meaningless words is a kind of nonart." The metamorphosis instinct survived the group: by the eighties it was applied to language instead of contours.

Jean Ippolito draws the parallel to the Gutai group of the 1950s: Tanaka Atsuko's bell piece (twenty electric bells on some 150 feet of cord, set off in a chain reaction when kicked), the electric dresses, performances as early as 1957, well before Kaprow's Happenings. CTG's activities read as Gutai transferred to a technological format.

## Images inspected

1. **1968 exhibition poster** (1968): Return to Square (b) in white on black. Outermost is a rounded rectangle frame; the head emerges from it, dissolving inward through 30 contours to a small central diamond. Thin straight marks: a vertical line running top to bottom through the head, short diagonal ticks along the right contours. These read as plotter pen-travel or registration marks, distinct from the contour family.
2. **Touch album cover** (1969): the same (b) image, confirming the poster design's afterlife on Subotnick's third album (Buchla Electronic Music System).
3. **Return to Square (a)** (1967/68): black on white, the 50-step arithmetic version. Denser, more even hatching inside the head; the even spacing reads as a survey, calm where (b) reads as gravity.
4. **1964 Vogue spread** (William Klein photograph): the source. Four models, hair the subject ("Bulletin on the new savvy seat of hair"). The head CTG used is instantly readable as a fashion-magazine profile, which is the point: famous contours, dissolved.
5. **Coulthart's Illustrator recreation:** a naive shape blend of the same idea produces a doubled jaw where the profile meets the square, an artifact the original avoids. Tells us the original's point correspondence was digitized carefully, feature by feature, not auto-blended.
6. **Running Cola is Africa, V&A framemark scan:** top row of five key outlines (running man, bottle-ish blob, tall bottle, another blob, Africa), then the condensed transformation below as one long overlapping band, the man dissolving left to right into the bottle stages and out into Africa.
7. **Running Cola is Africa, alternate scan:** same composition, confirming the two-row layout is the work's structure, not a reproduction quirk.

## Local re-renders (hidden_files/study-2026-10-01-ctg/render/)

I rebuilt the mechanism from the description: hand-sketched head profile (my own, not a trace), resampled both outlines to 180 points by equal arc length, linear point-by-point blend. Three renders:

- **r1_geometric_30.png:** 30 steps, geometric progression, white on black. Lines bunch toward the center diamond; wide spacing at the head. Matches the poster's gravity.
- **r2_arithmetic_50.png:** 50 steps, arithmetic progression, black on white. Even spacing throughout; matches the lithograph's survey calm.
- **r3_condensed_strip.png:** three-key morph (head, bottle, diamond) laid out as a left-to-right overlapping band with the keys in a top row, after the Running Cola sheet structure.

Findings:

- The look is convincingly reproducible from the naive recipe, which means the recipe is probably close to what they did.
- Measured contour spacing: geometric gaps start around 0.022 at the head and shrink to near zero at the center; arithmetic gaps hold constant at about 0.0056. The progression choice is visible as line density, and CTG used it as a compositional variable.
- Correspondence artifacts are the technique's fingerprint. Sharp features (my sketch's nose) collapse toward the target's vertices and throw spoke-like lines across the contour family. The original poster's straight travel marks are a different family (pen travel), but both belong to the plotter era: the drawing records the machine's motion, not just the image.
- The Coulthart jaw artifact plus my nose spokes point the same way: naive correspondence breaks at sharp features, and the originals show none of it, so the digitizing was deliberate, feature-matched work.

## What makes it sing

- The concept is the morph, not the picture. Famous, instantly readable contours (a Vogue head, a running man, a Coke bottle, Africa) are chosen because everyone reads them, then the computer dissolves them into each other. The reading happens in the dissolve.
- The series discipline: this is a method applied repeatedly (Metamorphoses Series Nos. 1, 3, and whatever No. 2 was), not a one-off effect. Reichardt's line holds: the program is the work of art; the sheets are its printouts.
- The two-version experiment: (a) and (b) differ in progression, step count, and polarity. CTG treated the interpolation schedule as a first-class artistic decision.
- Economy: one mechanism, famous contours, 30 or 50 lines, and it carried a gallery poster and an album cover.

## What to avoid

- Do not trace the head. The mechanism is the inheritance, not the profile. Any readable contour will do; the dissolve is the subject.
- Do not smooth away the correspondence artifacts. The spokes, cusps, and density shifts are the technique's fingerprint; a clean blend is a different piece.
- Do not make the morph about cleverness. CTG's power came from using images everyone already knew. An obscure keyframe dissolves into nothing.

## Honest gaps

- Zihou Ng's Observable notebook (code plus an interactive render of Return to Square (a)) failed to load on an upstream timeout; one attempt, not retried. Yamanaka's exact sampling scheme is inferred from the images and the catalogue text, not from the code.
- No original plotter drawing handled; everything seen is a lithograph, poster, or album-cover reproduction.
- Running Cola is Africa seen only as reproductions (V&A framemark scan, one alternate scan).
- Metamorphoses Series No. 2 unidentified. Japanese-language sources not read. Automatic Painting Machine known only from Ippolito's description. The members' later work not followed.

## Doorways

- Yoichiro Kawaguchi: growth algorithms and the Metaball program, the Japanese thread continuing into the eighties.
- Masaki Fujihata: concept-driven computer animation from the early seventies.
- The Motif Editions portfolio as an editioning study: how computer art first reached buyers, at 5 pounds the set.
- E.A.T. as the parallel track: same founding year, artist-engineer collaboration, different continent.
- The Cybernetic Serendipity catalogue itself, and the Japanese fifties-to-seventies media art line behind CTG: Gutai, Jikken Kobo, Video Hiroba.
