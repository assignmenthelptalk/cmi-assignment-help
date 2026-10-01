// Infographics for the CMI unit pages (Level 5 and Level 7 units).
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { C, doc, para, rect, table, matrixGrid } from './lib.mjs';
import { badgeRow, hubSpoke, rings, porter, kotter } from './diagrams.mjs';

const SITE = 'cmiassignmentsupport.co.uk';
const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'public');

const noteBox = (x, y, w, text, fill = C.tealBg, stroke = '#5eead4') => {
  const n = para(x + 14, y + 10, w - 28, text, { fs: 12, bold: true, fill: C.navy });
  return { svg: rect(x, y, w, n.h + 20, { fill, stroke, sw: 1.5, r: 10 }) + n.svg, h: n.h + 20 };
};

// ---------- Unit info badge rows ----------
const GREEN = { fill: C.green, fg: '#fff' };
const PURPLE = { fill: C.purple, fg: '#fff' };
const NAVY = { fill: C.navy, fg: '#fff' };

const badgeUnits = {
  501: { title: 'Principles of Management and Leadership', items: [{ v: 'CMI Unit 501', ...NAVY }, { v: 'Level 5 Diploma' }, { v: 'Management Report Format' }, { v: '3,000–4,000 Words' }, { v: 'Evaluate Command Verb', ...GREEN }] },
  506: { title: 'Managing Resources and Finance', items: [{ k: 'Unit', v: '506', ...NAVY }, { k: 'Title', v: 'Managing Resources and Finance' }, { k: 'Level', v: '5' }, { k: 'Word count', v: '3,500–4,500' }, { k: 'Sources', v: '10–12' }, { k: 'Command verb', v: 'Evaluate', ...GREEN }] },
  509: { title: 'Managing Stakeholder Relationships', items: [{ v: 'CMI Unit 509', ...NAVY }, { v: 'Level 5 Diploma' }, { v: 'Management Report Format' }, { v: '3,000–4,000 Words' }, { v: 'Evaluate and Justify', ...GREEN }] },
  701: { title: 'Strategic Leadership', items: [{ v: 'CMI Unit 701', ...NAVY }, { v: 'Level 7 Diploma' }, { v: 'Strategic Paper Format' }, { v: '5,000–6,500 Words' }, { v: 'Critically Analyse', ...PURPLE }] },
  702: { title: 'Leading and Developing People to Optimise Performance', items: [{ v: 'CMI Unit 702', ...NAVY }, { v: 'Level 7 Diploma' }, { v: 'Strategic Paper Format' }, { v: '5,000–6,000 Words' }, { v: 'Critically Analyse', ...PURPLE }] },
  704: { title: 'Developing Organisational Strategy', items: [{ v: 'CMI Unit 704', ...NAVY }, { v: 'Level 7 Diploma' }, { v: 'Strategic Paper Format' }, { v: '5,000–6,500 Words' }, { v: 'Critically Analyse', ...PURPLE }] },
  705: { title: 'Leading Strategic Change', items: [{ v: 'CMI Unit 705', ...NAVY }, { v: 'Level 7 Diploma' }, { v: 'Strategic Paper Format' }, { v: '5,000–6,000 Words' }, { v: 'Critically Analyse', ...PURPLE }] },
  706: { title: 'Ethical Leadership', items: [{ k: 'Unit', v: '706', ...NAVY }, { k: 'Title', v: 'Ethical Leadership' }, { k: 'Level', v: '7' }, { k: 'Word count', v: '5,000–6,000' }, { k: 'Sources', v: '15–20 peer-reviewed' }, { k: 'Command verb', v: 'Critically Analyse', ...PURPLE }] },
};

const unitBadges = Object.fromEntries(
  Object.entries(badgeUnits).map(([n, d]) => [
    `unit-badges-${n}.svg`,
    () => doc({ title: `CMI Unit ${n}: ${d.title}`, footer: `${SITE} · CMI Unit ${n} assignment help`, body: ({ x, y, w }) => badgeRow({ x, y, w, items: d.items }) }),
  ]),
);

