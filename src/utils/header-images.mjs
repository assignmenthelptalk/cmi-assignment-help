import path from 'node:path';

const HEADER_BASE = '/cmi-headers/rendered';
const IMAGE_WIDTH = 960;
const IMAGE_HEIGHT = 480;

export function slugToHeaderImageName(slug) {
  const clean = String(slug || '/').trim();
  if (!clean || clean === '/') return null;
  const trimmed = clean.replace(/^\/+|\/+$/g, '');
  if (!trimmed) return null;
  return `cmi-${trimmed.replace(/\//g, '-')}-header.png`;
}

export function getHeaderImageMeta(slug, title) {
  const imageName = slugToHeaderImageName(slug);
  if (!imageName) return null;
  const alt = title ? `${title} header image` : 'CMI Assignment Support header image';
  return {
    src: `${HEADER_BASE}/${imageName}`,
    alt,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  };
}

export function getHeaderImageMetaFromContentPath(filePath, title) {
  if (!filePath) return null;
  const normalized = String(filePath).replace(/\\/g, '/');
  const marker = '/src/content/pages/';
  const idx = normalized.lastIndexOf(marker);
  if (idx === -1) return null;
  const rel = normalized.slice(idx + marker.length);
  const parsed = path.posix.parse(rel);
  if (parsed.name === 'homepage') return null;
  return getHeaderImageMeta(`/${parsed.name}/`, title);
}
