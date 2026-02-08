import React from 'react';
import { Trophy, Activity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h1 className="text-xl font-bold tracking-tight text-white">
            <span className="text-pats-red">SB</span> PREDICTOR
          </h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Activity className="w-4 h-4 text-green-500" />
            <span>Live Analysis</span>
          </div>
          <span className="px-2 py-1 rounded bg-slate-800 text-xs font-mono">GEMINI-2.5-FLASH</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
