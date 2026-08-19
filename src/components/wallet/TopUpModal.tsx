'use client';

import React, { useState } from 'react';
import { X, CreditCard, Building2, Smartphone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAppDispatch } from '@/store/hooks';
import { topUpSenderWallet } from '@/store/slices/walletSlice';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TopUpModal({ isOpen, onClose }: TopUpModalProps) {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<string>('5000');
  const [method, setMethod] = useState<'card' | 'bank' | 'ussd'>('card');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleTopUp = () => {
    const numericAmount = parseFloat(amount) || 0;
    if (numericAmount <= 0) return;

    const methodName =
      method === 'card'
        ? 'Card •••• 4567'
        : method === 'bank'
        ? 'GTBank •••• 1234'
        : 'USSD QuickPay';

    dispatch(topUpSenderWallet({ amount: numericAmount, method: methodName }));
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
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
            <CheckCircle className="mx-auto h-14 w-14 text-[var(--primary)] animate-bounce" />
            <h3 className="mt-4 text-xl font-bold text-slate-900">Wallet Top-Up Successful!</h3>
            <p className="mt-2 text-sm text-slate-500">
              ₦{parseFloat(amount).toLocaleString()} has been added to your Centric balance.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">Top Up Wallet</h3>
            <p className="mt-1 text-sm text-slate-500">Add funds to pay for your delivery requests seamlessly.</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Enter Amount (₦)
                </label>
                <div className="relative mt-1.5">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-bold text-slate-400">
                    ₦
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 pl-8 pr-4 text-base font-semibold text-slate-900 focus:border-[var(--primary)] focus:outline-none"
                    placeholder="5000"
                  />
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {['2000', '5000', '10000', '20000'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[var(--primary)]"
                    >
                      +₦{parseInt(preset).toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label
                    onClick={() => setMethod('card')}
                    className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-colors ${
                      method === 'card' ? 'border-[var(--primary)] bg-emerald-50/50' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Debit / Credit Card</p>
                        <p className="text-xs text-slate-500">Pay with Mastercard, Visa, Verve</p>
                      </div>
                    </div>
                    <input type="radio" checked={method === 'card'} onChange={() => {}} className="accent-[var(--primary)]" />
                  </label>

                  <label
                    onClick={() => setMethod('bank')}
                    className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-colors ${
                      method === 'bank' ? 'border-[var(--primary)] bg-emerald-50/50' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Instant Bank Transfer</p>
                        <p className="text-xs text-slate-500">Direct transfer to virtual account</p>
                      </div>
                    </div>
                    <input type="radio" checked={method === 'bank'} onChange={() => {}} className="accent-[var(--primary)]" />
                  </label>

                  <label
                    onClick={() => setMethod('ussd')}
                    className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-colors ${
                      method === 'ussd' ? 'border-[var(--primary)] bg-emerald-50/50' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">USSD Payment</p>
                        <p className="text-xs text-slate-500">Quick dial payment code</p>
                      </div>
                    </div>
                    <input type="radio" checked={method === 'ussd'} onChange={() => {}} className="accent-[var(--primary)]" />
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <Button onClick={handleTopUp} className="h-12 w-full text-base font-semibold">
                  Top Up ₦{parseFloat(amount || '0').toLocaleString()}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
