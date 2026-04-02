import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import rehypeCmiTransforms from './src/rehype-cmi-transforms.mjs';

const testPlugin = () => (tree) => {
  // Mark tree to confirm plugin ran
  if (!tree.data) tree.data = {};
  tree.data.cmiPluginRan = true;
};

export default defineConfig({
  site: 'https://cmiassignmentsupport.co.uk',
  integrations: [tailwind(), sitemap()],
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    rehypePlugins: [rehypeCmiTransforms],
  },
});
