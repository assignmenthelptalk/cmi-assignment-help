# CLAUDE.md — CMI Assignment Support Astro Site Build Brief

You are building a production-ready Astro website for **cmiassignmentsupport.co.uk** — a UK-based CMI assignment support service. All page content has been pre-written and is in the `/content/` folder of this project. Your job is to build the complete Astro site from those content files following the exact specifications in this file.

Read this file in full before writing a single line of code.

---

## 1. Project Identity

| Field | Value |
|---|---|
| Site domain | cmiassignmentsupport.co.uk |
| Business type | UK academic support service — CMI qualification writing and tutoring |
| Target audience | Working professionals (managers, NHS staff, public sector workers) studying CMI qualifications Level 3–7 |
| Primary CTA | WhatsApp contact — appears on every page, above fold |
| WhatsApp number | `https://wa.me/[WHATSAPP_NUMBER]` — leave as placeholder, client will replace |
| Language | en-GB throughout |
| Tone | Professional, declarative, no rhetorical questions |

---

## 2. Your Task — Ordered Steps

Execute in this order:

1. **Verify Astro is initialised** — if `package.json` doesn't exist, run `npm create astro@latest . -- --template minimal --no-install --no-git` then `npm install`
2. **Install dependencies**: `npm install @astrojs/tailwind @astrojs/sitemap tailwindcss` and add integrations to `astro.config.mjs`
3. **Read all 17 content files** from `/content/` before building any page
4. **Create the project structure** as specified in Section 4
5. **Build shared components** as specified in Section 5
6. **Build all 17 pages** following the routing table in Section 8
7. **Implement SEO** — meta tags, schema JSON-LD, sitemap, robots.txt, canonical URLs
8. **Parse content correctly** following Section 7 rules
9. **Run verification checklist** in Section 10 before finishing

---

## 3. Content Files in `/content/`

These 17 files are the sole source of truth for page content. Do not write copy — render what is in the files.

```
homepage.md
cmi-assignment-writing-service.md
cmi-level-3-assignment-help.md
cmi-level-4-assignment-help.md
cmi-level-5-assignment-help.md
cmi-level-6-assignment-help.md
cmi-level-7-assignment-help.md
cmi-assignment-tutoring.md
cmi-coursework-help.md
cmi-essay-writing-help.md
cmi-report-writing-help.md
cmi-homework-help.md
cmi-assignment-answers.md
cmi-assignment-examples.md
cmi-assignment-help-online.md
cheap-cmi-assignment-help.md
pay-someone-to-do-my-cmi-assignment.md
```

---

## 4. Astro Project Structure

Create this exact directory layout:

```
/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
├── CLAUDE.md                          ← this file
├── content/                           ← 17 .md files (already here)
├── public/
│   ├── favicon.svg                    ← create simple placeholder SVG
│   ├── robots.txt
│   └── og-default.png                 ← placeholder OG image (can be blank PNG)
└── src/
    ├── layouts/
    │   └── BaseLayout.astro
    ├── components/
    │   ├── Header.astro
    │   ├── Footer.astro
    │   ├── WhatsAppButton.astro
    │   ├── Breadcrumb.astro
    │   ├── InfographicPlaceholder.astro
    │   └── SchemaOrg.astro
    ├── styles/
    │   └── global.css
    └── pages/
        ├── index.astro
        ├── cmi-assignment-writing-service.astro
        ├── cmi-level-3-assignment-help.astro
        ├── cmi-level-4-assignment-help.astro
        ├── cmi-level-5-assignment-help.astro
        ├── cmi-level-6-assignment-help.astro
        ├── cmi-level-7-assignment-help.astro
        ├── cmi-assignment-tutoring.astro
        ├── cmi-coursework-help.astro
        ├── cmi-essay-writing-help.astro
        ├── cmi-report-writing-help.astro
        ├── cmi-homework-help.astro
        ├── cmi-assignment-answers.astro
        ├── cmi-assignment-examples.astro
        ├── cmi-assignment-help-online.astro
        ├── cheap-cmi-assignment-help.astro
        └── pay-someone-to-do-my-cmi-assignment.astro
```

---

## 5. Component Specifications

### `BaseLayout.astro`

