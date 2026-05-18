#!/usr/bin/env bash
# Build the static site folder for GitHub Pages (or manual copy to the public repo).
# Source trees under assets/downloads/ stay in git for zipping; only *.zip is published.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${1:-$ROOT/site}"

rm -rf "$OUT"
mkdir -p "$OUT"

cp "$ROOT/index.html" "$OUT/"
cp -r "$ROOT/styles" "$OUT/"
cp -r "$ROOT/assets" "$OUT/"

if [[ -d "$OUT/assets/downloads" ]]; then
  find "$OUT/assets/downloads" -mindepth 1 -maxdepth 1 ! -name '*.zip' -exec rm -rf {} +
fi

if [[ -f "$ROOT/CNAME" ]]; then
  cp "$ROOT/CNAME" "$OUT/"
fi

touch "$OUT/.nojekyll"

echo "Assembled site at $OUT"
