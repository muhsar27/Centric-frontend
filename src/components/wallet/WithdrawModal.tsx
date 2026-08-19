'use client';

import React, { useState } from 'react';
import { X, Building2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { withdrawTravelerFunds } from '@/store/slices/walletSlice';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const dispatch = useAppDispatch();
  const travelerBalance = useAppSelector((state) => state.wallet.travelerBalance);
  const savedBanks = useAppSelector((state) => state.wallet.savedBanks);

  const [amount, setAmount] = useState<string>(travelerBalance.toString());
  const [selectedBankId, setSelectedBankId] = useState<string>(savedBanks[0]?.id || 'bank-1');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const numericAmount = parseFloat(amount) || 0;
  const fee = 69;
  const netAmount = Math.max(0, numericAmount - fee);
  const selectedBank = savedBanks.find((b) => b.id === selectedBankId) || savedBanks[0];

  const handleMaxClick = () => {
    setAmount(travelerBalance.toString());
  };

  const handleWithdraw = () => {
    if (numericAmount <= fee || numericAmount > travelerBalance) return;

    dispatch(
      withdrawTravelerFunds({
        amount: numericAmount,
        bankName: selectedBank?.bankName || 'GTBank',
      })
    );
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-[var(--primary)] animate-bounce" />
            <h3 className="mt-4 text-xl font-bold text-slate-900">Withdrawal Processed!</h3>
            <p className="mt-2 text-sm text-slate-500">
              ₦{netAmount.toLocaleString()} has been sent to your {selectedBank?.bankName} account.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">Withdraw Funds</h3>

            <div className="mt-5 space-y-4">
              {/* Balance info */}
              <div className="rounded-2xl bg-slate-50 p-3.5">
                <p className="text-xs font-medium text-slate-500">Available balance</p>
                <p className="text-xl font-bold text-slate-900">₦{travelerBalance.toLocaleString()}</p>
              </div>

              {/* Amount input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Enter amount
                </label>
                <div className="relative mt-1.5">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-bold text-slate-400">
                    ₦
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    max={travelerBalance}
                    className="h-12 w-full rounded-xl border border-slate-200 pl-8 pr-16 text-base font-semibold text-slate-900 focus:border-[var(--primary)] focus:outline-none"
                    placeholder="8450"
                  />
                  <button
                    type="button"
                    onClick={handleMaxClick}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-[var(--primary)] hover:bg-emerald-100"
                  >
                    Max
                  </button>
                </div>
              </div>

              {/* Bank destination select */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Withdraw to
                </label>
                <div className="mt-1.5 relative">
                  <select
                    value={selectedBankId}
                    onChange={(e) => setSelectedBankId(e.target.value)}
                    className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-900 focus:border-[var(--primary)] focus:outline-none"
                  >
                    {savedBanks.map((bank) => (
                      <option key={bank.id} value={bank.id}>
                        {bank.bankName} ••••• {bank.accountNumber.slice(-4)} ({bank.accountName})
                      </option>
                    ))}
                  </select>
                  <Building2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Payout & fee calculation */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Withdrawal amount</span>
                  <span className="font-semibold text-slate-900">₦{numericAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-xs">
                  <span>Processing Fee</span>
                  <span>₦{fee.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200/80 pt-2 flex items-center justify-between font-bold text-slate-900">
                  <span>You will receive</span>
                  <span className="text-base text-[var(--primary)]">₦{netAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleWithdraw}
                  disabled={numericAmount <= fee || numericAmount > travelerBalance}
                  className="h-12 w-full text-base font-semibold"
                >
                  Withdraw Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
