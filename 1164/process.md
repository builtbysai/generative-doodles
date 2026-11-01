# №1164 — Sneakers Decryptor

Nick Briz study block NB5, after *Sneakrypt* (2021) — the functioning
terminal encryptor in 1992-movie hacker chrome: "there's usually no
technical reason why these tools can't look this cool in real life."
This piece takes that literally. It is not a picture of a tool; it is
the tool, drawn on one canvas in phosphor monospace.

## What it does

- **ENCRYPT mode:** type plaintext (tap the input box to focus; a block
  cursor marks the spot) and the cipher blocks update live, the output
  staggering in character by character at 30 ms per character after each
  edit, the way a movie terminal thinks.
- **DECRYPT mode:** tap the mode switch, enter hex (the current cipher
  is carried over), and the recovered plaintext appears. Bad hex is
  flagged in alert red: `!! INVALID HEX — CHECK INPUT`.
- **SIGNAL slider:** drag to set the key length, 8–32. Releasing the
  slider re-rolls the key at the new length; tapping the key matrix
  re-rolls the key at the current length.
- **Key matrix:** the bottom strip shows the actual key — one cell per
  key byte, the cell filled `#1E3A1E` and stamped with ░▒▓█ by the
  byte's quartile, brightness by its remainder. The key is also printed
  as hex above the matrix, because a tool should let you write it down.
- **Chrome:** glyph-strip banner (`░▒▓█` pattern, seeded), the amber
  warning `NO NETWORK. NO ACCOUNTS. YOUR TEXT NEVER LEAVES THIS PAGE.`,
  scanlines every third pixel row, and a soft CRT flicker that steps
  between 0.97 and 1.00 brightness on a seeded table — never a strobe.
  No rounded corners anywhere.

## The cipher (real, and it round-trips)

WebCrypto's AES-GCM is the prompt's first choice, but it is async and
absent from the house QA renderer, so the piece ships the prompt's
documented fallback: a keystream XOR.

- Key: `generateKey(len, gen)` — mulberry32 seeded by the FNV-1a hash
  of `'SNK1:<len>:<gen>'`, drawing `len` characters from a
  no-lookalikes charset.
- Keystream: a fresh mulberry32 seeded by the FNV-1a hash of the key
  string, one byte per character, restarted at position 0 for every
  message — so encrypt and decrypt walk the identical stream.
- Cipher byte = plaintext byte XOR keystream byte, printed as two
  uppercase hex digits, grouped in blocks of 8 bytes.

### Round-trip verification (node, cipher core extracted verbatim from index.html)

Default state (key length 16, generation 0):

- key: `"kWbWeew3pE%?KdE5"` (hex `6B576257656577337045253F4B644535`)
- plaintext: `"meet at the marina at midnight"`
- cipher hex: `7E7C4297151AD76FF45E637194F2078050822574FD858ADD0ED26BDA7A41`
- decrypted: `"meet at the marina at midnight"` — **equal: true**

Also verified: round-trips pass at key lengths 8, 24, and 32
(generation 3); decrypting with the wrong key (generation 1) does not
recover the plaintext; re-encryption is deterministic. The cipher core
sits between `==CIPHER CORE START==` / `==CIPHER CORE END==` markers in
the source so the test exercises the shipped code, not a copy.
Characters are handled in the Latin-1 byte range (`charCodeAt & 0xff`);
the demo text is plain ASCII.

## Determinism and house rules

- First frame is drawn synchronously at fixed phase T0 = 2.35 s: the
  full demo state — banner, warning, the demo plaintext in the input
  box, its four cipher blocks, the slider at KEY LEN 16, the key hex
  and the 16-cell key matrix. The rAF loop is `typeof`-guarded and
  anchored as T0 + elapsed since load. All randomness is seeded
  mulberry32; interaction state (mode, input, key, edit time) is
  recorded state, and the stagger reveal is a closed-form function of
  (now − last edit time).
- Canvas size comes from the Visual Viewport API with resize listeners
  on both `visualViewport` and `window`; `canvas.style.width/height`
  are pinned in px on every draw. Phone detection via `window.screen`
  physical size (min dimension < 700 px) with the `h > w·1.15` aspect
  fallback; on phones the terminal narrows its columns and the fixed
  lines (warning, key hex, footer) shrink-to-fit rather than overflow.
- Silent by design. No gradients, no `ctx.filter`, no shadowBlur, no
  offscreen canvas, no ImageData, no microphone — and no network calls
  of any kind; the warning line is a verifiable property of the file,
  not a promise.
- QA: `thumb.png` rendered twice at 720×720 and byte-compared (`cmp`
  identical); desktop (1280×800) and mobile (390×844) renders read by
  eye — banner, amber warning, demo plaintext with its outline block
  cursor, the four cipher blocks matching the node-verified hex, the
  SIGNAL slider, and the glyph key matrix all present and legible.
