
import React, { useState, useEffect, useCallback } from 'react';
import { UserState } from '../types';

interface Props {
  user: UserState;
  onComplete: () => void;
}

const COLORS = [
  'bg-indigo-500', 
  'bg-emerald-500', 
  'bg-rose-500', 
  'bg-amber-500', 
  'bg-purple-500', 
  'bg-sky-500'
];

const PuzzleGame: React.FC<Props> = ({ user, onComplete }) => {
  const [gridSize, setGridSize] = useState(3);
  const [targetPattern, setTargetPattern] = useState<number[]>([]);
  const [currentPattern, setCurrentPattern] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const initGame = useCallback(() => {
    const size = Math.min(3 + Math.floor(user.level / 10), 5);
    setGridSize(size);
    const count = size * size;
    const newTarget = Array.from({ length: count }, () => Math.floor(Math.random() * 2));
    setTargetPattern(newTarget);
    setCurrentPattern(new Array(count).fill(0));
    setIsPlaying(true);
    setIsWon(false);
    setTimeLeft(Math.max(30 - Math.floor(user.level / 5), 10));
  }, [user.level]);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  const handleTileClick = (index: number) => {
    if (!isPlaying) return;
    const nextPattern = [...currentPattern];
    nextPattern[index] = nextPattern[index] === 1 ? 0 : 1;
    setCurrentPattern(nextPattern);

    if (nextPattern.every((val, idx) => val === targetPattern[idx])) {
      setIsWon(true);
      setIsPlaying(false);
      onComplete();
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-800">Level {user.level}</h2>
        <p className="text-slate-500 text-sm">Match the target pattern to earn rewards!</p>
        {(user.level % 5 === 0) && (
          <div className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold animate-bounce mt-2">
            REWARD LEVEL! Win to get 100 Coins 🪙
          </div>
        )}
      </div>

      {/* Target Preview */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-end mb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Pattern</span>
          <span className={`text-sm font-mono font-bold ${timeLeft < 10 ? 'text-rose-500' : 'text-indigo-600'}`}>
            {timeLeft}s
          </span>
        </div>
        <div 
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {targetPattern.map((val, idx) => (
            <div 
              key={idx} 
              className={`aspect-square rounded-lg transition-all duration-300 ${val === 1 ? 'bg-indigo-500 scale-100' : 'bg-slate-100 scale-90 opacity-50'}`}
            />
          ))}
        </div>
      </div>

      {/* Game Grid */}
      <div 
        className={`grid gap-3 transition-opacity duration-300 ${!isPlaying && !isWon ? 'opacity-50' : 'opacity-100'}`}
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
      >
        {currentPattern.length > 0 ? currentPattern.map((val, idx) => (
          <button
            key={idx}
            disabled={!isPlaying}
            onClick={() => handleTileClick(idx)}
            className={`aspect-square rounded-xl shadow-inner transition-all duration-200 transform active:scale-95 ${val === 1 ? 'bg-indigo-600 shadow-indigo-800/20' : 'bg-white border-2 border-slate-100'}`}
          />
        )) : (
          <div className="col-span-full py-12 text-center">
            <button 
              onClick={initGame}
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 active:scale-95 transition-transform"
            >
              START GAME
            </button>
          </div>
        )}
      </div>

      {/* Result Overlays */}
      {!isPlaying && currentPattern.length > 0 && (
        <div className="text-center p-6 rounded-2xl bg-white border border-slate-100 shadow-xl space-y-4 animate-in slide-in-from-bottom-4 duration-300">
          {isWon ? (
            <>
              <div className="text-4xl">🎉</div>
              <h3 className="text-xl font-bold text-slate-800">Excellent Work!</h3>
              <p className="text-slate-500">You mastered level {user.level - 1}.</p>
            </>
          ) : (
            <>
              <div className="text-4xl">⏰</div>
              <h3 className="text-xl font-bold text-slate-800">Time's Up!</h3>
              <p className="text-slate-500">Don't give up, try again!</p>
            </>
          )}
          <button 
            onClick={initGame}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100"
          >
            {isWon ? 'NEXT LEVEL' : 'RETRY LEVEL'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PuzzleGame;
