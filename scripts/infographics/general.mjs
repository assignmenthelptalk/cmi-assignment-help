// Infographics for the homepage, service pages, level hubs and guides.
import { C, doc, para, rect, line, icon, arrowDef, steps, columns, table, checklist, esc } from './lib.mjs';

const SITE = 'cmiassignmentsupport.co.uk';

const processSteps = (fifthTitle, fifthSub, draftSub) => [
  { icon: 'chat', title: 'WhatsApp brief', sub: 'Send your unit, brief, word count and deadline' },
  { icon: 'clock', title: 'Quote within 1 hour', sub: 'A fixed price and turnaround date' },
  { icon: 'person', title: 'Writer assigned', sub: 'Matched to your level and unit' },
  { icon: 'doc', title: 'Draft delivered', sub: draftSub },
  { icon: 'check', title: fifthTitle, sub: fifthSub, fill: C.green },
];

const levelSelector = () =>
  doc({
    title: 'Find Your CMI Level',
    subtitle: 'Assignment help for every CMI qualification from Level 3 to Level 7',
    footer: `${SITE} · CMI assignment help by level`,
    body: ({ x, y, w }) =>
      columns({
        x,
        y,
        w,
        gap: 10,
        fs: 11,
        headFs: 16,
        cols: [
          { head: 'Level 3', sub: 'First Line Management', fill: C.teal, rows: [{ label: 'Units covered', text: '12 units', bold: true }, { label: 'Sizes', text: 'Award, Certificate, Diploma' }] },
          { head: 'Level 4', sub: 'Management and Leadership', fill: C.blue, rows: [{ label: 'Units covered', text: '11 units', bold: true }, { label: 'Sizes', text: 'Award, Certificate, Diploma' }] },
          { head: 'Level 5', sub: 'Management and Leadership', fill: C.green, rows: [{ label: 'Units covered', text: '25 units', bold: true }, { label: 'Sizes', text: 'Award, Certificate, Diploma' }] },
          { head: 'Level 6', sub: 'Professional Management and Leadership', fill: C.amber, rows: [{ label: 'Units covered', text: '16 units', bold: true }, { label: 'Sizes', text: 'Award, Certificate, Diploma' }] },
          { head: 'Level 7', sub: 'Strategic Management and Leadership', fill: C.purple, rows: [{ label: 'Units covered', text: '17 units', bold: true }, { label: 'Sizes', text: 'Award, Certificate, Diploma' }] },
        ],
      }),
  });

const qualStructure = (level, headFill, rowsByQual, subs) => () =>
  doc({
    title: `CMI Level ${level}: Award, Certificate and Diploma`,
    subtitle: 'How much each qualification involves',
    footer: `${SITE} · CMI Level ${level} assignment help`,
    body: ({ x, y, w }) =>
      columns({
        x,
        y,
        w,
        cols: ['Award', 'Certificate', 'Diploma'].map((name, i) => ({
          head: name,
          sub: subs[i],
          fill: [headFill, headFill, C.navy][i],
          rows: rowsByQual[i],
        })),
      }),
  });

const qualJourney = () =>
  doc({
    title: 'CMI Qualification Journey: Award to Certificate to Diploma',
    subtitle: 'Each stage adds units, coursework and study time',
    footer: `${SITE} · CMI coursework help`,
    body: ({ x, y, w }) => {
      const s = steps({
        x,
        y,
        w,
        r: 26,
        fs: 14,
        items: [
          { icon: 'doc', title: 'Award', sub: '1 unit\n2,000–3,500 words\n3–6 months', fill: C.teal },
          { icon: 'doc', title: 'Certificate', sub: '2–3 units\n6,000–10,500 words\n6–12 months', fill: C.blue },
          { icon: 'check', title: 'Diploma', sub: '6–13 units\n15,000–40,000+ words\n12–24 months', fill: C.navy },
        ],
      });
      const n = para(x, y + s.h + 4, w, 'Unit counts and word counts are from the coursework requirements; study time is typical and varies by level. The Diploma is the full qualification.', { fs: 11, fill: C.mute, anchor: 'start' });
      return { svg: s.svg + n.svg, h: s.h + 4 + n.h };
    },
  });

