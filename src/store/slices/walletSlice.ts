import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WalletState, TopUpRecord, TravelerTransaction, BankAccount } from '@/types/wallet';

const initialTopUps: TopUpRecord[] = [
  {
    id: 'top-1',
    date: 'May 12, 2025 10:24 AM',
    amount: 10000,
    paymentMethod: 'GTBank •••• 1234',
    status: 'Successful',
    reference: 'TXN-78291',
  },
  {
    id: 'top-2',
    date: 'May 10, 2025 03:15 PM',
    amount: 5000,
    paymentMethod: 'Card •••• 4567',
    status: 'Successful',
    reference: 'TXN-66123',
  },
  {
    id: 'top-3',
    date: 'May 8, 2025 11:02 AM',
    amount: 3000,
    paymentMethod: 'OPay',
    status: 'Successful',
    reference: 'TXN-59178',
  },
  {
    id: 'top-4',
    date: 'May 5, 2025 09:14 AM',
    amount: 2000,
    paymentMethod: 'Kuda Bank',
    status: 'Successful',
    reference: 'TXN-44109',
  },
];

const initialTravelerTransactions: TravelerTransaction[] = [
  {
    id: 'trv-tx-1',
    date: 'May 12, 2025 10:46 AM',
    title: 'Delivery earnings',
    amount: 1360,
    type: 'delivery_earnings',
    details: 'Ikeja City Mall → Yaba Tech Hub',
    status: 'Successful',
  },
  {
    id: 'trv-tx-2',
    date: 'May 12, 2025 09:12 AM',
    title: 'Tip from sender',
    amount: 680,
    type: 'tip',
    details: 'Tip for quick delivery',
    status: 'Successful',
  },
  {
    id: 'trv-tx-3',
    date: 'May 11, 2025 04:30 PM',
    title: 'Delivery earnings',
    amount: 1120,
    type: 'delivery_earnings',
    details: 'Computer Village → Ikeja GRA',
    status: 'Successful',
  },
  {
    id: 'trv-tx-4',
    date: 'May 11, 2025 11:15 AM',
    title: 'Delivery earnings',
    amount: 1620,
    type: 'delivery_earnings',
    details: 'Alausa Secretariat → Ikeja City Mall',
    status: 'Successful',
  },
  {
    id: 'trv-tx-5',
    date: 'May 10, 2025 08:20 PM',
    title: 'Withdrawal',
    amount: -10000,
    type: 'withdrawal',
    details: 'GTBank •••• 1254',
    status: 'Successful',
  },
  {
    id: 'trv-tx-6',
    date: 'May 10, 2025 04:15 PM',
    title: 'Delivery earnings',
    amount: 950,
    type: 'delivery_earnings',
    details: 'Maryland Mall → Surulere',
    status: 'Successful',
  },
];

const initialBanks: BankAccount[] = [
  {
    id: 'bank-1',
    bankName: 'GTBank',
    accountNumber: '0123456789',
    accountName: 'Ridwan Kareem',
    isDefault: true,
  },
  {
    id: 'bank-2',
    bankName: 'Access Bank',
    accountNumber: '9876543210',
    accountName: 'Ridwan Kareem',
    isDefault: false,
  },
];

const initialState: WalletState = {
  senderBalance: 234500,
  travelerBalance: 8450,
  topUpHistory: initialTopUps,
  travelerTransactions: initialTravelerTransactions,
  savedBanks: initialBanks,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    topUpSenderWallet: (
      state,
      action: PayloadAction<{ amount: number; method: string }>
    ) => {
      state.senderBalance += action.payload.amount;
      state.topUpHistory.unshift({
        id: `top-${Date.now()}`,
        date: 'Just now',
        amount: action.payload.amount,
        paymentMethod: action.payload.method,
        status: 'Successful',
        reference: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      });
    },
    deductSenderBalance: (state, action: PayloadAction<number>) => {
      state.senderBalance = Math.max(0, state.senderBalance - action.payload);
    },
    withdrawTravelerFunds: (
      state,
      action: PayloadAction<{ amount: number; bankName: string }>
    ) => {
      const { amount, bankName } = action.payload;
      state.travelerBalance = Math.max(0, state.travelerBalance - amount);
      state.travelerTransactions.unshift({
        id: `trv-tx-${Date.now()}`,
        date: 'Just now',
        title: 'Withdrawal',
        amount: -amount,
        type: 'withdrawal',
        details: `${bankName} •••• 1254`,
        status: 'Successful',
      });
    },
    creditTravelerEarning: (
      state,
      action: PayloadAction<{ amount: number; routeText: string }>
    ) => {
      const { amount, routeText } = action.payload;
      state.travelerBalance += amount;
      state.travelerTransactions.unshift({
        id: `trv-tx-${Date.now()}`,
        date: 'Just now',
        title: 'Delivery earnings',
        amount,
        type: 'delivery_earnings',
        details: routeText,
        status: 'Successful',
      });
    },
  },
});

export const {
  topUpSenderWallet,
  deductSenderBalance,
  withdrawTravelerFunds,
  creditTravelerEarning,
} = walletSlice.actions;

export default walletSlice.reducer;