Accepts these props:
```typescript
interface Props {
  title: string;
  description: string;
  slug: string;           // e.g. "/cmi-level-5-assignment-help/"
  schemas: object[];      // array of JSON-LD schema objects
  breadcrumb?: { label: string; href: string }[];  // omit on homepage
}
```

Must output in `<head>`:
- `<title>{title}</title>`
- `<meta name="description" content={description} />`
- `<link rel="canonical" href={"https://cmiassignmentsupport.co.uk" + slug} />`
- `<meta property="og:title" content={title} />`
- `<meta property="og:description" content={description} />`
- `<meta property="og:type" content="website" />`
- `<meta property="og:url" content={"https://cmiassignmentsupport.co.uk" + slug} />`
- `<meta property="og:image" content="https://cmiassignmentsupport.co.uk/og-default.png" />`
- `<meta name="robots" content="index, follow" />`
- `<link rel="alternate" hreflang="en-GB" href={"https://cmiassignmentsupport.co.uk" + slug} />`
- `<SchemaOrg schemas={schemas} />` (renders JSON-LD script tags)

Structure:
```
<html lang="en-GB">
  <head>...</head>
  <body>
    <Header />
    {breadcrumb && <Breadcrumb items={breadcrumb} pageName={title} />}
    <main>
      <slot />
    </main>
    <Footer />
    <WhatsAppButton />
  </body>
</html>
```

---

### `SchemaOrg.astro`

Accepts `schemas: object[]`. Renders one `<script type="application/ld+json">` tag per schema object.

---

### `WhatsAppButton.astro`

```html
<!-- Fixed floating button — mobile bottom-right, visible on all pages -->
<a
  href="https://wa.me/[WHATSAPP_NUMBER]"
  target="_blank"
  rel="noopener noreferrer"
  class="whatsapp-fab"
  aria-label="Contact CMI Assignment Support on WhatsApp"
>
  <!-- WhatsApp SVG icon (white, 28px) -->
  <svg>...</svg>
  <span>WhatsApp Us</span>
</a>
```

Styling: fixed, bottom-right, z-index 50. Background `#25D366`. White text and icon. Border-radius 50px. Box shadow. Hide text on mobile, show on ≥768px. The button must be visible above fold on every page without scrolling.

Also place a smaller inline WhatsApp CTA button in the Header for desktop (≥1024px), styled as a green pill button: "WhatsApp — Free Quote".

---

### `Header.astro`

Desktop layout (≥1024px):
- Left: Logo text "CMI Assignment Support" (link to `/`)
- Centre nav links:
  - [Level 3](/cmi-level-3-assignment-help/)
  - [Level 4](/cmi-level-4-assignment-help/)
  - [Level 5](/cmi-level-5-assignment-help/)
  - [Level 6](/cmi-level-6-assignment-help/)
  - [Level 7](/cmi-level-7-assignment-help/)
  - [Writing Service](/cmi-assignment-writing-service/)
  - [Tutoring](/cmi-assignment-tutoring/)
- Right: WhatsApp pill button (green, "WhatsApp — Free Quote")

Mobile (<1024px):
- Logo left, hamburger menu right
- Hamburger opens full-width dropdown with all nav links + WhatsApp button
- Implement with pure CSS checkbox toggle (no JS required) OR minimal vanilla JS

Active nav link: underline or color highlight for current page using Astro's `Astro.url.pathname`.

---

### `Footer.astro`

Three-column layout:

**Column 1 — Services**
- [CMI Assignment Writing Service](/cmi-assignment-writing-service/)
- [CMI Assignment Tutoring](/cmi-assignment-tutoring/)
- [CMI Coursework Help](/cmi-coursework-help/)
- [CMI Essay Writing Help](/cmi-essay-writing-help/)
- [CMI Report Writing Help](/cmi-report-writing-help/)
- [CMI Homework Help](/cmi-homework-help/)
- [CMI Assignment Answers](/cmi-assignment-answers/)
- [CMI Assignment Examples](/cmi-assignment-examples/)

**Column 2 — Levels**
- [CMI Level 3 Assignment Help](/cmi-level-3-assignment-help/)
- [CMI Level 4 Assignment Help](/cmi-level-4-assignment-help/)
- [CMI Level 5 Assignment Help](/cmi-level-5-assignment-help/)
- [CMI Level 6 Assignment Help](/cmi-level-6-assignment-help/)
- [CMI Level 7 Assignment Help](/cmi-level-7-assignment-help/)

