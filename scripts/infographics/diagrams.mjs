// Diagram builders for the unit-page infographics: badge rows, hub-and-spoke, rings, Porter, Kotter.
import { C, para, rect, line, pill, arrowDef, esc } from './lib.mjs';

const fmt = (n) => Number(n.toFixed(1));

/** A centred, wrapping row of badges. items: { k?, v, fill?, fg? } */
export function badgeRow({ x, y, w, items }) {
  const sized = items.map((it) => {
    const tw = Math.max((it.k ? it.k.length * 6.4 : 0), it.v.length * 8.2);
    return { ...it, bw: Math.min(w, tw + 30), bh: it.k ? 46 : 36 };
  });
  const rows = [];
  let cur = [];
  let curW = 0;
  sized.forEach((it) => {
    if (cur.length && curW + it.bw + 10 > w) {
      rows.push(cur);
      cur = [];
      curW = 0;
    }
    cur.push(it);
    curW += it.bw + (cur.length > 1 ? 10 : 0);
  });
  if (cur.length) rows.push(cur);
  let svg = '';
  let cy = y;
  rows.forEach((row) => {
    const total = row.reduce((a, b) => a + b.bw, 0) + 10 * (row.length - 1);
    let cx = x + (w - total) / 2;
    const rh = Math.max(...row.map((b) => b.bh));
    row.forEach((b) => {
      const fill = b.fill || C.white;
      const fg = b.fg || C.navy;
      svg += rect(cx, cy, b.bw, rh, { fill, stroke: b.fill ? 'none' : C.line, sw: 1.5, r: 12 });
      if (b.k) {
        svg += `<text x="${fmt(cx + b.bw / 2)}" y="${fmt(cy + 16)}" font-size="9.5" font-weight="700" fill="${b.fill ? 'rgba(255,255,255,0.8)' : C.mute}" text-anchor="middle" letter-spacing="0.6">${esc(b.k.toUpperCase())}</text>`;
        svg += `<text x="${fmt(cx + b.bw / 2)}" y="${fmt(cy + 34)}" font-size="14" font-weight="700" fill="${fg}" text-anchor="middle">${esc(b.v)}</text>`;
      } else {
        svg += `<text x="${fmt(cx + b.bw / 2)}" y="${fmt(cy + rh / 2 + 5)}" font-size="14" font-weight="700" fill="${fg}" text-anchor="middle">${esc(b.v)}</text>`;
      }
      cx += b.bw + 10;
    });
    cy += rh + 10;
  });
  return { svg, h: cy - y - 10 };
}

/** A centre node joined to surrounding nodes (all interconnected). */
export function hubSpoke({ x, y, w, h, center, nodes, nodeW = 176 }) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const rx = w / 2 - nodeW / 2 - 6;
  const ry = h / 2 - 34;
  const pts = nodes.map((n, i) => {
    const a = (-90 + (360 / nodes.length) * i) * (Math.PI / 180);
    return { ...n, px: cx + rx * Math.cos(a), py: cy + ry * Math.sin(a) };
  });
  let svg = '';
  pts.forEach((p, i) => {
    const q = pts[(i + 1) % pts.length];
    svg += line(p.px, p.py, q.px, q.py, { stroke: C.line, sw: 2.5, dash: '6 5' });
  });
  pts.forEach((p) => {
    svg += line(cx, cy, p.px, p.py, { stroke: '#94a3b8', sw: 2.5 });
  });
  svg += `<circle cx="${fmt(cx)}" cy="${fmt(cy)}" r="64" fill="${C.navy}"/>`;
  svg += para(cx, cy - 22, 104, center, { fs: 12.5, bold: true, fill: '#fff', anchor: 'middle', lh: 1.25 }).svg;
  pts.forEach((p, i) => {
    const t = para(0, 0, nodeW - 20, p.title, { fs: 12, bold: true, lh: 1.25 });
    const bh = Math.max(40, t.h + 20);
    svg += rect(p.px - nodeW / 2, p.py - bh / 2, nodeW, bh, { fill: p.fill || C.white, stroke: p.stroke || C.navy2, sw: 2, r: 12 });
    svg += para(p.px, p.py - t.h / 2 - 2, nodeW - 20, p.title, { fs: 12, bold: true, fill: p.fg || C.navy, anchor: 'middle', lh: 1.25 }).svg;
  });
  return { svg, h };
}

