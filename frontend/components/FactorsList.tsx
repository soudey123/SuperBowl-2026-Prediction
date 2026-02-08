import React from 'react';
import { PredictionFactor } from '../types';
import { AlertTriangle, TrendingUp, Shield } from 'lucide-react';
import clsx from 'clsx';

interface FactorsListProps {
  factors: PredictionFactor[];
}

const FactorsList: React.FC<FactorsListProps> = ({ factors }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full overflow-y-auto">
      <h3 className="text-lg font-semibold text-white mb-4">Deciding Factors</h3>
      <div className="space-y-4">
        {factors.map((factor, index) => (
          <div key={index} className="bg-slate-950/50 rounded-lg p-4 border border-slate-800/50 hover:border-slate-700 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {factor.impact === 'High' ? (
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                )}
                <span className="font-medium text-slate-200">{factor.title}</span>
              </div>
              <span className={clsx(
                "text-xs px-2 py-0.5 rounded font-medium",
                factor.advantage === 'Patriots' && "bg-pats-navy text-white border border-pats-red",
                factor.advantage === 'Seahawks' && "bg-hawks-navy text-hawks-green border border-hawks-green",
                factor.advantage === 'Neutral' && "bg-slate-800 text-slate-400"
              )}>
                {factor.advantage === 'Neutral' ? 'Even' : `${factor.advantage} Edge`}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {factor.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FactorsList;
