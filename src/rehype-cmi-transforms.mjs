/**
 * Rehype plugin to transform CMI content patterns:
 * 1. HTML comment blocks → InfographicPlaceholder divs
 * 2. <strong> with "WhatsApp" text → CTA box wrapper
 * 3. <strong> matching "Step N —" → step block wrapper
 */
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';
import { getHeaderImageMetaFromContentPath } from './utils/header-images.mjs';

const WHATSAPP_URL = 'https://wa.me/447916696894?text=Hi%2C%20I%20need%20help%20with%20my%20CMI%20assignment.%20Can%20I%20get%20a%20free%20quote%3F';

function isCommentNode(node) {
  return node.type === 'raw' && node.value && node.value.trim().startsWith('<!--');
}

function extractCommentText(raw) {
  return raw.replace(/<!--\s*/, '').replace(/\s*-->/, '').trim();
}

function isInfographicLabel(text) {
  return /^(TRUST BADGE|LEVEL SELECTOR|PROCESS INFOGRAPHIC|PROCESS TIMELINE|LEVEL COMPARISON|CMI COMMAND VERB|CMI MANAGEMENT REPORT|GIBBS REFLECTIVE|UNIT INFO BADGE|LEADERSHIP THEORIES|MENDELOW|STAKEHOLDER COMMUNICATION|STRATEGIC LEADERSHIP MODELS|CRITICALLY ANALYSE VS|CMI LEVEL 5 VS|STUDENT PROFILE|PORTER'S FIVE FORCES|ANSOFF MATRIX|KOTTER'S 8-STEP|CHANGE MANAGEMENT FRAMEWORKS|NHS BAND TO CMI LEVEL|CMI UNITS RELEVANT TO NHS|9-BOX GRID|HPWS PRACTICE)/i.test(text);
}

/** Map infographic label to public image path, if one exists */
function infographicImageSrc(label) {
  const u = label.toUpperCase();
  if (u.startsWith('TRUST BADGE')) return '/trust-badge.png';
  if (u.startsWith('CMI COMMAND VERB COGNITIVE')) return '/cmi-command-verb-ladder.svg';
  if (u.startsWith('CMI COMMAND VERB') || u.includes('GRADE BAND')) return '/cmi-command-verb-grades.svg';
  if (u.startsWith('CMI MANAGEMENT REPORT')) return '/cmi-management-report-structure.svg';
  if (u.startsWith('GIBBS REFLECTIVE')) return '/cmi-gibbs-reflective-cycle.svg';
  return null;
}


function buildInfographicDiv(label, description, altText) {
  const src = infographicImageSrc(label);
  if (src) {
    return h('figure', { class: 'infographic-figure', style: 'margin:2rem 0;text-align:center' }, [
      h('img', {
        src,
        alt: altText,
        loading: 'lazy',
        style: 'max-width:100%;height:auto;border-radius:8px',
      }),
      altText ? h('figcaption', { style: 'font-size:0.8rem;color:#6b7280;margin-top:0.5rem' }, altText) : null,
    ].filter(Boolean));
  }
  return h('div', { class: 'infographic-placeholder' }, [
    h('div', { class: 'infographic-placeholder__inner', style: 'text-align:center' }, [
      h('span', { class: 'infographic-placeholder__icon', style: 'font-size:2rem;display:block;margin-bottom:0.5rem' }, '📊'),
      h('p', { class: 'infographic-placeholder__label', style: 'font-weight:600;margin-bottom:0.25rem' }, label),
      h('p', { class: 'infographic-placeholder__desc', style: 'color:#6b7280;font-size:0.875rem;margin-bottom:0.25rem' }, description),
      h('p', { class: 'infographic-placeholder__alt', style: 'color:#9ca3af;font-size:0.75rem;font-style:italic' }, `Alt text: ${altText}`),
    ]),
  ]);
}

function buildCtaBox(strongText, followingText) {
  return h('div', { class: 'cta-box' }, [
    h('div', { style: 'flex:1' }, [
      h('p', { style: 'font-weight:600;margin:0 0 0.25rem' }, strongText),
      followingText ? h('p', { style: 'margin:0;color:#374151;font-size:0.95rem' }, followingText) : null,
    ].filter(Boolean)),
    h('a', {
      href: WHATSAPP_URL,
      class: 'whatsapp-inline',
      target: '_blank',
      rel: 'noopener noreferrer',
    }, [
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '18',
        height: '18',
        viewBox: '0 0 24 24',
        fill: 'currentColor',
        style: 'flex-shrink:0',
      }, [
        h('path', { d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' }),
      ]),
      'WhatsApp Us',
    ]),
  ]);
}

