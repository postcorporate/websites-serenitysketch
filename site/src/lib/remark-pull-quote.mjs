/**
 * Places `pullQuote` frontmatter as a floated box immediately before the
 * top-level block that contains that excerpt. The string must be a verbatim
 * copy of article text (plain text, no markdown markers).
 */
export function remarkPullQuote() {
  return (tree, file) => {
    const frontmatter = file.data.astro?.frontmatter;
    const quote = typeof frontmatter?.pullQuote === 'string' ? frontmatter.pullQuote.trim() : '';
    if (!quote) return;

    const attr = typeof frontmatter?.pullQuoteAttr === 'string' ? frontmatter.pullQuoteAttr.trim() : '';
    const needle = normalize(quote);
    const match = findTopLevelBlock(tree, needle);

    if (!match) {
      const where = file.path || file.history?.[0] || 'this post';
      throw new Error(
        `pullQuote was not found in ${where}. Copy an exact excerpt from the article, with no markdown markers.`,
      );
    }

    const cite = attr ? `<cite>${escapeHtml(attr)}</cite>` : '';
    match.parent.children.splice(
      match.index,
      0,
      {
        type: 'html',
        value: `<aside class="pull-quote" aria-hidden="true"><p>${escapeHtml(quote)}</p>${cite}</aside>`,
      },
    );
  };
}

function findTopLevelBlock(tree, needle) {
  let match = null;

  function walk(node, ancestors) {
    if (match) return;
    if (isTextBlock(node) && normalize(collectText(node)).includes(needle)) {
      const chain = [...ancestors, node];
      const topLevel = chain[1];
      if (!topLevel || chain[0]?.type !== 'root') return;
      match = {
        parent: chain[0],
        index: chain[0].children.indexOf(topLevel),
      };
      return;
    }
    if (!Array.isArray(node.children)) return;
    for (const child of node.children) walk(child, [...ancestors, node]);
  }

  walk(tree, []);
  return match?.index >= 0 ? match : null;
}

function isTextBlock(node) {
  return node.type === 'paragraph' || node.type === 'heading';
}

function collectText(node) {
  if (!node) return '';
  if (node.type === 'text' || node.type === 'inlineCode') return node.value ?? '';
  if (!Array.isArray(node.children)) return '';
  return node.children.map(collectText).join('');
}

function normalize(value) {
  return value
    .replace(/[\u2018\u2019\u201A\u2032]/g, "'")
    .replace(/[\u201C\u201D\u201E\u2033]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
