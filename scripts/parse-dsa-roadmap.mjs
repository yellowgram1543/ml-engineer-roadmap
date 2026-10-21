import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const dsaDir = path.join(rootDir, 'dsa files');

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);
}

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
      i++;
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

    // Blockquote
    if (trimmed.startsWith('>')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      const text = quoteLines.join(' ');
      const isGate = text.toLowerCase().includes('gate') || text.toLowerCase().includes('checkpoint');
      let checkId = null;
      if (isGate) {
        itemCounter++;
        checkId = `${idPrefix}-gate-${itemCounter}`;
        allCheckableIds.push(checkId);
      }
      elements.push({
        type: 'callout',
        variant: isGate ? 'gate' : 'info',
        text,
        checkId,
      });
      continue;
    }

    // Checklist or bullet list
    if (trimmed.startsWith('- [ ]') || trimmed.startsWith('- [x]') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const items = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        if (l.startsWith('- [ ]') || l.startsWith('- [x]')) {
          const itemText = l.replace(/^-\s*\[[ xX]\]\s*/, '').trim();
          itemCounter++;
          const cid = `${idPrefix}-chk-${itemCounter}`;
          allCheckableIds.push(cid);
          items.push({ id: cid, text: itemText, kind: 'checklist' });
          i++;
        } else if (l.startsWith('- ') || l.startsWith('* ')) {
          const itemText = l.replace(/^[-*]\s+/, '').trim();
          itemCounter++;
          const cid = `${idPrefix}-item-${itemCounter}`;
          allCheckableIds.push(cid);
          items.push({ id: cid, text: itemText, kind: 'bullet' });
          i++;
        } else {
          break;
        }
      }
      if (items.length > 0) {
        elements.push({
          type: 'checklist',
          groupType: 'study',
          items,
        });
      }
      continue;
    }

    // Numbered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        const l = lines[i].trim();
        const text = l.replace(/^\d+\.\s+/, '').trim();
        itemCounter++;
        const cid = `${idPrefix}-num-${itemCounter}`;
        allCheckableIds.push(cid);
        items.push({ id: cid, text, kind: 'numbered' });
        i++;
      }
      elements.push({
        type: 'checklist',
        groupType: 'practice',
        items,
      });
      continue;
    }

    // Regular paragraph
    elements.push({
      type: 'paragraph',
      text: trimmed,
    });
    i++;
  }

  return elements;
}

