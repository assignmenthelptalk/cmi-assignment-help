import { writeFileSync } from 'fs';
import { resolve } from 'path';

const OUT_DIR = resolve('public/cmi-headers');

const units = [
  // Level 3 — Screenshot_6 + Screenshot_8
  { file: 'cmi-level-3-unit-301-principles-management-leadership-header', line1: 'CMI UNIT 301', line2: 'PRINCIPLES OF MANAGEMENT & LEADERSHIP', sub: 'Level 3 Assignment Help', img1: 'Screenshot_6.png', img2: 'Screenshot_8.png' },
  { file: 'cmi-level-3-unit-302-managing-team-achieve-results-header', line1: 'CMI UNIT 302', line2: 'MANAGING A TEAM TO ACHIEVE RESULTS', sub: 'Level 3 Assignment Help', img1: 'Screenshot_6.png', img2: 'Screenshot_8.png' },
  { file: 'cmi-level-3-unit-303-managing-individuals-effective-workplace-header', line1: 'CMI UNIT 303', line2: 'MANAGING INDIVIDUALS IN THE WORKPLACE', sub: 'Level 3 Assignment Help', img1: 'Screenshot_6.png', img2: 'Screenshot_8.png' },
  { file: 'cmi-level-3-unit-304-principles-communication-workplace-header', line1: 'CMI UNIT 304', line2: 'PRINCIPLES OF COMMUNICATION', sub: 'Level 3 Assignment Help', img1: 'Screenshot_6.png', img2: 'Screenshot_8.png' },
  { file: 'cmi-level-3-unit-305-building-stakeholder-relationships-header', line1: 'CMI UNIT 305', line2: 'BUILDING STAKEHOLDER RELATIONSHIPS', sub: 'Level 3 Assignment Help', img1: 'Screenshot_8.png', img2: 'Screenshot_6.png' },
  { file: 'cmi-level-3-unit-306-principles-coaching-mentoring-header', line1: 'CMI UNIT 306', line2: 'PRINCIPLES OF COACHING & MENTORING', sub: 'Level 3 Assignment Help', img1: 'Screenshot_8.png', img2: 'Screenshot_6.png' },
  { file: 'cmi-level-3-unit-307-developing-knowledge-skills-abilities-header', line1: 'CMI UNIT 307', line2: 'DEVELOPING KNOWLEDGE, SKILLS & ABILITIES', sub: 'Level 3 Assignment Help', img1: 'Screenshot_6.png', img2: 'Screenshot_8.png' },
  { file: 'cmi-level-3-unit-308-understanding-innovation-change-header', line1: 'CMI UNIT 308', line2: 'UNDERSTANDING INNOVATION & CHANGE', sub: 'Level 3 Assignment Help', img1: 'Screenshot_8.png', img2: 'Screenshot_6.png' },
  { file: 'cmi-level-3-unit-309-leading-equality-diversity-inclusion-header', line1: 'CMI UNIT 309', line2: 'LEADING EQUALITY, DIVERSITY & INCLUSION', sub: 'Level 3 Assignment Help', img1: 'Screenshot_6.png', img2: 'Screenshot_8.png' },
  { file: 'cmi-level-3-unit-310-understanding-finance-workplace-header', line1: 'CMI UNIT 310', line2: 'UNDERSTANDING FINANCE IN THE WORKPLACE', sub: 'Level 3 Assignment Help', img1: 'Screenshot_8.png', img2: 'Screenshot_6.png' },
  { file: 'cmi-level-3-unit-311-contributing-delivery-project-header', line1: 'CMI UNIT 311', line2: 'CONTRIBUTING TO PROJECT DELIVERY', sub: 'Level 3 Assignment Help', img1: 'Screenshot_6.png', img2: 'Screenshot_8.png' },
  { file: 'cmi-level-3-unit-312-managing-daily-activities-results-header', line1: 'CMI UNIT 312', line2: 'MANAGING DAILY ACTIVITIES FOR RESULTS', sub: 'Level 3 Assignment Help', img1: 'Screenshot_8.png', img2: 'Screenshot_6.png' },

  // Level 4 — Screenshot_5 + Screenshot_7
  { file: 'cmi-level-4-unit-401-managerial-styles-behaviours-header', line1: 'CMI UNIT 401', line2: 'MANAGERIAL STYLES & BEHAVIOURS', sub: 'Level 4 Assignment Help', img1: 'Screenshot_5.png', img2: 'Screenshot_7.png' },
  { file: 'cmi-level-4-unit-402-managing-stakeholders-expectations-header', line1: 'CMI UNIT 402', line2: 'MANAGING STAKEHOLDERS & EXPECTATIONS', sub: 'Level 4 Assignment Help', img1: 'Screenshot_7.png', img2: 'Screenshot_5.png' },
  { file: 'cmi-level-4-unit-403-organisational-culture-values-behaviour-header', line1: 'CMI UNIT 403', line2: 'ORGANISATIONAL CULTURE, VALUES & BEHAVIOUR', sub: 'Level 4 Assignment Help', img1: 'Screenshot_5.png', img2: 'Screenshot_7.png' },
  { file: 'cmi-level-4-unit-404-planning-managing-monitoring-budgets-header', line1: 'CMI UNIT 404', line2: 'PLANNING, MANAGING & MONITORING BUDGETS', sub: 'Level 4 Assignment Help', img1: 'Screenshot_7.png', img2: 'Screenshot_5.png' },
  { file: 'cmi-level-4-unit-405-developing-maintaining-networks-header', line1: 'CMI UNIT 405', line2: 'DEVELOPING & MAINTAINING NETWORKS', sub: 'Level 4 Assignment Help', img1: 'Screenshot_5.png', img2: 'Screenshot_7.png' },
  { file: 'cmi-level-4-unit-406-management-leadership-influencing-skills-header', line1: 'CMI UNIT 406', line2: 'MANAGEMENT & LEADERSHIP INFLUENCING SKILLS', sub: 'Level 4 Assignment Help', img1: 'Screenshot_7.png', img2: 'Screenshot_5.png' },
  { file: 'cmi-level-4-unit-407-managing-data-information-header', line1: 'CMI UNIT 407', line2: 'MANAGING DATA & INFORMATION', sub: 'Level 4 Assignment Help', img1: 'Screenshot_5.png', img2: 'Screenshot_7.png' },
  { file: 'cmi-level-4-unit-408-management-of-risk-header', line1: 'CMI UNIT 408', line2: 'MANAGEMENT OF RISK', sub: 'Level 4 Assignment Help', img1: 'Screenshot_7.png', img2: 'Screenshot_5.png' },
  { file: 'cmi-level-4-unit-409-managing-quality-header', line1: 'CMI UNIT 409', line2: 'MANAGING QUALITY', sub: 'Level 4 Assignment Help', img1: 'Screenshot_5.png', img2: 'Screenshot_7.png' },
  { file: 'cmi-level-4-unit-410-managing-change-header', line1: 'CMI UNIT 410', line2: 'MANAGING CHANGE', sub: 'Level 4 Assignment Help', img1: 'Screenshot_7.png', img2: 'Screenshot_5.png' },
  { file: 'cmi-level-4-unit-411-managing-recruitment-header', line1: 'CMI UNIT 411', line2: 'MANAGING RECRUITMENT', sub: 'Level 4 Assignment Help', img1: 'Screenshot_5.png', img2: 'Screenshot_7.png' },

  // Level 6 — Screenshot_3 + Screenshot_4
  { file: 'cmi-level-6-unit-601-professional-management-leadership-practice-header', line1: 'CMI UNIT 601', line2: 'PROFESSIONAL MANAGEMENT & LEADERSHIP PRACTICE', sub: 'Level 6 Assignment Help', img1: 'Screenshot_3.png', img2: 'Screenshot_4.png' },
  { file: 'cmi-level-6-unit-602-developing-managing-leading-individuals-teams-header', line1: 'CMI UNIT 602', line2: 'DEVELOPING, MANAGING & LEADING TEAMS', sub: 'Level 6 Assignment Help', img1: 'Screenshot_4.png', img2: 'Screenshot_3.png' },
  { file: 'cmi-level-6-unit-603-organisational-culture-header', line1: 'CMI UNIT 603', line2: 'ORGANISATIONAL CULTURE', sub: 'Level 6 Assignment Help', img1: 'Screenshot_3.png', img2: 'Screenshot_4.png' },
  { file: 'cmi-level-6-unit-604-strategic-programme-project-management-header', line1: 'CMI UNIT 604', line2: 'STRATEGIC PROGRAMME & PROJECT MANAGEMENT', sub: 'Level 6 Assignment Help', img1: 'Screenshot_4.png', img2: 'Screenshot_3.png' },
  { file: 'cmi-level-6-unit-605-innovation-and-change-header', line1: 'CMI UNIT 605', line2: 'INNOVATION AND CHANGE', sub: 'Level 6 Assignment Help', img1: 'Screenshot_3.png', img2: 'Screenshot_4.png' },
  { file: 'cmi-level-6-unit-606-finance-strategic-leaders-header', line1: 'CMI UNIT 606', line2: 'FINANCE FOR STRATEGIC LEADERS', sub: 'Level 6 Assignment Help', img1: 'Screenshot_4.png', img2: 'Screenshot_3.png' },
  { file: 'cmi-level-6-unit-607-procurement-purchasing-contracting-header', line1: 'CMI UNIT 607', line2: 'PROCUREMENT, PURCHASING & CONTRACTING', sub: 'Level 6 Assignment Help', img1: 'Screenshot_3.png', img2: 'Screenshot_4.png' },
  { file: 'cmi-level-6-unit-608-strategic-csr-sustainability-header', line1: 'CMI UNIT 608', line2: 'STRATEGIC CSR & SUSTAINABILITY', sub: 'Level 6 Assignment Help', img1: 'Screenshot_4.png', img2: 'Screenshot_3.png' },
  { file: 'cmi-level-6-unit-609-leading-equality-diversity-inclusion-header', line1: 'CMI UNIT 609', line2: 'LEADING EQUALITY, DIVERSITY & INCLUSION', sub: 'Level 6 Assignment Help', img1: 'Screenshot_3.png', img2: 'Screenshot_4.png' },
  { file: 'cmi-level-6-unit-610-principles-practices-policy-development-header', line1: 'CMI UNIT 610', line2: 'PRINCIPLES & PRACTICES OF POLICY DEVELOPMENT', sub: 'Level 6 Assignment Help', img1: 'Screenshot_4.png', img2: 'Screenshot_3.png' },
  { file: 'cmi-level-6-unit-611-strategic-knowledge-management-header', line1: 'CMI UNIT 611', line2: 'STRATEGIC KNOWLEDGE MANAGEMENT', sub: 'Level 6 Assignment Help', img1: 'Screenshot_3.png', img2: 'Screenshot_4.png' },
  { file: 'cmi-level-6-unit-612-coaching-skills-leaders-header', line1: 'CMI UNIT 612', line2: 'COACHING SKILLS FOR LEADERS', sub: 'Level 6 Assignment Help', img1: 'Screenshot_4.png', img2: 'Screenshot_3.png' },
  { file: 'cmi-level-6-unit-613-leading-quality-strategy-header', line1: 'CMI UNIT 613', line2: 'LEADING THE DEVELOPMENT OF A QUALITY STRATEGY', sub: 'Level 6 Assignment Help', img1: 'Screenshot_3.png', img2: 'Screenshot_4.png' },
  { file: 'cmi-level-6-unit-614-personal-professional-development-header', line1: 'CMI UNIT 614', line2: 'PERSONAL & PROFESSIONAL DEVELOPMENT', sub: 'Level 6 Assignment Help', img1: 'Screenshot_4.png', img2: 'Screenshot_3.png' },
  { file: 'cmi-level-6-unit-615-strategic-healthcare-leadership-header', line1: 'CMI UNIT 615', line2: 'STRATEGIC HEALTHCARE LEADERSHIP', sub: 'Level 6 Assignment Help', img1: 'Screenshot_3.png', img2: 'Screenshot_4.png' },
  { file: 'cmi-level-6-unit-616-mental-health-wellbeing-workplace-header', line1: 'CMI UNIT 616', line2: 'MENTAL HEALTH & WELLBEING AT WORK', sub: 'Level 6 Assignment Help', img1: 'Screenshot_4.png', img2: 'Screenshot_3.png' },
];

