# The Bridge Gong (No. 1767)

The felt driver is a found instrument left out in the weather: a rusted bridge over an empty fen that is struck, rarely, by an unseen soft mallet, and answers each strike with a slow warm ring that travels its length and rings back, so the bridge holds the overlapping decays like a held chord.

## Spec

TASKS.md prompt block PP1014, study #231 simon-scott (SS8), mechanism 6: the bridge as gong; water bottle striking the Long Drove bridge "like a gong", played with soft mallets, Holme Fen Posts loops; f18; Room40.

## Mechanism

A long truss bridge spans the frame diagonally, lower left to upper right: a dark steel deck, a rust top chord, fifteen vertical steel members with alternating rust diagonals, and two short pier stubs sinking into the mist. The fen is flat and empty below a thin horizon line, with six faint Holme Fen posts standing at the horizon and three slow mist bands drifting across it. Strikes are ring waves: each strike blooms at one truss member as an ellipse centered on the deck that expands along the bridge axis at 0.028 field units per second, drawn warm gold and ageing toward deep amber over a 20 second decay, with a second thinner gold pass on the same ring. A delayed return ring in pale gold answers 4 seconds later at 0.026 field units per second, the ring back. Rings overlap additively in time: a new strike fires while the last ring is still fading, so the bridge holds several decays at once. Self-strikes fall on a sparse irregular schedule, 8 to 14 seconds apart, drawn from a seeded RNG. Dragging on the bridge strikes it at the nearest truss member: the pointer position is projected onto the bridge axis, clamped to the span, and snapped to the nearest of the fifteen members. A drag strike also sounds a soft sine note through lazy WebAudio, pitched 98 to 196 Hz by member position with a 4 second decay; the note is created only inside the first gesture, never on load, and the piece is fully visual if audio is unavailable.

## Palette

Mist pale grey ground, fen a shade deeper, horizon grey, bridge in rust orange and dark steel, strike blooms in warm gold fading to deep amber, return rings in pale gold, plates dark steel with a gold rule.

## Periods

Self-strike interval 8 to 14 seconds, mean about 11. Ring travel 0.028 field units per second, decay 20 seconds, so a ring crosses most of the bridge before it fades. Return ring delay 4 seconds, speed 0.026. Mist bands drift on a 0.02 radian per second sine. No flicker: nothing oscillates faster than the strike schedule.

## Frame one

Fixed phase t = 60 seconds. The simulation is pre-run from t = 0 to t = 60 in fixed 1/30 second steps with seeded RNG only, so frame one holds two rings mid-decay: one aged 16.8 seconds, nearly spent, and one aged 7.3 seconds, bright gold around the upper bridge. First frame rendered identically at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected. Desktop uses a centered square field; phones use the full bleed with the bridge still spanning diagonally. Title plate sits top left, clear of the bridge; hint plate sits bottom left.

## Interaction

Drag to strike: touching the bridge strikes it at the nearest truss member, at most one drag strike per 0.6 seconds and the same member at most once per 2 seconds, so strikes stay rare even while dragging. Otherwise the bridge strikes itself on the sparse seeded schedule.

## Deviations from the prompt

Two judgment calls. The rings are drawn with normal compositing, not additive blending: on the pale mist ground additive gold washed to near white and the prompt's warm gold to deep amber reading was lost, while normal blending keeps the gold warm and the overlap still brightens where rings cross. The piers are short stubs that fade into the mist instead of full-height supports, after full-length piers read as bars across the empty fen. The soft sine note on drag is an addition: the prompt calls each strike a played note on a found instrument, so the gesture sounds the member it strikes; it is lazy, guarded, and never autoplays.

## Gallery note

A rusted steel bridge crosses a flat misty fen at dawn; at irregular intervals a soft mallet strikes it, and the strike blooms as a slow expanding ring of warm color that travels the length of the bridge and rings back. Drag to strike.

## Plates

Title: The Bridge Gong. Date: 2006 · 11 · 13. Hint: Drag to strike.
