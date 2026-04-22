# Backend flowchart

This file describes the **current playable stub flow** and where the AI/simulation layer plugs in.

## Gameplay flow (API-driven)

```mermaid
flowchart TD
  A[Client] -->|POST /api/users| U[User created]
  A -->|POST /api/players (repeat)| P[Player pool seeded]

  A -->|POST /api/games| G[Game created<br/>game_id returned]
  A -->|POST /api/games/{game_id}/join| J[User joins game<br/>Team auto-created]

  J -->|POST /api/games/{game_id}/draft/start| D[Drafting state]

  D -->|POST /api/games/{game_id}/draft/pick| DP[Draft pick]
  DP -->|Enforce| ND[No duplicates<br/>Roster limit]
  ND --> D

  D -->|POST /api/games/{game_id}/simulate/next-week| S[Advance week]
  S -->|SIM_ENGINE.step_week(game)| SE[Simulation engine]
  SE -->|events + stat patches| R[SimulationStepResult]

  R -->|append events| L[Game log<br/>game.simulation_events]
  R -->|apply stat patches| PS[Update Player.stats]
  L -->|GET /api/games/{game_id}/log| A
```

## AI integration flow (allow-listed functions)

The intended pattern is: your AI agent gets a strict allow-list of functions and **cannot** directly mutate the store.

```mermaid
flowchart TD
  AG[AI Agent] -->|allowed_functions()| AL[Allow-listed actions only]

  AL --> N[log_note(game_id, week, message)]
  AL --> I[log_injury(game_id, week, player_id, ...)]
  AL --> O[log_game_outcome(game_id, week, winning_team_id, losing_team_id, ...)]
  AL --> RC[log_role_change(game_id, week, player_id, summary)]
  AL --> ST[patch_player_stats(player_id, stat_patch)]
  AL --> W[advance_week(game_id)]

  N --> GL[Append to game log]
  I --> GL
  O --> GL
  RC --> GL
  ST --> PPS[Patch Player.stats]
  W --> SIM[SIM_ENGINE.step_week(game)]
  SIM --> GL
  SIM --> PPS
```

## Notes / constraints

- **Multiple concurrent games**: all operations are keyed by `game_id` and stored separately.
- **Game log**: designed as an append-only list of `SimulationEvent` items so the UI can show “everything that happened”.
- **Simulation**: currently a stub; replacing the engine should not require changing API routes.

