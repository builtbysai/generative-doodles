# Two Banks of Reverb, №1762

Felt driver: the quiet patience of standing by still water at dusk while a
single dropped stone keeps answering itself, twice over, in two different
voices. One answer is quick and bright and gone; the other is slow, warm,
and stays. The piece is about that difference, not about the stone.

Spec: TASKS.md prompt PP1009, study #231 simon-scott (SS3), verbatim.
Study reference: studies/simon-scott.md, mechanism 4 (organic/processed
balance), his "two banks of reverbs" presentation mode with liveliness and
length controls; f04; Caught by the River.

Mechanism: a warm white event point pinned at the center emits a pulse
every 4 seconds. Each pulse spawns two ring sets, drawn with additive
('lighter') blending at low alpha so overlaps bloom into soft white. The
fast bank is three cool teal rings that expand to full radius in 2.5
seconds and fade within about 6 seconds. The slow bank is three deep amber
rings that expand over 10 seconds and linger for about 16 seconds. The two
banks are never synced: different expansion rates, different decay
constants, different echo spacing. Below the square, two sliders
(liveliness, length) drift on their own slow-noise curves and modulate the
decay length of the fast and slow banks respectively.

Palette: dark fen-water ground #0E1B17; source warm white #F5EFE2; fast
bank cool teal #5BC8B8; slow bank deep amber #D99A3A; overlaps bloom to
soft white through additive blending.

Periods: pulses every 4 s; fast bank life about 6 s; slow bank life about
16 s; slider drift periods of roughly 60 to 200 s.

Frame-one phase: fixed t = 60.0 s. Pulses at 44, 48, 52, 56 and 60 s, so
the frame shows three lingering amber rings from the slow bank and fresh
teal rings from the newest pulses, with the source flaring at the moment
of the newest pulse. No Date, no unseeded random; all motion is a pure
function of t.

Deviations from the prompt: none in the visual or motion design. The
sliders sit in the margin below the square rather than inside the frame,
so they never cover a ring. The source halo is drawn as two soft
concentric glows, an abstract event point with no instrument or
microphone reading.

Gallery date: 2006 · 11 · 08. Interaction: Watch only.