const pricingTiers = () =>
  doc({
    title: 'CMI Assignment Help: Pricing Tiers by Level',
    subtitle: 'Level sets the tier. Word count and turnaround adjust the final quote',
    footer: `${SITE} · Affordable CMI assignment help`,
    body: ({ x, y, w }) => {
      const cols = columns({
        x,
        y,
        w,
        cols: [
          { head: 'Entry', sub: 'Levels 3 and 4', fill: C.teal, rows: [
            { label: 'Typical length', text: 'Level 3: 1,500–2,500 words\nLevel 4: 2,000–3,500 words' },
            { label: 'Format', text: 'Essay or short management report' },
            { label: 'Sources', text: 'Level 3: 5–8\nLevel 4: 8–10' },
          ] },
          { head: 'Mid-range', sub: 'Level 5', fill: C.blue, rows: [
            { label: 'Typical length', text: '3,000–5,000 words' },
            { label: 'Format', text: 'Management report with executive summary and SMART recommendations' },
            { label: 'Sources', text: '10–15, Evaluate and Justify depth' },
          ] },
          { head: 'Premium', sub: 'Level 7', fill: C.purple, rows: [
            { label: 'Typical length', text: '5,000–6,500 words per unit' },
            { label: 'Format', text: 'Strategic paper, Critically Analyse depth' },
            { label: 'Sources', text: '15–20 peer-reviewed, strategic leadership writers' },
          ] },
        ],
      });
      const by = y + cols.h + 14;
      const box = rect(x, by, w, 64, { fill: C.white, stroke: C.line, sw: 1.5, r: 10 });
      const t = para(x + 14, by + 10, w - 28, 'What affects the price: qualification level, word count and turnaround. Standard delivery (5–7 business days) is included. A 48-hour express surcharge applies. Quotes arrive within 1 hour in trading hours, with no obligation to proceed.', { fs: 11.5 });
      return { svg: cols.svg + box + t.svg, h: cols.h + 14 + 64 };
    },
  });

const gradeComparison = () =>
  doc({
    title: 'What Pass, Merit and Distinction Look Like',
    subtitle: 'How the standard rises across the three CMI outcomes',
    footer: `${SITE} · CMI assignment answers`,
    body: ({ x, y, w }) =>
      columns({
        x,
        y,
        w,
        cols: [
          { head: 'Pass', sub: 'Meets the standard at baseline', fill: C.blue, rows: [
            { label: 'Command verb', text: 'Addressed, though perhaps not at depth' },
            { label: 'Theory', text: 'Applied correctly' },
            { label: 'Referencing', text: 'Harvard present; word count within specification' },
          ] },
          { head: 'Merit', sub: 'Applied analysis, not description', fill: C.amber, rows: [
            { label: 'Command verb', text: 'Applied at the depth the assessor expects' },
            { label: 'Theory', text: 'Several theories cited, integrated and linked to the context' },
            { label: 'Referencing', text: 'Structured, evidenced argument; sources exceed the minimum' },
          ] },
          { head: 'Distinction', sub: 'Comprehensive critical engagement', fill: C.green, rows: [
            { label: 'Command verb', text: 'Limitations of the frameworks acknowledged' },
            { label: 'Theory', text: 'Tests whether the theories hold in this context' },
            { label: 'Recommendations', text: 'SMART, strategic and fully justified; 15 or more sources at Level 7' },
          ] },
        ],
      }),
  });

const tutoringFormats = () =>
  doc({
    title: 'CMI Assignment Tutoring: Three Formats',
    subtitle: 'You write your own work. The tutor plans, reviews or coaches',
    footer: `${SITE} · CMI assignment tutoring`,
    body: ({ x, y, w }) =>
      columns({
        x,
        y,
        w,
        cols: [
          { head: 'Assignment Planning', sub: 'Structure before you write', fill: C.teal, rows: [
            { label: 'Use it when', text: 'You are about to start the assignment' },
            { label: 'You send', text: 'Your unit brief and assignment question' },
            { label: 'You receive', text: 'A written outline: headings, notes on theories to apply, and word count distribution' },
          ] },
          { head: 'Draft Review', sub: 'Feedback on what you have written', fill: C.blue, rows: [
            { label: 'Use it when', text: 'You have a draft and want it checked against the criteria' },
            { label: 'You send', text: 'Your draft assignment' },
            { label: 'You receive', text: 'Written feedback on criteria met, command verb depth, referencing, structure and register' },
          ] },
          { head: 'Resubmission Coaching', sub: 'Getting past a referral', fill: C.amber, rows: [
            { label: 'Use it when', text: 'Your assessor has referred your work' },
            { label: 'You send', text: 'The assessor referral feedback' },
            { label: 'You receive', text: 'A targeted correction plan: what to rewrite, which angle to take, what evidence to add' },
          ] },
        ],
      }),
  });

