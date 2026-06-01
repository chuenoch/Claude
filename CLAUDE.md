# CLAUDE.md

This file provides guidance for AI assistants (Claude Code and similar tools) working in this repository.

---

## Project Overview

This is a **web application**. Stack, framework, and purpose are yet to be decided — update this section once those choices are made.

---

## Project Structure

Not defined yet. Update this section once top-level directories are established, with a one-line description of each.

```
(add directories here as the project grows)
```

---

## Development Environment

Setup process is not yet documented. Once established, record the steps here:

```bash
# Clone and install
git clone https://github.com/chuenoch/claude.git
cd claude

# TODO: add install, env var setup, and database seed steps
```

---

## Running the App

```bash
# TODO: add the command to start the local dev server
```

---

## Testing, Linting & Type-checking

Not configured yet. Once tooling is chosen, document the commands here:

```bash
# Run tests
# TODO

# Lint
# TODO

# Type-check
# TODO
```

---

## Coding Conventions

No hard conventions have been set yet. Apply sensible defaults:

- Write clear, readable code over clever one-liners.
- Name things accurately — good names remove the need for comments.
- Only add a comment when the *why* is non-obvious (a hidden constraint, a workaround, a subtle invariant).
- Do not add error handling or validation for states that cannot happen.
- Do not introduce abstractions beyond what the current task requires.

Update this section when the team agrees on linting rules, formatting tools, or style preferences.

---

## Git Workflow

No formal workflow has been decided. Until one is, follow these safe defaults:

- Branch off `main` for all changes.
- Use descriptive branch names: `<type>/<short-description>` (e.g. `feat/user-auth`, `fix/login-redirect`).
- Write commit messages in the imperative mood: *"add login page"*, not *"added login page"*.
- Open a PR for every change — do not push directly to `main`.

---

## External Services & Environment Variables

No integrations or environment variables are defined yet. Document them here as they are added:

| Variable | Purpose | Required |
|----------|---------|---------|
| *(none yet)* | | |

---

## AI Assistant Rules

### Always do

- Read a file before editing it.
- Make the smallest change that fulfils the task — do not refactor surrounding code.
- Confirm with the user before taking any action that affects shared state (pushes, PR comments, external API calls).

### Never do

- **Never delete files without explicit user confirmation.** Always ask first, regardless of context.
- Never push directly to `main`.
- Never commit secrets, `.env` files, or credential files.
- Never introduce SQL injection, XSS, command injection, or other OWASP Top-10 vulnerabilities.

### Confirm before proceeding

- Deleting or renaming files or directories
- Dropping or migrating database tables
- Force-pushing or destructive `git reset`
- Modifying CI/CD configuration
- Sending messages to external services (Slack, email, GitHub comments)

---

## Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | AI assistant guidance (this file) |

Update this table as significant files and directories are added.

---

## Keeping This File Current

Update CLAUDE.md in the same PR as any change that affects project structure, tooling, or conventions. Outdated guidance is worse than no guidance.
