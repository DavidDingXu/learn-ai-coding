import { promises as fs } from 'node:fs';
import path from 'node:path';

const DEFAULT_IGNORES = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.next',
  '.turbo',
  '.cache'
]);

export async function listFiles(rootDir, options = {}) {
  const root = path.resolve(rootDir);
  const maxFiles = options.maxFiles ?? 500;
  const ignores = new Set([...(options.ignores ?? []), ...DEFAULT_IGNORES]);
  const result = [];

  async function walk(dir) {
    if (result.length >= maxFiles) return;
    const entries = await fs.readdir(dir, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      if (result.length >= maxFiles) return;
      if (ignores.has(entry.name)) continue;
      const abs = path.join(dir, entry.name);
      const rel = path.relative(root, abs);
      if (entry.isDirectory()) {
        await walk(abs);
      } else if (entry.isFile()) {
        result.push(rel);
      }
    }
  }

  await walk(root);
  return result;
}

export async function readText(filePath) {
  return fs.readFile(filePath, 'utf8');
}
