from __future__ import annotations

from dataclasses import dataclass, field
from threading import Lock
from uuid import UUID

from ..models.game import Game
from ..models.player import Player
from ..models.user import User


@dataclass
class InMemoryStore:
    """
    Minimal in-memory store suitable for local dev.

    Intentionally centralized so swapping to a DB later is straightforward.
    """

    _lock: Lock = field(default_factory=Lock)
    games: dict[UUID, Game] = field(default_factory=dict)
    users: dict[UUID, User] = field(default_factory=dict)
    players: dict[UUID, Player] = field(default_factory=dict)

    def reset(self) -> None:
        with self._lock:
            self.games.clear()
            self.users.clear()
            self.players.clear()


STORE = InMemoryStore()

