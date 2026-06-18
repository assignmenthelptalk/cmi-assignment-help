import puppeteer from 'puppeteer';
import { readdirSync } from 'fs';
import { resolve, join } from 'path';
import { pathToFileURL } from 'url';

const HTML_DIR = resolve('public/cmi-headers');
const OUT_DIR = resolve('public/cmi-headers/webp');

const patterns = [
  /^cmi-level-3-unit-/,
  /^cmi-level-4-unit-/,
  /^cmi-level-6-unit-/,
];

const files = readdirSync(HTML_DIR)
  .filter(f => f.endsWith('.html') && patterns.some(p => p.test(f)))
  .sort();

console.log(`Rendering ${files.length} headers...`);

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 960, height: 480, deviceScaleFactor: 1 });

let done = 0;
for (const f of files) {
  const htmlPath = pathToFileURL(join(HTML_DIR, f)).href;
  const outName = f.replace('.html', '.webp');
  const outPath = join(OUT_DIR, outName);

  await page.goto(htmlPath, { waitUntil: 'networkidle0', timeout: 15000 });

  // Wait for fonts and images
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 400));

  await page.screenshot({
    path: outPath,
    type: 'webp',
    quality: 88,
    clip: { x: 0, y: 0, width: 960, height: 480 },
  });

  done++;
  process.stdout.write(`\r${done}/${files.length} — ${outName}`);
}

await browser.close();
console.log('\nDone.');
