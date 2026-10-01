import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import rehypeCmiTransforms from './src/rehype-cmi-transforms.mjs';
import rehypeToc from './src/rehype-toc.mjs';

/**
 * Astro's content cache does not notice edits to a rehype plugin's source, so a stale
 * cached render can survive a deploy. Passing a hash of the source as a plugin option
 * changes the config digest whenever the plugin changes, which invalidates the cache.
 */
const sourceHash = (file) =>
  createHash('sha1').update(readFileSync(new URL(file, import.meta.url))).digest('hex').slice(0, 12);

const testPlugin = () => (tree) => {
  // Mark tree to confirm plugin ran
  if (!tree.data) tree.data = {};
  tree.data.cmiPluginRan = true;
};

export default defineConfig({
  site: 'https://www.cmiassignmentsupport.co.uk',
  integrations: [tailwind(), sitemap()],
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    rehypePlugins: [
      [rehypeCmiTransforms, { sourceHash: sourceHash('./src/rehype-cmi-transforms.mjs') }],
      [rehypeToc, { sourceHash: sourceHash('./src/rehype-toc.mjs') }],
    ],
  },
});
