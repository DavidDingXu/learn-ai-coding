export function createTaskContext(input) {
  const title = requireText(input.title, 'title');
  const files = parseList(input.files);
  const constraints = parseList(input.constraints);
  const done = parseList(input.done);

  return [
    `# Task Context: ${title}`,
    '',
    '## Goal',
    '',
    input.goal?.trim() || '- Describe the behavior change before asking AI to edit code.',
    '',
    '## Files AI Should Inspect First',
    '',
    ...listOrPlaceholder(files, 'Add the entry, implementation, test, and config files.'),
    '',
    '## Constraints',
    '',
    ...listOrPlaceholder(constraints, 'List APIs, dependencies, generated files, or behaviors that must not change.'),
    '',
    '## Done When',
    '',
    ...listOrPlaceholder(done, 'List tests, commands, UI checks, or manual verification evidence.'),
    '',
    '## Questions Before Coding',
    '',
    '- Which existing behavior must remain compatible?',
    '- Which test or command proves the change?',
    '- What should AI do if it needs to expand the diff?',
    ''
  ].join('\n');
}

function requireText(value, field) {
  if (!value || !String(value).trim()) {
    throw new Error(`${field} is required`);
  }
  return String(value).trim();
}

function parseList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function listOrPlaceholder(items, placeholder) {
  if (items.length > 0) return items.map((item) => `- ${item}`);
  return [`- ${placeholder}`];
}