**Column 3 — More**
- [Online Assignment Help](/cmi-assignment-help-online/)
- [Affordable CMI Help](/cheap-cmi-assignment-help/)
- [Pay Someone to Do My CMI Assignment](/pay-someone-to-do-my-cmi-assignment/)
- [Privacy Policy](/privacy-policy/) ← placeholder page
- [Terms of Service](/terms/) ← placeholder page

Footer bottom bar:
```
© 2025 CMI Assignment Support. UK-based CMI assignment writing and tutoring service.
```

---

### `Breadcrumb.astro`

Accepts `items: { label: string; href: string }[]` and `pageName: string`.

Renders:
```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <!-- repeat for each item -->
    <li aria-current="page">{pageName}</li>
  </ol>
</nav>
```

Also injects BreadcrumbList JSON-LD into a `<script type="application/ld+json">` tag within the component. The breadcrumb on all non-homepage pages is simply: Home → [Page Title].

---

### `InfographicPlaceholder.astro`

Accepts props: `label: string`, `description: string`, `altText: string`.

Renders:
```html
<div class="infographic-placeholder">
  <div class="infographic-placeholder__inner">
    <span class="infographic-placeholder__icon">📊</span>
    <p class="infographic-placeholder__label">{label}</p>
    <p class="infographic-placeholder__desc">{description}</p>
    <p class="infographic-placeholder__alt"><em>Alt text: {altText}</em></p>
  </div>
</div>
```

Style: dashed border, light grey background, centered content, min-height 200px, border-radius var(--radius). Makes it visually obvious to the client that a designed graphic goes here.

---

## 6. Design System

### `tailwind.config.mjs`

Extend the default Tailwind theme with these tokens:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#1a2e4a',
      accent: '#25D366',
      'accent-dark': '#128C7E',
      'text-body': '#1f2937',
      'text-muted': '#6b7280',
      'bg-subtle': '#f9fafb',
      border: '#e5e7eb',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    borderRadius: {
      DEFAULT: '8px',
    },
    boxShadow: {
      sm: '0 1px 3px rgba(0,0,0,0.1)',
      md: '0 4px 12px rgba(0,0,0,0.08)',
    },
  },
}
```

### `src/styles/global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@layer base {
  html { @apply text-text-body; scroll-behavior: smooth; }
  h1 { @apply text-3xl font-bold text-primary leading-tight mb-4; }
  h2 { @apply text-2xl font-semibold text-primary leading-snug mt-10 mb-4; }
  h3 { @apply text-xl font-semibold text-primary mt-8 mb-3; }
  h4 { @apply text-lg font-semibold text-primary mt-6 mb-2; }
  p  { @apply text-base leading-relaxed mb-4; }
  a  { @apply text-primary underline hover:text-accent transition-colors; }
  ul { @apply list-disc pl-6 mb-4 space-y-1; }
  ol { @apply list-decimal pl-6 mb-4 space-y-1; }
  li { @apply leading-relaxed; }
  strong { @apply font-semibold; }
  blockquote { @apply border-l-4 border-accent pl-4 italic text-text-muted my-6; }
  table { @apply w-full border-collapse mb-6 text-sm; }
  th { @apply bg-primary text-white font-semibold px-4 py-3 text-left; }
  td { @apply border border-border px-4 py-3; }
  tr:nth-child(even) td { @apply bg-bg-subtle; }
  hr { @apply border-border my-10; }
  code { @apply bg-bg-subtle rounded px-1 py-0.5 text-sm font-mono; }
}

