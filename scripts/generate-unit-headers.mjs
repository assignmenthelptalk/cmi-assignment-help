import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const OUT_DIR = resolve('public/cmi-headers/webp');

const units = [
  // Level 3
  { file: 'cmi-level-3-unit-301-principles-management-leadership-header', line1: 'CMI UNIT 301', line2: 'PRINCIPLES OF MANAGEMENT\n& LEADERSHIP', sub: 'Level 3 Assignment Help' },
  { file: 'cmi-level-3-unit-302-managing-team-achieve-results-header', line1: 'CMI UNIT 302', line2: 'MANAGING A TEAM TO\nACHIEVE RESULTS', sub: 'Level 3 Assignment Help' },
  { file: 'cmi-level-3-unit-303-managing-individuals-effective-workplace-header', line1: 'CMI UNIT 303', line2: 'MANAGING INDIVIDUALS\nIN THE WORKPLACE', sub: 'Level 3 Assignment Help' },
  { file: 'cmi-level-3-unit-304-principles-communication-workplace-header', line1: 'CMI UNIT 304', line2: 'PRINCIPLES OF\nCOMMUNICATION', sub: 'Level 3 Assignment Help' },
  { file: 'cmi-level-3-unit-305-building-stakeholder-relationships-header', line1: 'CMI UNIT 305', line2: 'BUILDING STAKEHOLDER\nRELATIONSHIPS', sub: 'Level 3 Assignment Help' },
  { file: 'cmi-level-3-unit-306-principles-coaching-mentoring-header', line1: 'CMI UNIT 306', line2: 'PRINCIPLES OF\nCOACHING & MENTORING', sub: 'Level 3 Assignment Help' },
  { file: 'cmi-level-3-unit-307-developing-knowledge-skills-abilities-header', line1: 'CMI UNIT 307', line2: 'DEVELOPING KNOWLEDGE,\nSKILLS & ABILITIES', sub: 'Level 3 Assignment Help' },
  { file: 'cmi-level-3-unit-308-understanding-innovation-change-header', line1: 'CMI UNIT 308', line2: 'UNDERSTANDING\nINNOVATION & CHANGE', sub: 'Level 3 Assignment Help' },
  { file: 'cmi-level-3-unit-309-leading-equality-diversity-inclusion-header', line1: 'CMI UNIT 309', line2: 'LEADING EQUALITY,\nDIVERSITY & INCLUSION', sub: 'Level 3 Assignment Help' },
  { file: 'cmi-level-3-unit-310-understanding-finance-workplace-header', line1: 'CMI UNIT 310', line2: 'UNDERSTANDING FINANCE\nIN THE WORKPLACE', sub: 'Level 3 Assignment Help' },
  { file: 'cmi-level-3-unit-311-contributing-delivery-project-header', line1: 'CMI UNIT 311', line2: 'CONTRIBUTING TO\nPROJECT DELIVERY', sub: 'Level 3 Assignment Help' },
  { file: 'cmi-level-3-unit-312-managing-daily-activities-results-header', line1: 'CMI UNIT 312', line2: 'MANAGING DAILY\nACTIVITIES FOR RESULTS', sub: 'Level 3 Assignment Help' },

  // Level 4
  { file: 'cmi-level-4-unit-401-managerial-styles-behaviours-header', line1: 'CMI UNIT 401', line2: 'MANAGERIAL STYLES\n& BEHAVIOURS', sub: 'Level 4 Assignment Help' },
  { file: 'cmi-level-4-unit-402-managing-stakeholders-expectations-header', line1: 'CMI UNIT 402', line2: 'MANAGING STAKEHOLDERS\n& EXPECTATIONS', sub: 'Level 4 Assignment Help' },
  { file: 'cmi-level-4-unit-403-organisational-culture-values-behaviour-header', line1: 'CMI UNIT 403', line2: 'ORGANISATIONAL CULTURE,\nVALUES & BEHAVIOUR', sub: 'Level 4 Assignment Help' },
  { file: 'cmi-level-4-unit-404-planning-managing-monitoring-budgets-header', line1: 'CMI UNIT 404', line2: 'PLANNING, MANAGING\n& MONITORING BUDGETS', sub: 'Level 4 Assignment Help' },
  { file: 'cmi-level-4-unit-405-developing-maintaining-networks-header', line1: 'CMI UNIT 405', line2: 'DEVELOPING &\nMAINTAINING NETWORKS', sub: 'Level 4 Assignment Help' },
  { file: 'cmi-level-4-unit-406-management-leadership-influencing-skills-header', line1: 'CMI UNIT 406', line2: 'MANAGEMENT &\nLEADERSHIP INFLUENCING', sub: 'Level 4 Assignment Help' },
  { file: 'cmi-level-4-unit-407-managing-data-information-header', line1: 'CMI UNIT 407', line2: 'MANAGING DATA\n& INFORMATION', sub: 'Level 4 Assignment Help' },
  { file: 'cmi-level-4-unit-408-management-of-risk-header', line1: 'CMI UNIT 408', line2: 'MANAGEMENT\nOF RISK', sub: 'Level 4 Assignment Help' },
  { file: 'cmi-level-4-unit-409-managing-quality-header', line1: 'CMI UNIT 409', line2: 'MANAGING\nQUALITY', sub: 'Level 4 Assignment Help' },
  { file: 'cmi-level-4-unit-410-managing-change-header', line1: 'CMI UNIT 410', line2: 'MANAGING\nCHANGE', sub: 'Level 4 Assignment Help' },
  { file: 'cmi-level-4-unit-411-managing-recruitment-header', line1: 'CMI UNIT 411', line2: 'MANAGING\nRECRUITMENT', sub: 'Level 4 Assignment Help' },

  // Level 6
  { file: 'cmi-level-6-unit-601-professional-management-leadership-practice-header', line1: 'CMI UNIT 601', line2: 'PROFESSIONAL MANAGEMENT\n& LEADERSHIP PRACTICE', sub: 'Level 6 Assignment Help' },
  { file: 'cmi-level-6-unit-602-developing-managing-leading-individuals-teams-header', line1: 'CMI UNIT 602', line2: 'DEVELOPING, MANAGING\n& LEADING TEAMS', sub: 'Level 6 Assignment Help' },
  { file: 'cmi-level-6-unit-603-organisational-culture-header', line1: 'CMI UNIT 603', line2: 'ORGANISATIONAL\nCULTURE', sub: 'Level 6 Assignment Help' },
  { file: 'cmi-level-6-unit-604-strategic-programme-project-management-header', line1: 'CMI UNIT 604', line2: 'STRATEGIC PROGRAMME\n& PROJECT MANAGEMENT', sub: 'Level 6 Assignment Help' },
  { file: 'cmi-level-6-unit-605-innovation-and-change-header', line1: 'CMI UNIT 605', line2: 'INNOVATION\nAND CHANGE', sub: 'Level 6 Assignment Help' },
  { file: 'cmi-level-6-unit-606-finance-strategic-leaders-header', line1: 'CMI UNIT 606', line2: 'FINANCE FOR\nSTRATEGIC LEADERS', sub: 'Level 6 Assignment Help' },
  { file: 'cmi-level-6-unit-607-procurement-purchasing-contracting-header', line1: 'CMI UNIT 607', line2: 'PROCUREMENT,\nPURCHASING & CONTRACTING', sub: 'Level 6 Assignment Help' },
  { file: 'cmi-level-6-unit-608-strategic-csr-sustainability-header', line1: 'CMI UNIT 608', line2: 'STRATEGIC CSR\n& SUSTAINABILITY', sub: 'Level 6 Assignment Help' },
  { file: 'cmi-level-6-unit-609-leading-equality-diversity-inclusion-header', line1: 'CMI UNIT 609', line2: 'LEADING EQUALITY,\nDIVERSITY & INCLUSION', sub: 'Level 6 Assignment Help' },
  { file: 'cmi-level-6-unit-610-principles-practices-policy-development-header', line1: 'CMI UNIT 610', line2: 'PRINCIPLES &\nPRACTICES OF POLICY', sub: 'Level 6 Assignment Help' },
  { file: 'cmi-level-6-unit-611-strategic-knowledge-management-header', line1: 'CMI UNIT 611', line2: 'STRATEGIC KNOWLEDGE\nMANAGEMENT', sub: 'Level 6 Assignment Help' },
  { file: 'cmi-level-6-unit-612-coaching-skills-leaders-header', line1: 'CMI UNIT 612', line2: 'COACHING SKILLS\nFOR LEADERS', sub: 'Level 6 Assignment Help' },
  { file: 'cmi-level-6-unit-613-leading-quality-strategy-header', line1: 'CMI UNIT 613', line2: 'LEADING THE DEVELOPMENT\nOF A QUALITY STRATEGY', sub: 'Level 6 Assignment Help' },
  { file: 'cmi-level-6-unit-614-personal-professional-development-header', line1: 'CMI UNIT 614', line2: 'PERSONAL & PROFESSIONAL\nDEVELOPMENT', sub: 'Level 6 Assignment Help' },
  { file: 'cmi-level-6-unit-615-strategic-healthcare-leadership-header', line1: 'CMI UNIT 615', line2: 'STRATEGIC HEALTHCARE\nLEADERSHIP', sub: 'Level 6 Assignment Help' },
  { file: 'cmi-level-6-unit-616-mental-health-wellbeing-workplace-header', line1: 'CMI UNIT 616', line2: 'MENTAL HEALTH &\nWELLBEING AT WORK', sub: 'Level 6 Assignment Help' },
];

