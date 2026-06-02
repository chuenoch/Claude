# CLAUDE.md

AI assistant guidance for the **Dodgerswin Notification Bot**.

---

## Project Overview

A Python automation bot that monitors Los Angeles Dodgers home-game results
via the MLB Stats API and sends a notification whenever the Dodgers win at
Dodger Stadium.

**Stack:** Python 3 · MLB Stats API · Twilio SMS

---

## Project Goals

- Poll or subscribe to MLB game results for Dodgers home games
- Detect a final "W" outcome at Dodger Stadium
- Fire a notification (message/alert) to the configured recipient(s)

---

## Key Behaviors

- **Trigger:** Dodgers win AND venue is Dodger Stadium (home game only)
- **Data source:** MLB Stats API (https://statsapi.mlb.com)
- **Output:** Twilio SMS to `TWILIO_TO_NUMBER`
- **Run mode:** Continuous loop (default, polls every 5 min) or single-shot via `--once` flag (for cron)
- **Dedup:** Notified game PKs stored in `.notified_games.json` — no double-texts per game

---

## AI Assistant Rules

- Never delete files without explicit user confirmation.
- Do not push directly to `main` — always use a branch + PR.
- Do not add comments describing what code does; only add comments for non-obvious *why*.
- Never commit secrets or `.env` files — use environment variables for API keys and webhook URLs.

---

## Project Structure

```
dodgerswin/
  bot.py             # Main bot: polls MLB API, detects home wins, sends SMS
  requirements.txt   # requests, twilio
  .env.example       # Template for required env vars (copy to .env)
  .notified_games.json  # Runtime dedup log (auto-created, gitignored)
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `TWILIO_ACCOUNT_SID` | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `TWILIO_FROM_NUMBER` | Twilio phone number (E.164 format) |
| `TWILIO_TO_NUMBER` | Recipient phone number (E.164 format) |

---

## Running

```bash
pip install -r requirements.txt

# Continuous loop (polls every 5 min)
python bot.py

# Single-shot (for cron)
python bot.py --once
```

Cron example (check every 5 min, 3 PM–midnight Pacific):
```
*/5 15-23 * * * cd /path/to/dodgerswin && python bot.py --once
```
