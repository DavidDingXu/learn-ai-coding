# CLI Contract Delta

## Modified Requirements

### Requirement: Known commands

The CLI SHALL expose these commands:

- `codemap`
- `context-audit`
- `task-context`
- `context-pack`
- `verify-ledger`

#### Scenario: Run context-pack

- GIVEN a title and optional files, constraints, and done criteria
- WHEN the user runs `node src/cli.js context-pack --title "<title>"`
- THEN the command writes a Markdown context pack to stdout
- AND the output includes a read-only boundary
- AND the command does not edit files, execute project commands, or access network resources

### Requirement: Error output

The CLI SHALL write user-facing errors to stderr and return a non-zero exit code.

#### Scenario: Unknown command

- WHEN the user runs `node src/cli.js unknown`
- THEN stderr includes `Unknown command: unknown`
- AND stderr includes `Commands: codemap, context-audit, task-context, context-pack, verify-ledger`
- AND stdout is empty
- AND the exit code is non-zero
