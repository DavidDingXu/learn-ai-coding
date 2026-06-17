# Proposal: Add Read-Only Context Pack

## Why

AI Coding tasks often need a compact handoff that combines task intent, relevant files, repository navigation, and verification reminders. `codemap` and `task-context` already provide parts of this, but the user has to stitch them together manually.

The new `context-pack` command should create that handoff without writing files, executing commands, or accessing network resources. This keeps the tool safe to use before deciding whether a richer MCP integration is justified.

## What Changes

- Add `context-pack` as a CLI command.
- Combine task context and code map into one Markdown output.
- Include an explicit read-only boundary in the output.
- Keep project command execution as a handoff item, not something the tool runs.

## Out Of Scope

- Starting an MCP server.
- Writing generated files to disk.
- Executing tests or shell commands.
- Reading external systems such as issues, browsers, databases, or network documents.

## Verification

- `npm test`
- `node src/cli.js context-pack --title "Inspect CLI contract" --files "src/cli.js,test/cli.test.js" --done "npm test"`
