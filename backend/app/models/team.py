from __future__ import annotations

from datetime import datetime, timezone
from uuid import UUID, uuid4

from pydantic import BaseModel, ConfigDict, Field

from .ids import PlayerId, TeamId, UserId


class Team(BaseModel):
    model_config = ConfigDict(frozen=True)

    team_id: TeamId = Field(default_factory=uuid4)
    owner_user_id: UserId
    name: str = Field(min_length=1, max_length=40)

    roster_player_ids: list[PlayerId] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

