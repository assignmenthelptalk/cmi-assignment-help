# CMI Assignment Support

Static Astro site for **https://www.cmiassignmentsupport.co.uk**, a UK service offering CMI (Chartered Management Institute) assignment writing and tutoring for Levels 3 to 7. The main call to action is WhatsApp ("Order Now").

- **Stack:** Astro 6 (static output, `trailingSlash: 'always'`), Tailwind 3, `@astrojs/sitemap`
- **Hosting:** Vercel, deployed from `main`
- **Language:** en-GB

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview the build locally |

## Project structure

```text
src/
├── content/pages/        Page copy, one markdown file per page (the content source of truth)
├── content.config.ts     Content collection ("pages", glob loader)
├── pages/                Routes: one .astro file per page, wired to a markdown entry
│   ├── cmi-level-{3..7}/ Unit pages (12 / 11 / 8 / 16 / 6 routes)
│   ├── guides/, faq/     Guide and FAQ pages
│   └── *.astro           Hubs, services, homepage, placeholder pages, and the level-specific
│                         examples guides (cmi-level-3/5/7-assignment-examples)
├── layouts/BaseLayout.astro   Head tags, canonical, schema, header/footer, GA4
├── components/           Header, Footer, WhatsAppButton, Breadcrumb, SchemaOrg, InfographicPlaceholder
├── utils/faq.ts          extractFaqs() and buildFaqSchema() for FAQPage JSON-LD
├── rehype-cmi-transforms.mjs   Markdown transforms (see below)
├── rehype-toc.mjs        "In this article" table of contents
└── styles/global.css     Tailwind layers and component classes
public/                   Static assets (cmi-headers/ = WebP header images, infographics/, favicons, robots.txt)
scripts/                  One-off generators for the unit header images
content-briefs/           Planning briefs used to write the unit pages (reference only)
vercel.json               Redirects
CLAUDE.md                 Original build brief (historical; this README wins on any conflict)
```

## How a page works

1. Copy lives in `src/content/pages/<id>.md`, e.g. `cmi-level-5-unit-501.md`. It starts with an `# H1`, a header image `<figure>`, an intro paragraph, then `##` sections ending in `## FAQ: ...`.
2. The route in `src/pages/` loads it with `getEntry('pages', '<id>')`, renders it, builds the FAQ schema with `extractFaqs('<id>')`, and passes `title`, `description`, `slug`, `schemas` and `breadcrumb` to `BaseLayout`.
3. The markdown goes through two rehype plugins:
   - `rehype-cmi-transforms.mjs`: HTML comment blocks become infographic placeholders or images; a bold line containing "WhatsApp" becomes the CTA box (Order Now button plus four trust badges); `**Step N — ...**` becomes a numbered step block.
   - `rehype-toc.mjs`: inserts an "In this article" list after the header image on pages with three or more H2s.

To add a unit page: add the markdown file, copy an existing route in `src/pages/cmi-level-N/`, change the entry id, title, description, slug and breadcrumb, and add it to the level hub and the header dropdown.

## SEO conventions

- **Meta title:** `Main keyword | CMI Assignment Support` (about 60 characters or fewer). Unit pages use `CMI Unit NNN Assignment Help | CMI Assignment Support`.
- **H1:** exactly one per page, starting with the same keyword. Unit H1s read `CMI Unit NNN Assignment Help: <unit name>`. The homepage H1 is the hero heading in `index.astro`; `homepage.md` has no H1.
- **Canonical and sitemap URLs** use `https://www.` only.
- **noindex pages:** set the `noindex` prop on `BaseLayout` and add the path to `NOINDEX_PATHS` in `astro.config.mjs` so it is also dropped from the sitemap. Currently: the six stub unit pages (502, 503, 504, 512, 513, 708), `/our-writers/`, `/privacy-policy/` and `/terms/`.
- **Pages with the best rankings** (command verbs guide, examples, NHS guide) were deliberately left with their original titles and H1s. Check Search Console before changing them. The command verbs guide had body-only additions (a verbs list table, level links, order box) and keeps its title and H1.
- **Internal linking:** the header and footer link to the hubs and services on every page. When adding a commercial or guide page, also add it to the footer, the relevant hub's Related Pages list, and the homepage services list. Google is crawling this site slowly, so new pages need several links in.
- **Examples content:** the examples guides show annotated structure only (word budgets, command verb patterns, Merit and Distinction standards). They do not reproduce student assignments or name real companies, and draft assignment files should stay out of git.

## Things to know

- **WhatsApp number and prefilled message** are defined in three places: `Header.astro`, `WhatsAppButton.astro` and `rehype-cmi-transforms.mjs`. Change all three together.
- **Tailwind scans `.mjs` files** (see `content` in `tailwind.config.mjs`) because the CTA classes are generated inside the rehype plugin. Without that, the styles are dropped from the build.
- **Content cache:** Astro caches rendered markdown. `astro.config.mjs` passes a hash of each plugin's source file so edits invalidate it. If a dev server still shows stale content, stop it and delete `node_modules/.astro` and `.astro`.
- **GA4** (gtag.js) is in `BaseLayout.astro`.

## Deployment and redirects

- Pushing to `main` deploys on Vercel.
- `vercel.json` redirects the old `/cmi-command-verbs-explained` URL to `/guides/cmi-command-verbs-explained/` and sends the `cmi-assignment-help.vercel.app` host to the www domain (both permanent).
- `cmiassignmentsupport.co.uk` (no www) redirects to www with a 308. That setting lives in the Vercel domain settings, not in this repo.

## Status (October 2026)

- 85 pages build; 76 are in the sitemap and 9 are `noindex`.
- The Level 3, 5 and 7 assignment examples guides were added on 1 Oct 2026 and are not indexed yet. There is no Level 4 or Level 6 examples guide.
- Content is complete for Level 3 (12 units), Level 4 (11) and Level 6 (16). Level 5 has pages for 8 of 25 units and Level 7 for 6 of 17; the rest are not written yet, and six of the existing ones are "coming soon" stubs.
- **Indexing:** a Search Console check on 1 Oct 2026 showed 34 of 82 pages indexed, with 41 "Discovered, currently not indexed" (including the Level 3 and Level 5 hubs and most service pages). The site moved from non-www to www on 27 Aug 2026, and Google is still crawling slowly. Since then: the non-www redirect was made permanent (308), the vercel.app host now redirects to www, placeholder pages were set to `noindex`, and internal links to the under-linked service pages were added. Next steps are indexing requests in Search Console for the key pages and new guides, and links from other sites (the ILM site already links to the CMI hubs).
- **FAQ schema:** `extractFaqs()` only recognises a bold line that ends in `?` as a question, so every FAQ question in the markdown must be written as `**Question text?**` followed by the answer. `SchemaOrg.astro` skips any FAQPage with no questions (the Level 6 units 607 to 616 have no FAQ section yet).