const awardCertDiploma = () =>
  doc({
    title: 'Award vs Certificate vs Diploma',
    subtitle: 'The Diploma is the full qualification and the route to Chartered Manager',
    footer: `${SITE} · CMI qualification levels explained`,
    body: ({ x, y, w }) =>
      columns({
        x,
        y,
        w,
        cols: [
          { head: 'Award', sub: 'Smallest', fill: C.teal, rows: [
            { label: 'Units', text: '1 to 2' },
            { label: 'Typical time', text: '3 to 6 months' },
            { label: 'Best suited to', text: 'Targeted development in one area' },
            { label: 'Chartered Manager route', text: 'No', bold: true },
          ] },
          { head: 'Certificate', sub: 'Medium', fill: C.blue, rows: [
            { label: 'Units', text: '2 to 3' },
            { label: 'Typical time', text: '6 to 12 months' },
            { label: 'Best suited to', text: 'A broader foundation than an Award' },
            { label: 'Chartered Manager route', text: 'No', bold: true },
          ] },
          { head: 'Diploma', sub: 'Full qualification', fill: C.navy, rows: [
            { label: 'Units', text: 'The full unit set' },
            { label: 'Typical time', text: '12 to 24 months' },
            { label: 'Best suited to', text: 'Career development and professional recognition' },
            { label: 'Chartered Manager route', text: 'Yes, with experience', bold: true },
          ] },
        ],
      }),
  });

const levelsTable = () =>
  doc({
    title: 'CMI Levels 3 to 7 Compared',
    subtitle: 'How the standard changes as you move up',
    footer: `${SITE} · CMI qualification levels explained`,
    body: ({ x, y, w }) =>
      table({
        x,
        y,
        w,
        fs: 11,
        hfs: 11,
        pad: 7,
        cols: [
          { label: 'Level', w: 0.95 },
          { label: 'Who it suits', w: 1.7 },
          { label: 'Equivalent', w: 1.4 },
          { label: 'Command verb', w: 1.3 },
          { label: 'Words per unit', w: 1.1 },
          { label: 'Sources', w: 0.8 },
          { label: 'Format', w: 1.3 },
        ],
        rows: [
          ['Level 3', 'Team leaders and supervisors', 'A Level / BTEC National', { t: 'Identify, Describe, Explain', bold: true }, '1,500–2,500', '5–8', 'Essay or short report'],
          ['Level 4', 'Managers developing broader responsibility', 'HNC / Year 1 degree', { t: 'Explain, Discuss, Analyse', bold: true }, '2,000–3,500', '8–10', 'Essay or short report'],
          ['Level 5', 'Experienced team and department managers', 'HND / Foundation Degree', { t: 'Evaluate, Justify', bold: true }, '3,000–5,000', '10–12', 'Management report'],
          ['Level 6', 'Senior managers and heads of function', "Bachelor's (Honours)", { t: 'Critically Evaluate', bold: true }, '4,000–5,000', '12–15+', 'Extended management report'],
          ['Level 7', 'Directors and executives', "Master's degree", { t: 'Critically Analyse', bold: true }, '5,000–6,500', '15–20', 'Strategic paper'],
        ],
      }),
  });

