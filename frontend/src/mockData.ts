export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C'

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
  { rank: 1, team: 'Crossover City', owner: 'You', w: 9, l: 2, t: 0, pf: 1421.4, pa: 1188.2, streak: 'W3' },
  { rank: 2, team: 'Green Beans', owner: 'Sam K.', w: 8, l: 3, t: 0, pf: 1388.0, pa: 1292.5, streak: 'W1' },
  { rank: 3, team: 'BBQ Chicken Alert', owner: 'Jordan P.', w: 7, l: 4, t: 0, pf: 1310.2, pa: 1265.0, streak: 'L1' },
  { rank: 4, team: 'Is this the dagger?', owner: 'Alex R.', w: 6, l: 5, t: 0, pf: 1288.7, pa: 1301.3, streak: 'W2' },
  { rank: 5, team: 'Im here for Chris Paul', owner: 'Casey M.', w: 5, l: 6, t: 0, pf: 1201.0, pa: 1244.8, streak: 'L2' },
  { rank: 6, team: 'LeGOAT James', owner: 'Riley T.', w: 4, l: 7, t: 0, pf: 1156.3, pa: 1288.0, streak: 'L4' },
  { rank: 7, team: 'BBBall', owner: 'Morgan L.', w: 3, l: 8, t: 0, pf: 1098.5, pa: 1320.4, streak: 'W1' },
  { rank: 8, team: 'The Currys from way Downtown', owner: 'Taylor B.', w: 2, l: 9, t: 0, pf: 1042.1, pa: 1355.2, streak: 'L3' },
]

export type RosterSlot = {
  slot: string
  player: string
  pos: Position | 'FLEX'
  nbaTeam: string
  proj?: number
}

export const starters: RosterSlot[] = [
  { slot: 'PG', player: 'Luka Doncic', pos: 'PG', nbaTeam: 'LAL', proj: 22.4 },
  { slot: 'SG', player: 'Duncan Robinson', pos: 'SG', nbaTeam: 'DET', proj: 17.8 },
  { slot: 'SF', player: 'Jaden McDaniels', pos: 'SF', nbaTeam: 'MIN', proj: 18.9 },
  { slot: 'PF', player: 'Bam Adabayo', pos: 'PF', nbaTeam: 'MIA', proj: 11.2 },
  { slot: 'C', player: 'Alpren Sengun', pos: 'C', nbaTeam: 'HOU', proj: 14.1 },
]

export const bench: RosterSlot[] = [
  { slot: 'BN', player: 'Ayo Dosumu', pos: 'SG', nbaTeam: 'MIN', proj: 12.4 },
  { slot: 'BN', player: 'Keyonte George', pos: 'PG', nbaTeam: 'UTH', proj: 11.8 },
  { slot: 'BN', player: 'Jake LaRavia', pos: 'SF', nbaTeam: 'LAL', proj: 10.2 },
  { slot: 'BN', player: 'Naz Reid', pos: 'PF', nbaTeam: 'MIN', proj: 9.6 },
  { slot: 'BN', player: 'Robin Williams III', pos: 'C', nbaTeam: 'POR', proj: 7.2 },
]

export type DraftPlayer = {
  rank: number
  name: string
  pos: Position
  team: string
  adp: number
}

export const draftBoard: DraftPlayer[] = [
  { rank: 1, name: 'Austin Reaves', pos: 'PG', team: 'LAL', adp: 1.2 },
  { rank: 2, name: 'Tyler Herro', pos: 'SG', team: 'MIA', adp: 2.1 },
  { rank: 3, name: 'Mikal Bridges', pos: 'SG', team: 'NYK', adp: 3.4 },
  { rank: 4, name: 'Jalen Brunson', pos: 'PG', team: 'NYK', adp: 4.8 },
  { rank: 5, name: 'Kevin Durant', pos: 'SF', team: 'HOU', adp: 5.2 },
  { rank: 6, name: 'Jayson Tatum', pos: 'PF', team: 'BOS', adp: 6.0 },
  { rank: 7, name: 'Stephon Castle', pos: 'SG', team: 'SAS', adp: 7.1 },
  { rank: 8, name: 'Bones Hyland', pos: 'PG', team: 'MIN', adp: 8.5 },
]
