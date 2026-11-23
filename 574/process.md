# Waver, No.1741

Seven rows of small ticks march left to right like a ruler, but every tick
lands slightly off its grid line. Each row carries its own low-frequency
wander, so the ruler reads as seven hand-played performances laid over one
another, with the faint grid ghosted behind so the waver stays readable.
Bone white ticks on ink black; the current take is drawn in a slightly
warmer white, and the take it replaces lingers as a fading bone-white
ghost for a moment after the change.

## Mechanism

Each row has its own wander signature: two slow sine waves with seeded
amplitudes and phases, plus a per-tick hash nudge of up to 1.2 px, so no
tick ever snaps exactly to the grid. A take is one full set of seven row
signatures, generated from a seeded PRNG fixed at load, so frame one is
identical every run. A new take begins automatically every 180 seconds
and on every tap, announced by a brief dimming dip over 0.9 seconds,
never a cut. The previous take's ticks fade out as a ghost over 1.5
seconds, so the new waver reads against the one it replaces.

## Interaction

Tap for a new take. The tap reseeds the wander phases and starts a fresh
take with a new waver signature. Never a reload.

## Deviations

None from the prompt. The field is full-bleed on phones and a centered
square on desktop, per the house rules, with the field inset on phones
and on near-square viewports so no tick hides behind the title or hint
plate. Gallery note: "Seven rows of ticks, each row wavering off its grid line. Tap for a new take."
