# CLI Contract Spec

## Requirements

### Requirement: Known commands

The CLI SHALL expose these commands:

- `codemap`
- `context-audit`
- `task-context`
- `context-pack`
- `verify-ledger`

#### Scenario: Run codemap

- GIVEN a project directory
- WHEN the user runs `node src/cli.js codemap --root .`
- THEN the command writes a Markdown code map to stdout
- AND the output includes `# Code Map`

#### Scenario: Run context-audit

- GIVEN a project directory
- WHEN the user runs `node src/cli.js context-audit --root .`
- THEN the command writes a Markdown context audit to stdout
- AND the output includes `# Context Audit`
- AND the output includes `Human Review Required`

#### Scenario: Run task-context

- GIVEN a title and optional files, constraints, and done criteria
- WHEN the user runs `node src/cli.js task-context --title "<title>"`
- THEN the command writes a Markdown task context package to stdout

#### Scenario: Run context-pack

- GIVEN a title and optional files, constraints, and done criteria
- WHEN the user runs `node src/cli.js context-pack --title "<title>"`
- THEN the command writes a Markdown context pack to stdout
- AND the output includes a read-only boundary
- AND the command does not edit files, execute project commands, or access network resources

#### Scenario: Run verify-ledger

- GIVEN a verification ledger file
- WHEN the user runs `node src/cli.js verify-ledger --file <path>`
- THEN the command validates required ledger sections and command evidence

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