// ---------- Command verb ladder, with one tier highlighted ----------
const ladderVariant = (label, polygon, calloutY) => () => {
  const base = readFileSync(join(PUBLIC, 'cmi-command-verb-ladder.svg'), 'utf8');
  const overlay =
    `<polygon points="${polygon}" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linejoin="round"/>` +
    `<rect x="12" y="${calloutY}" width="176" height="28" rx="14" fill="#f59e0b"/>` +
    `<text x="100" y="${calloutY + 18}" text-anchor="middle" font-size="12" font-weight="700" fill="#1a2e4a">${label}</text>`;
  return base.replace('</svg>', `${overlay}</svg>`);
};

// ---------- Matrices and tables ----------
const theories501 = () =>
  doc({
    title: 'CMI 501: Leadership Theories Compared',
    subtitle: 'Evaluate each theory against criteria. Do not simply describe it',
    footer: `${SITE} · CMI Unit 501 assignment help`,
    body: ({ x, y, w }) =>
      table({
        x, y, w, fs: 11, hfs: 11, pad: 7,
        cols: [
          { label: 'Theory', w: 1.1 },
          { label: 'Theoretical focus', w: 1.7 },
          { label: 'Evaluation criteria (examples)', w: 1.5 },
          { label: 'Key limitation', w: 1.5 },
          { label: 'Use in a 501 response', w: 1.4 },
        ],
        rows: [
          ['Transformational', 'Leaders inspire followers beyond self-interest through vision, values and intellectual stimulation', 'Staff motivation, adaptability to development needs, performance', 'Heroic-leader bias and cultural dependency', 'Core AC2 evaluation, set against transactional'],
          ['Transactional', 'An exchange: reward for performance, correction for failure', 'Task clarity, compliance, effectiveness in stable settings', 'Less suited to environments that need change and innovation', 'Show range by pairing with transformational'],
          ['Situational', "Style adapts to the follower's development level (Hersey and Blanchard)", 'Applicability to teams with mixed experience', 'Oversimplifies development into four stages', 'Evaluate for a defined team context'],
          ['Contingency', 'Effectiveness depends on the fit between leader style and the situation (Fiedler)', 'Fit between style and context', 'Assumes style is fixed, so the situation must change', 'Shows how context drives effectiveness'],
        ],
        colHeadFills: [C.navy, C.navy2, C.green, C.amber, C.blue],
      }),
  });

const budgetTypes = () =>
  doc({
    title: 'CMI 506: Budget Types Compared',
    subtitle: 'Evaluate which approach suits the organisational context. None is universally best',
    footer: `${SITE} · CMI Unit 506 assignment help`,
    body: ({ x, y, w }) =>
      table({
        x, y, w, fs: 11, hfs: 11.5, pad: 7,
        cols: [{ label: '', w: 0.9 }, { label: 'Incremental', w: 1.5 }, { label: 'Zero-based', w: 1.5 }, { label: 'Activity-based', w: 1.5 }, { label: 'Rolling', w: 1.5 }],
        colHeadFills: [C.navy, C.teal, C.blue, C.amber, C.purple],
        rows: [
          ['Definition', "Last year's budget plus adjustments for inflation, known cost changes and new activity", 'Every budget line justified from scratch each cycle', 'Budget tied to the activities that drive costs, built on activity-based costing', 'A constant forward period, often 12 months, extended as each period ends'],
          ['Best suited to', 'Stable services and multi-year contracts, such as an NHS Trust', 'Organisations that must realign spend with strategic priorities', 'Organisations with detailed activity and cost data', 'Fast-changing markets, such as a technology company'],
          ['Key advantage', 'Fast, simple and predictable', 'Forces prioritisation and removes embedded inefficiency', 'More accurate cost information and clearer value for money', 'Keeps budgets current and reduces year-end gaming'],
          ['Key limitation', 'Carries forward historical inefficiency', 'Resource-intensive and politically contested', 'Needs detailed data. Complex and costly to implement', 'Frequent reforecasting and weaker annual discipline'],
        ],
      }),
  });