/** Concentric rings (outer to inner) with a description panel for each ring. */
export function rings({ x, y, w, rings: ringDefs, note }) {
  const cx = x + 170;
  const cy = y + 172;
  const radii = [164, 112, 60];
  let svg = '';
  ringDefs.forEach((r, i) => {
    svg += `<circle cx="${cx}" cy="${cy}" r="${radii[i]}" fill="${r.fill}" stroke="${r.stroke}" stroke-width="2"/>`;
  });
  ringDefs.forEach((r, i) => {
    const ty = i === 2 ? cy - 12 : cy - radii[i] + 22;
    svg += para(cx, ty, 120, r.name, { fs: i === 2 ? 11.5 : 13, bold: true, fill: r.fg, anchor: 'middle', lh: 1.2 }).svg;
  });
  const px = x + 362;
  const pw = w - 362;
  let py = y;
  ringDefs.forEach((r) => {
    const t = para(px + 18, py + 10, pw - 30, r.name, { fs: 13, bold: true, fill: r.fg });
    const sub = para(px + 18, py + 12 + t.h, pw - 30, r.sub, { fs: 11, fill: C.mute, italic: true });
    const body = para(px + 18, py + 14 + t.h + sub.h, pw - 30, r.items, { fs: 11.5 });
    const bh = 18 + t.h + sub.h + body.h + 10;
    svg += rect(px, py, pw, bh, { fill: C.white, stroke: C.line, sw: 1.5, r: 10 }) + rect(px, py, 8, bh, { fill: r.stroke, r: 0 });
    svg += t.svg + sub.svg + body.svg;
    py += bh + 10;
  });
  const ringsH = 344;
  const panelH = py - y;
  const topH = Math.max(ringsH, panelH);
  const ny = y + topH + 8;
  const n = para(x + 14, ny + 10, w - 28, note, { fs: 12, bold: true, fill: C.navy });
  svg += rect(x, ny, w, n.h + 20, { fill: C.tealBg, stroke: '#5eead4', sw: 1.5, r: 10 }) + n.svg;
  return { svg, h: topH + 8 + n.h + 20 };
}

/** Porter's Five Forces: rivalry at the centre, four forces around it, arrows inward. */
export function porter({ x, y, w, forces, note }) {
  const bw = 214;
  const mid = x + w / 2;
  const boxFor = (f, bx, by, fill, stroke, heavy) => {
    const t = para(bx + 12, by + 10, bw - 24, f.title, { fs: 12.5, bold: true, fill: heavy ? '#fff' : C.navy, lh: 1.2 });
    const d = para(bx + 12, by + 12 + t.h, bw - 24, f.points, { fs: 10.5, fill: heavy ? 'rgba(255,255,255,0.9)' : C.ink, lh: 1.3 });
    const gauge = 22;
    const bh = 20 + t.h + d.h + gauge + 8;
    return { t, d, bh, bx, by, fill, stroke, heavy };
  };
  const mk = (f, bx, by, fill, stroke, heavy) => boxFor(f, bx, by, fill, stroke, heavy);
  const top = mk(forces.top, mid - bw / 2, y, C.white, C.blue, false);
  const rowY = y + top.bh + 34;
  const left = mk(forces.left, x, rowY, C.white, C.teal, false);
  const centre = mk(forces.centre, mid - bw / 2, rowY, C.navy, C.navy, true);
  const right = mk(forces.right, x + w - bw, rowY, C.white, C.amber, false);
  const rowH = Math.max(left.bh, centre.bh, right.bh);
  const botY = rowY + rowH + 34;
  const bottom = mk(forces.bottom, mid - bw / 2, botY, C.white, C.purple, false);
  let svg = '';
  svg += `<defs>${arrowDef('pf-arrow', C.mute)}</defs>`;
  const arrows = [
    [mid, y + top.bh, mid, rowY - 4],
    [mid, botY, mid, rowY + rowH + 4],
    [x + bw, rowY + rowH / 2, mid - bw / 2 - 4, rowY + rowH / 2],
    [x + w - bw, rowY + rowH / 2, mid + bw / 2 + 4, rowY + rowH / 2],
  ];
  arrows.forEach(([x1, y1, x2, y2]) => {
    svg += line(x1, y1, x2, y2, { stroke: C.mute, sw: 2.5, marker: 'pf-arrow' });
  });
  const full = (b, f, bh) => {
    svg += rect(b.bx, b.by, bw, bh, { fill: b.fill, stroke: b.stroke, sw: 2.5, r: 12 });
    const t = para(b.bx + 12, b.by + 10, bw - 24, f.title, { fs: 12.5, bold: true, fill: b.heavy ? '#fff' : C.navy, lh: 1.2 });
    const d = para(b.bx + 12, b.by + 12 + t.h, bw - 24, f.points, { fs: 10.5, fill: b.heavy ? 'rgba(255,255,255,0.9)' : C.ink, lh: 1.3 });
    svg += t.svg + d.svg;
    const gy = b.by + bh - 20;
    const lc = b.heavy ? '#fff' : C.mute;
    svg += `<text x="${fmt(b.bx + 12)}" y="${fmt(gy + 4)}" font-size="9.5" font-weight="700" fill="${lc}">PRESSURE</text>`;
    [['High', 70], ['Low', 118]].forEach(([lab, dx]) => {
      svg += `<circle cx="${fmt(b.bx + dx)}" cy="${fmt(gy)}" r="5" fill="none" stroke="${lc}" stroke-width="1.8"/>`;
      svg += `<text x="${fmt(b.bx + dx + 9)}" y="${fmt(gy + 4)}" font-size="10" fill="${lc}">${lab}</text>`;
    });
  };
  full(top, forces.top, top.bh);
  full(left, forces.left, rowH);
  full(centre, forces.centre, rowH);
  full(right, forces.right, rowH);
  full(bottom, forces.bottom, bottom.bh);
  const ny = botY + bottom.bh + 16;
  const n = para(x + 14, ny + 10, w - 28, note, { fs: 12, bold: true, fill: C.navy });
  svg += rect(x, ny, w, n.h + 20, { fill: C.tealBg, stroke: '#5eead4', sw: 1.5, r: 10 }) + n.svg;
  return { svg, h: ny + n.h + 20 - y };
}