@layer components {
  .whatsapp-fab {
    @apply fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3
           bg-accent text-white font-semibold rounded-full shadow-md
           hover:bg-accent-dark transition-colors no-underline;
  }
  .whatsapp-inline {
    @apply inline-flex items-center gap-2 px-5 py-3 bg-accent text-white
           font-semibold rounded-full hover:bg-accent-dark transition-colors
           no-underline text-sm;
  }
  .cta-box {
    @apply bg-accent/10 border border-accent/30 rounded-lg px-6 py-5 my-8
           flex flex-col sm:flex-row items-start sm:items-center gap-4;
  }
  .step-block {
    @apply flex gap-4 items-start mb-6;
  }
  .step-number {
    @apply flex-shrink-0 w-9 h-9 rounded-full bg-primary text-white
           font-bold text-sm flex items-center justify-center;
  }
  .infographic-placeholder {
    @apply border-2 border-dashed border-border bg-bg-subtle rounded-lg
           my-8 p-8 text-center min-h-[200px] flex items-center justify-center;
  }
  .checklist li::before { content: "✓ "; @apply text-accent font-bold; }
}
```

---

## 7. Content Parsing Rules

When rendering a `.md` content file in an Astro page, apply these transformations:

### Markdown Rendering
Use Astro's built-in `<Content />` component with `import { Content } from '../../../content/filename.md'` — or parse the file manually using `fs.readFileSync` and a markdown-it/marked parser if needed.

**Recommended approach**: Use Astro Content Collections.

Set up `src/content/config.ts`:
```typescript
import { defineCollection, z } from 'astro:content';
const pages = defineCollection({ type: 'content', schema: z.object({}) });
export const collections = { pages };
```

Move all 17 `.md` files into `src/content/pages/` (or keep in `/content/` and use `fs` — your choice, but Content Collections is preferred).

### Inline CTA Boxes
Every content file contains bold CTA lines like:
```
**Get CMI Assignment Help on WhatsApp — Free Quote**
Message us now to discuss your assignment, level, and deadline.
```

When rendering markdown, these render naturally as `<strong>` and `<p>`. Wrap them in a `.cta-box` div. A bold line followed immediately by a plain line and then `---` is the CTA pattern.

Detection: Any `<strong>` tag whose text contains "WhatsApp" should be wrapped in a CTA box with a `<a href="https://wa.me/[WHATSAPP_NUMBER]" class="whatsapp-inline">` button appended.

### Process Steps
Bold lines matching `**Step N —` pattern should be wrapped in `.step-block` divs with a `.step-number` badge showing the number.

### Infographic Placeholders
Content files contain HTML comments like:
```html
<!-- TRUST BADGE ROW — Place below H1, above first H2 -->
<!-- Components: CMI logo reference | "UK-Based Writers" badge | Trustpilot star rating widget -->
<!-- Alt text: "CMI assignment help — UK-based service..." -->
```

These are multi-line comment blocks. Parse them and render an `<InfographicPlaceholder>` component using:
- First comment line → `label`
- Second comment line (Components:) → `description`
- Alt text comment line → `altText`

Pages with infographic placeholders:
- `homepage.md` — 3 placeholders (Trust Badge Row, Level Selector Graphic, Process Infographic)
- `cmi-assignment-writing-service.md` — 1 placeholder (Process Timeline)
- `cmi-level-7-assignment-help.md` — 1 placeholder (Level Comparison Infographic)

### Testimonial Blocks
On `homepage.md`, blockquotes with `— *Level X student...*` attribution are testimonials. Render them inside a styled testimonial card with a light grey background, left border in accent green, and the attribution in smaller muted text.

### Internal Links
All internal hrefs like `/cmi-level-5-assignment-help/` are already correct for Astro's routing. No transformation needed — render as-is.

---

## 8. Full Page Routing Table

| Content File | Astro Page File | URL Slug | Meta Title | Meta Description | Primary Schema |
|---|---|---|---|---|---|
| homepage.md | index.astro | / | CMI Assignment Help — Expert Support for All Levels \| UK | Get expert CMI assignment help for Levels 3–7. UK-based writers, fast turnaround, all units covered. Message us on WhatsApp to get started today. | Organization + WebSite + FAQPage |
| cmi-assignment-writing-service.md | cmi-assignment-writing-service.astro | /cmi-assignment-writing-service/ | CMI Assignment Writing Service UK — Professional Writers | Professional CMI assignment writing service for all levels. UK-based writers, submission-ready documents, all units covered. Get a free quote on WhatsApp today. | Service + FAQPage |
| cmi-level-3-assignment-help.md | cmi-level-3-assignment-help.astro | /cmi-level-3-assignment-help/ | CMI Level 3 Assignment Help — All Units, Expert UK Support | Get expert CMI Level 3 assignment help for all 12 units. UK-based writers, essay and report support for First Line Management qualifications. WhatsApp for a free quote. | Service + FAQPage |
| cmi-level-4-assignment-help.md | cmi-level-4-assignment-help.astro | /cmi-level-4-assignment-help/ | CMI Level 4 Assignment Help — All Units, Expert UK Support | Get expert CMI Level 4 assignment help for all 11 units. UK-based writers, management report and essay support. WhatsApp to get your free quote today. | Service + FAQPage |
| cmi-level-5-assignment-help.md | cmi-level-5-assignment-help.astro | /cmi-level-5-assignment-help/ | CMI Level 5 Assignment Help — All 25 Units, Expert UK Support | Get expert CMI Level 5 assignment help for all 25 units of the Management and Leadership Diploma. UK writers, fast turnaround. WhatsApp for your free quote today. | Service + FAQPage |
| cmi-level-6-assignment-help.md | cmi-level-6-assignment-help.astro | /cmi-level-6-assignment-help/ | CMI Level 6 Assignment Help — All 16 Units, Expert UK Support | Expert CMI Level 6 assignment help for all 16 Professional Management units. UK-based senior writers, Critically Evaluate depth, fast turnaround. WhatsApp now. | Service + FAQPage |
| cmi-level-7-assignment-help.md | cmi-level-7-assignment-help.astro | /cmi-level-7-assignment-help/ | CMI Level 7 Assignment Help — All 17 Units, Strategic Writers | Expert CMI Level 7 assignment help for all 17 Strategic Management and Leadership units. Senior UK writers, highest academic standard. WhatsApp for a free quote. | Service + FAQPage |
| cmi-assignment-tutoring.md | cmi-assignment-tutoring.astro | /cmi-assignment-tutoring/ | CMI Assignment Tutoring — Expert UK Tutors for All Levels | Get CMI assignment tutoring from qualified UK experts. Structure guidance, feedback, and command verb coaching for all levels. WhatsApp to arrange your first session. | Service + FAQPage |
| cmi-coursework-help.md | cmi-coursework-help.astro | /cmi-coursework-help/ | CMI Coursework Help — All Units, All Levels \| UK Support | Need help with your CMI coursework? Get expert support across all units and levels. UK-based writers, ongoing guidance, WhatsApp for a free quote. | Service + FAQPage |
| cmi-essay-writing-help.md | cmi-essay-writing-help.astro | /cmi-essay-writing-help/ | CMI Essay Writing Help — Expert UK Writers \| All Levels | Get expert CMI essay writing help for all levels. UK-based writers who understand CMI essay format, command verbs, and assessment criteria. WhatsApp for a free quote. | Service + FAQPage |
| cmi-report-writing-help.md | cmi-report-writing-help.astro | /cmi-report-writing-help/ | CMI Report Writing Help — Management Report Experts UK | Expert CMI management report writing help for Levels 5–7. Professional structure, Harvard referencing, assessment criteria aligned. WhatsApp for a free quote today. | Service + FAQPage |
| cmi-homework-help.md | cmi-homework-help.astro | /cmi-homework-help/ | CMI Homework Help — Expert Support for Every CMI Task | Get expert CMI homework help for any level or unit task. UK-based writers and tutors help you complete CMI written work to assessment standards. WhatsApp now. | Service + FAQPage |
| cmi-assignment-answers.md | cmi-assignment-answers.astro | /cmi-assignment-answers/ | CMI Assignment Answers — Expert Written Responses for All Units | Get expert CMI assignment answers written to your specific unit brief. All levels and units covered. UK-based writers, fast turnaround. WhatsApp your question now. | Service + FAQPage |
| cmi-assignment-examples.md | cmi-assignment-examples.astro | /cmi-assignment-examples/ | CMI Assignment Examples — Free Samples Across All Levels | View real CMI assignment examples for Levels 3–7. See fully structured management reports, essays, and reflective accounts. Free sample available on WhatsApp. | WebPage + FAQPage |
| cmi-assignment-help-online.md | cmi-assignment-help-online.astro | /cmi-assignment-help-online/ | CMI Assignment Help Online — Remote Support for All Levels | Get CMI assignment help online from UK-based writers. WhatsApp-first service, all levels and units covered, fast turnaround. Start your free quote today. | Service + FAQPage |
| cheap-cmi-assignment-help.md | cheap-cmi-assignment-help.astro | /cheap-cmi-assignment-help/ | Cheap CMI Assignment Help UK — Affordable Quality Support | Looking for affordable CMI assignment help? Get competitive pricing, UK-based writers, and quality results for all levels. WhatsApp for your free quote today. | Service + FAQPage |
| pay-someone-to-do-my-cmi-assignment.md | pay-someone-to-do-my-cmi-assignment.astro | /pay-someone-to-do-my-cmi-assignment/ | Pay Someone to Do My CMI Assignment — Trusted UK Service | Need someone to do your CMI assignment? Our UK-based writers deliver professional, submission-ready CMI assignments for all levels. WhatsApp to get started now. | Service + FAQPage |

---

## 9. Schema JSON-LD Specifications

### Organization (homepage only — combined with WebSite and FAQPage)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CMI Assignment Support",
  "url": "https://cmiassignmentsupport.co.uk",
  "description": "UK-based CMI assignment writing and tutoring service for all levels.",
  "areaServed": "GB",
  "serviceType": "Academic writing support",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "availableLanguage": "English"
  }
}
```

