
import React, { useState, useEffect } from 'react';
import { AppView, UserState, Transaction, TransactionStatus } from './types';
import PuzzleGame from './components/PuzzleGame';
import Wallet from './components/Wallet';
import Withdraw from './components/Withdraw';
import Profile from './components/Profile';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import AuthModal from './components/AuthModal';

const INITIAL_USER_STATE: UserState = {
  balance: 0,
  level: 1,
  totalGamesPlayed: 0,
  history: [],
  username: 'Guest Player',
  isLoggedIn: false,
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.GAME);
  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem('mindmaze_user');
    return saved ? JSON.parse(saved) : INITIAL_USER_STATE;
  });
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    localStorage.setItem('mindmaze_user', JSON.stringify(user));
  }, [user]);

  const addEarning = (amount: number) => {
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      amount,
      type: 'EARNING',
      status: TransactionStatus.COMPLETED,
      date: new Date().toISOString(),
    };

    setUser(prev => ({
      ...prev,
      balance: prev.balance + amount,
      history: [newTransaction, ...prev.history],
    }));
  };

  const handleWithdraw = (amount: number, method: string) => {
    if (user.balance < amount) return;

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      amount,
      type: 'WITHDRAWAL',
      status: TransactionStatus.PENDING,
      date: new Date().toISOString(),
      method,
    };

    setUser(prev => ({
      ...prev,
      balance: prev.balance - amount,
      history: [newTransaction, ...prev.history],
    }));
  };

  const handleLevelComplete = () => {
    setUser(prev => {
      const nextLevel = prev.level + 1;
      const shouldReward = nextLevel > 1 && (nextLevel - 1) % 5 === 0;
      
      if (shouldReward) {
        addEarning(100);
      }

      return {
        ...prev,
        level: nextLevel,
        totalGamesPlayed: prev.totalGamesPlayed + 1,
      };
    });
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.GAME:
        return <PuzzleGame user={user} onComplete={handleLevelComplete} />;
      case AppView.WALLET:
        return <Wallet user={user} />;
      case AppView.WITHDRAW:
        return <Withdraw user={user} onWithdraw={handleWithdraw} />;
      case AppView.PROFILE:
        return <Profile user={user} setUser={setUser} />;
      default:
        return <PuzzleGame user={user} onComplete={handleLevelComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto relative shadow-2xl">
      <Header user={user} onAuthClick={() => setShowAuth(true)} />
      
      <main className="flex-1 overflow-y-auto pb-24 pt-4 px-4">
        {renderView()}
      </main>

      <BottomNav currentView={currentView} setView={setCurrentView} />

      {showAuth && (
        <AuthModal 
          onClose={() => setShowAuth(false)} 
          onLogin={(name) => setUser(prev => ({ ...prev, username: name, isLoggedIn: true }))}
        />
      )}
    </div>
  );
};

export default App;