const rqfLadder = () =>
  doc({
    title: 'CMI Levels on the Regulated Qualifications Framework',
    subtitle: 'CMI management qualifications sit at Levels 3 to 7, with Level 8 above',
    footer: `${SITE} · CMI qualification levels explained`,
    body: ({ x, y, w }) => {
      const rungs = [
        { n: 8, cmi: false, soft: true, name: 'Level 8', eq: 'Doctoral level. CMI also awards here, not covered on this site' },
        { n: 7, cmi: true, name: 'CMI Level 7', sub: 'Strategic Management and Leadership', eq: "Master's degree", fill: C.purple },
        { n: 6, cmi: true, name: 'CMI Level 6', sub: 'Professional Management and Leadership', eq: "Bachelor's degree (Honours)", fill: C.amber },
        { n: 5, cmi: true, name: 'CMI Level 5', sub: 'Management and Leadership', eq: 'HND / Foundation Degree / Year 2 undergraduate', fill: C.green },
        { n: 4, cmi: true, name: 'CMI Level 4', sub: 'Management and Leadership', eq: 'HNC / Year 1 undergraduate', fill: C.blue },
        { n: 3, cmi: true, name: 'CMI Level 3', sub: 'First Line Management', eq: 'A Level / BTEC National', fill: C.teal },
        { n: 2, cmi: false, name: 'Level 2', eq: 'No CMI management qualification at this level' },
        { n: 1, cmi: false, name: 'Level 1', eq: 'No CMI management qualification at this level' },
      ];
      const rh = 46;
      let svg = '';
      rungs.forEach((r, i) => {
        const ry = y + i * (rh + 6);
        const fill = r.cmi ? r.fill : C.greyBg;
        svg += rect(x, ry, w, rh, { fill: C.white, stroke: r.cmi ? fill : C.line, sw: r.cmi ? 2 : 1.5, r: 10 });
        svg += rect(x, ry, 150, rh, { fill, r: 10 });
        svg += rect(x + 120, ry, 30, rh, { fill, r: 0 });
        svg += `<text x="${x + 14}" y="${ry + 20}" font-size="14" font-weight="700" fill="${r.cmi ? '#fff' : C.mute}">${esc(r.name)}</text>`;
        svg += `<text x="${x + 14}" y="${ry + 36}" font-size="10.5" fill="${r.cmi ? 'rgba(255,255,255,0.85)' : C.grey}">RQF Level ${r.n}</text>`;
        const t1 = r.sub ? para(x + 166, ry + 6, w - 180, r.sub, { fs: 12, bold: true, fill: C.navy }) : { svg: '', h: 0 };
        const t2 = para(x + 166, ry + (r.sub ? 22 : 12), w - 180, r.eq, { fs: 11.5, fill: r.cmi ? C.ink : C.mute });
        svg += t1.svg + t2.svg;
      });
      return { svg, h: rungs.length * (rh + 6) };
    },
  });

const resubGrading = () =>
  doc({
    title: 'The CMI Grading System: Where a Refer Sits',
    subtitle: 'A Refer is a chance to revise and resubmit, not a permanent fail',
    footer: `${SITE} · CMI assignment resubmission`,
    defs: arrowDef('rg-arrow', C.amber),
    body: ({ x, y, w }) => {
      const bars = [
        { name: 'Distinction', d: 'Comprehensive critical engagement; limitations acknowledged', fill: '#b8860b', fg: '#fff', frac: 1 },
        { name: 'Merit', d: 'Applied analysis at the command verb depth expected', fill: '#6b7280', fg: '#fff', frac: 0.88 },
        { name: 'Pass', d: 'All Learning Outcomes met at baseline', fill: '#16a34a', fg: '#fff', frac: 0.76 },
        { name: 'Refer', d: 'Not yet met: revise and resubmit', fill: '#fcd34d', fg: '#78350f', frac: 0.64 },
      ];
      const bh = 54;
      const gap = 10;
      const maxW = w - 150;
      let svg = '';
      bars.forEach((b, i) => {
        const by = y + i * (bh + gap);
        const bw = maxW * b.frac;
        svg += rect(x, by, bw, bh, { fill: b.fill, r: 10 });
        svg += `<text x="${x + 16}" y="${by + 23}" font-size="15" font-weight="700" fill="${b.fg}">${b.name}</text>`;
        svg += para(x + 16, by + 27, bw - 28, b.d, { fs: 11.5, fill: b.fg }).svg;
      });
      const referY = y + 3 * (bh + gap) + bh / 2;
      const passBottom = y + 2 * (bh + gap) + bh;
      const ax = x + maxW * 0.64 + 26;
      svg += line(ax, referY, ax, passBottom + 4, { stroke: C.amber, sw: 3, dash: '7 5', marker: 'rg-arrow' });
      svg += para(ax + 14, referY - 18, w - maxW * 0.64 - 50, 'Resubmission opportunity: back towards Pass', { fs: 12, bold: true, fill: C.amber }).svg;
      const ny = y + 4 * (bh + gap) + 4;
      svg += rect(x, ny, w, 52, { fill: C.amberBg, stroke: '#fcd34d', sw: 1.5, r: 10 });
      svg += para(x + 14, ny + 10, w - 28, 'Most centres cap resubmissions at Pass grade, so aim for Merit or Distinction on the first submission. Policies vary: check with your centre.', { fs: 11.5, fill: '#78350f' }).svg;
      return { svg, h: 4 * (bh + gap) + 62 };
    },
  });

