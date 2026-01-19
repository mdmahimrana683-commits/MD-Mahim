
export enum AppView {
  GAME = 'GAME',
  WALLET = 'WALLET',
  WITHDRAW = 'WITHDRAW',
  PROFILE = 'PROFILE'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED'
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'EARNING' | 'WITHDRAWAL';
  status: TransactionStatus;
  date: string;
  method?: string;
}

export interface UserState {
  balance: number;
  level: number;
  totalGamesPlayed: number;
  history: Transaction[];
  username: string;
  isLoggedIn: boolean;
}

export interface GameState {
  grid: number[];
  target: number[];
  difficulty: number;
  status: 'IDLE' | 'PLAYING' | 'WON' | 'LOST';
  timer: number;
}
