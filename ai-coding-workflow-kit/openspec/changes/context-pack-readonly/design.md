# Design: Read-Only Context Pack

## Decision

`context-pack` composes existing primitives:

- `createTaskContext`
- `buildCodeMap`
- `renderCodeMapMarkdown`

This avoids a new indexing model and keeps the command easy to reason about.

## Boundary

The command is intentionally read-only:

- It reads repository files under `--root`.
- It writes Markdown to stdout.
- It does not edit files.
- It does not execute project commands.
- It does not access network resources.

This boundary matters because the command may later be wrapped by an agent tool or MCP server. The safe core should stay deterministic before external integration is considered.

## Compatibility

The command adds a new CLI entrypoint. Existing command outputs stay unchanged except the unknown-command help text now includes `context-pack`.