const resubTriggers = () =>
  doc({
    title: 'The Five Most Common Reasons for a CMI Refer',
    subtitle: 'Each one comes with the assessor wording to expect and the fix',
    footer: `${SITE} · CMI assignment resubmission`,
    body: ({ x, y, w }) => {
      const items = [
        ['Command verb not met', '"You have described X but have not evaluated it."', 'Re-read the verb for each criterion and check every section works at that depth.', C.red],
        ['Assessment criteria not addressed', '"Your response to AC2 does not address [specific element]."', 'Annotate your work against each AC and write any missing section.', C.amber],
        ['Insufficient evidence-based referencing', '"Your work needs stronger academic evidence."', 'Add in-text citations. At Level 7, add peer-reviewed journal sources.', C.blue],
        ['Framework applied rather than analysed', '"You have applied the model but have not evaluated the framework itself."', "Add each framework's limitations, assumptions and what a critic would argue.", C.purple],
        ['AC3 underdeveloped', '"AC3 requires further development."', 'Give AC3 roughly the same depth as AC1 and AC2.', C.teal],
      ];
      let svg = '';
      let cy = y;
      items.forEach(([title, quote, fix, color], i) => {
        const tw = w - 70;
        const t = para(x + 62, cy + 10, tw, title, { fs: 13.5, bold: true, fill: C.navy });
        const q = para(x + 62, cy + 12 + t.h, tw, quote, { fs: 11.5, fill: C.mute, italic: true });
        const f = para(x + 62, cy + 14 + t.h + q.h, tw, `Fix: ${fix}`, { fs: 11.5, fill: C.ink });
        const bh = 14 + t.h + q.h + f.h + 12;
        svg += rect(x, cy, w, bh, { fill: C.white, stroke: C.line, sw: 1.5, r: 10 });
        svg += rect(x, cy, 8, bh, { fill: color, r: 0 });
        svg += `<circle cx="${x + 36}" cy="${cy + bh / 2}" r="17" fill="${color}"/>`;
        svg += `<text x="${x + 36}" y="${cy + bh / 2 + 7}" font-size="19" font-weight="700" fill="#fff" text-anchor="middle">${i + 1}</text>`;
        svg += t.svg + q.svg + f.svg;
        cy += bh + 10;
      });
      return { svg, h: cy - y };
    },
  });

const resubChecklist = () =>
  doc({
    title: 'CMI Resubmission Checklist',
    subtitle: 'Ten steps from reading the feedback to final submission',
    footer: `${SITE} · CMI assignment resubmission`,
    body: ({ x, y, w }) =>
      checklist({
        x,
        y,
        w,
        groups: [
          { title: 'Before you start', items: ['Read the assessor feedback in full before changing anything', 'Map each piece of feedback to the place it applies in your submission'] },
          { title: 'While revising', items: ['Write any missing sections first', 'Revisit the command verb in every flagged section', 'Add peer-reviewed sources with in-text citations', 'Check every recommendation is SMART', 'Balance the word count across the criteria'] },
          { title: 'Before submitting', items: ['Confirm each gap in the feedback is now closed', 'Check Harvard referencing and the word count', "Check your centre's resubmission rules and grade cap"] },
        ],
      }),
  });