function buildStepBlock(stepNum, stepText) {
  return h('div', { class: 'step-block' }, [
    h('div', { class: 'step-number' }, String(stepNum)),
    h('div', { style: 'flex:1' }, [
      h('p', { style: 'margin:0;font-weight:600' }, stepText),
    ]),
  ]);
}

function buildPageHeaderImage(image) {
  return h('figure', { class: 'page-header-image' }, [
    h('img', {
      src: image.src,
      alt: image.alt,
      width: String(image.width),
      height: String(image.height),
      loading: 'eager',
      decoding: 'async',
      fetchpriority: 'high',
    }),
  ]);
}

// Export as a unified plugin (factory function is the correct form)
export default function rehypeCmiTransforms() {
  return function (tree, file) {
    let firstHeadingText = '';

    visit(tree, 'element', (node) => {
      if (!firstHeadingText && node.tagName === 'h1') {
        firstHeadingText = getTextContent(node).trim();
      }
    });

    const headerImage = getHeaderImageMetaFromContentPath(file?.path || file?.history?.[0], firstHeadingText);
    if (headerImage) {
      let inserted = false;
      visit(tree, 'element', (node, index, parent) => {
        if (inserted || !parent || index == null) return;
        if (node.tagName !== 'h1') return;
        parent.children.splice(index + 1, 0, buildPageHeaderImage(headerImage));
        inserted = true;
      });
    }

    // Pass 1: collect consecutive comment nodes for infographic placeholders
    const nodesToReplace = [];

    visit(tree, (node, index, parent) => {
      if (!parent || index == null) return;
      if (!isCommentNode(node)) return;

      // Extract all individual comment blocks from this raw node
      // (consecutive comment lines with no blank lines between them are one raw node)
      const allComments = node.value.match(/<!--[\s\S]*?-->/g) || [];
      if (allComments.length === 0) return;

      const firstText = extractCommentText(allComments[0]);
      if (!isInfographicLabel(firstText)) return;

      const label = firstText;

      // Middle comments (between first and last) are the description
      const middleComments = allComments.slice(1, allComments.length > 2 ? -1 : undefined);
      const description = middleComments
        .map((c) =>
          extractCommentText(c)
            .replace(/^Components?:\s*/i, '')
            .replace(/^Steps?:\s*/i, '')
            .replace(/^Icons?:\s*/i, '')
            .replace(/^Labels?:\s*/i, '')
        )
        .join(' | ');

      // Last comment is the alt text (or second comment if only 2)
      const lastComment = allComments[allComments.length - 1];
      const altText = extractCommentText(lastComment)
        .replace(/^Alt text:\s*/i, '')
        .replace(/^"/, '')
        .replace(/"$/, '');

      nodesToReplace.push({ parent, index, lastIdx: index, label, description, altText });
    });

    // Replace in reverse order to preserve indices
    for (let i = nodesToReplace.length - 1; i >= 0; i--) {
      const { parent, index, lastIdx, label, description, altText } = nodesToReplace[i];
      const count = lastIdx - index + 1;
      const replacement = buildInfographicDiv(label, description, altText);
      parent.children.splice(index, count, replacement);
    }

    // Pass 2: transform <strong> nodes — CTA boxes and step blocks
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || index == null) return;
      if (node.tagName !== 'p') return;

      // Check if this paragraph contains a strong with "WhatsApp"
      const strongChild = node.children?.find(
        (c) => c.type === 'element' && c.tagName === 'strong'
      );
      if (!strongChild) return;

      const strongText = getTextContent(strongChild);

      // CTA box: strong contains "WhatsApp"
      if (strongText.includes('WhatsApp')) {
        // Get following text from same paragraph or next sibling paragraph
        const sameParaText = node.children
          .filter((c) => c !== strongChild)
          .map(getTextContent)
          .join('')
          .trim();

        let followingText = sameParaText;

        // If no text in same para, check next sibling
        if (!followingText && index + 1 < parent.children.length) {
          const nextSibling = parent.children[index + 1];
          if (nextSibling?.type === 'element' && nextSibling.tagName === 'p') {
            const nextText = getTextContent(nextSibling).trim();
            if (nextText && !nextText.startsWith('**')) {
              followingText = nextText;
              parent.children.splice(index + 1, 1);
            }
          }
        }

        const ctaBox = buildCtaBox(strongText, followingText || null);
        parent.children.splice(index, 1, ctaBox);
        return;
      }

      // Step block: strong matches "Step N —"
      const stepMatch = strongText.match(/^Step\s+(\d+)\s+[—–-]/);
      if (stepMatch) {
        const stepNum = parseInt(stepMatch[1], 10);
        const stepBlock = buildStepBlock(stepNum, strongText);
        parent.children.splice(index, 1, stepBlock);
        return;
      }
    });
  };
}

function getTextContent(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (node.children) return node.children.map(getTextContent).join('');
  return '';
}
