
import React from 'react';
import { UserState } from '../types';

interface Props {
  user: UserState;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
}

const Profile: React.FC<Props> = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false, username: 'Guest Player' }));
  };

  const stats = [
    { label: 'Current Level', value: user.level, icon: '🏆', color: 'bg-amber-100 text-amber-600' },
    { label: 'Games Played', value: user.totalGamesPlayed, icon: '🎮', color: 'bg-indigo-100 text-indigo-600' },
    { label: 'Total Earned', value: user.history.filter(t => t.type === 'EARNING').reduce((a, b) => a + b.amount, 0), icon: '💰', color: 'bg-emerald-100 text-emerald-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <img 
            src={`https://picsum.photos/seed/${user.username}/128`} 
            alt="avatar" 
            className="w-24 h-24 rounded-[2rem] border-4 border-white shadow-xl"
          />
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-slate-50" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{user.username}</h2>
          <p className="text-slate-400 text-sm font-medium">Pro Puzzle Solver</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center gap-4 shadow-sm">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-extrabold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
        <button className="w-full p-5 text-left flex items-center justify-between border-b border-slate-50 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-lg">⚙️</span>
            <span className="font-bold text-slate-700">Account Settings</span>
          </div>
          <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button className="w-full p-5 text-left flex items-center justify-between border-b border-slate-50 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-lg">🛡️</span>
            <span className="font-bold text-slate-700">Privacy & Terms</span>
          </div>
          <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-lg">❓</span>
            <span className="font-bold text-slate-700">Help Center</span>
          </div>
          <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {user.isLoggedIn ? (
        <button 
          onClick={handleLogout}
          className="w-full py-4 text-rose-600 font-bold border-2 border-rose-100 rounded-2xl hover:bg-rose-50 transition-colors"
        >
          LOG OUT
        </button>
      ) : (
        <p className="text-center text-sm text-slate-400 font-medium">
          Log in to sync your progress across devices
        </p>
      )}
    </div>
  );
};

export default Profile;
