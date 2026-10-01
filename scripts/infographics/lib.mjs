// Shared helpers for generating the site's SVG infographics.
// Every function returns { svg, h } (an SVG fragment and its height) so layouts can be stacked.

export const C = {
  navy: '#1a2e4a',
  navy2: '#1e3a5f',
  ink: '#1f2937',
  mute: '#6b7280',
  line: '#e5e7eb',
  bg: '#f9fafb',
  white: '#ffffff',
  green: '#15803d',
  greenBg: '#dcfce7',
  teal: '#0f766e',
  tealBg: '#ccfbf1',
  blue: '#2563eb',
  blueBg: '#dbeafe',
  amber: '#b45309',
  amberBg: '#fef3c7',
  red: '#b91c1c',
  redBg: '#fee2e2',
  purple: '#6d28d9',
  purpleBg: '#ede9fe',
  grey: '#9ca3af',
  greyBg: '#f3f4f6',
};

export const FONT = "Inter, 'Segoe UI', system-ui, -apple-system, Arial, sans-serif";

let uid = 0;
export const nextId = (prefix = 'g') => `${prefix}${++uid}`;

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const fmt = (n) => Number(n.toFixed(1));

/** Split text into lines that fit maxW at the given font size (conservative width estimate). */
export function wrap(str, maxW, fs, bold = false) {
  const charW = fs * (bold ? 0.6 : 0.55);
  const maxChars = Math.max(3, Math.floor(maxW / charW));
  const out = [];
  for (const para of String(str).split('\n')) {
    let line = '';
    for (const word of para.split(/\s+/).filter(Boolean)) {
      if (!line) line = word;
      else if ((line + ' ' + word).length <= maxChars) line += ' ' + word;
      else {
        out.push(line);
        line = word;
      }
    }
    out.push(line);
  }
  return out;
}

/** A wrapped block of text. For anchor 'middle', x is the centre of the block. */
export function para(x, y, maxW, str, o = {}) {
  const { fs = 13, fill = C.ink, bold = false, anchor = 'start', lh = 1.35, italic = false } = o;
  const lines = wrap(str, maxW, fs, bold);
  const step = fs * lh;
  const attrs = `font-size="${fs}" fill="${fill}"${bold ? ' font-weight="700"' : ''}${
    anchor !== 'start' ? ` text-anchor="${anchor}"` : ''
  }${italic ? ' font-style="italic"' : ''}`;
  const svg = lines
    .map((ln, i) => `<text x="${fmt(x)}" y="${fmt(y + fs + i * step)}" ${attrs}>${esc(ln)}</text>`)
    .join('');
  return { svg, h: lines.length * step, n: lines.length };
}

export function rect(x, y, w, h, o = {}) {
  const { fill = C.white, stroke = 'none', sw = 1, r = 8, dash } = o;
  return `<rect x="${fmt(x)}" y="${fmt(y)}" width="${fmt(w)}" height="${fmt(h)}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${
    dash ? ` stroke-dasharray="${dash}"` : ''
  }/>`;
}

export function line(x1, y1, x2, y2, o = {}) {
  const { stroke = C.line, sw = 2, dash, marker } = o;
  return `<line x1="${fmt(x1)}" y1="${fmt(y1)}" x2="${fmt(x2)}" y2="${fmt(y2)}" stroke="${stroke}" stroke-width="${sw}"${
    dash ? ` stroke-dasharray="${dash}"` : ''
  }${marker ? ` marker-end="url(#${marker})"` : ''}/>`;
}

/** Arrowhead marker definition; reference it with line(..., { marker: id }). */
export function arrowDef(id, fill = C.mute) {
  return `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${fill}"/></marker>`;
}