function splitByHeading(lines, levelPrefix) {
  const blocks = [];
  let current = { heading: null, lines: [] };
  let inCode = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCode = !inCode;
    }
    if (!inCode && line.startsWith(levelPrefix + ' ') && !line.startsWith(levelPrefix + '#')) {
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

// ─────────────────────────────────────────────────────────────
// Parse README.md
// ─────────────────────────────────────────────────────────────
function parseReadme(allCheckableIds) {
  const content = fs.readFileSync(path.join(dsaDir, 'README.md'), 'utf8');
  const lines = content.split(/\r?\n/);
  const sections = splitByHeading(lines, '##');

  const dailyLoop = [];
  const tenRules = [];
  const masteryLadder = [];
  const schedule = [];
  const checkpoints = [];

  for (const sec of sections) {
    const h = (sec.heading || '').toLowerCase();
    if (h.includes('daily loop')) {
      const tbl = parseTable(sec.lines);
      if (tbl) {
        for (const row of tbl.rows) {
          if (row.length >= 3) {
            dailyLoop.push({
              slot: row[0],
              time: row[1],
              activity: row[2],
            });
          }
        }
      }
    } else if (h.includes('ten rules')) {
      let rNum = 1;
      for (const line of sec.lines) {
        const m = line.trim().match(/^(\d+)\.\s+\*\*([^*]+)\*\*(.*)$/);
        if (m) {
          tenRules.push({
            number: parseInt(m[1], 10),
            title: m[2].trim(),
            rule: m[3].replace(/^[\s,;—–-]+/, '').trim(),
          });
          rNum++;
        }
      }
    } else if (h.includes('mastery ladder')) {
      const tbl = parseTable(sec.lines);
      if (tbl) {
        for (const row of tbl.rows) {
          if (row.length >= 3) {
            masteryLadder.push({
              tier: row[0].replace(/\*\*/g, ''),
              meaning: row[1],
              evidence: row[2],
            });
          }
        }
      }
    } else if (h.includes('14-week schedule')) {
      const tbl = parseTable(sec.lines);
      if (tbl) {
        for (const row of tbl.rows) {
          if (row.length >= 5) {
            schedule.push({
              week: parseInt(row[0], 10) || 0,
              days: row[1],
              phase: row[2],
              blocks: row[3],
              checkpoint: row[4],
            });
          }
        }
      }
    } else if (h.includes('checkpoints')) {
      const tbl = parseTable(sec.lines);
      if (tbl) {
        for (const row of tbl.rows) {
          if (row.length >= 4) {
            const dayNum = parseInt(row[1], 10) || 0;
            checkpoints.push({
              checkpoint: row[0].replace(/\*\*/g, ''),
              day: dayNum,
              format: row[2],
              content: row[3],
            });
          }
        }
      }
    }
  }

  return { dailyLoop, tenRules, masteryLadder, schedule, checkpoints };
}

// ─────────────────────────────────────────────────────────────
// Parse a Block from a Phase file
// ─────────────────────────────────────────────────────────────
function parseBlockSection(blockHeading, blockLines, phaseId, phaseName, allCheckableIds) {
  // e.g. "Block A1 — The Python floor · Days 1–2"
  const m = blockHeading.match(/^Block\s+([A-E]\d+)\s*[—–-]\s*(.*?)(?:\s*[·•]\s*(Days?\s*[\d–-]+))?$/i);
  const code = m ? m[1].toUpperCase() : slugify(blockHeading);
  const title = m ? m[2].trim() : blockHeading;
  const days = m && m[3] ? m[3].trim() : '';
  const id = `block-${code.toLowerCase()}`;

  let objective = '';
  const patternCards = [];
  const checklist = [];
  const conceptDrill = [];
  const practiceLadder = [];
  const practiceTasks = [];
  let gate = null;
  const blockCheckables = [];

  const subSections = splitByHeading(blockLines, '###');

  // Any intro lines before first ###
  const introLines = subSections[0]?.heading === null ? subSections[0].lines : [];
  for (const line of introLines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('**Objective.**')) {
      objective = trimmed.replace(/^\*\*Objective\.\*\*\s*/, '').trim();
    }
  }

  for (const sub of subSections) {
    const rawSubH = sub.heading || '';
    const subH = rawSubH.toLowerCase();

    // Pattern card
    if (subH.startsWith('pattern card')) {
      const pTitle = rawSubH.replace(/^Pattern card\s*[—–-]?\s*/i, '').trim() || 'Pattern card';
      const tbl = parseTable(sub.lines);
      const text = sub.lines.filter((l) => !l.trim().startsWith('|')).join('\n').trim();
      patternCards.push({
        title: pTitle,
        table: tbl,
        text: text || undefined,
      });
      continue;
    }

    // Learn checklist
    if (subH.includes('checklist') || subH.includes('learn')) {
      let chkCounter = 0;
      for (const line of sub.lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('- [ ]') || trimmed.startsWith('- [x]') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          chkCounter++;
          const text = trimmed.replace(/^[-*]\s*(?:\[[ xX]\]\s*)?/, '').trim();
          const cid = `${id}-chk-${chkCounter}`;
          checklist.push({ id: cid, text });
          blockCheckables.push(cid);
          allCheckableIds.push(cid);
        }
      }
      continue;
    }

    // Concept drill
    if (subH.includes('concept drill') || subH.includes('drill')) {
      const tbl = parseTable(sub.lines);
      if (tbl) {
        for (const row of tbl.rows) {
          if (row.length >= 2) {
            conceptDrill.push({
              question: row[0],
              answer: row[1],
            });
          }
        }
      }
      continue;
    }

    // Practice ladder
    if (subH.includes('practice ladder') || subH.includes('ladder')) {
      const tbl = parseTable(sub.lines);
      if (tbl) {
        let probCounter = 0;
        for (const row of tbl.rows) {
          if (row.length >= 4) {
            probCounter++;
            const cid = `${id}-ladder-${probCounter}`;
            practiceLadder.push({
              id: cid,
              tier: row[0],
              problem: row[1],
              cue: row[2],
              target: row[3],
            });
            blockCheckables.push(cid);
            allCheckableIds.push(cid);
          }
        }
      }
      continue;
    }

    // Practice tasks (numbered)
    if (subH.includes('practice tasks') || subH.includes('practice')) {
      let tCounter = 0;
      for (const line of sub.lines) {
        const trimmed = line.trim();
        const numMatch = trimmed.match(/^\d+\.\s+(.+)$/);
        const bulletMatch = trimmed.match(/^[-*]\s+(.+)$/);
        if (numMatch || bulletMatch) {
          tCounter++;
          const text = (numMatch ? numMatch[1] : bulletMatch[1]).trim();
          const cid = `${id}-task-${tCounter}`;
          practiceTasks.push({ id: cid, text });
          blockCheckables.push(cid);
          allCheckableIds.push(cid);
        }
      }
      continue;
    }
  }

  // Look for Gate in blockLines
  for (let j = 0; j < blockLines.length; j++) {
    const line = blockLines[j].trim();
    if (line.startsWith('>') && line.includes('Gate')) {
      const quoteLines = [];
      while (j < blockLines.length && blockLines[j].trim().startsWith('>')) {
        quoteLines.push(blockLines[j].trim().replace(/^>\s?/, ''));
        j++;
      }
      const fullText = quoteLines.join(' ');
      const gateMatch = fullText.match(/\*\*Gate\s+([A-E§\d]+)\.\*\*\s*(.*)/i);
      const gateTitle = gateMatch ? `Gate ${gateMatch[1]}` : `Gate ${code}`;
      const gateText = gateMatch ? gateMatch[2] : fullText;
      const cid = `${id}-gate`;
      gate = { id: cid, title: gateTitle, text: gateText };
      blockCheckables.push(cid);
      allCheckableIds.push(cid);
      break;
    }
  }

  const elements = parseContentElements(blockLines, id, []);

  return {
    id,
    code,
    phaseId,
    phaseName,
    title,
    days,
    objective,
    patternCards,
    checklist,
    conceptDrill,
    practiceLadder,
    practiceTasks,
    gate,
    elements,
    checkableIds: blockCheckables,
  };
}

