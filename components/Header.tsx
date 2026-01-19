
import React from 'react';
import { UserState } from '../types';

interface Props {
  user: UserState;
  onAuthClick: () => void;
}

const Header: React.FC<Props> = ({ user, onAuthClick }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-indigo-200 shadow-lg">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <h1 className="font-bold text-slate-800 tracking-tight">MindMaze</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-amber-50 border border-amber-100 rounded-full px-3 py-1 flex items-center gap-1.5">
          <span className="text-amber-500 font-bold">🪙</span>
          <span className="text-amber-700 font-bold text-sm">{user.balance}</span>
        </div>
        
        <button 
          onClick={onAuthClick}
          className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden hover:ring-2 ring-indigo-500 transition-all"
        >
          {user.isLoggedIn ? (
            <img src={`https://picsum.photos/seed/${user.username}/64`} alt="profile" />
          ) : (
            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