function makeHtml(line1, line2, sub, img1, img2) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 960px; height: 480px; overflow: hidden; font-family: sans-serif; background: #0a1628; }
  .header { position: relative; width: 960px; height: 480px; overflow: hidden; }
  .bg, .grid-container { position: absolute; inset: 0; }
  .grid-container { display: grid; gap: 2px; background: #1a2e4a; grid-template-columns: 1fr 1fr; }
  .grid-item { background-size: cover; background-position: center; filter: brightness(0.58) saturate(0.8); }
  .color-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,46,74,0.42) 0%, rgba(10,22,40,0.32) 100%); z-index: 3; }
  .border-frame { position: absolute; inset: 14px; border: 1px solid rgba(255,255,255,0.10); pointer-events: none; z-index: 5; }
  .title-panel {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: rgba(10, 20, 40, 0.88); padding: 32px 52px; backdrop-filter: blur(18px); z-index: 20;
    box-shadow: 0 28px 60px rgba(0,0,0,0.6); width: 82%; max-width: 680px; text-align: center;
    border: 1px solid rgba(255,255,255,0.06); border-top: 3px solid #1a2e4a;
  }
  .title-line1 { font-family: 'Cinzel', serif; font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.28em; margin-bottom: 7px; }
  .title-line2 { font-family: 'Cinzel', serif; font-size: 28px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.04em; line-height: 1.2; margin-bottom: 14px; }
  .subtitle { font-family: 'Cinzel', serif; font-size: 11.5px; font-weight: 400; color: rgba(37,211,102,0.9); text-transform: uppercase; letter-spacing: 0.22em; line-height: 1.5; }
  .logo-area { position: absolute; top: 34px; right: 36px; z-index: 25; color: white; text-align: right; }
  .logo-domain { font-family: 'Cinzel', serif; font-size: 8.5px; letter-spacing: 0.16em; color: rgba(255,255,255,0.5); border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 5px; margin-bottom: 3px; text-transform: uppercase; }
  .logo-tag { font-family: sans-serif; font-size: 7.5px; opacity: 0.35; letter-spacing: 0.1em; text-transform: uppercase; }
  .geo-pattern { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10; }
  .accent-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #25D366 0%, rgba(37,211,102,0.0) 100%); z-index: 25; }
