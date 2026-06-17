#!/usr/bin/env node
import { buildCodeMap, renderCodeMapMarkdown, renderContextAuditMarkdown } from './lib/codemap.js';
import { createContextPack } from './lib/context-pack.js';
import { createTaskContext } from './lib/task-context.js';
import { renderLedgerReport, validateLedgerFile } from './lib/verification-ledger.js';

const [command, ...args] = process.argv.slice(2);
const options = parseArgs(args);

try {
  if (command === 'codemap') {
    const root = options.root ?? '.';
    const summary = await buildCodeMap(root);
    process.stdout.write(renderCodeMapMarkdown(summary));
  } else if (command === 'context-audit') {
    const root = options.root ?? '.';
    const summary = await buildCodeMap(root);
    process.stdout.write(renderContextAuditMarkdown(summary));
  } else if (command === 'task-context') {
    process.stdout.write(createTaskContext(options));
  } else if (command === 'context-pack') {
    process.stdout.write(await createContextPack(options));
  } else if (command === 'verify-ledger') {
    if (!options.file) throw new Error('--file is required');
    const result = await validateLedgerFile(options.file);
    process.stdout.write(renderLedgerReport(result));
    if (!result.ok) process.exitCode = 1;
  } else {
    process.stderr.write(`Unknown command: ${command ?? '(none)'}\n`);
    process.stderr.write('Commands: codemap, context-audit, task-context, context-pack, verify-ledger\n');
    process.exitCode = 1;
  }
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}

function parseArgs(values) {
  const parsed = {};
  for (let index = 0; index < values.length; index += 1) {
    const token = values[index];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const next = values[index + 1];
    if (!next || next.startsWith('--')) {
      parsed[key] = true;
    } else {
      parsed[key] = next;
      index += 1;
    }
  }
  return parsed;
}
