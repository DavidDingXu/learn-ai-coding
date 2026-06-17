import path from 'node:path';
import { listFiles } from './file-utils.js';

const SOURCE_EXTENSIONS = new Set([
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.mjs',
  '.cjs',
  '.py',
  '.java',
  '.go',
  '.rs',
  '.kt',
  '.swift',
  '.php',
  '.rb'
]);

const TEST_PATTERNS = [
  /(^|\/)tests?\//,
  /\.test\./,
  /\.spec\./,
  /Test\.(java|kt)$/
];

const DOC_PATTERNS = [
  /(^|\/)docs?\//,
  /README\.md$/i,
  /CHANGELOG\.md$/i,
  /AGENTS\.md$/i,
  /CLAUDE\.md$/i
];

const CONFIG_PATTERNS = [
  /package\.json$/,
  /pnpm-lock\.yaml$/,
  /pom\.xml$/,
  /build\.gradle$/,
  /pyproject\.toml$/,
  /requirements\.txt$/,
  /Makefile$/,
  /Taskfile\.yml$/,
  /justfile$/,
  /tsconfig\.json$/,
  /eslint\.config\./
];

const CAREFUL_PATH_PATTERNS = [
  /(^|\/)generated\//,
  /(^|\/)dist\//,
  /(^|\/)build\//,
  /(^|\/)coverage\//,
  /(^|\/)vendor\//,
  /(^|\/)legacy\//,
  /(^|\/)migrations?\//,
  /(^|\/)fixtures?\//,
  /(^|\/)examples?\//,
  /(^|\/)demos?\//
];

export async function buildCodeMap(rootDir, options = {}) {
  const files = await listFiles(rootDir, options);
  return summarizeFiles(files);
}

export function summarizeFiles(files) {
  const summary = {
    totalFiles: files.length,
    sourceFiles: [],
    testFiles: [],
    docs: [],
    configs: [],
    carefulPaths: [],
    topDirectories: []
  };

  const dirCounts = new Map();
  for (const file of files) {
    const top = file.includes(path.sep) ? file.split(path.sep)[0] : '.';
    dirCounts.set(top, (dirCounts.get(top) ?? 0) + 1);

    const ext = path.extname(file);
    if (SOURCE_EXTENSIONS.has(ext)) summary.sourceFiles.push(file);
    if (TEST_PATTERNS.some((pattern) => pattern.test(file))) summary.testFiles.push(file);
    if (DOC_PATTERNS.some((pattern) => pattern.test(file))) summary.docs.push(file);
    if (CONFIG_PATTERNS.some((pattern) => pattern.test(file))) summary.configs.push(file);
    if (CAREFUL_PATH_PATTERNS.some((pattern) => pattern.test(file))) summary.carefulPaths.push(file);
  }

  summary.topDirectories = [...dirCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 12)
    .map(([directory, count]) => ({ directory, count }));

  return summary;
}

export function renderCodeMapMarkdown(summary) {
  return [
    '# Code Map',
    '',
    `- Total files scanned: ${summary.totalFiles}`,
    `- Source files: ${summary.sourceFiles.length}`,
    `- Test files: ${summary.testFiles.length}`,
    `- Docs: ${summary.docs.length}`,
    `- Configs: ${summary.configs.length}`,
    '',
    '## Top Directories',
    '',
    ...summary.topDirectories.map((item) => `- \`${item.directory}\`: ${item.count}`),
    '',
    '## Files AI Should Inspect First',
    '',
    ...[
      ...summary.docs.slice(0, 8),
      ...summary.configs.slice(0, 8),
      ...summary.testFiles.slice(0, 8)
    ].map((file) => `- \`${file}\``),
    ''
  ].join('\n');
}

export function renderContextAuditMarkdown(summary) {
  const firstRead = [
    ...summary.docs.slice(0, 8),
    ...summary.configs.slice(0, 8),
    ...summary.testFiles.slice(0, 8)
  ];
  const candidateEntries = summary.sourceFiles
    .filter((file) => !summary.carefulPaths.includes(file))
    .slice(0, 12);
  const verificationHints = [
    ...summary.configs.slice(0, 6),
    ...summary.testFiles.slice(0, 12)
  ];
  const carefulPaths = summary.carefulPaths.slice(0, 16);

  return [
    '# Context Audit',
    '',
    'This is a heuristic navigation report. Treat it as an agent-generated draft, not as proof of runtime behavior.',
    '',
    '## Files Agent Should Read First',
    '',
    ...renderList(firstRead, 'No docs, configs, or tests were detected. Ask the agent to identify the project entry points before editing.'),
    '',
    '## Candidate Entry Hints',
    '',
    ...renderList(candidateEntries, 'No source entry hints were detected from file names alone.'),
    '',
    '## Test And Verification Hints',
    '',
    ...renderList(verificationHints, 'No obvious verification files were detected. Define a focused verification command before editing.'),
    '',
    '## Paths To Treat Carefully',
    '',
    ...renderList(carefulPaths, 'No generated, build, vendor, legacy, migration, fixture, example, or demo paths were detected.'),
    '',
    '## Human Review Required',
    '',
    '- Confirm the real runtime entry before accepting edits.',
    '- Confirm whether generated, vendor, build, legacy, migration, fixture, example, and demo paths are editable for this task.',
    '- Confirm the focused verification command and expected result.',
    '- Confirm task-specific business constraints that file names cannot reveal.',
    ''
  ].join('\n');
}

function renderList(files, emptyMessage) {
  if (files.length === 0) return [`- ${emptyMessage}`];
  return files.map((file) => `- \`${file}\``);
}
