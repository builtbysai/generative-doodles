# №8923 · Night Water

Still water at night. Soft blue-teal motes drift and breathe in the dark,
a few wearing faint rings like plankton seen from below.

Born from the Rooms gallery mockup: Hans saw the room visual and said it
looked like a piece. This is that visual, distilled, with no text on top.

- 85–125 motes per tide, seeded (mulberry32, default 8923)
- Hue 186–212 (blue-teal), muted saturation, soft radial glow + core
- 16% of motes carry a faint concentric ring
- Each mote breathes (size/alpha oscillation, own phase and rate) and
  drifts on a slow random walk with wraparound
- Pointer position adds subtle depth parallax
- Click/tap mints a new tide (new seed)
- requestAnimationFrame; DPR capped at 2; canvas pinned via style size
- Phone: window.screen detection with aspect fallback, full-bleed field

Palette: near-black #0a0a0d ground, blue-teal motes, nothing else.

## Interaction (rebuilt 2026-10-13)

Touch is now the instrument, not a reset button:

- **Bioluminescent wake.** Motes ignite where fingers pass: hue shifts
  toward cyan (166), lightness and saturation climb, the mote swells as if
  swimming closer. Charge decays over ~3 seconds, so touches leave fading
  trails of light.
- **Pressure ripples.** Every touchdown fires two expanding rings; fast
  drags shed smaller ones. Rings shove motes radially as they pass and
  ignite them, and are drawn as faint luminous circles.
- **Eddies.** Finger velocity adds a perpendicular swirl component, so fast
  drags curl the drift into visible eddies while slow touches only part
  the water gently.
- **Light painting.** The frame uses a fade fill instead of a hard clear,
  so excited motes paint short luminous trails; calm motes smear
  invisibly.
- **Multi-touch.** Each finger is its own current (pointer-ID tracked).
- Tap no longer reseeds; double-tap mints a new tide.