const varianceAnalysis = () =>
  doc({
    title: 'CMI 506: Budget Variance Analysis',
    subtitle: 'Illustrative figures showing an adverse and a favourable variance',
    footer: `${SITE} · CMI Unit 506 assignment help`,
    body: ({ x, y, w }) => {
      const t = table({
        x, y, w, fs: 12, hfs: 11.5, pad: 9,
        cols: [{ label: 'Budget line', w: 1.8 }, { label: 'Budget', w: 1 }, { label: 'Actual', w: 1 }, { label: 'Variance', w: 1 }, { label: 'Result', w: 1.1 }],
        rows: [
          ['Agency staff costs', '£120,000', '£145,000', '£25,000', { t: 'Adverse', bold: true, fg: C.red, fill: C.redBg }],
          ['Service income', '£200,000', '£215,000', '£15,000', { t: 'Favourable', bold: true, fg: C.green, fill: C.greenBg }],
        ],
      });
      const by = y + t.h + 16;
      const half = (w - 14) / 2;
      const f = para(x + 14, by + 34, half - 28, 'Actual is better than budget: lower cost or higher income.', { fs: 12 });
      const a = para(x + half + 28, by + 34, half - 28, 'Actual is worse than budget: higher cost or lower income.', { fs: 12 });
      const bh = 34 + Math.max(f.h, a.h) + 14;
      let svg = t.svg;
      svg += rect(x, by, half, bh, { fill: C.greenBg, stroke: '#86efac', sw: 1.5, r: 10 }) + `<text x="${x + 14}" y="${by + 24}" font-size="14" font-weight="700" fill="${C.green}">Favourable variance</text>` + f.svg;
      svg += rect(x + half + 14, by, half, bh, { fill: C.redBg, stroke: '#fca5a5', sw: 1.5, r: 10 }) + `<text x="${x + half + 28}" y="${by + 24}" font-size="14" font-weight="700" fill="${C.red}">Adverse variance</text>` + a.svg;
      const ry = by + bh + 14;
      const n = noteBox(x, ry, w, 'Management response: investigate the root cause. A controllable variance needs corrective action. An uncontrollable one may need a revised forecast or budget.');
      return { svg: svg + n.svg, h: ry + n.h - y };
    },
  });

const mendelow = () =>
  doc({
    title: "Mendelow's Power/Interest Matrix",
    subtitle: 'Position each stakeholder, then choose the engagement approach',
    footer: `${SITE} · CMI Unit 509 assignment help`,
    body: ({ x, y, w }) => {
      const m = matrixGrid({
        x, y, w, cellH: 118, nx: 2, ny: 2, xLabel: 'Interest', yLabel: 'Power', xTicks: ['Low', 'High'], yTicks: ['High', 'Low'],
        cells: [
          { title: 'Keep Satisfied', body: 'High power, low interest. Communicate proactively so concerns do not turn into opposition.', fill: C.amberBg, stroke: '#fcd34d', fg: '#78350f' },
          { title: 'Manage Closely', body: 'High power, high interest. Frequent two-way engagement, involving them in decisions.', fill: C.blueBg, stroke: '#93c5fd', fg: '#1e3a8a', tag: 'PRIORITY', tagFill: C.blue },
          { title: 'Monitor', body: 'Low power, low interest. Periodic monitoring to see whether their position shifts.', fill: C.greyBg, stroke: C.line, fg: C.ink },
          { title: 'Keep Informed', body: 'Low power, high interest. Regular, clear and honest communication.', fill: C.greenBg, stroke: '#86efac', fg: '#14532d' },
        ],
      });
      const n = noteBox(x, y + m.h + 6, w, 'Positions are not fixed: a Monitor stakeholder can move to Manage Closely when a decision activates their interest.');
      return { svg: m.svg + n.svg, h: m.h + 6 + n.h };
    },
  });

