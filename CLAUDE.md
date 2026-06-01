# CLAUDE.md

This file provides guidance for AI assistants (Claude Code and similar tools) working in this repository.

---

## Repository Overview

This is the `chuenoch/claude` repository. At the time of writing it is freshly initialized — no source files exist yet. Update this section once a language, framework, or project purpose is established.

---

## Project Structure

```
(to be filled in as the project grows)
```

When files are added, document top-level directories here with a one-line description of their purpose.

---

## Development Workflow

### Branching

- Default branch: `main`
- Feature branches follow the pattern `<scope>/<short-description>` (e.g. `feat/add-auth`, `fix/login-redirect`)
- AI-generated branches use the pattern `claude/<task-slug>` (auto-assigned by Claude Code on the web)

### Commit Messages

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short summary>

[optional body]
```

Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

Examples:
```
feat(auth): add JWT login endpoint
fix(api): handle null user gracefully
docs: update CLAUDE.md with project structure
```

### Pull Requests

- Keep PRs focused on a single concern.
- Include a short summary and a test plan in the PR description.
- Do not merge without passing CI (once CI is configured).

---

## AI Assistant Conventions

### General Rules

- **Read before editing.** Always read a file before modifying it.
- **Minimal changes.** Only change what is needed to fulfill the task; do not refactor unrelated code.
- **No speculative abstraction.** Do not introduce helpers, factories, or abstractions unless explicitly required.
- **No comments that describe what the code does.** Only add a comment when the *why* is non-obvious (hidden constraint, workaround, subtle invariant).
- **No defensive code for impossible states.** Trust framework guarantees; only validate at system boundaries.

### Risky Actions — Always Confirm First

Before executing any of the following, check with the user:

- Deleting files, branches, or database tables
- Force-pushing or destructive `git reset`
- Pushing to `main` / `master`
- Sending messages to external services (Slack, email, GitHub comments)
- Modifying CI/CD configuration

### Security

- Never introduce SQL injection, XSS, command injection, or other OWASP Top-10 vulnerabilities.
- Never commit secrets, `.env` files, or credential files.
- Use parameterised queries, output encoding, and input validation at system boundaries.

---

## Testing

> Fill in once a test framework is chosen.

- **Run all tests:** `<command>`
- **Run a single test:** `<command>`
- **Lint:** `<command>`
- **Type-check:** `<command>`

---

## Environment Setup

> Fill in once dependencies and tooling are established.

```bash
# Example — update once real setup is known
git clone https://github.com/chuenoch/claude.git
cd claude
# install dependencies, configure env vars, etc.
```

---

## Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | AI assistant guidance (this file) |

Update this table as significant files and directories are added.

---

## Updating This File

Keep CLAUDE.md current. When the project structure, tooling, or conventions change, update the relevant section here as part of the same PR. Outdated guidance is worse than no guidance.
