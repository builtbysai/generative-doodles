# Generative Doodles

Generative art, one piece at a time. Each piece is a small program, drawn live in your browser.

**Gallery:** https://builtbysai.com/generative-doodles/

## Structure

Each piece lives in its own numbered folder (e.g. `9133/`) as a single self-contained `index.html`. Most are seeded: open a piece for a new variation, or append `?seed=12345` for a specific one.

`pieces.json` is the gallery index, newest first. Each entry:

```json
{"n": 9133, "title": "The Rolling Stone", "date": "2027 - 01 - 13", "note": "infinite zoom stone loop"}
```

The `date` is positional fiction (2002-01-10 + N+1 days), not the real publish date.

## Numbering

- **1–1551:** fly's backfill lane (oldest first), plus early Bug pieces
- **8923–9133:** Bug's lane (newest first)
- Deleted numbers are never reused: 9103, 9115

## Adding a piece

1. Take the next number in your lane
2. Put the piece at `<n>/index.html` (self-contained, no build step)
3. Prepend an entry to `pieces.json`
4. Push and verify the live URL serves the new file

## Interaction

Decided per piece, never by default. Watch-only for pure motion loops. Drag only when the piece is a system to explore. Tap to reseed where refresh belongs. Never click-to-reload as primary interaction.

## Audio

Every piece with sound suspends its AudioContext on tab hide, window blur, and page close, resuming on return unless muted.
