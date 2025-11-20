Explore the code.

Do not write any code until I instruct you to "write elegant code" in a future step.

Before we continue to the planning stage: use the explorer subagent to dig in, explore the codebase, read relevant files, and prepare to discuss the ins and outs of how it works. To start, please read CLAUDE.md and the files in .claude/context/ and .claude/guidelines/, if you haven't already. Ignore node_modules and paths listed in .gitignore. View the app at http://localhost:3000 (web) or http://localhost:5173 (widget) using MCP Playwright and take a snapshot for your contextual awareness.

As a reminder, do not start API or UI servers in the background. The local API and UI dev services are already running, and you can tail the logs at api.log and ui.log, as needed. The explorer subagent can manually explore the app using MCP Playwright.

$ARGUMENTS