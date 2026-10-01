/**
 * Rehype plugin that inserts an "In this article" table of contents
 * directly after the header image, listing every H2 as an anchor link.
 * Pages with fewer than MIN_HEADINGS H2s are left untouched.
 */
import { h } from 'hastscript';

const MIN_HEADINGS = 3;

function getTextContent(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (node.children) return node.children.map(getTextContent).join('');
  return '';
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s/g, '-');
}

function uniqueId(base, used) {
  let id = base || 'section';
  for (let n = 1; used.has(id); n++) id = `${base}-${n}`;
  used.add(id);
  return id;
}

/** Collect H2 headings, assigning an id to any that lack one. */
function collectHeadings(tree) {
  const used = new Set();
  const headings = [];
  for (const node of tree.children) {
    if (node.type !== 'element' || node.tagName !== 'h2') continue;
    const text = getTextContent(node).trim();
    if (!text) continue;
    node.properties = node.properties || {};
    node.properties.id = uniqueId(node.properties.id || slugify(text), used);
    headings.push({ id: node.properties.id, text });
  }
  return headings;
}

function buildToc(headings) {
  return h('nav', { class: 'toc', 'aria-labelledby': 'toc-title' }, [
    h('p', { class: 'toc__title', id: 'toc-title' }, 'In this article'),
    h(
      'ol',
      headings.map(({ id, text }) => h('li', [h('a', { href: `#${id}` }, text)]))
    ),
  ]);
}

/** Position just after the header image figure, or before the first H2. */
function findInsertIndex(tree) {
  // The header image is inline HTML in the markdown, so it may still be a raw node here.
  const figureIdx = tree.children.findIndex(
    (n) =>
      (n.type === 'element' && n.tagName === 'figure') ||
      (n.type === 'raw' && /^\s*<figure/i.test(n.value || ''))
  );
  if (figureIdx !== -1) return figureIdx + 1;
  return tree.children.findIndex((n) => n.type === 'element' && n.tagName === 'h2');
}

export default function rehypeToc() {
  return function (tree) {
    const headings = collectHeadings(tree);
    if (headings.length < MIN_HEADINGS) return;

    const insertAt = findInsertIndex(tree);
    if (insertAt === -1) return;

    tree.children.splice(insertAt, 0, buildToc(headings));
  };
}
