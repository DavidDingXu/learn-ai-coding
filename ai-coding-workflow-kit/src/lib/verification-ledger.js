import { readText } from './file-utils.js';

const REQUIRED_SECTIONS = [
  'Baseline',
  'Change Summary',
  'Verification Commands',
  'Evidence',
  'Residual Risk'
];

export async function validateLedgerFile(filePath) {
  const content = await readText(filePath);
  return validateLedger(content);
}

export function validateLedger(content) {
  const missing = REQUIRED_SECTIONS.filter((section) => {
    const pattern = new RegExp(`^##\\s+${escapeRegExp(section)}\\s*$`, 'mi');
    return !pattern.test(content);
  });

  const hasCommand = /```(?:bash|sh|shell)?\n[\s\S]*?\n```/m.test(content);
  const hasPassedSignal = /\b(PASS|passed|success|0 failures|通过)\b/i.test(content);

  return {
    ok: missing.length === 0 && hasCommand && hasPassedSignal,
    missing,
    hasCommand,
    hasPassedSignal
  };
}

export function renderLedgerReport(result) {
  if (result.ok) {
    return 'Verification ledger looks usable: required sections, command block, and pass signal found.';
  }

  const lines = ['Verification ledger is incomplete.'];
  if (result.missing.length > 0) {
    lines.push(`Missing sections: ${result.missing.join(', ')}`);
  }
  if (!result.hasCommand) {
    lines.push('Missing command block with the verification command.');
  }
  if (!result.hasPassedSignal) {
    lines.push('Missing pass signal such as PASS, passed, success, or 通过.');
  }
  return lines.join('\n');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
