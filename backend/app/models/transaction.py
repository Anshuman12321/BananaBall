from __future__ import annotations

from datetime import datetime, timezone
from enum import Enum
from uuid import UUID, uuid4

from pydantic import BaseModel, ConfigDict, Field

from .ids import PlayerId, TeamId, TransactionId


class TransactionType(str, Enum):
    trade = "trade"
    waiver = "waiver"
    acquisition = "acquisition"


class TransactionStatus(str, Enum):
    pending = "pending"
    accepted = "accepted"
    rejected = "rejected"
    applied = "applied"


class Transaction(BaseModel):
    model_config = ConfigDict(frozen=True)

    transaction_id: TransactionId = Field(default_factory=uuid4)
    type: TransactionType
    status: TransactionStatus = TransactionStatus.pending

    from_team_id: TeamId | None = None
    to_team_id: TeamId | None = None
    player_ids: list[PlayerId] = Field(default_factory=list)

    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

