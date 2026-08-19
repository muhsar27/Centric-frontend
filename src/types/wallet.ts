export type TransactionStatus = 'Successful' | 'Pending' | 'Failed';

export interface TopUpRecord {
  id: string;
  date: string;
  amount: number;
  paymentMethod: string;
  status: TransactionStatus;
  reference: string;
}

export interface TravelerTransaction {
  id: string;
  date: string;
  title: string;
  amount: number; // positive for earnings/tips, negative for withdrawals
  type: 'delivery_earnings' | 'tip' | 'adjustment' | 'withdrawal';
  details?: string;
  status: TransactionStatus;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  isDefault?: boolean;
}

export interface WalletState {
  senderBalance: number;
  travelerBalance: number;
  topUpHistory: TopUpRecord[];
  travelerTransactions: TravelerTransaction[];
  savedBanks: BankAccount[];
}
