# Bored Button

**Site:** https://www.boredbutton.com/
**Status:** 2026-09-25, preliminary. The live site timed out from this
session's network, and the brand has since splintered into a mobile game
(9M+ downloads, Gabble Studios/Unite.io, later removed from Google Play in
Aug 2026) and assorted clones, so the original web toy's current state was
not verified. Documented from contemporary descriptions of the site: "Just
press the button. The website has nothing else to tell you."

## What it is

The original site was brutally simple: a page with one big red button.
Press it and you are sent somewhere to kill time, a random game, toy, or
activity, and the button is there again waiting for the next press. The
name is the whole pitch. Later the same name grew into a 100+ minigame
mobile app with Play Pass integration, but the web original was the single
button, nothing else on the page.

## The technique

Almost nothing to recover, which is the point. One button element, one
click handler, a list of destination URLs, and window.location. The design
work is all restraint: a page that refuses to be a page. Any chrome around
the button would break it. Contemporary writeups describe the site as
having "the best design ever" precisely because there was no design, just
the button. Technically the interesting part is curation: the button is
only as good as the list behind it, which makes this a close cousin of The
Useless Web, but with the commitment device of a single red button instead
of a curated portal.

## What makes it sing

It weaponizes the lowest-friction decision a visitor can make. Pressing a
big red button is not a choice, it is a reflex, and the site exists only
to convert that reflex into a destination. There is no menu, no About, no
ads in the original, nothing to dilute the one action. The humor is that a
site named for boredom offers exactly one remedy and no information about
what it is.

## Avoid-list

"Press the button, get a random X" is a saturated format, and the mobile
clone era proved it scales into slop fast: 100 games, none of them good,
ads everywhere. The web original worked because it was one button and a
curated list. Do not ship the button without the curation.

## Seeds

76. **One Lever** : the single-commitment device, but the lever has
    weight: each press costs the visitor something tiny and visible, like
    the button physically sinking deeper into the page, and what comes out
    escalates with depth. Ten presses in and the page is a crater. Success:
    the visitor feels the page remember them, and stopping feels like a
    decision instead of a default.
77. **Wrong Button** : the page shows a big red button and a small gray
    one. The red one does what red buttons do. The gray one, labeled
    nothing, quietly builds a better toy behind your back each time you
    ignore it. Success: the visitor who keeps slamming red gets noise, and
    the one who tries gray once gets the actual piece.
