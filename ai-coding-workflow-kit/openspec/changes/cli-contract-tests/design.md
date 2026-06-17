# Design: CLI Contract Evidence

## Decision

Use Node's built-in `node:test` runner with `child_process.spawnSync` to test the CLI process boundary. This keeps the tests close to the user-facing behavior without introducing a CLI framework or test dependency.

## User-Visible Contract

The process boundary includes:

- command name
- argv parsing
- stdout
- stderr
- exit code
- README command accuracy

Library tests can verify pure functions, but they cannot prove stderr and exit status. CLI contract tests should therefore spawn `node src/cli.js ...` directly.

## Compatibility

The current successful command outputs stay unchanged. The change adds tests and README correction; it does not change the command names, output format, or parser behavior.

## Risks

- Process tests are slower than function tests, so they should stay focused.
- Assertions should check stable contract text, not every character of the full output.
- README examples can drift again if command names or example files change without review.
