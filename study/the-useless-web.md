# The Useless Web : Tim Holman (2012)

**Site:** https://theuselessweb.com/
**Author:** Tim Holman, built in 2012 while locked inside during a
hurricane. Archive of the linked sites at github.com/tholman/useless-web-archive.
**Status:** 2026-09-25, technique-solid. The live site timed out from this
session's network, so the current build was not pixel-inspected. Structure
and curation documented from the author's own archive repo and a decade of
writeups (Gizmodo, MakeUseOf, PCWorld's 2026 revisit). Note: it links to
Staggering Beauty, so this study and that one are now cross-referenced.

## What it is

A portal to the strange side of the internet. The page says "take me to a
useless website" with one pink button that says PLEASE and two arrows
pointing at it. Click PLEASE and you land on a random curated pointless
site: cat-bounce, infinite drunk Ron Swanson, a race to check 100 boxes, a
kitten trapped in a spinning doughnut, one-square Minesweeper. After the
first click the copy changes to "take me to another useless website."
Holman calls it existing "because some websites, we just couldn't do
without."

## The technique

The site itself is a one-button router: an array of URLs, a uniform random
pick, window.location. That is the entire program, and the archive repo
shows the real work was never code, it was curation and maintenance. The
repo includes image-resizing notes and the author spent years tracking down
the stories behind the linked sites, because a link farm of dead domains is
worthless and a maintained one is a museum. PCWorld's 2026 revisit confirms
the site still works and still functions as a small archive of web
weirdness, which is a curation achievement more than a technical one.

The design details that carry it: the PLEASE button is oversized and pink
against a plain page, the arrows sell the single action, and the copy shift
from "a" to "another" after the first click is the whole onboarding. No
explanation of what qualifies as useless, which keeps the destinations
surprising.

## What makes it sing

It is StumbleUpon with a point of view. A random button is a commodity;
a random button with an editor's taste is a publication. Holman's taste is
the product: every destination is pointless in a different direction,
some interactive, some just a looping image, some a one-line joke. The
variety of pointlessness is what keeps the fifth click interesting, and
the archive work is what keeps it alive a decade later. The site is also
honest about what it is, which is rarer than it sounds.

## Avoid-list

Random-destination buttons decay into two failure modes: dead links, or a
list so long the taste averages out to nothing. Both are curation failures,
not code failures. And "useless" as a brand is easy to imitate and hard to
sustain: the joke only works if every destination is genuinely,
confidently pointless rather than half-baked.

## Seeds

78. **Curated Rabbit Hole** : a PLEASE-style button, but the destinations
    are generated, not linked: each press seeds a tiny one-screen toy from
    a small grammar (a bouncer, a spinner, a counter, a wobbler) with the
    day's palette, so the rabbit hole is infinite and never rots. Success:
    the twentieth press still surprises, and nothing ever 404s.
79. **Please Archive** : the portal inverted: instead of sending you out,
    each press pulls one dead classic of the useless web in from the
    archive and re-hosts it as a faithful miniature inside the page, with a
    small plaque naming the original and its year. A museum with a PLEASE
    button for a door. Success: three recognizable classics are inside,
    each labeled, and the frame never touches their look.