### WebSite (homepage only)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CMI Assignment Support",
  "url": "https://cmiassignmentsupport.co.uk"
}
```

### Service (all service and hub pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[Meta Title of the page]",
  "description": "[Meta Description of the page]",
  "provider": {
    "@type": "Organization",
    "name": "CMI Assignment Support",
    "url": "https://cmiassignmentsupport.co.uk"
  },
  "areaServed": "GB",
  "serviceType": "CMI assignment writing support"
}
```

### FAQPage (all pages — combined with primary schema)
Extract all FAQ question/answer pairs from the content. Every content file ends with a `## FAQ` section containing bold questions and paragraph answers. Build the FAQPage schema from these.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text]"
      }
    }
  ]
}
```

### BreadcrumbList (injected by `Breadcrumb.astro` on all non-homepage pages)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cmiassignmentsupport.co.uk/" },
    { "@type": "ListItem", "position": 2, "name": "[Page Name]", "item": "https://cmiassignmentsupport.co.uk[/slug/]" }
  ]
}
```

---

## 10. SEO Technical Files

### `public/robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://cmiassignmentsupport.co.uk/sitemap-index.xml
```

### `astro.config.mjs`
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cmiassignmentsupport.co.uk',
  integrations: [tailwind(), sitemap()],
  output: 'static',
  trailingSlash: 'always',
});
```

