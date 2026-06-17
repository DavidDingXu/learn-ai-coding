import test from 'node:test';
import assert from 'node:assert/strict';
import { renderLedgerReport, validateLedger } from '../src/lib/verification-ledger.js';

test('accepts a ledger with required sections, command block, and pass signal', () => {
  const result = validateLedger(`
## Baseline
Reproduced failing checkout test.

## Change Summary
Restricted status transition.

## Verification Commands
\`\`\`bash
npm test
\`\`\`

## Evidence
PASS 12 tests passed.

## Residual Risk
Manual payment provider callback not covered.
`);

  assert.equal(result.ok, true);
  assert.deepEqual(result.missing, []);
});

test('reports missing sections and missing command evidence', () => {
  const result = validateLedger('## Baseline\nNo command yet.');
  assert.equal(result.ok, false);
  assert.deepEqual(result.missing, [
    'Change Summary',
    'Verification Commands',
    'Evidence',
    'Residual Risk'
  ]);
  assert.equal(result.hasCommand, false);
  assert.equal(result.hasPassedSignal, false);
  assert.match(renderLedgerReport(result), /Missing sections/);
});