const stakeholderComms = () =>
  doc({
    title: 'CMI 509: Communication Strategy by Stakeholder Quadrant',
    subtitle: 'Tailor the approach, frequency and channel to each quadrant',
    footer: `${SITE} · CMI Unit 509 assignment help`,
    body: ({ x, y, w }) =>
      table({
        x, y, w, fs: 11, hfs: 11, pad: 7,
        cols: [{ label: 'Quadrant', w: 1.1 }, { label: 'Examples (illustrative)', w: 1.3 }, { label: 'Objective', w: 1.5 }, { label: 'Approach', w: 1.4 }, { label: 'Frequency', w: 1 }, { label: 'Channel', w: 1.3 }],
        rows: [
          [{ t: 'Manage Closely', fill: C.blueBg }, 'Project sponsor, key regulator', 'Secure active support and shared decisions', 'Two-way and direct, involving them in decisions', 'Frequent', 'Meetings and working groups'],
          [{ t: 'Keep Satisfied', fill: C.amberBg }, 'Executive board, funders', 'Stop concerns becoming opposition', 'Proactive, concise updates', 'Scheduled, ahead of key decisions', 'Briefings and executive updates'],
          [{ t: 'Keep Informed', fill: C.greenBg }, 'Frontline staff, service users', 'Maintain trust and engagement', 'Clear, honest and regular', 'Regular', 'Team briefings and newsletters'],
          [{ t: 'Monitor', fill: C.greyBg }, 'Peripheral suppliers, general public', 'Stay aware of shifting positions', 'Light-touch monitoring', 'Periodic', 'Periodic review of the stakeholder map'],
        ],
      }),
  });

const leadershipModels701 = () =>
  doc({
    title: 'CMI 701: Strategic Leadership Models Compared',
    subtitle: 'Critically Analyse each model: evidence, limits and where it applies',
    footer: `${SITE} · CMI Unit 701 assignment help`,
    body: ({ x, y, w }) =>
      table({
        x, y, w, fs: 10.5, hfs: 11, pad: 7,
        cols: [{ label: 'Model', w: 1.1 }, { label: 'Core proposition', w: 1.6 }, { label: 'Empirical evidence base', w: 1.6 }, { label: 'Key theoretical limitation', w: 1.6 }, { label: 'Strategic application', w: 1.3 }],
        colHeadFills: [C.navy, C.navy2, C.blue, C.amber, C.green],
        rows: [
          ['Transformational (Bass and Avolio)', 'Leaders inspire through idealised influence, inspiration, intellectual stimulation and individual consideration', 'Extensive meta-analytic support for follower performance, satisfaction and commitment, with moderate effect sizes', 'Heroic-leader bias, cultural dependency, risk of follower dependency', 'Organisational change and transformation'],
          ['Distributed (Spillane, Gronn)', 'Leadership is a collective practice spread across roles, not one leader', 'Healthcare research links it to innovation and performance, but mostly qualitative', 'In tension with leader-vision models. Needs deliberate organisational design', 'Complex, multi-stakeholder organisations'],
          ['Authentic (Avolio, Gardner)', 'Self-awareness, relational transparency, balanced processing, internalised moral perspective', 'Linked to trust, wellbeing and engagement. Performance link less well established', 'Social-construction critique of a stable "true self"', 'Building trust and an ethical climate'],
          ['Adaptive (Heifetz, Laurie)', 'Separates technical problems from adaptive challenges that require people to change', 'Limited evidence that it produces better outcomes. Largely normative', 'Diagnosing the type of problem is demanding', 'Digital transformation, recovery, public service change'],
        ],
      }),
  });

const caVsEvaluate = () =>
  doc({
    title: 'Critically Analyse (Level 7) vs Evaluate (Level 5)',
    subtitle: 'The jump in depth that Unit 701 requires',
    footer: `${SITE} · CMI Unit 701 assignment help`,
    body: ({ x, y, w }) =>
      table({
        x, y, w, fs: 11.5, pad: 8,
        cols: [{ label: '', w: 1.1 }, { label: 'Evaluate (CMI Level 5)', w: 2 }, { label: 'Critically Analyse (CMI Level 7)', w: 2 }],
        colHeadFills: [C.navy, C.green, C.purple],
        rows: [
          ['What it requires', 'Apply criteria to weigh effectiveness and reach a judgement', 'Break the problem into components, apply empirical evidence to each, and synthesise an original position'],
          ['Evidence standard', 'Management texts and CMI publications, 10–12 sources', 'Peer-reviewed empirical research, 15–20 sources'],
          ['Treatment of limitations', 'Named and evidenced for Distinction', 'Limits and assumptions identified for every framework used'],
          ['Competing perspectives', 'Considered, with contradictions resolved for the context', 'Conflicting research engaged directly, with a position taken'],
          ['Output', 'A reasoned judgement against stated criteria', 'An original, defended strategic position'],
        ],
      }),
  });

