'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Package,
  ShieldCheck,
  XCircle,
  Star,
  ChevronDown,
  Calendar,
  ArrowUpRight,
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

export default function EarningsPage() {
  const [period, setPeriod] = useState<'this_week' | 'this_month' | 'all_time'>('this_week');

  const bars = [
    { day: 'Mon', height: 68, amount: '₦2,500' },
    { day: 'Tue', height: 30, amount: '₦1,200' },
    { day: 'Wed', height: 46, amount: '₦1,800' },
    { day: 'Thu', height: 62, amount: '₦2,400' },
    { day: 'Fri', height: 32, amount: '₦1,300' },
    { day: 'Sat', height: 30, amount: '₦1,200' },
    { day: 'Sun', height: 64, amount: '₦2,600' },
  ];

  const earningsHistory = [
    {
      id: 'eh-1',
      date: 'May 12, 2025 10:46 AM',
      route: 'Ikeja City Mall → Yaba Tech Hub',
      amount: 1360,
      status: 'Completed',
    },
    {
      id: 'eh-2',
      date: 'May 12, 2025 09:12 AM',
      route: 'Maryland Mall → Surulere',
      amount: 950,
      status: 'Completed',
    },
    {
      id: 'eh-3',
      date: 'May 11, 2025 04:30 PM',
      route: 'Computer Village → Ikeja GRA',
      amount: 1120,
      status: 'Completed',
    },
    {
      id: 'eh-4',
      date: 'May 11, 2025 11:15 AM',
      route: 'Alausa Secretariat → Ikeja City Mall',
      amount: 1620,
      status: 'Completed',
    },
    {
      id: 'eh-5',
      date: 'May 10, 2025 03:20 PM',
      route: 'Yaba Tech Hub → Maryland Mall',
      amount: 950,
      status: 'Completed',
    },
  ];

  return (
    <AppLayout activeRoleOverride="traveler">
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Earnings Overview
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track your weekly payouts, trip earnings, and bonus tips
            </p>
          </div>

          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as 'this_week' | 'this_month' | 'all_time')}
              className="appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-xs font-bold text-slate-900 focus:border-[var(--primary)] focus:outline-none shadow-xs"
            >
              <option value="this_week">This week</option>
              <option value="this_month">This month</option>
              <option value="all_time">All time</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Hero Card & Metric Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* Main Total Card */}
          <div className="sm:col-span-2 rounded-3xl bg-[var(--primary)] p-6 text-white shadow-sm flex flex-col justify-between">
            <div>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-xs">
                Total Earnings
              </span>
              <p className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">₦14,680</p>
              <p className="mt-1 text-xs text-white/80 flex items-center gap-1">
                <ArrowUpRight className="h-3.5 w-3.5" /> +12% from last week
              </p>
            </div>
            <p className="mt-4 text-xs text-white/70">Next automated payout on Monday</p>
          </div>

          {/* Metric 1 */}
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xs flex flex-col justify-between">
            <p className="text-xs font-semibold text-slate-400">Deliveries</p>
            <p className="text-2xl font-bold text-slate-900">23</p>
            <span className="text-[11px] text-slate-400">Total matched</span>
          </div>

          {/* Metric 2 */}
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xs flex flex-col justify-between">
            <p className="text-xs font-semibold text-slate-400">Completed</p>
            <p className="text-2xl font-bold text-[var(--primary)]">21</p>
            <span className="text-[11px] text-slate-400">91% success rate</span>
          </div>

          {/* Metric 3 */}
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xs flex flex-col justify-between">
            <p className="text-xs font-semibold text-slate-400">Rating</p>
            <div className="flex items-center gap-1.5">
              <p className="text-2xl font-bold text-slate-900">4.9</p>
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-[11px] text-slate-400">230 reviews</span>
          </div>
        </div>

        {/* 2-Column: Trend Chart & Breakdown */}
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Daily Trend Chart */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Earnings Trend</h3>
              <p className="text-xs text-slate-400">Daily delivery earnings for this period</p>
            </div>

            <div className="pt-6">
              <div className="grid grid-cols-7 items-end gap-3 h-[180px]">
                {bars.map((bar) => (
                  <div key={bar.day} className="flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="relative w-full flex justify-center h-full items-end">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 whitespace-nowrap rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs pointer-events-none">
                        {bar.amount}
                      </div>
                      <div className="w-6 sm:w-8 rounded-xl bg-emerald-50 h-full flex items-end">
                        <div
                          className="w-full rounded-xl bg-[var(--primary)] transition-all duration-500"
                          style={{ height: `${bar.height}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <h3 className="text-base font-bold text-slate-900">Earnings Breakdown</h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Delivery earnings</span>
                <span className="font-bold text-slate-900">₦13,600</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Tips</span>
                <span className="font-bold text-slate-900">₦680</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Adjustments</span>
                <span className="font-bold text-slate-900">₦400</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-bold text-slate-900">
                <span>Total</span>
                <span className="text-[var(--primary)]">₦14,680</span>
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={() => alert('Exporting full earnings CSV statement...')}
              className="h-10 w-full rounded-full text-xs font-semibold"
            >
              Export Statement
            </Button>
          </div>
        </div>

        {/* Earnings History Table */}
        <div className="rounded-3xl border border-slate-100 bg-white shadow-xs overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h3 className="text-base font-bold text-slate-900">Earnings History</h3>
            <button type="button" className="text-xs font-bold text-[var(--primary)] hover:underline">
              See all earnings
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Delivery Route</th>
                  <th className="px-6 py-3.5">Amount</th>
                  <th className="px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {earningsHistory.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{row.date}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.route}</td>
                    <td className="px-6 py-4 font-bold text-[var(--primary)]">
                      +₦{row.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-[var(--primary)] border border-emerald-200">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
