from __future__ import annotations

from datetime import datetime, timezone
from enum import Enum
from uuid import UUID, uuid4

from pydantic import BaseModel, ConfigDict, Field


class PlayerPosition(str, Enum):
    pg = "PG"
    sg = "SG"
    sf = "SF"
    pf = "PF"
    c = "C"

    # Common fantasy slots
    g = "G"
    f = "F"
    util = "UTIL"


class Player(BaseModel):
    """
    Draftable basketball player model.

    The simulation engine can attach statlines under `stats` and emit events
    (injuries, role changes, outcomes) via the simulation layer.
    """

    model_config = ConfigDict(frozen=True)

    player_id: UUID = Field(default_factory=uuid4)
    full_name: str = Field(min_length=1, max_length=80)
    position: PlayerPosition
    real_team: str | None = Field(default=None, max_length=40)

    # Simulation-produced data (keep loose for iteration speed)
    stats: dict[str, float | int | str] = Field(default_factory=dict)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