`trailingSlash: 'always'` is required to match the URL slugs specified (all end with `/`).

---

## 11. Page Template Pattern

Every `.astro` page file follows this pattern. Here is `cmi-level-5-assignment-help.astro` as the canonical example:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import InfographicPlaceholder from '../components/InfographicPlaceholder.astro';
import { getEntry } from 'astro:content';

const entry = await getEntry('pages', 'cmi-level-5-assignment-help');
const { Content } = await entry.render();

const pageData = {
  title: 'CMI Level 5 Assignment Help — All 25 Units, Expert UK Support',
  description: 'Get expert CMI Level 5 assignment help for all 25 units of the Management and Leadership Diploma. UK writers, fast turnaround. WhatsApp for your free quote today.',
  slug: '/cmi-level-5-assignment-help/',
  breadcrumb: [{ label: 'CMI Level 5 Assignment Help', href: '/cmi-level-5-assignment-help/' }],
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'CMI Level 5 Assignment Help',
      description: 'Expert CMI Level 5 assignment writing and tutoring for all 25 units of the Diploma in Management and Leadership.',
      provider: { '@type': 'Organization', name: 'CMI Assignment Support', url: 'https://cmiassignmentsupport.co.uk' },
      areaServed: 'GB',
      serviceType: 'CMI assignment writing support',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        // Extract FAQ pairs from the content file programmatically or hardcode them here
      ],
    },
  ],
};
---

<BaseLayout {...pageData}>
  <article class="prose-page">
    <Content />
  </article>
