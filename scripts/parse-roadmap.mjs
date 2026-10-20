import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const phaseFiles = [
  {
    file: 'phase-01-foundations.md',
    phaseNum: 1,
    slug: 'foundations',
    shortName: 'Foundations',
    rangeLabel: '0–3',
    themeLabel: 'software, scientific computing, maths, statistics',
  },
  {
    file: 'phase-02-core-ml.md',
    phaseNum: 2,
    slug: 'core-ml',
    shortName: 'Core ML',
    rangeLabel: '4–6',
    themeLabel: 'EDA, feature engineering, classical ML, evaluation',
  },
  {
    file: 'phase-03-deep-learning (1).md',
    phaseNum: 3,
    slug: 'deep-learning',
    shortName: 'Deep Learning',
    rangeLabel: 'B, 7–9',
    themeLabel: 'PyTorch bridge, backprop, training dynamics, architectures',
  },
  {
    file: 'phase-04-advanced-ml-research.md',
    phaseNum: 4,
    slug: 'advanced-ml',
    shortName: 'Advanced ML & Research',
    rangeLabel: '10–12',
    themeLabel: 'self-supervised learning, causality, experimental science',
  },
  {
    file: 'phase-05-specialization.md',
    phaseNum: 5,
    slug: 'specialization',
    shortName: 'Specialization',
    rangeLabel: '13–14',
    themeLabel: 'NLP, computer vision, foundation models, research thesis',
  },
  {
    file: 'phase-06-engineering.md',
    phaseNum: 6,
    slug: 'engineering',
    shortName: 'Engineering',
    rangeLabel: '15–16',
    themeLabel: 'end-to-end MLOps, deployment, monitoring, scale & design',
  },
  {
    file: 'phase-07-career-preparation.md',
    phaseNum: 7,
    slug: 'career',
    shortName: 'Career Preparation',
    rangeLabel: '17–18',
    themeLabel: 'portfolio packaging, case studies, interview loops & offers',
  },
];

function slugifyId(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);
}

/**
 * Splits markdown lines into top-level blocks while respecting fenced code blocks ```
 */
