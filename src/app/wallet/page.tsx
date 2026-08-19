'use client';

import React, { useState } from 'react';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, ShieldCheck, CreditCard, Building2, CheckCircle2 } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useAppSelector } from '@/store/hooks';
import TopUpModal from '@/components/wallet/TopUpModal';
import WithdrawModal from '@/components/wallet/WithdrawModal';
import { cn } from '@/lib/cn';

export default function WalletPage() {
  const { isSender, role } = useCurrentUser();
  const { senderBalance, travelerBalance, topUpHistory, travelerTransactions } = useAppSelector(
    (state) => state.wallet
  );

  const [topUpOpen, setTopUpOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Wallet</h1>
          <p className="mt-1 text-sm text-slate-500">
            {isSender
              ? 'Manage your prepaid delivery funds and top-up history'
              : 'Manage your courier delivery earnings and bank withdrawals'}
          </p>
        </div>

        {/* SENDER WALLET VIEW */}
        {isSender && (
          <div className="space-y-6">
            {/* Top Educational Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Pay before every delivery</h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Add funds to your wallet to pay for delivery requests instantly with zero checkout friction.
                </p>
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--primary)] shadow-sm">
                <Wallet className="h-7 w-7" />
              </div>
            </div>

            {/* Wallet Balance Card */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Wallet Balance
                </p>
                <p className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                  ₦{senderBalance.toLocaleString()}
                </p>
                {senderBalance === 0 ? (
                  <p className="mt-1.5 text-xs font-medium text-amber-600">
                    Insufficient balance to create a delivery
                  </p>
                ) : (
                  <p className="mt-1.5 text-xs font-medium text-[var(--primary)]">
                    Available for upcoming deliveries
                  </p>
                )}
              </div>

              <div>
                <Button
                  onClick={() => setTopUpOpen(true)}
                  className="h-12 px-8 rounded-full text-base font-semibold gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Top Up Wallet
                </Button>
              </div>
            </div>

            {/* Top Up History Table */}
            <div className="rounded-3xl border border-slate-100 bg-white shadow-xs overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <h3 className="text-base font-bold text-slate-900">Top Up History</h3>
                <button type="button" className="text-xs font-bold text-[var(--primary)] hover:underline">
                  View all
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-6 py-3.5">Date</th>
                      <th className="px-6 py-3.5">Amount</th>
                      <th className="px-6 py-3.5">Payment Method</th>
                      <th className="px-6 py-3.5">Status</th>
                      <th className="px-6 py-3.5">Reference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {topUpHistory.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-6 py-4 text-xs font-medium text-slate-500">{row.date}</td>
                        <td className="px-6 py-4 font-bold text-slate-900">
                          ₦{row.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-700">
                          {row.paymentMethod}
                        </td>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-[var(--primary)] border border-emerald-200">
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.reference}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TRAVELER WALLET VIEW */}
        {!isSender && (
          <div className="space-y-6">
            {/* Wallet Balance Card with Withdraw Action */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Wallet Balance
                </p>
                <p className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                  ₦{travelerBalance.toLocaleString()}
                </p>
                <p className="mt-1.5 text-xs text-slate-500">Available for instant bank withdrawal</p>
              </div>

              <div>
                <Button
                  onClick={() => setWithdrawOpen(true)}
                  className="h-12 px-8 rounded-full text-base font-semibold gap-2"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Withdraw Funds
                </Button>
              </div>
            </div>

            {/* Recent Transactions List */}
            <div className="rounded-3xl border border-slate-100 bg-white shadow-xs overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <h3 className="text-base font-bold text-slate-900">Recent Transactions</h3>
                <button type="button" className="text-xs font-bold text-[var(--primary)] hover:underline">
                  View all
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {travelerTransactions.map((tx) => {
                  const isPositive = tx.amount > 0;
                  return (
                    <div key={tx.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/60 transition-colors">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-full',
                            isPositive
                              ? 'bg-emerald-50 text-[var(--primary)]'
                              : 'bg-red-50 text-red-600'
                          )}
                        >
                          {isPositive ? (
                            <ArrowDownLeft className="h-5 w-5" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{tx.title}</p>
                          <p className="text-xs text-slate-400">
                            {tx.date} • {tx.details}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={cn(
                            'text-sm font-bold',
                            isPositive ? 'text-[var(--primary)]' : 'text-slate-900'
                          )}
                        >
                          {isPositive ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
                        </p>
                        <span className="text-[11px] text-slate-400">{tx.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <TopUpModal isOpen={topUpOpen} onClose={() => setTopUpOpen(false)} />
      <WithdrawModal isOpen={withdrawOpen} onClose={() => setWithdrawOpen(false)} />
    </AppLayout>
  );
}
