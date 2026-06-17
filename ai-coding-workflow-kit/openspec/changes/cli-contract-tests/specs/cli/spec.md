# CLI Contract Delta

## Modified Requirements

### Requirement: Error output

The CLI SHALL write user-facing errors to stderr and return a non-zero exit code.

#### Scenario: Missing ledger file

- WHEN the user runs `node src/cli.js verify-ledger`
- THEN stderr includes `--file is required`
- AND stdout is empty
- AND the exit code is non-zero

#### Scenario: Unknown command

- WHEN the user runs `node src/cli.js unknown`
- THEN stderr includes `Unknown command: unknown`
- AND stderr includes `Commands: codemap, context-audit, task-context, context-pack, verify-ledger`
- AND stdout is empty
- AND the exit code is non-zero

### Requirement: Documentation commands

The README SHALL show commands that can run against files present in the repository.

#### Scenario: Validate passing ledger example

- WHEN the user follows the README command for validating a passing ledger
- THEN the referenced file exists under `examples/`
- AND the command exits with status `0`
