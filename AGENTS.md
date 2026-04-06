<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Authoring and approval (Librica Med)

- **Default:** Do not edit files until the user replies with **APPLY** (or **yes** / **go ahead** / **keep it**). First, list files and show the proposed change; then ask for that keyword. Same rule as `.cursor/rules/approval-before-edits.mdc` (**alwaysApply**).
- **Skip the extra ask only if** the same message already approves writes (e.g. “APPLY: bump hero padding”, “implement exactly this patch”).
- **Do not change global Cursor or VS Code settings** (e.g. `~/Library/Application Support/Cursor/User/settings.json`) unless the user explicitly asks; if you do, state the file path and every key you changed.

### Cursor (human) — review & agent behavior

- **Agent auto-run (terminal / tools):** *Cursor Settings* → **Agent** → set **Auto-run** to **Ask every time** (wording may vary by version). Optional: `~/.cursor/permissions.json` only affects **terminal/MCP** allowlists, not whether the agent edits files.
- **File edits:** Controlled by whether you use **Agent** vs **Ask** / chat mode and how Cursor shows the diff. Use **Ask** when you only want suggestions; use **Undo** or reject hunks in the diff UI if something applied you did not want.

Repo rules cannot force Cursor’s product UI to add an extra “keep” button; they only instruct the model.
