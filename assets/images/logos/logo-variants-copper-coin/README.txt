Copper Coin logo - PNG / WebP variants
=======================================

Generated from logo-original-copper-coin.svg (Inkscape vector source).
The SVG itself ships with the press kit zip alongside the rasters.

Variants
--------
- copper_transparent/  copper mark (#ECD3B2) on transparent background  - default brand color
- white_transparent/   white mark on transparent background              - for use on dark surfaces
- black_transparent/   black mark on transparent background              - for use on light surfaces

Sizes (RGBA, transparent bg, trimmed – aspect ratio ~0.966:1)
-------------------------------------------------------------
64, 128, 256, 512, 1024, 2048 px wide (height slightly taller)

Each size is generated as both .png and .webp.

Filename pattern
----------------
logo-<variant>-<size>.<png|webp>
  e.g. logo-copper_transparent-512.png
       logo-copper_transparent-512.webp

Regeneration
------------
From the repo root, run:
  python serenity-sketch-presskit/scripts/generate-logo-variants.py

The script uses cairosvg (preferred) or Inkscape on PATH (or pass
--inkscape <full path>). Transparent padding is automatically trimmed
before final resize. It rewrites every raster in this folder; do not
hand-edit them.

Source of truth
---------------
The single fill color in the SVG is #ECD3B2. White and black variants
are produced by string-replacing that hex into a temp SVG before render.
