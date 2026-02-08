import React from 'react';
import { PredictionResponse } from '../types';

interface MatchupCardProps {
  data: PredictionResponse;
}

const MatchupCard: React.FC<MatchupCardProps> = ({ data }) => {
  const { predictedScore, patriotsWinProbability, seahawksWinProbability } = data;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Patriots */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-pats-red"></div>
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-pats-navy rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <h2 className="text-2xl font-bold text-white mb-1">PATRIOTS</h2>
        <p className="text-slate-400 text-sm mb-4">New England</p>
        <div className="text-5xl font-mono font-bold text-white mb-2">{predictedScore.patriots}</div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Win Prob</span>
          <span className="text-lg font-bold text-pats-red">{patriotsWinProbability}%</span>
        </div>
      </div>

      {/* VS / Info */}
      <div className="flex flex-col items-center justify-center py-4">
        <div className="text-slate-500 font-bold text-xl mb-2">VS</div>
        <div className="bg-slate-800/50 rounded-full px-4 py-1 text-xs text-slate-300 mb-4 border border-slate-700">
          Super Bowl Prediction
        </div>
        <div className="text-center">
            <p className="text-slate-400 text-sm">Confidence Interval</p>
            <p className="text-white font-mono">{predictedScore.confidenceInterval}</p>
        </div>
      </div>

      {/* Seahawks */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-hawks-green"></div>
        <div className="absolute -left-10 -top-10 w-32 h-32 bg-hawks-green rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
        <h2 className="text-2xl font-bold text-white mb-1">SEAHAWKS</h2>
        <p className="text-slate-400 text-sm mb-4">Seattle</p>
        <div className="text-5xl font-mono font-bold text-white mb-2">{predictedScore.seahawks}</div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Win Prob</span>
          <span className="text-lg font-bold text-hawks-green">{seahawksWinProbability}%</span>
        </div>
      </div>
    </div>
  );
};

export default MatchupCard;
