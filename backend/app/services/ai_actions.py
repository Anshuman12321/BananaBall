from __future__ import annotations

from datetime import datetime, timezone
from typing import Callable
from uuid import UUID

from ..models.ids import GameId, PlayerId, TeamId
from ..models.simulation import SimulationEvent, SimulationEventType
from ..repos.in_memory import STORE
from .game_service import GAME_SERVICE


class AiActions:
    """
    Explicit, allow-listed functions intended for an AI agent to invoke.

    Keep this list small and stable. If the agent needs new capabilities, add
    a new method here rather than giving it raw store access.
    """

    # ---- game log helpers ----
    def log_note(self, game_id: GameId, week: int, message: str) -> SimulationEvent:
        return self._append_event(
            game_id=game_id,
            event=SimulationEvent(type=SimulationEventType.note, week=week, payload={"message": message}),
        )

    def log_injury(
        self,
        game_id: GameId,
        week: int,
        player_id: PlayerId,
        severity: str,
        description: str | None = None,
        out_weeks: int | None = None,
    ) -> SimulationEvent:
        payload: dict[str, str | int | float | bool] = {"severity": severity}
        if description:
            payload["description"] = description
        if out_weeks is not None:
            payload["out_weeks"] = out_weeks
        return self._append_event(
            game_id=game_id,
            event=SimulationEvent(
                type=SimulationEventType.injury,
                week=week,
                player_id=player_id,
                payload=payload,
            ),
        )

    def log_game_outcome(
        self,
        game_id: GameId,
        week: int,
        winning_team_id: TeamId,
        losing_team_id: TeamId,
        winning_score: float | int | None = None,
        losing_score: float | int | None = None,
    ) -> SimulationEvent:
        payload: dict[str, str | int | float | bool] = {
            "winning_team_id": str(winning_team_id),
            "losing_team_id": str(losing_team_id),
        }
        if winning_score is not None:
            payload["winning_score"] = float(winning_score)
        if losing_score is not None:
            payload["losing_score"] = float(losing_score)
        return self._append_event(
            game_id=game_id,
            event=SimulationEvent(
                type=SimulationEventType.game_outcome,
                week=week,
                team_id=winning_team_id,
                payload=payload,
            ),
        )

    def log_role_change(
        self, game_id: GameId, week: int, player_id: PlayerId, summary: str
    ) -> SimulationEvent:
        return self._append_event(
            game_id=game_id,
            event=SimulationEvent(
                type=SimulationEventType.role_change,
                week=week,
                player_id=player_id,
                payload={"summary": summary},
            ),
        )

    def _append_event(self, game_id: GameId, event: SimulationEvent) -> SimulationEvent:
        with STORE._lock:
            game = STORE.games.get(game_id)
            if not game:
                raise KeyError("Game not found")
            next_game = game.model_copy(
                update={
                    "simulation_events": [*game.simulation_events, event],
                    "updated_at": datetime.now(timezone.utc),
                }
            )
            STORE.games[game_id] = next_game
        return event

    # ---- stats patching ----
    def patch_player_stats(self, player_id: PlayerId, stat_patch: dict[str, str | int | float]) -> None:
        with STORE._lock:
            player = STORE.players.get(player_id)
            if not player:
                raise KeyError("Player not found")
            merged = dict(player.stats)
            merged.update(stat_patch)
            STORE.players[player_id] = player.model_copy(update={"stats": merged})

    # ---- time progression ----
    def advance_week(self, game_id: GameId) -> None:
        """
        Preferred way for an agent to advance time; uses the configured simulation engine.
        """
        GAME_SERVICE.simulate_next_week(game_id)

    # ---- allow-list / registry ----
    def allowed_functions(self) -> dict[str, Callable[..., object]]:
        return {
            "log_note": self.log_note,
            "log_injury": self.log_injury,
            "log_game_outcome": self.log_game_outcome,
            "log_role_change": self.log_role_change,
            "patch_player_stats": self.patch_player_stats,
            "advance_week": self.advance_week,
        }


AI_ACTIONS = AiActions()

