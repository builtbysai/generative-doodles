# №1133 — Body Mnemonics

Jussi Ängeslevä study block JA6 (2003): body space as interface.

## The piece

Ten glowing information-orbs drift in a loose constellation at the center of a
dark field (#080A0D). Five invisible body zones — head (top), left hand, right
hand, chest (center-low), feet (bottom) — are marked only by faint white rings
(#E8EDF5 at low alpha) around dim anchor dots (#2A3340), arranged like an
implied standing figure. No anatomy, no labels, no text: the layout is the
interface.

Orb colors come from four families, extended with tints to ten: cyan #35E0FF,
amber #FFB84D, magenta #E04DFF, green #4DFF88, plus light/deep variants
(#8AEBFF, #FFD08A, #F08AFF, #8AFFB0, #1FA8CC, #E08E1F). Each orb is drawn as
layered flat-alpha circles — wide halo, mid glow, body, bright core — with no
gradients, filters, or shadow blur.

## Motion and interaction

- Free orbs drift on closed-form paths: each axis is the sum of two seeded
  sines around the orb's drift center, a gentle Brownian-ish wander.
- Drag an orb: it follows the pointer and grows slightly. Released inside a
  zone ring, it docks with an underdamped spring-ease flight, a soft expanding
  pulse ring fires at the zone, and the zone is remembered. Orbs sharing a zone
  fan out around the ring center on a golden-angle spread.
- Drag a docked orb out and release it in open space and it is freed — it
  drifts around the release point — but the memory stays.
- Double-tap (or double-click) recalls every orb: remembered orbs fly back to
  their zones, the rest return to their constellation homes.
- Frame one is drawn synchronously at a fixed phase (t = 37 s into the drift),
  with two orbs pre-docked — cyan at the head, light cyan at the left hand —
  their dock pulses just fired and still expanding.

All interaction state is recorded events (drags, docks, recalls, pulses);
positions are always closed-form functions of those events and elapsed time,
never integrated frame by frame. Silent by design.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas CSS size pinned in draw().
- Phone detection via window.screen physical size (min dimension < 700 px),
  aspect fallback (h > w * 1.15); orbs get a larger radius on phones.
- Determinism: seeded mulberry32 only, no Math.random; requestAnimationFrame
  guarded by a typeof check and anchored to the fixed phase; the QA thumb
  re-rendered byte-identical.
