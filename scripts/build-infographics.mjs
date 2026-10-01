// Generates the site's SVG infographics into public/infographics/.
// Usage: node scripts/build-infographics.mjs [name-filter]
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generalGraphics } from './infographics/general.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'infographics');
const all = { ...generalGraphics };

// Unit-page graphics are optional until their module exists.
try {
  const { unitGraphics } = await import('./infographics/units.mjs');
  Object.assign(all, unitGraphics);
} catch (err) {
  if (err.code !== 'ERR_MODULE_NOT_FOUND') throw err;
}

const filter = process.argv[2];
mkdirSync(OUT, { recursive: true });
let count = 0;
for (const [file, build] of Object.entries(all)) {
  if (filter && !file.includes(filter)) continue;
  writeFileSync(join(OUT, file), build(), 'utf8');
  count += 1;
}
console.log(`Wrote ${count} infographic(s) to ${OUT}`);
