export type Position = 'QB' | 'RB' | 'WR' | 'TE' | 'K' | 'DEF'

export type StandingRow = {
  rank: number
  team: string
  owner: string
  w: number
  l: number
  t: number
  pf: number
  pa: number
  streak: string
}

export const standings: StandingRow[] = [
  { rank: 1, team: 'Midnight Blitz', owner: 'You', w: 9, l: 2, t: 0, pf: 1421.4, pa: 1188.2, streak: 'W3' },
  { rank: 2, team: 'Gridiron Guild', owner: 'Sam K.', w: 8, l: 3, t: 0, pf: 1388.0, pa: 1292.5, streak: 'W1' },
  { rank: 3, team: 'Hail Mary HQ', owner: 'Jordan P.', w: 7, l: 4, t: 0, pf: 1310.2, pa: 1265.0, streak: 'L1' },
  { rank: 4, team: 'Red Zone Rebels', owner: 'Alex R.', w: 6, l: 5, t: 0, pf: 1288.7, pa: 1301.3, streak: 'W2' },
  { rank: 5, team: 'Fourth & Long', owner: 'Casey M.', w: 5, l: 6, t: 0, pf: 1201.0, pa: 1244.8, streak: 'L2' },
  { rank: 6, team: 'Bench Mob', owner: 'Riley T.', w: 4, l: 7, t: 0, pf: 1156.3, pa: 1288.0, streak: 'L4' },
  { rank: 7, team: 'Punt Intended', owner: 'Morgan L.', w: 3, l: 8, t: 0, pf: 1098.5, pa: 1320.4, streak: 'W1' },
  { rank: 8, team: 'Goalpost Ghosts', owner: 'Taylor B.', w: 2, l: 9, t: 0, pf: 1042.1, pa: 1355.2, streak: 'L3' },
]

export type RosterSlot = {
  slot: string
  player: string
  pos: Position | 'FLEX'
  nflTeam: string
  proj?: number
}

export const starters: RosterSlot[] = [
  { slot: 'QB', player: 'Josh Allen', pos: 'QB', nflTeam: 'BUF', proj: 22.4 },
  { slot: 'RB', player: 'Bijan Robinson', pos: 'RB', nflTeam: 'ATL', proj: 17.8 },
  { slot: 'RB', player: 'Jahmyr Gibbs', pos: 'RB', nflTeam: 'DET', proj: 16.2 },
  { slot: 'WR', player: 'Ja\'Marr Chase', pos: 'WR', nflTeam: 'CIN', proj: 18.9 },
  { slot: 'WR', player: 'Amon-Ra St. Brown', pos: 'WR', nflTeam: 'DET', proj: 16.5 },
  { slot: 'TE', player: 'Sam LaPorta', pos: 'TE', nflTeam: 'DET', proj: 11.2 },
  { slot: 'FLEX', player: 'De\'Von Achane', pos: 'FLEX', nflTeam: 'MIA', proj: 14.1 },
  { slot: 'K', player: 'Brandon Aubrey', pos: 'K', nflTeam: 'DAL', proj: 9.0 },
  { slot: 'DEF', player: 'Broncos', pos: 'DEF', nflTeam: 'DEN', proj: 8.5 },
]

export const bench: RosterSlot[] = [
  { slot: 'BN', player: 'James Cook', pos: 'RB', nflTeam: 'BUF', proj: 12.4 },
  { slot: 'BN', player: 'Mike Evans', pos: 'WR', nflTeam: 'TB', proj: 11.8 },
  { slot: 'BN', player: 'George Pickens', pos: 'WR', nflTeam: 'DAL', proj: 10.2 },
  { slot: 'BN', player: 'Trey McBride', pos: 'TE', nflTeam: 'ARI', proj: 9.6 },
  { slot: 'BN', player: 'Chiefs', pos: 'DEF', nflTeam: 'KC', proj: 7.2 },
]

export type DraftPlayer = {
  rank: number
  name: string
  pos: Position
  team: string
  adp: number
}

export const draftBoard: DraftPlayer[] = [
  { rank: 1, name: 'Ja\'Marr Chase', pos: 'WR', team: 'CIN', adp: 1.2 },
  { rank: 2, name: 'Bijan Robinson', pos: 'RB', team: 'ATL', adp: 2.1 },
  { rank: 3, name: 'Jahmyr Gibbs', pos: 'RB', team: 'DET', adp: 3.4 },
  { rank: 4, name: 'Josh Allen', pos: 'QB', team: 'BUF', adp: 4.8 },
  { rank: 5, name: 'Amon-Ra St. Brown', pos: 'WR', team: 'DET', adp: 5.2 },
  { rank: 6, name: 'Puka Nacua', pos: 'WR', team: 'LAR', adp: 6.0 },
  { rank: 7, name: 'De\'Von Achane', pos: 'RB', team: 'MIA', adp: 7.1 },
  { rank: 8, name: 'Lamar Jackson', pos: 'QB', team: 'BAL', adp: 8.5 },
]