function splitByHeading(lines, levelPrefix) {
  const blocks = [];
  let current = { heading: null, lines: [] };
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
    }
    if (!inCodeBlock && line.startsWith(levelPrefix + ' ') && !line.startsWith(levelPrefix + '#')) {
      if (current.heading !== null || current.lines.length > 0) {
        blocks.push(current);
      }
      current = { heading: line.slice(levelPrefix.length + 1).trim(), lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  if (current.heading !== null || current.lines.length > 0) {
    blocks.push(current);
  }
  return blocks;
}

/**
 * Parses a markdown table into { headers: string[], rows: string[][] }
 */
function parseTable(tableLines) {
  const cleaned = tableLines
    .map((l) => l.trim())
    .filter((l) => l.startsWith('|') && l.endsWith('|'));
  if (cleaned.length < 2) return null;
  const parseRow = (row) =>
    row
      .slice(1, -1)
      .split('|')
      .map((c) => c.trim());
  const headers = parseRow(cleaned[0]);
  const rows = [];
  for (let i = 2; i < cleaned.length; i++) {
    rows.push(parseRow(cleaned[i]));
  }
  return { headers, rows };
}

/**
 * Parses rich content blocks (bullets -> checklist items, math blocks, code blocks, tables, callouts, paragraphs)
 */
function parseContentElements(lines, idPrefix, allCheckableIds) {
  const elements = [];
  let i = 0;
  let itemCounter = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed || trimmed === '---') {
      i++;
      continue;
    }

    // Fenced code block
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim() || 'text';
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push({
        type: 'code',
        lang,
        code: codeLines.join('\n'),
      });
      continue;
    }

    // Display math block $$
    if (trimmed.startsWith('$$')) {
      if (trimmed.endsWith('$$') && trimmed.length > 4) {
        elements.push({
          type: 'math',
          latex: trimmed.slice(2, -2).trim(),
        });
        i++;
        continue;
      }
      const mathLines = [];
      if (trimmed.length > 2) mathLines.push(trimmed.slice(2));
      i++;
      while (i < lines.length && !lines[i].trim().endsWith('$$')) {
        mathLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) {
        const last = lines[i].trim().slice(0, -2);
        if (last) mathLines.push(last);
        i++;
      }
      elements.push({
        type: 'math',
        latex: mathLines.join('\n').trim(),
      });
      continue;
    }

    // Markdown table
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const table = parseTable(tableLines);
      if (table) {
        elements.push({
          type: 'table',
          headers: table.headers,
          rows: table.rows,
        });
      }
      continue;
    }

    // Blockquote / Callout / Gate
    if (trimmed.startsWith('>')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      // Check if quote has checklist items inside
      const quoteCheckItems = [];
      const quoteTextLines = [];
      for (const ql of quoteLines) {
        const m = ql.match(/^[-*]\s+(?:\[[ xX]\]\s+)?(.+)$/);
        if (m) {
          itemCounter++;
          const cid = `${idPrefix}-gate-${itemCounter}`;
          allCheckableIds.push(cid);
          quoteCheckItems.push({
            id: cid,
            text: m[1].trim(),
            kind: 'gate',
          });
        } else if (ql.trim()) {
          quoteTextLines.push(ql.trim());
        }
      }
      const fullQuoteText = quoteTextLines.join(' ');
      const isGate = /gate|rule|complete|pass mark/i.test(fullQuoteText);
      if (fullQuoteText) {
        // Also make completion gates themselves checkable if they don't already have sub-bullets
        let gateCheckId = null;
        if (isGate && quoteCheckItems.length === 0) {
          itemCounter++;
          gateCheckId = `${idPrefix}-gate-${itemCounter}`;
          allCheckableIds.push(gateCheckId);
        }
        elements.push({
          type: 'callout',
          variant: isGate ? 'gate' : 'info',
          text: fullQuoteText,
          checkId: gateCheckId,
        });
      }
      if (quoteCheckItems.length > 0) {
        elements.push({
          type: 'checklist',
          groupType: 'gate',
          items: quoteCheckItems,
        });
      }
      continue;
    }

    // Bullet or Numbered List -> Interactive Checklist!
    const bulletMatch = trimmed.match(/^(?:[-*]|\d+\.)\s+(?:\[[ xX]\]\s+)?(.+)$/);
    if (bulletMatch) {
      const items = [];
      while (i < lines.length) {
        const lineTrim = lines[i].trim();
        const bm = lineTrim.match(/^(?:[-*]|\d+\.)\s+(?:\[[ xX]\]\s+)?(.+)$/);
        if (!bm) break;
        let itemText = bm[1].trim();
        i++;
        // Check if subsequent indented lines continue this bullet
        while (
          i < lines.length &&
          lines[i].trim() !== '' &&
          !lines[i].trim().match(/^(?:[-*]|\d+\.)\s+/) &&
          !lines[i].trim().startsWith('#') &&
          !lines[i].trim().startsWith('>') &&
          !lines[i].trim().startsWith('```') &&
          !lines[i].trim().startsWith('$$') &&
          !lines[i].trim().startsWith('|') &&
          !lines[i].trim().startsWith('**Practice')
        ) {
          itemText += ' ' + lines[i].trim();
          i++;
        }
        itemCounter++;
        const cid = `${idPrefix}-item-${itemCounter}`;
        allCheckableIds.push(cid);
        items.push({
          id: cid,
          text: itemText,
        });
      }
      elements.push({
        type: 'checklist',
        groupType: 'study',
        items,
      });
      continue;
    }

    // Bold standalone sub-header like **Practice tasks** or **Data loading**
    const boldHeaderMatch = trimmed.match(/^\*\*([^*]+)\*\*\.?\s*(.*)$/);
    if (boldHeaderMatch && trimmed.length < 140) {
      const label = boldHeaderMatch[1].trim().replace(/\.$/, '');
      const rest = boldHeaderMatch[2].trim();
      if (/^practice/i.test(label)) {
        elements.push({
          type: 'subheading',
          variant: 'practice',
          title: label,
          subtitle: rest || null,
        });
        if (rest) {
          // Sometimes "**Practice.** For five functions..." has a single practice task inline
          itemCounter++;
          const cid = `${idPrefix}-prac-${itemCounter}`;
          allCheckableIds.push(cid);
          elements.push({
            type: 'checklist',
            groupType: 'practice',
            items: [{ id: cid, text: rest }],
          });
        }
        i++;
        continue;
      } else if (/^(objective|goal|purpose|difficulty|duration|depends on|pass mark|acceptance)/i.test(label)) {
        elements.push({
          type: 'meta',
          label,
          value: rest,
        });
        i++;
        continue;
      } else if (!rest) {
        elements.push({
          type: 'subheading',
          variant: 'group',
          title: label,
          subtitle: null,
        });
        i++;
        continue;
      }
    }

    // Regular paragraph
    const paraLines = [trimmed];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      lines[i].trim() !== '---' &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('-') &&
      !lines[i].trim().startsWith('* ') &&
      !lines[i].trim().match(/^\d+\.\s+/) &&
      !lines[i].trim().startsWith('>') &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('$$') &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().startsWith('**Practice')
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    elements.push({
      type: 'paragraph',
      text: paraLines.join(' '),
    });
  }

  // Post-process: mark checklists immediately following a 'practice' subheading as groupType: 'practice'
  for (let idx = 0; idx < elements.length; idx++) {
    if (
      elements[idx].type === 'subheading' &&
      elements[idx].variant === 'practice' &&
      idx + 1 < elements.length &&
      elements[idx + 1].type === 'checklist'
    ) {
      elements[idx + 1].groupType = 'practice';
    }
  }

  return elements;
}

