# №1925 Facades

Prompt block: LK6 / PP1172, study #251 lauren-kinsella.

Driver, in one sentence: four women seated in a semicircle in a stone church read from glowing tablets, and their four parts rise as ribbon staves in muted rose, sage, ochre and slate that braid together above a single unlit candle, written crispness dissolving into improvised looseness and being re-notated as the braid turns.

## Palette

The study file studies/lauren-kinsella.md does not exist in the repo, so hex values are hand-picked from the prompt's named colors: dark church stone #232120, stone grey #4a4642 with lighter stone #6b655e, candle-wax cream #efe6d0 with dim cream #c9bfa9, tablet glow cool blue #8fb4d6 on a dark blue screen #1d2f42, and the four staves in muted rose #b98a8f, sage #8a9a7b, ochre #c19a4b and slate #6b7d8c.

## Mechanism

- Four voice agents, one per figure, reading a shared score. Each stave rises from its own tablet, drifts toward the center, then braids: x follows a slow sine in y with a per-voice phase offset of a quarter turn, so the four staves cross pairwise as they rise. The braid advances at 0.11 rad/s, about one crossing every 20 s.
- Written or improvised flag: a slow sine along each stave, offset per voice and drifting with t, so written crispness dissolves into improvised looseness and is re-notated further up. Written stretches are drawn as straight crisp segments with small note heads and stems; improvised stretches get an extra loose wiggle, are drawn as hand-drawn quadratic curves, and carry loose curls instead of notation.
- Figures: abstract seated silhouettes in a semicircle, outer figures slightly higher and further back, inner figures lower and nearer. Plain round heads with no faces, a cream veil arc, a stole in the figure's stave color, and arms reaching to the tablet. No faces are rendered in detail.
- Tablets: small dark blue rectangles tilted toward the circle's center, with a cool blue glow halo and three glowing notation lines on the screen.
- The candle sits at the exact center of the lower edge: a cream wax body on a small dish with a short dark wick, unlit, with no flame and no glow. The room is otherwise still: only the staves move.
- Interaction: watch only. No interaction, no click-to-reload.
- Audio: visual only, no WebAudio. A watch-only piece cannot autoplay sound, and the prompt asks for the braid as the only movement, not a soundtrack.

## Determinism

- FIRST_T = 30. At t = 30 the four ribbons are mid-braid above the semicircle: rose and ochre cross near the top of the arch in crisp written runs, sage and slate loosen into improvised curves below them.
- Seeded PRNG mulberry32(1925), one fresh instance per draw, so every frame is a pure function of t.
- All motion runs under 1 Hz, well under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually.
- Determinism: a second 720x720 render is byte-identical to thumb.png (md5 96f87acb9bb01ac6b0fc384fc6197804).
- Desktop: braid legible with all four colors crossing, title plate clear of the braid, candle visibly unlit at the exact center of the lower edge, hint clear below the candle dish. Mobile: figures distinct, tablets readable, braid legible, no clipped text. Thumb: braid, figures, candle and plates all read at 720x720.

## Fix rounds

1. First render: the heads floated above the robes with a visible gap, the staves crossed in front of the figures' faces, and the tablet glow halo read as a pale box. Lowered the heads onto the robes, added a neck, widened the robe shoulders, drew the staves before the figures so they rise from behind the tablets and pass behind the heads, and cut the halo to alpha 0.12. Also added a faint stone circle and floor seams so the still lower room does not read as empty black. Clean on all three sizes after this round.

## Deviations from the prompt

- None of substance. The candle is placed at the exact center of the lower edge with its dish ending 36 px above the bottom edge, so the hint line sits below it without collision; the candle body itself sits on the lower edge of the composition.
- The stone circle on the floor and the faint arch and block seams are original set dressing for the still room; the prompt names the stone church but does not draw it.

## Known warts

- The four stave tops end at the same height but at different x positions, so the top of the braid reads slightly fan-like rather than tied off.
- On phones the tall full-bleed canvas leaves a large still floor band between the figures and the candle; the faint stone circle and seams fill it only lightly, which suits the still room but reads sparse at a glance.
- The note heads on written stretches are small at thumb size and read as dots rather than notes.
