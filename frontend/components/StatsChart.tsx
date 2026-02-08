import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TeamStats } from '../types';

interface StatsChartProps {
  patsStats: TeamStats;
  hawksStats: TeamStats;
}

const StatsChart: React.FC<StatsChartProps> = ({ patsStats, hawksStats }) => {
  const data = [
    {
      name: 'PPG',
      Patriots: patsStats.pointsPerGame,
      Seahawks: hawksStats.pointsPerGame,
    },
    {
      name: 'Pass Yds/G',
      Patriots: patsStats.passingYards / 10, // Scale down for visualization
      Seahawks: hawksStats.passingYards / 10,
    },
    {
      name: 'Rush Yds/G',
      Patriots: patsStats.rushingYards / 10, // Scale down for visualization
      Seahawks: hawksStats.rushingYards / 10,
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full">
      <h3 className="text-lg font-semibold text-white mb-6">Statistical Comparison</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
            <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
            <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                itemStyle={{ color: '#e2e8f0' }}
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
            />
            <Legend />
            <Bar dataKey="Patriots" fill="#002244" stroke="#C60C30" strokeWidth={2} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Seahawks" fill="#69BE28" stroke="#002244" strokeWidth={1} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-slate-500 mt-4 text-center">* Yards scaled by 1/10 for chart visibility</p>
    </div>
  );
};

export default StatsChart;