const submissionChecklist = () =>
  doc({
    title: 'Submission-Ready Checklist',
    subtitle: 'Included in every completed CMI assignment',
    footer: `${SITE} · Pay someone to do my CMI assignment`,
    body: ({ x, y, w }) =>
      checklist({
        x,
        y,
        w,
        cols: 2,
        groups: [
          { items: ['Title page', 'Table of contents', 'Executive summary', 'Correct structure'] },
          { items: ['Within the word count', 'Harvard referencing', 'Delivered as a .docx file'] },
        ],
      }),
  });

const l5vsL7Hub = () =>
  doc({
    title: 'CMI Level 5 vs Level 7',
    subtitle: 'Operational management report or strategic leadership paper',
    footer: `${SITE} · CMI Level 7 assignment help`,
    body: ({ x, y, w }) => {
      const unit = w / 5;
      const iconRow = 54;
      let svg = '';
      const c5 = x + unit + unit; // centre of column 2 (width 2 units)
      const c7 = x + unit + unit * 3;
      svg += `<circle cx="${c5}" cy="${y + 26}" r="24" fill="${C.green}"/>` + icon('users', c5, y + 26, 28, '#fff');
      svg += `<circle cx="${c7}" cy="${y + 26}" r="24" fill="${C.purple}"/>` + icon('building', c7, y + 26, 28, '#fff');
      const t = table({
        x,
        y: y + iconRow,
        w,
        fs: 11.5,
        cols: [
          { label: '', w: 1 },
          { label: 'Level 5: Management and Leadership (operational)', w: 2 },
          { label: 'Level 7: Strategic Management and Leadership (strategic)', w: 2 },
        ],
        colHeadFills: [C.navy, C.green, C.purple],
        rows: [
          ['Scope', 'Team, department or operational function', 'Organisation, sector or board'],
          ['Format', 'Management report: executive summary, analysis, SMART recommendations', 'Strategic paper: analysis, options evaluation and a strategic recommendation with governance implications'],
          ['Command verbs', 'Evaluate, Justify', 'Critically Analyse, Justify at strategic depth, Develop and Implement a Strategy'],
          ['Word count', '3,000–5,000 words per unit', '5,000–6,500 words per unit (Units 712 and 713: 8,000–12,000)'],
          ['Academic sources', '10–12: management textbooks and CMI publications', '15–20: peer-reviewed journals and empirical research'],
          ['Writer credential', 'Level 5 or Level 7 CMI-qualified writers', 'Strategic leader or director-level experience with CMI Level 7 or an MBA/MSc'],
        ],
      });
      svg += t.svg;
      return { svg, h: iconRow + t.h };
    },
  });

