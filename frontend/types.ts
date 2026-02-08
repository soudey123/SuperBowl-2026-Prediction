export interface TeamStats {
  offenseRank: number;
  defenseRank: number;
  pointsPerGame: number;
  passingYards: number;
  rushingYards: number;
}

export interface PredictionFactor {
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  advantage: 'Patriots' | 'Seahawks' | 'Neutral';
}

export interface KeyMatchup {
  name: string;
  details: string;
}

export interface PredictionResponse {
  patriotsWinProbability: number;
  seahawksWinProbability: number;
  predictedScore: {
    patriots: number;
    seahawks: number;
    confidenceInterval: string;
  };
  decidingFactors: PredictionFactor[];
  keyMatchups: KeyMatchup[];
  analysisSummary: string;
  teamStats: {
    patriots: TeamStats;
    seahawks: TeamStats;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
