import { buildCodeMap, renderCodeMapMarkdown } from './codemap.js';
import { createTaskContext } from './task-context.js';

export async function createContextPack(options) {
  if (!options.title || options.title === true) throw new Error('--title is required');

  const root = options.root ?? '.';
  const codeMap = renderCodeMapMarkdown(await buildCodeMap(root));
  const taskContext = createTaskContext({
    title: options.title,
    files: options.files,
    constraints: options.constraints,
    done: options.done
  });

  return [
    `# Context Pack: ${options.title}`,
    '',
    '## Read-Only Boundary',
    '',
    '- Reads repository files under the requested root.',
    '- Does not edit files.',
    '- Does not execute project commands.',
    '- Does not access network resources.',
    '',
    '## Task Context',
    '',
    taskContext,
    '',
    '## Repository Code Map',
    '',
    codeMap,
    '',
    '## Verification Handoff',
    '',
    '- Run the focused command named in the task context.',
    '- Record exact commands and results in a verification ledger.',
    '- Treat this context pack as navigation, not as proof of correctness.',
    ''
  ].join('\n');
}
