import os
import json
import datetime
import time
import sys
import requests

DODGERS_TEAM_ID = 119
DODGER_STADIUM_VENUE_ID = 22
NOTIFIED_FILE = os.path.join(os.path.dirname(__file__), ".notified_games.json")
POLL_INTERVAL = 300  # seconds


def get_todays_games() -> list[dict]:
    today = datetime.date.today().isoformat()
    url = (
        "https://statsapi.mlb.com/api/v1/schedule"
        f"?sportId=1&teamId={DODGERS_TEAM_ID}&date={today}&hydrate=linescore"
    )
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()
    games: list[dict] = []
    for date_entry in resp.json().get("dates", []):
        games.extend(date_entry.get("games", []))
    return games


def is_home_win(game: dict) -> bool:
    if game.get("venue", {}).get("id") != DODGER_STADIUM_VENUE_ID:
        return False
    if game.get("status", {}).get("abstractGameState") != "Final":
        return False
    home = game.get("teams", {}).get("home", {})
    return (
        home.get("team", {}).get("id") == DODGERS_TEAM_ID
        and bool(home.get("isWinner", False))
    )


def build_message(game: dict) -> str:
    away_name = game["teams"]["away"]["team"]["name"]
    home_score = game["teams"]["home"]["score"]
    away_score = game["teams"]["away"]["score"]
    return (
        f"Dodgers WIN at home! "
        f"{away_name} {away_score} — LA Dodgers {home_score}. Let's go Blue!"
    )


def send_discord_message(body: str) -> None:
    requests.post(
        os.environ["DISCORD_WEBHOOK_URL"],
        json={"content": body},
        timeout=10,
    ).raise_for_status()


def load_notified() -> set[str]:
    if os.path.exists(NOTIFIED_FILE):
        with open(NOTIFIED_FILE) as f:
            return set(json.load(f))
    return set()


def save_notified(notified: set[str]) -> None:
    with open(NOTIFIED_FILE, "w") as f:
        json.dump(sorted(notified), f)


def run_once() -> None:
    notified = load_notified()
    for game in get_todays_games():
        game_pk = str(game["gamePk"])
        if game_pk not in notified and is_home_win(game):
            message = build_message(game)
            send_discord_message(message)
            notified.add(game_pk)
            save_notified(notified)
            print(f"Discord message sent: {message}")


if __name__ == "__main__":
    once = "--once" in sys.argv
    if once:
        run_once()
    else:
        print(f"Polling every {POLL_INTERVAL}s. Ctrl-C to stop.")
        while True:
            try:
                run_once()
            except Exception as e:
                print(f"Error: {e}", file=sys.stderr)
            time.sleep(POLL_INTERVAL)
