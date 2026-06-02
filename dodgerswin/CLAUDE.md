# CLAUDE.md

AI assistant guidance for the **Dodgerswin Notification Bot**.

---

## Project Overview

A Python automation bot that monitors Los Angeles Dodgers home-game results
via the MLB Stats API and sends a notification whenever the Dodgers win at
Dodger Stadium.

**Stack:** Python 3 · MLB Stats API · (notification channel TBD — e.g. email, Slack, SMS)

---

## Project Goals

- Poll or subscribe to MLB game results for Dodgers home games
- Detect a final "W" outcome at Dodger Stadium
- Fire a notification (message/alert) to the configured recipient(s)

---

## Key Behaviors

- **Trigger:** Dodgers win AND venue is Dodger Stadium (home game only)
- **Data source:** MLB Stats API (https://statsapi.mlb.com)
- **Output:** Push notification / message (channel configurable)
- **Run mode:** Scheduled bot (cron / loop)

---

## AI Assistant Rules

- Never delete files without explicit user confirmation.
- Do not push directly to `main` — always use a branch + PR.
- Do not add comments describing what code does; only add comments for non-obvious *why*.
- Never commit secrets or `.env` files — use environment variables for API keys and webhook URLs.