/**
 * Parses a Level block (or Bridge block)
 */
function parseLevelBlock(levelId, levelBadge, rawTitle, phaseInfo, lines) {
  const h2Blocks = splitByHeading(lines, '##');
  let goal = '';
  let prerequisites = '';
  const dashboard = {};
  const sections = [];
  let capstone = null;
  let interviewBank = null;
  let assessment = null;

  // Intro lines before first H2
  const introBlock = h2Blocks.find((b) => b.heading === null);
  if (introBlock) {
    for (const l of introBlock.lines) {
      const t = l.trim();
      if (t.startsWith('>')) {
        goal += (goal ? ' ' : '') + t.replace(/^>\s*(\*\*Goal\.\*\*\s*|\*\*Who this is for\.\*\*\s*)?/i, '').trim();
      } else if (t.startsWith('**Prerequisites.**')) {
        prerequisites = t.replace(/^\*\*Prerequisites\.\*\*\s*/i, '').trim();
      }
    }
  }

  for (const h2 of h2Blocks) {
    if (!h2.heading) continue;
    const h2Title = h2.heading;

    // 1. Level Dashboard
    if (/level dashboard/i.test(h2Title)) {
      const tableLines = h2.lines.filter((l) => l.trim().startsWith('|'));
      const tbl = parseTable(tableLines);
      if (tbl) {
        for (const row of tbl.rows) {
          if (row.length >= 2) {
            const key = row[0].replace(/\*\*/g, '').trim().toLowerCase();
            dashboard[key] = row[1].trim();
          }
        }
      }
      for (const l of h2.lines) {
        if (l.trim().startsWith('**Prerequisites.**')) {
          prerequisites = l.trim().replace(/^\*\*Prerequisites\.\*\*\s*/i, '').trim();
        }
      }
      continue;
    }

    // 2. Capstone Section (e.g., "0.10 — Level 0 Capstone: ..." or "Level X Capstone")
    if (/capstone/i.test(h2Title)) {
      const capCheckIds = [];
      const h3Blocks = splitByHeading(h2.lines, '###');
      const subBlocks = [];
      for (const h3 of h3Blocks) {
        const subId = `${levelId}-cap-${slugifyId(h3.heading || 'intro')}`;
        const els = parseContentElements(h3.lines, subId, capCheckIds);
        if (h3.heading || els.length > 0) {
          subBlocks.push({
            title: h3.heading || 'Overview',
            elements: els,
          });
        }
      }
      capstone = {
        id: `${levelId}-capstone`,
        title: h2Title.replace(/^\d+\.\d+\s*[—–-]\s*/i, '').trim(),
        rawHeading: h2Title,
        subBlocks,
        checkableIds: capCheckIds,
      };
      continue;
    }

    // 3. Interview Question Bank
    if (/interview question bank/i.test(h2Title)) {
      const qGroups = [];
      const qCheckIds = [];
      const h3Blocks = splitByHeading(h2.lines, '###');
      let qGlobalIdx = 0;

      for (const h3 of h3Blocks) {
        if (!h3.heading) continue;
        if (/readiness standard/i.test(h3.heading)) continue;

        const groupTitle = h3.heading.replace(/^[A-Z]\.\s*/, '').trim();
        const questions = [];
        for (const l of h3.lines) {
          const m = l.trim().match(/^[-*]\s+(.+)$/);
          if (m) {
            qGlobalIdx++;
            const qId = `${levelId}-q-${qGlobalIdx}`;
            qCheckIds.push(qId);
            const qText = m[1].trim();
            // Determine question category badge
            let qType = 'Concept';
            if (/debug|investigate|fail|wrong|error|conflict|break/i.test(qText)) {
              qType = 'Debugging';
            } else if (/write|implement|reverse|count|find|merge|check|build|compute/i.test(qText) || /exercise/i.test(groupTitle)) {
              qType = 'Coding';
            } else if (/design|architecture|scale|100x|production/i.test(qText)) {
              qType = 'Design';
            } else if (/when would you|how would you|scenario|choose/i.test(qText)) {
              qType = 'Scenario';
            }
            questions.push({
              id: qId,
              number: qGlobalIdx,
              question: qText,
              category: groupTitle,
              type: qType,
            });
          }
        }
        if (questions.length > 0) {
          qGroups.push({
            title: groupTitle,
            rawHeading: h3.heading,
            questions,
          });
        }
      }
      interviewBank = {
        title: h2Title,
        groups: qGroups,
        checkableIds: qCheckIds,
      };
      continue;
    }

    // 4. Final Assessment
    if (/final assessment/i.test(h2Title)) {
      const assessCheckIds = [];
      const h3Blocks = splitByHeading(h2.lines, '###');
      const categories = [];
      for (const h3 of h3Blocks) {
        const catId = `${levelId}-assess-${slugifyId(h3.heading || 'general')}`;
        const els = parseContentElements(h3.lines, catId, assessCheckIds);
        if (h3.heading || els.length > 0) {
          categories.push({
            title: h3.heading || 'Assessment',
            elements: els,
          });
        }
      }
      assessment = {
        title: h2Title,
        categories,
        checkableIds: assessCheckIds,
      };
      continue;
    }

    // 5. Standard Numbered Section (e.g. "0.1 — Python Core", or Bridge modules)
    const secMatch = h2Title.match(/^([0-9P]+\.\d+)\s*[—–-]\s*(.+)$/);
    const sectionCode = secMatch ? secMatch[1] : `${sections.length + 1}`;
    const sectionName = secMatch ? secMatch[2].trim() : h2Title;
    const sectionId = `${levelId}-sec-${slugifyId(sectionCode)}`;
    const sectionCheckIds = [];

    const h3Blocks = splitByHeading(h2.lines, '###');
    let objective = '';
    const modules = [];

    // Extract objective from intro of H2
    const secIntro = h3Blocks.find((b) => b.heading === null);
    if (secIntro) {
      const introLinesRem = [];
      for (const l of secIntro.lines) {
        const t = l.trim();
        if (t.startsWith('**Objective.**')) {
          objective = t.replace(/^\*\*Objective\.\*\*\s*/i, '').trim();
        } else {
          introLinesRem.push(l);
        }
      }
      // If there are checklists/elements directly under H2 without H3, create a default module
      const directEls = parseContentElements(introLinesRem, `${sectionId}-direct`, sectionCheckIds);
      const hasChecklists = directEls.some((e) => e.type === 'checklist' || e.type === 'table' || e.type === 'code');
      if (hasChecklists && h3Blocks.filter((b) => b.heading !== null).length === 0) {
        modules.push({
          id: `${sectionId}-m1`,
          code: sectionCode,
          title: sectionName,
          kind: 'module',
          elements: directEls,
          checkableIds: [...sectionCheckIds],
        });
      }
    }

    for (const h3 of h3Blocks) {
      if (!h3.heading) continue;
      const h3Title = h3.heading;
      const modMatch = h3.heading.match(/^Module\s+([0-9P]+\.\d+(?:\.\d+)?)\s*[—–-]\s*(.+)$/i);
      const miniMatch = h3.heading.match(/^(?:Mini-project|Bridge mini-build)\s*[—–-]\s*(.+)$/i);

      let modCode = '';
      let modName = h3Title;
      let modKind = 'module';

      if (modMatch) {
        modCode = modMatch[1];
        modName = modMatch[2].trim();
        modKind = 'module';
      } else if (miniMatch) {
        modCode = 'PROJECT';
        modName = miniMatch[1].trim();
        modKind = 'mini-project';
      } else if (/^checklist$/i.test(h3Title)) {
        modCode = sectionCode;
        modName = `${sectionName} — Checklist`;
        modKind = 'checklist';
      } else if (/^practice/i.test(h3Title)) {
        modCode = 'PRACTICE';
        modName = h3Title;
        modKind = 'practice';
      } else {
        modCode = sectionCode;
        modName = h3Title;
      }

      const modId = `${sectionId}-${slugifyId(modCode + '-' + modName)}`;
      const modCheckIds = [];
      const els = parseContentElements(h3.lines, modId, modCheckIds);
      if (modKind === 'practice') {
        for (const el of els) {
          if (el.type === 'checklist') el.groupType = 'practice';
        }
      }
      sectionCheckIds.push(...modCheckIds);

      // If this H3 is "Practice tasks" and there is a preceding module in this section,
      // merge the practice tasks + completion gate directly into that preceding module!
      if (modKind === 'practice' && modules.length > 0) {
        const prevMod = modules[modules.length - 1];
        prevMod.elements.push(
          {
            type: 'subheading',
            variant: 'practice',
            title: 'Practice tasks',
            subtitle: null,
          },
          ...els
        );
        prevMod.checkableIds.push(...modCheckIds);
        if (prevMod.kind === 'checklist') {
          prevMod.title = sectionName;
          prevMod.kind = 'module';
        }
      } else {
        modules.push({
          id: modId,
          code: modCode,
          title: modKind === 'checklist' ? sectionName : modName,
          kind: modKind === 'checklist' ? 'module' : modKind,
          elements: els,
          checkableIds: modCheckIds,
        });
      }
    }

    sections.push({
      id: sectionId,
      code: sectionCode,
      title: sectionName,
      objective,
      modules,
      checkableIds: sectionCheckIds,
    });
  }

  // Aggregate all checkable IDs in this level
  const allLevelCheckIds = [];
  for (const s of sections) allLevelCheckIds.push(...s.checkableIds);
  if (capstone) allLevelCheckIds.push(...capstone.checkableIds);
  if (assessment) allLevelCheckIds.push(...assessment.checkableIds);

  return {
    id: levelId,
    badge: levelBadge,
    title: rawTitle,
    phaseNum: phaseInfo.phaseNum,
    phaseSlug: phaseInfo.slug,
    phaseName: phaseInfo.shortName,
    goal: goal || dashboard['final outcome'] || '',
    prerequisites: prerequisites || 'Previous level completion',
    dashboard,
    sections,
    capstone,
    interviewBank,
    assessment,
    checkableIds: allLevelCheckIds,
    totalModules: sections.reduce((acc, s) => acc + s.modules.length, 0),
    totalSections: sections.length,
  };
}