/** Eight sequential steps in two rows, with critique callouts under selected steps. */
export function kotter({ x, y, w, steps: stepDefs, callouts, note }) {
  const gap = 14;
  const bw = (w - 3 * gap) / 4;
  const bh = 76;
  const calloutW = bw;
  const ch = Math.max(
    ...Object.values(callouts).map((t) => para(0, 0, calloutW - 20, t, { fs: 10.5, lh: 1.3 }).h),
  ) + 34;
  const row1 = y;
  const row2 = row1 + bh + 14 + ch + 36;
  let svg = `<defs>${arrowDef('kt-arrow', C.navy)}</defs>`;
  const boxAt = (i) => {
    const col = i % 4;
    const by = i < 4 ? row1 : row2;
    return { bx: x + col * (bw + gap), by };
  };
  stepDefs.forEach((s, i) => {
    const { bx, by } = boxAt(i);
    svg += rect(bx, by, bw, bh, { fill: C.navy, r: 12 });
    svg += `<circle cx="${fmt(bx + 22)}" cy="${fmt(by + 22)}" r="13" fill="#fff"/>`;
    svg += `<text x="${fmt(bx + 22)}" y="${fmt(by + 27)}" font-size="13" font-weight="700" fill="${C.navy}" text-anchor="middle">${i + 1}</text>`;
    svg += para(bx + 42, by + 10, bw - 52, s, { fs: 12, bold: true, fill: '#fff', lh: 1.25 }).svg;
    if (i % 4 !== 3) svg += line(bx + bw + 1, by + bh / 2, bx + bw + gap - 1, by + bh / 2, { stroke: C.navy, sw: 2.5, marker: 'kt-arrow' });
  });
  const b4 = boxAt(3);
  const b5 = boxAt(4);
  const midY = row2 - 16;
  svg += `<path d="M ${fmt(b4.bx + bw / 2)} ${fmt(b4.by + bh)} V ${fmt(midY)} H ${fmt(b5.bx + bw / 2)} V ${fmt(b5.by - 3)}" fill="none" stroke="${C.navy}" stroke-width="2.5" marker-end="url(#kt-arrow)"/>`;
  Object.entries(callouts).forEach(([stepNo, text]) => {
    const { bx, by } = boxAt(Number(stepNo) - 1);
    const cy = by + bh + 12;
    svg += line(bx + bw / 2, by + bh, bx + bw / 2, cy, { stroke: C.amber, sw: 2 });
    svg += rect(bx, cy, calloutW, ch, { fill: C.amberBg, stroke: '#f59e0b', sw: 1.5, r: 10 });
    svg += pill(bx + 8, cy + 8, 'L7 CRITIQUE', { fs: 9, fill: C.amber, h: 18 }).svg;
    svg += para(bx + 10, cy + 30, calloutW - 20, text, { fs: 10.5, fill: '#78350f', lh: 1.3 }).svg;
  });
  const ny = row2 + bh + 14 + ch + 14;
  const n = para(x + 14, ny + 10, w - 28, note, { fs: 12, bold: true, fill: C.navy });
  svg += rect(x, ny, w, n.h + 20, { fill: C.tealBg, stroke: '#5eead4', sw: 1.5, r: 10 }) + n.svg;
  return { svg, h: ny + n.h + 20 - y };
}
