
import React from 'react';
import { UserState, TransactionStatus } from '../types';

interface Props {
  user: UserState;
}

const Wallet: React.FC<Props> = ({ user }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative">
          <p className="text-indigo-100 text-sm font-medium mb-1">Total Balance</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-5xl font-extrabold tracking-tighter">{user.balance}</h2>
            <span className="text-indigo-200 font-bold">Coins</span>
          </div>
          
          <div className="mt-8 flex gap-4">
            <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <p className="text-[10px] uppercase font-bold text-indigo-200">Pending</p>
              <p className="text-lg font-bold">
                {user.history.filter(t => t.status === TransactionStatus.PENDING).reduce((sum, t) => sum + t.amount, 0)}
              </p>
            </div>
            <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <p className="text-[10px] uppercase font-bold text-indigo-200">Earned Today</p>
              <p className="text-lg font-bold">
                {user.history
                  .filter(t => t.type === 'EARNING' && t.date.startsWith(new Date().toISOString().split('T')[0]))
                  .reduce((sum, t) => sum + t.amount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Transaction History</h3>
          <button className="text-indigo-600 text-sm font-semibold">View All</button>
        </div>

        <div className="space-y-3">
          {user.history.length > 0 ? user.history.map((tx) => (
            <div key={tx.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 hover:border-indigo-100 transition-colors">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.type === 'EARNING' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {tx.type === 'EARNING' ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800">{tx.type === 'EARNING' ? 'Puzzle Reward' : 'Withdrawal Request'}</p>
                <p className="text-xs text-slate-400 font-medium">
                  {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-bold ${tx.type === 'EARNING' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {tx.type === 'EARNING' ? '+' : '-'}{tx.amount}
                </p>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${tx.status === TransactionStatus.COMPLETED ? 'text-emerald-400' : tx.status === TransactionStatus.PENDING ? 'text-amber-400' : 'text-rose-400'}`}>
                  {tx.status}
                </p>
              </div>
            </div>
          )) : (
            <div className="py-12 text-center text-slate-400">
              <div className="mb-4">📭</div>
              <p className="text-sm font-medium">No transactions found yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
