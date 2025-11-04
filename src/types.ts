export interface Team {
  slot: number;
  name: string;
  position: number;
  finishes: number;
}

export interface MatchData {
  tournamentName: string;
  matchDetails: string;
  teams: Team[];
}
