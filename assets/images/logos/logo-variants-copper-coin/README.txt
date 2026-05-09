Copper Coin logo - PNG variants
================================

Generated from logo-original-copper-coin.svg (Inkscape vector source).
The SVG itself ships with the press kit zip alongside the PNGs.

Variants
--------
- copper_transparent/  copper mark (#ECD3B2) on transparent background  - default brand color
- white_transparent/   white mark on transparent background              - for use on dark surfaces
- black_transparent/   black mark on transparent background              - for use on light surfaces

Sizes (square, RGBA, transparent bg)
------------------------------------
64, 128, 256, 512, 1024, 2048 px

Filename pattern
----------------
logo-<variant>-<size>.png
  e.g. logo-copper_transparent-512.png

Regeneration
------------
From the repo root, run:
  python serenity-sketch-presskit/scripts/generate-logo-variants.py

The script requires Inkscape on PATH (or pass --inkscape <full path>).
It rewrites every PNG in this folder; do not hand-edit them.

Source of truth
---------------
The single fill color in the SVG is #ECD3B2. White and black variants
are produced by string-replacing that hex into a temp SVG before render.