export function pill(x, y, text, o = {}) {
  const { fs = 11, fill = C.navy, fg = '#fff', padX = 10, h = 22 } = o;
  const w = Math.max(h, text.length * fs * 0.6 + padX * 2);
  return {
    svg:
      rect(x, y, w, h, { fill, r: h / 2 }) +
      `<text x="${fmt(x + w / 2)}" y="${fmt(y + h / 2 + fs * 0.36)}" font-size="${fs}" font-weight="700" fill="${fg}" text-anchor="middle">${esc(text)}</text>`,
    w,
    h,
  };
}

const ICONS = {
  chat: { fill: true, d: 'M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z' },
  clock: { fill: false, d: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3.5 2' },
  person: { fill: true, d: 'M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z' },
  doc: { fill: true, d: 'M6 2h8l5 5v15H6V2z' },
  check: { fill: false, d: 'M5 12.5l4.5 4.5L19 7.5' },
  building: { fill: true, d: 'M3 21V9l9-6 9 6v12h-6v-6H9v6H3z' },
  users: {
    fill: true,
    d: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0 2c-3.5 0-7 1.8-7 4.2V20h14v-2.8C16 14.8 12.5 13 9 13zm7.5-2a3 3 0 1 0-1.2-5.8 5 5 0 0 1 0 5.6c.4.1.8.2 1.2.2zm1 2.2c1.9.5 3.5 1.6 3.5 3.4V20h-3v-2.8c0-1.6-.2-2.9-.5-4z',
  },
};

/** A simple pictogram centred on (cx, cy). */
export function icon(name, cx, cy, size, color = '#fff') {
  const ic = ICONS[name];
  if (!ic) return '';
  const s = size / 24;
  const attrs = ic.fill
    ? `fill="${color}"`
    : `fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"`;
  return `<g transform="translate(${fmt(cx - size / 2)} ${fmt(cy - size / 2)}) scale(${fmt(s)})" ${attrs}><path d="${ic.d}"/></g>`;
}

/** Wrap a body fragment in the standard card: title, optional subtitle, footer. */
export function doc({ w = 760, title, subtitle, footer = 'cmiassignmentsupport.co.uk', body, defs = '' }) {
  const px = 28;
  const innerW = w - 2 * px;
  const t = title ? para(px, 22, innerW, title, { fs: 19, bold: true, fill: C.navy, lh: 1.25 }) : { svg: '', h: -10 };
  let y = 22 + t.h + 6;
  let sub = '';
  if (subtitle) {
    const s = para(px, y, innerW, subtitle, { fs: 12.5, fill: C.mute });
    sub = s.svg;
    y += s.h + 6;
  }
  y += 10;
  const b = body({ x: px, y, w: innerW });
  y += b.h + 14;
  const f = para(w - px, y, innerW, footer, { fs: 10.5, fill: C.mute, anchor: 'end' });
  const H = Math.ceil(y + f.h + 14);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${H}" width="${w}" height="${H}" font-family="${FONT}">` +
    (defs ? `<defs>${defs}</defs>` : '') +
    rect(0.75, 0.75, w - 1.5, H - 1.5, { fill: C.bg, stroke: C.line, sw: 1.5, r: 12 }) +
    t.svg +
    sub +
    b.svg +
    f.svg +
    '</svg>\n';
  return svg;
}

/**
 * A table with a coloured header row.
 * cols: [{ label, w }] (w is a relative width); rows: arrays of string | { t, fill, fg, bold }.
 */
export function table({
  x,
  y,
  w,
  cols,
  rows,
  fs = 11.5,
  hfs = 11.5,
  pad = 8,
  headFill = C.navy,
  headFg = '#fff',
  zebra = true,
  firstBold = true,
  firstFill = null,
  colHeadFills = [],
  lh = 1.32,
}) {
  const total = cols.reduce((a, c) => a + (c.w || 1), 0);
  const widths = cols.map((c) => (w * (c.w || 1)) / total);
  const xs = [];
  let acc = x;
  widths.forEach((wd) => {
    xs.push(acc);
    acc += wd;
  });
  const headLines = cols.map((c, i) => wrap(c.label, widths[i] - 2 * pad, hfs, true).length);
  const headH = Math.max(...headLines) * hfs * lh + 2 * pad;
  const norm = (cell) => (typeof cell === 'string' ? { t: cell } : cell);
  const rowHs = rows.map((r) =>
    Math.max(
      ...r.map((cell, i) => {
        const c = norm(cell);
        return wrap(c.t, widths[i] - 2 * pad, fs, i === 0 && firstBold).length * fs * lh;
      }),
    ) +
      2 * pad,
  );
  const H = headH + rowHs.reduce((a, b) => a + b, 0);
  const id = nextId('tc');
  let svg = `<clipPath id="${id}"><rect x="${fmt(x)}" y="${fmt(y)}" width="${fmt(w)}" height="${fmt(H)}" rx="10"/></clipPath><g clip-path="url(#${id})">`;
  svg += rect(x, y, w, H, { fill: C.white, r: 0 });
  cols.forEach((c, i) => {
    svg += rect(xs[i], y, widths[i], headH, { fill: colHeadFills[i] || headFill, r: 0 });
    svg += para(xs[i] + pad, y + pad - 1, widths[i] - 2 * pad, c.label, { fs: hfs, bold: true, fill: headFg, lh }).svg;
  });
  let cy = y + headH;
  rows.forEach((r, ri) => {
    const rh = rowHs[ri];
    if (zebra && ri % 2 === 1) svg += rect(x, cy, w, rh, { fill: C.bg, r: 0 });
    r.forEach((cell, i) => {
      const c = norm(cell);
      if (c.fill) svg += rect(xs[i], cy, widths[i], rh, { fill: c.fill, r: 0 });
      else if (i === 0 && firstFill) svg += rect(xs[i], cy, widths[i], rh, { fill: firstFill, r: 0 });
      svg += para(xs[i] + pad, cy + pad - 1, widths[i] - 2 * pad, c.t, {
        fs,
        lh,
        bold: c.bold ?? (i === 0 && firstBold),
        fill: c.fg || (i === 0 && firstBold ? C.navy : C.ink),
      }).svg;
    });
    svg += line(x, cy, x + w, cy, { stroke: C.line, sw: 1 });
    cy += rh;
  });
  xs.slice(1).forEach((cx) => {
    svg += line(cx, y + headH, cx, y + H, { stroke: C.line, sw: 1 });
  });
  svg += '</g>' + rect(x, y, w, H, { fill: 'none', stroke: C.line, sw: 1.5, r: 10 });
  return { svg, h: H };
}

/** Numbered process steps laid out in rows, joined by a connector line. */
export function steps({ x, y, w, items, perRow, fs = 12, r = 24, fill = C.navy }) {
  const per = perRow || items.length;
  const colW = w / per;
  let svg = '';
  let cursor = y;
  for (let start = 0; start < items.length; start += per) {
    const row = items.slice(start, start + per);
    const cy = cursor + r + 6;
    const texts = row.map((it, i) => {
      const cx = x + colW * (i + 0.5);
      const t = para(cx, cy + r + 10, colW - 14, it.title, { fs, bold: true, anchor: 'middle', fill: C.navy });
      const s = it.sub
        ? para(cx, cy + r + 12 + t.h, colW - 14, it.sub, { fs: fs - 1, anchor: 'middle', fill: C.mute })
        : { svg: '', h: 0 };
      return { t, s, cx };
    });
    const textH = Math.max(...texts.map((t) => t.t.h + (t.s.h ? t.s.h + 2 : 0)));
    if (row.length > 1) svg += line(x + colW * 0.5, cy, x + colW * (row.length - 0.5), cy, { stroke: C.line, sw: 4 });
    row.forEach((it, i) => {
      const { cx } = texts[i];
      svg += `<circle cx="${fmt(cx)}" cy="${fmt(cy)}" r="${r}" fill="${it.fill || fill}"/>`;
      svg += icon(it.icon || 'check', cx, cy, r * 0.95, '#fff');
      svg += `<circle cx="${fmt(cx - r * 0.78)}" cy="${fmt(cy - r * 0.78)}" r="10" fill="#fff" stroke="${it.fill || fill}" stroke-width="2"/>`;
      svg += `<text x="${fmt(cx - r * 0.78)}" y="${fmt(cy - r * 0.78 + 4)}" font-size="11" font-weight="700" fill="${it.fill || fill}" text-anchor="middle">${start + i + 1}</text>`;
      svg += texts[i].t.svg + texts[i].s.svg;
    });
    cursor += r * 2 + 12 + textH + 12;
  }
  return { svg, h: cursor - y };
}

/** Side-by-side column cards: each has a coloured head and labelled rows. */
export function columns({ x, y, w, cols, gap = 14, fs = 11.5, headFs = 14 }) {
  const n = cols.length;
  const cw = (w - gap * (n - 1)) / n;
  const pad = 12;
  const built = cols.map((c) => {
    const head = para(0, 0, cw - 2 * pad, c.head, { fs: headFs, bold: true, lh: 1.2 });
    const sub = c.sub ? para(0, 0, cw - 2 * pad, c.sub, { fs: fs - 0.5, lh: 1.3 }) : { h: 0 };
    const headH = pad + head.h + (sub.h ? sub.h + 3 : 0) + pad - 2;
    const rows = (c.rows || []).map((r) => {
      const lab = r.label ? para(0, 0, cw - 2 * pad, r.label.toUpperCase(), { fs: 9.5, bold: true, lh: 1.2 }) : { h: 0 };
      const txt = para(0, 0, cw - 2 * pad, r.text, { fs, lh: 1.32, bold: r.bold });
      return { lab, txt, h: lab.h + (lab.h ? 2 : 0) + txt.h + 10 };
    });
    return { c, head, sub, headH, rows, bodyH: rows.reduce((a, r) => a + r.h, 0) + pad };
  });
  const H = Math.max(...built.map((b) => b.headH + b.bodyH));
  let svg = '';
  built.forEach((b, i) => {
    const cx = x + i * (cw + gap);
    const fill = b.c.fill || C.navy;
    const id = nextId('cc');
    svg += `<clipPath id="${id}"><rect x="${fmt(cx)}" y="${fmt(y)}" width="${fmt(cw)}" height="${fmt(H)}" rx="10"/></clipPath><g clip-path="url(#${id})">`;
    svg += rect(cx, y, cw, H, { fill: b.c.bg || C.white, r: 0 });
    svg += rect(cx, y, cw, b.headH, { fill, r: 0 });
    svg += para(cx + pad, y + pad - 2, cw - 2 * pad, b.c.head, { fs: headFs, bold: true, fill: '#fff', lh: 1.2 }).svg;
    if (b.c.sub) svg += para(cx + pad, y + pad - 2 + b.head.h + 3, cw - 2 * pad, b.c.sub, { fs: fs - 0.5, fill: 'rgba(255,255,255,0.85)', lh: 1.3 }).svg;
    let ry = y + b.headH + 8;
    b.rows.forEach((r, ri) => {
      const src = b.c.rows[ri];
      if (src.label) svg += para(cx + pad, ry, cw - 2 * pad, src.label.toUpperCase(), { fs: 9.5, bold: true, fill: fill }).svg;
      svg += para(cx + pad, ry + (r.lab.h ? r.lab.h + 2 : 0), cw - 2 * pad, src.text, { fs, lh: 1.32, bold: src.bold }).svg;
      ry += r.h;
    });
    svg += '</g>' + rect(cx, y, cw, H, { fill: 'none', stroke: C.line, sw: 1.5, r: 10 });
  });
  return { svg, h: H };
}

/**
 * An n x m grid of cells with axis labels (used for 2x2 and 3x3 matrices).
 * cells are row-major from the top-left: { title, body, fill, fg, tag, tagFill }.
 */
export function matrixGrid({ x, y, w, cellH, nx, ny, cells, xLabel, yLabel, xTicks = [], yTicks = [], gap = 8, axisW = 46, fs = 11.5 }) {
  const gx = x + axisW;
  const cw = (w - axisW - gap * (nx - 1)) / nx;
  let svg = '';
  cells.forEach((c, i) => {
    const col = i % nx;
    const row = Math.floor(i / nx);
    const cx = gx + col * (cw + gap);
    const cy = y + row * (cellH + gap);
    svg += rect(cx, cy, cw, cellH, { fill: c.fill || C.white, stroke: c.stroke || C.line, sw: 1.5, r: 10 });
    const t = para(cx + 10, cy + 9, cw - 20, c.title, { fs: fs + 1, bold: true, fill: c.fg || C.navy, lh: 1.2 });
    svg += t.svg;
    if (c.body) svg += para(cx + 10, cy + 12 + t.h, cw - 20, c.body, { fs: fs - 0.5, fill: c.fg || C.ink, lh: 1.3 }).svg;
    if (c.tag) {
      const p = pill(cx + 10, cy + cellH - 29, c.tag, { fs: 9.5, fill: c.tagFill || C.navy, h: 19 });
      svg += p.svg;
    }
  });
  const gridH = ny * cellH + (ny - 1) * gap;
  yTicks.forEach((t, i) => {
    const cy = y + i * (cellH + gap) + cellH / 2;
    svg += `<text transform="translate(${fmt(gx - 12)} ${fmt(cy)}) rotate(-90)" font-size="11" fill="${C.mute}" text-anchor="middle" font-weight="600">${esc(t)}</text>`;
  });
  xTicks.forEach((t, i) => {
    svg += `<text x="${fmt(gx + i * (cw + gap) + cw / 2)}" y="${fmt(y + gridH + 16)}" font-size="11" fill="${C.mute}" text-anchor="middle" font-weight="600">${esc(t)}</text>`;
  });
  if (yLabel) svg += `<text transform="translate(${fmt(x + 8)} ${fmt(y + gridH / 2)}) rotate(-90)" font-size="12.5" fill="${C.navy}" text-anchor="middle" font-weight="700">${esc(yLabel)}</text>`;
  if (xLabel) svg += `<text x="${fmt(gx + (w - axisW) / 2)}" y="${fmt(y + gridH + 36)}" font-size="12.5" fill="${C.navy}" text-anchor="middle" font-weight="700">${esc(xLabel)}</text>`;
  return { svg, h: gridH + 44 };
}

/** A tick-box checklist, optionally grouped. groups: [{ title, items: [] }] */
export function checklist({ x, y, w, groups, fs = 12.5, cols = 1, accent = C.green }) {
  const colW = (w - 18 * (cols - 1)) / cols;
  const colH = new Array(cols).fill(0);
  let svg = '';
  groups.forEach((g, gi) => {
    const col = cols === 1 ? 0 : gi % cols;
    const gx = x + col * (colW + 18);
    let cy = y + colH[col];
    if (g.title) {
      const t = para(gx, cy, colW, g.title.toUpperCase(), { fs: 10.5, bold: true, fill: accent });
      svg += t.svg + line(gx, cy + t.h + 4, gx + colW, cy + t.h + 4, { stroke: C.line, sw: 1 });
      cy += t.h + 12;
    }
    g.items.forEach((it) => {
      const t = para(gx + 30, cy + 2, colW - 30, it, { fs, lh: 1.3 });
      const rowH = Math.max(24, t.h + 4);
      svg += rect(gx, cy + (rowH - 20) / 2, 20, 20, { fill: C.white, stroke: accent, sw: 2, r: 5 });
      svg += icon('check', gx + 10, cy + rowH / 2, 13, accent);
      svg += para(gx + 30, cy + (rowH - t.h) / 2 - 1, colW - 30, it, { fs, lh: 1.3 }).svg;
      cy += rowH + 6;
    });
    colH[col] = cy - y + 8;
  });
  return { svg, h: Math.max(...colH) };
}
