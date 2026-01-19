
import React, { useState } from 'react';
import { UserState } from '../types';

interface Props {
  user: UserState;
  onWithdraw: (amount: number, method: string) => void;
}

const MIN_THRESHOLD = 2000;

const Withdraw: React.FC<Props> = ({ user, onWithdraw }) => {
  const [amount, setAmount] = useState<string>('2000');
  const [method, setMethod] = useState<string>('bkash');
  const [account, setAccount] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  const canWithdraw = user.balance >= MIN_THRESHOLD;
  const progress = Math.min((user.balance / MIN_THRESHOLD) * 100, 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseInt(amount);
    if (numAmount >= MIN_THRESHOLD && numAmount <= user.balance && account.length > 5) {
      onWithdraw(numAmount, `${method}: ${account}`);
      setIsSuccess(true);
      setAccount('');
    }
  };

  if (isSuccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
          <svg className="w-12 h-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Request Submitted!</h2>
          <p className="text-slate-500 mt-2 leading-relaxed">Your withdrawal request is being processed. It usually takes 3-7 business days.</p>
        </div>
        <button 
          onClick={() => setIsSuccess(false)}
          className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-lg"
        >
          Back to Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Withdraw Funds</h2>
        <p className="text-slate-500 text-sm">Transfer your virtual earnings to real accounts.</p>
      </div>

      {!canWithdraw && (
        <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-amber-800 font-bold text-sm">Withdrawal Progress</span>
            <span className="text-amber-600 font-bold text-sm">{user.balance} / {MIN_THRESHOLD} Coins</span>
          </div>
          <div className="w-full h-3 bg-amber-200/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-amber-700 font-medium leading-relaxed">
            You need at least <span className="font-bold underline">2,000 coins</span> to request a withdrawal. Play more puzzles to reach the goal!
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={`space-y-6 ${!canWithdraw ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-600 block">Withdrawal Method</label>
          <div className="grid grid-cols-2 gap-3">
            {['bKash', 'Nagad', 'PayPal', 'Rocket'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m.toLowerCase())}
                className={`p-4 rounded-2xl border-2 transition-all font-bold text-sm ${method === m.toLowerCase() ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-white text-slate-400'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-600 block">Account Number / Email</label>
          <input 
            type="text"
            required
            placeholder={method === 'paypal' ? 'example@email.com' : '01XXXXXXXXX'}
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-600 outline-none transition-all font-medium text-slate-800"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-600 block">Amount to Withdraw</label>
          <div className="relative">
            <input 
              type="number"
              min={MIN_THRESHOLD}
              max={user.balance}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 pl-12 rounded-2xl border-2 border-slate-100 focus:border-indigo-600 outline-none transition-all font-bold text-lg text-slate-800"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🪙</span>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pl-1">Min. 2,000 - Max. {user.balance}</p>
        </div>

        <button 
          type="submit"
          className="w-full py-5 bg-indigo-600 text-white font-bold rounded-[2rem] shadow-xl shadow-indigo-100 hover:shadow-indigo-200 transition-all active:scale-[0.98]"
        >
          SUBMIT WITHDRAWAL
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
