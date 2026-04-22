from __future__ import annotations

from dataclasses import dataclass
from typing import Protocol

from ..models.game import Game
from ..models.simulation import SimulationEvent, SimulationEventType, SimulationStepResult


class SimulationEngine(Protocol):
    """
    Pluggable simulation interface.

    Later implementations can be:
    - deterministic rules-based engine
    - AI agent that emits events + stat updates
    - hybrid
    """

    def step_week(self, game: Game) -> SimulationStepResult: ...


@dataclass(frozen=True)
class StubSimulationEngine:
    """
    Safe placeholder that does not change competitive outcomes.
    """

    def step_week(self, game: Game) -> SimulationStepResult:
        next_week = game.current_week + 1
        return SimulationStepResult(
            week=next_week,
            events=[
                SimulationEvent(
                    type=SimulationEventType.note,
                    week=next_week,
                    payload={"message": "Stub simulation step (no-op)"},
                )
            ],
            updated_player_stats={},
        )


SIM_ENGINE: SimulationEngine = StubSimulationEngine()