const nineBox = () =>
  doc({
    title: '9-Box Talent Grid (CMI 702)',
    subtitle: 'Map performance against potential, then choose the talent response',
    footer: `${SITE} · CMI Unit 702 assignment help`,
    body: ({ x, y, w }) => {
      const labels = [
        ['Enigma', 'Diagnose the mismatch and support'], ['Growth talent', 'Stretch assignments and sponsorship'], ['Future leader', 'Accelerate and plan succession'],
        ['Inconsistent performer', 'Clarify expectations and coach'], ['Core talent', 'Develop and retain'], ['High performer', 'Reward and broaden experience'],
        ['Talent risk', 'Performance management or managed exit'], ['Effective contributor', 'Maintain and engage'], ['Trusted professional', 'Recognise and retain expertise'],
      ];
      const tint = ['#fecaca', '#fee2e2', '#fef3c7', '#ecfccb', '#bbf7d0'];
      const cells = labels.map(([title, body], i) => {
        const potential = 2 - Math.floor(i / 3);
        const performance = i % 3;
        return { title, body, fill: tint[potential + performance], stroke: C.line };
      });
      const m = matrixGrid({ x, y, w, cellH: 92, nx: 3, ny: 3, cells, xLabel: 'Performance', yLabel: 'Potential', xTicks: ['Low', 'Moderate', 'High'], yTicks: ['High', 'Moderate', 'Low'] });
      const n = para(x, y + m.h + 2, w, 'Illustrative responses. Adapt the labels and actions to the organisation.', { fs: 11, fill: C.mute });
      return { svg: m.svg + n.svg, h: m.h + 2 + n.h };
    },
  });

const hpws = () =>
  doc({
    title: 'High-Performance Work Systems: Practice Bundles',
    subtitle: 'Six HR practices that work together to produce organisational performance',
    footer: `${SITE} · CMI Unit 702 assignment help`,
    body: ({ x, y, w }) => {
      const hub = hubSpoke({
        x, y, w, h: 376, center: 'Organisational Performance Outcomes',
        nodes: ['Selective Recruitment', 'Extensive Training', 'Performance-Contingent Compensation', 'Participative Decision-Making', 'Job Enrichment', 'Information Sharing'].map((title) => ({ title })),
      });
      const n = noteBox(x, y + 388, w, 'Combs et al. (2006): across 92 studies, HPWS were associated with a 4.6% increase in return on assets. The bundle outperforms any single practice.');
      return { svg: hub.svg + n.svg, h: 388 + n.h };
    },
  });

const ansoff = () =>
  doc({
    title: 'Ansoff Matrix (CMI 704)',
    subtitle: 'Four growth directions, from lowest to highest risk',
    footer: `${SITE} · CMI Unit 704 assignment help`,
    body: ({ x, y, w }) =>
      matrixGrid({
        x, y, w, cellH: 132, nx: 2, ny: 2, xLabel: 'Markets', yLabel: 'Products and services', xTicks: ['Existing', 'New'], yTicks: ['New', 'Existing'],
        cells: [
          { title: 'Product Development', body: 'Create new offers for existing markets.', fill: C.amberBg, stroke: '#fcd34d', fg: '#78350f', tag: 'MODERATE RISK', tagFill: C.amber },
          { title: 'Diversification', body: 'New products in new markets: new territory.', fill: C.redBg, stroke: '#fca5a5', fg: '#7f1d1d', tag: 'HIGHEST RISK', tagFill: C.red },
          { title: 'Market Penetration', body: 'Grow share of existing markets with existing offers.', fill: C.greenBg, stroke: '#86efac', fg: '#14532d', tag: 'LOWEST RISK', tagFill: C.green },
          { title: 'Market Development', body: 'Reach new markets with existing offers.', fill: C.amberBg, stroke: '#fcd34d', fg: '#78350f', tag: 'MODERATE RISK', tagFill: C.amber },
        ],
      }),
  });