function buildRoadmapData() {
  const phases = [];
  const allLevels = [];
  const allProjects = [];
  const allInterviewGroups = [];

  // Calibrated, mathematically consistent durations across Phases, Levels, and Capstones
  // (at 15-18 hours/week part-time, or ~2x faster at 30-35 hours/week intensive)
  const CALIBRATED_LEVEL_DURATIONS = {
    '0': '3–4 weeks',
    '1': '2–3 weeks',
    '2': '4–5 weeks',
    '3': '3–4 weeks',
    '4': '3–4 weeks',
    '5': '3–4 weeks',
    '6': '3–4 weeks',
    B: '3–5 days',
    '7': '3–4 weeks',
    '8': '3–4 weeks',
    '9': '4–5 weeks',
    '10': '3–4 weeks',
    '11': '3–4 weeks',
    '12': '3–4 weeks',
    '13': '5–6 weeks',
    '14': '4–6 weeks',
    '15': '4–5 weeks',
    '16': '3–5 weeks',
    '17': '3–4 weeks',
    '18': '2–3 weeks',
  };

  const CALIBRATED_PHASE_DURATIONS = {
    1: '12–16 weeks · ~3–4 months',
    2: '9–12 weeks · ~2–3 months',
    3: '10–14 weeks · ~2.5–3.5 months',
    4: '9–12 weeks · ~2–3 months',
    5: '8–12 weeks · ~2–3 months (Track-Based)',
    6: '7–10 weeks · ~2 months',
    7: '5–7 weeks · ~1.5 months (Concurrent)',
  };

  const CALIBRATED_CAPSTONE_DURATIONS = {
    'level-0-capstone': '4–5 days (Capstone Build)',
    'level-1-capstone': '3–5 days (Capstone Build)',
    'level-2-capstone': '5–7 days (Capstone Build)',
    'level-3-capstone': '4–6 days (Capstone Build)',
    'phase-1-capstone': '1–2 weeks (Phase Integration)',
    'level-4-capstone': '5–7 days (Capstone Build)',
    'level-5-capstone': '1–1.5 weeks (Capstone Build)',
    'level-6-capstone': '5–7 days (Capstone Build)',
    'phase-2-capstone': '1–2 weeks (Phase Integration)',
    'bridge-capstone': '1–2 days (Warmup Build)',
    'level-7-capstone': '1–1.5 weeks (Capstone Build)',
    'level-8-capstone': '1–1.5 weeks (Capstone Build)',
    'level-9-capstone': '1–2 weeks (Capstone Build)',
    'phase-3-capstone': '1.5–2 weeks (Phase Integration)',
    'level-10-capstone': '1–1.5 weeks (Capstone Build)',
    'level-11-capstone': '1–1.5 weeks (Capstone Build)',
    'level-12-capstone': '1–2 weeks (Paper Reproduction)',
    'phase-4-capstone': '1.5–2 weeks (Research Sprint)',
    'level-13-capstone': '2–3 weeks (Flagship System Build)',
    'level-14-capstone': '2–3 weeks (Thesis Execution)',
    'phase-5-capstone': '2–3 weeks (Specialization Thesis)',
    'level-15-capstone': '1.5–2 weeks (MLOps Pipeline Build)',
    'level-16-capstone': '1–1.5 weeks (System Design & Load Test)',
    'phase-6-capstone': '1.5–2 weeks (Production Integration)',
    'level-17-capstone': '1.5–2 weeks (Portfolio Packaging)',
    'level-18-capstone': '1–2 weeks (Mock Loop Sprint)',
    'phase-7-capstone': '1–2 weeks (Launch Readiness)',
  };

  for (const pf of phaseFiles) {
    const filePath = path.join(rootDir, pf.file);
    const content = fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n');
    const lines = content.split('\n');

    const h1Blocks = splitByHeading(lines, '#');
    let phaseGoal = '';
    let phaseRule = '';
    const phaseDashboard = {};
    const phaseLevels = [];
    let phaseCapstone = null;
    let phaseAssessment = null;
    let phaseAppendix = [];

    for (const h1 of h1Blocks) {
      if (!h1.heading) continue;
      const h1Title = h1.heading;

      // 1. Phase Header Block (# PHASE X — ...)
      if (/^PHASE\s+\d+\s*[—–-]/i.test(h1Title) && !/CAPSTONE|ASSESSMENT/i.test(h1Title)) {
        const h2s = splitByHeading(h1.lines, '##');
        const intro = h2s.find((b) => b.heading === null);
        if (intro) {
          for (const l of intro.lines) {
            const t = l.trim();
            if (t.startsWith('>')) {
              phaseGoal += (phaseGoal ? ' ' : '') + t.replace(/^>\s*(\*\*Phase goal\.\*\*\s*)?/i, '').trim();
            }
          }
        }
        for (const h2 of h2s) {
          if (!h2.heading) continue;
          if (/phase dashboard/i.test(h2.heading)) {
            const tbl = parseTable(h2.lines.filter((l) => l.trim().startsWith('|')));
            if (tbl) {
              for (const row of tbl.rows) {
                if (row.length >= 2) {
                  phaseDashboard[row[0].replace(/\*\*/g, '').trim().toLowerCase()] = row[1].trim();
                }
              }
            }
          } else if (/how this phase is structured/i.test(h2.heading)) {
            for (const l of h2.lines) {
              if (l.trim().startsWith('>')) {
                phaseRule = l.trim().replace(/^>\s*/, '');
              }
            }
          } else if (/prerequisite bridge/i.test(h2.heading)) {
            // Special PyTorch Readiness Bridge in Phase 3!
            const bridgeLevel = parseLevelBlock(
              'bridge',
              'B',
              'PyTorch Readiness Bridge',
              pf,
              ['## P.0 — PyTorch Readiness Bridge', ...h2.lines]
            );
            bridgeLevel.goal =
              'Master tensors, nn.Module, the canonical training loop, DataLoaders, and device/precision discipline before starting Level 7.';
            bridgeLevel.dashboard = {
              level: 'Bridge — PyTorch Readiness (Entry Gate)',
              difficulty: 'Intermediate',
              'suggested duration': CALIBRATED_LEVEL_DURATIONS['B'],
              'study commitment': '15–18 hrs/wk part-time (or 2–3 days intensive)',
              'core tools': 'PyTorch, torch.autograd, einops, DataLoader, torch.profiler',
              'main project': 'torch-warmup — a working training loop you can explain',
              'final outcome': 'Build an nn.Module, step an optimiser, and verify checkpoint resume before Level 7.',
            };
            phaseLevels.push(bridgeLevel);
            allLevels.push(bridgeLevel);
          }
        }
        continue;
      }

      // 2. Level Block (# LEVEL X — ...)
      const lvlMatch = h1Title.match(/^LEVEL\s+(\d+)\s*[—–-]\s*(.+)$/i);
      if (lvlMatch) {
        const lvlNum = lvlMatch[1];
        const lvlRawTitle = lvlMatch[2].trim();
        const lvlObj = parseLevelBlock(`level-${lvlNum}`, lvlNum, lvlRawTitle, pf, h1.lines);
        if (CALIBRATED_LEVEL_DURATIONS[lvlNum]) {
          lvlObj.dashboard['suggested duration'] = CALIBRATED_LEVEL_DURATIONS[lvlNum];
        }
        lvlObj.dashboard['study commitment'] =
          '15–18 hrs/wk (2.5 hrs/day) part-time · ~2× faster full-time (30–35 hrs/wk)';
        phaseLevels.push(lvlObj);
        allLevels.push(lvlObj);

        if (lvlObj.capstone) {
          allProjects.push({
            id: lvlObj.capstone.id,
            number: allProjects.length + 1,
            title: lvlObj.capstone.title,
            kind: 'Level Capstone',
            levelId: lvlObj.id,
            levelBadge: `L${lvlObj.badge}`,
            levelTitle: lvlObj.title,
            phaseSlug: pf.slug,
            phaseName: pf.shortName,
            difficulty: lvlObj.dashboard['difficulty'] || 'Intermediate',
            duration:
              CALIBRATED_CAPSTONE_DURATIONS[lvlObj.capstone.id] ||
              '1–1.5 weeks (Capstone Build)',
            tools: lvlObj.dashboard['core tools'] || lvlObj.dashboard['main libraries'] || '',
            subBlocks: lvlObj.capstone.subBlocks,
            checkableIds: lvlObj.capstone.checkableIds,
          });
        }

        if (lvlObj.interviewBank) {
          allInterviewGroups.push({
            levelId: lvlObj.id,
            levelBadge: `L${lvlObj.badge}`,
            levelTitle: lvlObj.title,
            phaseSlug: pf.slug,
            phaseName: pf.shortName,
            groups: lvlObj.interviewBank.groups,
            checkableIds: lvlObj.interviewBank.checkableIds,
          });
        }
        continue;
      }

      // 3. Phase Capstone (# PHASE X CAPSTONE — ...)
      if (/^PHASE\s+\d+\s+CAPSTONE/i.test(h1Title)) {
        const capId = `phase-${pf.phaseNum}-capstone`;
        const capTitle = h1Title.replace(/^PHASE\s+\d+\s+CAPSTONE\s*[—–-]\s*/i, '').trim();
        const capCheckIds = [];
        const h2s = splitByHeading(h1.lines, '##');
        const subBlocks = [];
        for (const h2 of h2s) {
          const sId = `${capId}-${slugifyId(h2.heading || 'overview')}`;
          const els = parseContentElements(h2.lines, sId, capCheckIds);
          if (h2.heading || els.length > 0) {
            subBlocks.push({
              title: h2.heading || 'Overview',
              elements: els,
            });
          }
        }
        phaseCapstone = {
          id: capId,
          title: `Phase ${pf.phaseNum} Capstone: ${capTitle}`,
          subBlocks,
          checkableIds: capCheckIds,
        };
        allProjects.push({
          id: capId,
          number: allProjects.length + 1,
          title: `Phase ${pf.phaseNum} Capstone — ${capTitle}`,
          kind: 'Phase Capstone',
          levelId: phaseLevels.length > 0 ? phaseLevels[phaseLevels.length - 1].id : 'level-0',
          levelBadge: `Phase ${pf.phaseNum}`,
          levelTitle: pf.shortName,
          phaseSlug: pf.slug,
          phaseName: pf.shortName,
          difficulty: phaseDashboard['difficulty'] || 'Advanced',
          duration:
            CALIBRATED_CAPSTONE_DURATIONS[capId] ||
            '1.5–2 weeks (Phase Integration)',
          tools: phaseDashboard['core tools'] || phaseDashboard['main libraries'] || '',
          subBlocks,
          checkableIds: capCheckIds,
        });
        continue;
      }

      // 4. Phase Final Assessment (# PHASE X FINAL ASSESSMENT)
      if (/^PHASE\s+\d+\s+FINAL ASSESSMENT/i.test(h1Title)) {
        const assessId = `phase-${pf.phaseNum}-assessment`;
        const assessCheckIds = [];
        const h2s = splitByHeading(h1.lines, '##');
        const categories = [];
        for (const h2 of h2s) {
          const cId = `${assessId}-${slugifyId(h2.heading || 'general')}`;
          const els = parseContentElements(h2.lines, cId, assessCheckIds);
          if (h2.heading || els.length > 0) {
            categories.push({
              title: h2.heading || 'Overview',
              elements: els,
            });
          }
        }
        phaseAssessment = {
          id: assessId,
          title: h1Title,
          categories,
          checkableIds: assessCheckIds,
        };
        continue;
      }

      // 5. Appendix / Roadmap Complete blocks
      if (/^APPENDIX|ROADMAP COMPLETE/i.test(h1Title)) {
        const appId = `phase-${pf.phaseNum}-app-${slugifyId(h1Title)}`;
        const appCheckIds = [];
        const h2s = splitByHeading(h1.lines, '##');
        const subBlocks = [];
        for (const h2 of h2s) {
          const sId = `${appId}-${slugifyId(h2.heading || 'intro')}`;
          const els = parseContentElements(h2.lines, sId, appCheckIds);
          if (h2.heading || els.length > 0) {
            subBlocks.push({
              title: h2.heading || h1Title,
              elements: els,
            });
          }
        }
        phaseAppendix.push({
          id: appId,
          title: h1Title,
          subBlocks,
          checkableIds: appCheckIds,
        });
      }
    }

    const phaseCheckableIds = [];
    for (const l of phaseLevels) phaseCheckableIds.push(...l.checkableIds);
    if (phaseCapstone) phaseCheckableIds.push(...phaseCapstone.checkableIds);
    if (phaseAssessment) phaseCheckableIds.push(...phaseAssessment.checkableIds);

    if (CALIBRATED_PHASE_DURATIONS[pf.phaseNum]) {
      phaseDashboard['suggested duration'] = CALIBRATED_PHASE_DURATIONS[pf.phaseNum];
    }
    phaseDashboard['study commitment'] =
      '15–18 hrs/wk part-time · ~2× faster full-time';

    phases.push({
      phaseNum: pf.phaseNum,
      slug: pf.slug,
      name: pf.shortName,
      rangeLabel: pf.rangeLabel,
      themeLabel: pf.themeLabel,
      goal: phaseGoal,
      rule: phaseRule,
      dashboard: phaseDashboard,
      levels: phaseLevels.map((l) => ({
        id: l.id,
        badge: l.badge,
        title: l.title,
        goal: l.goal,
        duration: l.dashboard['suggested duration'] || '',
        difficulty: l.dashboard['difficulty'] || '',
        mainProject: l.dashboard['main project'] || (l.capstone ? l.capstone.title : ''),
        totalSections: l.totalSections,
        totalModules: l.totalModules,
        checkableCount: l.checkableIds.length,
        checkableIds: l.checkableIds,
      })),
      capstone: phaseCapstone,
      assessment: phaseAssessment,
      appendix: phaseAppendix,
      checkableIds: phaseCheckableIds,
    });
  }

  const totalCheckables = allLevels.reduce((acc, l) => acc + l.checkableIds.length, 0);
  const totalModules = allLevels.reduce((acc, l) => acc + l.totalModules, 0);
  const totalSections = allLevels.reduce((acc, l) => acc + l.totalSections, 0);
  const totalQuestions = allInterviewGroups.reduce(
    (acc, g) => acc + g.groups.reduce((s, grp) => s + grp.questions.length, 0),
    0
  );

  return {
    meta: {
      title: 'ML Engineer & Applied Scientist Roadmap',
      subtitle: '19 levels across 7 phases — from software fundamentals to research & production',
      totalPhases: phases.length,
      totalLevels: allLevels.length,
      totalSections,
      totalModules,
      totalCheckables,
      totalProjects: allProjects.length,
      totalQuestions,
    },
    phases,
    levels: allLevels,
    projects: allProjects,
    interviewBanks: allInterviewGroups,
  };
}

const data = buildRoadmapData();
const outDir = path.join(rootDir, 'src', 'data');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'roadmapData.json');
fs.writeFileSync(outFile, JSON.stringify(data, null, 2), 'utf-8');
console.log(
  `Parsed ${data.meta.totalPhases} phases, ${data.meta.totalLevels} levels, ${data.meta.totalSections} sections, ${data.meta.totalModules} modules, ${data.meta.totalCheckables} checklist items, ${data.meta.totalProjects} capstones, and ${data.meta.totalQuestions} interview questions!`
);