</style>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
<div class="header">
  <div class="grid-container">
    <div class="grid-item" style="background-image: url('input-images/${img1}')"></div>
    <div class="grid-item" style="background-image: url('input-images/${img2}')"></div>
  </div>
  <div class="color-overlay"></div>
  <svg class="geo-pattern" xmlns="http://www.w3.org/2000/svg">
    <defs><pattern id="geo" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
      <polygon points="15,0 30,15 15,30 0,15" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="0.7"/>
      <circle cx="15" cy="15" r="1.2" fill="rgba(255,255,255,0.035)"/>
    </pattern></defs>
    <rect x="0" y="0" width="960" height="20" fill="url(#geo)"/>
    <rect x="0" y="460" width="960" height="20" fill="url(#geo)"/>
    <rect x="0" y="0" width="20" height="480" fill="url(#geo)"/>
    <rect x="940" y="0" width="20" height="480" fill="url(#geo)"/>
  </svg>
  <div class="border-frame"></div>
  <div class="title-panel">
    <div class="title-line1">${line1}</div>
    <div class="title-line2">${line2}</div>
    <div class="subtitle">${sub}</div>
  </div>
  <div class="logo-area">
    <div class="logo-domain">CMIassignmentsupport</div>
    <div class="logo-tag">.co.uk</div>
  </div>
  <div class="accent-bar"></div>
</div>
</body>
</html>`;
}

let count = 0;
for (const u of units) {
  const html = makeHtml(u.line1, u.line2, u.sub, u.img1, u.img2);
  writeFileSync(`${OUT_DIR}/${u.file}.html`, html, 'utf8');
  count++;
  process.stdout.write(`\r${count}/${units.length} — ${u.file}.html`);
}
console.log('\nDone.');
