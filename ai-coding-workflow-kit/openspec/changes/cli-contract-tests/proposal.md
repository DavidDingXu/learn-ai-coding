# Proposal: Add CLI Contract Evidence

## Why

The CLI is the main interface of `ai-coding-workflow-kit`. A small implementation can still break users when stdout, stderr, exit codes, or README commands drift. The current tests cover library behavior, but the process-level CLI contract needs explicit evidence.

## What Changes

- Add process-level tests for unknown command and missing `--file`.
- Keep successful command output unchanged.
- Keep errors on stderr.
- Keep failure exit codes non-zero.
- Fix the README `verify-ledger` command to reference an existing ledger file.

## Out Of Scope

- Adding a CLI framework.
- Adding `--help` or `--version`.
- Renaming existing commands.
- Changing Markdown output shape for successful commands.

## Verification

- `npm test`
- Manual command checks:
  - `node src/cli.js unknown`
  - `node src/cli.js verify-ledger`
  - `node src/cli.js verify-ledger --file examples/verification-ledger.pass.md`