function makeSvg(line1, line2, sub) {
  // Split multiline text into tspan elements
  const line2Parts = line2.split('\n');
  const lineHeight = 52;
  const baseY = line2Parts.length === 1 ? 238 : 218;

  const line2Tspans = line2Parts.map((part, i) =>
    `<tspan x="480" dy="${i === 0 ? 0 : lineHeight}">${escXml(part)}</tspan>`
  ).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="480" viewBox="0 0 960 480">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d1e35"/>
      <stop offset="100%" stop-color="#1a2e4a"/>
    </linearGradient>
    <pattern id="geo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <polygon points="20,0 40,20 20,40 0,20" fill="none" stroke="rgba(255,255,255,0.055)" stroke-width="0.8"/>
      <circle cx="20" cy="20" r="1.4" fill="rgba(255,255,255,0.04)"/>
    </pattern>
    <filter id="shadow">
      <feDropShadow dx="0" dy="8" stdDeviation="24" flood-color="rgba(0,0,0,0.65)"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="960" height="480" fill="url(#bg)"/>
  <!-- Subtle diagonal stripes -->
  <rect width="960" height="480" fill="url(#geo)" opacity="0.9"/>

  <!-- Left accent strip -->
  <rect x="0" y="0" width="6" height="480" fill="#25D366" opacity="0.7"/>

  <!-- Horizontal lines top/bottom -->
  <line x1="40" y1="28" x2="920" y2="28" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <line x1="40" y1="452" x2="920" y2="452" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <!-- Corner marks -->
  <polyline points="40,28 40,46" stroke="rgba(37,211,102,0.5)" stroke-width="1.5" fill="none"/>
  <polyline points="28,28 40,28" stroke="rgba(37,211,102,0.5)" stroke-width="1.5" fill="none"/>
  <polyline points="920,28 932,28" stroke="rgba(37,211,102,0.5)" stroke-width="1.5" fill="none"/>
  <polyline points="920,28 920,46" stroke="rgba(37,211,102,0.5)" stroke-width="1.5" fill="none"/>
  <polyline points="40,452 40,434" stroke="rgba(37,211,102,0.5)" stroke-width="1.5" fill="none"/>
  <polyline points="28,452 40,452" stroke="rgba(37,211,102,0.5)" stroke-width="1.5" fill="none"/>
  <polyline points="920,452 932,452" stroke="rgba(37,211,102,0.5)" stroke-width="1.5" fill="none"/>
  <polyline points="920,434 920,452" stroke="rgba(37,211,102,0.5)" stroke-width="1.5" fill="none"/>

  <!-- Title panel -->
  <rect x="140" y="148" width="680" height="${line2Parts.length === 1 ? 185 : 230}" rx="2"
        fill="rgba(6,14,28,0.82)" filter="url(#shadow)"/>
  <rect x="140" y="148" width="680" height="3" fill="#25D366"/>

  <!-- Unit label -->
  <text x="480" y="192" font-family="Georgia,serif" font-size="13" font-weight="400"
        fill="rgba(255,255,255,0.52)" text-anchor="middle" letter-spacing="6">
    ${escXml(line1)}
  </text>

  <!-- Main title -->
  <text x="480" y="${baseY}" font-family="Georgia,serif" font-size="38" font-weight="700"
        fill="#ffffff" text-anchor="middle" letter-spacing="1">
    ${line2Tspans}
  </text>

  <!-- Subtitle -->
  <text x="480" y="${baseY + line2Parts.length * lineHeight + 28}"
        font-family="Georgia,serif" font-size="13" font-weight="400"
        fill="rgba(37,211,102,0.85)" text-anchor="middle" letter-spacing="4">
    ${escXml(sub.toUpperCase())}
  </text>

  <!-- Domain -->
  <text x="910" y="462" font-family="Georgia,serif" font-size="9"
        fill="rgba(255,255,255,0.3)" text-anchor="end" letter-spacing="2">
    CMIASSIGNMENTSUPPORT.CO.UK
  </text>

  <!-- Bottom accent bar -->
  <rect x="0" y="476" width="960" height="4" fill="#25D366" opacity="0.6"/>
</svg>`;
}

function escXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function generate() {
  let done = 0;
  for (const u of units) {
    const svg = makeSvg(u.line1, u.line2, u.sub);
    const outPath = `${OUT_DIR}/${u.file}.webp`;
    await sharp(Buffer.from(svg))
      .resize(960, 480)
      .webp({ quality: 88 })
      .toFile(outPath);
    done++;
    process.stdout.write(`\r${done}/${units.length} — ${u.file}.webp`);
  }
  console.log('\nDone.');
}

generate().catch(e => { console.error(e); process.exit(1); });
