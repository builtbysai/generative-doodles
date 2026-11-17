# Amendment, No. 1859

Driver: a broadsheet of the word AMENDMENT lettered over and over in red ink, while thick black bars drift across it like slow glaciers and swallow the words one by one, until the only music left is the few bright words the black could not silence.

## Mechanism

A seeded grid of 13 rows of the word AMENDMENT fills the frame like a broadsheet, each word jittered in position, rotation, and red shade by a mulberry32 generator seeded with 1859, so frame one is identical on every load. Five glacier bars sweep horizontally at their own slow paces, each a pure function of a fixed phase time (FRAME_T 60.0 seconds), with soft ink edges drawn as translucent feather passes. A word whose centre falls under a bar is covered and goes silent. Six survivor slots, one per bar, are fixed by row and column so their centres sit inside their bars at frame one; survivors are drawn in bone white on the black, clipped to the bar rects, so a word half out of a bar stays red ink on paper at its free end, and a survivor returns to red ink once its bar drifts away. Each row band feeds one of six WebAudio voices, an abstract sung model of two soft sawtooths a fifth apart through a formant bandpass with slow vibrato, and a voice gains in proportion to the share of its words still uncovered. Audio is built lazily inside the first user gesture and never autoplays. Motion is slow by construction, flicker stays well under 14 Hz, and prefers-reduced-motion renders a still frame. The composition is full-bleed on phones and a centred square on desktop, with the title and formula date drawn on a plate on the canvas.

## Palette

Paper white #F7F3E8, paper shade #EFE8D6, red ink #B3271E, dark red ink #8F1F16, light red ink #C23A2A, redaction black #141210, bone white #F2EAD8, plate #FBFAF7, title ink #2E2C29, hint ink #5C5954.

## Interaction

Drag across the page to draw your own redaction bar: words you cover go silent, words you spare keep singing, and up to ten of your bars persist, the oldest fading away as new ones arrive. A Sound plate at bottom right toggles the audio. There is no click-to-reload anywhere.

## Deviations from the prompt

The reference study file studies/carla-kihlstedt.md does not exist in the repo (404), so the hexes above were hand-picked from the prompt's named colors: paper white, red ink, redaction black, and bone white. The surviving words are six fixed slots, one per glacier bar, rather than an emergent final refrain, so the survivors are present and legible from frame one. User-drawn bars are capped at ten, with the oldest removed, to keep the page readable. The voices are an abstract sung-text model with no recorded speech and no intelligible lyrics beyond the single repeated word AMENDMENT, per the brief. No other words or sentences appear anywhere in the piece.

A broadsheet of AMENDMENT in red ink, eaten by slow black bars while a few bright survivors keep singing: drag to redact a word silent.