</BaseLayout>
```

**For FAQ schema extraction**: Parse the markdown file at build time to extract `**Question?**` / paragraph pairs from the `## FAQ` section. Use a regex or markdown-it token walk. Do not hardcode FAQ answers — extract them dynamically so the schema stays in sync with the content.

---

## 12. Prose Styling — `.prose-page`

Add this to `global.css` or as a Tailwind class group. The `.prose-page` wrapper provides max-width, centered layout, and comfortable reading width:

```css
.prose-page {
  @apply max-w-3xl mx-auto px-4 sm:px-6 py-10;
}
```

For pages that need a wider layout (homepage, level hub pages with unit grids), use `.prose-page--wide`:
```css
.prose-page--wide {
  @apply max-w-5xl mx-auto px-4 sm:px-6 py-10;
}
```

Apply `.prose-page--wide` to:
- `index.astro` (homepage)
- All 5 level hub pages (cmi-level-3 through cmi-level-7)

---

## 13. Verification Checklist

Before marking the build complete, verify all of the following:

**Routing**
- [ ] `npm run build` completes with zero errors
- [ ] `npm run dev` starts and all 17 pages respond at their correct URLs with trailing slash
- [ ] `/` renders `homepage.md` content
- [ ] `/cmi-level-5-assignment-help/` renders the Level 5 content

**Components**
- [ ] WhatsApp floating button visible on every page without scrolling (above fold)
- [ ] Header navigation links to all 5 level hub pages
- [ ] Breadcrumb renders on all pages except homepage
- [ ] Footer contains links to all 17 pages
- [ ] Infographic placeholders render on: homepage (3), writing service (1), level 7 (1)

**SEO**
- [ ] `<title>` tag matches the meta title in Section 8 for every page
- [ ] `<meta name="description">` matches Section 8 for every page
- [ ] `<link rel="canonical">` present on every page with correct URL
- [ ] `hreflang="en-GB"` present on every page
- [ ] JSON-LD schema present in `<head>` on every page
- [ ] FAQPage schema present on every page
- [ ] `/sitemap-index.xml` or `/sitemap.xml` accessible and contains all 17 URLs
- [ ] `/robots.txt` accessible and contains sitemap URL

**Content**
- [ ] All internal links (e.g. `/cmi-level-5-assignment-help/`) resolve without 404
- [ ] Markdown tables render as styled HTML tables (not raw pipe characters)
- [ ] CTA boxes (WhatsApp bold lines) are visually distinct
- [ ] Process steps render with numbered badges

**Responsive**
- [ ] No horizontal overflow on mobile at 375px width
- [ ] Navigation collapses to hamburger at <1024px
- [ ] WhatsApp FAB button is thumb-reachable on mobile

---

## 14. Placeholder Pages

Create minimal pages for links that exist in the footer but have no content yet:

**`/privacy-policy/`** — `src/pages/privacy-policy.astro`
Simple page with heading "Privacy Policy" and placeholder text: "This privacy policy will be updated shortly. For questions, contact us on WhatsApp."

**`/terms/`** — `src/pages/terms.astro`
Simple page with heading "Terms of Service" and placeholder text: "Terms of service will be updated shortly."

**`/our-writers/`** — `src/pages/our-writers.astro`
Heading "Our CMI Writers and Tutors" + placeholder: "Writer profiles coming soon. Contact us on WhatsApp to discuss your unit and we'll match you with the right writer."

**`/how-it-works/`** — `src/pages/how-it-works.astro`
Heading "How CMI Assignment Help Works" + the 5-step process (copy from any content file's WhatsApp process section).

**`/reviews/`** — `src/pages/reviews.astro`
Heading "CMI Assignment Help Reviews" + placeholder for Trustpilot widget.

These placeholder pages must use `BaseLayout.astro` with appropriate title/description and no breadcrumb errors.

---

## 15. Do Not Do

- Do not invent or rewrite any page content — render only what is in the `/content/` files
- Do not add external JavaScript libraries (no jQuery, no Vue, no React) — Astro static only
- Do not use `client:load` directives — this site is fully static
- Do not use `@astrojs/mdx` — standard `.md` content collections only
- Do not add cookie banners, popups, or interstitials — no JS modals
- Do not change URL slugs — use exactly the slugs in Section 8
- Do not use `output: 'server'` — this is a static site (`output: 'static'`)