export const generalGraphics = {
  'process-home-5-steps.svg': () =>
    doc({ title: 'How CMI Assignment Help Works', subtitle: 'Five steps from your first message to a submission-ready document', footer: `${SITE} · CMI assignment help process`,
      body: ({ x, y, w }) => steps({ x, y, w, fs: 12.5, items: processSteps('Submission-ready document', 'Formatted to CMI standards', 'Typically in 5–7 days') }) }),
  'process-writing-service-5-steps.svg': () =>
    doc({ title: 'CMI Assignment Writing Service: The Order Process', subtitle: 'Five steps from your WhatsApp brief to the final Word document', footer: `${SITE} · CMI assignment writing service`,
      body: ({ x, y, w }) => steps({ x, y, w, fs: 12.5, items: processSteps('Final Word document', 'Submission-ready .docx', 'Written to your brief') }) }),
  'process-online-6-steps.svg': () =>
    doc({ title: 'CMI Assignment Help Online: The 6-Step Process', subtitle: 'Everything happens through a private WhatsApp channel', footer: `${SITE} · CMI assignment help online`,
      body: ({ x, y, w }) => steps({ x, y, w, perRow: 3, fs: 12.5, items: [
        { icon: 'chat', title: 'Message on WhatsApp', sub: 'Unit, brief, word count and deadline' },
        { icon: 'clock', title: 'Quote received', sub: 'Within 1 hour, Monday to Saturday 9am to 9pm UK time' },
        { icon: 'person', title: 'Writer assigned', sub: 'Introduced in a private 1-to-1 channel' },
        { icon: 'chat', title: 'Clarification channel', sub: 'Ask questions at any stage of the writing' },
        { icon: 'doc', title: 'Draft delivered', sub: 'As a .docx by WhatsApp or email' },
        { icon: 'check', title: 'Revisions', sub: 'Two included, returned in 24 to 48 hours', fill: C.green },
      ] }) }),
  'level-selector.svg': levelSelector,
  'qualification-structure-level-3.svg': qualStructure(3, C.teal, [
    [{ label: 'Units', text: '1 to 2' }, { label: 'Word count', text: '1,500–3,000 words total' }, { label: 'Study time', text: '3 to 6 months' }],
    [{ label: 'Units', text: '3 to 4' }, { label: 'Word count', text: '4,500–7,500 words total' }, { label: 'Study time', text: '6 to 12 months' }],
    [{ label: 'Units', text: '6 or more' }, { label: 'Word count', text: '9,000+ words total' }, { label: 'Study time', text: '12 to 18 months' }],
  ], ['Leadership and Management', 'First Line Management', 'First Line Management']),
  'qualification-structure-level-4.svg': qualStructure(4, C.blue, [
    [{ label: 'Units', text: '1 to 2' }, { label: 'Word count', text: '2,000–5,000 words total' }, { label: 'Study time', text: '3 to 6 months' }],
    [{ label: 'Units', text: '3 to 4' }, { label: 'Word count', text: '6,000–12,000 words total' }, { label: 'Study time', text: '6 to 12 months' }],
    [{ label: 'Units', text: '6 or more' }, { label: 'Word count', text: '14,000+ words total' }, { label: 'Study time', text: '12 to 18 months' }],
  ], ['Management and Leadership', 'Management and Leadership', 'Management and Leadership']),
  'qualification-structure-level-5.svg': qualStructure(5, C.green, [
    [{ label: 'Units', text: '1 to 2' }, { label: 'Word count', text: '3,000–6,000 words' }, { label: 'Study time', text: '3 to 6 months' }, { label: 'Most common for', text: 'Short credential, CPD evidence' }],
    [{ label: 'Units', text: '2 to 3' }, { label: 'Word count', text: '6,000–12,000 words' }, { label: 'Study time', text: '6 to 12 months' }, { label: 'Most common for', text: 'Broader management qualification' }],
    [{ label: 'Units', text: '6 to 8+' }, { label: 'Word count', text: '18,000–30,000+ words' }, { label: 'Study time', text: '12 to 24 months' }, { label: 'Most common for', text: 'Full professional qualification' }],
  ], ['Management and Leadership', 'Management and Leadership', 'Management and Leadership']),
  'qualification-structure-level-6.svg': qualStructure(6, C.amber, [
    [{ label: 'Units', text: '1 unit' }, { label: 'Word count', text: '4,000–5,000 words' }, { label: 'Academic equivalent', text: 'A degree module' }],
    [{ label: 'Units', text: '2 to 3' }, { label: 'Word count', text: '8,000–15,000 words' }, { label: 'Academic equivalent', text: 'Part of a degree' }],
    [{ label: 'Units', text: '5 or more' }, { label: 'Word count', text: '20,000+ words' }, { label: 'Academic equivalent', text: 'A full degree equivalent' }],
  ], ['Professional Management and Leadership', 'Professional Management and Leadership', 'Professional Management and Leadership']),
  'qualification-journey.svg': qualJourney,
  'pricing-tiers.svg': pricingTiers,
  'grade-standard-comparison.svg': gradeComparison,
  'tutoring-formats.svg': tutoringFormats,
  'award-certificate-diploma.svg': awardCertDiploma,
  'levels-comparison-table.svg': levelsTable,
  'rqf-levels-ladder.svg': rqfLadder,
  'resubmission-grading-system.svg': resubGrading,
  'resubmission-triggers.svg': resubTriggers,
  'resubmission-checklist.svg': resubChecklist,
  'submission-ready-checklist.svg': submissionChecklist,
  'level-5-vs-7-hub.svg': l5vsL7Hub,
};
