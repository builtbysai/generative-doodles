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