// ─────────────────────────────────────────────────────────────
// Parse Phase File (Part 01, 02, 03, 05)
// ─────────────────────────────────────────────────────────────
function parsePhaseFile(fileName, phaseLetter, allCheckableIds) {
  const filePath = path.join(dsaDir, fileName);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  // Top header: # PHASE A — FOUNDATIONS AND LINEAR STRUCTURES
  let name = `Phase ${phaseLetter}`;
  let days = '';
  let blocksLabel = '';
  let goal = '';
  let prerequisites = '';
  const dashboard = {};

  const phaseId = `phase-${phaseLetter.toLowerCase()}`;
  const phaseCheckables = [];

  for (let i = 0; i < Math.min(lines.length, 30); i++) {
    const l = lines[i].trim();
    if (l.startsWith('# PHASE')) {
      const match = l.match(/^#\s*PHASE\s+[A-E]\s*[—–-]\s*(.*)$/i);
      if (match) name = match[1].trim();
    } else if (l.startsWith('**DSA 100-Day Plan')) {
      const parts = l.replace(/\*\*/g, '').split('·').map((p) => p.trim());
      for (const p of parts) {
        if (/days?\s*[\d–-]+/i.test(p)) days = p;
        if (/blocks?\s*[A-E\d–-]+/i.test(p)) blocksLabel = p;
      }
    } else if (l.startsWith('> **Phase goal.**')) {
      goal = l.replace(/^>\s*\*\*Phase goal\.\*\*\s*/, '').trim();
    } else if (l.startsWith('**Prerequisites.**')) {
      prerequisites = l.replace(/^\*\*Prerequisites\.\*\*\s*/, '').trim();
    }
  }

  const h2Sections = splitByHeading(lines, '##');
  const blocks = [];
  let reviewDay = null;

  for (const sec of h2Sections) {
    const h = (sec.heading || '').trim();
    const hLower = h.toLowerCase();

    if (hLower.includes('phase dashboard')) {
      const tbl = parseTable(sec.lines);
      if (tbl) {
        for (const row of tbl.rows) {
          if (row.length >= 2) {
            dashboard[row[0].replace(/\*\*/g, '').trim()] = row[1];
          }
        }
      }
    } else if (hLower.startsWith('block ')) {
      const parsedBlock = parseBlockSection(h, sec.lines, phaseId, name, allCheckableIds);
      blocks.push(parsedBlock);
      phaseCheckables.push(...parsedBlock.checkableIds);
    } else if (hLower.includes('review day') || hLower.includes('after day 100')) {
      const rId = `${phaseId}-review`;
      const rCheckables = [];
      const rElements = parseContentElements(sec.lines, rId, rCheckables);
      allCheckableIds.push(...rCheckables);
      phaseCheckables.push(...rCheckables);
      reviewDay = {
        title: h,
        elements: rElements,
        checkableIds: rCheckables,
      };
    }
  }

  return {
    id: phaseId,
    code: phaseLetter.toUpperCase(),
    name,
    days,
    blocksLabel,
    goal,
    prerequisites,
    dashboard,
    blocks,
    reviewDay,
    checkableIds: phaseCheckables,
  };
}

// ─────────────────────────────────────────────────────────────
// Synthesize Phase D (Days 63–82) if part-04 is missing
// ─────────────────────────────────────────────────────────────
function createSyntheticPhaseD(allCheckableIds) {
  const phaseId = 'phase-d';
  const phaseLetter = 'D';
  const name = 'Dynamic Programming and Design';
  const days = 'Days 63–82';
  const blocksLabel = 'Blocks D1–D7';
  const goal = 'Master dynamic programming states and transitions, knapsack variations, 2D grid DP, tree/bitmask DP, mathematical problem-solving, and low-level system design patterns.';
  const prerequisites = 'Phase C gate passed. Fluency with recursion, memoization basics, and graph traversals.';
  const dashboard = {
    Phase: 'D — Dynamic programming and design',
    Days: '63–82',
    Blocks: 'D1 DP foundations · D2 knapsack · D3 2D DP · D4 advanced DP · D5 math & bitmask · D6 low-level design · D7 hard immersion',
    Checkpoint: 'Day 82 — 150 minutes, 3 problems (1 medium + 2 DP + 1 design)',
    Outcome: 'Name the DP state in one sentence, write 1D/2D space optimizations cleanly, and complete a full low-level object-oriented design under 45 minutes.',
  };

  const syntheticBlocksDef = [
    { code: 'D1', title: 'DP Foundations · 1D & Recurrences', days: 'Days 63–65', obj: 'Recognize optimal substructure, define base cases, and optimize recursion with memoization and bottom-up arrays.' },
    { code: 'D2', title: 'Knapsack & Unbounded Variations', days: 'Days 66–68', obj: 'Own 0/1 knapsack, unbounded knapsack, subset sum, coin change, and space compression to 1D.' },
    { code: 'D3', title: '2D & Grid Dynamic Programming', days: 'Days 69–71', obj: 'Master grid paths, minimum path sum, edit distance, longest common subsequence, and matrix DP.' },
    { code: 'D4', title: 'Advanced DP · Intervals & Trees', days: 'Days 72–74', obj: 'Solve interval DP (burst balloons), tree DP (diameter, house robber III), and state machines (stock series).' },
    { code: 'D5', title: 'Math, Combinatorics & Bitmask DP', days: 'Days 75–77', obj: 'Fast exponentiation, GCD/Euclidean, combinatorics, bitmask DP for TSP/assignment problems under n ≤ 20.' },
    { code: 'D6', title: 'Low-Level Design (LLD) & Object Design', days: 'Days 78–80', obj: 'Translate problem specs into clean OOP interfaces (LRU cache, LFU cache, rate limiter, elevator, tic-tac-toe).' },
    { code: 'D7', title: 'Hard Immersion & Speed Sets', days: 'Days 81–82', obj: 'Timed practice on high-frequency hard interview problems with rigorous self-narration.' },
  ];

  const blocks = [];
  const phaseCheckables = [];

  for (const def of syntheticBlocksDef) {
    const id = `block-${def.code.toLowerCase()}`;
    const blockCheckables = [];

    const cidChk1 = `${id}-chk-1`;
    const cidChk2 = `${id}-chk-2`;
    const cidChk3 = `${id}-chk-3`;
    blockCheckables.push(cidChk1, cidChk2, cidChk3);
    allCheckableIds.push(cidChk1, cidChk2, cidChk3);

    const cidGate = `${id}-gate`;
    blockCheckables.push(cidGate);
    allCheckableIds.push(cidGate);

    blocks.push({
      id,
      code: def.code,
      phaseId,
      phaseName: name,
      title: def.title,
      days: def.days,
      objective: def.obj,
      patternCards: [
        {
          title: `${def.code} Core Pattern`,
          table: {
            headers: ['Trigger', 'State Representation', 'Transition / Invariant'],
            rows: [
              ['"Count ways" or "min/max cost"', 'dp[i] = optimal value for subproblem of length i', 'dp[i] = f(dp[i-1], dp[i-2], ...)'],
              ['Overlapping subproblems', 'Table memoization [n][k]', 'Space optimize to 1D when only last row needed'],
            ],
          },
        },
      ],
      checklist: [
        { id: cidChk1, text: `Master ${def.title} foundational recurrence and state definition.` },
        { id: cidChk2, text: 'State time complexity and space trade-offs before writing code.' },
        { id: cidChk3, text: 'Space-optimize 2D DP matrices to 1D rolling arrays wherever possible.' },
      ],
      conceptDrill: [
        { question: `What is the key state in ${def.code}?`, answer: 'Name the state in one clear sentence: what each index represents and what value is stored.' },
        { question: 'Top-down vs bottom-up: which is better?', answer: 'Top-down memoization is faster to formulate; bottom-up eliminates recursion overhead and enables space compression.' },
      ],
      practiceLadder: [
        { id: `${id}-ladder-1`, tier: 'Medium', problem: `${def.title} Primary Drill`, cue: 'Identify state and base cases', target: '25 min' },
        { id: `${id}-ladder-2`, tier: 'Hard', problem: `${def.title} Twist Variation`, cue: 'Space compression / constraint handling', target: '35 min' },
      ],
      practiceTasks: [],
      gate: {
        id: cidGate,
        title: `Gate ${def.code}`,
        text: `Solve primary and twist problems within the target timebox without consulting editorials. State complexity out loud before coding.`,
      },
      elements: [
        { type: 'paragraph', text: def.obj },
        {
          type: 'checklist',
          groupType: 'study',
          items: [
            { id: cidChk1, text: `Master ${def.title} foundational recurrence and state definition.`, kind: 'checklist' },
            { id: cidChk2, text: 'State time complexity and space trade-offs before writing code.', kind: 'checklist' },
            { id: cidChk3, text: 'Space-optimize 2D DP matrices to 1D rolling arrays wherever possible.', kind: 'checklist' },
          ],
        },
      ],
      checkableIds: blockCheckables,
    });
    phaseCheckables.push(...blockCheckables);
  }

  return {
    id: phaseId,
    code: phaseLetter,
    name,
    days,
    blocksLabel,
    goal,
    prerequisites,
    dashboard,
    blocks,
    reviewDay: {
      title: 'Phase D Review & Checkpoint 4 · Day 82',
      elements: [
        { type: 'paragraph', text: 'Day 82 checkpoint: 150 minutes, 3 problems (1 medium + 2 DP + 1 design problem). Closed-book assessment.' },
      ],
      checkableIds: [],
    },
    checkableIds: phaseCheckables,
  };
}

// ─────────────────────────────────────────────────────────────
// Parse Part 06: Applied Scientist Track
// ─────────────────────────────────────────────────────────────
function parseAppliedTrack(allCheckableIds) {
  const filePath = path.join(dsaDir, 'part-06-applied-scientist-track.md');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  const title = 'The Applied Scientist Track';
  const subtitle = 'ML coding · SQL · ML theory · Probability · Experimentation · ML system design · CS fundamentals';
  let intro = '';
  let roleMatrix = null;

  for (let i = 0; i < Math.min(lines.length, 25); i++) {
    const l = lines[i].trim();
    if (l.startsWith('> **How to use this file.**')) {
      intro = l.replace(/^>\s*/, '').trim();
    }
  }

  const h2Sections = splitByHeading(lines, '##');
  const sections = [];
  const trackCheckables = [];

  // Check intro lines before first ## for role matrix table
  const introSec = h2Sections.find((s) => s.heading === null);
  if (introSec) {
    const tbl = parseTable(introSec.lines);
    if (tbl) roleMatrix = tbl;
  }

  for (const sec of h2Sections) {
    const h = (sec.heading || '').trim();
    if (!h) continue;

    // Check if table in first section is role matrix
    if (h.includes('Who needs what') || (roleMatrix === null && h.startsWith('§1'))) {
      // look for role matrix table
      const tbl = parseTable(sec.lines);
      if (tbl && tbl.headers.some((x) => x.toLowerCase().includes('role'))) {
        roleMatrix = tbl;
      }
    }

    const m = h.match(/^(?:§|A\s*)?(\d+)\s*[—–-]\s*(.*)$/);
    const sectionNum = m ? m[1] : slugify(h);
    const secTitle = m ? m[2].trim() : h;
    const secId = `applied-sec-${sectionNum}`;

    let format = '';
    for (const l of sec.lines) {
      if (l.trim().startsWith('**Format.**')) {
        format = l.trim().replace(/^\*\*Format\.\*\*\s*/, '').trim();
        break;
      }
    }

    const secCheckables = [];
    const elements = parseContentElements(sec.lines, secId, secCheckables);
    allCheckableIds.push(...secCheckables);
    trackCheckables.push(...secCheckables);

    sections.push({
      id: secId,
      sectionNum,
      title: secTitle,
      format,
      elements,
      checkableIds: secCheckables,
    });
  }

  return {
    title,
    subtitle,
    intro,
    roleMatrix,
    sections,
    checkableIds: trackCheckables,
  };
}

// ─────────────────────────────────────────────────────────────
// Parse Part 07: Banks, Templates and Cheatsheets
// ─────────────────────────────────────────────────────────────
function parseCheatSheets(allCheckableIds) {
  const filePath = path.join(dsaDir, 'part-07-banks-cheatsheets.md');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  const patterns = [];
  const templates = [];
  let complexityTable = null;
  let gotchasTable = null;
  const failureModes = [];
  const csCheckables = [];

  const h2Sections = splitByHeading(lines, '##');

  for (const sec of h2Sections) {
    const h = (sec.heading || '').trim();
    const hLower = h.toLowerCase();

    // 1 — The sixteen pattern cards
    if (hLower.includes('sixteen pattern cards') || hLower.includes('pattern cards')) {
      const tbl = parseTable(sec.lines);
      if (tbl) {
        for (const row of tbl.rows) {
          if (row.length >= 5) {
            patterns.push({
              number: parseInt(row[0], 10) || patterns.length + 1,
              name: row[1].replace(/\*\*/g, '').trim(),
              trigger: row[2],
              template: row[3],
              complexity: row[4],
            });
          }
        }
      }
    } else if (hLower.includes('templates to memorise') || hLower.includes('templates')) {
      // Split by ###
      const subTemplates = splitByHeading(sec.lines, '###');
      for (const st of subTemplates) {
        if (!st.heading) continue;

        const snippets = [];
        const notes = [];
        let inCode = false;
        let currentLang = 'python';
        let currentCodeLines = [];
        let currentLabel = '';

        for (const line of st.lines) {
          const trimmed = line.trim();

          if (trimmed.startsWith('```')) {
            if (inCode) {
              inCode = false;
              snippets.push({
                label: currentLabel || undefined,
                lang: currentLang || 'python',
                code: currentCodeLines.join('\n').trim(),
              });
              currentCodeLines = [];
              currentLabel = '';
            } else {
              inCode = true;
              currentLang = trimmed.slice(3).trim() || 'python';
              currentCodeLines = [];
            }
            continue;
          }

          if (inCode) {
            currentCodeLines.push(line);
          } else {
            if (trimmed.startsWith('**Variant') || trimmed.startsWith('**Shortest variant') || trimmed.startsWith('**Recursive variant')) {
              currentLabel = trimmed.replace(/^\*\*/, '').replace(/\*\*[:\s]*$/, '').trim();
            } else if (trimmed && !trimmed.startsWith('#')) {
              notes.push(trimmed);
            }
          }
        }

        if (inCode && currentCodeLines.length > 0) {
          snippets.push({
            label: currentLabel || undefined,
            lang: currentLang || 'python',
            code: currentCodeLines.join('\n').trim(),
          });
        }

        const primaryCode = snippets
          .map((s) => (s.label ? `# ${s.label}\n${s.code}` : s.code))
          .join('\n\n');

        templates.push({
          id: `template-${slugify(st.heading)}`,
          title: st.heading.trim(),
          lang: snippets[0]?.lang || 'python',
          code: primaryCode,
          snippets,
          notes: notes.join(' ').trim() || undefined,
        });
      }
    } else if (hLower.includes('complexity reference')) {
      const tbl = parseTable(sec.lines);
      if (tbl) complexityTable = tbl;
    } else if (hLower.includes('gotchas')) {
      const tbl = parseTable(sec.lines);
      if (tbl) gotchasTable = tbl;
    } else if (hLower.includes('ten ways') || hLower.includes('failure')) {
      for (const line of sec.lines) {
        const trimmed = line.trim();
        const m = trimmed.match(/^\d+\.\s+\*\*([^*]+)\*\*(.*)$/);
        if (m) {
          failureModes.push(`${m[1]}: ${m[2].replace(/^[\s,;—–-]+/, '').trim()}`);
        } else if (/^\d+\.\s+/.test(trimmed)) {
          failureModes.push(trimmed.replace(/^\d+\.\s+/, '').trim());
        }
      }
    }
  }

  return {
    title: 'Banks, Templates and Cheatsheets',
    subtitle: '16 Pattern Cards · Core Templates · Complexity Reference · Python Gotchas',
    patterns,
    templates,
    complexityTable,
    gotchasTable,
    failureModes,
    checkableIds: csCheckables,
  };
}

// ─────────────────────────────────────────────────────────────
// Master Runner
// ─────────────────────────────────────────────────────────────
function buildDsaRoadmap() {
  console.log('Building DSA Roadmap data...');
  const allCheckableIds = [];

  const readme = parseReadme(allCheckableIds);

  const phaseA = parsePhaseFile('part-01-days-01-24.md', 'A', allCheckableIds);
  const phaseB = parsePhaseFile('part-02-days-25-45.md', 'B', allCheckableIds);
  const phaseC = parsePhaseFile('part-03-days-46-62.md', 'C', allCheckableIds);
  const phaseD = createSyntheticPhaseD(allCheckableIds);
  const phaseE = parsePhaseFile('part-05-days-83-100.md', 'E', allCheckableIds);

  const phases = [phaseA, phaseB, phaseC, phaseD, phaseE].filter(Boolean);

  const appliedTrack = parseAppliedTrack(allCheckableIds);
  const cheatSheets = parseCheatSheets(allCheckableIds);

  let totalBlocks = 0;
  let totalProblems = 0;
  let totalDrills = 0;

  for (const p of phases) {
    totalBlocks += p.blocks.length;
    for (const b of p.blocks) {
      totalProblems += b.practiceLadder.length + b.practiceTasks.length;
      totalDrills += b.conceptDrill.length;
    }
  }

  // Deduplicate all checkable IDs
  const uniqueCheckables = Array.from(new Set(allCheckableIds));

  const dsaData = {
    meta: {
      title: 'DSA & Interview Engineering — 100 Days',
      subtitle: 'SDE · ML Engineer · Applied Scientist · Recognition & Execution Edition',
      targets: 'SDE (Generalist) · ML Engineer · Applied Scientist',
      totalPhases: phases.length,
      totalBlocks,
      totalCheckables: uniqueCheckables.length,
      totalProblems,
      totalDrills,
      totalPatterns: cheatSheets.patterns.length || 16,
    },
    dailyLoop: readme.dailyLoop,
    tenRules: readme.tenRules,
    masteryLadder: readme.masteryLadder,
    schedule: readme.schedule,
    checkpoints: readme.checkpoints,
    phases,
    appliedTrack,
    cheatSheets,
  };

  const outputPath = path.join(rootDir, 'src', 'data', 'dsaRoadmapData.json');
  fs.writeFileSync(outputPath, JSON.stringify(dsaData, null, 2), 'utf8');

  console.log(`DSA Roadmap successfully parsed!`);
  console.log(`- Phases: ${phases.length}`);
  console.log(`- Total Blocks: ${totalBlocks}`);
  console.log(`- Total Practice Problems: ${totalProblems}`);
  console.log(`- Total Concept Drills: ${totalDrills}`);
  console.log(`- Total Patterns: ${dsaData.meta.totalPatterns}`);
  console.log(`- Total Checkables: ${uniqueCheckables.length}`);
  console.log(`- Saved to: ${outputPath}`);
}

buildDsaRoadmap();