const porters = () =>
  doc({
    title: "Porter's Five Forces (CMI 704)",
    subtitle: 'Competitive rivalry is shaped by four surrounding forces',
    footer: `${SITE} · CMI Unit 704 assignment help`,
    body: ({ x, y, w }) =>
      porter({
        x, y, w,
        forces: {
          centre: { title: 'Competitive Rivalry', points: 'Intensity, number of competitors, switching costs' },
          top: { title: 'Threat of New Entrants', points: 'Barriers to entry, capital requirements, brand loyalty' },
          bottom: { title: 'Threat of Substitutes', points: 'Switching costs, price-performance of substitutes' },
          left: { title: 'Bargaining Power of Suppliers', points: 'Supplier concentration, switching costs, forward integration threat' },
          right: { title: 'Bargaining Power of Buyers', points: 'Buyer concentration, price sensitivity, backward integration threat' },
        },
        note: 'CMI 704 AC1 requires Critically Analyse, not a checklist. Assess which forces are most strategically significant and why.',
      }),
  });

const kotterCritique = () =>
  doc({
    title: "Kotter's 8-Step Change Model: Level 7 Critique",
    subtitle: 'Where the strongest empirical limitations sit',
    footer: `${SITE} · CMI Unit 705 assignment help`,
    body: ({ x, y, w }) =>
      kotter({
        x, y, w,
        steps: ['Establish urgency', 'Form a guiding coalition', 'Develop a vision and strategy', 'Communicate the vision', 'Empower broad-based action', 'Generate short-term wins', 'Consolidate gains', 'Anchor changes in culture'],
        callouts: {
          1: 'Manufactured urgency can cause anxiety rather than mobilisation (Edmondson, 2018).',
          3: 'Assumes a small coalition can design a vision others adopt. Complexity theory disputes this (Stacey, 2001).',
          8: 'Culture enables or constrains change throughout. It is not a final step (Schein).',
        },
        note: 'CMI 705 AC1 requires Critically Analyse, not application. Identify which steps have the strongest empirical support and where the model fails in complex organisations.',
      }),
  });

const changeFrameworks = () =>
  doc({
    title: 'Change Management Frameworks Compared (CMI 705)',
    subtitle: 'Critically Analyse each framework: do not simply apply it',
    footer: `${SITE} · CMI Unit 705 assignment help`,
    body: ({ x, y, w }) => {
      const t = table({
        x, y, w, fs: 10.5, hfs: 11, pad: 7,
        cols: [{ label: 'Framework', w: 1.1 }, { label: 'Level of analysis', w: 0.9 }, { label: 'Evidence and standing', w: 1.6 }, { label: 'Assumption challenged at Level 7', w: 1.6 }, { label: 'Strategic application', w: 1.3 }],
        rows: [
          ['Kotter 8-Step', 'Organisation', 'Weakly evidenced. Built from failed programmes. The "70% fail" figure lacks primary data', 'That a small coalition can design a vision the organisation adopts, and that culture comes last', 'Planned, leader-driven change programmes'],
          ['Lewin Force Field and Freeze', 'Group and organisation', 'Practically useful. The refreezing idea is heavily critiqued (Burnes, 2004)', 'Stable, identifiable forces and a refrozen end state', 'Diagnosing driving and restraining forces'],
          ['ADKAR', 'Individual', 'A diagnostic for individual adoption barriers. Limited at system level', 'That organisational change is the sum of individual changes', 'Implementation and workforce adoption'],
          ['Complexity theory (Stacey)', 'System', 'A conceptual challenge drawn from complexity science', 'That change can be diagnosed, designed and controlled in advance', 'Emergent, uncertain, expert-led settings'],
        ],
      });
      const n = para(x, y + t.h + 8, w, 'CMI 705 AC1 requires critical analysis of each framework, not application.', { fs: 11.5, bold: true, fill: C.navy });
      return { svg: t.svg + n.svg, h: t.h + 8 + n.h };
    },
  });

