import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const koreanPhaseFiles = [
  {
    file: 'phase-01-foundations.md',
    phaseNum: 1,
    slug: 'foundations',
    shortName: 'Foundations',
    rangeLabel: '0–3',
    themeLabel: 'Hangeul, sound system, survival Korean, grammar engines I & II',
  },
  {
    file: 'phase-02-everyday-fluency.md',
    phaseNum: 2,
    slug: 'everyday-fluency',
    shortName: 'Everyday Fluency',
    rangeLabel: '4–6',
    themeLabel: 'daily life domains, listening & pronunciation mastery, reading & writing',
  },
  {
    file: 'phase-03-intermediate-range.md',
    phaseNum: 3,
    slug: 'intermediate-range',
    shortName: 'Intermediate Range',
    rangeLabel: '7–9',
    themeLabel: 'discourse & connectors, reported speech & passive/causative, register & nuance',
  },
  {
    file: 'phase-05-specialization.md',
    phaseNum: 5,
    slug: 'specialization',
    shortName: 'Specialization',
    rangeLabel: '13–14',
    themeLabel: 'professional Korean, business meetings & negotiations, literature & media',
  },
  {
    file: 'phase-06-certification.md',
    phaseNum: 6,
    slug: 'certification',
    shortName: 'Precision & Certification',
    rangeLabel: '15–16',
    themeLabel: 'TOPIK II mastery (Levels 5–6), professional translation & interpretation',
  },
  {
    file: 'phase-07-mastery.md',
    phaseNum: 7,
    slug: 'mastery',
    shortName: 'Mastery',
    rangeLabel: '17–18',
    themeLabel: 'native-adjacent fluency, cultural depth, teaching & lifelong maintenance',
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

    // Subheading (#### or #####, or bold subheadings like **Practice tasks**, etc.)
    if (trimmed.startsWith('####') || trimmed.startsWith('#####') || trimmed.startsWith('**Practice')) {
      const isPractice =
        /practice|drill|exercise|warmup/i.test(trimmed) || trimmed.startsWith('**Practice');
      const cleanTitle = trimmed
        .replace(/^#+\s*/, '')
        .replace(/^\*\*/, '')
        .replace(/\*\*$/, '')
        .trim();
      elements.push({
        type: 'subheading',
        variant: isPractice ? 'practice' : 'group',
        title: cleanTitle,
        subtitle: null,
      });
      i++;
      continue;
    }

    // Callout quote >
    if (trimmed.startsWith('>')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ''));
        i++;
      }
      const fullQuote = quoteLines.join(' ');
      const isGate = /gate|rule|deliverable|completion/i.test(fullQuote);
      let checkId = null;
      if (isGate) {
        itemCounter++;
        checkId = `${idPrefix}-gate-${itemCounter}`;
        allCheckableIds.push(checkId);
      }
      elements.push({
        type: 'callout',
        variant: isGate ? 'gate' : 'info',
        text: fullQuote,
        checkId,
      });
      continue;
    }

    // Checkable list item: - [ ] or - [x] or regular bullet list (- or * or numbered 1.)
    if (
      trimmed.startsWith('- [ ]') ||
      trimmed.startsWith('- [x]') ||
      trimmed.startsWith('- ') ||
      trimmed.startsWith('* ') ||
      /^\d+\.\s+/.test(trimmed)
    ) {
      const checklistItems = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith('- ') ||
          lines[i].trim().startsWith('* ') ||
          /^\d+\.\s+/.test(lines[i].trim()))
      ) {
        const itemLine = lines[i].trim();
        let itemText = itemLine
          .replace(/^[-*]\s+(\[[ x]\]\s*)?/, '')
          .replace(/^\d+\.\s+(\[[ x]\]\s*)?/, '')
          .trim();

        itemCounter++;
        const itemId = `${idPrefix}-item-${itemCounter}`;
        allCheckableIds.push(itemId);

        // Detect kind/tag if any (e.g. `[Concept]`, `(Vocabulary)`, etc.)
        let kind = undefined;
        const tagMatch = itemText.match(/^\[([a-zA-Z0-9\s_-]+)\]/);
        if (tagMatch) {
          kind = tagMatch[1];
          itemText = itemText.replace(/^\[([a-zA-Z0-9\s_-]+)\]\s*/, '');
        }

        checklistItems.push({
          id: itemId,
          text: itemText,
          kind,
        });
        i++;
      }

      elements.push({
        type: 'checklist',
        groupType: 'study',
        items: checklistItems,
      });
      continue;
    }

    // Metadata bold label: **Label:** value
    const metaMatch = trimmed.match(/^\*\*([^*]+)\:\*\*\s*(.+)$/);
    if (metaMatch) {
      elements.push({
        type: 'meta',
        label: metaMatch[1].trim(),
        value: metaMatch[2].trim(),
      });
      i++;
      continue;
    }

    // Regular paragraph
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
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
 * Parses a Level block
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

    // 2. Capstone Section
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
        title: h2Title.replace(/^[0-9.]+\s*[—–-]\s*/, '').trim(),
        rawHeading: h2Title,
        subBlocks,
        checkableIds: capCheckIds,
      };
      continue;
    }

    // 3. Question Bank / Practice Bank
    if (/question bank|practice bank|self-test/i.test(h2Title)) {
      const qCheckIds = [];
      const h3Blocks = splitByHeading(h2.lines, '###');
      const qGroups = [];
      let qGlobalIdx = 0;
      for (const h3 of h3Blocks) {
        if (!h3.heading) continue;
        if (/readiness standard/i.test(h3.heading)) continue;
        const groupTitle = h3.heading.replace(/^(Group\s+[A-Z]\s*[—–-]?|[A-Z]\.)\s*/i, '').trim();
        const questions = [];
        for (const l of h3.lines) {
          const m = l.trim().match(/^(?:[-*]|\d+\.)\s+(.+)$/);
          if (m) {
            qGlobalIdx++;
            const qId = `${levelId}-q-${qGlobalIdx}`;
            qCheckIds.push(qId);
            const qText = m[1].trim();
            let qType = 'Concept';
            if (/produce|say|speak|pronounce|intonation|audio|record|shadow/i.test(qText)) {
              qType = 'Coding'; // Production / Speech
            } else if (/translate|transform|convert|conjugate|write|retell|summarize/i.test(qText)) {
              qType = 'Scenario';
            } else if (/wrong|error|mistake|correct|identify|which rule|why does/i.test(qText)) {
              qType = 'Debugging';
            } else if (/explain|difference|distinguish|why|what is/i.test(qText)) {
              qType = 'Concept';
            } else if (/dialogue|conversation|roleplay|mock|interview/i.test(qText)) {
              qType = 'Design';
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
    if (/final assessment|level assessment|checkpoint/i.test(h2Title)) {
      const assessCheckIds = [];
      const h3Blocks = splitByHeading(h2.lines, '###');
      const categories = [];
      for (const h3 of h3Blocks) {
        if (!h3.heading) continue;
        const catId = `${levelId}-assess-${slugifyId(h3.heading)}`;
        const els = parseContentElements(h3.lines, catId, assessCheckIds);
        categories.push({
          title: h3.heading,
          elements: els,
        });
      }
      assessment = {
        id: `${levelId}-assessment`,
        title: h2Title,
        categories,
        checkableIds: assessCheckIds,
      };
      continue;
    }

    // 5. Regular Section (e.g., "## 0.1 — Why Hangeul is a design problem")
    const secMatch = h2Title.match(/^([0-9.]+)\s*[—–-]\s*(.+)$/);
    const secCode = secMatch ? secMatch[1] : `S-${sections.length + 1}`;
    const secTitle = secMatch ? secMatch[2].trim() : h2Title;
    const secId = `${levelId}-sec-${slugifyId(secCode)}`;
    const secCheckIds = [];

    // Modules under this section (###)
    const h3Blocks = splitByHeading(h2.lines, '###');
    const modules = [];

    // Optional intro text before first module
    const secIntro = h3Blocks.find((b) => b.heading === null);
    let secObjective = '';
    if (secIntro) {
      for (const l of secIntro.lines) {
        const t = l.trim();
        if (t.startsWith('>')) {
          secObjective += (secObjective ? ' ' : '') + t.replace(/^>\s*/, '').trim();
        }
      }
    }

    for (const h3 of h3Blocks) {
      if (!h3.heading) continue;
      const modHeading = h3.heading;

      // Match module: "### Module 0.1.1 — The featural principle" or "### Mini-project: ..."
      const isMiniProject = /mini-project/i.test(modHeading);
      const modMatch = modHeading.match(/^Module\s+([0-9.]+)\s*[—–-]\s*(.+)$/i);
      const modCode = modMatch ? modMatch[1] : isMiniProject ? `${secCode}-mp` : `${secCode}.${modules.length + 1}`;
      const modTitle = modMatch
        ? modMatch[2].trim()
        : modHeading.replace(/^Mini-project:\s*/i, '').trim();

      const modId = `${secId}-mod-${slugifyId(modCode)}`;
      const modCheckIds = [];
      const elements = parseContentElements(h3.lines, modId, modCheckIds);

      secCheckIds.push(...modCheckIds);

      modules.push({
        id: modId,
        code: modCode,
        title: modTitle,
        kind: isMiniProject ? 'mini-project' : 'module',
        elements,
        checkableIds: modCheckIds,
      });
    }

    sections.push({
      id: secId,
      code: secCode,
      title: secTitle,
      objective: secObjective,
      modules,
      checkableIds: secCheckIds,
    });
  }

  // Aggregate all checkable IDs for this level
  const levelCheckableIds = [];
  for (const s of sections) {
    levelCheckableIds.push(...s.checkableIds);
  }
  if (capstone) levelCheckableIds.push(...capstone.checkableIds);
  if (interviewBank) levelCheckableIds.push(...interviewBank.checkableIds);
  if (assessment) levelCheckableIds.push(...assessment.checkableIds);

  const totalModules = sections.reduce((acc, s) => acc + s.modules.length, 0);

  return {
    id: levelId,
    badge: levelBadge,
    title: rawTitle,
    phaseNum: phaseInfo.phaseNum,
    phaseSlug: phaseInfo.slug,
    phaseName: phaseInfo.shortName,
    goal,
    prerequisites,
    dashboard,
    sections,
    capstone,
    interviewBank,
    assessment,
    checkableIds: levelCheckableIds,
    totalModules,
    totalSections: sections.length,
  };
}

function buildKoreanRoadmapData() {
  const phases = [];
  const allLevels = [];
  const allProjects = [];
  const allInterviewGroups = [];

  for (const pf of koreanPhaseFiles) {
    const filePath = path.join(rootDir, 'korean map', pf.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }
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
        phaseLevels.push(lvlObj);
        allLevels.push(lvlObj);

        if (lvlObj.capstone) {
          allProjects.push({
            id: lvlObj.capstone.id,
            number: allProjects.length + 1,
            title: lvlObj.capstone.title,
            kind: 'Level Capstone',
            levelId: lvlObj.id,
            levelBadge: lvlObj.badge,
            levelTitle: lvlObj.title,
            phaseNum: pf.phaseNum,
            phaseSlug: pf.slug,
            phaseName: pf.shortName,
            subBlocks: lvlObj.capstone.subBlocks,
            duration: lvlObj.dashboard['suggested duration'] || '2–3 weeks',
            tools: lvlObj.dashboard['core tools'] || '',
          });
        }

        if (lvlObj.interviewBank) {
          allInterviewGroups.push({
            levelId: lvlObj.id,
            levelBadge: lvlObj.badge,
            levelTitle: lvlObj.title,
            phaseNum: pf.phaseNum,
            phaseSlug: pf.slug,
            phaseName: pf.shortName,
            groups: lvlObj.interviewBank.groups,
          });
        }
        continue;
      }

      // 3. Phase Capstone (# PHASE X CAPSTONE — ...)
      if (/^PHASE\s+\d+\s+CAPSTONE/i.test(h1Title)) {
        const pCapChecks = [];
        const h2s = splitByHeading(h1.lines, '##');
        const subBlocks = [];
        for (const h2 of h2s) {
          const subId = `phase-${pf.phaseNum}-cap-${slugifyId(h2.heading || 'overview')}`;
          const els = parseContentElements(h2.lines, subId, pCapChecks);
          if (h2.heading || els.length > 0) {
            subBlocks.push({
              title: h2.heading || 'Phase Capstone Overview',
              elements: els,
            });
          }
        }
        phaseCapstone = {
          id: `phase-${pf.phaseNum}-capstone`,
          title: h1Title.replace(/^PHASE\s+\d+\s+CAPSTONE\s*[—–-]\s*/i, '').trim(),
          rawHeading: h1Title,
          subBlocks,
          checkableIds: pCapChecks,
        };
        allProjects.push({
          id: phaseCapstone.id,
          number: allProjects.length + 1,
          title: phaseCapstone.title,
          kind: 'Phase Milestone Capstone',
          phaseNum: pf.phaseNum,
          phaseSlug: pf.slug,
          phaseName: pf.shortName,
          subBlocks: phaseCapstone.subBlocks,
          duration: '3–4 weeks (Integration Sprint)',
        });
        continue;
      }

      // 4. Phase Assessment (# PHASE X FINAL ASSESSMENT)
      if (/^PHASE\s+\d+\s+FINAL\s+ASSESSMENT/i.test(h1Title)) {
        const pAssessChecks = [];
        const h2s = splitByHeading(h1.lines, '##');
        const categories = [];
        for (const h2 of h2s) {
          if (!h2.heading) continue;
          const catId = `phase-${pf.phaseNum}-assess-${slugifyId(h2.heading)}`;
          const els = parseContentElements(h2.lines, catId, pAssessChecks);
          categories.push({
            title: h2.heading,
            elements: els,
          });
        }
        phaseAssessment = {
          id: `phase-${pf.phaseNum}-assessment`,
          title: h1Title,
          categories,
          checkableIds: pAssessChecks,
        };
        continue;
      }

      // 5. Appendix (# APPENDIX)
      if (/^APPENDIX/i.test(h1Title)) {
        const h2s = splitByHeading(h1.lines, '##');
        const subBlocks = [];
        const appChecks = [];
        for (const h2 of h2s) {
          const subId = `phase-${pf.phaseNum}-app-${slugifyId(h2.heading || 'ref')}`;
          const els = parseContentElements(h2.lines, subId, appChecks);
          if (h2.heading || els.length > 0) {
            subBlocks.push({
              title: h2.heading || 'Reference',
              elements: els,
            });
          }
        }
        phaseAppendix.push({
          id: `phase-${pf.phaseNum}-appendix`,
          title: h1Title,
          subBlocks,
          checkableIds: appChecks,
        });
        continue;
      }
    }

    const phaseCheckableIds = [];
    for (const l of phaseLevels) {
      phaseCheckableIds.push(...l.checkableIds);
    }
    if (phaseCapstone) phaseCheckableIds.push(...phaseCapstone.checkableIds);
    if (phaseAssessment) phaseCheckableIds.push(...phaseAssessment.checkableIds);
    for (const app of phaseAppendix) phaseCheckableIds.push(...app.checkableIds);

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
      title: 'Korean Language Mastery Roadmap',
      subtitle: '16 levels across 6 phases — from Hangeul & phonetics to professional fluency & native mastery',
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

const data = buildKoreanRoadmapData();
const outDir = path.join(rootDir, 'src', 'data');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'koreanRoadmapData.json');
fs.writeFileSync(outFile, JSON.stringify(data, null, 2), 'utf-8');
console.log(
  `Parsed Korean Roadmap: ${data.meta.totalPhases} phases, ${data.meta.totalLevels} levels, ${data.meta.totalSections} sections, ${data.meta.totalModules} modules, ${data.meta.totalCheckables} checklist items, ${data.meta.totalProjects} capstones, and ${data.meta.totalQuestions} questions!`
);
