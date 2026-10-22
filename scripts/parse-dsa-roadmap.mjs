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

    // Subheadings (### or ####)
    if (trimmed.startsWith('### ') || trimmed.startsWith('#### ')) {
      const isH4 = trimmed.startsWith('#### ');
      const title = trimmed.replace(/^#{3,4}\s+/, '').trim();
      elements.push({
        type: 'subheading',
        variant: isH4 ? 'group' : 'practice',
        title,
        subtitle: null,
      });
      i++;
      continue;
    }

    // Skip redundant Format paragraph if present
    if (trimmed.startsWith('**Format.**')) {
      i++;
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
          const cid = `${idPrefix}-bullet-${itemCounter}`;
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
// Synthesize Phase D (Days 63–82) with authentic, non-duplicative curriculum
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
    {
      code: 'D1',
      title: 'DP Foundations · 1D & Recurrences',
      days: 'Days 63–65',
      obj: 'Recognize optimal substructure, define base cases, and optimize recursion with memoization and bottom-up 1D arrays.',
      patternCards: [
        {
          title: '1D DP Recurrence Invariant',
          table: {
            headers: ['Pattern Subtype', 'State Representation', 'Transition / Invariant'],
            rows: [
              ['Linear Recurrence', 'dp[i] = best result for prefix nums[0..i]', 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])'],
              ['Subsequence Matching', 'dp[i] = length of LIS ending at index i', 'dp[i] = 1 + max(dp[j]) for j < i where nums[j] < nums[i]'],
              ['Circular Array', 'Run two linear passes: [0..n-2] and [1..n-1]', 'max(pass1, pass2) avoids cycle boundary clash'],
            ],
          },
        },
      ],
      checklist: [
        'Define the DP state in one clear English sentence before touching code.',
        'Identify base cases and boundary offsets explicitly (dp[0], dp[1]).',
        'Compress space from O(n) array to O(1) variables whenever only previous 2 states are needed.',
      ],
      conceptDrill: [
        { question: 'What are the three essential components of every dynamic programming problem?', answer: '1. State definition (what dp[i] represents), 2. Recurrence relation / state transition, 3. Base cases and initialization.' },
        { question: 'How do you identify if a problem exhibits optimal substructure?', answer: 'An optimal solution to the overall problem contains within it optimal solutions to subproblems without cyclic dependencies.' },
        { question: 'When can a 1D DP array be space-optimized to O(1) variables?', answer: 'When computing dp[i] requires only the immediate previous k states (e.g. dp[i-1] and dp[i-2] in Fibonacci/House Robber).' },
      ],
      practiceLadder: [
        { tier: 'Easy', problem: 'Climbing Stairs (LC 70)', cue: 'dp[i] = dp[i-1] + dp[i-2], Fibonacci transition', target: '10 min' },
        { tier: 'Medium', problem: 'House Robber (LC 198)', cue: 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])', target: '15 min' },
        { tier: 'Medium', problem: 'Decode Ways (LC 91)', cue: 'Single digit and two-digit valid code transitions', target: '20 min' },
        { tier: 'Medium', problem: 'Longest Increasing Subsequence (LC 300)', cue: 'Patience sorting binary search or O(n²) DP', target: '25 min' },
        { tier: 'Medium', problem: 'House Robber II (LC 213)', cue: 'Break circle into two subproblems: nums[0..n-2] and nums[1..n-1]', target: '20 min' },
        { tier: 'Medium', problem: 'Maximum Length of Repeated Subarray (LC 718)', cue: 'Suffix match matching dp[i][j] = dp[i-1][j-1] + 1', target: '25 min' },
        { tier: 'Medium', problem: 'Integer Break (LC 343)', cue: 'dp[i] = max(j * (i - j), j * dp[i - j])', target: '20 min' },
      ],
      gate: 'Solve House Robber II and Longest Increasing Subsequence within target timeboxes. State the 1D invariant out loud before coding.',
    },
    {
      code: 'D2',
      title: 'Knapsack & Unbounded Variations',
      days: 'Days 66–68',
      obj: 'Own 0/1 knapsack, unbounded knapsack, subset sum, coin change, and space compression to 1D.',
      patternCards: [
        {
          title: 'Knapsack Loop Invariant',
          table: {
            headers: ['Variation', 'Inner Loop Direction', 'Item Frequency'],
            rows: [
              ['0/1 Knapsack', 'Backward: for w from W down to weight[i]', 'Each item used at most once'],
              ['Unbounded Knapsack', 'Forward: for w from weight[i] up to W', 'Items can be reused infinitely'],
              ['Permutations (Order matters)', 'Target outer loop, items inner loop', 'Counts distinct sequence orders'],
            ],
          },
        },
      ],
      checklist: [
        'Distinguish 0/1 knapsack (backwards loop) from unbounded knapsack (forwards loop).',
        'Transform Target Sum into a positive subset sum target: P = (sum + S) / 2.',
        'Space-optimize 2D knapsack matrix dp[n][W] into a 1D rolling array dp[W].',
      ],
      conceptDrill: [
        { question: 'Why must 0/1 knapsack iterate backwards when space-optimized to a 1D array?', answer: 'Iterating backwards ensures each item is used at most once; forward iteration would reuse the item multiple times (which is unbounded knapsack).' },
        { question: 'In Coin Change II vs Combination Sum IV, what decides whether order matters?', answer: 'Items outer loop counts combinations (order does not matter); Target outer loop counts permutations (order matters).' },
        { question: 'How do you handle negative target sums in knapsack?', answer: 'Mathematically transform into finding positive subset sum P = (sum + target) / 2, or apply index offset.' },
      ],
      practiceLadder: [
        { tier: 'Medium', problem: 'Partition Equal Subset Sum (LC 416)', cue: 'Target = sum(nums) / 2, 0/1 knapsack backward loop', target: '20 min' },
        { tier: 'Medium', problem: 'Target Sum (LC 494)', cue: 'Subset sum transformation: P = (sum + S) / 2', target: '25 min' },
        { tier: 'Medium', problem: 'Coin Change (LC 322)', cue: 'Unbounded knapsack min coins: dp[a] = min(dp[a], dp[a - c] + 1)', target: '20 min' },
        { tier: 'Medium', problem: 'Coin Change II (LC 518)', cue: 'Unbounded knapsack total ways: coins outer loop', target: '20 min' },
        { tier: 'Medium', problem: 'Ones and Zeroes (LC 474)', cue: '2D capacity 0/1 knapsack: dp[m][n] iterating backwards', target: '30 min' },
        { tier: 'Medium', problem: 'Last Stone Weight II (LC 1049)', cue: 'Minimize difference between two partitions, target = sum // 2', target: '25 min' },
        { tier: 'Medium', problem: 'Combination Sum IV (LC 377)', cue: 'Target outer loop counts all ordered permutations', target: '20 min' },
      ],
      gate: 'Clear Partition Equal Subset Sum and Coin Change II without consulting editorials. Prove why loop direction prevents item duplication.',
    },
    {
      code: 'D3',
      title: '2D & Grid Dynamic Programming',
      days: 'Days 69–71',
      obj: 'Master grid paths, minimum path sum, edit distance, longest common subsequence, and matrix DP.',
      patternCards: [
        {
          title: 'Grid & String Matrix DP',
          table: {
            headers: ['Problem Type', 'State Representation', 'Transition'],
            rows: [
              ['Grid Path', 'dp[r][c] = paths / min cost to cell (r, c)', 'dp[r][c] = min(dp[r-1][c], dp[r][c-1]) + grid[r][c]'],
              ['String Matching', 'dp[i][j] = match result for s1[0..i] & s2[0..j]', 'Match: dp[i-1][j-1]+1; Mismatch: max(top, left)'],
              ['Reverse Grid', 'dp[r][c] = minimum health needed at (r, c)', 'Compute backwards from bottom-right to top-left'],
            ],
          },
        },
      ],
      checklist: [
        'Handle 0-indexed string matrix offsets with dummy 0-th row and column.',
        'Recognize when grid constraints require reverse DP (bottom-right to top-left).',
        'Space-optimize 2D string DP from O(M×N) to O(N) using two rows or one rolling row.',
      ],
      conceptDrill: [
        { question: 'When does a 2D grid DP need to be computed backwards (bottom-right to top-left)?', answer: 'When future decisions impose constraints on current minimum resources (like remaining health in Dungeon Game).' },
        { question: 'How do you compress an (M × N) 2D DP matrix to O(N) space?', answer: 'If dp[i][j] depends only on row i-1 and current row i, maintain one 1D row array and store diagonal in a temporary variable.' },
        { question: 'What is the state transition for Edit Distance when characters differ?', answer: 'dp[i][j] = 1 + min(dp[i-1][j] (delete), dp[i][j-1] (insert), dp[i-1][j-1] (replace)).' },
      ],
      practiceLadder: [
        { tier: 'Medium', problem: 'Unique Paths (LC 62)', cue: 'dp[r][c] = dp[r-1][c] + dp[r][c-1], rolling 1D array', target: '15 min' },
        { tier: 'Medium', problem: 'Minimum Path Sum (LC 64)', cue: 'dp[r][c] = min(dp[r-1][c], dp[r][c-1]) + grid[r][c]', target: '20 min' },
        { tier: 'Medium', problem: 'Longest Common Subsequence (LC 1143)', cue: 'Match: dp[i-1][j-1]+1; Mismatch: max(dp[i-1][j], dp[i][j-1])', target: '25 min' },
        { tier: 'Hard', problem: 'Edit Distance (LC 72)', cue: 'Insert, Delete, Replace operations on 2D table', target: '35 min' },
        { tier: 'Medium', problem: 'Maximal Square (LC 221)', cue: "dp[r][c] = min(left, top, diag) + 1 when cell is '1'", target: '25 min' },
        { tier: 'Hard', problem: 'Dungeon Game (LC 174)', cue: 'Bottom-right to top-left reverse DP for minimum initial health', target: '35 min' },
        { tier: 'Medium', problem: 'Interleaving String (LC 97)', cue: '2D matching of s1[i-1] and s2[j-1] against s3[i+j-1]', target: '30 min' },
      ],
      gate: 'Implement Edit Distance and Dungeon Game under timer. Explain cell transitions and base case initializations out loud.',
    },
    {
      code: 'D4',
      title: 'Advanced DP · Intervals & Trees',
      days: 'Days 72–74',
      obj: 'Solve interval DP (burst balloons), tree DP (diameter, house robber III), and state machines (stock series).',
      patternCards: [
        {
          title: 'Interval & Tree Subproblems',
          table: {
            headers: ['Technique', 'State Representation', 'Key Invariant'],
            rows: [
              ['Interval DP', 'dp[i][j] = optimal answer on subarray nums[i..j]', 'Iterate by length len=1..n; split at k popped last'],
              ['Tree DP', 'Postorder DFS returns tuple of states', 'Parent combines child tuples in O(1) per node'],
              ['State Machine', 'Finite states (Hold, Sold, Cooldown)', 'Transitions model legal stock transaction flow'],
            ],
          },
        },
      ],
      checklist: [
        'Order interval DP loops by increasing interval length to guarantee subproblems are solved.',
        'Use postorder traversal on trees so children return answers before parent processes.',
        'State machine DP: identify valid state transitions and handle cooldown days cleanly.',
      ],
      conceptDrill: [
        { question: 'In Interval DP (like Burst Balloons), why do we define k as the LAST item popped rather than first?', answer: 'Because popping k last means subproblems [i, k] and [k, j] remain independent and bounded by i and j.' },
        { question: 'How does Tree DP pass information to avoid redundant recomputations?', answer: 'Postorder DFS: child returns tuple of states (e.g. with/without root) to parent, solving in O(N) time.' },
        { question: 'In Russian Doll Envelopes, why must height be sorted in descending order when widths are equal?', answer: 'Descending height prevents two envelopes with the same width from being included in the same strictly increasing subsequence.' },
      ],
      practiceLadder: [
        { tier: 'Hard', problem: 'Burst Balloons (LC 312)', cue: 'Interval DP: consider balloon k popped LAST in range [i, j]', target: '35 min' },
        { tier: 'Medium', problem: 'House Robber III (LC 337)', cue: 'Tree postorder DFS returning (rob_current, not_rob_current)', target: '25 min' },
        { tier: 'Medium', problem: 'Best Time to Buy and Sell Stock with Cooldown (LC 309)', cue: '3-state machine: Hold, Sold (cooldown), Rest', target: '25 min' },
        { tier: 'Hard', problem: 'Russian Doll Envelopes (LC 354)', cue: 'Sort by width asc, height desc; run LIS on heights', target: '35 min' },
        { tier: 'Hard', problem: 'Minimum Cost to Merge Stones (LC 1000)', cue: 'Interval DP combining k piles with prefix sums', target: '40 min' },
        { tier: 'Hard', problem: 'Distinct Subsequences (LC 115)', cue: 'String matching with duplicate skips: dp[i][j]', target: '30 min' },
      ],
      gate: 'Clear Burst Balloons and House Robber III. Explain why interval ordering guarantees subproblem availability.',
    },
    {
      code: 'D5',
      title: 'Math, Combinatorics & Bitmask DP',
      days: 'Days 75–77',
      obj: 'Fast exponentiation, combinatorics, bitmask DP for TSP/assignment problems under n ≤ 20.',
      patternCards: [
        {
          title: 'Bitmask State Encoding',
          table: {
            headers: ['Operation', 'Bitwise Expression', 'Complexity'],
            rows: [
              ['Check i-th bit', '(mask >> i) & 1 == 1', 'O(1)'],
              ['Set i-th bit', 'mask | (1 << i)', 'O(1)'],
              ['Submask Iteration', 'sub = (sub - 1) & mask', 'O(3^n) total over all masks'],
            ],
          },
        },
      ],
      checklist: [
        'Recognize when n ≤ 20 indicates an exponential bitmask DP representation.',
        'Master binary exponentiation in O(log n) for fast power computation.',
        'Use memoized minimax recursion with bitmask visited states for game theory problems.',
      ],
      conceptDrill: [
        { question: 'What is the complexity signature of Bitmask DP?', answer: 'O(2^n · n) time and O(2^n) space, viable strictly when n ≤ 20.' },
        { question: 'How do you check if the k-th item is set in mask, and how do you set it?', answer: 'Check: (mask & (1 << k)) != 0; Set: mask | (1 << k); Toggle: mask ^ (1 << k).' },
        { question: 'How does fast binary exponentiation compute x^n in O(log n)?', answer: 'If n is even: x^n = (x^2)^(n/2); if n is odd: x^n = x · x^(n-1).' },
      ],
      practiceLadder: [
        { tier: 'Medium', problem: 'Pow(x, n) (LC 50)', cue: 'Binary exponentiation in O(log n), handle negative n', target: '15 min' },
        { tier: 'Medium', problem: 'Super Pow (LC 372)', cue: 'Modular exponentiation with array of digits: a^b % 1337', target: '25 min' },
        { tier: 'Medium', problem: 'Can I Win (LC 464)', cue: 'Minimax with bitmask state representing chosen integers', target: '30 min' },
        { tier: 'Medium', problem: 'Beautiful Arrangement (LC 526)', cue: 'Bitmask DP / memoized backtracking on valid index divisibility', target: '25 min' },
        { tier: 'Hard', problem: 'Find the Shortest Superstring (LC 943)', cue: 'TSP with overlap graph: dp[mask][last] bitmask DP', target: '40 min' },
        { tier: 'Hard', problem: 'Smallest Sufficient Team (LC 1125)', cue: 'Bitmask DP covering all required skills with minimum people', target: '40 min' },
      ],
      gate: 'Solve Can I Win and Pow(x, n). Explain why bitmask state compression works within memory limits.',
    },
    {
      code: 'D6',
      title: 'Low-Level Design (LLD) & Object Design',
      days: 'Days 78–80',
      obj: 'Translate complex problem specs into modular OOP class hierarchies. Apply classic design patterns (Composite, Trie, Strategy, Command), define clean interfaces, and manage concurrency invariants without duplicating Phase E systems.',
      patternCards: [
        {
          title: 'Object-Oriented Design Framework',
          table: {
            headers: ['System / Problem', 'Core Pattern & Architecture', 'Concurrency & Key Invariant'],
            rows: [
              ['In-Memory File System', 'Composite Pattern + Trie path traversal', 'Delimiter `/` tokenization; sentinel root node'],
              ['Tic-Tac-Toe / Board Game', 'Row, Column, Diagonal count arrays', 'O(1) win checking per move; player ID state tracking'],
              ['Search Autocomplete', 'Trie + Top-3 frequency min-heap', 'Prefix caching; atomic update on sentence completion'],
              ['Twitter / Microblogging', 'User graph + merge-k sorted heap', 'Decouple tweet storage from user follower relationships'],
              ['Underground Railway', 'Check-in hash map + route table', 'Thread-safe concurrent tap-in and tap-out tracking'],
              ['Snake Game Simulation', 'Deque coordinates + boundary set', 'O(1) collision detection and head movement'],
            ],
          },
        },
      ],
      checklist: [
        'Apply the 7-step OOD blueprint: Requirements → Entities → Interfaces → Relationships → Patterns → Concurrency → Tests.',
        'Favor Composition over Inheritance to keep classes loosely coupled and testable.',
        'Use Sentinel dummy nodes to eliminate boundary null checks in tree and list hierarchies.',
        'State thread safety considerations (granular locks vs global lock) for all in-memory stores.',
      ],
      conceptDrill: [
        { question: 'What is the 7-step blueprint for answering any Low-Level Design (LLD) question in 35 minutes?', answer: '1. Clarify Requirements (3-5 functional + non-functional) → 2. Extract Core Entities (nouns) → 3. Design Method Interfaces & Signatures → 4. Define Class Relationships (Composition over inheritance) → 5. Select Design Patterns → 6. Address Concurrency & Locks → 7. Walkthrough test scenario.' },
        { question: 'Why is Composition preferred over Inheritance in OOP design interviews?', answer: 'Composition avoids deep, brittle class hierarchies, allows dynamic behavior swapping at runtime (e.g. Strategy Pattern), and adheres to the Open-Closed Principle.' },
        { question: 'How do you guarantee thread safety in an in-memory storage or counter system?', answer: 'Use granular locking (e.g., per-user bucket mutex or ReadWriteLock) rather than a single global lock to prevent read starvation while guaranteeing atomic write operations.' },
        { question: 'What is the Sentinel Node pattern and why is it essential in design problems?', answer: 'Dummy head and tail nodes eliminate null pointer edge checks when inserting or removing items from doubly-linked lists or file hierarchies.' },
      ],
      practiceLadder: [
        { tier: 'Medium', problem: 'Design Tic-Tac-Toe (LC 348)', cue: 'O(1) move verification via row/col/diag counters', target: '20 min' },
        { tier: 'Hard', problem: 'Design In-Memory File System (LC 588)', cue: 'Trie / Composite directory hierarchy with path parsing', target: '35 min' },
        { tier: 'Medium', problem: 'Design Twitter (LC 355)', cue: 'Follower graph + merge-k sorted tweet feeds with heap', target: '30 min' },
        { tier: 'Hard', problem: 'Design Search Autocomplete System (LC 642)', cue: 'Trie + historical query frequency ranking', target: '35 min' },
        { tier: 'Medium', problem: 'Design Underground System (LC 1396)', cue: 'Check-in/out tracking + route average compute', target: '25 min' },
        { tier: 'Medium', problem: 'Design Snake Game (LC 353)', cue: 'Deque coordinate simulation + 2D boundary collision checks', target: '25 min' },
        { tier: 'Medium', problem: 'Design Browser History (LC 1472)', cue: 'Doubly-linked list or two-stack URL history traversal', target: '20 min' },
        { tier: 'Medium', problem: 'Design Food Rating System (LC 2353)', cue: 'Hash map + SortedSet / Heap for top cuisine ratings', target: '30 min' },
      ],
      gate: 'Implement Design In-Memory File System (LC 588) and Design Tic-Tac-Toe (LC 348) from scratch in under 35 minutes with zero syntax errors. Explain class diagram and concurrency considerations out loud.',
    },
    {
      code: 'D7',
      title: 'Hard Immersion & Speed Sets',
      days: 'Days 81–82',
      obj: 'Timed practice on high-frequency hard interview problems with rigorous self-narration and recovery mechanisms.',
      patternCards: [
        {
          title: 'Hard Immersion Invariants',
          table: {
            headers: ['Technique', 'Problem Shape', 'Core Invariant'],
            rows: [
              ['3D Grid Flood Fill', 'Trapping Rain Water II', 'Min-heap priority queue maintains water level from boundary inward'],
              ['Interval Splitting', 'Minimum Cost to Cut a Stick', 'dp[i][j] considers all candidate cuts between stick bounds i and j'],
              ['String Wildcards', 'Regular Expression / Wildcards', '2D DP with Kleene star * zero-or-more branch matching'],
            ],
          },
        },
      ],
      checklist: [
        'State brute force in the first 2 minutes before attempting complex multi-data-structure solutions.',
        'Maintain continuous narration while writing complex multi-pointer / heap loops.',
        'Execute the 9-step interview script under realistic 45-minute countdown constraints.',
      ],
      conceptDrill: [
        { question: 'What is the fundamental difference between 1D Trapping Rain Water and 2D/3D Trapping Rain Water II?', answer: '1D uses two pointers from left/right; 2D grid uses a Min-Heap priority queue starting from all border cells, expanding inward to maintain the water level envelope.' },
        { question: "How does Regular Expression Matching (LC 10) handle the '*' wildcard?", answer: "'*' matches zero occurrences (dp[i][j-2]) OR one/more occurrences if preceding char matches (dp[i-1][j])." },
        { question: 'What is the recovery protocol when you realize mid-code that your hard problem invariant is broken?', answer: 'Stop typing immediately, state the failure mode out loud to the interviewer, explain why the invariant failed, and propose the corrected state.' },
      ],
      practiceLadder: [
        { tier: 'Hard', problem: 'Trapping Rain Water II (LC 407)', cue: '3D priority queue min-heap flood-fill from boundary inward', target: '40 min' },
        { tier: 'Hard', problem: 'Minimum Cost to Cut a Stick (LC 1547)', cue: 'Interval DP: add 0 and n, sort cuts, dp[i][j] = cost + cuts[j] - cuts[i]', target: '35 min' },
        { tier: 'Hard', problem: 'Minimum Window Subsequence (LC 727)', cue: 'Two pointers + reverse validation for contiguous substring', target: '35 min' },
        { tier: 'Hard', problem: 'Regular Expression Matching (LC 10)', cue: "2D DP handling '.' and '*' Kleene star transitions", target: '40 min' },
        { tier: 'Hard', problem: 'Wildcard Matching (LC 44)', cue: "2D DP / greedy two-pointer matching with '?' and '*'", target: '35 min' },
      ],
      gate: 'Pass Checkpoint 4 (Day 82): 150 minutes, 3 problems (1 medium + 2 DP + 1 LLD Design). Verify all solutions pass all edge cases.',
    },
  ];

  const blocks = [];
  const phaseCheckables = [];

  for (const def of syntheticBlocksDef) {
    const id = `block-${def.code.toLowerCase()}`;
    const blockCheckables = [];

    // Checklist checkables
    const chkItems = def.checklist.map((text, idx) => {
      const cid = `${id}-chk-${idx + 1}`;
      blockCheckables.push(cid);
      allCheckableIds.push(cid);
      return { id: cid, text };
    });

    // Ladder checkables
    const ladderItems = def.practiceLadder.map((pr, idx) => {
      const cid = `${id}-ladder-${idx + 1}`;
      blockCheckables.push(cid);
      allCheckableIds.push(cid);
      return {
        id: cid,
        tier: pr.tier,
        problem: pr.problem,
        cue: pr.cue,
        target: pr.target,
      };
    });

    // Gate checkable
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
      patternCards: def.patternCards,
      checklist: chkItems,
      conceptDrill: def.conceptDrill,
      practiceLadder: ladderItems,
      practiceTasks: [],
      gate: {
        id: cidGate,
        title: `Gate ${def.code}`,
        text: def.gate,
      },
      elements: [
        { type: 'paragraph', text: def.obj },
        {
          type: 'checklist',
          groupType: 'study',
          items: chkItems.map((c) => ({ id: c.id, text: c.text, kind: 'checklist' })),
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

    // 1 — Pattern cards
    if (hLower.includes('pattern cards') || hLower.includes('pattern')) {
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
              templateRef: row[5] ? row[5].trim() : undefined,
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