const ethicalTheories = () =>
  doc({
    title: 'Ethical Theories Compared (CMI 706)',
    subtitle: 'Four frameworks, each with a strength and a limit in leadership',
    footer: `${SITE} · CMI Unit 706 assignment help`,
    body: ({ x, y, w }) =>
      table({
        x, y, w, fs: 10.5, hfs: 11, pad: 7,
        cols: [{ label: 'Framework', w: 1.2 }, { label: 'Basis for ethical judgement', w: 1.5 }, { label: 'Key theorists', w: 1 }, { label: 'Strength in leadership', w: 1.6 }, { label: 'Critical limitation', w: 1.7 }],
        colHeadFills: [C.navy, C.navy2, C.blue, C.green, C.amber],
        rows: [
          ['Consequentialism / Utilitarianism', 'The consequences of an action: the greatest good for the greatest number', 'Bentham, Mill', 'Outcome focus suits strategic trade-offs', 'Consequences are uncertain. Can justify harm to minorities. Open to motivated reasoning'],
          ['Deontological ethics', 'Duty and universal principles, not outcomes', 'Kant', 'Clear principles resist rationalisation and protect individual rights', 'Paralysis when duties conflict. Context-independent'],
          ['Virtue ethics', 'Character: what kind of leader to be', 'Aristotle, MacIntyre', 'Builds character and contextual judgement (phronesis)', 'Which virtues? Little help in specific dilemmas. Can reinforce existing norms'],
          ['Care ethics', 'Relationships and responsibility to particular others', 'Gilligan', 'Captures duties to specific people. Challenges claimed objectivity', 'Can justify favouritism. Hard at scale. Tension with equal treatment law'],
        ],
      }),
  });

const scheinEthics = () =>
  doc({
    title: 'Schein Culture Model Applied to Ethics (CMI 706)',
    subtitle: 'Where ethical culture is embedded, or undermined, at each level',
    footer: `${SITE} · CMI Unit 706 assignment help`,
    body: ({ x, y, w }) =>
      rings({
        x, y, w,
        rings: [
          { name: 'Artefacts', sub: 'Visible structures and behaviours', items: 'Codes of conduct, ethics training, whistleblowing hotlines, ethics reporting procedures, values on office walls.', fill: C.blueBg, stroke: C.blue, fg: '#1e3a8a' },
          { name: 'Espoused Values', sub: 'Stated strategies and goals', items: 'Mission statements, ethics policies, leadership messages about values, corporate responsibility reports.', fill: C.amberBg, stroke: C.amber, fg: '#78350f' },
          { name: 'Underlying Assumptions', sub: 'Taken-for-granted beliefs', items: 'What leaders actually reward and sanction, how decisions are really made, what is tolerated under pressure, what the organisation truly values.', fill: C.redBg, stroke: C.red, fg: '#7f1d1d' },
        ],
        note: 'Ethical culture is embedded at the level of underlying assumptions, not at the level of artefacts.',
      }),
  });

export const unitGraphics = {
  ...unitBadges,
  'cmi-command-verb-ladder-evaluate.svg': ladderVariant('This unit: Evaluate', '240,124 460,124 500,172 200,172', 134),
  'cmi-command-verb-ladder-critically-analyse.svg': ladderVariant('This unit: Critically Analyse', '280,76 420,76 460,120 240,120', 82),
  'unit-501-leadership-theories.svg': theories501,
  'unit-506-budget-types.svg': budgetTypes,
  'unit-506-variance-analysis.svg': varianceAnalysis,
  'unit-509-mendelow-matrix.svg': mendelow,
  'unit-509-communication-table.svg': stakeholderComms,
  'unit-701-leadership-models.svg': leadershipModels701,
  'unit-701-critically-analyse-vs-evaluate.svg': caVsEvaluate,
  'unit-702-9-box-grid.svg': nineBox,
  'unit-702-hpws-bundles.svg': hpws,
  'unit-704-ansoff-matrix.svg': ansoff,
  'unit-704-porters-five-forces.svg': porters,
  'unit-705-kotter-critique.svg': kotterCritique,
  'unit-705-change-frameworks.svg': changeFrameworks,
  'unit-706-ethical-theories.svg': ethicalTheories,
  'unit-706-schein-ethics.svg': scheinEthics,
};
