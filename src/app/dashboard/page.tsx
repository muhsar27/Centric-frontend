'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Package,
  ShieldCheck,
  Wallet,
  Search,
  MapPin,
  ArrowRight,
  Clock3,
  TrendingUp,
  Plus,
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useAppSelector } from '@/store/hooks';
import { cn } from '@/lib/cn';

export default function DashboardPage() {
  const router = useRouter();
  const { role, firstName, isSender, fullName } = useCurrentUser();
  const { senderBalance, travelerBalance } = useAppSelector((state) => state.wallet);
  const [trackingCode, setTrackingCode] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      router.push('/deliveries');
    }
  };

  const travelerBars = [
    { day: 'Mon', height: 68 },
    { day: 'Tue', height: 30 },
    { day: 'Wed', height: 46 },
    { day: 'Thu', height: 62 },
    { day: 'Fri', height: 32 },
    { day: 'Sat', height: 30 },
    { day: 'Sun', height: 64 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 max-w-6xl">
        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            {isSender ? `Welcome ${firstName}` : `Good morning, ${firstName}`}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {isSender
              ? "Here's what's happening with your deliveries today"
              : 'Here are deliveries and routes available near you'}
          </p>
        </div>

        {/* SENDER DASHBOARD */}
        {isSender && (
          <div className="space-y-6">
            {/* Metric Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400">Active deliveries</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">2</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[var(--primary)]">
                  <Package className="h-5 w-5" />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400">Completed this month</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">24</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[var(--primary)]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400">Wallet balance</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    ₦{senderBalance.toLocaleString()}
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[var(--primary)]">
                  <Wallet className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Tracking + Send Package Banner Grid */}
            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
              <div className="space-y-6">
                {/* Track Delivery Box */}
                <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Track your delivery</h3>
                    <p className="text-xs text-slate-400">
                      Enter tracking code (e.g. CTR-78291) to view live location
                    </p>
                  </div>

                  <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                        placeholder="Enter tracking code (e.g. CTR-78291)"
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-[var(--primary)] focus:outline-none"
                      />
                      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                    <Button type="submit" className="h-12 px-7 rounded-full text-xs font-semibold">
                      Track
                    </Button>
                  </form>
                </section>

                {/* Recent Deliveries Panel */}
                <section className="rounded-3xl border border-slate-100 bg-white shadow-xs overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4.5">
                    <h3 className="text-base font-bold text-slate-900">Recent deliveries</h3>
                    <button
                      type="button"
                      onClick={() => router.push('/deliveries')}
                      className="text-xs font-bold text-[var(--primary)] hover:underline"
                    >
                      View all
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {[
                      {
                        title: 'Laptop charger',
                        pickup: 'Ikeja',
                        dropoff: 'Yaba',
                        badge: 'In transit',
                        badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
                      },
                      {
                        title: 'Documents',
                        pickup: 'Ikeja',
                        dropoff: 'Yaba',
                        badge: 'Delivered',
                        badgeClass: 'bg-emerald-50 text-[var(--primary)] border-emerald-200',
                      },
                      {
                        title: 'Miscellaneous',
                        pickup: 'Ikeja',
                        dropoff: 'Yaba',
                        badge: 'Delivered',
                        badgeClass: 'bg-emerald-50 text-[var(--primary)] border-emerald-200',
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-[var(--primary)]">
                            <Package className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                              <MapPin className="h-3 w-3" />
                              {item.pickup} <ArrowRight className="h-3 w-3" /> {item.dropoff}
                            </p>
                          </div>
                        </div>

                        <span
                          className={cn(
                            'rounded-full px-2.5 py-0.5 text-xs font-semibold border',
                            item.badgeClass
                          )}
                        >
                          {item.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Action Promo Card: Send a Package */}
              <section className="rounded-3xl bg-emerald-50/90 border border-emerald-100 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--primary)] shadow-xs">
                    <Package className="h-6 w-6" />
                  </div>
                  <h3 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                    Send a package
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Deliver anything, anywhere with trusted commuters and verified travelers.
                  </p>
                </div>

                <Button
                  onClick={() => router.push('/create-delivery')}
                  className="mt-8 h-12 w-full rounded-full bg-white text-slate-900 shadow-sm hover:bg-emerald-100/60 text-sm font-bold"
                >
                  Create delivery
                </Button>
              </section>
            </div>
          </div>
        )}

        {/* TRAVELER DASHBOARD */}
        {!isSender && (
          <div className="space-y-6">
            {/* Metric Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400">Today&apos;s earnings</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">₦7,450</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[var(--primary)]">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400">Completed this month</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">10</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[var(--primary)]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400">Wallet balance</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    ₦{travelerBalance.toLocaleString()}
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[var(--primary)]">
                  <Wallet className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Earnings Chart + Available Deliveries Feed */}
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              {/* Earnings Mini Chart */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Earnings overview</h4>
                    <p className="text-xs text-slate-400">Your weekly performance</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => router.push('/earnings')}
                    className="text-xs font-bold text-[var(--primary)] hover:underline"
                  >
                    View details
                  </button>
                </div>

                <div className="pt-2">
                  <p className="text-2xl font-bold text-slate-900">₦14,300</p>
                  <p className="text-xs text-[var(--primary)] font-semibold mt-0.5">
                    ↗ 12% from last week
                  </p>

                  <div className="mt-5 grid grid-cols-7 items-end gap-2 h-[130px]">
                    {travelerBars.map((bar) => (
                      <div key={bar.day} className="flex flex-col items-center gap-1.5 h-full justify-end">
                        <div className="w-full flex justify-center h-full items-end">
                          <div className="w-5 rounded-lg bg-emerald-50 h-full flex items-end">
                            <div
                              className="w-full rounded-lg bg-[var(--primary)]"
                              style={{ height: `${bar.height}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Available Deliveries Preview Panel */}
              <div className="rounded-3xl border border-slate-100 bg-white shadow-xs overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4.5">
                  <h3 className="text-base font-bold text-slate-900">Available deliveries</h3>
                  <button
                    type="button"
                    onClick={() => router.push('/available-deliveries')}
                    className="text-xs font-bold text-[var(--primary)] hover:underline"
                  >
                    View all
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {[
                    {
                      id: 'CTR-78291',
                      title: 'Laptop Charger',
                      pickup: '23 Herbert Macaulay Rd., Yaba',
                      dropoff: 'Hakeem Odusanya Str., Ikeja',
                      category: 'Electronics',
                      weight: '1kg',
                      size: 'Small',
                      time: 'August 20, 13:59 PM',
                      earning: '₦1,350',
                    },
                    {
                      id: 'CTR-78288',
                      title: 'Miscellaneous',
                      pickup: 'Maryland Mall',
                      dropoff: 'Surulere',
                      category: 'Documents',
                      weight: '0.5kg',
                      size: 'Small',
                      time: 'August 20, 11:59 AM',
                      earning: '₦950',
                    },
                  ].map((job) => (
                    <div key={job.id} className="p-5 hover:bg-slate-50/60 transition-colors space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">{job.title}</h4>
                        <span className="text-sm font-bold text-[var(--primary)]">{job.earning}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="space-y-0.5">
                          <p className="text-slate-400">Pickup</p>
                          <p className="font-semibold text-slate-800 truncate">{job.pickup}</p>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-slate-400">Drop-off</p>
                          <p className="font-semibold text-slate-800 truncate">{job.dropoff}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-slate-400">
                          {job.category} • {job.size} • {job.weight}
                        </span>
                        <Button
                          onClick={() => router.push('/traveler/active-delivery')}
                          className="h-8 px-4 rounded-full text-xs font-semibold"
                        >
                          Accept
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
