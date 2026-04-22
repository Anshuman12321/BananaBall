# Backend overview (Capstone API)

This backend is a **FastAPI** service that currently supports a playable **stub loop**:

- Create a `User`
- Create some `Player`s
- Create a `Game` (you get a stable `game_id`)
- Join the game (creates a `Team` per user)
- Start the draft
- Draft players (duplicate prevention + roster limit enforced)
- Advance time by weeks (simulation stub emits events into the game log)
- View the game log (injuries/outcomes/notes/etc)

The current storage layer is **in-memory** and is designed to support **multiple games at once** by keying everything off `game_id`.

## Run the API

From the repo root:

```bash
python -m uvicorn backend.main:app --reload
```

Then open the docs:
- Swagger UI: `http://127.0.0.1:8000/docs`
- OpenAPI JSON: `http://127.0.0.1:8000/openapi.json`

## Core data model (high level)

- **`User`** (`backend/app/models/user.py`)
  - `user_id`, `username`
- **`Player`** (`backend/app/models/player.py`)
  - basketball-only positions: `PG/SG/SF/PF/C` plus common fantasy slots `G/F/UTIL`
  - `stats` is a free-form dict (so the sim/AI can iterate quickly)
- **`Game`** (`backend/app/models/game.py`)
  - `game_id`: stable identifier for online play / multiple concurrent games
  - `teams_by_user_id`: each user gets a `Team`
  - `drafted_player_ids`: duplicate prevention across teams
  - `current_week`: time progression
  - `simulation_events`: append-only **game log**
- **Simulation events** (`backend/app/models/simulation.py`)
  - `SimulationEvent`: injury/outcome/role change/note
  - `SimulationStepResult`: returned from a simulation engine step

## “How to play” (stub walkthrough using HTTP)

### 1) Create a user

`POST /api/users`

```json
{ "username": "alice" }
```

### 2) Create players (seed a small pool)

`POST /api/players`

```json
{ "full_name": "Test Player", "position": "PG", "real_team": "BOS" }
```

Repeat as needed.

### 3) Create a game

`POST /api/games`

```json
{ "owner_user_id": "<alice-user-id>" }
```

Response includes `game_id`.

### 4) Join the game (creates your team)

`POST /api/games/{game_id}/join`

```json
{ "user_id": "<alice-user-id>", "team_name": "Alice Team" }
```

### 5) Start the draft

`POST /api/games/{game_id}/draft/start`

### 6) Draft a player

`POST /api/games/{game_id}/draft/pick`

```json
{ "user_id": "<alice-user-id>", "player_id": "<some-player-id>" }
```

Duplicate prevention is enforced via `drafted_player_ids`.

### 7) Advance time by a week

`POST /api/games/{game_id}/simulate/next-week`

This calls the configured simulation engine. Right now it’s a stub that appends a log entry.

### 8) View the game log

`GET /api/games/{game_id}/log`

Optional query params:
- `week_min`
- `week_max`
- `type` (one of: `injury`, `game_outcome`, `role_change`, `note`)

## AI / simulation scaffolding

### Simulation engine interface

`backend/app/services/simulation_engine.py` defines a plug-in point:

- `SIM_ENGINE.step_week(game) -> SimulationStepResult`

The default implementation is a safe no-op stub.

### Allow-listed AI actions

If/when you run an external AI agent, you should only expose **the explicit allow-list**:

- `backend/app/services/ai_actions.py`
- `AI_ACTIONS.allowed_functions()` returns the exact callable set

This is intended to keep the AI integration safe and predictable.

## Where to extend next

- Add matchups, scoring, and standings updates (currently only `current_week` and a placeholder `standings` map exist).
- Swap `InMemoryStore` for a database repository (Postgres/SQLite/etc).
- Implement a real simulation engine (rules-based, AI-based, or hybrid).

