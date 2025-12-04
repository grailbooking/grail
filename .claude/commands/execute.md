Now ultrathink and use the the executor subagent to write elegant code that completes this.

$ARGUMENTS

If a specific .claude/plans/*.md file is referenced in the context above, first read that full file from beginning to end.

Do not add new unit tests, integration tests or backwards compatibility unless explicitly requested.

Go step by step. Run all lint checks, build checks, type checks and unit tests on each file once you've finished making changes, and check API server background process logs before moving on to the next file. For frontend UI changes, perform a Quick Visual Check, and check for errors in the UI server background process logs, and browser console logs using MCP Playwright. We don't want to introduce any bugs as we implement new features. Write elegant code to correct any new errors and critical warnings that appear as you go.

When you're done implementing, do one final pass of all lint checks, build checks, type checks and unit tests across the entire codebase. Be sure to run these in one-time mode and not watch mode, so you don't get stuck. Load up the web app in the browser using MCP Playwright and navigating around the app checking for critical console errors.  Write elegant code to make any final corrections to any new errors and critical warnings that you find.

As a reminder, do not start any local dev servers in the background. The local web app dev services are already running, and you can tail the logs at app.log, as needed. The executor subagent can manually verify changes are working at http://localhost:3000 (web) or http://localhost:5173 (widget) with MCP Playwright.

When you're finished, add to the very end of your implementation summary an extremely brief recommended Git commit message, based on the changes made. DO NOT say Generated with Claude Code. DO NOT say Co-Authored-By: Claude.